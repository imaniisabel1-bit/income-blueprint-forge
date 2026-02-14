import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/HeroSection";
import NewsletterSection from "@/components/NewsletterSection";
import SiteFooter from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, TrendingUp, Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";

const sections = [
  {
    icon: BookOpen,
    label: "Systems",
    title: "KDP, Pinterest & Vending Kits",
    description: "The Business Reality Calculator, product kits, and market opportunities — all with full cost transparency.",
    path: "/systems",
  },
  {
    icon: TrendingUp,
    label: "The Lab",
    title: "Trading Charts & Bot Code",
    description: "Live TradingView charts, the Amaya Alpha Pine Script, and a Lot Size Calculator for disciplined trading.",
    path: "/lab",
  },
  {
    icon: Mic,
    label: "Podcast",
    title: "American Reality",
    description: "Code-Switching for the New Economy. Where politics, money, and culture collide.",
    path: "/podcast",
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <HeroSection />

        {/* Navigation Cards */}
        <section className="py-24 px-6">
          <div className="container max-w-5xl">
            <div className="text-center mb-16">
              <p className="font-mono-system text-xs tracking-[0.3em] uppercase text-emerald-glow mb-4">
                Explore the Platform
              </p>
              <h2 className="font-serif-display text-4xl md:text-5xl font-bold">
                Your <span className="italic text-gradient-emerald">Infrastructure</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.label}
                    onClick={() => navigate(section.path)}
                    className="group text-left p-8 rounded-xl border border-border bg-card hover:border-emerald-light/30 hover:shadow-emerald transition-all duration-500"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-emerald flex items-center justify-center mb-5">
                      <Icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <span className="font-mono-system text-[10px] tracking-[0.2em] uppercase text-emerald-glow">
                      {section.label}
                    </span>
                    <h3 className="font-serif-display text-2xl font-bold mt-2 mb-2">{section.title}</h3>
                    <p className="font-mono-system text-xs text-muted-foreground mb-4">{section.description}</p>
                    <span className="inline-flex items-center font-mono-system text-xs text-emerald-glow group-hover:gap-2 transition-all">
                      Explore <ArrowRight className="h-3 w-3 ml-1" />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <NewsletterSection />
      </main>
      <SiteFooter />
    </div>
  );
};

export default Index;
