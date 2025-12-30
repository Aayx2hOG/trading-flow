import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import { prismaClient } from "db/client";

const validateEnv = () => {
    const required = ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'GITHUB_CLIENT_ID', 'GITHUB_CLIENT_SECRET'];
    required.forEach(key => {
        if (!process.env[key]) throw new Error(`Missing ${key}`);
    });
};
validateEnv();

async function findOrCreateUser(
    provider: 'google' | 'github',
    profile: any
) {
    const providerId = profile.id;
    const email = profile.emails?.[0]?.value;
    const username = profile.displayName || profile.username || `user_${Date.now()}`;

    const providerField = provider === 'google' ? 'googleId' : 'githubId';

    let user = await prismaClient.user.findUnique({
        where: provider === 'google' ? { googleId: providerId } : { githubId: providerId }
    });
    if (user) return user;
    if (email) {
        user = await prismaClient.user.findUnique({ where: { email } });
        if (user) {
            return await prismaClient.user.update({
                where: { id: user.id },
                data: provider === 'google' ? { googleId: providerId } : { githubId: providerId }
            });
        }
    }

    return await prismaClient.user.create({
        data: {
            email: email || "",
            username,
            ...(provider === 'google' ? { googleId: providerId } : { githubId: providerId })
        }
    });
}

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: "/auth/google/callback",
    scope: ['profile', 'email']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await findOrCreateUser('google', profile);
        done(null, user);
    } catch (error) {
        console.error('Google OAuth error:', error);
        done(error as Error, undefined);
    }
}));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    callbackURL: "/auth/github/callback",
    scope: ['user:email']
    //@ts-ignore
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await findOrCreateUser('github', profile);
        done(null, user);
    } catch (error) {
        console.error('GitHub OAuth error:', error);
        done(error as Error, undefined);
    }
}));

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await prismaClient.user.findUnique({ where: { id } });
        done(null, user);
    } catch (error) {
        done(error as Error, null);
    }
});