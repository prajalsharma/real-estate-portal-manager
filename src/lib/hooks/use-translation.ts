import { useState, useEffect, useCallback } from "react";
import { SupportedLanguage } from "@/lib/prefs-context";

interface TranslationResponse {
  translation: string;
  cached: boolean;
  language: string;
}

interface TranslationCache {
  [key: string]: {
    translation: string;
    timestamp: number;
  };
}

// Client-side cache to avoid repeated API calls
const clientCache: TranslationCache = {};
const CLIENT_CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

export function useTranslation(text: string | null | undefined, language: SupportedLanguage) {
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCacheKey = useCallback((text: string, lang: string) => {
    return `${text.substring(0, 100)}_${lang}`;
  }, []);

  const translate = useCallback(
    async (textToTranslate: string, targetLang: SupportedLanguage) => {
      // If no text, return null
      if (!textToTranslate || !textToTranslate.trim()) {
        setTranslatedText(null);
        return;
      }

      // If language is English, return original text
      if (targetLang === "en") {
        setTranslatedText(textToTranslate);
        return;
      }

      // Check client-side cache first
      const cacheKey = getCacheKey(textToTranslate, targetLang);
      const cached = clientCache[cacheKey];

      if (cached && Date.now() - cached.timestamp < CLIENT_CACHE_TTL_MS) {
        setTranslatedText(cached.translation);
        return;
      }

      // Fetch translation from API
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/translate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: textToTranslate,
            targetLanguage: targetLang,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || "Translation failed");
        }

        const data: TranslationResponse = await response.json();

        // Update client cache
        clientCache[cacheKey] = {
          translation: data.translation,
          timestamp: Date.now(),
        };

        setTranslatedText(data.translation);
      } catch (err) {
        console.error("Translation error:", err);
        setError(err instanceof Error ? err.message : "Translation failed");
        // Fallback to original text on error
        setTranslatedText(textToTranslate);
      } finally {
        setLoading(false);
      }
    },
    [getCacheKey]
  );

  useEffect(() => {
    if (text) {
      translate(text, language);
    } else {
      setTranslatedText(null);
    }
  }, [text, language, translate]);

  return { translatedText, loading, error };
}

