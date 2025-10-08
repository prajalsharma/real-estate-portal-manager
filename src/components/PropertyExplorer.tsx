"use client";

import React from "react";
import FeaturedProperties from "@/components/FeaturedProperties";
import PropertyDetailsModal, { type Property } from "@/components/PropertyDetailsModal";
import { FEATURED_DEFAULTS } from "@/components/FeaturedProperties";

export default function PropertyExplorer() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Property | null>(null);
  const [items, setItems] = React.useState<Property[]>(FEATURED_DEFAULTS as Property[]);

  // Apply filters coming from HeroSection via custom event "app:search"
  React.useEffect(() => {
    const mapType = (val?: string): string | undefined => {
      if (!val) return undefined;
      const v = val.toLowerCase();
      // Map UI values -> dataset types
      const map: Record<string, string> = {
        apartment: "Apartment",
        maisonette: "House", // closest available type in dummy data
        condo: "Condo",
        commercial: "Commercial",
        land: "Land",
        rental: "Rental",
        house: "House",
      };
      return map[v] ?? val;
    };

    const handleSearch = (e: Event) => {
      const detail = (e as CustomEvent).detail as {
        location?: string
        type?: string
        minPrice?: number | null
        maxPrice?: number | null
        beds?: string
      };

      const typeMapped = mapType(detail.type);
      const bedsVal = detail.beds === "5-plus" ? 5 : detail.beds ? parseInt(detail.beds, 10) : undefined;

      const filtered = FEATURED_DEFAULTS.filter((p) => {
        // location match in title or address (case-insensitive)
        const locationOk = detail.location
          ? (p.address + " " + p.title).toLowerCase().includes(detail.location.toLowerCase())
          : true;

        const typeOk = typeMapped ? p.type.toLowerCase() === typeMapped.toLowerCase() : true;

        const minOk = detail.minPrice != null ? p.price >= detail.minPrice : true;
        const maxOk = detail.maxPrice != null ? p.price <= detail.maxPrice : true;

        const bedsOk = bedsVal != null ? (detail.beds === "5-plus" ? p.beds >= 5 : p.beds === bedsVal) : true;

        return locationOk && typeOk && minOk && maxOk && bedsOk;
      });

      setItems(filtered as Property[]);
    };

    const handleOpen = (e: Event) => {
      const { property, autoContact } = (e as CustomEvent).detail as { property: Property; autoContact?: boolean };
      setSelected(property);
      setOpen(true);
      // autoContact can be used by the modal if supported (left as-is for now)
    };

    window.addEventListener("app:search", handleSearch as EventListener);
    window.addEventListener("app:open-property", handleOpen as EventListener);
    return () => {
      window.removeEventListener("app:search", handleSearch as EventListener);
      window.removeEventListener("app:open-property", handleOpen as EventListener);
    };
  }, []);

  return (
    <div className="w-full">
      <FeaturedProperties
        properties={items}
        onSelectProperty={(p: any) => {
          setSelected(p as Property);
          setOpen(true);
        }}
      />

      <PropertyDetailsModal open={open} onOpenChange={setOpen} property={selected} />
    </div>
  );
}