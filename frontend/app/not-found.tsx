// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center px-6 text-center mt-20 mb-20">
      <div className="space-y-5 max-w-md w-full">

        <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] border border-emerald-500/20">
          404 Error
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
          Page not found
        </h1>

        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
          This page doesn't exist or may have been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm transition-colors"
          >
            Go Home
          </Link>
        </div>

      </div>
    </main>
  );
}