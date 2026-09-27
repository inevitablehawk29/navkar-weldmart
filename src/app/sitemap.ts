import { MetadataRoute } from "next";
import { services, projects } from "@/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://navkarweldmart.com";
  
  const serviceUrls: MetadataRoute.Sitemap = services
    .filter((service) => service.slug !== "material-supply")
    .map((service) => ({
      url: `${baseUrl}/services/${service.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  const projectUrls: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.id}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: `${baseUrl}`,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/material-supply`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...serviceUrls,
    ...projectUrls,
    {
      url: `${baseUrl}/privacy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
