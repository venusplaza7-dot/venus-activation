import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req){
  const { description, niche, domain } = await req.json();

  try{
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: `You are ${niche} expert for ${domain}. Give estimate: $range | confidence% | urgency | advice. Under 25 words.` },
        { role: "user", content: description }
      ]
    });
    return NextResponse.json({ estimate: completion.choices[0].message.content });
  }catch(e){
    return NextResponse.json({ estimate: "$150-$350 | 85% | Medium urgency | AI will confirm" });
  }
}













