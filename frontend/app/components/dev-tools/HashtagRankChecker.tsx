'use client';
import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

export default function HashtagRankChecker() {
  const [hashtags, setHashtags] = useState('');
  const [platform, setPlatform] = useState('Instagram');
  const [result, setResult] = useState<{ ranked: { tag: string; tier: string; followers: string; strategy: string }[] } | null>(null);

  const TIER_RANGES = [
    { max: 10000, tier: 'Small', strategy: 'High chance of ranking. Use for niche visibility.' },
    { max: 100000, tier: 'Micro', strategy: 'Good for targeting niche communities. Mix with smaller tags.' },
    { max: 500000, tier: 'Medium', strategy: 'Competitive but achievable for 500+ follower accounts.' },
    { max: 1000000, tier: 'Large', strategy: 'Hard to rank but good for reach. Use as 1–2 of 10 tags.' },
    { max: Infinity, tier: 'Mega', strategy: 'Extremely competitive. Only useful for massive accounts.' },
  ];

  const classify = () => {
    const tags = hashtags.split(/[\n,]+/).map(t => t.trim().replace(/^#/, '').toLowerCase()).filter(Boolean);
    const ranked = tags.map(tag => {
      const len = tag.length;
      const isGeneric = len < 5;
      const isBrand = /brand|official|com|org/i.test(tag);
      const mockFollowers = isGeneric ? 5000000 : isBrand ? 50000 : len > 15 ? 8000 : len > 10 ? 80000 : 300000;
      const tier = TIER_RANGES.find(r => mockFollowers <= r.max) ?? TIER_RANGES[TIER_RANGES.length - 1];
      return { tag: '#' + tag, tier: tier.tier, followers: mockFollowers >= 1000000 ? (mockFollowers / 1000000).toFixed(1) + 'M' : (mockFollowers / 1000).toFixed(0) + 'K', strategy: tier.strategy };
    });
    setResult({ ranked });
  };

  const tierColor: Record<string, string> = { Small: 'emerald', Micro: 'blue', Medium: 'amber', Large: 'orange', Mega: 'red' };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-base p-6 rounded-xl space-y-4">
        <h2 className="text-[18px] font-semibold text-[color:var(--text)]">Hashtag Rank Checker</h2>
        <p className="text-[14px] text-[color:var(--text-muted)]">Classify your hashtags by size tier and ranking difficulty. Smaller hashtags = easier to rank = better reach for small accounts.</p>
        <div><label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Platform</label>
          <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[14px] text-[color:var(--text)] focus:outline-none focus:border-blue-500">
            {['Instagram', 'YouTube', 'LinkedIn', 'Twitter/X'].map(p => <option key={p}>{p}</option>)}</select></div>
        <div><label className="block text-[13px] font-medium text-[color:var(--text)] mb-1">Hashtags (comma or line separated)</label>
          <textarea value={hashtags} onChange={e => setHashtags(e.target.value)} rows={5}
            placeholder={'#digitalmarketing\n#seo\n#freelanceindia\n#contentcreator2025'}
            className="w-full px-3 py-2 rounded-lg border border-base bg-page text-[13px] font-mono text-[color:var(--text)] focus:outline-none focus:border-blue-500 resize-y" /></div>
        <button onClick={classify} className="w-full py-2.5 rounded-lg bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 transition-colors"><TrendingUp className="w-4 h-4 inline mr-2" />Analyze Hashtags</button>
      </div>
      {result && (
        <div className="bg-card border border-base p-6 rounded-xl space-y-3">
          <h3 className="text-[14px] font-semibold text-[color:var(--text)]">Hashtag Analysis ({result.ranked.length} tags)</h3>
          {result.ranked.map(r => {
            const c = tierColor[r.tier] ?? 'blue';
            return (
              <div key={r.tag} className={`bg-${c}-500/10 border border-${c}-500/20 rounded-lg p-3 flex items-start justify-between gap-3`}>
                <div>
                  <div className="font-mono text-[13px] font-bold text-[color:var(--text)]">{r.tag}</div>
                  <div className="text-[12px] text-[color:var(--text-muted)] mt-0.5">{r.strategy}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className={`text-[12px] font-bold text-${c}-500`}>{r.tier}</div>
                  <div className="text-[11px] text-[color:var(--text-muted)]">~{r.followers}</div>
                </div>
              </div>
            );
          })}
          <p className="text-[12px] text-[color:var(--text-muted)]">Sizes are estimated structural approximations. For real post counts, search the hashtag directly on Instagram or LinkedIn.</p>
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
