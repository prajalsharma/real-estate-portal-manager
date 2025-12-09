import { NextRequest, NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

// Language code mapping
const LANGUAGE_MAP: Record<string, string> = {
  en: "English",
  el: "Greek",
  sr: "Serbian",
  ru: "Russian",
  bg: "Bulgarian",
};

// Cache for translations to avoid repeated API calls
interface TranslationCache {
  [key: string]: {
    translation: string;
    timestamp: number;
    expiresAt: number;
  };
}

const translationCache: TranslationCache = {};
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

function getCacheKey(text: string, targetLanguage: string): string {
  return `${text.substring(0, 100)}_${targetLanguage}`;
}

async function translateWithOpenAI(
  text: string,
  targetLanguage: string
): Promise<string> {
  // Re-read from process.env in case it wasn't loaded at module initialization
  const apiKey = process.env.OPENAI_API_KEY || OPENAI_API_KEY;
  
  if (!apiKey || apiKey.trim() === "") {
    console.warn("OPENAI_API_KEY not configured, returning original text");
    console.warn("Environment check:", {
      hasEnvVar: !!process.env.OPENAI_API_KEY,
      envVarLength: process.env.OPENAI_API_KEY?.length || 0,
    });
    return text;
  }

  const targetLanguageName = LANGUAGE_MAP[targetLanguage] || "English";

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a professional translator. Translate the following real estate property description to ${targetLanguageName}. Maintain the same tone and format. Only return the translated text, no explanations.`,
          },
          {
            role: "user",
            content: text,
          },
        ],
        temperature: 0.3,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(`OpenAI API error (${response.status}):`, errorData);
      throw new Error(`Translation API request failed: ${response.status}`);
    }

    const data = await response.json();
    const translatedText =
      data.choices?.[0]?.message?.content?.trim() || text;

    return translatedText;
  } catch (error) {
    console.error("Error translating with OpenAI:", error);
    // Return original text on error
    return text;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, targetLanguage } = body;

    // Validate input
    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Invalid text. Must be a non-empty string." },
        { status: 400 }
      );
    }

    if (!targetLanguage || !LANGUAGE_MAP[targetLanguage]) {
      return NextResponse.json(
        {
          error: `Unsupported language. Supported: ${Object.keys(LANGUAGE_MAP).join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Check cache first
    const cacheKey = getCacheKey(text, targetLanguage);
    const cached = translationCache[cacheKey];

    if (cached && cached.expiresAt > Date.now()) {
      return NextResponse.json(
        {
          translation: cached.translation,
          cached: true,
          language: targetLanguage,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, s-maxage=86400", // 24 hours
          },
        }
      );
    }

    // If target language is English, return original text
    if (targetLanguage === "en") {
      const result = {
        translation: text,
        cached: false,
        language: targetLanguage,
      };

      // Cache the result
      translationCache[cacheKey] = {
        translation: text,
        timestamp: Date.now(),
        expiresAt: Date.now() + CACHE_TTL_MS,
      };

      return NextResponse.json(result);
    }

    // Translate using OpenAI
    const translation = await translateWithOpenAI(text, targetLanguage);

    // Cache the result
    translationCache[cacheKey] = {
      translation,
      timestamp: Date.now(),
      expiresAt: Date.now() + CACHE_TTL_MS,
    };

    return NextResponse.json(
      {
        translation,
        cached: false,
        language: targetLanguage,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, s-maxage=86400", // 24 hours
        },
      }
    );
  } catch (error) {
    console.error("Error in POST /api/translate:", error);

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

