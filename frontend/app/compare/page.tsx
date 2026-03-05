// app/compare/page.tsx — Compare index page (no competitor names)
import type { Metadata } from "next";
import Link from "next/link";
import { getAllSlugs, getPageSeo, type SeoPage } from "@/app/lib/seo/seoApi";
import { ArrowRight, BarChart3, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Compare PDF Tools — Is weFixPDF Right for You? | weFixPDF",
  description:
    "See how weFixPDF stacks up on features, pricing, and privacy. Honest comparisons to help you choose the right PDF and image conversion tool.",
  alternates: { canonical: "/compare" },
  openGraph: {
    title: "Compare PDF Tools | weFixPDF",
    description: "Honest comparisons to help you choose the right PDF and image tool.",
    url: "/compare",
    siteName: "weFixPDF",
    type: "website",
  },
};

const WHY_WEFIXPDF = [
  { label: "100% Free — no hidden tiers", icon: "✓" },
  { label: "No daily task limits", icon: "✓" },
  { label: "No sign-up ever required", icon: "✓" },
  { label: "Zero file retention", icon: "✓" },
  { label: "No watermarks on output", icon: "✓" },
  { label: "Image tools included", icon: "✓" },
  { label: "Works in any browser", icon: "✓" },
  { label: "HEIC → JPG conversion", icon: "✓" },
];

const FEATURE_TABLE = [
  { f: "Price", wfp: "Free", alt: "Often paid" },
  { f: "Daily limits", wfp: "None", alt: "Common" },
  { f: "Sign-up needed", wfp: "Never", alt: "Usually" },
  { f: "File storage", wfp: "Never stored", alt: "Temporary" },
  { f: "Watermarks", wfp: "None", alt: "On free tier" },
  { f: "Image tools", wfp: "Included", alt: "Rarely" },
];

async function getComparePages(): Promise<SeoPage[]> {
  const slugs = await getAllSlugs();
  const cSlugs = slugs.filter((s) => s.page_type === "compare");
  const pages  = await Promise.all(cSlugs.map((s) => getPageSeo(s.slug, "compare")));
  return pages.filter(Boolean) as SeoPage[];
}

export default async function CompareIndexPage() {
  const pages = await getComparePages();

  return (
    <>
    <main className="min-h-screen">
      {/* ── Hero ── */}
      <section className="pt-16 pb-12 px-4 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-black uppercase tracking-[0.2em] mb-6">
            <BarChart3 className="w-3 h-3" /> Tool Comparisons
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-4 leading-[1.1]">
            Is weFixPDF Right{" "}
            <span className="text-reveal">for You?</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            We believe in honest comparisons. See exactly what makes weFixPDF different — and decide for yourself.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-16 space-y-20">

        {/* ── Key Advantages ── */}
        <section>
          <p className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 mb-5">
            What you get with weFixPDF
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {WHY_WEFIXPDF.map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60"
              >
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{f.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Comparison Articles ── */}
        {pages.length > 0 && (
          <section>
            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 mb-6">
              Detailed Comparisons
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {pages.map((page) => (
                <Link
                  key={page.slug}
                  href={`/compare/${page.slug}`}
                  className="group flex flex-col p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 hover:border-emerald-500/40 dark:hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart3 className="w-4 h-4 text-emerald-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                      Comparison
                    </span>
                  </div>

                  <h2 className="text-lg font-black text-slate-900 dark:text-white tracking-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-3 leading-snug flex-1">
                    {page.h1}
                  </h2>

                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-5 line-clamp-2">
                    {page.description}
                  </p>

                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:gap-3 transition-all">
                    Read comparison <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── Feature Summary Table ── */}
        <section>
          <p className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 mb-6">
            At a Glance
          </p>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700/60">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left px-6 py-4 font-black text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50">Feature</th>
                  <th className="px-6 py-4 font-black text-emerald-600 text-center bg-emerald-500/5">weFixPDF</th>
                  <th className="px-6 py-4 font-black text-slate-500 text-center bg-slate-50 dark:bg-slate-800/50">Most Other Tools</th>
                </tr>
              </thead>
              <tbody>
                {FEATURE_TABLE.map((row, i) => (
                  <tr key={i} className="border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">{row.f}</td>
                    <td className="px-6 py-4 text-center font-bold text-emerald-600 dark:text-emerald-400">{row.wfp}</td>
                    <td className="px-6 py-4 text-center text-slate-500">{row.alt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white text-center">
          <h2 className="text-3xl font-black mb-3 tracking-tight">See for Yourself</h2>
          <p className="text-emerald-200 font-medium mb-8 max-w-xl mx-auto">
            No sign-up. No limits. No watermarks. Just fast, private file processing — completely free.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white text-emerald-700 font-black px-8 py-4 rounded-2xl text-sm hover:bg-emerald-50 transition-colors shadow-lg"
          >
            Try weFixPDF Free <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </main>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8668995301634402"
        crossOrigin="anonymous"></script>
    </>
  );
}
