// app/[tool]/page.tsx
// ─────────────────────────────────────────────────────────────
// Single dynamic route handles ALL tool pages
// /jpg-to-png, /merge-pdf, /compress-image etc
// ─────────────────────────────────────────────────────────────

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPageSeo, getAllSlugs } from "@/app/lib/seo/seoApi";
import { buildMetadata } from "@/app/lib/seo/metadata";
import ToolPage from "@/app/components/seo/ToolPage";

interface Props {
  params: { slug: string };
}

// Tell Next.js all valid blog slugs at build time
export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.filter(s => s.page_type === "blog").map(s => ({ slug: s.slug }));
}

// Generate metadata per blog post
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageSeo(slug, "blog");
  if (!page) return {};
  return buildMetadata(page, "/blog");
}

export default async function ToolRoute({ params }: Props) {
  const { slug } = await params;
  const page = await getPageSeo(slug, "blog");
  if (!page) notFound();
  return <ToolPage page={page} />;
}