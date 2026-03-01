// components/seo/ToolPage.tsx
// ─────────────────────────────────────────────────────────────
// Full SEO tool page layout — Hero, Upload, How it works,
// Features, Related tools, FAQ, JSON-LD schemas
// ─────────────────────────────────────────────────────────────

import Script from "next/script";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
import type { SeoPage } from "@/app/lib/seo/seoData";
import { buildToolSchema, buildFaqSchema, buildBreadcrumbSchema } from "@/app/lib/seo/metadata";
import UploadBox from "@/app/components/UploadBox";

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

  return (
    <>
      {/* ── JSON-LD Schemas ── */}
      <Script id="tool-schema" type="application/ld+json">
        {JSON.stringify(toolSchema)}
      </Script>
      {faqSchema && (
        <Script id="faq-schema" type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </Script>
      )}
      <Script id="breadcrumb-schema" type="application/ld+json">
        {JSON.stringify(breadcrumbs)}
      </Script>

      <main>
        {/* ── 1. HERO + UPLOAD ── */}
        <section className="relative overflow-hidden py-8 px-4">
          <div className="max-w-3xl mx-auto text-center mb-6">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-xs text-slate-400 mb-6">
              <Link href="/" className="hover:text-brand-primary transition-colors">Home</Link>
              <ArrowRight className="w-3 h-3" />
              <span className="text-slate-600 dark:text-slate-300">{page.h1}</span>
            </nav>

            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white mb-4 leading-tight">
              {page.h1}
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-xl mx-auto">
              {page.subtitle}
            </p>
          </div>

          {/* Upload Box */}
          <div className="max-w-2xl mx-auto">
            <UploadBox service={page.slug} />
          </div>
        </section>

        {/* ── 2. HOW IT WORKS ── */}
        {page.howItWorks && (
          <section className="py-20 px-4 bg-slate-50 dark:bg-slate-900/50">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-black text-center text-slate-900 dark:text-white mb-12 tracking-tight">
                How It Works
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {page.howItWorks.map((step:any, i:number) => (
                  <div key={i} className="relative text-center group">
                    {/* Step number */}
                    <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-primary/20 transition-colors">
                      <span className="text-2xl font-black text-brand-primary">{i + 1}</span>
                    </div>
                    {/* Connector line */}
                    {i < page.howItWorks!.length - 1 && (
                      <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-brand-primary/20" />
                    )}
                    <h3 className="text-lg font-black text-slate-800 dark:text-white mb-2">{step.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── 3. FEATURES ── */}
        {page.features && (
          <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-black text-center text-slate-900 dark:text-white mb-12 tracking-tight">
                Why Use wefixPDF?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {page.features.map((feature: any, i: number) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-4 rounded-2xl glass dark:glass-dark border border-white/10 hover:border-brand-primary/30 transition-colors"
                  >
                    <CheckCircle className="w-5 h-5 text-brand-primary shrink-0" />
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── 4. RELATED TOOLS ── */}
        {page.related && page.related.length > 0 && (
          <section className="py-20 px-4 bg-slate-50 dark:bg-slate-900/50">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-black text-center text-slate-900 dark:text-white mb-12 tracking-tight">
                Related Tools
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {page.related.map((tool: any, i: number) => (
                  <Link
                    key={i}
                    href={tool.href}
                    className="flex items-center justify-center p-4 rounded-2xl text-center font-black text-sm text-slate-700 dark:text-white glass dark:glass-dark border border-white/10 hover:border-brand-primary/50 hover:text-brand-primary transition-all duration-300 hover:scale-[1.03]"
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
          <section className="py-20 px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-black text-center text-slate-900 dark:text-white mb-12 tracking-tight">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {page.faq.map((item: any, i: number) => (
                  <details
                    key={i}
                    className="group glass dark:glass-dark border border-white/10 rounded-2xl overflow-hidden"
                  >
                    <summary className="flex items-center justify-between px-6 py-5 cursor-pointer font-black text-slate-800 dark:text-white list-none">
                      <span>{item.q}</span>
                      <span className="text-brand-primary text-xl group-open:rotate-45 transition-transform duration-300">+</span>
                    </summary>
                    <div className="px-6 pb-5 text-slate-500 dark:text-slate-400 text-sm leading-relaxed border-t border-white/10 pt-4">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}