'use client';

import { useState, useCallback } from 'react';
import { Plus, Trash2, Download } from 'lucide-react';
import { ToolShell, CopyButton } from './SplitEditorPane';

type FieldType = 'string' | 'number' | 'boolean' | 'date' | 'email' | 'uuid' | 'name' | 'address';

interface Field { id: string; name: string; type: FieldType; isArray: boolean }

const uid = () => Math.random().toString(36).slice(2);

const FIELD_TYPES: FieldType[] = ['string','number','boolean','date','email','uuid','name','address'];

const WORDS    = ['alpha','beta','gamma','delta','echo','foxtrot','hotel','india','juliet','kilo','lima','mike','november'];
const FIRSTS   = ['Alice','Bob','Carol','David','Emma','Frank','Grace','Henry','Iris','Jack','Kate','Liam','Mia','Noah','Olivia','Paul','Quinn','Rose','Sam','Tara'];
const LASTS    = ['Smith','Johnson','Williams','Jones','Brown','Davis','Miller','Wilson','Moore','Taylor','Anderson','Thomas','Jackson','White','Harris'];
const STREETS  = ['Main St','Oak Ave','Maple Dr','Cedar Ln','Pine Rd','Elm St','Park Ave','Lake Rd','Hill St','River Blvd'];
const CITIES   = ['New York','Los Angeles','Chicago','Houston','Phoenix','Philadelphia','San Antonio','San Diego','Dallas','San Jose'];
const STATES   = ['CA','TX','NY','FL','IL','PA','OH','GA','NC','MI'];
const DOMAINS  = ['gmail.com','yahoo.com','outlook.com','example.com','company.io'];

const rnd = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
const rndInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

function genUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : r & 0x3 | 0x8).toString(16);
  });
}

function genValue(type: FieldType): unknown {
  switch (type) {
    case 'string':  return rnd(WORDS) + '_' + rndInt(1, 999);
    case 'number':  return rndInt(1, 10000);
    case 'boolean': return Math.random() > 0.5;
    case 'date': {
      const d = new Date(Date.now() - rndInt(0, 365 * 5) * 86400000);
      return d.toISOString().slice(0, 10);
    }
    case 'email': {
      const first = rnd(FIRSTS).toLowerCase();
      return `${first}.${rnd(LASTS).toLowerCase()}@${rnd(DOMAINS)}`;
    }
    case 'uuid':    return genUUID();
    case 'name':    return `${rnd(FIRSTS)} ${rnd(LASTS)}`;
    case 'address': return `${rndInt(1, 9999)} ${rnd(STREETS)}, ${rnd(CITIES)}, ${rnd(STATES)} ${rndInt(10000, 99999)}`;
  }
}

function generateRecords(fields: Field[], count: number): string {
  const records = Array.from({ length: count }, () => {
    const obj: Record<string, unknown> = {};
    for (const f of fields) {
      if (!f.name) continue;
      obj[f.name] = f.isArray
        ? Array.from({ length: rndInt(1, 4) }, () => genValue(f.type))
        : genValue(f.type);
    }
    return obj;
  });
  return JSON.stringify(records, null, 2);
}

export default function MockJsonGenerator() {
  const [fields, setFields] = useState<Field[]>([
    { id: uid(), name: 'id',       type: 'uuid',    isArray: false },
    { id: uid(), name: 'name',     type: 'name',    isArray: false },
    { id: uid(), name: 'email',    type: 'email',   isArray: false },
    { id: uid(), name: 'score',    type: 'number',  isArray: false },
    { id: uid(), name: 'active',   type: 'boolean', isArray: false },
    { id: uid(), name: 'joinedAt', type: 'date',    isArray: false },
  ]);
  const [count,  setCount]  = useState(5);
  const [output, setOutput] = useState('');

  const addField    = () => setFields(f => [...f, { id: uid(), name: '', type: 'string', isArray: false }]);
  const removeField = (id: string) => setFields(f => f.filter(x => x.id !== id));
  const updateField = (id: string, patch: Partial<Field>) =>
    setFields(f => f.map(x => x.id === id ? { ...x, ...patch } : x));

  const generate = useCallback(() => {
    setOutput(generateRecords(fields, count));
  }, [fields, count]);

  const download = () => {
    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'mock-data.json'; a.click();
    URL.revokeObjectURL(url);
  };

  const inputClass = 'text-[12px] font-mono px-2 py-1.5 rounded border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] bg-[var(--bg-card)] outline-none focus:border-[#7C3AED] transition-colors';
  const iconBtn = 'inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded transition-colors bg-[rgba(0,0,0,0.05)] dark:bg-[rgba(255,255,255,0.07)] text-[var(--text-muted)] hover:text-[var(--text)]';

  return (
    <ToolShell>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Schema</p>
            <button onClick={addField} className={iconBtn}><Plus className="w-3 h-3" /> Add field</button>
          </div>

          <div className="grid grid-cols-[1fr_auto_auto_auto] gap-2 px-1 text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
            <span>Field name</span><span>Type</span><span>Array</span><span />
          </div>

          {fields.map(f => (
            <div key={f.id} className="grid grid-cols-[1fr_auto_auto_auto] gap-2 items-center">
              <input type="text" value={f.name} onChange={e => updateField(f.id, { name: e.target.value })}
                placeholder="fieldName" className={`${inputClass} w-full`} style={{ color: 'var(--text)' }} />
              <select value={f.type} onChange={e => updateField(f.id, { type: e.target.value as FieldType })}
                className={`${inputClass}`} style={{ color: 'var(--text)' }}>
                {FIELD_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <label className="flex items-center gap-1 cursor-pointer">
                <input type="checkbox" checked={f.isArray} onChange={e => updateField(f.id, { isArray: e.target.checked })}
                  className="w-3.5 h-3.5 accent-[#7C3AED]" />
                <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>[]</span>
              </label>
              <button onClick={() => removeField(f.id)} className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-[var(--text-muted)] hover:text-red-500 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          <div className="flex items-center gap-3 pt-2">
            <label className="text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>Records</label>
            <input type="number" value={count} onChange={e => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
              min={1} max={100} className={`w-20 ${inputClass}`} style={{ color: 'var(--text)' }} />
            <button onClick={generate}
              className="flex-1 px-4 py-1.5 rounded-lg text-[12px] font-semibold bg-[#7C3AED] text-white hover:bg-[#6d28d9] transition-colors">
              Generate
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#163863]" />
              <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>JSON Output</span>
            </div>
            {output && (
              <div className="flex gap-1">
                <CopyButton text={output} />
                <button onClick={download} className={iconBtn}><Download className="w-3 h-3" /> .json</button>
              </div>
            )}
          </div>
          <pre className="flex-1 p-4 font-mono text-[11px] overflow-auto leading-relaxed"
            style={{ minHeight: 360, color: 'var(--text)' }}>
            {output || <span style={{ color: 'var(--text-subtle)' }}>Click Generate to produce fake JSON data…</span>}
          </pre>
        </div>
      </div>
    </ToolShell>
  );
}
