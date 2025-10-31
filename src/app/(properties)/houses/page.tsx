"use client";
import PropertyExplorer from "@/components/PropertyExplorer";
import RecommendedProperties from "@/components/RecommendedProperties";

export default function HousesPage() {
  return (
    <>
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl">
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
