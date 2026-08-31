export default function Page({params, searchParams}) {
  const business = params.b || 'arizonanativeroofing.com'
  const old = searchParams.old || 'houstonroofing2008.biz'
  const conf = searchParams.conf || 'VENUS-2026-HOU-497'
  
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="bg-[#D4AF37] text-black text-center py-2">
        ACTIVATED • CONF# {conf} • Live • {old} → {business}
      </div>
      <h1 className="text-6xl p-10">{business} - HOUSTON ROOFING 2026 - EST 2008</h1>
      <p className="p-10">5 AI Tools Live: Booking Chat, Quote Estimator, Missed-Call Text, Review Engine, Upsell + Venus OS - Working with OpenAI key</p>
      <button className="m-10 bg-[#D4AF37] text-black px-6 py-3">Start AI Inspection - $497 Activated</button>
    </div>
  )
}
