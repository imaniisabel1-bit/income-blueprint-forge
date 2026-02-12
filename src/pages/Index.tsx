import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/HeroSection";
import GlazeMeter from "@/components/GlazeMeter";
import BusinessCalculator from "@/components/BusinessCalculator";
import ProductLibrary from "@/components/ProductLibrary";
import RealWorldLab from "@/components/RealWorldLab";
import SiteFooter from "@/components/SiteFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <HeroSection />
        <GlazeMeter />
        <BusinessCalculator />
        <ProductLibrary />
        <RealWorldLab />
      </main>
      <SiteFooter />
    </div>
  );
};

export default Index;
