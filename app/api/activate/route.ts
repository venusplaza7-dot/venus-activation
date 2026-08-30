export async function GET(req:Request){
 const url=new URL(req.url);
 const domain=url.searchParams.get('domain') || 'test.com';
 return Response.json({ok:true,domain,facade:domain.length%2?'AQUA LUXE':'STEEL FLOW',message:'VENUS LIVE'});
}
