import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: ["GPTBot", "ChatGPT-User", "Google-Extended", "PerplexityBot", "ClaudeBot"],
        allow: ["/", "/llms.txt", "/llms-full.txt", "/blog", "/services", "/work"],
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://northstardigital.studio/sitemap.xml",
  };
}
