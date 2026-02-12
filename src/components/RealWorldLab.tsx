import { TrendingUp, Store, Sparkles } from "lucide-react";

const cases = [
  {
    icon: Store,
    label: "Vending Business",
    title: "From Zero to 12 Machines",
    stat: "$3,200/mo",
    statLabel: "net passive income",
    description: "Applied the IncomeDeck 'Asset Acquisition Framework' to identify high-traffic locations and negotiate placement deals. System paid for itself in 4 months.",
  },
  {
    icon: Sparkles,
    label: "Ladies Lounge",
    title: "Community-First Revenue",
    stat: "147",
    statLabel: "active members",
    description: "Used the 'Membership Infrastructure Kit' to build recurring revenue. No paid ads—100% organic growth through systematic content deployment.",
  },
  {
    icon: TrendingUp,
    label: "Digital Products",
    title: "KDP + Affiliate Stack",
    stat: "$8,400",
    statLabel: "Q4 revenue",
    description: "Stacked the KDP and Pinterest systems together. The compound effect of two systems running simultaneously produced outsized returns.",
  },
];

const RealWorldLab = () => {
  return (
    <section className="py-24 px-6">
      <div className="container max-w-5xl">
        <div className="text-center mb-16">
          <p className="font-mono-system text-xs tracking-[0.3em] uppercase text-emerald-glow mb-4">
            The Real World Lab
          </p>
          <h2 className="font-serif-display text-4xl md:text-5xl font-bold mb-4">
            Proof Over <span className="italic text-gradient-emerald">Promises</span>
          </h2>
          <p className="font-mono-system text-sm text-muted-foreground max-w-lg mx-auto">
            These aren't testimonials. These are live case studies from businesses
            built using IncomeDeck systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cases.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-xl border border-border bg-card hover:border-emerald-light/30 transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-md bg-gradient-emerald flex items-center justify-center">
                    <Icon className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <span className="font-mono-system text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                    {item.label}
                  </span>
                </div>

                <h3 className="font-serif-display text-xl font-bold mb-4">
                  {item.title}
                </h3>

                <div className="mb-4">
                  <span className="font-serif-display text-3xl font-bold text-gradient-emerald">
                    {item.stat}
                  </span>
                  <p className="font-mono-system text-[10px] text-muted-foreground uppercase tracking-wider mt-1">
                    {item.statLabel}
                  </p>
                </div>

                <p className="font-mono-system text-xs text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RealWorldLab;
