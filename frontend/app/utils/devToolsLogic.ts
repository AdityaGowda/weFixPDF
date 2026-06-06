import beautify from 'js-beautify';

export const formatHtml = (input: string) => beautify.html(input, { indent_size: 2 });
export const formatXml = (input: string) => beautify.html(input, { indent_size: 2, extra_liners: [] });
export const formatJs = (input: string) => beautify.js(input, { indent_size: 2 });
export const formatCss = (input: string) => beautify.css(input, { indent_size: 2 });

export const minifyJs = (input: string) => {
  return input
    .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

export const minifyCss = (input: string) => {
  return input
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*{\s*/g, '{')
    .replace(/\s*}\s*/g, '}')
    .replace(/\s*:\s*/g, ':')
    .replace(/\s*;\s*/g, ';')
    .trim();
};

export const validateXml = (input: string) => {
  if (!input.trim()) return 'No input provided.';
  const parser = new DOMParser();
  const doc = parser.parseFromString(input, 'application/xml');
  const errorNode = doc.querySelector('parsererror');
  if (errorNode) return `Invalid XML: ${errorNode.textContent}`;
  return 'Valid XML syntax!';
};

export const validateJson = (input: string) => {
  if (!input.trim()) return 'No input provided.';
  try {
    JSON.parse(input);
    return 'Valid JSON syntax!';
  } catch (e: any) {
    return `Invalid JSON: ${e.message}`;
  }
};

export const validateHtml = (input: string) => {
  if (!input.trim()) return 'No input provided.';
  const parser = new DOMParser();
  const doc = parser.parseFromString(input, 'text/html');
  return 'HTML Parsed successfully by browser DOM.';
};

export const escapeHtml = (input: string) => {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

export const escapeXml = escapeHtml;

export const escapeJavascript = (input: string) => {
  return JSON.stringify(input).slice(1, -1);
};

export const escapeSql = (input: string) => {
  return input.replace(/'/g, "''");
};

export const escapeCsv = (input: string) => {
  if (/[",\n\r]/.test(input)) {
    return '"' + input.replace(/"/g, '""') + '"';
  }
  return input;
};

export const testXPath = (xml: string, xpath: string) => {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'application/xml');
    const errorNode = doc.querySelector('parsererror');
    if (errorNode) throw new Error('Invalid XML data provided.');

    const result = doc.evaluate(xpath, doc, null, XPathResult.ANY_TYPE, null);
    let output = '';
    let node = result.iterateNext();
    let count = 0;
    while (node) {
      count++;
      output += `Match ${count}:\n${new XMLSerializer().serializeToString(node)}\n\n`;
      node = result.iterateNext();
    }
    return count > 0 ? output.trim() : 'No nodes matched the XPath.';
  } catch (e: any) {
    return `Error evaluating XPath: ${e.message}`;
  }
};

export const validateCreditCard = (input: string) => {
  const sanitized = input.replace(/\D/g, '');
  if (!sanitized) return 'Invalid: Contains no digits.';
  let sum = 0;
  let isEven = false;
  for (let i = sanitized.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitized.charAt(i), 10);
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    isEven = !isEven;
  }
  return sum % 10 === 0 ? 'Valid Credit Card Number! (Passes Luhn Algorithm)' : 'Invalid Credit Card Number. (Fails Luhn Algorithm)';
};

export const testJavaRegex = (pattern: string, flags: string, text: string) => {
  try {
    const regex = new RegExp(pattern, flags);
    const matches = [...text.matchAll(regex)];
    if (matches.length === 0) return 'No matches found.';
    let result = `Found ${matches.length} match(es):\n\n`;
    matches.forEach((m, i) => {
      result += `Match ${i + 1}: "${m[0]}" at index ${m.index}\n`;
      if (m.length > 1) {
        result += `  Groups:\n`;
        for (let j = 1; j < m.length; j++) {
          result += `    [${j}]: "${m[j]}"\n`;
        }
      }
    });
    return result.trim();
  } catch (e: any) {
    return `Invalid Regex Pattern: ${e.message}`;
  }
};

export const transformXslt = (xml: string, xslt: string) => {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, 'application/xml');
    if (xmlDoc.querySelector('parsererror')) throw new Error('Invalid XML');

    const xslDoc = parser.parseFromString(xslt, 'application/xml');
    if (xslDoc.querySelector('parsererror')) throw new Error('Invalid XSLT');

    const processor = new XSLTProcessor();
    processor.importStylesheet(xslDoc);
    const resultDoc = processor.transformToDocument(xmlDoc);
    return new XMLSerializer().serializeToString(resultDoc);
  } catch (e: any) {
    return `XSLT Transformation Error: ${e.message}`;
  }
};

export const generateXsd = (xml: string) => {
  return `<!-- Auto-generated mock XSD schema based on the provided XML -->\n<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">\n  <xs:element name="Root">\n    <xs:complexType>\n      <xs:sequence>\n        <!-- Elements inferred from XML structure would go here -->\n      </xs:sequence>\n    </xs:complexType>\n  </xs:element>\n</xs:schema>`;
};

export const csvToXml = (csv: string) => {
  if (!csv.trim()) return '';
  const lines = csv.split(/\r?\n/).filter(l => l.trim() !== '');
  const headers = lines[0].split(',').map(h => h.trim().replace(/[^a-zA-Z0-9_]/g, '_'));
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<Root>\n';
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    xml += '  <Row>\n';
    headers.forEach((h, j) => {
      const val = values[j] || '';
      xml += `    <${h}>${escapeXml(val)}</${h}>\n`;
    });
    xml += '  </Row>\n';
  }
  xml += '</Root>';
  return xml;
};

export const stringUtils = {
  reverse: (s: string) => s.split('').reverse().join(''),
  uppercase: (s: string) => s.toUpperCase(),
  lowercase: (s: string) => s.toLowerCase(),
  titlecase: (s: string) => s.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()),
  camelcase: (s: string) => s.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => index === 0 ? word.toLowerCase() : word.toUpperCase()).replace(/\s+/g, ''),
  snakecase: (s: string) => s.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toLowerCase()).join('_') || s,
  kebabcase: (s: string) => s.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toLowerCase()).join('-') || s,
  trim: (s: string) => s.trim(),
  base64encode: (s: string) => btoa(s),
  base64decode: (s: string) => atob(s),
  wordcount: (s: string) => s.trim().split(/\s+/).filter(Boolean).length.toString(),
  charcount: (s: string) => s.length.toString(),
};
