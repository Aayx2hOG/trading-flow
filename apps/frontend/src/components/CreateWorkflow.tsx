// src/components/CreateWorkflow.tsx
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
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import {
    Save,
    Trash2,
    Play,
    Power,
    PowerOff,
    AlertCircle,
    ArrowLeft,
    Copy,
    Check,
    Loader2,
    Link as LinkIcon,
    Info,
    CheckCircle2,
    XCircle,
} from 'lucide-react';

const nodeTypes = {
    'price-trigger': PriceTrigger,
    'timer-trigger': TimerTrigger,
    'webhook-trigger': WebhookTrigger,
    'lighter': Lighter,
    'backpack': Backpack,
    'hyperliquid': Hyperliquid,
};

export type NodeKind =
    | 'price-trigger'
    | 'timer-trigger'
    | 'webhook-trigger'
    | 'hyperliquid'
    | 'backpack'
    | 'lighter';

export type NodeMetaData = TradingMetadata | PriceTriggerMetaData | TimerNodeMetaData;

interface NodeType {
    type: NodeKind;
    data: {
        kind: 'action' | 'trigger';
        metaData: NodeMetaData;
    };
    id: string;
    position: { x: number; y: number };
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

    // Workflow state
    const [nodes, setNodes] = useState<NodeType[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const [selectAction, setSelectAction] = useState<{
        position: { x: number; y: number };
        startingNodeId: string;
    } | null>(null);

    // UI state
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

    // Load workflow if editing
    useEffect(() => {
        if (workflowId) {
            loadWorkflow();
        }
    }, [workflowId]);

    const loadWorkflow = async () => {
        if (!workflowId) return;

        setIsLoading(true);

        try {
            const workflow = await workflowApi.getById(workflowId);
            setNodes(workflow.nodes || []);
            setEdges(workflow.edges || []);
            setHasUnsavedChanges(false);

            // Load webhook URL if exists
            if (workflow.webhookUrl) {
                try {
                    const webhook = await workflowApi.getWebhook(workflowId);
                    setWebhookUrl(webhook.webhookUrl);
                    setIsEnabled(true);
                } catch (err) {
                    console.log('No webhook configured');
                }
            }

            console.log('Workflow loaded successfully');
        } catch (err) {
            alert('Failed to load workflow: ' + (err instanceof Error ? err.message : 'Unknown error occurred'));
            console.error('Load workflow error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Save workflow
    const handleSave = async () => {
        if (!nodes.length) {
            alert('Cannot save empty workflow. Add at least one node to save the workflow');
            return;
        }

        setIsSaving(true);
        try {
            if (isEditMode && workflowId) {
                await workflowApi.update(workflowId, { nodes, edges });
                setHasUnsavedChanges(false);
                alert('Workflow saved successfully');
            } else {
                const result = await workflowApi.create({ nodes, edges });
                setHasUnsavedChanges(false);
                navigate(`/workflow/${result.workflowId}`, { replace: true });
                alert('Workflow created successfully');
            }
        } catch (err) {
            alert('Failed to save workflow: ' + (err instanceof Error ? err.message : 'Unknown error'));
        } finally {
            setIsSaving(false);
        }
    };

    // Delete workflow
    const handleDelete = async () => {
        if (!workflowId) return;

        if (!window.confirm('Are you sure you want to delete this workflow? This action cannot be undone.')) {
            return;
        }

        setIsDeleting(true);

        try {
            await workflowApi.delete(workflowId);
            navigate('/workflows');
            alert('Workflow deleted successfully');
        } catch (err) {
            alert('Failed to delete workflow: ' + (err instanceof Error ? err.message : 'Unknown error'));
        } finally {
            setIsDeleting(false);
        }
    };

    // Execute workflow
    const handleExecute = async () => {
        if (!workflowId) {
            alert('Cannot execute. Please save the workflow first');
            return;
        }

        setIsExecuting(true);

        try {
            const result = await workflowApi.execute(workflowId);
            alert(`Workflow executed! ID: ${result.executionId.slice(0, 8)}...`);
        } catch (err) {
            alert('Failed to execute workflow: ' + (err instanceof Error ? err.message : 'Unknown error'));
        } finally {
            setIsExecuting(false);
        }
    };

    // Enable workflow
    const handleEnable = async () => {
        if (!workflowId) {
            alert('Cannot enable. Please save the workflow first');
            return;
        }

        setIsEnabling(true);

        try {
            await workflowApi.enable(workflowId);

            alert('Workflow enabled successfully');
            setIsEnabled(true);

            const hasWebhookTrigger = nodes.some((n) => n.type === 'webhook-trigger');
            if (hasWebhookTrigger) {
                try {
                    const webhook = await workflowApi.getWebhook(workflowId);
                    setWebhookUrl(webhook.webhookUrl);
                } catch (err) {
                    console.log('No webhook URL available');
                }
            }
        } catch (err) {
            alert('Failed to enable workflow: ' + (err instanceof Error ? err.message : 'Unknown error occurred'));
        } finally {
            setIsEnabling(false);
        }
    };

    // Disable workflow
    const handleDisable = async () => {
        if (!workflowId) return;

        setIsDisabling(true);

        try {
            await workflowApi.disable(workflowId);
            alert('Workflow disabled successfully');
            setIsEnabled(false);
        } catch (err) {
            alert('Failed to disable workflow: ' + (err instanceof Error ? err.message : 'Unknown error occurred'));
        } finally {
            setIsDisabling(false);
        }
    };

    // Copy webhook URL
    const handleCopyWebhook = async () => {
        if (!webhookUrl) return;

        try {
            await navigator.clipboard.writeText(webhookUrl);
            setWebhookCopied(true);
            setTimeout(() => setWebhookCopied(false), 2000);
            console.log('Webhook URL copied to clipboard');
        } catch (err) {
            alert('Failed to copy webhook URL');
        }
    };

    const onNodesChange = useCallback((changes: NodeChange[]) => {
        setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot) as NodeType[]);
        setHasUnsavedChanges(true);
    }, []);

    const onEdgesChange = useCallback((changes: EdgeChange[]) => {
        setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot));
        setHasUnsavedChanges(true);
    }, []);

    const onConnect = useCallback((params: Connection) => {
        setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot));
        setHasUnsavedChanges(true);
    }, []);

    const POSITION_OFFSET = 200;
    const onConnectEnd = useCallback(
        (_params: any, connectionInfo: any) => {
            if (!connectionInfo.isValid) {
                setSelectAction({
                    startingNodeId: connectionInfo.fromNode.id,
                    position: {
                        x: connectionInfo.fromNode.position.x + POSITION_OFFSET,
                        y: connectionInfo.fromNode.position.y,
                    },
                });
            }
        },
        []
    );

    // Warn before leaving with unsaved changes
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (hasUnsavedChanges) {
                e.preventDefault();
                e.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [hasUnsavedChanges]);

    // Auto-save
    useEffect(() => {
        if (!hasUnsavedChanges || !workflowId || !nodes.length) return;

        const autoSaveTimer = setTimeout(() => {
            handleSave();
        }, 10000);

        return () => clearTimeout(autoSaveTimer);
    }, [hasUnsavedChanges, nodes, edges, workflowId]);

    if (isLoading) {
        return (
            <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <Card className="p-8">
                    <div className="text-center">
                        <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
                        <p className="text-gray-600 text-lg font-medium">Loading workflow...</p>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="w-screen h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Top Toolbar */}
            <div className="bg-white border-b shadow-sm px-4 py-3 z-10">
                <div className="flex items-center justify-between">
                    {/* Left side */}
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                                if (hasUnsavedChanges) {
                                    if (
                                        confirm('You have unsaved changes. Are you sure you want to leave?')
                                    ) {
                                        navigate('/workflows');
                                    }
                                } else {
                                    navigate('/workflows');
                                }
                            }}
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                        </Button>
                        <Separator orientation="vertical" className="h-6" />
                        <div>
                            <h1 className="text-lg font-semibold text-gray-900">
                                {isEditMode ? 'Edit Workflow' : 'Create Workflow'}
                            </h1>
                            <p className="text-xs text-muted-foreground">
                                {nodes.length} nodes • {edges.length} connections
                            </p>
                        </div>
                    </div>

                    {/* Right side - Actions */}
                    <div className="flex items-center gap-2">
                        {isEditMode && (
                            <Badge variant="outline" className={isEnabled ? 'gap-1.5 bg-emerald-50 text-emerald-700 border-emerald-200' : 'gap-1.5 bg-gray-100 text-gray-600 border-gray-200'}>
                                <AlertCircle className="w-3 h-3" />
                                {isEnabled ? 'Enabled' : 'Disabled'}
                            </Badge>
                        )}
                        {hasUnsavedChanges && (
                            <Badge variant="outline" className="gap-1.5 bg-orange-50 text-orange-700 border-orange-200">
                                <AlertCircle className="w-3 h-3" />
                                Unsaved changes
                            </Badge>
                        )}

                        <Button
                            onClick={handleSave}
                            disabled={isSaving || (!hasUnsavedChanges && isEditMode) || !nodes.length}
                            size="sm"
                            className="gap-2"
                        >
                            {isSaving ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Save className="w-4 h-4" />
                            )}
                            {isSaving ? 'Saving...' : isEditMode ? 'Save' : 'Create'}
                        </Button>

                        {isEditMode && (
                            <>
                                <Button
                                    onClick={handleExecute}
                                    disabled={isExecuting}
                                    size="sm"
                                    variant="outline"
                                    className="gap-2"
                                >
                                    {isExecuting ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Play className="w-4 h-4" />
                                    )}
                                    Run
                                </Button>

                                {!isEnabled ? (
                                    <Button
                                        onClick={handleEnable}
                                        disabled={isEnabling}
                                        size="sm"
                                        variant="outline"
                                        className="gap-2"
                                    >
                                        {isEnabling ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Power className="w-4 h-4" />
                                        )}
                                        Enable
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={handleDisable}
                                        disabled={isDisabling}
                                        size="sm"
                                        variant="outline"
                                        className="gap-2"
                                    >
                                        {isDisabling ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <PowerOff className="w-4 h-4" />
                                        )}
                                        Disable
                                    </Button>
                                )}

                                <Button
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    size="sm"
                                    variant="destructive"
                                    className="gap-2"
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
            </div>

            {/* Webhook URL Card */}
            {webhookUrl && (
                <div className="px-4 pt-4">
                    <Alert className="border-blue-200 bg-blue-50">
                        <LinkIcon className="h-4 w-4 text-blue-600" />
                        <AlertDescription className="flex items-center justify-between">
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-blue-900 mb-1">Webhook URL</p>
                                <code className="text-xs text-blue-700 bg-blue-100 px-2 py-1 rounded block break-all">
                                    {webhookUrl}
                                </code>
                            </div>
                            <Button
                                onClick={handleCopyWebhook}
                                size="sm"
                                variant="outline"
                                className="ml-4 gap-2 shrink-0"
                            >
                                {webhookCopied ? (
                                    <>
                                        <Check className="w-4 h-4" />
                                        Copied
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-4 h-4" />
                                        Copy
                                    </>
                                )}
                            </Button>
                        </AlertDescription>
                    </Alert>
                </div>
            )}

            {/* React Flow Canvas */}
            <div className="flex-1 relative">
                {!nodes.length && !isEditMode && (
                    <TriggerSheet
                        onClose={() => { }}
                        onSelect={(type, metaData) => {
                            setNodes([
                                {
                                    id: Math.random().toString(),
                                    type,
                                    data: {
                                        kind: 'trigger',
                                        metaData,
                                    },
                                    position: { x: 250, y: 150 },
                                },
                            ]);
                            setHasUnsavedChanges(true);
                        }}
                    />
                )}

                {selectAction && (
                    <ActionSheet
                        onSelect={(type, metaData) => {
                            const nodeId = Math.random().toString();
                            setNodes([
                                ...nodes,
                                {
                                    id: nodeId,
                                    type,
                                    data: {
                                        kind: 'action',
                                        metaData,
                                    },
                                    position: selectAction.position,
                                },
                            ]);
                            setEdges([
                                ...edges,
                                {
                                    id: `${selectAction.startingNodeId}-${nodeId}`,
                                    source: selectAction.startingNodeId,
                                    target: nodeId,
                                },
                            ]);
                            setSelectAction(null);
                            setHasUnsavedChanges(true);
                        }}
                        onClose={() => setSelectAction(null)}
                    />
                )}

                <ReactFlow
                    nodeTypes={nodeTypes}
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onConnectEnd={onConnectEnd}
                    fitView
                    className="bg-gray-50"
                >
                    <Background color="#e5e7eb" gap={16} size={1} />
                    <Controls />
                    <MiniMap
                        nodeColor={(node) => {
                            if (node.data.kind === 'trigger') return '#3b82f6';
                            if (node.data.kind === 'action') return '#10b981';
                            return '#6b7280';
                        }}
                        className="border-2 border-gray-200 rounded-lg shadow-lg"
                    />

                    <Panel position="top-left" className="m-4">
                        <Card className="p-4 shadow-lg">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 mb-3">
                                    <Info className="w-4 h-4 text-blue-600" />
                                    <h3 className="font-semibold text-sm">Quick Tips</h3>
                                </div>
                                <div className="text-xs text-muted-foreground space-y-1.5">
                                    <p>• Drag from nodes to connect them</p>
                                    <p>• Select and press Delete to remove</p>
                                    <p>• Drag canvas to pan around</p>
                                    <p>• Scroll to zoom in/out</p>
                                </div>
                            </div>
                        </Card>
                    </Panel>
                </ReactFlow>
            </div>
        </div>
    );
}