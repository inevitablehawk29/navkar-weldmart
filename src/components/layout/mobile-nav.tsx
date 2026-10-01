"use client";

import { useEffect, useRef, useState, RefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navigation, contactInfo, companyInfo } from "@/content";
import { X, Plus } from "lucide-react";
import { QuoteModal } from "./quote-modal";
import logoHeaderLight from "../../../public/images/logo_header_light.webp";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  returnFocusRef?: RefObject<HTMLButtonElement | null>;
}

export function MobileNav({ open, onClose, returnFocusRef }: MobileNavProps) {
  const pathname = usePathname();
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      if (wasOpen.current && returnFocusRef?.current) returnFocusRef.current.focus();
      wasOpen.current = false;
      return;
    }

    wasOpen.current = true;
    document.body.style.overflow = "hidden";

    const getFocusable = () =>
      drawerRef.current?.querySelectorAll<HTMLElement>(
        'a[href]:not([inert] *), button:not([disabled]):not([inert] *)'
      );

    getFocusable()?.[0]?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const els = getFocusable();
      if (!els || els.length === 0) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose, returnFocusRef]);

  const phone = contactInfo.phones[0];
  const links = navigation;

  return (
    <div
      id="mobile-nav-drawer"
      ref={drawerRef}
      inert={!open}
      aria-hidden={!open}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className={cn(
        "fixed inset-0 z-[60] flex flex-col bg-mill-900 text-white transition-[clip-path] duration-700 ease-[var(--ease-out-expo)] lg:hidden",
        open ? "[clip-path:inset(0_0_0_0)]" : "[clip-path:inset(0_0_100%_0)]"
      )}
    >
      <div className="container-wide flex h-[var(--header-h)] shrink-0 items-center justify-between border-b border-white/10">
        <Image src={logoHeaderLight} alt="Navkar Weldmart" className="!h-9 !w-auto object-contain" />
        <button
          type="button"
          onClick={onClose}
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center"
          aria-label="Close menu"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <nav className="container-wide flex-1 overflow-y-auto py-4">
        <ul>
          {links.map((item, i) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            const rowClass = cn(
              "flex w-full items-center justify-between border-b border-white/10 py-4 type-h3 text-[2rem] transition-[color,transform,opacity] duration-500 ease-[var(--ease-out-expo)]",
              isActive ? "text-arc-light" : "text-white",
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            );
            const style = { transitionDelay: open ? `${120 + i * 45}ms` : "0ms" };

            if (item.children) {
              return (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => setServicesExpanded((v) => !v)}
                    aria-expanded={servicesExpanded}
                    className={rowClass}
                    style={style}
                  >
                    {item.label}
                    <Plus className={cn("h-6 w-6 transition-transform duration-300", servicesExpanded && "rotate-45")} />
                  </button>
                  <div
                    inert={!servicesExpanded}
                    className={cn(
                      "grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out-expo)]",
                      servicesExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}
                  >
                    <ul className="overflow-hidden">
                      {[{ label: "All services", href: "/services" }, ...item.children].map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={onClose}
                            className={cn(
                              "block border-b border-white/5 py-3 pl-4 text-lg",
                              pathname === child.href ? "text-arc-light" : "text-white/75"
                            )}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            }

            return (
              <li key={item.href}>
                <Link href={item.href} onClick={onClose} className={rowClass} style={style}>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="container-wide shrink-0 border-t border-white/10 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-5">
        <div className="mb-4 grid grid-cols-2 gap-3 text-sm">
          <a href={`tel:${phone.replace(/\s/g, "")}`} className="btn btn-outline min-h-12 text-white">
            Call
          </a>
          <a href={companyInfo.social.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-outline min-h-12 text-white">
            WhatsApp
          </a>
        </div>
        <QuoteModal>
          <button onClick={onClose} className="btn btn-primary w-full min-h-12">
            Request a quote
          </button>
        </QuoteModal>
      </div>
    </div>
  );
}
