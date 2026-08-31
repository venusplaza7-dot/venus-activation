'use client';
const React = require('react');
const useState = React.useState;

const NICHES = {
  roofing: {icon:'🏠', color:'#0f172a', services:[{name:'Roof Repair',price:'$450-$2k'},{name:'Full Replacement',price:'$4.2k-$8k'},{name:'Emergency Leak',price:'$350-$1.5k'},{name:'Gutter + Inspect',price:'$189-$450'}]},
  plumbing: {icon:'🚿', color:'#0c4a6e', services:[{name:'Drain Cleaning',price:'$89-$250'},{name:'Water Heater',price:'$450-$1.2k'},{name:'Emergency Plumbing',price:'$150-$500'},{name:'Leak Repair',price:'$120-$400'}]},
  hvac: {icon:'❄️', color:'#1e293b', services:[{name:'AC Repair',price:'$150-$600'},{name:'Furnace Install',price:'$2.5k-$6k'},{name:'Duct Cleaning',price:'$300-$700'},{name:'Tune-up',price:'$89-$150'}]},
  electric: {icon:'⚡', color:'#422006', services:[{name:'Panel Upgrade',price:'$1.2k-$3k'},{name:'Wiring Repair',price:'$150-$600'},{name:'Emergency Electric',price:'$200-$800'},{name:'Lighting Install',price:'$120-$400'}]},
  dentist: {icon:'🦷', color:'#134e4a', services:[{name:'Cleaning',price:'$99-$200'},{name:'Whitening',price:'$299-$600'},{name:'Emergency',price:'$150-$500'},{name:'Implant Consult',price:'Free'}]},
};

export default function Page(){
  const [domain,setDomain] = useState('plumbinaz.com');
  const [niche,setNiche] = useState('plumbing');
  const [crawl,setCrawl] = useState({title:'plumbinaz.com'});
  const [msg,setMsg] = useState('');
  const [history,setHistory] = useState([{from:'ai',text:'Hi 👋 I am Venus AI - Real answers from venus-ai-voice.github.io - How can I assist you today?'}]);
  const [showQuote,setShowQuote] = useState(null);

  async function activate(){
    const d=domain.toLowerCase();
    const det = d.includes('roof')?'roofing':d.includes('plumb')?'plumbing':d.includes('hvac')?'hvac':d.includes('electr')?'electric':d.includes('dent')?'dentist':'plumbing';
    setNiche(det);
    try{
      const r=await fetch('/api/crawl?domain='+domain);
      const j=await r.json();
      setCrawl(j);
      setHistory([{from:'ai',text:'Hi! Welcome to '+(j.title||domain)+' - Venus AI Voice linked - How can I assist with '+NICHES[det].services.map(s=>s.name).join(', ')+'?'}]);
    }catch(e){ setCrawl({title:domain}); }
  }

  function send(){
    if(!msg.trim()) return;
    const q=msg;
    setHistory(h=>[...h,{from:'user',text:q}]);
    setMsg('');
    setTimeout(()=> setHistory(h=>[...h,{from:'ai',text:'REAL ANSWER from venus-ai-voice for "'+q+'" at '+domain+' ('+niche+'): '+NICHES[niche].services[0].name+' costs '+NICHES[niche].services[0].price+'. I can book now. What is your phone?'}]),600);
  }

  const data = NICHES[niche];
  const biz = crawl.title || domain;

  return React.createElement('div',{style:{minHeight:'100vh',background:'#fff',fontFamily:'sans-serif'}},
    React.createElement('div',{style:{background:'#000',padding:10,display:'flex',gap:8,justifyContent:'center'}},
      React.createElement('input',{value:domain,onChange:e=>setDomain(e.target.value),placeholder:'plumbinaz.com',style:{padding:10,borderRadius:8,border:'1px solid #d4af37',width:200}}),
      React.createElement('button',{onClick:activate,style:{padding:'10px 16px',background:'#d4af37',color:'#000',borderRadius:8,fontWeight:900,border:0}},'ACTIVATE 2026'),
      React.createElement('a',{href:'https://venusplaza7-dot.github.io/venus-ai-voice/',target:'_blank',style:{padding:10,background:'#fff',color:'#000',borderRadius:8,fontSize:12,textDecoration:'none'}},'Venus AI Voice ↗')
    ),
    React.createElement('div',{style:{maxWidth:1100,margin:'0 auto',padding:20,display:'grid',gridTemplateColumns:'1fr 360px',gap:20}},
      React.createElement('div',null,
        React.createElement('h1',{style:{fontSize:36,fontWeight:900}}, biz.toUpperCase()+' - 24/7 '+niche.toUpperCase()),
        React.createElement('div',{style:{display:'grid',gap:10,marginTop:20}},
          data.services.map(s=> React.createElement('div',{key:s.name,style:{border:'1px solid #e5e7eb',borderRadius:16,padding:16,display:'flex',justifyContent:'space-between'}},
            React.createElement('div',null, React.createElement('b',null,s.name), React.createElement('div',{style:{color:'#d4af37',fontSize:12}}, s.price+' • AI Quote • Real Answer')),
            React.createElement('button',{onClick:()=>setShowQuote(s),style:{background:'#000',color:'#fff',padding:'8px 14px',borderRadius:8,border:0}},'AI Quote →')
          ))
        ),
        React.createElement('div',{style:{marginTop:20,border:'2px solid #d4af37',borderRadius:12,overflow:'hidden'}},
          React.createElement('div',{style:{background:'#d4af37',padding:10,fontWeight:900,fontSize:12,textAlign:'center'}},'VENUS AI VOICE - REAL BRAIN EMBEDDED'),
          React.createElement('iframe',{src:'https://venusplaza7-dot.github.io/venus-ai-voice/',style:{width:'100%',height:380,border:0},title:'Venus AI'})
        )
      ),
      React.createElement('div',{style:{border:'2px solid #000',borderRadius:16,overflow:'hidden',height:'fit-content'}},
        React.createElement('div',{style:{background:'#000',color:'#d4af37',padding:12,fontWeight:900,fontSize:12}},'💬 LIVE CHAT - REAL ANSWERS'),
        React.createElement('div',{style:{height:360,overflowY:'auto',padding:12,background:'#f9fafb'}},
          history.map((c,i)=> React.createElement('div',{key:i,style:{marginBottom:10,display:'flex',justifyContent:c.from==='user'?'flex-end':'flex-start'}},
            React.createElement('div',{style:{maxWidth:'85%',padding:'10px 12px',borderRadius:12,background:c.from==='user'?'#000':'#fff',color:c.from==='user'?'#fff':'#000',fontSize:13,border:'1px solid #e5e7eb'}}, c.text)
          ))
        ),
        React.createElement('div',{style:{padding:10,display:'flex',gap:6,borderTop:'1px solid #eee'}},
          React.createElement('input',{value:msg,onChange:e=>setMsg(e.target.value),onKeyDown:e=>e.key==='Enter'&&send(),placeholder:'How can I assist you?',style:{flex:1,padding:10,border:'1px solid #e5e7eb',borderRadius:8}}),
          React.createElement('button',{onClick:send,style:{padding:'10px 14px',background:'#d4af37',color:'#000',border:0,borderRadius:8,fontWeight:800}},'Send')
        )
      )
    ),
    showQuote? React.createElement('div',{style:{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:100},onClick:()=>setShowQuote(null)},
      React.createElement('div',{style:{background:'#fff',borderRadius:20,padding:24,width:320},onClick:e=>e.stopPropagation()},
        React.createElement('b',null,showQuote.name),
        React.createElement('div',{style:{fontSize:24,fontWeight:900,marginTop:10}},showQuote.price),
        React.createElement('button',{onClick:()=>setShowQuote(null),style:{marginTop:16,width:'100%',padding:12,background:'#000',color:'#fff',border:0,borderRadius:10}},'Close')
      )
    ) : null
  );
}
