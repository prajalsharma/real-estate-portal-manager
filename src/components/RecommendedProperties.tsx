"use client";

import * as React from "react";
import { Bed, Proportions, MapPin, ShowerHead } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useT } from "@/lib/i18n";
import { useAppPrefs } from "@/lib/prefs-context";
import { useRates } from "@/lib/hooks/use-rates";
import { useFeaturedProperties } from "@/lib/sanity/hooks";
import { safeImageUrl } from "@/lib/sanity/image";
import PropertyDetailsModal from "./PropertyDetailsModal";
import { formatter } from "@/lib/priceFormatter";
import Link from "next/link";

type Property = {
  id: string;
  title: string;
  price: string;
  priceInEur?: number; // Optional: numeric EUR value for conversion
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  address: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  };
  imageUrl: string;
  slug?: {
    current: string;
  };
  imageAlt?: string;
  tag?: string;
  interior?: boolean;
};

export interface RecommendedPropertiesProps {
  title?: string;
  viewAllHref?: string;
  properties?: Property[];
  className?: string;
}

export default function RecommendedProperties({
  title = "You might be interested in",
  properties: propProperties,
  className,
}: RecommendedPropertiesProps) {
  // Fetch featured properties from Sanity
  const { properties: sanityProperties, loading: sanityLoading, error } = useFeaturedProperties(6);

  // i18n + currency prefs
  const t = useT();
  const { currency, language } = useAppPrefs();
  const { convert, loading: ratesLoading } = useRates();

  const [open, setOpen] = React.useState(false);
  const [selectedProperty, setSelectedProperty] = React.useState<Property | null>(null);

  // Use prop properties if provided, otherwise use Sanity featured properties
  const properties = React.useMemo(() => {
    if (propProperties && propProperties.length > 0) {
      return propProperties;
    }

    // Map Sanity properties to component format
    // Note: Price conversion happens in render (lines 188-192) for real-time updates
    return sanityProperties.map((p) => ({
      id: p._id,
      title: p.title,
      slug: p.slug,
      price: `€${p.price.toLocaleString()}`, // Keep as EUR string, will be converted in render
      priceInEur: p.price, // Store numeric value for conversion
      bedrooms: p.bedrooms,
      bathrooms: p.bathrooms,
      sqft: p.sqft,
      address: {
        street: p.address.street,
        city: p.address.city,
        region: p.address.region,
        postalCode: p.address.postalCode,
        country: p.address.country,
      },
      imageUrl:
        safeImageUrl(p.mainImage) ||
        "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=400&h=300&q=80",
      imageAlt: p.mainImage?.alt || p.title,
      tag: p.status,
      interior: false,
    }));
  }, [propProperties, sanityProperties]);

  // Loading state
  if (sanityLoading && !propProperties) {
    return (
      <section
        className={["w-full bg-background", "py-6 sm:py-8", className ?? ""].join(" ").trim()}>
        <div className="w-full max-w-full">
          <div className="mb-5 sm:mb-6">
            <div className="h-8 bg-muted rounded w-64 mb-2 animate-pulse"></div>
            <div className="h-4 bg-muted rounded w-96 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-lg border bg-white overflow-hidden">
                <div className="h-80 bg-muted animate-pulse"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-muted rounded animate-pulse"></div>
                  <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
                  <div className="flex gap-4">
                    <div className="h-3 bg-muted rounded w-12 animate-pulse"></div>
                    <div className="h-3 bg-muted rounded w-12 animate-pulse"></div>
                    <div className="h-3 bg-muted rounded w-12 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error && !propProperties) {
    return (
      <section
        className={["w-full bg-background", "py-6 sm:py-8", className ?? ""].join(" ").trim()}>
        <div className="w-full max-w-full">
          <div className="mb-5 sm:mb-6">
            <h2 className="font-semibold text-3xl text-foreground tracking-tight">
              {t("recommended.title", title)}
            </h2>
          </div>
          <div className="rounded-lg border border-destructive bg-destructive/10 p-6 text-center text-destructive">
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  // Empty state
  if (properties.length === 0) {
    return (
      <section
        className={["w-full bg-background", "py-6 sm:py-8", className ?? ""].join(" ").trim()}>
        <div className="w-full max-w-full">
          <div className="mb-5 sm:mb-6">
            <h2 className="font-semibold text-3xl text-foreground tracking-tight">
              {t("recommended.title", title)}
            </h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="recommended-heading"
      className={["w-full bg-background", "py-6 sm:py-8", className ?? ""].join(" ").trim()}>
      <div className="w-full max-w-full">
        <div className="mb-5 sm:mb-6 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <h2
              id="recommended-heading"
              className="font-semibold text-3xl text-foreground tracking-tight">
              {t("recommended.title", title)}
            </h2>
            <p className="mt-1 text-sm sm:text-base text-muted-foreground">
              {t("recommended.subtitle", "Curated homes and apartments picked for you")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {properties.map((p) => {
            // Get numeric price in EUR (from stored value or parse from string)
            const priceInEur = (p as any).priceInEur || Number(p.price?.replace(/[^\d]/g, "")) || 0;

            // Convert and format price based on selected currency
            const convertedPrice =
              typeof convert === "function" && priceInEur > 0
                ? convert(priceInEur, currency)
                : priceInEur;
            const priceDisplay =
              !ratesLoading && typeof convert === "function" && priceInEur > 0
                ? formatter(language, currency)
                    .format(convertedPrice)
                    .replace(/(\p{Sc})\s?/u, "$1\u00A0")
                : p.price; // Fallback to original price string
            return (
              <article
                key={p.id}
                className="min-w-0 bg-card min-h-94 shadow-sm transition-shadow hover:shadow-md rounded-lg">
                <Card className="group relative overflow-hidden rounded-lg bg-card shadow-none border-none py-0 min-h-94 flex flex-col">
                  <div className="relative w-full h-80 overflow-hidden">
                    <img
                      src={p.imageUrl}
                      alt={p.imageAlt || p.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] rounded-t-lg"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent group-hover:bg-none transition-all" />
                    {p.tag ? (
                      <div className="absolute left-3 top-3">
                        <Badge
                          className="rounded-md bg-gold/90 text-white backdrop-blur-sm"
                          variant="secondary">
                          {p.tag}
                        </Badge>
                      </div>
                    ) : null}
                  </div>

                  <div className="p-3 sm:p-4">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="min-w-0 truncate font-semibold text-base sm:text-lg text-foreground">
                        {p.title}
                      </h3>
                      <span className="shrink-0 rounded-md bg-secondary px-2 py-1 text-xs font-medium text-foreground">
                        {priceDisplay}
                      </span>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Bed className="h-4 w-4 text-gold" aria-hidden="true" />
                        <span className="font-medium">{p.bedrooms}</span>
                        <span className="text-muted-foreground">{t("labels.bed")}</span>
                      </div>
                      <div className="h-4 w-px bg-border" aria-hidden="true" />
                      <div className="flex items-center gap-1.5">
                        <ShowerHead className="h-4 w-4 text-gold" aria-hidden="true" />
                        <span className="font-medium">{p.bathrooms}</span>
                        <span className="text-muted-foreground">{t("labels.bath")}</span>
                      </div>
                      <div className="h-4 w-px bg-border" aria-hidden="true" />
                      <div className="flex items-center gap-1.5">
                        <Proportions className="h-4 w-4 text-gold" aria-hidden="true" />
                        <span className="font-medium">{p.sqft}</span>
                        <span className="text-muted-foreground">{t("labels.area")}</span>
                      </div>
                    </div>

                    <div className="mt-2 flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 text-foreground/70" aria-hidden="true" />
                      <p className="min-w-0 truncate">
                        {p.address.city}, {p.address.region}
                      </p>
                    </div>

                    <div className="mt-3 flex items-center justify-center py-2">
                      <Link
                        href={`/${p.slug}`}
                        aria-label={`View ${p.title}`}
                        className="inline-flex justify-center w-full bg-gold/90 text-white py-2 rounded shadow font-semibold hover:bg-white transition cursor-pointer hover:text-gold border border-gold hover:border-gold focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2">
                        {t("actions.viewDetails")}
                      </Link>
                    </div>
                  </div>

                  <span className="sr-only">{p.interior ? "Interior view" : "Exterior view"}</span>
                </Card>
              </article>
            );
          })}

          <PropertyDetailsModal
            gallery={selectedProperty?.imageUrl ? [selectedProperty.imageUrl] : []}
            open={open}
            onOpenChange={setOpen}
            property={selectedProperty as Property}
          />
        </div>
      </div>
    </section>
  );
}
