---
name: fe:mino-frontend
description: "年老师专属前端技能 — 创建 HTML 幻灯片、数据仪表盘、前端页面、通报海报、高端落地页、管理后台。触发词：演示文稿、幻灯片、仪表盘、数据看板、前端页面、HTML 演示、通报、海报、通知、落地页、管理后台。支持 6 种 UI 类型 + 100+ 组件库 + 54 种设计风格（ADMD 标准）。零依赖，单文件输出。"
license: MIT
---

# Mino Frontend

零依赖 HTML 前端生成器。6 种 UI 类型，100+ 组件，54 种预设风格（ADMD 标准），单文件输出。

**版本**: v7.0, 2026-04-05

**架构**: ADMD 9 章节标准（Awesome Design MD）

---

## 1. Visual Theme & Atmosphere

### 1.1 核心设计哲学

Mino Frontend 是一个零依赖 HTML 前端生成器，遵循以下设计原则：

| 原则 | 说明 |
|------|------|
| **零依赖** | 单 HTML 文件，inline CSS/JS，无 npm |
| **ADMD 标准** | 54 个顶级企业设计系统，参数化输出 |
| **视口适配** | 每页必须 fit 视口，禁止页内滚动 |
| **反 AI 味** | 无阴影、无渐变、无 emoji、无居中偏执 |

### 1.2 设计系统来源

全部 54 个设计系统来自 **Awesome Design MD**（Google Stitch 团队）：

```
workspace/reference/admd/design-md/
├── 科技巨头: Apple, Spotify, Airbnb, Notion, Stripe, Vercel, Linear, Figma, Uber, NVIDIA, IBM
├── AI/开发工具: Claude, Cursor, Mistral, Cohere, x.ai, Replicate, Runway, Ollama, Raycast, Expo, Supabase, PostHog, Sentry
├── 生产力协作: Linear, Notion, Miro, Airtable, Webflow, Framer, Figma
├── 金融商业: Stripe, Coinbase, Wise, Revolut, Kraken
├── 企业工具: MongoDB, Sanity, Composio, HashiCorp, ClickHouse
└── 其他: Cal.com, ElevenLabs, Superhuman, Zapier, BMW, SpaceX...
```

### 1.3 风格族分类

54 个设计系统按气质分为 5 大风格族：

| 风格族 | 代表系统 | 核心特征 | 适用场景 |
|--------|---------|---------|---------|
| **A. 极致简洁白** | Notion, Vercel, Airbnb, Webflow, Airtable, Cal.com, Zapier | 纯白/暖白、高内容密度、专业克制 | 协作工具、SaaS、文档 |
| **B. 暗夜工程** | Linear, Spotify, Framer, Apple, Cursor, Supabase, Sentry | 深黑背景、技术精密、沉浸体验 | 开发者工具、管理后台 |
| **C. 克制专业** | Stripe, Coinbase, Wise, IBM, Cohere | 金融级精确、数据优先、权威克制 | 金融数据、企业汇报 |
| **D. 暖色知性** | Claude, Clay, Lovable, PostHog | 暖调中性色、人文温度、阅读友好 | 内容产品、知识平台 |
| **E. 品牌驱动** | Uber, Figma, Replicate, Runway, BMW | 强品牌识别、独特字体、高辨识度 | 品牌页面、创意产品 |

---

## 2. Color Palette & Roles

### 2.1 色彩系统架构

每个设计系统包含以下色彩角色：

| 角色 | 说明 | 典型值 |
|------|------|--------|
| **Background** | 页面/卡片背景 | `#ffffff`, `#000000`, `#f5f4ed` |
| **Text Primary** | 主文字 | `#111111`, `#ffffff`, `rgba(0,0,0,0.95)` |
| **Text Secondary** | 次要文字 | `#666666`, `#b3b3b3` |
| **Accent** | 品牌强调色 | `#533afd`, `#0071e3`, `#c96442` |
| **Border** | 边框/分割线 | `rgba(0,0,0,0.1)`, `#e5e5e5` |
| **Surface** | 提升表面 | `#fafafa`, `#181818` |

### 2.2 54 设计系统色彩速查

#### A. 极致简洁白（White Minimalism）

| 系统 | 背景 | 主文字 | 强调色 | 氛围关键词 |
|------|------|--------|--------|-----------|
| **Notion** | `#ffffff` | `rgba(0,0,0,0.95)` | `#0075de` | 暖灰、纸张感 |
| **Vercel** | `#ffffff` | `#171717` | `#0072f5` | 纯白、极客 |
| **Airbnb** | `#ffffff` | `#222222` | `#ff385c` | 摄影优先 |
| **Webflow** | `#ffffff` | `#080808` | `#146ef5` | 工具精确 |
| **Airtable** | `#ffffff` | `#181d26` | `#1b61c9` | 企业瑞士 |
| **Cal.com** | `#ffffff` | `#242424` | 无（灰度） | 极致克制 |
| **Zapier** | `#fffefb` | `#201515` | `#ff4f00` | 温暖奶油 |
| **ElevenLabs** | `#ffffff` | `#000000` | 无 | 声音波形 |
| **Expo** | `#f0f0f3` | `#000000` | `#0d74ce` | 云灰药丸 |
| **Figma** | `#ffffff` | `#000000` | 无（产品色） | 二元黑白 |

#### B. 暗夜工程（Dark Engineering）

| 系统 | 背景 | 主文字 | 强调色 | 氛围关键词 |
|------|------|--------|--------|-----------|
| **Linear** | `#08090a` | `#f7f8f8` | `#5e6ad2` | 纯黑画布、510字重 |
| **Spotify** | `#121212` | `#ffffff` | `#1ed760` | 沉浸剧院 |
| **Framer** | `#000000` | `#ffffff` | `#0099ff` | 电光虚空 |
| **Apple** | `#000000`/`#f5f5f7` | `#ffffff`/`#1d1d1f` | `#0071e3` | 影院黑白 |
| **Cursor** | `#f2f1ed` | `#26251e` | `#f54e00` | 暖米代码 |
| **Supabase** | `#0f0f0f` | `#fafafa` | `#3ecf8e` | 翡翠终端 |
| **Sentry** | `#1f1633` | `#ffffff` | `#c2ef4e` | 紫色IDE |
| **ClickHouse** | `#000000` | `#ffffff` | `#faff69` | 霓虹终端 |
| **Composio** | `#0f0f0f` | `#ffffff` | `#0007cd` | 虚空钴蓝 |
| **xAI** | `#1f2228` | `#ffffff` | 无 | 暗色粗野 |
| **Sanity** | `#0b0b0b` | `#ffffff` | `#f36458` | 夜间指挥 |
| **Raycast** | `#07080a` | `#f9f9f9` | `#ff6363` | macOS精密 |

#### C. 克制专业（Restrained Professional）

| 系统 | 背景 | 主文字 | 强调色 | 氛围关键词 |
|------|------|--------|--------|-----------|
| **Stripe** | `#ffffff` | `#061b31` | `#533afd` | 金融奢华 |
| **Coinbase** | `#ffffff` | `#0a0b0d` | `#0052ff` | 加密信任 |
| **Wise** | `#ffffff` | `#0e0f0c` | `#9fe870` | 跨境支付 |
| **IBM** | `#ffffff` | `#161616` | `#0f62fe` | 工程规范 |
| **Cohere** | `#ffffff` | `#000000` | `#1863dc` | 企业AI |
| **Revolut** | `#ffffff` | `#191c1f` | `#494fdf` | 金融科技 |
| **Kraken** | `#ffffff` | `#101114` | `#7132f5` | 加密专业 |

#### D. 暖色知性（Warm Intellectual）

| 系统 | 背景 | 主文字 | 强调色 | 氛围关键词 |
|------|------|--------|--------|-----------|
| **Claude** | `#f5f4ed` | `#141413` | `#c96442` | 文学沙龙 |
| **Clay** | `#faf9f7` | `#000000` | 多命名色 | 手工艺 |
| **Lovable** | `#f7f4ed` | `#1c1c1c` | `#1c1c1c` | 温暖笔记本 |
| **PostHog** | `#fdfdf8` | `#4d4f46` | `#F54E00` | 羊皮纸 |
| **Warp** | warm near-black | `#faf9f6` | 无（暖灰） | 篝火温暖 |
| **Pinterest** | `#ffffff` | `#211922` | `#e60023` |  plum黑 |

#### E. 品牌驱动（Brand Forward）

| 系统 | 背景 | 主文字 | 强调色 | 氛围关键词 |
|------|------|--------|--------|-----------|
| **Uber** | `#ffffff`/`#000000` | 反色 | 无 | 二元自信 |
| **Figma** | `#ffffff` | `#000000` | 产品截图色 | 设计民主 |
| **Replicate** | `#ffffff` | `#202020` | `#ea2804` | 开发者乐园 |
| **Runway** | `#000000` | `#ffffff` | 无 | 电影编辑 |
| **BMW** | `#ffffff` | `#262626` | `#1c69d4` | 德国工业 |
| **SpaceX** | `#000000` | `#f0f0fa` | 无 | 航天工程 |
| **Superhuman** | `#ffffff` | `#292827` | `#cbb7fb` | 奢侈品级 |
| **NVIDIA** | `#000000` | `#ffffff` | `#76b900` | 硬件科技 |
| **Mistral** | `#fffaeb` | `#1f1f1f` | `#fa520f` | 欧洲金琥珀 |
| **Resend** | `#000000` | `#f0f0f0` | `#ff801f` | 黑色虚空 |

---

## 3. Typography Rules

### 3.1 字体系统架构

| 维度 | 说明 | 典型值 |
|------|------|--------|
| **Font Family** | 主字体 + 备用字体 | `Inter`, `SF Pro`, `Geist` |
| **Font Size** | 层级字体大小 | 72px/48px/32px/16px |
| **Font Weight** | 字重系统 | 300/400/500/600/700 |
| **Line Height** | 行高比例 | 1.0-1.6 |
| **Letter Spacing** | 字间距 | -2.88px to +2.4px |
| **OpenType Features** | 特性启用 | `"ss01"`, `"cv01"`, `"liga"` |

### 3.2 54 设计系统字体速查

#### 字体家族分类

| 系统 | 主字体 | 备用字体 | Monospace | 特色 |
|------|--------|---------|-----------|------|
| **Notion** | NotionInter | system-ui | - | 修改版Inter |
| **Vercel** | Geist | Arial | Geist Mono | 压缩字距 |
| **Linear** | Inter Variable | SF Pro | Berkeley Mono | 510字重 |
| **Stripe** | sohne-var | SF Pro | SourceCodePro | ss01特性 |
| **Apple** | SF Pro Display/Text | Helvetica | - | 光学尺寸 |
| **Airbnb** | Cereal VF | Circular | - | 可变字体 |
| **Claude** | Anthropic Serif | - | - | 衬线标题 |
| **Framer** | GT Walsheim | Inter | - | -5.5px字距 |
| **Spotify** | SpotifyMixUI | CircularSp | - | 药丸形 |
| **IBM** | IBM Plex Sans/Mono | - | IBM Plex Mono | 三家族 |
| **MongoDB** | MongoDB Value Serif | Euclid Circular | Source Code Pro | 霓虹绿 |
| **Ollama** | SF Pro Rounded | system-ui | ui-monospace | 全药丸 |
| **Sanity** | waldenburgNormal | - | IBM Plex Mono | 夜间指挥 |
| **Supabase** | Circular | - | Source Code Pro | 翡翠绿 |
| **Uber** | UberMove | - | - | 几何无衬线 |
| **xAI** | GeistMono | universalSans | GeistMono | 单色终端 |
| **Figma** | figmaSans | - | figmaMono | 可变320-700 |

#### 极端字间距系统

| 系统 | Display 字距 | Body 字距 | 特点 |
|------|-------------|----------|------|
| **Framer** | -5.5px @ 110px | normal | 最极端压缩 |
| **Clay** | -3.2px @ 80px | normal | 大标题压缩 |
| **Cal.com** | -3.2px @ 80px | +0.2px | 正负对比 |
| **Vercel** | -2.88px @ 48px | normal | 极客压缩 |
| **Notion** | -2.125px @ 64px | normal | 温暖压缩 |
| **Expo** | -3.0px @ 64px | normal | 药丸几何 |
| **Figma** | -1.72px @ 86px | normal | 精细可变 |

---

## 4. Component Stylings

### 4.1 组件系统架构

| 组件 | 核心属性 | 典型值 |
|------|---------|--------|
| **Button** | 背景/文字/圆角/阴影 | `8px 16px`, `6px radius` |
| **Card** | 背景/边框/阴影/圆角 | `rgba(255,255,255,0.02)`, `8px` |
| **Input** | 边框/焦点状态 | `1px solid rgba(0,0,0,0.1)` |
| **Badge/Pill** | 形状/颜色 | `9999px` (药丸) |
| **Navigation** | 布局/粘性/模糊 | `sticky`, `backdrop-filter` |

### 4.2 54 设计系统组件参数

#### 按钮系统对比

| 系统 | 主按钮背景 | 主按钮文字 | Padding | Radius | 特色 |
|------|-----------|-----------|---------|--------|------|
| **Linear** | `rgba(255,255,255,0.02)` | `#e2e4e7` | 8px 16px | 6px | 幽灵按钮 |
| **Stripe** | `#533afd` | `#ffffff` | 8px 16px | 4px | 紫品牌 |
| **Apple** | `#0071e3` | `#ffffff` | 8px 15px | 8px | 蓝CTA |
| **Notion** | `#0075de` | `#ffffff` | 8px 16px | 4px | 蓝药丸 |
| **Vercel** | `#171717` | `#ffffff` | 8px 16px | 6px | 黑CTA |
| **Spotify** | `#1ed760` | `#000000` | - | 9999px | 绿药丸 |
| **Uber** | `#000000` | `#ffffff` | - | 999px | 全药丸 |
| **Framer** | `#0099ff` | `#ffffff` | - | 40-100px | 电光蓝 |
| **Claude** | `#c96442` | `#ffffff` | - | 8px | 陶土 |
| **Ollama** | `#000000` | `#ffffff` | - | 9999px | 纯黑药丸 |

#### 卡片系统对比

| 系统 | 背景 | Border | Radius | Shadow | 特色 |
|------|------|--------|--------|--------|------|
| **Linear** | `rgba(255,255,255,0.02)` | `rgba(255,255,255,0.08)` | 8px | inset | 半透明白 |
| **Stripe** | `#ffffff` | `#e5edf5` | 6px | 蓝调多层 | 金融级 |
| **Notion** | `#ffffff` | `rgba(0,0,0,0.1)` | 12px | 极淡多层 | 温暖 |
| **Vercel** | `#ffffff` | shadow-as-border | 8px | 多层栈 | 阴影边框 |
| **Apple** | `#f5f5f7` | none | 8px | 软扩散 | 产品雕塑 |
| **Spotify** | `#181818` | none | 9999px | 重阴影 | 药丸卡片 |

---

## 5. Layout Principles

### 5.1 布局系统架构

| 维度 | 说明 | 典型值 |
|------|------|--------|
| **Base Unit** | 间距基础单位 | 4px, 8px |
| **Grid** | 网格系统 | 12列, 980px-1200px |
| **Container** | 容器最大宽度 | 1080px, 1200px |
| **Whitespace** | 留白哲学 | 30-50% |

### 5.2 54 设计系统布局参数

| 系统 | Base Unit | Max Width | 留白比例 | 布局特色 |
|------|-----------|-----------|---------|---------|
| **Linear** | 8px | 1200px | 高 | 暗色画布 |
| **Stripe** | 8px | 1080px | 中高 | 精密间距 |
| **Notion** | 8px | 900px | 中 | 有机非刚性 |
| **Vercel** | 4px | 1200px | 高 | 画廊空旷 |
| **Apple** | 8px | 980px | 极高 | 影院呼吸 |
| **Airbnb** | 8px | 1760px | 中 | 全出血摄影 |
| **Framer** | - | full | 高 | 纯黑虚空 |

---

## 6. Depth & Elevation

### 6.1 阴影系统架构

| 层级 | 说明 | 典型值 |
|------|------|--------|
| **Level 0** | 平面 | no shadow |
| **Level 1** | 微妙提升 | `rgba(0,0,0,0.04) 0px 2px 4px` |
| **Level 2** | 标准卡片 | `rgba(0,0,0,0.08) 0px 4px 12px` |
| **Level 3** | 提升面板 | multi-layer |
| **Level 4** | 模态/对话框 | deep shadow |

### 6.2 标志性阴影系统

| 系统 | 阴影特色 | 阴影值 |
|------|---------|--------|
| **Stripe** | 蓝调多层 | `rgba(50,50,93,0.25) 0px 30px 45px -30px, rgba(0,0,0,0.1) 0px 18px 36px -18px` |
| **Linear** | inset凹陷 | `rgba(0,0,0,0.2) 0px 0px 12px 0px inset` |
| **Vercel** | shadow-as-border | `rgba(0,0,0,0.08) 0px 0px 0px 1px` |
| **Notion** | 极淡多层 | 4层叠影，单层≤0.05 |
| **Cal.com** | 11层叠影 | 最复杂系统 |
| **Apple** | 软扩散 | `rgba(0,0,0,0.22) 3px 5px 30px 0px` |

---

## 7. Do's and Don'ts

### 7.1 设计红线（Universal）

#### ✅ Do
- 使用设计系统指定字体和字重
- 应用负字间距到标题（按系统规范）
- 使用品牌强调色作为唯一强调
- 保持圆角系统一致
- 在暗色背景使用半透明白边框

#### ❌ Don't
- 混合多个设计系统的元素
- 使用纯黑/纯白（用暖色调替代）
- 添加系统未定义的阴影
- 改变字重系统（如Linear的510）
- 跳过OpenType特性（如Stripe的ss01）

### 7.2 54 设计系统特有红线

| 系统 | 关键红线 |
|------|---------|
| **Linear** | 必须使用510字重，禁止纯白色文字（用`#f7f8f8`） |
| **Stripe** | 必须使用300字重显示文字，禁止纯黑标题（用`#061b31`） |
| **Apple** | 必须使用负字间距全尺寸，禁止宽字间距 |
| **Notion** | 必须使用暖灰文字（`rgba(0,0,0,0.95)`），禁止纯黑 |
| **Vercel** | 必须使用shadow-as-border技术 |
| **Framer** | 必须使用极压字距（-5.5px），禁止正字间距 |
| **Claude** | 必须使用陶土色强调，禁止其他强调色 |
| **Uber** | 必须使用纯黑白二元，禁止彩色 |
| **Spotify** | 必须使用药丸形（9999px），禁止小圆角 |

---

## 8. Responsive Behavior

### 8.1 响应式系统

| 断点 | 宽度 | 关键变化 |
|------|------|---------|
| Mobile | <640px | 单列，堆叠卡片 |
| Tablet | 640-1024px | 2列网格 |
| Desktop | 1024-1280px | 完整布局 |
| Large | >1280px | 慷慨边距 |

### 8.2 54 设计系统响应式策略

| 系统 | Mobile | Desktop | 特色 |
|------|--------|---------|------|
| **Linear** | 紧凑导航 | 完整命令面板 | 保持暗色 |
| **Stripe** | 堆叠卡片 | 3列网格 | 金融数据滚动 |
| **Apple** | 产品图缩放 | 全出血 | 黑白交替保持 |
| **Notion** | 单列 | 侧边栏 | 温暖保持 |
| **Vercel** | 简化Hero | 全功能展示 | 代码预览 |

---

## 9. Agent Prompt Guide

### 9.1 风格选择决策树

```
内容类型 → 推荐风格
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
数据仪表盘 → Linear / Stripe / IBM
管理后台   → Linear / Supabase / Sentry
产品落地页 → Vercel / Apple / Uber
技术文档   → Claude / Cursor / Notion
金融报告   → Stripe / Coinbase / Wise
开发者工具 → Linear / Vercel / Raycast
演示文稿   → Apple / Cal.com / Figma
通报海报   → IBM / Notion / Zapier
协作工具   → Notion / Airtable / Miro
媒体应用   → Spotify / Framer / Runway
```

### 9.2 快速参数查询

#### 按氛围查询

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

#### 按技术特色查询

| 技术特色 | 推荐系统 |
|---------|---------|
| shadow-as-border | Vercel |
| inset阴影 | Linear, Cal.com |
| 极压字距 | Framer, Clay, Vercel |
| 全药丸形 | Spotify, Uber, Ollama |
| 蓝调阴影 | Stripe, Airtable |
| 暖色灰阶 | Claude, Clay, Lovable |
| 二元黑白 | Uber, Figma, xAI |
| 多层叠影 | Cal.com, Notion |
| 光学尺寸 | Apple |
| OpenType特性 | Linear, Stripe |

### 9.3 示例组件 Prompts

#### Linear 风格 Dashboard
```
使用Linear风格创建数据仪表盘：
- 背景: #08090a 纯黑画布
- 文字: #f7f8f8 近白（非纯白）
- 强调: #5e6ad2 靛蓝
- 字体: Inter Variable 510字重
- 边框: rgba(255,255,255,0.08) 半透明白
- 卡片: rgba(255,255,255,0.02) 背景 + inset阴影
- 圆角: 8px 卡片，6px 按钮
- OpenType: "cv01", "ss03"
```

#### Stripe 风格金融报告
```
使用Stripe风格创建金融报告：
- 背景: #ffffff 纯白
- 标题: #061b31 深海蓝（非纯黑）
- 强调: #533afd Stripe紫
- 字体: sohne-var 300字重
- 阴影: rgba(50,50,93,0.25) 蓝调多层
- 圆角: 4-8px 保守
- OpenType: "ss01" 全局启用
- 字距: -1.4px @ 56px 显示文字
```

#### Claude 风格知识文档
```
使用Claude风格创建知识文档：
- 背景: #f5f4ed 羊皮纸暖色
- 文字: #141413 暖黑
- 强调: #c96442 陶土色
- 字体: Anthropic Serif 衬线标题
- 边框: ring shadow 0px 0px 0px 1px
- 圆角: 8px 柔和
- 线条: 陶土色分割线
```

---

## 10. Claude Design Workflow Integration

### 设计流程的 6 步框架

Claude Design 的核心是一套严格的设计-构建-验证流程。将其内化为工作习惯：

| 步骤 | 动作 | 关键检查 |
|------|------|---------|
| **1. Understand** | 明确设计目标、用户场景、成功标准 | 这个设计解决什么问题？谁是用户？如何衡量成功？ |
| **2. Explore** | 调研同类产品的设计模式，收集参考 | 竞品如何解决类似问题？有什么模式可借鉴？ |
| **3. Plan / Todo** | 制定实现计划，列出必要的工具调用 | 需要哪些组件？数据从哪里来？分几步完成？ |
| **4. Build Folder** | 在 `workspace/` 下创建工作区，组织文件结构 | 工作区命名：`YYYY-MM-DD-主题`；区分 HTML/CSS/JS/Assets |
| **5. Done** | 产出可演示的设计或 artifact | 生成标准 HTML 文件，可直接在浏览器打开 |
| **6. Verify** | 使用 `fork_verifier_agent` 验证设计质量 | 检查视觉一致性、交互可用性、边界条件 |

**强制前置提问**：开始任何设计任务前，必须先问自己：
- 目标用户的**核心任务**是什么？（不是"查看"，而是"完成什么动作"）
- 这个设计的**成功指标**是什么？（点击率、转化率、任务完成时间）
- 如果只有**一个最重要的信息**要传达，是什么？

---

### Content Guidelines（内容决策原则）

#### No filler（拒绝填充）
- **不要为了"丰富"而堆砌内容**：留白是设计元素，不是空缺
- 每个区块必须有明确目的：导航、信息、操作、反馈 —— 四选一
- 如果不知道放什么，先问：用户此刻最需要看到什么？

#### Ask before adding（先问后加）
- 添加任何新元素前，口头说明**为什么加** + **解决了什么问题**
- 不要假设用户需要更多功能；先验证现有路径是否足够
- 新增内容时同步思考：如何用更少元素达成相同目标？

#### Establish system early（先定系统后填充）
- 颜色、字体、间距规则在**第一个组件**就确定
- 之后的每个决策都反问：这符合已定的系统吗？
- 系统不是后期"美化"，而是前期的**约束框架**

**与 anti-AI-slop 原则的对应**：
| Claude Design 原则 | anti-AI-slop 对应 |
|-------------------|-------------------|
| No filler | 拒绝 cookie-cutter 三段式布局 |
| Ask before adding | 拒绝无脑堆砌功能 |
| Establish system early | 拒绝"先做完再调风格"的随意性 |

---

### 变体管理：Tweaks 机制

当用户要求"换个风格看看"时，使用 **Tweaks 机制** 而非重新生成：

#### 工作原理
```json
{
  "variants": [
    {
      "name": "primary",
      "tweaks": { "color_primary": "#5e6ad2", "radius": "8px" }
    },
    {
      "name": "minimal",
      "tweaks": { "color_primary": "#141413", "radius": "0px", "border": "1px solid #e5e5e5" }
    }
  ],
  "current": "primary",
  "apply_tweaks": true
}
```

#### 应用场景
- 同一设计需要提供 **Light / Dark 两种模式**
- 同一布局需要 **品牌色 A / 品牌色 B** 的变体
- 同一组件需要 **紧凑 / 宽松** 两种密度

**在 mino-frontend 中的实现思路**：
- 生成 HTML 时同时在 `<script>` 标签中输出 variant 定义 JSON
- 通过 CSS 变量映射 tweaks 到实际样式：`--color-primary: {{tweaks.color_primary}}`
- 在页面右上角添加 variant 切换器（仅开发模式可见）

#### 变体生成策略（长期）

当用户要求生成变体时，**不是重新生成整个设计**，而是：

1. **解析现有 HTML**：提取当前设计使用的颜色、字体、间距等关键参数
2. **生成 tweaks 对象**：根据用户指令（如"换成暗色"、"更紧凑"）计算参数差异
3. **应用增量更新**：只改变变化的 CSS 变量值，保留布局结构
4. **输出对比视图**（可选）：并排显示两个变体，方便用户选择

**Tweaks 命令模板**：
```
生成 <主题> 的 <变体名> 变体：
- 基准设计：workspace/YYYY-MM-DD-主题/index.html
- 变体参数：<具体 tweaks 描述>
- 切换器：在页面右上角添加 variant 选择器（开发模式）
```

**支持的 tweak 维度**：
| 维度 | 参数名 | 示例值 |
|------|--------|--------|
| 主色 | `color_primary` | `"#5e6ad2"` |
| 背景 | `color_bg` | `"#08090a"` |
| 文字 | `color_text` | `"#f7f8f8"` |
| 圆角 | `radius` | `"8px"` / `"0px"` |
| 边框 | `border` | `"1px solid #e5e5e5"` |
| 阴影 | `shadow` | `"0px 4px 12px rgba(0,0,0,0.1)"` |
| 间距 | `spacing` | `"紧凑"` / `"宽松"` |

---

### 质量验证：Done + Fork Verifier

#### 阶段一：Done Checklist（自检）
产出设计后，对照以下清单逐项确认：
- [ ] **Viewport**：HTML 在 375px / 768px / 1440px 下布局正常
- [ ] **Placeholder 检测**：无 "Lorem ipsum"、"图片占位"、"标题"等未替换文本
- [ ] **链接可点**：所有按钮/链接有合理的 `href` 或 `onclick` 行为
- [ ] **语义化**：使用正确的 HTML 标签（`<header>`、`<main>`、`<section>`）
- [ ] **无障碍**：图片有 `alt`，表单有 `label`，颜色对比度 ≥ 4.5:1
- [ ] **零 emoji**：所有图标使用 SVG 路径，不使用 emoji 字符

**Placeholder 检测规则（Linter 级别）**：
在设计完成后，minon-frontend 必须自动扫描以下模式并报错：

| 检测模式 | 示例 | 严重程度 |
|---------|------|---------|
| 英文占位文本 | `Lorem ipsum`、`Lorem Ipsum`、`dolor sit amet` | 错误 |
| 中文占位文本 | `图片占位`、`标题`、`此处添加内容`、`请输入` | 错误 |
| 未替换变量 | `{{title}}`、`{{description}}`、`{用户名}` | 错误 |
| 空内容标签 | `<div></div>`、`<span></span>`（无子节点） | 警告 |
| 默认示例数据 | `示例数据`、`示例图片`、`test image` | 警告 |
| 开发注释残留 | `TODO:`、`FIXME:`、`placeholder here` | 警告 |

**实现方式**：
- 在生成 HTML 后，对 `document.documentElement.outerHTML` 进行正则扫描
- 命中错误模式 → 输出 `[PLACEHOLDER-DETECTED]` 区块并列出具体位置，要求重新生成
- 命中警告模式 → 输出 `[PLACEHOLDER-WARN]` 区块，建议但不强制修复

#### 阶段二：Fork Verifier Agent（专项验证）
复杂设计完成后，**自动调用** `fork_verifier_agent` 进行深度审查：

```
fork_verifier_agent 会检查：
1. 设计系统一致性（颜色/字体/间距是否符合已定规则）
2. 内容层级（信息权重是否清晰，有无视觉噪音）
3. 交互逻辑（用户操作路径是否自然，有无死胡同）
4. 边界条件（超长文本、空状态、错误状态）
```

**在 mino-frontend 中的集成**：
每次生成完成后，必须自动输出 `Verification Report` 区块：
```
[Verification Report]
[PASS] 设计系统一致性检查
[PASS] 内容层级清晰
[WARN] 移动端断点 375px 下第3行文字溢出（建议缩短）
[FAIL] 按钮在深色模式下对比度不足（3.2:1 < 4.5:1）← 必须修复
```

**触发时机**：
- 生成 HTML 文件并保存到 workspace 后 **立即触发**
- 在输出末尾追加 `【验证结论】` 区块，总结所有 `[FAIL]` 项
- 存在 `[FAIL]` 时，任务状态标记为"需修复"，不能标记完成

**fork_verifier_agent 调用模板**：
```
请审查以下设计 artifact：
- 文件：workspace/YYYY-MM-DD-主题/index.html
- 设计系统：<当前使用的系统，如 Linear / Stripe / Claude>
- 核心问题：<如果年老师提了特定要求，在此说明>

审查清单：
1. 是否符合选定的设计系统规范（颜色、字体、间距、圆角）
2. 内容层级是否清晰（主次信息、视觉权重）
3. 交互是否可用（按钮可点、链接有效、表单可填）
4. 边界情况（空状态、超长文本、错误态）是否处理
```

---

### Questions_v2 的角色定位

Claude Design 强调在 `questions_v2` 字段中**列出所有未决问题**，这不是形式，而是质量保障机制。

**必须提问的典型问题**：
- 这个数据在真实环境中**来源是什么**？我现在用 mock 数据会不会误导后续实现？
- 这个交互在移动端**如何适配**？是否需要单独设计移动视图？
- 这个设计需要支持**几种语言**？中英文混排时布局会如何变化？
- 这个组件需要支持**哪些状态**？加载中、错误、禁用、空状态都覆盖了吗？

**将问题显式化带来的价值**：
- 避免我"自问自答"陷入确认偏误
- 让年老师看到我思考的**盲点**在哪里
- 为后续迭代留下**明确的改进项清单**

---

### 与现有设计技能的定位区分

| 技能 | 定位 | Claude Design 的补充价值 |
|------|------|------------------------|
| **mino-frontend** | 零依赖 HTML 生成器，54 设计系统 | **流程框架**：6 步强制结构化，避免跳过探索/验证 |
| **impeccable** | 高品质设计，anti-AI-slop 美学 | **内容原则**：No filler / Ask before adding 的具体执行规则 |
| **frontend-design** | 轻量级前端生成 | 无直接竞争，可作为快速原型工具 |
| **ui-design-brain** | 60+ 真实组件模式库 | **组件模式**：Claude Design 的组件偏向 artifacts，ui-design-brain 提供真实世界参照 |

**协同策略**：
- 复杂产品级设计 → 走 Claude Design 6 步流程（纪律保证质量）
- 快速原型验证 → 用 mino-frontend 的 54 设计系统快速出稿
- 美学把关 → 用 impeccable 的 anti-AI-slop 清单做最终审查

---

## 附录：完整 54 设计系统索引

### 按公司类型索引

| 类型 | 系统列表 |
|------|---------|
| **AI/ML** | Claude, Cursor, Mistral, Cohere, x.ai, Replicate, Runway, Ollama, Together AI, MiniMax |
| **开发者工具** | Linear, Vercel, Supabase, PostHog, Sentry, Raycast, Expo, Sanity, Composio, ClickHouse, HashiCorp |
| **金融科技** | Stripe, Coinbase, Wise, Revolut, Kraken |
| **协作工具** | Notion, Airtable, Miro, Figma, Zapier |
| **媒体/娱乐** | Spotify, Framer, Runway, ElevenLabs |
| **企业技术** | IBM, MongoDB, NVIDIA, SpaceX, BMW |
| **消费互联网** | Apple, Airbnb, Uber, Pinterest, Webflow, Superhuman |

### 按技术特色索引

| 特色 | 系统列表 |
|------|---------|
| **暗黑模式** | Linear, Spotify, Framer, Supabase, Sentry, Raycast, xAI, Sanity, ClickHouse, Composio |
| **纯白极简** | Notion, Vercel, Cal.com, Figma, Ollama |
| **温暖灰调** | Claude, Clay, Lovable, PostHog, Zapier |
| **金融专业** | Stripe, Coinbase, Wise, IBM, Revolut, Kraken |
| **药丸形UI** | Spotify, Uber, Ollama, Framer |
| **极压字距** | Framer, Clay, Vercel, Cal.com |

---

*文档版本: v7.0 | ADMD 标准 | 54 设计系统 | 2026-04-05*
