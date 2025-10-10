"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type SupportedCurrency = "usd" | "eur" | "gbp";
export type SupportedLanguage = "en" | "el" | "sr" | "ru" | "bg";

export type AppPrefs = {
  currency: SupportedCurrency;
  language: SupportedLanguage;
  setCurrency: (c: SupportedCurrency) => void;
  setLanguage: (l: SupportedLanguage) => void;
};

const PrefsContext = createContext<AppPrefs | null>(null);

function detectLanguage(): SupportedLanguage {
  if (typeof window === "undefined") return "en";
  const nav = navigator.language.toLowerCase();
  if (nav.startsWith("el")) return "el";
  if (nav.startsWith("sr")) return "sr";
  if (nav.startsWith("ru")) return "ru";
  if (nav.startsWith("bg")) return "bg";
  return "en";
}

function detectCurrency(): SupportedCurrency {
  if (typeof window === "undefined") return "eur";
  const locale = Intl.DateTimeFormat().resolvedOptions().locale.toLowerCase();
  if (locale.includes("us") || locale.includes("en-us")) return "usd";
  if (locale.includes("gb") || locale.includes("en-gb")) return "gbp";
  return "eur";
}

export function AppPreferencesProvider({
  children,
  initialCurrency = "eur",
  initialLanguage = "en",
}: {
  children: React.ReactNode;
  initialCurrency?: SupportedCurrency;
  initialLanguage?: SupportedLanguage;
}) {
  const [currency, setCurrency] = useState<SupportedCurrency>(() => {
    if (typeof window === "undefined") return initialCurrency;
    const saved = localStorage.getItem("app_prefs");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.currency) return parsed.currency;
      } catch {}
    }
    return detectCurrency();
  });
  const [language, setLanguage] = useState<SupportedLanguage>(() => {
    if (typeof window === "undefined") return initialLanguage;
    const saved = localStorage.getItem("app_prefs");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.language) return parsed.language;
      } catch {}
    }
    return detectLanguage();
  });

  // hydrate from localStorage only on client; SSR always uses initialLanguage/initialCurrency
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = localStorage.getItem("app_prefs");
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<AppPrefs>;
        if (parsed.currency) setCurrency(parsed.currency);
        if (parsed.language) setLanguage(parsed.language);
      }
    } catch {}
    // No fallback to auto-detect on client; initial value is already set synchronously
  }, []);

  // persist
  useEffect(() => {
    try {
      localStorage.setItem("app_prefs", JSON.stringify({ currency, language }));
    } catch {}
  }, [currency, language]);

  const value = useMemo(
    () => ({ currency, language, setCurrency, setLanguage }),
    [currency, language]
  );

  return <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>;
}

export function useAppPrefs() {
  const ctx = useContext(PrefsContext);
  if (!ctx) {
    throw new Error("useAppPrefs must be used within AppPreferencesProvider");
  }
  return ctx;
}
