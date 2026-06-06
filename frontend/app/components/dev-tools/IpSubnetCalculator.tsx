'use client';

import { useState, useMemo } from 'react';
import { ToolShell, CopyButton } from './SplitEditorPane';

function parseIp(ip: string): number | null {
  const parts = ip.split('.');
  if (parts.length !== 4) return null;
  const nums = parts.map(p => parseInt(p, 10));
  if (nums.some(n => isNaN(n) || n < 0 || n > 255)) return null;
  return ((nums[0] << 24) | (nums[1] << 16) | (nums[2] << 8) | nums[3]) >>> 0;
}

function ipToStr(n: number): string {
  return [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.');
}

interface SubnetInfo {
  network:       string;
  broadcast:     string;
  firstUsable:   string;
  lastUsable:    string;
  totalHosts:    string;
  subnetMask:    string;
  wildcardMask:  string;
  cidrNotation:  string;
  ipClass:       string;
}

function calcSubnet(ip: string, cidr: number): SubnetInfo | null {
  const ipInt = parseIp(ip);
  if (ipInt === null) return null;

  const mask      = cidr === 0 ? 0 : (0xffffffff << (32 - cidr)) >>> 0;
  const network   = (ipInt & mask) >>> 0;
  const broadcast = (network | (~mask >>> 0)) >>> 0;
  const usable    = Math.pow(2, 32 - cidr);
  const hosts     = cidr >= 31 ? usable : usable - 2;
  const firstUse  = cidr >= 31 ? network   : network   + 1;
  const lastUse   = cidr >= 31 ? broadcast : broadcast - 1;

  const firstOctet = (ipInt >>> 24) & 255;
  const ipClass = firstOctet < 128 ? 'A' : firstOctet < 192 ? 'B' : firstOctet < 224 ? 'C' : firstOctet < 240 ? 'D (Multicast)' : 'E (Reserved)';

  return {
    network:      ipToStr(network),
    broadcast:    ipToStr(broadcast),
    firstUsable:  ipToStr(firstUse),
    lastUsable:   ipToStr(lastUse),
    totalHosts:   hosts.toLocaleString(),
    subnetMask:   ipToStr(mask),
    wildcardMask: ipToStr((~mask >>> 0)),
    cidrNotation: `${ipToStr(network)}/${cidr}`,
    ipClass,
  };
}

const CIDR_REF: { cidr: number; mask: string; hosts: string; common: string }[] = [
  { cidr: 32, mask: '255.255.255.255', hosts: '1',          common: 'Host route' },
  { cidr: 31, mask: '255.255.255.254', hosts: '2',          common: 'Point-to-point link' },
  { cidr: 30, mask: '255.255.255.252', hosts: '2',          common: 'Small P2P' },
  { cidr: 29, mask: '255.255.255.248', hosts: '6',          common: 'Small subnet' },
  { cidr: 28, mask: '255.255.255.240', hosts: '14',         common: '' },
  { cidr: 27, mask: '255.255.255.224', hosts: '30',         common: '' },
  { cidr: 26, mask: '255.255.255.192', hosts: '62',         common: '' },
  { cidr: 25, mask: '255.255.255.128', hosts: '126',        common: '' },
  { cidr: 24, mask: '255.255.255.0',   hosts: '254',        common: 'Class C / typical LAN' },
  { cidr: 23, mask: '255.255.254.0',   hosts: '510',        common: '' },
  { cidr: 22, mask: '255.255.252.0',   hosts: '1,022',      common: '' },
  { cidr: 21, mask: '255.255.248.0',   hosts: '2,046',      common: '' },
  { cidr: 20, mask: '255.255.240.0',   hosts: '4,094',      common: '' },
  { cidr: 16, mask: '255.255.0.0',     hosts: '65,534',     common: 'Class B' },
  { cidr: 8,  mask: '255.0.0.0',       hosts: '16,777,214', common: 'Class A' },
  { cidr: 0,  mask: '0.0.0.0',         hosts: '4,294,967,294', common: 'All IPs' },
];

function isValidIp(ip: string): boolean { return parseIp(ip) !== null; }

export default function IpSubnetCalculator() {
  const [ip,   setIp]   = useState('192.168.1.100');
  const [cidr, setCidr] = useState(24);
  const [ipError, setIpError] = useState('');

  const result = useMemo(() => calcSubnet(ip, cidr), [ip, cidr]);

  const handleIp = (v: string) => {
    setIp(v);
    setIpError(v && !isValidIp(v) ? 'Invalid IPv4 address' : '');
  };

  const OUTPUT_ROWS: { label: string; key: keyof SubnetInfo }[] = [
    { label: 'Network Address',   key: 'network' },
    { label: 'Broadcast Address', key: 'broadcast' },
    { label: 'First Usable IP',   key: 'firstUsable' },
    { label: 'Last Usable IP',    key: 'lastUsable' },
    { label: 'Total Usable Hosts',key: 'totalHosts' },
    { label: 'Subnet Mask',       key: 'subnetMask' },
    { label: 'Wildcard Mask',     key: 'wildcardMask' },
    { label: 'CIDR Notation',     key: 'cidrNotation' },
    { label: 'IP Class',          key: 'ipClass' },
  ];

  return (
    <ToolShell>
      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          <div>
            <label className="block text-[11px] font-medium mb-1" style={{ color: 'var(--text-muted)' }}>IPv4 Address</label>
            <input
              type="text" value={ip} onChange={e => handleIp(e.target.value)}
              placeholder="192.168.1.100"
              className={`w-full text-[15px] font-mono px-3 py-2 rounded-xl border ${ipError ? 'border-red-400' : 'border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)]'} bg-[var(--bg-card)] outline-none focus:border-[#7C3AED] transition-colors`}
              style={{ color: 'var(--text)' }}
            />
            {ipError && <p className="mt-1 text-[11px] text-red-500">{ipError}</p>}
          </div>
          <div>
            <label className="block text-[11px] font-medium mb-1" style={{ color: 'var(--text-muted)' }}>
              CIDR Prefix Length — <code className="font-mono text-[#7C3AED]">/{cidr}</code>
            </label>
            <input type="range" min={0} max={32} value={cidr} onChange={e => setCidr(parseInt(e.target.value))}
              className="w-full accent-[#7C3AED]" />
            <div className="flex justify-between text-[10px] mt-1" style={{ color: 'var(--text-subtle)' }}>
              <span>/0</span><span>/8</span><span>/16</span><span>/24</span><span>/32</span>
            </div>
          </div>
        </div>

        {result && !ipError && (
          <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
              <span className="w-2 h-2 rounded-full bg-[#163863]" />
              <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>
                {ip}/{cidr} — {result.totalHosts} usable hosts
              </span>
            </div>
            <table className="w-full">
              <tbody>
                {OUTPUT_ROWS.map(({ label, key }) => (
                  <tr key={key} className="border-t border-[rgba(0,0,0,0.04)] dark:border-[rgba(255,255,255,0.04)] first:border-0">
                    <td className="px-4 py-2.5 w-48">
                      <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{label}</span>
                    </td>
                    <td className="px-4 py-2.5">
                      <code className="text-[13px] font-mono font-medium" style={{ color: 'var(--text)' }}>{result[key]}</code>
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      <CopyButton text={result[key]} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
            <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
            <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>Quick CIDR Reference</span>
          </div>
          <div className="overflow-auto" style={{ maxHeight: 240 }}>
            <table className="w-full text-[11px]">
              <thead>
                <tr className="border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
                  {['CIDR','Subnet Mask','Usable Hosts','Common Use'].map(h => (
                    <th key={h} className="px-4 py-2 text-left font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CIDR_REF.map(row => (
                  <tr key={row.cidr}
                    onClick={() => setCidr(row.cidr)}
                    className={`border-t border-[rgba(0,0,0,0.04)] dark:border-[rgba(255,255,255,0.04)] cursor-pointer transition-colors hover:bg-[rgba(124,58,237,0.05)] ${cidr === row.cidr ? 'bg-[rgba(124,58,237,0.08)]' : ''}`}>
                    <td className="px-4 py-2"><code className="font-mono font-bold" style={{ color: '#7C3AED' }}>/{row.cidr}</code></td>
                    <td className="px-4 py-2 font-mono" style={{ color: 'var(--text)' }}>{row.mask}</td>
                    <td className="px-4 py-2 font-mono" style={{ color: 'var(--text)' }}>{row.hosts}</td>
                    <td className="px-4 py-2" style={{ color: 'var(--text-muted)' }}>{row.common || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
