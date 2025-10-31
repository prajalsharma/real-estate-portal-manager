"use client";

import HeroSection from "@/components/HeroSection";
import AgentsSection from "@/components/AgentsSection";
import RecommendedProperties from "@/components/RecommendedProperties";
import BlogSection from "@/components/BlogSection";
import PropertyExplorer from "@/components/PropertyExplorer";

export default function Page() {
  return (
    <>
      {/* Hero Section - Full width edge-to-edge with smooth fade-in */}
      <div className="animate-in fade-in duration-1000 ease-out">
        <HeroSection className="max-w-full" />
      </div>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150 ease-out">
        <div className="max-w-7xl">
          <PropertyExplorer />
        </div>
      </section>

      {/* <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300 ease-out">
        <div className="max-w-7xl">
          <AgentsSection />
        </div>
      </section> */}

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-450 ease-out">
        <div className="max-w-7xl">
          <RecommendedProperties />
        </div>
      </section>

      {/* <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-600 ease-out">
        <div className="max-w-7xl">
          <BlogSection />
        </div>
      </section> */}
    </>
  );
}
