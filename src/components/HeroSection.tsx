"use client"

import * as React from "react"
import Image from "next/image"
import { toast } from "sonner"
import {
  MapPin,
  House,
  Building2,
  Bed,
  SlidersHorizontal,
  SearchCheck,
  LandPlot,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { useT } from "@/lib/i18n"

type FeaturedAgent = {
  name: string
  avatarUrl: string
  title?: string
}

type FeaturedProperty = {
  imageUrl: string
  title: string
  address: string
  price: string
  beds: number
  baths: number
  sqft: number
  agent: FeaturedAgent
}

export interface HeroSectionProps {
  className?: string
  style?: React.CSSProperties
  featured?: FeaturedProperty
  onSearch?: (query: {
    location?: string
    type?: string
    minPrice?: number | null
    maxPrice?: number | null
    beds?: string
  }) => void
}

export default function HeroSection({
  className,
  style,
  featured = {
    imageUrl:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop",
    title: "Elegant Seaside Apartment",
    address: "Glyfada, Athens",
    price: "€520,000",
    beds: 3,
    baths: 2,
    sqft: 1150,
    agent: {
      name: "Eleni Papadopoulou",
      avatarUrl:
        "https://images.unsplash.com/photo-1558222217-42c7baf5f8b9?q=80&w=400&auto=format&fit=crop",
      title: "Senior Agent",
    },
  },
  onSearch,
}: HeroSectionProps) {
  const [location, setLocation] = React.useState<string | undefined>(undefined)
  const [type, setType] = React.useState<string | undefined>(undefined)
  const [beds, setBeds] = React.useState<string | undefined>(undefined)
  const [minPrice, setMinPrice] = React.useState<string>("")
  const [maxPrice, setMaxPrice] = React.useState<string>("")
  const [loading, setLoading] = React.useState(false)
  const t = useT()

  function handleSearch(e?: React.FormEvent) {
    e?.preventDefault()
    const payload = {
      location,
      type,
      beds,
      minPrice: minPrice ? Number(minPrice) : null,
      maxPrice: maxPrice ? Number(maxPrice) : null,
    }
    // Broadcast search so PropertyExplorer can filter dummy data
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("app:search", { detail: payload }))
    }
    if (onSearch) {
      onSearch(payload)
    } else {
      toast.success(t("actions.searchSubmitted", "Search submitted"), {
        description: [
          payload.location && `${t("labels.location", "Location")}: ${payload.location}`,
          payload.type && `${t("labels.type", "Type")}: ${payload.type}`,
          payload.beds && `${t("labels.bedrooms", "Bedrooms")}: ${payload.beds}`,
          payload.minPrice !== null && `${t("labels.min", "Min")}: €${payload.minPrice?.toLocaleString()}`,
          payload.maxPrice !== null && `${t("labels.max", "Max")}: €${payload.maxPrice?.toLocaleString()}`,
        ]
          .filter(Boolean)
          .join(" • "),
      })
    }
  }

  function handleMoreFilters() {
    toast.message(t("actions.moreFilters", "More filters"), {
      description: t("messages.advancedFiltersSoon", "Advanced filters coming soon."),
    })
  }

  function handleTourRequest() {
    // Open details modal with this featured property and auto-open contact form
    const numericPrice = Number(String(featured.price).replace(/[^\d.]/g, "")) || 0
    const property = {
      id: "featured",
      title: featured.title,
      address: featured.address,
      price: numericPrice,
      beds: featured.beds,
      baths: featured.baths,
      sqft: featured.sqft,
      type: "Featured",
      imageUrl: featured.imageUrl,
      images: [featured.imageUrl],
      agent: featured.agent ? { id: "agent-1", name: featured.agent.name, avatarUrl: featured.agent.avatarUrl } : undefined,
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("app:open-property", { detail: { property, autoContact: true } }))
    }
  }

  function handleClear() {
    setLocation(undefined)
    setType(undefined)
    setBeds(undefined)
    setMinPrice("")
    setMaxPrice("")
    const payload = {}
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("app:search", { detail: payload }))
    }
    toast.message(t("actions.clearFilters", "Clear filters"), {
      description: t("messages.filtersCleared", "All filters have been cleared."),
    })
  }

  return (
    <section
      className={cn(
        "relative w-full text-foreground overflow-hidden",
        "min-h-[600px] sm:min-h-[700px] md:min-h-[800px] lg:min-h-[850px]",
        className
      )}
      style={style}
      aria-labelledby="hero-heading"
    >
      {/* 4K Video Background - Full viewport edge-to-edge */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        >
          <source
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/7672d653-a252-41ab-b1dd-956072cf2f23/generated_videos/ultra-premium-4k-hdr-cinematic-aerial-dr-45939548-20251009120907.mp4"
            type="video/mp4"
          />
        </video>
        {/* Subtle overlays for readability without dulling vibrant colors */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-primary/8" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="w-full max-w-7xl mx-auto space-y-8 sm:space-y-10 md:space-y-12">
          <header className="w-full text-center">
            <h1
              id="hero-heading"
              className={cn(
                "font-heading tracking-tight leading-[1.1]",
                "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl",
                "text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] mb-4 sm:mb-5",
                "font-bold"
              )}
            >
              {t("hero.title", "Real estate for living and investments")}
            </h1>
            <p className="text-white/95 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] leading-relaxed font-medium">
              {t(
                "hero.subtitle",
                "Discover properties across Greece. Buy, sell, or rent with trusted local expertise."
              )}
            </p>
          </header>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:gap-10 max-w-7xl mx-auto">
            {/* Left: Search Panel */}
            <div className="w-full">
              <Card className="bg-white/95 backdrop-blur-2xl border-white/80 shadow-2xl ring-1 ring-black/10">
                <CardHeader className="pb-4 px-5 sm:px-6">
                  <CardTitle className="text-2xl sm:text-3xl font-bold text-foreground">{t("hero.search.title", "Find your next home")}</CardTitle>
                  <CardDescription className="text-base sm:text-lg text-foreground/70 font-medium">{t("hero.search.subtitle", "Search by location, price, and more")}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0 px-5 sm:px-6">
                  <form
                    onSubmit={handleSearch}
                    className="w-full space-y-4"
                    aria-label={t("aria.searchForm", "Property search form")}
                  >
                    {/* Row 1: Location & Property Type */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <FieldCard>
                        <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                          <MapPin className="h-4.5 w-4.5 text-primary shrink-0" aria-hidden="true" />
                          <span>{t("labels.location", "Location")}</span>
                        </div>
                        <Select onValueChange={setLocation} value={location}>
                          <SelectTrigger
                            className="bg-white backdrop-blur-sm rounded-xl text-sm h-11 border-border/50 shadow-sm hover:border-primary/40 transition-colors"
                            aria-label={t("aria.selectLocation", "Select location")}
                          >
                            <SelectValue placeholder={t("placeholders.chooseLocation", "Choose a city or area")} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Kassandra">Kassandra</SelectItem>
                            <SelectItem value="Nea Moudania">Nea Moudania</SelectItem>
                            <SelectItem value="Sithonia">Sithonia</SelectItem>
                            <SelectItem value="Pefkochori">Pefkochori</SelectItem>
                            <SelectItem value="Polygyros">Polygyros</SelectItem>
                            <SelectItem value="Nikiti">Nikiti</SelectItem>
                          </SelectContent>
                        </Select>
                      </FieldCard>

                      <FieldCard>
                        <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                          <House className="h-4.5 w-4.5 text-primary shrink-0" aria-hidden="true" />
                          <span>{t("labels.propertyType", "Property type")}</span>
                        </div>
                        <Select onValueChange={setType} value={type}>
                          <SelectTrigger className="bg-white backdrop-blur-sm rounded-xl text-sm h-11 border-border/50 shadow-sm hover:border-primary/40 transition-colors" aria-label={t("aria.selectType", "Select property type")}>
                            <SelectValue placeholder={t("placeholders.selectType", "Select type")} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="apartment">{t("propertyTypes.apartment", "Apartment")}</SelectItem>
                            <SelectItem value="maisonette">{t("propertyTypes.maisonette", "Maisonette")}</SelectItem>
                            <SelectItem value="commercial">{t("propertyTypes.commercial", "Commercial")}</SelectItem>
                            <SelectItem value="land">{t("propertyTypes.land", "Land")}</SelectItem>
                            <SelectItem value="rental">{t("propertyTypes.rental", "Rental Services")}</SelectItem>
                          </SelectContent>
                        </Select>
                      </FieldCard>
                    </div>

                    {/* Row 2: Price Range */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <FieldCard>
                        <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                          <Building2 className="h-4.5 w-4.5 text-primary shrink-0" aria-hidden="true" />
                          <span>{t("labels.minPrice", "Min price")}</span>
                        </div>
                        <div className="relative">
                          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-semibold">
                            €
                          </span>
                          <Input
                            inputMode="numeric"
                            pattern="[0-9]*"
                            type="text"
                            value={minPrice}
                            onChange={(e) =>
                              setMinPrice(e.target.value.replace(/[^\d]/g, ""))
                            }
                            placeholder={t("placeholders.minPrice", "e.g. 100,000")}
                            aria-label={t("aria.minPrice", "Minimum price")}
                            className="pl-7 bg-white backdrop-blur-sm rounded-xl text-sm h-11 border-border/50 shadow-sm hover:border-primary/40 transition-colors"
                          />
                        </div>
                      </FieldCard>

                      <FieldCard>
                        <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                          <Building2 className="h-4.5 w-4.5 text-primary shrink-0" aria-hidden="true" />
                          <span>{t("labels.maxPrice", "Max price")}</span>
                        </div>
                        <div className="relative">
                          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-semibold">
                            €
                          </span>
                          <Input
                            inputMode="numeric"
                            pattern="[0-9]*"
                            type="text"
                            value={maxPrice}
                            onChange={(e) =>
                              setMaxPrice(e.target.value.replace(/[^\d]/g, ""))
                            }
                            placeholder={t("placeholders.maxPrice", "e.g. 350,000")}
                            aria-label={t("aria.maxPrice", "Maximum price")}
                            className="pl-7 bg-white backdrop-blur-sm rounded-xl text-sm h-11 border-border/50 shadow-sm hover:border-primary/40 transition-colors"
                          />
                        </div>
                      </FieldCard>
                    </div>

                    {/* Row 3: Beds & Buttons */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <FieldCard>
                        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-foreground">
                          <Bed className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                          <span className="hidden sm:inline">{t("labels.bedrooms", "Bedrooms")}</span>
                          <span className="sm:hidden">Beds</span>
                        </div>
                        <Select onValueChange={setBeds} value={beds}>
                          <SelectTrigger className="bg-white backdrop-blur-sm rounded-xl text-sm h-11 border-border/50 shadow-sm hover:border-primary/40 transition-colors" aria-label={t("aria.selectBedrooms", "Select bedrooms")}>
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

                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleMoreFilters}
                        className="h-auto py-4 justify-center bg-white/95 backdrop-blur-sm rounded-xl text-sm border-border/50 hover:bg-white hover:border-primary/60 transition-all shadow-sm hover:shadow-md"
                        aria-label={t("aria.moreFilters", "Open more filters")}
                      >
                        <SlidersHorizontal className="mr-2 h-4 w-4" aria-hidden="true" />
                        <span className="hidden sm:inline">Filters</span>
                        <span className="sm:hidden">More</span>
                      </Button>

                      <Button
                        type="button"
                        variant="ghost"
                        onClick={handleClear}
                        className="h-auto py-4 justify-center rounded-xl text-sm hover:bg-white/70 transition-all"
                        aria-label={t("actions.clearFilters", "Clear filters")}
                      >
                        <span className="hidden sm:inline">Clear</span>
                        <span className="sm:hidden">Clear</span>
                      </Button>

                      <Button
                        type="submit"
                        className={cn(
                          "h-auto py-4 justify-center rounded-xl text-sm font-bold",
                          "bg-primary text-primary-foreground hover:bg-primary/90",
                          "shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105",
                          "ring-2 ring-primary/30 hover:ring-primary/50"
                        )}
                        disabled={loading}
                        aria-label={t("aria.searchProperties", "Search properties")}
                      >
                        <SearchCheck className="mr-2 h-4.5 w-4.5" aria-hidden="true" />
                        Search
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Right: Featured Property */}
            <div className="w-full">
              <Card className="overflow-hidden bg-white/95 backdrop-blur-2xl border-white/80 shadow-2xl ring-1 ring-black/10 hover:shadow-3xl transition-shadow duration-300">
                <div className="relative w-full aspect-[16/10] overflow-hidden group">
                  <Image
                    src={featured.imageUrl}
                    alt={featured.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute left-4 right-4 sm:left-5 sm:right-5 bottom-4 sm:bottom-5 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                    <div className="min-w-0 w-full sm:w-auto">
                      <div className="inline-block rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-base sm:text-lg font-bold shadow-xl ring-2 ring-white/30">
                        {featured.price}
                      </div>
                      <h3 className="mt-3 text-xl sm:text-2xl md:text-3xl font-heading font-bold text-white drop-shadow-2xl leading-tight">
                        {featured.title}
                      </h3>
                      <p className="text-sm sm:text-base text-white/95 flex items-center gap-2 mt-2 drop-shadow-lg font-medium">
                        <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span className="truncate">{featured.address}</span>
                      </p>
                    </div>
                    <div className="hidden md:flex items-center gap-4 rounded-full bg-white/95 backdrop-blur-sm px-5 py-3 shadow-xl shrink-0">
                      <span className="text-sm font-bold text-foreground flex items-center gap-1.5">
                        <Bed className="h-4.5 w-4.5 text-primary" aria-hidden="true" />
                        {featured.beds} {t("labels.bed", "bd")}
                      </span>
                      <span className="text-sm text-foreground/60">•</span>
                      <span className="text-sm font-bold text-foreground">{featured.baths} {t("labels.bath", "ba")}</span>
                      <span className="text-sm text-foreground/60">•</span>
                      <span className="text-sm font-bold text-foreground flex items-center gap-1.5">
                        <LandPlot className="h-4.5 w-4.5 text-primary" aria-hidden="true" />
                        {featured.sqft.toLocaleString()} {t("labels.area", "m²")}
                      </span>
                    </div>
                  </div>
                </div>

                <CardContent className="pt-5 px-5 sm:px-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <Avatar className="h-12 w-12 ring-2 ring-primary/40 shadow-lg shrink-0">
                        <AvatarImage src={featured.agent.avatarUrl} alt={featured.agent.name} />
                        <AvatarFallback className="text-sm bg-primary/20 text-primary font-bold">
                          {featured.agent.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="font-bold leading-none text-base truncate text-foreground">{featured.agent.name}</p>
                        <p className="text-sm text-foreground/70 mt-1.5 truncate font-medium">
                          {featured.agent.title ?? t("labels.agent", "Listing Agent")}
                        </p>
                      </div>
                    </div>
                    <div className="w-full sm:w-auto">
                      <Button
                        onClick={handleTourRequest}
                        className={cn(
                          "w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90",
                          "rounded-xl shadow-lg hover:shadow-xl text-base h-12 px-6 font-bold",
                          "transition-all duration-300 hover:scale-105",
                          "ring-2 ring-primary/30 hover:ring-primary/50"
                        )}
                      >
                        {t("actions.requestTour", "Request a tour")}
                      </Button>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="pt-0 px-5 sm:px-6 pb-5">
                  <div className="flex w-full items-center justify-between text-sm text-foreground/70 gap-2 font-semibold">
                    <span className="truncate">
                      {featured.beds} {t("labels.bed", "bd")} • {featured.baths} {t("labels.bath", "ba")} •{" "}
                      {featured.sqft.toLocaleString()} {t("labels.area", "m²")}
                    </span>
                    <span className="shrink-0 text-xs text-foreground/50 font-medium">ID: ATH-{featured.sqft}-{featured.beds}</span>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FieldCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border/40 bg-white/80 backdrop-blur-sm px-3 py-2.5 transition-all focus-within:ring-2 focus-within:ring-primary/60 focus-within:border-primary/50 shadow-sm hover:shadow-md">
      {children}
    </div>
  )
}