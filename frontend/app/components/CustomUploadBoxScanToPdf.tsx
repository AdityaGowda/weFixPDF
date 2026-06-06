"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import jsPDF from "jspdf";
import {
  Camera, CheckCircle, Download, RefreshCcw,
  Smartphone, AlertCircle, X, ZoomIn
} from "lucide-react";

export default function CustomUploadBoxScanToPdf() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [photoData, setPhotoData] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    streamRef.current = stream;
  }, [stream]);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(() => {
    return () => stopCamera();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
      setStream(null);
    }
  }, []);

  const startCamera = async () => {
    setCameraError(null);
    try {
      let mediaStream: MediaStream;
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" }, width: { ideal: 1920 }, height: { ideal: 1080 } },
          audio: false,
        });
      } catch {
        mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      }
      setStream(mediaStream);
    } catch (err: any) {
      const msg =
        err?.name === "NotAllowedError"
          ? "Camera permission denied. Please allow camera access in your browser settings."
          : err?.name === "NotFoundError"
          ? "No camera found on this device."
          : "Could not start camera. Try refreshing the page.";
      setCameraError(msg);
    }
  };

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
    setPhotoData(dataUrl);
    stopCamera();
  };

  const retake = () => {
    setPhotoData(null);
    setPdfUrl(null);
    startCamera();
  };

  const generatePdf = async () => {
    if (!photoData || !canvasRef.current) return;
    setGenerating(true);
    try {
      const imgW = canvasRef.current.width;
      const imgH = canvasRef.current.height;

      const a4W = 210;
      const a4H = 297;
      const ratio = Math.min(a4W / imgW, a4H / imgH);
      const fitW = imgW * ratio;
      const fitH = imgH * ratio;
      const offsetX = (a4W - fitW) / 2;
      const offsetY = (a4H - fitH) / 2;

      const pdf = new jsPDF({ orientation: fitW > fitH ? "l" : "p", unit: "mm", format: "a4" });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const r2 = Math.min(pageW / imgW, pageH / imgH);
      const fW = imgW * r2;
      const fH = imgH * r2;
      const oX = (pageW - fW) / 2;
      const oY = (pageH - fH) / 2;

      pdf.addImage(photoData, "JPEG", oX, oY, fW, fH);
      const blob = pdf.output("blob");
      setPdfUrl(URL.createObjectURL(blob));
    } catch (e) {
      setCameraError("Failed to generate PDF. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  const reset = () => {
    setPdfUrl(null);
    setPhotoData(null);
    setCameraError(null);
  };

  if (isMobile === null) return null;

  if (!isMobile) {
    return (
      <div className="w-full max-w-xl mx-auto">
        <div className="rounded-3xl border-2 border-dashed border-violet-200 dark:border-violet-500/30 bg-violet-50/60 dark:bg-violet-500/5 p-10 flex flex-col items-center gap-6 text-center">
          <div className="w-20 h-20 rounded-3xl bg-violet-100 dark:bg-violet-500/15 flex items-center justify-center">
            <Smartphone className="w-10 h-10 text-violet-500" />
          </div>
          <div className="space-y-2">
            <h2 className="text-slate-800 dark:text-white font-black text-xl">
              Mobile device required
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs">
              Scan to PDF uses your device camera to capture documents. Open this page on your phone or tablet.
            </p>
          </div>
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm text-slate-600 dark:text-slate-400 w-full justify-center">
            <Camera className="w-4 h-4 text-violet-400 shrink-0" />
            <span>Open <strong className="text-slate-800 dark:text-white">wefixpdf.com/scan-to-pdf</strong> on your phone</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {["iOS Safari", "Android Chrome", "Samsung Browser"].map((b) => (
              <span key={b} className="text-[11px] font-medium px-3 py-1 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400">
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto">

      {cameraError && (
        <div className="mb-4 flex items-start gap-3 p-4 rounded-2xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20">
          <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
          <p className="text-rose-700 dark:text-rose-300 text-sm flex-1">{cameraError}</p>
          <button onClick={() => setCameraError(null)} className="text-rose-400 hover:text-rose-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {!stream && !photoData && !pdfUrl && (
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10 text-center">
          <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Camera className="w-10 h-10 text-emerald-500" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-white">Document Scanner</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 max-w-xs mx-auto">
            Point your camera at any document to scan and convert it to PDF instantly.
          </p>
          <button
            onClick={startCamera}
            className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-500/30 transition-all flex items-center justify-center gap-2"
          >
            <Camera className="w-5 h-5" /> Open Camera
          </button>
        </div>
      )}

      {stream && !photoData && (
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-full rounded-3xl overflow-hidden bg-black border-4 border-slate-800 shadow-2xl">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full object-cover"
              style={{ minHeight: "60vh" }}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-4/5 h-4/5 border-2 border-white/60 rounded-xl relative">
                {[
                  "top-0 left-0 border-t-4 border-l-4 rounded-tl-lg",
                  "top-0 right-0 border-t-4 border-r-4 rounded-tr-lg",
                  "bottom-0 left-0 border-b-4 border-l-4 rounded-bl-lg",
                  "bottom-0 right-0 border-b-4 border-r-4 rounded-br-lg",
                ].map((cls, i) => (
                  <span key={i} className={`absolute w-6 h-6 border-white ${cls}`} />
                ))}
              </div>
            </div>
            <p className="absolute bottom-4 left-0 right-0 text-center text-white/70 text-xs">
              Align document within the frame
            </p>
          </div>
          <canvas ref={canvasRef} className="hidden" />
          <button
            onClick={takePhoto}
            className="w-20 h-20 bg-white border-4 border-emerald-500 rounded-full shadow-xl shadow-emerald-500/30 flex items-center justify-center active:scale-95 transition-transform"
            aria-label="Take photo"
          >
            <div className="w-14 h-14 bg-emerald-500 rounded-full" />
          </button>
          <button onClick={stopCamera} className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            Cancel
          </button>
        </div>
      )}

      {photoData && !pdfUrl && (
        <div className="flex flex-col items-center gap-5">
          <div className="w-full rounded-3xl overflow-hidden border-4 border-slate-200 dark:border-slate-700 shadow-xl">
            <img src={photoData} alt="Scanned document" className="w-full" />
          </div>
          <div className="flex gap-3 w-full">
            <button
              onClick={retake}
              className="flex-1 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCcw className="w-4 h-4" /> Retake
            </button>
            <button
              onClick={generatePdf}
              disabled={generating}
              className="flex-1 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-white font-bold shadow-lg shadow-emerald-500/30 transition-all flex items-center justify-center gap-2"
            >
              {generating ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <ZoomIn className="w-4 h-4" />}
              {generating ? "Creating…" : "Save as PDF"}
            </button>
          </div>
        </div>
      )}

      {pdfUrl && (
        <div className="rounded-3xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800/50 p-10 text-center">
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-8 h-8 text-emerald-500" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">PDF Ready!</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">Your scanned document has been saved as a PDF.</p>
          <a
            href={pdfUrl}
            download={`scan-${Date.now()}.pdf`}
            className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 mb-4"
          >
            <Download className="w-5 h-5" /> Download PDF
          </a>
          <button
            onClick={reset}
            className="text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium flex items-center justify-center gap-2 mx-auto text-sm"
          >
            <Camera className="w-4 h-4" /> Scan another document
          </button>
        </div>
      )}
    </div>
  );
}
