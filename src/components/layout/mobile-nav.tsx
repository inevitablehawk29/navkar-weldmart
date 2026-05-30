"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
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

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const [servicesExpanded, setServicesExpanded] = useState(false);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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
            src="/images/logo_fixed.webp"
            alt="Navkar Weldmart Logo"
            width={200}
            height={70}
            className="w-auto h-14 object-contain"
            style={{ height: "56px", width: "auto" }}
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
            {navigation.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <Button
                    variant="ghost"
                    onClick={() => setServicesExpanded(!servicesExpanded)}
                    className="w-full flex items-center justify-between px-6 py-4 h-auto text-lg font-medium text-foreground hover:text-primary transition-colors hover:bg-transparent rounded-none"
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
                    {item.children.map((child: { label: string; href: string }) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={onClose}
                        className="block pl-10 pr-6 py-3 text-base text-muted hover:text-primary transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="px-6 py-4 text-lg font-medium text-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}
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
