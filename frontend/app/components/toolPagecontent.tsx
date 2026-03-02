import { HowItWorksStep, ToolMetaData } from "../lib/seo/toolPageSeo";

type ToolPageContentProps = {
  metadata: ToolMetaData | undefined;
};

export default async function ToolPageContent({ metadata }: ToolPageContentProps) {

  const faqSchema = metadata ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": metadata.faqs.map((faq: any) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": { "@type": "Answer", "text": faq.a },
    })),
  } : null;

  const howToSchema = metadata ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": metadata.howTo.title,
    "description": metadata.howTo.description,
    "step": metadata.howTo.steps.map((step: HowItWorksStep, i: any) => ({
      "@type": "HowToStep",
      "position": i + 1,
      "name": step.name,
      "text": step.text,
    })),
  } : null;

  return (
    <div className="space-y-20 mt-8">

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      {/* ── Intro ── */}
      <div className="relative max-w-3xl">
        <div className="absolute -left-4 top-0 bottom-0 w-[3px] rounded-full bg-gradient-to-b from-emerald-400 to-emerald-600" />
        <p className="pl-6 text-slate-500 dark:text-slate-400 text-base leading-relaxed">
          {metadata?.intro}
        </p>
      </div>

      {/* ── How It Works ── */}
      <section>
        <div className="flex items-center gap-3 mb-10">
          <div className="w-1 h-8 rounded-full bg-emerald-500" />
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            How It Works
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative">

          <div className="hidden sm:block absolute top-[2.2rem] left-[18%] right-[18%] h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

          {metadata?.howTo?.steps?.map((step: HowItWorksStep, i: number) => (
            <div
              key={i}
              className="relative flex flex-col gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 shadow-sm hover:shadow-md hover:border-emerald-500/40 dark:hover:border-emerald-500/30 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-black text-sm shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all duration-300 shrink-0">
                  {i + 1}
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                  Step {i + 1}
                </span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 font-semibold text-sm leading-relaxed">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-8 rounded-full bg-emerald-500" />
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Features
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {metadata?.features?.map((feature: string, i: number) => (
            <div
              key={i}
              className="group flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 hover:border-emerald-500/40 dark:hover:border-emerald-500/30 hover:bg-emerald-50/30 dark:hover:bg-emerald-500/5 transition-all duration-200"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-all duration-200">
                <svg className="w-2.5 h-2.5 text-emerald-500 group-hover:text-white transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-slate-700 dark:text-slate-400 font-medium text-sm">
                {feature}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="pb-8">
       <div className="flex items-center gap-3 mb-8">
    <div className="w-1 h-8 rounded-full bg-emerald-500" />
    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
      Frequently Asked Questions
    </h2>
  </div>

        <div className="max-w-3xl space-y-3 [overflow-anchor:none]">
          {metadata?.faqs?.map((faq: { q: string; a: string }, i: number) => (
            <details
              key={i}
              className="group rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 hover:border-emerald-500/40 dark:hover:border-emerald-500/30 open:border-emerald-500/30 open:bg-emerald-500/5 dark:open:bg-emerald-500/5 transition-all duration-200 overflow-hidden"
            >
              <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none select-none">
                <h3 className="font-black text-slate-900 dark:text-white group-open:text-emerald-600 dark:group-open:text-emerald-400 text-base leading-snug transition-colors duration-200">
                  {faq.q}
                </h3>
                <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 group-open:bg-emerald-500 group-open:border-emerald-500 transition-all duration-200">
                  <svg
                    className="w-3.5 h-3.5 text-slate-500 group-open:text-white group-open:rotate-45 transition-all duration-300"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </summary>

              <div className="px-6 pb-6 -mt-1">
                <div className="w-full h-px bg-emerald-500/15 mb-4" />
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                  {faq.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>

    </div>
  );
}