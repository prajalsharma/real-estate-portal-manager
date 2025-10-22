import React from "react";
import PropertyDetailsModal from "@/components/PropertyDetailsModal";
import { PropertyQueryResult } from "@/lib/sanity/types";
import { useFeaturedProperties } from "@/lib/sanity/hooks";
import SanityFeaturedProperties from "./SanityFeaturedProperties";

export default function PropertyExplorer() {
  const { properties = [] } = useFeaturedProperties(8);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<PropertyQueryResult | null>(null);

  return (
    <div>
      <SanityFeaturedProperties
        properties={properties}
        limit={8}
        onSelectProperty={(p: PropertyQueryResult) => {
          setSelected(p);
          setOpen(true);
        }}
      />
      <PropertyDetailsModal
        open={open}
        onOpenChange={setOpen}
        property={selected as PropertyQueryResult}
        gallery={selected?.images?.map((img) => img.asset._ref) || []}
      />
    </div>
  );
}
