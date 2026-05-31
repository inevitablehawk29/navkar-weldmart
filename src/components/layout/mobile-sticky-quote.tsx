"use client";

import { useEffect, useState, useRef } from "react";
import { QuoteModal } from "./quote-modal";
import { ClipboardEdit } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function MobileStickyQuote() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasCollapsedOnce, setHasCollapsedOnce] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  
  // Track where the button first appeared
  const anchorScrollY = useRef<number | null>(null);

  // Scroll listener for visibility, collapse logic, and bottom detection
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const viewportHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
          
          const shouldBeVisible = scrollY > 400;
          setIsVisible(shouldBeVisible);
          
          // Set anchor position the precise moment it becomes visible, reset if it hides
          if (shouldBeVisible) {
            if (anchorScrollY.current === null) {
              anchorScrollY.current = scrollY;
            }
          } else {
            anchorScrollY.current = null;
          }
          
          // Collapse only when the user scrolls 250px further DOWN from the anchor point
          if (shouldBeVisible && !hasCollapsedOnce && anchorScrollY.current !== null) {
            if (scrollY > anchorScrollY.current + 250) {
              setHasCollapsedOnce(true);
            }
          }
          
          // Re-expand when reaching 85% of scrollable area
          const maxScroll = documentHeight - viewportHeight;
          const scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 1;
          setIsAtBottom(scrollProgress > 0.85);

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check on mount
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasCollapsedOnce]); // Re-binds once after collapse state changes

  // Determine final expanded state based on all conditions
  const currentlyExpanded = (!hasCollapsedOnce && isVisible) || isHovered || isAtBottom;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
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
            <motion.button 
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
                  <motion.div 
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
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </QuoteModal>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
