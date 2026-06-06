'use client';

import { useState, useCallback } from 'react';
import { ToolShell, CopyButton, SelectChip } from './SplitEditorPane';

const SAMPLE = `select u.id,u.name,u.email,o.total from users u inner join orders o on u.id=o.user_id where o.total>100 and u.active=1 group by u.id order by o.total desc limit 10`;

const BREAK_BEFORE = [
  'SELECT','FROM','WHERE','LEFT JOIN','RIGHT JOIN','INNER JOIN','FULL OUTER JOIN','CROSS JOIN','JOIN',
  'GROUP BY','ORDER BY','HAVING','LIMIT','OFFSET','UNION ALL','UNION','INSERT INTO','VALUES',
  'UPDATE','SET','DELETE FROM','CREATE TABLE','ALTER TABLE','DROP TABLE','WITH','ON',
];

const INDENT_AFTER  = ['SELECT','WITH'];
const CONTINUATION  = ['AND','OR'];

function sqlKeywordRegex(kw: string) {
  return new RegExp(`(?<![\\w.])${kw.replace(/ /g,'\\s+')}(?![\\w])`, 'gi');
}

function formatSql(raw: string, indent: string, kwCase: 'UPPER'|'lower'): string {
  const strings: string[] = [];
  let sql = raw.replace(/'[^']*'|"[^"]*"`/g, m => { strings.push(m); return `__STR${strings.length - 1}__`; });

  sql = sql.replace(/\s+/g, ' ').trim();

  for (const kw of BREAK_BEFORE) {
    const replacement = kwCase === 'UPPER' ? kw : kw.toLowerCase();
    sql = sql.replace(sqlKeywordRegex(kw), ` \n${replacement} `);
  }

  for (const kw of CONTINUATION) {
    const replacement = kwCase === 'UPPER' ? kw : kw.toLowerCase();
    sql = sql.replace(sqlKeywordRegex(kw), `\n${indent}${replacement} `);
  }

  const OTHER_KW = ['AS','IS','NULL','NOT','IN','LIKE','BETWEEN','EXISTS','ALL','ANY','DISTINCT','CASE','WHEN','THEN','ELSE','END','ASC','DESC'];
  for (const kw of OTHER_KW) {
    const replacement = kwCase === 'UPPER' ? kw : kw.toLowerCase();
    sql = sql.replace(new RegExp(`\\b${kw}\\b`, 'gi'), replacement);
  }

  for (const kw of INDENT_AFTER) {
    const k = kwCase === 'UPPER' ? kw : kw.toLowerCase();
    sql = sql.replace(new RegExp(`\\n${k} `, 'g'), `\n${k}\n${indent}`);
  }

  sql = sql.replace(/,\s*/g, `,\n${indent}`);

  const lines = sql.split('\n').map(l => l.trimEnd()).filter(l => l.trim());
  return lines.join('\n');
}

type Dialect = 'MySQL' | 'PostgreSQL' | 'SQLite' | 'MSSQL';
type KwCase  = 'UPPER' | 'lower';
type Indent  = '2' | '4' | 'tab';

export default function SqlFormatterTool() {
  const [input,   setInput]   = useState('');
  const [output,  setOutput]  = useState('');
  const [dialect, setDialect] = useState<Dialect>('MySQL');
  const [kwCase,  setKwCase]  = useState<KwCase>('UPPER');
  const [indentSz,setIndentSz]= useState<Indent>('2');

  const getIndent = () => indentSz === 'tab' ? '\t' : ' '.repeat(parseInt(indentSz));

  const format = useCallback(() => {
    if (!input.trim()) return;
    try {
      setOutput(formatSql(input, getIndent(), kwCase));
    } catch {
      setOutput('/* Could not format — check your SQL */');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, kwCase, indentSz]);

  const iconBtn = 'inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded transition-colors bg-[rgba(0,0,0,0.05)] dark:bg-[rgba(255,255,255,0.07)] text-[var(--text-muted)] hover:text-[var(--text)]';

  return (
    <ToolShell>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <SelectChip label="Dialect" value={dialect} onChange={v => setDialect(v as Dialect)}
          options={(['MySQL','PostgreSQL','SQLite','MSSQL'] as Dialect[]).map(d => ({ value: d, label: d }))} />
        <SelectChip label="Indent" value={indentSz} onChange={v => setIndentSz(v as Indent)}
          options={[{ value:'2', label:'2 spaces' },{ value:'4', label:'4 spaces' },{ value:'tab', label:'Tab' }]} />
        <div className="inline-flex rounded-lg border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] overflow-hidden text-[11px] font-medium">
          {(['UPPER','lower'] as KwCase[]).map(k => (
            <button key={k} onClick={() => setKwCase(k)}
              className={`px-2.5 py-1.5 transition-colors font-mono ${kwCase === k ? 'bg-[#7C3AED] text-white' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}>
              {k}
            </button>
          ))}
        </div>
        <button onClick={() => { setInput(SAMPLE); setOutput(''); }}
          className={iconBtn}>Sample</button>
        <button
          onClick={format}
          disabled={!input.trim()}
          className="ml-auto px-4 py-1.5 rounded-lg text-[12px] font-semibold bg-[#7C3AED] text-white hover:bg-[#6d28d9] disabled:opacity-40 transition-colors">
          Format SQL
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#7C3AED]" /><span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>SQL Input</span></div>
            {input && <button onClick={() => { setInput(''); setOutput(''); }} className={iconBtn}>Clear</button>}
          </div>
          <textarea value={input} onChange={e => setInput(e.target.value)} spellCheck={false}
            placeholder="Paste your SQL here…"
            className="flex-1 resize-none font-mono text-[12px] p-4 bg-transparent outline-none"
            style={{ minHeight: 320, color: 'var(--text)', caretColor: 'var(--text)' }} />
        </div>

        <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#163863]" /><span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>Formatted SQL</span></div>
            {output && <CopyButton text={output} />}
          </div>
          <pre className="flex-1 font-mono text-[12px] p-4 overflow-auto" style={{ minHeight: 320, color: 'var(--text)' }}>{output || <span style={{ color: 'var(--text-subtle)' }}>Formatted output appears here after clicking Format SQL…</span>}</pre>
        </div>
      </div>
    </ToolShell>
  );
}
