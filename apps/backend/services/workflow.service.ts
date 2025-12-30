import { prismaClient } from "db/client";
import type { IAction } from "../../../packages/common/types";
import { BackpackAction } from "./actions/backpack.action";
import { HttpAction } from "./actions/http.action";
import { HyperliquidAction } from "./actions/hyperliquid.action";
import { LighterAction } from "./actions/lighter.action";
import { CredentialsService } from "./credentials.service";
import { ConditionAction } from "./actions/condition.action";

interface Node {
    id: string,
    type: string,
    position: { x: number, y: number },
    data: {
        kind: "action" | "trigger",
        metaData: any,
    };
    credentials?: { [key: string]: string };
}

interface Edge {
    id: string,
    source: string,
    target: string,
}

interface Workflow {
    userId?: string,
    nodes: Node[],
    edges: Edge[],
}

export class WorkflowExecutor {
    private actions: Map<string, IAction> = new Map();
    private credentials = new CredentialsService();

    constructor() {
        this.actions.set('condition', new ConditionAction());
        this.actions.set('http', new HttpAction());
        this.actions.set('lighter', new LighterAction());
        this.actions.set('backpack', new BackpackAction());
        this.actions.set('hyperliquid', new HyperliquidAction());
    }

    async executeWorkflowById(workflowId: string, triggerData?: any): Promise<string> {
        const workflow = await prismaClient.workflow.findUnique({
            where: { id: workflowId },
        });

        if (!workflow) {
            throw new Error(`Workflow with id ${workflowId} not found`);
        }

        const execution = await prismaClient.execution.create({
            data: {
                workflowId,
                status: 'SUCCESS',
                startTime: new Date(),
            },
        });

        try {
            const workflowData: Workflow = {
                userId: workflow.userId,
                nodes: workflow.nodes as unknown as Node[],
                edges: workflow.edges as unknown as Edge[],
            }

            if (triggerData) {
                const triggerNode = workflowData.nodes.find(n => n.data.kind === 'trigger');
                if (triggerNode) {
                    triggerNode.data.metaData = { ...triggerNode.data.metaData, ...triggerData };
                }
            }
            const result = await this.execute(workflowData);

            await prismaClient.execution.update({
                where: { id: execution.id },
                data: {
                    status: result.success ? 'SUCCESS' : 'FAILURE',
                    endTime: new Date(),
                },
            });
            if (!result.success) {
                throw new Error(result.error || 'Workflow execution failed');
            }
            return execution.id;
        } catch (e) {
            await prismaClient.execution.update({
                where: { id: execution.id },
                data: {
                    status: 'FAILURE',
                    endTime: new Date(),
                },
            });
            throw e;
        }
    }

    async execute(workflow: Workflow): Promise<{ success: boolean, results: any[]; error?: string }> {
        try {
            if (!workflow.nodes || workflow.nodes.length === 0){
                return { success: false, results: [], error: 'No nodes found' };
            }
            if (!workflow.edges || workflow.edges.length === 0){
                return { success: false, results: [], error: 'No edges found' };
            }
            const results: any[] = [];
            const nodeResults = new Map<string, any>();

            const triggerNode = workflow.nodes.find(node => node.data.kind === 'trigger');
            if (!triggerNode) {
                return { success: false, results, error: 'No trigger node found' };
            }

            for (const node of workflow.nodes){
                if (!node.data || !node.data.kind){
                    return { success: false, results, error: 'Invalid node data' };
                }
            }

            const executionOrder = this.buildExecutionOrder(workflow.nodes, workflow.edges, triggerNode.id);

            for (const nodeId of executionOrder) {
                const node = workflow.nodes.find(n => n.id === nodeId);
                if (!node) continue;

                if (node.data.kind === 'trigger') {
                    nodeResults.set(node.id, { triggered: true, data: node.data.metaData });
                    results.push({ nodeId: node.id, type: 'trigger', result: { triggered: true } });
                } else {
                    const action = this.actions.get(node.type);
                    if (!action) {
                        results.push({ success: false, results, error: `Unknown node type: ${node.type}` });
                    }

                    const previousNodes = workflow.edges
                        .filter(edge => edge.target === node.id)
                        .map(edge => edge.source);

                    const inputData = previousNodes.length > 0 ? nodeResults.get(previousNodes[0]!) : undefined;

                    let creds = node.credentials || {};
                    if (creds && typeof creds === 'object' && 'refId' in creds) {
                        const resolved = await this.credentials.getDecrypted(workflow.userId!, creds.refId as string);
                        if (resolved?.data) creds = resolved.data;
                    }

                    const result = await action!.execute(
                        creds,
                        node.data.metaData || {},
                        inputData
                    );

                    nodeResults.set(node.id, result);
                    results.push({ nodeId: node.id, type: node.type, result });

                    if (!result?.success) {
                        const errorMsg = node.type === 'condition' ? result.error : `Node ${node.id} execution failed`;
                        return { success: false, results, error: errorMsg };
                    }
                }
            }
            return { success: true, results };
        } catch (e) {
            return {
                success: false,
                results: [],
                error: e instanceof Error ? e.message : 'Workflow execution failed'
            }
        }
    }

    private buildExecutionOrder(nodes: Node[], edges: Edge[], startNodeId: string): string[] {
        const order: string[] = [];
        const visited = new Set<string>();

        const visit = (nodeId: string) => {
            if (visited.has(nodeId)) return;
            visited.add(nodeId);
            order.push(nodeId);

            const nextEdges = edges.filter(edge => edge.source === nodeId);
            for (const edge of nextEdges) {
                visit(edge.target);
            }
        };
        visit(startNodeId);
        return order;
    }
}