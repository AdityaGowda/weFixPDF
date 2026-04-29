import { HowItWorksStep, ToolMetaData } from "../lib/seo/seoApi";
import MarkdownContent from "./markdowncontent";
import InternalLinkGrid from "./InternalLinkGrid";

type ToolPageContentProps = {
  metadata: ToolMetaData | undefined;
};

export default async function ToolPageContent({ metadata }: ToolPageContentProps) {


  return (
    <div className="space-y-16 md:space-y-24 mt-12 md:mt-16">
      {/* ── Intro ── */}
      {metadata?.intro && (
        <div className="relative max-w-3xl">
          <div className="absolute -left-4 top-0 bottom-0 w-[3px] rounded-full bg-gradient-to-b from-emerald-400 to-emerald-600" />
          <p className="pl-6 text-slate-500 dark:text-slate-400 text-base leading-relaxed">
            {metadata.intro}
          </p>
        </div>
      )}

      {/* ── How It Works ── */}
      {metadata?.howTo?.steps && metadata.howTo.steps.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 rounded-full bg-emerald-500" />
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {metadata.howTo.title}
            </h2>
          </div>

          {metadata.howTo.description && (
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm leading-relaxed max-w-2xl mb-12">
              {metadata.howTo.description}
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative">
            <div className="hidden sm:block absolute top-10 left-[18%] right-[18%] h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
            {metadata.howTo.steps.map((step: HowItWorksStep, i: number) => (
              <div
                key={i}
                className="relative flex flex-col gap-4 p-8 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 shadow-sm hover:shadow-md hover:border-emerald-500/40 dark:hover:border-emerald-500/30 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-black text-sm shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all duration-300 shrink-0">
                    {i + 1}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                    Step {i + 1}
                  </span>
                </div>
                <p className="text-slate-900 dark:text-white font-semibold text-sm">{step.name}</p>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Features ── */}
      {metadata?.features && metadata.features.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 rounded-full bg-emerald-500" />
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Features
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {metadata.features.map((feature: string, i: number) => (
              <div
                key={i}
                className="group flex items-center gap-4 p-6 rounded-2xl bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 hover:border-emerald-500/40 dark:hover:border-emerald-500/30 hover:bg-emerald-50/30 dark:hover:bg-emerald-500/5 transition-all duration-200"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-all duration-200">
                  <svg className="w-2.5 h-2.5 text-emerald-500 group-hover:text-white transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-slate-700 dark:text-slate-400 font-medium text-sm">{feature}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Body Content (rich article markdown) ── */}
      {metadata?.bodyContent && (
        <section>
          <MarkdownContent content={metadata.bodyContent} />
        </section>
      )}

      {/* ── Related Tools ── */}
      {metadata?.relatedTools && metadata.relatedTools.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 rounded-full bg-emerald-500" />
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Related Tools
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {metadata.relatedTools.map((tool: any, i: number) => (
              <a
                key={i}
                href={tool.url}
                className="flex items-center justify-center p-6 rounded-2xl text-center font-bold text-sm text-slate-700 dark:text-white bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 hover:border-emerald-500/40 dark:hover:border-emerald-500/30 hover:bg-emerald-50/30 dark:hover:bg-emerald-500/5 transition-all duration-300 group"
              >
                <span className="group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {tool.name}
                </span>
              </a>
            ))}
          </div>
        </section>
      )}



      {/* ── FAQ ── */}
      {metadata?.faqs && metadata.faqs.length > 0 && (
        <section className="pb-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 rounded-full bg-emerald-500" />
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="max-w-3xl space-y-4">
            {metadata.faqs.map((faq: { q: string; a: string }, i: number) => (
              <div
                key={i}
                className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 overflow-hidden"
              >
                <div className="px-6 sm:px-8 pt-6 pb-4">
                  <h3 className="font-black text-slate-900 dark:text-white text-base leading-snug">
                    {faq.q}
                  </h3>
                </div>
                <div className="px-6 sm:px-8 pb-6">
                  <div className="w-full h-px bg-emerald-500/15 mb-3" />
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}