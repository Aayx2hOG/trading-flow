import { prismaClient } from "db/client";
import { decryptObject, encryptObject } from "./crypto";

const VAULT_SECRET = process.env.CREDENTIALS_KEY || process.env.JWT_SECRET;

export class CredentialsService {
    async create(userId: string, name: string, type: string, data: Record<string, any>) {
        const enc = encryptObject(data, VAULT_SECRET!);
        const credential = await prismaClient.credential.create({
            data: {
                userId,
                name,
                type,
                encryptedData: enc.encryptedData,
                iv: enc.iv,
                authTag: enc.authTag,
            },
        });
        return { id: credential.id, name: credential.name, type: credential.type, createdAt: credential.createdAt };
    }

    async list(userId: string) {
        const rows = await prismaClient.credential.findMany({
            where: { userId },
        })
        return rows.map(r => ({ id: r.id, name: r.name, type: r.type, createdAt: r.createdAt }));
    }

    async getDecrypted(userId: string, id: string) {
        const row = await prismaClient.credential.findUnique({
            where: { id },
        });
        if (!row || row.userId !== userId) {
            throw new Error('Credential not found');
        }
        const data = decryptObject({
            iv: row.iv,
            authTag: row.authTag || undefined,
            encryptedData: row.encryptedData,
        }, VAULT_SECRET!);
        return { id: row.id, name: row.name, type: row.type, data };
    }

    async update(userId: string, id: string, name: string, type: string, data: Record<string, any>){
        const row = await prismaClient.credential.findUnique({
            where: {id}
        });
        if (!row || row.userId !== userId){
            throw new Error('Credential not found');
        }
        const enc = encryptObject(data, VAULT_SECRET!);
        await prismaClient.credential.update({
            where: {id},
            data: {
                name,
                type,
                encryptedData: enc.encryptedData,
                iv: enc.iv,
                authTag: enc.authTag,
            },
        });
        return { id, name, type, createdAt: row.createdAt };
    }

    async remove(userId: string, id: string) {
        const row = await prismaClient.credential.findUnique({
            where: { id },
        });
        if (!row || row.userId !== userId) {
            throw new Error('Credential not found');
        }
        await prismaClient.credential.delete({
            where: { id },
        });
        return true;
    }
}