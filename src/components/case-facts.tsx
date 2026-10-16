export function CaseFacts({decision,delivery,role='独立规划 · 产品设计 · Vibe Coding'}:{decision:string;delivery:string;role?:string}) {
  return <dl className="case-at-a-glance"><div><dt>我的角色</dt><dd>{role}</dd></div><div><dt>关键选择</dt><dd>{decision}</dd></div><div><dt>实际交付</dt><dd>{delivery}</dd></div></dl>;
}
