import { Upload } from "lucide-react";

export default function UploadBoxUI() {
  return (
    <div className="relative w-full py-4 md:py-8">
      <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-10">
        <div className="space-y-3 md:space-y-4 px-4">
          <h2 className="text-2xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Drop your file here
          </h2>
          <p className="text-sm md:text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Fast. Secure. No sign-up required.
          </p>
        </div>

        <div className="relative group px-4">
          <div className="absolute inset-0 bg-emerald-500/10 blur-3xl opacity-50 group-hover:opacity-70 transition-all duration-500 rounded-3xl" />

          <div className="relative border border-slate-200 dark:border-slate-800
                          bg-white/70 dark:bg-slate-900/70
                          backdrop-blur-xl
                          rounded-3xl
                          p-8 md:p-16
                          transition-all duration-300
                          hover:scale-[1.01]
                          hover:border-emerald-500/50">

            <div className="flex flex-col items-center gap-4 md:gap-6">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-emerald-500/10
                              flex items-center justify-center">
                <Upload className="w-8 h-8 md:w-10 md:h-10 text-emerald-500" />
              </div>

              <p className="text-lg md:text-xl font-semibold text-slate-800 dark:text-white">
                Click or drag file
              </p>

              <span className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
                Supports PDF, JPG, PNG, WEBP
              </span>

              <button className="mt-4 md:mt-6 px-8 py-3 rounded-xl
                                 bg-emerald-500 text-white
                                 font-bold
                                 hover:bg-emerald-600
                                 transition-all duration-300 text-sm md:text-base shadow-lg shadow-emerald-500/20">
                Select File
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}