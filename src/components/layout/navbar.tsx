"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useScroll } from "@/hooks/use-scroll";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navigation, contactInfo } from "@/content";
import { MobileNav } from "./mobile-nav";
import { QuoteModal } from "./quote-modal";
import { Menu, Phone, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as m from "framer-motion/m";
import logoHeader from "../../../public/images/logo_header.webp";

export function Navbar() {
  const scrolled = useScroll(50);
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const handleMobileClose = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <>
      <m.header
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow] duration-500",
        scrolled
          ? "bg-background/95 backdrop-blur-sm border-b border-border shadow-sm"
          : "bg-transparent border-b-0 shadow-none"
      )}
    >
      <nav className="container-wide flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex flex-shrink-0 items-center">
          <Image
            src={logoHeader}
            alt="Navkar Weldmart Logo"
            className="w-auto object-contain"
            style={{ height: "38px", width: "auto" }}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            
            return item.children ? (
              <div 
                key={item.label} 
                className="relative group z-50"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
                onFocus={() => setOpenDropdown(item.label)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget)) {
                    setOpenDropdown(null);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setOpenDropdown(null);
                    (document.activeElement as HTMLElement)?.blur();
                  }
                }}
              >
                <div className="flex items-center">
                  <Link
                    href={item.href || "#"} 
                    className={cn(
                      "inline-flex items-center h-9 pl-4 pr-1 py-2 text-sm font-medium transition-colors rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                      isActive 
                        ? "text-primary" 
                        : scrolled
                          ? "text-foreground group-hover:text-primary focus-within:text-primary"
                          : "text-foreground/90 group-hover:text-foreground focus-within:text-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                  <button
                    type="button"
                    aria-expanded={openDropdown === item.label ? "true" : "false"}
                    aria-haspopup="true"
                    aria-label={`Toggle ${item.label} submenu`}
                    onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                    className={cn(
                      "inline-flex items-center justify-center h-9 pr-3 pl-1 transition-colors rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                      isActive 
                        ? "text-primary" 
                        : scrolled
                          ? "text-foreground group-hover:text-primary focus-within:text-primary"
                          : "text-foreground/90 group-hover:text-foreground focus-within:text-foreground"
                    )}
                  >
                    <ChevronDown className="w-3 h-3 opacity-70 transition-transform duration-200 group-hover:-rotate-180 group-focus-within:-rotate-180" />
                  </button>
                </div>
                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 group-focus-within:translate-y-0">
                  <ul className="w-[240px] p-2 bg-surface shadow-lg rounded-sm border border-border" role="menu">
                    {item.children.map((child: { label: string; href: string }) => {
                      const isChildActive = pathname === child.href;
                      return (
                        <li key={child.href} role="none">
                          <Link
                            href={child.href}
                            role="menuitem"
                            className={cn(
                              "block w-full select-none rounded-sm px-4 py-2 text-sm transition-colors focus:outline-none focus:bg-muted/10",
                              isChildActive
                                ? "text-primary bg-muted/10 font-medium"
                                : "text-muted hover:text-primary hover:bg-muted/10 focus:text-primary"
                            )}
                          >
                            {child.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-colors rounded-sm",
                  isActive
                    ? "text-primary"
                    : scrolled
                      ? "text-foreground hover:text-primary"
                      : "text-foreground/90 hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Phone - Desktop only */}
          <a
            href={`tel:${contactInfo.phones[0].replace(/\s/g, "")}`}
            className="hidden xl:flex items-center gap-2 text-sm text-foreground font-semibold hover:text-primary transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>{contactInfo.phones[0]}</span>
          </a>

          {/* CTA Button */}
          <QuoteModal>
            <button
              className="hidden md:inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors cursor-pointer rounded-sm"
            >
              Get A Quote
              <ArrowRight className="w-4 h-4" />
            </button>
          </QuoteModal>

          {/* Mobile Hamburger */}
          <Button
            ref={hamburgerRef}
            variant="ghost"
            size="icon"
            className="lg:hidden text-foreground rounded-sm"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </nav>

      </m.header>

      {/* Mobile Navigation */}
      <MobileNav 
        open={mobileOpen} 
        onClose={handleMobileClose} 
        returnFocusRef={hamburgerRef}
      />
    </>
  );
}
