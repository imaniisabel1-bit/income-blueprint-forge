import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PodcastSection from "@/components/PodcastSection";
import NewsletterSection from "@/components/NewsletterSection";

const Podcast = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pt-16">
        <PodcastSection />
        <NewsletterSection />
      </main>
      <SiteFooter />
    </div>
  );
};

export default Podcast;
