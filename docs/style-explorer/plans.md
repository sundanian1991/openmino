---
input: prompt.md
output: 任务拆解计划
pos: docs/style-explorer/plans.md
---

# 审美风格探索器 — 执行计划

## 🗺️ 总体架构

```
style-explorer/
├── app/                     # Next.js 应用
│   ├── page.tsx            # 首页（风格浏览）
│   ├── quiz/               # 测评页面
│   ├── report/             # 报告页面
│   └── layout.tsx          # 全局布局
├── lib/
│   ├── styles.ts           # 67 种风格数据
│   ├── palettes.ts         # 96 种配色数据
│   ├── typography.ts       # 57 种字体数据
│   ├── rules.ts            # 100 条规则数据
│   └── report-generator.ts # 报告生成逻辑
├── components/
│   ├── StyleCard.tsx       # 风格卡片
│   ├── StyleGrid.tsx       # 风格网格
│   ├── FilterBar.tsx       # 筛选栏
│   ├── Quiz.tsx            # 测评组件
│   ├── Report.tsx          # 报告组件
│   └── ExportButton.tsx    # 导出按钮
├── package.json
└── README.md
```

---

## 📌 Phase 1: 读取 ui-ux-pro-max 数据（已完成）

**状态**：✅ 数据完整，无需恢复

| 文件 | 行数 | 内容 |
|------|------|------|
| styles.csv | 68 | 67 种 UI 风格 |
| colors.csv | 97 | 96 种配色方案 |
| typography.csv | 57 | 56 种字体组合 |
| ui-reasoning.csv | 101 | 100 条行业规则 |

### 任务 1.1: 解析 CSV 数据
- [ ] 写脚本读取 styles.csv
- [ ] 写脚本读取 colors.csv
- [ ] 写脚本读取 typography.csv
- [ ] 写脚本读取 ui-reasoning.csv

**验收**：数据能导入到 Next.js 应用中

---

## 📌 Phase 2: 搭建 Next.js 框架 + 数据导入

### 任务 2.1: 创建 Next.js 项目
- [ ] `npx create-next-app@latest style-explorer --typescript --tailwind --app`
- [ ] 配置 ESLint
- [ ] 验证 `npm run dev` 能启动

**验收**：浏览器打开 localhost:3000 能看到 Next.js 欢迎页

### 任务 2.2: 配置项目结构
- [ ] 创建 `lib/data/` 目录
- [ ] 创建 `components/` 目录
- [ ] 创建 `app/quiz/` 目录
- [ ] 创建 `app/report/` 目录

**验收**：目录结构符合要求

### 任务 2.3: 导入 CSV 数据
- [ ] 安装 csv-parse 或 papa-parse
- [ ] 写脚本转换 styles.csv → lib/data/styles.ts
- [ ] 写脚本转换 colors.csv → lib/data/colors.ts
- [ ] 写脚本转换 typography.csv → lib/data/typography.ts
- [ ] 写脚本转换 ui-reasoning.csv → lib/data/rules.ts

**验收**：能在代码里 import 这些数据，类型正确

---

## 📌 Phase 3: 实现核心功能

### 任务 3.1: 风格浏览页面（首页）
- [ ] StyleCard 组件（展示风格名称、关键词、配色预览）
- [ ] StyleGrid 组件（响应式网格布局）
- [ ] FilterBar 组件（按行业/mood/颜色筛选）
- [ ] 搜索功能

**验收**：能看到 67 种风格卡片，能筛选和搜索

### 任务 3.2: 收藏功能
- [ ] 收藏按钮（心形图标）
- [ ] 本地存储（localStorage）
- [ ] 已收藏页面

**验收**：点击收藏后刷新页面还在

### 任务 3.3: 视觉化测评流程（核心）
- [ ] Quiz 组件（视觉选择题，不是文字题）
- [ ] **每一题展示 4 个真实 UI 样例**（用代码实时渲染）
  - Hero Section 对比
  - 按钮样式对比
  - 卡片设计对比
  - 配色方案对比
  - 排版风格对比
- [ ] 进度条
- [ ] 计分逻辑（基于用户选择匹配风格特征）

**验收**：用户能看到真实的 UI 样例做选择，不是文字术语

### 任务 3.4: 报告生成
- [ ] Report 组件（展示报告）
- [ ] 报告内容：
  -  Top 3 风格
  -  配色偏好
  -  排版偏好
  -  适合场景
  -  避坑建议
- [ ] 导出为 PDF（用 html2pdf 或 window.print()）
- [ ] 导出为 Markdown
- [ ] 导出 CSS 变量配置（可直接用到项目中）

**验收**：报告清晰、可操作，能导出

---

## 📌 Phase 4: 本地验证 + 部署

### 任务 4.1: UI/UX 优化
- [ ] 明亮专业配色
- [ ] 响应式设计（手机/平板/桌面）
- [ ] 加载状态
- [ ] 空状态（无收藏时）

**验收**：UI 美观、流畅

### 任务 4.2: 性能优化
- [ ] 图片懒加载
- [ ] 组件按需加载
- [ ] 数据缓存

**验收**：加载速度快，无明显卡顿

### 任务 4.3: 本地验证（优先级高）
- [ ] 年老师能本地运行
- [ ] 完整流程测试（浏览 → 收藏 → 测评 → 报告）
- [ ] 导出功能测试

**验收**：年老师说"能用，好看"

### 任务 4.4: 部署准备
- [ ] 写 README.md（如何运行）
- [ ] 写 .gitignore
- [ ] 推送到 GitHub

**验收**：别人能 clone 后 `npm install && npm run dev` 运行

---

## 📊 依赖关系

```
Phase 1 (数据源)
    ↓
Phase 2 (框架 + 数据导入)
    ↓
Phase 3 (核心功能)
    ↓
Phase 4 (优化 + 部署)
```

---

## ✅ 确认细节

| 维度 | 决策 |
|------|------|
| **题目数量** | 12 题（5 分钟） |
| **预览复杂度** | Hero Section（标题 + 副标题 + 按钮） |
| **导出格式** | CSS + JSON + PDF |
| **MVP 优先** | 先让你能用，再完善 |

---

## ⏱️ 预估时间

| Phase | 预估 | 状态 |
|-------|------|------|
| Phase 1 | ✅ 已完成（数据都在） | Done |
| Phase 2 | 45 分钟 | In Progress |
| Phase 3 | 90 分钟 | Pending |
| Phase 4 | 30 分钟 | Pending |
| **总计** | **~3 小时** | |

---

## 🔍 技术选型

| 功能 | 技术 |
|------|------|
| **框架** | Next.js 14 (App Router) |
| **样式** | Tailwind CSS |
| **语言** | TypeScript |
| **数据存储** | localStorage（收藏/测评结果） |
| **PDF 导出** | html2pdf.js 或 window.print() |
| **部署** | GitHub（可手动下载到 Vercel） |

---

*最后更新：2026-02-24 — 任务拆解完成*
