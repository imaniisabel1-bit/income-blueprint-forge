import { useParams, useNavigate } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, CheckCircle, BookOpen } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const KIT_DATA: Record<string, {
  title: string;
  tag: string;
  price: string;
  priceId: string | null;
  mode: string;
  heroDescription: string;
  projections: { period: string; units: number; revenue: string; profit: string }[];
  deliverables: string[];
  canvaEmbedUrl: string | null;
}> = {
  "kdp-infrastructure": {
    title: "KDP Infrastructure Kit",
    tag: "LAUNCH KIT",
    price: "$27",
    priceId: "price_1T0aBwDWt6dw74BcroP1nJ3U",
    mode: "payment",
    heroDescription: "The complete system for researching, designing, and launching profitable low-content books. No fluff — just the implementation framework that Amaya uses to deploy new KDP assets.",
    projections: [
      { period: "Weekly", units: 28, revenue: "$531.72", profit: "$171.36" },
      { period: "Monthly", units: 120, revenue: "$2,278.80", profit: "$734.40" },
      { period: "Yearly", units: 1460, revenue: "$27,725.40", profit: "$8,938.60" },
    ],
    deliverables: [
      "Niche Research Template (Amaya's proprietary scoring matrix)",
      "Cover Design Framework + Canva Templates",
      "Launch Timeline Calendar (90-day deployment plan)",
      "Pricing Strategy Calculator",
      "Amazon SEO Keyword Research Guide",
      "Post-Launch Optimization Checklist",
    ],
    canvaEmbedUrl: null,
  },
  "pinterest-blueprint": {
    title: "Affiliate Pinterest Blueprint",
    tag: "BLUEPRINT",
    price: "$47",
    priceId: "price_1T0aCBDWt6dw74BcMlGIFZOB",
    mode: "payment",
    heroDescription: "The exact pin-to-profit system. 90-day implementation calendar with an SEO-first strategy that compounds organic reach into recurring affiliate revenue.",
    projections: [
      { period: "Weekly", units: 35, revenue: "$245.00", profit: "$147.00" },
      { period: "Monthly", units: 150, revenue: "$1,050.00", profit: "$630.00" },
      { period: "Yearly", units: 1825, revenue: "$12,775.00", profit: "$7,665.00" },
    ],
    deliverables: [
      "120-Pin Content Map (pre-designed templates)",
      "SEO Keyword Matrix for Pinterest",
      "Revenue Tracking Dashboard (Notion + Sheets)",
      "Affiliate Link Management System",
      "Analytics & Optimization Playbook",
      "Monthly Content Calendar Templates",
    ],
    canvaEmbedUrl: null,
  },
  "legacy-matriarch": {
    title: "The Legacy Matriarch Kit",
    tag: "LEGACY KIT",
    price: "$45",
    priceId: null,
    mode: "payment",
    heroDescription: "Homeschool infrastructure and family legacy journals. High-ticket hardcover workbook bundles for SAHMs building generational assets through education and documentation.",
    projections: [
      { period: "Weekly", units: 14, revenue: "$630.00", profit: "$252.00" },
      { period: "Monthly", units: 60, revenue: "$2,700.00", profit: "$1,080.00" },
      { period: "Yearly", units: 730, revenue: "$32,850.00", profit: "$13,140.00" },
    ],
    deliverables: [
      "Hardcover Workbook Bundle Templates",
      "Homeschool Curricula Framework",
      "Family Legacy Journal System",
      "Publishing & Printing Guide (Premium Format)",
      "Pricing Strategy for High-Ticket Books",
      "Marketing Playbook for SAHM Audience",
    ],
    canvaEmbedUrl: null,
  },
  "nine-to-five-exit": {
    title: 'The "9-to-5 Exit" Kit',
    tag: "EXIT KIT",
    price: "$37",
    priceId: null,
    mode: "payment",
    heroDescription: "Turn your corporate career knowledge into sellable digital assets. SOP templates, HR frameworks, and B2B downloads built for professionals ready to monetize their expertise.",
    projections: [
      { period: "Weekly", units: 20, revenue: "$740.00", profit: "$296.00" },
      { period: "Monthly", units: 85, revenue: "$3,145.00", profit: "$1,258.00" },
      { period: "Yearly", units: 1040, revenue: "$38,480.00", profit: "$15,392.00" },
    ],
    deliverables: [
      "Corporate SOP Template Pack",
      "B2B Sales & Licensing Framework",
      "HR & Compliance Document Templates",
      "Bulk Licensing Agreement Generator",
      "LinkedIn Marketing Strategy Guide",
      "Exit Timeline & Revenue Calculator",
    ],
    canvaEmbedUrl: null,
  },
  "creative-soul": {
    title: 'The "Creative Soul" Kit',
    tag: "CREATIVE KIT",
    price: "$27",
    priceId: null,
    mode: "payment",
    heroDescription: "Aesthetic digital asset flips for artists and Gen Z. Notion templates, Pinterest-driven digital wallpapers, and creative downloads that sell on autopilot.",
    projections: [
      { period: "Weekly", units: 35, revenue: "$945.00", profit: "$378.00" },
      { period: "Monthly", units: 150, revenue: "$4,050.00", profit: "$1,620.00" },
      { period: "Yearly", units: 1825, revenue: "$49,275.00", profit: "$19,710.00" },
    ],
    deliverables: [
      "Notion Template Design Pack",
      "Pinterest Visual Strategy Playbook",
      "Digital Wallpaper Production Guide",
      "Etsy & Gumroad Storefront Setup",
      "Brand Aesthetic Framework",
      "Content Repurposing Calendar",
    ],
    canvaEmbedUrl: null,
  },
};

const KitDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const kit = id ? KIT_DATA[id] : null;

  if (!kit) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif-display text-3xl font-bold mb-4">Kit Not Found</h1>
          <Button variant="emerald" onClick={() => navigate("/systems")}>Back to Systems</Button>
        </div>
      </div>
    );
  }

  const handleCheckout = async () => {
    if (!kit.priceId) {
      navigate("/auth");
      return;
    }
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast({ title: "Sign in to purchase", description: "You need an account to checkout." });
      navigate("/auth");
      return;
    }
    const { data, error } = await supabase.functions.invoke("create-checkout", {
      body: { priceId: kit.priceId, mode: kit.mode },
    });
    if (error || !data?.url) {
      toast({ title: "Checkout error", description: "Something went wrong.", variant: "destructive" });
      return;
    }
    window.open(data.url, "_blank");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pt-16">
        {/* Hero */}
        <section className="py-20 px-6">
          <div className="container max-w-4xl">
            <button
              onClick={() => navigate("/systems")}
              className="flex items-center gap-2 font-mono-system text-xs text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Systems
            </button>

            <span className="font-mono-system text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-full border border-emerald-light/20 text-emerald-glow mb-4 inline-block">
              {kit.tag}
            </span>
            <h1 className="font-serif-display text-4xl md:text-5xl font-bold mb-4">{kit.title}</h1>
            <p className="font-mono-system text-sm text-muted-foreground max-w-2xl leading-relaxed mb-8">
              {kit.heroDescription}
            </p>

            {/* Video placeholder */}
            <div className="rounded-xl border border-border bg-card aspect-video flex items-center justify-center mb-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-emerald flex items-center justify-center mx-auto mb-3">
                  <Play className="h-6 w-6 text-primary-foreground ml-1" />
                </div>
                <p className="font-mono-system text-xs text-muted-foreground">Amaya Sol Kit Walkthrough</p>
              </div>
            </div>

            {/* Canva Flipbook Embed */}
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              {kit.canvaEmbedUrl ? (
                <div className="aspect-[4/3]">
                  <iframe
                    src={kit.canvaEmbedUrl}
                    className="w-full h-full border-0"
                    allowFullScreen
                    title={`${kit.title} Preview`}
                  />
                </div>
              ) : (
                <div className="aspect-[4/3] flex flex-col items-center justify-center gap-4 bg-secondary/20">
                  <div className="w-14 h-14 rounded-lg bg-gradient-emerald flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="text-center px-6">
                    <p className="font-serif-display text-lg font-bold mb-1">Interactive Preview</p>
                    <p className="font-mono-system text-xs text-muted-foreground max-w-sm">
                      Flipbook coming soon — browse deliverables below to see what's inside this kit.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Math Block */}
        <section className="py-16 px-6 bg-secondary/30">
          <div className="container max-w-4xl">
            <h2 className="font-serif-display text-3xl font-bold mb-8 text-center">
              The <span className="italic text-gradient-emerald">Math</span>
            </h2>
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="font-mono-system text-[10px] tracking-[0.2em] uppercase text-muted-foreground text-left p-4">Period</th>
                    <th className="font-mono-system text-[10px] tracking-[0.2em] uppercase text-muted-foreground text-right p-4">Units</th>
                    <th className="font-mono-system text-[10px] tracking-[0.2em] uppercase text-muted-foreground text-right p-4">Revenue</th>
                    <th className="font-mono-system text-[10px] tracking-[0.2em] uppercase text-emerald-glow text-right p-4">Net Profit</th>
                  </tr>
                </thead>
                <tbody>
                  {kit.projections.map((row) => (
                    <tr key={row.period} className="border-b border-border last:border-0">
                      <td className="font-mono-system text-sm p-4">{row.period}</td>
                      <td className="font-mono-system text-sm text-right p-4">{row.units}</td>
                      <td className="font-mono-system text-sm text-right p-4">{row.revenue}</td>
                      <td className="font-serif-display text-lg font-bold text-gradient-emerald text-right p-4">{row.profit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Deliverables */}
        <section className="py-16 px-6">
          <div className="container max-w-4xl">
            <h2 className="font-serif-display text-3xl font-bold mb-8 text-center">
              What's <span className="italic text-gradient-emerald">Inside</span>
            </h2>
            <div className="rounded-xl border border-border bg-card p-8">
              <ul className="space-y-4">
                {kit.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-glow shrink-0 mt-0.5" />
                    <span className="font-mono-system text-sm text-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 bg-secondary/30">
          <div className="container max-w-md text-center">
            <h2 className="font-serif-display text-3xl font-bold mb-2">{kit.title}</h2>
            <p className="font-serif-display text-4xl font-bold text-gradient-emerald mb-6">{kit.price}</p>
            <Button variant="emerald" size="lg" className="w-full" onClick={handleCheckout}>
              Secure Your Infrastructure — {kit.price}
            </Button>
            <p className="font-mono-system text-[10px] text-muted-foreground mt-3">
              All sales final once the Member Vault is accessed.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

export default KitDetail;
