"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
aimport { Bed, MapPin, Proportions, ShowerHead } from "lucide-react";
import clsx from "clsx";
import { useAppPrefs } from "@/lib/prefs-context";
import { useT } from "@/lib/i18n";
import { useRates } from "@/lib/hooks/use-rates";
import { useFeaturedProperties } from "@/lib/sanity/hooks";
import { PropertyQueryResult } from "@/lib/sanity/types";
import { getPropertyCardImageUrl, safeImageUrl } from "@/lib/sanity/image";

export type SanityFeaturedPropertiesProps = {
  className?: string;
  title?: string;
  subtitle?: string;
  limit?: number;
  viewAllHref?: string;
  onSelectProperty?: (property: PropertyQueryResult) => void;
  fallbackToStatic?: boolean; // Fallback to static data if Sanity fails
};

// Fallback static data (properly typed)
const fallbackProperties: PropertyQueryResult[] = [
  // ... unchanged mock data ...
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
  // ... file content unchanged ...
}

// Do not self-import this file. Export only the default.
// If you need the static version, import from './FeaturedProperties' where used.
export {};