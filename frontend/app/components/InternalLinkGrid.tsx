// Shared reusable internal-link grid used on tool, blog, compare, use-case, and format pages.

type ColorVariant = "blue" | "violet" | "orange" | "emerald";

type InternalLink = { name: string; url: string };

type LinkGridProps = {
  title: string;
  badge: string;
  links: InternalLink[];
  color: ColorVariant;
};

const COLOR_MAP: Record<ColorVariant, {
  bar: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  hoverBorder: string;
  icon: string;
  hoverText: string;
}> = {
  blue: {
    bar:         "bg-blue-500",
    badgeBg:     "bg-blue-500/10",
    badgeBorder: "border-blue-500/20",
    badgeText:   "text-blue-600 dark:text-blue-400",
    hoverBorder: "hover:border-blue-500/40",
    icon:        "text-blue-500",
    hoverText:   "group-hover:text-blue-600 dark:group-hover:text-blue-400",
  },
  violet: {
    bar:         "bg-violet-500",
    badgeBg:     "bg-violet-500/10",
    badgeBorder: "border-violet-500/20",
    badgeText:   "text-violet-600 dark:text-violet-400",
    hoverBorder: "hover:border-violet-500/40",
    icon:        "text-violet-500",
    hoverText:   "group-hover:text-violet-600 dark:group-hover:text-violet-400",
  },
  orange: {
    bar:         "bg-orange-500",
    badgeBg:     "bg-orange-500/10",
    badgeBorder: "border-orange-500/20",
    badgeText:   "text-orange-600 dark:text-orange-400",
    hoverBorder: "hover:border-orange-500/40",
    icon:        "text-orange-500",
    hoverText:   "group-hover:text-orange-600 dark:group-hover:text-orange-400",
  },
  emerald: {
    bar:         "bg-emerald-500",
    badgeBg:     "bg-emerald-500/10",
    badgeBorder: "border-emerald-500/20",
    badgeText:   "text-emerald-600 dark:text-emerald-400",
    hoverBorder: "hover:border-emerald-500/40",
    icon:        "text-emerald-500",
    hoverText:   "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
  },
};

export default function InternalLinkGrid({ title, badge, links, color }: LinkGridProps) {
  if (!links || links.length === 0) return null;
  const c = COLOR_MAP[color];
  return (
    <section>
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-1 h-8 rounded-full ${c.bar}`} />
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {title}
          </h2>
          <span className={`inline-flex px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest border ${c.badgeBg} ${c.badgeBorder} ${c.badgeText}`}>
            {badge}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {links.slice(0, 10).map((link, i) => (
          <a
            key={i}
            href={link.url}
            className={`group flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 hover:shadow-md transition-all duration-200 ${c.hoverBorder}`}
          >
            <svg className={`w-3.5 h-3.5 shrink-0 ${c.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className={`text-slate-700 dark:text-slate-300 font-medium text-sm transition-colors leading-snug ${c.hoverText}`}>
              {link.name}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
