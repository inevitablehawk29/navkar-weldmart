"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { SectionLabel } from "@/components/shared/section-label";
import { services } from "@/content";
import { DynamicIcon } from "@/components/shared/dynamic-icon";
import { ArrowRight } from "lucide-react";

export function ServicesOverview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="services"
      className="py-20 lg:py-28 bg-surface border-y border-border"
      ref={ref}
    >
      <div className="container-wide">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
          {/* Left — Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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
          </motion.div>

          {/* Right — Service Cards */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
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
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-accent hover:text-accent-dark transition-colors group"
                >
                  Explore
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
