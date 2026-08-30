export const facades = {
  plumbing: [
    {id:'aqua', name:'AQUA LUXE', color:'#0EA5E9'},
    {id:'steel', name:'STEEL FLOW', color:'#1F2937'},
    {id:'gold', name:'GOLD PIPE', color:'#D4AF37'},
  ],
  default: [
    {id:'nova', name:'NOVA', color:'#000'},
    {id:'luxe', name:'LUXE', color:'#D4AF37'},
  ]
}
export function getFacade(domain, niche){
  const list = facades[niche] || facades.default
  const hash = domain.split('').reduce((a,b)=>a+b.charCodeAt(0),0)
  return list[hash % list.length]
}
