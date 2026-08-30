'use client';
import {useState} from 'react';
export default function Page(){
 const [d,setD]=useState('');
 const [j,setJ]=useState(null);
 const activate=async()=>{
   if(!d) return;
   const r=await fetch('/api/activate?domain='+d);
   setJ(await r.json());
 }
 return(
   <div style={{maxWidth:720,margin:'30px auto',padding:24,border:'3px solid #000',borderRadius:16,fontFamily:'sans-serif'}}>
     <h1 style={{fontWeight:900}}>VENUS ACTIVATION OS - </h1>
     <p>Unique facade per customer</p>
     <input value={d} onChange={e=>setD(e.target.value)} placeholder='chinoplumbingco.com' style={{width:'100%',padding:14,border:'2px solid #000',borderRadius:8}}/>
     <button onClick={activate} style={{marginTop:12,width:'100%',padding:14,background:'#000',color:'#D4AF37',fontWeight:900,borderRadius:8}}>ACTIVATE</button>
     {j && <pre style={{marginTop:16,background:'#f5f5f5',padding:12}}>{JSON.stringify(j,null,2)}</pre>}
   </div>
 )
}
