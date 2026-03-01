import React from "react";

type CompressionLevel = "high" | "medium" | "low";

interface CompressionSettingsProps {
  showSettings: boolean;
  service: string;
  quality: CompressionLevel;
  setQuality: React.Dispatch<React.SetStateAction<CompressionLevel>>;
}

const CompressionSettings: React.FC<CompressionSettingsProps> = ({
  showSettings,
  service,
  quality,
  setQuality,
}) => {
  if (!showSettings || !service.includes("compress")) return null;

  const options: {
    value: CompressionLevel;
    title: string;
    desc: string;
  }[] = [
    {
      value: "high",
      title: "High Quality",
      desc: "Low Compression • Best clarity",
    },
    {
      value: "medium",
      title: "Balanced",
      desc: "Medium Compression • Recommended",
    },
    {
      value: "low",
      title: "Maximum",
      desc: "High Compression • Smaller size",
    },
  ];

  return (
    <div className="absolute right-[-120px] top-1/2 -translate-y-1/2 z-40 w-[260px] glass dark:glass-dark rounded-[2.5rem] p-6 space-y-4 shadow-2xl border border-brand-primary/30 transition-all duration-500 animate-in fade-in slide-in-from-right-10">
      <p className="text-[11px] font-black text-brand-primary uppercase tracking-widest">
        Compression Level
      </p>

      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => setQuality(option.value)}
          className={`w-full text-left p-4 rounded-2xl transition-all duration-300 border ${
            quality === option.value
              ? "bg-brand-primary text-white border-brand-primary shadow-lg"
              : "bg-white/40 dark:bg-white/5 border-transparent hover:border-brand-primary/40"
          }`}
        >
          <p className="font-bold text-sm">{option.title}</p>
          <p className="text-xs opacity-80">{option.desc}</p>
        </button>
      ))}
    </div>
  );
};

export default CompressionSettings;