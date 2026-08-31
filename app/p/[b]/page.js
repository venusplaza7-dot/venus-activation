'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

export const dynamic = 'force-dynamic';

function ActivateContent({ params }) {
  const searchParams = useSearchParams();
  const b = params.b || 'arizonanativeroofing.com';
  const niche = searchParams.get('niche') || 'roofing';
  const city = (searchParams.get('city') || 'HOUSTON').toUpperCase();
  const old = searchParams.get('old') || 'houstonroofing2008.biz';

  const [oldData, setOldData] = useState(null);
  const [history, setHistory] = useState([]);
  const [msg, setMsg] = useState('');
  const [conf, setConf] = useState('');

  useEffect(() => {
    fetch(`/api/crawl?domain=${old}`).then(r=>r.json()).then(d=>{
      setOldData(d);
      setHistory([{from:'ai', text:`Hi! Venus AI for ${b} - Upgraded from ${d.title}\n\nFrom your old site (${old}): "${d.about?.slice(0,200)}..."\n\nAchievements: ${d.achievements?.join(' • ')}\n\nHow can I help with ${niche} in ${city}? Try "roof leak cost?"`}]);
    });
  }, []);

  async function send(){
    if(!msg.trim()) return;
    const q=msg;
    setHistory(h=>[...h,{from:'user',text:q}]);
    setMsg('');
    const res=await fetch('/api/chat',{method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({message:q, domain:b, niche, city, old, history, oldData})});
    const data=await res.json();
    setHistory(h=>[...h,{from:'ai',text:data.reply}]);
    if(data.booked) setConf(data.confirmation);
  }

  return (
    <div style={{minHeight:'100vh', background:'#fff'}}>
      <div style={{background:'#000', color:'#d4af37', padding:10, textAlign:'center', fontSize:11, fontWeight:700}}>OLD: {old} → NEW: {b} | {niche.toUpperCase()} {city} | $497 | 5 TOOLS WORKING | NO TAP FOR VOICE</div>
      <div style={{maxWidth:1100, margin:'0 auto', padding:20, display:'grid', gridTemplateColumns:'1.2fr 380px', gap:20}}>
        <div style={{border:'1px solid #e2e8f0', borderRadius:20, padding:24}}>
          <h1 style={{fontSize:28, fontWeight:900, margin:0}}>{b.toUpperCase()} - {city} {niche.toUpperCase()} 2026</h1>
          <p style={{fontSize:12, color:'#64748b'}}>{oldData?.title || old} - Special experience: old site history, pictures, achievements injected</p>
          {oldData && <div style={{marginTop:14, background:'#f8fafc', padding:14, borderRadius:12}}><div style={{fontWeight:800, fontSize:12}}>FROM OLD SITE {old}</div><div style={{fontSize:13, marginTop:6}}>{oldData.about}</div><div style={{display:'flex', gap:6, marginTop:8, flexWrap:'wrap'}}>{oldData.achievements.map(a=><div key={a} style={{padding:'4px 10px', background:'#fef3c7', borderRadius:20, fontSize:10, fontWeight:800}}>{a}</div>)}</div></div>}
          {conf && <div style={{marginTop:16, background:'#f0fdf4', border:'2px solid #22c55e', padding:16, borderRadius:12}}><div style={{fontWeight:900, color:'#15803d'}}>✅ CONFIRMATION #{conf}</div></div>}
        </div>
        <div style={{border:'2px solid #0f172a', borderRadius:20, overflow:'hidden', height:600, display:'flex', flexDirection:'column'}}>
          <div style={{background:'#0f172a', color:'#fff', padding:12, fontWeight:900, fontSize:12}}>💬 SENSIBLE AI - NO VOICE BAR</div>
          <div style={{flex:1, overflowY:'auto', padding:12, background:'#f8fafc'}}>{history.map((c,i)=><div key={i} style={{marginBottom:10, display:'flex', justifyContent:c.from==='user'?'flex-end':'flex-start'}}><div style={{maxWidth:'85%', padding:'10px 12px', borderRadius:14, background:c.from==='user'?'#0f172a':'#fff', fontSize:13, border:'1px solid #e2e8f0', whiteSpace:'pre-wrap'}}>{c.text}</div></div>)}</div>
          <div style={{padding:10, display:'flex', gap:6}}><input value={msg} onChange={e=>setMsg(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Type issue or phone for CONF #" style={{flex:1, padding:10, border:'1px solid #e2e8f0', borderRadius:10}}/><button onClick={send} style={{padding:'10px 14px', background:'#d4af37', border:0, borderRadius:10, fontWeight:900}}>Send</button></div>
        </div>
      </div>
    </div>
  );
}

export default function Page(props){
  return <Suspense fallback={<div style={{padding:40, textAlign:'center'}}>Loading activation for {props.params.b}...</div>}><ActivateContent {...props}/></Suspense>;
}
