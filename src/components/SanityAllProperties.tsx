"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Bed, MapPin, Proportions, ShowerHead } from "lucide-react";
import clsx from "clsx";
import { useAppPrefs } from "@/lib/prefs-context";
import { useT } from "@/lib/i18n";
import { useRates } from "@/lib/hooks/use-rates";
import { useAllProperties } from "@/lib/sanity/hooks";
import { PropertyQueryResult } from "@/lib/sanity/types";
import { safeImageUrl } from "@/lib/sanity/image";
import { formatter } from "@/lib/priceFormatter";

export type SanityAllPropertiesProps = {
  className?: string;
  title?: string;
  subtitle?: string;
  limit?: number;
  properties?: PropertyQueryResult[];
  onSelectProperty?: (property: PropertyQueryResult) => void;
};

export default function SanityAllProperties({
  className,
  title = "Latest in your area",
  subtitle = "Curated homes across Greece — fresh listings picked for you",
  limit = 12,
  properties: propProperties = [],
  onSelectProperty,
}: SanityAllPropertiesProps) {
  const t = useT();
  const { currency, language } = useAppPrefs();
  const { convert, loading: ratesLoading } = useRates();

  const {
    properties: sanityProperties,
    total,
    hasMore,
    loading,
    error,
  } = useAllProperties(undefined, 1, limit);

  // Use properties from props if provided, otherwise use fetched properties
  const properties = propProperties.length > 0 ? propProperties : sanityProperties;

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
            {t("featured.title", title)}
          </h2>
          {subtitle ? (
            <p className="mt-1 text-sm sm:text-base text-muted-foreground">
              {t("featured.subtitle", subtitle)}
            </p>
          ) : null}
        </div>
      </div>

      {error && (
        <div className="mt-6 rounded-lg border border-destructive bg-destructive/10 p-6 text-center text-destructive">
          <p>{error}</p>
        </div>
      )}

      {properties.length === 0 && !loading && !error && (
        <div className="mt-6 rounded-lg border bg-popover p-6 text-center text-muted-foreground">
          <p>
            {t("messages.noResults", "No properties found. Add some properties in the Studio!")}
          </p>
          <Link
            href="/studio"
            className="mt-4 inline-flex items-center justify-center rounded-md bg-gold text-white px-4 py-2 text-sm font-medium hover:bg-gold/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Open Sanity Studio
          </Link>
        </div>
      )}

      {total > 0 && !loading && (
        <p className="mt-2 text-sm text-muted-foreground">
          Showing {properties.length} of {total} properties
        </p>
      )}
      <div className="w-full">
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
                    href={`/${p.slug}`}
                    className="inline-flex justify-center  w-full bg-gold/90 text-white py-2 rounded shadow font-semibold hover:bg-white transition cursor-pointer hover:text-gold border border-gold hover:border-gold focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2">
                    {t("actions.viewDetails")}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
