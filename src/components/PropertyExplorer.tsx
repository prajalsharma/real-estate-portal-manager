"use client";

import React, { useEffect, useState } from "react";
import { PropertyQueryResult } from "@/lib/sanity/types";
import { useAllProperties } from "@/lib/sanity/hooks";
import { useT } from "@/lib/i18n";
import SanityAllProperties from "./SanityAllProperties";

interface SearchEventDetail {
  filters: any;
  results: PropertyQueryResult[];
  total: number;
}

export default function PropertyExplorer() {
  const t = useT();
  const [searchResults, setSearchResults] = useState<PropertyQueryResult[] | null>(null);
  const [searchTotal, setSearchTotal] = useState<number>(0);
  const [searchFilters, setSearchFilters] = useState<any>(null);

  const { properties: allProperties, loading, error } = useAllProperties(undefined, 1, 30);

  useEffect(() => {
    const handleSearch = (event: Event) => {
      const customEvent = event as CustomEvent<SearchEventDetail>;
      const { results, total, filters } = customEvent.detail;

      if (!filters) {
        setSearchResults(null);
        setSearchTotal(0);
        setSearchFilters(null);
        return;
      }

      setSearchResults(results || []);
      setSearchTotal(total || 0);
      setSearchFilters(filters || null);

      // Scroll to results section
      setTimeout(() => {
        document.getElementById("property-results")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    };

    window.addEventListener("app:search", handleSearch);

    return () => {
      window.removeEventListener("app:search", handleSearch);
    };
  }, []);

  const isSearchActive = searchResults !== null;

  const propertyWord =
    searchTotal === 1 ? t("explorer.property", "property") : t("explorer.properties", "properties");

  return (
    <div id="property-results" className="scroll-mt-20">
      <SanityAllProperties
        title={
          isSearchActive
            ? t("explorer.searchResults.title", "Search Results")
            : t("featured.title", "Latest in your area")
        }
        subtitle={
          isSearchActive
            ? t(
                "explorer.searchResults.subtitle",
                `Found ${searchTotal} ${propertyWord} matching your criteria`
              )
                .replace("{count}", String(searchTotal))
                .replace("{propertyWord}", propertyWord)
            : t("featured.subtitle", "Curated homes across Greece — fresh listings picked for you")
        }
        properties={isSearchActive ? searchResults : allProperties}
        loading={loading}
        error={error}
      />
    </div>
  );
}
