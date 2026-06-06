'use client';

import { useState, useCallback, useRef, useEffect, DragEvent } from 'react';
import { Upload, FileText } from 'lucide-react';
import { ToolShell, CopyButton } from './SplitEditorPane';

function md5(str: string): string {
  function safeAdd(x: number, y: number) { const l=(x&0xffff)+(y&0xffff); return ((x>>16)+(y>>16)+(l>>16))<<16|(l&0xffff); }
  function rol(n: number, b: number) { return n<<b|n>>>(32-b); }
  function cmn(q: number,a: number,b: number,x: number,s: number,t: number) { return safeAdd(rol(safeAdd(safeAdd(a,q),safeAdd(x,t)),s),b); }
  function ff(a:number,b:number,c:number,d:number,x:number,s:number,t:number){return cmn(b&c|~b&d,a,b,x,s,t);}
  function gg(a:number,b:number,c:number,d:number,x:number,s:number,t:number){return cmn(b&d|c&~d,a,b,x,s,t);}
  function hh(a:number,b:number,c:number,d:number,x:number,s:number,t:number){return cmn(b^c^d,a,b,x,s,t);}
  function ii(a:number,b:number,c:number,d:number,x:number,s:number,t:number){return cmn(c^(b|~d),a,b,x,s,t);}

  function rstr2binl(s:string){const o:number[]=Array(s.length>>2).fill(0);for(let i=0;i<s.length*8;i+=8)o[i>>5]|=(s.charCodeAt(i/8)&0xff)<<i%32;return o;}
  function binl2rstr(b:number[]){let o='';for(let i=0;i<b.length*32;i+=8)o+=String.fromCharCode(b[i>>5]>>>i%32&0xff);return o;}
  function binl_md5(x:number[],l:number){
    x[l>>5]|=0x80<<l%32;x[(l+64>>>9<<4)+14]=l;
    let a=1732584193,b=-271733879,c=-1732584194,d=271733878;
    for(let i=0;i<x.length;i+=16){
      const oa=a,ob=b,oc=c,od=d;
      a=ff(a,b,c,d,x[i],7,-680876936);d=ff(d,a,b,c,x[i+1],12,-389564586);c=ff(c,d,a,b,x[i+2],17,606105819);b=ff(b,c,d,a,x[i+3],22,-1044525330);
      a=ff(a,b,c,d,x[i+4],7,-176418897);d=ff(d,a,b,c,x[i+5],12,1200080426);c=ff(c,d,a,b,x[i+6],17,-1473231341);b=ff(b,c,d,a,x[i+7],22,-45705983);
      a=ff(a,b,c,d,x[i+8],7,1770035416);d=ff(d,a,b,c,x[i+9],12,-1958414417);c=ff(c,d,a,b,x[i+10],17,-42063);b=ff(b,c,d,a,x[i+11],22,-1990404162);
      a=ff(a,b,c,d,x[i+12],7,1804603682);d=ff(d,a,b,c,x[i+13],12,-40341101);c=ff(c,d,a,b,x[i+14],17,-1502002290);b=ff(b,c,d,a,x[i+15],22,1236535329);
      a=gg(a,b,c,d,x[i+1],5,-165796510);d=gg(d,a,b,c,x[i+6],9,-1069501632);c=gg(c,d,a,b,x[i+11],14,643717713);b=gg(b,c,d,a,x[i],20,-373897302);
      a=gg(a,b,c,d,x[i+5],5,-701558691);d=gg(d,a,b,c,x[i+10],9,38016083);c=gg(c,d,a,b,x[i+15],14,-660478335);b=gg(b,c,d,a,x[i+4],20,-405537848);
      a=gg(a,b,c,d,x[i+9],5,568446438);d=gg(d,a,b,c,x[i+14],9,-1019803690);c=gg(c,d,a,b,x[i+3],14,-187363961);b=gg(b,c,d,a,x[i+8],20,1163531501);
      a=gg(a,b,c,d,x[i+13],5,-1444681467);d=gg(d,a,b,c,x[i+2],9,-51403784);c=gg(c,d,a,b,x[i+7],14,1735328473);b=gg(b,c,d,a,x[i+12],20,-1926607734);
      a=hh(a,b,c,d,x[i+5],4,-378558);d=hh(d,a,b,c,x[i+8],11,-2022574463);c=hh(c,d,a,b,x[i+11],16,1839030562);b=hh(b,c,d,a,x[i+14],23,-35309556);
      a=hh(a,b,c,d,x[i+1],4,-1530992060);d=hh(d,a,b,c,x[i+4],11,1272893353);c=hh(c,d,a,b,x[i+7],16,-155497632);b=hh(b,c,d,a,x[i+10],23,-1094730640);
      a=hh(a,b,c,d,x[i+13],4,681279174);d=hh(d,a,b,c,x[i],11,-358537222);c=hh(c,d,a,b,x[i+3],16,-722521979);b=hh(b,c,d,a,x[i+6],23,76029189);
      a=hh(a,b,c,d,x[i+9],4,-640364487);d=hh(d,a,b,c,x[i+12],11,-421815835);c=hh(c,d,a,b,x[i+15],16,530742520);b=hh(b,c,d,a,x[i+2],23,-995338651);
      a=ii(a,b,c,d,x[i],6,-198630844);d=ii(d,a,b,c,x[i+7],10,1126891415);c=ii(c,d,a,b,x[i+14],15,-1416354905);b=ii(b,c,d,a,x[i+5],21,-57434055);
      a=ii(a,b,c,d,x[i+12],6,1700485571);d=ii(d,a,b,c,x[i+3],10,-1894986606);c=ii(c,d,a,b,x[i+10],15,-1051523);b=ii(b,c,d,a,x[i+1],21,-2054922799);
      a=ii(a,b,c,d,x[i+8],6,1873313359);d=ii(d,a,b,c,x[i+15],10,-30611744);c=ii(c,d,a,b,x[i+6],15,-1560198380);b=ii(b,c,d,a,x[i+13],21,1309151649);
      a=ii(a,b,c,d,x[i+4],6,-145523070);d=ii(d,a,b,c,x[i+11],10,-1120210379);c=ii(c,d,a,b,x[i+2],15,718787259);b=ii(b,c,d,a,x[i+9],21,-343485551);
      a=safeAdd(a,oa);b=safeAdd(b,ob);c=safeAdd(c,oc);d=safeAdd(d,od);
    }
    return [a,b,c,d];
  }
  function str2rstr_utf8(s:string){let o='',i=-1,x,y;while(++i<s.length){x=s.charCodeAt(i);y=i+1<s.length?s.charCodeAt(i+1):0;if(x>=0xd800&&x<=0xdbff&&y>=0xdc00&&y<=0xdfff){x=0x10000+((x&0x3ff)<<10)+(y&0x3ff);i++;}if(x<=0x7f)o+=String.fromCharCode(x);else if(x<=0x7ff)o+=String.fromCharCode(0xc0|(x>>>6&0x1f),0x80|(x&0x3f));else if(x<=0xffff)o+=String.fromCharCode(0xe0|(x>>>12&0x0f),0x80|(x>>>6&0x3f),0x80|(x&0x3f));else o+=String.fromCharCode(0xf0|(x>>>18&0x07),0x80|(x>>>12&0x3f),0x80|(x>>>6&0x3f),0x80|(x&0x3f));}return o;}
  const r=str2rstr_utf8(str);
  const b=binl_md5(rstr2binl(r),r.length*8);
  const s=binl2rstr(b);
  const hex='0123456789abcdef';
  let out='';for(let i=0;i<s.length;i++){const c=s.charCodeAt(i);out+=hex[c>>>4&0xf]+hex[c&0xf];}
  return out;
}

async function shaHex(algo: string, buf: ArrayBuffer): Promise<string> {
  const hash = await crypto.subtle.digest(algo, buf);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

interface Hashes { md5: string; sha1: string; sha256: string; sha512: string }

async function hashBuffer(buf: ArrayBuffer, rawStr?: string): Promise<Hashes> {
  const [sha1, sha256, sha512] = await Promise.all([
    shaHex('SHA-1',   buf),
    shaHex('SHA-256', buf),
    shaHex('SHA-512', buf),
  ]);
  return { md5: rawStr !== undefined ? md5(rawStr) : '(unavailable for binary)', sha1, sha256, sha512 };
}

const ALGOS: { key: keyof Hashes; label: string }[] = [
  { key: 'md5',    label: 'MD5'    },
  { key: 'sha1',   label: 'SHA-1'  },
  { key: 'sha256', label: 'SHA-256'},
  { key: 'sha512', label: 'SHA-512'},
];

export default function HashGenerator() {
  const [input,   setInput]   = useState('');
  const [hashes,  setHashes]  = useState<Hashes | null>(null);
  const [upper,   setUpper]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [drag,    setDrag]    = useState(false);
  const [fileName, setFileName] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const computeText = useCallback(async (text: string) => {
    if (!text) { setHashes(null); setFileName(''); return; }
    setLoading(true);
    const buf = new TextEncoder().encode(text).buffer as ArrayBuffer;
    setHashes(await hashBuffer(buf, text));
    setLoading(false);
  }, []);

  useEffect(() => { computeText(input); }, [input, computeText]);

  const computeFile = useCallback(async (file: File) => {
    setLoading(true); setInput(''); setFileName(file.name);
    const buf = await file.arrayBuffer();
    setHashes(await hashBuffer(buf));
    setLoading(false);
  }, []);

  const onDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault(); setDrag(false);
    const file = e.dataTransfer.files[0]; if (file) computeFile(file);
  }, [computeFile]);

  const fmt = (h: string) => upper ? h.toUpperCase() : h;

  const iconBtn = 'inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded transition-colors bg-[rgba(0,0,0,0.05)] dark:bg-[rgba(255,255,255,0.07)] text-[var(--text-muted)] hover:text-[var(--text)]';

  return (
    <ToolShell>
      <div className="space-y-4">
        <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
              <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>Input Text</span>
            </div>
            {input && <button onClick={() => { setInput(''); setHashes(null); }} className={iconBtn}>Clear</button>}
          </div>
          <textarea
            value={input} onChange={e => { setInput(e.target.value); setFileName(''); }}
            placeholder="Type or paste text to hash…"
            className="w-full resize-none font-mono text-[13px] p-4 bg-transparent outline-none"
            style={{ minHeight: 100, color: 'var(--text)', caretColor: 'var(--text)' }}
          />
        </div>

        <div
          onDragOver={e => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={onDrop}
          onClick={() => fileRef.current?.click()}
          className={`rounded-xl border-2 border-dashed transition-colors cursor-pointer flex items-center gap-3 px-4 py-3 ${drag ? 'border-[#7C3AED] bg-[rgba(124,58,237,0.05)]' : 'border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] hover:border-[#7C3AED]'}`}
        >
          <Upload className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--text-muted)' }} />
          <div>
            <p className="text-[13px] font-medium" style={{ color: 'var(--text)' }}>
              {fileName ? fileName : 'Drop any file here, or click to browse'}
            </p>
            <p className="text-[11px]" style={{ color: 'var(--text-subtle)' }}>Hashed entirely in your browser — file never leaves your device</p>
          </div>
          <input ref={fileRef} type="file" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) computeFile(f); e.target.value = ''; }} />
        </div>

        {(hashes || loading) && (
          <div className="rounded-xl border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.07)] overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 bg-[var(--surface)] border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)]">
              <div className="flex items-center gap-2">
                {fileName && <FileText className="w-3.5 h-3.5" style={{ color: 'var(--text-muted)' }} />}
                <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>{fileName || 'Hashes'}</span>
              </div>
              <button onClick={() => setUpper(u => !u)} className={`${iconBtn} ${upper ? 'bg-[#7C3AED] text-white' : ''}`}>
                {upper ? 'UPPER' : 'lower'}
              </button>
            </div>
            <table className="w-full">
              <tbody>
                {ALGOS.map(({ key, label }) => (
                  <tr key={key} className="border-t border-[rgba(0,0,0,0.04)] dark:border-[rgba(255,255,255,0.04)] first:border-0">
                    <td className="px-4 py-3 w-20"><span className="text-[12px] font-bold font-mono" style={{ color: '#7C3AED' }}>{label}</span></td>
                    <td className="px-4 py-3">
                      {loading ? (
                        <span className="text-[12px]" style={{ color: 'var(--text-subtle)' }}>Computing…</span>
                      ) : (
                        <code className="text-[11px] font-mono break-all" style={{ color: 'var(--text)' }}>{hashes ? fmt(hashes[key]) : ''}</code>
                      )}
                    </td>
                    <td className="px-3 py-3 text-right">
                      {!loading && hashes && <CopyButton text={fmt(hashes[key])} />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </ToolShell>
  );
}
