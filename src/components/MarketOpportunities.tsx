import { ExternalLink, Store, BookOpen, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const opportunities = [
  {
    icon: Store,
    type: "Vending Route",
    title: "12-Machine Healthy Snack Route — Atlanta, GA",
    askingPrice: "$48,000",
    monthlyRevenue: "$4,200/mo",
    description: "Established locations in gyms and coworking spaces. All machines less than 2 years old. Seller-financed option available.",
    source: "BizBuySell",
  },
  {
    icon: BookOpen,
    type: "KDP Account",
    title: "15-Title Low-Content Book Portfolio — Planners & Journals",
    askingPrice: "$32,000",
    monthlyRevenue: "$2,800/mo",
    description: "Evergreen planner niche with 4.3★ avg reviews. Includes all design files, keyword research, and ad accounts.",
    source: "Empire Flippers",
  },
  {
    icon: TrendingUp,
    type: "Digital Asset",
    title: "Notion Template Store — Productivity & Finance",
    askingPrice: "$18,500",
    monthlyRevenue: "$1,600/mo",
    description: "12 templates with 8,000+ sales. Includes Gumroad storefront, email list of 3,200 subscribers, and all IP.",
    source: "Empire Flippers",
  },
];

const MarketOpportunities = () => {
  return (
    <section className="py-24 px-6">
      <div className="container max-w-5xl">
        <div className="text-center mb-16">
          <p className="font-mono-system text-xs tracking-[0.3em] uppercase text-emerald-glow mb-4">
            Market Opportunities
          </p>
          <h2 className="font-serif-display text-4xl md:text-5xl font-bold mb-4">
            What You're <span className="italic text-gradient-emerald">Building Towards</span>
          </h2>
          <p className="font-mono-system text-sm text-muted-foreground max-w-lg mx-auto">
            Live acquisition opportunities. These are real businesses built with the same systems — now available for purchase.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {opportunities.map((opp, index) => {
            const Icon = opp.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-xl border border-border bg-card hover:border-emerald-light/30 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono-system text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-full border border-emerald-light/20 text-emerald-glow">
                    {opp.type}
                  </span>
                  <span className="font-mono-system text-[10px] text-muted-foreground">{opp.source}</span>
                </div>

                <div className="w-10 h-10 rounded-lg bg-gradient-emerald flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5 text-primary-foreground" />
                </div>

                <h3 className="font-serif-display text-lg font-bold mb-2">{opp.title}</h3>
                <p className="font-mono-system text-xs text-muted-foreground mb-4 flex-1">{opp.description}</p>

                <div className="flex items-center justify-between pt-4 border-t border-border mb-4">
                  <div>
                    <p className="font-mono-system text-[10px] text-muted-foreground uppercase">Asking</p>
                    <p className="font-serif-display text-xl font-bold text-gradient-emerald">{opp.askingPrice}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono-system text-[10px] text-muted-foreground uppercase">Revenue</p>
                    <p className="font-mono-system text-sm font-bold text-foreground">{opp.monthlyRevenue}</p>
                  </div>
                </div>

                <Button variant="ghost-bone" size="sm" className="w-full">
                  <ExternalLink className="h-3 w-3 mr-2" />
                  View Listing
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MarketOpportunities;
