"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Bed, MapPin, Proportions, ShowerHead } from "lucide-react";
import clsx from "clsx";
import { useAppPrefs } from "@/lib/prefs-context";
import { useT } from "@/lib/i18n";
import { useRates } from "@/lib/hooks/use-rates";

type Property = {
  id: string;
  title: string;
  address: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  type: "House" | "Apartment" | "Condo" | string;
  imageUrl: string;
  images?: string[];
};

export type FeaturedPropertiesProps = {
  className?: string;
  title?: string;
  subtitle?: string;
  properties?: Property[];
  viewAllHref?: string;
  onSelectProperty?: (property: Property) => void;
};

const defaultProperties: Property[] = [
  {
    id: "p1",
    title: "Sunlit Maisonette with Sea Views",
    address: "Kassandra, Halkidiki",
    price: 385000,
    beds: 3,
    baths: 2,
    sqft: 145,
    type: "House",
    imageUrl:
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1600&q=80",
    images: [
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    id: "p2",
    title: "Modern Apartment Near the Marina",
    address: "Nea Moudania, Halkidiki",
    price: 218000,
    beds: 2,
    baths: 1,
    sqft: 92,
    type: "Apartment",
    imageUrl:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80",
    images: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1465572084947-7fcbf7d48f4a?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1505691723518-36a5ac3b2a59?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    id: "p3",
    title: "Cozy Condo by Pine Forest",
    address: "Sithonia, Halkidiki",
    price: 265000,
    beds: 2,
    baths: 2,
    sqft: 105,
    type: "Condo",
    imageUrl:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1600&q=80",
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1465572084947-7fcbf7d48f4a?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    id: "p5",
    title: "Bright Top-Floor Apartment",
    address: "Polygyros, Halkidiki",
    price: 196000,
    beds: 2,
    baths: 1,
    sqft: 88,
    type: "Apartment",
    imageUrl:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80",
    images: [
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1600&q=80",
    ],
  },
];

export const FEATURED_DEFAULTS = defaultProperties;

export default function FeaturedProperties({
  className,
  title = "Latest in your area",
  subtitle = "Curated homes across Halkidiki — fresh listings picked for you",
  properties = defaultProperties,
  viewAllHref,
  onSelectProperty,
}: FeaturedPropertiesProps) {
  const t = useT();
  const { currency, language } = useAppPrefs();
  const { convert } = useRates();

  const formatPrice = React.useCallback(
    (eur: number) => {
      const amount = convert ? convert(eur, currency) : eur;
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

      {properties.length === 0 && (
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
            key={p.id}
            className="group relative overflow-hidden rounded-xl bg-white border shadow-sm transition-all hover:shadow-md focus-within:shadow-md">
            <button
              type="button"
              onClick={() => onSelectProperty?.(p)}
              className="absolute inset-0 z-10 cursor-pointer"
              aria-label={`View details for ${p.title} in ${p.address}`}
            />
            <div className="relative w-full overflow-hidden ">
              <div className="relative h-44 sm:h-48 md:h-52 w-full">
                <Image
                  src={(p.images && p.images[0]) || p.imageUrl}
                  alt={`${p.title} - ${p.address}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  priority={false}
                />
              </div>

              <div className="absolute left-3 top-3 z-10 rounded-full bg-gold text-white backdrop-blur px-2.5 py-1 text-xs font-medium">
                {translateType(p.type)}
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/60 to-transparent" />
            </div>

            <div className="p-4 sm:p-5">
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-lg sm:text-xl font-semibold text-foreground">
                  {formatPrice(p.price)}
                </p>
              </div>

              <h3 className="mt-1 text-lg font-medium text-foreground min-w-0 truncate">
                {p.title}
              </h3>

              <div className="mt-1.5 flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground min-w-0">
                <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span className="truncate">{p.address}</span>
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
