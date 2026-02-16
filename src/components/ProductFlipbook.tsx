import { useState } from "react";
import { cn } from "@/lib/utils";

const PAGES = [
  {
    content: (
      <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-secondary to-background">
        <div className="w-16 h-16 rounded-lg bg-gradient-emerald flex items-center justify-center mb-6">
          <span className="font-serif-display text-2xl font-bold text-primary-foreground">K</span>
        </div>
        <h3 className="font-serif-display text-2xl md:text-3xl font-bold text-center mb-2">
          <span className="text-gold">KDP</span> INFRASTRUCTURE
        </h3>
        <p className="font-mono-system text-[10px] tracking-[0.3em] uppercase text-emerald-glow">
          Sol-System Global
        </p>
      </div>
    ),
  },
  {
    content: (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <p className="font-mono-system text-xs tracking-[0.2em] uppercase text-emerald-glow mb-6">
          Projected Yield
        </p>
        <div className="w-full max-w-xs space-y-3">
          {[
            { label: "Monthly", value: "$2,278", bar: 40 },
            { label: "Quarterly", value: "$6,835", bar: 65 },
            { label: "Yearly", value: "$27,725", bar: 100 },
          ].map((row) => (
            <div key={row.label}>
              <div className="flex justify-between mb-1">
                <span className="font-mono-system text-[10px] text-muted-foreground">{row.label}</span>
                <span className="font-serif-display text-sm font-bold text-gradient-emerald">{row.value}</span>
              </div>
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-emerald transition-all duration-1000"
                  style={{ width: `${row.bar}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    content: (
      <div className="flex flex-col justify-center h-full p-8">
        <p className="font-mono-system text-xs tracking-[0.2em] uppercase text-emerald-glow mb-6">
          The 3-LLC Setup
        </p>
        <ul className="space-y-4">
          {[
            "LLC 1 — Publishing Entity (KDP royalties, IP ownership)",
            "LLC 2 — Marketing Entity (ads, affiliate commissions)",
            "LLC 3 — Holding Company (asset protection, reinvestment)",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-md bg-gradient-emerald flex items-center justify-center shrink-0 mt-0.5">
                <span className="font-mono-system text-[10px] font-bold text-primary-foreground">{i + 1}</span>
              </div>
              <span className="font-mono-system text-xs text-foreground/90 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
];

const ProductFlipbook = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [flipping, setFlipping] = useState(false);

  const flip = (dir: 1 | -1) => {
    const next = currentPage + dir;
    if (next < 0 || next >= PAGES.length || flipping) return;
    setFlipping(true);
    setTimeout(() => {
      setCurrentPage(next);
      setFlipping(false);
    }, 400);
  };

  return (
    <div className="relative w-full max-w-md mx-auto aspect-[3/4]">
      {/* MacBook-style frame */}
      <div className="absolute inset-0 rounded-xl border-2 border-border bg-card shadow-2xl overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-border bg-secondary/50">
          <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-gold/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-glow/60" />
          <span className="flex-1 text-center font-mono-system text-[9px] text-muted-foreground">
            preview.sol-system.global
          </span>
        </div>

        {/* Page content */}
        <div
          className={cn(
            "h-[calc(100%-36px)] transition-all duration-400",
            flipping && "opacity-0 scale-95"
          )}
        >
          {PAGES[currentPage].content}
        </div>
      </div>

      {/* Click zones */}
      {currentPage > 0 && (
        <button
          onClick={() => flip(-1)}
          className="absolute left-0 top-0 w-1/4 h-full z-10 cursor-w-resize"
          aria-label="Previous page"
        />
      )}
      {currentPage < PAGES.length - 1 && (
        <button
          onClick={() => flip(1)}
          className="absolute right-0 top-0 w-1/4 h-full z-10 cursor-e-resize"
          aria-label="Next page"
        />
      )}

      {/* Page dots */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {PAGES.map((_, i) => (
          <div
            key={i}
            className={cn(
              "w-2 h-2 rounded-full transition-colors",
              i === currentPage ? "bg-emerald-glow" : "bg-muted-foreground/30"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductFlipbook;
