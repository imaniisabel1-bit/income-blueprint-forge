import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { TrendingUp, Zap, ShieldCheck, BookOpen, Store, FileText, Globe, Users } from "lucide-react";

const niches = [
  {
    icon: BookOpen,
    number: 1,
    category: "KDP",
    title: 'The "Neuro-Efficiency" Planner',
    gap: 'General productivity planners are dead. High-niche planners for "Executive Function Support" (ADHD, Post-Graduate Research, etc.) are booming.',
    math: "$18.99 Retail | $6.12 Net Profit",
    velocity: "12 sales/day",
    highlight: "A 5-book series in this niche is currently valued at $85,000 on the exit market.",
    highlightLabel: "Asset Value",
  },
  {
    icon: Store,
    number: 2,
    category: "VENDING",
    title: 'The "Wellness-Tech" Micro-Pharmacy',
    gap: "Traditional soda/snack machines are low-margin. Machines placed in high-end pickleball courts or recovery centers selling electrolyte packs and grip-tape have 300% higher margins.",
    math: "$4.00 Unit Cost | $12.00 Sale Price",
    velocity: "50 units/week",
    highlight: 'Use "Vending-to-SaaS" tracking to monitor inventory remotely.',
    highlightLabel: "Infrastructure Tip",
  },
  {
    icon: FileText,
    number: 3,
    category: "DIGITAL",
    title: '"Compliance-as-a-Service" Templates',
    gap: 'Small businesses are terrified of new 2026 digital privacy laws. Selling "Audit-Ready" document templates for boutique agencies is the highest-converting digital product of the year.',
    math: "$47.00 per bundle",
    velocity: "High-conversion via Pinterest",
    highlight: 'Use Pinterest "Problem/Solution" pins for maximum conversion.',
    highlightLabel: "Strategy",
  },
  {
    icon: Globe,
    number: 4,
    category: "KDP",
    title: 'The "Heritage-Language" Workbooks',
    gap: "Bilingual workbooks for second-generation families (Spanglish, Taglish, etc.) are underserved.",
    math: "$14.50 Retail | $4.80 Net Profit",
    velocity: "Organic growth",
    highlight: 'These books have a higher "Organic Retention" rate, meaning lower ad-spend over time.',
    highlightLabel: "The Moat",
  },
  {
    icon: Users,
    number: 5,
    category: "HYBRID",
    title: 'The "Ladies Lounge" Local Guide',
    gap: 'Physical community is the new luxury. Creating hyper-local "Founder Guides" for specific cities and selling them both as KDP books and digital memberships.',
    math: "Recurring $19/mo",
    velocity: "City-by-city expansion",
    highlight: "Dual revenue: one-time book sales plus recurring digital membership.",
    highlightLabel: "The Play",
  },
];

const VelocityReport = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="container max-w-4xl px-6 py-24">
        {/* Report Header */}
        <div className="text-center mb-16">
          <p className="font-mono-system text-[10px] tracking-[0.3em] uppercase text-emerald-glow mb-4">
            Curated by Amaya Sol · IncomeDeck Systems
          </p>
          <h1 className="font-serif-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
            The 2026 Asset{" "}
            <span className="italic text-gradient-emerald">Velocity</span> Report
          </h1>
          <div className="w-16 h-px bg-emerald-glow mx-auto mb-6" />
          <p className="font-serif-display text-lg md:text-xl italic text-muted-foreground max-w-2xl mx-auto">
            "The difference between a hustle and an enterprise is the data you use to build it."
          </p>
        </div>

        {/* Context Block */}
        <div className="rounded-xl border border-emerald-light/20 bg-secondary/50 p-6 md:p-8 mb-12">
          <p className="font-mono-system text-sm text-muted-foreground leading-relaxed">
            In 2026, market saturation is real, but{" "}
            <strong className="text-foreground">Infrastructure Gaps</strong> are wider than ever.
            We've run the numbers through the Black Box. Here are the{" "}
            <strong className="text-emerald-glow">5 high-margin niches</strong> where $3 profit
            units are currently scaling to $50k assets.
          </p>
        </div>

        {/* Niche Cards */}
        <div className="space-y-8 mb-16">
          {niches.map((niche) => {
            const Icon = niche.icon;
            return (
              <div
                key={niche.number}
                className="rounded-xl border border-border bg-card p-6 md:p-8 hover:border-emerald-light/30 hover:shadow-emerald transition-all duration-500"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-emerald flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono-system text-[10px] tracking-[0.2em] uppercase px-2 py-0.5 rounded-full border border-emerald-light/20 text-emerald-glow">
                        {niche.category}
                      </span>
                      <span className="font-mono-system text-[10px] text-muted-foreground">
                        Niche #{niche.number}
                      </span>
                    </div>
                    <h2 className="font-serif-display text-xl md:text-2xl font-bold">
                      {niche.title}
                    </h2>
                  </div>
                </div>

                <p className="font-mono-system text-xs text-muted-foreground leading-relaxed mb-4">
                  <strong className="text-foreground">The Gap:</strong> {niche.gap}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-secondary border border-border">
                    <p className="font-mono-system text-[10px] text-muted-foreground mb-0.5">The Math</p>
                    <p className="font-mono-system text-sm font-bold text-emerald-glow">{niche.math}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary border border-border">
                    <p className="font-mono-system text-[10px] text-muted-foreground mb-0.5">Velocity Target</p>
                    <p className="font-mono-system text-sm font-bold">{niche.velocity}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary border border-border">
                    <p className="font-mono-system text-[10px] text-muted-foreground mb-0.5">{niche.highlightLabel}</p>
                    <p className="font-mono-system text-xs leading-relaxed">{niche.highlight}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Amaya's Final Word */}
        <div className="rounded-2xl border-2 border-emerald-light/30 bg-card p-8 md:p-10 text-center mb-12">
          <div className="w-12 h-12 rounded-full bg-gradient-emerald flex items-center justify-center mx-auto mb-4">
            <Zap className="h-6 w-6 text-primary-foreground" />
          </div>
          <p className="font-mono-system text-[10px] tracking-[0.3em] uppercase text-emerald-glow mb-3">
            Amaya's Final Word for 2026
          </p>
          <blockquote className="font-serif-display text-lg md:text-xl italic text-foreground max-w-2xl mx-auto leading-relaxed">
            "Do not chase volume. Chase velocity and margin. If your Net Reality Profit is under $4.00, the niche is too crowded. If it's over $6.00, scale until the ads hit your ceiling."
          </blockquote>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="font-mono-system text-xs text-muted-foreground mb-2">
            Ready to run the numbers on these niches?
          </p>
          <a
            href="/#calculator"
            className="inline-flex items-center gap-2 font-mono-system text-sm font-bold text-emerald-glow hover:underline"
          >
            <TrendingUp className="h-4 w-4" />
            Open the Reality Calculator →
          </a>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default VelocityReport;
