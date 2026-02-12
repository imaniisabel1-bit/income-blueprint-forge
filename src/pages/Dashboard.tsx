import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LogOut, BookOpen, Target, Lock, MessageSquare, Calculator } from "lucide-react";
import type { User } from "@supabase/supabase-js";

const kits = [
  {
    icon: BookOpen,
    title: "KDP Journal Launch Kit",
    status: "available",
    description: "Complete system for researching, designing, and launching profitable low-content books.",
  },
  {
    icon: Target,
    title: "Affiliate Pinterest Blueprint",
    status: "available",
    description: "The exact pin-to-profit system with 90-day implementation calendar.",
  },
  {
    icon: Lock,
    title: "The Systems Vault",
    status: "member",
    description: "Monthly access to every system, tool, and live workshop.",
  },
  {
    icon: MessageSquare,
    title: "LLC & Systems Consulting",
    status: "premium",
    description: "1:1 infrastructure consulting. We build your business OS from scratch.",
  },
];

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
        if (!session?.user) {
          navigate("/auth");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
      if (!session?.user) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="font-mono-system text-sm text-muted-foreground">Loading systems...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Header */}
      <header className="border-b border-border bg-card">
        <div className="container max-w-6xl flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-gradient-emerald flex items-center justify-center">
              <span className="font-serif-display text-sm font-bold text-primary-foreground">ID</span>
            </div>
            <span className="font-serif-display text-lg font-bold">Member Portal</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono-system text-xs text-muted-foreground hidden sm:block">
              {user?.email}
            </span>
            <Button variant="ghost-bone" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-1" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container max-w-6xl px-6 py-12">
        {/* Welcome */}
        <div className="mb-12">
          <p className="font-mono-system text-xs tracking-[0.3em] uppercase text-emerald-glow mb-2">
            Systems Dashboard
          </p>
          <h1 className="font-serif-display text-3xl md:text-4xl font-bold mb-2">
            Your Implementation <span className="italic text-gradient-emerald">Hub</span>
          </h1>
          <p className="font-mono-system text-sm text-muted-foreground">
            Access your kits, run calculations, and track your progress.
          </p>
        </div>

        {/* Quick Calculator Link */}
        <a
          href="/#calculator"
          className="flex items-center gap-3 p-4 rounded-lg border border-emerald-light/20 bg-secondary/50 hover:border-emerald-light/40 transition-colors mb-8"
        >
          <Calculator className="h-5 w-5 text-emerald-glow" />
          <div>
            <p className="font-mono-system text-sm font-bold">Business Reality Calculator</p>
            <p className="font-mono-system text-xs text-muted-foreground">Run the real numbers on any kit</p>
          </div>
        </a>

        {/* Kits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {kits.map((kit, index) => {
            const Icon = kit.icon;
            return (
              <div
                key={index}
                className="group relative p-8 rounded-xl border border-border bg-card hover:border-emerald-light/30 hover:shadow-emerald transition-all duration-500 flex flex-col no-select"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-emerald flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="font-mono-system text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-full border border-emerald-light/20 text-emerald-glow">
                    {kit.status}
                  </span>
                </div>
                <h3 className="font-serif-display text-xl font-bold mb-2">{kit.title}</h3>
                <p className="font-mono-system text-xs text-muted-foreground flex-1">{kit.description}</p>
                <Button variant="emerald" size="sm" className="mt-4 w-full">
                  Open System
                </Button>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
