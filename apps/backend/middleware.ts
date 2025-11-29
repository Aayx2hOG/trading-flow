import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || '';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded);
    if (!decoded || !decoded.sub) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    req.userId = decoded.sub as string;
    next();
}
