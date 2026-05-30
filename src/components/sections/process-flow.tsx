"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionLabel } from "@/components/shared/section-label";
import { processSteps } from "@/content";
import { DynamicIcon } from "@/components/shared/dynamic-icon";

export function ProcessFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="process"
      className="py-20 lg:py-28 bg-background"
      ref={ref}
    >
      <div className="container-wide">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
          {/* Left — Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:w-[280px] lg:flex-shrink-0"
          >
            <SectionLabel>Our Process</SectionLabel>
            <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] text-foreground mt-4 leading-[0.95]">
              A process as
              <br />
              strong as our
              <br />
              steel<span className="text-primary">.</span>
            </h2>
          </motion.div>

          {/* Right — Steps */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-4">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-center lg:text-left relative z-0"
              >
                {/* Connecting Line (Desktop only) */}
                {index !== processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-12 w-[calc(100%-1rem)] h-[1px] bg-border -z-10" />
                )}
                <div className="flex justify-center lg:justify-start mb-4">
                  <div className="w-12 h-12 border border-border flex items-center justify-center text-muted">
                    <DynamicIcon name={step.icon} className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                </div>
                <span className="font-heading text-2xl text-accent tracking-wider">
                  {step.number}
                </span>
                <h3 className="font-body text-xs font-semibold uppercase tracking-[0.1em] text-foreground mt-1 mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
