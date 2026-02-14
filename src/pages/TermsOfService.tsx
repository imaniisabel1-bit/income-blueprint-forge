import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="container max-w-3xl px-6 py-24">
        <p className="font-mono-system text-xs tracking-[0.3em] uppercase text-emerald-glow mb-4">Legal</p>
        <h1 className="font-serif-display text-4xl font-bold mb-8">Terms of Service</h1>
        <div className="prose prose-invert max-w-none space-y-6 font-mono-system text-sm text-muted-foreground leading-relaxed">
          <p><strong className="text-foreground">Last Updated:</strong> February 14, 2026</p>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">1. Agreement to Terms</h2>
          <p>By accessing or using IncomeDeck Systems LLC ("IncomeDeck," "we," "our") and any associated websites, products, or services, you agree to be bound by these Terms of Service. If you do not agree, do not access or use our platform.</p>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">2. Description of Services</h2>
          <p>IncomeDeck provides digital financial modeling tools, enterprise-building infrastructure kits, and subscription-based educational content including the KDP Infrastructure Kit, Affiliate Pinterest Blueprint, Systems Vault Membership, and related digital products. All products are delivered digitally via our member portal immediately upon purchase.</p>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">3. Account Registration</h2>
          <p>To access certain features, you must create an account with a valid email address. You are responsible for maintaining the confidentiality of your credentials and all activity under your account. You agree to provide accurate, complete information.</p>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">4. Payments & Refund Policy</h2>
          <p>Payments are processed securely through Stripe. One-time purchases and subscription fees are charged at the time of purchase or the beginning of each billing cycle, respectively.</p>
          <p className="p-4 border border-emerald-light/20 rounded-lg bg-secondary/50 text-foreground font-bold">Due to the digital nature of our Infrastructure Kits, all sales are final once the Systems Vault has been accessed. No refunds will be issued for digital products after access has been granted.</p>
          <p>Subscriptions may be canceled at any time through the Stripe Customer Portal. Cancellation takes effect at the end of the current billing period.</p>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">5. Intellectual Property</h2>
          <p>All systems, methodologies, frameworks, calculation engines, and content on IncomeDeck are proprietary intellectual property of IncomeDeck Systems LLC. You may not reproduce, distribute, modify, or create derivative works without express written permission.</p>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">6. Earnings Disclaimer</h2>
          <p>IncomeDeck provides financial modeling tools and educational content. Results vary based on individual effort, market conditions, and other factors. We make no guarantees of income or financial outcomes. All calculator projections are estimates based on user inputs and publicly available market data.</p>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">7. User Conduct</h2>
          <p>You agree not to: (a) share or redistribute purchased content; (b) use the platform for unlawful purposes; (c) attempt to reverse-engineer proprietary tools; (d) impersonate others or provide false information.</p>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">8. Limitation of Liability</h2>
          <p>IncomeDeck Systems LLC shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform, including lost profits or business interruption, even if advised of the possibility of such damages.</p>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">9. Modifications</h2>
          <p>We reserve the right to update these terms at any time. Continued use of the platform after changes constitutes acceptance of the updated terms.</p>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">10. Contact</h2>
          <p>Questions about these terms can be directed to: <span className="text-emerald-glow">support@incomedeck.com</span></p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default TermsOfService;
