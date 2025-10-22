import React from "react";
import PropertyDetailsModal, { type Property } from "@/components/PropertyDetailsModal";
import { PropertyQueryResult } from "@/lib/sanity/types";
import { useFeaturedProperties } from "@/lib/sanity/hooks";
import { safeImageUrl } from "@/lib/sanity/image";

export default function PropertyExplorer() {
  const { properties = [] } = useFeaturedProperties(8);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<PropertyQueryResult | null>(null);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {properties.map((p: PropertyQueryResult) => (
          <div key={p._id} className="relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all">
            <img
              src={safeImageUrl(p.mainImage) || "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=400&h=300&q=80"}
              alt={p.mainImage?.alt || p.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg truncate mb-2">{p.title}</h3>
              <p className="text-gray-700 mb-1">{p.address?.city}, {p.address?.region}</p>
              <p className="text-primary font-bold mb-2">€{p.price?.toLocaleString()}</p>
              <div className="flex space-x-3 text-sm text-muted-foreground mb-2">
                <span>{p.beds ?? "-"} bd</span>
                <span>{p.baths ?? "-"} ba</span>
                <span>{p.sqft ?? "-"} m²</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelected(p);
                  setOpen(true);
                }}
                className="w-full bg-gold/90 text-white py-2 rounded shadow font-semibold hover:bg-gold transition"
              >
                View details
              </button>
            </div>
          </div>
        ))}
      </div>
      <PropertyDetailsModal open={open} onOpenChange={setOpen} property={selected as unknown as Property} />
    </div>
  );
}
