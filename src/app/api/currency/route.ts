import { NextResponse } from "next/server";

// Server-defined base: EUR
const RATES = {
  eur: 1,
  usd: 1.08,
  gbp: 0.85,
};

export async function GET() {
  return NextResponse.json({
    base: "eur",
    rates: RATES,
    updatedAt: new Date().toISOString(),
  });
}

export async function POST(req: Request) {
  try {
    const { amount, from = "eur", to = "eur" } = await req.json();
    const amt = Number(amount ?? 0);
    const f = String(from).toLowerCase() as keyof typeof RATES;
    const t = String(to).toLowerCase() as keyof typeof RATES;

    if (!(f in RATES) || !(t in RATES)) {
      return NextResponse.json(
        { error: "Unsupported currency" },
        { status: 400 }
      );
    }

    // Convert via EUR as base
    const inEur = f === "eur" ? amt : amt / RATES[f];
    const converted = t === "eur" ? inEur : inEur * RATES[t];

    return NextResponse.json({ amount: converted, to: t, from: f });
  } catch (e) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}