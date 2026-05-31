"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionLabel } from "@/components/shared/section-label";
import { processSteps } from "@/content";
import { DynamicIcon } from "@/components/shared/dynamic-icon";
import { cn } from "@/lib/utils";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SteelBeamProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      // 1. Beam Growth Animation
      // The beam grows from height 0 to 100% as the user scrolls through the steps container
      const beamAnim = gsap.fromTo(
        beamRef.current,
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: stepsContainerRef.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
        }
      );

      // 2. Node & Card Activation
      // We activate each node/card when the center of the viewport hits the node
      // Because the beam's bottom corresponds to the scroll progress, this feels connected.
      nodesRef.current.forEach((node, i) => {
        if (!node) return;
        const card = cardsRef.current[i];

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: node,
            start: "top center", // Activates exactly when beam reaches it (assuming beam growth is also top->bottom center)
            toggleActions: "play none none reverse",
          },
        });

        // Node fill/activate
        tl.to(node, {
          backgroundColor: "var(--primary)", // Custom property or utility
          borderColor: "var(--primary)",
          duration: 0.3,
          ease: "power2.out",
        })
          // Card fade in and slide up slightly
          .fromTo(
            card,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "-=0.1" // start slightly before node finishes
          );
      });

      return () => {
        beamAnim.kill();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      id="steel-process"
      className="py-24 lg:py-32 bg-zinc-50 relative overflow-hidden"
      ref={containerRef}
    >
      <div className="container-wide">
        <div className="text-center mb-16 lg:mb-24">
          <SectionLabel>How We Work</SectionLabel>
          <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] text-foreground mt-4 leading-[0.95]">
            The Navkar
            <br />
            Fabrication Process<span className="text-primary">.</span>
          </h2>
        </div>

        <div className="relative max-w-5xl mx-auto" ref={stepsContainerRef}>
          {/* ── Steel Beam (Center) ── */}
          {/* The beam uses border to simulate flanges and background for the web */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 z-0">
            {/* The structural track (ghost beam) */}
            <div className="absolute inset-0 bg-zinc-200 border-x-4 border-zinc-300 opacity-50" />
            
            {/* The active growing beam */}
            <div
              ref={beamRef}
              className="absolute top-0 w-full bg-zinc-700 border-x-[6px] border-zinc-900 z-10 shadow-sm"
              style={{
                // If reduced motion, always fully extended
                height: prefersReducedMotion ? "100%" : "0%",
              }}
            />
          </div>

          {/* ── Process Steps ── */}
          <div className="relative z-20 flex flex-col gap-12 md:gap-24">
            {processSteps.map((step, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={step.number}
                  className={cn(
                    "relative flex items-center w-full",
                    isEven ? "md:justify-start" : "md:justify-end"
                  )}
                >
                  {/* 
                    Connection Node (Bolting Plate)
                    On mobile, aligned to left beam. On desktop, aligned to center beam.
                  */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center">
                    <div
                      ref={(el) => {
                        nodesRef.current[index] = el;
                      }}
                      className="w-12 h-12 bg-zinc-100 border-4 border-zinc-300 rounded flex items-center justify-center shadow-sm"
                      style={{
                        // Initial state for non-reduced motion
                        backgroundColor: prefersReducedMotion ? "var(--primary)" : "",
                        borderColor: prefersReducedMotion ? "var(--primary)" : "",
                      }}
                    >
                      {/* Simulating rivets/bolts on the connection plate */}
                      <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-zinc-800/20" />
                      <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-zinc-800/20" />
                      <div className="absolute bottom-1 left-1 w-1.5 h-1.5 rounded-full bg-zinc-800/20" />
                      <div className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-zinc-800/20" />
                      
                      <span className="font-heading text-lg font-bold text-zinc-900">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div
                    ref={(el) => {
                      cardsRef.current[index] = el;
                    }}
                    className={cn(
                      "pl-20 md:pl-0 w-full md:w-[calc(50%-4rem)]",
                      isEven ? "md:pr-16" : "md:pl-16"
                    )}
                    style={{
                      // Initial state for non-reduced motion
                      opacity: prefersReducedMotion ? 1 : 0,
                      transform: prefersReducedMotion ? "none" : "translateY(20px)",
                    }}
                  >
                    <div className="bg-white p-6 md:p-8 border border-zinc-200 shadow-sm relative">
                      {/* Industrial connector visual on desktop */}
                      <div
                        className={cn(
                          "hidden md:block absolute top-1/2 -translate-y-1/2 w-8 h-2 bg-zinc-300",
                          isEven ? "-right-8" : "-left-8"
                        )}
                      />
                      
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 border border-zinc-200 flex items-center justify-center text-primary bg-zinc-50">
                          <DynamicIcon
                            name={step.icon}
                            className="w-5 h-5"
                            strokeWidth={1.5}
                          />
                        </div>
                        <h3 className="font-body text-sm font-semibold uppercase tracking-[0.1em] text-zinc-900">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-zinc-500 leading-relaxed text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
