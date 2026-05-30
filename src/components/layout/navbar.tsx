"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import { navigation, contactInfo } from "@/content";
import { MobileNav } from "./mobile-nav";
import { QuoteModal } from "./quote-modal";
import { Menu, Phone, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function Navbar() {
  const scrolled = useScroll(50);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <motion.header
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
            src="/images/logo_fixed.webp"
            alt="Navkar Weldmart Logo"
            width={280}
            height={90}
            className="w-auto h-16 md:h-18 object-contain"
            style={{ height: "64px", width: "auto" }}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navigation.map((item) =>
            item.children ? (
              <div key={item.label} className="relative group z-50">
                <Link
                  href={item.href || "#"} 
                  className={cn(
                    "inline-flex items-center gap-1 h-9 px-4 py-2 text-sm font-medium transition-colors rounded-sm focus:outline-none",
                    scrolled
                      ? "text-foreground group-hover:text-primary"
                      : "text-foreground/90 group-hover:text-foreground"
                  )}
                >
                  {item.label}
                  <ChevronDown className="w-3 h-3 opacity-70 transition-transform duration-200 group-hover:-rotate-180" />
                </Link>
                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                  <ul className="w-[240px] p-2 bg-surface shadow-lg rounded-sm border border-border">
                    {item.children.map((child: { label: string; href: string }) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block w-full select-none rounded-sm px-4 py-2 text-sm text-muted hover:text-primary hover:bg-muted/10 transition-colors"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-colors rounded-sm",
                  scrolled
                    ? "text-foreground hover:text-primary"
                    : "text-foreground/90 hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            )
          )}
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
            variant="ghost"
            size="icon"
            className="lg:hidden text-foreground rounded-sm"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </nav>

      </motion.header>

      {/* Mobile Navigation */}
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
