import { useState, useRef } from "react";
import { useAdminGuard } from "@/hooks/useAdminGuard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, Terminal, Users, Copy, Loader2, Trash2, Plus } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const AMAYA_ALPHA_V2 = `//@version=5
strategy("Amaya Alpha v2.0 - Private Proprietary", overlay=true, initial_capital=10000, currency=currency.USD)

// --- MULTI-MARKET INFRASTRUCTURE ---
marketType = input.string("Forex (Pips)", "Market Type", options=["Forex (Pips)", "Stocks/Crypto (USD)", "Indices (Points)"])
riskPerTrade = input.float(1.0, "Risk Per Trade %", minval=0.1, maxval=3.0)

// --- THE ENGINE ---
emaFast = ta.ema(close, 8)
emaSlow = ta.ema(close, 21)
atr = ta.atr(14)

// --- PIP/POINT CALCULATION ---
var float multiplier = (syminfo.mintick * 10) 
float stopSize = (marketType == "Forex (Pips)") ? (atr / multiplier) : atr

// --- ENTRY LOGIC ---
longCondition = ta.crossover(emaFast, emaSlow) and session.ismarket

// --- SELF-IMPROVEMENT LOGS ---
if (longCondition)
    stopPrice = close - (atr * 1.5)
    tpPrice = close + ((close - stopPrice) * 2.1)
    strategy.entry("Amaya_Long", strategy.long, comment="Log: EMA_Cross_Vol_" + str.tostring(math.round(volume)))
    strategy.exit("Exit", "Amaya_Long", stop=stopPrice, limit=tpPrice)`;

const AdminPortal = () => {
  const { loading } = useAdminGuard();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Script Vault
  const handleCopy = () => {
    navigator.clipboard.writeText(AMAYA_ALPHA_V2);
    toast({ title: "Copied", description: "Amaya Alpha v2.0 copied to clipboard." });
  };

  // Invite Management
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newNotes, setNewNotes] = useState("");

  const { data: invites = [] } = useQuery({
    queryKey: ["tv_invites"],
    queryFn: async () => {
      const { data, error } = await supabase.from("tv_invites").select("*").order("granted_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const addInvite = useMutation({
    mutationFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");
      const { error } = await supabase.from("tv_invites").insert({
        tv_username: newUsername,
        client_email: newEmail || null,
        notes: newNotes || null,
        granted_by: session.user.id,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tv_invites"] });
      setNewUsername("");
      setNewEmail("");
      setNewNotes("");
      toast({ title: "Access Granted", description: `${newUsername} whitelisted.` });
    },
    onError: (e: Error) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const removeInvite = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("tv_invites").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tv_invites"] });
      toast({ title: "Revoked", description: "Access removed." });
    },
  });

  // Optimizer
  const [rawData, setRawData] = useState("");
  const [aiOutput, setAiOutput] = useState("");
  const [analyzing, setAnalyzing] = useState(false);

  const runOptimization = async () => {
    if (!rawData.trim()) return;
    setAnalyzing(true);
    setAiOutput("");

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const resp = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/optimize-trades`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ rawData }),
      });

      if (!resp.ok) {
        const err = await resp.json();
        throw new Error(err.error || "Analysis failed");
      }

      const reader = resp.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let full = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let idx: number;
        while ((idx = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, idx);
          buffer = buffer.slice(idx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") break;
          try {
            const parsed = JSON.parse(json);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              full += content;
              setAiOutput(full);
            }
          } catch { /* partial */ }
        }
      }
    } catch (e: any) {
      toast({ title: "Analysis Failed", description: e.message, variant: "destructive" });
    } finally {
      setAnalyzing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-glow" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-6 py-4 flex items-center gap-3">
        <Shield className="h-6 w-6 text-emerald-glow" />
        <h1 className="font-serif-display text-2xl font-bold">
          Command <span className="text-gradient-emerald italic">Center</span>
        </h1>
        <span className="ml-auto font-mono-system text-xs text-muted-foreground tracking-widest uppercase">
          Admin Portal
        </span>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <Tabs defaultValue="vault" className="space-y-6">
          <TabsList className="bg-secondary border border-border">
            <TabsTrigger value="vault" className="font-mono-system text-xs gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Terminal className="h-3.5 w-3.5" /> Script Vault
            </TabsTrigger>
            <TabsTrigger value="optimizer" className="font-mono-system text-xs gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Terminal className="h-3.5 w-3.5" /> Optimizer
            </TabsTrigger>
            <TabsTrigger value="invites" className="font-mono-system text-xs gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Users className="h-3.5 w-3.5" /> Invite Access
            </TabsTrigger>
          </TabsList>

          {/* SCRIPT VAULT */}
          <TabsContent value="vault">
            <Card className="border-border bg-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-serif-display text-xl">Amaya Alpha v2.0 — Proprietary</CardTitle>
                <Button variant="outline" size="sm" className="gap-1.5 font-mono-system text-xs" onClick={handleCopy}>
                  <Copy className="h-3.5 w-3.5" /> Copy
                </Button>
              </CardHeader>
              <CardContent>
                <pre className="bg-secondary border border-border rounded-lg p-4 overflow-x-auto font-mono-system text-xs leading-relaxed text-emerald-glow whitespace-pre-wrap">
                  {AMAYA_ALPHA_V2}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>

          {/* OPTIMIZER */}
          <TabsContent value="optimizer">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="font-serif-display text-lg">Log Dump</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    value={rawData}
                    onChange={(e) => setRawData(e.target.value)}
                    placeholder="Paste raw trade data from TradingView here…"
                    className="min-h-[300px] font-mono-system text-xs bg-secondary border-border"
                  />
                  <Button
                    onClick={runOptimization}
                    disabled={analyzing || !rawData.trim()}
                    className="w-full gap-2 bg-gradient-emerald hover:opacity-90"
                  >
                    {analyzing ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Scanning Market Infrastructure…
                      </>
                    ) : (
                      "Run Optimization"
                    )}
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="font-serif-display text-lg">System Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-secondary border border-border rounded-lg p-4 min-h-[300px] font-mono-system text-xs leading-relaxed whitespace-pre-wrap text-emerald-glow">
                    {aiOutput || "Awaiting data input…"}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* INVITE MANAGEMENT */}
          <TabsContent value="invites">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="font-serif-display text-xl">TradingView Access Control</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Add form */}
                <div className="grid sm:grid-cols-4 gap-3">
                  <Input
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    placeholder="TV Username"
                    className="bg-secondary border-border font-mono-system text-xs"
                  />
                  <Input
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="Client Email (optional)"
                    className="bg-secondary border-border font-mono-system text-xs"
                  />
                  <Input
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                    placeholder="Notes (optional)"
                    className="bg-secondary border-border font-mono-system text-xs"
                  />
                  <Button
                    onClick={() => addInvite.mutate()}
                    disabled={!newUsername.trim() || addInvite.isPending}
                    className="gap-1.5 bg-gradient-emerald hover:opacity-90 font-mono-system text-xs"
                  >
                    <Plus className="h-3.5 w-3.5" /> Grant Access
                  </Button>
                </div>

                {/* Table */}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-mono-system text-xs">Username</TableHead>
                      <TableHead className="font-mono-system text-xs">Email</TableHead>
                      <TableHead className="font-mono-system text-xs">Notes</TableHead>
                      <TableHead className="font-mono-system text-xs">Granted</TableHead>
                      <TableHead className="font-mono-system text-xs w-12" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invites.map((inv: any) => (
                      <TableRow key={inv.id}>
                        <TableCell className="font-mono-system text-xs text-emerald-glow">{inv.tv_username}</TableCell>
                        <TableCell className="font-mono-system text-xs">{inv.client_email || "—"}</TableCell>
                        <TableCell className="font-mono-system text-xs text-muted-foreground">{inv.notes || "—"}</TableCell>
                        <TableCell className="font-mono-system text-xs">{new Date(inv.granted_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeInvite.mutate(inv.id)}
                            className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {invites.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground font-mono-system text-xs py-8">
                          No invites granted yet.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminPortal;
