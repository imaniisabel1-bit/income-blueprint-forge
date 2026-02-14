import { useState } from "react";
import { Lock, ShieldCheck, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const PineScriptBlock = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tvUsername, setTvUsername] = useState("");
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !tvUsername.trim()) return;

    setSubmitting(true);
    // Store as a newsletter subscriber (reusing existing table for lead capture)
    const { error } = await supabase.from("newsletter_subscribers").insert({ email: email.trim() });

    if (error && !error.message.includes("duplicate")) {
      toast({ title: "Error", description: "Something went wrong. Try again.", variant: "destructive" });
    } else {
      toast({
        title: "Application Received",
        description: "Your request for Amaya Alpha access has been logged. We'll be in touch.",
      });
      setOpen(false);
      setName("");
      setEmail("");
      setTvUsername("");
      setReason("");
    }
    setSubmitting(false);
  };

  return (
    <section className="py-16 px-6 bg-secondary/30">
      <div className="container max-w-4xl">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Lock className="h-4 w-4 text-emerald-glow" />
            <p className="font-mono-system text-xs tracking-[0.3em] uppercase text-emerald-glow">
              Proprietary Algorithm
            </p>
          </div>
          <h2 className="font-serif-display text-3xl md:text-4xl font-bold">
            The <span className="italic text-gradient-emerald">Amaya Alpha</span> Bot
          </h2>
          <p className="font-mono-system text-sm text-muted-foreground max-w-lg mx-auto">
            A self-improving, EMA-cross algorithmic strategy engineered for 2026 volatility. Source code is invite-only — your edge stays your edge.
          </p>

          {/* Locked visual */}
          <div className="rounded-xl border border-border bg-card overflow-hidden max-w-2xl mx-auto">
            <div className="p-1 bg-muted border-b border-border flex items-center gap-2">
              <div className="flex gap-1.5 px-2">
                <div className="w-2.5 h-2.5 rounded-full bg-destructive/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-bone-muted/30" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-glow/30" />
              </div>
              <span className="font-mono-system text-[10px] text-muted-foreground">amaya-alpha-v2.pine — LOCKED</span>
            </div>
            <div className="p-12 flex flex-col items-center gap-4">
              <ShieldCheck className="h-12 w-12 text-emerald-glow/40" />
              <p className="font-mono-system text-xs text-muted-foreground">
                Source code protected under Sol-System IP Protocol
              </p>
            </div>
          </div>

          {/* CTA */}
          <Button
            size="lg"
            className="bg-gradient-emerald hover:opacity-90 font-mono-system text-sm tracking-wide mt-4"
            onClick={() => setOpen(true)}
          >
            Apply for Amaya Alpha Access
          </Button>

          <p className="font-mono-system text-[10px] text-muted-foreground italic">
            "In the Sol-System, we sell the light — not the blueprints for the sun."
          </p>
        </div>
      </div>

      {/* Access Request Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-card border-border max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif-display text-xl">
              Request <span className="text-gradient-emerald italic">Alpha</span> Access
            </DialogTitle>
            <DialogDescription className="font-mono-system text-xs text-muted-foreground">
              Submit your details to be considered for the invite-only Amaya Alpha bot.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div>
              <label className="font-mono-system text-xs tracking-[0.15em] uppercase text-muted-foreground mb-1.5 block">
                Full Name
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="bg-secondary border-border font-mono-system text-sm"
                required
                maxLength={100}
              />
            </div>
            <div>
              <label className="font-mono-system text-xs tracking-[0.15em] uppercase text-muted-foreground mb-1.5 block">
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="bg-secondary border-border font-mono-system text-sm"
                required
                maxLength={255}
              />
            </div>
            <div>
              <label className="font-mono-system text-xs tracking-[0.15em] uppercase text-muted-foreground mb-1.5 block">
                TradingView Username
              </label>
              <Input
                value={tvUsername}
                onChange={(e) => setTvUsername(e.target.value)}
                placeholder="@your_tv_username"
                className="bg-secondary border-border font-mono-system text-sm"
                required
                maxLength={100}
              />
            </div>
            <div>
              <label className="font-mono-system text-xs tracking-[0.15em] uppercase text-muted-foreground mb-1.5 block">
                Why do you want access? <span className="normal-case text-muted-foreground/60">(optional)</span>
              </label>
              <Textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Tell us about your trading experience…"
                className="bg-secondary border-border font-mono-system text-xs min-h-[80px]"
                maxLength={500}
              />
            </div>
            <Button
              type="submit"
              disabled={submitting}
              className="w-full gap-2 bg-gradient-emerald hover:opacity-90 font-mono-system text-sm"
            >
              <Send className="h-3.5 w-3.5" />
              {submitting ? "Submitting…" : "Submit Application"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PineScriptBlock;
