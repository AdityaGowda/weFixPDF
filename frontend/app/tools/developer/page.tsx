import type { Metadata } from 'next';
import Link from 'next/link';
import { getToolListings } from '@/app/lib/seo/seoApi';
import {
  Code, Palette, Braces, KeyRound, ArrowLeftRight, GitCompare,
  FileCode, ArrowRight, CheckCircle2, ChevronRight, Terminal,
  Hash, Globe, Shield, Clock, Wifi, Crop, Binary, FileText,
  AlignLeft, Network, Type, Calculator, Contrast, Database,
  FileJson, Cog,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Developer Tools Online — JSON, YAML, JWT, CSS & More | weFixPDF',
  description:
    '30+ free browser-based developer tools: JSON formatter, YAML converter, JWT decoder, Base64 encoder, regex tester, SQL formatter, CSS unit converter, hash generator and more. No install, no upload, runs locally.',
  alternates: { canonical: 'https://wefixpdf.com/tools/developer' },
  keywords: [
    'free developer tools online',
    'json formatter online free',
    'json to yaml converter free',
    'jwt decoder online',
    'base64 encoder decoder online',
    'regex tester online free',
    'sql formatter online',
    'css unit converter online',
    'hash generator online free',
    'browser based developer tools',
    'online dev tools no sign up',
    'csv to json converter online',
    'yaml to json converter free',
    'unix timestamp converter',
    'ip subnet calculator online',
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Free Developer Tools Online — JSON, YAML, JWT & More | weFixPDF',
    description: '30+ browser-based dev tools: JSON formatter, JWT decoder, regex tester, SQL formatter & more. Runs locally — nothing sent to a server.',
    url: 'https://wefixpdf.com/tools/developer',
    siteName: 'weFixPDF',
    type: 'website',
    images: [{ url: 'https://wefixpdf.com/wfp.png', width: 1200, height: 630, alt: 'weFixPDF — Free Developer Tools' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Developer Tools Online | weFixPDF',
    description: '30+ free browser-based tools: JSON, YAML, JWT, regex, SQL, CSS, Base64 and more.',
    images: ['https://wefixpdf.com/wfp.png'],
    site: '@wefixpdf',
  },
};

const iconMap: Record<string, any> = {
  Code, Palette, Braces, KeyRound, ArrowLeftRight, GitCompare, FileCode,
  Terminal, Hash, Globe, Shield, Clock, Wifi, Crop, Binary, FileText,
  AlignLeft, Network, Type, Calculator, Contrast, Database, FileJson, Cog,
};

const popularSlugs = new Set(['json-formatter', 'jwt-decoder', 'csv-json-converter', 'text-diff-checker']);

const faqs = [
  {
    q: 'I pasted a production JWT into the decoder. Was that a mistake?',
    a: 'No. The decoder runs entirely in your browser — it splits the token on the dots, calls atob() on each part, and displays the JSON. That\'s all JavaScript, local to your tab. Nothing is sent outbound. If you\'re sceptical, open DevTools → Network tab, then paste a token — you\'ll see zero requests fire.',
  },
  {
    q: 'How is this different from running these tools in a terminal?',
    a: 'For most tasks it isn\'t — jq, python -m json.tool, and openssl base64 all do the same thing. The difference is setup. When you\'re on a machine without the right toolchain, a browser tab with a working formatter is faster than installing dependencies or remembering which flag does what. These are convenience tools, not replacements for a real shell.',
  },
  {
    q: 'Why does the JSON Formatter validate as well as format?',
    a: 'Formatting requires parsing first. A JSON parser either succeeds or throws a syntax error with a specific position. Surfacing that error — with the line and column number — is just exposing what the parser already knows. You can\'t format invalid JSON, so the validation step is built in rather than being a separate pass.',
  },
  {
    q: 'The LLM Token Counter gives different counts for different models. Why?',
    a: 'Each model uses a different tokenization vocabulary. GPT-4 uses cl100k_base, Claude uses a different BPE vocabulary, and Gemini uses SentencePiece. The same sentence can tokenize differently depending on which model built the vocabulary. The cost estimate multiplies the model-specific token count by that model\'s per-token rate.',
  },
  {
    q: 'When would I use Text Diff Checker instead of git diff?',
    a: 'When you don\'t have files in a repository to diff. API responses you copied from Slack, two versions of a config pasted from separate sources, before/after for a database migration, prompt text you\'re iterating on — anything that lives in a clipboard rather than a tracked file. No git init, no terminal, works on any two text blobs.',
  },
  {
    q: 'Is there a size limit on what I can process?',
    a: 'No server-side limit — there\'s no server. The practical ceiling is your browser\'s memory. Files up to around 10–20 MB parse quickly in modern browsers. Very large JSON (50 MB+) will be slow to render with syntax highlighting, but it\'ll complete. If you\'re routinely processing huge files, a CLI tool will be faster, but for one-off tasks the browser is fine.',
  },
];

const categories = [
  {
    label: 'Data Format Converters',
    tools: ['csv-json-converter', 'json-to-yaml', 'yaml-to-json', 'json-to-xml', 'xml-to-json'],
  },
  {
    label: 'JSON & Code Tools',
    tools: ['json-formatter', 'sql-formatter', 'markdown-to-html'],
  },
  {
    label: 'Auth & Security',
    tools: ['jwt-decoder', 'hash-generator', 'base64-encoder-decoder'],
  },
  {
    label: 'Web & CSS Utilities',
    tools: ['color-palette-generator', 'color-contrast-checker', 'css-unit-converter', 'og-meta-tag-previewer', 'favicon-generator'],
  },
  {
    label: 'DevOps & Infrastructure',
    tools: ['cron-expression-builder', 'chmod-calculator', 'ip-subnet-calculator', 'unix-timestamp-converter'],
  },
  {
    label: 'Testing & Debugging',
    tools: ['regex-tester', 'text-diff-checker', 'http-header-analyzer', 'api-ping-tester'],
  },
  {
    label: 'Data & AI Utilities',
    tools: ['mock-json-generator', 'env-file-parser', 'llm-token-counter', 'number-base-converter'],
  },
  {
    label: 'Low-Level & Misc',
    tools: ['wasm-analyzer', 'text-to-ascii-art', 'url-parser-builder'],
  },
];

const relatedLinks = [
  { label: 'How to Decode a JWT Token Without a Library', href: '/blog/how-to-decode-jwt-token' },
  { label: 'JSON vs YAML: When to Use Each Format', href: '/blog/json-vs-yaml' },
  { label: 'CRON Expressions Explained — Complete Guide', href: '/blog/cron-expressions-guide' },
  { label: 'Developer Tools for Backend Engineers', href: '/use-cases/developer-tools-for-backend' },
  { label: 'Browser-Based Tools vs Desktop Apps for Developers', href: '/compare/online-vs-desktop-pdf-tools' },
];

function ToolCard({ href, label, desc, icon: Icon, popular }: {
  href: string; label: string; desc: string; icon: any; popular?: boolean;
}) {
  return (
    <Link href={href} className="tool-card group" aria-label={label}>
      <div className="flex items-start justify-between gap-2">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#F7EEFF' }}>
          <Icon className="w-[18px] h-[18px]" color="#B44CFF" strokeWidth={1.75} />
        </div>
        <span className="text-[10px] font-medium px-2 py-0.5 rounded" style={popular ? { background: '#F3E8FF', color: '#7B1FCC' } : { background: '#EAF3DE', color: '#3B6D11' }}>
          {popular ? 'Popular' : 'Free'}
        </span>
      </div>
      <div>
        <h3 className="text-[14px] font-medium leading-snug" style={{ color: 'var(--text)' }}>{label}</h3>
        <p className="text-[12px] mt-0.5 leading-relaxed line-clamp-2" style={{ color: 'var(--text-muted)' }}>{desc}</p>
      </div>
    </Link>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group border-b border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] last:border-0">
      <summary className="flex items-center justify-between py-4 cursor-pointer list-none gap-4">
        <span className="text-[14px] font-medium leading-snug" style={{ color: 'var(--text)' }}>{q}</span>
        <ChevronRight className="w-4 h-4 flex-shrink-0 transition-transform duration-200 group-open:rotate-90" style={{ color: 'var(--text-muted)' }} />
      </summary>
      <p className="pb-4 text-[14px] leading-[1.7]" style={{ color: 'var(--text-muted)' }}>{a}</p>
    </details>
  );
}

export default async function DeveloperHubPage() {
  const allTools = await getToolListings();
  const devToolsRaw = allTools
    .filter((t) => t.type === 'Dev Tools')
    .sort((a, b) => a.position - b.position);

  const toolMap = Object.fromEntries(devToolsRaw.map((t) => [t.slug, t]));

  const allDevTools = devToolsRaw.map((t) => ({
    href: `/tools/${t.slug}`,
    label: t.name,
    desc: t.description,
    icon: iconMap[t.icon_name ?? ''] ?? Code,
    popular: popularSlugs.has(t.slug),
  }));

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Free Developer Tools Online — weFixPDF',
    url: 'https://wefixpdf.com/tools/developer',
    description: 'Complete list of free browser-based developer tools by weFixPDF — JSON, YAML, JWT, regex, SQL and more.',
    numberOfItems: allDevTools.length,
    itemListElement: allDevTools.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.label,
      url: `https://wefixpdf.com${t.href}`,
    })),
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://wefixpdf.com' },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://wefixpdf.com/tools' },
      { '@type': 'ListItem', position: 3, name: 'Developer Tools', item: 'https://wefixpdf.com/tools/developer' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="bg-page">

        {/* ── Hero ── */}
        <section className="border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)] py-14 md:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <nav className="flex items-center gap-2 text-[12px] mb-8" aria-label="Breadcrumb" style={{ color: 'var(--text-muted)' }}>
              <Link href="/" className="hover:underline">Home</Link>
              <span>/</span>
              <Link href="/tools" className="hover:underline">Tools</Link>
              <span>/</span>
              <span style={{ color: 'var(--text)' }}>Developer Tools</span>
            </nav>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-sm" style={{ background: '#B44CFF' }} />
              <p className="text-label">{allDevTools.length} free tools · Runs in browser · No data sent to server</p>
            </div>
            <h1 className="text-hero mb-4" style={{ color: 'var(--text)' }}>
              Free Developer Tools Online
            </h1>
            <p className="text-[17px] leading-[1.75] max-w-2xl" style={{ color: 'var(--text-muted)' }}>
              The data that goes through developer tools is often sensitive — production JWTs, .env files, database
              schemas, API responses. Everything here runs in JavaScript inside your browser tab. No server call,
              no upload, nothing logged. Paste your JSON, decode your JWT, build your CRON — all of it stays local.
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {['Runs locally in browser', 'No data sent to server', 'No sign-up', 'No install', '100% Free'].map((chip) => (
                <span key={chip} className="inline-flex items-center gap-1.5 text-[12px] font-medium px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  <CheckCircle2 className="w-3 h-3 flex-shrink-0" strokeWidth={2} />
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 space-y-16">

          {/* ── Tool grid by category ── */}
          {categories.map((cat) => {
            const catTools = cat.tools
              .map((slug) => toolMap[slug])
              .filter(Boolean)
              .map((t) => ({
                href: `/tools/${t.slug}`,
                label: t.name,
                desc: t.description,
                icon: iconMap[t.icon_name ?? ''] ?? Code,
                popular: popularSlugs.has(t.slug),
              }));
            if (catTools.length === 0) return null;
            return (
              <section key={cat.label}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#B44CFF' }} />
                  <h2 className="text-[16px] font-bold" style={{ color: 'var(--text)' }}>{cat.label}</h2>
                  <div className="h-px flex-1 bg-[rgba(0,0,0,0.06)] dark:bg-[rgba(255,255,255,0.06)]" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {catTools.map((t) => <ToolCard key={t.href} {...t} />)}
                </div>
              </section>
            );
          })}

          {/* ── Why browser-based ── */}
          <section className="space-y-5">
            <h2 className="text-[22px] font-bold" style={{ color: 'var(--text)' }}>
              Why these tools run in your browser, not on a server
            </h2>
            <p className="text-[15px] leading-[1.75]" style={{ color: 'var(--text-muted)' }}>
              Most online developer tools work by sending your input to a server, processing it there, and returning the result.
              That's fine for a random string. It's less fine for a JWT from your production auth system, an .env file with
              database credentials, or a SQL schema you'd rather not copy to a third-party server. Every tool here runs as
              JavaScript in your browser tab. Open the Network panel — you won't see your data leave.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  title: 'Nothing leaves your tab',
                  body: 'No POST request with your JSON. No server log entry with your JWT. No S3 bucket storing your .env. The browser\'s JavaScript engine does the processing and writes the result directly into the DOM.',
                  accent: '#B44CFF',
                },
                {
                  title: 'Works on restricted networks',
                  body: 'Once the page loads, the tools keep working with no internet. Useful on corporate networks that block external API calls, on VPNs, or anywhere the network is unreliable.',
                  accent: '#10B981',
                },
                {
                  title: 'No waiting for a response',
                  body: 'Local processing means no network round-trip. Output updates as you type. A 5 MB JSON file formats in under a second. The latency is your CPU, not a distant server.',
                  accent: '#2D5BE3',
                },
              ].map((item) => (
                <div key={item.title} className="p-5 rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] bg-card space-y-2">
                  <p className="text-[14px] font-semibold" style={{ color: item.accent }}>{item.title}</p>
                  <p className="text-[13px] leading-[1.65]" style={{ color: 'var(--text-muted)' }}>{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Common dev tasks ── */}
          <section className="space-y-5">
            <h2 className="text-[22px] font-bold" style={{ color: 'var(--text)' }}>
              What developers use these for
            </h2>
            <ul className="space-y-3">
              {[
                { task: 'Minified API response that\'s unreadable — format and check if it\'s valid JSON', tool: 'JSON Formatter', href: '/tools/json-formatter' },
                { task: 'Converting a JSON config to YAML for a Kubernetes manifest or GitHub Actions workflow', tool: 'JSON to YAML', href: '/tools/json-to-yaml' },
                { task: 'JWT from an auth log — check which claims it contains and when it expires', tool: 'JWT Decoder', href: '/tools/jwt-decoder' },
                { task: 'SHA-256 or MD5 hash for a string, a secret, or a file checksum', tool: 'Hash Generator', href: '/tools/hash-generator' },
                { task: 'CRON expression that\'s firing at unexpected times — see what it actually means in plain English', tool: 'Cron Expression Builder', href: '/tools/cron-expression-builder' },
                { task: 'Encode an image or binary file as Base64 for a data URI or JSON payload', tool: 'Base64 Encoder / Decoder', href: '/tools/base64-encoder-decoder' },
                { task: 'Regex that works in one language but not another — test it live with real input', tool: 'Regex Tester', href: '/tools/regex-tester' },
                { task: 'Spot duplicate keys, wrong values, or syntax errors in an .env file before deploying', tool: '.env File Parser', href: '/tools/env-file-parser' },
                { task: 'Prompt that\'s hitting token limits — check the count per model before the API call', tool: 'LLM Token Counter', href: '/tools/llm-token-counter' },
                { task: 'API response missing HSTS, CSP, or X-Frame-Options — check what headers came back', tool: 'HTTP Header Analyzer', href: '/tools/http-header-analyzer' },
              ].map(({ task, tool, href }) => (
                <li key={task} className="flex items-start gap-3 text-[14px]">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" color="#B44CFF" strokeWidth={2} />
                  <span style={{ color: 'var(--text-muted)' }}>
                    {task} —{' '}
                    <Link href={href} className="font-medium underline underline-offset-2 decoration-dotted hover:text-[#B44CFF] transition-colors" style={{ color: 'var(--text)' }}>
                      {tool}
                    </Link>
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* ── Related reading ── */}
          <section className="space-y-4">
            <h2 className="text-[20px] font-bold" style={{ color: 'var(--text)' }}>Guides &amp; Related Reading</h2>
            <div className="grid sm:grid-cols-2 gap-2">
              {relatedLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-2 p-3 rounded-lg border border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)] bg-card hover:border-fuchsia-400/30 transition-colors text-[13px] font-medium group"
                  style={{ color: 'var(--text)' }}
                >
                  <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" style={{ color: '#B44CFF' }} />
                  {label}
                </Link>
              ))}
            </div>
          </section>

          {/* ── FAQ ── */}
          <section>
            <h2 className="text-[22px] font-bold mb-6" style={{ color: 'var(--text)' }}>
              Questions about the developer tools
            </h2>
            <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] bg-card px-6">
              {faqs.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
            </div>
          </section>

          {/* ── Other categories ── */}
          <section>
            <h2 className="text-[20px] font-bold mb-4" style={{ color: 'var(--text)' }}>Explore Other Tool Categories</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <Link href="/tools/pdf" className="flex items-center justify-between p-4 rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] bg-card hover:border-blue-400/40 transition-colors group">
                <div>
                  <p className="text-[14px] font-semibold" style={{ color: 'var(--text)' }}>PDF Tools</p>
                  <p className="text-[12px] mt-0.5" style={{ color: 'var(--text-muted)' }}>Compress, convert, merge, split, protect PDFs</p>
                </div>
                <ArrowRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" style={{ color: '#2D5BE3' }} />
              </Link>
              <Link href="/tools/image" className="flex items-center justify-between p-4 rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] bg-card hover:border-emerald-400/40 transition-colors group">
                <div>
                  <p className="text-[14px] font-semibold" style={{ color: 'var(--text)' }}>Image Tools</p>
                  <p className="text-[12px] mt-0.5" style={{ color: 'var(--text-muted)' }}>Compress &amp; convert JPG, PNG, WEBP, HEIC</p>
                </div>
                <ArrowRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" style={{ color: '#10B981' }} />
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
