"use client";

import { useState, useRef, useCallback, useEffect, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useScroll } from "@/hooks/use-scroll";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navigation, contactInfo, services } from "@/content";
import { MobileNav } from "./mobile-nav";
import { QuoteModal } from "./quote-modal";
import { ChevronDown } from "lucide-react";
import logoHeader from "../../../public/images/logo_header.webp";
import logoHeaderLight from "../../../public/images/logo_header_light.webp";

const primaryNav = navigation.filter((item) => item.href !== "/");

export const Navbar = memo(function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  // On the home page the header floats over the dark hero until it's passed.
  const [heroEdge, setHeroEdge] = useState(600);
  useEffect(() => {
    const measure = () => setHeroEdge(Math.max(window.innerHeight - 120, 300));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrolled, hidden } = useScroll(isHome ? heroEdge : 8);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [headerFocused, setHeaderFocused] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const overHero = isHome && !scrolled;
  const hideHeader = hidden && !mobileOpen && !openDropdown && !headerFocused;

  const handleMobileClose = useCallback(() => setMobileOpen(false), []);

  const phone = contactInfo.phones[0];

  return (
    <>
      <header
        onFocusCapture={() => setHeaderFocused(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setHeaderFocused(false);
        }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color,color] duration-500 ease-[var(--ease-out-expo)] motion-reduce:transition-none",
          overHero
            ? "border-b border-white/10 bg-transparent text-white"
            : "border-b border-zinc-line bg-galv-100/92 text-foreground backdrop-blur-md",
          hideHeader ? "-translate-y-full" : "translate-y-0"
        )}
      >
        {/* Legibility scrim over the photo, fades away with the transparent state */}
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 -z-10 h-[160%] bg-gradient-to-b from-mill-950/70 to-transparent transition-opacity duration-500",
            overHero ? "opacity-100" : "opacity-0"
          )}
        />

        <nav className="container-wide flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link href="/" className="relative flex shrink-0 items-center" aria-label="Navkar Weldmart home">
            <Image
              src={logoHeader}
              alt=""
              className={cn(
                "!h-9 !w-auto object-contain transition-opacity duration-300 lg:!h-11",
                overHero ? "opacity-0" : "opacity-100"
              )}
              priority
            />
            <Image
              src={logoHeaderLight}
              alt=""
              className={cn(
                "absolute left-0 top-0 !h-9 !w-auto object-contain transition-opacity duration-300 lg:!h-11",
                overHero ? "opacity-100" : "opacity-0"
              )}
              priority
            />
          </Link>

          {/* Desktop navigation */}
          <ul className="hidden items-center gap-1 lg:flex">
            {primaryNav.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

              if (item.children) {
                const open = openDropdown === item.label;
                return (
                  <li
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget)) setOpenDropdown(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") {
                        setOpenDropdown(null);
                        (e.currentTarget.querySelector("button") as HTMLElement | null)?.focus();
                      }
                    }}
                  >
                    <div className="flex items-center">
                      <NavLink href={item.href} active={isActive} overHero={overHero}>
                        {item.label}
                      </NavLink>
                      <button
                        type="button"
                        aria-expanded={open}
                        aria-controls="services-menu"
                        aria-label={`${item.label} menu`}
                        onClick={() => setOpenDropdown(open ? null : item.label)}
                        className="-ml-2 inline-flex h-10 w-7 items-center justify-center"
                      >
                        <ChevronDown
                          className={cn("h-3.5 w-3.5 opacity-70 transition-transform duration-300", open && "rotate-180")}
                        />
                      </button>
                    </div>

                    <div
                      id="services-menu"
                      className={cn(
                        "absolute left-1/2 top-full w-[440px] -translate-x-1/2 pt-3 transition-[opacity,transform,visibility] duration-300 ease-[var(--ease-out-expo)]",
                        open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
                      )}
                    >
                      <div className="border border-zinc-line bg-galv-50 p-2 text-foreground shadow-[0_24px_48px_-24px_rgba(20,23,27,0.35)]">
                        {services
                          .filter((s) => s.slug !== "material-supply")
                          .map((s) => {
                            const href = `/services/${s.slug}`;
                            return (
                              <Link
                                key={s.slug}
                                href={href}
                                onClick={() => setOpenDropdown(null)}
                                className={cn(
                                  "group/item flex flex-col gap-0.5 px-4 py-3 transition-colors hover:bg-galv-200 focus-visible:bg-galv-200",
                                  pathname === href && "bg-galv-200"
                                )}
                              >
                                <span className="type-h4 text-[1.0625rem] group-hover/item:text-arc">{s.title}</span>
                                <span className="text-sm leading-snug text-steel-500">{s.description}</span>
                              </Link>
                            );
                          })}
                        <Link
                          href="/services"
                          onClick={() => setOpenDropdown(null)}
                          className="mt-1 flex items-center justify-between border-t border-zinc-line px-4 pb-2 pt-3 text-sm font-medium text-steel-500 hover:text-arc"
                        >
                          All services
                        </Link>
                      </div>
                    </div>
                  </li>
                );
              }

              return (
                <li key={item.href}>
                  <NavLink href={item.href} active={isActive} overHero={overHero}>
                    {item.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2 sm:gap-5">
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className={cn(
                "hidden text-[0.9375rem] font-semibold tabular transition-colors xl:inline",
                overHero ? "text-white/90 hover:text-white" : "text-foreground hover:text-arc"
              )}
            >
              {phone}
            </a>

            <QuoteModal>
              <button className={cn("btn hidden min-h-11 md:inline-flex", overHero ? "btn-light" : "btn-primary")}>
                Request a quote
              </button>
            </QuoteModal>

            <button
              ref={hamburgerRef}
              type="button"
              className="-mr-2 inline-flex h-11 w-11 flex-col items-center justify-center gap-[5px] lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-drawer"
            >
              <span className="block h-[2px] w-6 bg-current" />
              <span className="block h-[2px] w-6 bg-current" />
              <span className="block h-[2px] w-6 bg-current" />
            </button>
          </div>
        </nav>
      </header>

      <MobileNav open={mobileOpen} onClose={handleMobileClose} returnFocusRef={hamburgerRef} />
    </>
  );
});

function NavLink({
  href,
  active,
  overHero,
  children,
}: {
  href: string;
  active: boolean;
  overHero: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative inline-flex h-10 items-center px-3.5 text-[0.9375rem] font-medium transition-colors",
        "after:absolute after:inset-x-3.5 after:bottom-1 after:h-[2px] after:origin-left after:bg-current after:transition-transform after:duration-300 after:ease-[var(--ease-out-expo)]",
        active ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100",
        overHero
          ? active ? "text-white" : "text-white/80 hover:text-white"
          : active ? "text-arc" : "text-foreground hover:text-arc"
      )}
    >
      {children}
    </Link>
  );
}

Navbar.displayName = "Navbar";
