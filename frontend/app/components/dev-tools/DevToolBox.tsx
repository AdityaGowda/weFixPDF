'use client';

import dynamic from 'next/dynamic';

// ─────────────────────────────────────────────────────────────────────────────
// Lazy-load each tool so the bundle is split per-tool page
// ─────────────────────────────────────────────────────────────────────────────

// Existing tools
const CsvJsonConverter      = dynamic(() => import('./CsvJsonConverter'));
const JsonFormatter         = dynamic(() => import('./JsonFormatter'));
const JwtDecoder            = dynamic(() => import('./JwtDecoder'));
const TextDiffChecker       = dynamic(() => import('./TextDiffChecker'));
const ColorPaletteGenerator = dynamic(() => import('./ColorPaletteGenerator'));
const JsonYamlConverter     = dynamic(() => import('./JsonYamlConverter'));
const JsonXmlConverter      = dynamic(() => import('./JsonXmlConverter'));

// New tools — batch 3 (in-browser computation)
const TextToAsciiArt  = dynamic(() => import('./TextToAsciiArt'));
const WasmAnalyzer    = dynamic(() => import('./WasmAnalyzer'));
const LlmTokenCounter = dynamic(() => import('./LlmTokenCounter'));
const ApiPingTester   = dynamic(() => import('./ApiPingTester'));

// New tools — batch 2
const CronExpressionBuilder = dynamic(() => import('./CronExpressionBuilder'));
const ChmodCalculator       = dynamic(() => import('./ChmodCalculator'));
const UnixTimestampConverter= dynamic(() => import('./UnixTimestampConverter'));
const OgMetaTagPreviewer    = dynamic(() => import('./OgMetaTagPreviewer'));
const HashGenerator         = dynamic(() => import('./HashGenerator'));
const HttpHeaderAnalyzer    = dynamic(() => import('./HttpHeaderAnalyzer'));
const SqlFormatterTool      = dynamic(() => import('./SqlFormatterTool'));
const FaviconGenerator      = dynamic(() => import('./FaviconGenerator'));
const NumberBaseConverter   = dynamic(() => import('./NumberBaseConverter'));
const Base64Tool            = dynamic(() => import('./Base64Tool'));
const UrlParserBuilder      = dynamic(() => import('./UrlParserBuilder'));
const RegexTester           = dynamic(() => import('./RegexTester'));
const CssUnitConverter      = dynamic(() => import('./CssUnitConverter'));
const ColorContrastChecker  = dynamic(() => import('./ColorContrastChecker'));
const MockJsonGenerator     = dynamic(() => import('./MockJsonGenerator'));
const EnvFileParser         = dynamic(() => import('./EnvFileParser'));
const MarkdownToHtml        = dynamic(() => import('./MarkdownToHtml'));
const IpSubnetCalculator    = dynamic(() => import('./IpSubnetCalculator'));

// ─────────────────────────────────────────────────────────────────────────────
// DevToolBox — renders the correct interactive tool for a given slug
// ─────────────────────────────────────────────────────────────────────────────

interface DevToolBoxProps { slug: string }

export default function DevToolBox({ slug }: DevToolBoxProps) {
  switch (slug) {
    // Existing
    case 'csv-json-converter':      return <CsvJsonConverter />;
    case 'color-palette-generator': return <ColorPaletteGenerator />;
    case 'text-diff-checker':       return <TextDiffChecker />;
    case 'json-to-yaml':            return <JsonYamlConverter slug="json-to-yaml" />;
    case 'yaml-to-json':            return <JsonYamlConverter slug="yaml-to-json" />;
    case 'json-to-xml':             return <JsonXmlConverter slug="json-to-xml" />;
    case 'xml-to-json':             return <JsonXmlConverter slug="xml-to-json" />;
    case 'json-formatter':          return <JsonFormatter />;
    case 'jwt-decoder':             return <JwtDecoder />;
    // New — batch 2
    case 'cron-expression-builder': return <CronExpressionBuilder />;
    case 'chmod-calculator':        return <ChmodCalculator />;
    case 'unix-timestamp-converter':return <UnixTimestampConverter />;
    case 'og-meta-tag-previewer':   return <OgMetaTagPreviewer />;
    case 'hash-generator':          return <HashGenerator />;
    case 'http-header-analyzer':    return <HttpHeaderAnalyzer />;
    case 'sql-formatter':           return <SqlFormatterTool />;
    case 'favicon-generator':       return <FaviconGenerator />;
    case 'number-base-converter':   return <NumberBaseConverter />;
    case 'base64-encoder-decoder':  return <Base64Tool />;
    case 'url-parser-builder':      return <UrlParserBuilder />;
    case 'regex-tester':            return <RegexTester />;
    case 'css-unit-converter':      return <CssUnitConverter />;
    case 'color-contrast-checker':  return <ColorContrastChecker />;
    case 'mock-json-generator':     return <MockJsonGenerator />;
    case 'env-file-parser':         return <EnvFileParser />;
    case 'markdown-to-html':        return <MarkdownToHtml />;
    case 'ip-subnet-calculator':    return <IpSubnetCalculator />;
    // New — batch 3
    case 'text-to-ascii-art':      return <TextToAsciiArt />;
    case 'wasm-analyzer':          return <WasmAnalyzer />;
    case 'llm-token-counter':      return <LlmTokenCounter />;
    case 'api-ping-tester':        return <ApiPingTester />;
    default:                        return null;
  }
}
