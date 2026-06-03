"use client";

import { useEffect, useRef, RefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navigation, contactInfo } from "@/content";
import {
  X,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import { QuoteModal } from "./quote-modal";
import { Button } from "@/components/ui/button";
import logoHeader from "../../../public/images/logo_header.webp";

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

  // Lock body scroll when open and trap focus
  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      if (wasOpen.current && returnFocusRef?.current) {
        returnFocusRef.current.focus();
      }
      wasOpen.current = false;
      return;
    }

    wasOpen.current = true;
    document.body.style.overflow = "hidden";

    const focusableElements = drawerRef.current?.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement> | undefined;

    if (focusableElements && focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab" && drawerRef.current) {
        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose, returnFocusRef]);

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-foreground/50 z-50 transition-opacity duration-300 lg:hidden",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        id="mobile-nav-drawer"
        ref={drawerRef}
        className={cn(
          "fixed top-0 right-0 bottom-0 w-full max-w-sm bg-surface z-50 transition-transform duration-500 ease-[var(--ease-out-expo)] lg:hidden flex flex-col",
          open ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-20 border-b border-border">
          <Image
            src={logoHeader}
            alt="Navkar Weldmart Logo"
            className="w-auto object-contain"
            style={{ height: "34px", width: "auto" }}
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-foreground hover:text-primary transition-colors"
            aria-label="Close navigation menu"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Nav Links */}
        <div className="flex-1 overflow-y-auto py-6">
          <nav className="flex flex-col">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              
              return item.children ? (
                <div key={item.label}>
                  <Button
                    variant="ghost"
                    onClick={() => setServicesExpanded(!servicesExpanded)}
                    className={cn(
                      "w-full flex items-center justify-between px-6 py-4 h-auto text-lg font-medium transition-colors hover:bg-transparent rounded-none",
                      isActive ? "text-primary" : "text-foreground hover:text-primary"
                    )}
                    aria-expanded={servicesExpanded}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 transition-transform duration-200",
                        servicesExpanded && "rotate-180"
                      )}
                    />
                  </Button>
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300",
                      servicesExpanded ? "max-h-96" : "max-h-0"
                    )}
                  >
                    {item.children.map((child: { label: string; href: string }) => {
                      const isChildActive = pathname === child.href;
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={onClose}
                          className={cn(
                            "block pl-10 pr-6 py-3 text-base transition-colors",
                            isChildActive
                              ? "text-primary font-medium"
                              : "text-muted hover:text-primary"
                          )}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "px-6 py-4 text-lg font-medium transition-colors",
                    isActive ? "text-primary" : "text-foreground hover:text-primary"
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Bottom: Contact + CTA */}
        <div className="border-t border-border px-6 py-6 space-y-4">
          <div className="space-y-3 text-sm text-muted">
            <a
              href={`tel:${contactInfo.phones[0].replace(/\s/g, "")}`}
              className="flex items-center gap-3 hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              {contactInfo.phones[0]}
            </a>
            <a
              href={`mailto:${contactInfo.email}`}
              className="flex items-center gap-3 hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4" />
              {contactInfo.email}
            </a>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
              <span>
                {contactInfo.city}, {contactInfo.state}
              </span>
            </div>
          </div>

          <QuoteModal>
            <button
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full bg-primary text-white py-3 text-sm font-medium hover:bg-primary-dark transition-colors rounded-sm"
            >
              Get A Quote
              <ArrowRight className="w-4 h-4" />
            </button>
          </QuoteModal>
        </div>
      </div>
    </>
  );
}
