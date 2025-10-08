"use client";

import { useEffect, useMemo, useState } from "react";
import type { Currency } from "@/lib/currency";

type RatesResponse = {
  base: "eur";
  rates: Record<Currency, number>;
  updatedAt: string;
};

export function useRates() {
  const [data, setData] = useState<RatesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        // Frankfurter provides free, no-key FX rates with CORS enabled
        const res = await fetch(
          "https://api.frankfurter.app/latest?from=EUR&to=USD,GBP",
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error(`FX fetch failed: ${res.status}`);
        const json: { base: string; date: string; rates: { USD: number; GBP: number } } = await res.json();
        if (cancelled) return;
        setData({
          base: "eur",
          rates: {
            eur: 1,
            usd: json.rates?.USD ?? 1,
            gbp: json.rates?.GBP ?? 1,
          } as Record<Currency, number>,
          updatedAt: new Date().toISOString(),
        });
        setLoading(false);
      } catch (e: any) {
        if (cancelled) return;
        // Fallback snapshot (approximate) to ensure conversion works offline
        setData({
          base: "eur",
          rates: {
            eur: 1,
            usd: 1.08,
            gbp: 0.85,
          } as Record<Currency, number>,
          updatedAt: new Date().toISOString(),
        });
        setError(e?.message || "Failed to load rates");
        setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const convert = useMemo(() => {
    return (amountInEur: number, to: Currency) => {
      const rate = data?.rates?.[to] ?? 1;
      return amountInEur * rate;
    };
  }, [data]);

  return {
    rates: data?.rates ?? null,
    updatedAt: data?.updatedAt ?? null,
    loading,
    error,
    convert,
  };
}