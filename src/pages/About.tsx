import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Building2, Shield, Users } from "lucide-react";

const llcs = [
  {
    icon: Building2,
    name: "IncomeDeck Systems",
    role: "Digital Assets",
    description: "All digital infrastructure kits, calculators, and proprietary data. This is the IP holding company.",
  },
  {
    icon: Shield,
    name: "Vending Logic",
    role: "Physical Operations",
    description: "Vending machine routes, equipment leases, and location contracts. Separates physical liability from digital assets.",
  },
  {
    icon: Users,
    name: "Ladies Lounge",
    role: "Community & Consulting",
    description: "Membership community, group coaching, and 1:1 consulting. Recurring revenue moat for long-term retention.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pt-16">
        {/* Hero */}
        <section className="py-20 px-6">
          <div className="container max-w-4xl">
            <p className="font-mono-system text-xs tracking-[0.3em] uppercase text-emerald-glow mb-4">
              The Architect
            </p>
            <h1 className="font-serif-display text-5xl md:text-6xl font-bold mb-6">
              Meet <span className="italic text-gradient-emerald">Amaya Sol</span>
            </h1>
            <p className="font-mono-system text-sm text-muted-foreground max-w-2xl leading-relaxed mb-6">
              Amaya Sol is the Chief Systems Guide behind IncomeDeck — a business architecture firm that builds 
              parallel income systems for women entrepreneurs. Not a guru. Not an influencer. An infrastructure engineer 
              who speaks in spreadsheets and thinks in holding companies.
            </p>
            <p className="font-mono-system text-sm text-muted-foreground max-w-2xl leading-relaxed">
              After watching too many women get burned by "passive income" gurus selling recycled PDFs, Amaya built 
              IncomeDeck on one principle: <span className="text-emerald-glow font-bold">radical transparency</span>. 
              Every number is real. Every cost is shown. Every system is stress-tested before it's ever sold.
            </p>
          </div>
        </section>

        {/* The 3-LLC Moat */}
        <section className="py-20 px-6 bg-secondary/30">
          <div className="container max-w-5xl">
            <div className="text-center mb-16">
              <p className="font-mono-system text-xs tracking-[0.3em] uppercase text-emerald-glow mb-4">
                The Corporate Moat
              </p>
              <h2 className="font-serif-display text-4xl md:text-5xl font-bold mb-4">
                3-LLC <span className="italic text-gradient-emerald">Holding Structure</span>
              </h2>
              <p className="font-mono-system text-sm text-muted-foreground max-w-lg mx-auto">
                Asset protection through separation. Each entity serves a distinct purpose in the wealth-building machine.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {llcs.map((llc) => {
                const Icon = llc.icon;
                return (
                  <div
                    key={llc.name}
                    className="p-8 rounded-xl border border-border bg-card hover:border-emerald-light/30 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-emerald flex items-center justify-center mb-6">
                      <Icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="font-serif-display text-2xl font-bold mb-1">{llc.name}</h3>
                    <p className="font-mono-system text-[10px] tracking-[0.2em] uppercase text-emerald-glow mb-4">
                      {llc.role}
                    </p>
                    <p className="font-mono-system text-xs text-muted-foreground leading-relaxed">
                      {llc.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-20 px-6">
          <div className="container max-w-3xl text-center">
            <blockquote className="font-serif-display text-2xl md:text-3xl font-bold italic mb-6">
              "The difference between a hustle and an enterprise is the{" "}
              <span className="text-gradient-emerald">data</span> you use to build it."
            </blockquote>
            <p className="font-mono-system text-xs tracking-[0.2em] uppercase text-muted-foreground">
              — Amaya Sol, Chief Systems Guide
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

export default About;
