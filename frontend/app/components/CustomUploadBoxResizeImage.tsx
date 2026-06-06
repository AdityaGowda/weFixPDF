"use client";

import { useState, useRef } from "react";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Upload, X, CheckCircle, Download, RefreshCcw, Crop as CropIcon } from "lucide-react";
import toast from "react-hot-toast";

interface Props {
  service: string;
}

export default function CustomUploadBoxResizeImage({ service }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const [targetWidth, setTargetWidth] = useState<string>("");
  const [targetHeight, setTargetHeight] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  function handleFile(incoming: File) {
    if (!incoming.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }
    setFile(incoming);
    setDownloadUrl(null);
    const reader = new FileReader();
    reader.addEventListener("load", () => setImageSrc(reader.result?.toString() || ""));
    reader.readAsDataURL(incoming);
  }

  const canvasPreview = async () => {
     if (!imageRef.current || !file) return;
     const image = imageRef.current;
     const canvas = document.createElement('canvas');
     const scaleX = image.naturalWidth / image.width;
     const scaleY = image.naturalHeight / image.height;
     const pixelRatio = window.devicePixelRatio;

     let sx = 0, sy = 0, sWidth = image.naturalWidth, sHeight = image.naturalHeight;

     if (completedCrop && completedCrop.width > 0 && completedCrop.height > 0) {
        sx = completedCrop.x * scaleX;
        sy = completedCrop.y * scaleY;
        sWidth = completedCrop.width * scaleX;
        sHeight = completedCrop.height * scaleY;
     }

     const finalWidth = targetWidth ? parseInt(targetWidth, 10) : sWidth;
     const finalHeight = targetHeight ? parseInt(targetHeight, 10) : sHeight;

     canvas.width = finalWidth * pixelRatio;
     canvas.height = finalHeight * pixelRatio;

     const ctx = canvas.getContext('2d');
     if (!ctx) return toast.error("Canvas rendering failed");

     ctx.scale(pixelRatio, pixelRatio);
     ctx.imageSmoothingQuality = 'high';

     ctx.drawImage(image, sx, sy, sWidth, sHeight, 0, 0, finalWidth, finalHeight);

     return new Promise<void>((resolve, reject) => {
        canvas.toBlob((blob) => {
           if (!blob) return reject("Canvas empty");
           if (downloadUrl) URL.revokeObjectURL(downloadUrl);
           setDownloadUrl(URL.createObjectURL(blob));
           resolve();
        }, file.type, 1.0);
     });
  };

  async function processImage() {
    if (!file) return;
    setLoading(true);
    try {
      await canvasPreview();
      toast.success("Image processed successfully!");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-10 shadow border border-slate-200 dark:border-slate-800">
      {!imageSrc && !downloadUrl && (
        <label className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-2xl border-slate-300 dark:border-slate-700 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 cursor-pointer transition-colors">
          <Upload className="w-12 h-12 text-slate-400 mb-4" />
          <span className="text-lg font-medium text-slate-700 dark:text-slate-200">Click to upload an image</span>
          <span className="text-sm text-slate-500 mt-2">JPG, PNG, WEBP supported</span>
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => {
            if (e.target.files?.[0]) handleFile(e.target.files[0]);
          }} />
        </label>
      )}

      {imageSrc && !downloadUrl && (
        <div className="space-y-6">
          <div className="flex flex-col gap-4">
             <div className="flex flex-wrap gap-4 items-end bg-slate-50 dark:bg-slate-800 p-4 rounded-xl">
               <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Target Width (px)</label>
                  <input type="number" min="1" value={targetWidth} onChange={(e) => setTargetWidth(e.target.value)} className="w-24 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm" placeholder="Auto" />
               </div>
               <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Target Height (px)</label>
                  <input type="number" min="1" value={targetHeight} onChange={(e) => setTargetHeight(e.target.value)} className="w-24 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm" placeholder="Auto" />
               </div>
               <div className="ml-auto text-xs text-slate-500">
                 Drag on the image to crop
               </div>
             </div>

             <div className="flex justify-center bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden p-4">
                <ReactCrop crop={crop} onChange={(_, percentCrop) => setCrop(percentCrop)} onComplete={(c) => setCompletedCrop(c)}>
                   <img ref={imageRef} src={imageSrc} style={{ maxHeight: '70vh' }} className="w-auto object-contain shadow border border-slate-200" alt="Crop preview" />
                </ReactCrop>
             </div>

             <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => { setImageSrc(null); setFile(null); setCrop(undefined); }} className="px-5 py-2.5 rounded-xl font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors">
                  Cancel
                </button>
                <button onClick={processImage} disabled={loading} className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-white bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/30 transition-all disabled:opacity-50">
                  {loading ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <CropIcon className="w-5 h-5" />}
                  {loading ? "Processing..." : "Apply Changes"}
                </button>
             </div>
          </div>
        </div>
      )}

      {downloadUrl && (
        <div className="flex flex-col items-center justify-center p-12 text-center bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800">
           <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-8 h-8 text-emerald-500" />
           </div>
           <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Image Processed Successfully</h3>
           <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm">Your resized/cropped image was processed entirely on your device and is ready to download.</p>

           <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
             <a href={downloadUrl} download={`Resized_${file?.name || 'image.png'}`} className="flex items-center justify-center gap-2 px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/30 transition-all">
               <Download className="w-5 h-5" /> Download Image
             </a>
             <button onClick={() => { setDownloadUrl(null); setImageSrc(null); setFile(null); }} className="flex items-center justify-center gap-2 px-8 py-3.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-white rounded-xl font-bold border border-slate-200 dark:border-slate-700 transition-all">
               <RefreshCcw className="w-5 h-5" /> Process Another
             </button>
           </div>
        </div>
      )}
    </div>
  );
}
