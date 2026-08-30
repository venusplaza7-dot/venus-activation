export async function GET(req){
  const { searchParams } = new URL(req.url)
  const domain = searchParams.get('domain') || 'test.com'
  return Response.json({ok:true, domain, message:'VENUS ACTIVATED', facade: domain.length % 2? 'AQUA LUXE' : 'STEEL FLOW'})
}
