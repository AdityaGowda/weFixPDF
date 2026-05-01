'use client';
import React, { useState } from 'react';
import { LayoutPanelTop } from 'lucide-react';

export default function AdPlacementSimulator() {
  const [headerAd, setHeaderAd] = useState(true);
  const [sidebarAd, setSidebarAd] = useState(true);
  const [inContentAd1, setInContentAd1] = useState(false);
  const [inContentAd2, setInContentAd2] = useState(true);
  const [footerAd, setFooterAd] = useState(false);

  const calculateScore = () => {
    let ads = 0;
    if (headerAd) ads++;
    if (sidebarAd) ads++;
    if (inContentAd1) ads++;
    if (inContentAd2) ads++;
    if (footerAd) ads++;
    
    let viewability = 100;
    if (ads > 3) viewability -= (ads - 3) * 15;
    if (footerAd) viewability -= 5; // Footer ads have low viewability
    
    let uxScore = 100 - (ads * 12);
    if (headerAd && inContentAd1) uxScore -= 10; // Too dense at top

    return { ads, viewability: Math.max(0, viewability), uxScore: Math.max(0, uxScore) };
  };

  const score = calculateScore();

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2"><LayoutPanelTop className="w-5 h-5 text-purple-500" /> Ad Placement Simulator</h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">Toggle ad units on a wireframe layout to see how placement affects User Experience and Viewability metrics.</p>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Wireframe Area */}
          <div className="flex-1 border-2 border-dashed border-base p-4 rounded-xl bg-page/50 space-y-4">
            
            {/* Header */}
            <div className="w-full h-12 bg-blue-500/10 rounded flex items-center justify-between px-4">
              <div className="w-20 h-4 bg-blue-500/20 rounded"></div>
              <div className="flex gap-2"><div className="w-8 h-4 bg-blue-500/20 rounded"></div><div className="w-8 h-4 bg-blue-500/20 rounded"></div></div>
            </div>

            {/* Header Ad */}
            <label className={`block w-full h-24 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer transition-colors ${headerAd ? 'bg-purple-500/10 border-purple-500 text-purple-500' : 'border-base hover:border-purple-500/50 text-[color:var(--text-muted)]'}`}>
              <input type="checkbox" className="sr-only" checked={headerAd} onChange={e => setHeaderAd(e.target.checked)} />
              <span className="text-[12px] font-bold uppercase tracking-wider">{headerAd ? 'Header Ad (728x90)' : '+ Add Header Ad'}</span>
            </label>

            <div className="flex gap-4">
              {/* Main Content */}
              <div className="flex-1 space-y-4">
                <div className="w-3/4 h-6 bg-base rounded"></div>
                <div className="space-y-2">
                  <div className="w-full h-3 bg-base/50 rounded"></div>
                  <div className="w-full h-3 bg-base/50 rounded"></div>
                  <div className="w-5/6 h-3 bg-base/50 rounded"></div>
                </div>

                {/* In Content Ad 1 */}
                <label className={`block w-full h-40 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer transition-colors ${inContentAd1 ? 'bg-purple-500/10 border-purple-500 text-purple-500' : 'border-base hover:border-purple-500/50 text-[color:var(--text-muted)]'}`}>
                  <input type="checkbox" className="sr-only" checked={inContentAd1} onChange={e => setInContentAd1(e.target.checked)} />
                  <span className="text-[12px] font-bold uppercase tracking-wider">{inContentAd1 ? 'In-Content Ad' : '+ Add Ad'}</span>
                </label>

                <div className="space-y-2">
                  <div className="w-full h-3 bg-base/50 rounded"></div>
                  <div className="w-full h-3 bg-base/50 rounded"></div>
                </div>

                {/* In Content Ad 2 */}
                <label className={`block w-full h-40 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer transition-colors ${inContentAd2 ? 'bg-purple-500/10 border-purple-500 text-purple-500' : 'border-base hover:border-purple-500/50 text-[color:var(--text-muted)]'}`}>
                  <input type="checkbox" className="sr-only" checked={inContentAd2} onChange={e => setInContentAd2(e.target.checked)} />
                  <span className="text-[12px] font-bold uppercase tracking-wider">{inContentAd2 ? 'In-Content Ad' : '+ Add Ad'}</span>
                </label>
              </div>

              {/* Sidebar */}
              <div className="hidden sm:block w-48 space-y-4">
                <label className={`block w-full h-64 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer transition-colors ${sidebarAd ? 'bg-purple-500/10 border-purple-500 text-purple-500' : 'border-base hover:border-purple-500/50 text-[color:var(--text-muted)]'}`}>
                  <input type="checkbox" className="sr-only" checked={sidebarAd} onChange={e => setSidebarAd(e.target.checked)} />
                  <span className="text-[12px] font-bold uppercase tracking-wider text-center">{sidebarAd ? 'Sidebar Ad\n(300x250)' : '+ Add Sidebar Ad'}</span>
                </label>
                <div className="w-full h-32 bg-base/20 rounded-lg"></div>
              </div>
            </div>

            {/* Footer Ad */}
            <label className={`block w-full h-24 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer transition-colors ${footerAd ? 'bg-purple-500/10 border-purple-500 text-purple-500' : 'border-base hover:border-purple-500/50 text-[color:var(--text-muted)]'}`}>
              <input type="checkbox" className="sr-only" checked={footerAd} onChange={e => setFooterAd(e.target.checked)} />
              <span className="text-[12px] font-bold uppercase tracking-wider">{footerAd ? 'Footer Ad (728x90)' : '+ Add Footer Ad'}</span>
            </label>
          </div>

          {/* Metrics Area */}
          <div className="w-full md:w-64 space-y-4 shrink-0">
            <div className="bg-page border border-base rounded-xl p-4">
              <div className="text-[12px] text-[color:var(--text-muted)] font-semibold uppercase tracking-wider mb-1">Ad Units</div>
              <div className="text-3xl font-bold text-[color:var(--text)]">{score.ads}</div>
            </div>
            <div className={`border rounded-xl p-4 ${score.uxScore >= 70 ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : score.uxScore >= 40 ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
              <div className="text-[12px] font-semibold uppercase tracking-wider mb-1 opacity-80">UX Score</div>
              <div className="text-3xl font-bold">{score.uxScore}/100</div>
            </div>
            <div className={`border rounded-xl p-4 ${score.viewability >= 70 ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : score.viewability >= 40 ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
              <div className="text-[12px] font-semibold uppercase tracking-wider mb-1 opacity-80">Est. Viewability</div>
              <div className="text-3xl font-bold">{score.viewability}%</div>
            </div>
            <p className="text-[11px] text-[color:var(--text-muted)]">Advertisers pay premium RPMs for viewability &gt; 70%. Cluttering the page drops viewability and triggers AdSense penalties.</p>
          </div>
        </div>
      </div>
    
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
