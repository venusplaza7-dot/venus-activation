export async function GET(req:Request){
 const url=new URL(req.url);
 const domain=url.searchParams.get('domain') || 'test.com';
 const facade=domain.length % 2 === 0 ? 'AQUA LUXE' : 'STEEL FLOW';
 return Response.json({ok:true,domain,facade,message:'VENUS ACTIVATED',liveUrl:'https://'+domain});
}
