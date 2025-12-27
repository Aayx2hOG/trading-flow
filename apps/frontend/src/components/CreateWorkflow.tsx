import { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ReactFlow,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    Background,
    Controls,
    MiniMap,
    Panel,
    type NodeChange,
    type EdgeChange,
    type Connection,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { TriggerSheet } from './TriggerSheet';
import { ActionSheet } from './ActionSheet';

import { PriceTrigger } from '@/nodes/triggers/PriceTrigger';
import { TimerTrigger } from '@/nodes/triggers/TimerTrigger';
import { WebhookTrigger } from '@/nodes/triggers/WebhookTrigger';

import { Lighter } from '@/nodes/actions/Lighter';
import { Backpack } from '@/nodes/actions/Backpack';
import { Hyperliquid } from '@/nodes/actions/Hyperliquid';

import { workflowApi } from '@/api/workflow.api';
import type { PriceTriggerMetaData, TimerNodeMetaData, TradingMetadata } from 'common/types';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

import {
    Save,
    Trash2,
    Power,
    PowerOff,
    ArrowLeft,
    Copy,
    Check,
    Loader2,
    Link as LinkIcon,
    Info,
} from 'lucide-react';

const nodeTypes = {
    'price-trigger': PriceTrigger,
    'timer-trigger': TimerTrigger,
    'webhook-trigger': WebhookTrigger,
    lighter: Lighter,
    backpack: Backpack,
    hyperliquid: Hyperliquid,
};

export type NodeKind =
    | 'price-trigger'
    | 'timer-trigger'
    | 'webhook-trigger'
    | 'hyperliquid'
    | 'backpack'
    | 'lighter';

export type NodeMetaData =
    | TradingMetadata
    | PriceTriggerMetaData
    | TimerNodeMetaData;

interface NodeType {
    id: string;
    type: NodeKind;
    position: { x: number; y: number };
    data: {
        kind: 'trigger' | 'action';
        metaData: NodeMetaData;
    };
}

interface Edge {
    id: string;
    source: string;
    target: string;
}

export default function CreateWorkflow() {
    const { workflowId } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!workflowId;

    const [nodes, setNodes] = useState<NodeType[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const [selectAction, setSelectAction] = useState<any>(null);

    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isExecuting, setIsExecuting] = useState(false);
    const [isEnabling, setIsEnabling] = useState(false);
    const [isDisabling, setIsDisabling] = useState(false);

    const [isEnabled, setIsEnabled] = useState(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    const [webhookUrl, setWebhookUrl] = useState<string | null>(null);
    const [webhookCopied, setWebhookCopied] = useState(false);

    useEffect(() => {
        if (workflowId) loadWorkflow();
    }, [workflowId]);

    // Add global styles for ReactFlow
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            .react-flow__attribution {
                display: none !important;
            }
            .react-flow__controls,
            .react-flow__minimap {
                z-index: 10 !important;
            }
            .react-flow__minimap {
                background-color: #111827 !important;
                border: 1px solid #374151 !important;
            }
            .react-flow__minimap-mask {
                fill: rgba(0, 0, 0, 0.7) !important;
            }
            .react-flow__controls {
                background-color: #111827 !important;
                border: 1px solid #374151 !important;
            }
            .react-flow__controls button {
                background-color: #1f2937 !important;
                border-bottom: 1px solid #374151 !important;
                color: #d1d5db !important;
            }
            .react-flow__controls button:hover {
                background-color: #374151 !important;
            }
            .react-flow__controls button svg {
                fill: #d1d5db !important;
            }
            .react-flow__edge-path {
                stroke: #9ca3af !important;
                stroke-width: 2 !important;
            }
            .react-flow__node {
                border-radius: 8px;
            }
        `;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    const loadWorkflow = async () => {
        setIsLoading(true);
        try {
            const workflow = await workflowApi.getById(workflowId!);
            setNodes(workflow.nodes || []);
            setEdges(workflow.edges || []);
            setHasUnsavedChanges(false);

            if (workflow.webhookUrl) {
                const webhook = await workflowApi.getWebhook(workflowId!);
                setWebhookUrl(webhook.webhookUrl);
                setIsEnabled(true);
            }
        } catch (error) {
            console.error('Error loading workflow:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        if (!nodes.length) {
            console.warn('No nodes to save');
            return;
        }

        setIsSaving(true);
        try {
            if (isEditMode) {
                await workflowApi.update(workflowId!, { nodes, edges });
            } else {
                const res = await workflowApi.create({ nodes, edges });
                navigate(`/workflow/${res.workflowId}`, { replace: true });
            }
            setHasUnsavedChanges(false);
        } catch (error) {
            console.error('Error saving workflow:', error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm('Delete workflow permanently?')) return;
        setIsDeleting(true);
        try {
            await workflowApi.delete(workflowId!);
            navigate('/workflows');
        } catch (error) {
            console.error('Error deleting workflow:', error);
            setIsDeleting(false);
        }
    };

    const handleEnable = async () => {
        setIsEnabling(true);
        try {
            await workflowApi.enable(workflowId!);
            setIsEnabled(true);
        } catch (error) {
            console.error('Error enabling workflow:', error);
        } finally {
            setIsEnabling(false);
        }
    };

    const handleDisable = async () => {
        setIsDisabling(true);
        try {
            await workflowApi.disable(workflowId!);
            setIsEnabled(false);
        } catch (error) {
            console.error('Error disabling workflow:', error);
        } finally {
            setIsDisabling(false);
        }
    };

    const handleCopyWebhook = () => {
        if (webhookUrl) {
            navigator.clipboard.writeText(webhookUrl);
            setWebhookCopied(true);
            setTimeout(() => setWebhookCopied(false), 2000);
        }
    };

    const onNodesChange = useCallback((changes: NodeChange[]) => {
        setNodes((nds) => applyNodeChanges(changes, nds) as NodeType[]);
        setHasUnsavedChanges(true);
    }, []);

    const onEdgesChange = useCallback((changes: EdgeChange[]) => {
        setEdges((eds) => applyEdgeChanges(changes, eds));
        setHasUnsavedChanges(true);
    }, []);

    const onConnect = useCallback((params: Connection) => {
        setEdges((eds) => addEdge(params, eds));
        setHasUnsavedChanges(true);
    }, []);

    if (isLoading) {
        return (
            <div className="w-screen h-screen flex items-center justify-center bg-black">
                <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <div className="w-screen h-screen flex flex-col bg-black text-gray-100">
            {/* Top Bar */}
            <div className="bg-black border-b border-gray-800 px-4 py-3">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:bg-gray-900 hover:text-gray-100"
                            onClick={() => navigate('/')}
                        >
                            Home
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:bg-gray-900 hover:text-gray-100"
                            onClick={() => navigate('/workflows')}
                        >
                            <ArrowLeft className="w-4 h-4 mr-1" /> Back
                        </Button>

                        <Separator orientation="vertical" className="h-6 bg-gray-800" />
                        <h1 className="font-semibold text-gray-100">
                            {isEditMode ? 'Edit Workflow' : 'Create Workflow'}
                        </h1>
                    </div>

                    <div className="flex items-center gap-2">
                        {hasUnsavedChanges && (
                            <Badge className="bg-orange-900/30 text-orange-400 border-orange-700">
                                Unsaved
                            </Badge>
                        )}

                        <Button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            {isSaving ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Save className="w-4 h-4" />
                            )}
                        </Button>

                        {isEditMode && (
                            <>
                                <Button
                                    variant="outline"
                                    className="border-gray-700 hover:bg-gray-900 bg-black text-gray-300"
                                    onClick={isEnabled ? handleDisable : handleEnable}
                                    disabled={isEnabling || isDisabling}
                                >
                                    {isEnabling || isDisabling ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : isEnabled ? (
                                        <PowerOff className="w-4 h-4" />
                                    ) : (
                                        <Power className="w-4 h-4" />
                                    )}
                                </Button>

                                <Button
                                    variant="destructive"
                                    className="bg-red-600 hover:bg-red-700"
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                >
                                    {isDeleting ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Trash2 className="w-4 h-4" />
                                    )}
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                {/* Webhook URL */}
                {webhookUrl && (
                    <div className="mt-3 flex items-center gap-2 bg-gray-900 px-3 py-2 rounded border border-gray-700">
                        <LinkIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <code className="text-xs text-gray-300 flex-1 overflow-hidden text-ellipsis">
                            {webhookUrl}
                        </code>
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={handleCopyWebhook}
                            className="h-7 px-2 hover:bg-gray-800 text-gray-300"
                        >
                            {webhookCopied ? (
                                <Check className="w-3 h-3 text-green-400" />
                            ) : (
                                <Copy className="w-3 h-3" />
                            )}
                        </Button>
                    </div>
                )}
            </div>

            {!nodes.length && !isEditMode && (
                <TriggerSheet
                    onClose={() => { }}
                    onSelect={(type, metaData) => {
                        setNodes([{
                            id: Math.random().toString(),
                            type,
                            data: {
                                kind: 'trigger',
                                metaData,
                            },
                            position: { x: 250, y: 200 }
                        }]);
                        setHasUnsavedChanges(true);
                    }}
                />
            )}

            {selectAction && (
                <ActionSheet
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
                            id: Math.random().toString(),
                            source: selectAction.startingNodeId,
                            target: nodeId,
                        }]);
                        setSelectAction(null);
                        setHasUnsavedChanges(true);
                    }}
                    onClose={() => setSelectAction(null)}
                />
            )}

            {/* Canvas */}
            <div className="flex-1">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={nodeTypes}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onConnectEnd={(event, connectionInfo: any) => {
                        if (!connectionInfo.isValid) {
                            const sourceNode = nodes.find(n => n.id === connectionInfo.fromNode?.id);
                            if (sourceNode) {
                                setSelectAction({
                                    startingNodeId: connectionInfo.fromNode.id,
                                    position: {
                                        x: connectionInfo.fromNode.position.x + 300,
                                        y: connectionInfo.fromNode.position.y
                                    }
                                });
                            }
                        }
                    }}
                    fitView
                    className="bg-black"
                    defaultEdgeOptions={{
                        style: {
                            stroke: '#9ca3af',
                            strokeWidth: 2
                        },
                        animated: true,
                    }}
                >
                    <Background
                        color="#374151"
                        gap={20}
                        size={1}
                    />
                    <Controls />
                    <MiniMap
                        nodeColor={(n) => {
                            if (!n.data) return '#6b7280';
                            return n.data.kind === 'trigger' ? '#3b82f6' : '#10b981';
                        }}
                        maskColor="rgba(0, 0, 0, 0.7)"
                        nodeBorderRadius={8}
                        pannable
                        zoomable
                    />

                    <Panel position="top-left">
                        <Card className="bg-gray-900/90 border border-gray-700 p-3 shadow-lg backdrop-blur-sm">
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                <Info className="w-4 h-4 text-blue-400" />
                                Drag to connect nodes
                            </div>
                        </Card>
                    </Panel>
                </ReactFlow>
            </div>
        </div>
    );
}