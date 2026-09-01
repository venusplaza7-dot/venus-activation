export async function POST(req){
  const {message,biz,history}=await req.json();
  const key=process.env.OPENAI_API_KEY;

  // HUMAN SARAH — NO ROBOT
  const humanFallback = (msg)=>{
    const m=msg.toLowerCase();
    if(m.includes("hi")||m.includes("hello")||m.includes("hey")){
      return "Hey hey! 👋 Thanks for stopping by "+biz+". I'm Sarah — real person here! How's your roof doing? Any leaks or just checking pricing? 😊";
    }
    if(m.includes("how much")||m.includes("price")||m.includes("cost")||m.includes("quote")){
      return "Ah good question! For around 2,400 sq ft we're usually $12,480 for GAF HDZ with labor + 10yr warranty. Want me to run live exact quote? Just drop your WhatsApp and I'll spin up ticket — crew pings you in 30 mins!";
    }
    if(m.includes("leak")||m.includes("damage")||m.includes("photo")){
      return "Oh no! 😬 Got a photo of the damage? You can upload in DAMAGE AI tool — I'll mark it with red boxes in 2 sec and give estimate. Or share WhatsApp and I'll create ticket VENUS-XXXX for crew.";
    }
    return "Got you! I can help with drone scan (2,400 sq ft exact), damage check from photo, live quote, hail risk 12%, warranty till 2033. What do you need? Just type or drop WhatsApp for ticket!";
  };

  if(!key){
    return Response.json({reply: humanFallback(message)});
  }

  try{
    const r=await fetch("https://api.openai.com/v1/chat/completions",{
      method:"POST",
      headers:{Authorization:"Bearer "+key,"Content-Type":"application/json"},
      body:JSON.stringify({
        model:"gpt-4o-mini",
        temperature:0.85,
        messages:[
          {role:"system",content:`You are Sarah, 28, real human from ${biz}, texting customer. Rules: Short, warm, friendly, use contractions, max 1 emoji. Never say "As an AI", never say "For 'hi' I recommend Live Drone Scan. Tap card above!" That is banned. Talk like human: "Hey hey! Thanks for stopping by..." Tools: Drone 2400 sq ft, Damage AI 92% $1240, Quote $12480, Weather 12% hail, Warranty 2033. Always ask WhatsApp for ticket, owner notified.`},
         ...history.slice(-6).map(m=>({role:m.role==="u"?"user":"assistant",content:m.text})),
          {role:"user",content:message}
        ]
      })
    });
    const d=await r.json();
    const reply=d.choices?.[0]?.message?.content || humanFallback(message);
    // Safety: if reply still contains robot phrase, replace
    if(reply.includes("For") && reply.includes("recommend Live Drone Scan") && reply.includes("Tap the card")){
      return Response.json({reply: humanFallback(message)});
    }
    return Response.json({reply});
  }catch{
    return Response.json({reply: humanFallback(message)});
  }
}
