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
};

export default function AboutPage() {
  return (
    <>
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
