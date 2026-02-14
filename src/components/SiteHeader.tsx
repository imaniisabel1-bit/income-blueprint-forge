import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Systems", path: "/systems" },
  { label: "Lab", path: "/lab" },
  { label: "Podcast", path: "/podcast" },
  { label: "About", path: "/about" },
];

const SiteHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container max-w-6xl flex items-center justify-between h-16 px-6">
        <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }} className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-gradient-emerald flex items-center justify-center">
            <span className="font-serif-display text-sm font-bold text-primary-foreground">ID</span>
          </div>
          <span className="font-serif-display text-lg font-bold tracking-tight">IncomeDeck</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`font-mono-system text-xs tracking-wider uppercase transition-colors ${
                location.pathname === item.path
                  ? "text-emerald-glow font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </button>
          ))}
          <Button variant="emerald" size="sm" onClick={() => navigate("/auth")}>
            Access Portal
          </Button>
        </nav>

        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background px-6 py-4 space-y-3">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => { setMobileOpen(false); navigate(item.path); }}
              className={`block font-mono-system text-sm w-full text-left ${
                location.pathname === item.path ? "text-emerald-glow" : "text-muted-foreground"
              }`}
            >
              {item.label}
            </button>
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
