"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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

export default function PropertyDetailsPage() {
  const pathname = usePathname();
  const propertySlug = pathname.split("/").pop();
  const { currency, language } = useAppPrefs();

  const [property, setProperty] = useState<PropertyQueryResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const [contactOpen, setContactOpen] = useState(false);
  const [sidebarMessage, setSidebarMessage] = useState("");

  const t = useT();

  const inquiryPlaceholder = t("contact.placeholder", "e.g., I'd like to schedule a viewing.");
  const defaultInquiryMessage = t(
    "contact.defaultMessage",
    "I'm interested in this property and would like more information."
  );

  // Collect all images/videos into one array
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
    setCurrentMediaIndex(index);
    setIsModalOpen(true);
  };

  const nextMedia = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % allMedia.length);
  };

  const prevMedia = () => {
    setCurrentMediaIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
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
          beds,
          baths,
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
          location {
            lat,
            lng
          },
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
          features,
          amenities,
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

        if (!result) {
          setError("Property not found");
        } else {
          setProperty(result);
        }
      } catch (err) {
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
          <h1 className="text-3xl font-bold mb-4 text-destructive">Property Not Found</h1>
          <p className="text-muted-foreground">
            {error || `The property with slug "${propertySlug}" could not be found.`}
          </p>
          <button
            onClick={() => window.history.back()}
            className="mt-4 px-4 py-2 bg-gold text-white rounded hover:bg-gold/90">
            Go Back
          </button>
        </div>
      </section>
    );
  }

  const updatedAt = new Date(property._updatedAt);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  // Airbnb-style: grid preview + overlay + show-all button
  const maxPreviewMedia = 5;

  return (
    <>
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl">
          <div className="flex flex-col gap-8">
            <div className="space-y-4">
              {allMedia.length > 0 && (
                <div className="relative">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 rounded-lg overflow-hidden">
                    {allMedia.slice(0, maxPreviewMedia).map((item, i) => (
                      <div key={i} className="relative cursor-pointer h-44 bg-black"
                        onClick={() => openModal(i)}>
                        {item.type === "image" ?
                          <img src={safeImageUrl(item as SanityImage) || "/placeholder.jpg"} alt={item.alt || property.title} className="w-full h-full object-cover" />
                          :
                          <video src={item.asset?.url} className="w-full h-full object-cover" controls={false} muted loop playsInline />
                        }
                        {(i === maxPreviewMedia - 1 && allMedia.length > maxPreviewMedia) && (
                          <div
                            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-xl font-semibold z-10"
                            onClick={() => openModal(i)}
                          >
                            +{allMedia.length - maxPreviewMedia} more
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {allMedia.length > maxPreviewMedia && (
                    <button
                      className="absolute right-4 bottom-4 px-4 py-2 rounded bg-white/80 border shadow z-20"
                      onClick={() => openModal(0)}
                    >
                      Show all photos & videos
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8 relative">
              <div>
                {/* rest of your main content remains */}
                {/* ... */}
              </div>
              {/* Sidebar remains */}
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl w-full h-[90vh] p-0 bg-black">
          <DialogTitle className="sr-only">Media Gallery</DialogTitle>
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            {allMedia.length > 1 && (
              <button
                onClick={prevMedia}
                className="absolute top-1/2 left-4 z-10 p-2 bg-white/70 text-black rounded-full hover:bg-opacity-90 transition-colors">
                <ChevronLeft className="h-7 w-7" />
              </button>
            )}
            {allMedia[currentMediaIndex] && (
              <>
                {allMedia[currentMediaIndex]?.type === "video" ? (
                  <video className="max-w-full max-h-[70vh] object-contain rounded" controls autoPlay={false}>
                    <source src={allMedia[currentMediaIndex]?.asset?.url} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={safeImageUrl(allMedia[currentMediaIndex] as SanityImage) || "/placeholder.jpg"}
                    alt={allMedia[currentMediaIndex]?.alt || property.title}
                    className="max-w-full max-h-[70vh] object-contain rounded"
                  />
                )}
              </>
            )}
            {allMedia.length > 1 && (
              <button
                onClick={nextMedia}
                className="absolute top-1/2 right-4 z-10 p-2 bg-white/70 text-black rounded-full hover:bg-opacity-90 transition-colors">
                <ChevronRight className="h-7 w-7" />
              </button>
            )}
            {/* Share URL */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/80 px-6 py-3 rounded shadow flex flex-col items-center gap-2">
              <span className="font-semibold text-gray-700">Share this property:</span>
              <div className="flex items-center gap-2">
                <input
                  className="px-2 py-1 w-72 border rounded text-center"
                  type="text"
                  value={shareUrl}
                  readOnly
                  onClick={e => (e.target as HTMLInputElement).select()}
                />
                <button
                  className="px-3 py-2 bg-gold text-white rounded"
                  onClick={() => navigator.clipboard.writeText(shareUrl)}
                >
                  <Clipboard className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Your FeatureDetail and FeatureBlock helpers unchanged

function FeatureDetail({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center border-b border-gray-200 gap-2 font-medium">
      <span className="text-gray-700 bg-gray-200/30 basis-1/3 md:basis-1/4 p-3">{label}</span>
      <span className="p-3">{value}</span>
    </div>
  );
}

function FeatureBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((feature, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 rounded px-4 py-2 ${title === "Suitable for" ? "border border-gray-300 justify-center" : ""}`}>
            {title !== "Suitable for" && <Diamond className="size-5 text-gold shrink-0" />}
            <span className="text-gray-700">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
