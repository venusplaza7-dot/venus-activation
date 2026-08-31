'use client'; 
import {useState} from 'react'; 
export default function Page(){
  const[d,setD]=useState(''); 
  const[j,setJ]=useState(null);
  const[l,setL]=useState(false);
  return (
    <div style={{maxWidth:780,margin:'40px auto',padding:24,border:'3px solid #D4AF37',borderRadius:16,background:'#111',color:'#fff',fontFamily:'sans-serif'}}>
      <h1 style={{color:'#D4AF37',margin:0}}>VENUS ACTIVATION OS - $497</h1>
      <p style={{opacity:0.7}}>Crawl + AI Activation System</p>
      <input value={d} onChange={e=>setD(e.target.value)} placeholder='chinoplumbingco.com' style={{width:'100%',padding:14,background:'#000',color:'#fff',border:'2px solid #D4AF37',borderRadius:8,marginTop:16}}/>
      <button disabled={l||!d} onClick={async()=>{
        setL(true);
        try{
          const r1=await fetch('/api/crawl?domain='+d);
          const c=await r1.json();
          const r2=await fetch('/api/activate?domain='+d);
          const a=await r2.json();
          setJ({crawl:c,activation:a});
        }catch(e){setJ({error:e.message})}
        setL(false);
      }} style={{marginTop:12,width:'100%',padding:14,background:'#D4AF37',color:'#000',fontWeight:900,border:0,borderRadius:8,cursor:'pointer'}}>
        {l?'CRAWLING & ACTIVATING...':'CRAWL + ACTIVATE'}
      </button>
      {j&&<pre style={{background:'#000',color:'#0f0',padding:12,marginTop:12,borderRadius:8,overflow:'auto',fontSize:12,whiteSpace:'pre-wrap'}}>{JSON.stringify(j,null,2)}</pre>}
    </div>
  )
}
