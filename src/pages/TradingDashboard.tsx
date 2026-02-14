import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft, TrendingUp, TrendingDown, Shield, DollarSign,
  Plus, X, BarChart3, Activity, Lock, Trash2
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import type { User } from "@supabase/supabase-js";

// --- Market Sentiment Gauge (FREE) ---
const sentimentLevels = [
  { label: "Extreme Fear", color: "text-red-500", bg: "bg-red-500", range: [0, 20] },
  { label: "Fear", color: "text-orange-400", bg: "bg-orange-400", range: [21, 40] },
  { label: "Neutral", color: "text-yellow-400", bg: "bg-yellow-400", range: [41, 60] },
  { label: "Greed", color: "text-emerald-glow", bg: "bg-emerald-glow", range: [61, 80] },
  { label: "Extreme Greed", color: "text-green-400", bg: "bg-green-400", range: [81, 100] },
];

const getSentiment = (value: number) =>
  sentimentLevels.find((s) => value >= s.range[0] && value <= s.range[1]) ?? sentimentLevels[2];

const SentimentGauge = () => {
  // Simulated sentiment value — in production, pull from an API edge function
  const [value] = useState(() => Math.floor(Math.random() * 40) + 30);
  const sentiment = getSentiment(value);

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="h-5 w-5 text-emerald-glow" />
        <h3 className="font-serif-display text-lg font-bold">Market Sentiment</h3>
        <span className="ml-auto font-mono-system text-[10px] tracking-[0.2em] uppercase px-2 py-0.5 rounded-full border border-emerald-light/20 text-emerald-glow">
          Free
        </span>
      </div>
      <div className="flex items-center gap-4 mb-3">
        <div className="text-5xl font-serif-display font-bold">{value}</div>
        <div>
          <p className={`font-mono-system text-sm font-bold ${sentiment.color}`}>{sentiment.label}</p>
          <p className="font-mono-system text-[10px] text-muted-foreground">Fear &amp; Greed Index</p>
        </div>
      </div>
      {/* Gauge bar */}
      <div className="w-full h-2 rounded-full bg-secondary overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${sentiment.bg}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="font-mono-system text-[9px] text-muted-foreground">Extreme Fear</span>
        <span className="font-mono-system text-[9px] text-muted-foreground">Extreme Greed</span>
      </div>
      <p className="font-mono-system text-[10px] text-muted-foreground mt-4 italic">
        "When the market is fearful, infrastructure builders buy. When it's greedy, we take profits." — Amaya Sol
      </p>
    </div>
  );
};

// --- TradingView Chart Widget ---
const TradingViewChart = ({ symbol = "SPY" }: { symbol?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: symbol,
      interval: "D",
      timezone: "America/New_York",
      theme: "dark",
      style: "1",
      locale: "en",
      backgroundColor: "rgba(0, 0, 0, 0)",
      gridColor: "rgba(255, 255, 255, 0.04)",
      hide_top_toolbar: false,
      hide_legend: false,
      allow_symbol_change: true,
      save_image: false,
      height: 400,
    });
    containerRef.current.appendChild(script);
  }, [symbol]);

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex items-center gap-2 p-4 border-b border-border">
        <BarChart3 className="h-5 w-5 text-emerald-glow" />
        <h3 className="font-serif-display text-lg font-bold">Live Charts</h3>
      </div>
      <div ref={containerRef} style={{ height: 400 }} className="tradingview-widget-container" />
    </div>
  );
};

// --- Position Sizing Calculator (PAID) ---
const PositionSizer = ({ locked }: { locked: boolean }) => {
  const [accountSize, setAccountSize] = useState("5000");
  const [riskPercent, setRiskPercent] = useState("1");
  const [entryPrice, setEntryPrice] = useState("150");
  const [stopLoss, setStopLoss] = useState("145");

  const account = parseFloat(accountSize) || 0;
  const risk = parseFloat(riskPercent) || 0;
  const entry = parseFloat(entryPrice) || 0;
  const stop = parseFloat(stopLoss) || 0;
  const riskPerShare = Math.abs(entry - stop);
  const maxRiskDollars = account * (risk / 100);
  const shares = riskPerShare > 0 ? Math.floor(maxRiskDollars / riskPerShare) : 0;
  const positionValue = shares * entry;

  if (locked) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
          <Lock className="h-8 w-8 text-emerald-glow mb-3" />
          <p className="font-serif-display text-lg font-bold mb-1">Systems Vault Members Only</p>
          <p className="font-mono-system text-xs text-muted-foreground mb-4">Unlock the Position Sizing Calculator</p>
          <Button variant="emerald" size="sm">Upgrade to Vault — $29/mo</Button>
        </div>
        <div className="opacity-30 pointer-events-none">
          <h3 className="font-serif-display text-lg font-bold mb-4">Position Sizing Calculator</h3>
          <div className="grid grid-cols-2 gap-3">
            <Input placeholder="$5,000" disabled />
            <Input placeholder="1%" disabled />
            <Input placeholder="$150" disabled />
            <Input placeholder="$145" disabled />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="h-5 w-5 text-emerald-glow" />
        <h3 className="font-serif-display text-lg font-bold">Position Sizing Calculator</h3>
      </div>
      <p className="font-mono-system text-[10px] text-muted-foreground mb-4">
        Never risk more than you can afford. Input your numbers, get your exact share count.
      </p>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="font-mono-system text-[10px] text-muted-foreground mb-1 block">Account Size ($)</label>
          <Input value={accountSize} onChange={(e) => setAccountSize(e.target.value)} type="number" min="0" />
        </div>
        <div>
          <label className="font-mono-system text-[10px] text-muted-foreground mb-1 block">Risk Per Trade (%)</label>
          <Input value={riskPercent} onChange={(e) => setRiskPercent(e.target.value)} type="number" min="0" max="100" step="0.5" />
        </div>
        <div>
          <label className="font-mono-system text-[10px] text-muted-foreground mb-1 block">Entry Price ($)</label>
          <Input value={entryPrice} onChange={(e) => setEntryPrice(e.target.value)} type="number" min="0" />
        </div>
        <div>
          <label className="font-mono-system text-[10px] text-muted-foreground mb-1 block">Stop Loss ($)</label>
          <Input value={stopLoss} onChange={(e) => setStopLoss(e.target.value)} type="number" min="0" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 rounded-lg bg-secondary border border-border text-center">
          <p className="font-mono-system text-[10px] text-muted-foreground">Max Risk</p>
          <p className="font-serif-display text-lg font-bold text-emerald-glow">${maxRiskDollars.toFixed(2)}</p>
        </div>
        <div className="p-3 rounded-lg bg-secondary border border-border text-center">
          <p className="font-mono-system text-[10px] text-muted-foreground">Shares to Buy</p>
          <p className="font-serif-display text-lg font-bold">{shares}</p>
        </div>
        <div className="p-3 rounded-lg bg-secondary border border-border text-center">
          <p className="font-mono-system text-[10px] text-muted-foreground">Position Value</p>
          <p className="font-serif-display text-lg font-bold">${positionValue.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

// --- Trade Log (PAID) ---
interface TradeEntry {
  id: string;
  ticker: string;
  direction: string;
  entry_price: number;
  exit_price: number | null;
  quantity: number;
  notes: string | null;
  status: string;
  created_at: string;
}

const TradeLog = ({ locked, user }: { locked: boolean; user: User | null }) => {
  const [trades, setTrades] = useState<TradeEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [ticker, setTicker] = useState("");
  const [direction, setDirection] = useState<"long" | "short">("long");
  const [entryPrice, setEntryPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (locked || !user) return;
    fetchTrades();
  }, [locked, user]);

  const fetchTrades = async () => {
    const { data } = await supabase
      .from("trade_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);
    if (data) setTrades(data as unknown as TradeEntry[]);
  };

  const addTrade = async () => {
    if (!ticker.trim() || !entryPrice || !quantity || !user) return;
    setSubmitting(true);
    const { error } = await supabase.from("trade_logs").insert({
      user_id: user.id,
      ticker: ticker.trim().toUpperCase(),
      direction,
      entry_price: parseFloat(entryPrice),
      quantity: parseInt(quantity),
      notes: notes.trim() || null,
    } as any);
    if (error) {
      toast({ title: "Error", description: "Could not log trade.", variant: "destructive" });
    } else {
      toast({ title: "Trade logged ✓" });
      setShowForm(false);
      setTicker("");
      setEntryPrice("");
      setQuantity("");
      setNotes("");
      fetchTrades();
    }
    setSubmitting(false);
  };

  const deleteTrade = async (id: string) => {
    await supabase.from("trade_logs").delete().eq("id", id);
    fetchTrades();
  };

  if (locked) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
          <Lock className="h-8 w-8 text-emerald-glow mb-3" />
          <p className="font-serif-display text-lg font-bold mb-1">Systems Vault Members Only</p>
          <p className="font-mono-system text-xs text-muted-foreground mb-4">Unlock the Daily Trade Log</p>
          <Button variant="emerald" size="sm">Upgrade to Vault — $29/mo</Button>
        </div>
        <div className="opacity-30 pointer-events-none">
          <h3 className="font-serif-display text-lg font-bold mb-4">Daily Trade Log</h3>
          <div className="h-32 bg-secondary rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-emerald-glow" />
          <h3 className="font-serif-display text-lg font-bold">Daily Trade Log</h3>
        </div>
        <Button variant="emerald" size="sm" onClick={() => setShowForm(!showForm)}>
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4 mr-1" />}
          {showForm ? "Cancel" : "Log Trade"}
        </Button>
      </div>

      {showForm && (
        <div className="mb-4 p-4 rounded-lg border border-emerald-light/20 bg-secondary/50 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-mono-system text-[10px] text-muted-foreground mb-1 block">Ticker</label>
              <Input value={ticker} onChange={(e) => setTicker(e.target.value)} placeholder="TSLA" maxLength={10} />
            </div>
            <div>
              <label className="font-mono-system text-[10px] text-muted-foreground mb-1 block">Direction</label>
              <div className="flex gap-2">
                <Button
                  variant={direction === "long" ? "emerald" : "ghost-bone"}
                  size="sm"
                  className="flex-1"
                  onClick={() => setDirection("long")}
                >
                  <TrendingUp className="h-3 w-3 mr-1" /> Long
                </Button>
                <Button
                  variant={direction === "short" ? "emerald" : "ghost-bone"}
                  size="sm"
                  className="flex-1"
                  onClick={() => setDirection("short")}
                >
                  <TrendingDown className="h-3 w-3 mr-1" /> Short
                </Button>
              </div>
            </div>
            <div>
              <label className="font-mono-system text-[10px] text-muted-foreground mb-1 block">Entry Price</label>
              <Input value={entryPrice} onChange={(e) => setEntryPrice(e.target.value)} type="number" min="0" placeholder="150.00" />
            </div>
            <div>
              <label className="font-mono-system text-[10px] text-muted-foreground mb-1 block">Quantity</label>
              <Input value={quantity} onChange={(e) => setQuantity(e.target.value)} type="number" min="1" placeholder="10" />
            </div>
          </div>
          <div>
            <label className="font-mono-system text-[10px] text-muted-foreground mb-1 block">Notes (optional)</label>
            <Input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Thesis, strategy..." maxLength={200} />
          </div>
          <Button variant="emerald" className="w-full" onClick={addTrade} disabled={submitting}>
            {submitting ? "Logging..." : "Submit Trade"}
          </Button>
        </div>
      )}

      {trades.length === 0 ? (
        <p className="font-mono-system text-xs text-muted-foreground text-center py-8">
          No trades logged yet. Start building your track record.
        </p>
      ) : (
        <div className="space-y-2 max-h-[400px] overflow-y-auto">
          {trades.map((trade) => (
            <div key={trade.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border">
              <div className="flex items-center gap-3">
                {trade.direction === "long" ? (
                  <TrendingUp className="h-4 w-4 text-green-400" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-400" />
                )}
                <div>
                  <p className="font-mono-system text-sm font-bold">{trade.ticker}</p>
                  <p className="font-mono-system text-[10px] text-muted-foreground">
                    {trade.quantity} shares @ ${trade.entry_price} · {trade.status}
                  </p>
                </div>
              </div>
              <button onClick={() => deleteTrade(trade.id)} className="text-muted-foreground hover:text-red-400 transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// --- Main Page ---
const TradingDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // TODO: Replace with real subscription check
  const isPaidMember = false;

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
        if (!session?.user) navigate("/auth");
      }
    );
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
      if (!session?.user) navigate("/auth");
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="font-mono-system text-sm text-muted-foreground">Loading trading floor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container max-w-6xl flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost-bone" size="sm" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="h-4 w-4 mr-1" /> Dashboard
            </Button>
            <div className="h-6 w-px bg-border" />
            <span className="font-serif-display text-lg font-bold">The Trading Floor</span>
          </div>
          <span className="font-mono-system text-xs text-muted-foreground hidden sm:block">
            {user?.email}
          </span>
        </div>
      </header>

      <main className="container max-w-6xl px-6 py-12">
        <div className="mb-10">
          <p className="font-mono-system text-xs tracking-[0.3em] uppercase text-emerald-glow mb-2">
            Probability-Based Infrastructure
          </p>
          <h1 className="font-serif-display text-3xl md:text-4xl font-bold mb-2">
            The Trading <span className="italic text-gradient-emerald">Floor</span>
          </h1>
          <p className="font-mono-system text-sm text-muted-foreground max-w-xl">
            KDP is your base salary. Trading is your bonus. Use steady book profits to fund positions — that's how you stop trading with "scared money."
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column: Sentiment + Position Sizer */}
          <div className="lg:col-span-1 space-y-6">
            <SentimentGauge />
            <PositionSizer locked={!isPaidMember} />
          </div>

          {/* Right column: Chart + Trade Log */}
          <div className="lg:col-span-2 space-y-6">
            <TradingViewChart />
            <TradeLog locked={!isPaidMember} user={user} />
          </div>
        </div>

        {/* Strategy Cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-5 w-5 text-emerald-glow" />
              <h3 className="font-serif-display font-bold">The "Safe" Play</h3>
            </div>
            <p className="font-mono-system text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Covered Calls &amp; Cash Secured Puts.</strong> Generate "rent" on stocks you already own. Ideal for accounts under $25k where you're building a base.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-5 w-5 text-emerald-glow" />
              <h3 className="font-serif-display font-bold">The "Growth" Play</h3>
            </div>
            <p className="font-mono-system text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Vertical Spreads.</strong> Cap your risk while targeting 100% returns. For when the sentiment gauge shows "Fear" and you see a setup.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TradingDashboard;
