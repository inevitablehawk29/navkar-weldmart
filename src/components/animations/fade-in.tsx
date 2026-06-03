"use client";

import * as m from "framer-motion/m";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  viewTrigger?: boolean;
}

export function FadeIn({ children, delay = 0, className, direction = "up", viewTrigger = false }: FadeInProps) {
  const directionOffset = {
    up: { y: 30 },
    down: { y: -30 },
    left: { x: 30 },
    right: { x: -30 },
    none: { x: 0, y: 0 },
  };

  const initial = { opacity: 0, ...directionOffset[direction] };
  const animate = { opacity: 1, x: 0, y: 0 };
  const transition = { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const };

  if (viewTrigger) {
    return (
      <m.div
        initial={initial}
        whileInView={animate}
        viewport={{ once: true, margin: "-100px" }}
        transition={transition}
        className={cn("w-full", className)}
      >
        {children}
      </m.div>
    );
  }

  return (
    <m.div
      initial={initial}
      animate={animate}
      transition={transition}
      className={cn("w-full", className)}
    >
      {children}
    </m.div>
  );
}

