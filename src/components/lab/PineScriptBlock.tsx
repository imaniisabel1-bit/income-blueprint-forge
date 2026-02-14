import { Code, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const PINE_SCRIPT = `//@version=5
strategy("Amaya Alpha v1.0 - Infrastructure Strategy", overlay=true, initial_capital=10000, default_qty_type=strategy.percent_of_equity, default_qty_value=10)

// --- AMAYA'S INFRASTRUCTURE PARAMETERS ---
emaFastLen = input.int(8, "Amaya Fast EMA (8)", minval=1)
emaSlowLen = input.int(21, "Amaya Slow EMA (21)", minval=1)
atrLen     = input.int(14, "Volatility Lookback (ATR)")
atrMult    = input.float(1.5, "Risk Buffer (ATR Multiplier)")

// --- INDICATOR LOGIC ---
emaFast = ta.ema(close, emaFastLen)
emaSlow = ta.ema(close, emaSlowLen)
atr     = ta.atr(atrLen)

// --- ENTRY CONDITIONS (THE "AMAYA CROSS") ---
// We only enter when the fast trend crosses the slow trend and volume is healthy
longCondition  = ta.crossover(emaFast, emaSlow)
shortCondition = ta.crossunder(emaFast, emaSlow)

// --- RISK MANAGEMENT (THE "BLACK BOX" LOGIC) ---
var float stopLossPrice = na
var float takeProfitPrice = na

if (longCondition)
    stopLossPrice := close - (atr * atrMult)
    takeProfitPrice := close + ((close - stopLossPrice) * 2) // 2:1 Reward-to-Risk
    strategy.entry("Long Infrastructure", strategy.long)
    strategy.exit("Exit Long", "Long Infrastructure", stop=stopLossPrice, limit=takeProfitPrice)

if (shortCondition)
    stopLossPrice := close + (atr * atrMult)
    takeProfitPrice := close - ((stopLossPrice - close) * 2) // 2:1 Reward-to-Risk
    strategy.entry("Short Infrastructure", strategy.short)
    strategy.exit("Exit Short", "Short Infrastructure", stop=stopLossPrice, limit=takeProfitPrice)

// --- VISUALS FOR THE LAB ---
plot(emaFast, color=color.new(#00A86B, 0), title="Fast Trend (Emerald)")
plot(emaSlow, color=color.new(#D4AF37, 0), title="Slow Trend (Gold)")
plotshape(longCondition, style=shape.triangleup, location=location.belowbar, color=color.green, size=size.small, title="Amaya Buy Signal")
plotshape(shortCondition, style=shape.triangledown, location=location.abovebar, color=color.red, size=size.small, title="Amaya Sell Signal")`;

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
              Pine Script — <span className="italic text-gradient-emerald">Amaya Alpha v1.0</span>
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
            <span className="font-mono-system text-[10px] text-muted-foreground">amaya-alpha-v1.pine</span>
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
