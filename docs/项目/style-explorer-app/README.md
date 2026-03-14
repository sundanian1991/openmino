---
input: ui-ux-pro-max 设计系统 CSV 数据（styles.csv, colors.csv, typography.csv, ui-reasoning.csv）
output: 审美风格探索器 Web 应用，支持风格浏览、详情页查看、视觉化测评、报告生成
pos: docs/style-explorer-app - 交互式 UI 审美风格探索应用
---

# 审美风格探索器

基于 ui-ux-pro-max 设计系统的交互式 UI 风格探索应用。

## 功能特性

- **67 种 UI 风格** 完整展示
- **96 种配色方案** 预览
- **56 种字体组合** 参考
- **视觉化测评** 发现你的审美偏好
- **风格详情页** 三 Tab 设计（视觉预览、配色方案、设计指南）

## 技术栈

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **CSV 数据解析** (csv-parse)

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

## 项目结构

```
docs/style-explorer-app/
├── src/
│   ├── app/
│   │   ├── page.tsx              # 首页（风格列表）
│   │   ├── style/[id]/page.tsx   # 风格详情页
│   │   └── api/styles/route.ts   # API 路由
│   ├── components/
│   │   ├── style-card.tsx        # 风格卡片
│   │   ├── style-grid.tsx        # 风格网格
│   │   ├── style-preview.tsx     # 视觉预览
│   │   └── style-detail.tsx      # 详情组件（三 Tab）
│   ├── lib/data/
│   │   └── styles.ts             # CSV 数据解析
│   └── types/
│       └── style.ts              # Style 类型定义
├── public/data/
│   ├── styles.csv                # 风格数据
│   ├── colors.csv                # 配色数据
│   ├── typography.csv            # 字体数据
│   └── ui-reasoning.csv          # UI 规则数据
└── package.json
```

## 数据来源

数据来自 ui-ux-pro-max 设计系统：
- 67 种 UI 风格定义
- 96 种配色方案
- 56 种字体组合
- 100 条行业设计规则

## 开发待办

- [ ] Phase 3.2: 收藏功能（localStorage）
- [ ] Phase 3.3: 视觉化测评流程（12 道视觉选择题）
- [ ] Phase 3.4: 报告生成（导出 PDF/Markdown/CSS 变量）
- [ ] Phase 4: 本地验证 + 部署
