import { MetadataRoute } from "next";
import { agencyServices, selectedProjects } from "@/lib/agency";
import { techArticles } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://northstardigital.studio";

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  agencyServices.forEach((service) => {
    routes.push({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  });

  selectedProjects.forEach((work) => {
    routes.push({
      url: `${baseUrl}/work/${work.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    });
  });

  techArticles.forEach((article) => {
    routes.push({
      url: `${baseUrl}/blog/${article.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    });
  });

  return routes;
}
