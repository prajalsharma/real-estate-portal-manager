export type Currency = "usd" | "eur" | "gbp";
export type Lang = "en" | "el" | "sr" | "ru" | "bg";

const EUR_RATES: Record<Currency, number> = {
  eur: 1,
  usd: 1.08, // simple static rates; replace with live API later
  gbp: 0.85,
};

export function convertFromEUR(amountEur: number, to: Currency): number {
  const rate = EUR_RATES[to] ?? 1;
  return amountEur * rate;
}

export function localeFor(lang: Lang): string {
  switch (lang) {
    case "el":
      return "el-GR";
    case "sr":
      return "sr-RS";
    case "ru":
      return "ru-RU";
    case "bg":
      return "bg-BG";
    default:
      return "en-US";
  }
}

export function currencyCode(c: Currency): string {
  switch (c) {
    case "usd":
      return "USD";
    case "gbp":
      return "GBP";
    default:
      return "EUR";
  }
}

export function formatMoney(amount: number, c: Currency, lang: Lang) {
  try {
    return new Intl.NumberFormat(localeFor(lang), {
      style: "currency",
      currency: currencyCode(c),
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    const symbol = c === "usd" ? "$" : c === "gbp" ? "£" : "€";
    return `${symbol}${Math.round(amount).toLocaleString(localeFor(lang))}`;
  }
}