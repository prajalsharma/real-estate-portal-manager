"use client";

import React, { useEffect, useState } from "react";
import PropertyDetailsModal from "@/components/PropertyDetailsModal";
import { PropertyQueryResult } from "@/lib/sanity/types";
import SanityAllProperties from "./SanityAllProperties";
import { Button } from "./ui/button";

interface SearchEventDetail {
  filters: any;
  results: PropertyQueryResult[];
  total: number;
}

export default function PropertyExplorer() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<PropertyQueryResult | null>(null);
  const [searchResults, setSearchResults] = useState<PropertyQueryResult[] | null>(null);
  const [searchTotal, setSearchTotal] = useState<number>(0);
  const [searchFilters, setSearchFilters] = useState<any>(null);

  useEffect(() => {
    const handleSearch = (event: Event) => {
      const customEvent = event as CustomEvent<SearchEventDetail>;
      const { results, total, filters } = customEvent.detail;
      
      setSearchResults(results || []);
      setSearchTotal(total || 0);
      setSearchFilters(filters || null);
      
      // Scroll to results section
      setTimeout(() => {
        document.getElementById('property-results')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    };

    window.addEventListener('app:search', handleSearch);
    
    return () => {
      window.removeEventListener('app:search', handleSearch);
    };
  }, []);

  const isSearchActive = searchResults !== null;

  const handleClearSearch = () => {
    setSearchResults(null);
    setSearchTotal(0);
    setSearchFilters(null);
  };

  return (
    <div id="property-results" className="scroll-mt-20">
      {isSearchActive && (
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              {searchFilters && Object.keys(searchFilters).length > 0 && (
                <span>
                  Filters: {' '}
                  {searchFilters.location && `Location: ${searchFilters.location}`}
                  {searchFilters.propertyType && `, Type: ${searchFilters.propertyType}`}
                  {searchFilters.beds && `, Beds: ${searchFilters.beds}`}
                  {searchFilters.minPrice && `, Min: €${searchFilters.minPrice.toLocaleString()}`}
                  {searchFilters.maxPrice && `, Max: €${searchFilters.maxPrice.toLocaleString()}`}
                </span>
              )}
            </p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleClearSearch}
            >
              View All Properties
            </Button>
          </div>
        </div>
      )}
      <SanityAllProperties
        title={isSearchActive ? "Search Results" : "All Properties"}
        subtitle={
          isSearchActive
          ? `Found ${searchTotal} ${searchTotal === 1 ? 'property' : 'properties'} matching your criteria`
          : "Browse our complete collection of properties"
        }
        limit={isSearchActive ? searchResults.length : 12}
        properties={isSearchActive ? searchResults : undefined}
      />
        
      
      {isSearchActive && searchResults.length === 0 && (
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="max-w-md mx-auto">
            <h3 className="text-2xl font-semibold mb-2">No properties found</h3>
            <p className="text-muted-foreground mb-4">
              We couldn't find any properties matching your search criteria.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Try adjusting your filters or browse all available properties.
            </p>
            <Button onClick={handleClearSearch}>
              View All Properties
            </Button>
          </div>
        </div>
      )}

      {/* <PropertyDetailsModal
        open={open}
        onOpenChange={setOpen}
        property={selected as PropertyQueryResult}
        gallery={selected?.images?.map((img) => img.asset._ref) || []}
      /> */}
    </div>
  );
}
