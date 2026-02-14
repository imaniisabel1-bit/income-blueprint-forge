import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import GlazeMeter from "@/components/GlazeMeter";
import BusinessCalculator from "@/components/BusinessCalculator";
import ProductLibrary from "@/components/ProductLibrary";
import MarketOpportunities from "@/components/MarketOpportunities";

const Systems = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pt-16">
        {/* Hero */}
        <section className="py-20 px-6 text-center">
          <p className="font-mono-system text-xs tracking-[0.3em] uppercase text-emerald-glow mb-4">
            Infrastructure Systems
          </p>
          <h1 className="font-serif-display text-5xl md:text-6xl font-bold mb-4">
            Build the <span className="italic text-gradient-emerald">Machine</span>
          </h1>
          <p className="font-mono-system text-sm text-muted-foreground max-w-xl mx-auto">
            KDP publishing, Pinterest affiliate, and vending systems — each with full cost transparency and implementation calendars.
          </p>
        </section>

        <GlazeMeter />
        <BusinessCalculator />
        <ProductLibrary />
        <MarketOpportunities />
      </main>
      <SiteFooter />
    </div>
  );
};

export default Systems;
