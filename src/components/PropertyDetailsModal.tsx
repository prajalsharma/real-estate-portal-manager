import React, { useMemo, useState, useEffect } from "react";
import { safeImageUrl, getAgentAvatarUrl } from "@/lib/sanity/image";
import { useT } from "@/lib/i18n";
import { useRates } from "@/lib/hooks/use-rates";
import { useAppPrefs } from "@/lib/prefs-context";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import Image from "next/image";
import { Bed, Mail, MapPin, Phone, Proportions, ShowerHead } from "lucide-react";
import ContactModal from "./ContactModal";
import { formatter } from "@/lib/priceFormatter";

interface PropertyDetailsModalProps {
  gallery: any[];
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  property: any;
  autoOpenContact?: boolean;
}

const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({
  gallery,
  open,
  onOpenChange,
  property,
  autoOpenContact,
}) => {
  const { currency, language } = useAppPrefs();
  const { convert, loading: ratesLoading } = useRates();
  const t = useT();
  const [contactOpen, setContactOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [formMode, setFormMode] = useState<"none" | "request_tour" | "contact_agent">("none");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const amountNumber = React.useMemo(() => {
    if (!property) return null;
    if (typeof property.price === "number" && Number.isFinite(property.price))
      return property.price;
    if (typeof property.price === "string") {
      const digits = property.price.replace(/[^\d.-]/g, "");
      const n = Number(digits);
      return Number.isFinite(n) ? n : null;
    }

    return null;
  }, [property]);

  const priceDisplay = React.useMemo(() => {
    if (amountNumber == null) {
      if (typeof property?.price === "string" && property.price.trim().length > 0)
        return property.price;
      return t("labels.contactForPrice", "Contact for price");
    }
    try {
      const formattedPrice = formatter(language, currency);
      const converted = convert ? convert(amountNumber, currency) : amountNumber;
      const display = !ratesLoading
        ? formattedPrice.format(converted)
        : formattedPrice.format(amountNumber);
      return display.replace(/(\p{Sc})\s?/u, "$1\u00A0");
    } catch {
      return `${String(currency ?? "EUR").toUpperCase()}\u00A0${Math.round(amountNumber).toLocaleString(language)}`;
    }
  }, [amountNumber, convert, formatter, currency, language, ratesLoading, property, t]);

  useEffect(() => {
    if (open && autoOpenContact) {
      setFormMode("request_tour");
      setContactOpen(true);
    }
  }, [open, autoOpenContact]);

  const address = useMemo(() => {
    if (!property?.address) return "";
    const parts = [
      property.address.street,
      property.address.city,
      property.address.region,
      property.address.country,
    ].filter(Boolean);
    return parts.join(", ");
  }, [property]);

  if (!open || !property) return null;

  const currentImage = gallery[Math.min(activeIdx, gallery.length - 1)];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent to agent!");
    setForm({ name: "", email: "", phone: "", message: "" });
    setFormMode("none");
  };
  const handleCloseForm = () => {
    setFormMode("none");
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-3xl overflow-hidden p-0 bg-popover border-none">
          <div className="grid grid-cols-1 md:grid-cols-5">
            <div className="relative md:col-span-3">
              <div className="relative h-56 md:min-h-full">
                <Image
                  src={safeImageUrl(currentImage)}
                  alt={property?.title || "Image"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
                {gallery.length > 0 ? (
                  <div className="absolute z-99 bottom-0 flex gap-2 p-3 overflow-x-auto items-center w-full justify-center">
                    {gallery.map((src, idx) => (
                      <button
                        key={`${src}-${idx}`}
                        type="button"
                        onClick={() => setActiveIdx(idx)}
                        className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-md transition focus:outline-none ring-1 cursor-pointer ${
                          idx === activeIdx
                            ? "ring-2 ring-white border-ring/30"
                            : "hover:opacity-90"
                        }`}
                        aria-label={`Preview image ${idx + 1}`}>
                        <Image
                          src={safeImageUrl(src)}
                          alt={(property?.title || "Property") + " thumbnail"}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="md:col-span-2 p-5 space-y-4 flex flex-col">
              <DialogHeader>
                <DialogTitle className="font-heading text-xl md:text-3xl tracking-tight">
                  {property?.title}
                </DialogTitle>
              </DialogHeader>

              <div className="text-2xl font-semibold">{priceDisplay}</div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5">
                  <Bed className="h-4 w-4 text-gold" />
                  <span className="font-medium">
                    {property.beds && `${property.beds} ${t("labels.bed")}`}
                  </span>
                </div>
                <div className="h-4 w-px bg-border" />
                <div className="flex items-center gap-1.5">
                  <ShowerHead className="h-4 w-4 text-gold" />
                  <span className="font-medium">
                    {property.baths && `${property.baths} ${t("labels.bath")}`}
                  </span>
                </div>
                <div className="h-4 w-px bg-border" />
                <div className="flex items-center gap-1.5">
                  <Proportions className="h-4 w-4 text-gold" />
                  <span className="font-medium">
                    {property.sqft && `${property.sqft} ${t("labels.area")}`}
                  </span>
                </div>
              </div>
              <div className="flex items-center md:items-start gap-2 text-muted-foreground text-sm">
                <MapPin className="h-4 w-4 shrink-0 md:mt-1" />
                <span>{address}</span>
              </div>
              {property?.description && (
                <div className="mt-4">
                  <p className="text-muted-foreground">{property?.description}</p>
                </div>
              )}
              {property?.features?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4 p-3">
                  <b className="font-semibold">Features:</b>{" "}
                  <span className="text-muted-foreground">{property?.features.join(", ")}</span>
                </div>
              )}
              {property?.amenities?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2 p-3">
                  <b className="font-semibold">Amenities:</b>{" "}
                  <span className="text-muted-foreground">{property?.amenities.join(", ")}</span>
                </div>
              )}

              {property.agent && (
                <div className="mt-2 rounded-lg border p-3 flex items-center gap-3 bg-muted">
                  <div className="size-10 rounded-full bg-muted overflow-hidden shrink-0">
                    <Image
                      src={getAgentAvatarUrl(property.agent.avatar, 64)}
                      alt={property.agent.name || "Agent Photo"}
                      width={40}
                      height={40}
                      className="object-cover size-10 aspect-square"
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="min-w-0 flex flex-col gap-0.5">
                      <p className="text-sm font-medium truncate capitalize">
                        {property.agent.name}
                      </p>
                      {
                        <p className="text-xs text-muted-foreground truncate">
                          {property.agent.role}
                        </p>
                      }
                    </div>
                    <div className="ml-auto flex gap-2">
                      {property.agent.phone && (
                        <p className="inline-flex items-center gap-1 text-xs text-foreground/80 hover:text-foreground mt-1">
                          <Phone className="h-4 w-4" />
                          {property.agent.phone}
                        </p>
                      )}
                    </div>
                    <div>
                      {property.agent.email && (
                        <p className="inline-flex items-center gap-1 text-xs text-foreground/80 hover:text-foreground mt-1">
                          <Mail className="h-4 w-4" />
                          {property.agent.email}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              <div className="pt-2 flex flex-col gap-2 justify-between">
                <button
                  className="bg-primary text-white hover:bg-primary/60 transition-all duration-300 px-1.5 py-2 rounded font-semibold cursor-pointer text-sm"
                  onClick={() => {
                    setFormMode("request_tour");
                    setContactOpen(true);
                  }}>
                  {" "}
                  {t("actions.requestTour")}
                </button>
                <button
                  className="bg-white text-sm text-black hover:opacity-80 transition-all duration-300 border-2 border-gold px-1.5 py-2 rounded font-semibold cursor-pointer"
                  onClick={() => {
                    setFormMode("contact_agent");
                    setContactOpen(true);
                  }}>
                  {t("actions.contactAgent")}
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ContactModal
        open={contactOpen}
        onOpenChange={setContactOpen}
        lang={language}
        defaultProperty={property.id}
        propertyOptions={[{ value: property.id, label: property.title }]}
        onSubmit={async () => {
          /* integrate backend later */
        }}
      />
    </>
  );
};

export default PropertyDetailsModal;
