'use client';
import { useState } from 'react';

export default function TestOpenAI() {
  const [prompt, setPrompt] = useState('Say hello from Carys.');
  const [loading, setLoading] = useState(false);
  const [out, setOut] = useState('');
  const [err, setErr] = useState('');

  async function runTest(e){
    e.preventDefault();
    setLoading(true); setOut(''); setErr('');
    try{
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [
          { role: 'system', content: 'You are Carys, a friendly UK assistant.' },
          { role: 'user', content: prompt }
        ] })
      });
      const data = await res.json();
      if (!res.ok) setErr(`HTTP ${res.status}: ${data?.error || 'Unknown error'}`);
      else setOut(data?.reply ?? '(No content)');
    }catch(e){ setErr(e?.message || String(e)); }
    finally{ setLoading(false); }
  }

  return (
    <section style={{ maxWidth: 760, margin: '0 auto', padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Test OpenAI Connection</h1>
      <form onSubmit={runTest} style={{ display: 'grid', gap: 12 }}>
        <textarea rows={4} value={prompt} onChange={e=>setPrompt(e.target.value)} style={{padding:12,borderRadius:10,border:'1px solid var(--border)',background:'var(--card)'}} />
        <button className="btn primary" disabled={loading}>{loading?'Testing…':'Send test request'}</button>
      </form>
      {out && <div className="card" style={{marginTop:12}}><strong>Reply</strong><div>{out}</div></div>}
      {err && <div className="card" style={{marginTop:12,borderColor:'#fca5a5',background:'#fff1f2',color:'#991b1b'}}><strong>Error</strong><div style={{whiteSpace:'pre-wrap'}}>{err}</div></div>}
    </section>
  );
}
