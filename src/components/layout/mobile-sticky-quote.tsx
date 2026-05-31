"use client";

import { useEffect, useState, useRef } from "react";
import { QuoteModal } from "./quote-modal";
import { ClipboardEdit } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function MobileStickyQuote() {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Show the button after scrolling past the hero section
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Expand button while scrolling
      setIsScrolling(true);
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Collapse button after scrolling stops
      timeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed bottom-6 right-6 z-40 md:hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.3 }}
        >
          <QuoteModal>
            <motion.button 
              className="flex items-center justify-center bg-foreground/95 backdrop-blur-sm text-background h-[52px] rounded-full shadow-2xl hover:bg-primary hover:text-white transition-colors duration-300 border border-white/10 overflow-hidden"
              animate={{ width: isScrolling ? 150 : 52, paddingLeft: isScrolling ? 20 : 0, paddingRight: isScrolling ? 20 : 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <ClipboardEdit className="w-5 h-5 shrink-0" />
              <AnimatePresence>
                {isScrolling && (
                  <motion.div 
                    className="flex items-center whitespace-nowrap overflow-hidden"
                    initial={{ width: 0, opacity: 0, marginLeft: 0 }}
                    animate={{ width: "auto", opacity: 1, marginLeft: 8 }}
                    exit={{ width: 0, opacity: 0, marginLeft: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
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
