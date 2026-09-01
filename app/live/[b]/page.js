"use client";
import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
export default function Page(){
  const {b}=useParams(); const biz=Array.isArray(b)?b[b.length-1]:b||"arizonanativeroofing.com";
  const [sq,setSq]=useState(2400); const [chat,setChat]=useState(false);
  const [msgs,setMsgs]=useState([{r:'ai',t:"Hey! I'm Sarah from Arizona Native Roofing 👋 Real person here — need roof help?"}]);
  const [inp,setInp]=useState(""); const ref=useRef(null); const price=Math.round(sq*5.2);
  useEffect(()=>{if(ref.current)ref.current.scrollTop=9999;},[msgs]);
  const send=()=>{if(!inp.trim())return; setMsgs(m=>[...m,{r:'u',t:inp}]); setInp(""); setTimeout(()=>setMsgs(m=>[...m,{r:'ai',t:"Got it! For your area we can do drone scan 2,400 sq ft free. Want ticket VENUS-XXXX? Drop WhatsApp — crew calls in 30 mins!"}]),800);};
  return(
    <div style={{minHeight:"100vh", background:"white", color:"#111", fontFamily:"system-ui"}}>
      <style>{`@media(max-width:700px){.heroRow{flex-direction:column!important}.tools{grid-template-columns:1fr!important}}`}</style>

      {/* REAL WEBSITE HEADER */}
      <header style={{height:"64px", borderBottom:"1px solid #eee", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 20px", maxWidth:"1200px", margin:"0 auto"}}>
        <div style={{fontWeight:900, letterSpacing:"0.5px"}}>ARIZONA NATIVE <span style={{color:"#c19a4a"}}>ROOFING</span> <span style={{fontWeight:400, color:"#999", fontSize:"10px", marginLeft:"8px"}}>ROC #AZR-208765</span></div>
        <div style={{display:"flex", gap:"12px", alignItems:"center"}}><span style={{fontSize:"12px", color:"#666", display:"none"}} className="md">Call: (480) 555-0142</span><button style={{background:"black", color:"white", borderRadius:"999px", padding:"8px 18px", border:"0", fontSize:"12px", fontWeight:700}}>Get Free Estimate</button></div>
      </header>

      {/* HERO - REAL ROOFING WEBSITE */}
      <div className="heroRow" style={{maxWidth:"1200px", margin:"0 auto", padding:"40px 20px", display:"flex", gap:"30px", alignItems:"center"}}>
        <div style={{flex:1}}>
          <div style={{fontSize:"11px", letterSpacing:"2px", color:"#c19a4a", fontWeight:900}}>SCOTTSDALE • SINCE 2018 • 1,243 ROOFS</div>
          <h1 style={{fontSize:"48px", fontWeight:900, lineHeight:0.9, marginTop:"16px"}}>Arizona's Roof<br/>Experts.<br/><span style={{color:"#c19a4a"}}>Now with AI.</span></h1>
          <p style={{marginTop:"16px", color:"#666", lineHeight:1.5, maxWidth:"420px"}}>We fix leaks, replace shingles, free drone scan. No sales BS. See your roof in 10 seconds with our AI tools below.</p>
          <div style={{marginTop:"20px", display:"flex", gap:"10px"}}><button style={{background:"black", color:"white", borderRadius:"999px", padding:"12px 22px", border:"0", fontWeight:700}}>Book Free Inspection →</button><span style={{fontSize:"12px", color:"#888", alignSelf:"center"}}>★★★★★ 4.9/5 (187 reviews)</span></div>
        </div>
        <div style={{flex:1, height:"340px", background:"#f5f1e8", borderRadius:"28px", border:"1px solid #ece6d6", display:"grid", placeItems:"center", textAlign:"center", color:"#8a7d5a"}}>
          <div><div style={{fontSize:"52px"}}>🏠</div><div style={{marginTop:"8px", fontSize:"12px"}}>Real Scottsdale home<br/>GAF Timberline HDZ<br/><b style={{color:"#111"}}>2,400 sq ft • Before/After</b></div><div style={{marginTop:"12px", background:"white", borderRadius:"999px", padding:"6px 14px", fontSize:"11px", border:"1px solid #ece6d6", display:"inline-block"}}>📸 Drag to compare</div></div>
        </div>
      </div>

      {/* TRUST BAR */}
      <div style={{background:"#111", color:"rgba(255,255,255,0.6)", padding:"14px 20px", display:"flex", gap:"24px", justifyContent:"center", fontSize:"11px", letterSpacing:"1px"}}>
        <span>✓ GAF CERTIFIED</span><span>✓ LICENSED & INSURED</span><span>✓ 10-YR WARRANTY</span><span>✓ 30-MIN RESPONSE</span>
      </div>

      {/* SERVICES - REAL WEBSITE */}
      <div style={{maxWidth:"1200px", margin:"0 auto", padding:"40px 20px"}}>
        <h2 style={{fontSize:"22px", fontWeight:800}}>Services</h2>
        <div style={{marginTop:"16px", display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:"14px"}} className="tools">
          <div style={{border:"1px solid #eee", borderRadius:"16px", padding:"16px"}}><b>Roof Replacement</b><div style={{fontSize:"12px", color:"#666", marginTop:"6px"}}>GAF HDZ $5.20/sq ft • 10yr warranty</div></div>
          <div style={{border:"1px solid #eee", borderRadius:"16px", padding:"16px"}}><b>Leak Repair</b><div style={{fontSize:"12px", color:"#666", marginTop:"6px"}}>Emergency 24/7 • $250 diagnostic credit</div></div>
          <div style={{border:"1px solid #eee", borderRadius:"16px", padding:"16px"}}><b>Free Drone Inspection</b><div style={{fontSize:"12px", color:"#666", marginTop:"6px"}}>No ladder • PDF report in 10 sec</div></div>
        </div>

        <h2 style={{fontSize:"22px", fontWeight:800, marginTop:"50px"}}>Try Our AI Tools — Live</h2>
        <p style={{fontSize:"13px", color:"#666", marginTop:"6px"}}>This is what makes us different. Not just a toolbox — integrated into real roofing site.</p>

        <div style={{marginTop:"18px", display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:"16px"}} className="tools">
          <div style={{background:"#fdfcf8", border:"1px solid #ece6d6", borderRadius:"20px", padding:"18px"}}><div style={{fontSize:"10px", color:"#c19a4a", fontWeight:900}}>01 • DRONE SCAN • FREE</div><div style={{marginTop:"10px", background:"white", borderRadius:"12px", padding:"12px", border:"1px solid #ece6d6"}}>Satellite: 2,400 sq ft<br/>Section B 98% wear • No leak</div><div style={{marginTop:"12px", fontSize:"13px"}}><b>${price.toLocaleString()}</b> live estimate • <input type="range" min={1200} max={4000} value={sq} onChange={e=>setSq(Number(e.target.value))} style={{width:"80px"}}/> {sq} sq ft</div></div>
          <div style={{background:"#111", borderRadius:"20px", padding:"18px", color:"white"}}><div style={{fontSize:"10px", color:"#c19a4a", fontWeight:900}}>02 • DAMAGE AI</div><div style={{marginTop:"10px", background:"rgba(255,255,255,0.08)", borderRadius:"12px", padding:"30px 12px", textAlign:"center", fontSize:"12px"}}>🔴 Red boxes 92% • $1,240<br/>Upload your roof photo</div><button style={{marginTop:"12px", background:"white", color:"black", borderRadius:"999px", padding:"8px 14px", border:"0", width:"100%", fontWeight:700}}>Upload Photo →</button></div>
          <div style={{background:"white", border:"1px solid #ece6d6", borderRadius:"20px", padding:"18px"}}><div style={{fontSize:"10px", color:"#c19a4a", fontWeight:900}}>03 • INSTANT QUOTE + WEATHER + WARRANTY</div><div style={{marginTop:"10px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px", fontSize:"11px"}}><div style={{background:"#f5f1e8", padding:"10px", borderRadius:"10px"}}>⛈️ 2% SAFE today<br/>12% WATCH 7-day</div><div style={{background:"#111", color:"white", padding:"10px", borderRadius:"10px"}}>✓ Gold till 2033<br/>ROC AZR-208765</div></div><button style={{marginTop:"12px", background:"black", color:"white", borderRadius:"999px", padding:"8px 14px", border:"0", width:"100%"}}>Get Ticket WhatsApp →</button></div>
        </div>
      </div>

      <footer style={{borderTop:"1px solid #eee", padding:"20px", textAlign:"center", fontSize:"11px", color:"#999"}}>© Arizona Native Roofing • Scottsdale • (480) 555-0142 • Venus AI Powered • 47 roofers use this</footer>

      <button onClick={()=>setChat(!chat)} style={{position:"fixed", bottom:"20px", right:"20px", width:"56px", height:"56px", borderRadius:"999px", background:"black", color:"#c19a4a", border:"2px solid #c19a4a"}}>{chat?"X":"💬"}</button>
      {chat&&<div style={{position:"fixed", bottom:"86px", right:"20px", width:"320px", height:"380px", background:"white", border:"1px solid #ece6d6", borderRadius:"20px", display:"flex", flexDirection:"column", boxShadow:"0 20px 40px rgba(0,0,0,0.15)"}}><div style={{background:"black", color:"white", padding:"12px", borderRadius:"20px 20px 0 0", fontSize:"12px"}}>Sarah • Arizona Native Roofing • Real</div><div ref={ref} style={{flex:1, overflow:"auto", padding:"12px", display:"flex", flexDirection:"column", gap:"8px", background:"#fdfcf8"}}>{msgs.map((m,i)=>(<div key={i} style={{alignSelf:m.r==="u"?"flex-end":"flex-start", background:m.r==="u"?"black":"white", color:m.r==="u"?"white":"black", border:"1px solid #ece6d6", padding:"8px 12px", borderRadius:"14px", fontSize:"12px", maxWidth:"80%"}}>{m.t}</div>))}</div><div style={{padding:"8px", display:"flex", gap:"6px"}}><input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ask Sarah..." style={{flex:1, borderRadius:"999px", border:"1px solid #ece6d6", padding:"8px 12px"}}/><button onClick={send} style={{background:"black", color:"white", border:"0", borderRadius:"999px", padding:"0 14px"}}>↑</button></div></div>}
    </div>
  );
}
