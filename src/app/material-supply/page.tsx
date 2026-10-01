import { materialCategories, companyInfo } from "@/content";
import { PageHeader, FactTable } from "@/components/shared/page-header";
import { MaterialCatalogue, MillLogos } from "@/components/sections/material-catalogue";
import { FaqSection } from "@/components/shared/faq-list";
import { QuoteModal } from "@/components/layout/quote-modal";

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

      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Material Supply" }]}
        title="Steel sections and supplies, stocked in Indore"
        lead={
          <p>
            Structural sections, pipes, sheets, bright bars and welding consumables, bought
            direct from the mills. Order material on its own or as part of a fabrication job.
          </p>
        }
        imageLayout="side"
        below={
          <FactTable
            className="max-w-md"
            rows={[
              { label: "Minimum order", value: companyInfo.moq.weight.replace("Tons", "tonnes") },
              { label: "or order value", value: companyInfo.moq.value.replace("Lacs", "lakh") },
              { label: "Dispatch", value: "Across Madhya Pradesh" },
            ]}
          />
        }
        image={{ src: "/images/portfolio/moq-2.webp", alt: "Stacks of steel hollow sections in a stockyard" }}
      />

      <section className="section-y bg-galv-100">
        <div className="container-wide grid gap-x-16 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="type-h2 max-w-[9ch]">What we stock</h2>
            <p className="mt-6 max-w-[36ch] text-steel-500">{companyInfo.moq.note}</p>
            <QuoteModal>
              <button className="btn btn-primary mt-8">Ask for a price</button>
            </QuoteModal>
          </div>
          <MaterialCatalogue className="lg:col-span-8" />
        </div>

        <div className="container-wide mt-20 grid gap-6 border-t border-zinc-line pt-8 lg:grid-cols-12 lg:gap-16">
          <p className="type-label text-steel-500 lg:col-span-3">Mills and brands we buy from</p>
          <MillLogos className="lg:col-span-9" />
        </div>
      </section>

      <FaqSection />
    </>
  );
}
