import UploadBox from "../components/UploadBox";

export default async function ToolPage({ params }: { params: { tool: string } }) {
    const serviceList: Record<string, string> = {
    "image-compressor": "Image Compressor",
    "png-to-jpg": "PNG to JPG",
    "jpg-to-png": "JPG to PNG",
    "png-to-webp": "PNG-to-WEBP"
  };
  let reqService = await params;
  console.log(reqService.tool)

  return (
    <div className="space-y-10">

      <div>
        <div className="flex align-center justify-between">
        <h2 className="text-3xl font-bold">
           {serviceList[reqService.tool] || "File Converter"}
        </h2>
    <div className="flex float-left ml-10">
  <a
    href="https://www.buymeacoffee.com/adithya_m_r_"
    target="_blank"
    rel="noopener noreferrer"
    className="
      inline-flex items-center gap-2
      bg-gradient-to-r from-yellow-400 to-orange-400
      text-slate-900
      font-bold
      px-6 py-3
      rounded-xl
      shadow-md
      hover:shadow-lg
      hover:scale-[1.03]
      active:scale-[0.97]
      transition-all
      duration-300
      text-sm
    "
  >
    ☕ Buy Me a Coffee
  </a>
</div>
        </div>
        <p className="text-slate-500 mt-2">
          Images and more — simple & secure.
        </p>
      </div>

      <UploadBox service={reqService.tool}/>
    </div>
  );
}
