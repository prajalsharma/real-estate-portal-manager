"use client";

import * as React from "react";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

import { useT } from "@/lib/i18n";
import { Toaster } from "@/components/ui/sonner";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formErrors, setFormErrors] = React.useState({
    name: false,
    email: false,
    phone: false,
    message: false,
  });

  const [loading, setLoading] = React.useState(false);
  const t = useT();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^\+?[0-9]{10,15}$/; // Allows optional '+' and 10-15 digits
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = {
      name: !formData.name.trim(),
      email: !validateEmail(formData.email),
      phone: !validatePhoneNumber(formData.phone),
      message: !formData.message.trim(),
    };

    setFormErrors(errors);

    if (Object.values(errors).some((error) => error)) {
      return;
    }

    const text = `New Contact Message:
    Name: ${formData.name}
    Email: ${formData.email}
    Phone: ${formData.phone}
    Message: ${formData.message}`;

    const encodedText = encodeURIComponent(text);

    const whatsappUrl = `https://wa.me/306988588118?text=${encodedText}`;

    setLoading(true);

    window.open(whatsappUrl, "_blank");
    setLoading(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
    setFormErrors({
      name: false,
      email: false,
      phone: false,
      message: false,
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="hero-heading text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4">
              {t("contact.title", "Get in Touch")}
            </h1>
            <p className="text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto">
              {t(
                "contact.subtitle",
                "Have questions about our properties? We're here to help you find your dream home in Halkidiki."
              )}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 mb-12">
            {/* Contact Form */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  {t("contact.form.title", "Send us a message")}
                </CardTitle>
                <CardDescription className="text-base">
                  {t(
                    "contact.form.description",
                    "Fill out the form below and we'll respond as soon as possible."
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-semibold text-foreground">
                      {t("contact.form.name", "Full Name")}
                    </label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t("contact.form.namePlaceholder", "John Smith")}
                      required
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-foreground">
                      {t("contact.form.email", "Email Address")}
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t("contact.form.emailPlaceholder", "john@example.com")}
                      required
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-semibold text-foreground">
                      {t("contact.form.phone", "Phone Number")}
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={t("contact.form.phonePlaceholder", "+30 691 234 5678")}
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-semibold text-foreground">
                      {t("contact.form.message", "Message")}
                    </label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t(
                        "contact.form.messagePlaceholder",
                        "Tell us about your requirements..."
                      )}
                      required
                      rows={5}
                      className="resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 text-base font-bold bg-primary text-white cursor-pointer hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all">
                    {loading
                      ? t("contact.form.sending", "Sending...")
                      : t("contact.form.submit", "Send Message")}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6 h-full flex flex-col justify-between gap-3">
              <Card className="shadow-lg m-0">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    {t("contact.info.title", "Contact Information")}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {t(
                      "contact.info.description",
                      "Reach out to us directly through any of these channels."
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-10">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-foreground mb-1">
                        {t("contact.info.phone", "Phone")}
                      </h3>
                      <p className="text-foreground/70 hover:text-primary transition-colors">
                        +30 698 858 8118
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-foreground mb-1">
                        {t("contact.form.email", "Email")}
                      </h3>
                      <a
                        href="mailto:info@spasicrealestate.com"
                        className="text-foreground/70 hover:text-primary transition-colors break-all">
                        spasic-realestate@hotmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-foreground mb-1">
                        {t("contact.info.address", "Office Address")}
                      </h3>
                      <p className="text-foreground/70">
                        Kanellopoulou St, Nea Moudania Halkidiki Greece
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-foreground mb-1">
                        {t("contact.info.hours", "Business Hours")}
                      </h3>
                      <p className="text-foreground/70">
                        Mon - Sat: 10:00 AM - 10:00 PM
                        <br />
                        Sun: Closed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* WhatsApp Button */}
              <Link
                href="https://wa.me/306988588118"
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center rounded-sm w-full h-14 text-lg font-bold bg-green-500 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all gap-2">
                <img src="/whatsapp.svg" alt="" className="size-7 invert-100" />
                {t("contact.whatsapp", "Chat on WhatsApp")}
              </Link>
            </div>
          </div>

          {/* Google Maps */}
          <Card className="shadow-lg overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                {t("contact.map.title", "Find Us")}
              </CardTitle>
              <CardDescription className="text-base">
                {t("contact.map.description", "Visit our office in beautiful Halkidiki, Greece.")}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="w-full h-[400px] sm:h-[500px] md:h-[600px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d417.3415798928667!2d23.2825278!3d40.2467563!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a87b26eb3a4b9b%3A0x4054699e8e4521a0!2sSPASI%C4%86%20REAL%20ESTATE!5e1!3m2!1sen!2sar!4v1765651130756!5m2!1sen!2sar%22"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Spasic Real Estate Location"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Toaster />
    </div>
  );
}
