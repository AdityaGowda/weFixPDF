'use client';
import React, { useState } from 'react';
import { IndianRupee, TrendingUp } from 'lucide-react';

export default function SwiggyZomatoPartnerEarnings() {
  const [platform, setPlatform] = useState('Zomato');
  const [deliveries, setDeliveries] = useState('25');
  const [hours, setHours] = useState('10');
  const [avgDistance, setAvgDistance] = useState('4');
  const [result, setResult] = useState<Record<string, number> | null>(null);

  const RATES: Record<string, { base: number; perKm: number; incentivePerDay: number; fuelPerKm: number }> = {
    'Zomato': { base: 25, perKm: 6, incentivePerDay: 150, fuelPerKm: 3 },
    'Swiggy': { base: 22, perKm: 5.5, incentivePerDay: 120, fuelPerKm: 3 },
  };

  const calc = () => {
    const d = parseFloat(deliveries) || 0;
    const h = parseFloat(hours) || 0;
    const dist = parseFloat(avgDistance) || 0;
    const r = RATES[platform];
    const deliveryEarning = d * (r.base + dist * r.perKm);
    const incentives = r.incentivePerDay;
    const grossDaily = deliveryEarning + incentives;
    const fuelCost = d * dist * r.fuelPerKm;
    const maintenance = d * 2;
    const netDaily = grossDaily - fuelCost - maintenance;
    const hourlyRate = h > 0 ? netDaily / h : 0;
    const monthlyNet = netDaily * 26;
    setResult({ grossDaily, fuelCost, maintenance, netDaily, hourlyRate, monthlyNet, deliveries: d });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <IndianRupee className="w-5 h-5 text-orange-500" /> Swiggy / Zomato Partner Earnings
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">
          Calculate your real daily and monthly net earnings as a Swiggy or Zomato delivery partner after fuel and maintenance costs.
        </p>
        <div className="flex rounded-lg border border-base overflow-hidden">
          {['Zomato', 'Swiggy'].map(p => (
            <button key={p} onClick={() => setPlatform(p)}
              className={`flex-1 py-2 text-[14px] font-medium transition-colors ${platform === p ? 'bg-orange-500 text-white' : 'text-[color:var(--text-muted)] hover:bg-orange-500/10'}`}>
              {p}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Deliveries per Day', val: deliveries, set: setDeliveries },
            { label: 'Hours Worked per Day', val: hours, set: setHours },
            { label: 'Average Distance per Delivery (km)', val: avgDistance, set: setAvgDistance },
          ].map(({ label, val, set }) => (
            <div key={label} className="col-span-2 sm:col-span-1">
              <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">{label}</label>
              <input type="number" value={val} onChange={e => set(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" />
            </div>
          ))}
        </div>
        <button onClick={calc} className="w-full py-2.5 rounded-lg bg-orange-500 text-white text-[14px] font-medium hover:bg-orange-600 flex items-center justify-center gap-2 transition-colors">
          <TrendingUp className="w-4 h-4" /> Calculate Earnings
        </button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl">
              <div className="text-2xl font-bold text-emerald-500">₹{result.netDaily.toFixed(0)}</div>
              <div className="text-[12px] text-[color:var(--text-muted)] mt-1">Net Daily Earnings</div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl">
              <div className="text-2xl font-bold text-blue-500">₹{result.monthlyNet.toFixed(0)}</div>
              <div className="text-[12px] text-[color:var(--text-muted)] mt-1">Monthly (26 days)</div>
            </div>
          </div>
          <div className="space-y-2 text-[14px]">
            {[
              { label: 'Gross Earnings (deliveries + incentives)', val: result.grossDaily, red: false },
              { label: '− Fuel Cost', val: result.fuelCost, red: true },
              { label: '− Maintenance Estimate', val: result.maintenance, red: true },
              { label: 'Effective Hourly Rate', val: result.hourlyRate, red: false },
            ].map(({ label, val, red }) => (
              <div key={label} className="flex justify-between border-b border-base py-1.5 last:border-0">
                <span className="text-[color:var(--text-muted)]">{label}</span>
                <span className={`font-medium ${red ? 'text-red-500' : 'text-[color:var(--text)]'}`}>
                  {label.includes('Hourly') ? `₹${val.toFixed(0)}/hr` : `₹${val.toFixed(0)}`}
                </span>
              </div>
            ))}
          </div>
          <p className="text-[12px] text-[color:var(--text-muted)]">Estimates based on average {platform} payouts. Actual earnings vary by city, surge pricing, and incentive structure.</p>
        </div>
      )}
    
      <div className="mt-8 bg-card border border-base p-6 rounded-xl space-y-4">
        <h3 className="text-[15px] font-semibold text-[color:var(--text)]">🔒 Privacy & Safe Usage</h3>
        <p className="text-[13px] text-[color:var(--text-muted)]">
          <strong>100% Private:</strong> This tool runs entirely in your browser. No data, inputs, or files are sent to our servers or saved anywhere.
        </p>
        <p className="text-[12px] text-[color:var(--text-muted)] opacity-80 border-t border-base pt-4">
          <strong>Disclaimer:</strong> Results are estimates only and should not be considered financial, tax, or legal advice.
        </p>
      </div>
    </div>
  );
}
