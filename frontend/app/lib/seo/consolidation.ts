
export const STRING_ESCAPE_OLD_SLUGS = [
  "html-escape",
  "xml-escape",
  "java-dotnet-escape",
  "javascript-escape",
  "json-escape",
  "csv-escape",
  "sql-escape",
] as const;

export const REDIRECTED_SLUGS = new Set<string>([...STRING_ESCAPE_OLD_SLUGS]);

export const NOINDEX_SLUGS = new Set<string>([
  "mime-types-list",
  "html-entities",
  "i18n-snippets",
  "xsd-generator",
  "wasm-analyzer",
  "text-to-ascii-art",
  "credit-card-validator",
]);

export function isExcludedFromSitemap(slug: string): boolean {
  return REDIRECTED_SLUGS.has(slug) || NOINDEX_SLUGS.has(slug);
}

export function isRedirected(slug: string): boolean {
  return REDIRECTED_SLUGS.has(slug);
}
