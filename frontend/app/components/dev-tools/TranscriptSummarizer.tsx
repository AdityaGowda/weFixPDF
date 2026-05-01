'use client';

import React from 'react';
import { Hammer } from 'lucide-react';

export default function TranscriptSummarizer() {
  return (
    <div className="bg-card border border-base p-8 rounded-xl text-center space-y-4">
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center">
          <Hammer className="w-8 h-8 text-blue-500" />
        </div>
      </div>
      <h2 className="text-[20px] font-semibold text-[color:var(--text)]">Transcript Summarizer</h2>
      <p className="text-[15px] text-[color:var(--text-muted)] max-w-lg mx-auto">
        This tool is currently under construction. We are building a high-quality, client-side utility for you.
        Check back soon!
      </p>
    </div>
  );
}
