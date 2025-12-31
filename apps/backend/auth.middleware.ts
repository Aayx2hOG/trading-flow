import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { prismaClient } from "db/client";

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: "No authorization header" });
    }

    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        const userId = decoded.userId as string;

        const user = await prismaClient.user.findUnique({
            where: { id: userId },
            select: { id: true }
        });

        if (!user) {
            return res.status(401).json({ message: "User no longer exists" });
        }

        req.userId = userId;
        next();
    } catch (e) {
        console.error('JWT verification error:', e); 
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}
