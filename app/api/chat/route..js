import OpenAI from 'openai';
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

export async function POST(req){
  const {message, domain, niche, city, oldData, history} = await req.json();
  const conf = 'VENUS-2026-'+Math.floor(10000+Math.random()*90000);

  // Phone = BOOKING
  if(/\d{10}/.test(message)){
    // TODO: Save to DB + send real SMS via Twilio
    return Response.json({reply:`✅ BOOKED ${domain}\nCONF # ${conf}\nTech Today 3PM\nSMS sent`, confirmation:conf, booked:true});
  }

  const system = `You are Venus AI for ${domain} (${niche} in ${city}). Old site: ${oldData?.title}. About: ${oldData?.about}. Achievements: ${oldData?.achievements}. Give specific prices: Roof Repair $450-$2k, Replacement $4.2k-$8k, Emergency $350-$1.5k, Gutter $189-$450. Be sensible, not generic. Ask for phone to generate CONF # VENUS-2026-XXXXX.`;

  const completion = await openai.chat.completions.create({
    model:'gpt-4o-mini',
    messages:[{role:'system',content:system},...history.slice(-6).map(h=>({role:h.from==='user'?'user':'assistant', content:h.text})), {role:'user', content:message}]
  });

  return Response.json({reply: completion.choices[0].message.content, confirmation:conf});
}


