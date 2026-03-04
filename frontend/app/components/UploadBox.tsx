"use client";

import { useEffect, useState, useRef } from "react";
import { Upload, FileText, CheckCircle, RefreshCcw, Download, Zap, Shield, Clock, Sliders, X, GripVertical } from "lucide-react";
import CompressionSettings from "./compressLevel";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";

const PdfCropper = dynamic(() => import("./PdfCropper"), { ssr: false });

interface UploadBoxProps {
  service: string;
}

type CompressionLevel = "high" | "medium" | "low";
// ── Tool Configuration ───────────────────────────────
const TOOL_CONFIG: Record<string, { multi?: boolean; max?: number; accept: string }> = {
  "image-to-pdf": { multi: true, max: 20, accept: "image/*,.jpg,.jpeg,.png,.webp,.heic,.heif" },
  "merge-pdf": { multi: true, max: 20, accept: ".pdf" },
  "heic-to-jpg": { accept: ".heic,.heif" },
  "word-to-pdf": { accept: ".doc,.docx" },
  "pdf-to-jpg": { accept: ".pdf" },
  "pdf-to-word": { accept: ".pdf" },
  "split-pdf": { accept: ".pdf" },
  "compress-pdf": { accept: ".pdf" },
  "pdf-to-png": { accept: ".pdf" },
  "pdf-to-webp": { accept: ".pdf" },
  "pdf-crop": { accept: ".pdf" },
};

const DEFAULT_ACCEPT = "image/*,.jpg,.jpeg,.png,.webp";
const DEFAULT_MAX_FILES = 1;

export default function UploadBox({ service }: UploadBoxProps) {
  const config = TOOL_CONFIG[service];
  const isMulti = config?.multi ?? false;
  const maxFiles = config?.max ?? DEFAULT_MAX_FILES;
  const accept = config?.accept ?? DEFAULT_ACCEPT;

  const [files, setFiles] = useState<File[]>([]);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [suggestedName, setSuggestedName] = useState<string>("");
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [quality, setQuality] = useState<CompressionLevel>("medium");
  const [errorVisible, setErrorVisible] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragItemIndex = useRef<number | null>(null);

  const file = files[0] ?? null;
  const hasFiles = files.length > 0;

  // ── File selection ──────────────────────────────────
  function addFiles(incoming: FileList | null) {
    if (!incoming) return;
    const arr = Array.from(incoming);
    setDownloadUrl(null);

    if (!isMulti) {
      setFiles([arr[0]]);
      return;
    }

    setFiles((prev) => {
      const combined = [...prev, ...arr];
      return combined.slice(0, maxFiles);
    });
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setDownloadUrl(null);
  }

  function clearAll() {
    setFiles([]);
    setDownloadUrl(null);
    setErrorVisible(null);
  }

  // ── Drag-to-reorder (multi only) ────────────────────
  function onDragStart(index: number) {
    dragItemIndex.current = index;
  }

  function onDragEnterItem(index: number) {
    setDragOverIndex(index);
  }

  function onDropItem(index: number) {
    if (dragItemIndex.current === null || dragItemIndex.current === index) return;
    const reordered = [...files];
    const [moved] = reordered.splice(dragItemIndex.current, 1);
    reordered.splice(index, 0, moved);
    setFiles(reordered);
    dragItemIndex.current = null;
    setDragOverIndex(null);
  }

  // ── Conversion ──────────────────────────────────────
  async function fileConversion() {
    if (!hasFiles) return;
    setLoading(true);
    setDownloadUrl(null);
    setErrorVisible(null);

    try {
      const formData = new FormData();
      formData.append("quality", quality.toString());

      if (isMulti) {
        files.forEach((f) => formData.append("files", f));
      } else {
        formData.append("file", files[0]);
        formData.append("fileName", files[0].name);
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/convert/${service}`,
        { method: "POST", body: formData }
      );
      if (!res.ok) {
        let errorMsg = `HTTP Error ${res.status}`;
        try {
          const errorData = await res.json();
          errorMsg = errorData.error || errorData.message || JSON.stringify(errorData);
        } catch (e) {
          errorMsg = (await res.text()) || res.statusText;
        }
        throw new Error(errorMsg);
      }

      // Extract filename from Content-Disposition
      const disposition = res.headers.get("content-disposition");
      let filename = "";
      if (disposition) {
        const match = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(disposition);
        if (match?.[1]) filename = match[1].replace(/['"]/g, "");
      }

      if (!filename) {
        const base = files[0].name.split(".").slice(0, -1).join(".");
        const ext = files[0].name.split(".").pop();
        filename = isMulti
          ? `weFixPDF_${service}.${service.includes("pdf") ? "pdf" : "zip"}`
          : `${base}_weFixPDF_${service}.${ext}`;
      }

      setSuggestedName(filename);
      const blob = await res.blob();
      setDownloadUrl(() => {
        return URL.createObjectURL(blob);
      });
    } catch (err: any) {
      console.error(err);
      const msg = err instanceof Error ? err.message : String(err);
      setErrorVisible(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  // ── Render ───────────────────────────────────────────
  return (
    <div className="relative w-full min-h-[450px] md:min-h-[600px] flex flex-col items-center justify-center pt-0 pb-10 md:pb-20 px-4 overflow-visible gap-8 max-[950px]:mt-0">

      {/* SVG Gooey Filter - Only defined/rendered on desktop for better mobile performance */}
      <svg className="hidden md:block absolute -z-50">
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10" result="gooey" />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* ── Core Upload Zone ── */}
      <div id="core-trigger" className="relative w-full max-w-lg aspect-square flex items-center justify-center">

        <label
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => { e.preventDefault(); setIsDragging(false); addFiles(e.dataTransfer.files); }}
          className={`
            relative z-20 w-[90%] h-[90%] cursor-pointer group flex flex-col items-center justify-center
            transition-all duration-700 hover:scale-[1.02]
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            hidden
            multiple={isMulti}
            accept={accept}
            onChange={(e) => addFiles(e.target.files)}
          />

          {/* Liquid Core Body */}
          <div className="absolute inset-0 gooey-container -z-10">
            <div className={`
              w-full h-full core-blob core-pulse opacity-90
              ${isDragging ? "scale-110 blur-[5px]" : hasFiles ? "scale-105 saturate-150" : ""}
              ${loading ? "animate-spin brightness-125" : ""}
            `} />
          </div>

          {/* Inner Content */}
          <div className="text-center space-y-6 px-10">
            {loading ? (
              <div className="space-y-4 animate-in fade-in zoom-in duration-500">
                <RefreshCcw className="w-20 h-20 text-white mx-auto animate-spin" />
                <p className="text-white text-2xl font-black uppercase tracking-widest italic animate-pulse">Reshaping...</p>
              </div>
            ) : downloadUrl ? (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-500">
                  <div className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto border border-white/30 shadow-2xl">
                    <CheckCircle className="w-12 h-12 text-emerald-300 drop-shadow-lg" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-white text-4xl font-black tracking-tighter drop-shadow-lg">Core Saturated</p>
                    <p className="text-white/80 font-bold">Transformation Successful</p>
                  </div>
                </div>
              ) : hasFiles ? (
                <div className="space-y-4 animate-in fade-in zoom-in duration-500">
                  <FileText className="w-16 h-16 text-white mx-auto drop-shadow-xl" />
                  {isMulti ? (
                    <div className="space-y-1">
                        <p className="text-white text-3xl font-black">{files.length}</p>
                        <p className="text-white/70 font-black uppercase tracking-[0.3em] text-xs">
                          FILE{files.length > 1 ? "S" : ""} LOADED
                        </p>
                        <p className="text-white/50 text-xs font-bold uppercase tracking-widest">
                          Tap to add more
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <p className="text-white text-3xl font-black truncate max-w-[280px]">{files[0].name}</p>
                        <p className="text-white/70 font-black uppercase tracking-[0.3em] text-xs">
                          {(files[0].size / (1024 * 1024)).toFixed(2)} MB • READY
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                    <div className="space-y-8 animate-in fade-in duration-500">
                      <div className="relative">
                        <Upload className="w-24 h-24 text-white/50 mx-auto group-hover:text-white transition-colors duration-500" />
                        <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full scale-150 -z-10 group-hover:bg-white/40 transition-all duration-700" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-white text-4xl font-black tracking-tighter drop-shadow-lg leading-tight uppercase">
                          {isMulti ? "Drop Files Here" : "Drop File"}<br />
                        </p>
                        <p className="text-white/50 font-bold uppercase tracking-widest text-xs">
                          {isMulti ? `Up to ${maxFiles} files • Drag or tap` : "Drag near core or tap"}
                        </p>
                      </div>
              </div>
            )}
          </div>
        </label>

        {/* ── Error Message Overlay ── */}
        {errorVisible && (
          <div className="absolute inset-0 z-40 flex items-center justify-center p-6 animate-in fade-in zoom-in duration-300">
            <div className="w-full max-w-sm glass-dark border border-rose-500/50 rounded-3xl p-8 shadow-2xl backdrop-blur-2xl flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-rose-500/20 flex items-center justify-center">
                <X className="w-8 h-8 text-rose-500" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">Processing Error</h3>
                <p className="text-rose-200/70 text-sm font-medium leading-relaxed">
                  {errorVisible}
                </p>
              </div>
              <button
                onClick={() => setErrorVisible(null)}
                className="mt-2 px-8 py-3 rounded-full bg-rose-500 text-white font-black text-xs uppercase tracking-widest hover:bg-rose-600 transition-all active:scale-95"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Orbital buttons */}
        {hasFiles && !loading && !downloadUrl && (
          <>
            {service.includes("compress") && (
              <button
                onClick={(e) => { e.stopPropagation(); setShowSettings(!showSettings); }}
                className="absolute top-0 right-0 z-30 w-20 h-20 orbital-node flex items-center justify-center bg-indigo-500 text-white shadow-indigo-500/50 hover:scale-110 active:scale-95 transition-all duration-300 animate-in fade-in zoom-in"
              >
                <Sliders className="w-8 h-8 rotate-90" />
              </button>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                if (service === "pdf-crop") {
                  setShowCropper(true);
                } else {
                  fileConversion();
                }
              }}
              className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 z-30 px-10 py-5 rounded-full bg-white text-brand-primary font-black text-xl shadow-2xl shadow-brand-primary/40 hover:scale-110 active:scale-95 transition-all duration-300 animate-in fade-in slide-in-from-bottom-10"
            >
              {service === "pdf-crop" ? "CROP" : isMulti ? `${files.length > 1 ? "MERGE" : "CONVERT"}` : "INITIATE"}
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); clearAll(); }}
              className="absolute top-0 left-0 z-30 w-16 h-16 orbital-node flex items-center justify-center text-rose-500 hover:scale-110 active:scale-95 transition-all duration-300 animate-in fade-in zoom-in"
            >
              <RefreshCcw className="w-6 h-6" />
            </button>
          </>
        )}

        {downloadUrl && (
          <a
            href={downloadUrl}
            download={suggestedName}
            className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 z-30 px-12 py-6 rounded-[2rem] bg-emerald-500 text-white font-black text-2xl shadow-2xl shadow-emerald-500/50 flex items-center gap-3 hover:scale-110 active:scale-95 transition-all duration-300 animate-in fade-in slide-in-from-bottom-10"
          >
            <Download className="w-8 h-8" />
            RETRIEVE
          </a>
        )}

        {/* Settings panel */}
        <CompressionSettings
          showSettings={showSettings}
          service={service}
          quality={quality}
          setQuality={setQuality}
        />;

        {/* Orbital decorative rings */}
        <div className="absolute inset-0 orbital-path scale-[1.3] opacity-30 animate-spin-slow pointer-events-none" />
        <div className="absolute inset-0 orbital-path scale-[1.6] opacity-10 animate-spin-slow-reverse pointer-events-none" />
      </div>

      {/* ── Multi-file List (below core) ── */}
      {isMulti && files.length > 0 && !loading && (
        <div className="w-full max-w-lg space-y-2 animate-in fade-in slide-in-from-bottom-5 duration-500">

          {/* Header */}
          <div className="flex items-center justify-between px-1">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">
              {files.length} / {maxFiles} files — drag to reorder
            </p>
            <button
              onClick={clearAll}
              className="text-xs font-bold text-rose-400 hover:text-rose-600 uppercase tracking-widest transition-colors"
            >
              Clear all
            </button>
          </div>

          {/* File rows */}
          <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
            {files.map((f, i) => (
              <div
                key={`${f.name}-${i}`}
                draggable
                onDragStart={() => onDragStart(i)}
                onDragEnter={() => onDragEnterItem(i)}
                onDrop={() => onDropItem(i)}
                onDragOver={(e) => e.preventDefault()}
                onDragEnd={() => setDragOverIndex(null)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-2xl
                  glass dark:glass-dark border transition-all duration-200
                  ${dragOverIndex === i
                    ? "border-brand-primary scale-[1.02] shadow-lg shadow-brand-primary/20"
                    : "border-white/10 hover:border-white/20"}
                `}
              >
                {/* Drag handle */}
                <GripVertical className="w-4 h-4 text-slate-400 cursor-grab active:cursor-grabbing shrink-0" />

                {/* Index badge */}
                <span className="w-6 h-6 rounded-full bg-brand-primary/20 text-brand-primary text-xs font-black flex items-center justify-center shrink-0">
                  {i + 1}
                </span>

                {/* File info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-700 dark:text-white truncate">{f.name}</p>
                  <p className="text-xs text-slate-400 font-medium">
                    {(f.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFile(i)}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Add more button */}
          {files.length < maxFiles && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-3 rounded-2xl border-2 border-dashed border-brand-primary/30 text-brand-primary font-black text-sm uppercase tracking-widest hover:border-brand-primary hover:bg-brand-primary/5 transition-all duration-300"
            >
              + Add More Files
            </button>
          )}
        </div>
      )}

      {/* Trust badges */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 opacity-30 group hover:opacity-100 transition-opacity duration-700 z-50 mt-10">
        {[Shield, Zap, Clock].map((Icon, idx) => (
          <Icon key={idx} className="w-5 h-5 text-slate-400 hover:text-brand-primary transition-colors" />
        ))}
      </div>

      <style jsx>{`
        .animate-spin-slow { animation: spin 20s linear infinite; }
        .animate-spin-slow-reverse { animation: spin 25s linear infinite reverse; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>

      {showCropper && files[0] && (
        <PdfCropper
          file={files[0]}
          onClose={() => setShowCropper(false)}
          onComplete={(blob, fileName) => {
            setSuggestedName(fileName);
            setDownloadUrl(URL.createObjectURL(blob));
            setShowCropper(false);
          }}
        />
      )}
    </div>
  );
}