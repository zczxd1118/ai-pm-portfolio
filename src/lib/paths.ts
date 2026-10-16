// Build-time prefix for project sites, e.g. GitHub Pages /ai-pm-portfolio.
// next/link adds basePath itself; raw image and fetch URLs need it explicitly.
export const basePath=process.env.NEXT_PUBLIC_BASE_PATH || '';
export function assetPath(path:string){
  return path.startsWith('/')&&!path.startsWith('//')?`${basePath}${path}`:path;
}
