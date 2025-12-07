import type { IAction } from "../../../packages/common/types";
import { BackpackAction } from "./actions/backpack.action";
import { HttpAction } from "./actions/http.action";
import { HyperliquidAction } from "./actions/hyperliquid.action";
import { LighterAction } from "./actions/lighter.action";

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
    nodes: Node[],
    edges: Edge[],
}

export class WorkflowExecutor {
    private actions: Map<string, IAction> = new Map();

    constructor() {
        this.actions.set('HttpAction', new (HttpAction)());
        this.actions.set('LighterAction', new (LighterAction)());
        this.actions.set('BackpackAction', new (BackpackAction)());
        this.actions.set('HyperliquidAction', new (HyperliquidAction)());
    }

    async execute(workflow: Workflow): Promise<{ success: boolean, results: any[]; error?: string }> {
        try {
            const results: any[] = [];
            const nodeResults = new Map<string, any>();

            const triggerNode = workflow.nodes.find(node => node.data.kind === 'trigger');
            if (!triggerNode) {
                return { success: false, results, error: 'No trigger node found' };
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

                    const result = await action?.execute(
                        node.credentials || {},
                        node.data.metaData || {},
                        inputData
                    );

                    nodeResults.set(node.id, result);
                    results.push({ nodeId: node.id, type: node.type, result });

                    if (!result?.success) {
                        return { success: false, results, error: `Node ${node.id} execution failed` };
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