'use client';
import React, { useState } from 'react';
import { TrendingUp, Code } from 'lucide-react';

export default function SqlExplainSimplifier() {
  const [sql, setSql] = useState('');
  const [result, setResult] = useState<{ warnings: string[]; suggestions: string[]; score: number } | null>(null);

  const analyze = () => {
    if (!sql.trim()) return;
    const upper = sql.toUpperCase();
    const warnings: string[] = [];
    const suggestions: string[] = [];
    let score = 100;

    if (/SELECT\s+\*/i.test(sql)) { warnings.push('SELECT * fetches all columns — specify only the columns you need.'); score -= 15; }
    if (!/WHERE/i.test(sql) && /SELECT/i.test(sql)) { warnings.push('No WHERE clause — full table scan detected. This can be extremely slow on large tables.'); score -= 20; }
    if (/WHERE.*LIKE\s+'%/i.test(sql)) { warnings.push('Leading wildcard LIKE \'%...\' prevents index usage — full scan required.'); score -= 15; }
    if (/ORDER BY RAND/i.test(sql)) { warnings.push('ORDER BY RAND() is very slow on large tables. Use alternative randomization strategies.'); score -= 20; }
    if (/NOT IN\s*\(/i.test(sql)) { suggestions.push('Consider replacing NOT IN with NOT EXISTS — it handles NULLs better and can be faster.'); score -= 10; }
    if (/SELECT.*SELECT/i.test(sql)) { suggestions.push('Nested subquery detected. Consider using JOINs or CTEs for better performance.'); score -= 10; }
    if (!(/INDEX|KEY|PRIMARY/i.test(sql)) && /JOIN/i.test(sql)) { suggestions.push('JOINs detected without explicit index hints. Ensure join columns are indexed.'); }
    if (/HAVING/i.test(sql) && !/GROUP BY/i.test(sql)) { warnings.push('HAVING without GROUP BY is unusual — did you mean WHERE instead?'); score -= 5; }
    if (/N\+1|WHERE.*=.*IN.*SELECT/i.test(sql)) { suggestions.push('Potential N+1 pattern. Batch queries with IN clause or use a single JOIN.'); score -= 5; }

    score = Math.max(0, score);
    setResult({ warnings, suggestions, score });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)] flex items-center gap-2"><Code className="w-5 h-5 text-blue-500" /> SQL Query Simplifier</h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">Paste your SQL query to get performance warnings and optimization suggestions. No database connection needed.</p>
        <textarea value={sql} onChange={e => setSql(e.target.value)} rows={8}
          placeholder={'SELECT * FROM orders\nWHERE customer_name LIKE \'%john%\'\nORDER BY RAND()\nLIMIT 100;'}
          className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[13px] font-mono text-[color:var(--text)] focus:outline-none focus:border-blue-500 resize-y" />
        <button onClick={analyze} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 transition-colors"><TrendingUp className="w-4 h-4 inline mr-2" />Analyze Query</button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-4">
          <div className={`text-4xl font-bold text-center ${result.score >= 80 ? 'text-emerald-500' : result.score >= 60 ? 'text-amber-500' : 'text-red-500'}`}>{result.score}/100</div>
          <div className="text-[14px] text-center text-[color:var(--text-muted)]">Query Performance Score</div>
          {result.warnings.length > 0 && (
            <div>
              <h3 className="text-[13px] font-semibold text-red-500 mb-2">⚠ Performance Issues:</h3>
              {result.warnings.map(w => <p key={w} className="text-[13px] text-[color:var(--text-muted)] mb-1.5 bg-red-500/5 border border-red-500/10 rounded px-3 py-2">• {w}</p>)}
            </div>
          )}
          {result.suggestions.length > 0 && (
            <div>
              <h3 className="text-[13px] font-semibold text-blue-500 mb-2">💡 Optimization Suggestions:</h3>
              {result.suggestions.map(s => <p key={s} className="text-[13px] text-[color:var(--text-muted)] mb-1.5 bg-blue-500/5 border border-blue-500/10 rounded px-3 py-2">• {s}</p>)}
            </div>
          )}
          {result.warnings.length === 0 && result.suggestions.length === 0 && (
            <p className="text-emerald-500 text-[14px] text-center">✓ No obvious performance issues detected in query structure.</p>
          )}
        </div>
      )}
    
      <div className="mt-8 bg-card border border-base p-6 rounded-xl space-y-4">
        <h3 className="text-[15px] font-semibold text-[color:var(--text)]">🔒 Privacy & Safe Usage</h3>
        <p className="text-[13px] text-[color:var(--text-muted)]">
          <strong>100% Private:</strong> This tool runs entirely in your browser. No data, inputs, or files are sent to our servers or saved anywhere.
        </p>
        <p className="text-[12px] text-[color:var(--text-muted)] opacity-80 border-t border-base pt-4">
          <strong>Disclaimer:</strong> Always review generated code before production use.
        </p>
      </div>
    </div>
  );
}
