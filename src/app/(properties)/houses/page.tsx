"use client";
import PropertyExplorer from "@/components/PropertyExplorer";
import RecommendedProperties from "@/components/RecommendedProperties";
import { client } from "@/sanity/client";

export default function HousesPage() {
  return (
    <>
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Houses</h1>
            <p className="text-lg text-muted-foreground">
              Find your dream home from our collection of beautiful houses and villas.
            </p>
          </div>
          <PropertyExplorer />
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl">
          <RecommendedProperties title="Featured Houses" />
        </div>
      </section>
    </>
  );
}
