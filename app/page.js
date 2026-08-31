'use client';
import * as React from 'react';

export default function Home() {
  const useState = React.useState;
  const [domain, setDomain] = useState('');

  function activate() {
    if (!domain) return;
    const clean = domain.replace('https://','').replace('http://','').replace(/\/.*$/,'').trim();
    const niche = clean.includes('roof') ? 'roofing' : clean.includes('plumb') ? 'plumbing' : clean.includes('hvac') ? 'hvac' : 'roofing';
    window.location.href = '/p/' + clean + '?niche=' + niche + '&city=HOUSTON&old=' + clean + '&b=' + clean;
  }

  return React.createElement('div', {style:{minHeight:'100vh', background:'#fff', fontFamily:'sans-serif'}},
    React.createElement('div', {style:{background:'#000', padding:12, display:'flex', gap:8, justifyContent:'center'}},
      React.createElement('input', {value:domain, onChange:e=>setDomain(e.target.value), placeholder:'Paste client site: houstonroofing2008.biz', style:{width:400, padding:'12px 14px', borderRadius:10, border:'2px solid #d4af37'}}),
      React.createElement('button', {onClick:activate, style:{padding:'12px 18px', background:'#d4af37', color:'#000', borderRadius:10, fontWeight:900, border:0}}, 'ACTIVATE NOW →')
    ),
    React.createElement('div', {style:{textAlign:'center', padding:80}},
      React.createElement('h1', {style:{fontSize:42, fontWeight:900}}, 'VENUS AI ACTIVATION OS 2026'),
      React.createElement('p', {style:{color:'#64748b', marginTop:12}}, 'Business file added. Paste website from email proposal → Crawl old site → Special experience + 5 AI tools working'),
      React.createElement('p', {style:{fontSize:12, color:'#94a3b8', marginTop:20}}, 'Build error fixed: No import { } - using React.useState - No Tap for Voice bar')
    )
  );
}

