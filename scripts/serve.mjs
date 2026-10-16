import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../out');
const port=Number(process.env.PORT||3000);
// Local preview access only. No copy of this file is made into the static export.
const book=path.resolve(root,'../../demos/content-catcher-deep-book/deep-book.epub');
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.txt':'text/plain; charset=utf-8','.md':'text/markdown; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.xml':'application/xml','.epub':'application/epub+zip','.woff2':'font/woff2'};
http.createServer((request,response)=>{
  if(!['GET','HEAD'].includes(request.method)){response.writeHead(405);response.end();return}
  let pathname;try{pathname=decodeURIComponent(new URL(request.url,'http://localhost').pathname)}catch{response.writeHead(400);response.end();return}
  const configPath=path.join(root,'site-config.json');
  const basePath=fs.existsSync(configPath)?JSON.parse(fs.readFileSync(configPath,'utf8')).basePath:'';
  if(basePath){
    if(pathname==='/'||pathname===basePath){response.writeHead(302,{Location:basePath+'/'});response.end();return}
    if(!pathname.startsWith(basePath+'/')){response.writeHead(404);response.end();return}
    pathname=pathname.slice(basePath.length);
  }
  if(pathname==='/__local-preview/content-catcher'){
    response.writeHead(200,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});
    response.end(request.method==='HEAD'?undefined:JSON.stringify({available:fs.existsSync(book)}));return;
  }
  if(pathname==='/__local-preview/content-catcher/deep-book.epub'){
    if(!fs.existsSync(book)){response.writeHead(404);response.end();return}
    response.writeHead(200,{'Content-Type':'application/epub+zip','Content-Length':fs.statSync(book).size,
      'Content-Disposition':`attachment; filename="content-catcher-deep-book.epub"; filename*=UTF-8''${encodeURIComponent('让机器人把工作做完.epub')}`,
      'Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'});
    if(request.method==='HEAD')response.end();else fs.createReadStream(book).pipe(response);return;
  }
  const file=path.resolve(root,'.'+pathname);
  if(file!==root&&!file.startsWith(root+path.sep)){response.writeHead(403);response.end();return}
  const target=fs.existsSync(file)&&fs.statSync(file).isDirectory()?path.join(file,'index.html'):file;
  const exists=fs.existsSync(target)&&fs.statSync(target).isFile();
  const resolved=exists?target:path.join(root,'404.html');
  response.writeHead(exists?200:404,{'Content-Type':mime[path.extname(resolved)]||'application/octet-stream','X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin','Cache-Control':'no-cache'});
  if(request.method==='HEAD')response.end();else fs.createReadStream(resolved).pipe(response);
}).listen(port,'127.0.0.1',()=>process.stdout.write(`Local: http://127.0.0.1:${port}\nStatic export + local-only book download; no publishing.\n`));
