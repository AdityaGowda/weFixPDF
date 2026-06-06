

export function formatJson(input: string, indent = 2): string {
  const parsed = JSON.parse(input);
  return JSON.stringify(parsed, null, indent);
}

export function minifyJson(input: string): string {
  const parsed = JSON.parse(input);
  return JSON.stringify(parsed);
}

export interface CsvOptions {
  delimiter?: string;
  hasHeader?: boolean;
}

export function csvToJson(csv: string, opts: CsvOptions = {}): string {
  const { delimiter = ',', hasHeader = true } = opts;
  const lines = csv.trim().split(/\r?\n/).filter((l) => l.trim() !== '');
  if (lines.length === 0) throw new Error('Empty CSV');

  const parseRow = (line: string): string[] => {
    const cells: string[] = [];
    let cur = '';
    let inQuote = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') {
        if (inQuote && line[i + 1] === '"') { cur += '"'; i++; }
        else inQuote = !inQuote;
      } else if (c === delimiter && !inQuote) {
        cells.push(cur); cur = '';
      } else {
        cur += c;
      }
    }
    cells.push(cur);
    return cells;
  };

  if (!hasHeader) {
    return JSON.stringify(lines.map(parseRow), null, 2);
  }

  const headers = parseRow(lines[0]);
  const rows = lines.slice(1).map((line) => {
    const cells = parseRow(line);
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => { obj[h] = cells[i] ?? ''; });
    return obj;
  });
  return JSON.stringify(rows, null, 2);
}

export function jsonToCsv(json: string, opts: CsvOptions = {}): string {
  const { delimiter = ',' } = opts;
  const data = JSON.parse(json);
  if (!Array.isArray(data)) throw new Error('JSON must be an array of objects');
  if (data.length === 0) return '';

  const quoteCell = (v: unknown): string => {
    const s = v == null ? '' : String(v);
    if (s.includes(delimiter) || s.includes('"') || s.includes('\n')) {
      return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
  };

  if (Array.isArray(data[0])) {
    return data.map((row: unknown[]) => row.map(quoteCell).join(delimiter)).join('\n');
  }

  const headers = Array.from(new Set(data.flatMap((r: Record<string, unknown>) => Object.keys(r))));
  const headerRow = headers.map(quoteCell).join(delimiter);
  const rows = data.map((r: Record<string, unknown>) =>
    headers.map((h) => quoteCell(r[h])).join(delimiter)
  );
  return [headerRow, ...rows].join('\n');
}

function yamlScalar(v: unknown, forKey = false): string {
  if (v === null) return 'null';
  if (typeof v === 'boolean') return v ? 'true' : 'false';
  if (typeof v === 'number') return String(v);
  if (typeof v === 'string') {
    const needsQuote =
      v === '' ||
      /^(true|false|null|yes|no|on|off)$/i.test(v) ||
      /^[-+]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?$/.test(v) ||
      /[:#\[\]{}&*!|>'"%@`,]/.test(v) ||
      v.startsWith(' ') || v.endsWith(' ') ||
      v.includes('\n') || v.includes('\r') ||
      forKey;
    if (!needsQuote) return v;
    return `"${v.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r')}"`;
  }
  return String(v);
}

function jsonNodeToYaml(val: unknown, indent: number): string {
  const pad = '  '.repeat(indent);

  if (val === null || typeof val !== 'object') return yamlScalar(val);

  if (Array.isArray(val)) {
    if (val.length === 0) return '[]';
    return val.map((item) => {
      if (item !== null && typeof item === 'object' && !Array.isArray(item)) {
        const inner = jsonNodeToYaml(item, indent + 1).trimStart();
        return `${pad}- ${inner}`;
      }
      return `${pad}- ${jsonNodeToYaml(item, indent + 1)}`;
    }).join('\n');
  }

  const keys = Object.keys(val as object);
  if (keys.length === 0) return '{}';
  return keys.map((k) => {
    const v = (val as Record<string, unknown>)[k];
    const keyStr = yamlScalar(k, false);
    if (v !== null && typeof v === 'object') {
      const child = jsonNodeToYaml(v, indent + 1);
      if ((Array.isArray(v) && v.length === 0) || (!Array.isArray(v) && Object.keys(v).length === 0)) {
        return `${pad}${keyStr}: ${child}`;
      }
      return `${pad}${keyStr}:\n${child}`;
    }
    return `${pad}${keyStr}: ${yamlScalar(v)}`;
  }).join('\n');
}

export function jsonToYaml(input: string): string {
  const parsed = JSON.parse(input);
  return jsonNodeToYaml(parsed, 0);
}

export function yamlToJson(input: string): string {
  const result = parseYamlDoc(input);
  return JSON.stringify(result, null, 2);
}

function parseYamlDoc(text: string): unknown {
  const rawLines = text.split('\n');
  const lines: string[] = rawLines.map((l) => l.replace(/\s+$/, ''));
  let pos = 0;

  function skipEmptyAndComments() {
    while (pos < lines.length) {
      const t = lines[pos].trim();
      if (t === '' || t.startsWith('#')) pos++;
      else break;
    }
  }

  function indentOf(i: number): number {
    if (i >= lines.length) return -1;
    const m = lines[i].match(/^(\s*)\S/);
    return m ? m[1].length : -1;
  }

  function parseNode(minIndent: number): unknown {
    skipEmptyAndComments();
    if (pos >= lines.length) return null;
    const curIndent = indentOf(pos);
    if (curIndent < minIndent) return undefined;

    const line = lines[pos];
    const trimmed = line.trim();

    if (trimmed.startsWith('- ') || trimmed === '-') {
      return parseSeq(curIndent);
    }

    if (hasMappingColon(trimmed)) {
      return parseMap(curIndent);
    }

    pos++;
    return parseScalarStr(trimmed);
  }

  function parseSeq(seqIndent: number): unknown[] {
    const arr: unknown[] = [];
    while (pos < lines.length) {
      skipEmptyAndComments();
      if (pos >= lines.length) break;
      if (indentOf(pos) < seqIndent) break;
      if (indentOf(pos) > seqIndent) break;
      const trimmed = lines[pos].trim();
      if (!trimmed.startsWith('- ') && trimmed !== '-') break;
      pos++;
      const itemStr = trimmed.slice(2).trim();
      if (itemStr === '') {
        skipEmptyAndComments();
        if (pos < lines.length && indentOf(pos) > seqIndent) {
          arr.push(parseNode(indentOf(pos)));
        } else {
          arr.push(null);
        }
      } else if (hasMappingColon(itemStr)) {
        const savedLine = lines[pos - 1];
        lines[pos - 1] = ' '.repeat(seqIndent + 2) + itemStr;
        pos--;
        arr.push(parseMap(seqIndent + 2));
        lines[pos - 1] = savedLine;
      } else {
        arr.push(parseScalarStr(itemStr));
      }
    }
    return arr;
  }

  function parseMap(mapIndent: number): Record<string, unknown> {
    const obj: Record<string, unknown> = {};
    while (pos < lines.length) {
      skipEmptyAndComments();
      if (pos >= lines.length) break;
      const ci = indentOf(pos);
      if (ci < mapIndent) break;
      if (ci > mapIndent) break;
      const trimmed = lines[pos].trim();
      const colon = findColon(trimmed);
      if (colon === -1) break;
      const key = parseScalarStr(trimmed.slice(0, colon).trim()) as string;
      const rest = trimmed.slice(colon + 1).trim();
      pos++;
      let value: unknown;
      if (rest === '' || rest === '|' || rest === '>') {
        skipEmptyAndComments();
        if (pos < lines.length && indentOf(pos) > mapIndent) {
          value = parseNode(indentOf(pos));
        } else {
          value = null;
        }
      } else {
        value = parseScalarStr(rest);
      }
      obj[key] = value;
    }
    return obj;
  }

  function hasMappingColon(s: string): boolean {
    return findColon(s) !== -1;
  }

  function findColon(s: string): number {
    let inD = false, inS = false;
    for (let i = 0; i < s.length; i++) {
      const c = s[i];
      if (c === '"' && !inS) inD = !inD;
      else if (c === "'" && !inD) inS = !inS;
      else if (c === ':' && !inD && !inS) {
        const next = s[i + 1];
        if (next === undefined || next === ' ' || next === '\t') return i;
      }
    }
    return -1;
  }

  function parseScalarStr(s: string): unknown {
    if (s === '' || s === 'null' || s === '~') return null;
    if (s === 'true' || s === 'yes' || s === 'on') return true;
    if (s === 'false' || s === 'no' || s === 'off') return false;
    if (/^-?0x[0-9a-fA-F]+$/.test(s)) return parseInt(s, 16);
    if (/^-?\d+$/.test(s)) return parseInt(s, 10);
    if (/^-?(\d+\.\d*|\.\d+)([eE][+-]?\d+)?$/.test(s)) return parseFloat(s);
    if (s.startsWith('"') && s.endsWith('"') && s.length >= 2) {
      return s.slice(1, -1)
        .replace(/\\n/g, '\n').replace(/\\t/g, '\t')
        .replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    }
    if (s.startsWith("'") && s.endsWith("'") && s.length >= 2) {
      return s.slice(1, -1).replace(/''/g, "'");
    }
    return s;
  }

  return parseNode(0);
}

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function nodeToXml(val: unknown, tag: string, depth: number): string {
  const pad = '  '.repeat(depth);
  if (val === null || val === undefined) return `${pad}<${tag}/>`;
  if (typeof val !== 'object') return `${pad}<${tag}>${escapeXml(String(val))}</${tag}>`;

  if (Array.isArray(val)) {
    return val.map((item) => nodeToXml(item, tag, depth)).join('\n');
  }

  const obj = val as Record<string, unknown>;
  const attrParts: string[] = [];
  const childParts: string[] = [];
  let textContent = '';

  for (const [k, v] of Object.entries(obj)) {
    if (k.startsWith('@')) {
      attrParts.push(`${k.slice(1)}="${escapeXml(String(v))}"`);
    } else if (k === '#text') {
      textContent = escapeXml(String(v));
    } else if (Array.isArray(v)) {
      childParts.push(...(v as unknown[]).map((item) => nodeToXml(item, k, depth + 1)));
    } else if (v !== null && typeof v === 'object') {
      childParts.push(nodeToXml(v, k, depth + 1));
    } else {
      childParts.push(`${'  '.repeat(depth + 1)}<${k}>${v == null ? '' : escapeXml(String(v))}</${k}>`);
    }
  }

  const attrs = attrParts.length > 0 ? ' ' + attrParts.join(' ') : '';
  if (childParts.length === 0 && !textContent) return `${pad}<${tag}${attrs}/>`;
  if (childParts.length === 0) return `${pad}<${tag}${attrs}>${textContent}</${tag}>`;
  return `${pad}<${tag}${attrs}>\n${childParts.join('\n')}${textContent ? `\n${'  '.repeat(depth + 1)}${textContent}` : ''}\n${pad}</${tag}>`;
}

export function jsonToXml(input: string): string {
  const parsed = JSON.parse(input);
  if (typeof parsed !== 'object' || parsed === null) {
    return `<?xml version="1.0" encoding="UTF-8"?>\n<root>${escapeXml(String(parsed))}</root>`;
  }
  if (Array.isArray(parsed)) {
    const inner = parsed.map((item) => nodeToXml(item, 'item', 1)).join('\n');
    return `<?xml version="1.0" encoding="UTF-8"?>\n<root>\n${inner}\n</root>`;
  }
  const keys = Object.keys(parsed);
  const rootTag = keys.length === 1 ? keys[0] : 'root';
  const rootVal = keys.length === 1 ? parsed[keys[0]] : parsed;
  return `<?xml version="1.0" encoding="UTF-8"?>\n${nodeToXml(rootVal, rootTag, 0)}`;
}

function domToJson(node: Element): unknown {
  const attrs = Array.from(node.attributes);
  const kids = Array.from(node.childNodes) as ChildNode[];
  const elementKids = kids.filter((n) => n.nodeType === 1) as Element[];
  const textKids = kids.filter((n) => n.nodeType === 3 && n.textContent?.trim());
  const textContent = textKids.map((n) => n.textContent!.trim()).join('');

  if (attrs.length === 0 && elementKids.length === 0) {
    return textContent || null;
  }

  const obj: Record<string, unknown> = {};
  for (const a of attrs) obj[`@${a.name}`] = a.value;
  if (textContent && elementKids.length > 0) obj['#text'] = textContent;
  else if (textContent) obj['#text'] = textContent;

  const tagGroups: Record<string, unknown[]> = {};
  for (const child of elementKids) {
    if (!tagGroups[child.tagName]) tagGroups[child.tagName] = [];
    tagGroups[child.tagName].push(domToJson(child));
  }
  for (const [tag, vals] of Object.entries(tagGroups)) {
    obj[tag] = vals.length === 1 ? vals[0] : vals;
  }
  return obj;
}

export function xmlToJson(input: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(input, 'application/xml');
  const err = doc.querySelector('parsererror');
  if (err) throw new Error(`Invalid XML: ${err.textContent?.split('\n')[0] ?? 'parse error'}`);
  const root = doc.documentElement;
  const result: Record<string, unknown> = { [root.tagName]: domToJson(root) };
  return JSON.stringify(result, null, 2);
}

export interface JwtParts {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
  isExpired: boolean | null;
  expiresAt: Date | null;
  issuedAt: Date | null;
}

function b64urlDecode(s: string): string {
  const padded = s.replace(/-/g, '+').replace(/_/g, '/').padEnd(s.length + (4 - (s.length % 4)) % 4, '=');
  return atob(padded);
}

export function decodeJwt(token: string): JwtParts {
  const parts = token.trim().split('.');
  if (parts.length !== 3) throw new Error('A JWT must have exactly 3 dot-separated segments');
  const header = JSON.parse(b64urlDecode(parts[0]));
  const payload = JSON.parse(b64urlDecode(parts[1]));
  const signature = parts[2];
  const exp = typeof payload.exp === 'number' ? new Date(payload.exp * 1000) : null;
  const iat = typeof payload.iat === 'number' ? new Date(payload.iat * 1000) : null;
  const isExpired = exp ? exp < new Date() : null;
  return { header, payload, signature, isExpired, expiresAt: exp, issuedAt: iat };
}

export type DiffType = 'same' | 'added' | 'removed';
export interface DiffLine { type: DiffType; text: string; lineA?: number; lineB?: number; }

export function diffLines(a: string, b: string): DiffLine[] {
  const linesA = a.split('\n');
  const linesB = b.split('\n');
  const m = linesA.length, n = linesB.length;

  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      dp[i][j] = linesA[i] === linesB[j] ? 1 + dp[i + 1][j + 1] : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  const result: DiffLine[] = [];
  let i = 0, j = 0, ai = 1, bi = 1;
  while (i < m || j < n) {
    if (i < m && j < n && linesA[i] === linesB[j]) {
      result.push({ type: 'same', text: linesA[i], lineA: ai++, lineB: bi++ }); i++; j++;
    } else if (j < n && (i >= m || dp[i + 1][j] >= dp[i][j + 1])) {
      result.push({ type: 'added', text: linesB[j], lineB: bi++ }); j++;
    } else {
      result.push({ type: 'removed', text: linesA[i], lineA: ai++ }); i++;
    }
  }
  return result;
}

export interface ColorSwatch {
  hex: string; rgb: [number, number, number]; hsl: [number, number, number]; label: string;
}

export interface Palette {
  base: ColorSwatch;
  shades: ColorSwatch[];
  tints: ColorSwatch[];
  harmonics: ColorSwatch[];
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, Math.round(l * 100)];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100; l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');
}

function makeSwatch(h: number, s: number, l: number, label: string): ColorSwatch {
  l = Math.max(0, Math.min(100, l));
  s = Math.max(0, Math.min(100, s));
  const rgb = hslToRgb(h, s, l);
  return { hex: rgbToHex(...rgb), rgb, hsl: [h, s, l], label };
}

export function generatePalette(hex: string): Palette {
  const rgb = hexToRgb(hex);
  const [h, s, l] = rgbToHsl(...rgb);
  const base: ColorSwatch = { hex: rgbToHex(...rgb), rgb, hsl: [h, s, l], label: 'Base' };

  const shades = [
    makeSwatch(h, s, Math.max(l - 40, 5), '900'),
    makeSwatch(h, s, Math.max(l - 30, 10), '700'),
    makeSwatch(h, s, Math.max(l - 15, 15), '500'),
  ];
  const tints = [
    makeSwatch(h, s, Math.min(l + 15, 90), '300'),
    makeSwatch(h, s, Math.min(l + 28, 93), '200'),
    makeSwatch(h, Math.max(s - 10, 0), Math.min(l + 40, 96), '100'),
  ];
  const harmonics = [
    makeSwatch((h + 180) % 360, s, l, 'Complement'),
    makeSwatch((h + 30) % 360, s, l, 'Analogous +30'),
    makeSwatch((h - 30 + 360) % 360, s, l, 'Analogous −30'),
    makeSwatch((h + 120) % 360, s, l, 'Triadic +120'),
    makeSwatch((h + 240) % 360, s, l, 'Triadic +240'),
  ];

  return { base, shades, tints, harmonics };
}

export function randomHex(): string {
  return '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
}

export function paletteToCSS(p: Palette): string {
  const all = [p.base, ...p.shades, ...p.tints, ...p.harmonics];
  return `:root {\n${all.map((s) => `  --color-${s.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}: ${s.hex};`).join('\n')}\n}`;
}

export function paletteToSCSS(p: Palette): string {
  const all = [p.base, ...p.shades, ...p.tints, ...p.harmonics];
  return all.map((s) => `$color-${s.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}: ${s.hex};`).join('\n');
}

export function paletteToTailwind(p: Palette): string {
  const shadeMap: Record<string, string> = {};
  [p.base, ...p.shades, ...p.tints].forEach((s) => {
    const key = s.label.replace(/[^0-9a-zA-Z]/g, '') || 'base';
    shadeMap[key] = s.hex;
  });
  return `// tailwind.config.js\ntheme: {\n  extend: {\n    colors: {\n      primary: ${JSON.stringify(shadeMap, null, 8).replace(/^{/, '{').replace(/}$/, '    }')},\n    },\n  },\n}`;
}

export function paletteToJson(p: Palette): string {
  const all = [p.base, ...p.shades, ...p.tints, ...p.harmonics];
  const out: Record<string, { hex: string; rgb: string; hsl: string }> = {};
  all.forEach((s) => {
    out[s.label] = {
      hex: s.hex,
      rgb: `rgb(${s.rgb.join(', ')})`,
      hsl: `hsl(${s.hsl[0]}, ${s.hsl[1]}%, ${s.hsl[2]}%)`,
    };
  });
  return JSON.stringify(out, null, 2);
}
