import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/content";
import { PageHeader, FactTable } from "@/components/shared/page-header";
import { QuoteModal } from "@/components/layout/quote-modal";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return { title: "Project Not Found" };
  
  const ogImage = project.coverImage || project.gallery?.[0] || "/og-image.jpg";

  return {
    title: `${project.title} | Projects`,
    description: project.description,
    alternates: {
      canonical: `/projects/${id}`,
    },
    openGraph: {
      url: `/projects/${id}`,
      title: `${project.title} | Projects | Navkar Weldmart`,
      description: project.description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      title: `${project.title} | Projects | Navkar Weldmart`,
      description: project.description,
      images: [ogImage],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  const idx = projects.findIndex((p) => p.id === project.id);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://navkarweldmart.com" },
      { "@type": "ListItem", position: 2, name: "Projects", item: "https://navkarweldmart.com/projects" },
      { "@type": "ListItem", position: 3, name: project.title, item: `https://navkarweldmart.com/projects/${project.id}` }
    ]
  };

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    image: project.coverImage || project.gallery?.[0],
    creator: {
      "@type": "LocalBusiness",
      name: "Navkar Weldmart"
    },
    dateCreated: project.year,
    locationCreated: {
      "@type": "Place",
      name: project.location
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbSchema, projectSchema])
        }}
      />
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Projects", href: "/projects" }, { label: project.title }]}
        title={project.title}
        lead={<p>{project.description}</p>}
        aside={
          <FactTable
            rows={[
              ...(project.client ? [{ label: "Client", value: project.client }] : []),
              { label: "Type", value: project.category },
              ...(project.location ? [{ label: "Location", value: project.location }] : []),
              ...(project.year ? [{ label: "Year", value: <span className="tabular">{project.year}</span> }] : []),
              ...(project.specs ? [{ label: "Scale", value: project.specs }] : []),
            ]}
          />
        }
      />

      <section className="bg-galv-100 pb-24 lg:pb-32">
        <div className="container-wide">
          <ul className="grid gap-3 sm:grid-cols-2 lg:gap-4">
            {project.gallery.map((img, index) => (
              <li
                key={img}
                className={`relative overflow-hidden bg-galv-200 ${
                  index === 0 || (index === project.gallery.length - 1 && project.gallery.length % 2 === 0)
                    ? "aspect-[4/3] sm:col-span-2 sm:aspect-[16/9]"
                    : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={img}
                  alt={`${project.title}, view ${index + 1}`}
                  fill
                  priority={index === 0}
                  sizes={index === 0 ? "100vw" : "(min-width: 640px) 50vw, 100vw"}
                  className="photo-grade object-cover"
                />
              </li>
            ))}
          </ul>

          <div className="mt-16 flex flex-col gap-6 border-t border-foreground pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="type-h3 max-w-[22ch]">Planning something similar?</p>
            <QuoteModal>
              <button className="btn btn-primary self-start">Request a quote</button>
            </QuoteModal>
          </div>
        </div>
      </section>

      <nav aria-label="More projects" className="bg-mill-900 text-white">
        <div className="container-wide grid sm:grid-cols-2">
          {[prev, next].map((p, i) => (
            <Link
              key={p.id + i}
              href={`/projects/${p.id}`}
              className={`group flex items-center gap-5 py-8 ${i === 1 ? "border-t border-white/10 sm:justify-end sm:border-l sm:border-t-0 sm:pl-8 sm:text-right" : "sm:pr-8"}`}
            >
              <div className={`relative h-20 w-28 shrink-0 overflow-hidden bg-mill-800 ${i === 1 ? "sm:order-2" : ""}`}>
                <Image src={p.coverImage} alt="" fill sizes="112px" className="photo-grade object-cover" />
              </div>
              <div>
                <span className="type-label text-steel-300">{i === 0 ? "Previous project" : "Next project"}</span>
                <span className="type-h3 mt-1 block group-hover:text-arc-light">{p.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
