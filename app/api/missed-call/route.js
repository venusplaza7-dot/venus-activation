// app/api/missed-call/route.js
import twilio from 'twilio';
export async function POST(req){
  const {From, To} = await req.json(); // Twilio webhook
  const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);
  const conf = 'VENUS-2026-'+Math.floor(10000+Math.random()*90000);
  await client.messages.create({
    from: To, to: From,
    body: `Venus AI - Missed call? Book instantly: CONF # ${conf} for Today 3PM. Reply YES. Saves $10k/mo.`
  });
  return Response.json({sent:true, conf});
}
