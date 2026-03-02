'use client'
import { useEffect, useState, useRef } from "react";

const LOCATIONS = ["Mumbai", "New York", "London", "Tokyo", "Sydney", "Berlin", "Toronto", "Singapore"];
const FILE_TYPES = ["PDF", "JPG", "PNG", "WEBP", "PDF"];

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateActivity() {
  return {
    id: Math.random(),
    location: randomFrom(LOCATIONS),
    fileType: randomFrom(FILE_TYPES),
    timeAgo: Math.floor(Math.random() * 10) + 1,
  };
}

export default function LiveProcessingTicker() {
  const [completedCount, setCompletedCount] = useState(1248);
  const [processingCount, setProcessingCount] = useState(7);
  const [activities, setActivities] = useState([
    generateActivity(),
    generateActivity(),
    generateActivity(),
  ]);
  // Track which id is "newest" to animate only it
  const [newestId, setNewestId] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProcessingCount(prev => {
        const change = Math.floor(Math.random() * 5) - 2;
        const next = prev + change;
        if (next < 1) return 1;
        if (next > 20) return 20;
        return next;
      });
      setCompletedCount(prev => prev + Math.floor(Math.random() * 3));

      const newActivity = generateActivity();
      setNewestId(newActivity.id);
      setActivities(prev => [newActivity, ...prev].slice(0, 3));
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-slate-900 
  border border-slate-200 dark:border-slate-700/60 
  shadow-xl shadow-slate-200/80 dark:shadow-none overflow-hidden shrink-0">

      {/* ── Slide-in animation style ── */}
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .activity-new {
          animation: slideDown 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>

      {/* ── Header ── */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            Live Activity
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 tabular-nums">
            {processingCount}
          </span>
          <span className="text-xs font-bold text-emerald-600/70 dark:text-emerald-400/70">
            processing
          </span>
        </div>
      </div>

      {/* ── Activity Feed ── */}
      <div className="px-5 py-3 space-y-3 h-[150px] overflow-hidden">
        {activities.map((activity, i) => (
          <div
            key={activity.id}
            // ✅ Only newest gets slide-in, rest just fade
            className={`flex items-center gap-3 transition-opacity duration-700
              ${activity.id === newestId ? "activity-new" : ""}
              ${i === 0 ? "opacity-100" : i === 1 ? "opacity-60" : "opacity-30"}
            `}
          >
            {/* File type badge */}
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <span className="text-[9px] font-black text-emerald-600 dark:text-emerald-400">
                {activity.fileType}
              </span>
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate">
                File converted from{" "}
                <span className="text-slate-900 dark:text-white">
                  {activity.location}
                </span>
              </p>
              <p className="text-[10px] font-medium text-slate-400 mt-0.5">
                {activity.timeAgo}s ago · processed & deleted from system ✓
              </p>
            </div>

            {/* Check */}
            <div className="w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0">
              <svg className="w-3 h-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* ── Footer Stats ── */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
        <div className="text-center">
          <p className="text-base font-black text-slate-900 dark:text-white tabular-nums">
            {completedCount.toLocaleString()}
          </p>
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
            Files Converted
          </p>
        </div>
        <div className="w-px h-8 bg-slate-200 dark:bg-slate-700" />
        <div className="text-center">
          <p className="text-base font-black text-slate-900 dark:text-white">0 bytes</p>
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Data Retained</p>
        </div>
        <div className="w-px h-8 bg-slate-200 dark:bg-slate-700" />
        <div className="text-center">
          <p className="text-base font-black text-slate-900 dark:text-white">100%</p>
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Free Forever</p>
        </div>
      </div>

    </div>
  );
}