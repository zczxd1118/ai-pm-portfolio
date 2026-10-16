import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';

export function getCase(slug: string) {
  const markdown = fs.readFileSync(path.join(process.cwd(),'content',`${slug}.md`),'utf8');
  const refs = [...markdown.matchAll(/^\[[^\]]+\]: .+$/gm)].map(m=>m[0]).join('\n');
  const clean = markdown.replace(/^\[[^\]]+\]: .+$/gm,'');
  return [...clean.matchAll(/^## (\d+)\. ([^｜\n]+)｜([^\n]+)\n([\s\S]*?)(?=^## \d+\.|$(?![\s\S]))/gm)].map(m=>({
    number:Number(m[1]), id:`section-${m[1]}`, english:m[2].trim(), title:m[3].trim(),
    html:marked.parse(m[4]+'\n\n'+refs,{gfm:true,async:false}) as string,
  }));
}
