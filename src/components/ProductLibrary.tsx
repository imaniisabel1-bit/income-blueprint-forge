import { ArrowUpRight, BookOpen, Target, Lock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const STRIPE_PRODUCTS = {
  kdp: { priceId: "price_1T0aBwDWt6dw74BcroP1nJ3U", mode: "payment" as const },
  pinterest: { priceId: "price_1T0aCBDWt6dw74BcMlGIFZOB", mode: "payment" as const },
  vault: { priceId: "price_1T0aCaDWt6dw74BcI9BVvY3w", mode: "subscription" as const },
};

const products = [
  {
    icon: BookOpen,
    tag: "LAUNCH KIT",
    title: "KDP Infrastructure Kit",
    price: "$27",
    description: "Complete system for researching, designing, and launching profitable low-content books on Amazon KDP.",
    features: ["Niche Research Template", "Cover Design Framework", "Launch Timeline Calendar"],
    stripe: STRIPE_PRODUCTS.kdp,
  },
  {
    icon: Target,
    tag: "BLUEPRINT",
    title: "Affiliate Pinterest Blueprint",
    price: "$47",
    description: "The exact pin-to-profit system. 90-day implementation calendar with SEO-first strategy.",
    features: ["120-Pin Content Map", "SEO Keyword Matrix", "Revenue Tracking Dashboard"],
    stripe: STRIPE_PRODUCTS.pinterest,
  },
  {
    icon: Lock,
    tag: "MEMBERSHIP",
    title: "The Systems Vault",
    price: "$29/mo",
    description: "Monthly access to every system, tool, and live workshop. New modules deployed bi-weekly.",
    features: ["All Kits Included", "Live System Audits", "Private Community Access"],
    stripe: STRIPE_PRODUCTS.vault,
  },
  {
    icon: MessageSquare,
    tag: "HIGH-TICKET",
    title: "LLC & Systems Consulting",
    price: "Application",
    description: "1:1 infrastructure consulting. We build your business operating system from scratch.",
    features: ["Custom Business Blueprint", "Legal Structure Review", "90-Day Implementation Plan"],
    stripe: null,
  },
];

const ProductLibrary = () => {
  const navigate = useNavigate();

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
      toast({ title: "Checkout error", description: error?.message || "Try again.", variant: "destructive" });
      return;
    }

    window.open(data.url, "_blank");
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
            return (
              <div
                key={index}
                className="group relative p-8 rounded-xl border border-border bg-card hover:border-emerald-light/30 hover:shadow-emerald transition-all duration-500 flex flex-col"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono-system text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-full border border-emerald-light/20 text-emerald-glow">
                    {product.tag}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-emerald-glow transition-colors" />
                </div>

                <div className="w-10 h-10 rounded-lg bg-gradient-emerald flex items-center justify-center mb-5">
                  <Icon className="h-5 w-5 text-primary-foreground" />
                </div>

                <h3 className="font-serif-display text-2xl font-bold mb-2">{product.title}</h3>
                <p className="font-mono-system text-xs text-muted-foreground mb-4 flex-1">{product.description}</p>

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
                  <Button variant="emerald" size="sm" onClick={() => handleCheckout(product.stripe)}>
                    {product.price === "Application" ? "Apply Now" : "Get Access"}
                  </Button>
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
