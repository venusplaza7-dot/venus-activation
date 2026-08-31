export async function GET(req){
  const {searchParams} = new URL(req.url);
  const domain = searchParams.get('domain')||'';
  if(!domain) return Response.json({ok:false,error:'No domain'},{status:400});
  // Simple fetch of site title for demo - replace with your full crawler later
  try{
    const res = await fetch(`https://${domain}`,{headers:{'User-Agent':'VenusBot'}});
    const html = await res.text();
    const title = html.match(/<title>(.*?)<\/title>/i)?.[1]||'No title';
    return Response.json({ok:true,domain,title,length:html.length,preview:html.slice(0,500)});
  }catch(e){
    return Response.json({ok:false,domain,error:e.message});
  }
}
export const dynamic='force-dynamic';



