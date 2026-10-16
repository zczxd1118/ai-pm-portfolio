import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../out');
const prefix=JSON.parse(fs.readFileSync(path.join(root,'site-config.json'),'utf8')).basePath;
const routes=['','projects','projects/curio','projects/content-catcher','projects/tarot','about','resume'];
const walk=p=>fs.readdirSync(p,{withFileTypes:true}).flatMap(d=>d.isDirectory()?walk(path.join(p,d.name)):[path.join(p,d.name)]);
const files=walk(root);
const book=path.join(root,'downloads/content-catcher-deep-book.epub');
assert(!files.some(p=>(/\.(?:epub|pdf|pem|key)$/i.test(p)&&p!==book)||/(?:audit-sources|audit-support|extracted-private|asset-manifest|\.env)/i.test(path.relative(root,p))),'Private input included in export');
assert(fs.existsSync(book),'Complete EPUB missing');
let references=0;
for(const route of routes){
 const html=fs.readFileSync(path.join(root,route,'index.html'),'utf8');
 assert(!/github_pat_[A-Za-z0-9_]{20,}|\bgh[pousr]_[A-Za-z0-9]{20,}|\bsk-[A-Za-z0-9]{16,}|mail\.qq\.com|[?&](?:sid|mailid)=/.test(html),'Unexpected credential/account content');
 for(const match of html.matchAll(/\b(?:src|href)="([^"<>]+)"/g)){
  const url=match[1];if(!url.startsWith('/')||url.startsWith('//'))continue;
  assert(!prefix||url.startsWith(prefix+'/'),`Missing deployment prefix: ${url}`);
  const name=decodeURIComponent(url.slice(prefix.length).split(/[?#]/)[0]);
  const resolved=path.join(root,name);
  assert(fs.existsSync(resolved),`Missing exported target: ${url}`);references++;
 }
 assert(html.includes('下载完整 EPUB')===(route==='projects/content-catcher'),'EPUB entry on wrong page');
}
assert(fs.existsSync(path.join(root,'404.html'))&&fs.existsSync(path.join(root,'.nojekyll')));
console.log(`Static export checked: ${routes.length} pages, ${references} local references, basePath=${prefix||'/'}. Only the requested complete EPUB is included; no private documents.`);
