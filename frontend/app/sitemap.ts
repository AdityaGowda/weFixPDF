// app/sitemap.ts
// Auto-generates XML sitemap — fetches slugs from backend API
import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/app/lib/seo/seoApi";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://wefixpdf.com";

// Priority & frequency by page type
const TYPE_CONFIG: Record<string, { changeFrequency: "weekly" | "monthly" | "yearly"; priority: number; prefix: string }> = {
  tool: { changeFrequency: "weekly", priority: 0.9, prefix: "" },
  blog: { changeFrequency: "monthly", priority: 0.7, prefix: "/blog" },
  compare: { changeFrequency: "monthly", priority: 0.6, prefix: "/compare" },
  use_cases: { changeFrequency: "monthly", priority: 0.6, prefix: "/use-cases" },
  usecase: { changeFrequency: "monthly", priority: 0.6, prefix: "/use-cases" },
  format: { changeFrequency: "monthly", priority: 0.5, prefix: "/formats" },
  homepage: { changeFrequency: "weekly", priority: 1.0, prefix: "" },
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages that always exist
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/compare`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/use-cases`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/help`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/security`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
  ];

  // Dynamic pages from database
  const slugs = await getAllSlugs();

  const dynamicPages: MetadataRoute.Sitemap = slugs
    .filter((s) => s.page_type !== "homepage") // homepage is already in static
    .map((s) => {
      const config = TYPE_CONFIG[s.page_type] || { changeFrequency: "monthly" as const, priority: 0.5, prefix: "" };
      return {
        url: `${BASE_URL}${config.prefix}/${s.slug}`,
        lastModified: s.updated_at ? new Date(s.updated_at) : new Date(),
      };
    });

  return [...staticPages, ...dynamicPages];
}
