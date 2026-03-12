// app/sitemap.ts
// Auto-generates XML sitemap — fetches slugs from backend API
import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/app/lib/seo/seoApi";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://wefixpdf.com";

// URL prefixes by page type
const PREFIX_MAP: Record<string, string> = {
  blog: "/blog",
  compare: "/compare",
  use_cases: "/use-cases",
  usecase: "/use-cases",
  format: "/formats",
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages that always exist
  const staticPaths = [
    "",
    "/blog",
    "/compare",
    "/use-cases",
    "/help",
    "/security",
    "/about",
    "/privacy-policy",
    "/terms",
  ];

  const staticPages: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${BASE_URL}${path}`,
    changeFrequency: "daily",
  }));

  // Dynamic pages from database
  const slugs = await getAllSlugs();

  const dynamicPages: MetadataRoute.Sitemap = slugs
    .filter((s) => s.page_type !== "homepage")
    .map((s) => {
      const prefix = PREFIX_MAP[s.page_type] || "";
      return {
        url: `${BASE_URL}${prefix}/${s.slug}`,
        changeFrequency: "daily",
      };
    });

  return [...staticPages, ...dynamicPages];
}

