'use client';
import {useState} from 'react';
export default function Page(){
  const [d,setD]=useState(''),[j,setJ]=useState(null);
  const activate=async()=>{
    const r=await fetch('/api/activate?domain='+d); setJ(await r.json());
  }
  return (
    <div style={{maxWidth:600,margin:'40px auto',padding:24,border:'3px solid #000',borderRadius:16,fontFamily:'sans-serif'}}>
      <h1 style={{fontWeight:900}}>VENUS ACTIVATION OS - </h1>
      <input value={d} onChange={e=>setD(e.target.value)} placeholder='chinoplumbingco.com' style={{width:'100%',padding:14,border:'2px solid #000',borderRadius:8}}/>
      <button onClick={activate} style={{width:'100%',marginTop:12,padding:14,background:'#000',color:'#D4AF37',fontWeight:900}}>ACTIVATE</button>
      {j && <pre style={{marginTop:16,background:'#f5f5f5',padding:12}}>{JSON.stringify(j,null,2)}</pre>}
    </div>
  )
}
