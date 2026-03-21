import Script from "next/script";
import Link from "next/link";
import {
  CheckCircle,
  ArrowRight,
  Star,
  Trash2,
  ShieldCheck,
  Zap,
  LayoutGrid,
  Clock,
  Sparkles,
  Shield,
  Diamond,
  Hexagon,
  Pentagon,
  FileText
} from "lucide-react";

import type { SeoPage } from "@/app/lib/seo/seoApi";
import { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/app/lib/seo/metadata";
import UploadBoxUI from "./UploadBoxUI";
import MarkdownContent from "../markdowncontent";

interface ToolPageProps {
  page: SeoPage;
}

export default function ToolPage({ page }: ToolPageProps) {
  const toolSchema     = buildToolSchema(page);
  const faqSchema      = page.faq ? buildFaqSchema(page.faq) : null;
  const breadcrumbs    = buildBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: page.h1, href: `/${page.slug}` },
  ]);

  const featureIcons = [
    <Sparkles className="w-5 h-5 text-blue-500" />,
    <Diamond className="w-5 h-5 text-indigo-500" />,
    <Hexagon className="w-5 h-5 text-purple-500" />,
    <Pentagon className="w-5 h-5 text-blue-400" />,
    <Shield className="w-5 h-5 text-indigo-400" />,
    <Zap className="w-5 h-5 text-brand-primary" />,
  ];
  const toolUrl = page.cta?.url.split("/")[3];
  return (
    <>
      <script id="tool-schema" type="application/ld+json">
        {JSON.stringify(toolSchema)}
      </script>
      {faqSchema && (
        <script id="faq-schema" type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
      <script id="breadcrumb-schema" type="application/ld+json">
        {JSON.stringify(breadcrumbs)}
      </script>

      <div className=" dark:bg-slate-950 min-h-screen">
        {/* ── 1. HERO + UPLOAD ── */}
        <section className="relative pt-12 pb-6 px-4 border-b border-slate-100 dark:border-slate-900">
          <div className="max-w-5xl mx-auto text-center mb-6 md:mb-10">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center justify-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 md:mb-8">
              <Link href="/" className="hover:text-brand-primary transition-colors">Home</Link>
              <ArrowRight className="w-3 h-3 text-slate-300 shrink-0" />
              <span className="text-slate-600 dark:text-slate-300 break-words line-clamp-1">{page.h1}</span>
            </nav>

            <h1 className="text-3xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white mb-4 md:mb-6 leading-[1.1]">
              {page.h1}
            </h1>
            <p className="text-base md:text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
              {page.subtitle}
            </p>
          </div>

          {/* ── CTA / Instruction Line ── */}
          <div className="max-w-5xl mx-auto mt-12 mb-8 px-4 text-center">
            <p className="text-xl md:text-1xl font-black text-slate-900 dark:text-white tracking-tight">
              Want to <span className="text-brand-primary underline decoration-emerald-500/20 underline-offset-4">{page.cta?.text}</span>{"  "}?
            </p>
          </div>

          <a href={`/${toolUrl}`} className="block max-w-4xl mx-auto" >
            <UploadBoxUI />
          </a>
        </section>
        {/* ── 4. BODY CONTENT — from DB body_content (Markdown/HTML) ── */}
        {page.bodyContent && (
          <section className="py-16 md:py-24 px-4 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900 overflow-hidden">
            <div className="max-w-5xl mx-auto">
              <div className="mb-8 md:mb-12">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-md bg-blue-500/10 flex items-center justify-center">
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600 block">User Guide</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  {page.h2 ?? "Complete Guide"}
                </h2>
              </div>

              <MarkdownContent content={page.bodyContent} />

              {/* CTA inline inside article */}
              {page.cta && (
                <div className="mt-12 md:mt-16 p-6 md:p-8 rounded-3xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                  <div className="space-y-1">
                    <p className="text-lg font-black text-slate-900 dark:text-white">Start using {page.h1} now</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Fast, free, and no installation required.</p>
                  </div>
                  <a
                    href={page.cta.url}
                    className="w-full md:w-auto shrink-0 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-2xl font-bold text-base transition-all hover:scale-[1.03] shadow-xl shadow-blue-600/20"
                  >
                    {page.cta.text}
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              )}
            </div>
          </section>
        )}
        {/* ── 3. FEATURES (WHY weFixPDF) ── */}
        {page.features && page.features.length > 0 && (
          <section className="py-16 md:py-24 px-4 bg-slate-50 dark:bg-slate-900/20 border-y border-slate-100 dark:border-slate-900">
            <div className="max-w-5xl mx-auto">
              <div className="mb-10">
                <span className="text-[11px] font-black uppercase tracking-[0.25em] text-blue-600 mb-2 block">Why weFixPDF</span>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  Everything You Need. Nothing You Don't.
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {page.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md hover:shadow-blue-500/5 transition-all duration-200">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-700/50">
                      {featureIcons[i % featureIcons.length]}
                    </div>
                    <span className="text-[13px] font-bold text-slate-700 dark:text-slate-200 tracking-tight leading-tight">
                      {feature}
                    </span>
                  </div>
                ))}
                {/* Bonus security chip if < 5 features */}
                {page.features.length < 5 && (
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0">
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </div>
                    <span className="text-[13px] font-bold text-slate-700 dark:text-slate-200 tracking-tight">
                      Files deleted immediately after conversion
                    </span>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ── 4. RELATED TOOLS ── */}
        {page.related && page.related.length > 0 && (
          <section className="py-16 md:py-24 px-4 bg-white dark:bg-slate-950">
            <div className="max-w-5xl mx-auto">
              <div className="mb-10 text-center md:text-left">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2 block">Power up your workflow</span>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  Discover Related Tools
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {page.related.map((tool, i) => (
                  <Link
                    key={i}
                    href={tool.href || "#"}
                    className="flex items-center justify-center min-h-[64px] px-6 py-4 rounded-2xl text-center font-bold text-xs uppercase tracking-widest text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-800 hover:border-brand-primary hover:text-brand-primary transition-all duration-300 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md hover:scale-[1.02]"
                  >
                    {tool.label}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── 5. FAQ ── */}
        {page.faq && page.faq.length > 0 && (
          <section className="py-16 md:py-24 px-4 border-b border-slate-100 dark:border-slate-900">
            <div className="max-w-5xl mx-auto">
              <div className="mb-16">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 mb-4 block">FAQ</span>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  Common Questions
                </h2>
              </div>
              <div className="space-y-3">
                {page.faq.map((item, i) => (
                  <details
                    key={i}
                    className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm"
                  >
                    <summary className="flex items-center justify-between px-5 md:px-8 py-4 md:py-6 cursor-pointer font-bold text-slate-800 dark:text-white list-none">
                      <span className="pr-4 leading-relaxed text-sm md:text-base">{item.q}</span>
                      <span className="text-blue-600 text-xl md:text-2xl font-light group-open:rotate-45 transition-transform duration-300 leading-none shrink-0">+</span>
                    </summary>
                    <div className="px-5 md:px-8 pb-6 md:pb-8 text-slate-500 dark:text-slate-400 text-xs md:text-sm leading-relaxed border-t border-slate-50 dark:border-slate-800/50 pt-5 md:pt-6 font-medium">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}