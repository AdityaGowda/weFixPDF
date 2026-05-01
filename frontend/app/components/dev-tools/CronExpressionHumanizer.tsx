'use client';
import React, { useState } from 'react';
import { Clock } from 'lucide-react';

const PRESETS: Record<string, string> = {
  '@yearly': 'Once a year at midnight on January 1st',
  '@annually': 'Once a year at midnight on January 1st',
  '@monthly': 'Once a month at midnight on the 1st',
  '@weekly': 'Once a week at midnight on Sunday',
  '@daily': 'Once a day at midnight',
  '@midnight': 'Once a day at midnight',
  '@hourly': 'Once an hour at the beginning of the hour',
};

function parseCron(expr: string): string {
  const e = expr.trim().toLowerCase();
  if (PRESETS[e]) return PRESETS[e];
  const parts = expr.trim().split(/\s+/);
  if (parts.length < 5) return 'Invalid — a cron expression needs exactly 5 fields: minute hour day month weekday';
  const [min, hour, dom, month, dow] = parts;
  const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  const fMin = min === '*' ? 'every minute' : min.startsWith('*/') ? `every ${min.slice(2)} minutes` : `at minute ${min}`;
  const fHour = hour === '*' ? 'every hour' : hour.startsWith('*/') ? `every ${hour.slice(2)} hours` : `hour ${hour}`;
  const fDom = dom === '*' ? '' : ` on day ${dom} of the month`;
  const fMonth = month === '*' ? '' : ` in ${month.split(',').map(m => MONTHS[parseInt(m) - 1] ?? m).join(', ')}`;
  const fDow = dow === '*' ? '' : dow === '1-5' ? ', Monday through Friday' : `, on ${dow.split(',').map(d => DAYS[parseInt(d)] ?? d).join(' and ')}`;
  return `Runs ${fMin}, ${fHour}${fDom}${fMonth}${fDow}.`;
}

const EXAMPLES = ['* * * * *', '0 0 * * *', '*/15 * * * *', '0 9-17 * * 1-5', '0 0 1,15 * *', '0 0 * * 0', '@daily', '@weekly'];
const FIELDS = ['Minute', 'Hour', 'Day/Month', 'Month', 'Day/Week'];

export default function CronExpressionHumanizer() {
  const [expr, setExpr] = useState('0 0 * * *');
  const result = parseCron(expr);
  const fieldValues = expr.trim().split(/\s+/);

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-500" /> Cron Expression Humanizer
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">
          Translate any cron expression into plain English instantly. Click an example or type your own.
        </p>
        <div>
          <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1.5">Cron Expression</label>
          <input value={expr} onChange={e => setExpr(e.target.value)} placeholder="0 0 * * *"
            className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[15px] font-mono text-[color:var(--text)] focus:outline-none focus:border-blue-500 tracking-widest" />
        </div>
        <div className="flex flex-wrap gap-2">
          {EXAMPLES.map(e => (
            <button key={e} onClick={() => setExpr(e)}
              className="px-3 py-1 rounded-full border border-base text-[12px] font-mono text-[color:var(--text-muted)] hover:border-blue-500 hover:text-blue-500 transition-colors">
              {e}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-card border border-base p-6 rounded-xl space-y-5">
        <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg">
          <p className="text-[15px] font-medium text-blue-600 dark:text-blue-400">{result}</p>
        </div>
        <div>
          <p className="text-[13px] font-medium text-[color:var(--text)] mb-3">Field Breakdown</p>
          <div className="grid grid-cols-5 gap-2 text-center">
            {FIELDS.map((f, i) => (
              <div key={f} className="bg-page border border-base rounded-lg p-3">
                <div className="text-[18px] font-bold text-blue-500 font-mono">{fieldValues[i] ?? '?'}</div>
                <div className="text-[11px] text-[color:var(--text-muted)] mt-1">{f}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-base pt-4">
          <p className="text-[12px] font-medium text-[color:var(--text)] mb-2">Special Characters</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[12px]">
            {[['*','Any value'],['*/n','Every n units'],[',','List separator'],['-','Range']].map(([c,d])=>(
              <div key={c} className="bg-page border border-base rounded p-2">
                <span className="font-mono font-bold text-blue-500">{c}</span>
                <span className="text-[color:var(--text-muted)] ml-2">{d}</span>
              </div>
            ))}
          </div>
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
  );
}
