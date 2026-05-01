'use client';
import CopyButton from '../CopyButton';
import React, { useState } from 'react';
import { validateHtml } from '../../utils/devToolsLogic';

export default function HtmlValidator() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleProcess = () => {
    try {
      const result = validateHtml(input);
      setOutput(result || 'Done.');
    } catch (e: any) {
      setOutput('Error: ' + e.message);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">HTML Validator</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Fast, client-side processing.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Input</label>
          <textarea
            className="w-full h-40 p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 font-mono text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter input here..."
          />
        </div>

        <button
          onClick={handleProcess}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors w-full sm:w-auto"
        >
          Process
        </button>

        {output && (
          <div>
            <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium">Output</label>
            <CopyButton text={output} />
          </div>
            <textarea readOnly value={output} className="w-full h-64 p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 font-mono text-sm whitespace-pre-wrap outline-none" />
          </div>
        )}
      </div>
    </div>
  );
}
