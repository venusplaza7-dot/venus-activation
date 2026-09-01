"use client";
import { useState, useEffect, useRef } from "react";
import { useParams, useSearchParams } from "next/navigation";

export default function Page(){
  const p=useParams(); const sp=useSearchParams();
  const biz=p?.b||"arizonanativeroofing.com";
  const conf=sp.get("conf")||"VENUS-2026-HOU-497";
  const [open,setOpen]=useState(null);
  const [showChat,setShowChat]=useState(false);
  const [msgs,setMsgs]=useState([{role:"ai",text:"Welcome to "+biz+"! How can I assist you? I have Drone, Damage Photo AI, Quote, Weather, Warranty."}]);
  const [inp,setInp]=useState("");
  const [sq,setSq]=useState(2400);
  const ref=useRef(null);
  useEffect(()=>{ if(ref.current) ref.current.scrollTop=9999; },[msgs]);

  async function ask(q){
    try{
      const r=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:q,biz,history:msgs})});
      const d=await r.json(); return d.reply;
    }catch{ return "Tap any tool above. For ticket, send WhatsApp number."; }
  }

  async function send(){
    if(!inp.trim()) return;
    const q=inp.trim(); setInp(""); setMsgs(m=>[...m,{role:"user",text:q}]);
    const phone=q.match(/\+?\d{10,15}/);
    if(phone){
      const r=await fetch("/api/ticket",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phone:phone[0],request:q,biz,conf})});
      const d=await r.json(); setMsgs(m=>[...m,{role:"ai",text:d.message}]); return;
    }
    const rep=await ask(q);
    setMsgs(m=>[...m,{role:"ai",text:rep}]);
  }

  const tools=[
    {id:"01", name:"DRONE SCAN", what:"2,400 sq ft exact, Section B 98% wear", how:"Launch → laser scans → PDF"},
    {id:"02", name:"DAMAGE AI", what:"Upload photo → AI 92% boxes → $1,240", how:"Upload → AI marks damage in 2s"},
    {id:"03", name:"QUOTE", what:"Slider 1200-4000 → $6k-$20k live", how:"Move slider → live price $12,480"},
    {id:"04", name:"WEATHER", what:"Today 2%, 7-Day 12% hail risk", how:"Radar spins → shows risk"},
    {id:"05", name:"WARRANTY", what:"GAF valid Oct 2033 verified", how:"Gold stamp → Download PDF"},
  ];

  return (
    <div style={{minHeight:"100vh", background:"#070707", color:"white", fontFamily:"monospace", paddingBottom:"90px"}}>
      <div style={{background:"#D4AF37", color:"black", textAlign:"center", padding:"8px", fontWeight:"900", fontSize:"10px"}}>{biz} • {conf}</div>
      <div style={{maxWidth:"800px", margin:"0 auto", padding:"16px"}}>
        <h1 style={{fontSize:"24px", fontWeight:"900"}}>AI ROOFING • 5 TOOLS</h1>
        {tools.map(t=>(
          <div key={t.id} style={{background:"#111", border:"1px solid #222", borderRadius:"16px", padding:"14px", marginTop:"10px", display:"flex", justifyContent:"space-between"}}>
            <div>
              <div style={{fontSize:"10px", color:"#D4AF37"}}>{t.id} {t.name}</div>
              <div style={{fontSize:"11px", marginTop:"4px"}}><b>What:</b> {t.what}</div>
              <div style={{fontSize:"11px", color:"#D4AF37"}}><b>How:</b> {t.how}</div>
            </div>
            <button onClick={()=>setOpen(t)} style={{background:"white", color:"black", borderRadius:"999px", padding:"8px 12px", fontWeight:"900", border:"0", height:"32px", alignSelf:"center"}}>LAUNCH</button>
          </div>
        ))}
      </div>

      {!showChat && <button onClick={()=>setShowChat(true)} style={{position:"fixed", bottom:"16px", right:"16px", width:"56px", height:"56px", borderRadius:"999px", background:"#D4AF37", color:"black", fontWeight:"900", border:"0", zIndex:50}}>AI</button>}

      {showChat && (
        <div style={{position:"fixed", bottom:"16px", right:"16px", width:"300px", height:"340px", background:"#111", border:"1px solid #D4AF37", borderRadius:"16px", display:"flex", flexDirection:"column", zIndex:50}}>
          <div style={{background:"#D4AF37", color:"black", padding:"8px 12px", fontWeight:"900", fontSize:"11px", display:"flex", justifyContent:"space-between"}}><span>How can I assist you?</span><button onClick={()=>setShowChat(false)} style={{background:"black", color:"#D4AF37", border:"0", width:"20px", height:"20px", borderRadius:"999px"}}>X</button></div>
          <div ref={ref} style={{flex:1, overflow:"auto", padding:"8px", display:"flex", flexDirection:"column", gap:"6px"}}>
            {msgs.map((m,i)=><div key={i} style={{fontSize:"11px", padding:"6px 10px", borderRadius:"10px", background:m.role==="user"?"#D4AF37":"#222", color:m.role==="user"?"black":"white", alignSelf:m.role==="user"?"flex-end":"flex-start"}}>{m.text}</div>)}
          </div>
          <div style={{display:"flex", gap:"6px", padding:"8px", borderTop:"1px solid #222"}}>
            <input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Hi..." style={{flex:1, background:"#000", border:"1px solid #222", borderRadius:"999px", padding:"8px", color:"white", fontSize:"11px"}}/>
            <button onClick={send} style={{background:"#D4AF37", border:"0", borderRadius:"999px", padding:"0 12px", fontWeight:"900"}}>SEND</button>
          </div>
        </div>
      )}

      {open && (
        <div style={{position:"fixed", inset:"0", background:"rgba(0,0,0,0.9)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:60, padding:"16px"}}>
          <div style={{background:"#111", border:"1px solid #D4AF37", borderRadius:"16px", padding:"16px", maxWidth:"400px", width:"100%"}}>
            <div style={{display:"flex", justifyContent:"space-between"}}><b style={{color:"#D4AF37", fontSize:"12px"}}>{open.name}</b><button onClick={()=>setOpen(null)} style={{background:"#222", color:"white", border:"0", width:"24px", height:"24px", borderRadius:"999px"}}>X</button></div>
            <div style={{fontSize:"11px", marginTop:"8px"}}>{open.what}</div>
            <div style={{fontSize:"11px", color:"#D4AF37", marginTop:"4px"}}>{open.how}</div>
            {open.id==="03" && <div style={{marginTop:"10px"}}><div>{sq} sq ft = ${Math.round(sq*5.2).toLocaleString()}</div><input type="range" min="1200" max="4000" value={sq} onChange={e=>setSq(Number(e.target.value))} style={{width:"100%"}}/></div>}
            <div style={{marginTop:"10px", display:"flex", gap:"6px"}}>
              <input id="ph2" placeholder="WhatsApp" style={{flex:1, background:"#000", border:"1px solid #222", borderRadius:"999px", padding:"8px", color:"white", fontSize:"11px"}}/>
              <button onClick={async()=>{ const v=document.getElementById("ph2").value; if(!v) return; const r=await fetch("/api/ticket",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phone:v,request:open.name,biz,conf})}); const d=await r.json(); alert(d.message); setOpen(null); }} style={{background:"#D4AF37", border:"0", borderRadius:"999px", padding:"8px 12px", fontWeight:"900", fontSize:"11px"}}>TICKET + WA</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
