import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import { prismaClient } from 'db/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { CreateWorkflowSchema, SignInSchema, SignUpSchema } from 'common/types';
import { authMiddleware } from './middleware';

const app = express();
const JWT_SECRET = process.env.JWT_SECRET || '';

app.use(cors());
app.use(express.json());

app.post('/signup', async (req: Request, res: Response) => {
    try {
        const { success, data } = SignUpSchema.safeParse(req.body);
        if (!success) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const existingUser = await prismaClient.user.findUnique({ where: { email: data.email } });
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await prismaClient.user.create({
            data: {
                email: data.email,
                username: data.username,
                password: hashedPassword
            },
        });

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'default_secret');
        res.status(201).json({ userId: user.id, token });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/signin', async (req: Request, res: Response) => {
    const { success, data } = SignInSchema.safeParse(req.body);

    if (!success) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const user = await prismaClient.user.findUnique({ where: { email: data.email } });
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(data.password, user.password);
    if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET || 'default_secret');

    res.status(200).json({ userId: user.id, token });
});

app.post('/workflow', authMiddleware, async (req: Request, res: Response) => {
    const userId = req.userId;

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { success, data } = CreateWorkflowSchema.safeParse(req.body);

    if (!success) {
        return res.status(400).json({ error: 'Invalid workflow data' });
    }
    try {
        const workflow = await prismaClient.workflow.create({
            data: {
                user: {
                    connect: { id: userId }
                },
                nodes: {
                    create: data.nodes
                },
                edges: {
                    create: data.edges
                }
            }
        });
        res.status(201).json({ workflowId: workflow.id });
    } catch (error) {
        console.error('Workflow creation error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/workflow', authMiddleware, async (req: Request, res: Response) => {

});

app.put('/workflow/:workflowId', authMiddleware, async (req: Request, res: Response) => {

});

app.get('/workflow/executions/:workflowId', authMiddleware, async (req: Request, res: Response) => {
});

app.get('/nodes', async (req: Request, res: Response) => {

});

app.listen(process.env.PORT || 3000); 