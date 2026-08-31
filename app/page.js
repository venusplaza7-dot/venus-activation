'use client';
import {useState} from 'react';

export default function Page(){
  const [d,setD]=useState('');
  const [j,setJ]=useState(null);
  const [l,setL]=useState(false);

  return (
    <div style={{minHeight:'100vh',background:'#000',padding:'20px',fontFamily:'sans-serif'}}>
      <div style={{maxWidth:780,margin:'40px auto',padding:24,border:'3px solid #D4AF37',borderRadius:16,background:'#111',color:'#fff'}}>
        
        <h1 style={{color:'#D4AF37',margin:0,fontSize:28,fontWeight:900,letterSpacing:-1}}>VENUS ACTIVATION OS - $497</h1>
        <p style={{opacity:0.7,marginTop:6,fontSize:14}}>Crawl + AI Activation System</p>
        
        <input 
          value={d} 
          onChange={e=>setD(e.target.value)} 
          placeholder='chinoplumbingco.com' 
          style={{width:'100%',padding:16,background:'#000',color:'#fff',border:'2px solid #D4AF37',borderRadius:8,marginTop:20,fontSize:16,boxSizing:'border-box'}}
        />
        
        <button 
          disabled={l||!d} 
          onClick={async()=>{
            setL(true); setJ(null);
            try{
              const r1=await fetch('/api/crawl?domain='+d);
              const crawl=await r1.json();
              const r2=await fetch('/api/activate?domain='+d);
              const activation=await r2.json();
              setJ({crawl,activation});
            }catch(e){
              setJ({error:e.message})
            }
            setL(false);
          }} 
          style={{marginTop:14,width:'100%',padding:16,background:l?'#888':'#D4AF37',color:'#000',fontWeight:900,border:0,borderRadius:8,cursor:'pointer',fontSize:16,letterSpacing:0.5}}
        >
          {l?'CRAWLING & ACTIVATING...':'CRAWL + ACTIVATE'}
        </button>

        {j && (
          <div style={{marginTop:16}}>
            {/* BEAUTIFUL CLIENT VIEW */}
            <div style={{background:'#000',padding:16,borderRadius:10,border:'1px solid #333'}}>
              <h3 style={{color:'#D4AF37',margin:'0 0 10px 0'}}>✅ LIVE RESULT: {j.crawl?.domain || j.activation?.domain}</h3>
              
              {j.crawl?.title && (
                <p style={{color:'#fff',margin:'4px 0',fontSize:14}}><b style={{color:'#888'}}>Site:</b> {j.crawl.title}</p>
              )}
              {j.crawl?.length && (
                <p style={{color:'#fff',margin:'4px 0',fontSize:12,opacity:0.7}}>Content: {j.crawl.length} chars crawled</p>
              )}
              
              <div style={{background:'#111',padding:12,borderRadius:8,marginTop:12,borderLeft:'4px solid #D4AF37'}}>
                <p style={{color:'#D4AF37',margin:'0 0 6px 0',fontWeight:700}}>PLAN: {j.activation?.activation?.plan || '$497 OS'}</p>
                <p style={{color:'#00FF00',margin:'0 0 8px 0',fontWeight:700}}>STATUS: {j.activation?.activation?.status || 'ACTIVATED'}</p>
                <p style={{color:'#888',margin:'0 0 6px 0',fontSize:12}}>INCLUDED ASSETS:</p>
                <ul style={{color:'#fff',fontSize:13,margin:0,paddingLeft:18}}>
                  {(j.activation?.activation?.assets||['Logo Pack','Landing Page','Email Sequence','GMB Optimizer']).map(a=><li key={a} style={{marginBottom:4}}>{a}</li>)}
                </ul>
              </div>

              <div style={{marginTop:12,padding:10,background:'#1a1a00',borderRadius:6,border:'1px dashed #D4AF37'}}>
                <p style={{color:'#D4AF37',margin:0,fontSize:12,fontWeight:700}}>➡️ NEXT: Connect Stripe for payment</p>
                <p style={{color:'#888',margin:'4px 0 0 0',fontSize:11}}>Timestamp: {j.activation?.timestamp || new Date().toISOString()}</p>
              </div>
            </div>

            {/* RAW JSON FOR DEBUG (small) */}
            <details style={{marginTop:10}}>
              <summary style={{color:'#666',fontSize:11,cursor:'pointer'}}>View Raw JSON</summary>
              <pre style={{background:'#000',color:'#0f0',padding:10,borderRadius:6,overflow:'auto',fontSize:10,whiteSpace:'pre-wrap',marginTop:6,border:'1px solid #222'}}>{JSON.stringify(j,null,2)}</pre>
            </details>
          </div>
        )}
      </div>
    </div>
  )
}
