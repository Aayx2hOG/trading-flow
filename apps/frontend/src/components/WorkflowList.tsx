import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { workflowApi, type Workflow } from '@/api/workflow.api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
    Plus,
    Trash2,
    Edit,
    Calendar,
    Loader2,
    AlertCircle,
    Link as LinkIcon,
    GitBranch,
    Workflow as WorkflowIcon,
    Network,
    Shield,
} from 'lucide-react';

export function WorkflowList() {
    const [workflows, setWorkflows] = useState<Workflow[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchWorkflows();
    }, []);

    const fetchWorkflows = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await workflowApi.getAll();
            setWorkflows(data);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch workflows';
            setError(errorMessage);
            console.error('Failed to fetch workflows:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteClick = async (workflowId: string, e: React.MouseEvent) => {
        e.stopPropagation();

        if (!window.confirm('Are you sure you want to delete this workflow? This action cannot be undone.')) {
            return;
        }

        setDeletingId(workflowId);

        try {
            await workflowApi.delete(workflowId);
            setWorkflows(workflows.filter((w) => w.id !== workflowId));
        } catch (err) {
            console.error('Delete error:', err);
            setError('Failed to delete workflow');
            setTimeout(() => setError(null), 3000);
        } finally {
            setDeletingId(null);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black">
                <div className="container mx-auto p-6 max-w-7xl">
                    <div className="mb-8">
                        <Skeleton className="h-10 w-64 mb-2 bg-gray-800" />
                        <Skeleton className="h-4 w-32 bg-gray-800" />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3].map((i) => (
                            <Skeleton key={i} className="h-64 bg-gray-800" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-background to-background">
            <div className="container mx-auto p-8 max-w-7xl">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-blue-500/10 rounded-xl border border-blue-500/20 shadow-[0_0_15px_-3px_rgba(59,130,246,0.5)]">
                                <WorkflowIcon className="w-8 h-8 text-blue-500" />
                            </div>
                            <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
                                Dashboard
                            </h1>
                        </div>
                        <p className="text-muted-foreground font-medium ml-13">
                            Manage your automated trading workflows and monitoring tasks.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button
                            onClick={() => navigate('/credentials')}
                            variant="outline"
                            size="lg"
                            className="h-12 px-6 gap-2 border-border/50 hover:bg-white/5 rounded-xl font-bold"
                        >
                            <Shield className="w-5 h-5" />
                            Credentials
                        </Button>
                        <Button
                            onClick={() => navigate('/workflow/new')}
                            size="lg"
                            className="h-12 px-6 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_-3px_rgba(59,130,246,0.6)] transition-all duration-300 rounded-xl font-bold"
                        >
                            <Plus className="w-5 h-5" />
                            New Automation
                        </Button>
                    </div>
                </div>

                {}
                <div className="flex items-center gap-4 mb-8 text-sm">
                    <Badge variant="outline" className="px-3 py-1 border-border bg-card/50 text-muted-foreground gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                        {workflows.length} Active Workflows
                    </Badge>
                </div>

                {/* Error display */}
                {error && (
                    <div className="mb-8 p-4 bg-destructive/10 border border-destructive/20 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
                        <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                        <p className="text-destructive text-sm font-medium">{error}</p>
                    </div>
                )}

                {}
                {workflows.length === 0 ? (
                    <Card className="text-center py-24 glass border-dashed bg-transparent border-border/50 rounded-2xl">
                        <CardContent>
                            <div className="relative inline-block mb-6">
                                <GitBranch className="w-20 h-20 text-muted-foreground/30 mx-auto" />
                                <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full"></div>
                            </div>
                            <h2 className="text-2xl font-bold mb-2">No active automations</h2>
                            <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
                                Get started by building a visual workflow to monitor prices or execute trades automatically.
                            </p>
                            <Button
                                onClick={() => navigate('/workflow/new')}
                                size="lg"
                                variant="secondary"
                                className="gap-2 h-12 rounded-xl px-8 font-bold border border-border"
                            >
                                <Plus className="w-5 h-5" />
                                Create Workflow
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {workflows.map((workflow) => (
                            <Card
                                key={workflow.id}
                                className="group relative overflow-hidden bg-card/40 border-border/50 hover:border-primary/50 hover:bg-card/60 transition-all duration-500 cursor-pointer rounded-2xl shadow-xl hover:shadow-primary/5 shadow-black/20"
                                onClick={() => navigate(`/workflow/${workflow.id}`)}
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="p-1.5 rounded-full bg-primary/10 text-primary">
                                        <Plus className="w-4 h-4 rotate-45" onClick={(e) => handleDeleteClick(workflow.id, e)}  />
                                    </div>
                                </div>

                                <CardHeader className="pb-4">
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <div className="p-1.5 bg-blue-500/10 rounded-lg text-blue-500">
                                                    <Network className="w-4 h-4" />
                                                </div>
                                                <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">
                                                    {workflow.name}
                                                </CardTitle>
                                            </div>
                                            <CardDescription className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                                                {workflow.description || "Visual trading automation for decentralized finance."}
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-6">
                                    <div className="flex items-center gap-3">
                                        <Badge variant="secondary" className="bg-blue-500/5 text-blue-400 border-blue-500/10 hover:bg-blue-500/10 transition-colors">
                                            {workflow.nodes?.length || 0} Nodes
                                        </Badge>
                                        <Badge variant="secondary" className="bg-indigo-500/5 text-indigo-400 border-indigo-500/10 hover:bg-indigo-500/10 transition-colors">
                                            Active Triggers
                                        </Badge>
                                        {workflow.webhookUrl && (
                                            <div className="p-1 rounded-md bg-green-500/10 text-green-500" title="Webhook Enabled">
                                                <LinkIcon className="w-3 h-3" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between text-[11px] text-muted-foreground uppercase tracking-widest font-semibold border-t border-border/50 pt-4">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(workflow.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary rounded-lg"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(`/workflow/${workflow.id}`);
                                                }}
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive rounded-lg"
                                                onClick={(e) => handleDeleteClick(workflow.id, e)}
                                                disabled={deletingId === workflow.id}
                                            >
                                                {deletingId === workflow.id ? (
                                                    <Loader2 className="w-3 h-3 animate-spin" />
                                                ) : (
                                                    <Trash2 className="w-4 h-4" />
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}