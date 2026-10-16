import { SelectedWork } from '@/components/portfolio';
import { pageMetadata } from '@/lib/site';

export const metadata=pageMetadata('精选项目','三个真实 AI 产品：信息策展、长内容工作流与生成式交互。独立产品规划、设计与 Vibe Coding 实现。','/projects/');
export default function Projects(){return <main id="main-content"><header className="container page-intro"><p className="eyebrow">SELECTED WORK / 01—03</p><h1>三种问题，<br/>三种产品判断。</h1><p>从信息选择到内容理解，再到参与体验。<br/>每个案例，都用真实的设计与交付说明一次产品实践。</p></header><SelectedWork all/></main>}
