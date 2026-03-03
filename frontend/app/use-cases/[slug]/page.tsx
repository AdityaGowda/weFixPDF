// app/use-cases/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { getPageSeo, getAllSlugs } from "@/app/lib/seo/seoApi";
import { buildMetadata, buildBreadcrumbSchema } from "@/app/lib/seo/metadata";

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.filter(s => s.page_type === "use_cases").map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageSeo(slug, "use_cases");
  if (!page) return {};
  return buildMetadata(page, "/use-cases");
}

export default async function UseCasePage({ params }: Props) {
  const { slug } = await params;
  const page = await getPageSeo(slug, "use_cases");
  if (!page) notFound();

  const breadcrumbs = buildBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Use Cases", href: "/use-cases" },
    { name: page.h1, href: `/use-cases/${page.slug}` },
  ]);

  return (
    <>
      <Script id="breadcrumb-schema" type="application/ld+json">{JSON.stringify(breadcrumbs)}</Script>

      <main className="mx-auto pt-5 pb-10 px-4">
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8">
          <Link href="/" className="hover:text-brand-primary transition-colors">Home</Link>
          <ArrowRight className="w-3 h-3" />
          <span className="text-slate-600 dark:text-slate-300">{page.h1}</span>
        </nav>

        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight leading-tight">{page.h1}</h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 mb-12 leading-relaxed">{page.subtitle}</p>

        <div className="prose dark:prose-invert max-w-none mb-12">
          <p>{page.description}</p>
          <p className="text-slate-400 italic text-sm">Full use case content goes here.</p>
        </div>

        {page.related && page.related.length > 0 && (
          <div className="border-t border-slate-200 dark:border-white/10 pt-10">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Recommended Tools</p>
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
    </>
  );
}