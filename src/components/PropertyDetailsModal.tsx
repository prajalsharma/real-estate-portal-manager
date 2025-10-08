"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Bed, Proportions, MapPin, Phone } from "lucide-react";
import ContactModal from "@/components/ContactModal";
import { useAppPrefs } from "@/lib/prefs-context";
import { useRates } from "@/lib/hooks/use-rates";
import { useT } from "@/lib/i18n";

export type Agent = {
  id: string;
  name: string;
  avatarUrl?: string;
  phone?: string;
  email?: string;
};

export type Property = {
  id: string;
  title: string;
  address: string;
  price: number; // EUR base
  beds: number;
  baths: number;
  sqft: number; // using m² in UI
  type: string;
  imageUrl: string;
  images?: string[]; // optional gallery
  agent?: Agent;
};

export function PropertyDetailsModal({
  open,
  onOpenChange,
  property,
  autoOpenContact,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  property: Property | null;
  autoOpenContact?: boolean;
}) {
  const { currency, language } = useAppPrefs();
  const { convert } = useRates();
  const t = useT();
  const [contactOpen, setContactOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  React.useEffect(() => {
    if (open && autoOpenContact) {
      setContactOpen(true);
    }
  }, [open, autoOpenContact]);

  const priceDisplay = useMemo(() => {
    if (!property) return "";
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

  if (!property) return null;

  const gallery = property.images && property.images.length > 0 ? property.images : [property.imageUrl];
  const currentImage = gallery[Math.min(activeIdx, gallery.length - 1)];

  return (
    <>
      <Dialog open={open} onOpenChange={(o) => {
        if (!o) setActiveIdx(0);
        onOpenChange(o);
        if (!o) setContactOpen(false);
      }}>
        <DialogContent className="sm:max-w-3xl overflow-hidden p-0 bg-popover">
          <div className="grid grid-cols-1 md:grid-cols-5">
            <div className="relative md:col-span-3">
              <div className="relative h-56 md:h-[380px]">
                <Image
                  src={currentImage}
                  alt={`${property.title} - ${property.address}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
              </div>
              {gallery.length > 1 ? (
                <div className="flex gap-2 p-3 overflow-x-auto border-t bg-popover">
                  {gallery.map((src, idx) => (
                    <button
                      key={`${src}-${idx}`}
                      type="button"
                      onClick={() => setActiveIdx(idx)}
                      className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-md border transition ring-0 focus:outline-none ${
                        idx === activeIdx ? "ring-2 ring-ring border-ring/30" : "hover:opacity-90"
                      }`}
                      aria-label={`Preview image ${idx + 1}`}
                    >
                      <Image src={src} alt="Thumbnail" fill className="object-cover" sizes="80px" />
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
            <div className="md:col-span-2 p-5 space-y-4">
              <DialogHeader>
                <DialogTitle className="font-heading text-xl tracking-tight">{property.title}</DialogTitle>
              </DialogHeader>

              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <MapPin className="h-4 w-4" />
                <span>{property.address}</span>
              </div>

              <div className="text-2xl font-semibold">{priceDisplay}</div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5">
                  <Bed className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{property.beds}</span>
                  <span className="text-muted-foreground">{t("labels.bed")}</span>
                </div>
                <div className="h-4 w-px bg-border" />
                <div className="flex items-center gap-1.5">
                  <span className="font-medium">{property.baths}</span>
                  <span className="text-muted-foreground">{t("labels.bath")}</span>
                </div>
                <div className="h-4 w-px bg-border" />
                <div className="flex items-center gap-1.5">
                  <Proportions className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{property.sqft}</span>
                  <span className="text-muted-foreground">{t("labels.area")}</span>
                </div>
              </div>

              {property.agent ? (
                <div className="mt-2 rounded-lg border p-3 flex items-center gap-3">
                  <div className="size-10 rounded-full bg-muted overflow-hidden">
                    {property.agent.avatarUrl ? (
                      <Image src={property.agent.avatarUrl} alt={property.agent.name} width={40} height={40} className="object-cover size-10" />
                    ) : null}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{property.agent.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{t("labels.agent")}</p>
                  </div>
                  <div className="ml-auto flex gap-2">
                    {property.agent.phone ? (
                      <a href={`tel:${property.agent.phone}`} className="inline-flex items-center gap-1 text-sm text-foreground/80 hover:text-foreground">
                        <Phone className="h-4 w-4" />
                        {t("actions.call")}
                      </a>
                    ) : null}
                  </div>
                </div>
              ) : null}

              <div className="pt-2 flex gap-2">
                <Button className="bg-foreground text-primary-foreground hover:opacity-90" onClick={() => setContactOpen(true)}>
                  {t("actions.requestTour")}
                </Button>
                <Button variant="outline" onClick={() => onOpenChange(false)}>{t("actions.close")}</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ContactModal
        open={contactOpen}
        onOpenChange={setContactOpen}
        lang={language}
        defaultProperty={property.type?.toLowerCase?.() || undefined}
        propertyOptions={[{ value: property.id, label: property.title }]}
        onSubmit={async () => { /* integrate backend later */ }}
      />
    </>
  );
}

export default PropertyDetailsModal;