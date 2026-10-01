import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { services, projects, processSteps } from "@/content";
import { PageHeader } from "@/components/shared/page-header";
import { ShedAssembly } from "@/components/sections/shed-assembly";
import { ProjectCard } from "@/components/cards/project-card";
import { QuoteModal } from "@/components/layout/quote-modal";

const img = (name: string) => `/images/portfolio/${name}.webp`;

// Photos from real jobs for each service, strongest first.
const galleries: Record<string, string[]> = {
  "structural-fabrication": ["warehouse-2", "warehouse-1", "warehouse-6", "warehouse-4", "warehouse-3", "warehouse-9"].map(img),
  "architectural-metalwork": ["elevation-2", "elevation-1", "gazebo-3", "railings-3", "signboards-4", "elevation-3"].map(img),
  "residential-fabrication": ["gates-2", "grills-3", "railings-2", "gates-3", "grills-2", "custom-3"].map(img),
};

const relatedCategories: Record<string, string[]> = {
  "structural-fabrication": ["Industrial", "Sports Infrastructure", "Commercial"],
  "architectural-metalwork": ["Architectural Metalwork", "Hospitality", "Restoration"],
  "residential-fabrication": ["Residential", "Architectural Metalwork", "Hospitality"],
};

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services
    .filter((service) => service.slug !== "material-supply")
    .map((service) => ({ slug: service.slug }));
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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://navkarweldmart.com" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://navkarweldmart.com/services" },
      { "@type": "ListItem", position: 3, name: service.title, item: `https://navkarweldmart.com/services/${service.slug}` }
    ]
  };

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
      "itemListElement": service.features.map((feature) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": feature
        }
      }))
    }
  };

  const gallery = galleries[service.slug] ?? [];
  const related = projects
    .filter((p) => relatedCategories[service.slug]?.includes(p.category))
    .slice(0, 3);
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, serviceSchema]) }}
      />

      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: service.title }]}
        title={service.title}
        lead={<p>{service.description}</p>}
        imageLayout="side"
        below={
          <div className="flex flex-wrap gap-3">
            <QuoteModal>
              <button className="btn btn-primary">Request a quote</button>
            </QuoteModal>
            <Link href="/projects" className="btn btn-outline">
              See projects
            </Link>
          </div>
        }
        image={{ src: service.image, alt: `${service.title} by Navkar Weldmart` }}
      />

      <section className="section-y bg-galv-100">
        <div className="container-wide grid gap-x-16 gap-y-10 lg:grid-cols-12">
          <h2 className="type-h2 max-w-[10ch] lg:col-span-4">What we make</h2>
          <ul className="border-t border-foreground lg:col-span-7 lg:col-start-6">
            {service.features.map((f) => (
              <li key={f} className="type-h3 border-b border-zinc-line py-5 text-[clamp(1.375rem,2.2vw,1.875rem)]">
                {f}
              </li>
            ))}
          </ul>
        </div>

        {gallery.length > 0 && (
          <div className="container-wide mt-20 lg:mt-28">
            <h2 className="type-label text-steel-500">From recent jobs</h2>
            <ul className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4">
              {gallery.map((src, i) => (
                <li
                  key={src}
                  className={`relative overflow-hidden bg-galv-200 ${i === 0 ? "col-span-2 row-span-2 aspect-square lg:aspect-auto" : "aspect-square"}`}
                >
                  <Image
                    src={src}
                    alt={`${service.title}, photo ${i + 1}`}
                    fill
                    sizes={i === 0 ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 50vw"}
                    className="photo-grade object-cover"
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {service.slug === "structural-fabrication" ? (
        <ShedAssembly />
      ) : (
        <section className="section-y-sm bg-galv-50">
          <div className="container-wide grid gap-x-16 gap-y-10 lg:grid-cols-12">
            <h2 className="type-h2 max-w-[10ch] lg:col-span-4">How the job runs</h2>
            <ol className="grid border-t border-foreground sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
              {processSteps.map((step) => (
                <li key={step.number} className="border-b border-zinc-line py-6 pr-6">
                  <span className="type-figure text-2xl text-steel-400">{step.number}</span>
                  <h3 className="type-h4 mt-3">{step.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-steel-500">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="section-y-sm bg-mill-900 text-white">
          <div className="container-wide">
            <h2 className="type-h2">Related projects</h2>
            <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProjectCard key={p.id} project={p} tone="dark" />
              ))}
            </div>
          </div>
        </section>
      )}

      <nav aria-label="Other services" className="bg-galv-100">
        <ul className="container-wide grid border-t border-zinc-line sm:grid-cols-3">
          {others.map((o) => (
            <li key={o.slug} className="border-b border-zinc-line sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0">
              <Link
                href={o.slug === "material-supply" ? "/material-supply" : `/services/${o.slug}`}
                className="group block py-8"
              >
                <span className="type-label text-steel-500">Also from us</span>
                <span className="type-h3 mt-2 block group-hover:text-arc">{o.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
