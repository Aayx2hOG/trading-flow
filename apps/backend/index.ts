import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import { prismaClient } from 'db/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { CreateWorkflowSchema, SignInSchema, SignUpSchema } from 'common/types';
import { authMiddleware } from './middleware';
import { WorkflowExecutor } from './services/workflow.service';
import { TriggerService } from './services/trigger.service';

const app = express();
const JWT_SECRET = process.env.JWT_SECRET || '';
const workflowExecutor = new WorkflowExecutor();
const triggerService = new TriggerService();

triggerService.startAllTriggers().catch(err => {
    console.error('Error starting triggers:', err);
});

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
                nodes: data.nodes,
                edges: data.edges
            }
        });
        res.status(201).json({ workflowId: workflow.id });
    } catch (error) {
        console.error('Workflow creation error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/workflow/:workflowId', authMiddleware, async (req: Request, res: Response) => {
    const { success, data } = CreateWorkflowSchema.safeParse(req.body);
    if (!success) {
        return res.status(400).json({ error: 'Invalid workflow data' });
    }

    try {
        const workflow = await prismaClient.workflow.update({
            where: { id: req.params.workflowId },
            data: {
                nodes: data.nodes,
                edges: data.edges
            }
        });
        res.status(200).json({ workflowId: workflow.id });
    } catch (error) {
        console.error('Workflow update error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/workflows', authMiddleware, async (req: Request, res: Response) => {
    const workflows = await prismaClient.workflow.findMany({
        where: { userId: req.userId }
    });
    res.json(workflows);
});

app.get('/workflow/:workflowId', authMiddleware, async (req: Request, res: Response) => {
    const workflow = await prismaClient.workflow.findUnique({
        where: { id: req.params.workflowId }
    });
    if (!workflow || workflow.userId.toString() !== req.userId) {
        return res.status(404).json({ error: 'Workflow not found' });
    }
    res.json(workflow);
});

app.get('/workflow/executions/:workflowId', authMiddleware, async (req: Request, res: Response) => {
    const workflow = await prismaClient.workflow.findUnique({
        where: { id: req.params.workflowId },
        include: { executions: true }
    });

    if (!workflow || workflow.userId !== req.userId) {
        return res.status(404).json({ error: 'Workflow not found' });
    }

    res.json(workflow.executions);
});

app.post('/workflow/:workflowId/execute', authMiddleware, async (req: Request, res: Response) => {
    try {
        const { workflowId } = req.params;
        const workflow = await prismaClient.workflow.findUnique({
            where: { id: workflowId },
        });
        if (!workflow || workflow.userId !== req.userId) {
            return res.status(404).json({ error: 'Workflow not found' });
        }

        const executionId = await workflowExecutor.executeWorkflowById(
            workflowId!,
            req.body.triggerData
        );

        res.json({ executionId, status: 'success' });
    } catch (e) {
        res.status(500).json({ error: 'Workflow execution failed' });
    }
});

app.post('/workflow/:workflowId/enable', authMiddleware, async (req: Request, res: Response) => {
    try {
        const { workflowId } = req.params;
        const worklow = await prismaClient.workflow.findUnique({
            where: { id: workflowId },
        });
        if (!worklow || worklow.userId !== req.userId) {
            return res.status(404).json({ error: 'Workflow not found' });
        }
        await triggerService.startWorkflowTrigger(workflowId!);
        res.json({ status: 'Workflow enabled' });
    } catch (e) {
        res.status(500).json({ error: 'Enabling workflow failed' });
    }
});

app.post('/workflow/:workflowId/disable', authMiddleware, async (req: Request, res: Response) => {
    try {
        const { workflowId } = req.params;
        const workflow = await prismaClient.workflow.findUnique({
            where: { id: workflowId },
        });
        if (!workflow || workflow.userId !== req.userId) {
            return res.status(404).json({ error: 'Workflow not found' });
        }
        triggerService.stopWorkflowTriggers(workflowId!);
        res.json({ status: 'Workflow disabled' });
    } catch (e) {
        res.status(500).json({ error: 'Disabling workflow failed' });
    }
});

app.get('/execution/:executionId', authMiddleware, async (req: Request, res: Response) => {
    try {
        const execution = await prismaClient.execution.findUnique({
            where: { id: req.params.executionId },
            include: { workflow: true }
        });
        if (!execution || execution.workflow.userId !== req.userId) {
            return res.status(404).json({ error: 'Execution not found' });
        }
        res.json(execution);
    } catch (e) {
        res.status(500).json({ error: 'Fetching execution failed' });
    }
});

process.on('SIGTERM', () => {
    triggerService.stopAllTriggers();
    process.exit(0);
});

app.listen(process.env.PORT || 3000); 