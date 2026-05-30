import Link from "next/link";
import { ArrowRight, Package, Factory, Ruler, Home } from "lucide-react";
import { services } from "@/content";
import { SectionLabel } from "@/components/shared/section-label";
import { ContactCTA } from "@/components/sections/contact/ContactCTA";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { FadeIn } from "@/components/animations/fade-in";

const iconMap: Record<string, React.ReactNode> = {
  Package: <Package className="w-6 h-6" />,
  Factory: <Factory className="w-6 h-6" />,
  Ruler: <Ruler className="w-6 h-6" />,
  Home: <Home className="w-6 h-6" />,
};

export const metadata = {
  title: "Our Services",
  description: "Comprehensive iron and steel fabrication services, from material supply to heavy structural engineering.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 bg-background border-b border-border">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
            {/* Left Side: Sticky Text */}
            <FadeIn className="lg:col-span-5 lg:sticky lg:top-32">
              <SectionLabel className="mb-6">Our Services</SectionLabel>
              <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-heading text-foreground leading-[0.95] tracking-tight mb-8">
                Everything under <br />
                <span className="text-muted">one roof.</span>
              </h1>
              <p className="text-lg text-muted leading-relaxed mb-8">
                From sourcing premium materials to precision fabrication and safe on-site erection, we provide end-to-end structural solutions tailored to your project requirements.
              </p>
              <div className="hidden lg:block accent-line" />
            </FadeIn>

            {/* Right Side: 2x2 Grid of Cards */}
            <div className="lg:col-span-7">
              <FadeIn delay={0.2} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((service) => (
                  <Link 
                    key={service.id} 
                    href={service.id === "material-supply" ? "/material-supply" : `/services/${service.slug}`}
                    className="group block h-full"
                  >
                    <Card className="h-full bg-card hover:border-accent transition-colors duration-300 shadow-sm hover:shadow-md border border-border rounded-xl">
                      <CardContent className="p-5 md:p-6 flex flex-col h-full">
                        <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center text-accent mb-4 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                          {iconMap[service.icon]}
                        </div>
                        <CardTitle className="text-lg md:text-xl font-heading text-foreground mb-2">
                          {service.title}
                        </CardTitle>
                        <CardDescription className="text-sm text-muted mb-4 flex-1 line-clamp-4">
                          {service.description}
                        </CardDescription>
                        
                        <div className="mt-auto flex items-center text-accent font-medium text-xs group-hover:text-accent-dark transition-colors">
                          Explore Service
                          <ArrowRight className="w-3 h-3 ml-1.5 transition-transform group-hover:translate-x-1" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
