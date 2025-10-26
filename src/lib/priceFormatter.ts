import { useMemo } from "react";

export function formatter(language: string, currency: string) {
  return new Intl.NumberFormat(language, {
    style: "currency",
    currency: (currency as any).toUpperCase(),
    maximumFractionDigits: 0,
  });
}
