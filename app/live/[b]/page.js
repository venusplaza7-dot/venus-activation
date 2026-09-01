"use client";
import { useState } from "react";
import { FACADE_CONFIG } from "../../lib/facades.js";

function getNiche(raw){
  const n = (raw||"").toLowerCase();
  if(n.includes("dent")) return "dentist";
  if(n.includes("plumb")) return "plumber";
  if(n.includes("roof")) return "roofing";
  if(n.includes("hvac") || n.includes("ac")) return "hvac";
  if(n.includes("elect")) return "electrical";
  return n;
}

export default function LivePage({ params, searchParams }) {
  const domain = params.b;
  const rawNiche = searchParams.niche || "plumber";
  const niche = getNiche(rawNiche);
  const state = searchParams.state || "HOUSTON";
  const customerPhone = searchParams.phone || "15125550142";
  const facade = FACADE_CONFIG[niche] || FACADE_CONFIG.plumber;
  const [activeTool, setActiveTool] = useState(null);
  const [input, setInput] = useState("");

  const headlines = {
    roofing: ["ROOFS THAT","DONT LEAK.","BOOKINGS THAT","DONT STOP."],
    plumber: ["PIPES THAT","DONT BURST.","BOOKINGS THAT","DONT STOP."],
    hvac: ["AIR THAT","DONT QUIT.","BOOKINGS THAT","DONT STOP."],
    electrical: ["POWER THAT","DONT FAIL.","BOOKINGS THAT","DONT STOP."],
    dentist: ["SMILES THAT","DONT FADE.","BOOKINGS THAT","DONT STOP."]
  };

  const h = headlines[niche] || headlines.plumber;

  function wa(msg){
    return `https://wa.me/${customerPhone}?text=${encodeURIComponent(msg)}`;
  }

  return (
    <div style={{ background: "#fff", color: "#000", minHeight: "100vh", fontFamily: "Arial" }}>
      <div style={{ padding: 12, borderBottom: "1px solid #000", fontWeight: 900, fontSize: 11, display: "flex", justifyContent: "space-between" }}>
        <span>{domain.toUpperCase()} - EST. 2008 - REBUILT 2027</span>
        <span style={{ border: `1.5px solid ${facade.color}`, borderRadius: 20, padding: "2px 8px", color: facade.color }}>VENUS AI • LIVE • {niche.toUpperCase()}</span>
      </div>

      <div style={{ padding: 20 }}>
        <h1 style={{ fontSize: 42, fontWeight: 900, lineHeight: 0.9 }}>{h.map((l,i)=><div key={i}>{l}</div>)}</h1>
        <p style={{ color: "#666", marginTop: 12, fontSize: 14 }}>Built for {state} - Personalized for {domain} - Niche {niche} detected - {facade.name} facade.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, padding: 16 }}>
        <div style={{ border: "1px solid #ddd", borderRadius: 16, padding: 12 }}><div style={{ fontSize: 11, color: "#888" }}>Leads / week</div><div style={{ fontSize: 20, fontWeight: 900 }}>27 → 84</div><div style={{ color: "#0EA5E9", fontSize: 11, fontWeight: 700 }}>+211% after rebuild</div></div>
        <div style={{ border: "1px solid #ddd", borderRadius: 16, padding: 12 }}><div style={{ fontSize: 11, color: "#888" }}>Booking rate</div><div style={{ fontSize: 20, fontWeight: 900 }}>11% → 38%</div><div style={{ color: "#0EA5E9", fontSize: 11, fontWeight: 700 }}>AI chat + quote</div></div>
        <div style={{ border: "1px solid #ddd", borderRadius: 16, padding: 12 }}><div style={{ fontSize: 11, color: "#888" }}>Load time</div><div style={{ fontSize: 20, fontWeight: 900 }}>8.4s → 1.1s</div><div style={{ color: "#0EA5E9", fontSize: 11, fontWeight: 700 }}>Brutalist fast</div></div>
      </div>

      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
        {facade.tools.map((t,i)=>(
          <div key={t.id} onClick={()=>setActiveTool(t)} style={{ border: i<2? "2px solid #000" : "1px solid #ddd", borderRadius: 16, padding: 14, cursor: "pointer", background: i<2? "#f0fdf4" : "#fff" }}>
            <b>0{i+1} {t.name.toUpperCase()}</b> - {t.name.includes("Smile")? "Cavity scan from photo" : t.name.includes("X-Ray")? "AI reads X-Ray" : t.name.includes("Leak")? "Find leak from photo" : t.name.includes("Drone")? "Live roof map" : t.name.includes("Damage")? "Damage from photo" : "Instant for "+domain}
            <div style={{ fontSize: 12, color: "green", marginTop: 2 }}>✓ ACTIVATED - Click to use → WhatsApp {customerPhone}</div>
          </div>
        ))}
      </div>

      <div style={{ margin: 16, border: "2px solid #000", borderRadius: 20, padding: 16, textAlign: "center" }}>
        <div style={{ fontWeight: 900, marginBottom: 8 }}>CONTACT {domain.toUpperCase()} NOW</div>
        <a href={wa(`Hi ${domain}, I need ${niche} service in ${state}`)} target="_blank" style={{ background: "#22c55e", color: "#fff", display: "block", padding: 16, borderRadius: 24, fontWeight: 900, textDecoration: "none" }}>💬 WHATSAPP {domain} - {customerPhone}</a>
        <a href={`tel:+${customerPhone}`} style={{ marginTop: 8, background: "#000", color: "#fff", display: "block", padding: 12, borderRadius: 24, fontWeight: 700, textDecoration: "none" }}>📞 CALL NOW {customerPhone}</a>
        <div style={{ marginTop: 8, fontSize: 11, color: "#666" }}>AI Booking active 24/7 - Missed calls auto-text</div>
      </div>

      {activeTool && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.85)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 20, width: "100%", maxWidth: 400 }}>
            <b>{activeTool.name} - {domain}</b>
            <div style={{ marginTop: 8, fontSize: 13, background: "#f5f5f5", padding: 10, borderRadius: 8 }}>Hi! AI for {domain} ({niche} in {state}). How can I help? Type your request and I'll send to WhatsApp {customerPhone}</div>
            <input value={input} onChange={e=>setInput(e.target.value)} placeholder={niche==="dentist"? "e.g. Need cleaning tomorrow" : "e.g. Drain cleaning tomorrow"} style={{ width: "100%", marginTop: 10, padding: 12, borderRadius: 8, border: "1px solid #ddd" }}/>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button onClick={()=>setActiveTool(null)} style={{ flex: 1, padding: 12, borderRadius: 8, border: "1px solid #ddd" }}>Close</button>
              <a href={wa(`${activeTool.name} request: ${input} - from ${domain} live site`)} style={{ flex: 1, background: facade.color, color: "#000", textAlign: "center", padding: 12, borderRadius: 8, textDecoration: "none", fontWeight: 900 }}>Send WhatsApp</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
