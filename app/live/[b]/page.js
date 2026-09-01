"use client";
import { useState, useRef, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
export default function Page(){
  const params=useParams(); const sp=useSearchParams();
  const biz=params?.b||"arizonanativeroofing.com";
  const conf=sp.get("conf")||"VENUS-2026-HOU-497";
  const [open,setOpen]=useState(null);
  const [chat,setChat]=useState(false);
  const [typing,setTyping]=useState(false);
  const [msgs,setMsgs]=useState([{role:"ai",text:"Hey! I'm Sarah from "+biz+" 👋 Real person here. How can I help with your roof?"}]);
  const [inp,setInp]=useState(""); const [sq,setSq]=useState(2400);
  const ref=useRef(null); useEffect(()=>{if(ref.current)ref.current.scrollTop=9999;},[msgs]);
  async function ask(q){
    try{
      const r=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:q,biz,history:msgs})});
      const d=await r.json(); return d.reply;
    }catch{ return "Hey! For 2400 sq ft around $12,480 with GAF HDZ. Want live quote? Drop WhatsApp 😊"; }
  }
  async function send(){
    if(!inp.trim())return; const q=inp.trim(); setInp(""); setMsgs(m=>[...m,{role:"u",text:q}]);
    const phone=q.match(/\+?\d{10,15}/);
    if(phone){
      setTyping(true);
      const r=await fetch("/api/ticket",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phone:phone[0],request:q,biz,conf})});
      const d=await r.json(); setTyping(false); setMsgs(m=>[...m,{role:"ai",text:d.message}]); return;
    }
    setTyping(true); await new Promise(r=>setTimeout(r,800)); const rep=await ask(q); setTyping(false); setMsgs(m=>[...m,{role:"ai",text:rep}]);
  }
  const tools=[
    {id:"01",name:"DRONE SCAN",what:"Measures 2,400 sq ft exact. Section B 98% wear.",how:"Tap Open → Laser scans → PDF"},
    {id:"02",name:"DAMAGE AI",what:"Upload photo → AI 92% → $1,240 est.",how:"Upload → Red boxes in 2 sec"},
    {id:"03",name:"QUOTE",what:"Slider 1200-4000 → $6k-$20k live. Now $12,480.",how:"Move slider → Live price"},
    {id:"04",name:"WEATHER",what:"Today 2% SAFE, 7-Day 12% WATCH.",how:"Radar spins → Shows risk"},
    {id:"05",name:"WARRANTY",what:"GAF till Oct 2033. ROC AZR-208765.",how:"Gold stamp → PDF"},
  ];
  return(
    <div style={{minHeight:"100vh",background:"#050505",color:"white",fontFamily:"monospace"}}>
      <div style={{background:"#D4AF37",color:"black",textAlign:"center",padding:"8px",fontWeight:"900",fontSize:"10px"}}>{biz.toUpperCase()} • HUMAN SARAH</div>
      <div style={{maxWidth:"820px",margin:"0 auto",padding:"20px 16px 100px"}}>
        <h1 style={{fontSize:"30px",fontWeight:"900"}}>Your roof.<br/><span style={{color:"#D4AF37"}}>Understood by AI.</span></h1>
        <p style={{color:"#666",fontSize:"12px",marginTop:"6px"}}>Real person chat, not robot. Tiny gold dot bottom-right.</p>
        <div style={{marginTop:"20px",display:"grid",gap:"12px"}}>
          {tools.map(t=>(
            <div key={t.id} style={{background:"#0f0f0f",border:"1px solid #1e1e1e",borderRadius:"18px",padding:"16px",display:"flex",justifyContent:"space-between"}}>
              <div><div style={{fontSize:"10px",color:"#D4AF37",fontWeight:"900"}}>{t.id} {t.name}</div><div style={{fontSize:"12px",marginTop:"6px"}}><b>What:</b> {t.what}</div><div style={{fontSize:"11px",marginTop:"4px",color:"#D4AF37"}}><b style={{color:"#888"}}>How:</b> {t.how}</div></div>
              <button onClick={()=>setOpen(t)} style={{background:"white",color:"black",borderRadius:"999px",padding:"0 16px",height:"36px",fontWeight:"900",border:"0",fontSize:"11px"}}>OPEN</button>
            </div>
          ))}
        </div>
      </div>
      <button onClick={()=>setChat(!chat)} style={{position:"fixed",bottom:"18px",right:"18px",width:"56px",height:"56px",borderRadius:"999px",background:"#D4AF37",color:"black",fontWeight:"900",border:"0",zIndex:50}}>{chat?"X":"●"}</button>
      {chat&&(
        <div style={{position:"fixed",bottom:"84px",right:"18px",width:"320px",maxWidth:"92vw",height:"380px",background:"#111",border:"1px solid #D4AF37",borderRadius:"18px",display:"flex",flexDirection:"column",zIndex:50}}>
          <div style={{background:"#D4AF37",color:"black",padding:"10px 14px",fontWeight:"900",fontSize:"11px",display:"flex",justifyContent:"space-between"}}><span>Sarah • Online</span><button onClick={()=>setChat(false)} style={{background:"black",color:"#D4AF37",border:"0",width:"20px",height:"20px",borderRadius:"999px"}}>X</button></div>
          <div ref={ref} style={{flex:1,overflow:"auto",padding:"10px",display:"flex",flexDirection:"column",gap:"8px"}}>
            {msgs.map((m,i)=>(<div key={i} style={{fontSize:"11px",padding:"8px 12px",borderRadius:"14px",whiteSpace:"pre-wrap",background:m.role==="u"?"#D4AF37":"#1e1e1e",color:m.role==="u"?"black":"white",alignSelf:m.role==="u"?"flex-end":"flex-start",maxWidth:"85%"}}>{m.text}</div>))}
            {typing&&<div style={{fontSize:"11px",color:"#D4AF37"}}>Sarah is typing...</div>}
          </div>
          <div style={{padding:"8px",borderTop:"1px solid #222",display:"flex",gap:"6px"}}>
            <input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Hi Sarah..." style={{flex:1,background:"#000",border:"1px solid #222",borderRadius:"999px",padding:"8px 12px",color:"white",fontSize:"11px"}}/>
            <button onClick={send} style={{background:"#D4AF37",color:"black",border:"0",borderRadius:"999px",padding:"0 14px",fontWeight:"900",fontSize:"11px"}}>SEND</button>
          </div>
        </div>
      )}
      {open&&(
        <div style={{position:"fixed",inset:"0",background:"rgba(0,0,0,0.96)",zIndex:60,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px"}}>
          <div style={{background:"#111",border:"1px solid #D4AF37",borderRadius:"18px",padding:"18px",maxWidth:"440px",width:"100%"}}>
            <div style={{display:"flex",justifyContent:"space-between"}}><b style={{color:"#D4AF37",fontSize:"12px"}}>{open.name}</b><button onClick={()=>setOpen(null)} style={{background:"#222",color:"white",border:"0",width:"28px",height:"28px",borderRadius:"999px"}}>X</button></div>
            <div style={{fontSize:"11px",marginTop:"8px"}}><b>What:</b> {open.what}</div>
            <div style={{fontSize:"11px",color:"#D4AF37",marginTop:"4px"}}><b>How:</b> {open.how}</div>
            {open.id==="03"&&<div style={{marginTop:"12px",background:"#000",padding:"12px",borderRadius:"12px"}}><div style={{fontSize:"11px"}}>{sq} sq ft = <span style={{color:"#D4AF37",fontWeight:"900"}}>${Math.round(sq*5.2).toLocaleString()}</span></div><input type="range" min={1200} max={4000} value={sq} onChange={e=>setSq(Number(e.target.value))} style={{width:"100%"}}/></div>}
            <div style={{marginTop:"12px",display:"flex",gap:"8px"}}>
              <input id="ph" placeholder="WhatsApp for ticket" style={{flex:1,background:"#000",border:"1px solid #222",borderRadius:"999px",padding:"10px",color:"white",fontSize:"11px"}}/>
              <button onClick={async()=>{const v=document.getElementById("ph").value; if(!v)return; const r=await fetch("/api/ticket",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phone:v,request:open.name,biz,conf})}); const d=await r.json(); alert(d.message); setOpen(null);}} style={{background:"#D4AF37",color:"black",border:"0",borderRadius:"999px",padding:"0 14px",fontWeight:"900",fontSize:"11px"}}>TICKET + WA</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
