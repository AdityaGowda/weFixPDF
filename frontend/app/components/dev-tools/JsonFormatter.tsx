'use client';

import { useState, useCallback } from 'react';
import SplitEditorPane, { ToolShell, SelectChip } from './SplitEditorPane';
import { formatJson, minifyJson } from './converters';

const SAMPLE = `{"name":"weFixPDF","version":"1.0.0","features":["PDF tools","Image tools","Dev tools"],"config":{"maxFileSize":52428800,"allowedTypes":["application/pdf","image/jpeg","image/png"],"timeout":30000},"meta":{"created":"2024-01-01","active":true,"users":null}}`;

const INDENT_OPTIONS = [
  { value: '2', label: '2 spaces' },
  { value: '4', label: '4 spaces' },
  { value: '\t', label: 'Tab' },
];

type OutputMode = 'pretty' | 'minify';

export default function JsonFormatter() {
  const [mode, setMode] = useState<OutputMode>('pretty');
  const [indent, setIndent] = useState('2');

  const convert = useCallback(
    (input: string) => {
      if (mode === 'minify') return minifyJson(input);
      const spaces = indent === '\t' ? '\t' : parseInt(indent, 10);
      return formatJson(input, spaces as number);
    },
    [mode, indent],
  );

  const toolbar = (
    <div className="flex items-center gap-3 mb-4">
      <div className="inline-flex rounded-lg border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] overflow-hidden text-[12px] font-medium">
        <button
          onClick={() => setMode('pretty')}
          className={`px-3 py-1.5 transition-colors ${mode === 'pretty' ? 'bg-[#7C3AED] text-white' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}
        >
          Pretty Print
        </button>
        <button
          onClick={() => setMode('minify')}
          className={`px-3 py-1.5 transition-colors ${mode === 'minify' ? 'bg-[#7C3AED] text-white' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}
        >
          Minify
        </button>
      </div>
      {mode === 'pretty' && (
        <SelectChip
          label="Indent"
          value={indent}
          options={INDENT_OPTIONS}
          onChange={setIndent}
        />
      )}
    
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

  return (
    <ToolShell>
      {toolbar}
      <SplitEditorPane
        leftLabel="JSON Input"
        rightLabel={mode === 'pretty' ? 'Formatted JSON' : 'Minified JSON'}
        leftPlaceholder="Paste any JSON here — minified, malformed, or pretty…"
        rightPlaceholder="Formatted output appears here…"
        sampleInput={SAMPLE}
        fileAccept=".json"
        convert={convert}
        downloadExt="json"
        minHeight={320}
      />
    </ToolShell>
  );
}
