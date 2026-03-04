"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { PDFDocument } from "pdf-lib";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { X, Crop, Download, RefreshCcw, ChevronLeft, ChevronRight, Layers, Layout } from "lucide-react";
import toast from "react-hot-toast";

// Use local worker copy (CDN blocked by CSP)
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface PdfCropperProps {
  file: File;
  onClose: () => void;
  onComplete: (blob: Blob, fileName: string) => void;
}

// Crop box in percentages (0-100) relative to the rendered page
interface CropBox {
  x: number;
  y: number;
  w: number;
  h: number;
}

type DragMode = "move" | "nw" | "ne" | "sw" | "se" | "n" | "s" | "e" | "w" | null;

export default function PdfCropper({ file, onClose, onComplete }: PdfCropperProps) {
  const [fileUrl, setFileUrl] = useState<string>("");
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [applyToAll, setApplyToAll] = useState(true);
  const [renderedPageSize, setRenderedPageSize] = useState({ width: 0, height: 0 });

  // Crop box as percentage of displayed page
  const [crop, setCrop] = useState<CropBox>({ x: 10, y: 10, w: 80, h: 80 });

  // Drag state
  const dragMode = useRef<DragMode>(null);
  const dragStart = useRef({ mx: 0, my: 0, crop: { x: 10, y: 10, w: 80, h: 80 } });
  const pageContainerRef = useRef<HTMLDivElement>(null);

  // Create object URL for react-pdf
  useEffect(() => {
    const url = URL.createObjectURL(file);
    setFileUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  // ── Coordinate helpers ─────────────────────────────────
  const getPageRect = useCallback(() => {
    if (!pageContainerRef.current) return null;
    // The actual canvas rendered by react-pdf
    const canvas = pageContainerRef.current.querySelector("canvas");
    if (canvas) return canvas.getBoundingClientRect();
    return pageContainerRef.current.getBoundingClientRect();
  }, []);

  const pxToPercent = useCallback((px: number, total: number) => {
    return (px / total) * 100;
  }, []);

  // ── Mouse handlers (native, no library conflicts) ──────
  const onPointerDown = useCallback((mode: DragMode, e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragMode.current = mode;
    dragStart.current = { mx: e.clientX, my: e.clientY, crop: { ...crop } };
    document.body.style.cursor = mode === "move" ? "grabbing" : `${mode}-resize`;
    document.body.style.userSelect = "none";
  }, [crop]);

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      const mode = dragMode.current;
      if (!mode) return;

      const rect = getPageRect();
      if (!rect) return;

      const dx = pxToPercent(e.clientX - dragStart.current.mx, rect.width);
      const dy = pxToPercent(e.clientY - dragStart.current.my, rect.height);
      const prev = dragStart.current.crop;

      let { x, y, w, h } = prev;

      if (mode === "move") {
        x = prev.x + dx;
        y = prev.y + dy;
        // Clamp position
        x = Math.max(0, Math.min(100 - w, x));
        y = Math.max(0, Math.min(100 - h, y));
      } else {
        // Resize
        if (mode.includes("w")) {
          const newX = prev.x + dx;
          w = prev.w - dx;
          if (w >= 5 && newX >= 0) { x = newX; } else { w = prev.w; }
        }
        if (mode.includes("e")) {
          w = prev.w + dx;
        }
        if (mode.includes("n")) {
          const newY = prev.y + dy;
          h = prev.h - dy;
          if (h >= 5 && newY >= 0) { y = newY; } else { h = prev.h; }
        }
        if (mode.includes("s")) {
          h = prev.h + dy;
        }
        // Clamp size
        w = Math.max(5, Math.min(100 - x, w));
        h = Math.max(5, Math.min(100 - y, h));
      }

      setCrop({ x, y, w, h });
    };

    const onPointerUp = () => {
      dragMode.current = null;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [getPageRect, pxToPercent]);

  // ── PDF Crop Logic ─────────────────────────────────────
  const performCrop = async () => {
    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();

      const startIdx = applyToAll ? 0 : currentPage - 1;
      const endIdx = applyToAll ? pages.length : currentPage;

      for (let i = startIdx; i < endIdx; i++) {
        const page = pages[i];
        const { width: pgW, height: pgH } = page.getSize();

        // Convert UI percentages to PDF points
        // UI: (0,0) = top-left, PDF: (0,0) = bottom-left
        const cropX = (crop.x / 100) * pgW;
        const cropW = (crop.w / 100) * pgW;
        const cropH = (crop.h / 100) * pgH;
        // Bottom-left Y: flip the top-origin Y
        const cropY = pgH - ((crop.y / 100) * pgH) - cropH;

        page.setCropBox(cropX, cropY, cropW, cropH);
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      const newName = file.name.replace(/\.pdf$/i, "_cropped.pdf");
      onComplete(blob, newName);
      toast.success("PDF cropped successfully!");
    } catch (err) {
      console.error("Crop error:", err);
      toast.error("Failed to crop PDF. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // ── Render ─────────────────────────────────────────────
  const RENDER_WIDTH = typeof window !== "undefined" && window.innerWidth < 768 ? 350 : 600;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-slate-950/98 backdrop-blur-2xl animate-in fade-in duration-300">

      {/* ── Header ── */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/5 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
            <Crop className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white tracking-tight">Crop PDF</h2>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
              {file.name} • {numPages} page{numPages !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>
      </header>

      {/* ── Body ── */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden">

        {/* ── Preview Stage ── */}
        <div className="flex-1 flex flex-col items-center justify-center overflow-auto p-6 lg:p-10 relative">
          <div ref={pageContainerRef} className="relative inline-block shadow-2xl shadow-black/50 rounded-lg overflow-hidden">
            {fileUrl && (
              <Document
                file={fileUrl}
                onLoadSuccess={({ numPages: n }) => setNumPages(n)}
                loading={
                  <div className="w-[350px] md:w-[600px] aspect-[1/1.414] bg-white/5 animate-pulse rounded-lg" />
                }
              >
                <Page
                  pageNumber={currentPage}
                  width={RENDER_WIDTH}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  onRenderSuccess={() => {
                    const rect = getPageRect();
                    if (rect) setRenderedPageSize({ width: rect.width, height: rect.height });
                  }}
                />
              </Document>
            )}

            {/* ── Crop Overlay ── */}
            {renderedPageSize.width > 0 && (
              <div className="absolute inset-0" style={{ touchAction: "none" }}>
                {/* Dark mask using clip-path to cut out the crop area */}
                <div
                  className="absolute inset-0 bg-black/60 pointer-events-none transition-all duration-75"
                  style={{
                    clipPath: `polygon(
                      0% 0%, 0% 100%,
                      ${crop.x}% 100%, ${crop.x}% ${crop.y}%,
                      ${crop.x + crop.w}% ${crop.y}%, ${crop.x + crop.w}% ${crop.y + crop.h}%,
                      ${crop.x}% ${crop.y + crop.h}%, ${crop.x}% 100%,
                      100% 100%, 100% 0%
                    )`,
                  }}
                />

                {/* Moveable crop box */}
                <div
                  className="absolute border-2 border-emerald-400 cursor-grab active:cursor-grabbing"
                  style={{
                    left: `${crop.x}%`,
                    top: `${crop.y}%`,
                    width: `${crop.w}%`,
                    height: `${crop.h}%`,
                  }}
                  onPointerDown={(e) => onPointerDown("move", e)}
                >
                  {/* Rule-of-thirds grid */}
                  <div className="absolute inset-0 pointer-events-none opacity-30">
                    <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white" />
                    <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white" />
                    <div className="absolute top-1/3 left-0 right-0 h-px bg-white" />
                    <div className="absolute top-2/3 left-0 right-0 h-px bg-white" />
                  </div>

                  {/* Corner handles */}
                  {(["nw", "ne", "sw", "se"] as const).map((corner) => (
                    <div
                      key={corner}
                      className="absolute w-5 h-5 bg-white border-2 border-emerald-500 rounded-sm z-10 hover:scale-125 transition-transform"
                      style={{
                        cursor: `${corner}-resize`,
                        top: corner.includes("n") ? -6 : "auto",
                        bottom: corner.includes("s") ? -6 : "auto",
                        left: corner.includes("w") ? -6 : "auto",
                        right: corner.includes("e") ? -6 : "auto",
                      }}
                      onPointerDown={(e) => onPointerDown(corner, e)}
                    />
                  ))}

                  {/* Edge handles */}
                  {(["n", "s", "e", "w"] as const).map((edge) => {
                    const isHorizontal = edge === "n" || edge === "s";
                    return (
                      <div
                        key={edge}
                        className="absolute z-10"
                        style={{
                          cursor: isHorizontal ? "ns-resize" : "ew-resize",
                          top: edge === "n" ? -3 : edge === "s" ? "auto" : "20%",
                          bottom: edge === "s" ? -3 : "auto",
                          left: edge === "w" ? -3 : edge === "e" ? "auto" : "20%",
                          right: edge === "e" ? -3 : "auto",
                          width: isHorizontal ? "60%" : 6,
                          height: isHorizontal ? 6 : "60%",
                        }}
                        onPointerDown={(e) => onPointerDown(edge, e)}
                      />
                    );
                  })}

                  {/* Dimension label */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 rounded-md bg-black/80 text-emerald-400 text-[10px] font-bold whitespace-nowrap pointer-events-none">
                    {Math.round(crop.w)}% × {Math.round(crop.h)}%
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Page navigation */}
          {numPages > 1 && (
            <div className="flex items-center gap-4 mt-6">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center justify-center disabled:opacity-20 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-white text-sm font-bold tabular-nums min-w-[80px] text-center">
                {currentPage} / {numPages}
              </span>
              <button
                disabled={currentPage === numPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center justify-center disabled:opacity-20 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* ── Side Panel ── */}
        <aside className="w-full lg:w-80 shrink-0 border-t lg:border-t-0 lg:border-l border-white/5 p-6 flex flex-col gap-6 overflow-y-auto">

          {/* Scope */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">
              Apply crop to
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-white/5 border border-white/5">
              <button
                onClick={() => setApplyToAll(true)}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                  applyToAll
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                    : "text-slate-500 hover:text-white"
                }`}
              >
                <Layers className="w-3 h-3" /> All Pages
              </button>
              <button
                onClick={() => setApplyToAll(false)}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                  !applyToAll
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                    : "text-slate-500 hover:text-white"
                }`}
              >
                <Layout className="w-3 h-3" /> Current Page
              </button>
            </div>
          </div>

          {/* Manual inputs */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">
              Crop area (%)
            </label>
            <div className="grid grid-cols-2 gap-3">
              {([
                { label: "Left", key: "x" as const },
                { label: "Top", key: "y" as const },
                { label: "Width", key: "w" as const },
                { label: "Height", key: "h" as const },
              ]).map((item) => (
                <div key={item.key} className="space-y-1">
                  <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">{item.label}</span>
                  <div className="relative">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      step={1}
                      value={Math.round(crop[item.key])}
                      onChange={(e) => {
                        const v = Math.max(0, Math.min(100, Number(e.target.value) || 0));
                        setCrop((prev) => ({ ...prev, [item.key]: v }));
                      }}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm font-bold focus:border-emerald-500 outline-none transition-all"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-bold text-slate-600">%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Presets */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">
              Quick presets
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Full", crop: { x: 0, y: 0, w: 100, h: 100 } },
                { label: "Trim 5%", crop: { x: 5, y: 5, w: 90, h: 90 } },
                { label: "Trim 10%", crop: { x: 10, y: 10, w: 80, h: 80 } },
                { label: "Top Half", crop: { x: 0, y: 0, w: 100, h: 50 } },
                { label: "Btm Half", crop: { x: 0, y: 50, w: 100, h: 50 } },
                { label: "Center", crop: { x: 15, y: 15, w: 70, h: 70 } },
              ].map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => setCrop(preset.crop)}
                  className="py-2 px-1 rounded-lg border border-white/10 bg-white/5 text-[10px] font-bold text-slate-400 hover:text-white hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all uppercase tracking-wider"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Crop button */}
          <button
            onClick={performCrop}
            disabled={isProcessing}
            className={`w-full py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all ${
              isProcessing
                ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                : "bg-emerald-500 text-white shadow-xl shadow-emerald-500/40 hover:scale-[1.02] active:scale-95"
            }`}
          >
            {isProcessing ? (
              <>
                <RefreshCcw className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Crop & Download
              </>
            )}
          </button>

          <p className="text-center text-[9px] font-bold text-slate-600 uppercase tracking-widest leading-relaxed">
            Processed locally in your browser • No data uploaded
          </p>
        </aside>
      </div>
    </div>
  );
}
