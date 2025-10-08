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
        "w-full bg-background text-foreground",
        "rounded-none",
        className
      )}
      style={style}
      aria-labelledby="hero-heading"
    >
      <div className="w-full max-w-full">
        <div className="w-full max-w-full space-y-6 sm:space-y-8">
          <header className="w-full max-w-full">
            <h1
              id="hero-heading"
              className={cn(
                "font-heading tracking-tight",
                "text-3xl sm:text-4xl md:text-5xl lg:text-6xl",
                "text-foreground"
              )}
            >
              {t("hero.title", "Real estate for living and investments")}
            </h1>
            <p className="mt-3 text-muted-foreground text-sm sm:text-base max-w-prose">
              {t(
                "hero.subtitle",
                "Discover properties across Greece. Buy, sell, or rent with trusted local expertise."
              )}
            </p>
          </header>

          <div className="grid gap-6 md:gap-8 md:grid-cols-2 w-full max-w-full">
            {/* Left: Search Panel */}
            <div className="w-full max-w-full min-w-0">
              <Card className="bg-popover border-border shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg sm:text-xl">{t("hero.search.title", "Find your next home")}</CardTitle>
                  <CardDescription>{t("hero.search.subtitle", "Search by location, price, and more")}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <form
                    onSubmit={handleSearch}
                    className="w-full max-w-full space-y-3 sm:space-y-4"
                    aria-label={t("aria.searchForm", "Property search form")}
                  >
                    {/* Row 1: Location & Property Type */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <FieldCard>
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <MapPin className="h-4 w-4 text-foreground/80" aria-hidden="true" />
                          <span>{t("labels.location", "Location")}</span>
                        </div>
                        <Select onValueChange={setLocation} value={location}>
                          <SelectTrigger
                            className="bg-popover"
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
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <House className="h-4 w-4 text-foreground/80" aria-hidden="true" />
                          <span>{t("labels.propertyType", "Property type")}</span>
                        </div>
                        <Select onValueChange={setType} value={type}>
                          <SelectTrigger className="bg-popover" aria-label={t("aria.selectType", "Select property type")}>
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <FieldCard>
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Building2 className="h-4 w-4 text-foreground/80" aria-hidden="true" />
                          <span>{t("labels.minPrice", "Min price")}</span>
                        </div>
                        <div className="relative">
                          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
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
                            className="pl-7 bg-popover"
                          />
                        </div>
                      </FieldCard>

                      <FieldCard>
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Building2 className="h-4 w-4 text-foreground/80" aria-hidden="true" />
                          <span>{t("labels.maxPrice", "Max price")}</span>
                        </div>
                        <div className="relative">
                          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
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
                            className="pl-7 bg-popover"
                          />
                        </div>
                      </FieldCard>
                    </div>

                    {/* Row 3: Beds, More, Search */}
                    <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 sm:gap-4">
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 sm:gap-4">
                        <FieldCard>
                          <div className="flex items-center gap-2 text-sm font-medium">
                            <Bed className="h-4 w-4 text-foreground/80" aria-hidden="true" />
                            <span>{t("labels.bedrooms", "Bedrooms")}</span>
                          </div>
                          <Select onValueChange={setBeds} value={beds}>
                            <SelectTrigger className="bg-popover" aria-label={t("aria.selectBedrooms", "Select bedrooms")}>
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
                          className="h-auto py-3 justify-center bg-popover"
                          aria-label={t("aria.moreFilters", "Open more filters")}
                        >
                          <SlidersHorizontal className="mr-2 h-4 w-4" aria-hidden="true" />
                          {t("actions.more", "More")}
                        </Button>

                        <Button
                          type="button"
                          variant="ghost"
                          onClick={handleClear}
                          className="h-auto py-3 justify-center"
                          aria-label={t("actions.clearFilters", "Clear filters")}
                        >
                          {t("actions.clearFilters", "Clear filters")}
                        </Button>

                        <Button
                          type="submit"
                          className={cn(
                            "h-auto py-3 justify-center",
                            "bg-primary text-primary-foreground hover:opacity-90"
                          )}
                          disabled={loading}
                          aria-label={t("aria.searchProperties", "Search properties")}
                        >
                          <SearchCheck className="mr-2 h-4 w-4" aria-hidden="true" />
                          {t("actions.search", "Search")}
                        </Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Right: Featured Property */}
            <div className="w-full max-w-full min-w-0">
              <Card className="overflow-hidden bg-popover border-border shadow-sm">
                <div className="relative w-full aspect-[16/10] overflow-hidden">
                  <Image
                    src={featured.imageUrl}
                    alt={featured.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                  <div className="absolute left-4 right-4 bottom-4 flex items-end justify-between gap-4">
                    <div className="min-w-0">
                      <div className="inline-block rounded-full bg-background/80 backdrop-blur px-3 py-1 text-sm font-medium text-foreground">
                        {featured.price}
                      </div>
                      <h3 className="mt-2 text-lg sm:text-xl font-heading text-foreground drop-shadow">
                        {featured.title}
                      </h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" aria-hidden="true" />
                        <span className="truncate">{featured.address}</span>
                      </p>
                    </div>
                    <div className="hidden sm:flex items-center gap-4 rounded-full bg-background/80 backdrop-blur px-3 py-2">
                      <span className="text-sm text-foreground/90 flex items-center gap-1">
                        <Bed className="h-4 w-4" aria-hidden="true" />
                        {featured.beds} {t("labels.bed", "bd")}
                      </span>
                      <span className="text-sm text-foreground/90">• {featured.baths} {t("labels.bath", "ba")}</span>
                      <span className="text-sm text-foreground/90 flex items-center gap-1">
                        <LandPlot className="h-4 w-4" aria-hidden="true" />
                        {featured.sqft.toLocaleString()} {t("labels.area", "m²")}
                      </span>
                    </div>
                  </div>
                </div>

                <CardContent className="pt-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <Avatar className="h-10 w-10 ring-1 ring-border">
                        <AvatarImage src={featured.agent.avatarUrl} alt={featured.agent.name} />
                        <AvatarFallback>
                          {featured.agent.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="font-medium leading-none">{featured.agent.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {featured.agent.title ?? t("labels.agent", "Listing Agent")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <Button
                        onClick={handleTourRequest}
                        className="w-full sm:w-auto bg-primary text-primary-foreground hover:opacity-90"
                      >
                        {t("actions.requestTour", "Request a tour")}
                      </Button>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="pt-0">
                  <div className="flex w-full items-center justify-between text-sm text-muted-foreground">
                    <span>
                      {featured.beds} {t("labels.bed", "bd")} • {featured.baths} {t("labels.bath", "ba")} •{" "}
                      {featured.sqft.toLocaleString()} {t("labels.area", "m²")}
                    </span>
                    <span>ID: <span className="break-words">ATH-{featured.sqft}-{featured.beds}</span></span>
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
    <div className="rounded-lg border bg-popover px-3 py-2.5 transition-colors focus-within:ring-2 focus-within:ring-ring/80">
      {children}
    </div>
  )
}