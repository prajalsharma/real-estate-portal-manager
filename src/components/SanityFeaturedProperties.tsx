"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Bed, MapPin, Proportions, ShowerHead } from "lucide-react";
import clsx from "clsx";
import { useAppPrefs } from "@/lib/prefs-context";
import { useT } from "@/lib/i18n";
import { useRates } from "@/lib/hooks/use-rates";
import { useFeaturedProperties } from "@/lib/sanity/hooks";
import { PropertyQueryResult } from "@/lib/sanity/types";
import { getPropertyCardImageUrl } from "@/lib/sanity/image";

export type SanityFeaturedPropertiesProps = {
  className?: string;
  title?: string;
  subtitle?: string;
  limit?: number;
  viewAllHref?: string;
  onSelectProperty?: (property: PropertyQueryResult) => void;
  fallbackToStatic?: boolean; // Fallback to static data if Sanity fails
};

// Fallback static data (existing data)
const fallbackProperties = [
  {
    _id: "p1",
    _type: "property" as const,
    title: "Sunlit Maisonette with Sea Views",
    address: {
      street: "",
      city: "Kassandra",
      region: "Halkidiki",
      country: "Greece",
      postalCode: ""
    },
    price: 385000,
    currency: "EUR" as const,
    beds: 3,
    baths: 2,
    sqft: 145,
    propertyType: "House",
    status: "For Sale" as const,
    featured: true,
    mainImage: {
      _type: "image" as const,
      asset: { _ref: "", _type: "reference" as const },
      alt: "Sunlit Maisonette with Sea Views"
    },
    images: [],
    location: { lat: 39.9792, lng: 23.4068 },
    agent: {
      _id: "agent1",
      _type: "agent" as const,
      name: "Eleni Papadopoulou",
      role: "Senior Listing Agent",
      rating: 5.0,
      sold: 132,
      phone: "+30 210 123 4567",
      avatar: { _type: "image" as const, asset: { _ref: "", _type: "reference" as const } }
    },
    publishedAt: new Date().toISOString(),
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
    slug: { current: "sunlit-maisonette-sea-views" }
  }
];

export default function SanityFeaturedProperties({
  className,
  title = "Latest in your area",
  subtitle = "Curated homes across Greece — fresh listings picked for you",
  limit = 4,
  viewAllHref,
  onSelectProperty,
  fallbackToStatic = true,
}: SanityFeaturedPropertiesProps) {
  const t = useT();
  const { currency, language } = useAppPrefs();
  const { convert } = useRates();
  
  // Fetch from Sanity
  const { properties: sanityProperties, loading, error } = useFeaturedProperties(limit);
  
  // Determine which properties to use
  const properties = React.useMemo(() => {
    if (loading) return [];
    if (error && !fallbackToStatic) return [];
    if (error && fallbackToStatic) {
      console.warn('Sanity fetch failed, using static fallback:', error);
      return fallbackProperties.slice(0, limit);
    }
    return sanityProperties;
  }, [sanityProperties, loading, error, fallbackToStatic, limit]);

  const formatPrice = React.useCallback(
    (price: number, baseCurrency: string = 'EUR') => {
      // Convert from base currency to selected currency
      let amount = price;
      if (baseCurrency.toUpperCase() !== currency.toUpperCase() && convert) {
        // Convert via EUR as base
        if (baseCurrency.toUpperCase() !== 'EUR') {
          // First convert to EUR (this would need exchange rates)
          amount = price; // Simplified - assume all prices are in EUR for now
        }
        amount = convert(amount, currency);
      }
      
      try {
        return new Intl.NumberFormat(language, {
          style: "currency",
          currency: currency.toUpperCase(),
          maximumFractionDigits: 0,
        }).format(amount);
      } catch {
        return `${currency.toUpperCase()} ${Math.round(amount).toLocaleString(language)}`;
      }
    },
    [convert, currency, language]
  );

  const translateType = React.useCallback(
    (type: string) => {
      const key = (type || "").toLowerCase();
      const map: Record<string, string> = {
        house: t("propertyTypes.house", "House"),
        apartment: t("propertyTypes.apartment", "Apartment"),
        condo: t("propertyTypes.condo", "Condo"),
        commercial: t("propertyTypes.commercial", "Commercial"),
        land: t("propertyTypes.land", "Land"),
        rental: t("propertyTypes.rental", "Rental"),
      };
      return map[key] ?? type;
    },
    [t]
  );

  const getImageUrl = (property: PropertyQueryResult) => {
    // If it's a Sanity property with proper image structure
    if (property.mainImage && property.mainImage.asset) {
      return getPropertyCardImageUrl(property.mainImage);
    }
    // Fallback to static image URL pattern
    return "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=400&h=300&q=80";
  };

  const getAddressString = (property: PropertyQueryResult) => {
    if (property.address) {
      return `${property.address.city}, ${property.address.region}`;
    }
    return 'Location not specified';
  };

  if (loading) {
    return (
      <section className={clsx("w-full max-w-full", className)}>
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-64 mb-2"></div>
          <div className="h-4 bg-muted rounded w-96 mb-6"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: limit }).map((_, i) => (
              <div key={i} className="rounded-xl border bg-white">
                <div className="h-48 bg-muted rounded-t-xl"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="flex gap-4">
                    <div className="h-3 bg-muted rounded w-12"></div>
                    <div className="h-3 bg-muted rounded w-12"></div>
                    <div className="h-3 bg-muted rounded w-12"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={clsx("w-full max-w-full", className)} aria-label="Featured properties">
      <div className="flex w-full items-end justify-between gap-4">
        <div className="min-w-0">
          <h2 className="font-semibold text-3xl tracking-tight text-foreground">
            {t("sections.featured.title", title)}
          </h2>
          {subtitle ? (
            <p className="mt-1 text-sm sm:text-base text-muted-foreground">
              {t("sections.featured.subtitle", subtitle)}
            </p>
          ) : null}
        </div>
        {viewAllHref ? (
          <Link
            href={viewAllHref}
            className="shrink-0 inline-flex items-center gap-2 rounded-full bg-popover px-3.5 py-2 text-sm font-medium text-foreground border hover:shadow-sm transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="View all properties">
            <span>{t("actions.viewAll")}</span>
            <MapPin className="h-4 w-4" aria-hidden="true" />
          </Link>
        ) : null}
      </div>

      {error && !fallbackToStatic && (
        <div className="mt-6 rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
          <p>Failed to load properties: {error}</p>
        </div>
      )}

      {properties.length === 0 && !loading && (
        <div className="mt-6 rounded-lg border bg-popover p-6 text-center text-muted-foreground">
          <p>{t("messages.noResults", "No properties match your search.")}</p>
          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("app:search", { detail: {} }));
              }
            }}
            className="mt-4 inline-flex items-center justify-center rounded-md border bg-background px-3 py-2 text-sm font-medium text-foreground hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            {t("actions.clearFilters", "Clear filters")}
          </button>
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {properties.map((p) => (
          <article
            key={p._id}
            className="group relative overflow-hidden rounded-xl bg-white border shadow-sm transition-all hover:shadow-md focus-within:shadow-md">
            <button
              type="button"
              onClick={() => onSelectProperty?.(p)}
              className="absolute inset-0 z-10 cursor-pointer"
              aria-label={`View details for ${p.title} in ${getAddressString(p)}`}
            />
            <div className="relative w-full overflow-hidden ">
              <div className="relative h-44 sm:h-48 md:h-52 w-full">
                <Image
                  src={getImageUrl(p)}
                  alt={p.mainImage?.alt || `${p.title} - ${getAddressString(p)}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  priority={false}
                />
              </div>

              <div className="absolute left-3 top-3 z-10 rounded-full bg-gold text-white backdrop-blur px-2.5 py-1 text-xs font-medium">
                {translateType(p.propertyType)}
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/60 to-transparent" />
            </div>

            <div className="p-4 sm:p-5">
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-lg sm:text-xl font-semibold text-foreground">
                  {formatPrice(p.price, p.currency)}
                </p>
              </div>

              <h3 className="mt-1 text-lg font-medium text-foreground min-w-0 truncate">
                {p.title}
              </h3>

              <div className="mt-1.5 flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground min-w-0">
                <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span className="truncate">{getAddressString(p)}</span>
              </div>

              <div className="mt-3 flex items-center gap-4 text-[13px] sm:text-sm text-foreground/90 font-semibold">
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
            </div>

            <div className="pointer-events-none absolute inset-0 rounded-xl ring-0 ring-transparent group-hover:ring-1 group-focus-within:ring-2 ring-ring/40 transition" />
          </article>
        ))}
      </div>
    </section>
  );
}

// Export both versions for easy switching
export { default as StaticFeaturedProperties } from './FeaturedProperties';
export { default as SanityFeaturedProperties } from './SanityFeaturedProperties';