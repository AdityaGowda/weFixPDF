// app/compare/[slug]/page.tsx — Rich comparison page with dynamic comparison table
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { ArrowRight, ArrowLeft, CheckCircle, XCircle, BarChart3 } from "lucide-react";
import { getPageSeo, getAllSlugs } from "@/app/lib/seo/seoApi";
import { buildMetadata, buildWebPageSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/app/lib/seo/metadata";
import MarkdownContent from "@/app/components/markdowncontent";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.filter((s) => s.page_type === "compare").map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageSeo(slug, "compare");
  if (!page) return {};
  return buildMetadata(page, "/compare");
}

// Default comparison features — generic, no competitor names
const DEFAULT_COMPARISON = [
  { feature: "100% Free", weFixPDF: true, other: false },
  { feature: "No daily task limits", weFixPDF: true, other: false },
  { feature: "No sign-up required", weFixPDF: true, other: false },
  { feature: "Zero file storage", weFixPDF: true, other: false },
  { feature: "No watermarks", weFixPDF: true, other: true },
  { feature: "Image compression tools", weFixPDF: true, other: false },
  { feature: "HEIC to JPG conversion", weFixPDF: true, other: false },
  { feature: "Merge PDF", weFixPDF: true, other: true },
  { feature: "Compress PDF", weFixPDF: true, other: true },
  { feature: "PDF to Word", weFixPDF: true, other: true },
];

export default async function CompareDetailPage({ params }: Props) {
  const { slug } = await params;
  const page = await getPageSeo(slug, "compare");
  if (!page) notFound();

  const webPageSchema = buildWebPageSchema(page);
  const faqSchema = page.faq && page.faq.length > 0 ? buildFaqSchema(page.faq) : null;
  const breadcrumbs = buildBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Compare", href: "/compare" },
    { name: page.h1, href: `/compare/${page.slug}` },
  ]);

  // Extract comparison_table from DB if available
  const dbComparisonTable = (page as any).comparison_table;

  // Use DB comparison_table rows if available, else use defaults
  let comparisonRows: { feature: string; weFixPDF: boolean | string; other: boolean | string }[] = DEFAULT_COMPARISON;
  if (dbComparisonTable?.rows && dbComparisonTable?.headers) {
    // DB format: { headers: [...], rows: [[...], ...] }
    comparisonRows = dbComparisonTable.rows.map((row: string[]) => ({
      feature: row[0],
      weFixPDF: row[1],
      other: row[2],
    }));
  }

  return (
    <>
      <Script id="webpage-schema" type="application/ld+json">{JSON.stringify(webPageSchema)}</Script>
      {faqSchema && (
        <Script id="faq-schema" type="application/ld+json">{JSON.stringify(faqSchema)}</Script>
      )}
      <Script id="breadcrumb-schema" type="application/ld+json">{JSON.stringify(breadcrumbs)}</Script>

      <main className="min-h-screen">
        {/* ── Hero ── */}
        <section className="relative pt-12 pb-10 px-4 border-b border-slate-100 dark:border-slate-800 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5 pointer-events-none" />

          <div className="max-w-4xl mx-auto relative">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8 font-medium">
              <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
              <ArrowRight className="w-3 h-3 text-slate-300" />
              <Link href="/compare" className="hover:text-emerald-600 transition-colors">Compare</Link>
              <ArrowRight className="w-3 h-3 text-slate-300" />
              <span className="text-slate-600 dark:text-slate-300 truncate max-w-[200px]">{page.h1}</span>
            </nav>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-5">
              <BarChart3 className="w-3 h-3" /> Comparison
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
              <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full bg-gradient-to-b from-emerald-400 to-blue-500" />
              <p className="text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                {page.intro}
              </p>
            </div>
          )}

          {/* ── Comparison Table ── */}
          {comparisonRows.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-7 rounded-full bg-emerald-500" />
                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Feature Comparison
                </h2>
              </div>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700/60">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <th className="text-left px-6 py-4 font-black text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50">Feature</th>
                      <th className="px-6 py-4 font-black text-emerald-600 text-center bg-emerald-500/5">weFixPDF</th>
                      <th className="px-6 py-4 font-black text-slate-500 text-center bg-slate-50 dark:bg-slate-800/50">Alternative</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row, i) => {
                      const wfpBool = typeof row.weFixPDF === "boolean" ? row.weFixPDF : null;
                      const otherBool = typeof row.other === "boolean" ? row.other : null;
                      return (
                        <tr key={i} className="border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                          <td className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">{row.feature}</td>
                          <td className="px-6 py-4 text-center">
                            {wfpBool !== null
                              ? (wfpBool
                                ? <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto" />
                                : <XCircle className="w-5 h-5 text-rose-400 mx-auto" />)
                              : <span className="font-bold text-emerald-600 dark:text-emerald-400">{String(row.weFixPDF)}</span>
                            }
                          </td>
                          <td className="px-6 py-4 text-center">
                            {otherBool !== null
                              ? (otherBool
                                ? <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto" />
                                : <XCircle className="w-5 h-5 text-rose-400 mx-auto" />)
                              : <span className="text-slate-500">{String(row.other)}</span>
                            }
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Body Markdown */}
          {page.bodyContent && (
            <div>
              <MarkdownContent content={page.bodyContent} />
            </div>
          )}

          {/* ── Features ── */}
          {page.features && page.features.length > 0 && (
            <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/30">
              <h2 className="text-lg font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                Why weFixPDF Wins
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
                <div className="w-1 h-7 rounded-full bg-emerald-500" />
                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Common Questions
                </h2>
              </div>
              <div className="space-y-3">
                {page.faq.map((item, i) => (
                  <details key={i} className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden">
                    <summary className="flex items-center justify-between px-6 py-5 cursor-pointer font-bold text-slate-800 dark:text-white list-none gap-4">
                      <h3 className="text-sm leading-relaxed">{item.q}</h3>
                      <span className="text-emerald-600 text-xl font-light group-open:rotate-45 transition-transform duration-300 shrink-0">+</span>
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
            <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white">
              <h2 className="text-xl font-black mb-2">{page.cta.text}</h2>
              <p className="text-emerald-200 text-sm mb-6">No account, no watermarks, no data stored.</p>
              <a href={page.cta.url} className="inline-flex items-center gap-2 bg-white text-emerald-700 font-black px-6 py-3 rounded-2xl text-sm hover:bg-emerald-50 transition-colors">
                Try weFixPDF Free <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          )}

          {/* Related Tools */}
          {page.related && page.related.length > 0 && (
            <div className="pt-10 border-t border-slate-100 dark:border-slate-800">
              <p className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 mb-5">Try These Tools</p>
              <div className="flex flex-wrap gap-3">
                {page.related.map((r, i) => (
                  <a key={i} href={r.href ?? "#"} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-700 dark:text-slate-300 hover:border-emerald-500/40 hover:text-emerald-600 transition-all">
                    {r.label} <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
            <Link href="/compare" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              <ArrowLeft className="w-4 h-4" /> All Comparisons
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}