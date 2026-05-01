'use client';
import CopyButton from '../CopyButton';
import React, { useState } from 'react';

const mimeTypes = [
  { ext: '.html', type: 'text/html', desc: 'HTML Document' },
  { ext: '.css', type: 'text/css', desc: 'CSS Stylesheet' },
  { ext: '.js', type: 'text/javascript', desc: 'JavaScript File' },
  { ext: '.json', type: 'application/json', desc: 'JSON Data' },
  { ext: '.xml', type: 'application/xml', desc: 'XML Data' },
  { ext: '.pdf', type: 'application/pdf', desc: 'PDF Document' },
  { ext: '.jpg, .jpeg', type: 'image/jpeg', desc: 'JPEG Image' },
  { ext: '.png', type: 'image/png', desc: 'PNG Image' },
  { ext: '.gif', type: 'image/gif', desc: 'GIF Image' },
  { ext: '.webp', type: 'image/webp', desc: 'WebP Image' },
  { ext: '.svg', type: 'image/svg+xml', desc: 'SVG Vector Image' },
  { ext: '.txt', type: 'text/plain', desc: 'Plain Text File' },
  { ext: '.csv', type: 'text/csv', desc: 'CSV Spreadsheet' },
  { ext: '.zip', type: 'application/zip', desc: 'ZIP Archive' },
  { ext: '.mp3', type: 'audio/mpeg', desc: 'MP3 Audio' },
  { ext: '.mp4', type: 'video/mp4', desc: 'MP4 Video' },
  { ext: '.wav', type: 'audio/wav', desc: 'WAV Audio' },
  { ext: '.doc', type: 'application/msword', desc: 'Word Document' },
  { ext: '.docx', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', desc: 'Word (Docx)' },
  { ext: '.xls', type: 'application/vnd.ms-excel', desc: 'Excel Spreadsheet' },
  { ext: '.xlsx', type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', desc: 'Excel (Xlsx)' },
];

export default function MimeTypesList() {
  const [search, setSearch] = useState('');

  const filtered = mimeTypes.filter(m => 
    m.ext.toLowerCase().includes(search.toLowerCase()) || 
    m.type.toLowerCase().includes(search.toLowerCase()) ||
    m.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">MIME Types List</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Search and browse common file MIME types.</p>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          placeholder="Search by extension or type (e.g. .pdf or image)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 font-medium">
              <tr>
                <th className="p-4">Extension</th>
                <th className="p-4">MIME Type</th>
                <th className="p-4">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filtered.map((m, i) => (
                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                  <td className="p-4 font-mono text-blue-600 dark:text-blue-400">{m.ext}</td>
                  <td className="p-4 font-mono">{m.type}</td>
                  <td className="p-4 text-gray-500 dark:text-gray-400">{m.desc}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-gray-500">No matching types found.</td>
                </tr>
              )}
            </tbody>
          </table>
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
