import { Metadata } from "next";
import UploadBox from "../components/UploadBox";
import { ToolPageMetaData, ToolMetaData } from "../lib/seo/toolPageSeo";
import ToolPageContent from "../components/toolPagecontent";

type ToolPageProps = {
  params: Promise<{ tool: string }>;
};

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const reqService = await params;
  const metadata = ToolPageMetaData[reqService.tool];

  if (!metadata) {
    return {
      title: "File Converter | wefixPDF",
      description: "Fast, secure, and private file conversion tools.",
    };
  }

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: `https://wefixpdf.com/${reqService.tool}`,
      siteName: "wefixPDF",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
    },
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const reqService = await params;
  const metadata = ToolPageMetaData[reqService.tool];
  console.log(reqService.tool, ":::::::::::::::::::::::;using tool");
  return (
    <div className="space-y-12 max-[950px]:py-10 animate-fade-in px-4 sm:px-0 max-[950px]:mt-0">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] border border-emerald-500/20">
            Active Tool
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter transition-all duration-300">
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
  );
}
