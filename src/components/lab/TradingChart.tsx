import { useEffect, useRef } from "react";

const TradingChart = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    // Clear any existing widget
    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: "NASDAQ:AAPL",
      interval: "D",
      timezone: "America/New_York",
      theme: "dark",
      style: "1",
      locale: "en",
      backgroundColor: "rgba(26, 26, 27, 1)",
      gridColor: "rgba(255, 255, 255, 0.06)",
      allow_symbol_change: true,
      calendar: false,
      support_host: "https://www.tradingview.com",
    });

    containerRef.current.appendChild(script);
  }, []);

  return (
    <section className="py-16 px-6">
      <div className="container max-w-6xl">
        <div className="mb-8">
          <p className="font-mono-system text-xs tracking-[0.2em] uppercase text-emerald-glow mb-2">
            Live Market Data
          </p>
          <h2 className="font-serif-display text-3xl font-bold">
            Advanced <span className="italic text-gradient-emerald">Chart</span>
          </h2>
        </div>
        <div className="rounded-xl border border-border overflow-hidden" style={{ height: "500px" }}>
          <div ref={containerRef} className="tradingview-widget-container" style={{ height: "100%", width: "100%" }}>
            <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TradingChart;
