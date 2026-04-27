# Mino Frontend (mino-frontend)

> Sources: Mino, 2026-04-05 (v7.0)
> Raw: [SKILL.md](../../raw/skills/mino-frontend-SKILL.md)

## Overview

mino-frontend 是年老师专属的前端技能——一个零依赖的 HTML 前端生成器，支持 6 种 UI 类型（幻灯片、数据仪表盘、前端页面、通报海报、高端落地页、管理后台）、100+ 组件库、54 种预设设计风格（ADMD 标准），单文件输出。v7.0 于 2026-04-05 发布，遵循 Awesome Design MD（ADMD）9 章节标准。

## 核心设计哲学

| 原则 | 说明 |
|------|------|
| **零依赖** | 单 HTML 文件，inline CSS/JS，无 npm |
| **ADMD 标准** | 54 个顶级企业设计系统，参数化输出 |
| **视口适配** | 每页必须 fit 视口，禁止页内滚动 |
| **反 AI 味** | 无阴影、无渐变、无 emoji、无居中偏执 |

## 54 设计系统来源

全部设计系统来自 **Awesome Design MD**（Google Stitch 团队），按公司类型分为：

- **科技巨头**：Apple、Spotify、Airbnb、Notion、Stripe、Vercel、Linear、Figma、Uber、NVIDIA、IBM
- **AI/开发工具**：Claude、Cursor、Mistral、Cohere、x.ai、Replicate、Runway、Ollama、Raycast、Expo、Supabase、PostHog、Sentry
- **生产力协作**：Linear、Notion、Miro、Airtable、Webflow、Framer、Figma
- **金融商业**：Stripe、Coinbase、Wise、Revolut、Kraken
- **企业工具**：MongoDB、Sanity、Composio、HashiCorp、ClickHouse
- **其他**：Cal.com、ElevenLabs、Superhuman、Zapier、BMW、SpaceX

## 5 大风格族分类

54 个设计系统按气质分为 5 大风格族：

| 风格族 | 代表系统 | 核心特征 | 适用场景 |
|--------|---------|---------|---------|
| **A. 极致简洁白** | Notion, Vercel, Airbnb, Webflow, Airtable, Cal.com, Zapier | 纯白/暖白、高内容密度、专业克制 | 协作工具、SaaS、文档 |
| **B. 暗夜工程** | Linear, Spotify, Framer, Apple, Cursor, Supabase, Sentry | 深黑背景、技术精密、沉浸体验 | 开发者工具、管理后台 |
| **C. 克制专业** | Stripe, Coinbase, Wise, IBM, Cohere | 金融级精确、数据优先、权威克制 | 金融数据、企业汇报 |
| **D. 暖色知性** | Claude, Clay, Lovable, PostHog | 暖调中性色、人文温度、阅读友好 | 内容产品、知识平台 |
| **E. 品牌驱动** | Uber, Figma, Replicate, Runway, BMW | 强品牌识别、独特字体、高辨识度 | 品牌页面、创意产品 |

## 色彩系统架构

每个设计系统包含以下色彩角色：

| 角色 | 说明 | 典型值 |
|------|------|--------|
| **Background** | 页面/卡片背景 | `#ffffff`, `#000000`, `#f5f4ed` |
| **Text Primary** | 主文字 | `#111111`, `#ffffff`, `rgba(0,0,0,0.95)` |
| **Text Secondary** | 次要文字 | `#666666`, `#b3b3b3` |
| **Accent** | 品牌强调色 | `#533afd`, `#0071e3`, `#c96442` |
| **Border** | 边框/分割线 | `rgba(0,0,0,0.1)`, `#e5e5e5` |
| **Surface** | 提升表面 | `#fafafa`, `#181818` |

### 关键设计系统色彩速查

**极致简洁白**：
- Notion：`#ffffff` / `rgba(0,0,0,0.95)` / `#0075de` — 暖灰、纸张感
- Vercel：`#ffffff` / `#171717` / `#0072f5` — 纯白、极客
- Cal.com：`#ffffff` / `#242424` / 无（灰度）— 极致克制
- Zapier：`#fffefb` / `#201515` / `#ff4f00` — 温暖奶油

**暗夜工程**：
- Linear：`#08090a` / `#f7f8f8` / `#5e6ad2` — 纯黑画布、510 字重
- Spotify：`#121212` / `#ffffff` / `#1ed760` — 沉浸剧院
- Framer：`#000000` / `#ffffff` / `#0099ff` — 电光虚空
- Apple：`#000000`/`#f5f5f7` / `#ffffff`/`#1d1d1f` / `#0071e3` — 影院黑白
- Sentry：`#1f1633` / `#ffffff` / `#c2ef4e` — 紫色 IDE

**克制专业**：
- Stripe：`#ffffff` / `#061b31` / `#533afd` — 金融奢华
- Coinbase：`#ffffff` / `#0a0b0d` / `#0052ff` — 加密信任
- IBM：`#ffffff` / `#161616` / `#0f62fe` — 工程规范

**暖色知性**：
- Claude：`#f5f4ed` / `#141413` / `#c96442` — 文学沙龙
- PostHog：`#fdfdf8` / `#4d4f46` / `#F54E00` — 羊皮纸

**品牌驱动**：
- Uber：`#ffffff`/`#000000` / 反色 / 无 — 二元自信
- NVIDIA：`#000000` / `#ffffff` / `#76b900` — 硬件科技
- Mistral：`#fffaeb` / `#1f1f1f` / `#fa520f` — 欧洲金琥珀

## 字体系统

### 字体家族分类

| 系统 | 主字体 | 备用字体 | Monospace | 特色 |
|------|--------|---------|-----------|------|
| Linear | Inter Variable | SF Pro | Berkeley Mono | 510 字重 |
| Stripe | sohne-var | SF Pro | SourceCodePro | ss01 特性 |
| Apple | SF Pro Display/Text | Helvetica | - | 光学尺寸 |
| Claude | Anthropic Serif | - | - | 衬线标题 |
| IBM | IBM Plex Sans/Mono | - | IBM Plex Mono | 三家族 |
| Framer | GT Walsheim | Inter | - | -5.5px 字距 |
| Vercel | Geist | Arial | Geist Mono | 压缩字距 |
| Uber | UberMove | - | - | 几何无衬线 |

### 极端字间距系统

| 系统 | Display 字距 | Body 字距 | 特点 |
|------|-------------|----------|------|
| Framer | -5.5px @ 110px | normal | 最极端压缩 |
| Clay | -3.2px @ 80px | normal | 大标题压缩 |
| Cal.com | -3.2px @ 80px | +0.2px | 正负对比 |
| Vercel | -2.88px @ 48px | normal | 极客压缩 |
| Notion | -2.125px @ 64px | normal | 温暖压缩 |

## 组件系统

### 按钮系统对比

| 系统 | 主按钮背景 | 主按钮文字 | Padding | Radius | 特色 |
|------|-----------|-----------|---------|--------|------|
| Linear | `rgba(255,255,255,0.02)` | `#e2e4e7` | 8px 16px | 6px | 幽灵按钮 |
| Stripe | `#533afd` | `#ffffff` | 8px 16px | 4px | 紫品牌 |
| Apple | `#0071e3` | `#ffffff` | 8px 15px | 8px | 蓝 CTA |
| Spotify | `#1ed760` | `#000000` | - | 9999px | 绿药丸 |
| Uber | `#000000` | `#ffffff` | - | 999px | 全药丸 |
| Claude | `#c96442` | `#ffffff` | - | 8px | 陶土 |

### 卡片系统对比

| 系统 | 背景 | Border | Radius | Shadow | 特色 |
|------|------|--------|--------|--------|------|
| Linear | `rgba(255,255,255,0.02)` | `rgba(255,255,255,0.08)` | 8px | inset | 半透明白 |
| Stripe | `#ffffff` | `#e5edf5` | 6px | 蓝调多层 | 金融级 |
| Notion | `#ffffff` | `rgba(0,0,0,0.1)` | 12px | 极淡多层 | 温暖 |
| Vercel | `#ffffff` | shadow-as-border | 8px | 多层栈 | 阴影边框 |
| Apple | `#f5f5f7` | none | 8px | 软扩散 | 产品雕塑 |
| Spotify | `#181818` | none | 9999px | 重阴影 | 药丸卡片 |

### 阴影系统

| 层级 | 说明 | 典型值 |
|------|------|--------|
| Level 0 | 平面 | no shadow |
| Level 1 | 微妙提升 | `rgba(0,0,0,0.04) 0px 2px 4px` |
| Level 2 | 标准卡片 | `rgba(0,0,0,0.08) 0px 4px 12px` |
| Level 3 | 提升面板 | multi-layer |
| Level 4 | 模态/对话框 | deep shadow |

标志性阴影系统：Stripe（蓝调多层）、Linear（inset 凹陷）、Vercel（shadow-as-border）、Cal.com（11 层叠影，最复杂系统）、Apple（软扩散）。

## 布局系统

| 系统 | Base Unit | Max Width | 留白比例 | 布局特色 |
|------|-----------|-----------|---------|---------|
| Linear | 8px | 1200px | 高 | 暗色画布 |
| Stripe | 8px | 1080px | 中高 | 精密间距 |
| Notion | 8px | 900px | 中 | 有机非刚性 |
| Vercel | 4px | 1200px | 高 | 画廊空旷 |
| Apple | 8px | 980px | 极高 | 影院呼吸 |
| Airbnb | 8px | 1760px | 中 | 全出血摄影 |

## 设计红线

### 通用红线

| ✅ Do | ❌ Don't |
|------|---------|
| 使用设计系统指定字体和字重 | 混合多个设计系统的元素 |
| 应用负字间距到标题（按系统规范） | 使用纯黑/纯白（用暖色调替代） |
| 使用品牌强调色作为唯一强调 | 添加系统未定义的阴影 |
| 保持圆角系统一致 | 改变字重系统（如 Linear 的 510） |
| 在暗色背景使用半透明白边框 | 跳过 OpenType 特性（如 Stripe 的 ss01） |

### 关键系统红线

| 系统 | 关键红线 |
|------|---------|
| Linear | 必须使用 510 字重，禁止纯白色文字（用 `#f7f8f8`） |
| Stripe | 必须使用 300 字重显示文字，禁止纯黑标题（用 `#061b31`） |
| Apple | 必须使用负字间距全尺寸，禁止宽字间距 |
| Notion | 必须使用暖灰文字（`rgba(0,0,0,0.95)`），禁止纯黑 |
| Vercel | 必须使用 shadow-as-border 技术 |
| Framer | 必须使用极压字距（-5.5px），禁止正字间距 |
| Claude | 必须使用陶土色强调，禁止其他强调色 |
| Uber | 必须使用纯黑白二元，禁止彩色 |
| Spotify | 必须使用药丸形（9999px），禁止小圆角 |

## 响应式系统

| 断点 | 宽度 | 关键变化 |
|------|------|---------|
| Mobile | <640px | 单列，堆叠卡片 |
| Tablet | 640-1024px | 2 列网格 |
| Desktop | 1024-1280px | 完整布局 |
| Large | >1280px | 慷慨边距 |

## 风格选择决策树

| 内容类型 | 推荐风格 |
|---------|---------|
| 数据仪表盘 | Linear / Stripe / IBM |
| 管理后台 | Linear / Supabase / Sentry |
| 产品落地页 | Vercel / Apple / Uber |
| 技术文档 | Claude / Cursor / Notion |
| 金融报告 | Stripe / Coinbase / Wise |
| 开发者工具 | Linear / Vercel / Raycast |
| 演示文稿 | Apple / Cal.com / Figma |
| 通报海报 | IBM / Notion / Zapier |
| 协作工具 | Notion / Airtable / Miro |
| 媒体应用 | Spotify / Framer / Runway |

### 按氛围查询

| 氛围关键词 | 推荐系统 |
|-----------|---------|
| 温暖极简 | Notion, Zapier, Lovable |
| 暗夜精密 | Linear, Raycast, Supabase |
| 金融专业 | Stripe, Coinbase, Wise |
| 极客克制 | Vercel, Cal.com, xAI |
| 品牌自信 | Uber, Figma, Replicate |
| 暖色知性 | Claude, Clay, PostHog |
| 影院沉浸 | Apple, Spotify, Framer |
| 工业精密 | IBM, BMW, HashiCorp |
| 终端代码 | Cursor, ClickHouse, Ollama |

### 按技术特色查询

| 技术特色 | 推荐系统 |
|---------|---------|
| shadow-as-border | Vercel |
| inset 阴影 | Linear, Cal.com |
| 极压字距 | Framer, Clay, Vercel |
| 全药丸形 | Spotify, Uber, Ollama |
| 蓝调阴影 | Stripe, Airtable |
| 暖色灰阶 | Claude, Clay, Lovable |
| 二元黑白 | Uber, Figma, xAI |
| 多层叠影 | Cal.com, Notion |
| 光学尺寸 | Apple |
| OpenType 特性 | Linear, Stripe |

## Tweaks 变体机制

用户要求"换个风格看看"时，使用 Tweaks 机制而非重新生成：

1. **解析现有 HTML**：提取当前设计使用的颜色、字体、间距等关键参数
2. **生成 tweaks 对象**：根据用户指令计算参数差异
3. **应用增量更新**：只改变 CSS 变量值，保留布局结构
4. **输出对比视图**（可选）：并排显示两个变体

支持的 tweak 维度：`color_primary`、`color_bg`、`color_text`、`radius`、`border`、`shadow`、`spacing`。

## 质量验证

### Done Checklist（自检）

- [ ] **Viewport**：HTML 在 375px / 768px / 1440px 下布局正常
- [ ] **Placeholder 检测**：无 "Lorem ipsum"、"图片占位"、"标题"等未替换文本
- [ ] **链接可点**：所有按钮/链接有合理的 `href` 或 `onclick` 行为
- [ ] **语义化**：使用正确的 HTML 标签
- [ ] **无障碍**：图片有 `alt`，表单有 `label`，颜色对比度 ≥ 4.5:1
- [ ] **零 emoji**：所有图标使用 SVG 路径

### Placeholder 检测规则

| 检测模式 | 示例 | 严重程度 |
|---------|------|---------|
| 英文占位文本 | `Lorem ipsum`、`dolor sit amet` | 错误 |
| 中文占位文本 | `图片占位`、`标题`、`此处添加内容` | 错误 |
| 未替换变量 | `{{title}}`、`{{description}}` | 错误 |
| 空内容标签 | `<div></div>`、`<span></span>` | 警告 |
| 默认示例数据 | `示例数据`、`示例图片` | 警告 |
| 开发注释残留 | `TODO:`、`FIXME:` | 警告 |

### Fork Verifier Agent（专项验证）

复杂设计完成后自动调用，检查：设计系统一致性、内容层级、交互逻辑、边界条件（超长文本、空状态、错误状态）。输出 `[PASS]`/`[WARN]`/`[FAIL]` 报告，存在 `[FAIL]` 时任务状态标记为"需修复"。

## Claude Design 工作流集成

六步框架：Understand → Explore → Plan/Todo → Build Folder → Done → Verify。

强制前置提问：
- 目标用户的**核心任务**是什么？
- 这个设计的**成功指标**是什么？
- 如果只有**一个最重要的信息**要传达，是什么？

内容决策原则：**No filler**（留白是设计元素，不是空缺）、**Ask before adding**（先问后加）、**Establish system early**（先定系统后填充）。
