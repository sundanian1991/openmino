# Skills 使用指南

## 📊 当前状态

**已安装技能**: 62个
**位置**: `/Users/sundanian/my-agent/.claude/skills/`

---

## 🎯 六大技能分类

### 1️⃣ Agent基础能力类（已装2/6）
- ✅ find-skills - 技能搜索
- ✅ skill-creator - 创建技能
- ✅ mcp-builder - MCP构建
- ✅ subagent-driven-development - 子代理协作
- ❌ using-superpowers（网络问题）
- ❌ agent-tools（不存在）

---

### 2️⃣ 写作和思考类（已装6/10）
- ✅ brainstorming - 头脑风暴
- ✅ copywriting - 文案创作
- ✅ systematic-debugging - 系统化调试
- ✅ writing-plans - 写作计划
- ✅ executing-plans - 计划执行
- ✅ social-content - 社交内容
- ❌ content-strategy（已装替代品marketing-content-strategy）
- ❌ marketing-ideas（不存在）
- ❌ copy-editing（不存在）
- ❌ reflection（不存在）

---

### 3️⃣ 设计和视觉类（已装8/10）
- ✅ web-design-guidelines - 网页设计规范
- ✅ frontend-design - 前端设计
- ✅ ui-ux-pro-max - UI/UX专家
- ✅ canvas-design - 画布设计
- ✅ baoyu-cover-image - 封面图
- ✅ baoyu-comic - 漫画
- ✅ baoyu-infographic - 信息图
- ✅ baoyu-slide-deck - 幻灯片
- ❌ tailwind-design-system（不存在）
- ❌ ai-image-generation（不存在）

---

### 4️⃣ 编程和产品构建类（已装10/14）
- ✅ vercel-react-best-practices - React最佳实践
- ✅ remotion-best-practices - Remotion视频
- ✅ building-native-ui - 原生UI
- ✅ nextjs-app-router-patterns - Next.js模式
- ✅ backend-patterns - 后端模式
- ✅ python-patterns - Python模式
- ✅ frontend-patterns - 前端模式
- ✅ security-review - 安全审查
- ✅ python-testing - Python测试
- ✅ tdd-strict - TDD严格模式
- ❌ vercel-composition-patterns（网络问题）
- ❌ agent-browser（网络问题）
- ❌ browser-use（网络问题）
- ❌ supabase-postgres（网络问题）

---

### 5️⃣ 营销和增长类（已装3/9）
- ✅ seo-audit - SEO审查
- ✅ copywriting - 文案
- ✅ social-content - 社交内容
- ✅ marketing-content-strategy - 营销内容策略
- ❌ audit-website（网络问题）
- ❌ marketing-psychology（不存在）
- ❌ programmatic-seo（不存在）
- ❌ product-marketing-context（不存在）
- ❌ pricing-strategy（不存在）
- ❌ page-cro（不存在）

---

### 6️⃣ 办公文档类（已装4/8）
- ✅ pdf - PDF处理
- ✅ pptx - PPT生成
- ✅ docx - Word文档
- ✅ xlsx - Excel表格
- ✅ nano-pdf - PDF工具
- ❌ baoyu-url-to-markdown（不存在）
- ❌ baoyu-markdown-to-html（不存在）
- ❌ baoyu-format-markdown（不存在）
- ❌ just-scrape（网络问题）

---

## 💡 如何使用

### 自动触发
大多数技能会自动触发，例如：
- 说"帮我写个PPT" → 自动用 pptx
- 说"审查这段代码安全性" → 自动用 security-review
- 说"生成封面图" → 自动用 baoyu-cover-image

### 主动指定
`用 [skill名] 来 [任务]`

例如：
- "用 brainstorming 来想个产品名"
- "用 systematic-debugging 来排查这个bug"
- "用 copywriting 来改写这段文案"

### 查看所有技能
```bash
ls /Users/sundanian/my-agent/.claude/skills/
```

---

## 🔧 技能详解

### brainstorming（头脑风暴）
**何时用**: 创建功能、构建组件、添加功能前
**触发**: "帮我想想"、"头脑风暴"

### copywriting（文案创作）
**何时用**: 首页、落地页、定价页、产品页文案
**触发**: "写文案"、"改文案"

### systematic-debugging（系统化调试）
**何时用**: 遇到bug、测试失败、异常行为
**触发**: "有bug"、"调试"

### writing-plans（写作计划）
**何时用**: 有需求但没开始写代码前
**触发**: "做个计划"、"写方案"

### executing-plans（计划执行）
**何时用**: 有实施计划需要执行
**触发**: "按计划执行"

### social-content（社交内容）
**何时用**: LinkedIn、Twitter、Instagram、TikTok内容
**触发**: "发个推文"、"写个LinkedIn"

### vercel-react-best-practices（React最佳实践）
**何时用**: 写/审/重构React/Next.js代码
**触发**: "优化React"、"审查React代码"

### frontend-design（前端设计）
**何时用**: 建网站组件、页面、仪表板
**触发**: "设计个页面"、"做个UI"

### security-review（安全审查）
**何时用**: 添加认证、处理用户输入、创建API
**触发**: "安全审查"、"检查安全性"

### pptx（PPT生成）
**何时用**: 演示文稿、pitch deck、报告
**触发**: "做个PPT"、"生成幻灯片"

### pdf（PDF处理）
**何时用**: 提取文本、创建PDF、合并拆分
**触发**: "处理PDF"、"提取PDF"

---

## 📌 未安装原因

**网络问题**: GitHub无法访问（vercel-composition-patterns、agent-browser等）
**不存在**: 用户清单中部分技能在Skills.sh平台不存在
**有替代**: content-strategy → marketing-content-strategy

---

## 🔄 更新技能

```bash
npx skills update
```

## 🔍 搜索新技能

```bash
npx skills find [关键词]
```

---

*最后更新: 2026-02-19*
