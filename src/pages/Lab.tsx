import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import TradingChart from "@/components/lab/TradingChart";
import PineScriptBlock from "@/components/lab/PineScriptBlock";
import LotSizeCalculator from "@/components/lab/LotSizeCalculator";

const Lab = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pt-16">
        {/* Hero */}
        <section className="py-20 px-6 text-center">
          <p className="font-mono-system text-xs tracking-[0.3em] uppercase text-emerald-glow mb-4">
            The Trading Lab
          </p>
          <h1 className="font-serif-display text-5xl md:text-6xl font-bold mb-4">
            Data Over <span className="italic text-gradient-emerald">Emotion</span>
          </h1>
          <p className="font-mono-system text-sm text-muted-foreground max-w-xl mx-auto">
            Live charts, algorithmic strategy code, and position sizing tools. The infrastructure for disciplined trading.
          </p>
        </section>

        <TradingChart />
        <PineScriptBlock />
        <LotSizeCalculator />
      </main>
      <SiteFooter />
    </div>
  );
};

export default Lab;
