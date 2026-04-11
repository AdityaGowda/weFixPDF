// app/formats/[slug]/page.tsx — File format guide page
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowLeft, FileText } from "lucide-react";
import { getPageSeo, getAllSlugs } from "@/app/lib/seo/seoApi";
import { buildMetadata, buildBreadcrumbSchema, buildArticleSchema } from "@/app/lib/seo/metadata";
import MarkdownContent from "@/app/components/markdowncontent";
import InternalLinkGrid from "@/app/components/InternalLinkGrid";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.filter((s) => s.page_type === "format").map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageSeo(slug, "format");
  if (!page) return {};
  const meta = buildMetadata(page, "/formats");
  // Override OG type for format guides (article)
  return { ...meta, openGraph: { ...meta.openGraph as object, type: "article" } };
}

export default async function FormatPage({ params }: Props) {
  const { slug } = await params;
  const page = await getPageSeo(slug, "format");
  if (!page) notFound();

  const articleSchema = buildArticleSchema(page);
  const breadcrumbs = buildBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "File Formats", href: "/formats" },
    { name: page.h1, href: `/formats/${page.slug}` },
  ]);

  return (
    <>
      <script id="article-schema" type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      <script id="breadcrumb-schema" type="application/ld+json">{JSON.stringify(breadcrumbs)}</script>

      <div className="min-h-screen">
        {/* ── Hero ── */}
        <section className="relative pt-12 pb-10 px-4 border-b border-slate-100 dark:border-slate-800 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-500/5 via-transparent to-blue-500/5 pointer-events-none" />

          <div className="max-w-3xl mx-auto relative">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8 font-medium">
              <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <ArrowRight className="w-3 h-3 text-slate-300" />
              <Link href="/formats" className="hover:text-blue-600 transition-colors">Formats</Link>
              <ArrowRight className="w-3 h-3 text-slate-300" />
              <span className="text-slate-600 dark:text-slate-300 truncate max-w-[200px]">{page.h1}</span>
            </nav>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-500/10 border border-slate-500/20 text-slate-600 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest mb-5">
              <FileText className="w-3 h-3" /> File Format Guide
            </div>

            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-5">
              {page.h1}
            </h1>

            {(page.subtitle || page.description) && (
              <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                {page.subtitle || page.description}
              </p>
            )}
          </div>
        </section>

        {/* ── Body ── */}
        <div className="max-w-3xl mx-auto px-4 py-14 space-y-14">

          {/* Intro */}
          {page.intro && (
            <div className="relative pl-6">
              <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full bg-gradient-to-b from-slate-400 to-blue-500" />
              <p className="text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                {page.intro}
              </p>
            </div>
          )}

          {/* Body Markdown */}
          {page.bodyContent && (
            <div>
              <MarkdownContent content={page.bodyContent} />
            </div>
          )}

          {/* Description fallback */}
          {!page.bodyContent && !page.intro && (
            <div className="prose dark:prose-invert max-w-none">
              <p>{page.description}</p>
            </div>
          )}

          {/* ── FAQ ── */}
          {page.faq && page.faq.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-7 rounded-full bg-slate-500" />
                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Frequently Asked Questions
                </h2>
              </div>
              <div className="space-y-4">
                {page.faq.map((item, i) => (
                  <div key={i} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden">
                    <div className="px-6 pt-5 pb-3">
                      <h3 className="font-bold text-slate-800 dark:text-white text-sm leading-relaxed">{item.q}</h3>
                    </div>
                    <div className="px-6 pb-5 border-t border-slate-50 dark:border-slate-800/50 pt-3 text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
                      {item.a}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Related Tools (flat chips) ── */}
          {page.related && page.related.length > 0 && (
            <div className="pt-10 border-t border-slate-100 dark:border-slate-800">
              <p className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 mb-5">
                Try These Tools
              </p>
              <div className="flex flex-wrap gap-3">
                {page.related.map((r, i) => (
                  <a
                    key={i}
                    href={r.href}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-700 dark:text-slate-300 hover:border-blue-500/40 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md transition-all duration-200"
                  >
                    {r.label} <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* ── Internal Links (from tools_list) ── */}
          {(page.relatedBlogs || page.relatedUseCases || page.relatedComparisons) && (
            <div className="space-y-10 pt-4">
              {page.relatedBlogs && page.relatedBlogs.length > 0 && (
                <InternalLinkGrid title="Related Guides" badge="Blog" links={page.relatedBlogs} color="blue" />
              )}
              {page.relatedUseCases && page.relatedUseCases.length > 0 && (
                <InternalLinkGrid title="Use Cases" badge="Workflows" links={page.relatedUseCases} color="violet" />
              )}
              {page.relatedComparisons && page.relatedComparisons.length > 0 && (
                <InternalLinkGrid title="Compare & Learn" badge="vs Others" links={page.relatedComparisons} color="orange" />
              )}
            </div>
          )}

          {/* Back link */}
          <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
            <Link
              href="/formats"
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> All File Formats
            </Link>
          </div>
        </div>
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
