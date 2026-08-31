'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Page({ params }) {
  const searchParams = useSearchParams();
  const b = params.b || 'arizonanativeroofing.com';
  const niche = searchParams.get('niche') || 'roofing';
  const city = searchParams.get('city') || 'HOUSTON';
  const old = searchParams.get('old') || 'houstonroofing2008.biz';

  const [oldData, setOldData] = useState(null);
  const [history, setHistory] = useState([]);
  const [msg, setMsg] = useState('');
  const [conf, setConf] = useState('');

  useEffect(() => {
    fetch(`/api/crawl?domain=${old}`)
      .then(r => r.json())
      .then(d => {
        setOldData(d);
        setHistory([{ from: 'ai', text: `Hi! I'm Venus AI for ${b}\n\nI upgraded you from ${d.title} (${old})\n\nFrom your old site: "${d.about?.substring(0,150)}..."\n\nAchievements: ${d.achievements?.join(' • ')}\n\nHow can I assist with ${niche} in ${city}? Try "roof leak cost?"`}]);
      });
  }, []);

  async function send() {
    if (!msg.trim()) return;
    const q = msg;
    setHistory(h => [...h, { from: 'user', text: q }]);
    setMsg('');
    const res = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: q, domain: b, niche, city, old, history, oldData }) });
    const data = await res.json();
    setHistory(h => [...h, { from: 'ai', text: data.reply }]);
    if (data.booked) setConf(data.confirmation);
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ background: '#000', color: '#d4af37', padding: 10, textAlign: 'center', fontSize: 11, fontWeight: 700 }}>
        ACTIVATED: Old {old} → New {b} | {niche.toUpperCase()} {city} | $497 (was $1997) | 24h | 5 AI Tools WORKING
      </div>

      <div style={{ maxWidth: 1150, margin: '0 auto', padding: 20, display: 'grid', gridTemplateColumns: '1.2fr 380px', gap: 20 }}>
        <div style={{ background: '#fff', borderRadius: 20, padding: 24, border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 11, color: '#d4af37', fontWeight: 900, letterSpacing: 1 }}>OLD → NEW UPGRADE 2026</div>
              <h1 style={{ fontSize: 32, fontWeight: 900, margin: '6px 0' }}>{b.toUpperCase()}</h1>
              <div style={{ fontSize: 12, color: '#64748b' }}>{oldData?.title || old} • {city} • Licensed & Insured</div>
            </div>
            <div style={{ background: '#000', color: '#fff', padding: '6px 12px', borderRadius: 20, height: 'fit-content', fontSize: 11 }}>⭐ 4.9 (127)</div>
          </div>

          {oldData && (
            <>
              <div style={{ marginTop: 16, background: '#f8fafc', borderRadius: 12, padding: 14 }}>
                <div style={{ fontWeight: 800, fontSize: 12 }}>FROM YOUR OLD SITE {old} - SPECIAL EXPERIENCE</div>
                <div style={{ fontSize: 13, marginTop: 6, lineHeight: 1.5 }}>{oldData.about}</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8 }}>
                  {oldData.achievements.map(a => <div key={a} style={{ padding: '4px 10px', background: '#fef3c7', border: '1px solid #fcd34d', borderRadius: 20, fontSize: 10, fontWeight: 800 }}>{a}</div>)}
                </div>
              </div>

              {oldData.images?.length > 0 && (
                <div style={{ marginTop: 14 }}>
                  <div style={{ fontSize: 11, fontWeight: 800 }}>YOUR PICTURES FROM OLD SITE - REUSED</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 8 }}>
                    {oldData.images.slice(0, 3).map((img, i) => <img key={i} src={img} style={{ width: '100%', height: 80, objectFit: 'cover', borderRadius: 10 }} />)}
                  </div>
                </div>
              )}
            </>
          )}

          <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: 12 }}><b style={{ fontSize: 12 }}>01 Booking Chat</b><div style={{ fontSize: 10, color: '#16a34a' }}>● LIVE - Sensible AI</div></div>
            <div style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: 12 }}><b style={{ fontSize: 12 }}>02 AI Quote Photo</b><div style={{ fontSize: 10, color: '#16a34a' }}>● LIVE - Upload working</div></div>
            <div style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: 12 }}><b style={{ fontSize: 12 }}>03 Missed-Call SMS</b><div style={{ fontSize: 10, color: '#16a34a' }}>● LIVE - Saves $10k</div></div>
            <div style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: 12 }}><b style={{ fontSize: 12 }}>04 Review Engine</b><div style={{ fontSize: 10, color: '#16a34a' }}>● LIVE - 4.2→4.9★</div></div>
          </div>

          {conf && <div style={{ marginTop: 16, background: '#f0fdf4', border: '2px solid #22c55e', borderRadius: 14, padding: 16 }}><div style={{ fontWeight: 900, color: '#15803d' }}>✅ BOOKED - CONF #</div><div style={{ fontSize: 26, fontWeight: 900 }}>{conf}</div></div>}
        </div>

        <div style={{ border: '2px solid #0f172a', borderRadius: 20, overflow: 'hidden', background: '#fff', display: 'flex', flexDirection: 'column', height: 620 }}>
          <div style={{ background: '#0f172a', color: '#fff', padding: 12 }}><div style={{ fontWeight: 900, fontSize: 12 }}>💬 SENSIBLE AI - {b.toUpperCase()}</div><div style={{ fontSize: 10, color: '#d4af37' }}>Old {old} data + {niche} {city} + CONF #</div></div>
          <div style={{ flex: 1, overflowY: 'auto', padding: 12, background: '#f8fafc' }}>
            {history.map((c, i) => <div key={i} style={{ marginBottom: 10, display: 'flex', justifyContent: c.from === 'user' ? 'flex-end' : 'flex-start' }}><div style={{ maxWidth: '85%', padding: '10px 12px', borderRadius: 14, background: c.from === 'user' ? '#0f172a' : '#fff', color: c.from === 'user' ? '#fff' : '#111', fontSize: 13, border: '1px solid #e2e8f0', whiteSpace: 'pre-wrap' }}>{c.text}</div></div>)}
          </div>
          <div style={{ padding: 10, display: 'flex', gap: 6 }}>
            <input value={msg} onChange={e => setMsg(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask e.g. roof leak cost..." style={{ flex: 1, padding: 10, border: '1px solid #e2e8f0', borderRadius: 10 }} />
            <button onClick={send} style={{ padding: '10px 14px', background: '#d4af37', color: '#000', border: 0, borderRadius: 10, fontWeight: 900 }}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

