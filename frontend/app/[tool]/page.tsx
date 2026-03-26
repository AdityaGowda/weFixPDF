import { Metadata } from "next";
import Script from "next/script";
import UploadBox from "../components/UploadBox";
import { getToolSeo, ToolMetaData } from "../lib/seo/seoApi";
import ToolPageContent from "../components/toolPagecontent";
import { buildBreadcrumbSchema, buildFaqSchema, buildHowToSchema, buildToolSchema, buildAuthorSchema } from "../lib/seo/metadata";
import { notFound } from 'next/navigation';

type ToolPageProps = {
  params: Promise<{ tool: string }>;
};

/**
 * Fetch tool metadata from API.
 */
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
  // Build JSON-LD schemas for tool pages
  const breadcrumbSchema = metadata?.breadcrumb && metadata.breadcrumb.length > 0
    ? buildBreadcrumbSchema(
      metadata.breadcrumb.map((b) => ({ name: b.name, href: b.url }))
    )
    : buildBreadcrumbSchema([
      { name: "Home", href: "/" },
      { name: metadata?.h1 || reqService.tool, href: `/${reqService.tool}` },
    ]);

  const faqSchema = metadata?.faqs && metadata.faqs.length > 0
    ? buildFaqSchema(metadata.faqs)
    : null;

  const howToSchema = metadata?.howTo && metadata.howTo.steps.length > 0
    ? buildHowToSchema(metadata.howTo)
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
      <script id="breadcrumb-schema" type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      {faqSchema && (
        <script id="faq-schema" type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      )}
      {howToSchema && (
        <script id="how-to-schema" type="application/ld+json">{JSON.stringify(howToSchema)}</script>
      )}
      {authorSchema && (
        <script id="author-schema" type="application/ld+json">{JSON.stringify(authorSchema)}</script>
      )}
      <div className="space-y-10 md:space-y-15 max-[950px]:py-4 animate-fade-in sm:px-0 max-[950px]:mt-0">
        {/* ── Breadcrumbs ── */}
        {metadata?.breadcrumb && metadata.breadcrumb.length > 0 && (
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 max-[950px]:mt-4 mt-2">
            <a href="/" className="hover:text-emerald-500 transition-colors">Home</a>
            {metadata.breadcrumb.filter(b => b.name !== "Home").map((crumb, i) => (
              <div key={i} className="flex items-center gap-2">
                <svg className="w-3 h-3 text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                {i === metadata.breadcrumb.length - 2 ? (
                  <span className="text-slate-600 dark:text-slate-300 font-medium">{crumb.name}</span>
                ) : (
                  <a href={crumb.url} className="hover:text-emerald-500 transition-colors">{crumb.name}</a>
                )}
              </div>
            ))}
          </nav>
        )}

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 md:space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] border border-emerald-500/20">
              Free Tool
            </div>
            <h1 className="text-4xl max-[950px]:text-2xl font-black text-slate-900 dark:text-white tracking-tighter transition-all duration-300">
              {metadata?.h1 || "File Converter"}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              {metadata?.h2 || "Fast, secure, and privacy-shielded conversion."}
            </p>
          </div>
        </div>

        <UploadBox service={reqService.tool} />
        <ToolPageContent metadata={metadata} />
      </div>

      {/* AdSense — loaded after interactive to avoid blocking LCP */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8668995301634402"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <ins className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-format="autorelaxed"
        data-ad-client="ca-pub-8668995301634402"
        data-ad-slot="3174189444" />
      <Script id="adsense-init" strategy="afterInteractive">
        {`(adsbygoogle = window.adsbygoogle || []).push({});`}
      </Script>
    </>
  );
}
