"use client";

import PropertyExplorer from "@/components/PropertyExplorer";
import RecommendedProperties from "@/components/RecommendedProperties";

export default function CondosPage() {
  return (
    <>
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Condos</h1>
            <p className="text-lg text-muted-foreground">
              Discover luxury condominiums and apartment buildings perfect for modern living.
            </p>
          </div>
          <PropertyExplorer />
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl">
          <RecommendedProperties title="Featured Condos" />
        </div>
      </section>
    </>
  );
}
