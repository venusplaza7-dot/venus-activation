mport { FACADE_CONFIG } from "../../lib/facades.js";

export default function LivePage({ params, searchParams }) {
  const domain = params.b;
  const niche = searchParams.niche || "plumbers";
  const state = searchParams.state || "HOUSTON";
  const facade = FACADE_CONFIG[niche] || FACADE_CONFIG.plumber;
  const company = domain.replace(".com","").toUpperCase();

  const content = {
    roofing: { headline: ["ROOFS THAT", "DON'T LEAK.", "BOOKINGS THAT", "DON'T STOP."], services: ["Roof Replacement $4k-$15k", "Roof Repair $350-$2k", "Emergency Tarp $199-$500", "Gutter Install $800-$3k"] },
    plumbers: { headline: ["PIPES THAT", "DON'T BURST.", "BOOKINGS THAT", "DON'T STOP."], services: ["Drain Cleaning $99-$350", "Emergency Leak $150-$500", "Water Heater $400-$1.8k", "Pipe Replacement $350-$2.5k"] },
    hvac: { headline: ["AIR THAT", "DON'T QUIT.", "BOOKINGS THAT", "DON'T STOP."], services: ["AC Repair $150-$600", "AC Install $3k-$8k", "Heater Repair $200-$700", "Duct Cleaning $300-$800"] },
    electrical: { headline: ["POWER THAT", "DON'T FAIL.", "BOOKINGS THAT", "DON'T STOP."], services: ["Panel Upgrade $1.5k-$4k", "Emergency $150-$400", "EV Charger $500-$1.5k", "Rewire $2k-$10k"] },
    dentist: { headline: ["SMILES THAT", "DON'T FADE.", "BOOKINGS THAT", "DON'T STOP."], services: ["Cleaning $99-$250", "Whitening $300-$800", "Crown $800-$2k", "Implant $2k-$5k"] },
  };

  const c = content[niche] || content.plumbers;

  return (
    <div style={{ background: "#fff", color: "#000", fontFamily: "Helvetica, Arial, sans-serif", minHeight: "100vh" }}>
      <header style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", fontWeight: 900, fontSize: 13, borderBottom: "1px solid #000" }}>
        <span>{company} — EST. 2008 → REBUILT 2027 — {domain.toUpperCase()}</span>
        <span style={{ border: "1.5px solid #0EA5E9", borderRadius: 20, padding: "4px 10px", color: "#0EA5E9", fontSize: 11 }}>VENUS AI • LIVE • {facade.color}</span>
      </header>

      <section style={{ padding: "28px 16px 10px" }}>
        <h1 style={{ fontSize: 48, lineHeight: 0.9, fontWeight: 900, letterSpacing: -2, textTransform: "uppercase" }}>{c.headline.map((l,i)=><div key={i}>{l}</div>)}</h1>
        <p style={{ marginTop: 18, color: "#666", fontSize: 15, lineHeight: 1.4 }}>
          Original site {domain.replace(".com","")}2008.biz had 4 pages, Comic Sans, Yahoo email. Now: instant booking, proof, 1.1s load. Built for {state} — Personalized for {domain} — Niche {niche} detected.
        </p>
      </section>

      <section style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, padding: "16px" }}>
        <div style={{ border: "1px solid #ddd", borderRadius: 16, padding: 14 }}><div style={{ color: "#888", fontSize: 12 }}>Leads / week</div><div style={{ fontSize: 24, fontWeight: 900 }}>27 → 84</div><div style={{ color: "#0EA5E9", fontSize: 12, fontWeight: 700 }}>+211% after rebuild</div></div>
        <div style={{ border: "1px solid #ddd", borderRadius: 16, padding: 14 }}><div style={{ color: "#888", fontSize: 12 }}>Booking rate</div><div style={{ fontSize: 24, fontWeight: 900 }}>11% → 38%</div><div style={{ color: "#0EA5E9", fontSize: 12, fontWeight: 700 }}>AI chat + quote</div></div>
        <div style={{ border: "1px solid #ddd", borderRadius: 16, padding: 14 }}><div style={{ color: "#888", fontSize: 12 }}>Load time</div><div style={{ fontSize: 24, fontWeight: 900 }}>8.4s → 1.1s</div><div style={{ color: "#0EA5E9", fontSize: 12, fontWeight: 700 }}>Brutalist fast</div></div>
      </section>

      <section style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 10 }}>
        {c.services.map(s=>(
          <div key={s} style={{ border: "1px solid #ddd", borderRadius: 16, padding: "14px 16px", display: "flex", justifyContent: "space-between" }}>
            <div><b>{s.split(" $")[0]}</b><div style={{ fontSize: 13 }}><span style={{ color: "#0EA5E9", fontWeight: 700 }}>${s.split(" $")[1]}</span> • AI Quote • Book Now →</div></div>
          </div>
        ))}
      </section>

      <section style={{ margin: "20px 16px", border: "1px solid #ccc", borderRadius: 16, overflow: "hidden" }}>
        {facade.tools.map((t,i)=>(
          <div key={t.id} style={{ padding: "14px 16px", borderBottom: i<4? "1px solid #eee" : "none", display: "flex", gap: 12, background: i===0? "#f0fdf4" : "#fff" }}>
            <span style={{ color: "#0EA5E9", fontWeight: 900, fontSize: 14 }}>0{i+1}</span>
            <div><div style={{ fontWeight: 900, textTransform: "uppercase" }}>{t.name}</div><div style={{ color: "#666", fontSize: 13 }}>{t.name.includes("Booking")? `Books ${domain} 24/7` : t.name.includes("Quote")? "Instant price from photos" : t.name.includes("Missed")? "Saves $10k/mo" : t.name.includes("Review")? "4.2 → 4.9 stars" : "22% rebook"} • ✓ ACTIVATED</div></div>
          </div>
        ))}
      </section>

      <section style={{ margin: 16, border: `2px solid ${facade.color}`, borderRadius: 20, padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
        <a href={`https://wa.me/?text=Your ${niche} site ${domain} is LIVE with 5 AI tools activated: https://venus-activation.vercel.app/live/${domain}?niche=${niche}`} style={{ background: "#22c55e", color: "#000", textAlign: "center", padding: 16, borderRadius: 24, fontWeight: 900, textDecoration: "none" }}>💬 WHATSAPP ACTIVATE {domain}</a>
        <a href={`/live/${domain}?niche=${niche}`} style={{ background: "#0EA5E9", color: "#000", textAlign: "center", padding: 14, borderRadius: 24, fontWeight: 900, textDecoration: "none" }}>GO TO OFFER PAGE →</a>
      </section>
    </div>
  );
}
