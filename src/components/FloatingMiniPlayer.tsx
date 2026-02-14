import { useState } from "react";
import { Play, Pause, Mic, Mail, X, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const FloatingMiniPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast({ title: "Enter a valid email", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      await supabase.from("newsletter_subscribers").insert({ email });
      setSubmitted(true);
      toast({ title: "You're in the Sol-System ✓" });
      setTimeout(() => setShowNewsletter(false), 2000);
    } catch {
      toast({ title: "Something went wrong", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (dismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-md">
      {/* Newsletter Popup */}
      {showNewsletter && (
        <div className="border-b border-border bg-secondary/80 px-4 py-3 animate-fade-in">
          <div className="container max-w-lg mx-auto">
            {submitted ? (
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-glow" />
                <p className="font-mono-system text-xs text-emerald-glow">You're in. Watch your inbox.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-8 bg-card border-border font-mono-system text-xs"
                  required
                />
                <Button variant="emerald" size="sm" type="submit" disabled={submitting} className="h-8 text-xs">
                  {submitting ? <Loader2 className="h-3 w-3 animate-spin" /> : "Join"}
                </Button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Player Bar */}
      <div className="px-4 py-2.5">
        <div className="container max-w-5xl mx-auto flex items-center gap-3">
          <button
            onClick={() => setPlaying(!playing)}
            className="w-8 h-8 rounded-full bg-gradient-emerald flex items-center justify-center shrink-0 hover:opacity-90 transition-opacity"
          >
            {playing ? (
              <Pause className="h-3.5 w-3.5 text-primary-foreground" />
            ) : (
              <Play className="h-3.5 w-3.5 text-primary-foreground ml-0.5" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <Mic className="h-3 w-3 text-emerald-glow shrink-0" />
              <p className="font-mono-system text-[10px] tracking-[0.15em] uppercase text-emerald-glow truncate">
                American Reality
              </p>
            </div>
            <p className="font-mono-system text-xs text-muted-foreground truncate">
              EP 001 — The Tax Code They Don't Teach You
            </p>
          </div>

          <Button
            variant="ghost-bone"
            size="sm"
            className="shrink-0 text-[10px] hidden sm:inline-flex"
            onClick={() => setShowNewsletter(!showNewsletter)}
          >
            <Mail className="h-3 w-3 mr-1" />
            Join Sol-System
          </Button>

          <button
            onClick={() => setDismissed(true)}
            className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingMiniPlayer;
