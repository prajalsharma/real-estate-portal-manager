"use client";

import PropertyGrid from "@/components/PropertyGrid";
import { getCondoProperties } from "@/lib/dummy-data";

export default function CondosPage() {
  const condoProperties = getCondoProperties();

  return (
    <>
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl">
          <PropertyGrid properties={condoProperties} />
        </div>
      </section>
    </>
  );
}
