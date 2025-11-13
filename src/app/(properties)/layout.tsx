"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useT } from "@/lib/i18n";

const PROPERTY_PAGES = {
  "/Apartments": {
    titleKey: "pages.condos.title",
    titleFallback: "Apartments",
    locationTitleKey: "pages.condos.locationTitle",
    locationTitleFallback: "Apartments in Greece",
    descriptionKey: "pages.condos.description",
    descriptionFallback: "Explore modern acretes and seaside Apartments across Greece.",
    breadcrumbKey: "nav.condos",
    breadcrumbFallback: "Apartments",
  },
  "/houses": {
    titleKey: "pages.houses.title",
    titleFallback: "Houses",
    locationTitleKey: "pages.houses.locationTitle",
    locationTitleFallback: "Houses in Greece",
    descriptionKey: "pages.houses.description",
    descriptionFallback: "Find your dream home from our collection of beautiful houses and villas.",
    breadcrumbKey: "nav.houses",
    breadcrumbFallback: "Houses",
  },
  "/commercial": {
    titleKey: "pages.commercial.title",
    titleFallback: "Commercial Properties",
    locationTitleKey: "pages.commercial.locationTitle",
    locationTitleFallback: "Commercial Properties in Greece",
    descriptionKey: "pages.commercial.description",
    descriptionFallback:
      "Explore commercial real estate opportunities including offices, retail spaces, and warehouses.",
    breadcrumbKey: "nav.commercial",
    breadcrumbFallback: "Commercial",
  },  "/land": {
    titleKey: "pages.rent.title",
    titleFallback: "Lands ",
    locationTitleKey: "pages.rent.locationTitle",
    locationTitleFallback: "Lands in Greece",
    descriptionKey: "pages.rent.description",
    descriptionFallback:
      "Browse available Lands in Greece",
    breadcrumbKey: "nav.rent",
    breadcrumbFallback: "Land",},
  "/rent": {
    titleKey: "pages.rent.title",
    titleFallback: "Rental Properties",
    locationTitleKey: "pages.rent.locationTitle",
    locationTitleFallback: "Rental Properties in Greece",
    descriptionKey: "pages.rent.description",
    descriptionFallback:
      "Browse available rental properties including apartments, houses, and vacation rentals.",
    breadcrumbKey: "nav.rent",
    breadcrumbFallback: "Rent",
  },
};

export default function PropertiesLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const t = useT();

  const pageInfo = PROPERTY_PAGES[pathname as keyof typeof PROPERTY_PAGES];

  if (!pageInfo) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav
          className="flex items-center space-x-1 text-sm text-muted-foreground mb-6"
          aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground transition-colors">
            {t("nav.home", "Home")}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">
            {t(pageInfo.breadcrumbKey, pageInfo.breadcrumbFallback)}
          </span>
        </nav>
      </div>
      <section className="container mx-auto py-8">
        <div className="max-w-7xl">
          <div className="mb-8 text-center">
            <h1 className="text-5xl font-light text-foreground mb-4 hero-heading">
              {t(pageInfo.locationTitleKey, pageInfo.locationTitleFallback)}
            </h1>
            <p className="text-lg text-black/70 font-medium">
              {t(pageInfo.descriptionKey, pageInfo.descriptionFallback)}
            </p>
          </div>
        </div>
        {children}
      </section>
    </>
  );
}
