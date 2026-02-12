import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SiteHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container max-w-6xl flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-gradient-emerald flex items-center justify-center">
            <span className="font-serif-display text-sm font-bold text-primary-foreground">ID</span>
          </div>
          <span className="font-serif-display text-lg font-bold tracking-tight">
            IncomeDeck
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {["Systems", "The Lab", "About"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
              className="font-mono-system text-xs tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              {item}
            </a>
          ))}
          <Button variant="emerald" size="sm" onClick={() => navigate("/auth")}>
            Access Portal
          </Button>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background px-6 py-4 space-y-3">
          {["Systems", "The Lab", "About"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
              className="block font-mono-system text-sm text-muted-foreground"
              onClick={() => setMobileOpen(false)}
            >
              {item}
            </a>
          ))}
          <Button variant="emerald" size="sm" className="w-full mt-2" onClick={() => { setMobileOpen(false); navigate("/auth"); }}>
            Access Portal
          </Button>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
