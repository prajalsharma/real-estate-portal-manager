"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import type { Currency } from "@/lib/currency";

type RatesResponse = {
  base: "eur";
  rates: Record<Currency, number>;
  updatedAt: string;
  cached?: boolean;
  responseTime?: number;
};

// Fallback rates for offline/error scenarios
const FALLBACK_RATES: Record<Currency, number> = {
  eur: 1,
  usd: 1.08,
  gbp: 0.85,
};

export function useRates() {
  const [data, setData] = useState<RatesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch rates from our production API
  const fetchRates = useCallback(async () => {
    try {
      // Call our internal API route which uses FCA Live API
      const res = await fetch("/api/currency", {
        // Use cache but allow revalidation
        cache: "force-cache",
        next: { revalidate: 300 }, // Revalidate every 5 minutes
      });

      if (!res.ok) {
        throw new Error(`API fetch failed: ${res.status}`);
      }

      const json: RatesResponse = await res.json();

      // Validate response structure
      if (!json.rates || typeof json.rates !== "object") {
        throw new Error("Invalid API response format");
      }

      // Ensure all required currencies are present
      const rates: Record<Currency, number> = {
        eur: json.rates.eur ?? 1,
        usd: json.rates.usd ?? FALLBACK_RATES.usd,
        gbp: json.rates.gbp ?? FALLBACK_RATES.gbp,
      };

      return {
        base: "eur" as const,
        rates,
        updatedAt: json.updatedAt || new Date().toISOString(),
        cached: json.cached || false,
        responseTime: json.responseTime,
      };
    } catch (e: any) {
      console.error("Error fetching exchange rates:", e);
      // Return fallback data on error
      return {
        base: "eur" as const,
        rates: FALLBACK_RATES,
        updatedAt: new Date().toISOString(),
        cached: false,
        error: e?.message || "Failed to load rates",
      };
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      const result = await fetchRates();

      if (cancelled) return;

      setData(result);
      if (result.error) {
        setError(result.error);
      }
      setLoading(false);
    }

    load();

    // Refresh rates every 5 minutes (optional, since we have caching)
    const refreshInterval = setInterval(() => {
      if (!cancelled) {
        load();
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => {
      cancelled = true;
      clearInterval(refreshInterval);
    };
  }, [fetchRates]);

  // Conversion function that uses current rates
  const convert = useMemo(() => {
    return (amountInEur: number, to: Currency) => {
      if (!data?.rates) {
        // Use fallback if data not loaded yet
        return amountInEur * (FALLBACK_RATES[to] ?? 1);
      }
      const rate = data.rates[to] ?? 1;
      return amountInEur * rate;
    };
  }, [data]);

  // Manual refresh function (can be called when currency changes)
  const refresh = useCallback(async () => {
    setLoading(true);
    const result = await fetchRates();
    setData(result);
    if (result.error) {
      setError(result.error);
    } else {
      setError(null);
    }
    setLoading(false);
  }, [fetchRates]);

  return {
    rates: data?.rates ?? null,
    updatedAt: data?.updatedAt ?? null,
    loading,
    error,
    convert,
    refresh, // Expose refresh function for manual updates
    cached: data?.cached ?? false,
  };
}