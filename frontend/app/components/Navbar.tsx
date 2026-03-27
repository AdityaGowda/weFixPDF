"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { ChevronDown, Sun, Moon } from "lucide-react";
import Image from "next/image";
import { getToolListings, type ToolListing } from "@/app/lib/seo/seoApi";

interface NavItem {
  label: string;
  href: string;
  description: string;
}

interface NavCategory {
  label: string;
  items: NavItem[];
  loading?: boolean;
}

const STATIC_NAV_CATEGORIES: NavCategory[] = [
  { label: "Image Tools", items: [], loading: true },
  { label: "PDF Tools", items: [], loading: true },
];

function NavItemSkeleton() {
  return (
    <div className="flex flex-col gap-2 p-4 rounded-2xl animate-pulse">
      <div className="h-3.5 w-28 bg-slate-200 dark:bg-slate-700 rounded-md" />
      <div className="h-2.5 w-40 bg-slate-100 dark:bg-slate-800 rounded-md" />
    </div>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [navCategories, setNavCategories] = useState<NavCategory[]>(STATIC_NAV_CATEGORIES);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Non-blocking: navbar renders immediately, items populate when ready
  useEffect(() => {
    getToolListings().then((res: ToolListing[]) => {
      setNavCategories((prev) =>
        prev.map((category) => ({
          ...category,
          loading: false,
          items: res
            .filter((tool) => tool.type === category.label)
            .map((tool) => ({
              label: tool.name,
              href: tool.url,
              description: tool.description,
            })),
        }))
      );
    }).catch(() => {
      // On error, just stop loading — show nothing gracefully
      setNavCategories((prev) =>
        prev.map((c) => ({ ...c, loading: false }))
      );
    });
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  const toggleCategory = (label: string) => {
    setOpenCategory(openCategory === label ? null : label);
  };

  return (
    <nav
      className={`
        sticky top-0 z-50 transition-all duration-500 px-2 max-[950px]:py-1
        ${
        scrolled
          ? "bg-white/70 dark:bg-black/80 border-b border-slate-200/50 dark:border-white/10 shadow-2xl dark:shadow-black/50"
          : "bg-transparent border-b border-transparent shadow-none"
        }
      `}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between max-[950px]:py-1">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group">
          <div className="relative w-full h-12 overflow-hidden items-center justify-start flex transition-transform duration-300 gap-4 max-[950px]:pl-1">
            <Image src="/logo.svg" alt="weFixPDF Logo" width={38} height={38} className="dark:hidden" priority style={{ width: "38px", height: "auto" }} />
            <Image src="/darklogo.svg" alt="weFixPDF Logo" width={40} height={40} className="hidden dark:block" priority style={{ width: "40px", height: "auto" }} />
            <Image
              src="/weFixPDF.png"
              alt="weFixPDF"
              width={140}
              height={38}
              className="object-contain max-[950px]:hidden md:block"
              priority
              style={{ width: "140px", height: "auto" }}
            />
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          <a href="/" className="text-sm font-bold text-slate-500 hover:text-brand-primary transition-colors py-6">
            Home
          </a>

          {navCategories.map((category) => (
            <div key={category.label} className="relative group/nav">
              <button className="flex items-center gap-1 text-sm font-bold text-slate-500 hover:text-brand-primary transition-colors py-6">
                {category.label}
                <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover/nav:-rotate-180" />
              </button>

              <div className="absolute top-[80%] left-1/2 -translate-x-1/2 pt-4 opacity-0 scale-95 pointer-events-none group-hover/nav:opacity-100 group-hover/nav:scale-100 group-hover/nav:pointer-events-auto duration-300 z-50">
                <div className="w-[520px] bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-200/50 dark:border-white/0 shadow-2xl grid grid-cols-2 gap-2 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent pointer-events-none" />

                  {category.loading ? (
                    // Skeleton placeholders while loading
                    <>
                      <NavItemSkeleton />
                      <NavItemSkeleton />
                      <NavItemSkeleton />
                      <NavItemSkeleton />
                    </>
                  ) : category.items.length === 0 ? (
                    <p className="col-span-2 text-center text-sm text-slate-400 py-4">No tools available</p>
                  ) : (
                    category.items.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        className="relative z-10 flex flex-col gap-1.5 p-4 rounded-2xl hover:bg-white dark:hover:bg-white/10 shadow-sm hover:shadow-md transition-all group/item"
                        onClick={(e) => item.href === "#" && e.preventDefault()}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-bold text-slate-900 dark:text-white group-hover/item:text-brand-primary transition-colors">
                            {item.label}
                          </span>
                          <span className="text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
                            Active
                          </span>
                        </div>
                        <span className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                          {item.description}
                        </span>
                      </a>
                    ))
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Resources dropdown */}
          <div className="relative group/nav">
            <button className="flex items-center gap-1 text-sm font-bold text-slate-500 hover:text-brand-primary transition-colors py-6">
              Resources
              <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover/nav:-rotate-180" />
            </button>
            <div className="absolute top-[80%] left-1/2 -translate-x-1/2 pt-4 opacity-0 scale-95 pointer-events-none group-hover/nav:opacity-100 group-hover/nav:scale-100 group-hover/nav:pointer-events-auto duration-300 z-50">
              <div className="w-64 bg-white dark:bg-slate-900 rounded-3xl p-3 border border-slate-200/50 dark:border-white/0 shadow-2xl flex flex-col gap-1">
                {[
                  { label: "Blog", href: "/blog", desc: "Guides & tutorials" },
                  { label: "Compare Tools", href: "/compare", desc: "weFixPDF vs alternatives" },
                  { label: "Use Cases", href: "/use-cases", desc: "By profession & workflow" },
                  { label: "Help Center", href: "/help", desc: "FAQs & troubleshooting" },
                  { label: "Security", href: "/security", desc: "How we protect your files" },
                ].map((r) => (
                  <a
                    key={r.href}
                    href={r.href}
                    className="flex flex-col gap-0.5 px-4 py-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group/item"
                  >
                    <span className="text-sm font-bold text-slate-900 dark:text-white group-hover/item:text-brand-primary transition-colors">
                      {r.label}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">{r.desc}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <a href="/about" className="text-sm font-bold text-slate-500 hover:text-brand-primary transition-colors py-6">
            About
          </a>

          <div className="h-4 w-px bg-slate-200 dark:bg-white/10 mx-2" />
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 transition-all"
          >
            <Sun className="w-5 h-5 hidden dark:block" />
            <Moon className="w-5 h-5 block dark:hidden" />
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex lg:hidden items-center gap-2 sm:gap-3">
          <button
            onClick={toggleTheme}
            className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 text-lg sm:text-xl"
            aria-label="Toggle Theme"
          >
            <Sun className="w-5 h-5 hidden dark:block" />
            <Moon className="w-5 h-5 block dark:hidden" />
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 text-slate-900 dark:text-white text-xl sm:text-2xl"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div
        className={`
          lg:hidden absolute top-full left-0 right-0 m-2 sm:m-4 p-2 sm:p-4 rounded-[2rem] sm:rounded-3xl
          glass dark:glass-dark border border-slate-200/50 dark:border-white/10 shadow-3xl
          transition-all duration-500 origin-top
          ${isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-4 pointer-events-none"}
        `}
      >
        <div className="flex flex-col gap-1 max-h-[75vh] overflow-y-auto custom-scrollbar px-1">
          <a
            href="/"
            onClick={() => setIsOpen(false)}
            className="px-5 py-3 rounded-xl text-base font-bold text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all"
          >
            Home
          </a>

          {navCategories.map((category) => (
            <div key={category.label} className="flex flex-col">
              <button
                onClick={() => toggleCategory(category.label)}
                className="flex items-center justify-between px-5 py-3 rounded-xl text-base font-bold text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all"
              >
                {category.label}
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${openCategory === category.label ? "-rotate-180" : ""}`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${openCategory === category.label ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
                  }`}
              >
                <div className="flex flex-col gap-1.5 px-3 pb-3">
                  {category.loading ? (
                    // Mobile skeletons
                    [1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="flex flex-col gap-1.5 px-5 py-3 rounded-xl bg-white/40 dark:bg-black/20 border border-slate-100/50 dark:border-white/5 animate-pulse"
                      >
                        <div className="h-3 w-32 bg-slate-200 dark:bg-slate-700 rounded" />
                        <div className="h-2.5 w-44 bg-slate-100 dark:bg-slate-800 rounded" />
                      </div>
                    ))
                  ) : (
                    category.items.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex flex-col gap-0.5 px-5 py-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-all bg-white/40 dark:bg-black/20 border border-slate-100/50 dark:border-white/5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-slate-900 dark:text-white">{item.label}</span>
                          <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                            Active
                          </span>
                        </div>
                        <span className="text-[10px] leading-relaxed text-slate-500 dark:text-slate-400">
                          {item.description}
                        </span>
                      </a>
                    ))
                  )}
                </div>
              </div>
            </div>
          ))}

          {[
            { label: "Blog", href: "/blog" },
            { label: "Compare", href: "/compare" },
            { label: "Use Cases", href: "/use-cases" },
            { label: "Help", href: "/help" },
            { label: "Security", href: "/security" },
            { label: "About", href: "/about" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="px-5 py-3 rounded-xl text-base font-bold text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}