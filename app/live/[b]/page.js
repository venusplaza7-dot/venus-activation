"use client";
import { useState } from "react";
import { FACADE_CONFIG } from "../../lib/facades.js";

function getNiche(raw){
  const n = (raw||"").toLowerCase();
  if(n.includes("dent")) return "dentist";
  if(n.includes("plumb")) return "plumber";
  if(n.includes("roof")) return "roofing";
  if(n.includes("hvac")) return "hvac";
  if(n.includes("elect")) return "electrical";
  return "plumber";
}

export default function LivePage({ params, searchParams }) {
  const domain = params.b;
  const niche = getNiche(searchParams.niche);
  const state = searchParams.state || "HOUSTON";
  const customerPhone = searchParams.phone || "923042828247"; // YOUR TEST NUMBER
  const facade = FACADE_CONFIG[niche] || FACADE_CONFIG.plumber;
  const [activeTool, setActiveTool] = useState(null);
  const [input, setInput] = useState("");
  const [aiReply, setAiReply] = useState("");
  const [loading, setLoading] = useState(false);

  const headlines = {
    roofing: ["ROOFS THAT","DONT LEAK.","BOOKINGS THAT","DONT STOP."],
    plumber: ["PIPES THAT","DONT BURST.","BOOKINGS THAT","DONT STOP."],
    hvac: ["AIR THAT","DONT QUIT.","BOOKINGS THAT","DONT STOP."],
    electrical: ["POWER THAT","DONT FAIL.","BOOKINGS THAT","DONT STOP."],
    dentist: ["SMILES THAT","DONT FADE.","BOOKINGS THAT","DONT STOP."]
  };

  async function askBrain(){
    if(!input) return;
    setLoading(true);
    setAiReply("AI thinking...");
    try{
      const res = await fetch("/api/ai/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, domain, niche, state, phone: customerPhone })
      });
      const data = await res.json();
      setAiReply(data.reply);
    }catch{
      setAiReply(`Thanks for contacting ${domain}! Available tomorrow 9am,11am,2pm.`);
    }
    setLoading(false);
  }

  async function askQuote(){
    if(!input) return;
    setLoading(true);
    setAiReply("AI estimating...");
    try{
      const res = await fetch("/api/ai/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: input, niche, domain })
      });
      const data = await res.json();
      setAiReply(data.estimate);
    }catch{
      setAiReply("$150-$350 | 85% | Medium urgency");
    }
    setLoading(false);
  }

  return (
    <div style={{ background: "#fff", color: "#000", minHeight: "100vh", fontFamily: "Arial" }}>
      <div style={{ padding: 12, borderBottom: "1px solid #000", fontWeight: 900, fontSize: 11, display: "flex", justifyContent: "space-between" }}>
        <span>{domain.toUpperCase()} - EST. 2008 - REBUILT 2027</span>
        <span style={{ border: `1.5px solid ${facade.color}`, borderRadius: 20, padding: "2px 8px", color: facade.color }}>VENUS AI • LIVE • {niche.toUpperCase()}</span>
      </div>
      <div style={{ padding: 20 }}>
        <h1 style={{ fontSize: 42, fontWeight: 900, lineHeight: 0.9 }}>{(headlines[niche]||headlines.plumber).map((l,i)=><div key={i}>{l}</div>)}</h1>
        <p style={{ color: "#666", marginTop: 10, fontSize: 13 }}>Built for {state} - {domain} - {niche} - TEST WhatsApp {customerPhone}</p>
      </div>
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
        {facade.tools.map((t,i)=>(
          <div key={t.id} onClick={()=>{setActiveTool(t); setAiReply(""); setInput("");}} style={{ border: i<2?"2px solid #000":"1px solid #ddd", borderRadius: 16, padding: 14, cursor: "pointer", background: i<2?"#f0fdf4":"#fff" }}>
            <b>0{i+1} {t.name.toUpperCase()}</b><div style={{ fontSize: 11, color: "green" }}>✓ BRAIN ACTIVE - Click to chat with AI → Test {customerPhone}</div>
          </div>
        ))}
      </div>
      <div style={{ margin: 16, border: "2px solid #000", borderRadius: 20, padding: 16, textAlign: "center" }}>
        <div style={{ fontWeight: 900, marginBottom: 8 }}>CONTACT {domain.toUpperCase()} NOW - TEST YOUR MOBILE</div>
        <a href={`https://wa.me/${customerPhone}?text=${encodeURIComponent(`Hi ${domain} - Test from live site - ${niche} in ${state} - ${aiReply || input}`)}`} target="_blank" style={{ background: "#22c55e", color: "#fff", display: "block", padding: 16, borderRadius: 24, fontWeight: 900, textDecoration: "none" }}>💬 TEST WHATSAPP → {customerPhone}</a>
        <a href={`tel:+${customerPhone}`} style={{ marginTop: 8, background: "#000", color: "#fff", display: "block", padding: 12, borderRadius: 24, fontWeight: 700, textDecoration: "none" }}>📞 TEST CALL {customerPhone}</a>
      </div>
      {activeTool && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 20, width: "100%", maxWidth: 400 }}>
            <b>{activeTool.name} - {domain} - BRAIN</b>
            <div style={{ marginTop: 8, fontSize: 12, background: "#f5f5f5", padding: 10, borderRadius: 8, minHeight: 40 }}>{aiReply || `Hi! AI for ${domain} (${niche} in ${state}). What do you need?`}</div>
            <input value={input} onChange={e=>setInput(e.target.value)} placeholder={niche==="dentist"?"Tooth pain tomorrow":"Drain cleaning tomorrow"} style={{ width: "100%", marginTop: 10, padding: 12, borderRadius: 8, border: "1px solid #ddd" }}/>
            <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
              <button onClick={()=> niche==="dentist" || activeTool.name.includes("Quote")? askQuote() : askBrain()} disabled={loading} style={{ flex: 1, background: facade.color, color: "#000", padding: 12, borderRadius: 8, fontWeight: 900, border: "none" }}>{loading?"THINKING...":"ASK AI BRAIN"}</button>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <button onClick={()=>setActiveTool(null)} style={{ flex: 1, padding: 10, borderRadius: 8, border: "1px solid #ddd" }}>Close</button>
              <a href={`https://wa.me/${customerPhone}?text=${encodeURIComponent(`${activeTool.name}: ${input} | AI: ${aiReply} - from ${domain}`)}`} style={{ flex: 1, background: "#22c55e", color: "#fff", textAlign: "center", padding: 10, borderRadius: 8, textDecoration: "none", fontWeight: 700 }}>Send to WhatsApp {customerPhone.slice(-4)}</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
