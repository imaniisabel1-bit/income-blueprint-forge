import { Target, ArrowRight, Search, TrendingUp, RefreshCw, DollarSign, BarChart3 } from "lucide-react";

const STEPS = [
  {
    phase: "Phase 1",
    title: "Launch Auto-Campaign",
    duration: "Day 1",
    icon: Target,
    color: "text-emerald-glow",
    details: [
      { label: "Campaign Type", value: "Sponsored Products — Automatic Targeting" },
      { label: "Daily Budget", value: "$5.00" },
      { label: "Bidding Strategy", value: "Dynamic Bids — Down Only" },
      { label: "Ad Group", value: "1 ad group per book (clean data)" },
    ],
  },
  {
    phase: "Phase 2",
    title: "Algorithm Indexing",
    duration: "Days 1–14",
    icon: Search,
    color: "text-emerald-glow",
    details: [
      { label: "Close Match", value: "Amazon indexes your book against exact keyword variations buyers search" },
      { label: "Loose Match", value: "Amazon tests your book against broad, adjacent search queries — forcing wide discoverability" },
    ],
    proof: "By running both Close Match and Loose Match simultaneously, the architect forces Amazon's algorithm to index the book against the widest possible range of customer search queries. This is not optional — it is the mechanism that makes the algorithm aware your book exists for dozens of keyword clusters it would otherwise never surface for.",
  },
  {
    phase: "Phase 3",
    title: "Harvest Keywords",
    duration: "Day 14",
    icon: BarChart3,
    color: "text-emerald-glow",
    details: [
      { label: "Action", value: 'Download "Search Term Report" from Amazon Advertising Console' },
      { label: "Filter", value: "Isolate every keyword that produced at least 1 sale" },
      { label: "Result", value: "A proven list of buyer-intent keywords — paid for with data, not guesswork" },
    ],
  },
  {
    phase: "Phase 4",
    title: "Manual Campaign Deployment",
    duration: "Day 15+",
    icon: TrendingUp,
    color: "text-emerald-glow",
    details: [
      { label: "Action", value: "Move winning keywords into a Manual Keyword Campaign" },
      { label: "Bid", value: "Higher bid than auto-campaign (you're now bidding on proven converters)" },
      { label: "Effect", value: "Amazon learns exactly who your book is for → higher organic rankings → better BSR" },
    ],
  },
];

const KdpAdScript = () => {
  return (
    <section className="py-16 px-6">
      <div className="container max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <DollarSign className="h-4 w-4 text-emerald-glow" />
            <p className="font-mono-system text-xs tracking-[0.3em] uppercase text-emerald-glow">
              The $5/Day Ad Script
            </p>
          </div>
          <h2 className="font-serif-display text-3xl md:text-4xl font-bold mb-3">
            Forcing the <span className="italic text-gradient-emerald">Algorithm</span>
          </h2>
          <p className="font-mono-system text-sm text-muted-foreground max-w-xl mx-auto">
            A $5/day auto-campaign that buys data — not just sales. This script teaches Amazon exactly who your book is for.
          </p>
        </div>

        {/* Flow Steps */}
        <div className="space-y-0">
          {STEPS.map((step, i) => (
            <div key={step.phase}>
              <div className="rounded-xl border border-border bg-card p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-glow/10 border border-emerald-glow/20 flex items-center justify-center shrink-0">
                    <step.icon className={`h-5 w-5 ${step.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <span className="font-mono-system text-[10px] tracking-[0.2em] uppercase px-2 py-0.5 rounded-full border border-emerald-glow/20 text-emerald-glow">
                        {step.phase}
                      </span>
                      <span className="font-mono-system text-[10px] text-muted-foreground">{step.duration}</span>
                    </div>
                    <h3 className="font-serif-display text-xl font-bold mb-4">{step.title}</h3>

                    {/* Settings Grid */}
                    <div className="space-y-2">
                      {step.details.map((d) => (
                        <div key={d.label} className="flex gap-3 items-start">
                          <span className="font-mono-system text-[10px] tracking-[0.15em] uppercase text-muted-foreground shrink-0 w-28 pt-0.5">
                            {d.label}
                          </span>
                          <span className="font-mono-system text-xs text-foreground/90 leading-relaxed">
                            {d.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Proof callout for Phase 2 */}
                    {step.proof && (
                      <div className="mt-4 p-4 rounded-lg border border-emerald-glow/20 bg-emerald-glow/5">
                        <p className="font-mono-system text-[10px] tracking-[0.2em] uppercase text-emerald-glow mb-2 font-bold">
                          Why This Works
                        </p>
                        <p className="font-mono-system text-xs text-foreground/80 leading-relaxed">
                          {step.proof}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Connector Arrow */}
              {i < STEPS.length - 1 && (
                <div className="flex justify-center py-2">
                  <ArrowRight className="h-5 w-5 text-emerald-glow rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Continuous Cycle Callout */}
        <div className="mt-8 rounded-xl border-2 border-emerald-glow/30 bg-card p-6 md:p-8 text-center">
          <RefreshCw className="h-8 w-8 text-emerald-glow mx-auto mb-3 animate-spin" style={{ animationDuration: "8s" }} />
          <h3 className="font-serif-display text-2xl font-bold mb-3">
            The <span className="text-gradient-emerald">Recurring Cycle</span>
          </h3>
          <p className="font-mono-system text-xs text-foreground/80 max-w-lg mx-auto leading-relaxed">
            Every 14 days, download the Search Term Report. Move converting keywords to Manual Campaigns with higher bids. The auto-campaign continues discovering new queries while your manual campaigns dominate proven ones. This process <span className="text-emerald-glow font-bold">teaches Amazon exactly who your book is for</span>, compounding organic rankings and Best Seller Rank over time — transforming a new listing into a recurring yield asset.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-4">
            {[
              { label: "New Listing", sub: "Day 1" },
              { label: "Data Asset", sub: "Day 14" },
              { label: "Yield Asset", sub: "Day 30+" },
            ].map((s) => (
              <div key={s.label} className="p-3 rounded-lg border border-border bg-secondary/50">
                <p className="font-mono-system text-[10px] text-muted-foreground mb-1">{s.sub}</p>
                <p className="font-serif-display text-sm font-bold text-emerald-glow">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default KdpAdScript;
