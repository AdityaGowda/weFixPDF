'use client';

import { useState, useMemo } from 'react';
import { ToolShell, CopyButton } from './SplitEditorPane';

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAY_NAMES   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

interface CronState { minute: string; hour: string; dom: string; month: string; dow: string }

const FIELDS: { key: keyof CronState; label: string; min: number; max: number; hint: string }[] = [
  { key: 'minute', label: 'Minute',       min: 0, max: 59, hint: '0 – 59' },
  { key: 'hour',   label: 'Hour',         min: 0, max: 23, hint: '0 – 23' },
  { key: 'dom',    label: 'Day of Month', min: 1, max: 31, hint: '1 – 31' },
  { key: 'month',  label: 'Month',        min: 1, max: 12, hint: '1 – 12' },
  { key: 'dow',    label: 'Day of Week',  min: 0, max: 6,  hint: '0=Sun … 6=Sat' },
];

function explainCron({ minute, hour, dom, month, dow }: CronState): string {
  if ([minute, hour, dom, month, dow].every(v => v === '*')) return 'Every minute';

  let time = '';
  if (minute !== '*' && hour !== '*') {
    const h = parseInt(hour), m = parseInt(minute);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
    time = `at ${h12}:${String(m).padStart(2, '0')} ${ampm}`;
  } else if (minute !== '*') {
    time = `at minute ${minute} of every hour`;
  } else if (hour !== '*') {
    time = `every minute during hour ${hour}`;
  } else {
    time = 'every minute';
  }

  const dayPart  = dow  !== '*' ? `every ${DAY_NAMES[parseInt(dow)] ?? `day ${dow}`}`      : dom !== '*' ? `on day ${dom} of the month` : '';
  const monthPart = month !== '*' ? `in ${MONTH_NAMES[parseInt(month) - 1] ?? `month ${month}`}` : '';

  return [time, dayPart, monthPart].filter(Boolean).join(' ') || 'Custom schedule';
}

function matchesCron(d: Date, { minute, hour, dom, month, dow }: CronState): boolean {
  const check = (val: string, dVal: number) => val === '*' || parseInt(val) === dVal;
  return check(minute, d.getMinutes()) && check(hour, d.getHours())
    && check(dom, d.getDate()) && check(month, d.getMonth() + 1) && check(dow, d.getDay());
}

function getNextRuns(state: CronState, count: number): Date[] {
  const results: Date[] = [];
  const d = new Date(); d.setSeconds(0, 0); d.setMinutes(d.getMinutes() + 1);
  let iter = 0;
  while (results.length < count && iter < 60 * 24 * 400) {
    if (matchesCron(d, state)) results.push(new Date(d));
    d.setMinutes(d.getMinutes() + 1); iter++;
  }
  return results;
}

const fmtDate = (d: Date) => d.toLocaleString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });

export default function CronExpressionBuilder() {
  const [state, setState] = useState<CronState>({ minute: '0', hour: '9', dom: '*', month: '*', dow: '1' });

  const set = (key: keyof CronState, val: string) => setState(p => ({ ...p, [key]: val }));

  const cronExpr    = `${state.minute} ${state.hour} ${state.dom} ${state.month} ${state.dow}`;
  const explanation = useMemo(() => explainCron(state), [state]);
  const nextRuns    = useMemo(() => getNextRuns(state, 5), [state]);

  const btnActive   = 'bg-[#7C3AED] text-white';
  const btnInactive = 'bg-[rgba(0,0,0,0.05)] dark:bg-[rgba(255,255,255,0.07)] text-[var(--text-muted)] hover:text-[var(--text)]';

  return (
    <ToolShell>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* ── LEFT: controls ── */}
        <div className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Schedule Builder</p>
          {FIELDS.map(({ key, label, min, max, hint }) => (
            <div key={key} className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
                <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>{label}</span>
                <div className="inline-flex rounded-lg border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] overflow-hidden text-[11px] font-medium">
                  <button onClick={() => set(key, '*')} className={`px-2.5 py-1 transition-colors ${state[key] === '*' ? btnActive : btnInactive}`}>Every</button>
                  <button onClick={() => { if (state[key] === '*') set(key, String(min)); }} className={`px-2.5 py-1 transition-colors ${state[key] !== '*' ? btnActive : btnInactive}`}>Specific</button>
                </div>
              </div>
              {state[key] !== '*' && (
                <div className="px-3 py-2.5">
                  <input
                    type="number" min={min} max={max} value={state[key]}
                    onChange={e => set(key, e.target.value)} placeholder={hint}
                    className="w-full text-[13px] font-mono px-2 py-1.5 rounded border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] bg-[var(--bg-card)] outline-none focus:border-[#7C3AED]"
                    style={{ color: 'var(--text)' }}
                  />
                  <p className="mt-1 text-[10px]" style={{ color: 'var(--text-subtle)' }}>{hint}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── RIGHT: output ── */}
        <div className="space-y-3">
          {/* Cron string */}
          <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#7C3AED]" /><span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>Cron Expression</span></div>
              <CopyButton text={cronExpr} />
            </div>
            <div className="px-4 py-4">
              <code className="text-[24px] font-mono font-bold tracking-widest" style={{ color: '#7C3AED' }}>{cronExpr}</code>
            </div>
          </div>

          {/* Human-readable */}
          <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
              <span className="w-2 h-2 rounded-full bg-[#163863]" />
              <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>In plain English</span>
            </div>
            <div className="px-4 py-3">
              <p className="text-[14px] font-medium" style={{ color: 'var(--text)' }}>{explanation}</p>
            </div>
          </div>

          {/* Next 5 runs */}
          <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
              <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>Next 5 scheduled runs</span>
            </div>
            <ul className="divide-y divide-[rgba(0,0,0,0.04)] dark:divide-[rgba(255,255,255,0.04)]">
              {nextRuns.length > 0 ? nextRuns.map((d, i) => (
                <li key={i} className="flex items-center gap-3 px-4 py-2.5">
                  <span className="w-5 h-5 rounded-full bg-[rgba(124,58,237,0.1)] text-[#7C3AED] text-[10px] font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                  <code className="text-[12px] font-mono" style={{ color: 'var(--text)' }}>{fmtDate(d)}</code>
                </li>
              )) : (
                <li className="px-4 py-3 text-[12px]" style={{ color: 'var(--text-muted)' }}>No runs found within ~1 year — check your expression</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
