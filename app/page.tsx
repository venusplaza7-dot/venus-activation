'use client';
import {useState} from 'react';
export default function Page(){
  const [d,setD]=useState(''),[j,setJ]=useState(null),[s,setS]=useState(false);
  const activate=async()=>{
    if(!d) return; setS(true);
    const r=await fetch(/api/activate?domain=); const data=await r.json(); setJ(data); setS(false);
  }
  return(
    <div style={{maxWidth:720,margin:'30px auto',padding:24,background:'#fff',border:'2px solid #000',borderRadius:16,fontFamily:'sans-serif'}}>
      <h1 style={{fontWeight:900}}>VENUS ACTIVATION OS - </h1>
      <p>Unique facade per category + per customer</p>
      <input value={d} onChange={e=>setD(e.target.value)} placeholder="chinoplumbingco.com" style={{width:'100%',padding:16,border:'2px solid #000',borderRadius:10,fontWeight:700}}/>
      <button onClick={activate} style={{marginTop:12,width:'100%',padding:18,background:'#000',color:'#D4AF37',fontWeight:900,borderRadius:10}}>{s?'BUILDING UNIQUE SITE...':'ACTIVATE ? UNIQUE FACADE'}</button>
      {j?.ok&&<div style={{marginTop:16,padding:16,background:'#f3f4f6',borderRadius:10}}>
        <b>{j.domain}</b> ? {j.facade.name} ({j.niche})<br/>
        <a href={/o/} target="_blank" style={{display:'block',marginTop:10,padding:12,background:'#D4AF37',color:'#000',fontWeight:900,textAlign:'center',borderRadius:8,textDecoration:'none'}}>VIEW UNIQUE LIVE SITE</a>
      </div>}
    </div>
  )
}
