'use client';

import { useState, useCallback } from 'react';
import SplitEditorPane, { ToolShell } from './SplitEditorPane';
import { jsonToXml, xmlToJson } from './converters';

const JSON_SAMPLE = JSON.stringify({
  bookstore: {
    book: [
      { '@genre': 'novel', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925, price: 12.99 },
      { '@genre': 'sci-fi', title: 'Dune', author: 'Frank Herbert', year: 1965, price: 14.99 },
    ],
  },
}, null, 2);

const XML_SAMPLE = `<?xml version="1.0" encoding="UTF-8"?>
<bookstore>
  <book genre="novel">
    <title>The Great Gatsby</title>
    <author>F. Scott Fitzgerald</author>
    <year>1925</year>
    <price>12.99</price>
  </book>
  <book genre="sci-fi">
    <title>Dune</title>
    <author>Frank Herbert</author>
    <year>1965</year>
    <price>14.99</price>
  </book>
</bookstore>`;

interface Props { slug: 'json-to-xml' | 'xml-to-json' }

export default function JsonXmlConverter({ slug }: Props) {
  const isJsonToXml = slug === 'json-to-xml';
  const [swapped, setSwapped] = useState(false);

  const toXml = isJsonToXml ? !swapped : swapped;

  const convert = useCallback(
    (input: string) => (toXml ? jsonToXml(input) : xmlToJson(input)),
    [toXml],
  );

  return (
    <ToolShell>
      <SplitEditorPane
        leftLabel={toXml ? 'JSON Input' : 'XML Input'}
        rightLabel={toXml ? 'XML Output' : 'JSON Output'}
        leftPlaceholder={toXml ? 'Paste JSON here…' : 'Paste XML here…'}
        rightPlaceholder={toXml ? 'XML output appears here…' : 'JSON output appears here…'}
        sampleInput={toXml ? JSON_SAMPLE : XML_SAMPLE}
        fileAccept={toXml ? '.json' : '.xml'}
        convert={convert}
        downloadExt={toXml ? 'xml' : 'json'}
        canSwap
        onSwap={() => setSwapped((s) => !s)}
        minHeight={340}
      />
    </ToolShell>
  );
}
