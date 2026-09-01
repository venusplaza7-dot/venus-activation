export async function POST(req){
  const {message, biz, history} = await req.json();
  const apiKey = process.env.OPENAI_API_KEY;
  if(!apiKey){
    // Fallback smart brain if no key yet
    return Response.json({reply: `I'm VENUS AI for ${biz}. I can help with drone scan (2,400 sq ft), damage photo AI (92% accuracy), instant quote $12,480, weather 12% hail risk, warranty till 2033. What do you need? For ticket, send your phone number!`});
  }
  const res = await fetch("https://api.openai.com/v1/chat/completions",{
    method:"POST",
    headers:{Authorization:`Bearer ${apiKey}`,"Content-Type":"application/json"},
    body: JSON.stringify({
      model:"gpt-4o-mini",
      messages:[
        {role:"system", content:`You are VENUS AI for roofing company ${biz}. You have 5 tools: 01 DRONE SCAN (2,400 sq ft, Section B 98% wear), 02 DAMAGE AI VISION (upload photo → 92% damage detection $1,240), 03 INSTANT QUOTE (slider $6k-$20k live $12,480), 04 WEATHER RADAR (2%/5%/12% hail), 05 WARRANTY VAULT (GAF valid Oct 2033 ROC AZR-208765). Explain what each does and how to use. Be helpful. If customer needs help, ask for phone number to create ticket VENUS-XXXX and say owner will be notified and they will get WhatsApp confirmation. CONF VENUS-2026-HOU-497`},
       ...history.slice(-6),
        {role:"user", content:message}
      ]
    })
  });
  const data = await res.json();
  return Response.json({reply: data.choices?.[0]?.message?.content || "How can I assist you with your roofing needs?"});
}
