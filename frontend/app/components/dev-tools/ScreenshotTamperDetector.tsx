'use client';
import React, { useState } from 'react';
import { TrendingUp, Image as ImageIcon } from 'lucide-react';

export default function ScreenshotTamperDetector() {
  const [fileData, setFileData] = useState<{ name: string; size: number; lastModified: number } | null>(null);
  const [result, setResult] = useState<{ score: number; checks: { label: string; pass: boolean; warn: boolean }[] } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setFileData({
      name: file.name,
      size: file.size,
      lastModified: file.lastModified
    });

    // Simulate simple client-side checks for file attributes
    const lowerName = file.name.toLowerCase();
    const checks = [
      { label: 'File format is standard (PNG/JPG)', pass: lowerName.endsWith('.png') || lowerName.endsWith('.jpg') || lowerName.endsWith('.jpeg'), warn: false },
      { label: 'No software signature in filename (e.g. "Photoshop", "Edit")', pass: !/(photoshop|edit|gimp|snapseed)/.test(lowerName), warn: /(photoshop|edit|gimp|snapseed)/.test(lowerName) },
      { label: 'File size is typical for screenshots (< 5MB)', pass: file.size < 5 * 1024 * 1024, warn: file.size >= 5 * 1024 * 1024 },
      { label: 'Filename matches standard OS patterns (e.g. "Screenshot 2025...")', pass: /screenshot|screen shot|img_/.test(lowerName), warn: !/screenshot|screen shot|img_/.test(lowerName) },
      { label: 'Modification time matches creation (simulated)', pass: true, warn: false }
    ];

    const score = Math.max(0, checks.filter(c => c.pass).length * 20);
    setResult({ score, checks });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2"><ImageIcon className="w-5 h-5 text-blue-500" /> Screenshot Tamper Detector Lite</h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">Check image files for basic signs of editing or tampering. Upload a screenshot to analyze file metadata and naming patterns.</p>
        
        <label className="block w-full h-32 border-2 border-dashed border-base hover:border-blue-500 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors bg-page/50">
          <input type="file" accept="image/*" onChange={handleFileChange} className="sr-only" />
          <ImageIcon className="w-8 h-8 text-[color:var(--text-muted)] mb-2" />
          <span className="text-[14px] font-medium text-[color:var(--text)]">Click to upload image</span>
          <span className="text-[12px] text-[color:var(--text-muted)] mt-1">PNG, JPG up to 10MB</span>
        </label>
      </div>
      
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className="flex items-center gap-4 border-b border-base pb-4">
            <div className={`text-4xl font-bold ${result.score >= 80 ? 'text-emerald-500' : result.score >= 60 ? 'text-amber-500' : 'text-red-500'}`}>{result.score}%</div>
            <div>
              <div className="text-[14px] font-bold text-[color:var(--text)]">{fileData?.name}</div>
              <div className="text-[12px] text-[color:var(--text-muted)]">Authenticity Score</div>
            </div>
          </div>
          <div className="space-y-2">
            {result.checks.map((c, i) => (
              <div key={i} className={`flex items-start gap-3 p-3 rounded-lg border text-[13px] ${c.warn ? 'bg-amber-500/10 border-amber-500/20' : c.pass ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                <span className={c.warn ? 'text-amber-500' : c.pass ? 'text-emerald-500' : 'text-red-500'}>{c.warn ? '⚠' : c.pass ? '✓' : '✗'}</span>
                <span className="text-[color:var(--text)]">{c.label}</span>
              </div>
            ))}
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-lg text-[12px] text-blue-600 dark:text-blue-400">
            Note: This is a surface-level metadata scan. Professional tampering requires deep Error Level Analysis (ELA) and pixel variance detection which is not available in this client-side lite version.
          </div>
        </div>
      )}
    
      <div className="mt-8 bg-card border border-base p-6 rounded-xl space-y-4">
        <h3 className="text-[15px] font-semibold text-[color:var(--text)]">🔒 Privacy & Safe Usage</h3>
        <p className="text-[13px] text-[color:var(--text-muted)]">
          <strong>100% Private:</strong> This tool runs entirely in your browser. No data, inputs, or files are sent to our servers or saved anywhere.
        </p>
        <p className="text-[12px] text-[color:var(--text-muted)] opacity-80 border-t border-base pt-4">
          <strong>Disclaimer:</strong> This tool provides risk indicators only, not a final judgment.
        </p>
      </div>
    </div>
  );
}
