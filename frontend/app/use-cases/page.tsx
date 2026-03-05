// app/use-cases/page.tsx — Use Cases index page
import type { Metadata } from "next";
import Link from "next/link";
import { getAllSlugs, getPageSeo, type SeoPage } from "@/app/lib/seo/seoApi";
import { buildBreadcrumbSchema } from "@/app/lib/seo/metadata";
import { ArrowRight, Users, GraduationCap, Briefcase, Scale, Home, Camera, Code2, HeartHandshake } from "lucide-react";

export const metadata: Metadata = {
  title: "Use Cases — Who Needs weFixPDF? | weFixPDF",
  description:
    "From students to lawyers, businesses to developers — discover how different people use weFixPDF's free PDF and image tools to get work done faster.",
  alternates: { canonical: "https://wefixpdf.com/use-cases" },
  openGraph: {
    title: "Use Cases | weFixPDF",
    description: "Discover how students, businesses, lawyers, and developers use weFixPDF.",
    url: "https://wefixpdf.com/use-cases",
    siteName: "weFixPDF",
    type: "website",
  },
};

// Icon mapping by slug keywords
function getIcon(slug: string) {
  const s = slug.toLowerCase();
  if (s.includes("student") || s.includes("teacher") || s.includes("educat"))
    return <GraduationCap className="w-6 h-6" />;
  if (s.includes("business") || s.includes("freelancer") || s.includes("invoice"))
    return <Briefcase className="w-6 h-6" />;
  if (s.includes("lawyer") || s.includes("legal") || s.includes("court"))
    return <Scale className="w-6 h-6" />;
  if (s.includes("developer") || s.includes("dev") || s.includes("code"))
    return <Code2 className="w-6 h-6" />;
  if (s.includes("real-estate") || s.includes("property"))
    return <Home className="w-6 h-6" />;
  if (s.includes("image") || s.includes("photo") || s.includes("compress"))
    return <Camera className="w-6 h-6" />;
  if (s.includes("hr") || s.includes("human") || s.includes("onboard"))
    return <HeartHandshake className="w-6 h-6" />;
  return <Users className="w-6 h-6" />;
}

function getIconColor(slug: string): string {
  const s = slug.toLowerCase();
  if (s.includes("student") || s.includes("teacher"))
    return "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20";
  if (s.includes("business") || s.includes("freelancer"))
    return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
  if (s.includes("lawyer") || s.includes("legal"))
    return "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20";
  if (s.includes("developer"))
    return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
  if (s.includes("real-estate"))
    return "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20";
  if (s.includes("image") || s.includes("compress"))
    return "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20";
  return "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20";
}

async function getUseCasePages(): Promise<SeoPage[]> {
  const slugs = await getAllSlugs();
  const ucSlugs = slugs.filter((s) => s.page_type === "use_cases" || s.page_type === "usecase");
  const pages   = await Promise.all(
    ucSlugs.map((s) => getPageSeo(s.slug, s.page_type))
  );
  return pages.filter(Boolean) as SeoPage[];
}

export default async function UseCasesIndexPage() {
  const pages = await getUseCasePages();

  const breadcrumbs = buildBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Use Cases", href: "/use-cases" },
  ]);

  const STATS = [
    { value: "1k+",   label: "Files processed" },
    { value: "100%",  label: "Free forever" },
    { value: "0",     label: "Files stored" },
    { value: "11",    label: "Tools available" },
  ];

  return (
    <>
    <main className="min-h-screen">
      <script id="breadcrumb-schema" type="application/ld+json">{JSON.stringify(breadcrumbs)}</script>
      {/* ── Hero ── */}
      <section className="pt-16 pb-12 px-4 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-600 dark:text-violet-400 text-[11px] font-black uppercase tracking-[0.2em] mb-6">
            <Users className="w-3 h-3" /> Use Cases
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-4 leading-[1.1]">
            Built for Every{" "}
            <span className="text-reveal">Workflow</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed mb-10">
            Whether you're a student, lawyer, freelancer, or developer — weFixPDF has the tools you need, completely free.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8">
            {STATS.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-black text-slate-900 dark:text-white">{s.value}</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-16 space-y-16">

        {/* ── Use Case Cards ── */}
        {pages.length > 0 ? (
          <section>
            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 mb-6">
              Pick Your Workflow
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {pages.map((page) => {
                const iconColor = getIconColor(page.slug);
                return (
                  <Link
                    key={page.slug}
                    href={`/use-cases/${page.slug}`}
                    className="group flex flex-col p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 hover:border-violet-500/40 dark:hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-300"
                  >
                    {/* Icon */}
                    <div className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-5 ${iconColor}`}>
                      {getIcon(page.slug)}
                    </div>

                    <h2 className="text-base font-black text-slate-900 dark:text-white tracking-tight group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors mb-3 leading-snug flex-1">
                      {page.h1}
                    </h2>

                    {(page.subtitle || page.description) && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-4 line-clamp-2">
                        {page.subtitle || page.description}
                      </p>
                    )}

                    <div className="flex items-center gap-1.5 text-xs font-bold text-violet-600 dark:text-violet-400 group-hover:gap-2.5 transition-all mt-auto pt-3 border-t border-slate-100 dark:border-slate-800">
                      Explore workflow <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ) : (
          <div className="text-center py-24 text-slate-400">
            <Users className="w-10 h-10 mx-auto mb-4 opacity-30" />
            <p className="font-bold text-lg">Use case guides coming soon...</p>
          </div>
        )}

        {/* ── CTA ── */}
        <section className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-700 text-white text-center">
          <h2 className="text-3xl font-black mb-3 tracking-tight">Start Using weFixPDF Today</h2>
          <p className="text-violet-200 font-medium mb-8 max-w-xl mx-auto">
            No account. No credit card. No limits. Just fast, private file processing for whatever you need.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white text-violet-700 font-black px-8 py-4 rounded-2xl text-sm hover:bg-violet-50 transition-colors shadow-lg"
          >
            Browse All Tools <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </main>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8668995301634402"
        crossOrigin="anonymous"></script>
    </>
  );
}
