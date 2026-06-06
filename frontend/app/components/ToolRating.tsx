"use client";

import { useState, useEffect } from "react";
import { Star, Send, User } from "lucide-react";
import toast from "react-hot-toast";

interface ToolRatingProps {
  toolSlug: string;
}

export default function ToolRating({ toolSlug }: ToolRatingProps) {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [feedback, setFeedback] = useState("");
  const [userName, setUserName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<{ averageRating: string; totalRatings: number } | null>(null);

  useEffect(() => {
    const hasRated = localStorage.getItem(`rated_${toolSlug}`);
    if (hasRated) setSubmitted(true);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a rating.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/rating/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool_slug: toolSlug,
          rating,
          feedback,
          user_name: userName || "Anonymous",
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        localStorage.setItem(`rated_${toolSlug}`, "true");
        toast.success("Thank you for your feedback!");
      } else {
        throw new Error("Failed to submit rating");
      }
    } catch (error) {
      toast.error("Failed to submit rating. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/10 p-10 rounded-[2rem] text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -mr-16 -mt-16 blur-3xl" />
        <div className="relative z-10">
          <div className="w-20 h-20 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/20 rotate-3">
            <Star className="text-white fill-current w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Thanks for the feedback!</h3>
          <p className="text-slate-600 dark:text-slate-400 max-w-sm mx-auto">Your rating helps us keep weFixPDF free and reliable for everyone.</p>

          {stats && stats.totalRatings > 0 && (
            <div className="mt-8 pt-8 border-t border-emerald-100 dark:border-emerald-500/10 flex items-center justify-center gap-4">
               <div className="text-left">
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.averageRating}</p>
                  <p className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Average Score</p>
               </div>
               <div className="h-8 w-px bg-slate-200 dark:bg-slate-800" />
               <div className="text-left">
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.totalRatings.toLocaleString()}</p>
                  <p className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Total Reviews</p>
               </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <section id="rating-section" className="bg-white dark:bg-[#0c0c0e] border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] p-8 md:p-10 rounded-[2rem] shadow-sm relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#3b82f610,transparent_50%)] pointer-events-none" />

      <div className="max-w-xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Rate this tool</h3>
          <p className="text-slate-500 dark:text-slate-400 text-[15px] leading-relaxed">
            How was your experience? Your feedback helps us build better tools.
          </p>

          {stats && stats.totalRatings > 0 && (
             <div className="flex items-center justify-center gap-3 mt-6">
                <div className="flex gap-0.5">
                   {[1,2,3,4,5].map(s => (
                      <Star key={s} className={`w-3.5 h-3.5 ${s <= Math.round(Number(stats.averageRating)) ? 'text-amber-400 fill-current' : 'text-slate-200 dark:text-slate-800'}`} />
                   ))}
                </div>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{stats.averageRating}</span>
                <span className="text-slate-300 dark:text-slate-700">/</span>
                <span className="text-sm text-slate-500 dark:text-slate-400">{stats.totalRatings.toLocaleString()} reviews</span>
             </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                className="p-1 transition-transform active:scale-90"
              >
                <Star
                  className={`w-10 h-10 transition-colors ${
                    (hover || rating) >= star
                      ? "text-amber-400 fill-current"
                      : "text-slate-200 dark:text-slate-700"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <textarea
              placeholder="What could we improve? (Optional)"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-sm min-h-[100px]"
            />

            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Your name (Optional)"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || rating === 0}
            className="w-full flex items-center justify-center gap-2 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-500/25 active:scale-[0.98]"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit Feedback
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
