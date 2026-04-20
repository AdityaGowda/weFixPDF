import { Metadata } from "next";
import UploadBox from "@/app/components/UploadBox";
import CustomUploadBoxScanToPdf from "@/app/components/CustomUploadBoxScanToPdf";
import DevToolBox from "@/app/components/dev-tools/DevToolBox";
import { DEV_TOOL_SLUGS } from "@/app/components/dev-tools/devToolSlugs";
import { getToolSeo, getAllSlugs, ToolMetaData } from "@/app/lib/seo/seoApi";
import ToolPageContent from "@/app/components/toolPagecontent";
import { buildBreadcrumbSchema, buildFaqSchema, buildHowToSchema, buildToolSchema, buildAuthorSchema } from "@/app/lib/seo/metadata";
import { notFound } from 'next/navigation';
import Breadcrumbs from "@/app/components/Breadcrumbs";


type ToolPageProps = {
  params: Promise<{ tool: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs
    .filter((s) => s.page_type === "tool")
    .map((s) => ({ tool: s.slug }));
}

async function getMetadata(slug: string): Promise<ToolMetaData | undefined> {
  const apiData = await getToolSeo(slug);
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

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    alternates: { canonical: metadata.url },
    robots: { index: true, follow: true },
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
  // Always build breadcrumbs from known-good values — DB breadcrumb URLs
  // can contain stale paths (e.g. "#tools", "/compress-pdf") so we ignore them.
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

  const softwareApplicationSchema = metadata ? buildToolSchema({
    url: metadata.url,
    description: metadata.description,
    title: metadata.h1,
    h1: metadata.h1,
    slug: reqService.tool,
  }) : null;

  const authorSchema = metadata.author_name
    ? buildAuthorSchema(metadata.author_name, metadata.author_bio)
    : null;

  return (
    <>
      {/* JSON-LD Structured Data */}
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

      {/* ── Hero section ── */}
      <section
        className="border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 60% 0%, rgba(45,91,227,0.07) 0%, transparent 70%), var(--bg-page)' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-5 md:py-14 space-y-5">
          <Breadcrumbs items={breadcrumbsData} />


          {/* Tool hero */}
          <div className="space-y-3">
            <span
              className="inline-flex items-center text-[11px] font-medium px-2.5 py-1 rounded"
              style={{ background: '#EAF3DE', color: '#3B6D11' }}
            >
              Free Tool · No signup required
            </span>
            <h1 className="text-hero" style={{ color: 'var(--text)' }}>
              {metadata?.h1 || "File Converter"}
            </h1>
            <p className="text-[16px] leading-[1.7] max-w-xl" style={{ color: 'var(--text-muted)' }}>
              {metadata?.h2 || "Fast, secure, and privacy-shielded conversion."}
            </p>
          </div>

          {DEV_TOOL_SLUGS.has(reqService.tool)
            ? <DevToolBox slug={reqService.tool} />
            : reqService.tool === "scan-to-pdf"
            ? <CustomUploadBoxScanToPdf />
            : <UploadBox service={reqService.tool} />
          }
        </div>
      </section>

      {/* ── Content ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <ToolPageContent metadata={metadata} />
      </div>

      {/* AdSense Unit */}
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
