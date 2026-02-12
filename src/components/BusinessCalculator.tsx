import { useState, useEffect } from "react";
import { Calculator, ChevronDown, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

interface IncomeKit {
  id: string;
  name: string;
  niche: string | null;
  base_pages: number | null;
  target_price: number | null;
}

const PRINTING_COST_PER_PAGE = 0.012;
const AMAZON_ROYALTY_RATE = 0.6;
const GLAZE_TAX = 0.20; // 20% hidden costs

const BusinessCalculator = () => {
  const [kits, setKits] = useState<IncomeKit[]>([]);
  const [selectedKit, setSelectedKit] = useState<string>("");
  const [pages, setPages] = useState(120);
  const [price, setPrice] = useState(12.99);
  const [result, setResult] = useState<{ grossProfit: number; netProfit: number; glazeTax: number; printingCost: number } | null>(null);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const fetchKits = async () => {
      const { data } = await supabase
        .from("income_kits")
        .select("*");
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
    const printingCost = pages * PRINTING_COST_PER_PAGE;
    const amazonRoyalty = price * AMAZON_ROYALTY_RATE;
    const grossProfit = amazonRoyalty - printingCost;
    const glazeTax = grossProfit * GLAZE_TAX;
    const netProfit = grossProfit - glazeTax;

    setResult({ grossProfit, netProfit, glazeTax, printingCost });
    setLogged(false);

    // Log to calculation_logs (data sovereignty)
    await supabase.from("calculation_logs").insert({
      input_price: price,
      input_pages: pages,
      result_profit: parseFloat(netProfit.toFixed(2)),
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
            No inflated projections. We subtract printing, Amazon's cut, and the "Glaze Tax" (hidden costs gurus never mention).
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
              <p className="font-mono-system text-2xl font-bold text-foreground">{pages} <span className="text-sm text-muted-foreground">pages</span></p>
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

          {/* Calculate */}
          <Button variant="emerald" size="lg" className="w-full mb-8" onClick={calculate}>
            <Calculator className="h-4 w-4 mr-2" />
            Calculate Reality Profit
          </Button>

          {/* Result */}
          {result && (
            <div className="rounded-lg border border-emerald-light/20 bg-secondary/50 p-6 animate-fade-in">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="font-mono-system text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">Printing</p>
                  <p className="font-mono-system text-lg font-bold text-destructive">-${result.printingCost.toFixed(2)}</p>
                </div>
                <div>
                  <p className="font-mono-system text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">Gross Profit</p>
                  <p className="font-mono-system text-lg font-bold text-foreground">${result.grossProfit.toFixed(2)}</p>
                </div>
                <div>
                  <p className="font-mono-system text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">Glaze Tax (20%)</p>
                  <p className="font-mono-system text-lg font-bold text-destructive">-${result.glazeTax.toFixed(2)}</p>
                </div>
                <div className="border-l border-emerald-light/20 pl-4">
                  <p className="font-mono-system text-[10px] tracking-[0.2em] uppercase text-emerald-glow mb-1">Reality Profit</p>
                  <p className="font-serif-display text-3xl font-bold text-gradient-emerald">${result.netProfit.toFixed(2)}</p>
                </div>
              </div>
              <p className="font-mono-system text-[10px] text-muted-foreground text-center mt-4">
                Per unit sold · Amazon 60% royalty · {logged ? "✓ Logged to your vault" : "Logging..."}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BusinessCalculator;
