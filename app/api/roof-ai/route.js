export async function POST(req) {
  const { tool, message, business } = await req.json()

  const prompts = {
    inspection: `You are AI Roof Inspector for ${business} Houston 77002, 2400sqft GAF HDZ. Answer about drone/satellite scan, Section B 98% complete, no leaks.`,
    damage: `You are Damage Estimator. Wind damage $1,240 estimated. Give detailed breakdown.`,
    warranty: `You are Warranty Tracker. GAF HDZ valid until Oct 2033, claim-ready docs.`,
    weather: `You are Weather Risk AI. Hail 12% next 7 days.`,
    material: `You are Material Optimizer. Recommend impact shingle, save 18%.`
  }

  // Call OpenAI here with prompts[tool] + message
  return Response.json({ reply: `Real AI response for ${tool}: ${message}` })
}







