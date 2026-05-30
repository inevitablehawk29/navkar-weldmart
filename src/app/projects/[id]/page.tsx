import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import { projects } from "@/content";
import { SectionLabel } from "@/components/shared/section-label";
import { ContactCTA } from "@/components/sections/contact/ContactCTA";
import { FadeIn } from "@/components/animations/fade-in";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return { title: "Project Not Found" };
  
  return {
    title: `${project.title} | Projects`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <>
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-surface border-b border-border">
        <div className="container-wide">
          <Link 
            href="/projects" 
            className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Column: Intro Text */}
            <FadeIn className="lg:col-span-5 flex flex-col justify-start pt-2 lg:pt-4">
              <SectionLabel className="mb-4">{project.category}</SectionLabel>
              <h1 className="text-4xl lg:text-5xl font-heading text-foreground leading-[1.1] tracking-tight mb-6">
                {project.title}
              </h1>
              <p className="text-lg text-muted leading-relaxed mb-10">
                {project.description}
              </p>
              
              <div className="pt-8 border-t border-border">
                <h2 className="text-2xl font-heading text-foreground mb-4">Project Details</h2>
                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                  {project.client && (
                    <div>
                      <p className="text-xs text-muted uppercase tracking-wider mb-1">Client</p>
                      <p className="text-base font-medium text-foreground">{project.client}</p>
                    </div>
                  )}
                  {project.location && (
                    <div>
                      <p className="text-xs text-muted uppercase tracking-wider mb-1">Location</p>
                      <p className="text-base font-medium text-foreground flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-accent" />
                        {project.location}
                      </p>
                    </div>
                  )}
                  {project.year && (
                    <div>
                      <p className="text-xs text-muted uppercase tracking-wider mb-1">Year</p>
                      <p className="text-base font-medium text-foreground">{project.year}</p>
                    </div>
                  )}
                  {project.specs && (
                    <div>
                      <p className="text-xs text-muted uppercase tracking-wider mb-1">Scale</p>
                      <p className="text-base font-medium text-foreground">{project.specs}</p>
                    </div>
                  )}
                </div>
              </div>
            </FadeIn>
            
            {/* Right Column: Gallery */}
            <FadeIn delay={0.2} className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                {project.gallery.map((img: string, index: number) => (
                  <div key={index} className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-sm bg-muted/10 border border-border group">
                    <Image
                      src={img}
                      alt={`${project.title} - View ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
