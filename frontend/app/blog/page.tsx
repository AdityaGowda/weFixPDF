// app/blog/page.tsx — Blog index page
import type { Metadata } from "next";
import Link from "next/link";
import { getAllSlugs, getPageSeo, type SeoPage } from "@/app/lib/seo/seoApi";
import { ArrowRight, Clock, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — PDF, Image & File Conversion Guides | weFixPDF",
  description:
    "Expert guides on compressing PDFs, converting images, protecting files, and choosing the right format for any task. Free tips from the weFixPDF team.",
  alternates: { canonical: "https://wefixpdf.com/blog" },
  openGraph: {
    title: "Blog — PDF & Image Guides | weFixPDF",
    description:
      "Expert guides on PDF and image conversion, compression, and security.",
    url: "https://wefixpdf.com/blog",
    siteName: "weFixPDF",
    type: "website",
  },
};

// Estimated reading time (words / 200 wpm)
function readingTime(bodyContent?: string): string {
  if (!bodyContent) return "3 min read";
  const words = bodyContent.split(/\s+/).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min read`;
}

// Category tag based on slug patterns
function categoryTag(slug: string): { label: string; color: string } {
  if (slug.includes("compress") || slug.includes("image") || slug.includes("jpg") || slug.includes("png") || slug.includes("webp") || slug.includes("heic"))
    return { label: "Images", color: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20" };
  if (slug.includes("pdf") || slug.includes("merge") || slug.includes("split") || slug.includes("docx") || slug.includes("word"))
    return { label: "PDF", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" };
  if (slug.includes("security") || slug.includes("protect") || slug.includes("privacy") || slug.includes("password"))
    return { label: "Security", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" };
  return { label: "Guide", color: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20" };
}

async function getBlogPosts(): Promise<SeoPage[]> {
  const slugs = await getAllSlugs();
  const blogSlugs = slugs.filter((s) => s.page_type === "blog");
  const posts = await Promise.all(
    blogSlugs.map((s) => getPageSeo(s.slug, "blog"))
  );
  return posts.filter(Boolean) as SeoPage[];
}

export default async function BlogIndexPage() {
  const posts = await getBlogPosts();

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <main className="min-h-screen">
      {/* ── Hero ── */}
      <section className="pt-16 pb-12 px-4 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-[11px] font-black uppercase tracking-[0.2em] mb-6">
            <BookOpen className="w-3 h-3" /> The weFixPDF Blog
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-4 leading-[1.1]">
            Guides for Working <br className="hidden md:block" />
            <span className="text-reveal">Smarter with Files</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Practical tips on compressing PDFs, converting images, boosting web performance, and keeping your documents secure.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* ── Featured Post ── */}
        {featured && (
          <div className="mb-16">
            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 mb-4">
              Featured Article
            </p>

          </div>
        )}

        {/* ── Article Grid ── */}
        {rest.length > 0 && (
          <>
            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400 mb-6">
              All Articles
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map((post) => {
                const cat = categoryTag(post.slug);
                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 hover:border-blue-500/40 dark:hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300"
                  >
                    {/* Category tag */}
                    <span className={`inline-flex self-start px-2.5 py-1 rounded-lg border text-[10px] font-black uppercase tracking-widest mb-4 ${cat.color}`}>
                      {cat.label}
                    </span>

                    <h2 className="text-base font-black text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug mb-3 flex-1">
                      {post.h1}
                    </h2>

                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-4 line-clamp-2">
                      {post.description}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100 dark:border-slate-800">
                      <span className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                        <Clock className="w-3 h-3" />
                        {readingTime(post.bodyContent)}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}

        {/* Empty state */}
        {posts.length === 0 && (
          <div className="text-center py-24 text-slate-400">
            <BookOpen className="w-10 h-10 mx-auto mb-4 opacity-30" />
            <p className="font-bold text-lg">Articles coming soon...</p>
          </div>
        )}
      </div>
    </main>
  );
}
