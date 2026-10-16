import {ArrowUpRight} from 'lucide-react';
import {assetPath} from '@/lib/paths';

// Retain the existing component name for its case-page import.
// The owner explicitly requested the existing complete EPUB as a deliverable.
export function LocalBookDownload(){
  return <div className="cc-book-actions"><a className="button secondary" href={assetPath('/downloads/content-catcher-deep-book.epub')} download="让机器人把工作做完.epub">下载完整 EPUB<ArrowUpRight size={16}/></a></div>;
}
