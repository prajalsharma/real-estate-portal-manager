import React from "react";
import PropertyDetailsModal, { type Property } from "@/components/PropertyDetailsModal";
import { PropertyQueryResult } from "@/lib/sanity/types";
import { useFeaturedProperties } from "@/lib/sanity/hooks";

export default function PropertyExplorer() {
  const { properties = [] } = useFeaturedProperties(8);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<PropertyQueryResult | null>(null);

  return (
    <div className="w-full">
      <div className="property-list-grid">
        {properties.map((p: PropertyQueryResult) => (
          <div key={p._id} className="property-tile">
            <button
              type="button"
              className="view-details-btn"
              onClick={() => {
                setSelected(p);
                setOpen(true);
              }}
            >
              View details
            </button>
          </div>
        ))}
      </div>
      <PropertyDetailsModal open={open} onOpenChange={setOpen} property={selected as unknown as Property} />
    </div>
  );
}
