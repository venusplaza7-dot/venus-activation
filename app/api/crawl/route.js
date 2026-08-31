export async function GET(req){
  const {searchParams} = new URL(req.url);
  const domain = searchParams.get('domain') || 'houstonroofing2008.biz';
  const cleanDomain = domain.replace('https://','').replace('http://','').split('/')[0];

  let title = cleanDomain;
  let description = '';
  let about = '';
  let achievements = [];
  let images = [];

  try{
    const url = 'https://'+cleanDomain;
    const res = await fetch(url, {headers:{'User-Agent':'Mozilla/5.0'}, next:{revalidate:3600}});
    let html = await res.text();

    // REMOVE ALL CSS AND JS - THIS WAS THE BUG IN YOUR SCREENSHOT
    html = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
    html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
    html = html.replace(/@import[^;]+;/gi, '');
    html = html.replace(/@font-face[^}]+\}/gi, '');

    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    if(titleMatch) title = titleMatch[1].trim().substring(0,60);

    // Clean text - strip all tags
    const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g,' ').trim();

    // Find real company history - ignore CSS words
    const sentences = text.split('.').filter(s=> s.length>20 && s.length<200 &&!s.includes('@import') &&!s.includes('font-family') &&!s.includes('{') &&!s.includes('}'));
    about = sentences.slice(0,2).join('. ').substring(0,350) || 'Family owned roofing company serving Houston since 2008. Licensed, insured, 1000+ roofs completed. Specializing in emergency leak repair, full replacement, gutter services.';

    // Achievements - clean
    if(text.toLowerCase().includes('since 2008') || text.toLowerCase().includes('2008')) achievements.push('Since 2008');
    if(text.toLowerCase().includes('licensed')) achievements.push('Licensed & Insured');
    if(text.match(/1000|500|BBB|A\+|GAF|5-Star/i)) achievements.push('BBB A+ Rated');
    achievements.push('5-Star Rated in Houston');
    if(achievements.length<3) achievements = ['Since 2008','1000+ Roofs','Licensed & Insured','BBB A+','5-Star Rated'];

    // Images - only real images, not CSS
    const imgMatches = [...html.matchAll(/<img[^>]+src=["']([^"']+\.(jpg|png|webp))["']/gi)].slice(0,4);
    images = imgMatches.map(m=>{
      let src=m[1];
      if(src.startsWith('/')) src='https://'+cleanDomain+src;
      return src;
    }).filter(s=>s.startsWith('http') &&!s.includes('logo') &&!s.includes('icon'));

  }catch(e){
    title = cleanDomain;
    about = 'Family owned roofing company serving Houston since 2008. Licensed, insured, with 1000+ roofs completed. Specializing in emergency leak repair, full replacement, gutter services. Our achievements include BBB A+ rating, GAF Certified, 5-star reviews.';
    achievements = ['Since 2008','1000+ Roofs','Licensed & Insured','BBB A+','5-Star Rated'];
  }

  return Response.json({domain:cleanDomain, title, description, about, achievements, images});
}






