import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const EarningsDisclaimer = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="container max-w-3xl px-6 py-24">
        <p className="font-mono-system text-xs tracking-[0.3em] uppercase text-emerald-glow mb-4">Legal</p>
        <h1 className="font-serif-display text-4xl font-bold mb-8">IncomeDeck Systems LLC – Earnings Disclaimer</h1>
        <div className="prose prose-invert max-w-none space-y-6 font-mono-system text-sm text-muted-foreground leading-relaxed">
          <p><strong className="text-foreground">Last Updated:</strong> February 2026</p>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">1. No Guarantee of Results</h2>
          <p>IncomeDeck Systems LLC ("IncomeDeck") makes no guarantees regarding income, earnings, or financial outcomes resulting from the use of our tools, kits, calculators, or educational content. Your results will vary based on your individual effort, business experience, expertise, market conditions, and a wide range of factors beyond our control.</p>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">2. Educational Purpose Only</h2>
          <p>All content provided by IncomeDeck — including the Reality Calculator, Infrastructure Kits (KDP, Pinterest, Vending), the Amaya Alpha trading methodology, the Glaze Meter, and the Systems Vault — is for <strong className="text-foreground">educational and informational purposes only</strong>. Nothing on this platform constitutes financial advice, investment advice, tax advice, or legal counsel.</p>
          <p className="p-4 border border-emerald-light/20 rounded-lg bg-secondary/50 text-foreground font-bold">
            IncomeDeck is not a registered investment advisor, broker-dealer, CPA, or attorney. Always consult a licensed professional before making financial decisions.
          </p>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">3. Income Projections Are Estimates</h2>
          <p>The projections, calculations, and financial models displayed through the Reality Calculator, Business Calculator, and Exit Valuation tools are <strong className="text-foreground">hypothetical estimates</strong> based on market data available at the time of creation. They are not promises of future performance. Actual earnings depend on:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your personal effort, consistency, and execution</li>
            <li>Market demand, competition, and economic conditions</li>
            <li>Product quality, pricing strategy, and marketing effectiveness</li>
            <li>Platform-specific algorithm changes (Amazon, Pinterest, etc.)</li>
            <li>Compliance with applicable laws and regulations</li>
          </ul>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">4. Trading & Investment Risk</h2>
          <p>The Amaya Alpha trading strategy, lot-size calculator, and any related trading content are educational demonstrations. Trading forex, stocks, and other financial instruments involves <strong className="text-foreground">substantial risk of loss</strong> and is not suitable for all investors. Past performance — whether real or simulated — does not guarantee future results. You should never trade with money you cannot afford to lose.</p>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">5. Testimonials & Examples</h2>
          <p>Any testimonials, case studies, or income examples shared on this platform represent individual results achieved under specific circumstances. They are not typical and should not be interpreted as a guarantee that you will achieve similar outcomes. Every individual's financial situation is unique.</p>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">6. Forward-Looking Statements</h2>
          <p>Certain statements on this platform may be "forward-looking" in nature, expressing expectations about future events, revenues, or market conditions. These statements are inherently uncertain and are based on current assumptions that may change. IncomeDeck assumes no obligation to update any forward-looking statements.</p>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">7. Your Responsibility</h2>
          <p>By using IncomeDeck's tools and purchasing our products, you acknowledge that:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>You are solely responsible for your own financial decisions</li>
            <li>You understand the inherent risks of starting and operating a business</li>
            <li>You will seek professional advice where appropriate</li>
            <li>You will not hold IncomeDeck liable for any losses or damages arising from your use of our platform</li>
          </ul>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">8. Contact</h2>
          <p>Questions about this disclaimer can be directed to: <span className="text-emerald-glow">legal@incomedeck.com</span></p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default EarningsDisclaimer;
