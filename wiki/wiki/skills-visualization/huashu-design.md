# Huashu Design (花叔设计)

> Sources: Mino, 2026-04-25
> Raw: [SKILL.md](../../raw/skills/huashu-design/SKILL.md)

## Overview

花叔Design（Huashu-Design）是一体化设计能力——用 HTML 做高保真原型、交互 Demo、幻灯片、动画、设计变体探索+设计方向顾问+专家评审。核心理念：**HTML 是工具不是媒介**，根据任务 embody 不同专家（UX 设计师/动画师/幻灯片设计师/原型师），避免 web design tropes。交付后可选专家级 5 维度评审（哲学一致性/视觉层级/细节执行/功能性/创新性各打 10 分+修复清单）。

## 核心原则（优先级从高到低）

### 核心原则 #0 · 事实验证先于假设

**任何涉及具体产品/技术/事件的存在性、发布状态、版本号、规格参数的事实性断言，第一步必须 WebSearch 验证，禁止凭训练语料做断言。**

触发条件：用户提到不熟悉的产品名、涉及 2024 年及之后的发布时间线/版本号/规格参数、内心冒出"我记得好像是..."。

硬流程（开工前执行，优先于 clarifying questions）：
1. `WebSearch` 产品名 + 最新时间词
2. 读 1-3 条权威结果，确认存在性/发布状态/最新版本号/关键规格
3. 把事实写进项目的 `product-facts.md`
4. 搜不到或结果模糊 → 问用户，而不是自行假设

**成本对比：WebSearch 10 秒 << 返工 2 小时**。

### 原则 1 · 从 existing context 出发，不要凭空画

好的 hi-fi 设计一定从已有上下文长出来。先问用户是否有 design system/UI kit/codebase/Figma/截图。**凭空做 hi-fi 是 last resort，一定会产出 generic 的作品**。

#### 核心资产协议（涉及具体品牌时强制执行）

**品牌的本质是「它被认出来」**。按识别度排序：

| 资产类型 | 识别度贡献 | 必需性 |
|---|---|---|
| **Logo** | 最高 · 任何品牌出现 logo 就一眼识别 | **任何品牌都必须有** |
| **产品图/产品渲染图** | 极高 · 实体产品的"主角" | **实体产品必须有** |
| **UI 截图/界面素材** | 极高 · 数字产品的"主角" | **数字产品必须有** |
| **色值** | 中 · 辅助识别 | 辅助 |
| **字体** | 低 · 需配合前述才能建立识别 | 辅助 |

**5 步硬流程**：
1. **问**：按清单逐项问（Logo、产品图、UI 截图、色值、字体、Brand guidelines）
2. **搜官方渠道**：Logo 走 `<brand>.com/brand` 或 `<brand>.com/press`；产品图走产品详情页 hero image
3. **下载资产**：Logo 三条路径（独立 SVG/PNG → 官网 HTML 提取 inline SVG → 社交媒体 avatar）；产品图按优先级（官方产品页 → press kit → launch video 截帧 → Wikimedia Commons → AI 生成兜底）
4. **验证+提取**：文件存在 + 可打开 + 至少两个版本（深底/浅底）；色值用 `grep` 提取
5. **固化为 `brand-spec.md`**：包含核心资产路径、色板、字型、签名细节、禁区、气质关键词

**素材质量门槛「5-10-2-8」原则**：搜索 5 轮 → 找 10 个候选 → 选 2 个好的 → 每个评分 8/10 以上。不够 8 分宁可不用。评分维度：分辨率（≥2000px）、版权清晰度、品牌气质契合度、光线/构图/风格一致性、独立叙事能力。

### 原则 2 · Junior Designer 模式

你是 manager 的 junior designer。**不要一头扎进去闷头做大招**。HTML 文件的开头先写下 assumptions + reasoning + placeholders，尽早 show 给用户。然后：用户确认方向后，再写 React 组件填 placeholder；再 show 一次，让用户看进度；最后迭代细节。

### 原则 3 · 给 variations，不给「最终答案」

给 3+ 个变体，跨不同维度（视觉/交互/色彩/布局/动画），从 by-the-book 到 novel 逐级递进。让用户 mix and match。

### 原则 4 · Placeholder > 烂实现

没图标就留灰色方块+文字标签，别画烂 SVG。没数据就写注释，别编造。**Hi-fi 里，一个诚实的 placeholder 比一个拙劣的真实尝试好 10 倍**。

### 原则 5 · 系统优先，不要填充

**Don't add filler content**。每个元素都必须 earn its place。空白是设计问题，用构图解决，不是靠编造内容填满。警惕「data slop」（没用的数字、图标、stats 装饰）、「iconography slop」（每个标题都配 icon）、「gradient slop」（所有背景都渐变）。

### 原则 6 · 反 AI slop

AI slop = AI 训练语料里最常见的"视觉最大公约数"。规避逻辑链：用户请你做设计是要他的品牌被认出来 → AI 默认产出 = 训练语料的平均 = 所有品牌混合 = 没有任何品牌被认出来 → 反 slop 是替用户保护品牌识别度。

核心要规避的元素：

| 元素 | 为什么是 slop | 什么情况可以用 |
|------|-------------|---------------|
| 激进紫色渐变 | AI 训练语料里"科技感"的万能公式 | 品牌本身用 |
| Emoji 作图标 | 训练语料里每个 bullet 都配 emoji | 品牌本身用（如 Notion） |
| 圆角卡片 + 左彩色 border accent | 2020-2024 Material/Tailwind 烂大街组合 | 用户明确要求 |
| SVG 画 imagery（人脸/场景/物品）| AI 画的 SVG 人物永远五官错位 | 几乎没有 |
| CSS 剪影/SVG 手画代替真实产品图 | 任何实体产品都长一样，品牌识别度归零 | 几乎没有 |
| Inter/Roboto/Arial/system fonts 作 display | 太常见，看不出是"有设计的产品" | 品牌 spec 明确用 |
| 赛博霓虹 / 深蓝底 `#0D1117` | GitHub dark mode 美学的烂大街复制 | 开发者工具产品且品牌本身走这方向 |

正向做什么：
- `text-wrap: pretty` + CSS Grid + 高级 CSS：排版细节是 AI 分不清的"品味税"
- 用 `oklch()` 或 spec 里已有的色，**不凭空发明新颜色**
- 配图优先 AI 生成（Gemini / Flash / Lovart）
- 文案用「」引号不用 ""：中文排印规范
- 一个细节做到 120%，其他做到 80%

## 设计方向顾问（Fallback 模式）

触发时机：用户需求模糊（"做个好看的"、"帮我设计"、"这个怎么样"）、明确要"推荐风格"、没有任何 design context、用户主动说"我也不知道要什么风格"。

### 8 Phase 流程

**Phase 1 · 深度理解需求**：提问（一次最多 3 个）：目标受众 / 核心信息 / 情感基调 / 输出格式。

**Phase 2 · 顾问式重述**（100-200 字）：重述本质需求、受众、场景、情感基调。

**Phase 3 · 推荐 3 套设计哲学**（必须差异化）：每个方向必须含设计师/机构名、50-100 字解释、3-4 条标志性视觉特征、3-5 个气质关键词。3 个方向必须来自 3 个不同流派：

| 流派 | 视觉气质 | 适合作为 |
|------|---------|---------|
| 信息建筑派（01-04） | 理性、数据驱动、克制 | 安全/专业选择 |
| 运动诗学派（05-08） | 动感、沉浸、技术美学 | 大胆/前卫选择 |
| 极简主义派（09-12） | 秩序、留白、精致 | 安全/高端选择 |
| 实验先锋派（13-16） | 先锋、生成艺术、视觉冲击 | 大胆/创新选择 |
| 东方哲学派（17-20） | 温润、诗意、思辨 | 差异化/独特选择 |

**Phase 4 · 展示预制 Showcase 画廊**：检查 `assets/showcases/INDEX.md` 是否有匹配的预制样例（8 场景 × 3 风格 = 24 个）。

**Phase 5 · 生成 3 个视觉 Demo**：如果支持 subagent 并行，启动 3 个并行子任务；不支持就串行生成。使用用户真实内容（不是 Lorem ipsum）。

**Phase 6 · 用户选择**：选一个深化 / 混合（"A 的配色 + C 的布局"）/ 微调 / 重来。

**Phase 7 · 生成 AI 提示词**：结构 `[设计哲学约束] + [内容描述] + [技术参数]`。用具体特征而非风格名。

**Phase 8 · 选定方向后进入主干**：方向确认 → 回到核心哲学 + Junior Designer pass。

## App / iOS 原型专属守则

### 架构选型

| 场景 | 架构 | 交付方式 |
|------|------|----------|
| 单人做 4-6 屏原型（主流） | 单文件 inline | 一个 `.html` 双击开 |
| 单人做大型 App（>10 屏） | 多 jsx + server | 附启动命令 |
| 多 agent 并行 | 多 HTML + iframe | `index.html` 聚合 |

默认单文件 inline React——所有 JSX/data/styles 直接写进主 HTML 的 `<script type="text/babel">`。

### 真图优先

默认主动去取真实图片填充，不要画 SVG、不要拿米白卡摆着。渠道：Wikimedia Commons（公共领域）、Met Museum Open Access（美术/博物馆）、Unsplash/Pexels（通用生活/摄影）。

**真图诚实性测试**：

| 场景 | 判断 | 动作 |
|------|------|------|
| 文章封面、Profile 页风景头图、设置页装饰 banner | 装饰，与内容无内在关联 | **不要加** |
| 博物馆/人物内容的肖像、产品详情的实物、地图卡片的地点 | 内容本身，有内在关联 | **必须加** |
| 图谱/可视化背景的极淡纹理 | 氛围，服从内容不抢戏 | 加，但 opacity ≤ 0.08 |

### 交付形态

两种标准交付，先问用户要哪种：
- **Overview 平铺**（设计 review 默认）：所有屏并排静态展示，每屏一台独立 iPhone
- **Flow demo 单机**（演示特定用户流程）：单台 iPhone，内嵌 `AppPhone` 状态管理器，tab bar / 按钮都能点

### iOS 设备框必须用 `assets/ios_frame.jsx`

做 iPhone mockup 时硬性绑定 `assets/ios_frame.jsx`——已经对齐 iPhone 15 Pro 精确规格的标准外壳（bezel、Dynamic Island 124×36、status bar、Home Indicator）。禁止手写 Dynamic Island / status bar / home bar。

### 品位锚点

| 维度 | 首选 | 避免 |
|------|------|------|
| 字体 | 衬线 display（Newsreader/Source Serif/EB Garamond）+ `-apple-system` body | 全场 SF Pro 或 Inter |
| 色彩 | 一个有温度的底色 + 单个 accent 贯穿全场 | 多色聚类 |
| 信息密度·克制型（默认） | 少一层容器、少一个 border、少一个装饰性 icon | 每条卡片都配无意义的 icon + tag |
| 信息密度·高密度型（AI/Dashboard 类） | 每屏 ≥ 3 处可见的产品差异化信息 | 只放一个按钮一个时钟 |
| 细节签名 | 留一处「值得截图」的质感 | 到处平均用力 |

## 工作流程（标准流程 10 步）

1. **理解需求**（含事实验证、澄清问题、检查点 1）
2. **探索资源 + 抽核心资产**（含资产自检，检查点 2）
3. **先答四问，再规划系统**（叙事角色/观众距离/视觉温度/容量估算，检查点 2）
4. **构建文件夹结构**
5. **Junior pass**（HTML 里写 assumptions+placeholders+reasoning，检查点 3）
6. **Full pass**（填 placeholder，做 variations，加 Tweaks）
7. **验证**（Playwright 截图，检查控制台错误，检查点 4）
8. **总结**
9. **（默认）导出视频**（动画 HTML 的默认交付是带音频的 MP4）
10. **（可选）专家评审**（5 维度评审，各 0-10 分）

### 动画导出视频（默认带 SFX + BGM）

- `scripts/render-video.js` 录 25fps 纯画面 MP4
- `scripts/convert-formats.sh` 派生 60fps MP4 + palette 优化 GIF
- `scripts/add-music.sh` 加 BGM（6 首场景化配乐）
- SFX 按 `references/audio-design-rules.md` 设计，37 个预制资源
- **BGM + SFX 双轨制必须同时做**——只做 BGM 是 1/3 分完成度

### 检查点原则

碰到🛑就停下，明确告诉用户"我做了 X，下一步打算 Y，你确认吗？"然后真的等。不要说完自己就开始做。

## 反 AI slop 速查

| 类别 | 避免 | 采用 |
|------|------|------|
| 字体 | Inter/Roboto/Arial/系统字体 | 有特点的 display+body 配对 |
| 色彩 | 紫色渐变、凭空新颜色 | 品牌色/oklch 定义的和谐色 |
| 容器 | 圆角+左 border accent | 诚实的边界/分隔 |
| 图像 | SVG 画人画物 | 真实素材或 placeholder |
| 图标 | 装饰性 icon 每处都配 | 承载差异化信息的密度元素 |
| 填充 | 编造 stats/quotes 装饰 | 留白，或问用户要真内容 |
| 动画 | 散落的微交互 | 一次 well-orchestrated 的 page load |

## 技术红线

React+Babel 项目三条不可违反：
1. **never** 写 `const styles = {...}`——多组件时命名冲突。必须给唯一名字
2. **scope 不共享**：多个 `<script type="text/babel">` 之间组件不通，必须用 `Object.assign(window, {...})` 导出
3. **never** 用 `scrollIntoView`——会搞坏容器滚动

## 视觉居中红线

根因：不对称网格（7:5 / 8:4 列宽）+ 右侧留空 → 视觉重心左移。

硬规则：
1. **对称 padding**：容器的 padding 上下左右必须对称
2. **内容区居中**：每个 slide 的内容区必须用 `align-items: center; justify-content: center`
3. **网格优先对称**：`1fr 1fr` 优先于 `7fr 5fr`
4. **固定尺寸锁定**：幻灯片用 `width: 1920px; height: 1080px`
5. **视觉重心自检**：做完每页后判断内容视觉重心是否在画面对角线交点（约 960, 540）附近

## Starter Components

| 文件 | 用途 |
|------|------|
| `deck_index.html` | 幻灯片聚合版（默认基础产物） |
| `deck_stage.js` | 幻灯片 web component（单文件架构） |
| `scripts/export_deck_pdf.mjs` | HTML→PDF 导出（多文件架构） |
| `scripts/export_deck_pptx.mjs` | HTML→可编辑 PPTX 导出 |
| `design_canvas.jsx` | 并排展示 ≥2 个静态 variations |
| `animations.jsx` | 任何动画 HTML（Stage + Sprite + useTime + Easing） |
| `ios_frame.jsx` | iOS App mockup（iPhone bezel + 状态栏 + 圆角） |
| `android_frame.jsx` | Android App mockup |
| `macos_window.jsx` | 桌面 App mockup |
| `browser_window.jsx` | 网页在浏览器里的样子 |

## Skill 推广水印

只在动画产出（HTML 动画 → MP4 / GIF）默认带「**Created by Huashu-Design**」水印。幻灯片/信息图/原型/网页等其他场景不加。第三方品牌的非官方致敬动画水印前加「非官方出品 · 」。
