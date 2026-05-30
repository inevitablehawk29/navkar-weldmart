"use client";

import { useEffect, useState } from "react";
import { QuoteModal } from "./quote-modal";
import { ArrowRight } from "lucide-react";

export function MobileStickyQuote() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the button after scrolling past the hero section
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-1/2 translate-x-1/2 z-40 md:hidden animate-in fade-in slide-in-from-bottom-8 duration-300">
      <QuoteModal>
        <button className="flex items-center justify-center gap-2 bg-foreground/95 backdrop-blur-sm text-background px-8 py-3.5 rounded-full shadow-2xl text-sm font-medium hover:bg-primary hover:text-white transition-all border border-white/10">
          Get A Quote
          <ArrowRight className="w-4 h-4" />
        </button>
      </QuoteModal>
    </div>
  );
}
