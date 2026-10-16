import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { SelectedWork, Philosophy, Capabilities, Contact } from '@/components/portfolio';
import { pageMetadata, site } from '@/lib/site';

export const metadata=pageMetadata('AI 产品经理作品集',site.description,'/');
export default function Home(){return <main id="main-content"><section className="container hero"><div className="hero-topline"><span className="eyebrow"><i/> AI PRODUCT MANAGER PORTFOLIO</span><span className="hero-edition">INDEPENDENT WORK / 2026</span></div><h1>从真实问题出发，<br/>把 AI 能力做成<span className="hero-ending"><span className="hero-emphasis">值得使用</span>的产品。</span></h1><div className="hero-bottom"><div><p className="hero-description">我是周小丁，AI 产品经理实习候选人。<br className="desktop-break"/>关注产品品味、关键决策与 AI 原生体验，<br className="desktop-break"/>独立规划、设计并通过 Vibe Coding 实现了三个 AI 产品。</p><div className="hero-actions"><Link className="button primary" href="#selected-work">探索项目 <ArrowRight size={17}/></Link><Link className="button secondary" href="/about/">关于我 <ArrowUpRight size={16}/></Link></div></div><p className="hero-side-note"><span>THOUGHT → DECISION → PRODUCT</span>产品策划实习经历<br/>独立产品规划与落地</p></div></section><SelectedWork/><Philosophy/><Capabilities/><Contact/></main>}
