import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
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

  // Close menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container max-w-6xl flex items-center justify-between h-16 px-6">
          <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-gradient-emerald flex items-center justify-center">
              <span className="font-serif-display text-sm font-bold text-primary-foreground">SS</span>
            </div>
            <span className="font-serif-display text-lg font-bold tracking-tight">Sol-System Global</span>
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
            className="md:hidden text-foreground relative z-50"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile slide-in panel */}
      <nav
        className={`fixed top-0 right-0 z-40 h-full w-72 bg-background border-l border-border shadow-2xl transform transition-transform duration-300 ease-out md:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col pt-24 px-8 gap-2">
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`text-left font-mono-system text-sm tracking-wider uppercase py-3 border-b border-border/30 transition-all duration-300 ${
                mobileOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              } ${
                location.pathname === item.path
                  ? "text-emerald-glow font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              style={{ transitionDelay: mobileOpen ? `${100 + i * 60}ms` : "0ms" }}
            >
              {item.label}
            </button>
          ))}
          <Button
            variant="emerald"
            size="sm"
            className={`w-full mt-6 transition-all duration-300 ${
              mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: mobileOpen ? "400ms" : "0ms" }}
            onClick={() => navigate("/auth")}
          >
            Access Portal
          </Button>
        </div>
      </nav>
    </>
  );
};

export default SiteHeader;
