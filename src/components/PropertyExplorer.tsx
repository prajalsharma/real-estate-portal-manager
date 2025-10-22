import React from "react";
import PropertyDetailsModal, { type Property } from "@/components/PropertyDetailsModal";
import { PropertyQueryResult } from "@/lib/sanity/types";

export default function PropertyExplorer({ properties }) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<PropertyQueryResult | null>(null);

  return (
    <div className="w-full">
      <div className="property-list-grid">
        {properties.map((p: PropertyQueryResult) => (
          <div key={p._id} className="property-tile">
            {/* Render your tile/card UI */}
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
