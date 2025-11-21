import { NextRequest, NextResponse } from "next/server";

// FCA Live API Configuration
const FCA_API_KEY = process.env.FCA_API_KEY;
const FCA_API_BASE_URL = process.env.FCA_API_BASE_URL || "https://api.freecurrencyapi.com/v1/latest";

const SUPPORTED_CURRENCIES = ["USD", "EUR", "GBP"] as const;
type SupportedCurrency = "usd" | "eur" | "gbp";

interface CachedRates {
  rates: Record<SupportedCurrency, number>;
  timestamp: number;
  expiresAt: number;
}

let rateCache: CachedRates | null = null;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

const FALLBACK_RATES: Record<SupportedCurrency, number> = {
  eur: 1,
  usd: 1.08,
  gbp: 0.85,
};

async function fetchRatesFromAPI(): Promise<Record<SupportedCurrency, number>> {
  try {
    if (!FCA_API_KEY) {
      console.warn("FCA_API_KEY not configured, using fallback rates");
      return FALLBACK_RATES;
    }

    // Build API URL with query parameters
    const apiUrl = new URL(FCA_API_BASE_URL);
    apiUrl.searchParams.set("apikey", FCA_API_KEY as string);
    apiUrl.searchParams.set("base_currency", "EUR");
    apiUrl.searchParams.set("currencies", "USD,GBP");

    const response = await fetch(apiUrl.toString(), {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "User-Agent": "Spasic-Real-Estate/1.0",
      },
      
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`FCA API error (${response.status}):`, errorText);
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();

    // Handle FCA API response format
    if (data.data && typeof data.data === "object") {
      const rates: Record<SupportedCurrency, number> = {
        eur: 1, // Base currency
        usd: data.data.USD || FALLBACK_RATES.usd,
        gbp: data.data.GBP || FALLBACK_RATES.gbp,
      };

      if (rates.usd > 0 && rates.usd < 3 && rates.gbp > 0 && rates.gbp < 3) {
        return rates;
      } else {
        console.warn("Rates seem invalid, using fallback");
        return FALLBACK_RATES;
      }
    }

    throw new Error("Invalid API response format");
  } catch (error) {
    console.error("Error fetching rates from FCA API:", error);
    // Return fallback rates on error
    return FALLBACK_RATES;
  }
}


async function getRates(): Promise<Record<SupportedCurrency, number>> {
  const now = Date.now();

  if (
    rateCache &&
    rateCache.expiresAt > now
  ) {
    return rateCache.rates;
  }

  // Fetch fresh rates
  const rates = await fetchRatesFromAPI();

  // Update cache
  rateCache = {
    rates,
    timestamp: now,
    expiresAt: now + CACHE_TTL_MS,
  };

  return rates;
}


export async function GET(request: NextRequest) {
  try {
    const startTime = Date.now();
    const rates = await getRates();
    const isCached = rateCache && rateCache.expiresAt ? rateCache.expiresAt > Date.now() : false;

    const headers = new Headers({
      "Content-Type": "application/json",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600", // Cache for 5 min, stale for 10 min
    });

    return NextResponse.json(
      {
        base: "eur" as const,
        rates,
        updatedAt: new Date(rateCache?.timestamp || Date.now()).toISOString(),
        cached: isCached,
        responseTime: Date.now() - startTime,
      },
      { headers }
    );
  } catch (error) {
    console.error("Error in GET /api/currency:", error);

    // Return fallback rates even on error
    return NextResponse.json(
      {
        base: "eur" as const,
        rates: FALLBACK_RATES,
        updatedAt: new Date().toISOString(),
        cached: false,
        error: "Using fallback rates",
      },
      { status: 503 } // Service Unavailable but with fallback data
    );
  }
}


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, from = "eur", to = "eur" } = body;

    // Validate input
    if (typeof amount !== "number" || !Number.isFinite(amount) || amount < 0) {
      return NextResponse.json(
        { error: "Invalid amount. Must be a positive number." },
        { status: 400 }
      );
    }

    const fromCurrency = String(from).toLowerCase() as SupportedCurrency;
    const toCurrency = String(to).toLowerCase() as SupportedCurrency;

    if (
      !SUPPORTED_CURRENCIES.includes(fromCurrency.toUpperCase() as any) ||
      !SUPPORTED_CURRENCIES.includes(toCurrency.toUpperCase() as any)
    ) {
      return NextResponse.json(
        {
          error: `Unsupported currency. Supported: ${SUPPORTED_CURRENCIES.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Get current rates
    const rates = await getRates();

    // Convert via EUR as base
    // First convert from source currency to EUR
    const amountInEur =
      fromCurrency === "eur" ? amount : amount / rates[fromCurrency];

    // Then convert from EUR to target currency
    const convertedAmount =
      toCurrency === "eur" ? amountInEur : amountInEur * rates[toCurrency];

    const conversionRate =
      fromCurrency === "eur"
        ? rates[toCurrency]
        : rates[toCurrency] / rates[fromCurrency];

    return NextResponse.json(
      {
        amount: Math.round(convertedAmount * 100) / 100, // Round to 2 decimals
        from: fromCurrency,
        to: toCurrency,
        rate: conversionRate,
        base: "eur" as const,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, s-maxage=300",
        },
      }
    );
  } catch (error) {
    console.error("Error in POST /api/currency:", error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}