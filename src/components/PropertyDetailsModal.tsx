"use client";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Bed, Proportions, MapPin, Phone, ShowerHead, CalendarDays } from "lucide-react";
import ContactModal from "@/components/ContactModal";
import { useAppPrefs } from "@/lib/prefs-context";
import { useRates } from "@/lib/hooks/use-rates";
import { useT } from "@/lib/i18n";

interface PropertyDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  property: any;
  autoOpenContact?: boolean;
}

export default function PropertyDetailsModal({ open, onOpenChange, property, autoOpenContact }: PropertyDetailsModalProps) {
  const { currency, language } = useAppPrefs();
  const { convert } = useRates();
  const t = useT();
  const [contactOpen, setContactOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  React.useEffect(() => {
    if (open && autoOpenContact) setContactOpen(true);
  }, [open, autoOpenContact]);

  if (!property) return null;

  const priceDisplay = useMemo(() => {
    if (!property.price) return "";
    const amount = convert ? convert(property.price, currency) : property.price;
    try {
      return new Intl.NumberFormat(language, {
        style: "currency",
        currency: currency.toUpperCase(),
        maximumFractionDigits: 0,
      }).format(amount);
    } catch {
      return `${currency.toUpperCase()} ${Math.round(amount).toLocaleString(language)}`;
    }
  }, [property, currency, language, convert]);

  const gallery = property.images && property.images.length > 0 ? property.images : [property.imageUrl];
  const currentImage = gallery[Math.min(activeIdx, gallery.length - 1)] || property.imageUrl;
  const addressStr = [property.address?.street, property.address?.city, property.address?.region, property.address?.country, property.address?.postalCode].filter(Boolean).join(", ");
  const whatsappUrl = property.agent?.phone ? `https://wa.me/${property.agent.phone.replace(/[^\d]/g,"")}?text=${encodeURIComponent(`Hi, I'm interested in your listing: ${property.title}.`)}` : null;

  return (
    <>
      <Dialog open={open} onOpenChange={(o) => { if (!o) setActiveIdx(0); onOpenChange(o); if (!o) setContactOpen(false); }}>
        <DialogContent className="sm:max-w-3xl overflow-auto max-h-[90vh] p-0 bg-popover border-none">
          <div className="grid grid-cols-1 md:grid-cols-5">
            <div className="relative md:col-span-3">
              <div className="relative h-56 md:h-[400px]">
                <Image src={currentImage} alt={`${property.title} - ${addressStr}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 60vw" />
              </div>
              {gallery.length > 1 ? (
                <div className="absolute z-99 bottom-0 flex gap-2 p-3 overflow-x-auto items-center w-full justify-center">
                  {gallery.map((src, idx) => (
                    <button key={`${src}-${idx}`} type="button" onClick={() => setActiveIdx(idx)} className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-md transition focus:outline-none ring-1 ${idx === activeIdx ? "ring-2 ring-white border-ring/30" : "hover:opacity-90"}`} aria-label={`Preview image ${idx + 1}`}>
                      <Image src={src} alt="Thumbnail" fill className="object-cover" sizes="80px" />
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
            <div className="md:col-span-2 p-5 space-y-4 flex flex-col">
              <DialogHeader>
                <DialogTitle className="font-heading text-xl md:text-3xl tracking-tight">{property.title}</DialogTitle>
              </DialogHeader>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <MapPin className="h-4 w-4" />
                <span>{addressStr}</span>
              </div>
              <div className="text-2xl font-semibold">{priceDisplay}</div>
              <div className="text-xs text-muted-foreground mb-1">{property.currency}</div>
              <div className="flex items-center gap-4 text-sm mb-2">
                <div className="flex items-center gap-1.5">
                  <Bed className="h-4 w-4 text-gold" />
                  <span>{property.beds}</span>
                  <span className="text-muted-foreground">bd</span>
                </div>
                <div className="h-4 w-px bg-border" />
                <div className="flex items-center gap-1.5">
                  <ShowerHead className="h-4 w-4 text-gold" />
                  <span>{property.baths}</span>
                  <span className="text-muted-foreground">ba</span>
                </div>
                <div className="h-4 w-px bg-border" />
                <div className="flex items-center gap-1.5">
                  <Proportions className="h-4 w-4 text-gold" />
                  <span>{property.sqft}</span>
                  <span className="text-muted-foreground">m²</span>
                </div>
                <div className="h-4 w-px bg-border" />
                <div className="flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4 text-gold" />
                  <span>{property.yearBuilt ?? "-"}</span>
                  <span className="text-muted-foreground">Year</span>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap text-xs">
                <span className="bg-muted px-2 py-1 rounded">Type: {property.type}</span>
                <span className="bg-muted px-2 py-1 rounded">Status: {property.status}</span>
                <span className="bg-muted px-2 py-1 rounded">Featured: {property.featured ? "Yes" : "No"}</span>
              </div>
              <div className="mt-3 text-sm text-muted-foreground whitespace-pre-wrap">{property.description}</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {property.features && property.features.map((tag, idx) => (<span key={tag + idx} className="rounded bg-primary/10 px-2 py-1 text-xs">{tag}</span>))}
                {property.amenities && property.amenities.map((tag, idx) => (<span key={tag + idx} className="rounded bg-accent px-2 py-1 text-xs">{tag}</span>))}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <span>Lot Size: <strong>{property.lotSize || "-"}</strong> m²</span>
                <span>Latitude: <strong>{property.latitude ?? "-"}</strong></span>
                <span>Longitude: <strong>{property.longitude ?? "-"}</strong></span>
                <span>Altitude: <strong>{property.altitude ?? "-"}</strong></span>
                <span>Published: <strong>{property.publishedAt ? new Date(property.publishedAt).toLocaleDateString() : "-"}</strong></span>
              </div>
              {property.agent ? (
                <div className="mt-6 rounded-lg border p-3 flex items-center gap-3">
                  <div className="size-10 rounded-full bg-muted overflow-hidden">
                    {property.agent.avatarUrl ? (
                      <Image src={property.agent.avatarUrl} alt={property.agent.name} width={40} height={40} className="object-cover size-10" />
                    ) : null}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{property.agent.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{property.agent.role}</p>
                    <p className="text-xs text-muted-foreground truncate">{property.agent.rating ? `⭐ ${property.agent.rating}` : ""}</p>
                  </div>
                  <div className="ml-auto flex gap-2">
                    {property.agent.phone ? (<a href={`tel:${property.agent.phone}`} className="inline-flex items-center gap-1 text-sm text-foreground/80 hover:text-foreground"><Phone className="h-4 w-4" />{t("actions.call")}</a>) : null}
                    {whatsappUrl && (<a href={whatsappUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-1 text-sm bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition">WhatsApp</a>)}
                  </div>
                </div>
              ) : null}
              <div className="pt-2 flex gap-2 justify-center">
                <Button className="bg-primary text-white hover:bg-primary/90 transition-all duration-300" onClick={() => setContactOpen(true)}>
                  Contact Agent
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <ContactModal open={contactOpen} onOpenChange={setContactOpen} lang={language} defaultProperty={property.type?.toLowerCase?.() || undefined} propertyOptions={[{ value: property.id, label: property.title }]} onSubmit={async () => {/* integrate backend later */}} />
    </>
  );
}
