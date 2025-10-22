import React, { useMemo, useState } from "react";
import { safeImageUrl, getAgentAvatarUrl } from "@/lib/sanity/image";
import { useT } from "@/lib/i18n";
import { useRates } from "@/lib/hooks/use-rates";
import { useAppPrefs } from "@/lib/prefs-context";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import Image from "next/image";
import { Bed, Mail, MapPin, Phone, Proportions, ShowerHead } from "lucide-react";

interface PropertyDetailsModalProps {
  gallery: any[];
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  property: any;
}

const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({
  gallery,
  open,
  onOpenChange,
  property,
}) => {
  const { currency, language } = useAppPrefs();
  const { convert } = useRates();
  const t = useT();
  const [contactOpen, setContactOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [formMode, setFormMode] = useState<"none" | "request_tour" | "contact_agent">("none");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const priceDisplay = useMemo(() => {
    if (!property) return "";
    const amount = convert ? convert(property.price, currency) : property.price;
    try {
      return new Intl.NumberFormat(language, {
        style: "currency",
        currency: currency.toUpperCase(),
        maximumFractionDigits: 0,
      })
        .format(amount)
        .replace(/^(\D+)/, "$1 ");
    } catch {
      return `${currency.toUpperCase()}\u00A0${Math.round(amount).toLocaleString(language)}`;
    }
  }, [property, currency, language, convert]);

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
                <span>
                  {" "}
                  {property?.address?.street}, {property?.address?.city},{" "}
                  {property?.address?.region}, {property?.address?.country}
                </span>
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
                  <div className="size-10 rounded-full bg-muted overflow-hidden">
                    <Image
                      src={getAgentAvatarUrl(property.agent.avatar, 64)}
                      alt={property.agent.name || "Agent Photo"}
                      width={40}
                      height={40}
                      className="object-cover size-10 aspect-square"
                    />
                  </div>
                  <div className="min-w-0 flex flex-col gap-0.5">
                    <p className="text-sm font-medium truncate">{property.agent.name}</p>
                    {property.agent.role && (
                      <p className="text-xs text-muted-foreground truncate">
                        {property.agent.role}
                      </p>
                    )}
                  </div>
                  <div className="ml-auto flex gap-2">
                    {property.agent.phone && (
                      <p className="inline-flex items-center gap-1 text-sm text-foreground/80 hover:text-foreground">
                        <Phone className="h-4 w-4" />
                        {property.agent.phone}
                      </p>
                    )}
                  </div>
                  <div>
                    {property.agent.email && (
                      <p className="inline-flex items-center gap-1 text-sm text-foreground/80 hover:text-foreground">
                        <Mail className="h-4 w-4" />
                        {property.agent.email}
                      </p>
                    )}
                  </div>
                </div>
              )}
              <div className="pt-2 flex flex-col gap-2 justify-between">
                <button
                  className="bg-primary text-white hover:bg-primary/60 transition-all duration-300 px-1.5 py-2 rounded font-semibold cursor-pointer text-sm"
                  onClick={() => setFormMode("request_tour")}>
                  {" "}
                  {t("actions.requestTour")}
                </button>
                <button
                  className="bg-white text-sm text-black hover:opacity-80 transition-all duration-300 border-2 border-gold px-1.5 py-2 rounded font-semibold cursor-pointer"
                  onClick={() => setFormMode("contact_agent")}>
                  {t("actions.contactAgent")}
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PropertyDetailsModal;
