'use client';

import {useEffect,useState} from 'react';
import {ArrowUpRight} from 'lucide-react';
import {assetPath} from '@/lib/paths';

// The full book stays outside public/ and out/. This control appears only when
// the loopback preview server confirms that its private download route exists.
export function LocalBookDownload(){
  const [available,setAvailable]=useState(false);
  useEffect(()=>{
    if(!['127.0.0.1','localhost','[::1]'].includes(window.location.hostname))return;
    const controller=new AbortController();
    fetch(assetPath('/__local-preview/content-catcher'),{cache:'no-store',signal:controller.signal})
      .then(r=>r.ok?r.json():null).then(data=>setAvailable(data?.available===true)).catch(()=>{});
    return()=>controller.abort();
  },[]);
  if(!available)return null;
  return <div className="cc-book-actions"><a className="button secondary" href={assetPath('/__local-preview/content-catcher/deep-book.epub')} download="让机器人把工作做完.epub">下载 EPUB<ArrowUpRight size={16}/></a></div>;
}
