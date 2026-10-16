import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { projects, pageMetadata } from '@/lib/site';
import { getCase } from '@/lib/content';
import { CaseToc, Screenshot } from '@/components/interactive';
import { CaseEvidence, Decision, ExternalLink, Workflow } from '@/components/portfolio';
import { ContentCatcherCase } from '@/components/content-catcher-case';
import { CaseFacts } from '@/components/case-facts';
import { CurioCaseSection } from '@/components/curio-case-sections';
import '@/components/case-product-links.css';

export const dynamicParams=false;
export function generateStaticParams(){return projects.map(p=>({slug:p.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;const p=projects.find(p=>p.slug===slug);
  return p?pageMetadata(p.name,p.description,`/projects/${p.slug}/`):{};
}
export default async function Case({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;const p=projects.find(p=>p.slug===slug);if(!p)notFound();
  if(slug==='content-catcher')return <ContentCatcherCase/>;
  const sections=getCase(p.slug);const next=projects[(projects.indexOf(p)+1)%projects.length];
  const cover=p.slug==='tarot'?{src:'/images/tarot/home.webp',alt:'Tarot 首页，手动与随机方式、单张三张五张牌阵以及提问入口'}:{src:p.image,alt:p.imageAlt};
  return <main id="main-content" className={p.slug==='curio'?'curio-case':undefined}><div className={`case-header ${p.color}`} id="top"><div className="container"><Link href="/projects/" className="back-link"><ArrowLeft size={15}/> 全部项目</Link><p className="eyebrow">CASE {p.index} / {p.category}</p><h1><span className="case-name">{p.name}</span>{p.title.split('\n').map(t=><span key={t}>{t}</span>)}</h1><p className="case-lead">{p.description}</p><div className="case-header-links case-product-links">{p.url&&<ExternalLink href={p.url} className="button primary">{p.slug==='tarot'?'体验 Tarot':'查看产品页面'}</ExternalLink>}<ExternalLink href={p.repo} className="button secondary">查看项目源码</ExternalLink></div><CaseFacts decision={p.decision} delivery={p.outcome}/><Screenshot src={cover.src} alt={cover.alt} caption={p.caption} priority className={`case-cover ${p.color}`}/></div></div>
    <div className="container case-body"><CaseToc tracking={p.slug==='curio'?'reading-position':'intersection'} sections={sections.map(({id,title,number})=>({id,title,number}))}/><article className="case-article">{sections.map(s=><section className="case-section" key={s.id} id={s.id}><p className="eyebrow">{String(s.number).padStart(2,'0')} / {s.english.toUpperCase()}</p><h2>{s.title}</h2>{p.slug!=='curio'&&s.number===6&&<Workflow slug={p.slug}/>} {p.slug!=='curio'&&s.number===7&&<Decision project={p}/>}<div className="prose" dangerouslySetInnerHTML={{__html:s.html}}/>{p.slug==='curio'?<CurioCaseSection number={s.number}/>:<CaseEvidence slug={p.slug} section={s.number}/>}</section>)}<div className="case-takeaway"><span className="eyebrow">TASTE × DECISION</span><h2>{p.takeaway}</h2><p>{p.taste}</p></div></article></div>
    <div className="container next-case"><div><span className="eyebrow">NEXT CASE / {next.index}</span><h2>{next.name}</h2><p>{next.short}</p></div><Link href={`/projects/${next.slug}/`} className="button secondary">继续阅读 <ArrowRight size={17}/></Link></div>
  </main>;
}
