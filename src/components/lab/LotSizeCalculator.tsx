import { useState } from "react";
import { Calculator, Shield, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

const LotSizeCalculator = () => {
  const [balance, setBalance] = useState("");
  const [riskPct, setRiskPct] = useState(1);
  const [entryPrice, setEntryPrice] = useState("");
  const [stopLossPrice, setStopLossPrice] = useState("");
  const [result, setResult] = useState<{ riskAmount: number; positionSize: number } | null>(null);

  const calculate = () => {
    const bal = parseFloat(balance);
    const entry = parseFloat(entryPrice);
    const sl = parseFloat(stopLossPrice);
    if (!bal || !entry || !sl || entry === sl) return;

    const riskAmount = bal * (riskPct / 100);
    const riskPerShare = Math.abs(entry - sl);
    const positionSize = Math.floor(riskAmount / riskPerShare);

    setResult({ riskAmount, positionSize });
  };

  const showWarning = riskPct > 3;

  return (
    <section className="py-16 px-6">
      <div className="container max-w-2xl">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="h-4 w-4 text-emerald-glow" />
          <p className="font-mono-system text-xs tracking-[0.2em] uppercase text-emerald-glow">
            Risk Management
          </p>
        </div>
        <h2 className="font-serif-display text-3xl font-bold mb-8">
          Risk & Lot Size <span className="italic text-gradient-emerald">Calculator</span>
        </h2>

        <div className="rounded-xl border border-emerald-light/30 bg-card p-8">
          <div className="space-y-6">
            {/* Account Balance */}
            <div>
              <label className="font-mono-system text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2 block">
                Account Balance
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono-system text-muted-foreground text-sm">$</span>
                <Input
                  type="number"
                  placeholder="10000"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                  className="pl-7 bg-secondary border-border font-mono-system text-sm"
                />
              </div>
            </div>

            {/* Risk % */}
            <div>
              <label className="font-mono-system text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3 block">
                Risk Per Trade
              </label>
              <Slider
                value={[riskPct * 10]}
                onValueChange={(v) => setRiskPct(v[0] / 10)}
                min={5}
                max={50}
                step={5}
                className="mb-2"
              />
              <p className="font-mono-system text-2xl font-bold text-foreground">
                {riskPct}%
              </p>
              {showWarning && (
                <div className="mt-2 flex items-start gap-2 p-3 rounded-md bg-destructive/10 border border-destructive/20 animate-fade-in">
                  <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                  <p className="font-mono-system text-[11px] text-destructive">
                    ⚠️ Amaya says: Higher risk leads to account ruin. Infrastructure is built on 1–2% risk.
                  </p>
                </div>
              )}
            </div>

            {/* Entry Price */}
            <div>
              <label className="font-mono-system text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2 block">
                Entry Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono-system text-muted-foreground text-sm">$</span>
                <Input
                  type="number"
                  placeholder="150.00"
                  value={entryPrice}
                  onChange={(e) => setEntryPrice(e.target.value)}
                  className="pl-7 bg-secondary border-border font-mono-system text-sm"
                />
              </div>
            </div>

            {/* Stop Loss Price */}
            <div>
              <label className="font-mono-system text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2 block">
                Stop Loss Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono-system text-muted-foreground text-sm">$</span>
                <Input
                  type="number"
                  placeholder="145.00"
                  value={stopLossPrice}
                  onChange={(e) => setStopLossPrice(e.target.value)}
                  className="pl-7 bg-secondary border-border font-mono-system text-sm"
                />
              </div>
            </div>

            <Button variant="emerald" size="lg" className="w-full" onClick={calculate}>
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Position Size
            </Button>
          </div>

          {result && (
            <div className="mt-6 pt-6 border-t border-border animate-fade-in">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="font-mono-system text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">Risk Amount</p>
                  <p className="font-serif-display text-2xl font-bold text-foreground">${result.riskAmount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="font-mono-system text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">Position Size</p>
                  <p className="font-serif-display text-3xl font-bold text-gradient-emerald">{result.positionSize.toLocaleString()}</p>
                  <p className="font-mono-system text-[10px] text-muted-foreground">shares / units</p>
                </div>
              </div>
              <p className="font-mono-system text-[10px] text-muted-foreground text-center mt-4">
                Position Size = Risk Amount ÷ |Entry − Stop Loss|
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LotSizeCalculator;
