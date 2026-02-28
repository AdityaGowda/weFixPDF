import { useEffect, useState } from "react";

export default function TrustTicker() {
  const [count, setCount] = useState(1248);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + Math.floor(Math.random() * 3));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="inline-flex items-center gap-2 sm:gap-4 px-4 sm:px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md animate-in fade-in slide-in-from-bottom-5 duration-700"
    >
      <div className="flex -space-x-2">
        {[1, 2, 3].map(i => (
          <div key={i} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-slate-900 bg-gradient-to-br from-brand-primary to-brand-secondary" />
        ))}
      </div>
      <div className="text-left">
       <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-slate-500">Live Conversions</p>
       <p className="text-xs sm:text-sm font-bold text-slate-400">
          <span className="text-brand-primary font-black">{count.toLocaleString()}</span>{" "} 
          <span className="hidden xs:inline">Files Converted & Deleted</span>
          <span className="xs:hidden">Files Processed</span>
        </p>
      </div>
      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full animate-ping" />
    </div>
 );
}