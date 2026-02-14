import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="container max-w-3xl px-6 py-24">
        <p className="font-mono-system text-xs tracking-[0.3em] uppercase text-emerald-glow mb-4">Legal</p>
        <h1 className="font-serif-display text-4xl font-bold mb-8">IncomeDeck Systems LLC – Terms of Service</h1>
        <div className="prose prose-invert max-w-none space-y-6 font-mono-system text-sm text-muted-foreground leading-relaxed">
          <p><strong className="text-foreground">Last Updated:</strong> February 2026</p>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">1. Acceptance of Terms</h2>
          <p>By accessing the IncomeDeck Systems Vault, using the Reality Calculator, or purchasing any Infrastructure Kits, you agree to be bound by these Terms.</p>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">2. Digital Products &amp; Delivery</h2>
          <p>All kits (KDP, Pinterest, Vending) are delivered digitally via the member dashboard immediately upon successful payment. Access to the "Systems Vault" is a subscription-based service billed monthly.</p>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">3. No Financial Advice</h2>
          <p>IncomeDeck Systems LLC and its AI persona, Amaya Sol, provide educational tools and financial modeling. We are not licensed financial advisors, CPAs, or attorneys. The "Reality Calculator" uses projections based on 2026 market data; actual results depend on user effort and market conditions.</p>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">4. Refund Policy</h2>
          <p className="p-4 border border-emerald-light/20 rounded-lg bg-secondary/50 text-foreground font-bold">Due to the immediate, proprietary nature of our digital assets and "Black Box" logic, all sales of one-time Kits are final. Subscription memberships (Systems Vault) may be canceled at any time via the user dashboard, and access will continue until the end of the current billing cycle.</p>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">5. Intellectual Property</h2>
          <p>The "Black Box" logic, the Amaya Sol persona, and the IncomeDeck branding are the exclusive property of IncomeDeck Systems LLC. Unauthorized resale or distribution of kit contents is strictly prohibited.</p>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">6. User Conduct</h2>
          <p>You agree not to: (a) share or redistribute purchased content; (b) use the platform for unlawful purposes; (c) attempt to reverse-engineer proprietary tools; (d) impersonate others or provide false information.</p>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">7. Limitation of Liability</h2>
          <p>IncomeDeck Systems LLC shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform, including lost profits or business interruption, even if advised of the possibility of such damages.</p>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">8. Modifications</h2>
          <p>We reserve the right to update these terms at any time. Continued use of the platform after changes constitutes acceptance of the updated terms.</p>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">9. Contact</h2>
          <p>Questions about these terms can be directed to: <span className="text-emerald-glow">support@incomedeck.com</span></p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default TermsOfService;
