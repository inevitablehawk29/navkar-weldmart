import { Hero } from "@/components/sections/hero";
import { CapabilityMarquee } from "@/components/sections/capability-marquee";
import { TrustMetrics } from "@/components/sections/trust-metrics";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { ServicesOverview } from "@/components/sections/services-overview";
import { SteelBeamProcess } from "@/components/sections/steel-beam-process";
import { ClientsPartners } from "@/components/sections/clients-partners";

export default function HomePage() {
  return (
    <>
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
