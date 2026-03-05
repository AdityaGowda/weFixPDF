// app/formats/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPageSeo, getAllSlugs } from "@/app/lib/seo/seoApi";
import { buildMetadata, buildBreadcrumbSchema, buildArticleSchema } from "@/app/lib/seo/metadata";

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.filter(s => s.page_type === "format").map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageSeo(slug, "format");
  if (!page) return {};
  return buildMetadata(page, "/formats");
}

export default async function FormatPage({ params }: Props) {
  const { slug } = await params;
  const page = await getPageSeo(slug, "format");
  if (!page) notFound();

  const articleSchema = buildArticleSchema(page);
  const breadcrumbs   = buildBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "File Formats", href: "/formats" },
    { name: page.h1, href: `/formats/${page.slug}` },
  ]);

  return (
    <>
      <script id="article-schema" type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      <script id="breadcrumb-schema" type="application/ld+json">{JSON.stringify(breadcrumbs)}</script>

      <main className="max-w-3xl mx-auto py-16 px-4">
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8">
          <Link href="/" className="hover:text-brand-primary transition-colors">Home</Link>
          <ArrowRight className="w-3 h-3" />
          <Link href="/formats" className="hover:text-brand-primary transition-colors">Formats</Link>
          <ArrowRight className="w-3 h-3" />
          <span className="text-slate-600 dark:text-slate-300">{page.h1}</span>
        </nav>

        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">{page.h1}</h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 mb-12 leading-relaxed">{page.subtitle}</p>

        <div className="prose dark:prose-invert max-w-none mb-12">
          <p>{page.description}</p>
          <p className="text-slate-400 italic text-sm">Full format guide content goes here.</p>
        </div>

        {page.related && (
          <div className="border-t border-slate-200 dark:border-white/10 pt-10">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Related Tools</p>
            <div className="flex flex-wrap gap-3">
              {page.related.map((r, i) => (
                <Link key={i} href={r.href} className="px-5 py-3 rounded-2xl bg-brand-primary text-white font-black text-sm hover:scale-105 transition-transform">
                  {r.label} →
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8668995301634402"
        crossOrigin="anonymous"></script>
    </>
  );
}