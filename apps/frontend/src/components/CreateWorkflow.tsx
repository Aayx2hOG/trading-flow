import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import { TriggerSheet } from './TriggerSheet';
import { PriceTrigger, type PriceTriggerMetaData } from '@/nodes/triggers/PriceTrigger';
import { TimerTrigger, type TimerNodeMetaData } from '@/nodes/triggers/TimerTrigger';
import { Lighter, type TradingMetadata } from '@/nodes/actions/Lighter';
import { ActionSheet } from './ActionSheet';
import { Backpack } from '@/nodes/actions/Backpack';
import { Hyperliquid } from '@/nodes/actions/Hyperliquid';

const nodeTypes = {
    'price-trigger': PriceTrigger,
    'timer-trigger': TimerTrigger,
    'lighter': Lighter,
    'backpack': Backpack,
    'hyperliquid': Hyperliquid
}

export type NodeKind = "price-trigger" | "timer-trigger" | "hyperliquid" | "backpack" | "lighter";
export type NodeMetaData = TradingMetadata | PriceTriggerMetaData | TimerNodeMetaData;

interface NodeType {
    type: NodeKind,
    data: {
        kind: "action" | "trigger",
        metaData: NodeMetaData,
    },
    id: string, position: { x: number, y: number },
}

interface Edge {
    id: string,
    source: string,
    target: string
}

export default function CreateWorkflow() {
    const [nodes, setNodes] = useState<NodeType[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const [selectAction, setSelectAction] = useState<{
        position: {
            x: number,
            y: number,
        },
        startingNodeId: string
    } | null>(null);

    const onNodesChange = useCallback(
        (changes: any) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes: any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
    );
    const onConnect = useCallback(
        (params: any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
        [],
    );

    const POSITION_OFFSET = 50;
    const onConnectEnd = useCallback(
        (_params: any, connectionInfo: any) => {
            if (!connectionInfo.isValid) {
                setSelectAction({
                    startingNodeId: connectionInfo.fromNode.id,
                    position: {
                        x: connectionInfo.from.x + POSITION_OFFSET,
                        y: connectionInfo.from.y + POSITION_OFFSET
                    }
                })
            }
        }, []
    )

    return (
        <div className="w-screen h-screen bg-white">
            {!nodes.length && <TriggerSheet onClose={() => { }} onSelect={(type, metaData) => {
                setNodes([...nodes, {
                    id: Math.random().toString(),
                    type,
                    data: {
                        kind: 'trigger',
                        metaData,
                    },
                    position: { x: 0, y: 0 }
                }])
            }} />}
            {selectAction && <ActionSheet
                onSelect={(type, metaData) => {
                    const nodeId = Math.random().toString();
                    setNodes([...nodes, {
                        id: nodeId,
                        type,
                        data: {
                            kind: 'action',
                            metaData,
                        },
                        position: selectAction.position
                    }]);
                    setEdges([...edges, {
                        id: `${selectAction.startingNodeId}-${nodeId}`,
                        source: selectAction.startingNodeId,
                        target: nodeId,
                    }])
                    setSelectAction(null);
                }}
                onClose={() => setSelectAction(null)}
            />}
            <ReactFlow
                nodeTypes={nodeTypes}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onConnectEnd={onConnectEnd}
                fitView
            />
        </div>
    );
}