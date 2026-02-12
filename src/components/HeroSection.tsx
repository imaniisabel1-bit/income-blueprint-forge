import heroBg from "@/assets/hero-bg.jpg";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container max-w-5xl px-6 text-center">
        <p className="font-mono-system text-xs tracking-[0.3em] uppercase text-emerald-glow mb-8 animate-fade-in">
          Proprietary Systems Portal
        </p>

        <h1 className="font-serif-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-6 animate-slide-up">
          Build the Asset.
          <br />
          <span className="text-gradient-emerald italic">Kill the Hype.</span>
        </h1>

        <p className="font-mono-system text-sm md:text-base text-muted-foreground max-w-xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          Radical transparency in digital income systems.
          No guru fluff. No recycled tactics. Just infrastructure
          that compounds.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <Button variant="emerald" size="lg">
            Access the Systems
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="ghost-bone" size="lg">
            See the Reality
          </Button>
        </div>

        {/* Trust bar */}
        <div className="mt-20 pt-8 border-t border-border/50 flex flex-wrap justify-center gap-x-10 gap-y-3 animate-fade-in" style={{ animationDelay: "0.7s" }}>
          {["No Hidden Fees", "Verified Systems", "Real-World Tested", "Legal-Ready"].map((item) => (
            <span key={item} className="font-mono-system text-xs tracking-wider text-muted-foreground uppercase">
              ✦ {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
