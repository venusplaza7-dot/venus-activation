



'use client';
import {useState} from 'react';

const TEMPLATES = [
  {id:'platinum', name:'Platinum Gold', color:'#D4AF37', bg:'#000'},
  {id:'ocean', name:'Ocean Blue', color:'#0ea5e9', bg:'#0f172a'},
  {id:'emerald', name:'Emerald Pro', color:'#10b981', bg:'#022c22'},
];

export default function Page(){
  const [domain,setDomain]=useState('');
  const [crawl,setCrawl]=useState(null);
  const [loading,setLoading]=useState(false);
  const [template,setTemplate]=useState(TEMPLATES[0]);
  const [business,setBusiness]=useState({
    name:'', phone:'', address:'', hours:'Mon-Sat 8AM-6PM', about:'', services:['Drain Cleaning','Leak Repair','Water Heater','Emergency Plumbing']
  });
  const [promos,setPromos]=useState([{id:1,title:'$49 Drain Cleaning Special',desc:'Limited time offer',active:true}]);

  async function doCrawl(){
    setLoading(true);
    try{
      const r = await fetch('/api/crawl?domain='+domain);
      const data = await r.json();
      setCrawl(data);
      // Auto-scrape fill
      setBusiness(b=>({
       ...b,
        name: data.title || domain,
        phone: (data.preview?.match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/)?.[0]) || 'Call Now',
        about: data.title || '',
      }));
    }catch(e){alert(e.message)}
    setLoading(false);
  }

  return (
    <div style={{minHeight:'100vh',background:'#0a0a0a',fontFamily:'sans-serif',display:'flex'}}>

      {/* LEFT - ACTIVATION DESKTOP */}
      <div style={{width:380,background:'#111',borderRight:'3px solid #D4AF37',padding:16,overflowY:'auto',height:'100vh',position:'sticky',top:0}}>
        <h1 style={{color:'#D4AF37',margin:0,fontSize:20}}>VENUS DESKTOP - $497</h1>
        <p style={{color:'#666',fontSize:11}}>Fulfillment Studio</p>

        <input value={domain} onChange={e=>setDomain(e.target.value)} placeholder='azplumbingco.com' style={{width:'100%',padding:12,background:'#000',color:'#fff',border:'2px solid #D4AF37',borderRadius:8,marginTop:12,boxSizing:'border-box'}}/>
        <button disabled={loading||!domain} onClick={doCrawl} style={{width:'100%',marginTop:8,padding:12,background:'#D4AF37',color:'#000',fontWeight:900,border:0,borderRadius:8,cursor:'pointer'}}>{loading?'SCRAPING OLD SITE...':'CRAWL + SCRAPE OLD SITE'}</button>

        {crawl && (
          <>
            <h3 style={{color:'#D4AF37',marginTop:20,fontSize:12}}>🎨 DESIGN FACADE</h3>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:6}}>
              {TEMPLATES.map(t=>(
                <div key={t.id} onClick={()=>setTemplate(t)} style={{padding:10,background: template.id===t.id? t.color : '#222',color: template.id===t.id? '#000' : '#fff',borderRadius:6,cursor:'pointer',textAlign:'center',fontSize:11,fontWeight:700,border: template.id===t.id? '2px solid #fff' : '1px solid #333'}}>{t.name}</div>
              ))}
            </div>

            <h3 style={{color:'#D4AF37',marginTop:16,fontSize:12}}>📝 BUSINESS INFO (Scraped + Editable)</h3>
            <input value={business.name} onChange={e=>setBusiness({...business,name:e.target.value})} placeholder='Business Name' style={{width:'100%',padding:8,background:'#000',color:'#fff',border:'1px solid #333',borderRadius:6,marginBottom:6,fontSize:13}}/>
            <input value={business.phone} onChange={e=>setBusiness({...business,phone:e.target.value})} placeholder='Phone' style={{width:'100%',padding:8,background:'#000',color:'#fff',border:'1px solid #333',borderRadius:6,marginBottom:6,fontSize:13}}/>
            <input value={business.address} onChange={e=>setBusiness({...business,address:e.target.value})} placeholder='Address' style={{width:'100%',padding:8,background:'#000',color:'#fff',border:'1px solid #333',borderRadius:6,marginBottom:6,fontSize:13}}/>
            <textarea value={business.about} onChange={e=>setBusiness({...business,about:e.target.value})} placeholder='About text scraped from old site' rows={3} style={{width:'100%',padding:8,background:'#000',color:'#fff',border:'1px solid #333',borderRadius:6,marginBottom:6,fontSize:12}}/>

            <h3 style={{color:'#D4AF37',marginTop:12,fontSize:12}}>🔧 SERVICES (Add/Delete)</h3>
            {business.services.map((s,i)=>(
              <div key={i} style={{display:'flex',gap:4,marginBottom:4}}>
                <input value={s} onChange={e=>{
                  const ns=[...business.services]; ns[i]=e.target.value; setBusiness({...business,services:ns});
                }} style={{flex:1,padding:6,background:'#000',color:'#fff',border:'1px solid #333',borderRadius:4,fontSize:12}}/>
                <button onClick={()=>setBusiness({...business,services:business.services.filter((_,idx)=>idx!==i)})} style={{background:'#ff4444',color:'#fff',border:0,borderRadius:4,padding:'0 8px',cursor:'pointer'}}>X</button>
              </div>
            ))}
            <button onClick={()=>setBusiness({...business,services:[...business.services,'New Service']})} style={{width:'100%',padding:6,background:'#222',color:'#fff',border:'1px dashed #555',borderRadius:4,fontSize:11,cursor:'pointer',marginTop:4}}>+ Add Service</button>

            <h3 style={{color:'#D4AF37',marginTop:14,fontSize:12}}>🎁 PROMOTIONS (Add/Delete Live)</h3>
            {promos.map(p=>(
              <div key={p.id} style={{background:'#000',border:'1px solid #333',borderRadius:6,padding:8,marginBottom:6}}>
                <input value={p.title} onChange={e=>setPromos(promos.map(x=>x.id===p.id?{...x,title:e.target.value}:x))} style={{width:'100%',background:'transparent',color:'#D4AF37',border:0,fontWeight:700,fontSize:13}}/>
                <input value={p.desc} onChange={e=>setPromos(promos.map(x=>x.id===p.id?{...x,desc:e.target.value}:x))} style={{width:'100%',background:'transparent',color:'#fff',border:0,fontSize:11,marginTop:2}}/>
                <div style={{display:'flex',gap:6,marginTop:6}}>
                  <button onClick={()=>setPromos(promos.map(x=>x.id===p.id?{...x,active:!x.active}:x))} style={{fontSize:10,padding:'2px 6px',background:p.active?'#0f0':'#555',color:'#000',border:0,borderRadius:3}}>{p.active?'ACTIVE':'OFF'}</button>
                  <button onClick={()=>setPromos(promos.filter(x=>x.id!==p.id))} style={{fontSize:10,padding:'2px 6px',background:'#ff4444',color:'#fff',border:0,borderRadius:3}}>DELETE</button>
                </div>
              </div>
            ))}
            <button onClick={()=>setPromos([...promos,{id:Date.now(),title:'New Promo - $XX OFF',desc:'Describe promotion',active:true}])} style={{width:'100%',padding:6,background:'#D4AF37',color:'#000',fontWeight:700,border:0,borderRadius:4,fontSize:11,cursor:'pointer'}}>+ ADD NEW PROMOTION</button>

            <h3 style={{color:'#D4AF37',marginTop:14,fontSize:12}}>🤖 AI TOOLS - Toggle</h3>
            {['AI Chatbot','Lead Capture AI','GMB Optimizer','SEO Writer','Review Booster'].map(tool=>(
              <div key={tool} style={{display:'flex',justifyContent:'space-between',background:'#000',padding:6,borderRadius:4,marginBottom:4,fontSize:11,color:'#fff'}}>
                <span>{tool}</span><span style={{color:'#0f0'}}>● ON</span>
              </div>
            ))}

            <button onClick={async()=>{
              const res = await fetch('/api/test?domain='+domain);
              const data = await res.json();
              alert(`DELIVERY QA: ${data.score} - ${data.overall}`);
            }} style={{width:'100%',marginTop:16,padding:12,background:'#0f0',color:'#000',fontWeight:900,border:0,borderRadius:8}}>TEST LIVE SITE</button>
            <button onClick={()=>alert('Deliver link: https://'+domain+'/activated?template='+template.id)} style={{width:'100%',marginTop:8,padding:12,background:'#fff',color:'#000',fontWeight:900,border:0,borderRadius:8}}>DELIVER TO CLIENT</button>
          </>
        )}
      </div>

      {/* RIGHT - BEAUTIFUL LIVE PREVIEW */}
      <div style={{flex:1,background:'#f5f5f5',padding:20,overflowY:'auto'}}>
        {!crawl? (
          <div style={{textAlign:'center',marginTop:100,color:'#999'}}><h2>Enter domain and Crawl to see Activation Desktop</h2><p>Scrape old site → Pick new facade → Edit → Deliver</p></div>
        ) : (
          <div style={{maxWidth:800,margin:'0 auto',background:'#fff',borderRadius:16,overflow:'hidden',boxShadow:'0 20px 60px rgba(0,0,0,0.3)',border:`4px solid ${template.color}`}}>
            {/* New Facade Header */}
            <div style={{background:template.bg,padding:20,color:'#fff',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <h1 style={{margin:0,color:template.color,fontSize:22}}>{business.name}</h1>
              <div style={{background:template.color,color:'#000',padding:'8px 16px',borderRadius:20,fontWeight:900,fontSize:13}}>{business.phone}</div>
            </div>
            {/* Hero */}
            <div style={{background:`linear-gradient(135deg, ${template.bg} 0%, ${template.color} 100%)`,padding:30,color:'#fff',textAlign:'center'}}>
              <h2 style={{margin:0,fontSize:32}}>24/7 Emergency Plumbing</h2>
              <p style={{opacity:0.9,marginTop:8}}>{business.about || 'Licensed, Insured, 5-Star Rated in Arizona'}</p>
              <button style={{marginTop:16,padding:'12px 24px',background:'#fff',color:'#000',fontWeight:900,border:0,borderRadius:8}}>BOOK NOW - AI SCHEDULING</button>
            </div>
            {/* Promos */}
            <div style={{padding:16,display:'grid',gap:10}}>
              {promos.filter(p=>p.active).map(p=>(
                <div key={p.id} style={{background:'#fffbeb',border:`2px dashed ${template.color}`,padding:12,borderRadius:8}}>
                  <h3 style={{margin:0,color:'#000',fontSize:16}}>{p.title}</h3>
                  <p style={{margin:'4px 0 0 0',color:'#555',fontSize:13}}>{p.desc}</p>
                </div>
              ))}
            </div>
            {/* Services */}
            <div style={{padding:16}}>
              <h3 style={{margin:'0 0 10px 0'}}>Our Services</h3>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
                {business.services.map(s=>(
                  <div key={s} style={{background:'#f8f8f8',padding:12,borderRadius:8,fontSize:13,borderLeft:`4px solid ${template.color}`}}>{s}</div>
                ))}
              </div>
            </div>
            {/* AI Widget */}
            <div style={{background:'#000',color:'#fff',padding:12,display:'flex',justifyContent:'space-between',fontSize:12}}>
              <span>🤖 AI Chat: Online</span><span>📍 {business.address || 'Arizona'}</span><span>🟢 {template.name} Active</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
