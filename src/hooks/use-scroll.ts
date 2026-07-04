"use client";

import { useEffect, useState, useRef } from "react";

export function useScroll(threshold = 50) {
  const [scrolled, setScrolled] = useState(false);
  const currentRef = useRef(false);
  const rafRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return; // already queued

      rafRef.current = requestAnimationFrame(() => {
        const next = window.scrollY > threshold;
        if (next !== currentRef.current) {
          currentRef.current = next;
          setScrolled(next);
        }
        rafRef.current = 0;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [threshold]);

  return scrolled;
}
