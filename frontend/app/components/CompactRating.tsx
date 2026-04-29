"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";

interface CompactRatingProps {
  toolSlug: string;
}

export default function CompactRating({ toolSlug }: CompactRatingProps) {
  const [stats, setStats] = useState<{ averageRating: string; totalRatings: number } | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/rating/${toolSlug}/stats`);
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    };
    fetchStats();
  }, [toolSlug]);

  if (!stats || stats.totalRatings === 0) return null;

  return (
    <div 
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/50 dark:bg-white/5 border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] shadow-sm cursor-pointer hover:bg-white dark:hover:bg-white/10 transition-all active:scale-95 group"
      onClick={() => {
        const el = document.getElementById('rating-section');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }}
    >
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star 
            key={s} 
            className={`w-3.5 h-3.5 ${s <= Math.round(Number(stats.averageRating)) ? 'text-amber-400 fill-current' : 'text-slate-200 dark:text-slate-700'}`} 
          />
        ))}
      </div>
      <span className="text-[13px] font-bold text-slate-700 dark:text-slate-300">
        {stats.averageRating}
      </span>
      <span className="text-slate-300 dark:text-slate-600">|</span>
      <span className="text-[12px] font-medium text-slate-500 dark:text-slate-400 group-hover:text-blue-500 transition-colors">
        {stats.totalRatings.toLocaleString()} reviews
      </span>
    </div>
  );
}
