import { useState, useEffect } from "react";
import { Calculator, Target, AlertTriangle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { supabase } from "@/integrations/supabase/client";

interface IncomeKit {
  id: string;
  name: string;
  niche: string | null;
  base_pages: number | null;
  target_price: number | null;
}

// Waterfall cost constants
const PRINTING_COST_PER_PAGE = 0.012;
const AMAZON_FIXED_FEE = 3.25;
const AMAZON_COMMISSION_RATE = 0.40; // 40%
const AD_SPEND_RATE = 0.20; // 20% of gross
const TAX_RESERVE_RATE = 0.25; // 25% of net before tax
const DEFAULT_NICHE_MARKET_SIZE = 5000;

const TERM_DEFINITIONS: Record<string, string> = {
  "Gross Revenue": "The total money coming in before anyone (including Uncle Sam) touches it.",
  "Printing Fee": "Amazon's per-unit printing cost based on page count. This is non-negotiable.",
  "Amazon Commission": "Amazon takes 40% of your list price for distribution, fulfillment, and platform access.",
  "Ad-Ceiling": "The maximum you can spend on marketing before you start losing money on every sale. We target 20%.",
  "Tax Reserve": "Money that isn't yours. Put this in a separate high-yield savings account immediately.",
  "Take-Home Profit": "What actually hits your bank account after every cost is subtracted. This is your reality number.",
  "EBITDA": "Earnings Before Interest, Taxes, Depreciation, and Amortization. This is your 'Business Strength' score.",
};

const TermLabel = ({ term, label }: { term: string; label?: string }) => (
  <TooltipProvider delayDuration={0}>
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          className="inline-flex items-center gap-1 cursor-help border-b border-dashed border-muted-foreground/40 py-1 px-0.5 touch-manipulation"
          onClick={(e) => e.preventDefault()}
        >
          {label || term}
          <Info className="h-3 w-3 text-muted-foreground shrink-0" />
        </span>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs bg-card border-border">
        <p className="font-mono-system text-xs">
          <span className="text-emerald-glow font-bold">{term}:</span>{" "}
          {TERM_DEFINITIONS[term]}
        </p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const BusinessCalculator = () => {
  const [kits, setKits] = useState<IncomeKit[]>([]);
  const [selectedKit, setSelectedKit] = useState<string>("");
  const [pages, setPages] = useState(120);
  const [price, setPrice] = useState(15.0);
  const [result, setResult] = useState<{
    grossRevenue: number;
    printingFee: number;
    amazonCommission: number;
    adSpend: number;
    taxReserve: number;
    takeHome: number;
  } | null>(null);
  const [logged, setLogged] = useState(false);
  const [monthlyGoal, setMonthlyGoal] = useState<string>("");
  const [velocity, setVelocity] = useState<{
    salesNeeded: number;
    dailySales: number;
    saturationPct: number;
    highVelocity: boolean;
  } | null>(null);

  useEffect(() => {
    const fetchKits = async () => {
      const { data } = await supabase.from("income_kits").select("*");
      if (data) setKits(data as IncomeKit[]);
    };
    fetchKits();
  }, []);

  const handleKitSelect = (kitId: string) => {
    setSelectedKit(kitId);
    const kit = kits.find((k) => k.id === kitId);
    if (kit) {
      if (kit.base_pages) setPages(kit.base_pages);
      if (kit.target_price) setPrice(kit.target_price);
    }
  };

  const calculate = async () => {
    // Waterfall calculation
    const grossRevenue = price;
    const printingFee = AMAZON_FIXED_FEE + pages * PRINTING_COST_PER_PAGE;
    const amazonCommission = price * AMAZON_COMMISSION_RATE;
    const adSpend = price * AD_SPEND_RATE;
    const preTaxNet = grossRevenue - printingFee - amazonCommission - adSpend;
    const taxReserve = Math.max(0, preTaxNet * TAX_RESERVE_RATE);
    const takeHome = Math.max(0, preTaxNet - taxReserve);

    setResult({ grossRevenue, printingFee, amazonCommission, adSpend, taxReserve, takeHome });
    setLogged(false);

    // Volume & Velocity
    const goal = parseFloat(monthlyGoal);
    if (goal > 0 && takeHome > 0) {
      const salesNeeded = Math.ceil(goal / takeHome);
      const dailySales = Math.round((salesNeeded / 30) * 10) / 10;
      const saturationPct = Math.round((salesNeeded / DEFAULT_NICHE_MARKET_SIZE) * 100);
      setVelocity({ salesNeeded, dailySales, saturationPct, highVelocity: dailySales > 50 });
    } else {
      setVelocity(null);
    }

    // Log to calculation_logs
    await supabase.from("calculation_logs").insert({
      input_price: price,
      input_pages: pages,
      result_profit: parseFloat(takeHome.toFixed(2)),
    } as any);
    setLogged(true);
  };

  return (
    <section id="calculator" className="py-24 px-6 bg-background">
      <div className="container max-w-4xl">
        <div className="text-center mb-16">
          <p className="font-mono-system text-xs tracking-[0.3em] uppercase text-emerald-glow mb-4">
            Business Reality Calculator
          </p>
          <h2 className="font-serif-display text-4xl md:text-5xl font-bold mb-4">
            Run the <span className="italic text-gradient-emerald">Real</span> Numbers
          </h2>
          <p className="font-mono-system text-sm text-muted-foreground max-w-lg mx-auto">
            The full waterfall: Printing, Amazon's cut, Ad-Spend, and Tax Reserve. No inflated projections.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-8 md:p-12">
          {/* Quick Load */}
          <div className="mb-8">
            <label className="font-mono-system text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3 block">
              Quick Load — Sample Kit
            </label>
            <Select onValueChange={handleKitSelect} value={selectedKit}>
              <SelectTrigger className="w-full bg-secondary border-border font-mono-system text-sm">
                <SelectValue placeholder="Select a pre-loaded system..." />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {kits.map((kit) => (
                  <SelectItem key={kit.id} value={kit.id} className="font-mono-system text-sm">
                    {kit.name} — {kit.niche}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="font-mono-system text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3 block">
                Page Count
              </label>
              <Slider
                value={[pages]}
                onValueChange={(v) => setPages(v[0])}
                min={40}
                max={300}
                step={10}
                className="mb-2"
              />
              <p className="font-mono-system text-2xl font-bold text-foreground">
                {pages} <span className="text-sm text-muted-foreground">pages</span>
              </p>
            </div>
            <div>
              <label className="font-mono-system text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3 block">
                Sale Price
              </label>
              <Slider
                value={[price * 100]}
                onValueChange={(v) => setPrice(v[0] / 100)}
                min={499}
                max={2999}
                step={50}
                className="mb-2"
              />
              <p className="font-mono-system text-2xl font-bold text-foreground">${price.toFixed(2)}</p>
            </div>
          </div>

          {/* Monthly Goal */}
          <div className="mb-8">
            <label className="font-mono-system text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3 block">
              Monthly Income Goal (optional)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono-system text-muted-foreground text-sm">$</span>
              <Input
                type="number"
                placeholder="2000"
                value={monthlyGoal}
                onChange={(e) => setMonthlyGoal(e.target.value)}
                className="pl-7 bg-secondary border-border font-mono-system text-sm"
              />
            </div>
            <p className="font-mono-system text-[10px] text-muted-foreground mt-1">
              Enter your target to see the Volume & Velocity breakdown
            </p>
          </div>

          {/* Calculate */}
          <Button variant="emerald" size="lg" className="w-full mb-8" onClick={calculate}>
            <Calculator className="h-4 w-4 mr-2" />
            Calculate Reality Profit
          </Button>

          {/* Result — Hierarchy of Profit */}
          {result && (
            <div className="rounded-lg border border-emerald-light/20 bg-secondary/50 p-6 md:p-8 animate-fade-in">
              {/* Waterfall Steps */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between py-2">
                  <p className="font-mono-system text-xs text-muted-foreground">
                    <TermLabel term="Gross Revenue" label="Gross Total" />
                  </p>
                  <p className="font-mono-system text-lg font-bold text-foreground">${result.grossRevenue.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between py-2 border-t border-border">
                  <p className="font-mono-system text-xs text-muted-foreground">
                    <TermLabel term="Printing Fee" label='The "Amazon/Vending" Cut (Fees)' />
                  </p>
                  <p className="font-mono-system text-sm font-bold text-destructive">-${(result.printingFee + result.amazonCommission).toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between py-2 border-t border-border">
                  <p className="font-mono-system text-xs text-muted-foreground">
                    <TermLabel term="Tax Reserve" label='The "Uncle Sam" Reserve (Taxes)' />
                  </p>
                  <p className="font-mono-system text-sm font-bold text-destructive">-${result.taxReserve.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between py-2 border-t border-border">
                  <p className="font-mono-system text-xs text-muted-foreground">
                    <TermLabel term="Ad-Ceiling" label='The "Scaling Budget" (Ads/Marketing)' />
                  </p>
                  <p className="font-mono-system text-sm font-bold text-destructive">-${result.adSpend.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between py-3 px-4 mt-2 border-t-2 border-emerald-light/30 rounded-lg bg-card">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <p className="font-mono-system text-sm font-bold text-emerald-glow cursor-help inline-flex items-center gap-1.5">
                          NET REALITY PROFIT
                          <Info className="h-3 w-3" />
                        </p>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs bg-card border-border">
                        <p className="font-mono-system text-xs">
                          <span className="text-emerald-glow font-bold">Your Take Home:</span>{" "}
                          This is the money that hits your business bank account. It is 100% yours to reinvest or pay yourself.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <p className="font-serif-display text-3xl font-bold text-gradient-emerald">${result.takeHome.toFixed(2)}</p>
                </div>
              </div>
              <p className="font-mono-system text-[10px] text-muted-foreground text-center">
                Per unit sold · Full waterfall applied · {logged ? "✓ Logged to your vault" : "Logging..."}
              </p>

              {/* Volume & Velocity */}
              {velocity && (
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="h-4 w-4 text-emerald-glow" />
                    <p className="font-mono-system text-xs tracking-[0.2em] uppercase text-emerald-glow font-bold">
                      Volume & Velocity
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="font-mono-system text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">Monthly Sales Needed</p>
                      <p className="font-serif-display text-2xl font-bold text-foreground">{velocity.salesNeeded.toLocaleString()}</p>
                      <p className="font-mono-system text-[10px] text-muted-foreground">units/month</p>
                    </div>
                    <div>
                      <p className="font-mono-system text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">Daily Velocity</p>
                      <p className="font-serif-display text-2xl font-bold text-foreground">{velocity.dailySales}</p>
                      <p className="font-mono-system text-[10px] text-muted-foreground">sales/day</p>
                    </div>
                    <div>
                      <p className="font-mono-system text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">Niche Saturation</p>
                      <p className={`font-serif-display text-2xl font-bold ${velocity.saturationPct > 50 ? 'text-destructive' : velocity.saturationPct > 25 ? 'text-bone-muted' : 'text-emerald-glow'}`}>
                        {velocity.saturationPct}%
                      </p>
                      <p className="font-mono-system text-[10px] text-muted-foreground">of est. market</p>
                    </div>
                  </div>
                  {velocity.highVelocity && (
                    <div className="mt-4 flex items-start gap-2 p-3 rounded-md bg-destructive/10 border border-destructive/20">
                      <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                      <p className="font-mono-system text-[10px] text-destructive">
                        ⚠️ High Velocity required. Amaya recommends niche-splitting to reduce competition.
                      </p>
                    </div>
                  )}
                  {!velocity.highVelocity && velocity.saturationPct > 50 && (
                    <div className="mt-4 flex items-start gap-2 p-3 rounded-md bg-destructive/10 border border-destructive/20">
                      <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                      <p className="font-mono-system text-[10px] text-destructive">
                        High saturation warning — you'd need over 50% of the estimated niche market. Consider diversifying into adjacent niches or raising your price point.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BusinessCalculator;
