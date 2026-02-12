const SiteFooter = () => {
  return (
    <footer className="border-t border-border bg-secondary/20 py-16 px-6">
      <div className="container max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-md bg-gradient-emerald flex items-center justify-center">
                <span className="font-serif-display text-sm font-bold text-primary-foreground">ID</span>
              </div>
              <span className="font-serif-display text-lg font-bold">IncomeDeck</span>
            </div>
            <p className="font-mono-system text-xs text-muted-foreground leading-relaxed max-w-sm">
              IncomeDeck is a proprietary systems platform. All methodologies,
              frameworks, and calculation engines are protected intellectual property.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-mono-system text-[10px] tracking-[0.2em] uppercase text-emerald-glow mb-4">
              Platform
            </h4>
            <ul className="space-y-2">
              {["Systems Library", "The Real World Lab", "Member Portal", "Consulting"].map((item) => (
                <li key={item}>
                  <a href="#" className="font-mono-system text-xs text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono-system text-[10px] tracking-[0.2em] uppercase text-emerald-glow mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              {["Terms of Service", "Privacy Policy", "IP & Copyright", "Earnings Disclaimer"].map((item) => (
                <li key={item}>
                  <a href="#" className="font-mono-system text-xs text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal & Transparency Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono-system text-[10px] text-muted-foreground">
            © {new Date().getFullYear()} IncomeDeck LLC. All rights reserved. All systems and methodologies are proprietary.
          </p>
          <div className="flex items-center gap-4">
            <span className="font-mono-system text-[10px] text-muted-foreground flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-glow" />
              Legally Protected
            </span>
            <span className="font-mono-system text-[10px] text-muted-foreground flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-glow" />
              Investor Ready
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
