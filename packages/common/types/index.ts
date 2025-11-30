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
    nodes: z.array(z.object({
        nodeId: z.string(),
        data: z.object({
            kind: z.enum(['action', 'trigger']),
            metaData: z.any()
        }),
        id: z.string(),
        credentials: z.any(),
        position: z.object({
            x: z.number(),
            y: z.number()
        }),
    })),
    edges: z.array(z.object({
        id: z.string(),
        source: z.string(),
        target: z.string()
    }))
})