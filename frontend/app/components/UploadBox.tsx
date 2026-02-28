"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Upload, FileText, CheckCircle, RefreshCcw, Download, Zap, Shield, Clock, Sliders, Info } from "lucide-react";

interface UploadBoxProps {
  service: string;
}

export default function UploadBox({ service }: UploadBoxProps) {
  const [file, setFile] = useState<File | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [quality, setQuality] = useState<number>(80);
  const [isDragging, setIsDragging] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Magnetic Core Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 150 };
  const coreX = useSpring(mouseX, springConfig);
  const coreY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const rect = document.getElementById('core-trigger')?.getBoundingClientRect();
        if (rect) {
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          mouseX.set((e.clientX - centerX) * 0.1);
          mouseY.set((e.clientY - centerY) * 0.1);
        }
      } else {
        mouseX.set(0);
        mouseY.set(0);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isDragging, mouseX, mouseY]);

  async function fileConversion() {
    if (!file) return;
    setLoading(true);
    setDownloadUrl(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("service", service);
      formData.append("fileName", file.name);
      formData.append("quality", quality.toString());

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/convert/${service}`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Conversion failed");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      console.error(err);
      alert("Conversion encountered an error. Our team has been notified.");
    } finally {
      setLoading(false);
    }
  }

  const handleFileSelection = (selectedFile: File | null) => {
    if (selectedFile) {
      setFile(selectedFile);
      setDownloadUrl(null);
    }
  };

  return (
    <div className="relative w-full min-h-[600px] flex items-center justify-center py-20 px-4 overflow-visible">

      {/* SVG Gooey Filter Definition */}
      <svg className="hidden">
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10" result="gooey" />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div id="core-trigger" className="relative w-full max-w-lg aspect-square flex items-center justify-center">

        {/* The Morphing Core */}
        <motion.label
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFileSelection(e.dataTransfer.files[0]); }}
          style={{ x: coreX, y: coreY }}
          className={`
            relative z-20 w-[90%] h-[90%] cursor-pointer group flex flex-col items-center justify-center
            transition-all duration-1000
          `}
        >
          <input ref={fileInputRef} type="file" hidden onChange={(e) => handleFileSelection(e.target.files?.[0] || null)} />

          {/* Liquid Core Body */}
          <div className="absolute inset-0 gooey-container -z-10">
            <div className={`
              w-full h-full core-blob core-pulse opacity-90
              ${isDragging ? 'scale-110 blur-[5px]' : file ? 'scale-105 saturate-150' : ''}
              ${loading ? 'animate-spin brightness-125' : ''}
            `} />
          </div>

          {/* Inner Content Case */}
          <div className="text-center space-y-6 px-10">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.2 }}
                  className="space-y-4"
                >
                  <RefreshCcw className="w-20 h-20 text-white mx-auto animate-spin" />
                  <p className="text-white text-2xl font-black uppercase tracking-widest italic animate-pulse">Reshaping...</p>
                </motion.div>
              ) : downloadUrl ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto border border-white/30 shadow-2xl">
                    <CheckCircle className="w-12 h-12 text-emerald-300 drop-shadow-lg" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-white text-4xl font-black tracking-tighter drop-shadow-lg">Core Saturated</p>
                    <p className="text-white/80 font-bold">Transformation Successful</p>
                  </div>
                </motion.div>
              ) : file ? (
                <motion.div
                  key="file"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  <FileText className="w-24 h-24 text-white mx-auto drop-shadow-xl" />
                  <div className="space-y-1">
                    <p className="text-white text-3xl font-black truncate max-w-[280px] drop-shadow-md">{file.name}</p>
                    <p className="text-white/70 font-black uppercase tracking-[0.3em] text-xs">{(file.size / (1024 * 1024)).toFixed(2)} MB • READY</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-8"
                >
                  <div className="relative">
                    <Upload className="w-24 h-24 text-white/50 mx-auto group-hover:text-white transition-colors duration-500" />
                    <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full scale-150 -z-10 group-hover:bg-white/40 transition-all duration-700" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-white text-4xl font-black tracking-tighter drop-shadow-lg leading-tight uppercase">Integrate <br /> File</p>
                    <p className="text-white/50 font-bold uppercase tracking-widest text-xs">Drag near core or tap</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.label>

        {/* ORBITAL ELEMENTS */}
        <AnimatePresence>
          {file && !loading && !downloadUrl && (
            <>
              {/* Settings Orbital */}
              <motion.button
                initial={{ scale: 0, opacity: 0, rotate: -45 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0, opacity: 0 }}
                onClick={(e) => { e.stopPropagation(); setShowSettings(!showSettings); }}
                className="absolute top-0 right-0 z-30 w-20 h-20 orbital-node flex flex-center items-center justify-center bg-indigo-500 text-white shadow-indigo-500/50"
              >
                <Sliders className="w-8 h-8 rotate-90" />
              </motion.button>

              {/* Action Orbital (Primary) */}
              <motion.button
                initial={{ scale: 0, opacity: 0, y: 100 }}
                animate={{ scale: 1.2, opacity: 1, y: 0 }}
                exit={{ scale: 0, opacity: 0 }}
                onClick={(e) => { e.stopPropagation(); fileConversion(); }}
                className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 z-30 px-10 py-5 rounded-full bg-white text-brand-primary font-black text-xl shadow-2xl shadow-brand-primary/40 hover:scale-110 active:scale-95 transition-all"
              >
                INITIATE
              </motion.button>

              {/* Reset Orbital */}
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                onClick={(e) => { e.stopPropagation(); setFile(null); }}
                className="absolute top-0 left-0 z-30 w-16 h-16 orbital-node flex items-center justify-center text-rose-500"
              >
                <RefreshCcw className="w-6 h-6" />
              </motion.button>
            </>
          )}

          {downloadUrl && (
            <motion.a
              key="download"
              initial={{ scale: 0, y: 50 }}
              animate={{ scale: 1.2, y: 0 }}
              href={downloadUrl}
              download=""
              className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 z-30 px-12 py-6 rounded-[2rem] bg-emerald-500 text-white font-black text-2xl shadow-2xl shadow-emerald-500/50 flex items-center gap-3 hover:scale-110"
            >
              <Download className="w-8 h-8" />
              RETRIEVE
            </motion.a>
          )}
        </AnimatePresence>

        {/* Dynamic Settings Layer (Orbiting) */}
        <AnimatePresence>
          {showSettings && service === 'image-compressor' && (
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.8 }}
              animate={{ opacity: 1, x: 200, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.8 }}
              className="absolute right-[-100px] top-1/2 -translate-y-1/2 z-40 w-[240px] glass dark:glass-dark rounded-[2.5rem] p-8 space-y-6 shadow-2xl border border-brand-primary/30"
            >
              <div className="space-y-1">
                <p className="text-[10px] font-black text-brand-primary uppercase tracking-widest">Core Density</p>
                <p className="text-xl font-black text-slate-800 dark:text-white">{quality}% PRO</p>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-brand-primary"
              />
              <p className="text-[10px] text-slate-400 font-bold leading-relaxed italic">Lowering density increases speed but may reduce structural integrity.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Trust Orbital (Static Decorative) */}
        <div className="absolute inset-0 orbital-path scale-[1.3] opacity-30 animate-spin-slow pointer-events-none" />
        <div className="absolute inset-0 orbital-path scale-[1.6] opacity-10 animate-spin-slow-reverse pointer-events-none" />
      </div>

      {/* Unique Trust Badge */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 opacity-30 group hover:opacity-100 transition-opacity duration-700">
        {[Shield, Zap, Clock].map((Icon, idx) => (
          <Icon key={idx} className="w-5 h-5 text-slate-400 hover:text-brand-primary transition-colors" />
        ))}
      </div>

      <style jsx>{`
        .animate-spin-slow { animation: spin 20s linear infinite; }
        .animate-spin-slow-reverse { animation: spin 25s linear infinite reverse; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
