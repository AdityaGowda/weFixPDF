'use client';
import React, { useState } from 'react';
import { TrendingUp, IndianRupee } from 'lucide-react';

export default function UpiQrReceiptGenerator() {
  const [name, setName] = useState('Rajesh Kumar');
  const [upiId, setUpiId] = useState('rajesh@upi');
  const [amount, setAmount] = useState('2500');
  const [description, setDescription] = useState('Web Design Services - May 2025');
  const [invoiceNo, setInvoiceNo] = useState('INV-2025-001');
  const [result, setResult] = useState(false);

  const upiLink = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(description)}`;
  const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2">
          <IndianRupee className="w-5 h-5 text-blue-500" /> UPI QR Receipt Generator
        </h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">
          Generate a payment receipt with UPI deep link for quick payment collection. Share it digitally with your clients.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Your Name / Business Name', val: name, set: setName },
            { label: 'UPI ID', val: upiId, set: setUpiId },
            { label: 'Amount (₹)', val: amount, set: setAmount },
            { label: 'Invoice Number', val: invoiceNo, set: setInvoiceNo },
          ].map(({ label, val, set }) => (
            <div key={label}>
              <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">{label}</label>
              <input value={val} onChange={e => set(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" />
            </div>
          ))}
          <div className="col-span-2">
            <label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Payment Description</label>
            <input value={description} onChange={e => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500" />
          </div>
        </div>
        <button onClick={() => setResult(true)} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 flex items-center justify-center gap-2 transition-colors">
          <TrendingUp className="w-4 h-4" /> Generate Receipt
        </button>
      </div>

      {result && (
        <div id="upi-receipt" className="bg-white dark:bg-card border-2 border-blue-500 rounded-2xl overflow-hidden shadow-xl">
          <div className="bg-blue-500 p-5 text-white text-center">
            <div className="text-[11px] uppercase tracking-widest opacity-80">Payment Receipt</div>
            <div className="text-3xl font-bold mt-1">₹{parseFloat(amount).toLocaleString('en-IN')}</div>
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-2 text-[14px]">
              {[
                { label: 'Invoice No.', val: invoiceNo },
                { label: 'Payee Name', val: name },
                { label: 'UPI ID', val: upiId },
                { label: 'Description', val: description },
                { label: 'Date', val: today },
                { label: 'Status', val: 'Payment Requested' },
              ].map(({ label, val }) => (
                <div key={label} className="flex justify-between border-b border-gray-100 dark:border-base py-1.5 last:border-0">
                  <span className="text-gray-500 dark:text-[color:var(--text-muted)]">{label}</span>
                  <span className="font-medium text-gray-900 dark:text-[color:var(--text)]">{val}</span>
                </div>
              ))}
            </div>
            <a href={upiLink} className="block w-full py-3 rounded-xl bg-emerald-500 text-white text-[14px] font-semibold text-center hover:bg-emerald-600 transition-colors">
              📱 Pay ₹{parseFloat(amount).toLocaleString('en-IN')} via UPI
            </a>
            <p className="text-[11px] text-gray-400 dark:text-[color:var(--text-muted)] text-center">Click the button above on a mobile device to open your UPI app directly</p>
          </div>
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
