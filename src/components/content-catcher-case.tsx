import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowDown, ArrowUpRight } from 'lucide-react';
import { getCase } from '@/lib/content';
import { CaseToc, Screenshot } from './interactive';
import { CaseFacts } from './case-facts';
import { LocalBookDownload } from './local-book-download';
import './content-catcher-case.css';

const repo='https://github.com/zczxd1118/content-catcher';
const revision=`${repo}/blob/3705eddc07c068d93e0754ab83dfb3b2b9c9d1fb`;
const caption='EPUB 实际页面 · 2026-10-16';
function SourceLink({href,children}:{href:string;children:React.ReactNode}){return <a className="text-link" href={href} target="_blank" rel="noopener noreferrer">{children}<ArrowUpRight size={15}/><span className="sr-only">（新窗口打开）</span></a>}

function ContentWorkflow(){
 const stages=[['内容来源','输入','视频、播客链接或频道','input'],['文本获取','程序处理','字幕、RSS 或条件式转写','program'],['长文本分段','程序处理','保留相邻段落的上下文','program'],['Prompt 任务包','程序处理','任务模板与分段资料','program'],['外部 AI 辅助编辑','AI 编辑协作','深度编写、主题合并与润色','editor'],['完整 Markdown 书稿','阅读成稿','经过编辑的九章正文','artifact'],['EPUB 导出','程序处理','封装章节、导航与样式','program']];
 return <div className="cc-workflow" aria-label="Content Catcher 内容处理与外部 AI 编辑工作流"><div className="cc-workflow-key"><span>程序：获取、组织、导出</span><span><i/>外部 AI：内容编辑</span></div><ol>{stages.map(([title,owner,description,kind],i)=><li key={title} data-owner={kind}><span className="cc-step-index">{String(i+1).padStart(2,'0')}</span><h3>{title}</h3><span className="cc-step-owner">{owner}</span><p>{description}</p>{i<stages.length-1&&<ArrowRight className="cc-step-arrow" size={14} aria-hidden="true"/>}</li>)}</ol></div>;
}

function BookDeliverable(){return <div className="cc-deliverable">
 <header className="cc-book-heading"><span className="eyebrow">DEEP BOOK / 2026.10.16</span><h3>让机器人把工作做完</h3><p>从 Dyna-2 访谈理解物理 AI 的模型、工作流与交付</p><p className="cc-book-contents">九个主体章节，另含导言、延伸思考、概念索引与来源附录。<br/>EPUB 提供 14 个导航章节，便于按主题阅读与回顾。</p><LocalBookDownload/></header>
 <div className="cc-book-front"><div><p className="cc-figure-label">A / 真实文字封面</p><Screenshot src="/images/content-catcher/deep-book-cover.webp" alt="让机器人把工作做完：实际 EPUB 文字封面与来源、编译和日期信息" caption={`${caption} · 文字封面`}/></div><div id="book-toc"><p className="cc-figure-label">B / 完整目录</p><Screenshot src="/images/content-catcher/deep-book-toc.webp" alt="实际 EPUB 目录，包含九个主体章节及封面、导言、延伸思考、概念索引和来源附录" caption={`${caption} · 14 个章节入口`}/></div></div>
 <div className="cc-book-reading" id="book-reading"><div className="cc-reading-intro"><span className="cc-figure-label">C / 读一页，感受内容密度</span><h4>从预测世界，解释到实际行动。</h4><p>第一章保留了输入、动作输出、扩散与流匹配之间的关系；技术解释与编辑说明分别标注，避免只剩术语和结论。</p></div><Screenshot src="/images/content-catcher/deep-book-reading.webp" alt="Deep Book 第一章真实正文：模型输入输出、未来预测、扩散与流匹配及编辑说明" caption={`${caption} · 第一章；点击放大阅读`}/></div>
 <div className="cc-book-reasoning"><div><span className="cc-figure-label">D / 不只给出结论，也保留理由</span><h4>为什么选择轮子，<br/>而不是先造一双腿？</h4><p>第五章串起能耗与稳定性、腰部自由度、人类数据迁移及供应链约束，把方案选择放回实际工作条件。</p><p>章节按核心问题、论据与取舍展开，并区分访谈观点和编辑分析。</p></div><Screenshot src="/images/content-catcher/deep-book-decision.webp" alt="Deep Book 第五章真实正文：轮式半人形、身体自由度、自研边界及供应链的产品取舍" caption={`${caption} · 第五章；点击放大阅读`}/></div>
 </div>}

const headlines=[
 '让长内容从信息流，变成可利用的知识。',
 '时间有限，理解不能只剩摘要。',
 '为需要高效理解长内容的人设计。',
 '不是另一个摘要工具，而是内容处理工作流。',
 '让不同来源，服务于不同的阅读任务。',
 '把复杂内容处理拆解为可组织的 AI 任务。',
 'Taste × Decision｜好的产品，需要品味，也需要判断。',
 '从内容处理工具，到可阅读的真实成品。',
 '从长篇访谈，到完整的阅读交付。',
 '从内容处理，走向知识消费。',
];

function EditorialColumns({items}:{items:{label:string;title:string;text:string}[]}){
 return <div className="cc-editorial-columns">{items.map(item=><div key={item.label}><span className="eyebrow">{item.label}</span><h3>{item.title}</h3><p>{item.text}</p></div>)}</div>;
}

function SourceCapabilities(){
 const rows=[
  ['YouTube','视频链接接入字幕获取与内容整理。','字幕优先；缺少字幕时，按音频条件与时长配置尝试本地转写。'],
  ['Bilibili','获取视频中的可用字幕，组织后续笔记任务。','支持浏览器或文件 Cookies 登录配置；无字幕时按条件尝试转写。'],
  ['播客主站 / RSS','识别播客主站并尝试 RSS 文本；订阅配置可接入通用 RSS。','按实际取得的全文或节目简介组织阅读任务。'],
  ['Apple Podcasts / 小宇宙 / Spotify','节目链接接入字幕、音频与元信息处理路径。','获取方式取决于平台访问权限，以及字幕和音频的可用性。'],
  ['小红书','整理公开笔记的标题、正文与话题。','使用可访问的笔记文本，服务信息提炼与创作素材任务。'],
 ];
 return <div className="cc-sources">{rows.map(([name,input,condition])=><div className="cc-source-row" key={name}><h4>{name}</h4><div><p>{input}</p><p className="cc-source-condition">{condition}</p></div></div>)}</div>;
}

function TemplateCapabilities(){
 const groups=[
  {label:'01 / UNDERSTAND',title:'快速理解',text:'一句话总结、核心议题、章节大纲、金句、关键概念与行动建议。',files:[['chinese_notes.md','中文笔记']]},
  {label:'02 / LANGUAGE',title:'语言与表达',text:'中英双语笔记、术语解释与引文翻译；社交平台笔记、创作切入点与话题建议。',files:[['english_bilingual.md','双语笔记'],['xiaohongshu_note.md','创作素材']]},
  {label:'03 / ORGANIZE',title:'深度整理',text:'Deep Book 长文、完整逐字稿与导读、多来源专题整合、跨平台观点比较，以及章节组织与润色。',files:[['deep_book.md','Deep Book'],['full_transcript.md','完整稿'],['topic_collection.md','专题合集'],['cross_platform_compare.md','观点比较'],['chapter_polished.md','章节润色']]},
  {label:'04 / KEEP READING',title:'持续阅读',text:'周报模板组织内容重点推荐与跨频道观察；整理后的 Markdown 便于保存，并可经导出器封装为 EPUB。',files:[['weekly_digest.md','订阅周报']]},
 ];
 return <div className="cc-template-catalog">{groups.map(group=><div key={group.label}><span className="eyebrow">{group.label}</span><h4>{group.title}</h4><p>{group.text}</p><div className="cc-template-links">{group.files.map(([file,label])=><SourceLink key={file} href={`${revision}/templates/${file}`}>{label}</SourceLink>)}</div></div>)}</div>;
}

function Experience(){return <>
 <SourceCapabilities/>
 <div className="prose cc-experience-copy"><p>支持单链接、批量链接文件与订阅配置三种输入方式。</p><h3>同一份内容，可以服务于不同任务。</h3><p>九份 Prompt／编辑模板按阅读目标分为四组，分别约束内容重点、信息结构与表达方式。</p></div>
 <TemplateCapabilities/>
 <p className="cc-scope">模板覆盖单条整理、批量专题与订阅周报；章节润色用于成稿编辑。用户按目标选择任务，再与 AI 协作整理内容。</p>
 <h3 className="cc-module-heading">从输入，到阅读与保存。</h3>
 <ol className="cc-user-flow" aria-label="内容处理用户流程">{['提供内容来源','获取可用文本','选择处理任务','生成 Prompt 任务包','外部 AI / 人工整理','阅读、保存或导出'].map((step,i)=><li key={step}><span>{String(i+1).padStart(2,'0')}</span>{step}{i<5&&<ArrowRight size={14} aria-hidden="true"/>}</li>)}</ol>
 </>}

function Decisions(){
 const items=[
  {title:'多来源获取',problem:'有价值的内容分散在不同平台。',choice:'从 YouTube 扩展到多平台入口。',reason:'让不同来源复用共同的内容整理流程。',impact:'拓展内容覆盖，同时承担更多平台适配与来源维护工作。'},
  {title:'任务驱动的模板',problem:'快速了解和深入研究需要不同的信息结构。',choice:'按任务选用模板，并组织长文本分段。',reason:'让模型围绕明确目标提炼、翻译或重组内容。',impact:'保留不同阅读深度，同时需要平衡分段整合、编辑投入与处理成本。'},
  {title:'多种阅读交付',problem:'长内容需要继续编辑、连续阅读与长期保存。',choice:'保留 Markdown，并提供 EPUB 导出。',reason:'让交付格式对应内容的后续使用方式。',impact:'读者可以带走完整读物，内容结构与排版也成为交付质量的一部分。'},
 ];
 return <div className="cc-decisions">{items.map((item,i)=><div key={item.title}><div className="cc-decision-title"><span className="eyebrow">DECISION {String(i+1).padStart(2,'0')}</span><h3>{item.title}</h3></div><dl>{[['问题',item.problem],['选择',item.choice],['原因',item.reason],['影响',item.impact]].map(([label,text])=><div key={label}><dt>{label}</dt><dd>{text}</dd></div>)}</dl></div>)}</div>;
}

export function ContentCatcherCase(){
 const sections=getCase('content-catcher');
 return <main className="cc-case" id="main-content"><div className="case-header catcher" id="top">
 <div className="container"><Link href="/projects/" className="back-link"><ArrowLeft size={15}/>全部项目</Link><p className="eyebrow">CASE 02 / 长内容处理与 AI 工作流设计</p><h1 id="cc-title"><span className="case-name">Content Catcher</span><span>把长内容，</span><span>整理成值得阅读的知识。</span></h1><p className="case-lead">面向视频、播客与长内容的信息处理工具，通过多来源内容获取、长文本分段和 Prompt 模板，将原始资料组织为结构化笔记、专题材料和适合深度阅读的内容。</p><div className="case-header-links"><SourceLink href={repo}>项目源码</SourceLink><a href="#section-8" className="text-link">阅读交付<ArrowDown size={15}/></a></div><CaseFacts role="独立产品策划 · 产品设计 · Vibe Coding" decision="多来源内容获取、Prompt 模板化与灵活的 AI 协作流程。" delivery="内容处理工具 · Prompt 模板库 · Deep Book EPUB"/></div></div>
 <div className="container case-body"><CaseToc tracking="reading-position" sections={sections.map(({id,title,number})=>({id,title,number}))}/><article className="case-article" aria-label="Content Catcher 产品案例">{sections.map(s=><section className={`case-section cc-section-${s.number}`} id={s.id} key={s.id} aria-labelledby={`cc-heading-${s.number}`}><p className="eyebrow">{String(s.number).padStart(2,'0')} / {s.english}</p><h2 id={`cc-heading-${s.number}`}>{headlines[s.number-1]}</h2><div className="prose" dangerouslySetInnerHTML={{__html:s.html}}/>
 {s.number===1&&<EditorialColumns items={[{label:'01 / ACQUISITION',title:'内容获取',text:'获取不同平台的可用字幕、RSS 或笔记文本，建立输入基础。'},{label:'02 / PROCESSING',title:'AI 内容处理',text:'通过模板与分段组织任务，再与外部 AI 协作完成整理。'},{label:'03 / DELIVERY',title:'阅读交付',text:'以 Markdown 保存成稿，并将完成的章节导出为 EPUB。'}]}/>}
 {s.number===3&&<EditorialColumns items={[{label:'01 / OVERVIEW',title:'快速了解内容',text:'先读核心观点与结构，再决定是否完整观看或深入阅读。'},{label:'02 / LEARNING',title:'跨语言学习',text:'通过双语笔记、术语解释和引文翻译理解英文技术讨论。'},{label:'03 / DEEP READING',title:'深度知识整理',text:'保留论据、案例与上下文，形成适合连续阅读和保存的材料。'}]}/>}
 {s.number===5&&<Experience/>}{s.number===6&&<><ContentWorkflow/><div className="cc-template-links"><SourceLink href={`${revision}/SKILL.md`}>原有 Skill 协作方式</SourceLink></div></>}{s.number===7&&<Decisions/>}{s.number===8&&<BookDeliverable/>}{s.number===9&&<div className="cc-template-links"><SourceLink href="https://www.latent.space/p/dyna">Dyna-2 原始节目</SourceLink><SourceLink href={`${revision}/templates/deep_book.md`}>Deep Book 模板</SourceLink><SourceLink href={`${revision}/templates/chapter_polished.md`}>章节润色模板</SourceLink></div>}
 </section>)}</article></div>
 <div className="container next-case"><div><span className="eyebrow">NEXT CASE / 03</span><h2>Tarot Divination</h2><p>如何参与一次生成体验？</p></div><Link href="/projects/tarot/" className="button secondary">继续阅读<ArrowRight size={17}/></Link></div></main>;
}
