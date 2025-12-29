import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, username, password }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to sign up');
            }

            const data = await response.json();
            localStorage.setItem('authtoken', data.token);
            alert('Account created successfully');
            navigate('/workflows');
        } catch (error) {
            alert('Failed to sign up: ' + (error instanceof Error ? error.message : 'Please try again'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-background to-background p-4">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/5 blur-[120px] rounded-full"></div>
            </div>

            <Card className="w-full max-w-md glass border-white/5 shadow-2xl rounded-3xl overflow-hidden animate-in fade-in zoom-in duration-500">
                <CardHeader className="space-y-1 pt-8">
                    <div className="flex justify-center mb-6">
                        <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20 shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)]">
                            <WorkflowIcon className="w-8 h-8 text-blue-500" />
                        </div>
                    </div>
                    <CardTitle className="text-3xl font-extrabold text-center tracking-tight">Create Account</CardTitle>
                    <CardDescription className="text-center text-muted-foreground font-medium">Start automating your trading flows today</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4 px-8 pb-8">
                        <div className="space-y-2">
                            <Label htmlFor="username" className="text-xs font-bold uppercase tracking-widest text-muted-foreground/70">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="johndoe"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="h-12 bg-white/5 border-white/10 rounded-xl focus:ring-primary focus:border-primary transition-all transition-duration-300"
                                required
                                minLength={3}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground/70">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-12 bg-white/5 border-white/10 rounded-xl focus:ring-primary focus:border-primary transition-all transition-duration-300"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-muted-foreground/70">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="h-12 bg-white/5 border-white/10 rounded-xl focus:ring-primary focus:border-primary transition-all transition-duration-300"
                                required
                                minLength={6}
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-6 px-8 pb-10">
                        <Button 
                            type="submit" 
                            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)] transition-all" 
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
                        </Button>
                        <p className="text-sm text-center text-muted-foreground font-medium">
                            Already have an account?{' '}
                            <button
                                type="button"
                                onClick={() => navigate('/signin')}
                                className="text-primary hover:text-primary/80 font-bold transition-colors"
                            >
                                Sign In
                            </button>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}

import { Workflow as WorkflowIcon, Loader2 } from 'lucide-react';

