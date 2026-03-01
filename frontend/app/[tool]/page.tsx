import { Metadata } from "next";
import UploadBox from "../components/UploadBox";

const toolMetadata: Record<string, { title: string; description: string; h1: string; subtitle: string }> = {
  "jpg-to-png": {
    title: "JPG to PNG Converter - Free Online Tool | wefixPDF",
    description: "Convert JPG to PNG online free. Lossless quality, instant conversion, complete privacy. No file size limits or watermarks.",
    h1: "JPG to PNG Converter",
    subtitle: "Convert JPG images to PNG format instantly. Free, fast, and 100% secure.",
  },
  "png-to-jpg": {
    title: "PNG to JPG Converter - Free Online Tool | wefixPDF",
    description: "Convert PNG to JPG online free. Reduce file size, optimize for web. Instant conversion with complete privacy.",
    h1: "PNG to JPG Converter",
    subtitle: "Convert PNG images to JPG format. Perfect for web optimization and smaller file sizes.",
  },
  "image-compressor": {
    title: "Image Compressor - Compress JPG & PNG Online Free | wefixPDF",
    description: "Compress images online without losing quality. Reduce JPG, PNG, and WEBP file sizes up to 80%. Fast, free, and secure compression.",
    h1: "Image Compressor",
    subtitle: "Reduce image file size without losing quality. Compress JPG, PNG, and WEBP images instantly.",
  },
  "png-to-webp": {
    title: "PNG to WEBP Converter - Free Online Tool | wefixPDF",
    description: "Convert PNG to WEBP online free. Next-gen image format with superior compression. Reduce file sizes by up to 30% more than PNG.",
    h1: "PNG to WEBP Converter",
    subtitle: "Convert PNG to WEBP format. Next-generation image format for faster websites.",
  },
  "compress-pdf": {
    title: "Compress PDF - Free Online Tool | wefixPDF",
    description: "Compress PDF online without losing quality. Reduce PDF file sizes up to 80%. Fast, free, and secure compression.",
    h1: "Compress PDF",
    subtitle: "Reduce PDF file size without losing quality. Compress PDF files instantly.",
  },
  "image-to-pdf": {
    title: "Image to PDF Converter - Free Online Tool | wefixPDF",
    description: "Convert images to PDF online free. Supports JPG, JPEG, PNG, WEBP, BMP, TIFF, SVG, HEIC and more. Lossless quality, instant conversion, complete privacy. No file size limits or watermarks.",
    h1: "Image to PDF Converter",
    subtitle: "Convert JPG, PNG, WEBP, BMP, TIFF, SVG, HEIC and more to PDF instantly. Free, fast, and 100% secure.",
  },
  "pdf-to-jpg": {
    title: "PDF to JPG Converter - Free Online Tool | wefixPDF",
    description: "Convert PDF to JPG online free. Lossless quality, instant conversion, complete privacy. No file size limits or watermarks.",
    h1: "PDF to JPG Converter",
    subtitle: "Convert PDF images to JPG format instantly. Free, fast, and 100% secure.",
  },
};

export async function generateMetadata({ params }: { params: { tool: string } }): Promise<Metadata> {
  const reqService = await params;
  const metadata = toolMetadata[reqService.tool];

  if (!metadata) {
    return {
      title: "File Converter | wefixPDF",
      description: "Fast, secure, and private file conversion tools.",
    };
  }

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default async function ToolPage({ params }: { params: { tool: string } }) {
  const reqService = await params;
  const metadata = toolMetadata[reqService.tool];
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
            {metadata?.subtitle || "Fast, secure, and privacy-shielded conversion."}
          </p>
        </div>
      </div>

      <UploadBox service={reqService.tool} />
    </div>
  );
}
