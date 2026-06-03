import Link from "next/link";
import { SectionLabel } from "@/components/shared/section-label";
import { services } from "@/content";
import { DynamicIcon } from "@/components/shared/dynamic-icon";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";

export function ServicesOverview() {
  return (
    <section
      id="services"
      className="py-20 lg:py-28 bg-surface border-y border-border"
    >
      <div className="container-wide">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
          {/* Left — Heading */}
          <FadeIn
            viewTrigger
            direction="up"
            className="lg:w-[300px] lg:flex-shrink-0"
          >
            <SectionLabel>What We Do</SectionLabel>
            <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] text-foreground mt-4 leading-[0.95]">
              End-to-end steel
              <br />
              solutions under
              <br />
              one roof<span className="text-primary">.</span>
            </h2>
          </FadeIn>

          {/* Right — Service Cards */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
            {services.map((service, index) => (
              <FadeIn
                key={service.id}
                viewTrigger
                direction="up"
                delay={index * 0.1}
              >
                <div className="text-accent mb-4">
                  <DynamicIcon name={service.icon} className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <h3 className="font-body text-sm font-semibold uppercase tracking-[0.1em] text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-4">
                  {service.description}
                </p>
                <Link
                  href={service.slug === "material-supply" ? `/${service.slug}` : `/services/${service.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-accent hover:text-accent-dark transition-colors group"
                >
                  Explore
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

