import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Trash2, Key, Loader2, Shield, Calendar, Fingerprint, ArrowLeft, Pencil } from 'lucide-react';
import { http } from '@/lib/http';

interface Credential {
  id: string;
  name: string;
  type: string;
  createdAt: string;
  apiKey: string;
  fromEmail: string;
}

export default function Credentials() {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const CREDENTIAL_TYPES = [
    { value: 'email', label: 'Email (Resend)', fields: ['apiKey', 'fromEmail'] },
    { value: 'hyperliquid', label: 'Hyperliquid', fields: ['apiKey', 'apiSecret'] },
    { value: 'backpack', label: 'Backpack', fields: ['apiKey', 'apiSecret'] },
    { value: 'lighter', label: 'Lighter', fields: ['privateKey', 'accountIndex', 'apiKeyIndex'] },
  ];

  const [newCred, setNewCred] = useState({ name: '', type: '', data: {apiKey: '', fromEmail: ''} });
  const [editId, setEditId] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCredentials();
  }, []);

  const fetchCredentials = async () => {
    setIsLoading(true);
    try {
      const data = await http.get<Credential[]>('/credentials');
      setCredentials(data || []);
    } catch (error) {
      console.error('Failed to fetch credentials:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const startEdit = async (id: string) => {
      try {
          const cred = await http.get<any>(`/credentials/${id}`);
          setNewCred({
              name: cred.name,
              type: cred.type,
              data: cred.data 
          });
          setEditId(id);
          setIsDialogOpen(true);
      } catch (e) {
          console.error("Failed to fetch credential details", e);
      }
  };

  const cleanData = (data: any) => {
        const cleaned = { ...data };
        // Remove empty fields
        Object.keys(cleaned).forEach(key => {
            if (cleaned[key] === null || cleaned[key] === undefined || cleaned[key] === '') {
                delete cleaned[key];
            }
        });
        return cleaned;
  }

  const handleSave = async () => {
    if (!newCred.name || !newCred.type) return;
    setIsCreating(true);
    try {
      const payload = { ...newCred, data: cleanData(newCred.data) };
      
      if (editId) {
          // Update existing
          await http.put(`/credentials/${editId}`, payload);
      } else {
          // Create new
          await http.post('/credentials', payload);
      }
      setIsDialogOpen(false);
      resetForm();
      fetchCredentials();
    } catch (error) {
      console.error('Failed to save credential:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const resetForm = () => {
      setNewCred({ name: '', type: '', data: {apiKey: '', fromEmail: ''} });
      setEditId(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this credential?')) return;
    try {
      await http.delete(`/credentials/${id}`);
      fetchCredentials();
    } catch (error) {
      console.error('Failed to delete credential:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full animate-pulse"></div>
          <Loader2 className="w-12 h-12 animate-spin text-primary relative z-10" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-background to-background p-6 md:p-10 relative overflow-hidden">
      {}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div className="space-y-2">
            <button 
                onClick={() => navigate('/workflows')}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2 group"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Dashboard
            </button>
            <h1 className="text-4xl font-extrabold tracking-tight flex items-center gap-4">
              <div className="p-2.5 bg-blue-500/10 rounded-2xl border border-blue-500/20 shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)]">
                <Shield className="w-8 h-8 text-blue-500" />
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
                Credentials
              </span>
            </h1>
            <p className="text-muted-foreground max-w-md font-medium">
              Manage secure keys and API secrets for your automation flows.
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-2xl shadow-[0_0_25px_-5px_rgba(59,130,246,0.5)] transition-all h-12">
                <Plus className="w-5 h-5" />
                Add Secret
              </Button>
            </DialogTrigger>
            <DialogContent className="glass border-white/10 bg-card/60 text-foreground rounded-3xl overflow-hidden max-w-md">
              <DialogHeader className="pt-4">
                <DialogTitle className="text-2xl font-bold">{editId ? 'Edit Credential' : 'New Credential'}</DialogTitle>
                <DialogDescription className="text-muted-foreground">Add a new secret to use in your trading nodes.</DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground/70">Name</Label>
                  <Input
                    placeholder="e.g., Hyperliquid API Key"
                    value={newCred.name}
                    onChange={(e) => setNewCred({ ...newCred, name: e.target.value })}
                    className="h-12 bg-white/5 border-white/10 rounded-xl focus:ring-primary focus:ring-offset-0"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground/70">Provider Type</Label>
                  <Select value={newCred.type} onValueChange={(val) => setNewCred({ ...newCred, type: val })}>
                    <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl">
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      {CREDENTIAL_TYPES.map(t => (
                        <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {newCred.type === 'email' && (
                  <>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground/70">Resend API Key</Label>
                      <Input
                        type="password"
                        placeholder="re_xxxx..."
                        value={newCred.data.apiKey}
                        onChange={(e) => setNewCred({ ...newCred, data: { ...newCred.data, apiKey: e.target.value } })}
                        className="h-12 bg-white/5 border-white/10 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground/70">From Email</Label>
                      <Input
                        placeholder="notifications@yourdomain.com"
                        value={newCred.data.fromEmail}
                        onChange={(e) => setNewCred({ ...newCred, data: { ...newCred.data, fromEmail: e.target.value } })}
                        className="h-12 bg-white/5 border-white/10 rounded-xl"
                      />
                    </div>
                  </>
                )}

                {newCred.type === 'lighter' && (
                  <>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground/70">API Key Private Key</Label>
                      <Input
                        type="password"
                        placeholder="0x..."
                        value={(newCred.data as any).privateKey || ''}  
                        onChange={(e) => setNewCred({ ...newCred, data: { ...newCred.data, privateKey: e.target.value } })}
                        className="h-12 bg-white/5 border-white/10 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground/70">Account Index</Label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={(newCred.data as any).accountIndex || ''}
                        onChange={(e) => setNewCred({ ...newCred, data: { ...newCred.data, accountIndex: e.target.value } })}
                        className="h-12 bg-white/5 border-white/10 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground/70">API Key Index</Label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={(newCred.data as any).apiKeyIndex || ''}
                        onChange={(e) => setNewCred({ ...newCred, data: { ...newCred.data, apiKeyIndex: e.target.value } })}
                        className="h-12 bg-white/5 border-white/10 rounded-xl"
                      />
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                      <input
                        type="checkbox"
                        id="useTestnet"
                        checked={(newCred.data as any).useTestnet === 'true'}
                        onChange={(e) => setNewCred({ ...newCred, data: { ...newCred.data, useTestnet: e.target.checked ? 'true' : 'false' } })}
                        className="w-5 h-5 rounded"
                      />
                      <Label htmlFor="useTestnet" className="text-sm font-medium cursor-pointer">Use Testnet</Label>
                    </div>
                  </>
                )}
              </div>
              <DialogFooter className="pb-4">
                <Button 
                    onClick={handleSave} 
                    className="w-full h-12 bg-primary font-bold rounded-xl"
                    disabled={isCreating}
                >
                  {isCreating ? <Loader2 className="w-5 h-5 animate-spin" /> : (editId ? 'Update Secret' : 'Securely Save')}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </header>

        {credentials.length === 0 ? (
            <Card className="glass border-dashed border-white/10 bg-transparent flex flex-col items-center justify-center py-20 rounded-3xl">
                <div className="p-6 bg-white/5 rounded-full mb-6">
                    <Fingerprint className="w-12 h-12 text-muted-foreground/40" />
                </div>
                <h3 className="text-xl font-bold mb-2">No credentials found</h3>
                <p className="text-muted-foreground mb-8">Securely store your API keys here to use them in your workflows.</p>
                <Button variant="outline" onClick={() => setIsDialogOpen(true)} className="rounded-xl border-white/10 font-bold">
                    Create First Secret
                </Button>
            </Card>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {credentials.map((cred) => (
                <Card key={cred.id} className="glass group border-white/5 hover:border-primary/30 bg-card/40 transition-all duration-500 rounded-3xl overflow-hidden animate-in fade-in slide-in-from-bottom-2">
                <CardHeader className="pb-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full"
                            onClick={() => startEdit(cred.id)}
                        >
                            <Pencil className="w-4 h-4" />
                        </Button>
                         <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:bg-destructive/10 rounded-full"
                            onClick={() => handleDelete(cred.id)}
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/5 rounded-2xl border border-white/10 transition-colors group-hover:border-primary/20">
                            <Key className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="space-y-1">
                            <CardTitle className="text-lg font-bold leading-tight group-hover:text-primary transition-colors">
                                {cred.name}
                            </CardTitle>
                            <div className="flex items-center gap-2 px-2 py-0.5 bg-primary/10 border border-primary/20 rounded-full w-fit">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                                    {cred.type}
                                </span>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-0">
                    <Separator className="bg-white/5 mb-4" />
                    <div className="flex justify-between items-center text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{new Date(cred.createdAt).toLocaleDateString()}</span>
                        </div>
                        <span className="px-2 py-0.5 bg-green-500/10 text-green-400 rounded-md border border-green-500/20">Active</span>
                    </div>
                </CardContent>
                </Card>
            ))}
            </div>
        )}
      </div>
    </div>
  );
}

import { Separator } from '@/components/ui/separator';