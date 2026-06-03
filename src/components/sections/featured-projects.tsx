"use client";

import { useRef } from "react";
import Link from "next/link";
import * as m from "framer-motion/m";
import { useInView } from "framer-motion";
import { SectionLabel } from "@/components/shared/section-label";
import { ProjectCard } from "@/components/cards/project-card";
import { projects } from "@/content";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function FeaturedProjects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <section
      id="featured-projects"
      className="py-20 lg:py-28 bg-background"
      ref={sectionRef}
    >
      <div className="container-wide">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Left Column — Text */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:w-[280px] lg:flex-shrink-0 flex flex-col justify-between"
          >
            <div>
              <SectionLabel>Featured Projects</SectionLabel>
              <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] text-foreground mt-4 mb-6 leading-[0.95]">
                Projects that
                <br />
                speak for us<span className="text-primary">.</span>
              </h2>
              <p className="text-sm text-muted leading-relaxed max-w-xs">
                Every structure we build reflects our commitment to precision,
                quality and on-time delivery.
              </p>
            </div>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors mt-8 group"
            >
              View All Projects
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </m.div>

          {/* Right Column — Scrollable Cards */}
          <div className="flex-1 min-w-0 relative">
            <m.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Carousel
                opts={{ align: "start" }}
                className="w-full"
              >
                <CarouselContent className="-ml-5 pb-4">
                  {featuredProjects.map((project) => (
                    <CarouselItem key={project.id} className="pl-5 basis-auto">
                      <ProjectCard project={project} />
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {/* Scroll Arrows */}
                <div className="hidden lg:flex items-center gap-2 absolute -right-4 top-1/2 -translate-y-1/2 translate-x-full flex-col">
                  <CarouselNext 
                    variant="outline"
                    className="static transform-none w-10 h-10 rounded-none border-border text-foreground hover:bg-foreground hover:text-background transition-all"
                  />
                  <CarouselPrevious 
                    variant="outline"
                    className="static transform-none w-10 h-10 rounded-none border-border text-foreground hover:bg-foreground hover:text-background transition-all"
                  />
                </div>
              </Carousel>
            </m.div>
          </div>
        </div>
      </div>
    </section>
  );
}
