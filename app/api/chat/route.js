export async function POST(req){
  const {message,biz,history}=await req.json();
  const key=process.env.OPENAI_API_KEY;
  if(!key) return Response.json({reply:"Hey! I'm Sarah from "+biz+" 👋 How can I help with your roof today?"});
  const r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{Authorization:"Bearer "+key,"Content-Type":"application/json"},body:JSON.stringify({model:"gpt-4o-mini",temperature:0.8,messages:[{role:"system",content:"You are Sarah, 28, roofing specialist at "+biz+". Real human texting, not AI. Talk short, warm, friendly, use contractions, 1 emoji max. Never say As an AI or Tap card above. Tools: Drone 2400 sq ft, Damage AI 92% $1240, Quote $12480, Weather 12% hail, Warranty 2033. When customer says hi, say Hey hey! Thanks for stopping by. I'm Sarah. When they need help, ask WhatsApp for ticket VENUS-XXXX, owner notified, WhatsApp confirmation. Keep under 3 lines, human."},...history.slice(-6).map(m=>({role:m.role==="u"?"user":"assistant",content:m.text})),{role:"user",content:message}]})});
  const d=await r.json(); return Response.json({reply:d.choices?.[0]?.message?.content||"Hey! How can I help?"});
}


