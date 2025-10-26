import React from "react";
import PropertyDetailsModal from "@/components/PropertyDetailsModal";
import { PropertyQueryResult } from "@/lib/sanity/types";
import SanityAllProperties from "./SanityAllProperties";

export default function PropertyExplorer() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<PropertyQueryResult | null>(null);

  return (
    <div>
      <SanityAllProperties
        title="All Properties"
        subtitle="Browse all available properties"
        limit={12}
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
