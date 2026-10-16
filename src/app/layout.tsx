import type { Metadata, Viewport } from 'next';
import { Navigation } from '@/components/interactive';
import { Footer } from '@/components/portfolio';
import { site } from '@/lib/site';
import { assetPath } from '@/lib/paths';
import './globals.css';

export const metadata: Metadata = {
  title:{default:site.title,template:'%s · 周小丁'},
  description:site.description,
  metadataBase:new URL(site.url||'http://127.0.0.1:3000'),
  authors:[{name:site.name}],
  icons:{icon:assetPath('/icon.svg')},
  robots:site.url?{index:true,follow:true}:{index:false,follow:false},
};
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#fafafa'};

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="zh-CN"><body><a href="#main-content" className="skip-link">跳到主要内容</a><Navigation/>{children}<Footer/></body></html>;
}
