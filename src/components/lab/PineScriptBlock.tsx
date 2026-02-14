import { Code, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const PINE_SCRIPT = `//@version=5
strategy("Amaya Alpha Bot — EMA Cross + ATR Trail", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=10)

// === INPUTS ===
emaFast   = input.int(9,  "Fast EMA")
emaSlow   = input.int(21, "Slow EMA")
atrLen    = input.int(14, "ATR Length")
atrMult   = input.float(2.0, "ATR Trailing Multiplier")

// === CALCULATIONS ===
fast = ta.ema(close, emaFast)
slow = ta.ema(close, emaSlow)
atr  = ta.atr(atrLen)

longCondition  = ta.crossover(fast, slow)
shortCondition = ta.crossunder(fast, slow)

// === ENTRIES ===
if longCondition
    strategy.entry("Long", strategy.long)

if shortCondition
    strategy.entry("Short", strategy.short)

// === ATR TRAILING STOP ===
longStop  = close - atr * atrMult
shortStop = close + atr * atrMult

if strategy.position_size > 0
    strategy.exit("Trail Long",  from_entry="Long",  trail_offset=atr * atrMult, trail_points=atr * atrMult)

if strategy.position_size < 0
    strategy.exit("Trail Short", from_entry="Short", trail_offset=atr * atrMult, trail_points=atr * atrMult)

// === PLOTS ===
plot(fast, "Fast EMA", color=color.new(#10B981, 0), linewidth=2)
plot(slow, "Slow EMA", color=color.new(#6B7280, 0), linewidth=2)

// === 2026 VOLATILITY NOTE ===
// This strategy is tuned for heightened 2026 volatility.
// The ATR multiplier absorbs whipsaws while the EMA cross
// captures momentum shifts. Backtest on 1H and 4H timeframes.`;

const PineScriptBlock = () => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(PINE_SCRIPT);
    toast({ title: "Copied ✓", description: "Pine Script copied to clipboard." });
  };

  return (
    <section className="py-16 px-6 bg-secondary/30">
      <div className="container max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Code className="h-4 w-4 text-emerald-glow" />
              <p className="font-mono-system text-xs tracking-[0.2em] uppercase text-emerald-glow">
                Amaya Alpha Bot Code
              </p>
            </div>
            <h2 className="font-serif-display text-3xl font-bold">
              Pine Script — <span className="italic text-gradient-emerald">EMA Cross + ATR Trail</span>
            </h2>
          </div>
          <Button variant="ghost-bone" size="sm" onClick={copyToClipboard}>
            <Copy className="h-3 w-3 mr-2" /> Copy
          </Button>
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="p-1 bg-muted border-b border-border flex items-center gap-2">
            <div className="flex gap-1.5 px-2">
              <div className="w-2.5 h-2.5 rounded-full bg-destructive/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-bone-muted/30" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-glow/30" />
            </div>
            <span className="font-mono-system text-[10px] text-muted-foreground">amaya-alpha-bot.pine</span>
          </div>
          <pre className="p-6 overflow-x-auto text-xs font-mono-system text-foreground/90 leading-relaxed">
            <code>{PINE_SCRIPT}</code>
          </pre>
        </div>

        <p className="font-mono-system text-[10px] text-muted-foreground mt-4 text-center">
          Paste into TradingView Pine Editor → Add to Chart → Backtest on your preferred timeframe.
        </p>
      </div>
    </section>
  );
};

export default PineScriptBlock;
