'use client';
import React, { useState } from 'react';
import { TrendingUp, Activity } from 'lucide-react';

export default function ApiLatencyEstimator() {
  const [serverRegion, setServerRegion] = useState('US East (N. Virginia)');
  const [userRegion, setUserRegion] = useState('Asia Pacific (Mumbai)');
  const [payloadSize, setPayloadSize] = useState('10');
  const [result, setResult] = useState<{ rtt: number; transferTime: number; total: number; grade: string } | null>(null);

  const REGIONS: Record<string, { lat: number; lng: number }> = {
    'US East (N. Virginia)': { lat: 39.04, lng: -77.48 },
    'US West (Oregon)': { lat: 45.83, lng: -119.70 },
    'Europe (Frankfurt)': { lat: 50.11, lng: 8.68 },
    'Europe (London)': { lat: 51.50, lng: -0.12 },
    'Asia Pacific (Mumbai)': { lat: 19.07, lng: 72.87 },
    'Asia Pacific (Singapore)': { lat: 1.35, lng: 103.81 },
    'Asia Pacific (Tokyo)': { lat: 35.67, lng: 139.65 },
    'South America (São Paulo)': { lat: -23.55, lng: -46.63 },
    'Australia (Sydney)': { lat: -33.86, lng: 151.20 },
  };

  // Haversine formula
  const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; 
  };

  const estimate = () => {
    const s = REGIONS[serverRegion];
    const u = REGIONS[userRegion];
    if (!s || !u) return;
    
    const distanceKm = getDistance(s.lat, s.lng, u.lat, u.lng);
    // Speed of light in fiber is ~200,000 km/s. RTT is round trip (2x distance).
    // Plus routing overhead multiplier (~1.5x)
    const rttMs = Math.max(10, ((distanceKm * 2) / 200000) * 1000 * 1.5);
    
    // Transfer time based on 50Mbps average connection
    const payloadBytes = (parseFloat(payloadSize) || 0) * 1024;
    const speedBytesPerMs = (50 * 1024 * 1024 / 8) / 1000;
    const transferTime = payloadBytes / speedBytesPerMs;
    
    // Total = TCP Handshake (1 RTT) + TLS (1-2 RTT) + HTTP Request + Transfer
    const totalMs = (rttMs * 3) + transferTime;
    
    let grade = 'Excellent';
    if (totalMs > 1000) grade = 'Poor';
    else if (totalMs > 500) grade = 'Fair';
    else if (totalMs > 200) grade = 'Good';

    setResult({ rtt: rttMs, transferTime, total: totalMs, grade });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2"><Activity className="w-5 h-5 text-blue-500" /> API Latency Estimator</h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">Estimate API request latency based on fiber-optic light speed distance between server and user.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Server Region</label>
            <select value={serverRegion} onChange={e => setServerRegion(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500">
              {Object.keys(REGIONS).map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">User Region</label>
            <select value={userRegion} onChange={e => setUserRegion(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500">
              {Object.keys(REGIONS).map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">JSON Payload Size (KB)</label>
            <input type="number" value={payloadSize} onChange={e => setPayloadSize(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" />
          </div>
        </div>
        <button onClick={estimate} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 transition-colors"><TrendingUp className="w-4 h-4 inline mr-2" />Estimate Latency</button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className={`text-center p-4 rounded-xl border ${result.grade === 'Excellent' || result.grade === 'Good' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : result.grade === 'Fair' ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
            <div className="text-4xl font-bold">{Math.round(result.total)} ms</div>
            <div className="text-[13px] mt-1 font-semibold">Estimated Total Request Time ({result.grade})</div>
          </div>
          <div className="space-y-2 text-[13px]">
            <div className="flex justify-between border-b border-base py-1.5"><span className="text-[color:var(--text-muted)]">Base RTT (Ping)</span><span className="font-medium text-[color:var(--text)]">~{Math.round(result.rtt)} ms</span></div>
            <div className="flex justify-between border-b border-base py-1.5"><span className="text-[color:var(--text-muted)]">TCP/TLS Handshake Penalty</span><span className="font-medium text-[color:var(--text)]">~{Math.round(result.rtt * 2)} ms</span></div>
            <div className="flex justify-between py-1.5"><span className="text-[color:var(--text-muted)]">Data Transfer Time</span><span className="font-medium text-[color:var(--text)]">{Math.round(result.transferTime)} ms</span></div>
          </div>
          <p className="text-[11px] text-[color:var(--text-muted)] text-center mt-2">Calculations assume direct fiber routes, standard BGP routing overhead, and average 50Mbps bandwidth. Excludes server-side DB processing time.</p>
        </div>
      )}
    
      <div className="mt-8 bg-card border border-base p-6 rounded-xl space-y-4">
        <h3 className="text-[15px] font-semibold text-[color:var(--text)]">🔒 Privacy & Safe Usage</h3>
        <p className="text-[13px] text-[color:var(--text-muted)]">
          <strong>100% Private:</strong> This tool runs entirely in your browser. No data, inputs, or files are sent to our servers or saved anywhere.
        </p>
        <p className="text-[12px] text-[color:var(--text-muted)] opacity-80 border-t border-base pt-4">
          <strong>Disclaimer:</strong> This tool is provided for informational and productivity purposes only. Please verify important results independently.
        </p>
      </div>
    </div>
  );
}
