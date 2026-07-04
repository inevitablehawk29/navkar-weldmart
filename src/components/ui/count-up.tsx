"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

interface CountUpProps {
  target: string;
  suffix?: string;
  className?: string;
}

// Smooth deceleration curve — fast start, gentle landing
function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

export function CountUp({ target, suffix = "", className }: CountUpProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number>(0);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const numericPart = parseInt(target.replace(/[^0-9]/g, ""), 10);
  const hasPlus = target.includes("+");
  const isPercent = target.includes("%");

  useEffect(() => {
    if (!inView || isNaN(numericPart)) return;

    const duration = 2000;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedValue = Math.floor(easeOutQuart(progress) * numericPart);

      setCount(easedValue);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    rafRef.current = requestAnimationFrame(step);

    return () => cancelAnimationFrame(rafRef.current);
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
