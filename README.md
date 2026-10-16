# 周小丁 · AI 产品经理作品集

通过 Curio、Content Catcher、Tarot Divination 三个案例，呈现产品问题、设计取舍、AI 工作流与真实交付。

- 网站：<https://zczxd1118.github.io/ai-pm-portfolio/>
- Curio：<https://curioradar.fun/>
- Tarot：<https://zczxd1118.github.io/tarot-divination/>

## 本地开发

使用 Node.js 24、项目 `packageManager` 指定的 pnpm 版本。

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

默认本地地址为 `http://127.0.0.1:3000/`。

## 构建与预览

```sh
pnpm build
node scripts/check-export.mjs
pnpm preview
```

GitHub Pages 使用 `/ai-pm-portfolio` 子路径，构建时设置：

```sh
NEXT_PUBLIC_BASE_PATH=/ai-pm-portfolio NEXT_PUBLIC_SITE_URL=https://zczxd1118.github.io/ai-pm-portfolio pnpm build
```

PowerShell：

```powershell
$env:NEXT_PUBLIC_BASE_PATH='/ai-pm-portfolio'
$env:NEXT_PUBLIC_SITE_URL='https://zczxd1118.github.io/ai-pm-portfolio'
pnpm build
pnpm preview
```

预览服务器读取构建产生的子路径配置；使用该配置时访问 `http://127.0.0.1:3000/ai-pm-portfolio/`。服务器仅监听本机，可通过 `PORT` 更换端口。

## 自动部署

`.github/workflows/deploy-pages.yml` 在 push 到 `main` 或手动触发时执行：安装锁定依赖 → 静态构建 → 输出检查 → 上传 Pages artifact → 部署。

仓库 Pages 来源设为 **Settings → Pages → Build and deployment → Source → GitHub Actions**。工作流使用 GitHub 自动提供的短期权限，无需在源码中配置个人 Token。

Next.js 使用 `output: 'export'`、`trailingSlash: true`，分别输出页面目录；案例页可直接访问和刷新。图片和框架资源适配部署子路径，构建后处理保留静态站点需要的 RSC 别名。

## 内容与代码结构

- `src/app/`：首页、项目列表、案例、About、Resume 与元数据。
- `src/components/`：共用导航、图片预览及案例展示。
- `src/lib/`：项目资料、Markdown 读取和静态资源路径。
- `content/`：三个公开案例正文与来源链接。
- `public/images/`：经选择的真实产品截图与书籍精选页面。
- `scripts/`：静态导出后处理、输出检查及本机预览服务。

技术栈为 Next.js App Router、React、TypeScript、Tailwind CSS 和静态导出。站点本身没有模型调用、账号系统或数据库。

## 素材说明

产品截图按版本或内容日期标注；Curio 评分设置中的凭据字段已覆盖后重新编码，邮件展示仅保留正文区域。完整邮箱 PDF、私人简历、原项目源码副本、内部审计和本机检查记录不包含在本仓库。

Content Catcher 展示《让机器人把工作做完》的封面、目录与精选章节，明确区分原工具和外部 AI 编辑的贡献。依本人最新展示要求，既有完整 EPUB 保存在 `public/downloads/content-catcher-deep-book.epub`，案例页提供下载；保留书内来源与编辑说明。此下载入口不表示已完成第三方内容授权审核。原始访谈、完整 Markdown 书稿及私人资料不包含在仓库中。

公开简历与联系邮箱尚未配置，页面不会生成无效下载或猜测联系地址。未来需要时，在 `src/lib/site.ts` 中填写经过本人确认的公开资料。
