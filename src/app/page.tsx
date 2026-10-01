import { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { ServicesOverview } from "@/components/sections/services-overview";
import { ShedAssembly } from "@/components/sections/shed-assembly";
import { MaterialsOverview } from "@/components/sections/materials-overview";
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
      <ServicesOverview />
      <ShedAssembly />
      <FeaturedProjects />
      <MaterialsOverview />
      <ClientsPartners />
    </>
  );
}
