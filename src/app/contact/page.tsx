"use client";

import * as React from "react";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

import { useT } from "@/lib/i18n";
import { Toaster } from "@/components/ui/sonner";

export default function ContactPage() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = React.useState(false);
  const t = useT();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Message sent successfully!", {
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({ name: "", email: "", phone: "", message: "" });
    setLoading(false);
  };

  const handleWhatsAppClick = () => {
    // Replace with your actual WhatsApp number
    const phoneNumber = "306912345678"; // Example Greek number
    const message = encodeURIComponent(
      "Hello! I'm interested in learning more about your properties in Halkidiki."
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header initialCurrency="eur" initialLanguage="el" />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4">
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
                    className="w-full h-12 text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all">
                    {loading
                      ? t("contact.form.sending", "Sending...")
                      : t("contact.form.submit", "Send Message")}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="shadow-lg">
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
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-foreground mb-1">
                        {t("contact.info.phone", "Phone")}
                      </h3>
                      <a
                        href="tel:+306912345678"
                        className="text-foreground/70 hover:text-primary transition-colors">
                        +30 691 234 5678
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-foreground mb-1">
                        {t("contact.info.email", "Email")}
                      </h3>
                      <a
                        href="mailto:info@spasicrealestate.com"
                        className="text-foreground/70 hover:text-primary transition-colors break-all">
                        info@spasicrealestate.com
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
                        Kassandra, Halkidiki
                        <br />
                        Greece, 63077
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
                        Mon - Fri: 9:00 AM - 6:00 PM
                        <br />
                        Sat: 10:00 AM - 4:00 PM
                        <br />
                        Sun: Closed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* WhatsApp Button */}
              <Button
                onClick={handleWhatsAppClick}
                className="w-full h-14 text-lg font-bold bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all">
                <MessageCircle className="mr-2 h-5 w-5" />
                {t("contact.whatsapp", "Chat on WhatsApp")}
              </Button>
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d195167.85698423616!2d23.37!3d40.07!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a76a2b60919965%3A0xd8d2a0b3e8a3e3b8!2sKassandra%2C%20Greece!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
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

      <Footer className="border-t bg-background" />
      <Toaster />
    </div>
  );
}
