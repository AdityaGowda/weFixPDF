'use client';
import React, { useState } from 'react';
import { TrendingUp, IndianRupee } from 'lucide-react';

export default function UpieFeeEstimator() {
  const [amount, setAmount] = useState('10000');
  const [txnType, setTxnType] = useState('P2P Transfer (person to person)');
  const [result, setResult] = useState<Record<string, number | string> | null>(null);

  const FEES: Record<string, { rate: number; cap: number; info: string }> = {
    'P2P Transfer (person to person)': { rate: 0, cap: 0, info: 'Always FREE. No fees for personal UPI transfers.' },
    'P2M – Small Merchant (< ₹2000)': { rate: 0, cap: 0, info: 'FREE. RBI mandated zero fee for small merchant payments below ₹2000.' },
    'P2M – Large Merchant (> ₹2000)': { rate: 0.005, cap: 15, info: 'Up to 0.5% MDR but capped at ₹15. Usually absorbed by merchant.' },
    'Prepaid Wallet Loading via UPI': { rate: 0.01, cap: 0, info: '~1% fee when loading money to third-party wallets (Paytm, PhonePe wallet) via UPI.' },
    'Credit Card via UPI (RuPay)': { rate: 0, cap: 0, info: 'RuPay credit card on UPI — currently FREE as per NPCI guidelines.' },
    'International UPI Payment': { rate: 0.025, cap: 0, info: '~2.5% cross-border transaction fee depending on remittance partner.' },
  };

  const calc = () => {
    const a = parseFloat(amount) || 0;
    const fee = FEES[txnType];
    const calculatedFee = fee.cap > 0 ? Math.min(a * fee.rate, fee.cap) : a * fee.rate;
    const netAmount = a - calculatedFee;
    setResult({ fee: calculatedFee, netAmount, rate: fee.rate * 100, info: fee.info, amount: a });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <IndianRupee className="w-5 h-5 text-blue-500" /> UPI Fee Estimator
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">
          Check the actual UPI transaction fees for different payment types. Most UPI transfers are free — know when they are not.
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Transaction Amount (₹)</label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Transaction Type</label>
            <select value={txnType} onChange={e => setTxnType(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500">
              {Object.keys(FEES).map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <button onClick={calc} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 flex items-center justify-center gap-2 transition-colors">
          <TrendingUp className="w-4 h-4" /> Check UPI Fee
        </button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className={`p-4 rounded-xl text-center border ${(result.fee as number) === 0 ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-amber-500/10 border-amber-500/20'}`}>
            <div className={`text-4xl font-bold ${(result.fee as number) === 0 ? 'text-emerald-500' : 'text-amber-500'}`}>
              {(result.fee as number) === 0 ? 'FREE ₹0' : `₹${(result.fee as number).toFixed(2)}`}
            </div>
            <div className="text-[13px] text-[color:var(--text-muted)] mt-1">UPI Transaction Fee</div>
          </div>
          <p className="text-[14px] text-[color:var(--text-muted)] bg-page border border-base rounded-lg p-3">{result.info as string}</p>
          {(result.fee as number) > 0 && (
            <div className="flex justify-between text-[14px] text-[color:var(--text-muted)]">
              <span>Net amount received by payee:</span>
              <span className="font-semibold text-[color:var(--text)]">₹{(result.netAmount as number).toFixed(2)}</span>
            </div>
          )}
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
