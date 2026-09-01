export async function POST(req){
  const { message, domain, niche, state } = await req.json();
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
          { role: "system", content: `You are receptionist for ${niche} business ${domain} in ${state}. Be helpful, offer slots 9am,11am,2pm tomorrow. Under 40 words.` },
          { role: "user", content: message }
        ],
        max_tokens: 120
      })
    });
    const data = await res.json();
    return Response.json({ reply: data.choices?.[0]?.message?.content || `Thanks for contacting ${domain}! Available tomorrow 9am,11am,2pm. Which works?` });
  }catch(e){
    return Response.json({ reply: `Thanks for contacting ${domain} in ${state}! Available tomorrow 9am,11am,2pm for ${niche}.` });
  }
}




