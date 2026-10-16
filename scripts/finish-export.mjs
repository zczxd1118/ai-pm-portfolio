// Next 16.4 emits nested RSC segment files while the static client prefetches
// dotted aliases. Add identical aliases for servers without framework rewrites.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../out');
let aliases=0;
function visit(directory){
  for(const entry of fs.readdirSync(directory,{withFileTypes:true})){
    const full=path.join(directory,entry.name);
    if(entry.isDirectory())visit(full);
    else if(entry.name.endsWith('.txt')){
      const parts=path.relative(root,full).split(path.sep);
      const start=parts.findIndex((part,index)=>index<parts.length-1&&part.startsWith('__next.'));
      if(start<0)continue;
      const target=path.join(root,...parts.slice(0,start),parts.slice(start).join('.'));
      fs.copyFileSync(full,target);aliases++;
    }
  }
}
visit(root);
fs.writeFileSync(path.join(root,'.nojekyll'),'');
fs.writeFileSync(path.join(root,'site-config.json'),JSON.stringify({basePath:process.env.NEXT_PUBLIC_BASE_PATH||''}));
process.stdout.write(`Static RSC aliases prepared: ${aliases}\n`);
