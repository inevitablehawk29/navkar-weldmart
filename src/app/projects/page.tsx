import Image from "next/image";
import Link from "next/link";
import { projects, fabricationCategories } from "@/content";
import { ProjectCard } from "@/components/cards/project-card";
import { PageHeader } from "@/components/shared/page-header";

const serviceFor: Record<string, string> = {
  Gates: "residential-fabrication",
  Grills: "residential-fabrication",
  "Furniture & Interior": "residential-fabrication",
  Gazebo: "architectural-metalwork",
  Elevation: "architectural-metalwork",
  Railings: "architectural-metalwork",
  "Restoration & Retro Fitting": "architectural-metalwork",
  Signboards: "architectural-metalwork",
  "Warehouses & Factory Sheds": "structural-fabrication",
};

export const metadata = {
  title: "Our Projects",
  description: "Explore our portfolio of structural fabrication, architectural metalwork, and industrial sheds across Madhya Pradesh.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    url: "/projects",
    title: "Our Projects | Navkar Weldmart",
    description: "Explore our portfolio of structural fabrication, architectural metalwork, and industrial sheds across Madhya Pradesh.",
  },
  twitter: {
    title: "Our Projects | Navkar Weldmart",
    description: "Explore our portfolio of structural fabrication, architectural metalwork, and industrial sheds across Madhya Pradesh.",
  },
};

export default function ProjectsPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://navkarweldmart.com" },
      { "@type": "ListItem", position: 2, name: "Projects", item: "https://navkarweldmart.com/projects" }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]}
        title="Work we've fabricated and put up"
        lead={
          <p>
            Sports roofs, warehouses, heritage restoration and homes. A selection of the 900+
            jobs we&apos;ve delivered across Madhya Pradesh since 2012.
          </p>
        }
      />

      <section className="bg-galv-100 pb-24 lg:pb-32">
        <div className="container-wide grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              priority={i < 3}
              aspect="aspect-[4/3]"
            />
          ))}
        </div>
      </section>

      <section aria-labelledby="by-type" className="section-y-sm bg-galv-50">
        <div className="container-wide">
          <div className="grid gap-x-16 gap-y-6 lg:grid-cols-12">
            <h2 id="by-type" className="type-h2 lg:col-span-5">Work by type</h2>
            <p className="type-lead max-w-[46ch] self-end text-steel-500 lg:col-span-6 lg:col-start-7">
              The smaller jobs that make up most of our week: gates, grills, railings, facades
              and the rest.
            </p>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:mt-16">
            {fabricationCategories.map((c) => (
              <li key={c.title}>
                <Link href={`/services/${serviceFor[c.title] ?? "structural-fabrication"}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-galv-200">
                    <Image
                      src={c.image}
                      alt=""
                      fill
                      sizes="(min-width: 640px) 33vw, 50vw"
                      className="photo-grade object-cover transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.035]"
                    />
                  </div>
                  <p className="mt-3 flex items-baseline justify-between gap-3 border-t border-zinc-line pt-2.5">
                    <span className="font-semibold group-hover:text-arc">{c.title}</span>
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
