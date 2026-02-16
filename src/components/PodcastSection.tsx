import { useState } from "react";
import { Mic, Play, Clock, Mail, CheckCircle, Loader2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const PLACEHOLDER_EPISODES = [
  {
    number: "001",
    title: "The Tax Code They Don't Teach You",
    topic: "Politics × Money",
    description: "How the 2026 tax changes create new LLC loopholes — and who they were really designed for.",
    duration: "38 min",
    status: "coming-soon" as const,
    spotifyEmbedId: null as string | null,
  },
  {
    number: "002",
    title: "Parallel Systems: Building Outside the Algorithm",
    topic: "Infrastructure × Culture",
    description: "Why vending machines, digital kits, and community spaces are the new 401(k) for women of color.",
    duration: "42 min",
    status: "coming-soon" as const,
    spotifyEmbedId: null,
  },
  {
    number: "003",
    title: "Code-Switching Your P&L Statement",
    topic: "Money × Culture",
    description: "Breaking down how to present your numbers to banks, investors, and your mama — differently.",
    duration: "35 min",
    status: "coming-soon" as const,
    spotifyEmbedId: null,
  },
];

const PodcastSection = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast({ title: "Enter a valid email", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      await Promise.allSettled([
        supabase.from("newsletter_subscribers").insert({ email }),
        supabase.from("founding_architect_leads").insert({ email, source: "podcast_page" } as any),
      ]);
      setSubmitted(true);
      toast({ title: "You're in the Sol-System ✓", description: "You'll get 2026 enterprise alerts and launch notifications." });
    } catch {
      toast({ title: "Something went wrong", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="podcast" className="py-24 px-6 bg-secondary/30">
      <div className="container max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-mono-system text-xs tracking-[0.3em] uppercase text-emerald-glow mb-4">
            The Audience Moat
          </p>
        <h2 className="font-serif-display text-4xl md:text-5xl font-bold mb-4">
            The <span className="italic text-gradient-emerald">American Reality</span> Podcast
          </h2>
          <p className="font-mono-system text-sm text-muted-foreground max-w-xl mx-auto">
            Code-Switching for the New Economy. Where Politics, Money, and Culture collide —
            and we show you how to build parallel systems that actually work.
          </p>
        </div>

        {/* Episode Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {PLACEHOLDER_EPISODES.map((ep) => (
            <div
              key={ep.number}
              className="rounded-xl border border-border bg-card overflow-hidden flex flex-col"
            >
              {/* Spotify Embed or Placeholder */}
              <div className="aspect-square bg-secondary/50 flex items-center justify-center relative">
                {ep.spotifyEmbedId ? (
                  <iframe
                    src={`https://open.spotify.com/embed/episode/${ep.spotifyEmbedId}?utm_source=generator&theme=0`}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="absolute inset-0"
                  />
                ) : (
                  <div className="text-center p-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-emerald flex items-center justify-center mx-auto mb-3">
                      <Play className="h-6 w-6 text-primary-foreground ml-1" />
                    </div>
                    <span className="font-mono-system text-[10px] tracking-[0.15em] uppercase px-3 py-1 rounded-full border border-emerald-light/20 text-emerald-glow">
                      coming soon
                    </span>
                  </div>
                )}
              </div>

              {/* Episode Info */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono-system text-[10px] tracking-[0.2em] uppercase text-emerald-glow">
                    EP {ep.number}
                  </span>
                  <span className="font-mono-system text-[10px] text-muted-foreground">·</span>
                  <span className="font-mono-system text-[10px] uppercase text-muted-foreground">
                    {ep.topic}
                  </span>
                </div>
                <h4 className="font-serif-display text-lg font-bold mb-2">{ep.title}</h4>
                <p className="font-mono-system text-xs text-muted-foreground mb-4 flex-1">
                  {ep.description}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="flex items-center gap-1 font-mono-system text-[10px] text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {ep.duration}
                  </span>
                  <Button variant="ghost-bone" size="sm" disabled className="opacity-50">
                    <Download className="h-3 w-3 mr-1" />
                    Transcript
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="rounded-xl border border-emerald-light/20 bg-card p-8 md:p-10">
          <div className="text-center mb-6">
            <Mail className="h-6 w-6 text-emerald-glow mx-auto mb-3" />
            <h3 className="font-serif-display text-2xl font-bold mb-2">Join the Sol-System</h3>
            <p className="font-mono-system text-xs text-muted-foreground max-w-md mx-auto">
              Get 2026 enterprise alerts and launch notifications. No spam — just systems.
            </p>
          </div>
          {submitted ? (
            <div className="flex items-center justify-center gap-2 py-4">
              <CheckCircle className="h-5 w-5 text-emerald-glow" />
              <p className="font-mono-system text-sm text-emerald-glow font-bold">You're in. Watch your inbox.</p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-secondary border-border font-mono-system text-sm"
                required
              />
              <Button variant="emerald" type="submit" disabled={submitting} className="shrink-0">
                {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Mail className="h-4 w-4 mr-2" />}
                Subscribe
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default PodcastSection;
