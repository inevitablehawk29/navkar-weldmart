import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Package, Factory, Ruler, Home } from "lucide-react";
import { services } from "@/content";
import { SectionLabel } from "@/components/shared/section-label";
import { ContactCTA } from "@/components/sections/contact/ContactCTA";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { FadeIn } from "@/components/animations/fade-in";

const iconMap: Record<string, React.ReactNode> = {
  Package: <Package className="w-8 h-8" />,
  Factory: <Factory className="w-8 h-8" />,
  Ruler: <Ruler className="w-8 h-8" />,
  Home: <Home className="w-8 h-8" />,
};

export const metadata = {
  title: "Our Services",
  description: "Comprehensive iron and steel fabrication services, from material supply to heavy structural engineering.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-surface border-b border-border">
        <div className="container-wide">
          <FadeIn className="max-w-3xl">
            <SectionLabel className="mb-6">Our Services</SectionLabel>
            <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-heading text-foreground leading-[0.95] tracking-tight mb-8">
              Everything under <br />
              <span className="text-muted">one roof.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted leading-relaxed max-w-2xl">
              From sourcing premium materials to precision fabrication and safe on-site erection, we provide end-to-end structural solutions.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-background">
        <div className="container-wide">
          <FadeIn delay={0.2} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {services.map((service) => (
              <Link 
                key={service.id} 
                href={service.id === "material-supply" ? "/material-supply" : `/services/${service.slug}`}
                className="group block"
              >
                <Card className="flex flex-col h-full bg-card overflow-hidden hover:border-accent transition-colors duration-300 shadow-sm hover:shadow-md p-0 gap-0 border border-border rounded-xl">
                  <div className="relative h-64 w-full bg-surface overflow-hidden shrink-0">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-6 left-6 w-16 h-16 bg-accent rounded-full flex items-center justify-center text-white shadow-lg">
                      {iconMap[service.icon]}
                    </div>
                  </div>
                  
                  <CardContent className="p-8 lg:p-10 flex-1 flex flex-col pt-8">
                    <CardTitle className="text-2xl md:text-3xl font-heading text-foreground mb-4">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-lg text-muted mb-8 line-clamp-2">
                      {service.description}
                    </CardDescription>
                    
                    <div className="mt-auto flex items-center text-accent font-medium uppercase tracking-wider text-sm group-hover:text-accent-dark transition-colors">
                      Explore Service
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </FadeIn>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
