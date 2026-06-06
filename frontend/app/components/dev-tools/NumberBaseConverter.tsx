'use client';

import { useState, useCallback } from 'react';
import { ToolShell, CopyButton, ToggleChip } from './SplitEditorPane';

type Base = 'dec' | 'bin' | 'oct' | 'hex';

function decToBin(n: bigint)  { return n < 0n ? '-' + (-n).toString(2)  : n.toString(2); }
function decToOct(n: bigint)  { return n < 0n ? '-' + (-n).toString(8)  : n.toString(8); }
function decToHex(n: bigint)  { return n < 0n ? '-' + (-n).toString(16) : n.toString(16); }

function binNibbles(bin: string): string {
  if (!bin || bin === '0') return '0000';
  const neg = bin.startsWith('-');
  const b = neg ? bin.slice(1) : bin;
  const padLen = Math.ceil(b.length / 4) * 4;
  const padded = b.padStart(padLen, '0');
  const grouped = padded.match(/.{4}/g)?.join(' ') ?? padded;
  return neg ? '-' + grouped : grouped;
}

function bitLength(n: bigint): number {
  const abs = n < 0n ? -n : n;
  const bits = abs.toString(2).length + (n < 0n ? 1 : 0);
  if (bits <= 8)  return 8;
  if (bits <= 16) return 16;
  if (bits <= 32) return 32;
  return 64;
}

function toTwos(n: bigint, bits: number): string {
  if (n >= 0n) return n.toString(2).padStart(bits, '0');
  const twos = (1n << BigInt(bits)) + n;
  return twos.toString(2);
}

function twosToSigned(bin: string, bits: number): bigint {
  if (bin[0] === '0') return BigInt('0b' + bin);
  return BigInt('0b' + bin) - (1n << BigInt(bits));
}

const FIELDS: { key: Base; label: string; prefix: string; hint: string; pattern: string }[] = [
  { key: 'dec', label: 'Decimal',     prefix: '',   hint: '0–9',    pattern: '[\\-]?[0-9]*' },
  { key: 'bin', label: 'Binary',      prefix: '0b', hint: '0–1',    pattern: '[\\-]?[01]*' },
  { key: 'oct', label: 'Octal',       prefix: '0o', hint: '0–7',    pattern: '[\\-]?[0-7]*' },
  { key: 'hex', label: 'Hexadecimal', prefix: '0x', hint: '0–9 A–F', pattern: '[\\-]?[0-9a-fA-F]*' },
];

export default function NumberBaseConverter() {
  const [dec,    setDec]    = useState('');
  const [values, setValues] = useState({ dec: '', bin: '', oct: '', hex: '' });
  const [twos,   setTwos]   = useState(false);
  const [error,  setError]  = useState('');

  const fromDec = useCallback((bigN: bigint) => {
    setError('');
    setValues({
      dec: bigN.toString(),
      bin: decToBin(bigN),
      oct: decToOct(bigN),
      hex: decToHex(bigN),
    });
  }, []);

  const parse = useCallback((base: Base, raw: string) => {
    const val = raw.trim();
    if (!val || val === '-') {
      setValues({ dec: val, bin: '', oct: '', hex: '' }); setError(''); setDec(val); return;
    }
    try {
      let n: bigint;
      switch (base) {
        case 'dec': n = BigInt(val); break;
        case 'bin': n = val.startsWith('-') ? -BigInt('0b' + val.slice(1)) : BigInt('0b' + val); break;
        case 'oct': n = val.startsWith('-') ? -BigInt('0o' + val.slice(1)) : BigInt('0o' + val); break;
        case 'hex': n = val.startsWith('-') ? -BigInt('0x' + val.slice(1)) : BigInt('0x' + val); break;
      }
      setDec(n.toString());
      fromDec(n);
    } catch {
      setError(`Invalid ${base} input`);
    }
  }, [fromDec]);

  const decBig  = values.dec ? BigInt(values.dec.replace(/[^0-9\-]/g, '') || '0') : 0n;
  const bLen    = values.dec ? bitLength(decBig) : 8;
  const binRaw  = values.bin || '0';
  const nibbles = binNibbles(binRaw);
  const twosStr = values.dec ? toTwos(decBig, bLen) : '';
  const signedDec = twosStr ? twosToSigned(twosStr, bLen) : null;

  return (
    <ToolShell>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {FIELDS.map(({ key, label, prefix, hint }) => (
            <div key={key} className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
                  <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>{label}</span>
                  {prefix && <code className="text-[10px] px-1 py-0.5 rounded bg-[rgba(0,0,0,0.05)] dark:bg-[rgba(255,255,255,0.07)]" style={{ color: 'var(--text-muted)' }}>{prefix}</code>}
                </div>
                {values[key] && <CopyButton text={values[key]} />}
              </div>
              <div className="px-3 py-2.5">
                <input
                  type="text"
                  value={values[key]}
                  onChange={e => { const v = e.target.value; setValues(p => ({ ...p, [key]: v })); parse(key, v); }}
                  placeholder={hint}
                  spellCheck={false}
                  className="w-full text-[14px] font-mono bg-transparent outline-none"
                  style={{ color: 'var(--text)', caretColor: 'var(--text)' }}
                />
              </div>
            </div>
          ))}
        </div>

        {error && <p className="text-[12px] text-red-500 px-1">{error}</p>}

        {values.dec && !error && (
          <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>Binary breakdown</span>
              </div>
              <ToggleChip label="Two's complement" checked={twos} onChange={setTwos} />
            </div>
            <div className="px-4 py-3 space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-[11px] w-24 font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Nibbles</span>
                <code className="text-[13px] font-mono font-bold tracking-widest" style={{ color: 'var(--text)' }}>{nibbles}</code>
                <CopyButton text={nibbles} />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] w-24 font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Bit length</span>
                <code className="text-[13px] font-mono" style={{ color: '#7C3AED' }}>{bLen}-bit</code>
              </div>
              {twos && twosStr && (
                <>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] w-24 font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>2&apos;s compl.</span>
                    <code className="text-[12px] font-mono tracking-widest break-all" style={{ color: '#163863' }}>
                      {twosStr.match(/.{1,4}/g)?.join(' ')}
                    </code>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] w-24 font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Signed dec.</span>
                    <code className="text-[13px] font-mono" style={{ color: 'var(--text)' }}>{signedDec?.toString()}</code>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {!values.dec && (
          <p className="text-center text-[12px]" style={{ color: 'var(--text-subtle)' }}>
            Type a number in any base — all others update instantly
          </p>
        )}
      </div>
    </ToolShell>
  );
}
