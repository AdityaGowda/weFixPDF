"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { ChevronDown, Sun, Moon, Menu, X } from "lucide-react";
import WeFixPDFLogo from "./Logo";
import { getToolListings, type ToolListing } from "@/app/lib/seo/seoApi";

interface NavItem     { label: string; href: string; description: string }
interface NavCategory { label: string; items: NavItem[]; loading?: boolean }

const STATIC_CATEGORIES: NavCategory[] = [
  { label: "PDF Tools", items: [], loading: true },
  { label: "Image Tools", items: [], loading: true },
  { label: "Developer Tools", items: [], loading: true },
];

/* DB type value may differ from display label */
const DB_TYPE: Record<string, string> = {
  "Developer Tools": "Dev Tools",
};


const RESOURCES = [
  { label: "Blog",          href: "/blog",      desc: "Guides & tutorials" },
  { label: "Compare Tools", href: "/compare",   desc: "weFixPDF vs alternatives" },
  { label: "Use Cases",     href: "/use-cases", desc: "By profession & workflow" },
  { label: "Help Center",   href: "/help",      desc: "FAQs & troubleshooting" },
  { label: "Security",      href: "/security",  desc: "How we protect your files" },
];

function SkeletonItems() {
  return (
    <>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="px-3 py-2 space-y-1.5 animate-pulse">
          <div className="h-3 w-28 rounded bg-[rgba(0,0,0,0.06)]" />
          <div className="h-2.5 w-40 rounded bg-[rgba(0,0,0,0.04)]" />
        </div>
      ))}
    </>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<NavCategory[]>(STATIC_CATEGORIES);
  const { resolvedTheme, setTheme } = useTheme();

  /* Load tool listings non-blocking */
  useEffect(() => {
    getToolListings()
      .then((res: ToolListing[]) => {
        setCategories((prev) =>
          prev.map((cat) => ({
            ...cat,
            loading: false,
            items: res
              .filter((t) => t.type === (DB_TYPE[cat.label] ?? cat.label))
              .map((t) => ({ label: t.name, href: `/tools/${t.slug}`, description: t.description })),
          }))
        );
      })
      .catch(() => {
        setCategories((prev) => prev.map((c) => ({ ...c, loading: false })));
      });
  }, []);

  const toggleTheme = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");

  /* Shared dropdown panel animation */
  const dropdownAnim = "opacity-0 scale-[0.98] translate-y-1 pointer-events-none " +
    "group-hover/item:opacity-100 group-hover/item:scale-100 group-hover/item:translate-y-0 " +
    "group-hover/item:pointer-events-auto transition-all duration-150 origin-top";
  const dropdownBase = "absolute top-full left-1/2 -translate-x-1/2 z-50 pt-2 " + dropdownAnim;

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-[#09090b] border-b border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] h-[60px] flex items-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full flex items-center justify-between gap-6">

        {/* ── Wordmark ── */}
        <a href="/" className="flex-shrink-0" aria-label="weFixPDF home">
          <WeFixPDFLogo size="sm" />
        </a>

        {/* ── Desktop center nav ── */}
        <div className="hidden lg:flex items-center gap-1">

          {/* Tool category dropdowns */}
          {categories.map((cat) => {
            const cols = cat.label === "PDF Tools" ? 3 : 2;
            const width = cat.label === "PDF Tools" ? "w-[660px]" : "w-[480px]";
            const viewAllHref = cat.label === "PDF Tools" ? "/tools/pdf" : cat.label === "Image Tools" ? "/tools/image" : "/tools/developer";
            return (
              <div key={cat.label} className="relative group/item">
                <button className="flex items-center gap-1 px-3 py-2 text-[14px] font-medium text-[#4B5563] dark:text-[#94A3B8] hover:text-[#0F0F0F] dark:hover:text-white transition-colors rounded-md hover:bg-[rgba(0,0,0,0.04)] dark:hover:bg-[rgba(255,255,255,0.06)]">
                  {cat.label}
                  <ChevronDown className="w-3.5 h-3.5 transition-transform duration-150 group-hover/item:rotate-180" aria-hidden="true" />
                </button>

                <div className={`${dropdownBase} ${width}`}>
                  <div className="bg-white dark:bg-[#111113] border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.4)] overflow-hidden">
                    {/* Scrollable grid */}
                    <div className={`p-2 grid gap-0.5 max-h-[420px] overflow-y-auto`} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
                      {cat.loading ? (
                        <SkeletonItems />
                      ) : cat.items.length === 0 ? (
                        <p className={`col-span-${cols} py-4 text-center text-[13px] text-[#6B7280]`}>No tools available</p>
                      ) : (
                        cat.items.map((item) => (
                          <a
                            key={item.href}
                            href={item.href}
                            className="flex flex-col gap-0.5 px-3 py-2.5 rounded-lg hover:bg-[rgba(79,110,219,0.06)] dark:hover:bg-[rgba(123,154,255,0.08)] transition-colors group/link"
                          >
                            <span className="text-[13px] font-medium text-[#0F0F0F] dark:text-[#F8FAFC] group-hover/link:text-[#4f6edb] dark:group-hover/link:text-[#7B9AFF] transition-colors leading-snug">
                              {item.label}
                            </span>
                            <span className="text-[11px] text-[#6B7280] dark:text-[#64748B] leading-snug line-clamp-1">{item.description}</span>
                          </a>
                        ))
                      )}
                    </div>
                    {/* Footer link */}
                    {!cat.loading && cat.items.length > 0 && (
                      <div className="border-t border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)] px-4 py-2.5 flex items-center justify-between">
                        <span className="text-[11px] text-[#6B7280]">{cat.items.length} tools available</span>
                        <a href={viewAllHref} className="text-[12px] font-medium text-[#4f6edb] dark:text-[#7B9AFF] hover:underline">
                          View all {cat.label} →
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Resources dropdown */}
          <div className="relative group/item">
            <button className="flex items-center gap-1 px-3 py-2 text-[14px] font-medium text-[#4B5563] dark:text-[#94A3B8] hover:text-[#0F0F0F] dark:hover:text-white transition-colors rounded-md hover:bg-[rgba(0,0,0,0.04)] dark:hover:bg-[rgba(255,255,255,0.06)]">
              Resources
              <ChevronDown className="w-3.5 h-3.5 transition-transform duration-150 group-hover/item:rotate-180" />
            </button>
            <div className={`${dropdownBase} w-52`}>
              <div className="bg-white dark:bg-[#111113] border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.4)] p-2 flex flex-col gap-0.5">
                {RESOURCES.map((r) => (
                  <a
                    key={r.href}
                    href={r.href}
                    className="flex flex-col gap-0.5 px-3 py-2 rounded-lg hover:bg-[rgba(79,110,219,0.06)] dark:hover:bg-[rgba(123,154,255,0.08)] transition-colors group/link"
                  >
                    <span className="text-[13px] font-medium text-[#0F0F0F] dark:text-[#F8FAFC] group-hover/link:text-[#4f6edb] dark:group-hover/link:text-[#7B9AFF] transition-colors">
                      {r.label}
                    </span>
                    <span className="text-[11px] text-[#6B7280] dark:text-[#64748B]">{r.desc}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Desktop right ── */}
        <div className="hidden lg:flex items-center gap-2">
          <a
            href="/tools"
            className="px-3 py-2 text-[14px] font-medium text-[#4B5563] dark:text-[#94A3B8] hover:text-[#0F0F0F] dark:hover:text-white transition-colors rounded-md hover:bg-[rgba(0,0,0,0.04)] dark:hover:bg-[rgba(255,255,255,0.06)]"
          >
            All Tools
          </a>
          <div className="w-px h-4 bg-[rgba(0,0,0,0.1)] dark:bg-[rgba(255,255,255,0.12)] mx-1" />
          <button
            onClick={toggleTheme}
            className="w-8 h-8 flex items-center justify-center rounded-md text-[#6B7280] dark:text-[#94A3B8] hover:text-[#0F0F0F] dark:hover:text-white hover:bg-[rgba(0,0,0,0.04)] dark:hover:bg-[rgba(255,255,255,0.06)] transition-colors"
            aria-label="Toggle theme"
          >
            <Sun  className="w-4 h-4 hidden dark:block" />
            <Moon className="w-4 h-4 block dark:hidden" />
          </button>
        </div>

        {/* ── Mobile controls ── */}
        <div className="flex lg:hidden items-center gap-1.5">
          <button
            onClick={toggleTheme}
            className="w-8 h-8 flex items-center justify-center rounded-md text-[#6B7280] dark:text-[#94A3B8] hover:text-[#0F0F0F] dark:hover:text-white hover:bg-[rgba(0,0,0,0.04)] dark:hover:bg-[rgba(255,255,255,0.06)] transition-colors"
            aria-label="Toggle theme"
          >
            <Sun  className="w-4 h-4 hidden dark:block" />
            <Moon className="w-4 h-4 block dark:hidden" />
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-8 h-8 flex items-center justify-center rounded-md text-[#6B7280] dark:text-[#94A3B8] hover:text-[#0F0F0F] dark:hover:text-white hover:bg-[rgba(0,0,0,0.04)] dark:hover:bg-[rgba(255,255,255,0.06)] transition-colors"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-[60px] inset-x-0 bg-white dark:bg-[#09090b] border-b border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] shadow-[0_8px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.4)] z-40 max-h-[80vh] overflow-y-auto">
          <div className="max-w-6xl mx-auto px-4 py-3 space-y-0.5">
            {/* Home */}
            <a
              href="/"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 text-[14px] font-medium text-[#0F0F0F] dark:text-[#F8FAFC] rounded-lg hover:bg-[rgba(0,0,0,0.04)] dark:hover:bg-[rgba(255,255,255,0.06)] transition-colors"
            >
              Home
            </a>

            {/* Category sections */}
            {categories.map((cat) => (
              <div key={cat.label}>
                <button
                  onClick={() => setOpenCategory(openCategory === cat.label ? null : cat.label)}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-[14px] font-medium text-[#0F0F0F] dark:text-[#F8FAFC] rounded-lg hover:bg-[rgba(0,0,0,0.04)] dark:hover:bg-[rgba(255,255,255,0.06)] transition-colors"
                >
                  {cat.label}
                  <ChevronDown className={`w-4 h-4 text-[#6B7280] transition-transform duration-150 ${openCategory === cat.label ? 'rotate-180' : ''}`} />
                </button>

                {openCategory === cat.label && (
                  <div className="pl-3 pb-2">
                    {cat.loading ? (
                      <div className="px-3 py-2 text-[13px] text-[#6B7280]">Loading…</div>
                    ) : (
                      <>
                        <div className="grid grid-cols-2 gap-0.5">
                          {cat.items.map((item) => (
                            <a
                              key={item.href}
                              href={item.href}
                              onClick={() => setMobileOpen(false)}
                              className="block px-3 py-2 text-[13px] font-medium text-[#4B5563] dark:text-[#94A3B8] hover:text-[#4f6edb] dark:hover:text-[#7B9AFF] rounded-lg hover:bg-[rgba(79,110,219,0.04)] dark:hover:bg-[rgba(123,154,255,0.08)] transition-colors"
                            >
                              {item.label}
                            </a>
                          ))}
                        </div>
                        <a
                          href={cat.label === "PDF Tools" ? "/tools/pdf" : cat.label === "Image Tools" ? "/tools/image" : "/tools/developer"}
                          onClick={() => setMobileOpen(false)}
                          className="block px-3 pt-2.5 pb-1 text-[12px] font-semibold text-[#4f6edb] dark:text-[#7B9AFF] hover:underline"
                        >
                          View all {cat.label} →
                        </a>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Resource links */}
            {RESOURCES.map((r) => (
              <a
                key={r.href}
                href={r.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 text-[14px] font-medium text-[#4B5563] dark:text-[#94A3B8] rounded-lg hover:bg-[rgba(0,0,0,0.04)] dark:hover:bg-[rgba(255,255,255,0.06)] hover:text-[#0F0F0F] dark:hover:text-white transition-colors"
              >
                {r.label}
              </a>
            ))}

            <div className="pt-2 mt-2 border-t border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
              <a
                href="/tools"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 text-[14px] font-medium text-[#4f6edb] rounded-lg hover:bg-[rgba(79,110,219,0.04)] transition-colors"
              >
                All Tools →
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
