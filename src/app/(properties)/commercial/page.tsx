"use client";

import PropertyGrid from "@/components/PropertyGrid";
import { getCommercialProperties } from "@/lib/dummy-data";

export default function CommercialPage() {
  const commercialProperties = getCommercialProperties();

  return (
    <>
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl">
          <PropertyGrid properties={commercialProperties} />
        </div>
      </section>
    </>
  );
}
