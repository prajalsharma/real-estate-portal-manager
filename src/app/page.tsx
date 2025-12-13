"use client";

import HeroSection from "@/components/HeroSection";
import RecommendedProperties from "@/components/RecommendedProperties";
import PropertyExplorer from "@/components/PropertyExplorer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useT } from "@/lib/i18n";

export default function Page() {
  const t = useT();

  return (
    <>
      <div className="animate-in fade-in duration-1000 ease-out">
        <HeroSection className="max-w-full" />
      </div>
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150 ease-out">
        <div className="max-w-7xl">
          <PropertyExplorer />
        </div>
      </section>
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-450 ease-out">
        <div className="max-w-7xl">
          <RecommendedProperties />
        </div>
      </section>
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-450 ease-out">
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
      </section>
    </>
  );
}
