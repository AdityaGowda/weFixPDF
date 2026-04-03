// app/sitemap.ts — Auto-generates XML sitemap from DB slugs
import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/app/lib/seo/seoApi";

export const dynamic = "force-dynamic";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://wefixpdf.com";

const PREFIX_MAP: Record<string, string> = {
  tool:      "",
  blog:      "/blog",
  compare:   "/compare",
  use_cases: "/use-cases",
  usecase:   "/use-cases",
  format:    "/formats",
};

const PRIORITY_MAP: Record<string, number> = {
  tool:      0.9,
  blog:      0.7,
  compare:   0.6,
  use_cases: 0.6,
  usecase:   0.6,
  format:    0.5,
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const today = new Date().toISOString().split("T")[0];

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}`,                lastModified: today, priority: 1.0 },
    { url: `${BASE_URL}/blog`,           lastModified: today, priority: 0.8 },
    { url: `${BASE_URL}/compare`,        lastModified: today, priority: 0.7 },
    { url: `${BASE_URL}/use-cases`,      lastModified: today, priority: 0.7 },
    { url: `${BASE_URL}/tools`,          lastModified: today, priority: 0.8 },
    { url: `${BASE_URL}/formats`,        lastModified: today, priority: 0.5 },
    { url: `${BASE_URL}/about`,          lastModified: today, priority: 0.4 },
    { url: `${BASE_URL}/security`,       lastModified: today, priority: 0.4 },
    { url: `${BASE_URL}/help`,           lastModified: today, priority: 0.4 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: today, priority: 0.3 },
    { url: `${BASE_URL}/terms`,          lastModified: today, priority: 0.3 },
    { url: `${BASE_URL}/contact`,        lastModified: today, priority: 0.5 },
  ];

  // Dynamic pages from DB
  const slugs = await getAllSlugs();

  const dynamicPages: MetadataRoute.Sitemap = slugs
    .filter((s) => s.page_type !== "homepage")
    .map((s) => {
      const prefix = PREFIX_MAP[s.page_type] ?? "";
      return {
        url:          `${BASE_URL}${prefix}/${s.slug}`,
        lastModified: new Date().toISOString().split("T")[0],
        priority:     PRIORITY_MAP[s.page_type] ?? 0.5,
      };
    });

  return [...staticPages, ...dynamicPages];
}
