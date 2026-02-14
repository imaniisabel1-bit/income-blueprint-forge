import { useState } from "react";
import { Calculator, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

const LotSizeCalculator = () => {
  const [balance, setBalance] = useState("");
  const [riskPct, setRiskPct] = useState(2);
  const [stopLoss, setStopLoss] = useState("");
  const [result, setResult] = useState<{ riskAmount: number; lotSize: number; units: number } | null>(null);

  const calculate = () => {
    const bal = parseFloat(balance);
    const sl = parseFloat(stopLoss);
    if (!bal || !sl || sl <= 0) return;

    const riskAmount = bal * (riskPct / 100);
    // Standard lot = 100,000 units. Pip value ≈ $10/lot for major pairs.
    const pipValue = 10;
    const lotSize = Math.round((riskAmount / (sl * pipValue)) * 100) / 100;
    const units = Math.round(lotSize * 100000);

    setResult({ riskAmount, lotSize, units });
  };

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
          Lot Size <span className="italic text-gradient-emerald">Calculator</span>
        </h2>

        <div className="rounded-xl border border-border bg-card p-8">
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
            </div>

            {/* Stop Loss */}
            <div>
              <label className="font-mono-system text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2 block">
                Stop Loss (pips)
              </label>
              <Input
                type="number"
                placeholder="50"
                value={stopLoss}
                onChange={(e) => setStopLoss(e.target.value)}
                className="bg-secondary border-border font-mono-system text-sm"
              />
            </div>

            <Button variant="emerald" size="lg" className="w-full" onClick={calculate}>
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Position Size
            </Button>
          </div>

          {result && (
            <div className="mt-6 pt-6 border-t border-border animate-fade-in">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="font-mono-system text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">Risk Amount</p>
                  <p className="font-serif-display text-2xl font-bold text-foreground">${result.riskAmount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="font-mono-system text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">Lot Size</p>
                  <p className="font-serif-display text-2xl font-bold text-gradient-emerald">{result.lotSize}</p>
                </div>
                <div>
                  <p className="font-mono-system text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">Units</p>
                  <p className="font-serif-display text-2xl font-bold text-foreground">{result.units.toLocaleString()}</p>
                </div>
              </div>
              <p className="font-mono-system text-[10px] text-muted-foreground text-center mt-4">
                Based on major forex pair with $10/pip standard lot value.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LotSizeCalculator;
