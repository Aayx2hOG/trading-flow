import { prismaClient } from "db/client";
import { WorkflowExecutor } from "./workflow.service";

interface PriceTriggerData {
    symbol: string;
    condition: "above" | "below";
    price: number;
}

interface TimerTriggerData {
    schedule: string;
}

export class TriggerService {
    private executor: WorkflowExecutor;
    private intervals: Map<string, NodeJS.Timeout>;

    constructor() {
        this.executor = new WorkflowExecutor();
        this.intervals = new Map();
    }
    async startAllTriggers() {
        const workflows = await prismaClient.workflow.findMany();

        for (const workflow of workflows) {
            await this.startWorkflowTrigger(workflow.id);
        }
    }

    async startWorkflowTrigger(workflowId: string) {
        const workflow = await prismaClient.workflow.findUnique({
            where: { id: workflowId },
        });
        if (!workflow) {
            console.warn(`Workflow with id ${workflowId} not found`);
            return;
        }
        const nodes = workflow.nodes as any[];
        const triggerNodes = nodes.filter(n => n.data && n.data.kind === 'trigger');
        if (!triggerNodes.length) {
            console.warn(`No trigger nodes found for workflow with id ${workflowId}`);
            return;
        }
        for (const trigger of triggerNodes) {
            if (trigger.type === "price-trigger") {
                this.startPriceTrigger(workflowId, trigger.data.metaData);
            } else if (trigger.type === "timer-trigger") {
                this.startTimerTrigger(workflowId, trigger.data.metaData);
            }
        }
    }

    private startPriceTrigger(workflowId: string, metaData: any) {
        const symbol = metaData?.asset ?? metaData?.symbol ?? 'UNKNOWN';
        const key = `${workflowId}-price-${symbol}`;
        const interval = setInterval(async () => {
            try {
                const symbol = metaData.asset ?? metaData.symbol;
                const currentPrice = await this.fetchPrice(symbol);
                const targetPrice = metaData.price;
                const condition = metaData.condition ?? 'above';
                const shouldTrigger =
                    (condition === "above" && currentPrice >= targetPrice) ||
                    (condition === "below" && currentPrice <= targetPrice);

                if (shouldTrigger) {
                    await this.executor.executeWorkflowById(workflowId, {
                        trigger: 'price',
                        symbol,
                        currentPrice,
                        targetPrice,
                        condition,
                    });
                }
            } catch (e) {
                console.error(`Error executing price trigger for workflow ${workflowId}:`, e);
            }
        }, 10000)
        this.intervals.set(key, interval);
    }

    private startTimerTrigger(workflowId: string, metaData: any) {
        const key = `${workflowId}-timer`;
        const intervalMs = typeof metaData.time === 'number' ? metaData.time * 1000 : this.parseScheduleToMs(metaData.schedule);

        const interval = setInterval(async () => {
            try {
                await this.executor.executeWorkflowById(workflowId, {
                    trigger: 'timer',
                    schedule: metaData.schedule,
                    timestamp: new Date().toISOString(),
                });
            } catch (e) {
                console.error(`Error executing timer trigger for workflow ${workflowId}:`, e);
            }
        }, intervalMs)
        this.intervals.set(key, interval);
    }

    stopWorkflowTriggers(workflowId: string) {
        let count = 0;
        for (const [key, interval] of this.intervals.entries()) {
            if (key.startsWith(workflowId)) {
                clearInterval(interval);
                this.intervals.delete(key);
                count++;
            }
        }
    }

    stopAllTriggers() {
        for (const interval of this.intervals.values()) {
            clearInterval(interval);
        }
        this.intervals.clear();
    }

    private async fetchPrice(symbol: string): Promise<number> {
        return 50 + Math.random() * 100;
    }

    private parseScheduleToMs(schedule: string): number {
        if (!schedule || typeof schedule !== 'string') {
            console.warn('No schedule provided, defaulting to 60s');
            return 60_000;
        }
        const s = schedule.trim().toLowerCase();
        const short = s.match(/^(\d+)([smh])$/);
        if (short) {
            const val = parseInt(short[1]!, 10);
            const unit = short[2]!;
            if (unit === 's') return val * 1000;
            if (unit === 'm') return val * 60 * 1000;
            if (unit === 'h') return val * 60 * 60 * 1000;
        }

        const verbose = s.match(/^every\s+(\d+)\s+(seconds|minutes|hours)$/);
        if (verbose) {
            const val = parseInt(verbose[1]!, 10);
            const unit = verbose[2]!;
            if (unit === 'seconds') return val * 1000;
            if (unit === 'minutes') return val * 60 * 1000;
            if (unit === 'hours') return val * 60 * 60 * 1000;
        }

        console.warn(`Invalid schedule format: ${schedule}, defaulting to 60s`);
        return 60_000;
    }
}