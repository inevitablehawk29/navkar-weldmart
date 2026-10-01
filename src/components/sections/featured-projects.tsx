import Link from "next/link";
import { ProjectCard } from "@/components/cards/project-card";
import { projects } from "@/content";

// Plate sizes chosen for the photos we have: wide shots get wide plates,
// the one tall shot gets the tall plate. Two columns that run independently
// on desktop, so a tall plate never leaves a hole beside a short one.
const columns = [
  {
    className: "lg:col-span-7",
    items: [
      { id: "indore-tennis-club", aspect: "aspect-[16/10]", sizes: "(min-width: 1024px) 55vw, 100vw" },
      { id: "industrial-warehouse", aspect: "aspect-[4/3]", sizes: "(min-width: 1024px) 40vw, 100vw", className: "lg:w-[72%]" },
    ],
  },
  {
    className: "lg:col-span-4 lg:col-start-9 lg:pt-28",
    items: [
      { id: "ahilya-fort-resort", aspect: "aspect-[4/5]", sizes: "(min-width: 1024px) 30vw, 100vw" },
      { id: "residential-elevation", aspect: "aspect-[4/3]", sizes: "(min-width: 1024px) 30vw, 100vw" },
    ],
  },
];

export function FeaturedProjects() {
  return (
    <section id="featured-projects" className="section-y bg-mill-900 text-white">
      <div className="container-wide">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="type-h2 max-w-[14ch]">Recent work across Madhya Pradesh</h2>
          <Link href="/projects" className="type-label shrink-0 text-[0.9375rem] text-white/80 hover:text-white">
            <span className="link-rule">All {projects.length} projects</span>
          </Link>
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:mt-20 lg:grid-cols-12">
          {columns.map((col, c) => (
            <div key={c} className={`contents lg:flex lg:flex-col lg:gap-20 ${col.className}`}>
              {col.items.map((item) => {
                const project = projects.find((p) => p.id === item.id);
                if (!project) return null;
                return (
                  <ProjectCard
                    key={item.id}
                    project={project}
                    tone="dark"
                    aspect={item.aspect}
                    sizes={item.sizes}
                    className={"className" in item ? item.className : undefined}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
