"use client";

import HeroSection from "@/components/HeroSection";
import RecommendedProperties from "@/components/RecommendedProperties";
import PropertyExplorer from "@/components/PropertyExplorer";

export default function Page() {
  return (
    <>
      <div className="animate-in fade-in duration-1000 ease-out">
        <HeroSection className="max-w-full" />
      </div>
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150 ease-out">
        <div className="max-w-7xl">
          <PropertyExplorer />
        </div>
      </section>
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-450 ease-out">
        <div className="max-w-7xl">
          <RecommendedProperties />
        </div>
      </section>
    </>
  );
}
