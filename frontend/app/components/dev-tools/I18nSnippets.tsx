'use client';
import CopyButton from '../CopyButton';
import React, { useState } from 'react';

const snippets = [
  {
    title: 'JavaScript Intl.DateTimeFormat',
    code: `const date = new Date();\nconst formatter = new Intl.DateTimeFormat('en-US', {\n  dateStyle: 'full',\n  timeStyle: 'long'\n});\nconsole.log(formatter.format(date));`,
    desc: 'Standard JS way to format dates according to locale.'
  },
  {
    title: 'JavaScript Intl.NumberFormat',
    code: `const number = 1234567.89;\nconst formatter = new Intl.NumberFormat('de-DE', {\n  style: 'currency',\n  currency: 'EUR'\n});\nconsole.log(formatter.format(number));`,
    desc: 'Format numbers, currencies, and percentages.'
  },
  {
    title: 'React i18next Hook',
    code: `import { useTranslation } from 'react-i18next';\n\nfunction MyComponent() {\n  const { t } = useTranslation();\n  return <h1>{t('welcome_message')}</h1>;\n}`,
    desc: 'Standard hook usage in React with react-i18next.'
  },
  {
    title: 'Next.js Middleware Redirect',
    code: `// middleware.ts\nimport { NextResponse } from 'next/server';\n\nexport function middleware(request) {\n  const { nextUrl: url, headers } = request;\n  const locale = headers.get('accept-language')?.split(',')[0] || 'en';\n  // Logic to redirect to /[locale]/path\n}`,
    desc: 'Handling locale redirects in Next.js Middleware.'
  }
];

export default function I18nSnippets() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">I18N Code Snippets</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Common internationalization patterns for developers.</p>
      </div>

      <div className="space-y-6">
        {snippets.map((s, i) => (
          <div key={i} className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{s.title}</h3>
                <p className="text-xs text-gray-500">{s.desc}</p>
              </div>
              <button
                onClick={() => copyToClipboard(s.code, i)}
                className="text-xs px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 transition-colors font-medium"
              >
                {copiedIndex === i ? 'Copied!' : 'Copy Code'}
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 font-mono text-[13px] text-gray-700 dark:text-gray-300 overflow-x-auto">
              <code>{s.code}</code>
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
