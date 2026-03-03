// app/compare/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { ArrowRight, CheckCircle, XCircle } from "lucide-react";
import { getPageSeo, getAllSlugs } from "@/app/lib/seo/seoApi";
import { buildMetadata, buildBreadcrumbSchema } from "@/app/lib/seo/metadata";

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.filter(s => s.page_type === "compare").map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageSeo(slug, "compare");
  if (!page) return {};
  return buildMetadata(page, "/compare");
}

export default async function ComparePage({ params }: Props) {
  const { slug } = await params;
  const page = await getPageSeo(slug, "compare");
  if (!page) notFound();

  const breadcrumbs = buildBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Compare", href: "/compare" },
    { name: page.h1, href: `/compare/${page.slug}` },
  ]);

  // Generic comparison table for weFixPDF vs competitor pages
  const isVsPage = page.slug.startsWith("weFixPDF-vs-");
  const competitor = isVsPage ? page.h1.split(" vs ")[1] : null;

  const comparisonFeatures = [
    { feature: "100% Free", weFixPDF: true, other: false },
    { feature: "No file size limits", weFixPDF: true, other: false },
    { feature: "No sign-up required", weFixPDF: true, other: false },
    { feature: "Zero data retention", weFixPDF: true, other: false },
    { feature: "Runs in browser", weFixPDF: true, other: false },
    { feature: "No watermarks", weFixPDF: true, other: false },
    { feature: "Merge PDF", weFixPDF: true, other: true },
    { feature: "Compress PDF", weFixPDF: true, other: true },
    { feature: "PDF to Word", weFixPDF: true, other: true },
    { feature: "Remove background", weFixPDF: true, other: false },
  ];

  return (
    <>
      <Script id="breadcrumb-schema" type="application/ld+json">{JSON.stringify(breadcrumbs)}</Script>

      <main className="max-w-4xl mx-auto py-16 px-4">
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8">
          <Link href="/" className="hover:text-brand-primary transition-colors">Home</Link>
          <ArrowRight className="w-3 h-3" />
          <span className="text-slate-600 dark:text-slate-300">{page.h1}</span>
        </nav>

        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">{page.h1}</h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 mb-12">{page.subtitle}</p>

        {/* Comparison Table */}
        {isVsPage && competitor && (
          <div className="overflow-x-auto mb-16 rounded-3xl border border-white/10 glass dark:glass-dark">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-6 py-4 font-black text-slate-500 dark:text-slate-400">Feature</th>
                  <th className="px-6 py-4 font-black text-brand-primary text-center">weFixPDF</th>
                  <th className="px-6 py-4 font-black text-slate-500 text-center">{competitor}</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">{row.feature}</td>
                    <td className="px-6 py-4 text-center">
                      {row.weFixPDF
                        ? <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto" />
                        : <XCircle className="w-5 h-5 text-rose-400 mx-auto" />}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.other
                        ? <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto" />
                        : <XCircle className="w-5 h-5 text-rose-400 mx-auto" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* CTA */}
        {page.related && (
          <div className="flex flex-wrap gap-3">
            {page.related.map((r, i) => (
              <Link key={i} href={r.href} className="px-6 py-3 rounded-2xl bg-brand-primary text-white font-black text-sm hover:scale-105 transition-transform">
                {r.label} →
              </Link>
            ))}
          </div>
        )}
      </main>
    </>
  );
}