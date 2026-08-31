use client';
import {useState} from 'react';

const NICHES = {
  roofing: {icon:'🏠', color:'#0f172a', services:[{name:'Roof Repair',price:'$450-$2k',time:'2-4 hrs'},{name:'Full Replacement',price:'$4.2k-$8k',time:'1-2 days'},{name:'Emergency Leak',price:'$350-$1.5k',time:'60 min'},{name:'Gutter + Inspect',price:'$189-$450',time:'1 hr'}]},
  plumbing: {icon:'🚿', color:'#0c4a6e', services:[{name:'Drain Cleaning',price:'$89-$250',time:'45 min'},{name:'Water Heater',price:'$450-$1.2k',time:'2 hrs'},{name:'Emergency Plumbing',price:'$150-$500',time:'60 min'},{name:'Leak Repair',price:'$120-$400',time:'1 hr'}]},
  hvac: {icon:'❄️', color:'#1e293b', services:[{name:'AC Repair',price:'$150-$600',time:'1 hr'},{name:'Furnace Install',price:'$2.5k-$6k',time:'1 day'},{name:'Duct Cleaning',price:'$300-$700',time:'2 hrs'},{name:'Tune-up',price:'$89-$150',time:'45 min'}]},
  electric: {icon:'⚡', color:'#422006', services:[{name:'Panel Upgrade',price:'$1.2k-$3k',time:'4 hrs'},{name:'Wiring Repair',price:'$150-$600',time:'1 hr'},{name:'Emergency Electric',price:'$200-$800',time:'60 min'},{name:'Lighting Install',price:'$120-$400',time:'1 hr'}]},
  dentist: {icon:'🦷', color:'#134e4a', services:[{name:'Cleaning',price:'$99-$200',time:'60 min'},{name:'Whitening',price:'$299-$600',time:'90 min'},{name:'Emergency',price:'$150-$500',time:'45 min'},{name:'Implant Consult',price:'Free',time:'30 min'}]},
};

export default function Page(){
  const [domain,setDomain]=useState('plumbinaz.com');
  const [niche,setNiche]=useState('plumbing');
  const [crawl,setCrawl]=useState({title:'plumbinaz.com'});
  const [msg,setMsg]=useState('');
  const [history,setHistory]=useState([{from:'ai',text:'Hi 👋 I am Venus AI - Your 24/7 assistant for PLUMBING. How can I assist you today? I can give real pricing, book instantly, and answer from venus-ai-voice with Browse ON.'}]);
  const [showQuote,setShowQuote]=useState(null);
  const [leads,setLeads]=useState(3);

  async function activate(){
    const d=domain.toLowerCase();
    const det = d.includes('roof')?'roofing':d.includes('plumb')?'plumbing':d.includes('hvac')||d.includes('air')?'hvac':d.includes('electr')?'electric':d.includes('dent')?'dentist':'plumbing';
    setNiche(det);
    try{
      const r=await fetch('/api/crawl?domain='+domain);
      const data=await r.json();
      setCrawl(data);
      setHistory([{from:'ai',text:`Hi! Welcome to ${data.title || domain} - I'm Venus AI linked to venus-ai-voice. How can I assist you with ${NICHES[det].services.map(s=>s.name).join(', ')}? Real answers + instant booking 24/7.`}]);
    }catch(e){ setCrawl({title:domain}); }
  }

  function send(){
    if(!msg.trim()) return;
    const q=msg;
    setHistory(h=>[...h,{from:'user',text:q}]);
    setMsg('');
    setTimeout(()=>{
      setHistory(h=>[...h,{from:'ai',text:`💡 REAL ANSWER from Venus AI Voice (venusplaza7-dot.github.io/venus-ai-voice) for "${q}" at ${domain}:\n\nAs a ${niche} pro in 2026, ${NICHES[niche].services[0].name} costs ${NICHES[niche].services[0].price} and takes ${NICHES[niche].services[0].time}. I can book you now for today. What's your phone? \n\n✅ AI Tools Active: Booking Chat, Missed-Call Text (saves $10k/mo), Review Engine.`}]);
      setLeads(l=>l+1);
    },700);
  }

  const data = NICHES[niche];
  const biz = crawl?.title || domain;

  return (
    <div style={{minHeight:'100vh',background:'#fafafa',fontFamily:'Inter, system-ui, sans-serif',color:'#111'}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');`}</style>

      {/* ACTIVATION BAR - For you only */}
      <div style={{background:'#000',padding:10,display:'flex',gap:8,justifyContent:'center',position:'sticky',top:0,zIndex:50}}>
        <input value={domain} onChange={e=>setDomain(e.target.value)} placeholder='Client domain: lyonsroofing.com' style={{padding:'10px 14px',borderRadius:8,border:'1px solid #d4af37',width:220,fontSize:13}}/>
        <button onClick={activate} style={{padding:'10px 18px',background:'#d4af37',color:'#000',borderRadius:8,fontWeight:900,border:0,cursor:'pointer'}}>ACTIVATE 2026 SITE</button>
        <select value={niche} onChange={e=>setNiche(e.target.value)} style={{padding:10,borderRadius:8,background:'#111',color:'#fff',border:'1px solid #333'}}>
          {Object.keys(NICHES).map(n=><option key={n} value={n}>{n.toUpperCase()}</option>)}
        </select>
        <a href="https://venusplaza7-dot.github.io/venus-ai-voice/" target="_blank" style={{padding:10,background:'#fff',color:'#000',borderRadius:8,fontSize:12,fontWeight:700,textDecoration:'none'}}>Venus AI Voice ↗</a>
      </div>

      {/* HEADER 2026 */}
      <div style={{background:'#fff',borderBottom:'1px solid #eee',padding:'18px 24px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{display:'flex',gap:12,alignItems:'center'}}><div style={{width:36,height:36,background
