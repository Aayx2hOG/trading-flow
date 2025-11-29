import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import { prismaClient } from 'db/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SignUpSchema } from 'common/types';

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

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '7d' });
        res.status(201).json({ token });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/signin', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const user = await prismaClient.user.findUnique({ where: { email } });

    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({ token });
});

app.post('/workflow', async (req: Request, res: Response) => {

});

app.put('/workflow', async (req: Request, res: Response) => {

});

app.put('/workflow/:id', async (req: Request, res: Response) => {

});

app.get('/workflow/executions/:workflowId', async (req: Request, res: Response) => {

});

app.post('/workflow/credentials', async (req: Request, res: Response) => {

});

app.listen(process.env.PORT || 3000); 