import { notFound } from "next/navigation";

import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { services } from "@/content";
import { SectionLabel } from "@/components/shared/section-label";
import { ContactCTA } from "@/components/sections/contact/ContactCTA";
import { SteelBeamProcess } from "@/components/sections/steel-beam-process";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from "@/components/animations/fade-in";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: "Service Not Found" };
  
  const siteUrl = "https://navkarweldmart.com";
  
  return {
    title: `${service.title} | Services`,
    description: service.description,
    openGraph: {
      title: `${service.title} | Navkar Weldmart`,
      description: service.description,
      url: `${siteUrl}/services/${service.slug}`,
      images: [
        {
          url: `${siteUrl}${service.image}`,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | Navkar Weldmart`,
      description: service.description,
      images: [`${siteUrl}${service.image}`],
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  
  if (slug === "material-supply") {
    // Should be handled by top-level material-supply page, redirect or show 404
    notFound();
  }
  
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://navkarweldmart.com/services/${service.slug}#service`,
    "name": service.title,
    "description": service.description,
    "provider": {
      "@type": "LocalBusiness",
      "@id": "https://navkarweldmart.com/#localbusiness",
      "name": "Navkar Weldmart"
    },
    "areaServed": [
      {
        "@type": "AdministrativeArea",
        "name": "Indore"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Bhopal"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Madhya Pradesh"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": service.title,
      "itemListElement": service.features.map((feature, i) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": feature
        }
      }))
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-surface border-b border-border">
        <div className="container-wide">
          <Link 
            href="/services" 
            className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Column: Intro Text */}
            <FadeIn className="lg:col-span-5 flex flex-col justify-start pt-2 lg:pt-4">
              <SectionLabel className="mb-4">Our Expertise</SectionLabel>
              <h1 className="text-4xl lg:text-5xl font-heading text-foreground leading-[1.1] tracking-tight mb-6">
                {service.title}
              </h1>
              <p className="text-lg text-muted leading-relaxed mb-10">
                {service.description}
              </p>
              
              <div className="pt-8 border-t border-border">
                <h2 className="text-2xl font-heading text-foreground mb-3">Service Capabilities</h2>
                <p className="text-sm text-muted leading-relaxed">
                  We specialize in delivering high-quality solutions tailored to your specific project requirements, ensuring safety and precision.
                </p>
              </div>
            </FadeIn>
            
            {/* Right Column: Capabilities Grid */}
            <FadeIn delay={0.2} className="lg:col-span-7">
              <div className="flex flex-wrap gap-4 lg:gap-6">
                {service.features.map((feature: string, index: number) => (
                  <Card key={index} className="w-full sm:w-[280px] bg-background border border-border rounded-2xl hover:border-accent hover:shadow-md transition-all duration-300 p-0 gap-0">
                    <CardContent className="p-6 flex flex-col items-start">
                      <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent mb-4 shrink-0">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-semibold text-foreground leading-snug">{feature}</h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <SteelBeamProcess />
      <ContactCTA />
    </>
  );
}
