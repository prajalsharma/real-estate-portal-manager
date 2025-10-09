"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useAppPrefs } from "@/lib/prefs-context";
import { useT } from "@/lib/i18n";

type HeaderProps = {
  className?: string;
  initialCurrency?: "usd" | "eur" | "gbp";
  initialLanguage?: "en" | "el" | "sr" | "ru" | "bg";
  onCurrencyChange?: (value: string) => void;
  onLanguageChange?: (value: string) => void;
};

const NAV_ITEMS = [
  { key: "nav.condos" },
  { key: "nav.houses" },
  { key: "nav.commercial" },
  { key: "nav.rent" },
  { key: "nav.about" },
  { key: "nav.contact" },
];

const LANGUAGES: { label: string; value: HeaderProps["initialLanguage"] }[] = [
  { label: "English", value: "en" },
  { label: "Greek", value: "el" },
  { label: "Serbian", value: "sr" },
  { label: "Russian", value: "ru" },
  { label: "Bulgarian", value: "bg" },
];

const CURRENCIES = [
  { label: "USD", value: "usd" },
  { label: "EUR", value: "eur" },
  { label: "GBP", value: "gbp" },
];

export default function Header({
  className,
  initialCurrency = "usd",
  initialLanguage = "en",
  onCurrencyChange,
  onLanguageChange,
}: HeaderProps) {
  const { currency, language, setCurrency, setLanguage } = useAppPrefs();
  const t = useT();

  // theme toggle
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  React.useEffect(() => {
    // hydrate prefs
    setCurrency(initialCurrency);
    setLanguage(initialLanguage);

    const stored = (typeof window !== "undefined" && localStorage.getItem("theme")) as
      | "light"
      | "dark"
      | null;
    const preferred: "light" | "dark" =
      stored ||
      (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    setTheme(preferred);
    document.documentElement.classList.toggle("dark", preferred === "dark");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", next);
    }
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  const handleCurrencyChange = (val: string) => {
    setCurrency(val as any);
    onCurrencyChange?.(val);
  };

  const handleLanguageChange = (val: string) => {
    setLanguage(val as any);
    onLanguageChange?.(val);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background backdrop-blur supports-[backdrop-filter]:bg-background/95",
        className
      )}
      role="banner">
      <div className="mx-auto flex h-16 items-center justify-between gap-3 px-5 md:px-10">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            aria-label="Spasic Real Estate Home"
            className="inline-flex items-center gap-2">
            {/* Logo */}
            <img
              src="/logo.svg"
              alt="Spasic Real Estate logo"
              className="size-10 object-cover shrink-0"
            />
          </Link>
        </div>

        {/* Center: Navigation (desktop) */}
        <nav className="hidden lg:flex items-center gap-1 lg:ml-20" aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => (
            <Button
              key={item.key}
              variant="ghost"
              className="text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-accent/60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md">
              <span className="truncate">{t(item.key)}</span>
            </Button>
          ))}
        </nav>

        {/* Right: Utilities */}
        <div className="hidden lg:flex items-center gap-2">
          <Select value={currency} onValueChange={handleCurrencyChange}>
            <SelectTrigger
              className="h-9 w-[92px] bg-card border hover:bg-accent/60 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
              aria-label={t("labels.currency")}>
              <SelectValue placeholder={t("labels.currency")} />
            </SelectTrigger>
            <SelectContent align="end" className="bg-popover">
              {CURRENCIES.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger
              className="h-9 w-[140px] bg-card border hover:bg-accent/60 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
              aria-label={t("labels.language")}>
              <SelectValue placeholder={t("labels.language")} />
            </SelectTrigger>
            <SelectContent align="end" className="bg-popover">
              {LANGUAGES.map((l) => (
                <SelectItem key={l.value} value={l.value!}>
                  {l.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Theme toggle replaces login */}
          {/* <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="h-9 w-9">
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button> */}
        </div>

        {/* Mobile: Hamburger + Sheet */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open menu"
                className="hover:bg-accent/60">
                <Menu className="h-5 w-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[88%] max-w-sm bg-background p-0"
              aria-label="Mobile navigation">
              <SheetHeader className="border-b bg-background p-4">
                <SheetTitle className="font-heading text-lg tracking-tight">
                  Spasic Real Estate
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col">
                <div className="flex flex-col p-2">
                  {NAV_ITEMS.map((item) => (
                    <SheetClose asChild key={item.key}>
                      <button
                        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-base font-medium text-foreground/90 hover:bg-accent/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        aria-label={t(item.key)}>
                        <span className="min-w-0 truncate">{t(item.key)}</span>
                      </button>
                    </SheetClose>
                  ))}
                </div>

                <div className="mt-1 border-t p-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="mobile-currency" className="text-xs text-muted-foreground">
                        {t("labels.currency")}
                      </label>
                      <Select value={currency} onValueChange={handleCurrencyChange}>
                        <SelectTrigger id="mobile-currency" className="h-9 bg-card border">
                          <SelectValue placeholder={t("labels.currency")} />
                        </SelectTrigger>
                        <SelectContent className="bg-popover">
                          {CURRENCIES.map((c) => (
                            <SelectItem key={c.value} value={c.value}>
                              {c.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label htmlFor="mobile-language" className="text-xs text-muted-foreground">
                        {t("labels.language")}
                      </label>
                      <Select value={language} onValueChange={handleLanguageChange}>
                        <SelectTrigger id="mobile-language" className="h-9 bg-card border">
                          <SelectValue placeholder={t("labels.language")} />
                        </SelectTrigger>
                        <SelectContent className="bg-popover">
                          {LANGUAGES.map((l) => (
                            <SelectItem key={l.value} value={l.value!}>
                              {l.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* <div className="mt-4 grid grid-cols-2 gap-3">
                    <Button variant="ghost" onClick={toggleTheme} className="h-10">
                      {theme === "dark" ? "Light Mode" : "Dark Mode"}
                    </Button>
                    <SheetClose asChild>
                      <Button className="h-10" variant="outline">
                        Close
                      </Button>
                    </SheetClose>
                  </div> */}
                </div>

                <div className="p-4 pt-2 text-xs text-muted-foreground">
                  © {new Date().getFullYear()} Spasic Real Estate
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
