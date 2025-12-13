"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { toast } from "sonner";
import {
  MapPin,
  House,
  Bed,
  SearchCheck,
  LandPlot,
  ShowerHead,
  Proportions,
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  CircleSmall,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useT } from "@/lib/i18n";
import { useCarouselProperties } from "@/lib/sanity/hooks";
import { safeImageUrl } from "@/lib/sanity/image";
import { useAppPrefs } from "@/lib/prefs-context";
import { useRates } from "@/lib/hooks/use-rates";
import { formatter } from "@/lib/priceFormatter";
import Link from "next/link";
import { usePropertySearch } from "@/lib/hooks/usePropertySearch";
import { PropertyFilters } from "@/lib/sanity/types";

type FeaturedAgent = {
  name: string;
  avatarUrl: string;
  title?: string;
};

type FeaturedProperty = {
  imageUrl: string;
  title: string;
  address: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  slug?: {
    current: string;
  };
  agent: FeaturedAgent;
};

export interface HeroSectionProps {
  className?: string;
  style?: React.CSSProperties;
  featured?: FeaturedProperty;
  onSearch?: (query: {
    location?: string;
    type?: string;
    minPrice?: number | null;
    maxPrice?: number | null;
    beds?: string;
  }) => void;
}

export default function HeroSection({ className, style, onSearch }: HeroSectionProps) {
  // Fetch carousel properties from Sanity
  const { properties: carouselPropertiesData = [] } = useCarouselProperties(5);

  // Fallback dummy featured properties array
  const fallbackProperties: FeaturedProperty[] = [
    {
      imageUrl:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop",
      title: "Elegant Seaside Apartment",
      address: "Glyfada, Athens",
      price: "€520,000",
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1150,
      agent: {
        name: "Eleni Papadopoulou",
        avatarUrl:
          "https://images.unsplash.com/photo-1558222217-42c7baf5f8b9?q=80&w=400&auto=format&fit=crop",
        title: "Senior Agent",
      },
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=1600&auto=format&fit=crop",
      title: "Luxury Villa with Pool",
      address: "Kassandra, Halkidiki",
      price: "€1,200,000",
      bedrooms: 5,
      bathrooms: 4,
      sqft: 3200,
      agent: {
        name: "Nikos Georgiou",
        avatarUrl:
          "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=400&auto=format&fit=crop",
        title: "Lead Agent",
      },
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1600&auto=format&fit=crop",
      title: "Modern City Loft",
      address: "Thessaloniki Center",
      price: "€350,000",
      bedrooms: 2,
      bathrooms: 1,
      sqft: 900,
      agent: {
        name: "Maria Kotsou",
        avatarUrl:
          "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=400&auto=format&fit=crop",
        title: "Junior Agent",
      },
    },
  ];

  // Map Sanity properties to FeaturedProperty format
  const sanityMappedProperties: FeaturedProperty[] = carouselPropertiesData.map((prop) => ({
    imageUrl:
      safeImageUrl(prop.mainImage) ||
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1600&auto=format&fit=crop",
    title: prop.title,
    address: `${prop.address?.city || ""}${prop.address?.region ? ", " + prop.address.region : ""}`,
    price: `€${prop.price?.toLocaleString() || "0"}`,
    bedrooms: prop.bedrooms || 0,
    bathrooms: prop.bathrooms || 0,
    sqft: prop.sqft || 0,
    slug: prop.slug,
    agent: {
      name: prop.agent?.name || "Agent",
      avatarUrl:
        safeImageUrl(prop.agent?.avatar) ||
        "https://images.unsplash.com/photo-1558222217-42c7baf5f8b9?q=80&w=400&auto=format&fit=crop",
      title: prop.agent?.role || "Listing Agent",
    },
  }));

  // Use Sanity properties if available, otherwise fallback to dummy data
  const featuredProperties =
    sanityMappedProperties.length > 0 ? sanityMappedProperties : fallbackProperties;

  const [currentIdx, setCurrentIdx] = React.useState(0);
  const featured = featuredProperties[currentIdx];

  const videoRef = React.useRef<HTMLVideoElement>(null);
  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7;
    }
  }, []);
  const [location, setLocation] = React.useState<string | undefined>(undefined);
  const [type, setType] = React.useState<string | undefined>(undefined);
  const [beds, setBeds] = React.useState<string | undefined>(undefined);
  const [minPrice, setMinPrice] = React.useState<string>("");
  const [maxPrice, setMaxPrice] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);
  const t = useT();
  const { currency, language } = useAppPrefs();
  const { convert, loading: ratesLoading } = useRates();
  const { searchProperties, loading: searching, error: searchError } = usePropertySearch();

  const eur = Number(featured.price?.replace(/[^\d]/g, "")) || 0;
  const priceDisplay =
    !ratesLoading && eur > 0
      ? formatter(language, currency)
          .format(convert(eur as number, currency as any))
          .replace(/(\p{Sc})\s?/u, "$1\u00A0")
      : featured.price;

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIdx((idx) => (idx === featuredProperties.length - 1 ? 0 : idx + 1));
    }, 3000);
    return () => clearTimeout(timer);
  }, [currentIdx, featuredProperties.length]);

  async function handleSearch(e?: React.FormEvent) {
    e?.preventDefault();

    // Validate at least one filter is selected
    if (!location && !type && !beds && !minPrice && !maxPrice) {
      toast.error(t("forms.validation.required", "Required fields missing"), {
        description: t(
          "forms.validation.selectFilter",
          "Please select at least one search criterion"
        ),
      });
      return;
    }

    const filters: PropertyFilters = {
      location: location || undefined,
      propertyType: type || undefined,
      beds: beds || undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    };

    try {
      // Call the search API
      const results = await searchProperties(filters);

      console.log("🔍 Search completed:", { total: results.total, filters });

      // Dispatch custom event for PropertyExplorer component
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("app:search", {
            detail: {
              filters,
              results: results.properties,
              total: results.total,
            },
          })
        );
      }

      // Call onSearch prop if provided
      if (onSearch) {
        // @ts-ignore
        onSearch({ ...filters, results: results.properties });
      }

      // Show success toast
      toast.success(t("actions.searchSubmitted", "Search completed"), {
        description: `Found ${results.total} ${results.total === 1 ? "property" : "properties"}${
          filters.location ? ` in ${filters.location}` : ""
        }`,
      });

      // Scroll to results section
      setTimeout(() => {
        document.getElementById("property-results")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 500);
    } catch (error) {
      console.error("❌ Search error:", error);
      toast.error(t("errors.searchFailed", "Search failed"), {
        description: searchError || "Please try again later",
      });
    }
  }

  function handleClear() {
    setLocation("");
    setType("");
    setBeds("");
    setMinPrice("");
    setMaxPrice("");
    const payload = {};
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("app:search", { detail: payload }));
    }
    toast.message(t("actions.clearFilters", "Clear filters"), {
      description: t("messages.filtersCleared", "All filters have been cleared."),
    });
  }

  return (
    <>
      <section
        className={cn(
          "relative w-full text-foreground overflow-hidden",

          className
        )}
        style={style}
        aria-labelledby="hero-heading">
        {/* 4K Video Background - Full viewport edge-to-edge */}
        <div className="absolute inset-0 z-0 w-full h-full">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectFit: "cover", objectPosition: "center" }}>
            <source src="/hero_vid.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24 flex flex-col lg:flex-row lg:items-center">
          <div className="w-full max-w-7xl mx-auto space-y-8 sm:space-y-10 md:space-y-12">
            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-10 max-w-7xl mx-auto justify-center items-center">
              <div className="w-full text-center lg:text-left">
                <h1
                  id="hero-heading"
                  className={cn(
                    "hero-heading tracking-tight leading-[1.1] text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[86px] drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] mb-4 sm:mb-5 font-bold"
                  )}>
                  {t("hero.title", "Real estate for living and investments")}
                </h1>
                <div className="inline-block pb-3 rounded-2xl">
                  <p className="text-white text-base md:text-2xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] leading-relaxed font-light">
                    {t(
                      "hero.subtitle",
                      "Discover properties across Greece. Buy, sell, or rent with trusted local expertise."
                    )}
                  </p>
                </div>
              </div>

              {/* Right: Featured Property*/}
              <div className="w-full">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={currentIdx}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="w-full">
                    <Card className="overflow-hidden bg-white/95 backdrop-blur-2xl border-white/80 shadow-sm ring-1 ring-black/10 py-0 border-none gap-2 w-3/4 mx-auto">
                      <CardContent className="relative w-full overflow-hidden group px-5 pb-5 pt-20 h-80 flex flex-col justify-end">
                        <Image
                          src={featured.imageUrl}
                          alt={featured.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

                        <div className="flex flex-col items-start justify-between gap-1.5">
                          <div className="inline-block rounded-full bg-gold px-5 py-2.5 text-base sm:text-lg font-bold shadow-xl ring-2 ring-white/30 text-white z-10">
                            {priceDisplay}
                          </div>
                          <h3 className="text-xl sm:text-2xl font-heading font-bold text-white drop-shadow-2xl leading-tight">
                            {featured.title}
                          </h3>

                          <div className="flex items-start justify-end w-full flex-col gap-1">
                            <p className="text-sm sm:text-base text-white/95 flex items-center gap-2 drop-shadow-lg font-medium">
                              <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                              <span className="truncate">{featured.address}</span>
                            </p>
                            <div className="hidden md:flex items-center gap-4 rounded-full bg-white/95 backdrop-blur-sm px-5 py-3 shadow-xl shrink-0">
                              <span className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                                <Bed className="h-4.5 w-4.5 text-gold" aria-hidden="true" />
                                {featured.bedrooms} {t("labels.bed", "bd")}
                              </span>
                              <span className="text-sm text-foreground/60">•</span>
                              <span className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                                <ShowerHead className="h-4.5 w-4.5 text-gold" aria-hidden="true" />
                                {featured.bathrooms} {t("labels.bath", "ba")}
                              </span>
                              <span className="text-sm text-foreground/60">•</span>
                              <span className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                                <LandPlot className="h-4.5 w-4.5 text-gold" aria-hidden="true" />
                                {featured.sqft.toLocaleString()} {t("labels.area", "m²")}
                              </span>
                            </div>
                            <div className="w-full z-20 text-center">
                              <Link
                                href={`/${featured.slug}`}
                                className="inline-flex bg-gold text-white hover:bg-gold/90 py-2 w-full sm:w-auto rounded shadow-lg hover:shadow-xl text-base px-6 font-semibold cursor-pointer transition-all duration-300 hover:scale-105 ring-2 ring-gold/30 hover:ring-gold/50 mt-2">
                                {t("actions.viewDetails")}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </CardContent>

                      {/* <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"> */}
                      {/* <div className="flex items-center gap-3 min-w-0">
                            <Avatar className="h-12 w-12 ring-2 ring-gold/40 shadow-lg shrink-0">
                              <AvatarImage
                                src={featured.agent.avatarUrl}
                                alt={featured.agent.name}
                              />
                              <AvatarFallback className="text-sm bg-gold/20 text-gold font-bold">
                                {featured.agent.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .slice(0, 2)
                                  .toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                              <p className="font-bold leading-none text-base truncate text-foreground">
                                {featured.agent.name}
                              </p>
                              <p className="text-sm text-foreground/70 mt-1.5 truncate font-medium">
                                {featured.agent.title ?? t("labels.agent", "Listing Agent")}
                              </p>
                            </div>
                          </div> */}
                      {/* </div> */}

                      <CardFooter className="pt-0 px-5 sm:px-6 pb-5 md:hidden">
                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm  font-semibold">
                          <div className="flex items-center gap-1.5">
                            <Bed className="h-4 w-4 text-gold" aria-hidden="true" />
                            <span className="min-w-0">
                              {t("labels.bed")} {featured.bedrooms}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <ShowerHead className="h-4 w-4 text-gold" aria-hidden="true" />
                            <span className="min-w-0">
                              {t("labels.bath")} {featured.bathrooms}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Proportions className="h-4 w-4 text-gold" aria-hidden="true" />
                            <span className="min-w-0">
                              {featured.sqft} {t("labels.area")}
                            </span>
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </AnimatePresence>
                <div className="flex items-center justify-center gap-2 mt-6">
                  <button
                    type="button"
                    aria-label="Previous property"
                    className="text-xl px-2 py-1 rounded-full hover:bg-gold/10 group transition-colors"
                    onClick={() =>
                      setCurrentIdx((idx) => (idx === 0 ? featuredProperties.length - 1 : idx - 1))
                    }>
                    <ChevronLeft className="text-white group-hover:text-gold" />
                  </button>
                  {featuredProperties.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      aria-label={`Go to property ${idx + 1}`}
                      className="size-4 cursor-pointer"
                      onClick={() => setCurrentIdx(idx)}>
                      <CircleSmall
                        className={`h-full w-full ${idx === currentIdx ? "fill-gold text-gold" : "fill-white text-white"}`}
                        aria-hidden="true"
                      />
                    </button>
                  ))}
                  <button
                    type="button"
                    aria-label="Next property"
                    className="text-xl px-2 py-1 rounded-full hover:bg-gold/10 group transition-colors"
                    onClick={() =>
                      setCurrentIdx((idx) => (idx === featuredProperties.length - 1 ? 0 : idx + 1))
                    }>
                    <ChevronRight className="text-white group-hover:text-gold" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300 ease-out">
        <Card className="bg-white/95 backdrop-blur-2xl border-white/80 shadow-sm ring-1 ring-black/10 border-none gap-2">
          <CardHeader className="pb-4 px-5 sm:px-6">
            <CardTitle className="text-2xl sm:text-3xl font-bold text-foreground">
              {t("hero.search.title", "Find your next home")}
            </CardTitle>
            <CardDescription className="text-base sm:text-lg text-foreground/70 font-medium">
              {t("hero.search.subtitle", "Search by location, price, and more")}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0 px-5 sm:px-6 ">
            <form
              onSubmit={handleSearch}
              className="w-full flex flex-col gap-4"
              aria-label={t("aria.searchForm", "Property search form")}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <FieldCard>
                  {/* Location */}
                  <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                    <MapPin className="h-4.5 w-4.5 text-primary shrink-0" aria-hidden="true" />
                    <span>{t("labels.location", "Location")}</span>
                  </div>
                  <Select onValueChange={setLocation} value={location}>
                    <SelectTrigger
                      className="bg-white rounded text-sm h-11 border-border/50 shadow-sm"
                      aria-label={t("aria.selectLocation", "Select location")}>
                      <SelectValue
                        placeholder={t("placeholders.chooseLocation", "Choose a city or area")}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Kassandra">Kassandra</SelectItem>
                      <SelectItem value="Sithonia">Sithonia</SelectItem>
                      <SelectItem value="Thessaloniki">Thessaloniki</SelectItem>
                    </SelectContent>
                  </Select>
                </FieldCard>

                <FieldCard>
                  <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                    <House className="h-4.5 w-4.5 text-primary shrink-0" aria-hidden="true" />
                    <span>{t("labels.propertyType", "Property type")}</span>
                  </div>
                  <Select onValueChange={setType} value={type}>
                    <SelectTrigger
                      className="bg-white rounded text-sm h-11 border-border/50 shadow-sm w-full"
                      aria-label={t("aria.selectType", "Select property type")}>
                      <SelectValue placeholder={t("placeholders.selectType", "Select type")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Apartment">
                        {t("propertyTypes.apartment", "Apartment")}
                      </SelectItem>
                      <SelectItem value="Maisonette">
                        {t("propertyTypes.maisonette", "Maisonette")}
                      </SelectItem>
                      <SelectItem value="House">{t("propertyTypes.house", "House")}</SelectItem>
                      <SelectItem value="Complex">
                        {" "}
                        {t("propertyTypes.complex", "Complex")}
                      </SelectItem>
                      <SelectItem value="Building">
                        {t("propertyTypes.building", "Building")}
                      </SelectItem>
                      <SelectItem value="Hotel">{t("propertyTypes.hotel", "Hotel")}</SelectItem>
                      <SelectItem value="Commercial">
                        {t("propertyTypes.commercial", "Commercial")}
                      </SelectItem>
                      <SelectItem value="Land">{t("propertyTypes.land", "Land")}</SelectItem>
                      <SelectItem value="Rent">
                        {t("propertyTypes.rental", "Rental Services")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FieldCard>

                <FieldCard>
                  {/* Min Price */}
                  <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                    <ArrowDown className="h-4.5 w-4.5 text-primary shrink-0" aria-hidden="true" />
                    <span>{t("labels.minPrice", "Min price")}</span>
                  </div>
                  <div className="relative">
                    <Input
                      inputMode="numeric"
                      pattern="[0-9]*"
                      type="text"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value.replace(/[^\d]/g, ""))}
                      placeholder={t("placeholders.minPrice", "e.g. 100,000")}
                      aria-label={t("aria.minPrice", "Minimum price")}
                      className=" bg-white rounded text-sm border-border/50 shadow-sm"
                    />
                  </div>
                </FieldCard>

                <FieldCard>
                  {/* Max Price */}
                  <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                    <ArrowUp className="h-4.5 w-4.5 text-primary shrink-0" aria-hidden="true" />
                    <span>{t("labels.maxPrice", "Max price")}</span>
                  </div>
                  <div className="relative">
                    <Input
                      inputMode="numeric"
                      pattern="[0-9]*"
                      type="text"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value.replace(/[^\d]/g, ""))}
                      placeholder={t("placeholders.maxPrice", "e.g. 350,000")}
                      aria-label={t("aria.maxPrice", "Maximum price")}
                      className=" bg-white rounded text-sm  border-border/50 shadow-sm"
                    />
                  </div>
                </FieldCard>

                <FieldCard>
                  {/* Bedrooms */}
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-foreground">
                    <Bed className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                    <span className="hidden sm:inline">{t("labels.bedrooms", "Bedrooms")}</span>
                    <span className="sm:hidden">Beds</span>
                  </div>
                  <Select onValueChange={setBeds} value={beds}>
                    <SelectTrigger
                      className="bg-white rounded text-sm h-11 border-border/50 shadow-sm w-full"
                      aria-label={t("aria.selectBedrooms", "Select bedrooms")}>
                      <SelectValue placeholder={t("placeholders.any", "Any")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5-plus">5+</SelectItem>
                    </SelectContent>
                  </Select>
                </FieldCard>
              </div>

              <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:max-w-70 lg:mx-auto">
                <Button
                  type="submit"
                  className={cn(
                    "h-11 px-8 rounded text-base font-semibold",
                    "bg-primary text-white hover:bg-primary/90",
                    "shadow-lg hover:shadow-xl transition-all duration-300",
                    "ring-2 ring-primary/30 hover:ring-primary/50 cursor-pointer w-full"
                  )}
                  disabled={searching || loading}
                  aria-label={t("aria.searchProperties", "Search properties")}>
                  <SearchCheck className="mr-2 h-4.5 w-4.5" aria-hidden="true" />
                  {searching
                    ? t("actions.searching", "Searching...")
                    : t("actions.search", "Search")}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleClear}
                  className="h-11 px-4 rounded text-base font-semibold hover:bg-white/20 transition-all cursor-pointer ring-2 ring-gold w-full"
                  aria-label={t("actions.clear", "Clear filters")}>
                  <span className="hidden sm:inline">{t("actions.clear", "Clear")}</span>
                  <span className="sm:hidden">{t("actions.clear", "Clear")}</span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function FieldCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded border border-border/40 bg-white/80 backdrop-blur-sm px-3 py-2.5 transition-all focus-within:ring-2 focus-within:ring-primary/60 focus-within:border-primary/50 shadow-sm flex flex-col gap-2">
      {children}
    </div>
  );
}
