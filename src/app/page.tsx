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
    // Use global theme tokens so light/dark looks consistent
    <div className="min-h-dvh bg-background text-foreground">
      {/* Provide currency & language globally */}
      <AppPreferencesProvider initialCurrency="eur" initialLanguage="el">
        <Header initialCurrency="eur" initialLanguage="el" />

        <main className="w-full">
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
            <div className="grid gap-8">
              <HeroSection className="max-w-6xl" />
            </div>
          </section>

          <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="max-w-7xl">
              {/* Use explorer to handle click -> details modal */}
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