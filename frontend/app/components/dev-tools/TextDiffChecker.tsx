'use client';

import { useState, useMemo } from 'react';
import { Trash2 } from 'lucide-react';
import { ToolShell, Panel, EditorTextarea } from './SplitEditorPane';
import { diffLines, type DiffLine } from './converters';

const SAMPLE_A = `function greet(name) {
  console.log("Hello, " + name);
  return true;
}

const users = ["Alice", "Bob"];
users.forEach(greet);`;

const SAMPLE_B = `function greet(name, greeting = "Hello") {
  console.log(greeting + ", " + name + "!");
  return name.length > 0;
}

const users = ["Alice", "Bob", "Carol"];
users.forEach((u) => greet(u));`;

const TYPE_STYLES: Record<DiffLine['type'], string> = {
  same:    'bg-transparent text-[var(--text)]',
  added:   'bg-[#dcfce7] dark:bg-[rgba(16,185,129,0.12)] text-[#166534] dark:text-[#86efac]',
  removed: 'bg-[#fee2e2] dark:bg-[rgba(239,68,68,0.12)] text-[#991b1b] dark:text-[#fca5a5]',
};

const TYPE_PREFIX: Record<DiffLine['type'], string> = {
  same: ' ', added: '+', removed: '−',
};

function DiffOutput({ lines }: { lines: DiffLine[] }) {
  const added = lines.filter((l) => l.type === 'added').length;
  const removed = lines.filter((l) => l.type === 'removed').length;

  return (
    <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden bg-[var(--bg-card)]">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
        <span className="w-2 h-2 rounded-full bg-[#2D5BE3]" />
        <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>Diff Output</span>
        <span className="flex-1" />
        {(added > 0 || removed > 0) && (
          <>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#dcfce7] dark:bg-[rgba(16,185,129,0.15)] text-[#166534] dark:text-[#86efac]">
              +{added} added
            </span>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#fee2e2] dark:bg-[rgba(239,68,68,0.15)] text-[#991b1b] dark:text-[#fca5a5]">
              −{removed} removed
            </span>
          </>
        )}
      </div>
      {/* Lines */}
      <div className="overflow-auto" style={{ maxHeight: 400 }}>
        {lines.length === 0 ? (
          <p className="px-4 py-8 text-center text-[13px]" style={{ color: 'var(--text-subtle)' }}>
            Diff will appear here when both panels have text
          </p>
        ) : (
          <table className="w-full font-mono text-[12px] border-collapse">
            <tbody>
              {lines.map((line, i) => (
                <tr key={i} className={TYPE_STYLES[line.type]}>
                  <td className="select-none text-right pr-2 pl-3 py-0.5 w-8 text-[10px] opacity-40 border-r border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
                    {line.type !== 'added' ? line.lineA ?? '' : ''}
                  </td>
                  <td className="select-none text-right pr-2 pl-1 py-0.5 w-8 text-[10px] opacity-40 border-r border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
                    {line.type !== 'removed' ? line.lineB ?? '' : ''}
                  </td>
                  <td className="select-none pl-2 pr-1 py-0.5 w-5 font-bold opacity-60">
                    {TYPE_PREFIX[line.type]}
                  </td>
                  <td className="py-0.5 pr-4 whitespace-pre-wrap break-all leading-relaxed">
                    {line.text || ' '}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default function TextDiffChecker() {
  const [textA, setTextA] = useState('');
  const [textB, setTextB] = useState('');

  const diffResult = useMemo(() => {
    if (!textA && !textB) return [];
    return diffLines(textA, textB);
  }, [textA, textB]);

  const iconBtn = 'inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded transition-colors bg-[rgba(0,0,0,0.05)] dark:bg-[rgba(255,255,255,0.07)] text-[var(--text-muted)] hover:text-[var(--text)]';

  return (
    <ToolShell>
      {/* Two input panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        <Panel
          label="Original"
          accent="#7C3AED"
          toolbar={
            <>
              <button onClick={() => { setTextA(SAMPLE_A); setTextB(SAMPLE_B); }} className={iconBtn}>Sample</button>
              {textA && <button onClick={() => setTextA('')} className={iconBtn}><Trash2 className="w-3 h-3" /></button>}
            </>
          }
        >
          <EditorTextarea value={textA} onChange={setTextA} placeholder="Paste the original text here…" minHeight={240} />
        </Panel>

        <Panel
          label="Changed"
          accent="#163863"
          toolbar={
            <>
              {textB && <button onClick={() => setTextB('')} className={iconBtn}><Trash2 className="w-3 h-3" /></button>}
            </>
          }
        >
          <EditorTextarea value={textB} onChange={setTextB} placeholder="Paste the revised text here…" minHeight={240} />
        </Panel>
      
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

      {/* Diff output */}
      <DiffOutput lines={diffResult} />
    </ToolShell>
  );
}
