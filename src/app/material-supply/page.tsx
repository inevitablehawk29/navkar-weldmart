
import { materialCategories } from "@/content";
import { SectionLabel } from "@/components/shared/section-label";
import { ContactCTA } from "@/components/sections/contact/ContactCTA";
import { ShieldCheck, Truck, Award, MapPin, Package } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";

export const metadata = {
  title: "Material Supply",
  description: "Premium iron and steel materials for all your construction and fabrication needs.",
  alternates: {
    canonical: "/material-supply",
  },
  openGraph: {
    url: "/material-supply",
    title: "Material Supply | Navkar Weldmart",
    description: "Premium iron and steel materials for all your construction and fabrication needs.",
  },
  twitter: {
    title: "Material Supply | Navkar Weldmart",
    description: "Premium iron and steel materials for all your construction and fabrication needs.",
  },
};

export default function MaterialSupplyPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://navkarweldmart.com" },
      { "@type": "ListItem", position: 2, name: "Material Supply", item: "https://navkarweldmart.com/material-supply" },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Material Supply",
    description: "Premium iron and steel materials for all your construction and fabrication needs.",
    provider: { "@type": "LocalBusiness", name: "Navkar Weldmart" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Steel Materials",
      itemListElement: materialCategories.map((category, index) => ({
        "@type": "OfferCatalog",
        name: category.title,
        position: index + 1,
        itemListElement: category.items.map((item, itemIdx) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Product", name: item },
          position: itemIdx + 1,
        })),
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, serviceSchema]) }}
      />

      <section className="bg-surface border-b border-border">
        <div className="container-wide">
          {/* Outer wrapper: on mobile just pad normally; on desktop fill the viewport */}
          <div className="pt-28 pb-16 lg:min-h-screen lg:flex lg:items-start lg:pt-44 lg:pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start w-full">

              {/* ── Left Column ─────────────────────────── */}
              <FadeIn className="lg:col-span-5 flex flex-col">

                <SectionLabel className="mb-3">Material Supply</SectionLabel>

                <h1 className="font-heading font-black uppercase tracking-tight leading-[1.05] mb-5">
                  <span className="block text-4xl lg:text-5xl text-foreground">Premium steel</span>
                  <span className="block text-2xl lg:text-[1.75rem] text-muted/60 font-bold mt-1">for every build.</span>
                </h1>

                <p className="text-sm text-foreground/75 leading-relaxed mb-8">
                  Navkar Weldmart supplies premium grade structural steel, pipes, plates, and fabrication consumables directly from top manufacturers — ready for rapid dispatch across Madhya Pradesh.
                </p>

                {/* Our Inventory sub-section */}
                <div className="border-t border-border pt-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-5 h-5 text-accent shrink-0" strokeWidth={1.75} />
                    <h2 className="text-base font-black uppercase tracking-widest text-foreground">Our Inventory</h2>
                  </div>
                  <p className="text-sm text-foreground/60 leading-relaxed mb-6">
                    A comprehensive range of raw materials for projects of any scale.
                  </p>

                  {/* 4 pillars */}
                  <div className="flex gap-6">
                    {[
                      { icon: <ShieldCheck className="w-5 h-5 text-accent" strokeWidth={1.5} />, label: "Premium\nQuality" },
                      { icon: <Truck className="w-5 h-5 text-accent" strokeWidth={1.5} />, label: "Rapid\nDispatch" },
                      { icon: <Award className="w-5 h-5 text-accent" strokeWidth={1.5} />, label: "Trusted\nSources" },
                      { icon: <MapPin className="w-5 h-5 text-accent" strokeWidth={1.5} />, label: "Serving\nMP Wide" },
                    ].map(({ icon, label }) => (
                      <div key={label} className="flex flex-col items-center gap-1.5">
                        {icon}
                        <span className="text-[9px] font-bold tracking-wider uppercase text-foreground/80 leading-snug whitespace-pre-line text-center">
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* ── Right Column — Editorial index list ─── */}
              <FadeIn delay={0.15} className="lg:col-span-7">
                <div className="divide-y divide-border border-t border-border">
                  {materialCategories.map((category, idx) => (
                    <div
                      key={category.title}
                      className="py-4 lg:py-5 group hover:bg-foreground/[0.02] transition-colors duration-150 -mx-3 px-3 rounded-sm"
                    >
                      {/* Mobile: stacked. Desktop: side-by-side */}
                      <div className="flex flex-col sm:grid sm:grid-cols-[160px_1fr] sm:gap-x-8 sm:items-baseline gap-2">

                        {/* Category label */}
                        <div className="flex items-baseline gap-2.5">
                          <span className="text-[10px] font-semibold text-accent tracking-widest tabular-nums shrink-0">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <h3 className="text-sm font-black uppercase tracking-wide text-foreground leading-tight">
                            {category.title}
                          </h3>
                        </div>

                        {/* Items — inline on desktop, wrapped on mobile */}
                        <div className="flex flex-wrap gap-x-4 gap-y-1.5 items-center pl-[1.625rem] sm:pl-0">
                          {category.items.map((item: string, i: number) => (
                            <span key={item} className="flex items-center gap-1.5">
                              {i > 0 && <span className="w-px h-3 bg-border shrink-0" />}
                              <span className="text-[13px] text-foreground/60 font-normal">{item}</span>
                            </span>
                          ))}
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>

            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
