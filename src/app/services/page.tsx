import Image from "next/image";
import Link from "next/link";
import { services, faqs } from "@/content";
import { PageHeader } from "@/components/shared/page-header";
import { FaqSection } from "@/components/shared/faq-list";

export const metadata = {
  title: "Our Services",
  description: "Comprehensive iron and steel fabrication services, from material supply to heavy structural engineering.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    url: "/services",
    title: "Our Services | Navkar Weldmart",
    description: "Comprehensive iron and steel fabrication services, from material supply to heavy structural engineering.",
  },
  twitter: {
    title: "Our Services | Navkar Weldmart",
    description: "Comprehensive iron and steel fabrication services, from material supply to heavy structural engineering.",
  },
};

const ordered = [
  ...services.filter((s) => s.slug !== "material-supply"),
  ...services.filter((s) => s.slug === "material-supply"),
];

export default function ServicesPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://navkarweldmart.com" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://navkarweldmart.com/services" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const serviceSchemas = services.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "LocalBusiness",
      name: "Navkar Weldmart",
    },
    areaServed: "Madhya Pradesh",
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema, ...serviceSchemas]) }}
      />
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        title="Everything a steel job needs, from one team"
        lead={
          <p>
            Industrial sheds and warehouse structures, architectural metalwork, residential
            fabrication and material supply across Madhya Pradesh. We source the steel,
            fabricate it in our workshop and erect it on site.
          </p>
        }
      />

      <section className="bg-galv-100 pb-24 lg:pb-36">
        <div className="container-wide">
          <ol className="border-t border-foreground">
            {ordered.map((service, i) => {
              const href = service.slug === "material-supply" ? "/material-supply" : `/services/${service.slug}`;
              return (
                <li key={service.id} className="border-b border-zinc-line">
                  <Link href={href} className="group grid gap-8 py-10 lg:grid-cols-12 lg:gap-16 lg:py-14">
                    <div className={`relative aspect-[4/3] overflow-hidden bg-mill-900 lg:col-span-5 ${i % 2 ? "lg:order-2 lg:col-start-8" : ""}`}>
                      <Image
                        src={service.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 40vw, 100vw"
                        className="photo-grade object-cover transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.035]"
                      />
                    </div>
                    <div className={`flex flex-col lg:col-span-6 ${i % 2 ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"}`}>
                      <h2 className="type-h2 transition-colors duration-300 group-hover:text-arc">{service.title}</h2>
                      <p className="type-lead mt-5 max-w-[42ch] text-steel-500">{service.description}</p>
                      <ul className="mt-8 border-t border-zinc-line">
                        {service.features.map((f) => (
                          <li key={f} className="border-b border-zinc-line py-2.5 text-[0.9375rem]">
                            {f}
                          </li>
                        ))}
                      </ul>
                      <span className="mt-8 self-start text-[0.9375rem] font-semibold text-arc">
                        <span className="link-rule">
                          {service.slug === "material-supply" ? "See what we stock" : `About ${service.title.toLowerCase()}`}
                        </span>
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <FaqSection />
    </>
  );
}
