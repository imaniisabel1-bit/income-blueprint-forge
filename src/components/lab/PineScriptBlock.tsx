import { Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const PineScriptBlock = () => {
  return (
    <section className="py-16 px-6 bg-secondary/30">
      <div className="container max-w-4xl">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Lock className="h-4 w-4 text-emerald-glow" />
            <p className="font-mono-system text-xs tracking-[0.3em] uppercase text-emerald-glow">
              Proprietary Algorithm
            </p>
          </div>
          <h2 className="font-serif-display text-3xl md:text-4xl font-bold">
            The <span className="italic text-gradient-emerald">Amaya Alpha</span> Bot
          </h2>
          <p className="font-mono-system text-sm text-muted-foreground max-w-lg mx-auto">
            A self-improving, EMA-cross algorithmic strategy engineered for 2026 volatility. Source code is invite-only — your edge stays your edge.
          </p>

          {/* Locked visual */}
          <div className="rounded-xl border border-border bg-card overflow-hidden max-w-2xl mx-auto">
            <div className="p-1 bg-muted border-b border-border flex items-center gap-2">
              <div className="flex gap-1.5 px-2">
                <div className="w-2.5 h-2.5 rounded-full bg-destructive/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-bone-muted/30" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-glow/30" />
              </div>
              <span className="font-mono-system text-[10px] text-muted-foreground">amaya-alpha-v2.pine — LOCKED</span>
            </div>
            <div className="p-12 flex flex-col items-center gap-4">
              <ShieldCheck className="h-12 w-12 text-emerald-glow/40" />
              <p className="font-mono-system text-xs text-muted-foreground">
                Source code protected under Sol-System IP Protocol
              </p>
            </div>
          </div>

          {/* CTA */}
          <a href="mailto:contact@solsystemglobal.com?subject=Amaya%20Alpha%20Access%20Request">
            <Button
              size="lg"
              className="bg-gradient-emerald hover:opacity-90 font-mono-system text-sm tracking-wide mt-4"
            >
              Apply for Amaya Alpha Access
            </Button>
          </a>

          <p className="font-mono-system text-[10px] text-muted-foreground italic">
            "In the Sol-System, we sell the light — not the blueprints for the sun."
          </p>
        </div>
      </div>
    </section>
  );
};

export default PineScriptBlock;
