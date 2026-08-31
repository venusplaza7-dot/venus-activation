{j&&<div style={{background:'#000',padding:12,marginTop:12,borderRadius:8}}>
  <h3 style={{color:'#D4AF37',margin:'0 0 8px 0'}}>✅ {j.crawl?.domain} - {j.crawl?.title}</h3>
  <p style={{color:'#fff',fontSize:12}}>Site Length: {j.crawl?.length} chars</p>
  <div style={{background:'#111',padding:10,borderRadius:6,marginTop:8}}>
    <p style={{color:'#D4AF37',margin:0}}>PLAN: {j.activation?.activation?.plan}</p>
    <p style={{color:'#0f0',margin:0}}>STATUS: {j.activation?.activation?.status}</p>
    <ul style={{color:'#fff',fontSize:12}}>{j.activation?.activation?.assets?.map(a=><li key={a}>{a}</li>)}</ul>
  </div>
</div>}
