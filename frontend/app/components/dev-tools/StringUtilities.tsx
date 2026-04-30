'use client';
import CopyButton from '../CopyButton';
import React, { useState } from 'react';
import { stringUtils } from '../../utils/devToolsLogic';

export default function StringUtilities() {
  const [input, setInput] = useState('');
  const [action, setAction] = useState('uppercase');
  const [output, setOutput] = useState('');

  const handleProcess = () => {
    try {
      const func = stringUtils[action as keyof typeof stringUtils];
      if (func) {
        setOutput(func(input));
      }
    } catch (e: any) {
      setOutput('Error: ' + e.message);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">String Utilities</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Fast, client-side text transformations.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Input Text</label>
          <textarea
            className="w-full h-40 p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 font-mono text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text here..."
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium mb-2">Action</label>
            <select
              className="w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={action}
              onChange={(e) => setAction(e.target.value)}
            >
              <option value="uppercase">Uppercase</option>
              <option value="lowercase">Lowercase</option>
              <option value="titlecase">Title Case</option>
              <option value="camelcase">Camel Case</option>
              <option value="snakecase">Snake Case</option>
              <option value="kebabcase">Kebab Case</option>
              <option value="reverse">Reverse String</option>
              <option value="trim">Trim Whitespace</option>
              <option value="base64encode">Base64 Encode</option>
              <option value="base64decode">Base64 Decode</option>
              <option value="wordcount">Word Count</option>
              <option value="charcount">Character Count</option>
            </select>
          </div>
          <button
            onClick={handleProcess}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors w-full sm:w-auto"
          >
            Process
          </button>
        </div>

        {output && (
          <div>
            <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium">Output</label>
            <CopyButton text={output} />
          </div>
            <textarea readOnly value={output} className="w-full h-40 p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 font-mono text-sm whitespace-pre-wrap outline-none" />
          </div>
        )}
      </div>
    </div>
  );
}
