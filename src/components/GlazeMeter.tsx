import { useState } from "react";

const comparisons = [
  {
    guru: "Make $10K/month passively!",
    reality: "Avg. net profit after costs: $2,800/mo in Month 6",
    guruWidth: 95,
    realityWidth: 35,
  },
  {
    guru: "Just post on Pinterest and watch money flow!",
    reality: "120 optimized pins + 90 days of SEO before first $100",
    guruWidth: 90,
    realityWidth: 25,
  },
  {
    guru: "Launch your journal and retire!",
    reality: "15 research hours + 7 design iterations + $200 in ads to validate",
    guruWidth: 88,
    realityWidth: 40,
  },
  {
    guru: "Anyone can do this in their sleep!",
    reality: "8-12 hrs/week of focused system-building for 6 months",
    guruWidth: 92,
    realityWidth: 30,
  },
];

const GlazeMeter = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-24 px-6">
      <div className="container max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-mono-system text-xs tracking-[0.3em] uppercase text-emerald-glow mb-4">
            The Glaze Meter™
          </p>
          <h2 className="font-serif-display text-4xl md:text-5xl font-bold mb-4">
            Promise vs. <span className="italic text-gradient-emerald">Reality</span>
          </h2>
          <p className="font-mono-system text-sm text-muted-foreground max-w-lg mx-auto">
            Every "guru" inflates the outcome. We strip the glaze and show you the actual numbers.
          </p>
        </div>

        {/* Meter Cards */}
        <div className="space-y-4 mb-8">
          {comparisons.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-full text-left p-6 rounded-lg border transition-all duration-300 ${
                activeIndex === index
                  ? "bg-card border-emerald-light/30 shadow-emerald"
                  : "bg-secondary/50 border-border hover:border-border/80"
              }`}
            >
              <div className="grid md:grid-cols-2 gap-6">
                {/* Guru side */}
                <div>
                  <p className="font-mono-system text-[10px] tracking-widest uppercase text-destructive/70 mb-2">
                    What Gurus Promise
                  </p>
                  <p className="font-mono-system text-sm text-foreground/80 mb-3">
                    "{item.guru}"
                  </p>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full bg-destructive/60 transition-all duration-1000"
                      style={{ width: activeIndex === index ? `${item.guruWidth}%` : "0%" }}
                    />
                  </div>
                  <p className="font-mono-system text-[10px] text-muted-foreground mt-1 text-right">
                    {item.guruWidth}% hype
                  </p>
                </div>

                {/* Reality side */}
                <div>
                  <p className="font-mono-system text-[10px] tracking-widest uppercase text-emerald-glow mb-2">
                    The IncomeDeck Reality
                  </p>
                  <p className="font-mono-system text-sm text-foreground/80 mb-3">
                    {item.reality}
                  </p>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-emerald transition-all duration-1000"
                      style={{ width: activeIndex === index ? `${item.realityWidth}%` : "0%" }}
                    />
                  </div>
                  <p className="font-mono-system text-[10px] text-muted-foreground mt-1 text-right">
                    {item.realityWidth}% realistic
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlazeMeter;
