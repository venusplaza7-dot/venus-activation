import OpenAI from 'openai';
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

export async function POST(req){
  const {imageBase64, oldData} = await req.json();
  const completion = await openai.chat.completions.create({
    model:'gpt-4o-mini',
    messages:[{role:'user', content:[
      {type:'text', text:`Analyze this roof photo for ${oldData?.domain}. Estimate damage level, repair cost in Houston 2026. Give: Damage, Quote, Savings vs old site price, Time.`},
      {type:'image_url', image_url:{url:imageBase64}}
    ]}]
  });
  return Response.json({analysis: completion.choices[0].message.content});
}
