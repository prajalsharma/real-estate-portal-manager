"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Phone,
  Map,
  MapPin,
  HousePlus,
  Check,
  Mailbox,
  MessageCircleQuestionMark,
  ContactRound,
} from "lucide-react";
import clsx from "clsx";
import { useAppPrefs, SupportedLanguage } from "@/lib/prefs-context";
import { useT } from "@/lib/i18n";

type Lang = SupportedLanguage | "es" | "fr" | "de";

type PropertyOption = {
  value: string;
  label: string;
};

export interface ContactModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  lang?: Lang;
  propertyOptions?: PropertyOption[];
  defaultProperty?: string;
  whatsappNumber?: string; // E.164 without '+', e.g. "3069XXXXXXX"
  defaultLocationQuery?: string;
  className?: string;
  onSubmit?: (data: {
    name: string;
    email: string;
    phone: string;
    message: string;
    property: string | null;
    location?: string;
  }) => Promise<void> | void;
}

const translations: Record<
  Lang,
  {
    title: string;
    description: string;
    labels: {
      name: string;
      email: string;
      phone: string;
      message: string;
      property: string;
      location: string;
    };
    placeholders: {
      name: string;
      email: string;
      phone: string;
      message: string;
      property: string;
      location: string;
    };
    ctas: {
      send: string;
      cancel: string;
      whatsapp: string;
      openMaps: string;
    };
    validation: {
      required: string;
      email: string;
      phone: string;
      minMessage: string;
    };
    success: string;
    error: string;
    footer: { secure: string; maps: string };
  }
> = {
  en: {
    title: "Contact Agent",
    description: "Send an inquiry about this property. We'll get back to you promptly.",
    labels: {
      name: "Full name",
      email: "Email",
      phone: "Phone",
      message: "Message",
      property: "Property interest",
      location: "Location (optional)",
    },
    placeholders: {
      name: "John Papadopoulos",
      email: "you@example.com",
      phone: "+30 69XXXXXXXX",
      message:
        "I'm interested in this property. Could you share more details and available viewing times?",
      property: "Select a property",
      location: "Athens, Glyfada, etc.",
    },
    ctas: {
      send: "Send inquiry",
      cancel: "Cancel",
      whatsapp: "WhatsApp",
      openMaps: "Open in Maps",
    },
    validation: {
      required: "This field is required.",
      email: "Enter a valid email address.",
      phone: "Enter a valid phone number.",
      minMessage: "Message should be at least 10 characters.",
    },
    success: "Your inquiry has been sent successfully.",
    error: "Something went wrong. Please try again.",
    footer: { secure: "Secure & private", maps: "Google Maps" },
  },
  el: {
    title: "Επικοινωνία με Σύμβουλο",
    description: "Στείλτε ενδιαφέρον για το ακίνητο. Θα απαντήσουμε άμεσα.",
    labels: {
      name: "Ονοματεπώνυμο",
      email: "Email",
      phone: "Τηλέφωνο",
      message: "Μήνυμα",
      property: "Ενδιαφέρον για ακίνητο",
      location: "Τοποθεσία (προαιρετικό)",
    },
    placeholders: {
      name: "Γιάννης Παπαδόπουλος",
      email: "you@example.com",
      phone: "+30 69XXXXXXXX",
      message:
        "Ενδιαφέρομαι για το ακίνητο. Μπορείτε να μου στείλετε λεπτομέρειες και ώρες προβολής;",
      property: "Επιλέξτε ακίνητο",
      location: "Αθήνα, Γλυφάδα, κ.λπ.",
    },
    ctas: {
      send: "Αποστολή μηνύματος",
      cancel: "Άκυρο",
      whatsapp: "WhatsApp",
      openMaps: "Άνοιγμα στο Maps",
    },
    validation: {
      required: "Αυτό το πεδίο είναι υποχρεωτικό.",
      email: "Εισάγετε έγκυρο email.",
      phone: "Εισάγετε έγκυρο τηλέφωνο.",
      minMessage: "Το μήνυμα πρέπει να έχει τουλάχιστον 10 χαρακτήρες.",
    },
    success: "Το μήνυμα στάλθηκε με επιτυχία.",
    error: "Κάτι πήγε στραβά. Προσπαθήστε ξανά.",
    footer: { secure: "Ασφαλές & ιδιωτικό", maps: "Google Maps" },
  },
  es: {
    title: "Contactar con el agente",
    description: "Envíe una consulta sobre la propiedad. Le responderemos pronto.",
    labels: {
      name: "Nombre completo",
      email: "Correo electrónico",
      phone: "Teléfono",
      message: "Mensaje",
      property: "Interés de propiedad",
      location: "Ubicación (opcional)",
    },
    placeholders: {
      name: "Juan Pérez",
      email: "usted@ejemplo.com",
      phone: "+34 6XXXXXXXX",
      message:
        "Estoy interesado en esta propiedad. ¿Podría compartir más detalles y horarios de visita?",
      property: "Seleccione una propiedad",
      location: "Madrid, Barcelona, etc.",
    },
    ctas: {
      send: "Enviar consulta",
      cancel: "Cancelar",
      whatsapp: "WhatsApp",
      openMaps: "Abrir en Maps",
    },
    validation: {
      required: "Este campo es obligatorio.",
      email: "Ingrese un correo válido.",
      phone: "Ingrese un teléfono válido.",
      minMessage: "El mensaje debe tener al menos 10 caracteres.",
    },
    success: "Su consulta se envió correctamente.",
    error: "Algo salió mal. Inténtelo de nuevo.",
    footer: { secure: "Seguro y privado", maps: "Google Maps" },
  },
  fr: {
    title: "Contacter l'agent",
    description: "Envoyez une demande concernant ce bien. Nous vous répondrons rapidement.",
    labels: {
      name: "Nom complet",
      email: "E-mail",
      phone: "Téléphone",
      message: "Message",
      property: "Bien d'intérêt",
      location: "Localisation (optionnel)",
    },
    placeholders: {
      name: "Jean Dupont",
      email: "vous@exemple.com",
      phone: "+33 6XXXXXXXX",
      message:
        "Je suis intéressé par ce bien. Pourriez-vous partager plus de détails et les créneaux de visite ?",
      property: "Sélectionnez un bien",
      location: "Paris, Lyon, etc.",
    },
    ctas: {
      send: "Envoyer la demande",
      cancel: "Annuler",
      whatsapp: "WhatsApp",
      openMaps: "Ouvrir dans Maps",
    },
    validation: {
      required: "Ce champ est requis.",
      email: "Entrez un e-mail valide.",
      phone: "Entrez un numéro valide.",
      minMessage: "Le message doit contenir au moins 10 caractères.",
    },
    success: "Votre demande a été envoyée avec succès.",
    error: "Une erreur s'est produite. Veuillez réessayer.",
    footer: { secure: "Sécurisé et privé", maps: "Google Maps" },
  },
  de: {
    title: "Makler kontaktieren",
    description: "Senden Sie eine Anfrage zu dieser Immobilie. Wir melden uns umgehend.",
    labels: {
      name: "Vollständiger Name",
      email: "E-Mail",
      phone: "Telefon",
      message: "Nachricht",
      property: "Objektinteresse",
      location: "Standort (optional)",
    },
    placeholders: {
      name: "Max Mustermann",
      email: "sie@beispiel.de",
      phone: "+49 15XXXXXXXX",
      message:
        "Ich interessiere mich für diese Immobilie. Bitte senden Sie mir Details und Besichtigungstermine.",
      property: "Objekt auswählen",
      location: "Berlin, München, etc.",
    },
    ctas: {
      send: "Anfrage senden",
      cancel: "Abbrechen",
      whatsapp: "WhatsApp",
      openMaps: "In Maps öffnen",
    },
    validation: {
      required: "Dieses Feld ist erforderlich.",
      email: "Bitte geben Sie eine gültige E-Mail ein.",
      phone: "Bitte geben Sie eine gültige Telefonnummer ein.",
      minMessage: "Die Nachricht sollte mindestens 10 Zeichen enthalten.",
    },
    success: "Ihre Anfrage wurde erfolgreich gesendet.",
    error: "Etwas ist schiefgelaufen. Bitte erneut versuchen.",
    footer: { secure: "Sicher & privat", maps: "Google Maps" },
  },
  sr: {
    title: "Контакт са агентом",
    description: "Пошаљите упит за ову некретнину. Одговорићемо ускоро.",
    labels: {
      name: "Пуно име",
      email: "Имејл",
      phone: "Телефон",
      message: "Порука",
      property: "Интересовање за некретнину",
      location: "Локација (опционо)",
    },
    placeholders: {
      name: "Петар Петровић",
      email: "ви@пример.ком",
      phone: "+381 6XXXXXXX",
      message:
        "Занима ме ова некретнина. Можете ли поделити више детаља и слободне термине за разгледање?",
      property: "Одаберите некретнину",
      location: "Београд, Нови Сад, итд.",
    },
    ctas: {
      send: "Пошаљи упит",
      cancel: "Откажи",
      whatsapp: "WhatsApp",
      openMaps: "Отвори у Maps",
    },
    validation: {
      required: "Ово поље је обавезно.",
      email: "Унесите исправан имејл.",
      phone: "Унесите исправан број телефона.",
      minMessage: "Порука треба да има најмање 10 карактера.",
    },
    success: "Ваш упит је успешно послат.",
    error: "Дошло је до грешке. Покушајте поново.",
    footer: { secure: "Безбедно и приватно", maps: "Google Maps" },
  },
  ru: {
    title: "Связаться с агентом",
    description: "Отправьте запрос по этому объекту. Мы вскоре свяжемся с вами.",
    labels: {
      name: "Полное имя",
      email: "Эл. почта",
      phone: "Телефон",
      message: "Сообщение",
      property: "Интерес к объекту",
      location: "Местоположение (необязательно)",
    },
    placeholders: {
      name: "Иван Иванов",
      email: "you@example.com",
      phone: "+7 9XXXXXXXX",
      message:
        "Меня интересует этот объект. Можете прислать подробности и доступное время для просмотра?",
      property: "Выберите объект",
      location: "Афины, Глифада и т. п.",
    },
    ctas: {
      send: "Отправить запрос",
      cancel: "Отмена",
      whatsapp: "WhatsApp",
      openMaps: "Открыть в Maps",
    },
    validation: {
      required: "Это обязательное поле.",
      email: "Введите корректный адрес эл. почты.",
      phone: "Введите корректный номер телефона.",
      minMessage: "Сообщение должно быть не менее 10 символов.",
    },
    success: "Ваш запрос успешно отправлен.",
    error: "Что-то пошло не так. Повторите попытку.",
    footer: { secure: "Безопасно и конфиденциально", maps: "Google Maps" },
  },
  bg: {
    title: "Свържете се с агент",
    description: "Изпратете запитване за този имот. Ще се свържем с вас скоро.",
    labels: {
      name: "Пълно име",
      email: "Имейл",
      phone: "Телефон",
      message: "Съобщение",
      property: "Интерес към имот",
      location: "Локация (по избор)",
    },
    placeholders: {
      name: "Иван Иванов",
      email: "you@example.com",
      phone: "+359 8XXXXXXXX",
      message: "Интересувам се от този имот. Може ли повече информация и възможни часове за оглед?",
      property: "Изберете имот",
      location: "Атина, Глифада и др.",
    },
    ctas: {
      send: "Изпрати запитване",
      cancel: "Отказ",
      whatsapp: "WhatsApp",
      openMaps: "Отвори в Maps",
    },
    validation: {
      required: "Това поле е задължително.",
      email: "Въведете валиден имейл.",
      phone: "Въведете валиден телефон.",
      minMessage: "Съобщението трябва да е поне 10 символа.",
    },
    success: "Вашето запитване беше изпратено успешно.",
    error: "Възникна грешка. Опитайте отново.",
    footer: { secure: "Сигурно и поверително", maps: "Google Maps" },
  },
};

export default function ContactModal({
  open,
  onOpenChange,
  lang = "en",
  propertyOptions,
  defaultProperty,
  whatsappNumber,
  defaultLocationQuery,
  className,
  onSubmit,
}: ContactModalProps) {
  const { language } = useAppPrefs();
  const activeLang = (lang || language) as Lang;
  const t = useMemo(() => translations[activeLang] ?? translations.en, [activeLang]);
  const gT = useT();
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = typeof open === "boolean" && typeof onOpenChange === "function";
  const modalOpen = isControlled ? (open as boolean) : internalOpen;

  const setOpen = (v: boolean) => {
    if (isControlled) onOpenChange?.(v);
    else setInternalOpen(v);
  };

  const options: PropertyOption[] =
    propertyOptions && propertyOptions.length
      ? propertyOptions
      : [
          { value: "maisonette", label: gT("propertyTypes.maisonette", "Maisonette") },
          { value: "apartment", label: gT("propertyTypes.apartment", "Apartment") },
          { value: "commercial", label: gT("propertyTypes.commercial", "Commercial") },
          { value: "land", label: gT("propertyTypes.land", "Land") },
          { value: "rental", label: gT("propertyTypes.rental", "Rental Services") },
        ];

  const defaultPropertyValid = useMemo(
    () => (defaultProperty ? options.some((o) => o.value === defaultProperty) : false),
    [defaultProperty, options]
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [property, setProperty] = useState<string | undefined>(
    defaultPropertyValid ? defaultProperty : undefined
  );
  const [location, setLocation] = useState<string>(defaultLocationQuery ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  useEffect(() => {
    if (defaultPropertyValid) setProperty(defaultProperty);
  }, [defaultPropertyValid, defaultProperty]);

  const validate = () => {
    const newErrors: Record<string, string | undefined> = {};
    if (!name.trim()) newErrors.name = t.validation.required;
    if (!email.trim()) newErrors.email = t.validation.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = t.validation.email;
    if (!phone.trim()) newErrors.phone = t.validation.required;
    else if (!/^\+?[0-9\s()-]{7,}$/.test(phone)) newErrors.phone = t.validation.phone;
    if (!message.trim()) newErrors.message = t.validation.required;
    else if (message.trim().length < 10) newErrors.message = t.validation.minMessage;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSend = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      await Promise.resolve(
        onSubmit?.({ name, email, phone, message, property: property ?? null, location })
      );
      toast.success(t.success);
      setOpen(false);
      // reset form
      setTimeout(() => {
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setProperty(undefined);
        setLocation(defaultLocationQuery ?? "");
        setErrors({});
      }, 150);
    } catch {
      toast.error(t.error);
    } finally {
      setSubmitting(false);
    }
  };

  const openWhatsApp = () => {
    const q = encodeURIComponent(
      `${t.title} - ${property ? `[${property}] ` : ""}${message ? message : ""}`.trim()
    );
    const num = whatsappNumber ? `+${whatsappNumber.replace(/[^\d]/g, "")}` : "";
    const href = num
      ? `https://wa.me/${num.replace("+", "")}?text=${q}`
      : `https://wa.me/?text=${q}`;
    if (typeof window !== "undefined") {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  const openMaps = () => {
    const query = location?.trim() || defaultLocationQuery || property || "";
    const href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query || "")}`;
    if (typeof window !== "undefined") {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Dialog open={modalOpen} onOpenChange={setOpen}>
      <DialogContent
        className={clsx(
          "sm:max-w-lg w-full bg-popover text-popover-foreground shadow-lg rounded-lg",
          "p-0 overflow-hidden",
          className
        )}>
        <div className="bg-white">
          <DialogHeader className="px-6 pt-6 pb-3 space-y-2">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center justify-center size-9 rounded-md bg-muted text-foreground">
                <ContactRound className="size-4" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <DialogTitle className="font-heading text-lg sm:text-xl tracking-tight text-foreground">
                  {t.title}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground text-sm sm:text-base">
                  {t.description}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="px-6 pb-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="space-y-4"
              noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">{t.labels.name}</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.placeholders.name}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className="bg-white"
                    autoComplete="name"
                  />
                  {errors.name && (
                    <p id="name-error" className="text-destructive text-xs">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">{t.labels.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.placeholders.email}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className="bg-white"
                    autoComplete="email"
                  />
                  {errors.email && (
                    <p id="email-error" className="text-destructive text-xs">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="phone">{t.labels.phone}</Label>
                  <div className="relative">
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t.placeholders.phone}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                      className="bg-white pr-10"
                      autoComplete="tel"
                    />
                    <Phone
                      className="size-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2"
                      aria-hidden="true"
                    />
                  </div>
                  {errors.phone && (
                    <p id="phone-error" className="text-destructive text-xs">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="property">{t.labels.property}</Label>
                  <Select value={property} onValueChange={(v) => setProperty(v)}>
                    <SelectTrigger id="property" className="bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {options.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="location">{t.labels.location}</Label>
                <div className="flex items-stretch gap-2">
                  <div className="relative flex-1 min-w-0">
                    <Input
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder={t.placeholders.location}
                      className="bg-white pr-10"
                    />
                    <MapPin
                      className="size-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2"
                      aria-hidden="true"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={openMaps}
                    className="shrink-0"
                    aria-label={t.ctas.openMaps}>
                    <Map className="size-4 mr-2" aria-hidden="true" />
                    {t.ctas.openMaps}
                  </Button>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="message">{t.labels.message}</Label>
                  <span className="text-xs text-muted-foreground">
                    <MessageCircleQuestionMark className="inline size-3 mr-1" aria-hidden="true" />
                    {Math.max(0, 10 - (message.trim().length || 0))}+
                  </span>
                </div>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.placeholders.message}
                  rows={2.5}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className="bg-white resize-none leading-5 overflow-y-auto scrollbar-none wrap-break-word"
                />
                {errors.message && (
                  <p id="message-error" className="text-destructive text-xs">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={openWhatsApp}
                  className="transition-colors"
                  aria-label={t.ctas.whatsapp}>
                  <Phone className="size-4 mr-2" aria-hidden="true" />
                  {t.ctas.whatsapp}
                </Button>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  {t.ctas.cancel}
                </Button>
                <div className="ml-auto flex gap-2">
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="bg-primary text-white hover:opacity-95">
                    {submitting ? (
                      <>
                        <Mailbox className="size-4 mr-2 animate-pulse" aria-hidden="true" />
                        {t.ctas.send}
                      </>
                    ) : (
                      <>
                        <HousePlus className="size-4 mr-2 " aria-hidden="true" />
                        {t.ctas.send}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
