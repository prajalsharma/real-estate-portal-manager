import { Building2, Users, Award, TrendingUp, MapPin, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <main className="w-full">
        {/* Hero Section */}
        <section className="relative w-full bg-linear-to-br from-primary/10 via-background to-primary/5 py-16 sm:py-20 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-2 hero-heading">
                About Spasic Real Estate
              </h1>
              <p className="text-lg sm:text-xl text-foreground/80 leading-relaxed">
                Your trusted partner in discovering exceptional properties across Halkidiki and
                Greece
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop"
                  alt="Luxury Greek villa"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-6">
                <h2 className="hero-heading text-3xl sm:text-4xl font-bold text-foreground">
                  Our Story
                </h2>
                <div className="space-y-4 text-foreground/80 leading-relaxed text-base sm:text-lg">
                  <p>
                    Founded with a passion for connecting people with their dream homes, Spasic Real
                    Estate has become a leading name in the Halkidiki property market. Our deep
                    understanding of the region, combined with years of experience, allows us to
                    offer unparalleled service to our clients.
                  </p>
                  <p>
                    We specialize in luxury properties, from stunning seaside maisonettes to prime
                    commercial spaces and investment opportunities. Whether you're looking for a
                    permanent residence, a vacation home, or a strategic investment, we have the
                    expertise to guide you every step of the way.
                  </p>
                  <p>
                    Our multilingual team serves clients from around the world, offering
                    personalized service in English, Greek, Serbian, Russian, and Bulgarian. This
                    international approach, combined with local expertise, makes us uniquely
                    positioned to serve diverse clientele.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Grid */}
        <section className="bg-muted/30 py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="hero-heading text-3xl sm:text-4xl font-bold text-foreground text-center mb-12">
                Why Choose Us
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <ValueCard
                  icon={<MapPin className="h-8 w-8" />}
                  title="Local Expertise"
                  description="Deep knowledge of Halkidiki's property market, neighborhoods, and investment opportunities."
                />
                <ValueCard
                  icon={<Users className="h-8 w-8" />}
                  title="Multilingual Service"
                  description="Professional support in 5 languages: English, Greek, Serbian, Russian, and Bulgarian."
                />
                <ValueCard
                  icon={<Award className="h-8 w-8" />}
                  title="Proven Track Record"
                  description="Years of successful transactions and satisfied clients across Greece and internationally."
                />
                <ValueCard
                  icon={<TrendingUp className="h-8 w-8" />}
                  title="Investment Insights"
                  description="Strategic guidance on property investments with strong ROI potential in growing markets."
                />
                <ValueCard
                  icon={<Building2 className="h-8 w-8" />}
                  title="Diverse Portfolio"
                  description="Exclusive listings of maisonettes, apartments, commercial spaces, land, and rentals."
                />
                <ValueCard
                  icon={<Heart className="h-8 w-8" />}
                  title="Client-First Approach"
                  description="Personalized service tailored to your unique needs, timeline, and budget."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="hero-heading text-3xl sm:text-4xl font-bold text-foreground">
              Our Mission
            </h2>
            <p className="text-lg sm:text-xl text-foreground/80 leading-relaxed">
              To make the dream of owning property in Greece accessible and seamless for everyone.
              We believe in transparency, integrity, and excellence in every transaction. Our goal
              is not just to find you a property, but to help you discover your perfect place in
              paradise.
            </p>
            <div className="pt-8">
              <div className="inline-block bg-primary/10 rounded-2xl px-8 py-6">
                <p className="text-2xl sm:text-3xl font-heading font-bold text-primary">
                  "Your Home, Our Commitment"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-linear-to-br from-primary/90 to-primary py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                Ready to Find Your Dream Property?
              </h2>
              <p className="text-lg sm:text-xl text-white/90 leading-relaxed">
                Let our experienced team guide you through every step of your real estate journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl bg-white text-primary px-8 py-4 text-lg font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  Contact Us Today
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 text-lg font-bold hover:bg-white/20 transition-all duration-300">
                  View Properties
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function ValueCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border/50">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 text-primary mb-4">
        {icon}
      </div>
      <h3 className="font-heading text-xl font-bold text-foreground mb-3">{title}</h3>
      <p className="text-foreground/70 leading-relaxed">{description}</p>
    </div>
  );
}
