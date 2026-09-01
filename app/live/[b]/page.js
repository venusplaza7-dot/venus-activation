"use client";
import { useState, useEffect, useRef } from "react";
import { useParams, useSearchParams } from "next/navigation";

export default function LuxurySellable(){
  const params=useParams(); const sp=useSearchParams();
  const biz=params?.b||"arizonanativeroofing.com";
  const conf=sp.get("conf")||"VENUS-2026-HOU-497";
  const [open,setOpen]=useState(null);
  const [chatOpen,setChatOpen]=useState(false);
  const [msgs,setMsgs]=useState([{role:"ai", text:`Welcome to ${biz} 👋\nI'm VENUS AI. I can help with drone measurement, damage photo check, instant quote, hail risk, warranty. What do you need?`}]);
  const [input, setInput]=useState("");
  const [sqft, setSqft]=useState(2400);
  const ref=useRef(null);
  useEffect(()=>{ if(ref.current) ref.current.scrollTop=9999; },[msgs]);

  const callOpenAI = async (q)=>{
    try{
      const r=await fetch("/api/chat",{method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({message:q, biz, history:msgs.map(m=>({role:m.role==="user"?"user":"assistant", content:m.text}))})});
      const d=await r.json(); return d.reply;
    }catch{ return "I'm here to help! Tap any tool card above to see how it works, or tell me your roof size / damage / quote needs."; }
  };

  const send=async()=>{
    if(!input.trim()) return; 
    const q=input.trim(); 
    setInput(""); 
    setMsgs(m=>[...m,{role:"user",text:q}]);
    const phone=q.match(/\+?\d{10,15}/);
    if(phone){
      const res=await fetch("/api/ticket",{method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({phone:phone[0], request:"Chat: "+q, biz, conf})});
      const data=await res.json(); 
      setMsgs(m=>[...m,{role:"ai",text:data.message}]); 
      return;
    }
    const reply=await callOpenAI(q);
    setMsgs(m=>[...m,{role:"ai",text:reply+"\n\n📱 Send WhatsApp number for ticket + owner of "+biz+" will be notified."}]);
  };

  const tools=[
    {id:"01", t:"LIVE DRONE SCAN", w:"Measures 2,400 sq ft from satellite, finds Section B 98% wear, 0 leaks.", h:"Tap Launch → Watch laser scan blueprint → Download PDF.", c:"#00FF88"},
    {id:"02", t:"DAMAGE AI VISION", w:"Upload photo → AI draws red boxes 92% accuracy → $1,240 estimate.", h:"Tap → Upload → AI marks damage in 2 sec.", c:"#FF3B30"},
    {id:"03", t:"INSTANT QUOTE ENGINE", w:"Slider 1,200-4,000 sq ft → Price $6k-$20k live. Now $12,480 GAF HDZ.", h:"Move slider → Price live → Phone → Ticket + WhatsApp.", c:"#D4AF37"},
    {id:"04", t:"WEATHER SHIELD RADAR", w:"Live radar: Today 2% SAFE, Tomorrow 5% LOW, 7-Day 12% WATCH.", h:"Tap → Radar spins → Shows hail risk → Get protection.", c:"#0A84FF"},
    {id:"05", t:"WARRANTY VAULT", w:"GAF HDZ verified till Oct 2033, ROC #AZR-208765, transferable.", h:"Tap → Gold stamp → Download PDF → Claim with phone.", c:"#D4AF37"},
  ];

  return (
    <div style={{minHeight:"100vh", background:"#070707", color:"white", fontFamily:"monospace"}}>
      <div style={{background:"#D4AF37", color:"black", textAlign:"center", padding:"9px", fontWeight:"900", fontSize:"10px"}}>● {biz.toUpperCase()} • CONF {conf} • 5 AI TOOLS</div>
      <div style={{maxWidth:"820px", margin:"0 auto", padding:"20px 16px 100px"}}>
        <h1 style={{fontSize:"28px", fontWeight:"900"}}>AI ROOFING<br/><span style={{color:"#D4AF37"}}>COMMAND CENTER</span></h1>
        <p style={{color:"#666", fontSize:"12px", marginTop:"6px"}}>Tap Launch to see working AI. Chat is small gold circle bottom-right.</p>
        <div style={{marginTop:"18px", display:"grid", gap:"12px"}}>
          {tools.map(x=>(
            <div key={x.id} style={{background:"#111", border:"1px solid #1e1e1e", borderRadius:"18px", padding:"16px", display:"flex", justifyContent:"space-between", gap:"12px"}}>
              <div style={{flex:1}}>
                <div style={{fontSize:"10px", color:x.c, fontWeight:"900"}}>{x.id} • {x.t}</div>
                <div style={{fontSize:"12px", marginTop:"6px", color:"#ccc"}}><b style={{color:"white"}}>What:</b> {x.w}</div>
                <div style={{fontSize:"11px", marginTop:"4px", color:"#D4AF37"}}><b>How:</b> {x.h}</div>
              </div>
              <button onClick={()=>setOpen(x)} style={{alignSelf:"center", background:"white", color:"black", borderRadius:"999px", padding:"10px 14px", fontWeight:"900", fontSize:"11px", border:"0"}}>LAUNCH →</button>
            </div>
          ))}
        </div>
      </div>

      {!chatOpen ? (
        <button onClick={()=>setChatOpen(true)} style={{position:"fixed", bottom:"18px", right:"18px", width:"56px", height:"56px", borderRadius:"999px", background:"#D4AF37", color:"black", fontWeight:"900", border:"0", zIndex:50}}>AI</button>
      ) : (
        <div style={{position:"fixed", bottom:"18px", right:"18px", width:"320px", maxWidth:"92vw", height:"360px", background:"#111", border:"1px solid #D4AF37", borderRadius:"18px", zIndex:50, display:"flex", flexDirection:"column", overflow:"hidden"}}>
          <div style={{background:"#D4AF37", color:"black", padding:"10px 14px", fontWeight:"900", fontSize:"11px", display:"flex", justifyContent:"space-between"}}><span>VENUS AI • How can I assist you?</span><button onClick={()=>setChatOpen(false)} style={{background:"black", color:"#D4AF37", width:"22px", height:"22px", borderRadius:"999px", border:"0"}}>✕</button></div>
          <div ref={ref} style={{flex:1, overflow:"auto", padding:"10px", display:"flex", flexDirection:"column", gap:"8px"}}>
            {msgs.map((m,i)=><div key={i} style={{fontSize:"11px", padding:"8px 12px", borderRadius:"12px", whiteSpace:"pre-wrap", background:m.role==="user"?"#D4AF37":"#1c1c1c", color:m.role==="user"?"black":"white", alignSelf:m.role==="user"?"flex-end":"flex-start", maxWidth:"85%"}}>{m.text}</div>)}
          </div>
          <div style={{padding:"8px", borderTop:"1px solid #222", display:"flex", gap:"6px"}}>
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Hi, how much cost?" style={{flex:1, background:"#000", border:"1px solid #222", borderRadius:"999px", padding:"8px 12px", color:"white", fontSize:"11px"}}/>
            <button onClick={send} style={{background:"#D4AF37", color:"black", padding:"0 14px", borderRadius:"999px", fontWeight:"900", border:"0", fontSize:"11px"}}>SEND</button>
          </div>
        </div>
      )}

      {open && (
        <div style={{position:"fixed", inset:"0", background:"rgba(0,0,0,0.96)", zIndex:60, padding:"16px", display:"flex", alignItems:"center", justifyContent:"center"}}>
          <div style={{background:"#111", border:"1px solid #D4AF37", borderRadius:"18px", padding:"18px", maxWidth:"440px", width:"100%"}}>
            <div style={{display:"flex", justifyContent:"space-between"}}><b style={{color:"#D4AF37", fontSize:"12px"}}>{open.id} {open.t}</b><button onClick={()=>setOpen(null)} style={{background:"#222", color:"white", width:"28px", height:"28px", borderRadius:"999px", border:"0"}}>✕</button></div>
            <div style={{fontSize:"11px", marginTop:"8px"}}><b>What:</b> {open.w}</div>
            <div style={{fontSize:"11px", color:"#D4AF37", marginTop:"6px"}}><b>How:</b> {open.h}</div>
            {open.id==="03" && <div style={{marginTop:"12px", background:"#000", padding:"12px", borderRadius:"12px"}}><div style={{fontSize:"11px"}}>{sqft} sq ft = <span style={{color:"#D4AF37", fontWeight:"900"}}>${Math.round(sqft*5.2).toLocaleString()}</span></div><input type="range" min={1200} max={4000} value={sqft} onChange={e=>setSqft(Number(e.target.value))} style={{width:"100%"}}/></div>}
            <div style={{marginTop:"12px", display:"flex", gap:"8px"}}>
              <input id="ph" placeholder="WhatsApp for ticket" style={{flex:1, background:"#000", border:"1px solid #222", borderRadius:"999px", padding:"10px", color:"white", fontSize:"11px"}}/>
              <button onClick={async()=>{ const v=document.getElementById("ph").value; if(!v) return; const r=await fetch("/api/ticket",{method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({phone:v, request:open.t, biz, conf})}); const d=await r.json(); alert(d.message); setOpen(null); }} style={{background:"#D4AF37", color:"black", padding:"0 14px", borderRadius:"999px", fontWeight:"900", border:"0", fontSize:"11px"}}>TICKET + WHATSAPP</button>
            </
