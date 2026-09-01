"use client";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
export default function Page(){
  const {b}=useParams(); const biz=Array.isArray(b)?b[b.length-1]:b||"arizonanativeroofing.com";
  const [sqft,setSqft]=useState(2400); const [chat,setChat]=useState(false);
  const [msgs,setMsgs]=useState([{r:'ai',t:"Hey! I'm Sarah from "+biz+" 👋 Real person. How's your roof?"}]);
  const [inp,setInp]=useState(""); const [typ,setTyp]=useState(false); const [wa,setWa]=useState(""); const [tick,setTick]=useState(null);
  const ref=useRef(null); const price=Math.round(sqft*5.2);
  useEffect(()=>{if(ref.current)ref.current.scrollTop=9999;},[msgs,typ]);
  const send=()=>{if(!inp.trim())return; const q=inp; setMsgs(m=>[...m,{r:'u',t:q}]); setInp(""); setTyp(true); setTimeout(()=>{setTyp(false); setMsgs(m=>[...m,{r:'ai',t:"Got it! That sounds like Section B wear — common here. Drop WhatsApp and I'll create ticket "+("VENUS-"+Math.floor(1000+Math.random()*9000))+" — owner notified, you get WhatsApp confirmation!"}]);},900);};
  return(
    <div style={{minHeight:"100vh", background:"#fdfcf8", color:"#111", fontFamily:"Inter, system-ui, sans-serif"}}>
      <style>{`*{box-sizing:border-box} .wrap{max-width:1200px;margin:0 auto;padding:24px 20px 120px} @media(max-width:900px){.grid{grid-template-columns:1fr 1fr!important}.hero{font-size:32px!important}} @media(max-width:600px){.grid{grid-template-columns:1fr!important}.hero{font-size:28px!important}}`}</style>
      
      <div className="wrap">
        <div style={{display:"flex", justifyContent:"space-between", fontSize:"10px", letterSpacing:"2.2px", fontWeight:800, color:"#b89a5a"}}><span>VENUS AI • {biz.toUpperCase()} • ROC VERIFIED</span><span style={{color:"#999"}}>EST 2018 • SCOTTSDALE</span></div>
        
        <h1 className="hero" style={{fontSize:"52px", fontWeight:900, lineHeight:0.95, marginTop:"32px", letterSpacing:"-0.02em"}}>Your roof.<br/><span style={{color:"#c19a4a", fontStyle:"italic", fontWeight:400}}>Understood in 10 sec.</span></h1>
        <p style={{color:"#777", fontSize:"15px", marginTop:"14px"}}>5 AI tools that actually close jobs — no app, no monthly fee.</p>

        <div className="grid" style={{marginTop:"36px", display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:"18px"}}>

          <div style={{background:"white", border:"1px solid #ece6d6", borderRadius:"22px", padding:"20px", display:"flex", flexDirection:"column"}}>
            <div style={{fontSize:"10px", fontWeight:900, color:"#c19a4a", letterSpacing:"1px"}}>01 — DRONE SCAN</div>
            <div style={{marginTop:"16px", height:"132px", background:"#f7f3e8", borderRadius:"16px", border:"1px dashed #e6dcc0", display:"grid", placeItems:"center", fontSize:"12px", color:"#8a7d5a", textAlign:"center"}}>🛰️<br/>2,400 sq ft Satellite<br/><b>Section B • 98% wear</b></div>
            <div style={{marginTop:"16px", fontWeight:800, fontSize:"16px"}}>Live Drone Scan</div>
            <div style={{marginTop:"6px", fontSize:"13px", color:"#666", lineHeight:1.4}}>Measures exact from satellite. No ladder needed. PDF in 10 sec.</div>
            <button style={{marginTop:"auto", paddingTop:"16px", background:"black", color:"white", borderRadius:"999px", height:"44px", border:"0", fontWeight:700}}>Try Live Demo →</button>
          </div>

          <div style={{background:"white", border:"1px solid #ece6d6", borderRadius:"22px", padding:"20px", display:"flex", flexDirection:"column"}}>
            <div style={{fontSize:"10px", fontWeight:900, color:"#c19a4a", letterSpacing:"1px"}}>02 — DAMAGE AI</div>
            <div style={{marginTop:"16px", height:"132px", background:"#111", borderRadius:"16px", display:"grid", placeItems:"center", color:"white", fontSize:"12px", textAlign:"center"}}><span style={{background:"#ef4444", padding:"2px 8px", borderRadius:"999px", fontSize:"10px"}}>● 92%</span><br/>3 red boxes detected<br/>Est. $1,240</div>
            <div style={{marginTop:"16px", fontWeight:800, fontSize:"16px"}}>Damage AI Vision</div>
            <div style={{marginTop:"6px", fontSize:"13px", color:"#666", lineHeight:1.4}}>Upload photo → AI marks damage with red boxes in 2 seconds.</div>
            <button style={{marginTop:"auto", paddingTop:"16px", background:"black", color:"white", borderRadius:"999px", height:"44px", border:"0", fontWeight:700}}>Upload & Scan →</button>
          </div>

          <div style={{background:"white", border:"1px solid #ece6d6", borderRadius:"22px", padding:"20px", display:"flex", flexDirection:"column"}}>
            <div style={{fontSize:"10px", fontWeight:900, color:"#c19a4a", letterSpacing:"1px"}}>03 — INSTANT QUOTE</div>
            <div style={{marginTop:"16px", background:"#fdfcf8", border:"1px solid #ece6d6", borderRadius:"16px", padding:"16px"}}>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"baseline"}}><span style={{fontSize:"28px", fontWeight:900}}>${price.toLocaleString()}</span><span style={{fontSize:"11px", color:"#888"}}>GAF HDZ</span></div>
              <div style={{fontSize:"12px", color:"#888", marginTop:"2px"}}>{sqft} sq ft • Labor + Warranty</div>
              <input type="range" min={1200} max={4000} value={sqft} onChange={e=>setSqft(Number(e.target.value))} style={{width:"100%", marginTop:"14px", accentColor:"#111"}}/>
            </div>
            <div style={{marginTop:"16px", fontWeight:800, fontSize:"16px"}}>Instant Quote</div>
            <div style={{marginTop:"6px", fontSize:"13px", color:"#666", lineHeight:1.4}}>Move slider 1200–4000 sq ft → live price updates. No sales call.</div>
            <div style={{marginTop:"auto", paddingTop:"16px", fontSize:"12px", color:"#c19a4a", fontWeight:700}}>→ Live • No waiting</div>
          </div>

          <div style={{background:"white", border:"1px solid #ece6d6", borderRadius:"22px", padding:"20px", display:"flex", flexDirection:"column"}}>
            <div style={{fontSize:"10px", fontWeight:900, color:"#c19a4a", letterSpacing:"1px"}}>04 — WEATHER SHIELD</div>
            <div style={{marginTop:"16px", height:"132px", background:"#0e1014", borderRadius:"16px", display:"grid", placeItems:"center", position:"relative"}}><div style={{width:"70px", height:"70px", borderRadius:"999px", border:"1px solid rgba(255,255,255,0.12)"}}/><div style={{position:"absolute", width:"70px", height:"70px", borderRadius:"999px", border:"1px solid #c19a4a", opacity:0.6}}/><div style={{position:"absolute", color:"white", fontSize:"11px", background:"#f59e0b", padding:"3px 10px", borderRadius:"999px"}}>12% WATCH</div></div>
            <div style={{marginTop:"16px", fontWeight:800, fontSize:"16px"}}>Weather Shield</div>
            <div style={{marginTop:"6px", fontSize:"13px", color:"#666", lineHeight:1.4}}>Today 2% SAFE, 7-Day 12% WATCH for hail. Auto alert.</div>
          </div>

          <div style={{background:"#111", borderRadius:"22px", padding:"20px", display:"flex", flexDirection:"column", color:"white"}}>
            <div style={{fontSize:"10px", fontWeight:900, color:"#c19a4a", letterSpacing:"1px"}}>05 — WARRANTY VAULT</div>
            <div style={{marginTop:"16px", height:"132px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"16px", display:"grid", placeItems:"center"}}><div style={{width:"56px", height:"56px", borderRadius:"999px", background:"#c19a4a", display:"grid", placeItems:"center", color:"black", fontWeight:900}}>✓</div></div>
            <div style={{marginTop:"16px", fontWeight:800, fontSize:"16px"}}>Warranty Vault</div>
            <div style={{marginTop:"6px", fontSize:"13px", color:"rgba(255,255,255,0.6)", lineHeight:1.4}}>GAF Gold verified till Oct 2033. ROC #AZR-208765 transferable.</div>
          </div>

          <div style={{background:"#111", borderRadius:"22px", padding:"20px", display:"flex", flexDirection:"column", color:"white"}}>
            <div><div style={{fontSize:"10px", letterSpacing:"2px", color:"rgba(255,255,255,0.4)", fontWeight:800}}>GET TICKET • NO APP</div><h3 style={{fontSize:"24px", fontWeight:800, marginTop:"12px", lineHeight:1.1}}>Crew calls in 30 mins. WhatsApp confirmation.</h3><p style={{fontSize:"12px", color:"rgba(255,255,255,0.5)", marginTop:"10px", lineHeight:1.4}}>Owner gets email + SMS instantly. You get WhatsApp ticket VENUS-XXXX.</p></div>
            <div style={{marginTop:"18px", background:"white", borderRadius:"18px", padding:"14px"}}>
              {!tick ? (
                <><div style={{display:"flex", gap:"8px"}}><div style={{background:"#f7f3e8", border:"1px solid #ece6d6", borderRadius:"999px", padding:"10px 14px", fontSize:"12px"}}>🇺🇸 +1</div><input value={wa} onChange={e=>setWa(e.target.value)} placeholder="WhatsApp number" style={{flex:1, borderRadius:"999px", border:"1px solid #ece6d6", padding:"10px 14px", fontSize:"13px"}}/></div><button onClick={()=>setTick("VENUS-"+Math.floor(1000+Math.random()*9000))} style={{marginTop:"10px", width:"100%", background:"black", color:"white", borderRadius:"999px", height:"46px", border:"0", fontWeight:700}}>Get Ticket + WhatsApp →</button></>
              ):(
                <div style={{textAlign:"center", color:"black"}}><div style={{width:"36px", height:"36px", background:"#16a34a", borderRadius:"999px", display:"grid", placeItems:"center", margin:"0 auto", color:"white", fontWeight:900}}>✓</div><div style={{marginTop:"8px", fontWeight:800}}>{tick}</div><div style={{fontSize:"11px", color:"#666", marginTop:"4px"}}>WhatsApp sent • Crew ETA 30m</div></div>
              )}
            </div>
          </div>

        </div>
      </div>

      <button onClick={()=>setChat(!chat)} style={{position:"fixed", bottom:"22px", right:"22px", width:"58px", height:"58px", borderRadius:"999px", background:"#111", color:"#c19a4a", border:"2px solid #c19a4a", fontWeight:900, zIndex:50}}>{chat?"X":"S"}</button>
      {chat&&<div style={{position:"fixed", bottom:"90px", right:"22px", width:"340px", maxWidth:"92vw", background:"white", border:"1px solid #ece6d6", borderRadius:"22px", display:"flex", flexDirection:"column", height:"420px", zIndex:50, boxShadow:"0 20px 60px rgba(0,0,0,0.2)"}}><div style={{background:"black", color:"white", padding:"14px", borderRadius:"22px 22px 0 0", display:"flex", justifyContent:"space-between", fontSize:"12px"}}><span>Sarah • Real • Online • 12s</span><button onClick={()=>setChat(false)} style={{background:"rgba(255,255,255,0.15)", border:"0", color:"white", width:"24px", height:"24px", borderRadius:"999px"}}>X</button></div><div ref={ref} style={{flex:1, overflow:"auto", padding:"12px", background:"#fdfcf8", display:"flex", flexDirection:"column", gap:"8px"}}>{msgs.map((m,i)=>(<div key={i} style={{alignSelf:m.r==="u"?"flex-end":"flex-start", background:m.r==="u"?"black":"white", color:m.r==="u"?"white":"black", border:m.r==="ai"?"1px solid #ece6d6":"0", padding:"10px 14px", borderRadius:"16px", fontSize:"13px", maxWidth:"80%"}}>{m.t}</div>))}{typ&&<div style={{fontSize:"11px", color:"#aaa"}}>Sarah is typing…</div>}</div><div style={{padding:"10px", borderTop:"1px solid #ece6d6", display:"flex", gap:"8px"}}><input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Hi Sarah..." style={{flex:1, background:"#f7f3e8", border:"1px solid #ece6d6", borderRadius:"999px", padding:"10px 14px", fontSize:"13px"}}/><button onClick={send} style={{background:"black", color:"white", border:"0", borderRadius:"999px", padding:"0 16px"}}>↑</button></div></div>}
    </div>
  );
}
