import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
export const dynamic='force-static';
export default function sitemap():MetadataRoute.Sitemap {
  if(!site.url)return [];
  return ['','/projects/','/projects/curio/','/projects/content-catcher/','/projects/tarot/','/about/','/resume/'].map(p=>({url:`${site.url}${p}`,changeFrequency:'monthly',priority:p===''?1:p.startsWith('/projects/')?.8:.6}));
}
