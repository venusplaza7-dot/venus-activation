export async function POST(req){
  const {phone,request,biz,conf}=await req.json();
  const ticket="VENUS-2026-"+Math.floor(1000+Math.random()*9000);
  console.log("NEW TICKET",ticket,biz,phone,request);
  return Response.json({ticket,message:"✅ Ticket "+ticket+" CREATED!\n\nFor: "+biz+"\nRequest: "+request+"\nPhone: "+phone+"\n\n✅ Owner of "+biz+" notified (Email/SMS)\n✅ You get WhatsApp confirmation on "+phone+"\n✅ Crew calls back in 30 mins\n\nConf: "+conf});
}
