'use client';
import React, { useState } from 'react';
import { TrendingUp, Settings } from 'lucide-react';

export default function BrowserPermissionRiskScan() {
  const [permissions, setPermissions] = useState<Record<string, string>>({});
  const [scanned, setScanned] = useState(false);

  const scan = async () => {
    const permsToCheck: PermissionName[] = [
      'geolocation' as PermissionName,
      'notifications' as PermissionName,
      'camera' as PermissionName,
      'microphone' as PermissionName,
    ];
    
    const results: Record<string, string> = {};
    for (const p of permsToCheck) {
      try {
        const status = await navigator.permissions.query({ name: p });
        results[p] = status.state; // 'granted', 'denied', or 'prompt'
      } catch (e) {
        results[p] = 'unsupported';
      }
    }
    setPermissions(results);
    setScanned(true);
  };

  const statusColor: Record<string, string> = {
    granted: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    denied: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    prompt: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    unsupported: 'text-gray-500 bg-gray-500/10 border-gray-500/20'
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2"><Settings className="w-5 h-5 text-red-500" /> Browser Permission Risk Scan</h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">Check which sensitive hardware and tracking permissions you have granted to the current website environment.</p>
        <button onClick={scan} className="w-full py-2.5 rounded-lg bg-red-500 text-white text-[14px] font-medium hover:bg-red-600 transition-colors"><TrendingUp className="w-4 h-4 inline mr-2" />Scan My Permissions</button>
      </div>
      {scanned && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(permissions).map(([perm, status]) => (
              <div key={perm} className={`border rounded-lg p-3 ${statusColor[status]}`}>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] font-bold capitalize">{perm}</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider">{status}</span>
                </div>
                {status === 'granted' && <div className="text-[11px] mt-1 opacity-80">This site can access your {perm} without asking.</div>}
                {status === 'prompt' && <div className="text-[11px] mt-1 opacity-80">This site must ask before accessing {perm}.</div>}
              </div>
            ))}
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg text-[13px] text-blue-600 dark:text-blue-400">
            <strong>Security Tip:</strong> To revoke granted permissions, click the lock icon 🔒 next to the URL in your browser&apos;s address bar and reset permissions.
          </div>
        </div>
      )}
    
      <div className="mt-8 bg-card border border-base p-6 rounded-xl space-y-4">
        <h3 className="text-[15px] font-semibold text-[color:var(--text)]">🔒 Privacy & Safe Usage</h3>
        <p className="text-[13px] text-[color:var(--text-muted)]">
          <strong>100% Private:</strong> This tool runs entirely in your browser. No data, inputs, or files are sent to our servers or saved anywhere.
        </p>
        <p className="text-[12px] text-[color:var(--text-muted)] opacity-80 border-t border-base pt-4">
          <strong>Disclaimer:</strong> This tool provides risk indicators only, not a final judgment.
        </p>
      </div>
    </div>
  );
}
