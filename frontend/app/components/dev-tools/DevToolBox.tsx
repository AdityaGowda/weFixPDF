'use client';

import dynamic from 'next/dynamic';

// ─────────────────────────────────────────────────────────────────────────────
// Lazy-load each tool so the bundle is split per-tool page
// ─────────────────────────────────────────────────────────────────────────────

const CsvJsonConverter      = dynamic(() => import('./CsvJsonConverter'));
const JsonFormatter         = dynamic(() => import('./JsonFormatter'));
const JwtDecoder            = dynamic(() => import('./JwtDecoder'));
const TextDiffChecker       = dynamic(() => import('./TextDiffChecker'));
const ColorPaletteGenerator = dynamic(() => import('./ColorPaletteGenerator'));
const JsonYamlConverter     = dynamic(() => import('./JsonYamlConverter'));
const JsonXmlConverter      = dynamic(() => import('./JsonXmlConverter'));

// ─────────────────────────────────────────────────────────────────────────────
// DevToolBox — renders the correct interactive tool for a given slug
// ─────────────────────────────────────────────────────────────────────────────

interface DevToolBoxProps { slug: string }

export default function DevToolBox({ slug }: DevToolBoxProps) {
  switch (slug) {
    case 'csv-json-converter':      return <CsvJsonConverter />;
    case 'color-palette-generator': return <ColorPaletteGenerator />;
    case 'text-diff-checker':       return <TextDiffChecker />;
    case 'json-to-yaml':            return <JsonYamlConverter slug="json-to-yaml" />;
    case 'yaml-to-json':            return <JsonYamlConverter slug="yaml-to-json" />;
    case 'json-to-xml':             return <JsonXmlConverter slug="json-to-xml" />;
    case 'xml-to-json':             return <JsonXmlConverter slug="xml-to-json" />;
    case 'json-formatter':          return <JsonFormatter />;
    case 'jwt-decoder':             return <JwtDecoder />;
    default:                        return null;
  }
}
