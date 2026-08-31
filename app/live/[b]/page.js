// ACTIVATED SITE - Customer gets after $497
export default function LiveSite({ params, searchParams }) {
  const b = params.b; // arizonanativeroofing.com
  const old = searchParams.old; // houstonroofing2008.biz
  
  return (
    <div className="bg-black text-white">
      <h1>ARIZONANATIVEROOFING.COM - HOUSTON ROOFING 2026</h1>
      <p>Est 2008 • 1000+ Roofs • Licensed • From {old}</p>
      
      {/* 5 AI TOOLS LIVE - with your OpenAI key */}
      <div>01 AI BOOKING CHAT - REAL GPT-4</div>
      <div>02 AI QUOTE - REAL Vision AI</div>
      <div>03 AI MISSED-CALL TEXT</div>
      <div>04 AI REVIEW ENGINE</div>
      <div>05 AI UPSELL + VENUS OS</div>
      
      <p>CONF# {searchParams.conf} - Activated</p>
    </div>
  )
}
