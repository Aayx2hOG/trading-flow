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
import { Condition } from '@/nodes/actions/Condition';
import { Email } from '@/nodes/actions/Email';
import { Jupiter } from '@/nodes/actions/Jupiter';

import { workflowApi } from '@/api/workflow.api';
import type { PriceTriggerMetaData, TimerNodeMetaData, TradingMetadata, JupiterSwapMetaData } from 'common/types';
import type { ConditionMetaData } from '@/nodes/actions/Condition';

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
    Clock,
} from 'lucide-react';

const nodeTypes = {
    'price-trigger': PriceTrigger,
    'timer-trigger': TimerTrigger,
    'webhook-trigger': WebhookTrigger,
    lighter: Lighter,
    backpack: Backpack,
    hyperliquid: Hyperliquid,
    condition: Condition,
    email: Email,
    'jupiter-swap': Jupiter,
};

export type NodeKind =
    | 'price-trigger'
    | 'timer-trigger'
    | 'webhook-trigger'
    | 'hyperliquid'
    | 'backpack'
    | 'lighter'
    | 'condition'
    | 'email'
    | 'jupiter-swap';

export type NodeMetaData =
    | TradingMetadata
    | PriceTriggerMetaData
    | TimerNodeMetaData
    | ConditionMetaData
    | JupiterSwapMetaData;

interface NodeType {
    id: string;
    type: NodeKind;
    position: { x: number; y: number };
    data: {
        kind: 'trigger' | 'action';
        metaData: NodeMetaData;
    };
    credentials?: { refId: string };
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
    const [workflowName, setWorkflowName] = useState('untitled workflow');
    const [workflowDescription, setWorkflowDescription] = useState('');
    const [isEnabling, setIsEnabling] = useState(false);
    const [isDisabling, setIsDisabling] = useState(false);

    const [isEnabled, setIsEnabled] = useState(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    const [webhookUrl, setWebhookUrl] = useState<string | null>(null);
    const [webhookCopied, setWebhookCopied] = useState(false);
    const [editingNode, setEditingNode] = useState<NodeType | null>(null);

    const onNodeClick = useCallback((_event: React.MouseEvent, node: any) => {
        setEditingNode(node as NodeType);
    }, []);

    useEffect(() => {
        if (workflowId) loadWorkflow();
    }, [workflowId]);

    
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
            setNodes((workflow.nodes as NodeType[]) || []);
            setEdges(workflow.edges || []);
            setHasUnsavedChanges(false);
            setWorkflowName(workflow.name || "untitled workflow");
            setWorkflowDescription(workflow.description || "");

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
                await workflowApi.update(workflowId!, { nodes, edges, name: workflowName, description: workflowDescription });
            } else {
                const res = await workflowApi.create({ nodes, edges, name: workflowName, description: workflowDescription });
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
        <div className="w-screen h-screen flex flex-col bg-background text-foreground overflow-hidden">
            {}
            <header className="sticky top-0 z-50 glass border-b border-white/5 px-6 py-4">
                <div className="flex justify-between items-center max-w-[2000px] mx-auto">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-9 w-9 p-0 hover:bg-white/5 rounded-xl transition-all"
                                onClick={() => navigate('/workflows')}
                            >
                                <ArrowLeft className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                            </Button>
                            <Separator orientation="vertical" className="h-6 bg-white/10" />
                        </div>

                        <div className="flex flex-col min-w-[250px]">
                            <input
                                type="text"
                                value={workflowName}
                                onChange={(e) => {
                                    setWorkflowName(e.target.value);
                                    setHasUnsavedChanges(true);
                                }}
                                className="bg-transparent border-none text-foreground font-bold text-lg focus:outline-none focus:ring-0 p-0 placeholder:text-muted-foreground/50"
                                placeholder="Untitled Workflow"
                            />
                            <input
                                type="text"
                                value={workflowDescription}
                                onChange={(e) => {
                                    setWorkflowDescription(e.target.value);
                                    setHasUnsavedChanges(true);
                                }}
                                className="bg-transparent border-none text-muted-foreground text-xs focus:outline-none focus:ring-0 p-0 font-medium placeholder:text-muted-foreground/30"
                                placeholder="Add a description for this automation..."
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {hasUnsavedChanges && (
                            <Badge className="bg-orange-500/10 text-orange-400 border-none px-3 py-1 animate-pulse font-bold text-[10px] uppercase tracking-wider">
                                Unsaved Changes
                            </Badge>
                        )}

                        <div className="flex items-center bg-white/5 rounded-2xl p-1 border border-white/5">
                            <Button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="h-9 px-4 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl shadow-[0_0_15px_-3px_rgba(59,130,246,0.4)] transition-all"
                            >
                                {isSaving ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <Save className="w-4 h-4" />
                                        <span>Save</span>
                                    </div>
                                )}
                            </Button>

                            {isEditMode && (
                                <div className="flex items-center">
                                    <Separator orientation="vertical" className="h-5 mx-1 bg-white/10" />
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-9 px-3 text-muted-foreground hover:text-foreground gap-2 font-medium"
                                        onClick={() => navigate(`/workflow/${workflowId}/execution`)}
                                    >
                                        <Clock className="w-4 h-4" />
                                        <span>History</span>
                                    </Button>
                                    
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className={`h-9 px-3 gap-2 font-medium transition-colors ${isEnabled ? 'text-green-500 hover:text-green-400' : 'text-muted-foreground hover:text-foreground'}`}
                                        onClick={isEnabled ? handleDisable : handleEnable}
                                        disabled={isEnabling || isDisabling}
                                    >
                                        {isEnabling || isDisabling ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : isEnabled ? (
                                            <><Power className="w-4 h-4" /> Running</>
                                        ) : (
                                            <><PowerOff className="w-4 h-4" /> Stopped</>
                                        )}
                                    </Button>

                                    <Separator orientation="vertical" className="h-5 mx-1 bg-white/10" />
                                    
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-9 w-9 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all"
                                        onClick={handleDelete}
                                        disabled={isDeleting}
                                    >
                                        {isDeleting ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Trash2 className="w-4 h-4" />
                                        )}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Webhook URL Tray */}
                {webhookUrl && (
                    <div className="max-w-[2000px] mx-auto mt-4 px-2">
                        <div className="flex items-center gap-3 bg-blue-500/5 px-4 py-2.5 rounded-xl border border-blue-500/10 animate-in fade-in slide-in-from-top-2">
                            <div className="p-1.5 bg-blue-500/20 rounded-lg">
                                <LinkIcon className="w-4 h-4 text-blue-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[10px] uppercase tracking-widest font-bold text-blue-400 mb-0.5">Webhook Endpoint</p>
                                <code className="text-sm text-gray-300 block truncate font-mono">
                                    {webhookUrl}
                                </code>
                            </div>
                            <Button
                                size="sm"
                                variant="secondary"
                                onClick={handleCopyWebhook}
                                className="h-9 px-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-gray-300 gap-2 transition-all"
                            >
                                {webhookCopied ? (
                                    <><Check className="w-4 h-4 text-green-400" /> Copied</>
                                ) : (
                                    <><Copy className="w-4 h-4" /> Copy URL</>
                                )}
                            </Button>
                        </div>
                    </div>
                )}
            </header>

            {editingNode && editingNode.data.kind === 'trigger' && (
                <TriggerSheet
                    initialType={editingNode.type}
                    initialMetaData={editingNode.data.metaData}
                    onClose={() => setEditingNode(null)}
                    onSelect={(type, metaData) => {
                        setNodes(nds => nds.map(n => 
                            n.id === editingNode.id 
                                ? { ...n, type, data: { ...n.data, metaData } } 
                                : n
                        ));
                        setEditingNode(null);
                        setHasUnsavedChanges(true);
                    }}
                />
            )}

            {editingNode && editingNode.data.kind === 'action' && (
                <ActionSheet
                    initialType={editingNode.type}
                    initialMetaData={editingNode.data.metaData}
                    onClose={() => setEditingNode(null)}
                    onSelect={(type, metaData) => {
                        const { credentialRefId, ...cleanMetaData } = metaData as any;
                        setNodes(nds => nds.map(n => 
                            n.id === editingNode.id 
                                ? { 
                                    ...n, 
                                    type, 
                                    data: { ...n.data, metaData: cleanMetaData },
                                    credentials: credentialRefId ? { refId: credentialRefId } : undefined
                                  } 
                                : n
                        ));
                        setEditingNode(null);
                        setHasUnsavedChanges(true);
                    }}
                />
            )}

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
                        const { credentialRefId, ...cleanMetaData } = metaData as any;
                        setNodes([...nodes, {
                            id: nodeId,
                            type,
                            data: {
                                kind: 'action',
                                metaData: cleanMetaData,
                            },
                            credentials: credentialRefId ? { refId: credentialRefId } : undefined,
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
                    onNodeClick={onNodeClick}
                    onConnectEnd={(_event, connectionInfo: any) => {
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