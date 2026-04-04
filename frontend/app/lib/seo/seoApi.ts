/**
 * ─────────────────────────────────────────────────────────────
 * SEO API Client — fetch SEO data from backend
 * ─────────────────────────────────────────────────────────────
 * Used by server components (SSR) to fetch SEO content from
 * the database via the backend API.
 *
 * All functions run server-side during SSR/ISR.
 * ─────────────────────────────────────────────────────────────
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// ─────────────────────────────────────────────────────────────
// Types (matching the ToolMetaData from toolPageSeo.ts)
// ─────────────────────────────────────────────────────────────

export type HowItWorksStep = {
  name: string;
  text: string;
};

export type FaqItem = {
  q: string;
  a: string;
};

export type RelatedTool = {
  label: string;
  href: string;
};

export type SeoPage = {
  type?: string;
  slug: string;
  title: string;
  description: string;
  h1: string;
  h2?: string;
  subtitle?: string;
  url?: string,
  intro?: string;
  bodyContent?: string;
  keywords?: string | string[];
  howTo?: { title: string; description: string, steps: HowItWorksStep[] };
  howItWorks?: { title: string; desc: string }[];
  features?: string[];
  faq?: { q: string; a: string }[];
  related?: RelatedTool[];
  breadcrumb?: { name: string; url: string }[];
  schema_type?: string;
  schema_name?: string;
  schema_description?: string;
  author_name?: string;
  author_bio?: string;
  cta?: {
    text: string;
    url: string;
  };
  comparison_table?: {
    features: string[];
    weFixPDF: boolean[];
    other: boolean[];
  };
  tools_list?: {
    name: string;
    url: string;
  }[];
  // Typed internal link buckets (parsed from tools_list)
  relatedBlogs?: InternalLink[];
  relatedUseCases?: InternalLink[];
  relatedComparisons?: InternalLink[];
};

export type InternalLink = {
  name: string;
  url: string;
};

export type ToolMetaData = {
  title: string;
  description: string;
  h1: string;
  h2: string;
  intro: string;
  bodyContent?: string;
  keywords: string[];
  url: string;
  softwareSchema: {
    name: string;
    browserRequirements: string;
  };
  howTo: {
    title: string;
    description: string;
    steps: HowItWorksStep[];
  };
  features: string[];
  faqs: {
    q: string;
    a: string;
  }[];
  breadcrumb: {
    name: string;
    url: string;
  }[];
  relatedTools: InternalLink[];
  relatedBlogs?: InternalLink[];
  relatedUseCases?: InternalLink[];
  relatedComparisons?: InternalLink[];
  schema_type?: string;
  schema_name?: string;
  schema_description?: string;
  author_name?: string;
  author_bio?: string;
};

export type ToolListing = {
  position: number;
  slug: string;
  name: string;
  description: string;
  url: string;
  keywords: string[];
  type: string;
  icon_name?: string;
  accept_types?: string;
};

export type SiteSchema = {
  schema_key: string;
  schema_type: string;
  schema_data: Record<string, unknown>;
};

export type HomepageSeo = {
  title: string;
  description: string;
  h1: string;
  h2: string;
  url: string;
  keywords: string[];
};

export type HomepageData = {
  seo: HomepageSeo | null;
  tools: ToolListing[];
  schemas: SiteSchema[];
};

// ─────────────────────────────────────────────────────────────
// Fetch helpers (with fallback-safe error handling)
// ─────────────────────────────────────────────────────────────

async function apiFetch<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      next: { revalidate: 3600 }, // ISR: revalidate every hour
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      console.warn(`SEO API ${path} returned ${res.status}`);
      return null;
    }
    const json = await res.json();
    return json.success ? json.data : null;
  } catch (err) {
    console.warn(`SEO API fetch failed for ${path}:`, err);
    return null;
  }
}

// ─────────────────────────────────────────────────────────────
// Public API functions
// ─────────────────────────────────────────────────────────────

/**
 * Get SEO data for a specific tool page by slug.
 * Maps DB column names → frontend ToolMetaData shape.
 */
export async function getToolSeo(slug: string): Promise<ToolMetaData | null> {
  const raw = await apiFetch<Record<string, unknown>>(`/api/seo/${slug}?type=tool`);
  if (!raw) return null;
  // Parse tools_list into typed internal-link buckets
  const toolsList = (raw.tools_list as { type: string; name: string; url: string }[]) || [];
  const relatedBlogs      = toolsList.filter((t) => t.type === "blog").map(({ name, url }) => ({ name, url }));
  const relatedUseCases   = toolsList.filter((t) => t.type === "use_case").map(({ name, url }) => ({ name, url }));
  const relatedComparisons = toolsList.filter((t) => t.type === "compare").map(({ name, url }) => ({ name, url }));

  return {
    title: (raw.title as string) || "",
    description: (raw.description as string) || "",
    h1: (raw.h1 as string) || "",
    h2: (raw.h2 as string) || "",
    intro: (raw.intro as string) || "",
    bodyContent: (raw.body_content as string) || undefined,
    keywords: (raw.keywords as string[]) || [],
    url: (raw.url as string) || `https://wefixpdf.com/${slug}`,
    softwareSchema: (raw.software_schema as ToolMetaData["softwareSchema"]) || { name: "", browserRequirements: "" },
    howTo: (raw.how_to as ToolMetaData["howTo"]) || { title: "", description: "", steps: [] },
    features: (raw.features as string[]) || [],
    faqs: (raw.faq as ToolMetaData["faqs"]) || [],
    breadcrumb: (raw.breadcrumb as ToolMetaData["breadcrumb"]) || [],
    relatedTools: (raw.related_tools as ToolMetaData["relatedTools"]) || [],
    relatedBlogs:       relatedBlogs.length > 0 ? relatedBlogs : undefined,
    relatedUseCases:    relatedUseCases.length > 0 ? relatedUseCases : undefined,
    relatedComparisons: relatedComparisons.length > 0 ? relatedComparisons : undefined,
    schema_type: (raw.schema_type as string) || undefined,
    schema_name: (raw.schema_name as string) || undefined,
    schema_description: (raw.schema_description as string) || undefined,
    author_name: (raw.author_name as string) || undefined,
    author_bio:  (raw.author_bio  as string) || undefined,
  };
}

/**
 * Get all tool listings (for homepage grid).
 */
export async function getToolListings(): Promise<ToolListing[]> {
  const data = await apiFetch<ToolListing[]>("/api/seo/tool-listings");
  return data || [];
}

export async function checkToolExists(slug: string): Promise<boolean> {
  const data = await apiFetch<{ exists: boolean }>(`/api/seo/tool-exists/${slug}`);
  return data?.exists || false;
}

/**
 * Get all site schemas (JSON-LD structured data for homepage).
 */
export async function getSiteSchemas(): Promise<SiteSchema[]> {
  const data = await apiFetch<SiteSchema[]>("/api/seo/site-schemas");
  return data || [];
}

/**
 * Get all homepage data in one request (SEO + tools + schemas).
 */
export async function getHomepageData(): Promise<HomepageData> {
  const data = await apiFetch<HomepageData>("/api/seo/homepage");
  return data || { seo: null, tools: [], schemas: [] };
}

/**
 * Get SEO data for content pages (blog, compare, usecase, format).
 */
export async function getPageSeo(slug: string, type?: string): Promise<SeoPage | null> {
  const query = type ? `?type=${type}` : "";
  const raw = await apiFetch<any>(`/api/seo/${slug}${query}`);
  if (!raw) return null;

  // Parse tools_list into typed internal-link buckets
  const toolsList = (raw.tools_list as { type: string; name: string; url: string }[]) || [];
  const relatedBlogs       = toolsList.filter((t) => t.type === "blog").map(({ name, url }) => ({ name, url }));
  const relatedUseCases    = toolsList.filter((t) => t.type === "use_case").map(({ name, url }) => ({ name, url }));
  const relatedComparisons = toolsList.filter((t) => t.type === "compare").map(({ name, url }) => ({ name, url }));

  // Map database keys (snake_case) to SeoPage (camelCase) and normalize items
  return {
    ...raw,
    author_name: raw.author_name || undefined,
    author_bio:  raw.author_bio  || undefined,
    howTo: {
      title: raw.how_to?.title || raw.howTo?.title || "",
      description: raw.how_to?.description || raw.howTo?.description || "",
    },
    howItWorks: (raw.how_it_works || raw.howItWorks || raw.how_to?.steps || raw.howTo?.steps || []).map((s: any) => ({
      title: s.title || s.name || "",
      desc: s.desc || s.text || "",
    })),
    related: (raw.related_tools || raw.related || []).map((r: any) => ({
      label: r.label || r.name || "",
      href: r.href || r.url || "#",
    })),
    bodyContent: raw.body_content || raw.bodyContent,
    relatedBlogs:       relatedBlogs.length > 0 ? relatedBlogs : undefined,
    relatedUseCases:    relatedUseCases.length > 0 ? relatedUseCases : undefined,
    relatedComparisons: relatedComparisons.length > 0 ? relatedComparisons : undefined,
  };
}

/**
 * Get all slugs (for sitemap generation).
 */
export async function getAllSlugs(): Promise<{ slug: string; page_type: string; updated_at: string }[]> {
  const data = await apiFetch<{ slug: string; page_type: string; updated_at: string }[]>("/api/seo/slugs");
  return data || [];
}
