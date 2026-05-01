'use client';
import React, { useState } from 'react';
import { TrendingUp, Copy } from 'lucide-react';

export default function CaptionCleanerTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const clean = () => {
    let text = input;
    // Remove SRT timestamps
    text = text.replace(/\d+\r?\n\d{2}:\d{2}:\d{2},\d{3} --> \d{2}:\d{2}:\d{2},\d{3}\r?\n/g, '');
    // Remove VTT timestamps
    text = text.replace(/\d{2}:\d{2}:\d{2}\.\d{3} --> \d{2}:\d{2}:\d{2}\.\d{3}\r?\n/g, '');
    // Remove speaker labels like [Speaker 1]:
    text = text.replace(/\[.*?\]:\s*/g, '');
    // Remove HTML tags
    text = text.replace(/<[^>]+>/g, '');
    // Remove music notes / sound effects
    text = text.replace(/♪[^♪]*♪/g, '').replace(/\([A-Z\s]+\)/g, '');
    // Fix broken line endings - join short fragments
    text = text.split('\n').map(l => l.trim()).filter(Boolean).join(' ');
    // Fix multiple spaces
    text = text.replace(/\s{2,}/g, ' ').trim();
    // Re-paragraph by sentences
    text = text.replace(/([.!?]) /g, '$1\n\n');
    setOutput(text.trim());
  };

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)]">Caption Cleaner Tool</h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">Paste YouTube auto-captions or SRT files to strip timestamps, speaker labels, and formatting — leaving clean, readable text for repurposing.</p>
        <textarea value={input} onChange={e => setInput(e.target.value)} rows={8}
          placeholder={'1\n00:00:01,000 --> 00:00:04,000\nHello and welcome to this video today...\n\n2\n00:00:04,500 --> 00:00:08,000\nWe are going to talk about...\n\n[Music]'}
          className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[13px] font-mono text-[color:var(--text)] focus:outline-none focus:border-blue-500 resize-y" />
        <button onClick={clean} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 transition-colors">Clean Captions</button>
      </div>
      {output && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-[14px] font-semibold text-[color:var(--text)]">Cleaned Text</h3>
            <button onClick={copy} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500 text-white text-[12px] hover:bg-blue-600 transition-colors">
              <Copy className="w-3.5 h-3.5" />{copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <textarea value={output} readOnly rows={10} className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] resize-y" />
          <p className="text-[12px] text-[color:var(--text-muted)]">Cleaned and ready to use as a blog post, newsletter, or social thread. Review for any missed artifacts before publishing.</p>
        </div>
      )}
    
      <div className="mt-8 bg-card border border-base p-6 rounded-xl space-y-4">
        <h3 className="text-[15px] font-semibold text-[color:var(--text)]">🔒 Privacy & Safe Usage</h3>
        <p className="text-[13px] text-[color:var(--text-muted)]">
          <strong>100% Private:</strong> This tool runs entirely in your browser. No data, inputs, or files are sent to our servers or saved anywhere.
        </p>
        <p className="text-[12px] text-[color:var(--text-muted)] opacity-80 border-t border-base pt-4">
          <strong>Disclaimer:</strong> This tool is provided for informational and productivity purposes only. Please verify important results independently.
        </p>
      </div>
    </div>
  );
}
