import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { workflowApi, type Workflow } from '@/api/workflow.api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
        <div className="min-h-screen bg-black text-gray-100">
            <div className="container mx-auto p-6 max-w-7xl">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-100 mb-2 flex items-center gap-3">
                            <WorkflowIcon className="w-10 h-10 text-blue-500" />
                            My Workflows
                        </h1>
                        <p className="text-gray-400">
                            {workflows.length} {workflows.length === 1 ? 'workflow' : 'workflows'}
                        </p>
                    </div>
                    <Button
                        onClick={() => navigate('/workflow/new')}
                        size="lg"
                        className="gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                    >
                        <Plus className="w-5 h-5" />
                        New Workflow
                    </Button>
                </div>

                {/* Error display */}
                {error && (
                    <div className="mb-6 p-4 bg-red-900/20 border border-red-800 rounded-lg flex items-center gap-3">
                        <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                        <p className="text-red-300 text-sm">{error}</p>
                    </div>
                )}

                {/* Empty state */}
                {workflows.length === 0 ? (
                    <Card className="text-center py-16 border-dashed border-2 bg-gray-900/50 border-gray-700">
                        <CardContent className="pt-6">
                            <GitBranch className="w-20 h-20 text-gray-600 mx-auto mb-6" />
                            <h2 className="text-2xl font-semibold text-gray-100 mb-2">No workflows yet</h2>
                            <p className="text-gray-400 mb-6">
                                Get started by creating your first workflow automation
                            </p>
                            <Button
                                onClick={() => navigate('/workflow/new')}
                                size="lg"
                                className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                            >
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
                                className="bg-gray-900 border-gray-800 hover:bg-gray-800 hover:shadow-2xl hover:shadow-blue-900/20 transition-all hover:scale-[1.02] cursor-pointer group"
                                onClick={() => navigate(`/workflow/${workflow.id}`)}
                            >
                                <CardHeader>
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex-1">
                                            <CardTitle className="flex items-center gap-2 text-gray-100 group-hover:text-blue-400 transition">
                                                <Network className="w-5 h-5" />
                                                Workflow
                                            </CardTitle>
                                            <CardDescription className="font-mono text-xs mt-1 text-gray-500">
                                                #{workflow.id.slice(0, 8)}
                                            </CardDescription>
                                        </div>
                                        {workflow.webhookUrl && (
                                            <Badge variant="secondary" className="gap-1 bg-gray-800 text-gray-300 border-gray-700">
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
                                            <span className="text-sm font-medium text-gray-200">
                                                {workflow.nodes?.length || 0}
                                            </span>
                                            <span className="text-xs text-gray-500">nodes</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                            <span className="text-sm font-medium text-gray-200">
                                                {workflow.edges?.length || 0}
                                            </span>
                                            <span className="text-xs text-gray-500">edges</span>
                                        </div>
                                    </div>

                                    <Separator className="my-4 bg-gray-800" />

                                    <div className="flex items-center gap-2 text-xs text-gray-500">
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
                                        className="flex-1 gap-2 bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-gray-100"
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
                                        className="bg-red-600 hover:bg-red-700"
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