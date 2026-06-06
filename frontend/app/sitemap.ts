import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/app/lib/seo/seoApi";
import { isExcludedFromSitemap } from "@/app/lib/seo/consolidation";

export const dynamic = "force-dynamic";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://wefixpdf.com";

const PREFIX_MAP: Record<string, string> = {
  tool:      "/tools",
};

const PRIORITY_MAP: Record<string, number> = {
  tool:      0.9,
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const today = new Date().toISOString().split("T")[0];

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}`,                lastModified: today, priority: 1.0 },
    { url: `${BASE_URL}/tools`,          lastModified: today, priority: 0.8 },
    { url: `${BASE_URL}/about`,          lastModified: today, priority: 0.4 },
    { url: `${BASE_URL}/security`,       lastModified: today, priority: 0.4 },
    { url: `${BASE_URL}/help`,           lastModified: today, priority: 0.4 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: today, priority: 0.3 },
    { url: `${BASE_URL}/disclaimer`,     lastModified: today, priority: 0.3 },
    { url: `${BASE_URL}/terms`,          lastModified: today, priority: 0.3 },
    { url: `${BASE_URL}/contact`,        lastModified: today, priority: 0.5 },
    { url: `${BASE_URL}/tools/image`, lastModified: today, priority: 0.9 },
    { url: `${BASE_URL}/tools/pdf`, lastModified: today, priority: 0.9 },
    { url: `${BASE_URL}/tools/developer`, lastModified: today, priority: 0.9 },

  ];

  const slugs = await getAllSlugs();

  const dynamicPages: MetadataRoute.Sitemap = slugs
    .filter((s) => s.page_type === "tool")
    .filter((s) => !isExcludedFromSitemap(s.slug))
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
