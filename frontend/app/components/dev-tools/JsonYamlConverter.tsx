'use client';

import { useState, useCallback } from 'react';
import SplitEditorPane, { ToolShell } from './SplitEditorPane';
import { jsonToYaml, yamlToJson } from './converters';

const JSON_SAMPLE = JSON.stringify({
  server: { host: 'localhost', port: 3000 },
  database: { url: 'postgres://user:pass@db:5432/mydb', pool: { min: 2, max: 10 } },
  features: ['auth', 'billing', 'notifications'],
  debug: false,
}, null, 2);

const YAML_SAMPLE = `server:
  host: localhost
  port: 3000
database:
  url: "postgres://user:pass@db:5432/mydb"
  pool:
    min: 2
    max: 10
features:
  - auth
  - billing
  - notifications
debug: false`;

interface Props { slug: 'json-to-yaml' | 'yaml-to-json' }

export default function JsonYamlConverter({ slug }: Props) {
  const isJsonToYaml = slug === 'json-to-yaml';
  const [swapped, setSwapped] = useState(false);

  // Effective direction
  const toYaml = isJsonToYaml ? !swapped : swapped;

  const convert = useCallback(
    (input: string) => (toYaml ? jsonToYaml(input) : yamlToJson(input)),
    [toYaml],
  );

  return (
    <ToolShell>
      <SplitEditorPane
        leftLabel={toYaml ? 'JSON Input' : 'YAML Input'}
        rightLabel={toYaml ? 'YAML Output' : 'JSON Output'}
        leftPlaceholder={toYaml ? 'Paste JSON here…' : 'Paste YAML here…'}
        rightPlaceholder={toYaml ? 'YAML output appears here…' : 'JSON output appears here…'}
        sampleInput={toYaml ? JSON_SAMPLE : YAML_SAMPLE}
        fileAccept={toYaml ? '.json' : '.yaml,.yml'}
        convert={convert}
        downloadExt={toYaml ? 'yaml' : 'json'}
        canSwap
        onSwap={() => setSwapped((s) => !s)}
        minHeight={340}
      />
    </ToolShell>
  );
}
