import UploadBox from "../components/UploadBox";

export default async function ToolPage({ params }: { params: { tool: string } }) {
    const serviceList: Record<string, string> = {
    "image-compressor": "Image Compressor",
    "png-to-jpg": "PNG to JPG",
    "jpg-to-png": "JPG to PNG",
    "png-to-webp": "PNG-to-WEBP"
  };
  const reqService = await params;

  return (
    <div className="space-y-12 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-50 dark:bg-brand-primary/10 text-brand-primary text-[10px] font-black uppercase tracking-[0.2em] border border-indigo-100/50 dark:border-brand-primary/20">
            Active Tool
          </div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
            {serviceList[reqService.tool] || "File Converter"}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Fast, secure, and privacy-shielded conversion.
          </p>
        </div>
      </div>

      <UploadBox service={reqService.tool}/>
    </div>
  );
}
