"use client";

import * as React from "react";
import Image from "next/image";
import { Bed, MapPin, Proportions, ShowerHead } from "lucide-react";
import { useAppPrefs } from "@/lib/prefs-context";
import { useT } from "@/lib/i18n";
import { useRates } from "@/lib/hooks/use-rates";
import { PropertyQueryResult } from "@/lib/sanity/types";
import { safeImageUrl } from "@/lib/sanity/image";
import { formatter } from "@/lib/priceFormatter";
import Link from "next/link";

export type PropertyGridProps = {
  properties: PropertyQueryResult[];
  onSelectProperty?: (property: PropertyQueryResult) => void;
};

export default function PropertyGrid({ properties, onSelectProperty }: PropertyGridProps) {
  const t = useT();
  const { currency, language } = useAppPrefs();
  const { convert, loading: ratesLoading } = useRates();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {properties.map((p) => {
        const price = `€${p.price.toLocaleString()}`;
        const eur = Number(price.replace(/[^\d]/g, "")) || 0;
        const priceDisplay =
          !ratesLoading && eur > 0
            ? formatter(language, currency).format(convert(eur as number, currency as any))
            : p.price;

        return (
          <div
            key={p._id}
            className="group relative overflow-hidden rounded-xl bg-white border shadow-sm transition-all hover:shadow-md focus-within:shadow-md">
            <div className="relative w-full overflow-hidden">
              <div className="relative h-44 sm:h-48 md:h-56 w-full">
                <Image
                  src={
                    safeImageUrl(p.mainImage) ||
                    "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=400&h=300&q=80"
                  }
                  alt={p.mainImage?.alt || p.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <div className="absolute left-3 top-3 z-10 rounded-full bg-gold text-white backdrop-blur px-2.5 py-1 text-xs font-medium">
                {p.propertyType}
              </div>
            </div>

            <div className="p-4 sm:p-5">
              <h3 className="font-semibold text-lg truncate">{p.title}</h3>
              <p className="text-primary text-lg font-bold mb-1">{priceDisplay}</p>
              <p className="text-gray-700 mb-1 flex gap-1 items-center text-sm">
                <MapPin className="text-primary size-4" />
                {p.address?.city}, {p.address?.region}
              </p>
              <div className="flex items-center gap-4 text-[13px] sm:text-sm text-muted-foreground mb-2 mt-1">
                <div className="flex items-center gap-1.5">
                  <Bed className="h-4 w-4 text-gold" aria-hidden="true" />
                  <span className="font-medium">{p.beds}</span>
                  <span className="text-muted-foreground">{t("labels.bed")}</span>
                </div>
                <div className="h-4 w-px bg-border" aria-hidden="true" />
                <div className="flex items-center gap-1.5">
                  <ShowerHead className="h-4 w-4 text-gold" aria-hidden="true" />
                  <span className="font-medium">{p.baths}</span>
                  <span className="text-muted-foreground">{t("labels.bath")}</span>
                </div>
                <div className="h-4 w-px bg-border" aria-hidden="true" />
                <div className="flex items-center gap-1.5">
                  <Proportions className="h-4 w-4 text-gold" aria-hidden="true" />
                  <span className="font-medium">{p.sqft}</span>
                  <span className="text-muted-foreground">{t("labels.area")}</span>
                </div>
              </div>
              <Link
                href={`/${p.slug.current}`}
                onClick={() => onSelectProperty && onSelectProperty(p)}
                className="inline-flex justify-center w-full bg-gold/90 text-white py-2 rounded shadow font-semibold hover:bg-white transition cursor-pointer hover:text-gold border border-gold hover:border-gold focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2">
                View details
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
