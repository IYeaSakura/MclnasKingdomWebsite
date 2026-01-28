<div align="center">

  ![MClans CN Logo](mclans-logo.png)

  # MClans CN

  **一个现代化的 Minecraft 服务器中文网站，提供沉浸式的游戏体验展示**

  [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
  [![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=white)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.19-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

  [![GitHub stars](https://img.shields.io/github/stars/yourusername/mclans_cn?style=social)](https://github.com/yourusername/mclans_cn/stargazers)
  [![GitHub forks](https://img.shields.io/github/forks/yourusername/mclans_cn?style=social)](https://github.com/yourusername/mclans_cn/network/members)
  [![GitHub issues](https://img.shields.io/github/issues/yourusername/mclans_cn)](https://github.com/yourusername/mclans_cn/issues)

  [English](README_EN.md) | 简体中文

</div>

---

## ✨ 项目简介

这是一个专为 Minecraft 公会打造的现代化中文网站，采用最新的前端技术栈构建。项目提供了丰富的功能模块，包括商店系统、排行榜、新闻资讯、王国展示等，为公会成员提供全方位的游戏信息展示和互动体验。

**演示站点**：[https://mclans.sakurain.net/](https://mclans.sakurain.net/)

---

### 🎯 核心亮点

- 🎮 **沉浸式全屏体验** - 流畅的全屏滚动设计，支持季节主题动态切换
- 🛒 **完善的商店系统** - 系统商店与公会商店双轨并行
- 🏆 **实时排行榜** - 玩家与王国多维度排名展示
- 📰 **动态资讯中心** - 每日新闻与游戏动态实时更新
- 🌍 **王国世界观** - 多个游戏王国的详细展示与介绍
- 👑 **荣誉殿堂** - 名人堂系统，展示优秀玩家成就
- 🎨 **现代化UI设计** - 基于 Radix UI 和 Tailwind CSS 的精美界面
- 🛡️ **数据安全** - 使用 TypeScript 和 Zod 进行类型安全验证
---

## 📸 功能展示

### 首页预览

![首页展示](home.png)
---

## 🚀 快速开始

### 环境要求

- **Node.js**: >= 18.0.0
- **npm**: >= 9.0.0 或 **yarn**: >= 1.22.0 或 **pnpm**: >= 8.0.0

### 安装步骤

```bash
# 1. 克隆仓库
git clone https://github.com/IYeaSakura/MclnasKingdomWebsite.git

# 2. 进入项目目录
cd mclans-kingdom-wars-website

# 3. 安装依赖
npm install
# 或使用 yarn
yarn install
# 或使用 pnpm
pnpm install
```

### 开发模式

```bash
# 吟动开发服务器
npm run dev

# 访问 http://localhost:5173
```

### 生产构建

```bash
# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

### 代码检查

```bash
# 运行 ESLint 检查
npm run lint

# 类型检查
npm run type-check
```

---

## 🛠️ 技术栈

### 核心框架

| 技术 | 版本 | 说明 |
|-----|------|------|
| [React](https://react.dev/) | 19.2.0 | 用于构建用户界面的 JavaScript 库 |
| [TypeScript](https://www.typescriptlang.org/) | 5.9.3 | JavaScript 的类型安全超集 |
| [Vite](https://vitejs.dev/) | 7.2.4 | 下一代前端构建工具 |

### UI 组件库

| 技术 | 版本 | 说明 |
|-----|------|------|
| [Radix UI](https://www.radix-ui.com/) | Latest | 无障碍的 UI 组件库 |
| [Tailwind CSS](https://tailwindcss.com/) | 3.4.19 | 实用优先的 CSS 框架 |
| [Lucide React](https://lucide.dev/) | 0.562.0 | 精美的图标库 |
| [Recharts](https://recharts.org/) | 2.15.4 | 数据可视化图表库 |
| [Sonner](https://sonner.emilkowal.ski/) | 2.0.7 | 优雅的 Toast 通知 |

### 功能库

| 技术 | 版本 | 说明 |
|-----|------|------|
| [React Router](https://reactrouter.com/) | 7.13.0 | 客户端路由 |
| [React Hook Form](https://react-hook-form.com/) | 7.70.0 | 高性能表单处理 |
| [Zod](https://zod.dev/) | 4.3.5 | TypeScript 优先的模式验证 |
| [date-fns](https://date-fns.org/) | 4.1.0 | 现代化的日期处理 |
| [react-markdown](https://github.com/remarkjs/react-markdown) | 10.1.0 | Markdown 渲染 |

---

## 📁 项目结构

```
mclans-kingdom-wars-website/
├── src/
│   ├── components/              # 可复用组件
│   │   ├── ui/                 # Radix UI 组件库
│   │   │   ├── accordion.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── form.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── table.tsx
│   │   │   └── ...             # 更多 UI 组件
│   │   ├── FirstLetterIcon.tsx  # 首字母图标组件
│   │   ├── FullPageScroll.tsx   # 全屏滚动组件
│   │   ├── SeasonBackground.tsx # 季节背景组件
│   │   ├── VideoModal.tsx       # 视频模态框
│   │   ├── Pagination.tsx       # 分页组件
│   │   └── VirtualList.tsx      # 虚拟列表
│   ├── contexts/                # React Context
│   │   └── SeasonContext.tsx    # 季节主题上下文
│   ├── data/                    # 数据文件
│   │   ├── dailyNewsData.ts     # 每日新闻数据
│   │   ├── guildShopData.ts     # 公会商店数据
│   │   ├── hallOfFameData.ts    # 名人堂数据
│   │   ├── kingdomsData.ts      # 王国数据
│   │   ├── rankings.ts          # 排行榜数据
│   │   ├── systemShopData.ts    # 系统商店数据
│   │   └── dataUtils.ts         # 数据工具函数
│   ├── hooks/                   # 自定义 Hooks
│   │   ├── use-mobile.ts        # 移动端检测
│   │   ├── usePagination.ts     # 分页 Hook
│   │   └── useVirtualScroll.ts  # 虚拟滚动 Hook
│   ├── pages/                   # 页面组件
│   │   ├── DailyNewsPage.tsx    # 每日新闻页面
│   │   ├── GuildShopPage.tsx    # 公会商店页面
│   │   ├── HallOfFamePage.tsx   # 名人堂页面
│   │   ├── KingdomsPage.tsx     # 王国展示页面
│   │   ├── RankingsPage.tsx     # 排行榜页面
│   │   └── SystemShopPage.tsx   # 系统商店页面
│   ├── sections/                # 首页区块
│   │   ├── Hero.tsx             # 首屏 Hero 区域
│   │   ├── GameGallery.tsx      # 游戏画廊
│   │   ├── GameFeatures.tsx     # 游戏特色
│   │   ├── CTA.tsx              # 行动号召
│   │   ├── Navbar.tsx           # 导航栏
│   │   ├── Footer.tsx           # 页脚
│   │   ├── DailyNews.tsx        # 每日新闻区块
│   │   ├── GuildShop.tsx        # 公会商店区块
│   │   ├── HallOfFame.tsx       # 名人堂区块
│   │   ├── Kingdoms.tsx         # 王国区块
│   │   ├── Rankings.tsx         # 排行榜区块
│   │   └── SystemShop.tsx       # 系统商店区块
│   ├── types/                   # TypeScript 类型定义
│   │   └── index.ts
│   ├── utils/                   # 工具函数
│   │   └── imageCache.ts        # 图片缓存
│   ├── lib/                     # 库文件
│   │   └── utils.ts             # 通用工具
│   ├── App.tsx                  # 主应用组件
│   ├── App.css                  # 应用样式
│   ├── main.tsx                 # 应用入口
│   └── index.css                # 全局样式
├── public/                      # 静态资源
│   └── images/                  # 图片资源
│       ├── hero-landscape*.jpg  # 首页背景图
│       ├── kingdom-*.jpg        # 王国图片
│       ├── player-*.jpg         # 玩家图片
│       ├── item-*.jpg           # 物品图片
│       ├── daily-*.jpg          # 每日新闻图片
│       └── mc-logo.png          # Logo
├── dist/                        # 构建输出目录
├── .gitignore                   # Git 忽略文件
├── LICENSE                      # Apache License 2.0
├── package.json                 # 项目配置
├── tsconfig.json                # TypeScript 配置
├── tailwind.config.js           # Tailwind CSS 配置
├── vite.config.ts               # Vite 配置
├── eslint.config.js             # ESLint 配置
└── postcss.config.js            # PostCSS 配置
```

---

## 🎯 功能详解

### 首页功能

#### 全屏滚动设计
- 流畅的页面切换动画
- 支持鼠标滚轮和键盘导航
- 右侧导航点快速跳转

#### 季节主题系统
- 🌸 **春季** - 生机勃勃的绿色主题
- ☀️ **夏季** - 炎热活力的橙色主题
- 🍂 **秋季** - 金黄丰收的棕色主题
- ❄️ **冬季** - 冰雪纯净的蓝色主题

#### 首页区块
1. **Hero 区域** - 精美的首屏展示，支持季节切换
2. **游戏画廊** - 游戏截图和视频展示
3. **游戏特色** - 核心玩法介绍
4. **行动号召** - 引导用户参与
5. **页脚** - 网站导航和链接

### 页面路由

| 路由 | 页面 | 功能描述 |
|-----|------|---------|
| `/` | 首页 | 全屏滚动展示 |
| `/system-shop` | 系统商店 | 官方物品商城 |
| `/guild-shop` | 公会商店 | 公会专属商店 |
| `/hall-of-fame` | 名人堂 | 优秀玩家展示 |
| `/kingdoms` | 王国展示 | 游戏王国介绍 |
| `/daily-news` | 每日新闻 | 游戏资讯动态 |
| `/rankings` | 排行榜 | 玩家与王国排名 |

### 商店系统

#### 系统商店
- 官方物品售卖
- 多种物品分类
- 价格和稀有度标识
- 购买功能

#### 公会商店
- 公会专属物品
- 成员折扣系统
- 特殊道具
- 积分兑换

### 排行榜系统

#### 玩家排行榜
- 综合实力排名
- 战斗力排行
- 贡献度排行
- 在线时长排行

#### 王国排行榜
- 王国实力排行
- 成员数量排行
- 资源储备排行
- 战绩统计

---

## 🎨 设计系统

### 主题配置

项目支持深色/浅色主题切换，基于 `next-themes` 实现：

```typescript
// 使用主题
import { useTheme } from 'next-themes';

const { theme, setTheme } = useTheme();
```

### 颜色系统

```css
/* 主色调 */
--primary: #FFD700;        /* 金色 */
--secondary: #2A2A2A;      /* 深灰 */
--accent: #4A4A4A;         /* 中灰 */

/* 季节主题 */
--spring: #90EE90;         /* 春绿 */
--summer: #FFA500;         /* 夏橙 */
--autumn: #D2691E;         /* 秋棕 */
--winter: #87CEEB;         /* 冬蓝 */
```

### 组件库

项目使用 [shadcn/ui](https://ui.shadcn.com/) 风格的组件系统，所有 UI 组件位于 `src/components/ui/` 目录。

---

## 🔧 配置说明

### Vite 配置

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
```

### Tailwind 配置

```javascript
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FFD700',
        secondary: '#2A2A2A'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
}
```

---

## 🖼️ 图片优化

本项目采用**构建时自动转换 + 渐进增强**的图片优化策略，实现 AVIF > WebP > JPEG/PNG 的格式优先级，在兼容性和性能之间取得最佳平衡。

### 图片分类策略

| 图片类型 | 推荐格式 | 优先级 | 响应式尺寸 | 原因 |
|---------|---------|------|-----------|------|
| **Hero 轮播图**（4张） | AVIF + WebP + JPEG | 高 | 1920, 1280, 750, 375 | 首屏关键图片，影响首屏加载速度 |
| **游戏截图**（5张）`king-*.jpg` | AVIF + WebP + JPEG | 高 | 1920, 1280, 750, 375 | 大尺寸图片，压缩收益大 |
| **物品图标**（15张）`item-*.jpg` | WebP + PNG | 中 | 256, 128, 64 | 小尺寸，WebP 足够，PNG 作为 fallback |
| **玩家头像**（5张）`player-*.jpg` | WebP + PNG | 中 | 512, 256, 128 | 需要透明背景，WebP 支持 |
| **每日新闻图片**（4张）`daily-*.jpg` | WebP + JPEG | 中 | 800, 400, 200 | 次要内容，WebP 即可 |
| **Logo** | SVG | 最高 | - | 矢量图形，无限缩放 |

### 快速开始

```bash
# 仅转换图片
npm run build:images

# 转换图片并构建项目
npm run build
```

### 在组件中使用优化图片

```tsx
import { OptimizedImage } from '@/components/OptimizedImage';

// 高优先级图片（Hero、游戏截图）
<OptimizedImage 
  src="/images/kingdom-main-castle.jpg"
  alt="史诗级王国战争"
  priority="high"
  className="w-full h-full object-cover"
/>

// 普通图片（物品图标、玩家头像）
<OptimizedImage 
  src="/images/item-diamond-sword.jpg"
  alt="钻石剑"
  priority="low"
  className="w-16 h-16"
  loading="lazy"
/>
```

### 性能提升预期

| 指标 | 优化前 | 优化后 | 提升 |
|------|--------|--------|------|
| **首屏图片大小** | ~2.5MB | ~1.2MB | **52%** |
| **总图片大小** | ~8MB | ~3.5MB | **56%** |
| **首屏加载时间** | ~3.5s | ~1.8s | **49%** |
| **LCP (Largest Contentful Paint)** | ~2.8s | ~1.5s | **46%** |

### 浏览器兼容性

| 格式 | Chrome | Firefox | Safari | Edge | 覆盖率 |
|------|--------|---------|--------|------|--------|
| **AVIF** | 85+ | 93+ | 16+ | 85+ | ~90% |
| **WebP** | 23+ | 65+ | 14+ | 18+ | ~97% |
| **JPEG** | 所有 | 所有 | 所有 | 所有 | 100% |

### 验证优化效果

1. **使用 Chrome DevTools**
   - 打开开发者工具（F12）
   - 切换到 **Network** 标签
   - 刷新页面
   - 查看 **Size** 列，确认加载的是 AVIF/WebP 格式
   - 检查 **Headers**，确认 `Content-Type` 正确

2. **使用 Lighthouse**
   ```bash
   npm run build
   npm run preview
   # 在 Chrome DevTools 中运行 Lighthouse
   ```

### 从 `<img>` 迁移到 `<OptimizedImage>`

**之前：**
```tsx
<img
  src="/images/kingdom-main-castle.jpg"
  alt="史诗级王国战争"
  className="w-full h-full object-cover"
  loading="lazy"
/>
```

**之后：**
```tsx
<OptimizedImage
  src="/images/kingdom-main-castle.jpg"
  alt="史诗级王国战争"
  priority="high"
  className="w-full h-full object-cover"
  loading="lazy"
/>
```

### 想了解更多图片优化细节？

请查看 [技术详解指南](TECHNICAL_GUIDE.md)，了解：
- 图片格式对比
- 响应式图片实现
- 艺术方向处理
- 自定义配置方法
- 部署建议

---

## ❓ 常见问题 (FAQ)

### 为什么选择纯前端架构？

MClans CN 采用 **JAMstack**（JavaScript + APIs + Markup）架构，这是一种现代化的静态站点生成方案。

**适用场景：**
- ✅ 数据更新频率 ≤ 1周（甚至月级）
- ✅ 无用户交互写操作（评论、投票、表单提交）
- ✅ 无敏感数据（玩家隐私、服务器IP隐藏等）
- ✅ 已有大量前端代码，加后端会增加维护复杂度

**技术优势：**

| 优势 | 具体体现 |
|------|----------|
| **成本极低** | Vercel/Netlify/Cloudflare Pages 免费托管，无服务器费用 |
| **速度极快** | 全球CDN边缘缓存，首屏加载<100ms |
| **无限扩展** | 纯静态文件，流量暴增也不会宕机 |
| **运维为零** | 没有数据库要维护，没有后端服务要监控 |
| **版本控制** | JSON数据在Git中，更新历史可追溯，可回滚 |

### 这种架构是否常见？

**非常多，这是现代Web开发的主流架构之一！**

根据行业数据：
- **60%+** 的开发者表示他们的项目包含静态生成
- **Vercel** 每天处理数百万次静态构建部署
- **Cloudflare Pages** 和 **Netlify** 上托管的站点90%都是这种架构

**实际应用案例：**
- **技术文档站**：React/Vue/Angular 官方文档、MDN Web Docs
- **游戏相关站点**：Minecraft Server List 网站、Steam 游戏数据站
- **企业官网**：Next.js 官网、Apple 产品页
- **数据展示类**：加密货币行情站、天气预报展示

### 如何更新数据？

**方案A：GitHub Actions 自动更新（推荐）**

```yaml
# .github/workflows/update-data.yml
name: Update Server Data
on:
  schedule:
    - cron: '0 0 * * 1'  # 每周一凌晨
jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm run update-data  # 你的Node脚本获取服务器数据
      - run: |
          git add data.json
          git commit -m "chore: update weekly data"
          git push
```

**方案B：本地脚本 + 手动部署**

```bash
update_data.py → 生成 json → 推送到 CDN/对象存储
```

### 何时需要添加后端？

出现以下任一情况时考虑开发后端或 Serverless 函数：

| 场景 | 解决方案 |
|------|----------|
| **实时数据**（在线人数、服务器状态） | 用 **Vercel Edge Function** 或 **Cloudflare Workers** 做轻量级API代理 |
| **用户互动**（玩家投票、留言板） | 需要数据库（SQLite/PlanetScale/Firebase）+ 后端接口 |
| **敏感逻辑**（隐藏真实服务器IP、反爬虫） | 后端代理请求，前端不暴露源站 |
| **用户上传**（皮肤上传、截图分享） | 需要文件存储+后端鉴权 |

### 如果需要实时数据怎么办？

可以使用**边缘函数**补充动态部分，主体保持静态：

```javascript
// /api/server-status.js (Vercel Edge Function)
export default async function handler() {
  const status = await fetch('your-minecraft-server:25565');
  return Response.json({ online: status.players.online });
}
```

- 成本：每月100万次调用免费
- 延迟：边缘节点就近执行，<50ms
- 维护：单文件函数，无需服务器运维

### 想了解更多技术细节？

请查看 [技术详解指南](TECHNICAL_GUIDE.md)，了解：
- 架构设计原理
- 核心功能实现
- 性能优化技巧
- 图片优化策略
- 数据管理方案
- 最佳实践

---

## 🤝 贡献指南

我们欢迎所有形式的贡献！

### 如何贡献

1. **Fork 本仓库**
   ```bash
   git clone https://github.com/IYeaSakura/MclnasKingdomWebsite.git
   ```

2. **创建特性分支**
   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **提交更改**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```

4. **推送到分支**
   ```bash
   git push origin feature/AmazingFeature
   ```

5. **开启 Pull Request**

### 贡献规范

- 遵循现有代码风格
- 添加必要的注释
- 更新相关文档
- 确保所有测试通过
- 提交前运行 `npm run lint`

---

## 📄 开源协议

本项目采用 [Apache License 2.0](LICENSE) 开源协议。

```
Copyright 2024 MClans CN Contributors

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

---

## 🌐 浏览器支持

| 浏览器 | 版本 | 支持状态 |
|--------|------|---------|
| Chrome | 最新版本 | ✅ 完全支持 |
| Firefox | 最新版本 | ✅ 完全支持 |
| Safari | 最新版本 | ✅ 完全支持 |
| Edge | 最新版本 | ✅ 完全支持 |
| Opera | 最新版本 | ✅ 完全支持 |

---

## 📞 联系方式

- **GitHub Issues**: [提交问题](https://github.com/IYeaSakura/MclnasKingdomWebsite/issues)
- **Pull Requests**: [提交代码](https://github.com/IYeaSakura/MclnasKingdomWebsite/pulls)
- **Email**: wangyuyang2004@foxmail.com

---

## 🙏 致谢

感谢以下开源项目和贡献者：

- [React](https://react.dev/) - React 团队
- [Vite](https://vitejs.dev/) - Vite 团队
- [Radix UI](https://www.radix-ui.com/) - Radix UI 团队
- [Tailwind CSS](https://tailwindcss.com/) - Tailwind Labs
- [shadcn/ui](https://ui.shadcn.com/) - shadcn

---

## 🗺️ 路线图

### v1.0.0 (当前版本)
- ✅ 基础网站架构
- ✅ 首页全屏滚动
- ✅ 季节主题系统
- ✅ 商店系统
- ✅ 排行榜系统
- ✅ 新闻资讯
- ✅ 王国展示
- ✅ 名人堂

### v2.0.0 (计划中)
- ⏳ 移动端 App
- ⏳ 后端 API
- ⏳ 数据库集成
- ⏳ 管理后台

---

<div align="center">

  **如果这个项目对你有帮助，请给一个 ⭐️**

  Made with ❤️ using React, TypeScript & Vite

  [⬆ 回到顶部](#mclans-cn)

</div>
