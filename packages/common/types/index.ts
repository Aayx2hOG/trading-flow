import { z } from 'zod';

export const SignUpSchema = z.object({
    email: z.string().email('Invalid email address'),
    username: z.string().min(3, 'Username must be at least 3 characters long'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const SignInSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const CreateWorkflowSchema = z.object({
    name: z.string().min(3, 'Workflow name must be at least 3 characters long'),
    description: z.string().optional(),
    nodes: z.array(z.object({
        type: z.string(),
        data: z.object({
            kind: z.enum(['action', 'trigger']),
            metaData: z.any()
        }),
        credentials: z.any(),
        id: z.string(),
        position: z.object({
            x: z.number(),
            y: z.number()
        })
    })),
    edges: z.array(z.object({
        id: z.string(),
        source: z.string(),
        target: z.string()
    }))
});

export const updateWorkflowSchema = z.object({
    name: z.string().min(3, 'Workflow name must be at least 3 characters long').optional(),
    description: z.string().optional(),
    nodes: z.array(z.object({
        nodeId: z.string(),
        data: z.object({
            kind: z.enum(['action', 'trigger']),
            metaData: z.any()
        }).optional(),
        id: z.string(),
        credentials: z.any(),
        position: z.object({
            x: z.number(),
            y: z.number()
        }).optional(),
    })),
    edges: z.array(z.object({
        id: z.string(),
        source: z.string(),
        target: z.string()
    }))
})

export interface ActionResult {
    success: boolean;
    data?: any;
    error?: string;
}

export interface ActionCredentials {
    [key: string]: string;
}

export interface ActionMetadata {
    [key: string]: any;
}

export interface IAction {
    execute(credentials: ActionCredentials, metadata: ActionMetadata, inputData?: any): Promise<ActionResult>;
}

export interface WorkflowExecution {
    id: string;
    workflowId: string;
    status: 'success' | 'failure' | 'running' | 'cancelled';
    startedAt: string;
    finishedAt?: string;
    duration?: number;
    triggeredBy: 'manual' | 'schedule' | 'webhook' | 'price-trigger' | 'timer-trigger';
    error?: {
        message: string;
        step?: string;
        code?: string
    };
    executionLogs: ExecutionLog[];
    metaData?: Record<string, any>;
}

export interface ExecutionLog {
    id: string;
    timestamp: string;
    nodeId: string;
    nodeName: string;
    level: 'info' | 'warning' | 'error' | 'debug';
    message: string;
    data?: Record<string, any>;
}
export interface WorkflowStats {
    totalExecutions: number;
    successCount: number;
    failureCount: number;
    successRate: number;
    averageDuration: number;
    lastExecutedAt?: string;
}

export interface Workflow {
    id: string;
    name: string;
    description?: string;
    userId: string;
    nodes: any[];
    edges: any[];
    isEnabled: boolean;
    webhookUrl?: string;
    createdAt: string;
    updatedAt: string;
    stats?: WorkflowStats;
}

export type CreateWorkflowInput = z.infer<typeof CreateWorkflowSchema>;
export type UpdateWorkflowInput = z.infer<typeof updateWorkflowSchema>;
export type SignUpInput = z.infer<typeof SignUpSchema>;
export type SignInInput = z.infer<typeof SignInSchema>;