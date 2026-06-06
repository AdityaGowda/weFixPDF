"use client";

import { useState } from "react";
import { Upload, FileText, CheckCircle, RefreshCcw, Eye, Download } from "lucide-react";
import toast from "react-hot-toast";

interface Props {
  service: string;
}

export default function CustomUploadBoxComparePdf({ service }: Props) {
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [diffHtml, setDiffHtml] = useState<string | null>(null);

  const handleUpload1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile1(e.target.files[0]);
  };

  const handleUpload2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile2(e.target.files[0]);
  };

  const processComparison = async () => {
    if (!file1 || !file2) return toast.error("Please upload two PDFs to compare.");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("files", file1);
      formData.append("files", file2);

      const UPLOAD_URL = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/convert/${service}?files=2`;
      const res = await fetch(UPLOAD_URL, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || "Server error");
      }

      const textResponse = await res.text();
      setDiffHtml(textResponse);
      toast.success("Comparison completed successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to compare PDFs.");
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = () => {
     if (!diffHtml) return;
     const blob = new Blob([diffHtml], { type: 'text/html' });
     const url = URL.createObjectURL(blob);
     const a = document.createElement('a');
     a.href = url;
     a.download = `Comparison_Report_${new Date().getTime()}.html`;
     a.click();
     URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-10 shadow border border-slate-200 dark:border-slate-800">

      {!diffHtml && (
        <div className="space-y-6">
           <div className="grid md:grid-cols-2 gap-6">
             <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-2xl border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                {!file1 ? (
                   <>
                     <Upload className="w-10 h-10 text-emerald-500 mb-4" />
                     <h3 className="font-bold text-slate-700 dark:text-slate-300">1. Original PDF</h3>
                     <label className="mt-4 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold cursor-pointer transition-colors shadow-lg shadow-emerald-500/20">
                       Select File
                       <input type="file" className="hidden" accept=".pdf" onChange={handleUpload1} />
                     </label>
                   </>
                ) : (
                   <div className="text-center">
                     <FileText className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                     <p className="font-semibold text-sm max-w-[200px] truncate">{file1.name}</p>
                     <button onClick={() => setFile1(null)} className="mt-4 text-xs font-bold text-slate-500 hover:text-red-500 uppercase tracking-widest">Remove</button>
                   </div>
                )}
             </div>

             <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-2xl border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                {!file2 ? (
                   <>
                     <Upload className="w-10 h-10 text-blue-500 mb-4" />
                     <h3 className="font-bold text-slate-700 dark:text-slate-300">2. Modified PDF</h3>
                     <label className="mt-4 px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold cursor-pointer transition-colors shadow-lg shadow-blue-500/20">
                       Select File
                       <input type="file" className="hidden" accept=".pdf" onChange={handleUpload2} />
                     </label>
                   </>
                ) : (
                   <div className="text-center">
                     <FileText className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                     <p className="font-semibold text-sm max-w-[200px] truncate">{file2.name}</p>
                     <button onClick={() => setFile2(null)} className="mt-4 text-xs font-bold text-slate-500 hover:text-red-500 uppercase tracking-widest">Remove</button>
                   </div>
                )}
             </div>
           </div>

           <div className="flex justify-center mt-6">
             <button
                onClick={processComparison}
                disabled={loading || !file1 || !file2}
                className="flex items-center gap-2 px-10 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-lg shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100"
             >
                {loading ? <RefreshCcw className="w-6 h-6 animate-spin" /> : <Eye className="w-6 h-6" />}
                {loading ? "Comparing..." : "Compare Documents"}
             </button>
           </div>
        </div>
      )}

      {diffHtml && (
         <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-between bg-emerald-50 dark:bg-emerald-900/10 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-800/50">
               <div className="flex items-center gap-4 mb-4 md:mb-0">
                  <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/30">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Comparison Complete</h3>
                    <p className="text-slate-500 text-sm">Review the side-by-side textual differences below.</p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <button onClick={downloadReport} className="flex items-center gap-2 px-5 py-2.5 bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 font-bold rounded-xl border border-blue-200 dark:border-blue-500/20 hover:bg-blue-100 transition-colors">
                    <Download className="w-4 h-4" /> Save HTML Report
                  </button>
                  <button onClick={() => { setDiffHtml(null); setFile1(null); setFile2(null); }} className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-colors">
                    <RefreshCcw className="w-4 h-4" /> Compare New Files
                  </button>
               </div>
            </div>

            <div className="w-full bg-white border-4 border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-inner h-[70vh]">
               <iframe
                 srcDoc={diffHtml}
                 title="Comparison Diff"
                 className="w-full h-full border-none bg-white"
               />
            </div>
         </div>
      )}
    </div>
  );
}
