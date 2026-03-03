// app/compare/page.tsx — Compare index page
import type { Metadata } from "next";
import Link from "next/link";
import { getAllSlugs, getPageSeo, type SeoPage } from "@/app/lib/seo/seoApi";
import { ArrowRight, BarChart3, CheckCircle, XCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Compare PDF Tools — weFixPDF vs iLovePDF, Smallpdf & Adobe | weFixPDF",
  description:
    "Honest side-by-side comparisons of weFixPDF against Smallpdf, iLovePDF, Adobe Acrobat, and more. See features, pricing, and privacy policies at a glance.",
  alternates: { canonical: "https://wefixpdf.com/compare" },
  openGraph: {
    title: "Compare PDF Tools | weFixPDF",
    description: "Honest comparisons of weFixPDF vs Smallpdf, iLovePDF, Adobe Acrobat, and more.",
    url: "https://wefixpdf.com/compare",
    siteName: "weFixPDF",
    type: "website",
  },
};

const GLOBAL_FEATURES = [
  { feature: "100% Free",              weFixPDF: true },
  { feature: "No daily task limits",   weFixPDF: true },
  { feature: "No sign-up required",    weFixPDF: true },
  { feature: "Zero data retention",    weFixPDF: true },
  { feature: "No watermarks",          weFixPDF: true },
  { feature: "Image tools included",   weFixPDF: true },
  { feature: "Works in browser",       weFixPDF: true },
  { feature: "HEIC → JPG conversion",  weFixPDF: true },
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
    <main className="min-h-screen">
      {/* ── Hero ── */}
      <section className="pt-16 pb-12 px-4 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-black uppercase tracking-[0.2em] mb-6">
            <BarChart3 className="w-3 h-3" /> Tool Comparisons
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-4 leading-[1.1]">
            weFixPDF vs the{" "}
            <span className="text-reveal">Competition</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Honest, data-backed comparisons to help you choose the right PDF and image tool — no marketing fluff.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-16 space-y-20">

        {/* ── Key Advantages Summary ── */}
        <section>
          <p className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 mb-5">
            Why users choose weFixPDF
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {GLOBAL_FEATURES.map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60"
              >
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{f.feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Comparison Cards ── */}
        {pages.length > 0 && (
          <section>
            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 mb-6">
              All Comparisons
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

                  <h2 className="text-lg font-black text-slate-900 dark:text-white tracking-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-3 leading-snug">
                    {page.h1}
                  </h2>

                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-5 flex-1 line-clamp-2">
                    {page.description}
                  </p>

                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:gap-3 transition-all">
                    View comparison <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── Quick Summary Table ── */}
        <section>
          <p className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 mb-6">
            Quick Reference
          </p>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700/60">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left px-6 py-4 font-black text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50">Feature</th>
                  <th className="px-6 py-4 font-black text-emerald-600 text-center bg-emerald-500/5">weFixPDF</th>
                  <th className="px-6 py-4 font-black text-slate-500 text-center bg-slate-50 dark:bg-slate-800/50">Smallpdf</th>
                  <th className="px-6 py-4 font-black text-slate-500 text-center bg-slate-50 dark:bg-slate-800/50">iLovePDF</th>
                  <th className="px-6 py-4 font-black text-slate-500 text-center bg-slate-50 dark:bg-slate-800/50">Adobe Acrobat</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { f: "Price",            wfp: "Free",         sm: "$108/yr",     il: "$96/yr",       aa: "$240/yr" },
                  { f: "Daily limits",     wfp: "None",         sm: "2 tasks/day", il: "Limited",      aa: "Unlimited" },
                  { f: "Sign-up needed",   wfp: "Never",        sm: "Optional",    il: "Some tools",   aa: "Required" },
                  { f: "File storage",     wfp: "Never stored", sm: "1 hour",      il: "Temporary",    aa: "Adobe Cloud" },
                  { f: "Image tools",      wfp: "✓",            sm: "✗",           il: "✗",            aa: "Partial" },
                  { f: "Direct PDF edit",  wfp: "✗",            sm: "✗",           il: "✗",            aa: "✓" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">{row.f}</td>
                    <td className="px-6 py-4 text-center font-bold text-emerald-600 dark:text-emerald-400">{row.wfp}</td>
                    <td className="px-6 py-4 text-center text-slate-500">{row.sm}</td>
                    <td className="px-6 py-4 text-center text-slate-500">{row.il}</td>
                    <td className="px-6 py-4 text-center text-slate-500">{row.aa}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </main>
  );
}
