import { useState } from "react";
import { Mail, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || email.trim().length < 6) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert({ email: email.trim() } as any);

      if (error) {
        if (error.code === "23505") {
          toast({ title: "Already subscribed", description: "You're already in the Sol-System." });
        } else {
          toast({ title: "Error", description: "Could not subscribe. Please try again.", variant: "destructive" });
        }
        return;
      }

      setSubscribed(true);
      toast({ title: "Welcome to the Sol-System ✨", description: "Your 2026 Asset Alerts are on the way." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-6 bg-secondary/30 border-t border-border">
      <div className="container max-w-2xl text-center">
        <div className="w-12 h-12 rounded-lg bg-gradient-emerald flex items-center justify-center mx-auto mb-6">
          <Mail className="h-6 w-6 text-primary-foreground" />
        </div>
        <h2 className="font-serif-display text-3xl md:text-4xl font-bold mb-3">
          Join the <span className="italic text-gradient-emerald">Sol-System</span>
        </h2>
        <p className="font-mono-system text-sm text-muted-foreground mb-8 max-w-md mx-auto">
          Get 2026 Asset Alerts — curated niche data, velocity reports, and enterprise blueprints. No glaze.
        </p>

        {subscribed ? (
          <div className="flex items-center justify-center gap-2 p-4 rounded-lg border border-emerald-light/20 bg-secondary/50">
            <CheckCircle className="h-5 w-5 text-emerald-glow" />
            <p className="font-mono-system text-sm text-emerald-glow font-bold">You're in. Check your inbox.</p>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-secondary border-border font-mono-system text-sm"
            />
            <Button type="submit" variant="emerald" disabled={loading} className="shrink-0">
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Subscribe <ArrowRight className="h-4 w-4 ml-1" />
                </>
              )}
            </Button>
          </form>
        )}

        <p className="font-mono-system text-[10px] text-muted-foreground mt-4">
          No spam. Unsubscribe anytime. Your data stays in the vault.
        </p>
      </div>
    </section>
  );
};

export default NewsletterSection;
