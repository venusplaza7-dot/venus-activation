export async function GET(req){
  const {searchParams} = new URL(req.url);
  const domain = searchParams.get('domain')||'';
  return Response.json({
    ok:true,
    domain,
    activation:{
      status:'ACTIVATED',
      plan:'$497 OS',
      assets:['Logo Pack','Landing Page','Email Sequence','GMB Optimizer'],
      next:'Connect Stripe for payment'
    },
    timestamp:new Date().toISOString()
  });
}
export const dynamic='force-dynamic';






