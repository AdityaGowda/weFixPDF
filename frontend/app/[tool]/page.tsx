import { Metadata } from "next";
import UploadBox from "../components/UploadBox";
import { getToolSeo, ToolMetaData } from "../lib/seo/seoApi";
import ToolPageContent from "../components/toolPagecontent";

type ToolPageProps = {
  params: Promise<{ tool: string }>;
};

/**
 * Fetch tool metadata from API.
 */
async function getMetadata(slug: string): Promise<ToolMetaData | undefined> {
  const apiData = await getToolSeo(slug);
  if (apiData) return apiData;
  return undefined;
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const reqService = await params;
  const metadata = await getMetadata(reqService.tool);

  if (!metadata) {
    return {
      title: "File Converter | wefixPDF",
      description: "Fast, secure, and private file conversion tools.",
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/${reqService.tool}`,
      },
      robots: {
        index: true,
        follow: true,
      },
    }
  }

  return {
    title: metadata.title,
    description: metadata.description,
    alternates: {
      canonical: `${metadata.url}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: `${metadata.url}`,
      siteName: "wefixPDF",
      type: "website",
    },
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const reqService = await params;
  const metadata = await getMetadata(reqService.tool);

  return (
    <main>
      <div className="space-y-12 max-[950px]:py-2 animate-fade-in sm:px-0 max-[950px]:mt-0">
        {/* ── Breadcrumbs ── */}
        {metadata?.breadcrumb && metadata.breadcrumb.length > 0 && (
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 max-[950px]:mt-4 mt-2">
            <a href="/" className="hover:text-emerald-500 transition-colors">Home</a>
            {metadata.breadcrumb.filter(b => b.name !== "Home").map((crumb, i) => (
              <div key={i} className="flex items-center gap-2">
                <svg className="w-3 h-3 text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                {i === metadata.breadcrumb.length - 2 ? (
                  <span className="text-slate-600 dark:text-slate-300 font-medium">{crumb.name}</span>
                ) : (
                  <a href={crumb.url} className="hover:text-emerald-500 transition-colors">{crumb.name}</a>
                )}
              </div>
            ))}
          </nav>
        )}

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] border border-emerald-500/20">
              Free Tool
          </div>
            <h1 className="text-4xl  max-[950px]:text-2xl font-black text-slate-900 dark:text-white tracking-tighter transition-all duration-300">
            {metadata?.h1 || "File Converter"}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            {metadata?.h2 || "Fast, secure, and privacy-shielded conversion."}
          </p>
        </div>
      </div>

      <UploadBox service={reqService.tool} />
        <ToolPageContent metadata={metadata} />
      </div>
    </main>
  );
}
