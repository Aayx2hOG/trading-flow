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
import { CredentialsService } from './services/credentials.service';
import passport from 'passport';

const app = express();
const JWT_SECRET = process.env.JWT_SECRET || '';
const workflowExecutor = new WorkflowExecutor();
const triggerService = new TriggerService();
const credentialsService = new CredentialsService();

triggerService.startAllTriggers().catch(err => {
    console.error('Error starting triggers:', err);
});

app.use(cors());
app.use(passport.initialize());
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

    if (!user.password) {
        return res.status(401).json({ error: 'This account uses social login. Please sign in with Google or GitHub.' });
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
                name: data.name,
                description: data.description,
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

        const existingWorkflow = await prismaClient.workflow.findUnique({
            where: { id: req.params.workflowId }
        });
        if (!existingWorkflow) {
            return res.status(404).json({ error: 'Workflow not found' });
        }
        if (existingWorkflow.userId !== req.userId) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        triggerService.stopWorkflowTriggers(req.params.workflowId!);

        const workflow = await prismaClient.workflow.update({
            where: { id: req.params.workflowId },
            data: {
                name: data.name,
                description: data.description,
                nodes: data.nodes,
                edges: data.edges
            }
        });
        const nodes = data.nodes as any[];
        const hasTriggers = nodes.some(n => n.type.endsWith('trigger'));
        if (hasTriggers) {
            await triggerService.startWorkflowTrigger(workflow.id);
        }
        res.status(200).json({ workflowId: workflow.id, message: 'Workflow updated successfully' });
    } catch (error) {
        console.error('Workflow update error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/workflow/:workflowId', authMiddleware, async (req: Request, res: Response) => {
    try {
        const workflow = await prismaClient.workflow.findUnique({
            where: { id: req.params.workflowId }
        });
        if (!workflow) {
            return res.status(404).json({ error: 'Workflow not found' });
        }
        if (workflow.userId !== req.userId) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        triggerService.stopWorkflowTriggers(req.params.workflowId!);

        await prismaClient.workflow.delete({
            where: { id: req.params.workflowId }
        });
        res.json({ success: true, message: 'Workflow deleted successfully' });
    } catch (e) {
        res.status(500).json({ error: 'Deleting workflow failed' });
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
        include: { 
            executions: {
                orderBy: {
                    startTime: 'desc'
                }
            } 
        }
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

app.post('/credentials', authMiddleware, async (req: Request, res: Response) => {
    try {
        const { name, type, data } = req.body;
        if (!name || !type || !data) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const credentials = await credentialsService.create(req.userId!, name, type, data);
        res.status(201).json({ credentials });
    } catch (e) {
        res.status(500).json({ error: 'Creating credentials failed' });
    }
});

app.get('/credentials', authMiddleware, async (req: Request, res: Response) => {
    try {
        const list = await credentialsService.list(req.userId!);
        res.json(list);
    } catch (e) {
        res.status(500).json({ error: 'Fetching credentials failed' });
    }
});

app.get('/credentials/:id', authMiddleware, async (req: Request, res: Response) => {
    try {
        const cred = await credentialsService.getDecrypted(req.userId!, req.params.id!);
        if (!cred) {
            return res.status(404).json({ error: 'Credentials not found' });
        }
        res.json(cred);
    } catch (e) {
        res.status(500).json({ error: 'Fetching credentials failed' });
    }
});

app.delete('/credentials/:id', authMiddleware, async (req: Request, res: Response) => {
    try {
        const result = await credentialsService.remove(req.userId!, req.params.id!);
        if (!result) {
            return res.status(404).json({ error: 'Credentials not found' });
        }
        res.json({ deleted: true });
    } catch (e) {
        res.status(500).json({ error: 'Deleting credentials failed' });
    }
});

app.post('/webhook/:webhookId', async (req: Request, res: Response) => {
    try {
        const { webhookId } = req.params;
        const workflow = await prismaClient.workflow.findUnique({
            where: { webhookUrl: webhookId },
        });
        if (!workflow) {
            return res.status(404).json({ error: 'Workflow not found for this webhook' });
        }

        const nodes = workflow.nodes as any[];
        const webhookTrigger = nodes.find(n => n.type === 'webhook-trigger' && n.data?.kind === 'trigger');
        if (webhookTrigger.data.metaData.method) {
            const allowedMethod = webhookTrigger.data.metaData.method;
            if (req.method !== allowedMethod) {
                return res.status(405).json({ error: `Invalid HTTP method. Expected ${allowedMethod}` });
            }
        }
        const executionId = await workflowExecutor.executeWorkflowById(
            workflow.id,
            {
                trigger: 'webhook',
                method: req.method,
                body: req.body,
                headers: req.headers,
                query: req.query,
                timestamp: new Date().toISOString(),
            });
        res.json({ executionId, status: 'success' });
    } catch (e) {
        res.status(500).json({ error: 'Webhook execution failed' });
    }
});

app.get('/workflow/:workflowId/webhook', authMiddleware, async (req: Request, res: Response) => {
    try {
        const workflow = await prismaClient.workflow.findUnique({
            where: { id: req.params.workflowId },
            select: { id: true, webhookUrl: true, userId: true }
        });
        if (!workflow || workflow.userId !== req.userId) {
            return res.status(404).json({ error: 'Workflow not found' });
        }
        if (!workflow.webhookUrl) {
            return res.status(404).json({ error: 'No webhook configured for this workflow' });
        }
        const webhookUrl = `${req.protocol}://${req.get('host')}/webhook/${workflow.webhookUrl}`;
        res.json({ webhookUrl, webhookId: workflow.webhookUrl });
    } catch (e) {
        res.status(500).json({ error: 'Fetching webhook failed' });
    }
});

app.all('/webhook/:webhookId', async (req: Request, res: Response) => {
    try {
        const { webhookId } = req.params;
        const workflow = await prismaClient.workflow.findUnique({
            where: { webhookUrl: webhookId },
        });
        if (!workflow) {
            return res.status(404).json({ error: 'Workflow not found for this webhook' });
        }
        const nodes = workflow.nodes as any[];
        const webhookTrigger = nodes.find(n => n.type === 'webhook-trigger' && n.data.kind === 'trigger');
        if (webhookTrigger?.data?.metaData?.method) {
            const allowedMethod = webhookTrigger.data.metaData.method;
            if (req.method !== allowedMethod) {
                return res.status(405).json({ error: `Invalid HTTP method. Expected ${allowedMethod}` });
            }
        }
        const executionId = await workflowExecutor.executeWorkflowById(
            workflow.id,
            {
                trigger: 'webhook',
                method: req.method,
                body: req.body,
                headers: req.headers,
                query: req.query,
                params: req.params,
                timestamp: new Date().toISOString(),
            }
        );
        res.json({ executionId, status: 'success' });
    } catch (e) {
        res.status(500).json({ error: 'Webhook execution failed' });
    }
});

app.get('/auth/google', passport.authenticate('google', {session: false}));
app.get('/auth/google/callback', passport.authenticate('google', {session: false, failureRedirect: '/login'}), (req, res) => {
    const user = req.user as any;
    const token = jwt.sign({userId: user.id}, JWT_SECRET || "secret hai");
    res.redirect(`http://localhost:5173/auth-callback?token=${token}`);
});

app.get('/auth/github', passport.authenticate('github', { session: false }));
app.get('/auth/github/callback', passport.authenticate('github', { session: false, failureRedirect: '/login' }), (req, res) => {
    const user = req.user as any;
    const token = jwt.sign({ userId: user.id }, JWT_SECRET || 'default_secret');
    res.redirect(`http://localhost:5173/auth-callback?token=${token}`);
});

process.on('SIGTERM', () => {
    triggerService.stopAllTriggers();
    process.exit(0);
});

app.listen(process.env.PORT || 3000); 