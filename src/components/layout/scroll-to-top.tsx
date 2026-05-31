"use client";

import { useEffect } from "react";

export function ScrollToTop() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Prevent browser from restoring previous scroll position
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      
      // Force scroll to top on load
      window.scrollTo(0, 0);
    }
    
    // Cleanup: restore auto behavior if unmounted (optional, but good practice)
    return () => {
      if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, []);

  return null;
}
