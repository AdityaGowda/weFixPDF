"use client";

import { useEffect, useState, useRef } from "react";
import {
  Upload, FileText, CheckCircle, RefreshCcw, Download, Zap,
  Shield, Clock, Sliders, X, GripVertical, Lock, Unlock,
  RotateCw, ChevronRight, Info, AlertCircle
} from "lucide-react";
import CompressionSettings from "./compressLevel";
import toast from "react-hot-toast";
import { ToolConfig, CompressionLevel } from "@/types";
import { convertFile } from "@/lib/api";

const QUALITY_LABELS: Record<CompressionLevel, { label: string; hint: string }> = {
  high: { label: "Maximum", hint: "Smallest file — slight quality loss" },
  medium: { label: "Balanced", hint: "Good balance of size and quality" },
  low: { label: "Minimal", hint: "Highest quality — less compression" },
};

export default function UploadBox({
  service,
  isMulti = false,
  maxFiles = 1,
  acceptedTypes,
  maxFileSizeMb,
  verb,
  result
}: ToolConfig) {
  const accept = acceptedTypes.join(',');

  const typeToLabelMap: Record<string, string> = {
    "application/pdf": "PDF",
    "image/jpeg": "JPG",
    "image/png": "PNG",
    "image/webp": "WEBP",
    "image/heic": "HEIC",
    "image/heif": "HEIF",
    "application/msword": "DOC",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "DOCX",
    "application/epub+zip": "EPUB",
  };

  const acceptLabel = acceptedTypes
    .map(t => typeToLabelMap[t] || t.split('/')[1]?.toUpperCase() || t)
    .join(', ');

  const [files, setFiles] = useState<File[]>([]);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [suggestedName, setSuggestedName] = useState<string>("");
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [quality, setQuality] = useState<CompressionLevel>("medium");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [angle, setAngle] = useState(90);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragItemIndex = useRef<number | null>(null);

  const hasFiles = files.length > 0;
  const isCompressService = service === "compress-pdf";
  const isRotateService = service === "rotate-pdf";

  const step = downloadUrl ? 3 : hasFiles ? 2 : 1;

  function addFiles(incoming: FileList | null) {
    if (!incoming) return;
    const arr = Array.from(incoming);
    setDownloadUrl(null);
    setErrorMsg(null);
    if (!isMulti) { setFiles([arr[0]]); return; }
    setFiles((prev) => [...prev, ...arr].slice(0, maxFiles));
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setDownloadUrl(null);
  }

  function clearAll() {
    setFiles([]);
    setDownloadUrl(null);
    setErrorMsg(null);
    setPassword("");
  }

  function onDragStart(index: number) { dragItemIndex.current = index; }
  function onDragEnterItem(index: number) { setDragOverIndex(index); }
  function onDropItem(index: number) {
    if (dragItemIndex.current === null || dragItemIndex.current === index) return;
    const reordered = [...files];
    const [moved] = reordered.splice(dragItemIndex.current, 1);
    reordered.splice(index, 0, moved);
    setFiles(reordered);
    dragItemIndex.current = null;
    setDragOverIndex(null);
  }

  async function fileConversion() {
    if (!hasFiles) return;

    if (service === "protect-pdf" && !password.trim()) {
      setErrorMsg("Please enter a password to protect this PDF.");
      return;
    }
    if (service === "unlock-pdf" && !password.trim()) {
      setErrorMsg("Please enter the PDF's current password to unlock it.");
      return;
    }

    setLoading(true);
    setDownloadUrl(null);
    setErrorMsg(null);

    try {
      const formData = new FormData();
      formData.append("quality", quality.toString());
      if (isMulti) {
        files.forEach((f) => formData.append("files", f));
      } else {
        formData.append("file", files[0]);
        formData.append("fileName", files[0].name);
      }
      if (password) formData.append("password", password);
      if (service === "rotate-pdf") formData.append("angle", angle.toString());

      const res = await convertFile(service, formData);

      if (!res.ok) {
        let errorText = `Error ${res.status}`;
        try {
          const errData = await res.json();
          errorText = errData.error || errData.message || errorText;
        } catch {
          errorText = (await res.text()) || res.statusText;
        }
        throw new Error(errorText);
      }

      const disposition = res.headers.get("content-disposition");
      let filename = "";
      if (disposition) {
        const match = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(disposition);
        if (match?.[1]) filename = match[1].replace(/['"]/g, "");
      }
      if (!filename) {
        const base = files[0].name.split(".").slice(0, -1).join(".");
        filename = isMulti
          ? `weFixPDF_${service}.${service.includes("pdf") ? "pdf" : "zip"}`
          : `${base}_weFixPDF_${service}.pdf`;
      }

      setSuggestedName(filename);
      const blob = await res.blob();
      setDownloadUrl(URL.createObjectURL(blob));
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMsg(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto px-4 pb-16 flex flex-col gap-6">
      <div className="flex items-center justify-center gap-2 pt-4">
        {[
          { n: 1, label: "Upload" },
          { n: 2, label: "Configure" },
          { n: 3, label: "Download" },
        ].map(({ n, label }, idx) => (
          <div key={n} className="flex items-center gap-2">
            <div className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300
              ${step === n
                ? "bg-brand-primary text-white shadow-md shadow-brand-primary/30"
                : step > n
                  ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
                  : "bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500"}
            `}>
              {step > n
                ? <CheckCircle className="w-3 h-3" />
                : <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px]">{n}</span>
              }
              <span className="hidden sm:inline">{label}</span>
            </div>
            {idx < 2 && <ChevronRight className="w-3 h-3 text-slate-400 dark:text-slate-600 shrink-0" />}
          </div>
        ))}
      </div>

      <div className="relative">
        <label
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => { e.preventDefault(); setIsDragging(false); addFiles(e.dataTransfer.files); }}
          className={`
            relative flex flex-col items-center justify-center w-full min-h-[220px]
            rounded-3xl border-2 cursor-pointer transition-all duration-300
            ${isDragging
              ? "border-brand-primary bg-indigo-50 dark:bg-brand-primary/10 scale-[1.01]"
              : hasFiles && !downloadUrl
                ? "border-brand-primary/50 bg-indigo-50/60 dark:bg-brand-primary/5"
                : downloadUrl
                  ? "border-emerald-400/50 bg-emerald-50 dark:bg-emerald-500/5"
                  : "border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.03] hover:border-brand-primary/40 hover:bg-indigo-50/40 dark:hover:border-white/20 dark:hover:bg-white/[0.06]"}
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

          {loading && (
            <div className="flex flex-col items-center gap-4 py-8 animate-in fade-in duration-300">
              <div className="relative">
                <RefreshCcw className="w-12 h-12 text-brand-primary animate-spin" />
                <div className="absolute inset-0 bg-brand-primary/20 blur-xl rounded-full" />
              </div>
              <div className="text-center">
                <p className="text-slate-800 dark:text-white font-bold text-lg">Processing your file…</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">This usually takes a few seconds</p>
              </div>
            </div>
          )}

          {!loading && downloadUrl && (
            <div className="flex flex-col items-center gap-4 py-8 animate-in fade-in zoom-in duration-400">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="text-center">
                <p className="text-slate-800 dark:text-white font-bold text-xl">Your {result} is ready!</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Click the download button below</p>
              </div>
            </div>
          )}

          {!loading && !downloadUrl && hasFiles && (
            <div className="flex flex-col items-center gap-3 py-8 px-6 animate-in fade-in duration-300">
              <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-brand-primary/15 flex items-center justify-center">
                <FileText className="w-7 h-7 text-brand-primary" />
              </div>
              {isMulti ? (
                <div className="text-center">
                  <p className="text-slate-800 dark:text-white font-bold text-lg">
                    {files.length} file{files.length > 1 ? "s" : ""} selected
                  </p>
                  {files.length < maxFiles && (
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                      Click to add more (up to {maxFiles} total)
                    </p>
                  )}
                </div>
              ) : (
                  <div className="text-center max-w-[280px]">
                    <p className="text-slate-800 dark:text-white font-bold text-base truncate">{files[0].name}</p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
                      {(files[0].size / (1024 * 1024)).toFixed(2)} MB
                      {files[0].size > maxFileSizeMb * 1024 * 1024 && (
                        <span className="ml-1 text-amber-500">· Large file, may take longer</span>
                      )}
                    </p>
                    <p className="text-slate-400 dark:text-slate-500 text-xs mt-2">Click to change file</p>
                </div>
              )}
            </div>
          )}

          {!loading && !downloadUrl && !hasFiles && (
            <div className="flex flex-col items-center gap-5 py-10 px-6 text-center animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center border border-slate-200 dark:border-white/10">
                <Upload className="w-7 h-7 text-slate-400" />
              </div>
              <div>
                <p className="text-slate-700 dark:text-white font-bold text-lg">
                  {isMulti
                    ? `Drop your ${acceptLabel} files here`
                    : `Drop your ${acceptLabel} file here`}
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                  or <span className="text-brand-primary font-semibold underline underline-offset-2">click to browse</span> your files
                </p>
              </div>
              <div className="flex items-center gap-2 bg-slate-100 dark:bg-white/5 rounded-xl px-3 py-2">
                <Info className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                <p className="text-slate-500 text-xs">
                  Accepts: <span className="text-slate-600 dark:text-slate-400 font-medium">{acceptLabel}</span>
                  {isMulti && <> &nbsp;·&nbsp; Up to <span className="text-slate-600 dark:text-slate-400 font-medium">{maxFiles} files</span></>}
                  &nbsp;·&nbsp; Files up to <span className="text-slate-600 dark:text-slate-400 font-medium">{maxFileSizeMb} MB</span>
                </p>
              </div>
            </div>
          )}
        </label>

        {hasFiles && !loading && !downloadUrl && (
          <button
            onClick={clearAll}
            title="Remove file and start over"
            className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 dark:bg-rose-500/10 text-rose-500 dark:text-rose-400 text-xs font-bold border border-rose-200 dark:border-rose-500/20 hover:bg-rose-100 dark:hover:bg-rose-500/20 transition-all"
          >
            <X className="w-3.5 h-3.5" /> Remove
          </button>
        )}
      </div>

      {errorMsg && (
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 animate-in fade-in slide-in-from-top-2 duration-300">
          <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-rose-700 dark:text-rose-300 font-bold text-sm">Something went wrong</p>
            <p className="text-rose-500 dark:text-rose-400/70 text-xs mt-0.5 leading-relaxed">{errorMsg}</p>
          </div>
          <button
            onClick={() => setErrorMsg(null)}
            className="text-rose-400 hover:text-rose-600 dark:hover:text-rose-300 transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {hasFiles && !loading && !downloadUrl && (
        <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-3 duration-400">
          {isCompressService && (
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sliders className="w-4 h-4 text-brand-primary" />
                <p className="text-slate-700 dark:text-white font-bold text-sm">Compression Level</p>
                <span className="ml-auto text-xs text-slate-400">Optional — defaults to Balanced</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(["low", "medium", "high"] as CompressionLevel[]).map((q) => (
                  <button
                    key={q}
                    onClick={() => setQuality(q)}
                    className={`
                      flex flex-col items-center gap-1 py-3 px-2 rounded-xl border text-center transition-all
                      ${quality === q
                        ? "border-brand-primary bg-indigo-50 dark:bg-brand-primary/10 text-brand-primary dark:text-white"
                        : "border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] text-slate-500 dark:text-slate-400 hover:border-brand-primary/40 hover:text-slate-700 dark:hover:text-slate-300"}
                    `}
                  >
                    <span className="text-sm font-bold">{QUALITY_LABELS[q].label}</span>
                    <span className="text-[10px] leading-tight opacity-70">{QUALITY_LABELS[q].hint}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {service === "protect-pdf" && (
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] p-4">
              <div className="flex items-center gap-2 mb-1">
                <Lock className="w-4 h-4 text-amber-500" />
                <p className="text-slate-700 dark:text-white font-bold text-sm">
                  Set a password{" "}
                  <span className="text-rose-500 text-xs font-normal ml-1">Required</span>
                </p>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-xs mb-3 leading-relaxed">
                Anyone who opens this PDF will need to enter this password. Save it somewhere safe — it cannot be recovered.
              </p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter a strong password…"
                autoComplete="new-password"
                className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-slate-800 dark:text-white text-sm focus:outline-none focus:border-brand-primary/60 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
              />
              {password.length > 0 && password.length < 6 && (
               <p className="text-amber-500 text-xs mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Use at least 6 characters for a stronger password
                </p>
              )}
            </div>
          )}

          {service === "unlock-pdf" && (
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] p-4">
              <div className="flex items-center gap-2 mb-1">
                <Unlock className="w-4 h-4 text-sky-500" />
                <p className="text-slate-700 dark:text-white font-bold text-sm">
                  PDF password{" "}
                  <span className="text-rose-500 text-xs font-normal ml-1">Required</span>
                </p>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-xs mb-3 leading-relaxed">
                Enter the current password of this PDF so we can remove the protection. You must know the password to unlock it.
              </p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter the PDF's current password…"
                autoComplete="current-password"
                className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-slate-800 dark:text-white text-sm focus:outline-none focus:border-brand-primary/60 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
              />
            </div>
          )}

          {isRotateService && (
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] p-4">
              <div className="flex items-center gap-2 mb-3">
                <RotateCw className="w-4 h-4 text-violet-500" />
                <p className="text-slate-700 dark:text-white font-bold text-sm">Rotate by</p>
                <span className="ml-auto text-xs text-slate-400">All pages will be rotated</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { deg: 90, label: "90°", hint: "Quarter turn →" },
                  { deg: 180, label: "180°", hint: "Flip upside down" },
                  { deg: 270, label: "270°", hint: "Quarter turn ←" },
                ].map(({ deg, label, hint }) => (
                  <button
                    key={deg}
                    onClick={() => setAngle(deg)}
                    className={`
                      flex flex-col items-center gap-1 py-3 px-2 rounded-xl border transition-all
                      ${angle === deg
                        ? "border-violet-500 bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-white"
                        : "border-slate-200 dark:border-white/10 bg-white dark:bg-transparent text-slate-500 dark:text-slate-400 hover:border-violet-300 dark:hover:border-white/20 hover:text-violet-600 dark:hover:text-slate-300"}
                    `}
                  >
                    <span className="text-lg font-black">{label}</span>
                    <span className="text-[10px] leading-tight opacity-70">{hint}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={fileConversion}
            className="w-full py-4 rounded-2xl bg-brand-primary text-white font-black text-base uppercase tracking-wider shadow-xl shadow-brand-primary/30 hover:brightness-110 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Zap className="w-5 h-5" />
            {isMulti
              ? files.length > 1 ? `Merge ${files.length} files` : `Convert 1 file`
              : verb}
          </button>
          <p className="text-center text-slate-400 dark:text-slate-500 text-xs">
            Your {result} will be ready to download instantly · No account needed
          </p>
        </div>
      )}

      {downloadUrl && !loading && (
        <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-3 duration-400">
          <a
            href={downloadUrl}
            download={suggestedName}
            className="w-full py-4 rounded-2xl bg-emerald-500 text-white font-black text-base uppercase tracking-wider shadow-xl shadow-emerald-500/30 hover:brightness-110 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download {result}
          </a>
          <button
            onClick={clearAll}
            className="w-full py-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-transparent text-slate-500 dark:text-slate-400 text-sm font-bold hover:border-brand-primary/40 hover:text-brand-primary transition-all flex items-center justify-center gap-2"
          >
            <RefreshCcw className="w-4 h-4" />
            Convert another file
          </button>
        </div>
      )}

      {isMulti && files.length > 0 && !loading && (
        <div className="flex flex-col gap-2 animate-in fade-in duration-400">
          <div className="flex items-center justify-between px-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              {files.length}/{maxFiles} files · Drag rows to reorder
            </p>
            <button
              onClick={clearAll}
              className="text-xs font-bold text-rose-400 hover:text-rose-600 transition-colors"
            >
              Clear all
            </button>
          </div>

          <div className="flex flex-col gap-2 max-h-[280px] overflow-y-auto pr-0.5">
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
                  flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all duration-200
                  bg-white dark:bg-white/[0.03]
                  ${dragOverIndex === i
                  ? "border-brand-primary/60 shadow-lg shadow-brand-primary/10 scale-[1.01]"
                  : "border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20"}
                `}
              >
                <GripVertical className="w-4 h-4 text-slate-300 dark:text-slate-600 cursor-grab active:cursor-grabbing shrink-0" />
                <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-brand-primary/15 text-brand-primary text-xs font-black flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-700 dark:text-white truncate">{f.name}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">{(f.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
                <button
                  onClick={() => removeFile(i)}
                  title="Remove this file"
                  className="w-7 h-7 rounded-full flex items-center justify-center text-slate-300 dark:text-slate-600 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {files.length < maxFiles && !downloadUrl && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-3 rounded-2xl border-2 border-dashed border-brand-primary/30 text-brand-primary/70 font-bold text-sm hover:border-brand-primary/60 hover:text-brand-primary hover:bg-indigo-50 dark:hover:bg-brand-primary/5 transition-all duration-300"
            >
              + Add more files ({files.length}/{maxFiles})
            </button>
          )}
        </div>
      )}

      <div className="flex items-center justify-center gap-6 pt-2">
        {[
          { Icon: Shield, label: "Files deleted instantly" },
          { Icon: Zap, label: "No signup needed" },
          { Icon: Clock, label: "Free & unlimited" },
        ].map(({ Icon, label }) => (
          <div key={label} className="flex items-center gap-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
            <Icon className="w-3.5 h-3.5" />
            <span className="text-xs font-medium hidden sm:inline">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}