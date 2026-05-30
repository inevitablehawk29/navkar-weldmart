import { Hero } from "@/components/sections/hero";
import { TrustMetrics } from "@/components/sections/trust-metrics";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { ServicesOverview } from "@/components/sections/services-overview";
import { ProcessFlow } from "@/components/sections/process-flow";
import { ClientsPartners } from "@/components/sections/clients-partners";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustMetrics />
      <FeaturedProjects />
      <ServicesOverview />
      <ProcessFlow />
      <ClientsPartners />
    </>
  );
}
