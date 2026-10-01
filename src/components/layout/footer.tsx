import Image from "next/image";
import Link from "next/link";
import { contactInfo, companyInfo, services } from "@/content";
import { FooterCta } from "./footer-cta";
import logoHeaderLight from "../../../public/images/logo_header_light.webp";

const columns = [
  {
    title: "Services",
    links: [
      ...services
        .filter((s) => s.slug !== "material-supply")
        .map((s) => ({ label: s.title, href: `/services/${s.slug}` })),
      { label: "Material Supply", href: "/material-supply" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Elsewhere",
    links: [
      { label: "Instagram", href: companyInfo.social.instagram, external: true },
      { label: "WhatsApp", href: companyInfo.social.whatsapp, external: true },
      { label: "BNI member profile", href: companyInfo.social.bni, external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer id="contact-footer" className="bg-mill-950 text-white">
      <FooterCta />

      <div className="container-wide grid gap-12 border-t border-white/10 py-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <Image src={logoHeaderLight} alt="Navkar Weldmart" className="!h-12 !w-auto" />
          <p className="mt-6 max-w-[34ch] text-[0.9375rem] leading-relaxed text-steel-300">
            Steel supply, fabrication and erection for industrial, commercial and residential
            projects. {contactInfo.city}, {contactInfo.state}. Since {companyInfo.founded}.
          </p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8">
          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="type-label text-steel-400">{col.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    {"external" in l && l.external ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[0.9375rem] text-white/85 transition-colors hover:text-arc-light"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link href={l.href} className="text-[0.9375rem] text-white/85 transition-colors hover:text-arc-light">
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="container-wide flex flex-col gap-3 py-6 pb-[calc(1.5rem+env(safe-area-inset-bottom)+4rem)] text-sm text-steel-400 sm:flex-row sm:items-center sm:justify-between md:pb-6">
          <p>© {new Date().getFullYear()} Navkar Weldmart</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white">
              Privacy policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
