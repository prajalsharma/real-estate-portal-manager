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
        "min-h-[600px] sm:min-h-[700px] md:min-h-[800px]",
        "rounded-none",
        className
      )}
      style={style}
      aria-labelledby="hero-heading"
    >
      {/* Video Background - Optimized for all devices */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover scale-105"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        >
          <source
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/7672d653-a252-41ab-b1dd-956072cf2f23/generated_videos/cinematic-slow-aerial-drone-footage-of-h-60b08bb3-20251008131617.mp4"
            type="video/mp4"
          />
        </video>
        {/* Enhanced gradient overlay - stronger on mobile for better readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/85 to-background/90 sm:from-background/90 sm:via-background/80 sm:to-background/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-primary/10" />
      </div>

      {/* Content - Mobile-optimized padding and spacing */}
      <div className="relative z-10 w-full max-w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="w-full max-w-full space-y-6 sm:space-y-8">
          <header className="w-full max-w-full">
            <h1
              id="hero-heading"
              className={cn(
                "font-heading tracking-tight leading-tight",
                "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl",
                "text-foreground drop-shadow-md mb-3 sm:mb-4"
              )}
            >
              {t("hero.title", "Real estate for living and investments")}
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-prose drop-shadow-sm leading-relaxed">
              {t(
                "hero.subtitle",
                "Discover properties across Greece. Buy, sell, or rent with trusted local expertise."
              )}
            </p>
          </header>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 w-full max-w-full">
            {/* Left: Search Panel - Mobile optimized */}
            <div className="w-full max-w-full min-w-0">
              <Card className="bg-popover/95 backdrop-blur-md border-border/50 shadow-xl">
                <CardHeader className="pb-3 px-4 sm:px-6">
                  <CardTitle className="text-lg sm:text-xl">{t("hero.search.title", "Find your next home")}</CardTitle>
                  <CardDescription className="text-sm">{t("hero.search.subtitle", "Search by location, price, and more")}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0 px-4 sm:px-6">
                  <form
                    onSubmit={handleSearch}
                    className="w-full max-w-full space-y-3 sm:space-y-4"
                    aria-label={t("aria.searchForm", "Property search form")}
                  >
                    {/* Row 1: Location & Property Type - Stack on small mobile */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                      <FieldCard>
                        <div className="flex items-center gap-2 text-xs sm:text-sm font-medium">
                          <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-foreground/80 shrink-0" aria-hidden="true" />
                          <span>{t("labels.location", "Location")}</span>
                        </div>
                        <Select onValueChange={setLocation} value={location}>
                          <SelectTrigger
                            className="bg-popover/80 backdrop-blur-sm rounded-xl text-sm h-9 sm:h-10"
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
                        <div className="flex items-center gap-2 text-xs sm:text-sm font-medium">
                          <House className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-foreground/80 shrink-0" aria-hidden="true" />
                          <span>{t("labels.propertyType", "Property type")}</span>
                        </div>
                        <Select onValueChange={setType} value={type}>
                          <SelectTrigger className="bg-popover/80 backdrop-blur-sm rounded-xl text-sm h-9 sm:h-10" aria-label={t("aria.selectType", "Select property type")}>
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
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                      <FieldCard>
                        <div className="flex items-center gap-2 text-xs sm:text-sm font-medium">
                          <Building2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-foreground/80 shrink-0" aria-hidden="true" />
                          <span>{t("labels.minPrice", "Min price")}</span>
                        </div>
                        <div className="relative">
                          <span className="pointer-events-none absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-xs sm:text-sm text-muted-foreground">
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
                            className="pl-6 sm:pl-7 bg-popover/80 backdrop-blur-sm rounded-xl text-sm h-9 sm:h-10"
                          />
                        </div>
                      </FieldCard>

                      <FieldCard>
                        <div className="flex items-center gap-2 text-xs sm:text-sm font-medium">
                          <Building2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-foreground/80 shrink-0" aria-hidden="true" />
                          <span>{t("labels.maxPrice", "Max price")}</span>
                        </div>
                        <div className="relative">
                          <span className="pointer-events-none absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-xs sm:text-sm text-muted-foreground">
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
                            className="pl-6 sm:pl-7 bg-popover/80 backdrop-blur-sm rounded-xl text-sm h-9 sm:h-10"
                          />
                        </div>
                      </FieldCard>
                    </div>

                    {/* Row 3: Beds, Buttons - Mobile optimized layout */}
                    <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-1 sm:gap-4">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                        <FieldCard>
                          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium">
                            <Bed className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-foreground/80 shrink-0" aria-hidden="true" />
                            <span>{t("labels.bedrooms", "Bedrooms")}</span>
                          </div>
                          <Select onValueChange={setBeds} value={beds}>
                            <SelectTrigger className="bg-popover/80 backdrop-blur-sm rounded-xl text-sm h-9 sm:h-10" aria-label={t("aria.selectBedrooms", "Select bedrooms")}>
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
                          className="h-auto py-2.5 sm:py-3 justify-center bg-popover/80 backdrop-blur-sm rounded-xl text-xs sm:text-sm"
                          aria-label={t("aria.moreFilters", "Open more filters")}
                        >
                          <SlidersHorizontal className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
                          <span className="hidden sm:inline">{t("actions.more", "More")}</span>
                          <span className="sm:hidden">More</span>
                        </Button>

                        <Button
                          type="button"
                          variant="ghost"
                          onClick={handleClear}
                          className="h-auto py-2.5 sm:py-3 justify-center rounded-xl text-xs sm:text-sm"
                          aria-label={t("actions.clearFilters", "Clear filters")}
                        >
                          <span className="hidden sm:inline">{t("actions.clearFilters", "Clear filters")}</span>
                          <span className="sm:hidden">Clear</span>
                        </Button>

                        <Button
                          type="submit"
                          className={cn(
                            "h-auto py-2.5 sm:py-3 justify-center rounded-xl text-xs sm:text-sm",
                            "bg-primary text-primary-foreground hover:opacity-90 shadow-lg"
                          )}
                          disabled={loading}
                          aria-label={t("aria.searchProperties", "Search properties")}
                        >
                          <SearchCheck className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
                          {t("actions.search", "Search")}
                        </Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Right: Featured Property - Mobile optimized */}
            <div className="w-full max-w-full min-w-0">
              <Card className="overflow-hidden bg-popover/95 backdrop-blur-md border-border/50 shadow-xl">
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/11] overflow-hidden">
                  <Image
                    src={featured.imageUrl}
                    alt={featured.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  <div className="absolute left-3 right-3 sm:left-4 sm:right-4 bottom-3 sm:bottom-4 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 sm:gap-4">
                    <div className="min-w-0 w-full sm:w-auto">
                      <div className="inline-block rounded-full bg-background/95 backdrop-blur-sm px-2.5 py-1 sm:px-3 text-xs sm:text-sm font-medium text-foreground shadow-md">
                        {featured.price}
                      </div>
                      <h3 className="mt-2 text-base sm:text-lg md:text-xl font-heading text-foreground drop-shadow-md leading-tight">
                        {featured.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" aria-hidden="true" />
                        <span className="truncate">{featured.address}</span>
                      </p>
                    </div>
                    <div className="hidden md:flex items-center gap-3 lg:gap-4 rounded-full bg-background/95 backdrop-blur-sm px-3 py-2 shadow-md shrink-0">
                      <span className="text-xs lg:text-sm text-foreground/90 flex items-center gap-1">
                        <Bed className="h-3.5 w-3.5 lg:h-4 lg:w-4" aria-hidden="true" />
                        {featured.beds} {t("labels.bed", "bd")}
                      </span>
                      <span className="text-xs lg:text-sm text-foreground/90">• {featured.baths} {t("labels.bath", "ba")}</span>
                      <span className="text-xs lg:text-sm text-foreground/90 flex items-center gap-1">
                        <LandPlot className="h-3.5 w-3.5 lg:h-4 lg:w-4" aria-hidden="true" />
                        {featured.sqft.toLocaleString()} {t("labels.area", "m²")}
                      </span>
                    </div>
                  </div>
                </div>

                <CardContent className="pt-4 px-4 sm:px-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                      <Avatar className="h-9 w-9 sm:h-10 sm:w-10 ring-2 ring-primary/20 shrink-0">
                        <AvatarImage src={featured.agent.avatarUrl} alt={featured.agent.name} />
                        <AvatarFallback className="text-xs">
                          {featured.agent.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="font-medium leading-none text-sm sm:text-base truncate">{featured.agent.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 sm:mt-1 truncate">
                          {featured.agent.title ?? t("labels.agent", "Listing Agent")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <Button
                        onClick={handleTourRequest}
                        className="w-full sm:w-auto bg-primary text-primary-foreground hover:opacity-90 rounded-xl shadow-lg text-sm sm:text-base h-9 sm:h-10"
                      >
                        {t("actions.requestTour", "Request a tour")}
                      </Button>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="pt-0 px-4 sm:px-6 pb-4">
                  <div className="flex w-full items-center justify-between text-xs sm:text-sm text-muted-foreground gap-2">
                    <span className="truncate">
                      {featured.beds} {t("labels.bed", "bd")} • {featured.baths} {t("labels.bath", "ba")} •{" "}
                      {featured.sqft.toLocaleString()} {t("labels.area", "m²")}
                    </span>
                    <span className="shrink-0 text-xs">ID: ATH-{featured.sqft}-{featured.beds}</span>
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
    <div className="rounded-xl border bg-popover/70 backdrop-blur-sm px-2.5 sm:px-3 py-2 sm:py-2.5 transition-colors focus-within:ring-2 focus-within:ring-ring/80">
      {children}
    </div>
  )
}