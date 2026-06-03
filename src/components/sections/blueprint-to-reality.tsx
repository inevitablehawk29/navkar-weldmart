"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";

export function BlueprintToReality() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;

    Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger")
    ]).then(([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Ensure cleanup of previous scroll triggers if any
        const paths = gsap.utils.toArray<SVGPathElement>('.blueprint-path');
        
        // Set initial states for drawing effect
        paths.forEach(path => {
          const length = path.getTotalLength();
          gsap.set(path, { 
            strokeDasharray: length, 
            strokeDashoffset: length 
          });
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            end: "top -10%",
            scrub: 1, // Smooth scrubbing
          }
        });

        // Step 1: Draw the SVG paths in
        tl.to(paths, {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power1.inOut",
          stagger: {
            amount: 1, // Stagger drawing across 1 second of the timeline duration
            from: "random"
          }
        });

        // Step 2: Reveal the image via clip-path
        tl.to(imageRef.current, {
          clipPath: "circle(150% at 50% 50%)",
          duration: 2,
          ease: "power2.inOut",
        }, "-=0.5"); // Start slightly before drawing finishes

        // Step 3: Fade out SVG smoothly
        tl.to(svgRef.current, {
          opacity: 0,
          duration: 1,
          ease: "power1.inOut"
        }, "-=1.5");
      }, containerRef);
    });

    return () => {
      if (ctx) {
        ctx.revert();
      }
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full min-h-[70vh] flex flex-col items-center justify-center py-24 bg-zinc-950 overflow-hidden"
    >
      <div className="text-center mb-12 z-20 relative">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">Blueprint to Reality</h2>
        <p className="text-zinc-400 font-medium md:text-lg">Precision Planned. Professionally Built.</p>
      </div>

      <div className="relative w-full max-w-5xl aspect-video mx-auto px-4 md:px-8 z-10">
        {/* The Reality Image */}
        <div 
          ref={imageRef}
          className="absolute inset-0 z-10 px-4 md:px-8"
          style={{ clipPath: "circle(0% at 50% 50%)", willChange: "clip-path" }}
        >
          <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl">
            <Image 
              src="/images/portfolio/warehouse-1.webp"
              alt="Finished Steel Structure Warehouse"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* The Blueprint SVG */}
        <div className="absolute inset-0 px-4 md:px-8 z-20">
          <svg 
            ref={svgRef}
            viewBox="0 0 1000 562.5" 
            className="w-full h-full drop-shadow-none"
            fill="none" 
            stroke="#38bdf8" // Tailwind sky-400
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            style={{ willChange: "opacity" }}
          >
            {/* Main columns */}
            <path className="blueprint-path" d="M 100 500 L 100 150" />
            <path className="blueprint-path" d="M 300 500 L 300 150" />
            <path className="blueprint-path" d="M 500 500 L 500 150" />
            <path className="blueprint-path" d="M 700 500 L 700 150" />
            <path className="blueprint-path" d="M 900 500 L 900 150" />

            {/* Roof Truss Bottom Chord */}
            <path className="blueprint-path" d="M 80 150 L 920 150" />
            
            {/* Roof Truss Top Chord */}
            <path className="blueprint-path" d="M 80 150 L 500 50 L 920 150" />

            {/* Roof Truss Webbing (Left side) */}
            <path className="blueprint-path" d="M 100 150 L 150 138 L 150 150" />
            <path className="blueprint-path" d="M 150 138 L 200 126 L 200 150" />
            <path className="blueprint-path" d="M 200 126 L 250 114 L 250 150" />
            <path className="blueprint-path" d="M 250 114 L 300 102 L 300 150" />
            <path className="blueprint-path" d="M 300 102 L 400 78 L 400 150" />
            <path className="blueprint-path" d="M 400 78 L 500 50 L 500 150" />
            
            {/* Roof Truss Webbing (Right side) */}
            <path className="blueprint-path" d="M 900 150 L 850 138 L 850 150" />
            <path className="blueprint-path" d="M 850 138 L 800 126 L 800 150" />
            <path className="blueprint-path" d="M 800 126 L 750 114 L 750 150" />
            <path className="blueprint-path" d="M 750 114 L 700 102 L 700 150" />
            <path className="blueprint-path" d="M 700 102 L 600 78 L 600 150" />
            <path className="blueprint-path" d="M 600 78 L 500 50" />

            {/* Cross braces in walls */}
            <path className="blueprint-path" d="M 100 500 L 300 325" />
            <path className="blueprint-path" d="M 300 500 L 100 325" />
            
            <path className="blueprint-path" d="M 300 325 L 500 150" />
            <path className="blueprint-path" d="M 500 325 L 300 150" />

            <path className="blueprint-path" d="M 500 500 L 700 325" />
            <path className="blueprint-path" d="M 700 500 L 500 325" />
            
            <path className="blueprint-path" d="M 700 325 L 900 150" />
            <path className="blueprint-path" d="M 900 325 L 700 150" />

            {/* Horizontal girts / purlins in walls */}
            <path className="blueprint-path" d="M 100 325 L 900 325" />
            <path className="blueprint-path" d="M 100 412 L 900 412" />
          </svg>
        </div>
      </div>
    </section>
  );
}
