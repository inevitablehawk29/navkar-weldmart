"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { contactInfo, companyInfo } from "@/content";
import { QuoteModal } from "./quote-modal";

/**
 * Phone-only action bar. Shows once the visitor is past the first screen and
 * steps aside when the footer (which has the same actions, larger) is in view.
 */
export function MobileStickyQuote() {
  const [pastFold, setPastFold] = useState(false);
  const [footerInView, setFooterInView] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastFold(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const footer = document.getElementById("contact-footer");
    const io = footer
      ? new IntersectionObserver(([entry]) => setFooterInView(entry.isIntersecting), { threshold: 0 })
      : null;
    if (footer && io) io.observe(footer);

    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  const visible = pastFold && !footerInView;
  const phone = contactInfo.phones[0].replace(/\s/g, "");

  return (
    <div
      inert={!visible}
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-mill-900/96 pb-[env(safe-area-inset-bottom)] text-white backdrop-blur-md transition-transform duration-500 ease-[var(--ease-out-expo)] md:hidden",
        visible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="grid grid-cols-[1fr_1fr_1.4fr] text-[0.9375rem] font-semibold">
        <a href={`tel:${phone}`} className="flex h-14 items-center justify-center border-r border-white/10">
          Call
        </a>
        <a
          href={companyInfo.social.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-14 items-center justify-center border-r border-white/10"
        >
          WhatsApp
        </a>
        <QuoteModal>
          <button className="flex h-14 items-center justify-center bg-arc">Request a quote</button>
        </QuoteModal>
      </div>
    </div>
  );
}
