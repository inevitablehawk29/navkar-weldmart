"use client";

import { useEffect, useState, useRef } from "react";

interface ScrollState {
  /** Page has scrolled past `threshold`. */
  scrolled: boolean;
  /** User is scrolling down past `hideAfter` — header should tuck away. */
  hidden: boolean;
}

/**
 * Tracks whether the page is scrolled and whether the header should hide.
 * Hides on downward scroll, reveals on upward scroll. `delta` ignores tiny
 * jitters (e.g. iOS rubber-banding, momentum tails).
 *
 * Scroll events are already dispatched once per frame, and setState bails out
 * when nothing changed, so no extra rAF throttling is needed.
 */
export function useScroll(threshold = 50, { hideAfter = 120, delta = 8 } = {}) {
  const [state, setState] = useState<ScrollState>({ scrolled: false, hidden: false });
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    const handleScroll = () => {
      const y = Math.max(window.scrollY, 0);
      const diff = y - lastY.current;
      const scrolled = y > threshold;

      let hidden: boolean | null = null; // null = keep previous
      if (y <= hideAfter) hidden = false;
      else if (Math.abs(diff) >= delta) hidden = diff > 0;

      if (hidden !== null) lastY.current = y;

      setState((prev) => {
        const nextHidden = hidden ?? prev.hidden;
        if (scrolled === prev.scrolled && nextHidden === prev.hidden) return prev;
        return { scrolled, hidden: nextHidden };
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold, hideAfter, delta]);

  return state;
}
