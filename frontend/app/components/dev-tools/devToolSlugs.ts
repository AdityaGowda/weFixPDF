// Shared between server components (page.tsx) and client components (DevToolBox)
// Must NOT have 'use client' — plain module only

export const DEV_TOOL_SLUGS = new Set([
  // Existing
  'csv-json-converter',
  'color-palette-generator',
  'text-diff-checker',
  'json-to-yaml',
  'yaml-to-json',
  'json-to-xml',
  'xml-to-json',
  'json-formatter',
  'jwt-decoder',
  // New — batch 2
  'cron-expression-builder',
  'chmod-calculator',
  'unix-timestamp-converter',
  'og-meta-tag-previewer',
  'hash-generator',
  'http-header-analyzer',
  'sql-formatter',
  'favicon-generator',
  'number-base-converter',
  'base64-encoder-decoder',
  'url-parser-builder',
  'regex-tester',
  'css-unit-converter',
  'color-contrast-checker',
  'mock-json-generator',
  'env-file-parser',
  'markdown-to-html',
  'ip-subnet-calculator',
  // Batch 3 — in-browser computation only
  'text-to-ascii-art',
  'wasm-analyzer',
  'llm-token-counter',
  'api-ping-tester',
]);
