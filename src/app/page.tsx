import { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { CapabilityMarquee } from "@/components/sections/capability-marquee";
import { TrustMetrics } from "@/components/sections/trust-metrics";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { ServicesOverview } from "@/components/sections/services-overview";
import { SteelBeamProcess } from "@/components/sections/steel-beam-process";
import { ClientsPartners } from "@/components/sections/clients-partners";
import { ScrollToTop } from "@/components/layout/scroll-to-top";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "/",
    title: "Navkar Weldmart — Steel Fabrication & Structural Solutions",
    description: "End-to-end steel fabrication and material supply for residential, commercial, and industrial projects across Madhya Pradesh.",
  },
  twitter: {
    title: "Navkar Weldmart — Steel Fabrication & Structural Solutions",
    description: "End-to-end steel fabrication and material supply for residential, commercial, and industrial projects across Madhya Pradesh.",
  },
};

export default function HomePage() {
  return (
    <>
      <ScrollToTop />
      <Hero />
      <TrustMetrics />
      <ServicesOverview />
      <SteelBeamProcess />
      <FeaturedProjects />
      <CapabilityMarquee />
      <ClientsPartners />
    </>
  );
}
