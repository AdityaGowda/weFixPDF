'use client';

import { useState, useCallback } from 'react';
import { ToolShell, CopyButton } from './SplitEditorPane';

const WORDS = [
  'lorem','ipsum','dolor','sit','amet','consectetur','adipiscing','elit',
  'sed','do','eiusmod','tempor','incididunt','ut','labore','et','dolore','magna',
  'aliqua','enim','ad','minim','veniam','quis','nostrud','exercitation','ullamco',
  'laboris','nisi','aliquip','ex','ea','commodo','consequat','duis','aute','irure',
  'in','reprehenderit','voluptate','velit','esse','cillum','eu','fugiat','nulla',
  'pariatur','excepteur','sint','occaecat','cupidatat','non','proident','sunt',
  'culpa','qui','officia','deserunt','mollit','anim','id','est','laborum',
  'curabitur','pretium','tincidunt','lacus','nunc','pulvinar','sapien','ligula',
  'egestas','feugiat','risus','maecenas','malesuada','praesent','commodo',
  'cursus','magna','vel','scelerisque','nisl','consectetur','purus','at',
  'volutpat','volutpat','blandit','tempus','porttitor','facilisi','fermentum',
  'nisl','pretium','fusce','arcu','lectus','bibendum','arcu','pharetra',
  'congue','quisque','sagittis','purus','sit','amet','volutpat','consequat',
  'mauris','nunc','congue','nisi','vitae','suscipit','tellus','mauris','a',
  'diam','maecenas','sed','enim','ut','sem','viverra','aliquet','eget','sit',
  'amet','tellus','cras','adipiscing','enim','eu','turpis','egestas','pretium',
  'aenean','pharetra','magna','ac','placerat','vestibulum','lectus','mauris',
  'fames','ac','turpis','egestas','sed','tempus','urna','et','pharetra',
];

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomWord(): string {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

function generateSentence(): string {
  const wordCount = randomInt(6, 20);
  const words: string[] = [capitalize(randomWord())];
  for (let i = 1; i < wordCount; i++) {
    const prev = words[words.length - 1];
    if (i > 2 && i < wordCount - 1 && Math.random() < 0.15 && !prev.endsWith(',')) {
      words[words.length - 1] = prev + ',';
    }
    words.push(randomWord());
  }
  return words.join(' ') + '.';
}

function generateParagraph(minSentences = 4, maxSentences = 8): string {
  const count = randomInt(minSentences, maxSentences);
  return Array.from({ length: count }, generateSentence).join(' ');
}

const STANDARD_START = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

type Mode = 'paragraphs' | 'sentences' | 'words';
type WrapType = 'none' | 'p' | 'html';

export default function LoremIpsumGenerator() {
  const [mode,      setMode]      = useState<Mode>('paragraphs');
  const [count,     setCount]     = useState(3);
  const [startLorem, setStartLorem] = useState(true);
  const [wrap,      setWrap]      = useState<WrapType>('none');
  const [output,    setOutput]    = useState('');

  const generate = useCallback(() => {
    let text = '';
    if (mode === 'paragraphs') {
      const paras: string[] = [];
      for (let i = 0; i < count; i++) {
        let para = i === 0 && startLorem ? STANDARD_START + ' ' + generateParagraph(3, 6) : generateParagraph();
        if (wrap === 'p' || wrap === 'html') {
          para = `<p>${para}</p>`;
        }
        paras.push(para);
      }
      text = wrap === 'html'
        ? `<!DOCTYPE html>\n<html lang="en">\n<body>\n${paras.join('\n')}\n</body>\n</html>`
        : paras.join('\n\n');
    } else if (mode === 'sentences') {
      const sentences: string[] = [];
      if (startLorem) sentences.push(STANDARD_START);
      while (sentences.length < count) sentences.push(generateSentence());
      text = sentences.slice(0, count).join(' ');
    } else {
      const words: string[] = startLorem ? ['Lorem', 'ipsum', 'dolor', 'sit', 'amet'] : [];
      while (words.length < count) words.push(randomWord());
      text = words.slice(0, count).join(' ');
    }
    setOutput(text);
  }, [mode, count, startLorem, wrap]);

  useState(() => { generate(); });

  const iconBtn = 'inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded transition-colors bg-[rgba(0,0,0,0.05)] dark:bg-[rgba(255,255,255,0.07)] text-[var(--text-muted)] hover:text-[var(--text)]';
  const activeSegBtn = (active: boolean) =>
    `inline-flex items-center text-[11px] font-medium px-3 py-1.5 rounded transition-colors ${active ? 'bg-[#7C3AED] text-white' : 'bg-[rgba(0,0,0,0.05)] dark:bg-[rgba(255,255,255,0.07)] text-[var(--text-muted)] hover:text-[var(--text)]'}`;

  const stats = {
    words: output.split(/\s+/).filter(Boolean).length,
    chars: output.length,
    paragraphs: mode === 'paragraphs' ? count : 1,
  };

  return (
    <ToolShell>
      <div className="space-y-4">
        <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
            <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
            <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>Options</span>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <label className="text-[12px] font-medium w-24 flex-shrink-0" style={{ color: 'var(--text-muted)' }}>Generate</label>
              <div className="flex gap-1.5">
                {(['paragraphs', 'sentences', 'words'] as Mode[]).map(m => (
                  <button key={m} onClick={() => setMode(m)} className={activeSegBtn(mode === m)}>
                    {m.charAt(0).toUpperCase() + m.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <label className="text-[12px] font-medium w-24 flex-shrink-0" style={{ color: 'var(--text-muted)' }}>
                Count
              </label>
              <div className="flex items-center gap-2">
                <button onClick={() => setCount(c => Math.max(1, c - 1))} className={iconBtn}>−</button>
                <input
                  type="number" min={1} max={mode === 'words' ? 500 : 50}
                  value={count}
                  onChange={e => setCount(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center text-[12px] font-mono px-2 py-1 rounded border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] bg-transparent outline-none"
                  style={{ color: 'var(--text)' }}
                />
                <button onClick={() => setCount(c => c + 1)} className={iconBtn}>+</button>
              </div>
            </div>

            {mode === 'paragraphs' && (
              <div className="flex items-center gap-3 flex-wrap">
                <label className="text-[12px] font-medium w-24 flex-shrink-0" style={{ color: 'var(--text-muted)' }}>Wrap</label>
                <div className="flex gap-1.5">
                  {([['none','Plain text'], ['p','<p> tags'], ['html','Full HTML']] as [WrapType, string][]).map(([id, label]) => (
                    <button key={id} onClick={() => setWrap(id)} className={activeSegBtn(wrap === id)}>{label}</button>
                  ))}
                </div>
              </div>
            )}

            <label className="flex items-center gap-2 cursor-pointer text-[12px]" style={{ color: 'var(--text)' }}>
              <input type="checkbox" checked={startLorem} onChange={e => setStartLorem(e.target.checked)} className="accent-[#7C3AED]" />
              Start with "Lorem ipsum dolor sit amet…"
            </label>
          </div>
        </div>

        <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#163863]" />
              <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>Output</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[rgba(0,0,0,0.05)] dark:bg-[rgba(255,255,255,0.07)]" style={{ color: 'var(--text-muted)' }}>
                {stats.words.toLocaleString()} words · {stats.chars.toLocaleString()} chars
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <CopyButton text={output} />
              <button onClick={generate} className={iconBtn}>Generate</button>
            </div>
          </div>
          <div className="p-4">
            <p
              className="text-[13px] leading-[1.75] whitespace-pre-wrap"
              style={{ color: 'var(--text)' }}
            >
              {output || <span style={{ color: 'var(--text-subtle)' }}>Click Generate to create placeholder text…</span>}
            </p>
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
