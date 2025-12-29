import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, XCircle, Clock, RefreshCw, ArrowLeft, AlertCircle } from 'lucide-react';
import { workflowApi, type Execution } from '@/api/workflow.api';

export default function ExecutionHistory() {
  const { workflowId } = useParams();
  const navigate = useNavigate();
  const [executions, setExecutions] = useState<Execution[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (workflowId) {
      fetchExecutions();
    }
  }, [workflowId]);

  const fetchExecutions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await workflowApi.getExecutions(workflowId!);
      if (Array.isArray(data)) {
        setExecutions(data);
      } else {
        setExecutions([]);
      }
    } catch (error) {
      console.error('Failed to fetch executions:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch executions');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'FAILURE':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getDuration = (start: string, end: string | null) => {
    if (!end) return 'Running...';
    const duration = new Date(end).getTime() - new Date(start).getTime();
    return `${(duration / 1000).toFixed(2)}s`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/10 via-background to-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="h-10 w-10 p-0 hover:bg-white/5 rounded-xl transition-all"
              onClick={() => navigate(`/workflow/${workflowId}`)}
            >
              <ArrowLeft className="w-5 h-5 text-muted-foreground hover:text-foreground" />
            </Button>
            <div>
                <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
                    Execution Logs
                </h1>
                <p className="text-muted-foreground font-medium mt-1">Monitor the performance and reliability of your automation.</p>
            </div>
          </div>
          <Button
            onClick={fetchExecutions}
            className="h-11 px-6 gap-2 bg-white/5 hover:bg-white/10 text-foreground border border-white/10 rounded-xl font-bold transition-all shadow-lg"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh Data
          </Button>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-destructive/10 border border-destructive/20 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
            <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
            <p className="text-destructive text-sm font-medium">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          {Array.isArray(executions) && executions.map((execution) => (
            <Card
              key={execution.id}
              className="group glass border-white/5 hover:border-white/10 bg-card/40 hover:bg-card/60 transition-all duration-300 rounded-2xl overflow-hidden"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-4">
                    <div className={`p-2 rounded-xl bg-opacity-10 ${execution.status === 'SUCCESS' ? 'bg-green-500 text-green-500 shadow-[0_0_15px_-3px_rgba(34,197,94,0.4)]' : 'bg-red-500 text-red-500 shadow-[0_0_15px_-3px_rgba(239,68,68,0.4)]'}`}>
                        {getStatusIcon(execution.status)}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground/50">Run ID</span>
                        <span className="font-mono text-sm font-semibold tracking-tight">
                            {execution.id}
                        </span>
                    </div>
                  </CardTitle>
                  <Badge
                    className={`px-3 py-1 rounded-lg font-bold text-[10px] uppercase tracking-wider border-none ${
                      execution.status === 'SUCCESS'
                        ? 'bg-green-500/10 text-green-400'
                        : 'bg-red-500/10 text-red-400'
                    }`}
                  >
                    {execution.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-2">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/40">Timestamp</p>
                    <p className="text-sm font-medium">
                      {new Date(execution.startTime).toLocaleString(undefined, { 
                        dateStyle: 'medium', 
                        timeStyle: 'medium' 
                      })}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/40">Finished</p>
                    <p className="text-sm font-medium">
                      {execution.endTime
                        ? new Date(execution.endTime).toLocaleTimeString()
                        : <span className="text-blue-400 animate-pulse">In Progress...</span>}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/40">Duration</p>
                    <p className="text-sm font-mono font-bold text-primary">
                      {getDuration(execution.startTime, execution.endTime)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {(!executions || executions.length === 0) && !error && (
            <Card className="glass border-dashed bg-transparent border-white/10 py-24 text-center rounded-3xl">
              <CardContent>
                <Clock className="w-16 h-16 text-muted-foreground/20 mx-auto mb-6" />
                <h3 className="text-xl font-bold mb-2">No data recorded</h3>
                <p className="text-muted-foreground max-w-xs mx-auto">
                    This workflow hasn't been executed yet. Triggers will appear here once they fire.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}