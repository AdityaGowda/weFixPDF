import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found | weFixPDF",
  description: "This page doesn't exist or may have been moved.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">

        <span
          className="inline-flex items-center px-3 py-1.5 rounded text-[12px] font-medium border-base bg-surface"
          style={{ color: 'var(--text-muted)' }}
        >
          404 Error
        </span>

        <h1 className="text-section" style={{ color: 'var(--text)' }}>Page not found</h1>

        <p className="text-[15px] leading-[1.7]" style={{ color: 'var(--text-muted)' }}>
          This page doesn&apos;t exist or may have been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link href="/" className="btn-primary">
            Go home <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/tools" className="btn-ghost">
            Browse tools
          </Link>
        </div>

      </div>
    </div>
  );
}
