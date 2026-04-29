// lib/seo/metadata.ts
// ─────────────────────────────────────────────────────────────
// generateMetadata helper for all page types
// Usage: export const metadata = buildMetadata(page)
// ─────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import type { SeoPage } from "./seoApi";

const BASE_URL = "https://wefixpdf.com";
const DEFAULT_OG_IMAGE = `${BASE_URL}/wfp.png`;

export function buildMetadata(page: SeoPage, pathPrefix = ""): Metadata {
  const url = `${BASE_URL}${pathPrefix}/${page.slug}`;

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      siteName: "weFixPDF",
      type: "website",
      locale: "en_US",
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: page.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [DEFAULT_OG_IMAGE],
      site: "@wefixpdf",
    },
  };
}

// JSON-LD schema builders
export function buildToolSchema(page: SeoPage, rating?: { averageRating: string; totalRatings: number }) {
  const absoluteUrl = page.url?.startsWith("http")
    ? page.url
    : `${BASE_URL}${page.url}`;
  
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: page.h1,
    description: page.description,
    url: absoluteUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  if (rating && rating.totalRatings > 0) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: rating.averageRating,
      ratingCount: rating.totalRatings,
      bestRating: "5",
      worstRating: "1",
    };
  }

  return schema;
}

export function buildAuthorSchema(author_name: string, author_bio?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author_name,
    ...(author_bio ? { description: author_bio } : {}),
    worksFor: { "@type": "Organization", name: "weFixPDF", url: BASE_URL },
  };
}

export function buildFaqSchema(faqs: { q: string; a: string }[]) {

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export function buildBreadcrumbSchema(crumbs: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${BASE_URL}${c.href}`,
    })),
  };
}

export function buildHowToSchema(page: { title: string, description: string, steps: { name: string, text: string }[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": page.title,
    "description": page.description,
    "step": page.steps.map((step: any, index: number) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text
    }))
  };
}
