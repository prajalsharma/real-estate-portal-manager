import { useMemo } from "react";

// Map language codes to proper locale strings for currency formatting
function getLocaleForCurrency(language: string, currency: string): string {
  const currencyUpper = currency.toUpperCase();
  
  // Map language to locale with currency-aware formatting
  const localeMap: Record<string, string> = {
    "en": "en-US",
    "el": "el-GR",
    "sr": "sr-RS",
    "ru": "ru-RU",
    "bg": "bg-BG",
  };
  
  // Get base locale
  const baseLocale = localeMap[language] || "en-US";
  
  // For specific currencies, use locale that matches currency
  // USD -> en-US, GBP -> en-GB, EUR -> defaults based on language
  if (currencyUpper === "USD") {
    return "en-US";
  }
  if (currencyUpper === "GBP") {
    return "en-GB";
  }
  if (currencyUpper === "EUR") {
    // For EUR, use language-specific locale
    return baseLocale;
  }
  
  return baseLocale;
}

export function formatter(language: string, currency: string) {
  const locale = getLocaleForCurrency(language, currency);
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency.toUpperCase(),
    maximumFractionDigits: 0,
  });
}
