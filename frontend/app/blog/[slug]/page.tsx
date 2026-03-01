// app/[tool]/page.tsx
// ─────────────────────────────────────────────────────────────
// Single dynamic route handles ALL tool pages
// /jpg-to-png, /merge-pdf, /compress-image etc
// ─────────────────────────────────────────────────────────────

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { toolPages, getPageBySlug } from "@/app/lib/seo/seoData";
import { buildMetadata } from "@/app/lib/seo/metadata";
import ToolPage from "@/app/components/seo/ToolPage";

interface Props {
  params: { tool: string };
}

// Tell Next.js all valid tool slugs at build time
export function generateStaticParams() {
  return toolPages.map((p: any) => ({ tool: p.slug }));
}

// Generate metadata per tool
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const {tool}=await params
  const page = getPageBySlug(tool);
  if (!page) return {};
  return buildMetadata(page);
}

export default async function ToolRoute({ params }: Props) {
  const {tool}=await params
  const page = getPageBySlug(tool);
  if (!page || page.type !== "tool") notFound();
  return <ToolPage page={page} />;
}