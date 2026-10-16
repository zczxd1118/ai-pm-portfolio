'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { ArrowUpRight, Check, ChevronUp, Maximize2, Menu, X } from 'lucide-react';
import { assetPath } from '@/lib/paths';

export function Navigation() {
  const pathname = usePathname();
  const [open,setOpen] = useState(false);
  const menuButton=useRef<HTMLButtonElement>(null);
  useEffect(()=>{setOpen(false)},[pathname]);
  return <header className="site-header"><div className="nav-inner">
    <Link href="/" className="wordmark" aria-label="周小丁作品集首页">周小丁<span className="brand-dot"/> <span className="wordmark-sub">Portfolio</span></Link>
    <button ref={menuButton} className="menu-toggle" aria-expanded={open} aria-controls="primary-nav" aria-label={open?'收起导航':'展开导航'} onClick={()=>setOpen(!open)}>{open?<X size={21}/>:<Menu size={21}/>}</button>
    <nav id="primary-nav" aria-label="主导航" className={open?'nav-links is-open':'nav-links'} onKeyDown={e=>{if(e.key==='Escape'){setOpen(false);menuButton.current?.focus()}}}>
      {[["/","Home"],["/projects/","Projects"],["/about/","About"],["/resume/","Resume"]].map(([href,label])=><Link key={href} href={href} aria-current={(href==='/'?pathname==='/':pathname.startsWith(href.replace(/\/$/,'')))?'page':undefined} onClick={()=>setOpen(false)}>{label}</Link>)}
    </nav>
  </div></header>;
}

type Shot={src:string;alt:string;caption:string;label?:string};
export function Screenshot({src,alt,caption,priority=false,className=''}:Shot&{priority?:boolean;className?:string}) {
  const dialog=useRef<HTMLDialogElement>(null);
  return <figure className={`screenshot ${className}`}>
    <button className="image-button" onClick={()=>dialog.current?.showModal()} aria-label={`放大查看：${alt}`}>
      <Image src={assetPath(src)} alt={alt} width={1600} height={1000} priority={priority} loading={priority?'eager':'lazy'} sizes="(max-width: 760px) 100vw, 1100px"/>
      <span className="zoom-label"><Maximize2 size={14}/> 放大查看</span>
    </button>
    <figcaption>{caption}</figcaption>
    <dialog ref={dialog} className="image-dialog" aria-label={alt} onClick={e=>{if(e.target===e.currentTarget)dialog.current?.close()}}>
      <div className="dialog-bar"><span>{alt}</span><button autoFocus onClick={()=>dialog.current?.close()} aria-label="关闭放大图片"><X size={21}/></button></div>
      <img src={assetPath(src)} alt={alt}/><p>{caption}</p>
    </dialog>
  </figure>;
}

export function ShotTabs({shots,label}:{shots:Shot[];label:string}) {
  const [active,setActive]=useState(0);
  const tabs=useRef<(HTMLButtonElement|null)[]>([]);
  const safeId=label.replace(/\s/g,'');
  function handleKeys(e:KeyboardEvent<HTMLButtonElement>,index:number){
    let next=index;
    if(e.key==='ArrowRight')next=(index+1)%shots.length;
    else if(e.key==='ArrowLeft')next=(index+shots.length-1)%shots.length;
    else if(e.key==='Home')next=0;
    else if(e.key==='End')next=shots.length-1;
    else return;
    e.preventDefault();setActive(next);tabs.current[next]?.focus();
  }
  return <div className="shot-tabs">
    <div role="tablist" aria-label={label} className="tab-list">{shots.map((shot,i)=><button key={shot.src} ref={el=>{tabs.current[i]=el}} role="tab" id={`${safeId}-tab-${i}`} aria-selected={i===active} aria-controls={`${safeId}-panel`} tabIndex={i===active?0:-1} onKeyDown={e=>handleKeys(e,i)} onClick={()=>setActive(i)}>{shot.label}</button>)}</div>
    <div role="tabpanel" id={`${safeId}-panel`} aria-labelledby={`${safeId}-tab-${active}`}><Screenshot {...shots[active]} key={shots[active].src}/></div>
  </div>;
}

export function CaseToc({sections,tracking='intersection'}:{sections:{id:string;title:string;number:number}[];tracking?:'intersection'|'reading-position'}) {
  const [active,setActive]=useState('section-1');
  useEffect(()=>{
    if(tracking==='reading-position'){
      // A long chapter may never enter the observer's narrow band again.
      // Derive the active chapter from the last section above the reading line.
      const targets=sections.map(s=>document.getElementById(s.id)).filter((el):el is HTMLElement=>!!el);
      let frame=0;
      const update=()=>{
        frame=0;
        const header=document.querySelector('.site-header');
        const readingLine=(header?.getBoundingClientRect().bottom??0)+40;
        let current=targets[0]?.id??'section-1';
        for(const target of targets){
          if(target.getBoundingClientRect().top<=readingLine)current=target.id;
          else break;
        }
        // A short final chapter cannot always reach the reading line at max scroll.
        const last=targets[targets.length-1];
        if(last&&Math.ceil(window.scrollY+window.innerHeight)>=document.documentElement.scrollHeight-2&&last.getBoundingClientRect().top<window.innerHeight)current=last.id;
        setActive(current);
      };
      const schedule=()=>{if(!frame)frame=requestAnimationFrame(update)};
      const observer=new IntersectionObserver(schedule);
      const resize=new ResizeObserver(schedule);
      targets.forEach(el=>{observer.observe(el);resize.observe(el)});
      window.addEventListener('scroll',schedule,{passive:true});
      window.addEventListener('resize',schedule);
      window.addEventListener('hashchange',schedule);
      window.addEventListener('pageshow',schedule);
      schedule();
      return()=>{
        cancelAnimationFrame(frame);observer.disconnect();resize.disconnect();
        window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);
        window.removeEventListener('hashchange',schedule);window.removeEventListener('pageshow',schedule);
      };
    }
    const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting)setActive(entry.target.id)},{rootMargin:'-15% 0px -65% 0px'});
    sections.forEach(s=>{const el=document.getElementById(s.id);if(el)observer.observe(el)});
    return()=>observer.disconnect();
  },[sections,tracking]);
  return <aside className="case-toc"><span className="eyebrow">IN THIS CASE</span><nav aria-label="案例章节目录">{sections.map(s=><a key={s.id} href={`#${s.id}`} aria-current={active===s.id?'location':undefined}><span>{String(s.number).padStart(2,'0')}</span>{s.title}</a>)}</nav><a className="back-top" href="#top"><ChevronUp size={14}/> 回到顶部</a></aside>;
}

export function CopyGitHub(){
  const [copied,setCopied]=useState(false);
  const timeout=useRef<ReturnType<typeof setTimeout>|null>(null);
  useEffect(()=>()=>{if(timeout.current)clearTimeout(timeout.current)},[]);
  return <button className="button secondary" onClick={async()=>{try{await navigator.clipboard.writeText('https://github.com/zczxd1118');setCopied(true);timeout.current=setTimeout(()=>setCopied(false),2000)}catch{window.location.assign('https://github.com/zczxd1118')}}}>{copied?<Check size={16}/>:<ArrowUpRight size={16}/>}<span aria-live="polite">{copied?'已复制 GitHub 地址':'复制 GitHub 地址'}</span></button>;
}
