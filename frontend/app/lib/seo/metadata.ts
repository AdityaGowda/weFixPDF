// lib/seo/metadata.ts
// ─────────────────────────────────────────────────────────────
// generateMetadata helper for all page types
// Usage: export const metadata = buildMetadata(page)
// ─────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import type { SeoPage } from "./seoData";

const BASE_URL = "https://wefixpdf.com";

export function buildMetadata(page: SeoPage, pathPrefix = ""): Metadata {
  const url = `${BASE_URL}${pathPrefix}/${page.slug}`;

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      siteName: "wefixPDF",
      type: "website",
      images: [
        {
          url: `${BASE_URL}/og/${page.slug}.png`,
          width: 1200,
          height: 630,
          alt: page.h1,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

// JSON-LD schema builders
export function buildToolSchema(page: SeoPage) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: page.h1,
    description: page.description,
    url: `${BASE_URL}/${page.slug}`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
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

export function buildArticleSchema(page: SeoPage) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.h1,
    description: page.description,
    url: `${BASE_URL}/blog/${page.slug}`,
    publisher: {
      "@type": "Organization",
      name: "wefixPDF",
      url: BASE_URL,
    },
  };
}