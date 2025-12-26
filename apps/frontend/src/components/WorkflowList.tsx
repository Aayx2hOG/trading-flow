import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { workflowApi, type Workflow } from '@/api/workflow.api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
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
            alert('Workflow deleted successfully');
        } catch (err) {
            alert('Failed to delete workflow');
            console.error('Delete error:', err);
        } finally {
            setDeletingId(null);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="container mx-auto p-6 max-w-7xl">
                    <div className="mb-8">
                        <Skeleton className="h-10 w-64 mb-2" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3].map((i) => (
                            <Skeleton key={i} className="h-64" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="container mx-auto p-6 max-w-7xl">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                            <WorkflowIcon className="w-10 h-10 text-blue-600" />
                            My Workflows
                        </h1>
                        <p className="text-muted-foreground">
                            {workflows.length} {workflows.length === 1 ? 'workflow' : 'workflows'}
                        </p>
                    </div>
                    <Button onClick={() => navigate('/workflow/new')} size="lg" className="gap-2 shadow-lg">
                        <Plus className="w-5 h-5" />
                        New Workflow
                    </Button>
                </div>

                {/* Error display */}
                {error && (
                    <Alert variant="destructive" className="mb-6">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {/* Empty state */}
                {workflows.length === 0 ? (
                    <Card className="text-center py-16 border-dashed border-2">
                        <CardContent className="pt-6">
                            <GitBranch className="w-20 h-20 text-muted-foreground mx-auto mb-6" />
                            <h2 className="text-2xl font-semibold text-gray-900 mb-2">No workflows yet</h2>
                            <p className="text-muted-foreground mb-6">
                                Get started by creating your first workflow automation
                            </p>
                            <Button onClick={() => navigate('/workflow/new')} size="lg" className="gap-2">
                                <Plus className="w-5 h-5" />
                                Create your first workflow
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {workflows.map((workflow) => (
                            <Card
                                key={workflow.id}
                                className="hover:shadow-xl transition-all hover:scale-[1.02] cursor-pointer group"
                                onClick={() => navigate(`/workflow/${workflow.id}`)}
                            >
                                <CardHeader>
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex-1">
                                            <CardTitle className="flex items-center gap-2 group-hover:text-blue-600 transition">
                                                <Network className="w-5 h-5" />
                                                Workflow
                                            </CardTitle>
                                            <CardDescription className="font-mono text-xs mt-1">
                                                #{workflow.id.slice(0, 8)}
                                            </CardDescription>
                                        </div>
                                        {workflow.webhookUrl && (
                                            <Badge variant="secondary" className="gap-1">
                                                <LinkIcon className="w-3 h-3" />
                                                Webhook
                                            </Badge>
                                        )}
                                    </div>
                                </CardHeader>

                                <CardContent>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                            <span className="text-sm font-medium">
                                                {workflow.nodes?.length || 0}
                                            </span>
                                            <span className="text-xs text-muted-foreground">nodes</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                            <span className="text-sm font-medium">
                                                {workflow.edges?.length || 0}
                                            </span>
                                            <span className="text-xs text-muted-foreground">edges</span>
                                        </div>
                                    </div>

                                    <Separator className="my-4" />

                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {new Date(workflow.createdAt).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })}
                                    </div>
                                </CardContent>

                                <CardFooter className="flex gap-2 pt-4">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1 gap-2"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/workflow/${workflow.id}`);
                                        }}
                                    >
                                        <Edit className="w-4 h-4" />
                                        Edit
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={(e) => handleDeleteClick(workflow.id, e)}
                                        disabled={deletingId === workflow.id}
                                    >
                                        {deletingId === workflow.id ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Trash2 className="w-4 h-4" />
                                        )}
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}