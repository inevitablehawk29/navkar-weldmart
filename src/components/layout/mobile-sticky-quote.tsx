"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { QuoteModal } from "./quote-modal";
import { ClipboardEdit } from "lucide-react";
import * as m from "framer-motion/m";
import { AnimatePresence } from "framer-motion";

interface ScrollState {
  isVisible: boolean;
  isAtBottom: boolean;
  hasCollapsedOnce: boolean;
}

export function MobileStickyQuote() {
  const [scrollState, setScrollState] = useState<ScrollState>({
    isVisible: false,
    isAtBottom: false,
    hasCollapsedOnce: false,
  });
  const [isHovered, setIsHovered] = useState(false);

  // Refs for values that shouldn't trigger re-bind listeners
  const anchorScrollY = useRef<number | null>(null);
  const rafRef = useRef(0);

  // Stable callback — no deps that change
  const handleScroll = useCallback(() => {
    if (rafRef.current) return; // already queued

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;

      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const nextVisible = scrollY > 400;

      // Set anchor position the precise moment it becomes visible, reset if it hides
      if (nextVisible) {
        if (anchorScrollY.current === null) {
          anchorScrollY.current = scrollY;
        }
      } else {
        anchorScrollY.current = null;
      }

      // Re-expand when reaching 85% of scrollable area
      const maxScroll = documentHeight - viewportHeight;
      const scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 1;
      const nextAtBottom = scrollProgress > 0.85;

      // Single batched setState
      setScrollState((prev) => {
        const nextHasCollapsedOnce =
          prev.hasCollapsedOnce ||
          (nextVisible &&
            anchorScrollY.current !== null &&
            scrollY > anchorScrollY.current + 250);

        if (
          prev.isVisible === nextVisible &&
          prev.isAtBottom === nextAtBottom &&
          prev.hasCollapsedOnce === nextHasCollapsedOnce
        ) {
          return prev; // no change, skip re-render
        }
        return {
          isVisible: nextVisible,
          isAtBottom: nextAtBottom,
          hasCollapsedOnce: nextHasCollapsedOnce,
        };
      });
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check on mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);

  const { isVisible, isAtBottom, hasCollapsedOnce } = scrollState;

  // Determine final expanded state based on all conditions
  const currentlyExpanded =
    (!hasCollapsedOnce && isVisible) || isHovered || isAtBottom;

  return (
    <AnimatePresence>
      {isVisible && (
        <m.div 
          className="fixed z-40 md:hidden"
          style={{ 
            bottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))", 
            right: "1.5rem" 
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.3 }}
        >
          <QuoteModal>
            <m.button 
              className="flex items-center justify-center bg-foreground/95 backdrop-blur-sm text-background h-[52px] rounded-full shadow-2xl hover:bg-primary hover:text-white transition-colors duration-300 border border-white/10 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 px-4"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onFocus={() => setIsHovered(true)}
              onBlur={() => setIsHovered(false)}
              aria-label="Get Quote"
            >
              <ClipboardEdit className="w-5 h-5 shrink-0" aria-hidden="true" />
              <AnimatePresence>
                {currentlyExpanded && (
                  <m.div 
                    className="flex items-center whitespace-nowrap overflow-hidden"
                    initial={{ width: 0, opacity: 0, marginLeft: 0 }}
                    animate={{ width: "auto", opacity: 1, marginLeft: 8 }}
                    exit={{ width: 0, opacity: 0, marginLeft: 0 }}
                    transition={{ 
                      duration: currentlyExpanded ? 0.3 : 0.25, 
                      ease: [0.16, 1, 0.3, 1] 
                    }}
                  >
                    <span className="text-sm font-medium">Get Quote</span>
                  </m.div>
                )}
              </AnimatePresence>
            </m.button>
          </QuoteModal>
        </m.div>
      )}
    </AnimatePresence>
  );
}

