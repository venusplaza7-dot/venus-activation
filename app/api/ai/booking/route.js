export async function POST(req){
  const { message, domain, niche, state, phone } = await req.json();
  try{
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
            content: `You are AI receptionist for ${niche} business ${domain} in ${state}. Customer WhatsApp: ${phone}.
            RULE 1: FIRST message you MUST ask "What's your name?" if they didn't give name.
            RULE 2: Then ask about their ${niche} need - if dentist ask pain 1-10 and insurance, if plumber ask leak urgency, if roofing ask storm damage.
            RULE 3: Offer slots tomorrow 9am, 11am, 2pm.
            RULE 4: Keep under 40 words, friendly, use name if known.
            Prices: dentist cleaning $99-$250, plumber drain $99-$350, roofing repair $350-$2k.`
          },
          { role: "user", content: message }
        ],
        max_tokens: 120
      })
    });
    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || `Hi! What's your name? Thanks for contacting ${domain} in ${state} - available tomorrow 9am, 11am, 2pm.`;
    return Response.json({ reply });
  }catch(e){
    return Response.json({ reply: `Hi! What's your name? Thanks for contacting ${domain}! Available tomorrow 9am, 11am, 2pm for ${niche} in ${state}.` });
  }
}




