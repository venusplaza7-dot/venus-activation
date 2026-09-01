export async function POST(req){
  const { description, niche, domain } = await req.json();
  try{
    const priceList = {
      dentist: "cleaning $99-$250, filling $150-$400, whitening $300-$800, crown $800-$2000, implant $2000-$5000",
      plumber: "drain cleaning $99-$350, leak repair $150-$500, water heater $400-$1800",
      roofing: "repair $350-$2000, replacement $4000-$15000, tarp $199-$500",
      hvac: "AC repair $150-$600, install $3000-$8000",
      electrical: "panel upgrade $1500-$4000, EV charger $500-$1500"
    };
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are ${niche} expert for ${domain}. Prices: ${priceList[niche]}. FIRST ask "What's your name?" Then give estimate format: Hi [Name], $X-$Y | confidence% | urgency | 1 line advice. Under 30 words. Friendly. If dentist, ask insurance.`
          },
          { role: "user", content: description }
        ],
        max_tokens: 100
      })
    });
    const data = await res.json();
    const estimate = data.choices?.[0]?.message?.content || `Hi! What's your name? $150-$350 | 85% | Medium | AI will confirm`;
    return Response.json({ estimate });
  }catch(e){
    return Response.json({ estimate: `Hi! What's your name? $99-$250 cleaning | 85% | Medium | AI will confirm` });
  }
}
