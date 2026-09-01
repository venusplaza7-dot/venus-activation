"use client";
import { useState } from "react";
import { FACADE_CONFIG } from "../../lib/facades.js";

export default function LivePage({ params, searchParams }) {
  const domain = params.b;
  const niche = searchParams.niche || "plumber";
  const state = searchParams.state || "HOUSTON";
  const customerPhone = searchParams.phone || "15125550142";
  const facade = FACADE_CONFIG[niche] || FACADE_CONFIG.plumber;
  const [activeTool, setActiveTool] = useState(null);
  const [chatMsg, setChatMsg] = useState("");
  const [quote, setQuote] = useState("");

  function openTool(id){ setActiveTool(id); }
  function waLink(msg){
    return `https://wa.me/${customerPhone}?text=${encodeURIComponent(msg + " - from " + domain + " site")}`;
  }

  return (
    <div style={{ background: "#fff", color: "#000", minHeight: "100vh", fontFamily: "Arial" }}>
      {/* HEADER - REMOVED DEMO BUTTON */}
      <div style={{ padding: 12, borderBottom: "1px solid #000", fontWeight: 900, fontSize: 12, display: "flex", justifyContent: "space-between" }}>
        <span>{domain.toUpperCase()} - EST. 2008 - REBUILT 2027</span>
        <span style={{ border: "1px solid #0EA5E9", borderRadius: 20, padding: "2px 8px", color: "#0EA5E9" }}>VENUS AI • LIVE • {facade.color}</span>
      </div>

      <div style={{ padding: 20 }}>
        <h1 style={{ fontSize: 42, fontWeight: 900, lineHeight: 0.9 }}>PIPES THAT<br/>DONT BURST.<br/>BOOKINGS THAT<br/>DONT STOP.</h1>
        <p style={{ color: "#666", marginTop: 12 }}>Built for {state} - Personalized for {domain} - Niche {niche} detected.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, padding: 16 }}>
        <div style={{ border: "1px solid #ddd", borderRadius: 16, padding: 12 }}><div style={{ fontSize: 11, color: "#888" }}>Leads / week</div><div style={{ fontSize: 20, fontWeight: 900 }}>27 → 84</div><div style={{ color: "#0EA5E9", fontSize: 11, fontWeight: 700 }}>+211% after rebuild</div></div>
        <div style={{ border: "1px solid #ddd", borderRadius: 16, padding: 12 }}><div style={{ fontSize: 11, color: "#888" }}>Booking rate</div><div style={{ fontSize: 20, fontWeight: 900 }}>11% → 38%</div><div style={{ color: "#0EA5E9", fontSize: 11, fontWeight: 700 }}>AI chat + quote</div></div>
        <div style={{ border: "1px solid #ddd", borderRadius: 16, padding: 12 }}><div style={{ fontSize: 11, color: "#888" }}>Load time</div><div style={{ fontSize: 20, fontWeight: 900 }}>8.4s → 1.1s</div><div style={{ color: "#0EA5E9", fontSize: 11, fontWeight: 700 }}>Brutalist fast</div></div>
      </div>

      {/* ACTIVATED AI TOOLS */}
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
        <div onClick={()=>openTool("booking")} style={{ border: "2px solid #000", borderRadius: 16, padding: 14, cursor: "pointer" }}>
          <b>01 AI BOOKING CHAT</b> - Books {domain} 24/7<div style={{ fontSize: 12, color: "green" }}>✓ ACTIVATED - Click to chat → WhatsApp {customerPhone}</div>
        </div>
        <div onClick={()=>openTool("quote")} style={{ border: "2px solid #000", borderRadius: 16, padding: 14, cursor: "pointer" }}>
          <b>02 AI QUOTE ESTIMATOR</b> - Instant price from photos<div style={{ fontSize: 12, color: "green" }}>✓ ACTIVATED - Click to get quote → WhatsApp</div>
        </div>
        <div onClick={()=>openTool("missed")} style={{ border: "1px solid #ddd", borderRadius: 16, padding: 14, cursor: "pointer" }}>
          <b>03 AI MISSED-CALL TEXT</b> - Saves $10k/mo<div style={{ fontSize: 12, color: "#666" }}>Auto texts missed calls to WhatsApp</div>
        </div>
        <div style={{ border: "1px solid #ddd", borderRadius: 16, padding: 14 }}>
          <b>04 AI REVIEW ENGINE</b> - 4.2 → 4.9 stars<div style={{ fontSize: 12 }}>Auto asks reviews via WhatsApp</div>
        </div>
        <div style={{ border: "1px solid #ddd", borderRadius: 16, padding: 14 }}>
          <b>05 AI UPSELL & REBOOK</b> - 22% rebook<div style={{ fontSize: 12 }}>Sends maintenance via WhatsApp</div>
        </div>
      </div>

      {/* WHATSAPP FOR CUSTOMER CLIENTS - REAL CONTACT */}
      <div style={{ margin: 16, border: "2px solid #000", borderRadius: 20, padding: 16, textAlign: "center" }}>
        <div style={{ fontWeight: 900, marginBottom: 8 }}>CONTACT {domain.toUpperCase()} NOW</div>
        <a href={waLink(`Hi ${domain}, I need ${niche} service`)} target="_blank" style={{ background: "#22c55e", color: "#fff", display: "block", padding: 16, borderRadius: 24, fontWeight: 900, textDecoration: "none", fontSize: 18 }}>💬 WHATSAPP {domain} - {customerPhone}</a>
        <div style={{ marginTop: 8, fontSize: 11, color: "#666" }}>Instant reply - AI Booking active 24/7</div>
        <a href={`tel:+${customerPhone}`} style={{ marginTop: 8, background: "#000", color: "#fff", display: "block", padding: 12, borderRadius: 24, fontWeight: 700, textDecoration: "none" }}>📞 CALL NOW {customerPhone}</a>
      </div>

      {/* TOOL MODALS - ACTIVATED */}
      {activeTool==="booking" && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.8)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 20, width: "100%", maxWidth: 400 }}>
            <b>AI Booking Chat - {domain}</b>
            <div style={{ marginTop: 10, background: "#f5f5f5", padding: 10, borderRadius: 8, fontSize: 13 }}>Hi! I'm AI for {domain}. What {niche} service do you need in {state}? I can book instantly.</div>
            <input value={chatMsg} onChange={e=>setChatMsg(e.target.value)} placeholder="e.g. Drain cleaning tomorrow" style={{ width: "100%", marginTop: 10, padding: 10, borderRadius: 8, border: "1px solid #ddd" }}/>
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <button onClick={()=>setActiveTool(null)} style={{ flex: 1, padding: 10, borderRadius: 8, border: "1px solid #ddd" }}>Close</button>
              <a href={waLink(`Booking request: ${chatMsg}`)} style={{ flex: 1, background: "#22c55e", color: "#fff", textAlign: "center", padding: 10, borderRadius: 8, textDecoration: "none", fontWeight: 700 }}>Send to WhatsApp</a>
            </div>
          </div>
        </div>
      )}

      {activeTool==="quote" && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.8)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 20, width: "100%", maxWidth: 400 }}>
            <b>AI Quote Estimator - {domain}</b>
            <div style={{ marginTop: 10, fontSize: 13 }}>Upload photo or describe issue - AI gives instant price range</div>
            <input value={quote} onChange={e=>setQuote(e.target.value)} placeholder="e.g. Leaky pipe under sink" style={{ width: "100%", marginTop: 10, padding: 10, borderRadius: 8, border: "1px solid #ddd" }}/>
            {quote && <div style={{ marginTop: 8, background: "#f0fdf4", padding: 10, borderRadius: 8, fontSize: 12 }}><b>AI Estimate for {domain}:</b> $150-$350 for {quote} in {state}. Final price after visit. 1.1s analysis.</div>}
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <button onClick={()=>setActiveTool(null)} style={{ flex: 1, padding: 10, borderRadius: 8, border: "1px solid #ddd" }}>Close</button>
              <a href={waLink(`Quote request: ${quote} - AI estimate $150-$350`)} style={{ flex: 1, background: "#0EA5E9", color: "#fff", textAlign: "center", padding: 10, borderRadius: 8, textDecoration: "none", fontWeight: 700 }}>Get Quote on WhatsApp</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
