'use client';
import CopyButton from '../CopyButton';
import React, { useState } from 'react';
import {
  escapeHtml,
  escapeXml,
  escapeJavascript,
  escapeSql,
  escapeCsv,
} from '../../utils/devToolsLogic';

type FormatKey = 'json' | 'xml' | 'html' | 'sql' | 'csv' | 'javascript' | 'java';

const FORMATS: { key: FormatKey; label: string; run: (s: string) => string; hint: string }[] = [
  { key: 'json',       label: 'JSON',         run: escapeJavascript, hint: 'Escapes quotes, backslashes and control chars for a JSON string value.' },
  { key: 'xml',        label: 'XML',          run: escapeXml,        hint: 'Escapes & < > " \' so text is safe inside XML.' },
  { key: 'html',       label: 'HTML',         run: escapeHtml,       hint: 'Escapes & < > " \' so text is safe inside HTML.' },
  { key: 'sql',        label: 'SQL',          run: escapeSql,        hint: "Doubles single quotes (' → '') for SQL string literals." },
  { key: 'csv',        label: 'CSV',          run: escapeCsv,        hint: 'Quotes the field and doubles quotes when it contains commas, quotes or newlines.' },
  { key: 'javascript', label: 'JavaScript',   run: escapeJavascript, hint: 'Escapes the string for a JavaScript string literal.' },
  { key: 'java',       label: 'Java / C#',    run: escapeJavascript, hint: 'Escapes the string for a Java or C# string literal.' },
];

export default function StringEscape() {
  const [format, setFormat] = useState<FormatKey>('json');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const active = FORMATS.find((f) => f.key === format)!;

  const handleProcess = () => {
    setError('');
    try {
      setOutput(active.run(input));
    } catch (e: any) {
      setError(e?.message || 'Could not escape input.');
      setOutput('');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">String Escape</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Escape text for JSON, XML, HTML, SQL, CSV, JavaScript or Java/C#. Fast, client-side processing — nothing is uploaded.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <label htmlFor="escape-format" className="block text-sm font-medium shrink-0">Target format</label>
          <select
            id="escape-format"
            value={format}
            onChange={(e) => { setFormat(e.target.value as FormatKey); setOutput(''); setError(''); }}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          >
            {FORMATS.map((f) => (
              <option key={f.key} value={f.key}>{f.label}</option>
            ))}
          </select>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-xs -mt-1">{active.hint}</p>

        <div>
          <label className="block text-sm font-medium mb-2">Input</label>
          <textarea
            className="w-full h-40 p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 font-mono text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to escape…"
          />
        </div>

        <button
          onClick={handleProcess}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors w-full sm:w-auto"
        >
          Escape for {active.label}
        </button>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        {output && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium">Output</label>
              <CopyButton text={output} />
            </div>
            <textarea
              readOnly
              value={output}
              className="w-full h-64 p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 font-mono text-sm whitespace-pre-wrap outline-none"
            />
          </div>
        )}
      </div>
    </div>
  );
}
