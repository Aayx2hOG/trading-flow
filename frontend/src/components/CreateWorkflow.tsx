import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import { TriggerSheet } from './TriggerSheet';

export type NodeKind = "price-trigger" | "timer-trigger" | "hyperliquid" | "backpack" | "lighter";
export type NodeMetaData = any;

interface NodeType {
    data: {
        type: "action" | "trigger",
        kind: NodeKind,
        metaData: NodeMetaData,
        label: string
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

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            {!nodes.length && <TriggerSheet onSelect={(kind, metaData) => {
                setNodes([...nodes, {
                    id: Math.random().toString(),
                    data: {
                        type: 'trigger',
                        kind,
                        metaData,
                        label: kind
                    },
                    position: { x: 0, y: 0 }
                }])
            }} />}
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
            />
        </div>
    );
}