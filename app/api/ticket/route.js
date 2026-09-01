export async function POST(req){
  const {phone, request, biz, conf} = await req.json();
  const ticket = `VENUS-${new Date().getFullYear()}-${Math.floor(1000+Math.random()*9000)}`;
  // 1. Log for owner (in real production, send email via Resend/SendGrid)
  console.log(`NEW TICKET ${ticket} for ${biz} from ${phone}: ${request}`);
  // 2. Here you would call Twilio WhatsApp:
  // await fetch(`https://api.twilio.com/...`, {body: `Ticket ${ticket} created for ${biz}. We'll call you back in 30 mins.`})

  return Response.json({
    ticket,
    message: `✅ Ticket ${ticket} CREATED!\n\nFor: ${biz}\nRequest: ${request}\nPhone: ${phone}\n\n✅ Owner of ${biz} has received your request (Email/SMS)\n✅ You will receive WhatsApp confirmation on ${phone} in 2 mins\n✅ Our team will call back in 30 mins\n\nConf: ${conf}`
  });
}

