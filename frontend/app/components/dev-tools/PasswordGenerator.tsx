'use client';

import { useState, useCallback, useEffect } from 'react';
import { RefreshCw, Eye, EyeOff } from 'lucide-react';
import { ToolShell, CopyButton } from './SplitEditorPane';

const CHARS = {
  upper:   'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower:   'abcdefghijklmnopqrstuvwxyz',
  digits:  '0123456789',
  symbols: '!@#$%^&*()-_=+[]{}|;:,.<>?',
  ambiguous: 'iIlL1oO0',
};

function calcEntropy(poolSize: number, length: number): number {
  return Math.round(length * Math.log2(poolSize));
}

function entropyLabel(bits: number): { label: string; color: string } {
  if (bits < 40) return { label: 'Very Weak', color: '#ef4444' };
  if (bits < 60) return { label: 'Weak',      color: '#f97316' };
  if (bits < 80) return { label: 'Fair',       color: '#eab308' };
  if (bits < 100) return { label: 'Strong',    color: '#22c55e' };
  return                 { label: 'Very Strong', color: '#16a34a' };
}

function secureIndex(n: number): number {
  if (n <= 0) return 0;
  const max = Math.floor(0xffffffff / n) * n;
  const buf = new Uint32Array(1);
  let x = 0;
  do { crypto.getRandomValues(buf); x = buf[0]; } while (x >= max);
  return x % n;
}

function generatePassword(
  length: number,
  useUpper: boolean,
  useLower: boolean,
  useDigits: boolean,
  useSymbols: boolean,
  excludeAmbiguous: boolean,
): string {
  let pool = '';
  const required: string[] = [];

  const add = (key: keyof typeof CHARS) => {
    let chars = CHARS[key];
    if (excludeAmbiguous) {
      chars = chars.split('').filter(c => !CHARS.ambiguous.includes(c)).join('');
    }
    if (chars.length) { pool += chars; required.push(chars[secureIndex(chars.length)]); }
  };

  if (useUpper)   add('upper');
  if (useLower)   add('lower');
  if (useDigits)  add('digits');
  if (useSymbols) add('symbols');

  if (!pool) return '';

  const arr: string[] = [...required];
  const poolArr = pool.split('');
  const randValues = new Uint32Array(length - arr.length);
  crypto.getRandomValues(randValues);
  for (let i = 0; i < length - required.length; i++) {
    arr.push(poolArr[randValues[i] % poolArr.length]);
  }

  const shuffleRand = new Uint32Array(arr.length);
  crypto.getRandomValues(shuffleRand);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = shuffleRand[i] % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join('');
}

export default function PasswordGenerator() {
  const [length,           setLength]           = useState(20);
  const [useUpper,         setUseUpper]         = useState(true);
  const [useLower,         setUseLower]          = useState(true);
  const [useDigits,        setUseDigits]         = useState(true);
  const [useSymbols,       setUseSymbols]        = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [count,            setCount]            = useState(5);
  const [passwords,        setPasswords]         = useState<string[]>([]);
  const [show,             setShow]             = useState(true);

  const generate = useCallback(() => {
    setPasswords(
      Array.from({ length: count }, () =>
        generatePassword(length, useUpper, useLower, useDigits, useSymbols, excludeAmbiguous)
      )
    );
  }, [length, useUpper, useLower, useDigits, useSymbols, excludeAmbiguous, count]);

  useEffect(() => { generate(); }, [generate]);

  let poolSize = 0;
  if (useUpper)   poolSize += excludeAmbiguous ? CHARS.upper.split('').filter(c => !CHARS.ambiguous.includes(c)).length : CHARS.upper.length;
  if (useLower)   poolSize += excludeAmbiguous ? CHARS.lower.split('').filter(c => !CHARS.ambiguous.includes(c)).length : CHARS.lower.length;
  if (useDigits)  poolSize += excludeAmbiguous ? CHARS.digits.split('').filter(c => !CHARS.ambiguous.includes(c)).length : CHARS.digits.length;
  if (useSymbols) poolSize += CHARS.symbols.length;

  const entropyBits = poolSize > 0 ? calcEntropy(poolSize, length) : 0;
  const { label: strengthLabel, color: strengthColor } = entropyLabel(entropyBits);

  const iconBtn = 'inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded transition-colors bg-[rgba(0,0,0,0.05)] dark:bg-[rgba(255,255,255,0.07)] text-[var(--text-muted)] hover:text-[var(--text)]';

  const Toggle = ({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) => (
    <button
      onClick={() => onChange(!value)}
      className="flex items-center gap-2 text-[12px]"
      style={{ color: 'var(--text)' }}
    >
      <span
        className="w-9 h-5 rounded-full relative transition-colors flex-shrink-0"
        style={{ background: value ? '#7C3AED' : 'rgba(0,0,0,0.15)' }}
      >
        <span
          className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow-sm"
          style={{ transform: value ? 'translateX(16px)' : 'translateX(0)' }}
        />
      </span>
      {label}
    </button>
  );

  return (
    <ToolShell>
      <div className="space-y-4">
        <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
            <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
            <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>Options</span>
          </div>
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[12px] font-medium" style={{ color: 'var(--text-muted)' }}>Length</label>
                <span className="text-[13px] font-mono font-bold" style={{ color: '#7C3AED' }}>{length}</span>
              </div>
              <input
                type="range" min={6} max={128} value={length}
                onChange={e => setLength(Number(e.target.value))}
                className="w-full accent-[#7C3AED]"
              />
              <div className="flex justify-between text-[10px]" style={{ color: 'var(--text-subtle)' }}>
                <span>6</span><span>64</span><span>128</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Toggle label="Uppercase (A–Z)"   value={useUpper}         onChange={setUseUpper} />
              <Toggle label="Lowercase (a–z)"   value={useLower}          onChange={setUseLower} />
              <Toggle label="Numbers (0–9)"     value={useDigits}         onChange={setUseDigits} />
              <Toggle label="Symbols (!@#…)"    value={useSymbols}        onChange={setUseSymbols} />
              <Toggle label="Exclude ambiguous" value={excludeAmbiguous}  onChange={setExcludeAmbiguous} />
              <div className="flex items-center gap-2">
                <label className="text-[12px] flex-shrink-0" style={{ color: 'var(--text-muted)' }}>Count</label>
                <input
                  type="number" min={1} max={20} value={count}
                  onChange={e => setCount(Math.max(1, Math.min(20, Number(e.target.value))))}
                  className="w-16 text-center text-[12px] font-mono px-2 py-1 rounded border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] bg-transparent outline-none"
                  style={{ color: 'var(--text)' }}
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span style={{ color: 'var(--text-muted)' }}>Entropy: {entropyBits} bits</span>
                <span className="font-semibold" style={{ color: strengthColor }}>{strengthLabel}</span>
              </div>
              <div className="h-1.5 rounded-full bg-[rgba(0,0,0,0.08)] dark:bg-[rgba(255,255,255,0.08)] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (entropyBits / 128) * 100)}%`, background: strengthColor }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#163863]" />
              <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>Generated Passwords</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button onClick={() => setShow(s => !s)} className={iconBtn} title="Toggle visibility">
                {show ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
              </button>
              <button onClick={generate} className={iconBtn}>
                <RefreshCw className="w-3 h-3" /> Regenerate
              </button>
            </div>
          </div>
          <div className="divide-y divide-[rgba(0,0,0,0.04)] dark:divide-[rgba(255,255,255,0.04)]">
            {passwords.map((pw, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-2.5 group hover:bg-[rgba(0,0,0,0.02)] dark:hover:bg-[rgba(255,255,255,0.02)]">
                <code
                  className="text-[12px] font-mono break-all flex-1 pr-3 transition-all"
                  style={{ color: 'var(--text)', filter: show ? 'none' : 'blur(4px)', userSelect: show ? 'text' : 'none' }}
                >
                  {pw}
                </code>
                <CopyButton text={pw} />
              </div>
            ))}
          </div>
        </div>

        <p className="text-[11px] px-1" style={{ color: 'var(--text-subtle)' }}>
          Generated using <code className="font-mono">crypto.getRandomValues()</code> — cryptographically secure, fully in-browser. Passwords are never sent anywhere.
        </p>
      </div>
    </ToolShell>
  );
}
