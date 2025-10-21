"use client";

import React from "react";
import SanityFeaturedProperties from "@/components/SanityFeaturedProperties";
import PropertyDetailsModal, { type Property } from "@/components/PropertyDetailsModal";
import { PropertyQueryResult } from "@/lib/sanity/types";

export default function PropertyExplorer() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<PropertyQueryResult | null>(null);

  return (
    <div className="w-full">
      <SanityFeaturedProperties
        fallbackToStatic={true}
        limit={8}
        onSelectProperty={(p: PropertyQueryResult) => {
          setSelected(p);
          setOpen(true);
        }}
      />

      {/* If your modal requires the legacy Property type, you can adapt here as needed. */}
      <PropertyDetailsModal open={open} onOpenChange={setOpen} property={selected as unknown as Property} />
    </div>
  );
}
