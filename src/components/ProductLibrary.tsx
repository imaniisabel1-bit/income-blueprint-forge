import { useState } from "react";
import { ArrowUpRight, BookOpen, Target, Lock, MessageSquare, Sparkles, Loader2, Heart, Briefcase, Palette } from "lucide-react";
import AmayaBriefingVideo from "@/components/AmayaBriefingVideo";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const STRIPE_PRODUCTS = {
  kdp: { priceId: "price_1T0aBwDWt6dw74BcroP1nJ3U", mode: "payment" as const },
  pinterest: { priceId: "price_1T0aCBDWt6dw74BcMlGIFZOB", mode: "payment" as const },
  vault: { priceId: "price_1T0aCaDWt6dw74BcI9BVvY3w", mode: "subscription" as const },
};

const defaultProducts = [
  {
    icon: BookOpen,
    tag: "LAUNCH KIT",
    title: "KDP Infrastructure Kit",
    price: "$27",
    description: "Complete system for researching, designing, and launching profitable low-content books on Amazon KDP.",
    features: ["Niche Research Template", "Cover Design Framework", "Launch Timeline Calendar"],
    stripe: STRIPE_PRODUCTS.kdp,
    kitSlug: "kdp-infrastructure" as string | null,
  },
  {
    icon: Target,
    tag: "BLUEPRINT",
    title: "Affiliate Pinterest Blueprint",
    price: "$47",
    description: "The exact pin-to-profit system. 90-day implementation calendar with SEO-first strategy.",
    features: ["120-Pin Content Map", "SEO Keyword Matrix", "Revenue Tracking Dashboard"],
    stripe: STRIPE_PRODUCTS.pinterest,
    kitSlug: "pinterest-blueprint",
  },
  {
    icon: Lock,
    tag: "MEMBERSHIP",
    title: "The Systems Vault",
    price: "$29/mo",
    description: "Monthly access to every system, tool, and live workshop. New modules deployed bi-weekly.",
    features: ["All Kits Included", "Live System Audits", "Private Community Access"],
    stripe: STRIPE_PRODUCTS.vault,
    kitSlug: null,
  },
  {
    icon: MessageSquare,
    tag: "HIGH-TICKET",
    title: "LLC & Systems Consulting",
    price: "Application",
    description: "1:1 infrastructure consulting. We build your business operating system from scratch.",
    features: ["Custom Business Blueprint", "Legal Structure Review", "90-Day Implementation Plan"],
    stripe: null,
    kitSlug: null,
  },
  {
    icon: Heart,
    tag: "LEGACY KIT",
    title: "The Legacy Matriarch Kit",
    price: "$45",
    description: "Homeschool infrastructure & Family Legacy journals. High-ticket hardcover workbook bundles for SAHMs building generational assets.",
    features: ["Hardcover Workbook Bundle", "Homeschool Curricula Templates", "Family Legacy Journal System"],
    stripe: null,
    kitSlug: "legacy-matriarch",
  },
  {
    icon: Briefcase,
    tag: "EXIT KIT",
    title: 'The "9-to-5 Exit" Kit',
    price: "$37",
    description: "Professional SOP Vaults. Sell the templates from your corporate career — project management trackers, HR frameworks, B2B digital downloads.",
    features: ["Corporate SOP Templates", "B2B Sales Framework", "Bulk Licensing Guide"],
    stripe: null,
    kitSlug: "nine-to-five-exit",
  },
  {
    icon: Palette,
    tag: "CREATIVE KIT",
    title: 'The "Creative Soul" Kit',
    price: "$27",
    description: "Digital Asset Flips for artists & Gen Z. Aesthetic Notion templates, Pinterest-driven digital wallpapers, and creative digital downloads.",
    features: ["Notion Template Pack", "Pinterest Visual Strategy", "Digital Wallpaper System"],
    stripe: null,
    kitSlug: "creative-soul",
  },
];

const ProductLibrary = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(defaultProducts);
  const [generatingIndex, setGeneratingIndex] = useState<number | null>(null);

  const handleCheckout = async (stripe: { priceId: string; mode: string } | null) => {
    if (!stripe) {
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
      body: { priceId: stripe.priceId, mode: stripe.mode },
    });

    if (error || !data?.url) {
      toast({ title: "Checkout error", description: "Something went wrong. Try again.", variant: "destructive" });
      return;
    }

    window.open(data.url, "_blank");
  };

  const handleGenerateDescription = async (index: number) => {
    const product = products[index];
    setGeneratingIndex(index);

    try {
      const { data, error } = await supabase.functions.invoke("generate-description", {
        body: {
          title: product.title,
          tag: product.tag,
          price: product.price,
          features: product.features,
        },
      });

      if (error || !data?.description) {
        toast({
          title: "Generation failed",
          description: data?.error || "Could not generate description. Try again.",
          variant: "destructive",
        });
        return;
      }

      setProducts((prev) =>
        prev.map((p, i) => (i === index ? { ...p, description: data.description } : p))
      );
      toast({ title: "Description updated ✨", description: "AI-generated copy applied." });
    } catch {
      toast({ title: "Error", description: "Failed to connect to AI service.", variant: "destructive" });
    } finally {
      setGeneratingIndex(null);
    }
  };

  return (
    <section id="products" className="py-24 px-6 bg-secondary/30">
      <div className="container max-w-6xl">
        <div className="text-center mb-16">
          <p className="font-mono-system text-xs tracking-[0.3em] uppercase text-emerald-glow mb-4">
            The Product Library
          </p>
          <h2 className="font-serif-display text-4xl md:text-5xl font-bold mb-4">
            Systems, Not <span className="italic text-gradient-emerald">Courses</span>
          </h2>
          <p className="font-mono-system text-sm text-muted-foreground max-w-lg mx-auto">
            Every product is an implementation system with built-in reality checks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((product, index) => {
            const Icon = product.icon;
            const isGenerating = generatingIndex === index;
            return (
              <div
                key={index}
                className="group relative p-8 rounded-xl border border-border bg-card hover:border-emerald-light/30 hover:shadow-emerald transition-all duration-500 flex flex-col"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono-system text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-full border border-emerald-light/20 text-emerald-glow">
                    {product.tag}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleGenerateDescription(index)}
                      disabled={isGenerating}
                      className="p-1.5 rounded-md text-muted-foreground hover:text-emerald-glow hover:bg-secondary transition-colors disabled:opacity-50"
                      title="Generate AI description"
                    >
                      {isGenerating ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Sparkles className="h-3.5 w-3.5" />
                      )}
                    </button>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-emerald-glow transition-colors" />
                  </div>
                </div>

                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-emerald flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif-display text-2xl font-bold mb-1">{product.title}</h3>
                    <p className="font-mono-system text-xs text-muted-foreground">{product.description}</p>
                  </div>
                  <AmayaBriefingVideo size="sm" />
                </div>

                <ul className="space-y-2 mb-6">
                  {product.features.map((feature) => (
                    <li key={feature} className="font-mono-system text-xs text-foreground/70 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-emerald-glow" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="font-serif-display text-2xl font-bold text-gradient-emerald">{product.price}</span>
                  <div className="flex items-center gap-2">
                    {product.kitSlug && (
                      <Button variant="ghost-bone" size="sm" onClick={() => navigate(`/kits/${product.kitSlug}`)}>
                        View Details
                      </Button>
                    )}
                    <Button variant="emerald" size="sm" onClick={() => handleCheckout(product.stripe)}>
                      {product.price === "Application" ? "Apply Now" : "Get Access"}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductLibrary;
