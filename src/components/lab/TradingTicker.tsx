const TIPS = [
  "Infrastructure Rule: Never risk more than 1% of your equity on a single candle. Wealth is a marathon, not a sprint.",
  "The Trend is your coworker. If the 8 EMA is below the 21 EMA, we stay patient. We don't fight the tape.",
  "Check the Economic Calendar. If the Fed is speaking today, the Bot stays in 'Defensive Mode.' Capital preservation is priority one.",
  "Trading is a business, not a casino. If you didn't log your trade in the Vault, the trade didn't happen.",
  "Volume confirms the move. If price is rising but volume is falling, the 'Big Money' isn't with you. Stay sharp.",
  "Lot size is your only real control. Control the size, and you control the stress.",
  "The 3-LLC Goal: Take your Friday trading profits and funnel them into your KDP ad-spend for 'Infinite Scaling'.",
];

const TradingTicker = () => {
  const doubled = [...TIPS, ...TIPS];

  return (
    <div className="w-full overflow-hidden border-b border-border bg-secondary/50 py-2.5">
      <div className="flex animate-ticker whitespace-nowrap">
        {doubled.map((tip, i) => (
          <span key={i} className="inline-flex items-center shrink-0 px-8">
            <span className="font-mono-system text-[10px] tracking-[0.15em] uppercase text-emerald-glow mr-2">
              Tip {String((i % TIPS.length) + 1).padStart(2, "0")}
            </span>
            <span className="font-mono-system text-xs text-muted-foreground">
              {tip}
            </span>
            <span className="ml-8 text-border">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TradingTicker;
