"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface CountUpProps {
  target: string;
  suffix?: string;
  className?: string;
}

export function CountUp({ target, suffix = "", className }: CountUpProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const numericPart = parseInt(target.replace(/[^0-9]/g, ""), 10);
  const hasPlus = target.includes("+");
  const isPercent = target.includes("%");

  useEffect(() => {
    if (!inView || isNaN(numericPart)) return;

    const duration = 2000;
    const steps = 60;
    const increment = numericPart / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericPart) {
        setCount(numericPart);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [inView, numericPart]);

  if (isNaN(numericPart)) {
    return <span className={className}>{target}{suffix}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {count}
      {hasPlus && "+"}
      {isPercent && "%"}
      {suffix}
    </span>
  );
}
