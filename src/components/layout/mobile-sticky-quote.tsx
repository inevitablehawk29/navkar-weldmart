"use client";

import { useEffect, useState, useRef } from "react";
import { QuoteModal } from "./quote-modal";
import { ClipboardEdit } from "lucide-react";
import { cn } from "@/lib/utils";

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

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 md:hidden animate-in fade-in slide-in-from-bottom-8 duration-300">
      <QuoteModal>
        <button 
          className={cn(
            "flex items-center justify-center bg-foreground/95 backdrop-blur-sm text-background h-[52px] rounded-full shadow-2xl hover:bg-primary hover:text-white transition-all duration-500 border border-white/10",
            isScrolling ? "w-[150px] px-5" : "w-[52px] px-0"
          )}
        >
          <ClipboardEdit className="w-5 h-5 shrink-0" />
          <div 
            className={cn(
              "overflow-hidden whitespace-nowrap transition-all duration-500 flex items-center",
              isScrolling ? "w-24 opacity-100 ml-2" : "w-0 opacity-0 ml-0"
            )}
          >
            <span className="text-sm font-medium">Get Quote</span>
          </div>
        </button>
      </QuoteModal>
    </div>
  );
}
