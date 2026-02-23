import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Target,
  BarChart3,
  RefreshCw,
  Flame,
  ShieldAlert,
  Zap,
} from "lucide-react";

interface ListingData {
  asin: string;
  title: string;
  ctr: number;
  cvr: number;
  acos: number;
  bsr: number;
  bsrPrev: number;
  impressions: number;
  clicks: number;
  orders: number;
  adSpend: number;
  revenue: number;
  royaltyPct: number;
}

interface KpiVerdict {
  label: string;
  value: string;
  status: "pass" | "warn" | "fail";
  icon: React.ReactNode;
  action: string;
}

const EMPTY_LISTING: ListingData = {
  asin: "",
  title: "",
  ctr: 0,
  cvr: 0,
  acos: 0,
  bsr: 0,
  bsrPrev: 0,
  impressions: 0,
  clicks: 0,
  orders: 0,
  adSpend: 0,
  revenue: 0,
  royaltyPct: 35,
};

const analyzeKpis = (d: ListingData): KpiVerdict[] => {
  const verdicts: KpiVerdict[] = [];

  // CTR Analysis
  const ctrStatus = d.ctr >= 0.5 ? "pass" : d.ctr >= 0.3 ? "warn" : "fail";
  verdicts.push({
    label: "CTR (Click-Through Rate)",
    value: `${d.ctr.toFixed(2)}%`,
    status: ctrStatus,
    icon: ctrStatus === "fail" ? <AlertTriangle className="h-5 w-5" /> : <Target className="h-5 w-5" />,
    action:
      ctrStatus === "fail"
        ? 'Cover is NOT "Thumb-Stopping." Redesign immediately — test bold contrast, larger title text, and niche-specific imagery. A/B test 3 variants.'
        : ctrStatus === "warn"
        ? "Cover is borderline. Test a new subtitle font or background color to push past 0.3% threshold."
        : "Cover is performing. Maintain current design — focus optimization elsewhere.",
  });

  // CVR Analysis
  const cvrStatus = d.cvr >= 8 ? "pass" : d.cvr >= 5 ? "warn" : "fail";
  verdicts.push({
    label: "CVR (Conversion Rate)",
    value: `${d.cvr.toFixed(1)}%`,
    status: cvrStatus,
    icon: cvrStatus === "fail" ? <ShieldAlert className="h-5 w-5" /> : <BarChart3 className="h-5 w-5" />,
    action:
      cvrStatus === "fail"
        ? "Listing is FAILING to convert. Audit: (1) Description — add bullet-point benefits, (2) A+ Content — add comparison charts, (3) Reviews — launch a review request sequence."
        : cvrStatus === "warn"
        ? "Conversion is acceptable but leaving money on the table. Optimize description keywords and add social proof elements."
        : "Strong conversion. This listing is convincing buyers effectively.",
  });

  // ACOS Analysis
  const acosThreshold = d.royaltyPct;
  const acosStatus = d.acos <= acosThreshold * 0.6 ? "pass" : d.acos <= acosThreshold ? "warn" : "fail";
  verdicts.push({
    label: "ACOS (Ad Cost of Sales)",
    value: `${d.acos.toFixed(1)}%`,
    status: acosStatus,
    icon: acosStatus === "fail" ? <Flame className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />,
    action:
      acosStatus === "fail"
        ? `ACOS exceeds your ${acosThreshold}% royalty — you are LOSING money on ads. Pause underperforming keywords, lower bids by 20%, and harvest converting terms into Exact Match campaigns.`
        : acosStatus === "warn"
        ? `ACOS is within royalty margin but thin. Tighten keyword targeting — move top converters to Manual Exact and reduce Broad match bids.`
        : `ACOS is healthy at ${((acosThreshold - d.acos) / acosThreshold * 100).toFixed(0)}% below royalty ceiling. Room to scale ad spend.`,
  });

  // BSR Analysis
  const bsrTrend = d.bsr < d.bsrPrev ? "improving" : d.bsr > d.bsrPrev ? "declining" : "flat";
  const bsrStatus = bsrTrend === "improving" ? "pass" : bsrTrend === "flat" ? "warn" : "fail";
  verdicts.push({
    label: "BSR (Best Seller Rank)",
    value: `#${d.bsr.toLocaleString()}`,
    status: bsrStatus,
    icon: bsrStatus === "fail" ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />,
    action:
      bsrStatus === "fail"
        ? `BSR rising from #${d.bsrPrev.toLocaleString()} → #${d.bsr.toLocaleString()} — competitors are out-optimizing this asset. Run a 7-day price promotion, increase ad spend by 30%, and refresh backend keywords.`
        : bsrStatus === "warn"
        ? "BSR is flat. Run a limited Kindle Countdown Deal or increase Close Match ad budget to generate velocity."
        : `BSR improving from #${d.bsrPrev.toLocaleString()} → #${d.bsr.toLocaleString()}. Momentum is building — maintain current strategy.`,
  });

  // Cross-KPI: High CVR + Low Impressions = Pour Gas
  if (d.cvr >= 5 && d.impressions < 5000) {
    verdicts.push({
      label: "🔥 CEO Signal: High CVR / Low Impressions",
      value: "SCALE NOW",
      status: "warn",
      icon: <Zap className="h-5 w-5" />,
      action:
        'This asset converts but nobody sees it. POUR MORE GAS — increase daily ad budget by 50-100%, add Sponsored Brand campaigns, and expand to "Loose Match" targeting to widen the funnel.',
    });
  }

  return verdicts;
};

const statusColor = (s: "pass" | "warn" | "fail") =>
  s === "pass"
    ? "text-emerald-glow border-emerald-glow/30 bg-emerald-glow/5"
    : s === "warn"
    ? "text-yellow-400 border-yellow-400/30 bg-yellow-400/5"
    : "text-red-400 border-red-400/30 bg-red-400/5";

const KdpListingOptimizer = () => {
  const [listing, setListing] = useState<ListingData>(EMPTY_LISTING);
  const [verdicts, setVerdicts] = useState<KpiVerdict[]>([]);
  const [hasRun, setHasRun] = useState(false);

  const update = (field: keyof ListingData, val: string) => {
    setListing((prev) => ({
      ...prev,
      [field]: field === "asin" || field === "title" ? val : parseFloat(val) || 0,
    }));
  };

  const runAudit = () => {
    // Auto-calculate derived KPIs if raw numbers provided
    const derived = { ...listing };
    if (derived.impressions > 0 && derived.clicks > 0 && derived.ctr === 0) {
      derived.ctr = (derived.clicks / derived.impressions) * 100;
    }
    if (derived.clicks > 0 && derived.orders > 0 && derived.cvr === 0) {
      derived.cvr = (derived.orders / derived.clicks) * 100;
    }
    if (derived.revenue > 0 && derived.adSpend > 0 && derived.acos === 0) {
      derived.acos = (derived.adSpend / derived.revenue) * 100;
    }
    setListing(derived);
    setVerdicts(analyzeKpis(derived));
    setHasRun(true);
  };

  const reset = () => {
    setListing(EMPTY_LISTING);
    setVerdicts([]);
    setHasRun(false);
  };

  return (
    <div className="space-y-6">
      {/* Input Panel */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="font-serif-display text-xl flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-emerald-glow" />
            KDP Listing Optimizer — CEO Analytics Audit
          </CardTitle>
          <p className="font-mono-system text-xs text-muted-foreground">
            Input your KDP dashboard metrics. The system will diagnose each KPI against CEO-level thresholds and output precise corrective actions.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Asset ID */}
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="font-mono-system text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1 block">ASIN</label>
              <Input value={listing.asin} onChange={(e) => update("asin", e.target.value)} placeholder="B0XXXXXXXXX" className="bg-secondary border-border font-mono-system text-xs" />
            </div>
            <div>
              <label className="font-mono-system text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1 block">Book Title</label>
              <Input value={listing.title} onChange={(e) => update("title", e.target.value)} placeholder="e.g. The Legacy Planner" className="bg-secondary border-border font-mono-system text-xs" />
            </div>
          </div>

          {/* Direct KPI Inputs */}
          <div>
            <p className="font-mono-system text-[10px] tracking-[0.2em] uppercase text-emerald-glow mb-2">Direct KPI Entry (or leave blank to auto-calculate from raw data)</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="font-mono-system text-[10px] text-muted-foreground mb-1 block">CTR %</label>
                <Input type="number" step="0.01" value={listing.ctr || ""} onChange={(e) => update("ctr", e.target.value)} placeholder="0.45" className="bg-secondary border-border font-mono-system text-xs" />
              </div>
              <div>
                <label className="font-mono-system text-[10px] text-muted-foreground mb-1 block">CVR %</label>
                <Input type="number" step="0.1" value={listing.cvr || ""} onChange={(e) => update("cvr", e.target.value)} placeholder="7.2" className="bg-secondary border-border font-mono-system text-xs" />
              </div>
              <div>
                <label className="font-mono-system text-[10px] text-muted-foreground mb-1 block">ACOS %</label>
                <Input type="number" step="0.1" value={listing.acos || ""} onChange={(e) => update("acos", e.target.value)} placeholder="22.5" className="bg-secondary border-border font-mono-system text-xs" />
              </div>
              <div>
                <label className="font-mono-system text-[10px] text-muted-foreground mb-1 block">Royalty %</label>
                <Input type="number" step="1" value={listing.royaltyPct || ""} onChange={(e) => update("royaltyPct", e.target.value)} placeholder="35" className="bg-secondary border-border font-mono-system text-xs" />
              </div>
            </div>
          </div>

          {/* Raw Data Inputs */}
          <div>
            <p className="font-mono-system text-[10px] tracking-[0.2em] uppercase text-emerald-glow mb-2">Raw Dashboard Data (auto-calculates CTR / CVR / ACOS)</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <label className="font-mono-system text-[10px] text-muted-foreground mb-1 block">Impressions</label>
                <Input type="number" value={listing.impressions || ""} onChange={(e) => update("impressions", e.target.value)} placeholder="12500" className="bg-secondary border-border font-mono-system text-xs" />
              </div>
              <div>
                <label className="font-mono-system text-[10px] text-muted-foreground mb-1 block">Clicks</label>
                <Input type="number" value={listing.clicks || ""} onChange={(e) => update("clicks", e.target.value)} placeholder="56" className="bg-secondary border-border font-mono-system text-xs" />
              </div>
              <div>
                <label className="font-mono-system text-[10px] text-muted-foreground mb-1 block">Orders</label>
                <Input type="number" value={listing.orders || ""} onChange={(e) => update("orders", e.target.value)} placeholder="4" className="bg-secondary border-border font-mono-system text-xs" />
              </div>
              <div>
                <label className="font-mono-system text-[10px] text-muted-foreground mb-1 block">Ad Spend ($)</label>
                <Input type="number" step="0.01" value={listing.adSpend || ""} onChange={(e) => update("adSpend", e.target.value)} placeholder="35.00" className="bg-secondary border-border font-mono-system text-xs" />
              </div>
              <div>
                <label className="font-mono-system text-[10px] text-muted-foreground mb-1 block">Revenue ($)</label>
                <Input type="number" step="0.01" value={listing.revenue || ""} onChange={(e) => update("revenue", e.target.value)} placeholder="142.80" className="bg-secondary border-border font-mono-system text-xs" />
              </div>
            </div>
          </div>

          {/* BSR */}
          <div>
            <p className="font-mono-system text-[10px] tracking-[0.2em] uppercase text-emerald-glow mb-2">Best Seller Rank Tracking</p>
            <div className="grid grid-cols-2 gap-3 max-w-sm">
              <div>
                <label className="font-mono-system text-[10px] text-muted-foreground mb-1 block">Current BSR</label>
                <Input type="number" value={listing.bsr || ""} onChange={(e) => update("bsr", e.target.value)} placeholder="45000" className="bg-secondary border-border font-mono-system text-xs" />
              </div>
              <div>
                <label className="font-mono-system text-[10px] text-muted-foreground mb-1 block">Previous BSR</label>
                <Input type="number" value={listing.bsrPrev || ""} onChange={(e) => update("bsrPrev", e.target.value)} placeholder="52000" className="bg-secondary border-border font-mono-system text-xs" />
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={runAudit} className="gap-2 bg-gradient-emerald hover:opacity-90 font-mono-system text-xs">
              <BarChart3 className="h-4 w-4" /> Run CEO Audit
            </Button>
            {hasRun && (
              <Button onClick={reset} variant="outline" className="gap-2 font-mono-system text-xs">
                <RefreshCw className="h-4 w-4" /> Reset
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Verdicts */}
      {hasRun && verdicts.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-serif-display text-xl font-bold flex items-center gap-2">
            <Target className="h-5 w-5 text-emerald-glow" />
            Diagnostic Report {listing.title && <span className="text-muted-foreground font-mono-system text-sm">— {listing.title}</span>}
          </h3>

          {verdicts.map((v, i) => (
            <Card key={i} className={`border ${statusColor(v.status)}`}>
              <CardContent className="py-4 px-5 flex flex-col sm:flex-row items-start gap-4">
                <div className={`shrink-0 mt-0.5 ${v.status === "pass" ? "text-emerald-glow" : v.status === "warn" ? "text-yellow-400" : "text-red-400"}`}>
                  {v.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <span className="font-mono-system text-xs font-bold">{v.label}</span>
                    <span className={`font-serif-display text-lg font-bold ${v.status === "pass" ? "text-emerald-glow" : v.status === "warn" ? "text-yellow-400" : "text-red-400"}`}>
                      {v.value}
                    </span>
                    <span className={`font-mono-system text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full border ${statusColor(v.status)}`}>
                      {v.status === "pass" ? "PASS" : v.status === "warn" ? "OPTIMIZE" : "CRITICAL"}
                    </span>
                  </div>
                  <p className="font-mono-system text-xs text-foreground/80 leading-relaxed">{v.action}</p>
                </div>
                <div className="shrink-0">
                  {v.status === "pass" ? (
                    <CheckCircle className="h-5 w-5 text-emerald-glow" />
                  ) : v.status === "warn" ? (
                    <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  ) : (
                    <ShieldAlert className="h-5 w-5 text-red-400" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* CEO Summary */}
          <Card className="border-emerald-glow/30 bg-emerald-glow/5">
            <CardContent className="py-5 px-5">
              <h4 className="font-serif-display text-lg font-bold text-emerald-glow mb-2">CEO Action Summary</h4>
              <ul className="space-y-2">
                {verdicts.filter((v) => v.status !== "pass").map((v, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className={`font-mono-system text-[10px] mt-1 ${v.status === "warn" ? "text-yellow-400" : "text-red-400"}`}>▸</span>
                    <span className="font-mono-system text-xs text-foreground/80">{v.action}</span>
                  </li>
                ))}
                {verdicts.every((v) => v.status === "pass") && (
                  <li className="font-mono-system text-xs text-emerald-glow">
                    ✓ All KPIs passing. This asset is performing as a recurring yield engine. Monitor weekly and maintain current strategy.
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default KdpListingOptimizer;
