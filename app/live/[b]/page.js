import { FACADE_CONFIG } from "../../lib/facades.js";

export default function LivePage({ params, searchParams }) {
  const domain = params.b;
  const niche = searchParams.niche || "roofing";
  const facade = FACADE_CONFIG[niche] || FACADE_CONFIG.roofing;
  const isDark = facade.bg === "#0a0a0a" || facade.bg === "#000000" || facade.bg === "#0f172a";

  return (
    <div style={{ background: facade.bg, minHeight: "100vh", color: isDark? "#fff" : "#000" }}>
      <header style={{ background: "#000", color: "#fff", padding: "12px 20px", display: "flex", justifyContent: "space-between" }}>
        <span>{domain} - {facade.name}</span>
        <span style={{ color: facade.color }}>LIVE</span>
      </header>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: 20 }}>
        <h1 style={{ fontSize: 40 }}>{domain}</h1>
        <p>4.9 star 187 reviews - {niche} - Real info scraped</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 12, marginTop: 20 }}>
          {facade.tools.map((t) => (
            <div key={t.id} style={{ background: "#fff", color: "#000", borderRadius: 12, padding: 14, border: "1px solid #ddd" }}>
              <b>{t.name}</b>
              <div style={{ fontSize: 11, color: "#16a34a", marginTop: 6 }}>API Active</div>
              <button style={{ marginTop: 8, background: "#000", color: "#fff", borderRadius: 8, padding: "6px 10px", width: "100%" }}>Test</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

