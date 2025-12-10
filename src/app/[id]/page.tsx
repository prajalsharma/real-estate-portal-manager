"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { PropertyQueryResult, SanityImage } from "@/lib/sanity/types";
import { client } from "@/lib/sanity/client";
import { safeImageUrl } from "@/lib/sanity/image";
import { getFileAsset } from "@sanity/asset-utils";
import {
  ChevronLeft,
  ChevronRight,
  Bed,
  ShowerHead,
  Proportions,
  Diamond,
  Phone,
  Share2,
  Clipboard,
  Send,
  Mail,
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { MapContainer, TileLayer, Marker, Popup, AttributionControl } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import { useT } from "@/lib/i18n";
import { DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import ContactModal from "@/components/ContactModal";
import { useAppPrefs } from "@/lib/prefs-context";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useRates } from "@/lib/hooks/use-rates";
import { formatter } from "@/lib/priceFormatter";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/lib/hooks/use-translation";

export default function PropertyDetailsPage() {
  const pathname = usePathname();
  const propertySlug = pathname.split("/").pop();
  const { currency, language } = useAppPrefs();
  const { convert, loading: ratesLoading, rates } = useRates();

  const [property, setProperty] = useState<PropertyQueryResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [contactDetails, setContactDetails] = useState({ name: "", email: "", message: "" });
  const [formErrors, setFormErrors] = useState({ name: false, email: false, message: false });

  // Get current URL for sharing (client-side only)
  const [currentUrl, setCurrentUrl] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const t = useT();

  const inquiryPlaceholder = t("contact.placeholder", "e.g., I'd like to schedule a viewing.");

  // Helper function to translate feature names and status values
  const translateFeature = (featureName: string): string => {
    // Map feature names to translation keys
    const featureMap: Record<string, string> = {
      // Status
      "For Sale": "status.forSale",
      "For Rent": "status.forRent",
      Sold: "status.sold",
      Rented: "status.rented",
      // Interior Features
      "Internal staircase": "features.internalStaircase",
      "Air conditioning": "features.airConditioning",
      "Solar water heater": "features.solarWaterHeater",
      "Security door": "features.securityDoor",
      "Double glassboard": "features.doubleGlassboard",
      Sites: "features.sites",
      Bright: "features.bright",
      Diaspora: "features.diaspora",
      Stained: "features.stained",
      "Asan elevator": "features.asanElevator",
      Furnished: "features.furnished",
      Fireplace: "features.fireplace",
      "Intra-deposits heating": "features.intraDepositsHeating",
      "Night current": "features.nightCurrent",
      Warehouse: "features.warehouse",
      Sofa: "features.sofa",
      Playroom: "features.playroom",
      "Satellite antenna": "features.satelliteAntenna",
      Alarm: "features.alarm",
      "Reception with a doorman": "features.receptionWithDoorman",
      "Electric car charging facilities": "features.electricCarCharging",
      Luxurious: "features.luxurious",
      // External Features
      Balcony: "features.balcony",
      "Private Garden": "features.privateGarden",
      "Swimming pool": "features.swimmingPool",
      Careful: "features.careful",
      Parking: "features.parking",
      Tentes: "features.tentes",
      "Built-in BBQ": "features.builtInBBQ",
      View: "features.view",
      "Access for America": "features.accessForAmerica",
      Corner: "features.corner",
      // Construction Features
      "Semi-finished": "features.semiFinished",
      "Ceiling apartment": "features.ceilingApartment",
      Renovated: "features.renovated",
      "It swells renovation": "features.itSwellsRenovation",
      Neoclassic: "features.neoclassic",
      Maintain: "features.maintain",
      Subzafos: "features.subzafos",
      "Need renovation": "features.needRenovation",
      "Under construction": "features.underConstruction",
      // Suitable For
      Holiday: "suitableFor.holiday",
      Investment: "suitableFor.investment",
      "Tourist rental": "suitableFor.touristRental",
      Student: "suitableFor.student",
      "Professional use": "suitableFor.professionalUse",
      Clinic: "suitableFor.clinic",
      // Property Types
      Apartment: "propertyTypes.apartment",
      Maisonette: "propertyTypes.maisonette",
      Commercial: "propertyTypes.commercial",
      Land: "propertyTypes.land",
      "Rental Service": "propertyTypes.rental",
      Building: "propertyTypes.building",
      Hotel: "propertyTypes.hotel",
      Complex: "propertyTypes.complex",
    };

    const translationKey = featureMap[featureName];
    if (translationKey) {
      return t(translationKey, featureName);
    }
    // Fallback to original if no translation found
    return featureName;
  };

  // Translate property description based on selected language
  const { translatedText: translatedDescription, loading: translationLoading } = useTranslation(
    property?.description || null,
    language
  );

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const agentPhone = property?.agent?.phone || "";
  const cleanPhone = agentPhone.replace(/[^0-9]/g, "");

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = {
      name: !contactDetails.name.trim(),
      email: !validateEmail(contactDetails.email),
      message: !contactDetails.message.trim(),
    };

    setFormErrors(errors);

    if (Object.values(errors).some((error) => error)) {
      return;
    }

    if (!agentPhone) {
      alert("Agent phone number not available");
      return;
    }

    const text = `
        Name: ${contactDetails.name} \n
        Email: ${contactDetails.email} \n
        Property: ${property?.title} \n
        Message: ${contactDetails.message}`;

    const encodedText = encodeURIComponent(text);

    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedText}`;

    if (typeof window !== "undefined") {
      window.open(whatsappUrl, "_blank");
    }

    setContactDetails({ name: "", email: "", message: "" });
    setFormErrors({ name: false, email: false, message: false });
  };

  const priceDisplay = useMemo(() => {
    if (!property) return null;
    const priceInEur = property.price || 0;

    const shouldConvert = !ratesLoading && rates && currency !== "eur";
    const convertedPrice = shouldConvert ? convert(priceInEur, currency) : priceInEur;

    if (shouldConvert || currency !== "eur") {
      return formatter(language, currency)
        .format(convertedPrice)
        .replace(/(\p{Sc})\s?/u, "$1\u00A0");
    }

    // Fallback to EUR formatting
    return `€${priceInEur.toLocaleString()}`;
  }, [property, convert, currency, language, ratesLoading, rates]);

  const pricePerSqftDisplay = useMemo(() => {
    if (!property || !property.sqft || property.sqft <= 0) return null;
    const priceInEur = property.price || 0;

    // Convert price if rates are loaded and currency is not EUR
    const shouldConvert = !ratesLoading && rates && currency !== "eur";
    const convertedPrice = shouldConvert ? convert(priceInEur, currency) : priceInEur;
    const pricePerSqft = convertedPrice / property.sqft;

    // Format price per sqft with currency symbol
    if (shouldConvert || currency !== "eur") {
      return formatter(language, currency)
        .format(pricePerSqft)
        .replace(/(\p{Sc})\s?/u, "$1\u00A0");
    }

    // Fallback to EUR formatting
    return `€${Math.round(priceInEur / property.sqft).toLocaleString()}`;
  }, [property, convert, currency, language, ratesLoading, rates]);

  const allMedia = property
    ? [
        ...(property.mainImage ? [{ type: "image", ...property.mainImage }] : []),
        ...(property.images || []).map((img) => ({ type: "image", ...img })),
        ...(property.videos || []).map((video: any) => ({
          type: "video",
          ...(video as any),
          asset: {
            ...video.asset,
            url: getFileAsset(video.asset, client.config()).url,
          },
        })),
      ]
    : [];

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allMedia.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
  };

  useEffect(() => {
    async function fetchPropertyBySlug() {
      if (!propertySlug) {
        setError("No property slug provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const query = `*[_type == "property" && slug.current == $slug][0] {
          _id,
          title,
          slug,
          description,
          price,
          currency,
          bedrooms,
          bathrooms,
          livingRooms,
          kitchens,
          sqft,
          propertyType,
          status,
          featured,
          address {
            street,
            city,
            region,
            postalCode,
            country
          },
          latitude,
          longitude,
          mainImage {
            asset,
            alt
          },
          images[] {
            asset,
            alt
          },
          videos[] {
            asset,
            alt
          },
          interiorFeatures,
          externalFeatures,
          construction,
          suitableFor,
          features[] {
            _key,
            title
          },
          amenities[] {
            _key,
            title
          },
          yearBuilt,
          lotSize,
          agent-> {
            _id,
            name,
            role,
            rating,
            sold,
            email,
            phone,
            avatar {
              asset->{
                _id,
                url
              },
              alt
            },
            bio,
            specializations,
            languages
          },
          publishedAt,
          _createdAt,
          _updatedAt
        }`;

        const result = await client.fetch(query, { slug: propertySlug });

        console.log("Fetched property:", result);

        if (!result) {
          setError("Property not found");
        } else {
          setProperty(result);
        }
      } catch (err) {
        console.error("Error fetching property:", err);
        setError("Failed to load property details");
      } finally {
        setLoading(false);
      }
    }

    fetchPropertyBySlug();
  }, [propertySlug]);

  if (loading) {
    return (
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-64 mb-4"></div>
            <div className="h-4 bg-muted rounded w-96 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="h-64 bg-muted rounded"></div>
              <div className="space-y-4">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !property) {
    return (
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl">
          <h1 className="text-3xl font-bold mb-4 text-destructive">{t("property.notFound")}</h1>
          <p className="text-muted-foreground">
            {error || `The property with slug "${propertySlug}" could not be found.`}
          </p>
          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                window.history.back();
              }
            }}
            className="mt-4 px-4 py-2 bg-gold text-white rounded hover:bg-gold/90">
            {t("property.goBack")}
          </button>
        </div>
      </section>
    );
  }

  const updatedAt = new Date(property._updatedAt);

  return (
    <>
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl">
          <div className="flex flex-col gap-8">
            <div className="space-y-4">
              {allMedia.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-4 grid-rows-[175px_175px] gap-2">
                  <div className="col-span-2 row-span-2 relative">
                    {allMedia[0]?.type === "video" ? (
                      <div className="relative size-full">
                        <video
                          className="size-full object-cover rounded-md cursor-pointer"
                          onClick={() => openModal(0)}
                          muted
                          loop>
                          <source src={allMedia[0]?.asset?.url} type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-md cursor-pointer hover:bg-black/30 transition-colors pointer-events-none">
                          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                            <div className="w-0 h-0 border-l-12 border-l-black border-t-8 border-t-transparent border-b-8 border-b-transparent ml-1"></div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={
                          safeImageUrl(allMedia[0] as SanityImage) ||
                          "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=400&h=300&q=80"
                        }
                        alt={allMedia[0]?.alt || property.title}
                        className="size-full object-cover rounded-md cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => openModal(0)}
                      />
                    )}
                  </div>
                  <div className="grid grid-cols-4 gap-3 lg:grid-cols-subgrid lg:col-span-2 lg:row-span-2">
                    {allMedia.slice(1, 5).map((media, index) => (
                      <div key={index + 1} className="relative">
                        {media.type === "video" ? (
                          <div className="relative size-full">
                            <video
                              className="size-full aspect-video object-cover rounded cursor-pointer"
                              onClick={() => openModal(index + 1)}
                              muted>
                              <source src={media.asset?.url} type="video/mp4" />
                            </video>
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-md cursor-pointer hover:bg-black/30 transition-colors pointer-events-none">
                              <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                                <div className="w-0 h-0 border-l-6 border-l-black border-t-4 border-t-transparent border-b-4 border-b-transparent ml-0.5"></div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <img
                            src={
                              safeImageUrl(media as SanityImage) ||
                              "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=400&h=300&q=80"
                            }
                            alt={media?.alt || `${property.title} - Image ${index + 2}`}
                            className="size-full aspect-video object-cover rounded cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => openModal(index + 1)}
                          />
                        )}

                        {index === 3 && allMedia.length > 5 && (
                          <div
                            className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer hover:bg-opacity-70 rounded-lg hover:bg-black/60 transition-colors"
                            onClick={() => openModal(index + 1)}>
                            <span className="text-white font-semibold text-xs md:text-lg">
                              +{allMedia.length - 5} more
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_325px] gap-8 relative">
              <div>
                <div className="flex justify-between items-center">
                  <h1 className="text-5xl font-light mb-2 hero-heading">{property.title}</h1>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="cursor-pointer p-2 rounded-md  hover:bg-white transition-colors ">
                        <Share2 className="size-8 text-gold" />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl p-0">
                      <DialogTitle className="sr-only">Share the property</DialogTitle>
                      <div className="p-6">
                        <h2 className="text-xl font-semibold mb-6">{t("property.share")}</h2>
                        <div className="mb-6">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t("property.propertyLink")}
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={currentUrl}
                              readOnly
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm"
                            />
                            <button
                              onClick={() => {
                                if (
                                  typeof window !== "undefined" &&
                                  typeof navigator !== "undefined"
                                ) {
                                  navigator.clipboard.writeText(currentUrl);
                                }
                              }}
                              className="px-4 py-2 bg-gold text-white rounded hover:bg-gold/80 transition-colors text-sm font-medium">
                              <Clipboard className="size-4" aria-hidden="true" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <Link
                            href={`https://wa.me/?text=Check out this property: ${property.title} - ${currentUrl || ""}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-4 py-2 border border-gray-200 rounded-sm transition-colors hover:bg-gray-200">
                            <div className="size-8">
                              <img src="/whatsapp.svg" alt="WhatsApp" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">WhatsApp</h3>
                            </div>
                          </Link>

                          <Link
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl || "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-4 py-2 border border-gray-200 rounded-sm transition-colors hover:bg-gray-200">
                            <div className="size-8">
                              <img src="/facebook.svg" alt="Facebook" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">Facebook</h3>
                            </div>
                          </Link>

                          <Link
                            href={`https://twitter.com/intent/tweet?text=Check out this property: ${property.title}&url=${encodeURIComponent(currentUrl || "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 px-5 py-2 border border-gray-200 rounded-sm transition-colors hover:bg-gray-200">
                            <div className="size-6">
                              <img src="/twitter.svg" alt="Twitter" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">Twitter</h3>
                            </div>
                          </Link>

                          <Link
                            href={`mailto:?subject=Property: ${property.title}&body=I found this property that might interest you: ${currentUrl || ""}`}
                            className="flex items-center gap-3 px-4 py-2 border border-gray-200 rounded-sm hover:bg-gray-200 transition-colors">
                            <div className="size-8 rounded-full flex items-center justify-center">
                              <Mail className="text-black size-full" aria-hidden="true" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">Email</h3>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="mb-4">
                  <address className="not-italic flex flex-col gap-2">
                    <span>
                      {property.address.street}, {property.address?.city}
                    </span>
                    <span className="font-medium text-lg mt-1">
                      {property.address?.region}, {property.address?.postalCode}
                    </span>
                  </address>
                </div>
                <div>
                  {priceDisplay && (
                    <p className="text-3xl text-black font-semibold mb-1.5">{priceDisplay}</p>
                  )}
                  <div className="flex flex-wrap items-center gap-5 text-lg text-black">
                    <div className="flex items-center gap-1.5">
                      <Bed className="size-8 text-gold" aria-hidden="true" />
                      <span className="font-medium">{property.bedrooms}</span>
                      <span className="text-black">{t("labels.bed")}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ShowerHead className="size-8 text-gold" aria-hidden="true" />
                      <span className="font-medium">{property.bathrooms}</span>
                      <span className="text-black">{t("labels.bath")}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Proportions className="size-8 text-gold" aria-hidden="true" />
                      <span className="font-medium">{property.sqft}</span>
                      <span className="text-black">{t("labels.area")}</span>
                    </div>
                  </div>
                </div>
                {(translatedDescription || property.description) && (
                  <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-3">{t("property.description")}</h2>
                    {translationLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gold"></div>
                        <p className="text-gray-500 text-sm">{t("property.translating")}</p>
                      </div>
                    ) : (
                      <p className="text-gray-700 leading-relaxed">
                        {translatedDescription || property.description}
                      </p>
                    )}
                  </div>
                )}

                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-6">{t("property.features")}</h2>
                  <div className="bg-gray-50 rounded-lg border">
                    <div className="grid">
                      {priceDisplay && (
                        <FeatureDetail label={t("property.price")} value={priceDisplay} />
                      )}
                      {pricePerSqftDisplay && (
                        <FeatureDetail
                          label={t("property.pricePerSqM")}
                          value={pricePerSqftDisplay}
                        />
                      )}
                      <FeatureDetail label={t("property.area")} value={`${property.sqft} sq.m.`} />
                      {property.lotSize !== null &&
                        property.lotSize !== undefined &&
                        property.lotSize > 0 && (
                          <FeatureDetail
                            label={t("property.plotSize")}
                            value={`${property.lotSize} sq.m.`}
                          />
                        )}
                      <FeatureDetail
                        label={t("property.propertyType")}
                        value={translateFeature(property.propertyType)}
                      />
                      <FeatureDetail label={t("property.bedrooms")} value={property.bedrooms} />
                      <FeatureDetail label={t("property.bathrooms")} value={property.bathrooms} />
                      <FeatureDetail
                        label={t("property.livingRooms")}
                        value={property.livingRooms}
                      />
                      <FeatureDetail label={t("property.kitchens")} value={property.kitchens} />
                      {property.yearBuilt ? (
                        <FeatureDetail label={t("property.yearBuilt")} value={property.yearBuilt} />
                      ) : (
                        <FeatureDetail
                          label={t("property.yearBuilt")}
                          value={t("property.underConstruction")}
                        />
                      )}
                      <FeatureDetail
                        label={t("property.status")}
                        value={translateFeature(property.status)}
                      />
                      <FeatureDetail
                        label={t("property.lastUpdated")}
                        value={updatedAt.toLocaleDateString("en-GB", {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                        })}
                      />
                    </div>
                  </div>
                </div>

                <FeatureBlock
                  title={t("property.interior")}
                  items={property.interiorFeatures || []}
                  translateFeature={translateFeature}
                />
                <FeatureBlock
                  title={t("property.externalFeatures")}
                  items={property.externalFeatures || []}
                  translateFeature={translateFeature}
                />
                <FeatureBlock
                  title={t("property.construction")}
                  items={property.construction || []}
                  translateFeature={translateFeature}
                />
                <FeatureBlock
                  title={t("property.suitableFor")}
                  items={property.suitableFor || []}
                  translateFeature={translateFeature}
                />

                <div className="mt-8">
                  <h2 className="text-xl font-semibold">{t("property.location")}</h2>
                  <div className="mb-4">
                    <address className="not-italic flex flex-col text-base">
                      <span>
                        {property.address.street}, {property.address?.city}
                      </span>
                      <span className="font-medium text-lg">
                        {property.address?.region}, {property.address?.postalCode}
                      </span>
                    </address>
                  </div>

                  {property.latitude && property.longitude && (
                    <div className="mt-2 relative h-[420px]">
                      <MapContainer
                        center={[property.latitude, property.longitude]}
                        zoom={14}
                        scrollWheelZoom={false}
                        className="h-full w-full z-10"
                        attributionControl={false}>
                        <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <AttributionControl position="bottomright" prefix={false} />
                        <Marker
                          position={
                            property.latitude && property.longitude
                              ? [property.latitude, property.longitude]
                              : [51.505, -0.09]
                          }
                          icon={
                            new Icon({
                              iconUrl:
                                typeof markerIconPng === "string"
                                  ? markerIconPng
                                  : markerIconPng.src,
                              iconSize: [25, 41],
                              iconAnchor: [12, 41],
                              popupAnchor: [0, -41],
                            })
                          }>
                          <Popup>
                            {property.title},{property.address?.city}
                          </Popup>
                        </Marker>
                      </MapContainer>
                    </div>
                  )}
                </div>
              </div>

              <div className="h-full">
                <form
                  onSubmit={handleWhatsAppSubmit}
                  className="sticky top-20 bg-white px-4 py-6 border rounded-lg shadow-lg">
                  <h2 className="text-xl font-semibold mb-3">{t("property.interested")}</h2>
                  <div className="mb-4">
                    <Label htmlFor="name" className="mb-0.5">
                      {t("contact.name")}
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      className={`rounded-sm ${formErrors.name ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                      required
                      value={contactDetails.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setContactDetails({ ...contactDetails, name: e.target.value });
                        setFormErrors({ ...formErrors, name: false });
                      }}
                    />
                    {formErrors.name && (
                      <p className="text-red-500 text-xs mt-1">{t("contact.nameRequired")}</p>
                    )}
                    <Label htmlFor="email" className="mt-4 mb-0.5">
                      {t("contact.email")}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      className={`rounded-sm ${formErrors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                      value={contactDetails.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setContactDetails({ ...contactDetails, email: e.target.value });
                        setFormErrors({ ...formErrors, email: false });
                      }}
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-xs mt-1">{t("contact.emailRequired")}</p>
                    )}
                  </div>
                  <div className="mb-6">
                    <Label htmlFor="sidebar-message" className="mb-0.5">
                      {t("contact.message")}
                    </Label>
                    <Textarea
                      id="sidebar-message"
                      className={`w-full text-sm bg-white ${formErrors.message ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                      rows={4}
                      placeholder={inquiryPlaceholder}
                      value={contactDetails.message}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        setContactDetails({ ...contactDetails, message: e.target.value });
                        setFormErrors({ ...formErrors, message: false });
                      }}
                    />
                    {formErrors.message && (
                      <p className="text-red-500 text-xs mt-1">{t("contact.messageRequired")}</p>
                    )}
                  </div>
                  <div className="space-y-3">
                    <button
                      type="submit"
                      className="w-full bg-gold hover:bg-gold/80 text-white font-semibold py-3 px-4 rounded transition-colors cursor-pointer flex items-center justify-center gap-2">
                      <span className="flex gap-2 items-center">
                        <img src="/whatsapp.svg" alt="" className="size-6 invert-100" />{" "}
                        {t("contact.sendWhatsApp")}
                      </span>
                    </button>
                    <a
                      href={`https://wa.me/${cleanPhone}`}
                      target="_blank"
                      className="w-full bg-white hover:bg-gray-200 text-gray-800 font-semibold py-3 px-4 rounded transition-colors cursor-pointer flex items-center justify-center gap-2 border border-gray-300">
                      <Phone className="size-4 text-gold" />
                      <span>{t("contact.callUs")}</span>
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="min-w-[70vw] h-[90vh] max-h-[90vh] p-0 bg-black">
          <DialogTitle className="sr-only">Media Gallery</DialogTitle>
          <div className="relative w-full h-full flex items-center justify-center">
            {allMedia.length > 1 && (
              <button
                onClick={prevImage}
                className="absolute left-4 z-20 p-2 bg-white bg-opacity-50 text-black rounded-full hover:bg-opacity-70 transition-colors cursor-pointer">
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}

            {allMedia[currentImageIndex] && (
              <>
                {allMedia[currentImageIndex]?.type === "video" ? (
                  <video
                    className="w-full h-full aspect-video object-contain rounded-lg"
                    controls
                    autoPlay={false}>
                    <source src={allMedia[currentImageIndex]?.asset?.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={
                      safeImageUrl(allMedia[currentImageIndex] as SanityImage) ||
                      "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=800&h=600&q=80"
                    }
                    alt={
                      allMedia[currentImageIndex]?.alt ||
                      `${property.title} - Media ${currentImageIndex + 1}`
                    }
                    className="w-full h-full aspect-video object-contain rounded-lg"
                  />
                )}
              </>
            )}

            {allMedia.length > 1 && (
              <button
                onClick={nextImage}
                className="absolute right-4 z-20 p-2 bg-white bg-opacity-50 text-black rounded-full hover:bg-opacity-70 transition-colors cursor-pointer">
                <ChevronRight className="h-6 w-6" />
              </button>
            )}
          </div>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/80 bg-opacity-50 text-white px-4  rounded-full text-sm ">
            {currentImageIndex + 1} / {allMedia.length}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function FeatureDetail({ label, value }: { label: string; value: string | number }) {
  if (value === null || value === undefined) return null;
  return (
    <div className="flex items-center border-b border-gray-200 gap-2 font-medium">
      <span className="text-gray-700 bg-gray-200/30 basis-1/3 md:basis-1/4 p-3">{label}</span>
      <span className="p-3">{value}</span>
    </div>
  );
}

function FeatureBlock({
  title,
  items,
  translateFeature,
}: {
  title: string;
  items: string[];
  translateFeature: (feature: string) => string;
}) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((feature, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 rounded py-2 ${title.includes("Suitable") ? "border border-gray-300 justify-center" : ""}`}>
            {!title.includes("Suitable") && <Diamond className="size-5 text-gold shrink-0" />}
            <span className="text-gray-700">{translateFeature(feature)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
