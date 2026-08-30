import { kv } from '@vercel/kv';
import { getFacade } from '@/lib/facades';

export async function GET(req){
  const { searchParams } = new URL(req.url)
  const domain = searchParams.get('domain')
  if(!domain) return Response.json({ok:false})

  // FAKE SCRAPE - replace with cheerio later
  const niche = domain.includes('plumb')? 'plumbing' : 'default'
  const facade = getFacade(domain, niche)
  const data = { domain, niche, facade, images: ['https://picsum.photos/800/600'], phone: 'CALL NOW' }

  await kv.set(site:, data)
  return Response.json({ok:true, domain, niche, facade, data})
}
