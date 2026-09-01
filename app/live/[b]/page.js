"use client";
import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
export default function Page(){
  const {b}=useParams();
  const bizRaw=b; const biz=Array.isArray(bizRaw)?bizRaw[bizRaw.length-1]:bizRaw||"arizonanativeroofing.com";
  const [open,setOpen]=useState(null); const [chat,setChat]=useState(false); const [typing,setTyping]=useState(false);
  const [msgs,setMsgs]=useState([{role:"ai",text:"Hey! I'm Sarah from "+biz+" 👋 Real person here. How's your roof?"}]);
  const [inp,setInp]=useState(""); const [sq,setSq]=useState(2400);
  const ref=useRef(null); useEffect(()=>{if(ref.current)ref.current.scrollTop=9999;},[msgs]);
  async function ask(q){try{const r=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:q,biz,history:msgs})});const d=await r.json();return d.reply;}catch{return "Hey! For 2400 sq ft ~ $12,480 with GAF HDZ. Want exact quote? Send WhatsApp 😊";}}
  async function send(){if(!inp.trim())return; const q=inp.trim(); setInp(""); setMsgs(m=>[...m,{role:"u",text:q}]); if(q.match(/\+?\d{10,}/)){setTyping(true);const r=await fetch("/api/ticket",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phone:q,request:"help",biz})});const d=await r.json();setTyping(false);setMsgs(m=>[...m,{role:"ai",text:d.message}]);return;} setTyping(true);await new Promise(r=>setTimeout(r,700));const rep=await ask(q);setTyping(false);setMsgs(m=>[...m,{role:"ai",text:rep}]);}
  const tools=[
    {id:"01",n:"DRONE SCAN",w:"Measures 2,400 sq ft exact. Section B 98% wear.",h:"Tap Open → Scan → PDF"},
    {id:"02",n:"DAMAGE AI",w:"Photo → AI 92% boxes → $1,240 est.",h:"Upload → 2 sec red boxes"},
    {id:"03",n:"QUOTE",w:"Slider 1200-4000 → $6k-$20k live. $12,480 now.",h:"Move slider → Live price"},
    {id:"04",n:"WEATHER",w:"Today 2% SAFE, 7-Day 12% WATCH.",h:"Radar → Shows risk"},
    {id:"05",n:"WARRANTY",w:"GAF till Oct 2033, ROC AZR-208765.",h:"Gold stamp → PDF"},
  ];
  return(
    <div style={{minHeight:"100vh",background:"#f7f5f0",color:"#111",fontFamily:"system-ui",width:"100%",overflowX:"hidden"}}>
      <style>{`@media(max-width:600px){.card{flex-direction:column!important}.hero{font-size:26px!important}.chatBox{width:92vw!important;right:4vw!important;left:4vw!important;bottom:80px!important}.chatBtn{bottom:16px!important;right:16px!important}}`}</style>
      <div style={{maxWidth:"760px",margin:"0 auto",padding:"20px 16px 120px",boxSizing:"border-box"}}>
        <div style={{fontSize:"11px",letterSpacing:"2px",color:"#a8862f",fontWeight:"900"}}>VENUS AI • {biz.toUpperCase()}</div>
        <h1 className="hero" style={{fontSize:"36px",fontWeight:"900",marginTop:"18px",lineHeight:"1.05",color:"#111"}}>Your roof.<br/><span style={{color:"#a8862f"}}>Understood by AI.</span></h1>
        <p style={{color:"#666",fontSize:"14px",marginTop:"10px",lineHeight:"1.4"}}>Mobile-friendly. Readable. Sarah chats like real person, not robot.</p>
        <div style={{marginTop:"22px",display:"grid",gap:"14px"}}>
          {tools.map(t=>(
            <div key={t.id} className="card" style={{background:"white",border:"1px solid #e8e0c8",borderRadius:"20px",padding:"18px",display:"flex",justifyContent:"space-between",gap:"12px",boxShadow:"0 4px 16px rgba(0,0,0,0.04)"}}>
              <div style={{flex:1,minWidth:0}}><div style={{fontSize:"10px",color:"#a8862f",fontWeight:"900"}}>{t.id} {t.n}</div><div style={{fontSize:"14px",marginTop:"6px",wordWrap:"break-word"}}><b>What:</b> {t.w}</div><div style={{fontSize:"12px",marginTop:"4px",color:"#a8862f",wordWrap:"break-word"}}><b style={{color:"#888"}}>How:</b> {t.h}</div></div>
              <button onClick={()=>setOpen(t)} style={{background:"#111",color:"white",borderRadius:"999px",padding:"0 20px",height:"42px",fontWeight:"800",border:"0",flexShrink:0,alignSelf:"center"}}>Open</button>
            </div>
          ))}
        </div>
      </div>
      <button className="chatBtn" onClick={()=>setChat(!chat)} style={{position:"fixed",bottom:"24px",right:"24px",width:"56px",height:"56px",borderRadius:"999px",background:"#111",color:"#d4af37",fontWeight:"900",border:"0",zIndex:50,boxShadow:"0 8px 24px rgba(0,0,0,0.3)"}}>{chat?"X":"●"}</button>
      {chat&&(
        <div className="chatBox" style={{position:"fixed",bottom:"92px",right:"24px",width:"340px",maxWidth:"92vw",height:"min(420px,60vh)",background:"white",border:"1px solid #e8e0c8",borderRadius:"20px",display:"flex",flexDirection:"column",zIndex:50,boxShadow:"0 20px 40px rgba(0,0,0,0.25)"}}>
          <div style={{background:"#111",color:"#d4af37",padding:"12px 16px",fontWeight:"900",fontSize:"12px",borderRadius:"20px 20px 0 0",display:"flex",justifyContent:"space-between"}}><span>Sarah • Real • Online</span><button onClick={()=>setChat(false)} style={{background:"#222",color:"#d4af37",border:"0",width:"24px",height:"24px",borderRadius:"999px"}}>X</button></div>
          <div ref={ref} style={{flex:1,overflow:"auto",padding:"14px",display:"flex",flexDirection:"column",gap:"10px",background:"#faf8f3"}}>
            {msgs.map((m,i)=>(<div key={i} style={{fontSize:"13px",padding:"10px 14px",borderRadius:"16px",whiteSpace:"pre-wrap",lineHeight:"1.4",background:m.role==="u"?"#111":"white",color:m.role==="u"?"white":"#111",border:m.role==="ai"?"1px solid #eee":"0",alignSelf:m.role==="u"?"flex-end":"flex-start",maxWidth:"85%",wordBreak:"break-word"}}>{m.text}</div>))}
            {typing&&<div style={{fontSize:"12px",color:"#a8862f"}}>Sarah is typing…</div>}
          </div>
          <div style={{padding:"10px",borderTop:"1px solid #eee",display:"flex",gap:"8px"}}>
            <input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Hi Sarah..." style={{flex:1,background:"#f5f2eb",border:"1px solid #e8e0c8",borderRadius:"999px",padding:"12px 16px",fontSize:"14px",minWidth:0}}/>
            <button onClick={send} style={{background:"#111",color:"white",border:"0",borderRadius:"999px",padding:"0 18px",fontWeight:"900",flexShrink:0}}>↑</button>
          </div>
        </div>
      )}
      {open&&(
        <div style={{position:"fixed",inset:"0",background:"rgba(0,0,0,0.5)",zIndex:60,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px"}}>
          <div style={{background:"white",borderRadius:"20px",padding:"20px",maxWidth:"420px",width:"100%",boxSizing:"border-box"}}>
            <div style={{display:"flex",justifyContent:"space-between"}}><b style={{color:"#a8862f"}}>{open.n}</b><button onClick={()=>setOpen(null)} style={{background:"#eee",border:"0",width:"28px",height:"28px",borderRadius:"999px"}}>X</button></div>
            <div style={{fontSize:"14px",marginTop:"10px"}}><b>What:</b> {open.w}</div><div style={{fontSize:"12px",color:"#a8862f",marginTop:"4px"}}><b>How:</b> {open.h}</div>
            {open.id==="03"&&<div style={{marginTop:"12px",background:"#f7f5f0",padding:"12px",borderRadius:"12px"}}><div>{sq} sq ft = <b style={{color:"#a8862f"}}>${Math.round(sq*5.2).toLocaleString()}</b></div><input type="range" min={1200} max={4000} value={sq} onChange={e=>setSq(Number(e.target.value))} style={{width:"100%"}}/></div>}
            <div style={{marginTop:"14px",display:"flex",gap:"8px"}}><input id="ph" placeholder="WhatsApp number" style={{flex:1,background:"#f5f2eb",border:"1px solid #e8e0c8",borderRadius:"999px",padding:"12px",minWidth:0}}/><button onClick={async()=>{const v=document.getElementById("ph").value;if(!v)return;const r=await fetch("/api/ticket",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({phone:v,request:open.n,biz})});const d=await r.json();alert(d.message);setOpen(null);}} style={{background:"#111",color:"white",border:"0",borderRadius:"999px",padding:"0 18px",fontWeight:"900",flexShrink:0}}>Ticket</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
