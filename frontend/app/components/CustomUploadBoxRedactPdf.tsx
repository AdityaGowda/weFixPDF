"use client";

import { useState, useRef, useEffect, MouseEvent } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { Upload, X, CheckCircle, Download, RefreshCcw, Shield, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface RedactionArea {
  page: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Props {
  service: string;
}

export default function CustomUploadBoxRedactPdf({ service }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [areas, setAreas] = useState<RedactionArea[]>([]);

  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentRect, setCurrentRect] = useState<{x:number, y:number, width:number, height:number} | null>(null);

  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setStartPos({ x, y });
    setIsDrawing(true);
    setCurrentRect({ x, y, width: 0, height: 0 });
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDrawing || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const clampedX = Math.max(0, Math.min(x, rect.width));
    const clampedY = Math.max(0, Math.min(y, rect.height));

    setCurrentRect({
      x: Math.min(startPos.x, clampedX),
      y: Math.min(startPos.y, clampedY),
      width: Math.abs(clampedX - startPos.x),
      height: Math.abs(clampedY - startPos.y)
    });
  };

  const handleMouseUp = () => {
    if (isDrawing && currentRect && currentRect.width > 5 && currentRect.height > 5 && containerRef.current) {
      const canvas = containerRef.current.querySelector('canvas');
      if (canvas) {
        const widthScale = canvas.width / canvas.offsetWidth;

        setAreas([...areas, {
          page: pageNumber,
          x: currentRect.x,
          y: currentRect.y,
          width: currentRect.width,
          height: currentRect.height
        }]);
      }
    }
    setIsDrawing(false);
    setCurrentRect(null);
  };

  const removeArea = (index: number) => {
    setAreas(areas.filter((_, i) => i !== index));
  };

  async function processPdf() {
    if (!file) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("files", file);

      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const percentAreas = areas.map(a => ({
           page: a.page,
           x: (a.x / rect.width) * 100,
           y: (a.y / rect.height) * 100,
           width: (a.width / rect.width) * 100,
           height: (a.height / rect.height) * 100
        }));
        formData.append("areas", JSON.stringify(percentAreas));
      }

      const res = await fetch(`http://localhost:5000/api/${service}`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || "Server error");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      toast.success("PDF redacted successfully!");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const pageAreas = areas.filter(a => a.page === pageNumber);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-10 shadow border border-slate-200 dark:border-slate-800">
      {!file && !downloadUrl && (
        <label className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-2xl border-slate-300 dark:border-slate-700 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 cursor-pointer transition-colors">
          <Upload className="w-12 h-12 text-slate-400 mb-4" />
          <span className="text-lg font-medium text-slate-700 dark:text-slate-200">Click to upload PDF</span>
          <span className="text-sm text-slate-500 mt-2">Maximum file size: 50MB</span>
          <input type="file" className="hidden" accept=".pdf" onChange={(e) => {
            if (e.target.files?.[0]) {
               setFile(e.target.files[0]);
               setDownloadUrl(null);
               setAreas([]);
            }
          }} />
        </label>
      )}

      {file && !downloadUrl && (
        <div className="space-y-6 flex flex-col items-center">

          <div className="flex items-center justify-between w-full max-w-3xl bg-slate-50 dark:bg-slate-800 p-4 rounded-xl">
             <div className="flex items-center gap-4">
                <button disabled={pageNumber <= 1} onClick={() => setPageNumber(p => p - 1)} className="p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50">
                   <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm font-medium">Page {pageNumber} of {numPages}</span>
                <button disabled={pageNumber >= numPages} onClick={() => setPageNumber(p => p + 1)} className="p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50">
                   <ChevronRight className="w-5 h-5" />
                </button>
             </div>
             <p className="text-xs text-slate-500 font-medium">Click and drag to draw a redaction box</p>
          </div>

          <div className="relative border border-slate-300 dark:border-slate-700 shadow-lg rounded select-none cursor-crosshair overflow-hidden"
               ref={containerRef}
               onMouseDown={handleMouseDown}
               onMouseMove={handleMouseMove}
               onMouseUp={handleMouseUp}
               onMouseLeave={handleMouseUp}>

            <div ref={pageRef}>
               <Document file={file} onLoadSuccess={onDocumentLoadSuccess} loading={<div className="p-20 text-slate-400">Loading PDF...</div>}>
                 <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} width={800} />
               </Document>
            </div>

            {pageAreas.map((area, idx) => (
               <div key={idx} className="absolute bg-black opacity-80 border-2 border-red-500 flex items-start justify-end"
                    style={{ left: area.x, top: area.y, width: area.width, height: area.height }}>
                 <button className="bg-red-500 text-white p-1 rounded-bl" onMouseDown={(e) => { e.stopPropagation(); removeArea(areas.indexOf(area)); }}>
                    <Trash2 className="w-4 h-4" />
                 </button>
               </div>
            ))}

            {isDrawing && currentRect && (
               <div className="absolute bg-black opacity-50 border-2 border-red-500 pointer-events-none"
                    style={{ left: currentRect.x, top: currentRect.y, width: currentRect.width, height: currentRect.height }} />
            )}
          </div>

          <div className="flex justify-end gap-3 w-full max-w-3xl mt-4">
            <button onClick={() => { setFile(null); setAreas([]); }} className="px-5 py-2.5 rounded-xl font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors">
              Cancel
            </button>
            <button onClick={processPdf} disabled={loading} className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-white bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/30 transition-all disabled:opacity-50">
              {loading ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <Shield className="w-5 h-5" />}
              {loading ? "Redacting..." : "Apply Redactions"}
            </button>
          </div>
        </div>
      )}

      {downloadUrl && (
        <div className="flex flex-col items-center justify-center p-12 text-center bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800">
           <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-8 h-8 text-emerald-500" />
           </div>
           <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">PDF Redacted Successfully</h3>
           <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm">The selected areas have been permanently blacked out.</p>

           <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
             <a href={downloadUrl} download={`${file?.name.split('.')[0]}_redacted.pdf`} className="flex items-center justify-center gap-2 px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/30 transition-all">
               <Download className="w-5 h-5" /> Download PDF
             </a>
             <button onClick={() => { setDownloadUrl(null); setFile(null); setAreas([]); }} className="flex items-center justify-center gap-2 px-8 py-3.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-white rounded-xl font-bold border border-slate-200 dark:border-slate-700 transition-all">
               <RefreshCcw className="w-5 h-5" /> Redact Another
             </button>
           </div>
        </div>
      )}
    </div>
  );
}
