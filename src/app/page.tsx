import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedProperties from "@/components/FeaturedProperties";
import AgentsSection from "@/components/AgentsSection";
import RecommendedProperties from "@/components/RecommendedProperties";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";
import { AppPreferencesProvider } from "@/lib/prefs-context";
import PropertyExplorer from "@/components/PropertyExplorer";

export default function Page() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <AppPreferencesProvider initialCurrency="eur" initialLanguage="el">
        <Header initialCurrency="eur" initialLanguage="el" />

        <main className="w-full">
          {/* Hero Section - Full width edge-to-edge */}
          <HeroSection className="max-w-full" />

          <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="max-w-7xl">
              <PropertyExplorer />
            </div>
          </section>

          <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
            <div className="max-w-7xl">
              <AgentsSection />
            </div>
          </section>

          <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="max-w-7xl">
              <RecommendedProperties />
            </div>
          </section>

          <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
            <div className="max-w-7xl">
              <BlogSection />
            </div>
          </section>
        </main>

        <Footer className="border-t bg-background" />
      </AppPreferencesProvider>
    </div>
  );
}