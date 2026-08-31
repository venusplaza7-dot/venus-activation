'use client';
import * as React from 'react';

export default function Page(){
  const useState = React.useState;
  const [domain,setDomain] = useState('');
  const [active,setActive] = useState('');
  const [niche,setNiche] = useState('plumbing');
  const [history,setHistory] = useState([]);
  const [msg,setMsg] = useState('');
  const [conf,setConf] = useState('');
  const [leads,setLeads] = useState([]);

  function activate(){
    if(!domain) return;
    const d = domain.toLowerCase();
    const det = d.includes('roof')?'roofing':d.includes('plumb')?'plumbing':d.includes('hvac')||d.includes('air')?'hvac':d.includes('electr')?'electric':d.includes('dent')?'dentist':'plumbing';
    setNiche(det);
    setActive(domain);
    setHistory([{from:'ai',text:'Hi! I am Venus AI for '+domain+' - Sensible AI linked to venus-ai-voice.github.io\n\nTell me your issue (e.g. "leakage", "drain clogged") - I will give real quote. Then send phone to get Confirmation #.'}]);
  }

  async function send(){
    if(!msg.trim()) return;
    const q = msg;
    setHistory(h=>[...h,{from:'user',text:q}]);
    setMsg('');
    try{
      const res = await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:q,domain:active,niche,history})});
      const data = await res.json();
      setHistory(h=>[...h,{from:'ai',text:data.reply}]);
      if(data.confirmation && q.match(/\d{10}/)){
        setConf(data.confirmation);
        setLeads(l=>[...l,{phone:q.match(/\d+/)[0],conf:data.confirmation,time:'Just now'}]);
      }
    }catch(e){
      setHistory(h=>[...h,{from:'ai',text:'Error - using fallback. Send phone for CONF # VENUS-2026-'+Math.floor(10000+Math.random()*90000)}]);
    }
  }

  const current = {plumbing:['Drain $89-$250','Water Heater $450-$1.2k','Emergency $150-$500','Leak $120-$400'],roofing:['Repair $450-$2k','Replace $4.2k-$8k','Emergency $350-$1.5k','Gutter $189-$450'],hvac:['AC $150-$600','Furnace $2.5k-$6k','Duct $300-$700','Tune $89-$150'],electric:['Panel $1.2k-$3k','Wiring $150-$600','Emergency $200-$800','Light $120-$400'],dentist:['Cleaning $99-$200','Whitening $299-$600','Emergency $150-$500','Implant Free']}[niche];

  return React.createElement('div',{style:{minHeight:'100vh',background:'#f8fafc',fontFamily:'sans-serif'}},
    React.createElement('div',{style:{background:'#000',padding:12,display:'flex',gap:8,justifyContent:'center',position:'sticky',top:0,zIndex:20}},
      React.createElement('input',{value:domain,onChange:e=>setDomain(e.target.value),placeholder:'Paste client site to ACTIVATE: lyonsroofing.com',style:{flex:1,maxWidth:400,padding:'12px 14px',borderRadius:10,border:'2px solid #d4af37'}}),
      React.createElement('button',{onClick:activate,style:{padding:'12px 20px',background:'#d4af37',color:'#000',borderRadius:10,fontWeight:900,border:0}},'ACTIVATE NOW →')
    ),
   !active? React.createElement('div',{style:{textAlign:'center',padding:100,color:'#64748b'}},'Main Feature: Paste website you emailed proposal to → Activate into 2026 luxury site with sensible AI + Confirmation #') :
    React.createElement('div',{style:{maxWidth:1100,margin:'0 auto',padding:20,display:'grid',gridTemplateColumns:'1fr 380px',gap:20}},
      React.createElement('div',null,
        React.createElement('div',{style:{background:'#fff',borderRadius:20,padding:20,border:'1px solid #e2e8f0'}},
          React.createElement('h1',{style:{fontSize:28,fontWeight:900,margin:0}}, active.toUpperCase()+' - '+niche.toUpperCase()+' 2026'),
          React.createElement('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginTop:16}},
            current.map(s=> React.createElement('div',{key:s,style:{border:'1px solid #e2e8f0',borderRadius:12,padding:12,fontWeight:700,fontSize:13}},s+' • AI Quote'))
          ),
          conf? React.createElement('div',{style:{marginTop:16,background:'#f0fdf4',border:'2px solid #22c55e',borderRadius:12,padding:14}},
            React.createElement('div',{style:{fontWeight:900,color:'#15803d'}},'✅ BOOKING CONFIRMED - VENUS OS'),
            React.createElement('div',{style:{fontSize:24,fontWeight:900,marginTop:6,letterSpacing:1}},conf),
            React.createElement('div',{style:{fontSize:12,marginTop:6}},'Client will show this at door. SMS sent. Review Engine queued. Saves $10k/mo.'),
            React.createElement('div',{style:{fontSize:11,color:'#64748b',marginTop:6}},'Leads today: '+leads.map(l=>l.conf).join(', '))
          ) : null,
          React.createElement('iframe',{src:'https://venusplaza7-dot.github.io/venus-ai-voice/',style:{width:'100%',height:140,border:'1px solid #e2e8f0',borderRadius:12,marginTop:16},title:'Venus AI Brain'})
        )
      ),
      React.createElement('div',{style:{border:'2px solid #0f172a',borderRadius:20,overflow:'hidden',background:'#fff',display:'flex',flexDirection:'column',height:580}},
        React.createElement('div',{style:{background:'#0f172a',color:'#fff',padding:12}},
          React.createElement('div',{style:{fontWeight:900,fontSize:12}},'💬 SENSIBLE AI CHAT - REAL API + CONF #'),
          React.createElement('div',{style:{fontSize:10,color:'#d4af37'}},'Uses /api/chat → venus-ai-voice • Generates VENUS-2026-XXXXX')
        ),
        React.createElement('div',{style:{flex:1,overflowY:'auto',padding:12,background:'#f8fafc'}},
          history.map((c,i)=> React.createElement('div',{key:i,style:{marginBottom:10,display:'flex',justifyContent:c.from==='user'?'flex-end':'flex-start'}},
            React.createElement('div',{style:{maxWidth:'85%',padding:'10px 12px',borderRadius:14,background:c.from==='user'?'#0f172a':'#fff',color:c.from==='user'?'#fff':'#0f172a',fontSize:13,border:'1px solid #e2e8f0',whiteSpace:'pre-wrap'}},c.text)
          ))
        ),
        React.createElement('div',{style:{padding:10,display:'flex',gap:6,borderTop:'1px solid #e2e8f0'}},
          React.createElement('input',{value:msg,onChange:e=>setMsg(e.target.value),onKeyDown:e=>e.key==='Enter'&&send(),placeholder:'Type issue or phone for CONF #...',style:{flex:1,padding:10,border:'1px solid #e2e8f0',borderRadius:10}}),
          React.createElement('button',{onClick:send,style:{padding:'10px 14px',background:'#d4af37',color:'#000',border:0,borderRadius:10,fontWeight:900}},'Send')
        )
      )
    )
  );
}
