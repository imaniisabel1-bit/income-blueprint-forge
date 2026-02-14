import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const IPCopyright = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="container max-w-3xl px-6 py-24">
        <p className="font-mono-system text-xs tracking-[0.3em] uppercase text-emerald-glow mb-4">Legal</p>
        <h1 className="font-serif-display text-4xl font-bold mb-8">IncomeDeck Systems LLC – Intellectual Property &amp; Copyright</h1>
        <div className="prose prose-invert max-w-none space-y-6 font-mono-system text-sm text-muted-foreground leading-relaxed">
          <p><strong className="text-foreground">Last Updated:</strong> February 2026</p>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">1. Ownership of Intellectual Property</h2>
          <p>All content, systems, methodologies, frameworks, calculation engines, branding, and digital assets available through IncomeDeck Systems LLC ("IncomeDeck," "we," "us") are the exclusive intellectual property of IncomeDeck Systems LLC and its parent holding company. This includes, but is not limited to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>The "Black Box" proprietary calculation logic and all derivative formulas</li>
            <li>The "Amaya Sol" persona, voice, likeness, and all associated branding</li>
            <li>The "Reality Calculator," "Glaze Meter," and "Catalog Scaling" engines</li>
            <li>All Infrastructure Kit content, templates, and deliverables (KDP, Pinterest, Vending)</li>
            <li>The "Amaya Alpha" trading strategy, Pine Script code, and lot-size methodology</li>
            <li>The IncomeDeck name, logo, taglines, and visual design system</li>
          </ul>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">2. Copyright Protection</h2>
          <p>All original works published on this platform — including text, graphics, user interfaces, visual designs, code, audio recordings, and multimedia content — are protected under United States copyright law (17 U.S.C. § 101 et seq.) and applicable international treaties.</p>
          <p className="p-4 border border-emerald-light/20 rounded-lg bg-secondary/50 text-foreground font-bold">
            © 2026 IncomeDeck Systems LLC. All rights reserved. Unauthorized reproduction, distribution, or creation of derivative works is strictly prohibited.
          </p>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">3. Permitted Use</h2>
          <p>Purchasing an Infrastructure Kit grants you a limited, non-exclusive, non-transferable license to use the kit contents for your personal or business operations. You may not:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Resell, redistribute, or sublicense any kit content</li>
            <li>Publish kit materials as your own original work</li>
            <li>Reverse-engineer the "Black Box" logic or proprietary formulas</li>
            <li>Use IncomeDeck branding, the Amaya Sol persona, or logos without written authorization</li>
            <li>Screen-record, scrape, or extract content from the Members Vault</li>
          </ul>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">4. Trademarks</h2>
          <p>The following are trademarks or service marks of IncomeDeck Systems LLC:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-foreground">IncomeDeck™</strong></li>
            <li><strong className="text-foreground">Amaya Sol™</strong></li>
            <li><strong className="text-foreground">The Black Box™</strong></li>
            <li><strong className="text-foreground">Reality Calculator™</strong></li>
            <li><strong className="text-foreground">Sol-System™</strong></li>
          </ul>
          <p>Use of these marks without prior written consent is prohibited and may constitute trademark infringement.</p>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">5. DMCA &amp; Takedown Policy</h2>
          <p>IncomeDeck respects intellectual property rights and expects its users to do the same. If you believe your copyrighted work has been used on our platform without authorization, please contact us with the following information:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Identification of the copyrighted work</li>
            <li>Location of the infringing material on our platform</li>
            <li>Your contact information</li>
            <li>A statement of good faith belief that the use is unauthorized</li>
          </ul>
          <p>Send all DMCA notices to: <span className="text-emerald-glow">legal@incomedeck.com</span></p>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">6. Enforcement</h2>
          <p>IncomeDeck Systems LLC actively monitors for unauthorized use of its intellectual property. Violations will be pursued to the fullest extent of the law, including but not limited to cease-and-desist orders, DMCA takedowns, and civil litigation for damages.</p>

          <h2 className="font-serif-display text-xl font-bold text-foreground !mt-10">7. Contact</h2>
          <p>For IP licensing inquiries or to report infringement: <span className="text-emerald-glow">legal@incomedeck.com</span></p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default IPCopyright;
