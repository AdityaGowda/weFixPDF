// app/use-cases/[slug]/page.tsx — Rich use-case detail page
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { ArrowRight, ArrowLeft, CheckCircle, Users, ExternalLink } from "lucide-react";
import { getPageSeo, getAllSlugs } from "@/app/lib/seo/seoApi";
import { buildMetadata, buildCollectionPageSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/app/lib/seo/metadata";
import MarkdownContent from "@/app/components/markdowncontent";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs
    .filter((s) => s.page_type === "use_cases" || s.page_type === "usecase")
    .map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageSeo(slug, "use_cases") ?? await getPageSeo(slug, "usecase");
  if (!page) return {};
  return buildMetadata(page, "/use-cases");
}

export default async function UseCasePage({ params }: Props) {
  const { slug } = await params;
  const page = await getPageSeo(slug, "use_cases") ?? await getPageSeo(slug, "usecase");
  if (!page) notFound();

  const collectionSchema = buildCollectionPageSchema(page);
  const faqSchema = page.faq && page.faq.length > 0 ? buildFaqSchema(page.faq) : null;
  const breadcrumbs = buildBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Use Cases", href: "/use-cases" },
    { name: page.h1, href: `/use-cases/${page.slug}` },
  ]);

  // Extract tools_list from the raw page if available
  const toolsList: { name: string; url: string; use_case?: string }[] = (page as any).tools_list || [];

  return (
    <>
      <script id="collection-schema" type="application/ld+json">{JSON.stringify(collectionSchema)}</script>
      {faqSchema && (
        <script id="faq-schema" type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      )}
      <script id="breadcrumb-schema" type="application/ld+json">{JSON.stringify(breadcrumbs)}</script>

      <main className="min-h-screen">
        {/* ── Hero ── */}
        <section className="relative pt-12 pb-10 px-4 border-b border-slate-100 dark:border-slate-800 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-indigo-500/5 pointer-events-none" />

          <div className="max-w-4xl mx-auto relative">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8 font-medium">
              <Link href="/" className="hover:text-violet-600 transition-colors">Home</Link>
              <ArrowRight className="w-3 h-3 text-slate-300" />
              <Link href="/use-cases" className="hover:text-violet-600 transition-colors">Use Cases</Link>
              <ArrowRight className="w-3 h-3 text-slate-300" />
              <span className="text-slate-600 dark:text-slate-300 truncate max-w-[200px]">{page.h1}</span>
            </nav>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-600 dark:text-violet-400 text-[10px] font-black uppercase tracking-widest mb-5">
              <Users className="w-3 h-3" /> Use Case
            </div>

            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-5">
              {page.h1}
            </h1>

            {(page.subtitle || page.description) && (
              <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl">
                {page.subtitle || page.description}
              </p>
            )}
          </div>
        </section>

        {/* ── Body ── */}
        <div className="max-w-4xl mx-auto px-4 py-14 space-y-14">

          {/* Intro */}
          {page.intro && (
            <div className="relative pl-6">
              <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full bg-gradient-to-b from-violet-400 to-indigo-500" />
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

          {/* ── Featured Tools ── */}
          {toolsList.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-7 rounded-full bg-violet-500" />
                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Recommended Tools
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {toolsList.map((tool, i) => (
                  <a
                    key={i}
                    href={tool.url}
                    className="group flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 hover:border-violet-500/40 dark:hover:border-violet-500/30 hover:shadow-md transition-all duration-200"
                  >
                    <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
                      <ExternalLink className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                    </div>
                    <div>
                      <p className="font-black text-slate-900 dark:text-white text-sm group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                        {tool.name}
                      </p>
                      {tool.use_case && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                          {tool.use_case}
                        </p>
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-violet-500 ml-auto shrink-0 mt-0.5" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* ── Features ── */}
          {page.features && page.features.length > 0 && (
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60">
              <h2 className="text-lg font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                Why it works
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {page.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── FAQ ── */}
          {page.faq && page.faq.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-7 rounded-full bg-violet-500" />
                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Frequently Asked Questions
                </h2>
              </div>
              <div className="space-y-3">
                {page.faq.map((item, i) => (
                  <details key={i} className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden">
                    <summary className="flex items-center justify-between px-6 py-5 cursor-pointer font-bold text-slate-800 dark:text-white list-none gap-4">
                      <h3 className="text-sm leading-relaxed">{item.q}</h3>
                      <span className="text-violet-600 text-xl font-light group-open:rotate-45 transition-transform duration-300 shrink-0">+</span>
                    </summary>
                    <div className="px-6 pb-6 text-slate-500 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-50 dark:border-slate-800/50 pt-4 font-medium">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          {page.cta && (
            <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-700 text-white">
              <h2 className="text-xl font-black mb-2">{page.cta.text}</h2>
              <p className="text-violet-200 text-sm mb-6">No account, no watermarks, no data stored.</p>
              <a
                href={page.cta.url}
                className="inline-flex items-center gap-2 bg-white text-violet-700 font-black px-6 py-3 rounded-2xl text-sm hover:bg-violet-50 transition-colors"
              >
                Get Started Free <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          )}

          {/* Related Tools */}
          {page.related && page.related.length > 0 && (
            <div className="pt-10 border-t border-slate-100 dark:border-slate-800">
              <p className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 mb-5">Related Tools</p>
              <div className="flex flex-wrap gap-3">
                {page.related.map((r, i) => (
                  <a key={i} href={r.href ?? "#"} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-700 dark:text-slate-300 hover:border-violet-500/40 hover:text-violet-600 transition-all">
                    {r.label} <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
            <Link href="/use-cases" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
              <ArrowLeft className="w-4 h-4" /> All Use Cases
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}