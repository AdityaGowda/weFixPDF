import type { Metadata } from "next";
import Link from "next/link";
import { getAllSlugs, getPageSeo, type SeoPage } from "@/app/lib/seo/seoApi";
import { buildBreadcrumbSchema } from "@/app/lib/seo/metadata";
import { ArrowRight, Clock, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — PDF, Image & File Conversion Guides | weFixPDF",
  description: "Expert guides on compressing PDFs, converting images, protecting files, and choosing the right format for any task. Free tips from the weFixPDF team.",
  alternates: { canonical: "https://wefixpdf.com/blog" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Blog — PDF & Image Guides | weFixPDF",
    description: "Expert guides on PDF and image conversion, compression, and security.",
    url: "https://wefixpdf.com/blog",
    siteName: "weFixPDF",
    type: "website",
    images: [{ url: "https://wefixpdf.com/wfp.png", width: 1200, height: 630, alt: "weFixPDF Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — PDF & Image Guides | weFixPDF",
    description: "Expert guides on PDF and image conversion, compression, and security.",
    images: ["https://wefixpdf.com/wfp.png"],
    site: "@wefixpdf",
  },
};

function readingTime(bodyContent?: string): string {
  if (!bodyContent) return "3 min read";
  const words = bodyContent.split(/\s+/).length;
  const mins  = Math.max(1, Math.round(words / 200));
  return `${mins} min read`;
}

function categoryTag(slug: string): { label: string; color: string } {
  if (slug.includes("compress") || slug.includes("image") || slug.includes("jpg") || slug.includes("png") || slug.includes("webp") || slug.includes("heic"))
    return { label: "Images", color: "bg-[#E6F1FB] text-[#185FA5]" };
  if (slug.includes("pdf") || slug.includes("merge") || slug.includes("split") || slug.includes("docx") || slug.includes("word"))
    return { label: "PDF",    color: "bg-[#E6F1FB] text-[#185FA5]" };
  if (slug.includes("security") || slug.includes("protect") || slug.includes("privacy") || slug.includes("password"))
    return { label: "Security", color: "bg-[#EAF3DE] text-[#3B6D11]" };
  return { label: "Guide", color: "bg-[#F7F7F5] text-[#6B7280]" };
}

async function getBlogPosts(): Promise<SeoPage[]> {
  const slugs = await getAllSlugs();
  const blogSlugs = slugs.filter((s) => s.page_type === "blog");
  const posts = await Promise.all(blogSlugs.map((s) => getPageSeo(s.slug, "blog")));
  return posts.filter(Boolean) as SeoPage[];
}

export default async function BlogIndexPage() {
  const posts = await getBlogPosts();
  const featured = posts[0];
  const rest     = posts.slice(1);

  const breadcrumbs = buildBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
  ]);

  return (
    <div className="bg-page">
      <script id="breadcrumb-schema" type="application/ld+json">{JSON.stringify(breadcrumbs)}</script>

      {/* ── Hero ── */}
      <section className="border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)] py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-[12px] mb-8" style={{ color: 'var(--text-muted)' }}>
            <Link href="/" className="transition-colors hover:underline">Home</Link>
            <span>/</span>
            <span style={{ color: 'var(--text)' }}>Blog</span>
          </nav>
          <p className="text-label mb-4">The weFixPDF Blog</p>
          <h1 className="text-section mb-3" style={{ color: 'var(--text)' }}>
            Guides for working smarter with files
          </h1>
          <p className="text-[16px] leading-[1.7] max-w-xl" style={{ color: 'var(--text-muted)' }}>
            Practical tips on compressing PDFs, converting images, boosting web performance,
            and keeping your documents secure.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">

        {/* ── Featured Post ── */}
        {featured && (
          <div className="mb-12">
            <p className="text-label mb-5">Featured article</p>
            <Link
              href={`/blog/${featured.slug}`}
              className="group flex flex-col sm:flex-row p-6 sm:p-8 rounded-xl bg-card border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] hover:border-[#2D5BE3] dark:hover:border-[#5B82FF] hover:shadow-[0_2px_16px_rgba(45,91,227,0.08)] transition-all gap-6 sm:gap-10"
            >
              <div className="flex-1 space-y-3">
                <span className={`inline-flex px-2.5 py-1 rounded text-[11px] font-medium ${categoryTag(featured.slug).color}`}>
                  {categoryTag(featured.slug).label}
                </span>
                <h2 className="text-[20px] sm:text-[22px] font-medium leading-snug group-hover:text-[#2D5BE3] dark:group-hover:text-[#5B82FF] transition-colors" style={{ color: 'var(--text)' }}>
                  {featured.h1}
                </h2>
                <p className="text-[14px] leading-relaxed line-clamp-3" style={{ color: 'var(--text-muted)' }}>
                  {featured.description}
                </p>
              </div>
              <div className="sm:w-44 flex flex-col justify-end border-t sm:border-t-0 sm:border-l border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)] pt-4 sm:pt-0 sm:pl-8">
                <span className="flex items-center gap-1.5 text-[12px] mb-3" style={{ color: 'var(--text-muted)' }}>
                  <Clock className="w-3.5 h-3.5" />
                  {readingTime(featured.bodyContent)}
                </span>
                <span className="inline-flex items-center gap-2 text-[13px] font-medium group-hover:gap-3 transition-all" style={{ color: '#2D5BE3' }}>
                  Read article <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          </div>
        )}

        {/* ── Article Grid ── */}
        {rest.length > 0 && (
          <>
            <p className="text-label mb-6">All articles</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {rest.map((post) => {
                const cat = categoryTag(post.slug);
                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col p-5 rounded-xl bg-card border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] hover:border-[#2D5BE3] dark:hover:border-[#5B82FF] hover:shadow-[0_2px_8px_rgba(45,91,227,0.08)] transition-all"
                  >
                    <span className={`inline-flex self-start px-2.5 py-1 rounded text-[11px] font-medium mb-4 ${cat.color}`}>
                      {cat.label}
                    </span>
                    <h2 className="text-[14px] font-medium leading-snug group-hover:text-[#2D5BE3] dark:group-hover:text-[#5B82FF] transition-colors mb-2 flex-1" style={{ color: 'var(--text)' }}>
                      {post.h1}
                    </h2>
                    <p className="text-[12px] leading-relaxed mb-4 line-clamp-2" style={{ color: 'var(--text-muted)' }}>
                      {post.description}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
                      <span className="flex items-center gap-1 text-[11px]" style={{ color: 'var(--text-subtle)' }}>
                        <Clock className="w-3 h-3" />
                        {readingTime(post.bodyContent)}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:text-[#2D5BE3] dark:group-hover:text-[#5B82FF] transition-colors" style={{ color: 'var(--text-subtle)' }} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}

        {/* ── Empty state ── */}
        {posts.length === 0 && (
          <div className="text-center py-24">
            <BookOpen className="w-10 h-10 mx-auto mb-4 text-[#D1D5DB]" />
            <p className="text-[15px] font-medium text-[#6B7280]">Articles coming soon…</p>
          </div>
        )}
      </div>
    </div>
  );
}
