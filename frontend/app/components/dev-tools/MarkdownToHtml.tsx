'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { ToolShell, CopyButton, ToggleChip } from './SplitEditorPane';

const SAMPLE = `# Hello, Markdown!

A **bold** move and *italic* style.

## Table example

| Name     | Role      | Score |
|----------|-----------|-------|
| Alice    | Engineer  | 98    |
| Bob      | Designer  | 87    |

## Task list

- [x] Write markdown
- [x] Preview HTML
- [ ] Ship it

## Code

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

> Blockquotes look great too.

~~Strikethrough~~ via GFM.`;

export default function MarkdownToHtml() {
  const [markdown,  setMarkdown]  = useState(SAMPLE);
  const [showRaw,   setShowRaw]   = useState(false);
  const [rawHtml,   setRawHtml]   = useState('');
  const previewRef = useRef<HTMLDivElement>(null);

  // Capture innerHTML after render for raw HTML view
  useEffect(() => {
    if (previewRef.current) {
      setRawHtml(previewRef.current.innerHTML);
    }
  });

  const iconBtn = 'inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded transition-colors bg-[rgba(0,0,0,0.05)] dark:bg-[rgba(255,255,255,0.07)] text-[var(--text-muted)] hover:text-[var(--text)]';

  return (
    <ToolShell>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Left: Markdown input */}
        <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
              <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>Markdown</span>
            </div>
            <div className="flex gap-1">
              <button onClick={() => setMarkdown(SAMPLE)} className={iconBtn}>Sample</button>
              {markdown && <button onClick={() => setMarkdown('')} className={iconBtn}>Clear</button>}
            </div>
          </div>
          <textarea
            value={markdown}
            onChange={e => setMarkdown(e.target.value)}
            spellCheck={false}
            placeholder="Type Markdown here…"
            className="flex-1 resize-none font-mono text-[13px] p-4 bg-transparent outline-none"
            style={{ minHeight: 420, color: 'var(--text)', caretColor: 'var(--text)' }}
          />
        </div>

        {/* Right: Preview or raw HTML */}
        <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#163863]" />
              <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>{showRaw ? 'Raw HTML' : 'Preview'}</span>
            </div>
            <div className="flex items-center gap-2">
              <ToggleChip label="Raw HTML" checked={showRaw} onChange={setShowRaw} />
              {showRaw && rawHtml && <CopyButton text={rawHtml} />}
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4" style={{ minHeight: 420 }}>
            {showRaw ? (
              <pre className="font-mono text-[11px] leading-relaxed whitespace-pre-wrap break-words" style={{ color: 'var(--text)' }}>
                {rawHtml}
              </pre>
            ) : (
              <div
                ref={previewRef}
                className="prose prose-sm dark:prose-invert max-w-none
                  prose-headings:font-bold prose-headings:text-[var(--text)]
                  prose-p:text-[var(--text)] prose-li:text-[var(--text)]
                  prose-code:text-[#7C3AED] prose-code:bg-[rgba(124,58,237,0.08)] prose-code:px-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                  prose-pre:bg-[var(--surface)] prose-pre:border prose-pre:border-[rgba(0,0,0,0.08)] dark:prose-pre:border-[rgba(255,255,255,0.08)] prose-pre:rounded-xl
                  prose-blockquote:border-l-4 prose-blockquote:border-[#7C3AED] prose-blockquote:text-[var(--text-muted)]
                  prose-table:text-[var(--text)] prose-th:text-[var(--text)] prose-td:text-[var(--text)]
                  prose-a:text-[#7C3AED]"
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                  {markdown || '*Start typing to see a preview…*'}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      
      <div className="mt-8 bg-card border border-base p-6 rounded-xl space-y-4">
        <h3 className="text-[15px] font-semibold text-[color:var(--text)]">🔒 Privacy & Safe Usage</h3>
        <p className="text-[13px] text-[color:var(--text-muted)]">
          <strong>100% Private:</strong> This tool runs entirely in your browser. No data, inputs, or files are sent to our servers or saved anywhere.
        </p>
        <p className="text-[12px] text-[color:var(--text-muted)] opacity-80 border-t border-base pt-4">
          <strong>Disclaimer:</strong> This tool is provided for informational and productivity purposes only. Please verify important results independently.
        </p>
      </div>
    </div>
    </ToolShell>
  );
}
