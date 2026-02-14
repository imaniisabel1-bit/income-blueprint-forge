import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="container max-w-3xl px-6 py-24">
        <p className="font-mono-system text-xs tracking-[0.3em] uppercase text-emerald-glow mb-4">Legal</p>
        <h1 className="font-serif-display text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-invert max-w-none space-y-6 font-mono-system text-sm text-muted-foreground leading-relaxed">
          <p><strong className="text-foreground">Last Updated:</strong> February 14, 2026</p>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">1. Information We Collect</h2>
          <p><strong className="text-foreground">Account Data:</strong> When you create an account, we collect your email address and authentication credentials.</p>
          <p><strong className="text-foreground">Usage Data:</strong> We collect calculator inputs (page count, price) and interaction data to improve our financial modeling tools. This data is anonymized and used to build our proprietary research database.</p>
          <p><strong className="text-foreground">Payment Data:</strong> Payment information is processed directly by Stripe. We do not store credit card numbers, CVVs, or full card details on our servers.</p>
          <p><strong className="text-foreground">Newsletter Data:</strong> If you subscribe to the Sol-System newsletter, we collect your email address for marketing communications.</p>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">2. How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To deliver purchased digital products and maintain your member portal access</li>
            <li>To process payments and manage subscriptions via Stripe</li>
            <li>To improve our calculation engines and financial modeling accuracy</li>
            <li>To send transactional emails (purchase confirmations, access links)</li>
            <li>To send marketing communications if you opt in via the newsletter</li>
          </ul>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">3. Data Sharing</h2>
          <p>We do not sell your personal information. We share data only with:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-foreground">Stripe:</strong> For payment processing</li>
            <li><strong className="text-foreground">Cloud Infrastructure:</strong> For hosting and data storage (encrypted at rest)</li>
            <li><strong className="text-foreground">Legal Requirements:</strong> If required by law or to protect our rights</li>
          </ul>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">4. Data Security</h2>
          <p>We implement industry-standard security measures including encrypted data transmission (TLS), row-level security on database tables, and JWT-based authentication. However, no method of transmission over the internet is 100% secure.</p>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">5. Your Rights</h2>
          <p>You may request to: (a) access your personal data; (b) correct inaccurate data; (c) delete your account and associated data; (d) opt out of marketing communications. Contact us at <span className="text-emerald-glow">support@incomedeck.com</span> for any data requests.</p>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">6. Cookies</h2>
          <p>We use essential cookies for authentication and session management. We do not use third-party advertising cookies.</p>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">7. Children's Privacy</h2>
          <p>Our platform is not intended for individuals under 18 years of age. We do not knowingly collect personal information from minors.</p>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">8. Changes to This Policy</h2>
          <p>We may update this policy periodically. We will notify registered users of significant changes via email.</p>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">9. Contact</h2>
          <p>For privacy-related inquiries: <span className="text-emerald-glow">support@incomedeck.com</span></p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default PrivacyPolicy;
