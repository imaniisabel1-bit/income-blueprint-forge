import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="container max-w-3xl px-6 py-24">
        <p className="font-mono-system text-xs tracking-[0.3em] uppercase text-emerald-glow mb-4">Legal</p>
        <h1 className="font-serif-display text-4xl font-bold mb-8">IncomeDeck Systems LLC – Privacy Policy</h1>
        <div className="prose prose-invert max-w-none space-y-6 font-mono-system text-sm text-muted-foreground leading-relaxed">
          <p><strong className="text-foreground">Last Updated:</strong> February 2026</p>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">1. Information We Collect</h2>
          <p>We collect information necessary to process your payments and provide a customized experience in the Reality Calculator. This includes your name, email address, and business goals.</p>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">2. Use of Data</h2>
          <p>Your data is used to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Process Stripe transactions</li>
            <li>Send automated "Amaya Sol" compliance reminders</li>
            <li>Optimize the "Scaling Table" results for your specific dashboard</li>
          </ul>
          <p className="p-4 border border-emerald-light/20 rounded-lg bg-secondary/50 text-foreground font-bold">We do not sell your data to third-party brokers.</p>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">3. Data Security</h2>
          <p>We utilize Stripe for payment processing. IncomeDeck does not store your full credit card information on our servers. All data is encrypted via SSL and managed through secure cloud integrations.</p>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">4. Cookies &amp; Personalization</h2>
          <p>We use cookies to keep you logged into the Vault and to remember your "Reality Calculator" inputs so you don't have to re-enter your business goals every time you visit.</p>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">5. Your Rights</h2>
          <p>You may request to: (a) access your personal data; (b) correct inaccurate data; (c) delete your account and associated data; (d) opt out of marketing communications. Contact us at <span className="text-emerald-glow">support@incomedeck.com</span> for any data requests.</p>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">6. Children's Privacy</h2>
          <p>Our platform is not intended for individuals under 18 years of age. We do not knowingly collect personal information from minors.</p>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">7. Changes to This Policy</h2>
          <p>We may update this policy periodically. We will notify registered users of significant changes via email.</p>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">8. Contact</h2>
          <p>For privacy-related inquiries: <span className="text-emerald-glow">support@incomedeck.com</span></p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default PrivacyPolicy;
