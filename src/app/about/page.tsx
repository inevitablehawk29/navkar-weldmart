import { Metadata } from "next";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { FounderStory } from "@/components/sections/about/FounderStory";
import { JourneyTimeline } from "@/components/sections/about/JourneyTimeline";
import { CompanyPhilosophy } from "@/components/sections/about/CompanyPhilosophy";
import { HowWeExecute } from "@/components/sections/about/HowWeExecute";
import { WorkshopGallery } from "@/components/sections/about/WorkshopGallery";
import { ClientCategories } from "@/components/sections/about/ClientCategories";
import { AboutCTA } from "@/components/sections/about/AboutCTA";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Navkar Weldmart's history, mission, and the robust processes behind our premium steel fabrication and structural solutions across Madhya Pradesh.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    url: "/about",
    title: "About Us | Navkar Weldmart",
    description: "Learn about Navkar Weldmart's history, mission, and the robust processes behind our premium steel fabrication and structural solutions across Madhya Pradesh.",
  },
  twitter: {
    title: "About Us | Navkar Weldmart",
    description: "Learn about Navkar Weldmart's history, mission, and the robust processes behind our premium steel fabrication and structural solutions across Madhya Pradesh.",
  },
};

export default function AboutPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://navkarweldmart.vercel.app" },
      { "@type": "ListItem", position: 2, name: "About", item: "https://navkarweldmart.vercel.app/about" }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutHero />
      <FounderStory />
      <JourneyTimeline />
      <CompanyPhilosophy />
      <HowWeExecute />
      <WorkshopGallery />
      <ClientCategories />
      <AboutCTA />
    </>
  );
}
