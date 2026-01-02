import { createCipheriv, createDecipheriv, createHash, randomBytes, type CipherGCMTypes, type DecipherGCM } from "node:crypto";

const ALGO = 'aes-256-gcm';

function getKeyFromSecret(secret: string): Buffer {
    return createHash('sha256').update(secret).digest();
}

export function encryptObject(obj: any, secret: string) {
    const key = getKeyFromSecret(secret);
    const iv = randomBytes(16);
    const cipher = createCipheriv(ALGO, key, iv);
    const plainText = Buffer.from(JSON.stringify(obj), 'utf-8');
    const encrypted = Buffer.concat([cipher.update(plainText), cipher.final()]);
    const authTag = cipher.getAuthTag();
    return {
        iv: iv.toString('base64'),
        authTag: authTag.toString('base64'),
        encryptedData: encrypted.toString('base64'),
        algorithm: ALGO,
    };
}

export function decryptObject(
    payload: { iv: string, authTag?: string, encryptedData: string, algorithm?: string },
    secret: string
) {
    const key = getKeyFromSecret(secret);
    const iv = Buffer.from(payload.iv, 'base64');

    const algo: CipherGCMTypes = (payload.algorithm as CipherGCMTypes) || ALGO;
    const decipher: DecipherGCM = createDecipheriv(algo, key, iv);

    if (payload.authTag) {
        decipher.setAuthTag(Buffer.from(payload.authTag, 'base64'));
    }

    const decrypted = Buffer.concat([
        decipher.update(Buffer.from(payload.encryptedData, 'base64')),
        decipher.final()
    ]);

    return JSON.parse(decrypted.toString('utf-8'));
};