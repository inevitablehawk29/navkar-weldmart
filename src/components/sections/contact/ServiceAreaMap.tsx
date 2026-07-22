"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { mpPath } from "./mpPath";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// Relative geographical coordinates (approximate linear interpolation of Lat/Long for MP bounding box)
const CITIES = [
  { id: "indore", name: "Indore", rx: 0.211, ry: 0.715, isHub: true },
  { id: "ujjain", name: "Ujjain", rx: 0.203, ry: 0.635 },
  { id: "dewas", name: "Dewas", rx: 0.233, ry: 0.672 },
  { id: "bhopal", name: "Bhopal", rx: 0.387, ry: 0.621 },
  { id: "pithampur", name: "Pithampur", rx: 0.189, ry: 0.734 },
  { id: "mhow", name: "Mhow", rx: 0.200, ry: 0.745 },
  { id: "khargone", name: "Khargone", rx: 0.200, ry: 0.820 },
  { id: "maheshwar", name: "Maheshwar", rx: 0.180, ry: 0.780 },
  { id: "dhar", name: "Dhar", rx: 0.150, ry: 0.715 },
  { id: "aashta", name: "Aashta", rx: 0.300, ry: 0.660 },
  { id: "badnawar", name: "Badnawar", rx: 0.130, ry: 0.650 },
  { id: "manawar", name: "Manawar", rx: 0.110, ry: 0.770 },
  // Adding more decorative nodes to match the mockup
  { id: "gwalior", name: "Gwalior", rx: 0.290, ry: 0.150, isDecorative: true },
  { id: "jabalpur", name: "Jabalpur", rx: 0.680, ry: 0.600, isDecorative: true },
  { id: "rewa", name: "Rewa", rx: 0.850, ry: 0.380, isDecorative: true },
  { id: "satna", name: "Satna", rx: 0.780, ry: 0.350, isDecorative: true },
  { id: "khandwa", name: "Khandwa", rx: 0.270, ry: 0.850, isDecorative: true },
  { id: "chhindwara", name: "Chhindwara", rx: 0.540, ry: 0.810, isDecorative: true },
  { id: "sagar", name: "Sagar", rx: 0.540, ry: 0.450, isDecorative: true },
  { id: "ratlam", name: "Ratlam", rx: 0.080, ry: 0.620, isDecorative: true },
  { id: "guna", name: "Guna", rx: 0.360, ry: 0.350, isDecorative: true },
];

export function ServiceAreaMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapPathRef = useRef<SVGPathElement>(null);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [bbox, setBbox] = useState<{ x: number, y: number, w: number, h: number } | null>(null);
  const [viewBoxStr, setViewBoxStr] = useState("0 0 1000 1000");

  useEffect(() => {
    if (mapPathRef.current) {
      const b = mapPathRef.current.getBBox();
      // Add 5% padding around the path
      const pX = b.width * 0.05;
      const pY = b.height * 0.05;
      
      setBbox({
        x: b.x,
        y: b.y,
        w: b.width,
        h: b.height
      });
      setViewBoxStr(`${b.x - pX} ${b.y - pY} ${b.width + pX * 2} ${b.height + pY * 2}`);
    }
  }, []);

  useGSAP(() => {
    if (!bbox) return; // Wait for BBox to be calculated

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (prefersReducedMotion) {
      gsap.set(".gsap-map-element", { autoAlpha: 1 });
      gsap.set(mapPathRef.current, { strokeDashoffset: 0, autoAlpha: 1 });
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        once: true,
      }
    });

    if (mapPathRef.current) {
      const length = mapPathRef.current.getTotalLength();
      gsap.set(mapPathRef.current, { 
        strokeDasharray: length, 
        strokeDashoffset: length,
        autoAlpha: 1
      });
      tl.to(mapPathRef.current, {
        strokeDashoffset: 0,
        duration: 3,
        ease: "power2.inOut",
      });
    }

    tl.fromTo(".node-indore", 
      { scale: 0, autoAlpha: 0, transformOrigin: "center" },
      { scale: 1, autoAlpha: 1, duration: 1, ease: "power2.out" },
      "-=1.5"
    );

    const routes = gsap.utils.toArray(".route-line") as SVGPathElement[];
    routes.forEach((route) => {
      const len = route.getTotalLength();
      gsap.set(route, { strokeDasharray: len, strokeDashoffset: len, autoAlpha: 1 });
    });
    
    tl.to(".route-line", {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: "power2.out",
      stagger: 0.05
    }, "-=0.5");

    tl.fromTo(".node-secondary",
      { scale: 0, autoAlpha: 0, transformOrigin: "center" },
      { scale: 1, autoAlpha: 1, duration: 0.6, ease: "power2.out", stagger: 0.05 },
      "-=1.0"
    );
    
    tl.fromTo(".city-label",
      { autoAlpha: 0, x: -5 },
      { autoAlpha: 1, x: 0, duration: 0.5, stagger: 0.1 },
      "-=0.6"
    );

  }, { scope: containerRef, dependencies: [bbox] });

  // Map relative coords to absolute coords based on path bbox
  const getCoords = (rx: number, ry: number) => {
    if (!bbox) return { cx: 0, cy: 0 };
    return {
      cx: bbox.x + bbox.w * rx,
      cy: bbox.y + bbox.h * ry
    };
  };

  const indore = CITIES.find(c => c.isHub)!;
  const hubCoords = getCoords(indore.rx, indore.ry);

  // Dynamic stroke widths relative to viewBox scale
  const scale = bbox ? Math.max(bbox.w, bbox.h) / 800 : 1;

  return (
    <div ref={containerRef} className="relative w-full aspect-[4/3] max-w-[800px] mx-auto select-none">
      
      {/* Background Grid - Independent of viewBox scaling */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.05]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="bg-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
              <path d="M 0 40 L 40 40 40 0" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
              <circle cx="0" cy="0" r="1.5" fill="currentColor" className="text-foreground" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bg-grid)" />
        </svg>
      </div>

      <svg 
        viewBox={viewBoxStr} 
        className="w-full h-full relative z-10 overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Authentic MP Outline */}
        <path
          ref={mapPathRef}
          d={mpPath}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5 * scale}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-foreground/30 opacity-0"
        />

        {bbox && CITIES.filter(c => !c.isHub).map(city => {
          const coords = getCoords(city.rx, city.ry);
          
          // Bezier curve control points
          const dx = coords.cx - hubCoords.cx;
          const cx1 = hubCoords.cx + dx * 0.4;
          const cy1 = hubCoords.cy - Math.abs(dx) * 0.2; 
          
          const pathStr = `M ${hubCoords.cx} ${hubCoords.cy} Q ${cx1} ${cy1} ${coords.cx} ${coords.cy}`;
          
          const isHovered = hoveredCity === city.id || hoveredCity === indore.id;
          
          return (
            <path
              key={`route-${city.id}`}
              d={pathStr}
              fill="none"
              stroke="currentColor"
              strokeWidth={0.8 * scale}
              className={cn(
                "route-line text-accent/40 opacity-0 transition-all duration-300",
                isHovered && !city.isDecorative ? "text-accent" : ""
              )}
              style={{ strokeWidth: isHovered && !city.isDecorative ? 1.5 * scale : 0.8 * scale }}
            />
          );
        })}

        {bbox && CITIES.map((city) => {
          const isHovered = hoveredCity === city.id;
          const coords = getCoords(city.rx, city.ry);
          
          return (
            <g 
              key={city.id}
              className={cn(
                "gsap-map-element transition-all duration-300 ease-out",
                city.isDecorative ? "pointer-events-none" : "cursor-default",
                city.isHub ? "node-indore" : "node-secondary opacity-0"
              )}
              style={{ transformOrigin: `${coords.cx}px ${coords.cy}px` }}
              onMouseEnter={() => !city.isDecorative && setHoveredCity(city.id)}
              onMouseLeave={() => !city.isDecorative && setHoveredCity(null)}
            >
              {/* Pulse background */}
              {!city.isDecorative && (
                <circle
                  cx={coords.cx}
                  cy={coords.cy}
                  r={isHovered ? (city.isHub ? 18 * scale : 12 * scale) : (city.isHub ? 16 * scale : 10 * scale)}
                  className={cn(
                    "fill-accent/15 transition-all duration-300",
                    isHovered ? "opacity-100" : "opacity-0"
                  )}
                />
              )}
              
              {/* Outer ring */}
              <circle
                cx={coords.cx}
                cy={coords.cy}
                r={city.isHub ? (isHovered ? 7 * scale : 6 * scale) : (city.isDecorative ? 1.5 * scale : (isHovered ? 4.5 * scale : 3.5 * scale))}
                className={cn(
                  "fill-background stroke-accent transition-all duration-300 ease-out",
                  city.isDecorative ? "opacity-60" : ""
                )}
                strokeWidth={city.isHub ? 2.5 * scale : (city.isDecorative ? 0.8 * scale : 1.5 * scale)}
              />
              
              {/* Inner core */}
              <circle
                cx={coords.cx}
                cy={coords.cy}
                r={city.isHub ? 2 * scale : (city.isDecorative ? 0 : 1.2 * scale)}
                className={cn(
                  "fill-accent",
                  city.isDecorative ? "hidden" : ""
                )}
              />

              {/* Label */}
              {!city.isDecorative && (
                <text
                  x={coords.cx + (city.isHub ? 14 * scale : 8 * scale)}
                  y={coords.cy + 3 * scale}
                  className={cn(
                    "city-label font-semibold fill-foreground tracking-widest uppercase transition-all duration-300",
                    isHovered || city.isHub ? "opacity-100 font-bold" : "opacity-60"
                  )}
                  style={{ fontSize: `${10 * scale}px` }}
                >
                  {city.name}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
