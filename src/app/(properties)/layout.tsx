"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useT } from "@/lib/i18n";

const PROPERTY_PAGES = {
  "/apartments": {
    title: "Apartments in Greece",
    description: "Explore modern apartments across Greece.",
    breadcrumb: "Apartments",
  },
  "/maisonettes": {
    title: "Maisonettes in Greece",
    description: "Find stylish maisonettes for every lifestyle.",
    breadcrumb: "Maisonettes",
  },
  "/commercial": {
    title: "Commercial Properties in Greece",
    description:
      "Explore commercial real estate opportunities including offices, retail spaces, and warehouses.",
    breadcrumb: "Commercial",
  },
  "/land": {
    title: "Land in Greece",
    description: "Browse available land in Greece.",
    breadcrumb: "Land",
  },
  "/rent": {
    title: "Rental Services in Greece",
    description: "Browse available rental properties and services.",
    breadcrumb: "Rental Service",
  },
};

export default function PropertiesLayout({ children }: { children: React.ReactNode }) {
  const t = useT();
  const pathname = usePathname();
  const pageInfo = PROPERTY_PAGES[pathname as keyof typeof PROPERTY_PAGES];

  function toCamelCase(str: string): string {
    return str
      .toLowerCase()
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      )
      .replace(/\s+/g, "");
  }
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
            {t("breadcrumbs.home")}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">
            {t(`nav.${toCamelCase(pageInfo.breadcrumb)}`)}
          </span>
        </nav>
      </div>
      <section className="container mx-auto py-8">
        <div className="max-w-7xl">
          <div className="mb-8 text-center">
            <h1 className="text-5xl font-light text-foreground mb-4 hero-heading">
              {t(`${toCamelCase(pageInfo.breadcrumb)}.title`)}
            </h1>
            <p className="text-lg text-black/70 font-medium">
              {t(`${toCamelCase(pageInfo.breadcrumb)}.description`)}
            </p>
          </div>
        </div>
        {children}
      </section>
    </>
  );
}
