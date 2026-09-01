import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY 
});

export async function POST(req){
  const body = await req.json();
  const { message, domain, niche, state } = body;

  try{
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: `You are receptionist for ${niche} business ${domain} in ${state}. Services: dentist cleaning $99-$250, plumber drain $99-$350, roofing repair $350-$2k. Reply under 40 words, offer 3 slots 9am,11am,2pm tomorrow.` },
        { role: "user", content: message }
      ]
    });
    return NextResponse.json({ reply: completion.choices[0].message.content });
  }catch(e){
    return NextResponse.json({ reply: `Thanks for contacting ${domain}! For ${niche} in ${state}: Available tomorrow 9am, 11am, 2pm. Which works? (AI)` });
  }
}

