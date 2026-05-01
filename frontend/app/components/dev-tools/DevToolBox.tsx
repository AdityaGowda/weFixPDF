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

// New tools — batch 3 (in-browser computation)
const TextToAsciiArt  = dynamic(() => import('./TextToAsciiArt'));
const WasmAnalyzer    = dynamic(() => import('./WasmAnalyzer'));
const LlmTokenCounter = dynamic(() => import('./LlmTokenCounter'));
const ApiPingTester   = dynamic(() => import('./ApiPingTester'));

// New tools — batch 4 (utility tools)
const UuidGenerator       = dynamic(() => import('./UuidGenerator'));
const PasswordGenerator   = dynamic(() => import('./PasswordGenerator'));
const LoremIpsumGenerator = dynamic(() => import('./LoremIpsumGenerator'));
const WordCounter         = dynamic(() => import('./WordCounter'));

// New tools — batch 5
const XmlFormatter = dynamic(() => import('./XmlFormatter'));
const HtmlFormatter = dynamic(() => import('./HtmlFormatter'));
const XmlValidator = dynamic(() => import('./XmlValidator'));
const JsonValidator = dynamic(() => import('./JsonValidator'));
const HtmlValidator = dynamic(() => import('./HtmlValidator'));
const XpathTester = dynamic(() => import('./XpathTester'));
const CreditCardValidator = dynamic(() => import('./CreditCardValidator'));
const JavaRegexTester = dynamic(() => import('./JavaRegexTester'));
const JsBeautifier = dynamic(() => import('./JsBeautifier'));
const JsMinifier = dynamic(() => import('./JsMinifier'));
const CssBeautifier = dynamic(() => import('./CssBeautifier'));
const CssMinifier = dynamic(() => import('./CssMinifier'));
const XsdGenerator = dynamic(() => import('./XsdGenerator'));
const XsltTransformer = dynamic(() => import('./XsltTransformer'));
const CsvToXml = dynamic(() => import('./CsvToXml'));
const StringUtilities = dynamic(() => import('./StringUtilities'));
const HtmlEscape = dynamic(() => import('./HtmlEscape'));
const XmlEscape = dynamic(() => import('./XmlEscape'));
const JavaDotnetEscape = dynamic(() => import('./JavaDotnetEscape'));
const JavascriptEscape = dynamic(() => import('./JavascriptEscape'));
const JsonEscape = dynamic(() => import('./JsonEscape'));
const CsvEscape = dynamic(() => import('./CsvEscape'));
const SqlEscape = dynamic(() => import('./SqlEscape'));
const MimeTypesList = dynamic(() => import('./MimeTypesList'));
const HtmlEntities = dynamic(() => import('./HtmlEntities'));
const I18nSnippets = dynamic(() => import('./I18nSnippets'));

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
    // New — batch 4
    case 'uuid-generator':         return <UuidGenerator />;
    case 'password-generator':     return <PasswordGenerator />;
    case 'lorem-ipsum-generator':  return <LoremIpsumGenerator />;
    case 'word-counter':           return <WordCounter />;
    // New — batch 5
    case 'xml-formatter':          return <XmlFormatter />;
    case 'html-formatter':         return <HtmlFormatter />;
    case 'xml-validator':          return <XmlValidator />;
    case 'json-validator':         return <JsonValidator />;
    case 'html-validator':         return <HtmlValidator />;
    case 'xpath-tester':           return <XpathTester />;
    case 'credit-card-validator':  return <CreditCardValidator />;
    case 'java-regex-tester':      return <JavaRegexTester />;
    case 'js-beautifier':          return <JsBeautifier />;
    case 'js-minifier':            return <JsMinifier />;
    case 'css-beautifier':         return <CssBeautifier />;
    case 'css-minifier':           return <CssMinifier />;
    case 'xsd-generator':          return <XsdGenerator />;
    case 'xslt-transformer':       return <XsltTransformer />;
    case 'csv-to-xml':             return <CsvToXml />;
    case 'string-utilities':       return <StringUtilities />;
    case 'html-escape':            return <HtmlEscape />;
    case 'xml-escape':             return <XmlEscape />;
    case 'java-dotnet-escape':     return <JavaDotnetEscape />;
    case 'javascript-escape':      return <JavascriptEscape />;
    case 'json-escape':            return <JsonEscape />;
    case 'csv-escape':             return <CsvEscape />;
    case 'sql-escape':             return <SqlEscape />;
    case 'mime-types-list':        return <MimeTypesList />;
    case 'html-entities':          return <HtmlEntities />;
    case 'i18n-snippets':          return <I18nSnippets />;
    default:                        return null;
  }
}
