"use client";

import PropertyExplorer from "@/components/PropertyExplorer";
import RecommendedProperties from "@/components/RecommendedProperties";

export default function RentPage() {
  return (
    <>
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Rental Properties</h1>
            <p className="text-lg text-muted-foreground">
              Browse available rental properties including apartments, houses, and vacation rentals.
            </p>
          </div>
          <PropertyExplorer />
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl">
          <RecommendedProperties title="Featured Rental Properties" />
        </div>
      </section>
    </>
  );
}
