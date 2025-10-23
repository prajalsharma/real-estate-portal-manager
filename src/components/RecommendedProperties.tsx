"use client";

import * as React from "react";
import Link from "next/link";
import { Bed, LampFloor, Proportions, MapPin, ShowerHead } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n";
import { useAppPrefs } from "@/lib/prefs-context";
import { useRates } from "@/lib/hooks/use-rates";

type Property = {
  id: string;
  title: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  address: string;
  imageUrl: string;
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

const defaultProperties: Property[] = [
  {
    id: "p1",
    title: "Modern Apartment in Kolonaki",
    price: "€465,000",
    beds: 2,
    baths: 2,
    sqft: 104,
    address: "Iraklitou 18, Kolonaki, Athens",
    imageUrl:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1600&auto=format&fit=crop",
    tag: "For Sale",
    interior: true,
  },
  {
    id: "p2",
    title: "Seaside Villa with Terrace",
    price: "€1,250,000",
    beds: 4,
    baths: 3,
    sqft: 280,
    address: "Leof. Posidonos 214, Glyfada",
    imageUrl:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80",
    tag: "Featured",
  },
  {
    id: "p3",
    title: "Minimal Loft in Psyrri",
    price: "€320,000",
    beds: 1,
    baths: 1,
    sqft: 72,
    address: "Sarri 9, Psyrri, Athens",
    imageUrl:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop",
    tag: "New",
    interior: true,
  },
  {
    id: "p4",
    title: "Penthouse Overlooking Acropolis",
    price: "€980,000",
    beds: 3,
    baths: 2,
    sqft: 156,
    address: "Mitropoleos 12, Plaka, Athens",
    imageUrl:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1600&auto=format&fit=crop",
    tag: "For Sale",
  },
  {
    id: "p5",
    title: "Cozy Maisonette in Kifisia",
    price: "€690,000",
    beds: 3,
    baths: 2,
    sqft: 140,
    address: "Kifisias Ave 122, Kifisia",
    imageUrl:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80",
    tag: "Open House",
  },
  {
    id: "p6",
    title: "Contemporary Interior in Marousi",
    price: "€410,000",
    beds: 2,
    baths: 1,
    sqft: 96,
    address: "Dekeleias 45, Marousi",
    imageUrl:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80",
    tag: "Price Drop",
    interior: true,
  },
];

function getCardAspect(index: number) {
  // Create intentional variety to mimic a tasteful masonry rhythm.
  // Map indices to aspect ratios and row spans with responsive refinement.
  // We avoid fixed heights to maintain responsiveness.
  const patterns = [
    { aspect: "aspect-[4/3]", md: "aspect-[4/3]" },
    { aspect: "aspect-[3/4]", md: "aspect-[3/4]" },
    { aspect: "aspect-square", md: "aspect-[5/4]" },
    { aspect: "aspect-[16/11]", md: "aspect-[16/10]" },
    { aspect: "aspect-[5/6]", md: "aspect-[4/5]" },
    { aspect: "aspect-[4/3]", md: "aspect-[16/11]" },
  ];
  return patterns[index % patterns.length];
}

export default function RecommendedProperties({
  title = "You might be interested in",
  properties = defaultProperties,
  className,
}: RecommendedPropertiesProps) {
  // i18n + currency prefs
  const t = useT();
  const { currency, language } = useAppPrefs();
  const { convert, loading: ratesLoading } = useRates();
  const formatter = React.useMemo(
    () =>
      new Intl.NumberFormat(language, {
        style: "currency",
        currency: (currency as any).toUpperCase(),
        maximumFractionDigits: 0,
      }),
    [language, currency]
  );

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
              {t("recommended.subtitle", " Curated homes and apartments picked for you")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {properties.map((p) => {
            // Derive EUR numeric price from provided string (fallback to original if parsing fails)
            const eur = Number(p.price?.replace(/[^\d]/g, "")) || 0;
            const priceDisplay =
              !ratesLoading && eur > 0
                ? formatter.format(convert(eur as number, currency as any))
                : p.price;
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

                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-muted-foreground font-semibold">
                      <div className="flex items-center gap-1.5">
                        <Bed className="h-4 w-4 text-gold" aria-hidden="true" />
                        <span className="min-w-0">
                          {t("labels.bed")} {p.beds}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <ShowerHead className="h-4 w-4 text-gold" aria-hidden="true" />
                        <span className="min-w-0">
                          {t("labels.bath")} {p.baths}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Proportions className="h-4 w-4 text-gold" aria-hidden="true" />
                        <span className="min-w-0">
                          {p.sqft} {t("labels.area")}
                        </span>
                      </div>
                    </div>

                    <div className="mt-2 flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 text-foreground/70" aria-hidden="true" />
                      <p className="min-w-0 truncate" title={p.address}>
                        {p.address}
                      </p>
                    </div>

                    <div className="mt-3 flex items-center justify-center py-2">
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="h-8 rounded-md border-border text-foreground hover:bg-secondary">
                        <Link
                          href={`/properties/${encodeURIComponent(p.id)}`}
                          aria-label={`View ${p.title}`}>
                          View details
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <span className="sr-only">{p.interior ? "Interior view" : "Exterior view"}</span>
                </Card>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
