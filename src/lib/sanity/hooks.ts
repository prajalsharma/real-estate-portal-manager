"use client";

import { useEffect, useState, useCallback } from "react";
import {
  PropertyQueryResult,
  SanityAgent,
  BlogQueryResult,
  PropertyFilters,
  PropertiesResponse,
  AgentsResponse,
  BlogResponse,
} from "./types";
import { getFeaturedProperties, getAllProperties, getFeaturedAgents } from "./queries";

// (hooks unchanged)
// ... all hook content as before ...

export function useFeaturedProperties(limit: number = 4) {
  const [properties, setProperties] = useState<PropertyQueryResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getFeaturedProperties(limit);
      setProperties(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch properties");
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { properties, loading, error, refetch };
}

// ... rest of hooks unchanged ...
