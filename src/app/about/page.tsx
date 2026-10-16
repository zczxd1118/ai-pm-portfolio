import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Philosophy, Contact } from '@/components/portfolio';
import { pageMetadata } from '@/lib/site';

export const metadata=pageMetadata('关于我','周小丁，AI 产品经理实习候选人。产品策划经历与独立 AI 产品实践，关注 Taste、Decision-making 和真实交付。','/about/');
export default function About(){return <main id="main-content"><header className="container page-intro about-intro"><p className="eyebrow">ABOUT / 周小丁</p><h1>在想法与实现之间，<br/>练习产品判断。</h1><p>我正在申请 AI 产品经理实习。<br/>关注 AI 如何帮助人发现信息、理解长内容，以及参与生成式互动。</p></header>
  <section className="container about-story"><div><p className="eyebrow">MY PRACTICE</p><h2>问题来自生活，<br/>答案需要做出来。</h2></div><div className="about-prose"><p>每天查阅资讯费时，让我开始做 Curio；跟不上长视频和播客，让我做了 Content Catcher；对抽牌参与感与选择习惯的兴趣，让我尝试 Tarot Divination。</p><p>我独立进行产品规划和设计，并通过 Vibe Coding 完成实现。借助 AI 编程工具把方案推进到 MVP，也对问题定义、功能范围和交付质量负责。</p><p>产品策划实习让我参与需求与协作，个人项目则让我承担从问题到交付的完整过程。我希望把这些实践带入真实团队，在用户需求、AI 能力与产品体验之间持续作出判断。</p><Link className="text-link" href="/projects/">查看三个产品实践 <ArrowRight size={16}/></Link></div></section>
  <Philosophy about/>
  <section className="container section experience-section"><div><p className="eyebrow">BACKGROUND</p><h2>教育与相关经历</h2></div><div className="experience-list">{[
    ['2026.09—2027.11','香港大学','电气与电子工程硕士 · 在读','工程学习背景，持续关注 AI 应用。'],
    ['2026.03—2026.07','腾讯 · 搜狗输入法','产品经理（产品策划）实习','AI 人设、语音相关需求与产品方案，跨端体验及研发测试沟通。'],
    ['2025.04—2025.06','南京数睿数据','智能工程部实习','Prompt 测试、工作流调试与 API 联调。'],
    ['2022.09—2026.06','北京邮电大学','电子信息工程学士','电子信息工程背景。'],
  ].map(([date,title,role,text])=><article className="experience" key={title}><time>{date}</time><div><h3>{title}</h3><span>{role}</span><p>{text}</p></div></article>)}</div></section>
  <section className="container practice-strip"><span className="eyebrow">HOW I WORK</span><div><h3>先定义任务，再安排 AI。</h3><p>让模型承担明确的用户任务。</p></div><div><h3>把体验要求写清楚。</h3><p>把内容结构、交互与阅读纳入交付标准。</p></div><div><h3>从使用中寻找下一步。</h3><p>结合产品实践，判断下一阶段的优先级。</p></div></section><Contact/>
  </main>}
