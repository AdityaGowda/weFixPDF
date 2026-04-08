import WeFixPDFLogo from "@/app/components/Logo";
import { getToolListings } from "@/app/lib/seo/seoApi";

const PDF_SLUGS = [
  "compress-pdf", "merge-pdf", "split-pdf", "pdf-to-jpg", "pdf-to-word",
  "rotate-pdf", "protect-pdf", "unlock-pdf", "word-to-pdf",
];

export default async function Footer() {
  const tools = await getToolListings();
  const pdfTools   = tools.filter((t: any) => PDF_SLUGS.includes(t.slug));
  const imageTools = tools.filter((t: any) => !PDF_SLUGS.includes(t.slug));

  return (
    <footer className="bg-surface border-t border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">

        {/* ── 4-column grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* Col 1 — Brand */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div>
              <WeFixPDFLogo size="sm" />
            </div>

            <p className="text-[13px] leading-[1.6]" style={{ color: 'var(--text-muted)' }}>
              Free online PDF &amp; image tools. Fast, private, and always free —
              zero data retention.
            </p>

            {/* Privacy-first badge */}
            <span
              className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1.5 rounded-md"
              style={{ background: '#E6F1FB', color: '#185FA5' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#2D5BE3]" />
              Privacy First
            </span>
          </div>

          {/* Col 2 — PDF Tools */}
          <div className="space-y-4">
            <h5 className="text-label">PDF Tools</h5>
            <ul className="space-y-2.5">
              {pdfTools.slice(0, 6).map((t: any) => (
                <li key={t.slug}>
                  <a
                    href={`/${t.slug}`}
                    className="text-[13px] hover:text-[#2D5BE3] dark:hover:text-[#5B82FF] transition-colors" style={{ color: 'var(--text-muted)' }}
                  >
                    {t.name}
                  </a>
                </li>
              ))}
              {pdfTools.length > 6 && (
                <li>
                  <a href="/tools" className="text-[13px] text-[#2D5BE3] hover:underline">
                    +{pdfTools.length - 6} more →
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Col 3 — Image Tools */}
          <div className="space-y-4">
            <h5 className="text-label">Image Tools</h5>
            <ul className="space-y-2.5">
              {imageTools.slice(0, 6).map((t: any) => (
                <li key={t.slug}>
                  <a
                    href={`/${t.slug}`}
                    className="text-[13px] hover:text-[#2D5BE3] dark:hover:text-[#5B82FF] transition-colors" style={{ color: 'var(--text-muted)' }}
                  >
                    {t.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Company */}
          <div className="space-y-4">
            <h5 className="text-label">Company</h5>
            <ul className="space-y-2.5">
              {[
                { label: 'About',          href: '/about' },
                { label: 'Blog',           href: '/blog' },
                { label: 'Security',       href: '/security' },
                { label: 'Help Center',    href: '/help' },
                { label: 'Contact',        href: '/contact' },
                { label: 'All Tools',      href: '/tools' },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-[13px] hover:text-[#2D5BE3] dark:hover:text-[#5B82FF] transition-colors" style={{ color: 'var(--text-muted)' }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-10 pt-6 border-t border-[rgba(0,0,0,0.07)] dark:border-[rgba(255,255,255,0.07)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-[12px]" style={{ color: 'var(--text-subtle)' }}>
            © 2026 weFixPDF — All rights reserved
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="/sitemap.xml" className="text-[12px] hover:text-foreground transition-colors" style={{ color: 'var(--text-subtle)' }}>
              Sitemap
            </a>
            <a href="https://www.instagram.com/wefixpdf" target="_blank" rel="noopener noreferrer" className="text-[12px] hover:text-foreground transition-colors" style={{ color: 'var(--text-subtle)' }}>
              Instagram
            </a>
            <a href="/privacy-policy" className="text-[12px] hover:text-foreground transition-colors" style={{ color: 'var(--text-subtle)' }}>
              Privacy Policy
            </a>
            <a href="/terms" className="text-[12px] hover:text-foreground transition-colors" style={{ color: 'var(--text-subtle)' }}>
              Terms
            </a>
            <span className="text-[12px]" style={{ color: 'var(--text-subtle)' }}>No sign-up · No watermarks · No limits</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
