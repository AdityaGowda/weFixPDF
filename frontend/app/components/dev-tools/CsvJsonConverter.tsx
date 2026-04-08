'use client';

import { useState, useCallback } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import SplitEditorPane, { SelectChip, ToggleChip, ToolShell } from './SplitEditorPane';
import { csvToJson, jsonToCsv } from './converters';

const CSV_SAMPLE = `name,age,city,active
Alice,30,New York,true
Bob,25,London,false
Carol,35,Toronto,true`;

const JSON_SAMPLE = JSON.stringify([
  { name: 'Alice', age: 30, city: 'New York', active: true },
  { name: 'Bob', age: 25, city: 'London', active: false },
  { name: 'Carol', age: 35, city: 'Toronto', active: true },
], null, 2);

const DELIMITERS = [
  { value: ',', label: 'Comma (,)' },
  { value: ';', label: 'Semicolon (;)' },
  { value: '\t', label: 'Tab (\\t)' },
  { value: '|', label: 'Pipe (|)' },
];

export default function CsvJsonConverter() {
  const [mode, setMode] = useState<'csv2json' | 'json2csv'>('csv2json');
  const [delimiter, setDelimiter] = useState(',');
  const [hasHeader, setHasHeader] = useState(true);

  const convert = useCallback(
    (input: string) => {
      if (mode === 'csv2json') return csvToJson(input, { delimiter, hasHeader });
      return jsonToCsv(input, { delimiter });
    },
    [mode, delimiter, hasHeader],
  );

  const isCsvMode = mode === 'csv2json';

  const modeBar = (
    <div className="flex items-center gap-2 mb-4">
      {/* Mode toggle */}
      <div className="inline-flex rounded-lg border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] overflow-hidden text-[12px] font-medium">
        <button
          onClick={() => setMode('csv2json')}
          className={`px-3 py-1.5 transition-colors ${mode === 'csv2json' ? 'bg-[#7C3AED] text-white' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}
        >
          CSV → JSON
        </button>
        <button
          onClick={() => setMode('json2csv')}
          className={`px-3 py-1.5 transition-colors ${mode === 'json2csv' ? 'bg-[#7C3AED] text-white' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}
        >
          JSON → CSV
        </button>
      </div>
      <ArrowLeftRight className="w-3.5 h-3.5 text-[var(--text-subtle)]" />
      {/* Options */}
      <SelectChip
        label="Delimiter"
        value={delimiter}
        options={DELIMITERS}
        onChange={setDelimiter}
      />
      {isCsvMode && (
        <ToggleChip label="Header row" checked={hasHeader} onChange={setHasHeader} />
      )}
    </div>
  );

  return (
    <ToolShell>
      {modeBar}
      <SplitEditorPane
        leftLabel={isCsvMode ? 'CSV Input' : 'JSON Input'}
        rightLabel={isCsvMode ? 'JSON Output' : 'CSV Output'}
        leftPlaceholder={isCsvMode ? 'Paste CSV data here…' : 'Paste JSON array here…'}
        rightPlaceholder={isCsvMode ? 'JSON output appears here…' : 'CSV output appears here…'}
        sampleInput={isCsvMode ? CSV_SAMPLE : JSON_SAMPLE}
        fileAccept={isCsvMode ? '.csv,.txt' : '.json'}
        convert={convert}
        downloadExt={isCsvMode ? 'json' : 'csv'}
        minHeight={320}
      />
    </ToolShell>
  );
}
