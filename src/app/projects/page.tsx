import { projects } from "@/content";
import { ProjectCard } from "@/components/cards/project-card";
import { SectionLabel } from "@/components/shared/section-label";
import { ContactCTA } from "@/components/sections/contact/ContactCTA";
import { FadeIn } from "@/components/animations/fade-in";
import { BlueprintToReality } from "@/components/sections/blueprint-to-reality";

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
  return (
    <>
      <section className="pt-24 pb-8 lg:pt-32 lg:pb-12 bg-surface border-b border-border">
        <div className="container-wide">
          <FadeIn className="max-w-5xl">
            <SectionLabel className="mb-4">Our Portfolio</SectionLabel>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading text-foreground leading-tight tracking-tight">
              Built on precision. <span className="text-muted whitespace-nowrap">Engineered to last.</span>
            </h1>
          </FadeIn>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-background">
        <div className="container-wide">
          <FadeIn delay={0.2} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 w-full mx-auto">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} className="w-full sm:w-full lg:w-full" />
            ))}
          </FadeIn>
        </div>
      </section>

      <BlueprintToReality />

      <ContactCTA />
    </>
  );
}
