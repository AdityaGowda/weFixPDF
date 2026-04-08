// Shared between server components (page.tsx) and client components (DevToolBox)
// Must NOT have 'use client' — plain module only

export const DEV_TOOL_SLUGS = new Set([
  'csv-json-converter',
  'color-palette-generator',
  'text-diff-checker',
  'json-to-yaml',
  'yaml-to-json',
  'json-to-xml',
  'xml-to-json',
  'json-formatter',
  'jwt-decoder',
]);
