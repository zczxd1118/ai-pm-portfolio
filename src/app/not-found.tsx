import Link from 'next/link';
export default function NotFound(){return <main id="main-content" className="container not-found"><p className="eyebrow">404 / PAGE NOT FOUND</p><h1>这条路径，暂时没有内容。</h1><p>你可以从精选项目重新开始。</p><Link className="button primary" href="/projects/">查看精选项目</Link></main>}
