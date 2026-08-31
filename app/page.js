use client';
import { useState } from 'react';

export default function Home() {
  const [domain, setDomain] = useState('');
  
  function activate() {
    if(!domain) return;
    // Clean domain
    const clean = domain.replace('https://','').replace('http://','').replace(/\/.*$/,'').trim();
    const niche = clean.includes('roof') ? 'roofing' : clean.includes('plumb') ? 'plumbing' : clean.includes('hvac') ? 'hvac' : 'roofing';
    window.location.href = `/p/${clean}?niche=${niche}&city=HOUSTON&old=${clean}&b=${clean}`;
  }

  return (
    <div style={{minHeight:'100vh', background:'#fff', fontFamily:'sans-serif'}}>
      <div style={{background:'#000', padding:12, display:'flex', gap:8, justifyContent:'center'}}>
        <input value={domain} onChange={e=>setDomain(e.target.value)} placeholder="Paste client site: houstonroofing2008.biz or arizonanativeroofing.com" style={{width:400, padding:'12px 14px', borderRadius:10, border:'2px solid #d4af37'}}/>
        <button onClick={activate} style={{padding:'12px 18px', background:'#d4af37', color:'#000', borderRadius:10, fontWeight:900, border:0, cursor:'pointer'}}>ACTIVATE NOW →</button>
      </div>
      <div style={{textAlign:'center', padding:80}}>
        <h1 style={{fontSize:42, fontWeight:900}}>VENUS AI ACTIVATION OS 2026</h1>
        <p style={{color:'#64748b', marginTop:12}}>Paste website from email proposal → Auto crawl old site → Inject company history, achievements, pictures → Luxury site + 5 AI tools working + Sensible AI + CONF #</p>
        <p style={{fontSize:12, color:'#94a3b8', marginTop:20}}>Example: houstonroofing2008.biz → arizonanativeroofing.com | No Tap for Voice | No Build Error</p>
      </div>
    </div>
  );
}


