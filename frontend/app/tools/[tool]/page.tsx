import { Metadata } from "next";
import { Shield } from "lucide-react";
import UploadBox from "@/app/components/UploadBox";
import CustomUploadBoxScanToPdf from "@/app/components/CustomUploadBoxScanToPdf";
import DevToolBox from "@/app/components/dev-tools/DevToolBox";
import { DEV_TOOL_SLUGS } from "@/app/components/dev-tools/devToolSlugs";
import { getToolSeo, getAllSlugs, ToolMetaData } from "@/app/lib/seo/seoApi";
import ToolPageContent from "@/app/components/toolPagecontent";
import { buildBreadcrumbSchema, buildFaqSchema, buildHowToSchema, buildToolSchema, buildAuthorSchema } from "@/app/lib/seo/metadata";
import { notFound } from 'next/navigation';
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { getToolConfig } from "@/lib/config";
import ToolRating from "@/app/components/ToolRating";
import CompactRating from "@/app/components/CompactRating";
import { isRedirected } from "@/app/lib/seo/consolidation";

type ToolPageProps = {
  params: Promise<{ tool: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllSlugs().catch(() => null);
  if (!slugs) return [];
  return slugs
    .filter((s) => s.page_type === "tool")
    .filter((s) => !isRedirected(s.slug))
    .map((s) => ({ tool: s.slug }));
}

async function getMetadata(slug: string): Promise<ToolMetaData | undefined> {
  const apiData = await getToolSeo(slug).catch(() => null);
  if (apiData) return apiData;
  return undefined;
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const reqService = await params;
  const metadata = await getMetadata(reqService.tool);

  if (!metadata) {
    return {
      title: "Page Not Found | weFixPDF",
      description: "This page doesn't exist or may have been moved.",
      robots: { index: false, follow: false },
    };
  }

  const ogImage = { url: "https://wefixpdf.com/wfp.png", width: 1200, height: 630, alt: metadata.title };

  const robots = metadata.is_indexable === false
    ? { index: false, follow: true }
    : { index: true, follow: true };

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    alternates: { canonical: metadata.url },
    robots,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: metadata.url,
      siteName: "weFixPDF",
      type: "website",
      locale: "en_US",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
      images: ["https://wefixpdf.com/wfp.png"],
      site: "@wefixpdf",
    },
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const reqService = await params;
  const metadata = await getMetadata(reqService.tool);
  if (!metadata) {
    return notFound();
  }

  const slug = reqService.tool;
  const config = getToolConfig(slug);

  const breadcrumbsData = [
    { name: "Tools", href: "/tools" },
    { name: metadata.h1 || slug, href: `/tools/${slug}` },
  ];

  const faqSchema = metadata?.faqs && metadata.faqs.length > 0
    ? buildFaqSchema(metadata.faqs)
    : null;

  const howToSchema = metadata?.howTo && metadata.howTo.steps.length > 0
    ? buildHowToSchema({
        ...metadata.howTo,
        description: metadata.howTo.description || metadata.description || '',
      })
    : null;

  let ratingStats = null;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/rating/${slug}/stats`, { next: { revalidate: 3600 } });
    if (res.ok) {
      ratingStats = await res.json();
    }
  } catch (err) {
    console.error("Failed to fetch rating stats for schema", err);
  }

  const softwareApplicationSchema = metadata ? buildToolSchema({
    url: metadata.url,
    description: metadata.description,
    title: metadata.h1,
    h1: metadata.h1,
    slug: reqService.tool,
  }, ratingStats) : null;

  const authorSchema = metadata.author_name
    ? buildAuthorSchema(metadata.author_name, metadata.author_bio)
    : null;

  return (
    <>
      <script id="software-application-schema" type="application/ld+json">{JSON.stringify(softwareApplicationSchema)}</script>

      {faqSchema && (
        <script id="faq-schema" type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      )}
      {howToSchema && (
        <script id="how-to-schema" type="application/ld+json">{JSON.stringify(howToSchema)}</script>
      )}
      {authorSchema && (
        <script id="author-schema" type="application/ld+json">{JSON.stringify(authorSchema)}</script>
      )}

      <section
        className="border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 60% 0%, rgba(45,91,227,0.07) 0%, transparent 70%), var(--bg-page)' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-5 md:py-14 space-y-5">
          <Breadcrumbs items={breadcrumbsData} />

          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="inline-flex items-center text-[11px] font-medium px-2.5 py-1 rounded-lg border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] shadow-sm"
                style={{ background: '#EAF3DE', color: '#3B6D11' }}
              >
                Free Tool · No signup required
              </span>
              <CompactRating toolSlug={slug} />
            </div>
            <h1 className="text-hero" style={{ color: 'var(--text)' }}>
              {metadata?.h1 || "File Converter"}
            </h1>
            <p className="text-[16px] leading-[1.7] max-w-xl" style={{ color: 'var(--text-muted)' }}>
              {metadata?.h2 || "Fast, secure, and privacy-shielded conversion."}
            </p>

            {(metadata?.author_name || metadata?.last_updated) && (
              <p className="text-[13px] flex flex-wrap items-center gap-x-2 gap-y-1" style={{ color: 'var(--text-muted)' }}>
                {metadata?.author_name && <span>By <span className="font-semibold" style={{ color: 'var(--text)' }}>{metadata.author_name}</span></span>}
                {metadata?.author_name && metadata?.last_updated && <span aria-hidden>·</span>}
                {metadata?.last_updated && (
                  <span>Updated <time dateTime={metadata.last_updated}>{metadata.last_updated}</time></span>
                )}
              </p>
            )}

            {metadata?.processing_location && (
              <p className="inline-flex items-center gap-2 text-[13px] font-medium px-3 py-1.5 rounded-lg w-fit"
                 style={{ background: '#EAF3DE', color: '#3B6D11' }}>
                <Shield className="w-3.5 h-3.5 shrink-0" />
                {metadata.processing_location === 'client'
                  ? 'Runs entirely in your browser — your files never leave your device.'
                  : 'Processed on our secure server and deleted automatically right after.'}
              </p>
            )}
          </div>

          {DEV_TOOL_SLUGS.has(reqService.tool)
            ? <DevToolBox slug={reqService.tool} />
            : reqService.tool === "scan-to-pdf"
            ? <CustomUploadBoxScanToPdf />
            : <UploadBox {...config} />
          }
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-14 space-y-16">
        <ToolPageContent metadata={metadata} />
        <ToolRating toolSlug={slug} />
      </div>

      <ins className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-format="autorelaxed"
        data-ad-client="ca-pub-8668995301634402"
        data-ad-slot="3174189444" />
      <script
        id="adsense-init"
        dangerouslySetInnerHTML={{ __html: "(adsbygoogle = window.adsbygoogle || []).push({});" }}
      />
    </>
  );
}
