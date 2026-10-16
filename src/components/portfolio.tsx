import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { projects, capabilities, site } from '@/lib/site';
import { Screenshot, ShotTabs } from './interactive';
import './selected-work-rows.css';

export function ExternalLink({href,children,className='text-link'}:{href:string;children:React.ReactNode;className?:string}){
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}<ArrowUpRight size={16}/><span className="sr-only">（新窗口打开）</span></a>;
}

export function Footer(){return <footer className="site-footer"><div className="container footer-inner"><div><Link href="/" className="footer-name">周小丁<span className="brand-dot"/></Link><p>以真实问题为起点，以产品判断为线索。</p></div><div className="footer-right"><p>Taste shapes the experience.<br/>Decisions shape the product.</p><span>AI PRODUCT MANAGER PORTFOLIO · 2026</span></div></div></footer>}

export function SectionHeading({number,label,title,children}:{number:string;label:string;title:string;children?:React.ReactNode}){return <div className="section-heading"><div><p className="eyebrow">{number} / {label}</p><h2>{title}</h2></div>{children}</div>}

export function ProjectCard({project,featured=false,parallel=false}:{project:typeof projects[number];featured?:boolean;parallel?:boolean}){
  return <article className={`project-card ${featured?'featured':''} ${project.color}`}>
    <div className="project-visual"><Screenshot src={project.image} alt={project.imageAlt} caption={project.caption} className="card-shot"/><span className="visual-tag">{project.slug==='content-catcher'?'真实 EPUB 产物':'真实产品界面'}</span></div>
    <div className="project-info"><p className="eyebrow">{project.index} / {parallel?'PROJECT':featured?'FEATURED CASE':project.slug==='tarot'?'INTERACTION CASE':'CORE CASE'}</p><h3><Link href={`/projects/${project.slug}/`}>{project.name}</Link></h3><p className="project-subtitle">{project.short}</p><p className="project-description">{project.description}</p>
      <div className="tags">{project.tags.map(t=><span key={t}>{t}</span>)}</div>
      <dl className="project-facts"><div><dt>核心问题</dt><dd>{project.problem}</dd></div><div><dt>AI 能力</dt><dd>{project.ai}</dd></div><div><dt>我的职责</dt><dd>独立规划、设计与 Vibe Coding</dd></div></dl>
      <Link className="case-link" href={`/projects/${project.slug}/`}>阅读案例 <ArrowRight size={17}/></Link>
    </div>
  </article>;
}

export function SelectedWork({all=false}:{all?:boolean}){return <section id="selected-work" className={`container section selected-work ${all?'all-work':'home-parallel'}`}>
  {!all&&<SectionHeading number="01" label="SELECTED WORK" title="判断，体现在具体的产品里。"><Link href="/projects/" className="text-link">全部项目 <ArrowUpRight size={17}/></Link></SectionHeading>}
  {all?<><ProjectCard project={projects[0]} featured/><div className="secondary-projects">{projects.slice(1).map(p=><ProjectCard key={p.slug} project={p}/>)}</div></>:<div className="home-project-rows">{projects.map(p=><ProjectCard key={p.slug} project={p} parallel/>)}</div>}
</section>}

export function Philosophy({about=false}:{about?:boolean}){return <section id="philosophy" className={`philosophy ${about?'about-philosophy':''}`}><div className="container">
  <p className="eyebrow">{about?'MY PRODUCT PHILOSOPHY':'02 / PRODUCT PHILOSOPHY'}</p>
  <div className="philosophy-intro"><h2>Taste <span>×</span><br className="mobile-break"/> Decision<span className="blue-period">.</span></h2><div><p className="philosophy-quote">Taste shapes the experience.<br/>Decisions shape the product.</p><p className="muted">品味决定体验的质感，决策决定产品的方向。</p></div></div>
  <p className="philosophy-about-text">我认为，AI 降低了产品实现的门槛，但没有替代对好产品的判断。技术让更多想法成为可能，而真正重要的是：知道什么值得做、什么值得保留，以及如何让产品变得简单、清晰、有价值。</p>
  <div className="philosophy-columns"><div><span className="small-index">01 — TASTE</span><h3>知道什么是好的体验。</h3><p>品味不只是视觉审美，更是对交互细节、信息组织和使用感受的判断。我希望产品不仅能完成任务，也能让人愿意使用。</p></div><div><span className="small-index">02 — DECISION</span><h3>知道什么值得做。</h3><p>产品不可能满足所有需求。决策意味着识别真正重要的问题，选择值得投入的方向，并在不同方案之间做出有意识的取舍。</p></div></div>
</div></section>}

export function Capabilities(){return <section className="container section capabilities"><SectionHeading number="03" label="CORE CAPABILITIES" title="把想法，推进到可检查的结果。"/><div className="capability-grid">{capabilities.map(([n,en,title,text,slug])=><Link className="capability" href={`/projects/${slug}/`} key={n}><span className="small-index">{n} / {en}</span><h3>{title}<ArrowUpRight size={16}/></h3><p>{text}</p></Link>)}</div></section>}

export function Contact(){return <section className="container contact" id="contact"><div><p className="eyebrow">LET’S BUILD SOMETHING THOUGHTFUL</p><h2>期待把这些判断，<br/>带进真实的产品团队。</h2><p>正在寻找 AI 产品经理实习机会。<br/>关注 AI 内容工具、语音体验与生成式应用。</p></div><div className="contact-actions"><ExternalLink className="button primary" href={site.github}>查看 GitHub</ExternalLink>{site.email&&<a className="button secondary" href={`mailto:${site.email}`}>通过邮箱联系我</a>}<Link href="/resume/" className="text-link">了解我的经历 <ArrowRight size={16}/></Link></div></section>}

const flowData = {
  curio:[['01','领域与信源','表达关注目标'],['02','获取与预筛','候选去重、控制范围'],['03','LLM 编辑判断','统一选稿与解释'],['04','结构化结果','来源、事实与判断'],['05','按领域交付','网页与邮件']],
  'content-catcher':[['01','内容来源','链接或订阅频道'],['02','获取与转写','字幕 / RSS / 适用音频'],['03','Prompt 任务','模板、分段与合并包'],['04','AI 辅助编辑','写作与人工检查'],['05','阅读交付','速读稿与 EPUB']],
  tarot:[['01','问题与牌面','牌阵、位置、正逆位'],['02','主题与视角','规则识别'],['03','两条解读路线','本地规则 / 可选 LLM'],['04','结构化解读','问题、牌义、建议'],['05','体验与恢复','文风、回看与回退']],
};
export function Workflow({slug}:{slug:keyof typeof flowData}){return <div className="workflow"><div className="workflow-heading"><span className="eyebrow">THE AI WORKFLOW</span><span className="flow-legend"><i/>LLM 参与的步骤</span></div>
  <ol className="flow-steps">{flowData[slug].map(([n,title,description],i)=><li key={n} className={(slug==='content-catcher'?i===3:i===2)?'ai-step':''}><span>{n}</span><h3>{title}</h3><p>{description}</p>{i<4&&<ArrowRight className="flow-arrow" size={15} aria-hidden="true"/>}</li>)}</ol>
  <p className="flow-note">{slug==='curio'?'共享偏好与反馈参与选稿，程序组织流程，LLM 承担编辑判断。':slug==='content-catcher'?'按来源条件获取文本，以模板组织 AI 编辑任务，再交付阅读成稿。':'本地牌义与可选模型解读承接不同使用条件，失败时回退到本地解读。'}</p>
</div>}

export function Decision({project}:{project:typeof projects[number]}){return <div className="decision-module"><p className="eyebrow">A DECISION THAT SHAPED THE PRODUCT</p><h3>{project.decision}</h3><div className="decision-grid"><div><span>CONTEXT / 情境</span><p>{project.decisionContext}</p></div><div><span>{project.slug==='content-catcher'?'OUTPUT RULE / 交付顺序':'OPTIONS / 方案选择'}</span><p>{project.decisionOptions.join(project.slug==='content-catcher'?' → ':' / ')}</p></div><div className="decision-chosen"><span>DECISION / 采用的选择</span><p>{project.decisionChoice}</p></div><div><span>TRADE-OFF / 产品取舍</span><p>{project.tradeoff}</p></div></div><div className="decision-source"><ExternalLink href={project.evidence}>{project.evidenceLabel}</ExternalLink><p>{project.decisionNote}</p></div></div>}

export function CaseEvidence({slug,section}:{slug:string;section:number}){
  if(slug==='curio'&&section===5)return <Screenshot src="/images/curio/subscription.webp" alt="Curio 订阅弹窗，可选择多个领域以及日报或周刊" caption="领域订阅 · 日报与周刊频率选择"/>;
  if(slug==='curio'&&section===9)return <div className="evidence-module"><p className="eyebrow">FROM CURATION TO DELIVERY</p><h3>从精选，到真正收到的邮件。</h3><p>网页支持按主题浏览和回看，邮件把所选领域的简报送到收件箱。</p><div className="mini-flow"><span>内容筛选</span><ArrowRight size={14}/><span>网页阅读</span><ArrowRight size={14}/><span>邮件交付</span></div><ShotTabs label="Curio交付证据" shots={[{label:'网页阅读',src:'/images/curio/archives.webp',alt:'Curio 历史期刊列表，主要领域内容日期为2026年8月28日',caption:'Curio v0.9 · 历史简报 2026-08-28'},{label:'邮件交付',src:'/images/curio/mail-list.webp',alt:'QQ邮箱中的Curio简报列表，可见8月多个日期的收件记录',caption:'Curio · 2026 年 8 月历史订阅邮件'} ]}/></div>;
  if(slug==='tarot'&&section===5)return <ShotTabs label="抽牌方式" shots={[{label:'网格选牌',src:'/images/tarot/grid.webp',alt:'Tarot网格手动选牌，三张牌槽位与卡背阵列',caption:'网格选牌 · 三张牌阵'},{label:'轮盘抽牌',src:'/images/tarot/wheel.webp',alt:'Tarot弧形轮盘选牌，中央高亮与选定按钮',caption:'轮盘抽牌 · 横向拖动与中央选取'} ]}/>;
  if(slug==='tarot'&&section===9)return <div className="evidence-module"><p className="eyebrow">FROM CHOICE TO INTERPRETATION</p><h3>把选择、揭示和结果连起来。</h3><ShotTabs label="解读体验" shots={[{label:'牌面与文风',src:'/images/tarot/result.webp',alt:'Tarot三张牌结果，正逆位和五种解读风格选择',caption:'结果界面 · 正逆位与五种文风'},{label:'建议与边界',src:'/images/tarot/reflection.webp',alt:'Tarot结果末段及仅供娱乐与参考提示，保留再次抽牌和返回首页',caption:'解读末页 · 行动建议、自我反思与娱乐提示'} ]}/></div>;
  return null;
}

