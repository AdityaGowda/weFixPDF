// app/sitemap.ts
// Auto-generates XML sitemap for all ~100 pages
import type { MetadataRoute } from "next";
import { toolPages, blogPages, comparePages, usecasePages, formatPages } from "@/app/lib/seo/seoData";

const BASE_URL = "https://wefixpdf.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/compare`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/use-cases`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/formats`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const toolRoutes: MetadataRoute.Sitemap = toolPages.map((p) => ({
    url: `${BASE_URL}/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPages.map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const compareRoutes: MetadataRoute.Sitemap = comparePages.map((p) => ({
    url: `${BASE_URL}/compare/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const usecaseRoutes: MetadataRoute.Sitemap = usecasePages.map((p) => ({
    url: `${BASE_URL}/use-cases/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const formatRoutes: MetadataRoute.Sitemap = formatPages.map((p) => ({
    url: `${BASE_URL}/formats/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [
    ...staticRoutes,
    ...toolRoutes,
    ...blogRoutes,
    ...compareRoutes,
    ...usecaseRoutes,
    ...formatRoutes,
  ];
}