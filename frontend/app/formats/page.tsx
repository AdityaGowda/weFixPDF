// app/formats/page.tsx — File Formats index page
import type { Metadata } from "next";
import Link from "next/link";
import { getAllSlugs, getPageSeo, type SeoPage } from "@/app/lib/seo/seoApi";
import { buildBreadcrumbSchema } from "@/app/lib/seo/metadata";
import { ArrowRight, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "File Format Guides — PDF, PNG, WEBP & More | weFixPDF",
  description:
    "Learn everything about popular file formats — PDF, PNG, WEBP, HEIC, JPG. Understand when to use each format, how they work, and which tools to use.",
  alternates: { canonical: "https://wefixpdf.com/formats" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "File Format Guides | weFixPDF",
    description: "Understand PDF, PNG, WEBP, HEIC and more — practical guides for everyday use.",
    url: "https://wefixpdf.com/formats",
    siteName: "weFixPDF",
    type: "website",
    images: [{ url: "https://wefixpdf.com/wfp.png", width: 1200, height: 630, alt: "File Format Guides — weFixPDF" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "File Format Guides | weFixPDF",
    description: "Understand PDF, PNG, WEBP, HEIC and more.",
    images: ["https://wefixpdf.com/wfp.png"],
    site: "@wefixpdf",
  },
};

async function getFormatPages(): Promise<SeoPage[]> {
  const slugs = await getAllSlugs();
  const fSlugs = slugs.filter((s) => s.page_type === "format");
  const pages = await Promise.all(fSlugs.map((s) => getPageSeo(s.slug, "format")));
  return pages.filter(Boolean) as SeoPage[];
}

export default async function FormatsIndexPage() {
  const pages = await getFormatPages();
  const breadcrumbs = buildBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "File Formats", href: "/formats" },
  ]);

  return (
    <>
      <script id="breadcrumb-schema" type="application/ld+json">{JSON.stringify(breadcrumbs)}</script>
      <div className="min-h-screen">
        {/* ── Hero ── */}
        <section className="pt-16 pb-12 px-4 border-b border-slate-100 dark:border-slate-800">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-500/10 border border-slate-500/20 text-slate-600 dark:text-slate-400 text-[11px] font-black uppercase tracking-[0.2em] mb-6">
              <FileText className="w-3 h-3" /> File Format Guides
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-4 leading-[1.1]">
              Understand Every <span className="text-reveal">File Format</span>
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
              PDF, PNG, WEBP, HEIC, JPG — learn what each format is, when to use it, and how to convert between them.
            </p>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 py-16">
          {pages.length > 0 ? (
            <>
              <p className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 mb-6">
                All Format Guides
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {pages.map((page) => (
                  <Link
                    key={page.slug}
                    href={`/formats/${page.slug}`}
                    className="group flex flex-col p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 hover:border-slate-500/40 dark:hover:border-slate-500/30 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-500/10 border border-slate-500/20 flex items-center justify-center mb-5">
                      <FileText className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    </div>
                    <h2 className="text-base font-black text-slate-900 dark:text-white tracking-tight group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors mb-3 leading-snug flex-1">
                      {page.h1}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-4 line-clamp-2">
                      {page.subtitle || page.description}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 group-hover:gap-2.5 transition-all mt-auto pt-3 border-t border-slate-100 dark:border-slate-800">
                      Read guide <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-24 text-slate-400">
              <FileText className="w-10 h-10 mx-auto mb-4 opacity-30" />
              <p className="font-bold text-lg">Format guides coming soon...</p>
            </div>
          )}

          {/* ── CTA ── */}
          <section className="mt-16 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-slate-700 to-slate-900 text-white text-center">
            <h2 className="text-3xl font-black mb-3 tracking-tight">Ready to Convert?</h2>
            <p className="text-slate-300 font-medium mb-8 max-w-xl mx-auto">
              Use our free tools to convert between any format — no sign-up, no watermarks, no file storage.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-white text-slate-800 font-black px-8 py-4 rounded-2xl text-sm hover:bg-slate-100 transition-colors shadow-lg"
            >
              Browse All Tools <ArrowRight className="w-4 h-4" />
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}
