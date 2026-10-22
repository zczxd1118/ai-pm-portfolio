import { ArrowRight, ArrowDown, ArrowUpRight } from 'lucide-react';
import { Screenshot, ShotTabs } from './interactive';
import './curio-case-sections.css';

const repo='https://github.com/zczxd1118/curio-app';
const version=`${repo}/blob/6cc4e080658133db8ade788b12ae2bddfc90e7c4`;
const mailDate='真实日报 · 2026-08-28';
function Reference({path,children}:{path:string;children:React.ReactNode}){
 const base=path==='prompts/unified_radar.md'?`${repo}/blob/main`:version;
 return <a className="text-link" href={`${base}/${path}`} target="_blank" rel="noopener noreferrer">{children}<ArrowUpRight size={14}/></a>
}
function ModuleTitle({label,title,children}:{label:string;title:string;children?:React.ReactNode}){return <header className="curio-module-title"><span className="eyebrow">{label}</span><h3>{title}</h3>{children&&<p>{children}</p>}</header>}

function ReaderExperience(){
 const steps=[['发现与浏览','先看精选，了解内容与阅读结构。'],['选择领域','可多选，组合自己的关注范围。'],['设置频率','选择日报或周刊。'],['确认邮箱','首次订阅通过邮件确认。'],['接收与判断','先读摘要、信息分层和点评。'],['深入与回看','打开原文，或返回历史简报。'],['管理订阅','重新提交偏好更新，或从邮件退订。']];
 const layers=[['兴趣领域','按主题组织内容，方便先读关注的部分。'],['星级与来源','提示阅读优先级，保留出处。'],['内容摘要','先理解主题，再判断是否继续。'],['已确认／尚属判断','把事实性陈述与分析判断分开呈现。'],['主编点评','补充阅读角度与值得关注的含义。'],['备选阅读','为不同注意力与阅读深度保留选择。'],['打开原文','继续深入阅读，形成自己的判断。'],['退订／访问网站','保留接收控制与返回网页的入口。']];
 return <div className="curio-section-module">
  <ol className="curio-journey" aria-label="Curio 阅读与订阅流程">{steps.map(([title,text],i)=><li key={title}><span className="eyebrow">{String(i+1).padStart(2,'0')}</span><h4>{title}</h4><p>{text}</p>{i<6&&<ArrowRight size={13} aria-hidden="true"/>}</li>)}</ol>
  <div className="curio-web-editions"><ModuleTitle label="WEB / LATEST EDITIONS" title="网页版 · 最新各期">Curio 将不同领域的简报按日期归档。读者可以浏览各领域最新一期，也可以回看已发布内容，安排自己的阅读节奏。</ModuleTitle><Screenshot src="/images/curio/latest-editions.png" alt="Curio 网页最新各期真实列表，包含 AI、半导体、大厂 AI 动态、股票、金融和电子信息与芯片，显示 2026-08-28 与 2026-06-01 内容日期" caption="Curio 真实网页截图 · 内容日期 2026-08-28 / 2026-06-01 · 截图时间未记录"/></div>
  <div className="curio-subscription" id="curio-subscription"><div><ModuleTitle label="INTEREST-BASED SUBSCRIPTION" title="让读者决定关注范围与接收节奏。"/><ul className="curio-feature-list"><li><strong>多领域选择</strong><span>在网站订阅弹窗选择一个或多个兴趣领域。</span></li><li><strong>日报或周刊</strong><span>按自己希望的阅读节奏接收内容。</span></li><li><strong>邮箱确认与更新</strong><span>首次确认邮箱；已有订阅再次提交可更新领域和频率。</span></li><li><strong>随时退出</strong><span>邮件底部提供退订入口，也可以返回网站继续浏览。</span></li></ul></div><Screenshot src="/images/curio/subscription.webp" alt="Curio 订阅弹窗，可选择多个领域以及日报或周刊" caption="真实订阅界面 · 多领域与频率选择"/></div>
  <div className="curio-preference-example"><div><span className="eyebrow">ONE READER / ONE CONFIGURATION</span><h4>AI、大厂 AI 动态、电子信息与芯片。</h4><p>这封日报组合了三个兴趣领域，以日报频率接收；其他读者可以选择自己的组合。</p></div><Screenshot src="/images/curio/mail-preferences.webp" alt="2026年8月28日真实邮件底部：AI、大厂AI动态、电子信息与芯片，日报频率，退订和访问Curio网站入口" caption={`${mailDate} · 订阅配置与退出入口`}/></div>
  <ModuleTitle label="THE READING EXPERIENCE" title="一封邮件，完成从发现到判断的阅读过程。">内容按领域展开，再以星级、摘要、信息分层、点评和备选形成阅读层次。原文入口让读者继续核对和深入了解。</ModuleTitle>
  <div className="curio-reading-layers">{layers.map(([name,value],i)=><div key={name}><span>{String(i+1).padStart(2,'0')}</span><h4>{name}</h4><p>{value}</p></div>)}</div>
  <Screenshot src="/images/curio/mail-layers.webp" alt="Curio 真实邮件精选文章：星级、来源、摘要与已确认及尚属判断两列" caption={`${mailDate} · AI 领域精选与信息分层`}/>
  <p className="curio-editorial-note">“已确认／尚属判断”是内容的表达结构：摘要帮助理解，点评提供角度，读者保留沿原文作出判断的空间。</p>
 </div>;
}

function AIProduction(){
 const compare=[['执行环境','本地 WorkBuddy 协作','云端 GitHub Actions'],['模型方式','Claude 执行生成的任务','可配置提供商与模型'],['运行依赖','本地环境在线、协作任务接续','API 配置、CI 权限及任务触发'],['适用场景','交互式协作、本地自动化','定时或手动的云端任务'],['配置入口','WorkBuddy 工作流与任务计划','维护者评分设置与 CI 配置']];
 const fields=[['domain','决定内容归属与领域拆分。'],['rank / stars','保留选择顺序与编辑优先级。'],['title / lead','形成标题与阅读摘要。'],['confirmed / judgment','组织事实性陈述与分析判断。'],['implication','生成主编点评。'],['source / url','保留来源和原文入口。']];
 return <div className="curio-section-module">
  <div className="workflow curio-production" id="curio-workflow" aria-label="Curio 从信息来源到网页与邮件的完整工作流">
   <div className="workflow-heading"><span className="eyebrow">FROM SOURCE TO READING</span><span className="flow-legend"><i/>模型参与选稿与编辑</span></div>
   <ol className="curio-preparation"><li><span className="eyebrow">01 / 多来源收集</span><h4>按领域取得候选。</h4><p>RSS 博客与官方资讯、Hacker News 搜索、B 站关键词与财经资讯接口，按配置进入候选池。</p><small>领域配置 → 候选信息 → 扩展发现范围</small></li><li><span className="eyebrow">02 / 程序预处理</span><h4>先控制输入，再交给模型。</h4><p>按内容 ID 与 URL 去重，结合热度和新鲜度预筛，每领域最多保留 50 条；输入包含标题、来源、时间与短摘要。</p><small>多源候选 → 统一任务 → 控制信息规模</small></li></ol>
   <div className="curio-shared-prompt"><ArrowDown size={16}/><span>统一 Prompt：共享画像、偏好、近期反馈、特别请求与候选池。</span></div>
   <ModuleTitle label="03 / TWO EXECUTION PATHS" title="同一套筛选目标，两种 AI 执行方式。"/>
   <div className="curio-execution"><div><span className="eyebrow">A / WORKBUDDY · CLAUDE</span><h4>本地协作执行。</h4><p>准备脚本写出任务计划与评分 Prompt，由 WorkBuddy 中的 Claude 接续选稿和编辑，写回统一 JSON。</p><p>支持按本地工作流触发或人工接续，适合参与式调整；执行环境需要保持可用。</p></div><div><span className="eyebrow">B / MODEL API · CI</span><h4>云端任务执行。</h4><p>GitHub Actions 在 API 模式下读取配置，调用模型处理同一份 Prompt，检查基础结构后保存统一 JSON。</p><p>提供商与模型可配置；无人值守依赖有效凭据、CI 权限、调度和外部服务可用。</p></div></div>
   <div className="curio-shared-result"><ArrowDown size={16}/><div><span className="eyebrow">04 / STRUCTURED EDITORIAL RESULT</span><h4>选稿与编辑，汇入同一份结果。</h4><p><code>headlines</code> 组织精选与星级，<code>shortlist</code> 保留备选；摘要、信息分层与点评随内容一起输出。程序沿结果顺序按领域组织展示。</p></div></div>
   <div className="curio-output-routes"><div><span className="eyebrow">WEB / 主动访问</span><h4>按领域拆分，生成阅读页面。</h4><p>统一结果 → 分领域 Markdown → 静态页面、历史期刊与来源入口。</p><small>让读者按主题浏览和回看。</small></div><div><span className="eyebrow">EMAIL / 主动交付</span><h4>按订阅组合，组织邮件。</h4><p>统一结果 → 分领域 HTML → 内容存储 → 按兴趣和频率组合 → 邮件服务发送。</p><small>让关注内容抵达收件箱。</small></div></div>
   <p className="curio-editorial-note">模型在一次统一任务中完成选择、评级与内容编辑。页面排版、邮件组装和发送由程序分别处理；不会把这些步骤笼统视为一次模型调用。</p>
  </div>
  <div className="curio-mode-table"><table><caption>执行方式与适用条件</caption><thead><tr><th>对比维度</th><th>WorkBuddy / Claude</th><th>模型 API / CI</th></tr></thead><tbody>{compare.map(row=><tr key={row[0]}>{row.map((cell,i)=>i===0?<th scope="row" key={i}>{cell}</th>:<td key={i}>{cell}</td>)}</tr>)}</tbody></table></div>
  <div className="curio-pause"><span className="eyebrow">PAUSE / 任务控制</span><p><strong>暂停是评分状态。</strong>CI 会跳过新的 API 评分，已发布内容继续可读；候选收集独立调度，本地 WorkBuddy automation 需要同步暂停。</p></div>
  <div className="curio-settings" id="curio-scoring-settings"><div><ModuleTitle label="CONFIGURABLE EXECUTION" title="让筛选能力适应运行环境。">评分设置由维护者配置，读者专注于自己的订阅选择。</ModuleTitle><p>可以选择本地、API 或暂停状态，并配置 DeepSeek、OpenAI、Kimi、智谱及对应模型。设置界面提供连接测试与保存。</p><p>模型配置保存在服务端，CI 经管理权限读取；本地协作则通过任务计划接续。两种方式共同使用结构化输出，便于保持后续排版和交付方式一致。</p><div className="curio-references"><Reference path="agent/score_with_llm.py">模型调用</Reference><Reference path=".github/workflows/score-and-finalize.yml">CI 执行流程</Reference></div></div><Screenshot src="/images/curio/scoring-settings.webp" alt="Curio 真实评分设置：本地Claude、API、暂停、提供商、模型、测试连接与保存，密钥字段已不可逆脱敏" caption="真实评分设置 · 维护者入口 · 密钥字段已脱敏"/></div>
  <ModuleTitle label="PROMPT & SELECTION" title="把内容判断标准写进 AI 工作流。">统一 Prompt 同时约束选稿规则与阅读表达，结构化结果让选择可以被后续程序继续使用。</ModuleTitle>
  <ol className="curio-prompt-flow">{[['评价标准','新颖度、信号价值、跨域覆盖、偏好与反馈。'],['Prompt 约束','同事件去重；每个候选领域至少进入头条或备选；目标 4–5 条头条、10–15 条备选。'],['结构化输出','头条与备选分组，保留领域、星级、引子、信息分层、点评和原文。'],['内容选择','读者先看精选与解释，再决定深入阅读哪些原文。']].map(([title,text])=><li key={title}><h4>{title}</h4><p>{text}</p></li>)}</ol>
  <div className="curio-stars"><span><b>★★★★★</b> 本周必看</span><span><b>★★★★</b> 值得关注</span><span><b>★★★</b> 可看可跳</span></div>
  <dl className="curio-result-fields">{fields.map(([field,value])=><div key={field}><dt>{field}</dt><dd>{value}</dd></div>)}</dl>
  <p className="curio-editorial-note">API 写入前检查 JSON、头条最低数量和必要字段；空响应、解析错误或缺字段会中止该次生成，避免无效结果进入后续排版。星级表示阅读优先级，事实与判断分栏则帮助读者理解不同信息层次。</p>
  <div className="curio-mail-assembly"><ModuleTitle label="AFTER THE MODEL" title="从编辑字段，到读者真正打开的一封信。"/><ol>{[['分领域组织','程序按 domain 生成各领域的文章 HTML，保留摘要、点评、信息分层与原文。'],['匹配订阅偏好','已确认订阅的邮箱、领域与频率保存在服务端；广播按频率筛选订阅，再读取所选领域。'],['排版与发送','模板组合正文、订阅说明、退订和网站入口，经邮件服务发送；按日期、频率与邮箱控制重复发送。']].map(([title,text])=><li key={title}><h4>{title}</h4><p>{text}</p></li>)}</ol><p>网页与邮件共享选稿数据，分别使用页面和邮件模板；按领域组合内容是当前邮件个性化的基础。</p></div>
  <div className="curio-references"><Reference path="prompts/unified_radar.md">统一评分与编辑 Prompt</Reference><Reference path="topics/unified.scored.json">结构化选稿结果</Reference><Reference path="agent/worker_sync.py">领域内容组织</Reference><Reference path="worker/src/index.js">订阅与发送</Reference></div>
 </div>;
}

function ProductDecisions(){
 const decisions=[['不是收集更多链接，而是帮助读者决定读什么。','信息过载也来自反复判断。通过预筛、星级、摘要与原文入口，把产品重心放在阅读选择。','控制候选规模，让输出更聚焦；同时需要关注预筛遗漏与跨域覆盖。'],['让 AI 工作流适应不同运行环境。','本地协作与云端 API 对应不同运行条件。统一 Prompt 与输出结构，使执行方式可以切换。','把模型配置与内容交付分开维护；同时需要管理凭据、调度与两条链路的运行条件。'],['让邮件本身具备完整的阅读价值。','邮件按兴趣领域展开，用摘要、事实与判断分层、点评和备选，支持读者完成第一轮选择。','邮件提供充分上下文，也增加阅读长度；用层次与原文入口保留快读和深读的空间。']];
 return <div className="curio-decisions">{decisions.map(([title,choice,tradeoff],i)=><div key={title}><span className="eyebrow">DECISION {String(i+1).padStart(2,'0')}</span><h3>{title}</h3><p>{choice}</p><p className="curio-decision-tradeoff"><strong>取舍</strong>{tradeoff}</p>{i===2&&<a className="text-link" href="#curio-email-preview">看真实邮件如何组织阅读<ArrowDown size={14}/></a>}</div>)}</div>;
}

function Delivery(){return <div className="curio-section-module">
 <div className="curio-delivery-summary">{[['WEB','网页阅读','领域精选、原文跳转、搜索与历史简报。','#top'],['AI WORKFLOW','评分与编辑','两条执行路径，共用 Prompt 和结构化结果。','#curio-workflow'],['EMAIL','按兴趣交付','多领域与频率组合，形成完整的邮件读物。','#curio-email-preview']].map(([label,title,text,href])=><a key={label} href={href}><span className="eyebrow">{label}</span><h4>{title}<ArrowUpRight size={15}/></h4><p>{text}</p></a>)}</div>
 <div id="curio-email-preview" className="curio-email-preview"><ModuleTitle label="A REAL DAILY EDITION / 2026.08.28" title="打开邮件，就能开始阅读。">主编点评解释阅读角度，备选保留更多选择，三个兴趣领域在同一封日报中分别展开。</ModuleTitle><ShotTabs label="Curio日报正文" shots={[{label:'日报开篇',src:'/images/curio/mail-overview.webp',alt:'Curio 2026年8月28日日报开篇，包含AI领域、精选文章、星级来源和信息分层',caption:`${mailDate} · 正文开篇`},{label:'点评与备选',src:'/images/curio/mail-editorial.webp',alt:'真实日报中的MCP主编点评、打开原文入口与备选阅读',caption:`${mailDate} · 主编点评、原文与备选`},{label:'芯片领域',src:'/images/curio/mail-chip.webp',alt:'真实日报中的电子信息与芯片领域，包含精选文章摘要、星级和事实判断分层',caption:`${mailDate} · 电子信息与芯片领域`} ]}/></div>
 <div className="curio-delivery-values"><div><h4>主动交付</h4><p>从每天重新搜索，转向按频率接收关注领域。</p></div><div><h4>结构化阅读</h4><p>用摘要、信息分层与点评组织阅读过程。</p></div><div><h4>阅读自主权</h4><p>保留原文、备选与退订选择。</p></div></div>
 </div>}

function Outcomes(){return <div className="curio-section-module"><ModuleTitle label="FROM CURATION TO DELIVERY" title="网页、日报与历史收件，共同呈现交付。"/><ShotTabs label="Curio交付证据" shots={[{label:'网页阅读',src:'/images/curio/archives.webp',alt:'Curio 历史期刊列表，主要领域内容日期为2026年8月28日',caption:'Curio v0.9 · 历史简报 2026-08-28'},{label:'邮件正文',src:'/images/curio/mail-overview.webp',alt:'Curio真实日报，按兴趣领域组织精选文章与信息分层',caption:`${mailDate} · 三领域日报样例`},{label:'邮件交付',src:'/images/curio/mail-list.webp',alt:'QQ邮箱中的Curio简报列表，可见8月多个日期的收件记录',caption:'Curio · 2026 年 8 月历史订阅邮件'} ]}/></div>}

export function CurioCaseSection({number}:{number:number}){
 if(number===5)return <ReaderExperience/>;
 if(number===6)return <AIProduction/>;
 if(number===7)return <ProductDecisions/>;
 if(number===8)return <Delivery/>;
 if(number===9)return <Outcomes/>;
 return null;
}
