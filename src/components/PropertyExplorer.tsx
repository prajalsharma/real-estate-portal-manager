"use client";

import React from "react";
import { SanityFeaturedProperties } from "@/components/SanityFeaturedProperties";
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

      {/* Convert Sanity property to legacy Property type for modal */}
      <PropertyDetailsModal 
        open={open} 
        onOpenChange={setOpen} 
        property={selected ? {
          id: selected._id,
          title: selected.title,
          address: `${selected.address?.city}, ${selected.address?.region}`,
          price: selected.price,
          beds: selected.beds,
          baths: selected.baths,
          sqft: selected.sqft,
          type: selected.propertyType,
          imageUrl: selected.mainImage ? '' : '', // Will use Sanity image URL
          images: [] // Can be enhanced later
        } as Property : null} 
      />
    </div>
  );
}