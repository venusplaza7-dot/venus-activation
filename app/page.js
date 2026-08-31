'use client';
import {useState} from 'react';

const NICHES = {
  roofing: {services:[{name:'Roof Repair',price:'$450-$2k'},{name:'Full Replacement',price:'$4.2k-$8k'},{name:'Emergency Leak',price:'$350-$1.5k'},{name:'Gutter + Inspect',price:'$189-$450'}], chat:'Roof leak? I can give you instant AI quote from a photo and book lyonsroofing.com 24/7'},
  plumbing: {services:[{name:'Drain Cleaning',price:'$89-$250'},{name:'Water Heater',price:'$450-$1.2k'},{name:'Emergency Plumbing',price:'$150-$500'},{name:'Leak Repair',price:'$120-$400'}], chat:'Drain clogged? I can give AI quote and book a plumber in 2 mins - what is your address?'},
  hvac: {services:[{name:'AC Repair',price:'$150-$600'},{name:'Furnace Install',price:'$2.5k-$6k'},{name:'Duct Cleaning',price:'$300-$700'},{name:'Tune-up',price:'$89-$150'}], chat:'AC not cooling? I can diagnose via AI and book HVAC tech today - how can I assist?'},
  electric: {services:[{name:'Panel Upgrade',price:'$1.2k-$3k'},{name:'Wiring Repair',price:'$150-$600'},{name:'Emergency Electric',price:'$200-$800'},{name:'Lighting Install',price:'$120-$400'}], chat:'Power issue? I can give instant AI quote and book electrician 24/7'},
  dentist: {services:[{name:'Cleaning',price:'$99-$200'},{name:'Whitening',price:'$299-$600'},{name:'Emergency',price:'$150-$500'},{name:'Implant Consult',price:'Free'}], chat:'Need dentist appointment? I can book you instantly with AI - what service do you need?'},
};

export default function Page(){
  const [domain,setDomain]=useState('');
  const [niche,setNiche]=useState('roofing');
  const [crawl,setCrawl]=useState(null);
  const [loading,setLoading]=useState(false);
  const [chatMsg,setChatMsg]=useState('');
  const [chatHistory,setChatHistory]=useState([]);

  async function doCrawl(){
    setLoading(true);
    const detected = domain.includes('roof')?'roofing':domain.includes('plumb')?'plumbing':domain.includes('hvac')||domain.includes('air')?'hvac':domain.includes('electr')?'electric':domain.includes('dental')||domain.includes('dentist')?'dentist':'roofing';
    setNiche(detected);
    try{
      const r=await fetch('/api/crawl?domain='+domain);
      const data=await r.json();
      setCrawl(data);
      setChatHistory([{from:'AI', text:`Hi! Welcome to ${data.title || domain}. ${NICHES[detected].chat} How can I assist you today?`}]);
    }catch(e){}
    setLoading(false);
  }

  function sendChat(){
    if(!chatMsg) return;
    const nh=[...chatHistory,{from:'Customer',text:chatMsg}];
    setChatHistory(nh);
    setChatMsg('');
    setTimeout(()=>{
      const svc=NICHES[niche].services[0];
      setChatHistory([...nh,{from:'AI',text:`For "${chatMsg}" - ${svc.name} is ${svc.price} with AI Quote. I can book now - what's your phone?`}]);
    },600);
  }

  const services = NICHES[niche].services;

  return (
    <div style={{minHeight:'100vh',background:'#000',color:'#fff',fontFamily:'sans-serif',padding:12}}>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <div style={{border:'2px solid #D4AF37',borderRadius:12,padding:12,display:'flex',gap:8,flexWrap:'wrap'}}>
          <input value={domain} onChange={e=>setDomain(e.target.value)} placeholder='lyonsroofing.com' style={{flex:1,minWidth:200,padding:10,background:'#111',color:'#fff',border:'1px solid #D4AF37',borderRadius:8}}/>
          <button disabled={loading||!domain} onClick={doCrawl} style={{padding:'10px 16px',background:'#D4AF37',color:'#000',fontWeight:900,border:0,borderRadius:8}}>{loading?'CRAWLING...':'CRAWL + ACTIVATE'}</button>
          <select value={niche} onChange={e=>setNiche(e.target.value)} style={{padding:10,background:'#111',color:'#D4AF37',border:'1px solid #D4AF37',borderRadius:8}}>
            {Object.keys(NICHES).map(n=><option key={n} value={n}>{n.toUpperCase()}</option>)}
          </select>
        </div>

        {crawl && (
          <div style={{display:'grid',gridTemplateColumns:'1fr 340px',gap:12,marginTop:12}}>
            <div>
              <div style={{background:'#111',border:'1px solid #333',borderRadius:12,padding:12}}>
                <p style={{color:'#888',fontSize:11,margin:0}}>Original {crawl.title} → Rebuilt 2027 — Personalized for {domain} — {niche.toUpperCase()}</p>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8,marginTop:10}}>
                  <div style={{border:'1px solid #333',borderRadius:10,padding:10,textAlign:'center'}}><div style={{color:'#888',fontSize:11}}>Leads / week</div><div style={{fontSize:22,fontWeight:900}}>27 → 84</div><div style={{color:'#D4AF37',fontSize:11}}>+211% after rebuild</div></div>
                  <div style={{border:'1px solid #333',borderRadius:10,padding:10,textAlign:'center'}}><div style={{color:'#888',fontSize:11}}>Booking rate</div><div style={{fontSize:22,fontWeight:900}}>11% → 38%</div><div style={{color:'#D4AF37',fontSize:11}}>AI chat + quote</div></div>
                  <div style={{border:'1px solid #333',borderRadius:10,padding:10,textAlign:'center'}}><div style={{color:'#888',fontSize:11}}>Delivery</div><div style={{fontSize:22,fontWeight:900}}>24 Hours</div><div style={{color:'#D4AF37',fontSize:11}}>All 5 AI tools live</div></div>
                </div>
                <div style={{marginTop:12,display:'grid',gap:8}}>
                  {services.map(s=>(
                    <div key={s.name} style={{border:'1px solid #333',borderRadius:10,padding:12,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                      <div><div style={{fontWeight:700}}>{s.name}</div><div style={{color:'#D4AF37',fontSize:12}}>{s.price} • AI Quote • Book Now →</div></div>
                      <button onClick={()=>setChatHistory([...chatHistory,{from:'AI',text:`You selected ${s.name} (${s.price}). Upload photo for instant AI quote!`}])} style={{padding:'6px 10px',background:'#D4AF37',color:'#000',border:0,borderRadius:6,fontSize:11,fontWeight:700}}>BOOK</button>
                    </div>
                  ))}
                </div>
                <div style={{marginTop:12}}>
                  <div style={{color:'#888',fontSize:11,letterSpacing:2}}>[ 5 AI TOOLS YOU GET IN 24H ]</div>
                  <div style={{border:'1px solid #333',borderRadius:12,overflow:'hidden',marginTop:8,background:'#fff',color:'#000'}}>
                    <div style={{display:'flex',gap:10,padding:12,borderBottom:'1px solid #eee'}}><div style={{color:'#D4AF37',fontWeight:900}}>01</div><div style={{flex:1}}><div style={{fontWeight:900,fontSize:13}}>AI BOOKING CHAT</div><div style={{fontSize:11,color:'#666'}}>Replaces form for {domain}. 8% → 34% conversion. Books 24/7</div></div><div style={{background:'#fef3c7',padding:'4px 8px',borderRadius:12,fontSize:9}}>INCLUDED IN $497</div></div>
                    <div style={{display:'flex',gap:10,padding:12,borderBottom:'1px solid #eee'}}><div style={{color:'#D4AF37',fontWeight:900}}>02</div><div style={{flex:1}}><div style={{fontWeight:900,fontSize:13}}>AI QUOTE ESTIMATOR</div><div style={{fontSize:11,color:'#666'}}>Instant price from photos → 4x bookings.</div></div><div style={{background:'#fef3c7',padding:'4px 8px',borderRadius:12,fontSize:9}}>INCLUDED IN $497</div></div>
                    <div style={{display:'flex',gap:10,padding:12,borderBottom:'1px solid #eee'}}><div style={{color:'#D4AF37',fontWeight:900}}>03</div><div style={{flex:1}}><div style={{fontWeight:900,fontSize:13}}>AI MISSED-CALL TEXT</div><div style={{fontSize:11,color:'#666'}}>Missed call? Texts in 3s. Saves $10k/mo.</div></div><div style={{background:'#fef3c7',padding:'4px 8px',borderRadius:12,fontSize:9}}>INCLUDED IN $497</div></div>
                    <div style={{display:'flex',gap:10,padding:12,borderBottom:'1px solid #eee'}}><div style={{color:'#D4AF37',fontWeight:900}}>04</div><div style={{flex:1}}><div style={{fontWeight:900,fontSize:13}}>AI REVIEW ENGINE</div><div style={{fontSize:11,color:'#666'}}>Auto asks review, auto replies SEO. 4.2 → 4.9 ★.</div></div><div style={{background:'#fef3c7',padding:'4px 8px',borderRadius:12,fontSize:9}}>INCLUDED IN $497</div></div>
                    <div style={{display:'flex',gap:10,padding:12}}><div style={{color:'#D4AF37',fontWeight:900}}>05</div><div style={{flex:1}}><div style={{fontWeight:900,fontSize:13}}>AI UPSELL & REBOOK</div><div style={{fontSize:11,color:'#666'}}>30 days later upsell + live revenue dashboard.</div></div><div style={{background:'#fef3c7',padding:'4px 8px',borderRadius:12,fontSize:9}}>INCLUDED IN $497</div></div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{background:'#111',border:'2px solid #D4AF37',borderRadius:12,overflow:'hidden',height:'fit-content'}}>
              <div style={{background:'#D4AF37',color:'#000',padding:8,textAlign:'center',fontWeight:900,fontSize:11}}>LIVE - {domain.toUpperCase()}</div>
              <div style={{padding:10}}>
                <div style={{background:'#000',borderRadius:8,padding:8,height:300,overflowY:'auto'}}>
                  {chatHistory.map((c,i)=>(
                    <div key={i} style={{marginBottom:8,padding:6,borderRadius:6,background:c.from==='AI'?'#111':'#D4AF37',color:c.from==='AI'?'#D4AF37':'#000',fontSize:11}}><b>{c.from}:</b> {c.text}</div>
                  ))}
                </div>
                <div style={{display:'flex',gap:4,marginTop:8}}>
                  <input value={chatMsg} onChange={e=>setChatMsg(e.target.value)} onKeyDown={e=>e.key==='Enter' && sendChat()} placeholder="Test chat..." style={{flex:1,padding:8,background:'#000',color:'#fff',border:'1px solid #333',borderRadius:6,fontSize:11}}/>
                  <button onClick={sendChat} style={{padding:'8px 12px',background:'#D4AF37',color:'#000',border:0,borderRadius:6,fontWeight:900,fontSize:11}}>SEND</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
