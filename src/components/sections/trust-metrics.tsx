"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { trustMetrics } from "@/content";
import { DynamicIcon } from "@/components/shared/dynamic-icon";

import { CountUp } from "@/components/ui/count-up";

export function TrustMetrics() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="trust-metrics"
      className="py-16 lg:py-20 border-y border-border bg-surface"
      ref={ref}
    >
      <div className="container-wide">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {trustMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex items-start gap-4"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-none border border-border flex items-center justify-center text-accent">
                <DynamicIcon name={metric.icon} className="w-6 h-6" />
              </div>
              <div>
                <CountUp target={metric.value} className="font-heading text-4xl sm:text-5xl lg:text-6xl leading-none tracking-tight" />
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-foreground mt-1">
                  {metric.label}
                </p>
                <p className="text-xs text-muted mt-0.5">{metric.sublabel}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
