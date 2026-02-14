import { useState, useEffect } from "react";
import { Calculator, Target, AlertTriangle, Info, TrendingUp } from "lucide-react";
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

const PRINTING_COST_PER_PAGE = 0.012;
const AMAZON_FIXED_FEE = 3.25;
const AMAZON_COMMISSION_RATE = 0.40;
const TAX_RESERVE_RATE = 0.25;

const TERM_DEFINITIONS: Record<string, string> = {
  "Catalog Size": "The number of books in your brand catalog. More titles = more organic discoverability and lower per-title ad costs.",
  "Brand Effect": "With a 10-book catalog, your Cost-Per-Click drops ~40% because returning customers and cross-sells reduce acquisition costs.",
  "Net Reality Profit": "What actually hits your bank account after every cost is subtracted — per unit, across your entire catalog.",
  "Ad Efficiency": "Higher volume = lower CPC. A single book spends $3/click. A 10-book brand spends ~$1.80/click due to retargeting and organic lift.",
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
  const [catalogSize, setCatalogSize] = useState(10);
  const [dailySalesPerTitle, setDailySalesPerTitle] = useState(4);
  const [monthlyGoal, setMonthlyGoal] = useState<string>("2000");
  const [result, setResult] = useState<{
    unitProfit: number;
    totalDailySales: number;
    monthlyRevenue: number;
    monthlyAdSpend: number;
    monthlyTax: number;
    monthlyNetProfit: number;
    catalogNeeded: number;
    salesPerTitle: number;
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
    // Per-unit costs
    const printingFee = AMAZON_FIXED_FEE + pages * PRINTING_COST_PER_PAGE;
    const amazonCommission = price * AMAZON_COMMISSION_RATE;
    const unitProfit = price - printingFee - amazonCommission;

    // Catalog scaling
    const totalDailySales = catalogSize * dailySalesPerTitle;
    const monthlyUnits = totalDailySales * 30;
    const monthlyRevenue = monthlyUnits * price;

    // Brand effect: ad spend scales DOWN with catalog size
    // Single book: 20% of revenue. 10-book catalog: ~12% due to brand recognition.
    const adSpendRate = Math.max(0.08, 0.22 - (catalogSize * 0.012));
    const monthlyAdSpend = monthlyRevenue * adSpendRate;

    const preTaxNet = (monthlyUnits * unitProfit) - monthlyAdSpend;
    const monthlyTax = Math.max(0, preTaxNet * TAX_RESERVE_RATE);
    const monthlyNetProfit = Math.max(0, preTaxNet - monthlyTax);

    // Reverse: how many titles needed for goal?
    const goal = parseFloat(monthlyGoal) || 2000;
    const profitPerTitleMonth = dailySalesPerTitle * 30 * unitProfit;
    const adjustedProfitPerTitle = profitPerTitleMonth * (1 - adSpendRate) * (1 - TAX_RESERVE_RATE);
    const catalogNeeded = Math.max(1, Math.ceil(goal / adjustedProfitPerTitle));

    setResult({
      unitProfit,
      totalDailySales,
      monthlyRevenue,
      monthlyAdSpend,
      monthlyTax,
      monthlyNetProfit,
      catalogNeeded,
      salesPerTitle: dailySalesPerTitle,
    });

    await supabase.from("calculation_logs").insert({
      input_price: price,
      input_pages: pages,
      result_profit: parseFloat(monthlyNetProfit.toFixed(2)),
    } as any);
  };

  return (
    <section id="calculator" className="py-24 px-6 bg-background">
      <div className="container max-w-4xl">
        <div className="text-center mb-16">
          <p className="font-mono-system text-xs tracking-[0.3em] uppercase text-emerald-glow mb-4">
            Catalog Scaling Calculator
          </p>
          <h2 className="font-serif-display text-4xl md:text-5xl font-bold mb-4">
            The <span className="italic text-gradient-emerald">Brand Effect</span>
          </h2>
          <p className="font-mono-system text-sm text-muted-foreground max-w-lg mx-auto">
            Stop thinking one book. Think 10-book catalog. The math changes when you scale like a brand, not a hobbyist.
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

          {/* Sliders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="font-mono-system text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3 block">
                Page Count
              </label>
              <Slider value={[pages]} onValueChange={(v) => setPages(v[0])} min={40} max={300} step={10} className="mb-2" />
              <p className="font-mono-system text-2xl font-bold text-foreground">
                {pages} <span className="text-sm text-muted-foreground">pages</span>
              </p>
            </div>
            <div>
              <label className="font-mono-system text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3 block">
                Sale Price
              </label>
              <Slider value={[price * 100]} onValueChange={(v) => setPrice(v[0] / 100)} min={499} max={2999} step={50} className="mb-2" />
              <p className="font-mono-system text-2xl font-bold text-foreground">${price.toFixed(2)}</p>
            </div>
            <div>
              <label className="font-mono-system text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3 block">
                <TermLabel term="Catalog Size" />
              </label>
              <Slider value={[catalogSize]} onValueChange={(v) => setCatalogSize(v[0])} min={1} max={25} step={1} className="mb-2" />
              <p className="font-mono-system text-2xl font-bold text-foreground">
                {catalogSize} <span className="text-sm text-muted-foreground">titles</span>
              </p>
            </div>
            <div>
              <label className="font-mono-system text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3 block">
                Daily Sales Per Title
              </label>
              <Slider value={[dailySalesPerTitle]} onValueChange={(v) => setDailySalesPerTitle(v[0])} min={1} max={20} step={1} className="mb-2" />
              <p className="font-mono-system text-2xl font-bold text-foreground">
                {dailySalesPerTitle} <span className="text-sm text-muted-foreground">copies/day</span>
              </p>
            </div>
          </div>

          {/* Monthly Goal */}
          <div className="mb-8">
            <label className="font-mono-system text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3 block">
              Monthly Income Goal
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
          </div>

          <Button variant="emerald" size="lg" className="w-full mb-8" onClick={calculate}>
            <Calculator className="h-4 w-4 mr-2" />
            Calculate Brand Profit
          </Button>

          {/* Result */}
          {result && (
            <div className="rounded-lg border border-emerald-light/20 bg-secondary/50 p-6 md:p-8 animate-fade-in">
              {/* Hero Number */}
              <div className="text-center mb-8">
                <p className="font-mono-system text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
                  Monthly Net Profit (After All Costs)
                </p>
                <p className="font-serif-display text-5xl md:text-6xl font-bold text-gradient-emerald">
                  ${result.monthlyNetProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>

              {/* Breakdown Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 rounded-lg bg-card">
                  <p className="font-mono-system text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">Per-Unit Profit</p>
                  <p className="font-serif-display text-xl font-bold text-foreground">${result.unitProfit.toFixed(2)}</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-card">
                  <p className="font-mono-system text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">Daily Sales (Total)</p>
                  <p className="font-serif-display text-xl font-bold text-foreground">{result.totalDailySales}</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-card">
                  <p className="font-mono-system text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">
                    <TermLabel term="Ad Efficiency" label="Ad Spend" />
                  </p>
                  <p className="font-mono-system text-lg font-bold text-destructive">
                    -${result.monthlyAdSpend.toFixed(0)}
                  </p>
                </div>
                <div className="text-center p-3 rounded-lg bg-card">
                  <p className="font-mono-system text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">Tax Reserve</p>
                  <p className="font-mono-system text-lg font-bold text-destructive">
                    -${result.monthlyTax.toFixed(0)}
                  </p>
                </div>
              </div>

              {/* Goal Reverse */}
              <div className="p-4 rounded-lg bg-card border border-emerald-light/20">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-4 w-4 text-emerald-glow" />
                  <p className="font-mono-system text-xs tracking-[0.2em] uppercase text-emerald-glow font-bold">
                    Your Path to ${parseInt(monthlyGoal || "2000").toLocaleString()}/mo
                  </p>
                </div>
                <p className="font-mono-system text-sm text-foreground">
                  You need a catalog of{" "}
                  <span className="font-bold text-emerald-glow">{result.catalogNeeded} books</span>{" "}
                  selling{" "}
                  <span className="font-bold text-emerald-glow">{result.salesPerTitle} copies each</span>{" "}
                  per day.
                </p>
                {result.catalogNeeded > 15 && (
                  <div className="mt-3 flex items-start gap-2 p-3 rounded-md bg-destructive/10 border border-destructive/20">
                    <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                    <p className="font-mono-system text-[10px] text-destructive">
                      High catalog count. Consider raising your price point or increasing daily sales per title.
                    </p>
                  </div>
                )}
              </div>

              {/* Scaling Tiers */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-4 w-4 text-emerald-glow" />
                  <p className="font-mono-system text-xs tracking-[0.2em] uppercase text-emerald-glow font-bold">
                    Scaling Tiers
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { level: "Seed", titles: 1, label: "1 Product" },
                    { level: "Forest", titles: 10, label: "10-Book Brand" },
                    { level: "Empire", titles: 25, label: "25 Titles + Trading" },
                  ].map((tier) => {
                    const tierUnits = tier.titles * dailySalesPerTitle * 30;
                    const tierRev = tierUnits * price;
                    const tierAdRate = Math.max(0.08, 0.22 - (tier.titles * 0.012));
                    const tierAds = tierRev * tierAdRate;
                    const tierNet = Math.max(0, (tierUnits * result.unitProfit - tierAds) * (1 - TAX_RESERVE_RATE));
                    return (
                      <div key={tier.level} className="p-4 rounded-lg border border-border bg-card text-center">
                        <p className="font-mono-system text-[10px] tracking-[0.2em] uppercase text-emerald-glow mb-1">
                          Level: {tier.level}
                        </p>
                        <p className="font-mono-system text-[10px] text-muted-foreground mb-2">{tier.label}</p>
                        <p className="font-serif-display text-2xl font-bold text-gradient-emerald">
                          ${tierNet.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </p>
                        <p className="font-mono-system text-[10px] text-muted-foreground">/month</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BusinessCalculator;
