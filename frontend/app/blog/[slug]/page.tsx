// app/blog/[slug]/page.tsx — Full blog article page with rich layout

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { ArrowRight, Clock, BookOpen, ArrowLeft, CheckCircle } from "lucide-react";
import { getPageSeo, getAllSlugs } from "@/app/lib/seo/seoApi";
import { buildMetadata, buildArticleSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/app/lib/seo/metadata";
import MarkdownContent from "@/app/components/markdowncontent";
import InternalLinkGrid from "@/app/components/InternalLinkGrid";

interface Props {
  params: Promise<{ slug: string }>;
}

// Tell Next.js all valid blog slugs at build time
export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.filter((s) => s.page_type === "blog").map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageSeo(slug, "blog");
  if (!page) return {};
  const meta = buildMetadata(page, "/blog");
  return { ...meta, openGraph: { ...meta.openGraph as object, type: "article" } };
}

// Estimated reading time
function readingTime(body?: string): string {
  if (!body) return "3 min read";
  const mins = Math.max(1, Math.round(body.split(/\s+/).length / 200));
  return `${mins} min read`;
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const page = await getPageSeo(slug, "blog");
  if (!page) notFound();

  const articleSchema = buildArticleSchema(page);
  const faqSchema = page.faq && page.faq.length > 0 ? buildFaqSchema(page.faq) : null;
  const breadcrumbs = buildBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: page.h1, href: `/blog/${page.slug}` },
  ]);

  return (
    <>
      <script id="article-schema" type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      {faqSchema && (
        <script id="faq-schema" type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      )}
      <script id="breadcrumb-schema" type="application/ld+json">{JSON.stringify(breadcrumbs)}</script>

      <div className="min-h-screen">
        {/* ── Hero Banner ── */}
        <section className="relative pt-12 pb-10 px-4 border-b border-slate-100 dark:border-slate-800 overflow-hidden">
          {/* subtle bg gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-violet-500/5 pointer-events-none" />

          <div className="max-w-3xl mx-auto relative">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8 font-medium">
              <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <ArrowRight className="w-3 h-3 text-slate-300" />
              <Link href="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
              <ArrowRight className="w-3 h-3 text-slate-300" />
              <span className="text-slate-600 dark:text-slate-300 truncate max-w-[200px]">{page.h1}</span>
            </nav>

            {/* Category badge */}
            <div className="flex items-center gap-3 mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest">
                <BookOpen className="w-3 h-3" /> Article
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                <Clock className="w-3 h-3" />
                {readingTime(page.bodyContent)}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-5">
              {page.h1}
            </h1>

            {/* Subtitle / description */}
            {page.subtitle && (
              <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                {page.subtitle}
              </p>
            )}
            {!page.subtitle && page.description && (
              <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                {page.description}
              </p>
            )}
          </div>
        </section>

        {/* ── Article Body ── */}
        <div className="max-w-3xl mx-auto px-4 py-14">

          {/* ── Author / E-E-A-T ── */}
          {page.author_name && (
            <div className="flex items-start gap-4 mb-12 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60">
              <div className="w-11 h-11 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 text-blue-600 dark:text-blue-400 font-black text-lg">
                {page.author_name.charAt(0)}
              </div>
              <div>
                <p className="font-black text-slate-900 dark:text-white text-sm">{page.author_name}</p>
                {page.author_bio && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1 leading-relaxed">{page.author_bio}</p>
                )}
              </div>
            </div>
          )}

          {/* Intro paragraph */}
          {page.intro && (
            <div className="relative mb-12 pl-6">
              <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full bg-gradient-to-b from-blue-400 to-violet-500" />
              <p className="text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                {page.intro}
              </p>
            </div>
          )}

          {/* Body markdown */}
          {page.bodyContent && (
            <div className="mb-14">
              <MarkdownContent content={page.bodyContent} />
            </div>
          )}

          {/* ── Features ── */}
          {page.features && page.features.length > 0 && (
            <div className="mb-14 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60">
              <h2 className="text-lg font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                Key Takeaways
              </h2>
              <div className="space-y-3">
                {page.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── CTA ── */}
          {page.cta && (
            <div className="mb-14 p-6 md:p-8 rounded-3xl bg-gradient-to-br from-blue-600 to-violet-700 text-white">
              <p className="text-xs font-black uppercase tracking-widest opacity-70 mb-2">Get started free</p>
              <h2 className="text-xl md:text-2xl font-black mb-3 leading-tight">
                {page.cta.text}
              </h2>
              <p className="text-sm opacity-80 font-medium mb-6">No sign-up. No watermarks. Files deleted immediately.</p>
              <a
                href={page.cta.url}
                className="inline-flex items-center gap-2 bg-white text-blue-700 font-black px-6 py-3 rounded-2xl text-sm hover:bg-blue-50 transition-colors shadow-lg"
              >
                {page.cta.text} <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          )}

          {/* ── FAQ ── */}
          {page.faq && page.faq.length > 0 && (
            <div className="mb-14">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-7 rounded-full bg-blue-500" />
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

          {/* ── Internal Link Blocks (from tools_list) ── */}
          {(page.relatedBlogs || page.relatedUseCases || page.relatedComparisons) && (
            <div className="mb-14 space-y-10">
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

          {/* ── Related Tools ── */}
          {page.related && page.related.length > 0 && (
            <div className="mb-14 pt-10 border-t border-slate-100 dark:border-slate-800">
              <p className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 mb-5">
                Try These Tools
              </p>
              <div className="flex flex-wrap gap-3">
                {page.related.map((r, i) => (
                  <a
                    key={i}
                    href={r.href ?? "#"}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-700 dark:text-slate-300 hover:border-blue-500/40 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md transition-all duration-200"
                  >
                    {r.label} <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Back link */}
          <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Blog
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