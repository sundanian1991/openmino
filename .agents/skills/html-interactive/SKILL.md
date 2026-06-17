---
name: html-interactive
description: "把任意材料转化为可交互自包含HTML页面（文字/PDF/Word/链接/Excel等）。触发于"做个交互式页面"、"做个可视化"、"生成HTML"、"把这些材料整理成页面"。不适用于：纯静态页面、需要后端、SEO网站。"
---

# html-interactive — 交互式 HTML 生成器

> 核心理念：AI 的输出不应该是 Markdown 文本，而应该是用户真的会打开、会点击、会用的 HTML 页面。
> 支持任意格式输入（文字/PDF/PPTX/Word/链接/HTML/MD/SVG/Excel），自动分析内容并选择最佳展示方式。

## 输入摄入（Step 0）

用户可以提供任意组合的材料。按类型分别提取内容：

| 输入类型 | 提取方式 | 得到什么 |
|---|---|---|
| **纯文字/MD** | 直接使用 | 结构化文本 |
| **URL 链接** | 用 waza-read 抓取，或 tavily extract | 网页内容（标题+正文+图片） |
| **PDF** | 用 doc-pdf 提取文字和表格 | 文字段落 + 表格数据 |
| **Word (.docx)** | 用 docx 读取段落和表格 | 结构化文档内容 |
| **PPTX** | 用 pptx 提取每页标题+正文+备注 | 幻灯片序列 |
| **Excel (.xlsx)** | 用 doc-xlsx 读取工作表 | 表格数据（行列） |
| **HTML 文件** | 直接 Read，提取 body 内容和关键 CSS | 现有页面结构 |
| **SVG 文件** | 直接 Read 源码 | 矢量图形，可内嵌到 HTML |
| **图片 (PNG/JPG)** | 用 `<img>` 引用，或 base64 内嵌 | 视觉素材 |
| **多个材料** | 逐个提取，合并分析 | 综合内容图谱 |

**多材料处理流程**：

1. 逐个提取每种材料的核心内容（跳过装饰性元素）
2. 分析材料间的关系：并列（对比）？顺序（时间线）？层级（折叠）？关联（链接）？
3. 判断内容主题：代码类 / 数据类 / 流程类 / 设计类 / 文档类 / 管理类
4. 根据主题和关系选择交互模式（可能需要组合多种模式）

**单材料 vs 多材料路由**：

| 材料情况 | 路由策略 |
|---|---|
| 1 个材料，内容单一 | 选 1 个模式，生成单页 HTML |
| 1 个材料，内容丰富（如长 PDF） | 拆分主题，多 section 组合在 1 页内 |
| 2-3 个材料，同主题 | 对比模式 / Tab 切换 / 并排展示 |
| 4+ 个材料，混合主题 | 模式 B：生成展示站，每个材料 1 个子页面 |
| 材料包含数据表格 | 优先考虑状态报告 / 数据看板模式 |
| 材料包含流程描述 | 优先考虑流程图 / 时间线模式 |

## 两种工作模式

### 模式 A：单页交互式 HTML

根据内容自动选择最合适的交互模式，生成一个自包含的 `.html` 文件。适用于 1-3 个材料的场景。

**路由表**（按内容匹配，不是按用户说的词）：

| 用户要展示的内容 | 交互模式 | 参考模板 |
|---|---|---|
| 多种实现方案/代码方法的对比 | 并排 Tab 切换 + 优劣表格 | `references/pattern-code-comparison.md` |
| 代码变更/PR 审查 | 注释式 diff + 严重度标签 + 跳转链接 | `references/pattern-pr-review.md` |
| 设计系统/色彩/字体/间距 | 色板 + 字号阶梯 + 间距标尺 | `references/pattern-design-system.md` |
| 组件的不同状态/尺寸/变体 | 网格排列的组件矩阵 | `references/pattern-component-variants.md` |
| 动画/过渡效果的参数调优 | 滑块控制 duration/easing 的沙盒 | `references/pattern-animation-sandbox.md` |
| 用户流程/页面导航 | 可点击的多屏串联 | `references/pattern-clickable-flow.md` |
| 部署管道/决策流程 | 可点击展开的流程图节点 | `references/pattern-flowchart.md` |
| 演示/汇报/周会 | 左右键翻页的幻灯片 | `references/pattern-slide-deck.md` |
| 功能实现原理 | 可折叠步骤 + Tab 代码 + FAQ | `references/pattern-feature-explainer.md` |
| 概念/算法教学 | 交互式可视化 + 对比表 + 术语表 | `references/pattern-concept-explainer.md` |
| 周报/工程状态 | 数字卡片 + 小图表 + 事件表 + Marp 度量卡片/迷你图/环形图/进度条组件 | `references/pattern-status-report.md` |
| 事故复盘/时间线 | 分钟级时间轴 + 日志摘录 + 清单 | `references/pattern-incident-timeline.md` |
| 任务排序/优先级 | 拖拽排序的看板 | `references/pattern-triage-board.md` |
| 配置项管理 | 开关列表 + 依赖警告 + diff 导出 | `references/pattern-feature-flags.md` |
| 提示词调优 | 左编辑右预览 + 变量高亮 | `references/pattern-prompt-tuner.md` |
| 项目规划/里程碑 | 时间线 + 数据流图 + 风险表 | `references/pattern-implementation-plan.md` |
| 文档/报告/长文 | 摘要头图 + 可视化段落 + 折叠详情 + 目录锚点 | `references/pattern-feature-explainer.md` |
| 制度/规范/SOP | 分节折叠 + 流程图插入 + 术语注释 | `references/pattern-feature-explainer.md` |
| 数据图表（柱状/折线/环形/条形） | 内联 SVG 图表 + 数据标签 | `references/pattern-svg-charts.md` |
| UI mockup/仪表盘/卡片/表单 | 拟真界面 + 交互按钮 | `references/pattern-ui-mockup.md` |
| SVG 插画/轮廓线/装饰图形 | 层叠线条/几何图案/水印 | `references/pattern-svg-art.md` |
| 数据解读/市场报告/业绩分析 | 语义标注段落 + 内联迷你图 + 趋势指标 | `references/pattern-narrative-report.md` |

**路由规则**：先读 `references/` 下的对应模式文件，获取该模式的结构约束和 CSS 模板。不要凭想象写交互。

### 数据报告语义标注（T8 理念吸收）

当生成数据解读报告时，对关键数据点做语义标注，使报告"读able 且可交互"：

**标注类型**：

| 语义类型 | HTML 实现 | 适用场景 |
|---|---|---|
| 指标名 | `data-entity="metric"` | 营收、用户数、市场份额等 |
| 指标值 | `data-entity="value" data-origin="1500000"` | ¥1.5M、50K users 等 |
| 变化值 | `data-entity="delta" data-assessment="positive"` | +15%、-500 等 |
| 趋势描述 | `data-entity="trend" data-assessment="negative"` | 持续下滑、稳中有升 |
| 时间 | `data-entity="time"` | Q3 2024、1-3月 |
| 维度值 | `data-entity="dimension"` | 北美、企业部门 |
| 异常值 | `data-entity="anomaly"` | 异常飙升、意外暴跌 |

**CSS 实现**（用 CSS attribute selector）：
```css
[data-entity="metric"] { font-weight: 600; }
[data-entity="value"] { color: var(--clay); font-family: var(--mono); }
[data-assessment="positive"] { border-bottom: 2px solid var(--olive); }
[data-assessment="negative"] { border-bottom: 2px solid var(--red); }
[data-entity="anomaly"] { background: var(--oat); border-radius: 4px; padding: 0 4px; }
```

**原则**：数据点用语义标注包裹，hover 显示原始数值和上下文。所有数据必须来自真实来源，不编造。


### 模式 B：多页展示站

把多个 HTML 文件组织成一个有分类、缩略图、导航的展示网站。典型场景：项目作品集、文档站、demo 合集、**4+ 个混合主题材料**。

**生成内容**：
1. `index.html` — 带分类导航的主页（hero + TOC pills + 分类卡片网格 + footer）
2. 每个子页面一个独立 `.html`

**多材料自动升级**：当输入材料 ≥4 个或主题混合时，自动从模式 A 升级到模式 B，每个材料生成一个子页面，用 index.html 聚合。

## 编辑风格层（Editorial Styles）

> 编辑风格覆盖设计系统（色彩/字体/排版/页面氛围），与交互模式（tab/时间线/折叠等）正交。
> 先选编辑风格，再选交互模式。风格定"长什么样"，模式定"怎么交互"。

### 通用规则（适用于所有编辑风格）

> 所有编辑风格共享，与单风格硬约束并列。

#### 隔离线克制

**`<hr>`、分隔线、section 底部 border** 是内容密度杀手——每条线都吃掉一段文字的呼吸空间。

| 可以用 | 不用 |
|--------|------|
| 主题/章节切换处（如"评估体系"→"九宫格"） | 同主题内段落之间 |
| 表格与正文之间 | 标题与紧接的正文之间 |
| 图表 caption 上方 | 列表项之间（用间距代替） |

**默认**：每个 `<section>` 底部最多一条线，section 内段落只用间距（margin-bottom），不用线。

#### 呼吸感基线

| 维度 | 最小值 | 说明 |
|------|--------|------|
| **段落间距** | 1.5em | 同主题内相邻段落 |
| **section 间距** | 2.5em | 不同主题/章节之间 |
| **标题与正文** | 0.8em | 标题下方到第一段 |
| **表格/图表与正文** | 2em | 图表上下间距 |
| **版心宽度** | 桌面端最大 960px | 不要让文字占满屏幕，电脑端阅读舒适度优先 |

---

### 风格路由表

| 内容调性/用户场景 | 编辑风格 | 关键词匹配 |
|---|---|---|
| 长文章、行业评论、深度分析、权威感内容 | **economist** | 经济学人、权威、深度、评论、老钱味 |
| 产品发布、单点突破、传播封面、小红书爆款 | **apple-keynote** | 苹果发布会、发布会、产品、极简、hero |
| 技术研究、白皮书、学术圈材料、硬科技 | **academic-paper** | 学术论文、论文、学术、白皮书、技术、arXiv |
| 文化哲思、中文审美、高端本土材料 | **chinese-minimal** | 中式留白、中式、留白、文化、宣纸、东方美学 |
| 数据密集型话题、数据叙事、可视化报道 | **ft-data-story** | FT数据叙事、数据叙事、FT、数据可视化、ig.ft.com |
| 品牌产品文档、企业级方案展示、专业力量感 | **loreal** | 欧莱雅、品牌、产品文档、黑红金、L'Oreal |
| 报告看板、数据表格、产品对比页、整洁内容页 | **apple-minimal** | 苹果简约风、苹果内容页、简约、留白、信息 |
| 理性网格排版、字体即语言、极度克制 | **01-pentagram** | 建筑风、pentagram, 网格, 排版, Bierut, 信息建筑 |
| 数据可视化诗学、有机地图感、温暖数据色调 | **02-stamen** | 地形图、stamen, 数据诗学, 地图, 有机 |
| 内容优先极简、系统字体、蓝链接、阅读体验 | **03-ia** | 白纸风、ia, 内容优先, 系统字体, 阅读, Writer |
| 科学叙事、精确可视化、期刊严谨+设计优雅 | **04-fathom** | 期刊风、fathom, 科学, 精确, 严谨, 学术可视化 |
| 滚动叙事、电影分镜、视差深色、沉浸旅程 | **05-locomotive** | 电影风、locomotive, 滚动叙事, 电影感, 视差, Lusion |
| WebGL粒子、霓虹深空、鼠标交互、宇宙诗意 | **06-active-theory** | 粒子风、webgl, 粒子, 3D, 霓虹, Active Theory |
| 生成算法美学、几何编排、代码即设计 | **07-field** | 算法风、生成艺术, 算法, 几何, Field.io, computational |
| 游戏化叙事、插画交互、温暖探索体验 | **08-resn** | 游戏化、游戏化, 叙事, 插画, 探索, Resn |
| 概念极简、蒙德里安三原色、字体即图形 | **09-jetset** | 三原色、jetset, 概念极简, 三原色, 蒙德里安, Whitney |
| 瑞士网格纯粹主义、8pt基线、客观功能主义 | **10-swiss-grid** | 瑞士风、瑞士, 网格, 客观, Müller-Brockmann, 功能主义 |
| 当代奢侈极简、70%留白、微妙字重对比 | **11-build** | 奢侈风、build, 奢侈, 留白, 呼吸感, 精致简单 |
| 快乐极简、意外色彩爆发、手工+数字融合 | **12-sagmeister** | 惊喜风、快乐, 手工, 实验, 意外色彩, Sagmeister |
| 代码诗学、黑白手绘算法、过程可见 | **13-lieberman** | 手绘风、代码诗学, 手绘, 黑白, 生成, openFrameworks |
| 参数化分形美学、递归结构、黑白建筑感 | **14-raven-kwok** | 分形、参数化, 分形, 递归, 建筑, Processing |
| 暖赛博诗意、橙青配色、电影光影、孤独未来 | **15-ash-thorp** | 赛博风、赛博, 电影光影, 橙青, 孤独诗, Ghost Shell |
| FUI科幻界面、全息投影、琥珀色仪表盘 | **16-territory** | 科幻风、FUI, 科幻, 全息, 琥珀, Blade Runner |
| 日式思辨设计、柔和科技、谦逊精致 | **17-takram** | 日式风、takram, 日式, 思辨, 柔和科技, NHK |
| 原研哉空的设计、80%留白、纸张质感 | **18-kenya-hara** | 原研哉、原研哉, 空, 留白, 纸张, MUJI, 白 |
| 书籍建筑师、非线性信息、意外色彩组合 | **19-irma-boom** | 书籍风、书籍建筑, 非线性, 边界, 意外色彩, SHV |
| 东方水墨光影诗、深蓝暖灰柔金、诗意留白 | **20-neo-shen** | 水墨风、水墨, 光影, 诗意, 东方, 晕染 |
| 以上都不匹配 | **warm-default**（现有暖色系统） | 默认 |

### 风格 A：经济学人编辑风

**适合** — 长文章、行业评论、深度公众号稿、想要权威感的"老钱味"内容。

```css
/* 设计系统覆盖 */
:root {
  --banner:     #E3120B;  /* 顶部红色 banner */
  --ink:        #1A1A1A;  /* 正文色 */
  --body-serif: "Source Serif Pro", "Playfair Display", Georgia, serif;
  --headline:   "Playfair Display", Georgia, serif;
}
```

**硬约束**：
- 顶部一条 4px 红色 banner `#E3120B`（`height:4px; background:#E3120B; width:100%`）
- 大标题：`--headline` 36px+，副标题斜体 18px
- 正文：`--body-serif` 17px，行高 1.7
- 首字母 drop cap：文章首字下沉 3 行加粗（`float:left; font-size:3.5em; line-height:0.8; font-weight:700; margin:0.05em 0.1em 0 0`）
- pull quote：28px 斜体，占满一行，上下各一条短横线（`border-top/bottom: 1px solid #333`）
- 数据图表用三色：`#E3120B` / `#4F5D75` / `#9DB4CC`（注：原需求 `#9DB4Co` 为笔误，修正为 `#9DB4CC`）
- 图表标题在图上方靠左，source 在图下方右
- 整体 feel 像《经济学人》Briefing 或 Schumpeter 专栏

### 风格 B：苹果发布会风

**适合** — 单点突破型传播、产品定位、小红书爆款封面。

```css
/* 设计系统覆盖 */
:root {
  --white:      #FFFFFF;
  --space-gray: #1D1D1F;
  --font:       "SF Pro Display", Inter, system-ui, sans-serif;
}
```

**硬约束**：
- 每个 section 是 100vh 全屏
- 背景在纯白 `#FFFFFF` 和深空灰 `#1D1D1F` 之间交替
- 只有一句标题（72px+，font-weight 600），下面一行副标题灰色
- 所有装饰最简，只用一个核心数字、一个 emoji 或一张产品图占视觉中心
- 字体 SF Pro Display 或 Inter
- scroll 是 smooth scroll snap（`scroll-snap-type: y mandatory`）
- **不允许出现 bullet point**，所有信息都是 hero statement 形式
- 偶尔用对角线渐变做背景情绪

### 风格 C：学术论文风

**适合** — 深度技术研究、白皮书、面向硬科技投资人或学术圈的材料。

```css
/* 设计系统覆盖 */
:root {
  --ink:        #000000;
  --gray:       #555555;
  --accent:     #8B0000;  /* 点睛红 */
  --font-serif: "Crimson Pro", "Noto Serif SC", Georgia, serif;
}
```

**硬约束**：
- 衬线正文字体（Crimson Pro / 思源宋体）
- 双栏版式（`column-count: 2; column-gap: 2em`，移动端 `@media (max-width:768px)` 自动单栏）
- 标题用编号体系（1, 1.1, 1.1.1），用 CSS counter 实现
- 表格用三线表（顶底粗线 + 中间细线，无侧边框无背景色）
- 插图用 SVG 黑白线稿，配 Figure 1/2 caption
- 参考文献用脚注形式，文末列出
- 配色限定 `#000` / `#555` / `#8B0000`（点睛红）
- **版心最大宽度 960px**，左右 padding 不小于 48px，不要让文字贴边
- **section 间距 3em+**，不要让内容挨得太紧；电脑端阅读舒适度优先于紧凑感
- **隔离线（`<hr>`、分隔线、section 底部 border）克制使用**：只在主题切换处用，同主题内段落间不用

### 风格 D：中式留白美学

**适合** — 中文读者的文化哲思类内容、本土审美的高端材料、小红书差异化爆款打法。

```css
/* 设计系统覆盖 */
:root {
  --xuan-paper: #F5F1E8;  /* 宣纸色 */
  --ink:        #333333;  /* 墨色 */
  --cinnabar:   #B22222;  /* 朱砂红 */
  --font-cn:    "Noto Serif SC", "Source Han Serif SC", serif;
  --font-en:    "EB Garamond", Georgia, serif;
}
```

**硬约束**：
- 背景色 `#F5F1E8`（宣纸色）
- 正文 `--font-cn` 17px，字间距 `0.05em`，行高 1.9
- 大标题横排居左，旁边配一枚朱砂红 `#B22222` 圆形印章（SVG 实现，刻一个相关汉字）
- 段落之间大间距 2em 以上制造呼吸
- 图表只用墨色 `#333` + 朱砂红两色
- 中英文混排时英文用 `--font-en`
- **不允许出现亮色、渐变、emoji**
- feel 是言几又、苏州博物馆图录、单向街杂志的视觉气质

### 风格 E：FT 数据叙事风

**适合** — 数据密集型话题、视野心大的爆款选题。

```css
/* 设计系统覆盖 */
:root {
  --cream:      #FFF1E5;  /* FT 标志性米色 */
  --wine:       #990F3D;
  --navy:       #0F5499;
  --ink:        #333333;
  --taupe:      #B3A39C;
  --headline:   "Playfair Display", "Financier Display", Georgia, serif;
  --body:       system-ui, -apple-system, sans-serif;
}
```

**硬约束**：
- 背景色 `#FFF1E5`（FT 标志性米色）
- 大标题 `--headline` 48px+ 衬线
- 每个 section 围绕一张主图展开，图占视觉重心、文字是配角
- 用 Chart.js 或 D3 做图表，hover 显示数值
- 滚动时图表元素 fade in 逐步出现（IntersectionObserver 实现）
- color palette 限定 `#990F3D` / `#0F5499` / `#333` / `#B3A39C`
- 图表标题用陈述句结论（不说"某指标变化趋势"，说"某指标下降 30%"）
- feel 是 ig.ft.com 上的 Visual & Data Journalism 栏目

### 风格 F：欧莱雅品牌风

**适合** — 品牌产品文档、企业级方案展示、强调专业感与力量感的内容。

```css
/* 设计系统覆盖 */
:root {
  --black:    #1A1A1A;
  --pure:     #000000;
  --white:    #FFFFFF;
  --red:      #D70015;
  --red-dark: #A80010;
  --red-soft: #FFF0F1;
  --gray-50:  #F8F8F8;
  --gray-100: #F0F0F0;
  --gray-200: #E0E0E0;
  --gray-300: #CCCCCC;
  --gray-500: #888888;
  --gray-700: #555555;
  --gold:     #B8860B;
  --font-cn:  "PingFang SC", "Microsoft YaHei", "Noto Sans SC", system-ui, sans-serif;
  --font-en:  "Helvetica Neue", Helvetica, Arial, sans-serif;
}
```

**硬约束**：
- 配色严格：主色只用黑+红+金，禁止蓝/紫/绿/渐变
- 全屏封面页（min-height 100vh），红色横线 3px 开场，大标题中关键词用红色
- 章节顶部 2px 黑色边框 + 红色英文编号（Chapter 01/02/...）
- 数值指标用英文字体，红色强调
- 红色只做强调，不大面积使用（定位块黑底除外）
- 金色仅用于警告/注意标识，慎用
- 图表用红+黑+灰三色系
- **版心最大宽度 960px**，左右 padding 不小于 48px
- **章节间距 80px+**，保证呼吸感
- **隔离线克制**：章节切换用 2px 黑线，section 内不用线
- **不允许出现 emoji**、亮色、渐变
- feel 是欧莱雅品牌手册——克制的力量感，黑底衬红，精密的专业感
- 详细组件配方见 `references/editorial-loreal.md`

### 风格 G：苹果简约风

**适合** — 报告看板、数据表格、产品对比页、整洁内容页、需要 Apple 官网新闻室气质的页面。

```css
/* 设计系统覆盖 */
:root {
  --bg:              #ffffff;
  --card-bg:         #f5f5f7;
  --text:            #1d1d1f;
  --text-secondary:  #86868b;
  --border:          #d2d2d7;
  --accent:          #0071e3;
  --accent-hover:    #0077ed;
  --chart-blue:      #0071e3;
  --chart-gray:      #86868b;
  --chart-orange:    #bf4800;
  --chart-black:     #1d1d1f;
  --font:            -apple-system, 'SF Pro Display', 'Helvetica Neue', 'PingFang SC', sans-serif;
  --mono:            ui-monospace, 'SF Mono', Menlo, Monaco, Consolas, monospace;
}
```

**标题层级**：
- h1: 48px, font-weight: 700, letter-spacing: -0.02em — 报告主标题
- h2: 28px, font-weight: 600 — 章节标题
- h3: 21px, font-weight: 600 — 子标题
- body: 17px, line-height: 1.65 — 正文
- caption: 12px, color: var(--text-secondary) — 图表注释

**间距**：
- 章节间距: 80px
- 卡片内边距: 32px
- 卡片圆角: 16px
- 卡片无边框，用背景色区分: `background: var(--card-bg)`

**布局**：
- `max-width: 980px`，居中阅读
- 单列为主，数据对比时用双列

**Chart.js 配置**（引用时自动注入）：
```javascript
Chart.defaults.color = '#86868b';
Chart.defaults.borderColor = '#e5e5e5';
Chart.defaults.font.family = "-apple-system, 'SF Pro Display', sans-serif";

// 低饱和高辨识配色
const appleChartColors = ['#0071e3', '#86868b', '#bf4800', '#1d1d1f'];
```

**硬约束**：
- 背景色固定 `#ffffff`，卡片背景 `#f5f5f7`，禁止深色/暗黑背景
- 禁止渐变色背景、霓虹色、高饱和度配色
- 禁止发光效果、阴影过重（卡片 hover 只允许轻微 translateY）
- 表格：无竖线，表头全大写+浅灰横线，`border-collapse: collapse`
- 数字用 `font-variant-numeric: tabular-nums` 等宽
- 卡片无边框，仅用背景色 `#f5f5f7` 区分
- 品牌蓝 `#0071e3` 只做强调/链接，不大面积使用
- 图表配色限于蓝/灰/橙/黑四种低饱和色
- 不允许出现"AI 生成的仪表盘"风格——禁用多重仪表盘、花哨环形图、过多标签徽章
- feel 像 apple.com/newsroom 的产品对比页——大量留白、黑白为主、品牌色点缀

### 设计哲学风格（扩展）

> 20 种设计哲学，5 大流派。与上面 A-F 编辑风格是同一层的互斥选项——选一个用，不叠加。
> 完整 CSS 设计系统覆盖 + 硬约束 + 关键视觉模式见 `references/design-philosophies.md`。
> 选择时先匹配流派（调性/氛围），再在流派内选具体风格。

**五大流派速查**：

| 流派 | 编号 | 哲学内核 | 气质关键词 |
|------|------|----------|-----------|
| **信息建筑派** | 01-04 | 数据不是装饰，是建筑材料 | 理性、数据驱动、克制 |
| **运动诗学派** | 05-08 | 技术本身就是一种流动的诗 | 动感、沉浸、技术美学 |
| **极简主义派** | 09-12 | 删减到无法再删 | 秩序、留白、精致 |
| **实验先锋派** | 13-16 | 打破规则即创造规则 | 先锋、生成艺术、视觉冲击 |
| **东方哲学派** | 17-20 | 留白即内容 | 温润、诗意、思辨 |

**执行路径指南**：

| 路径 | 风格编号 | 说明 |
|------|---------|------|
| HTML 渲染 | 01, 03, 04, 10, 11, 17, 18 | 精确排版+数据，HTML 完全可控 |
| HTML + AI 配图 | 02, 05, 08, 09, 19 | HTML 做骨架 + AI 生成关键视觉素材 |
| AI 生成为主 | 06, 07, 12, 13, 14, 15, 16, 20 | 核心视觉依赖生成艺术，HTML 做容器 |

**使用方式**：用户指定风格编号或关键词时，读取 `references/design-philosophies.md` 对应章节获取完整 CSS 覆盖和硬约束，覆盖默认暖色设计系统。

---

## 设计系统（强制）

所有生成的 HTML 必须使用这套暖色设计系统（除非被编辑风格覆盖）。不使用 Tailwind，不使用外部 CDN（⚠️ 字体 CDN 例外：Google Fonts / Adobe Fonts 等字体 CDN 允许加载，所有其他类型的 CDN 仍禁止）。

### 色彩变量（暖色基础系统）

```css
:root {
  --ivory:  #FAF9F5;  /* 页面底色 */
  --paper:  #FFFFFF;  /* 卡片底色 */
  --slate:  #141413;  /* 正文色 */
  --clay:   #D97757;  /* 主色 — 强调、链接、高亮 */
  --clay-d: #B85C3E;  /* 主色暗 */
  --oat:    #E3DACC;  /* 辅助暖色 — hover 背景、装饰 */
  --olive:  #788C5D;  /* 辅助绿 — 成功、次要 */
  --g100:   #F0EEE6;  /* 灰色层级 */
  --g200:   #E6E3DA;
  --g300:   #D1CFC5;  /* 边框默认色 */
  --g500:   #87867F;  /* 次要文字 */
  --g700:   #3D3D3A;  /* 正文辅助 */
}
```

### 数据图表 9 色 ramps（从 viz-Codex 继承）

> 仅用于 SVG 数据图表和可视化图形。文字/容器/按钮等仍用暖色基础系统。

| Ramp | 50 | 100 | 200 | 400 | 600 | 800 | 900 |
|------|----|-----|-----|-----|-----|-----|-----|
| purple | #EEEDFE | #CECBF6 | #AFA9EC | #7F77DD | #534AB7 | #3C3489 | #26215C |
| teal | #E1F5EE | #9FE1CB | #5DCAA5 | #1D9E75 | #0F6E56 | #085041 | #04342C |
| coral | #FAECE7 | #F5C4B3 | #F0997B | #D85A30 | #993C1D | #712B13 | #4A1B0C |
| pink | #FBEAF0 | #F4C0D1 | #ED93B1 | #D4537E | #993556 | #72243E | #4B1528 |
| gray | #F1EFE8 | #D3D1C7 | #B4B2A9 | #888780 | #5F5E5A | #444441 | #2C2C2A |
| blue | #E6F1FB | #B5D4F4 | #85B7EB | #378ADD | #185FA5 | #0C447C | #042C53 |
| green | #EAF3DE | #C0DD97 | #97C459 | #639922 | #3B6D11 | #27500A | #173404 |
| amber | #FAEEDA | #FAC775 | #EF9F27 | #BA7517 | #854F0B | #633806 | #412402 |
| red | #FCEBEB | #F7C1C1 | #F09595 | #E24B4A | #A32D2D | #791F1F | #501313 |

**语义分配**：
- **purple/teal/coral/pink** — 一般数据分类
- **blue** — 信息/基准线
- **green** — 正向/增长/成功
- **amber** — 警告/注意
- **red** — 负向/下降/风险
- **gray** — 坐标轴/网格/辅助线

**规则**：每张图表最多 2-3 种颜色。完整模板见 `references/pattern-svg-charts.md`。

### 字体系统

```css
--serif: ui-serif, Georgia, "Times New Roman", Times, serif;
--sans:  system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
--mono:  ui-monospace, "SF Mono", Menlo, Monaco, Consolas, monospace;
```

**用法**：标题用 `--serif`，正文用 `--sans`，编号/文件名/代码用 `--mono`。

### 卡片样式

```css
a.card {
  background: var(--paper);
  border: 1.5px solid var(--g300);
  border-radius: 14px;
  transition: transform 150ms ease, box-shadow 150ms ease, border-color 150ms ease;
}
a.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(20, 20, 19, 0.10);
  border-color: var(--slate);
}
```

### 交互原则

1. **每个元素都要可操作** — 能点击展开、能拖拽、能切换、能调参数
2. **有明确的反馈** — hover 状态、展开/折叠动画、颜色变化
3. **导出能力** — 编辑类页面必须有"复制结果"按钮，把 UI 操作转回可粘贴的文本
4. **自包含** — 单文件 HTML，双击就能开。不依赖构建工具、不依赖 CDN 库（⚠️ 字体 CDN 例外：允许 Google Fonts / Adobe Fonts 等字体服务）
5. **纯 vanilla** — CSS 变量 + 原生 JS。不用 React、不用 Tailwind、不用框架

### 组件配方索引

> 15 个可复用组件配方已分布到各 `references/pattern-*.md` 文件中。
> 生成页面时，根据路由表选中模式后读取对应 reference 文件获取组件 CSS/HTML。

| 组件 | 所在文件 |
|------|----------|
| Dashboard Metric Cards | `references/pattern-status-report.md` |
| Funnel Visualization | `references/pattern-status-report.md` |
| Donut Chart | `references/pattern-svg-charts.md` |
| SVG Line Chart with Area Fill | `references/pattern-svg-charts.md` |
| Sparklines | `references/pattern-svg-charts.md` |
| Grouped Bar Chart | `references/pattern-svg-charts.md` |
| Gauge / Semicircle Meter | `references/pattern-ui-mockup.md` |
| Progress Bars | `references/pattern-status-report.md` |
| Before/After Split | `references/pattern-code-comparison.md` |
| Flowchart | `references/pattern-flowchart.md` |
| Chat Bubbles | `references/pattern-ui-mockup.md` |
| Terminal & Browser Mockups | `references/pattern-ui-mockup.md` |
| Glassmorphism Cards | `references/pattern-ui-mockup.md` |
| Vertical Timeline | `references/pattern-incident-timeline.md` |
| Stacked Bar Segments | `references/pattern-status-report.md` |

**配色**：需映射到 html-interactive 设计系统变量，不要直接复制暗色主题色值。

## 文档类内容原则

> 文档是最常见的输入类型。PDF、Word、长文、报告——用户要的是"比原文更好读"，不是"比原文更短"。

### 完整性优先

- **不删减内容**。用户的每一句话、每一个段落都必须出现在 HTML 中
- 长文档用"目录锚点 + 折叠段落"组织，让用户按需展开，而不是替用户决定哪些"不重要"
- 表格数据原样保留行列，不合并、不省略

### 重点高亮

原文中需要视觉强调的部分，用以下手段标注（按优先级）：

| 高亮手段 | 适用场景 | CSS 实现 |
|---|---|---|
| **clay 色左侧标记条** | 关键结论、核心观点 | `border-left: 3px solid var(--clay); padding-left: 12px;` |
| **olive 色背景块** | 重要段落、定义、术语 | `background: var(--g100); border-radius: 8px; padding: 16px;` |
| **clay 色高亮文字** | 句子中的关键词 | `color: var(--clay); font-weight: 600;` |
| **可折叠详情块** | 补充说明、技术细节、注释 | `<details><summary>` + 动画 max-height |

不用的手段：下划线（易与链接混淆）、emoji 标记、大号感叹号图标。

### 能可视化则可视化

文档中遇到以下结构，必须转化为可视化组件，不要用纯文字描述：

| 文档中的内容 | 转化为 | 参考 |
|---|---|---|
| 流程/步骤/工序 | 水平流程图（SVG 节点 + 箭头） | `pattern-flowchart.md` |
| 时间线/里程碑/阶段 | 垂直时间轴 | `pattern-incident-timeline.md` |
| 数据对比/指标 | 内联 SVG 柱状/折线/环形图 | `pattern-svg-charts.md` |
| 供应商排名/份额占比 | 水平条形图 + 环形图 | `pattern-svg-charts.md` |
| 层级结构/组织/分类 | 可折叠树或缩进列表 | `pattern-feature-explainer.md` |
| 优劣/决策/对比 | Tab 切换或并排卡片 | `pattern-code-comparison.md` |
| 状态/进度 | 数字卡片 + 进度条 | `pattern-status-report.md` |
| 地图/区域关系 | SVG 简化示意图 | `pattern-svg-art.md` |
| 装饰/水印/背景图 | 层叠轮廓线 SVG | `pattern-svg-art.md` |

**判断标准**：一段文字如果需要"读两遍才能理解结构"，就该可视化。

### 便于理解

- **开头放摘要**：文档第一屏必须是"这一页讲了什么"的 2-3 句摘要，用 clay 左标记条
- **段间有结构**：每 3-5 段插入一个小标题或分隔线，不让页面变成文字墙
- **专业术语有注释**：第一次出现的术语用 `<abbr title="...">` 或行内 tooltip
- **关键数字醒目**：百分比、金额、日期用 `--mono` 字体 + 稍大字号，一眼识别

## 工作流程

### Step 0：摄入材料

1. 识别用户提供了哪些材料（文件路径 / URL / 直接贴的文字）
2. 按输入类型表逐个提取内容
3. 如果材料 ≥4 个或主题混合 → 进入模式 B（多页展示站）
4. 如果材料 1-3 个 → 分析关系后进入模式 A

### Step 1：分析内容结构

提取完成后判断：
- 内容主题：代码 / 数据 / 流程 / 设计 / 文档 / 管理
- 材料关系：并列（对比）？顺序（时间线）？层级（折叠）？独立（多页）？
- 交互深度：展示为主 / 可点击 / 可编辑

### Step 1.5：选择编辑风格

根据内容调性匹配编辑风格路由表。如果用户明确指定风格则直接使用。默认 warm-default（暖色系统）。

- 编辑风格决定 **色彩/字体/排版/页面氛围**
- 交互模式决定 **组件结构/用户操作方式**
- 两者组合：如 "economist 风格 + feature-explainer 模式" 或 "apple-keynote 风格 + slide-deck 模式"

### Step 2：选择模式

根据路由表匹配最合适的交互模式。如果内容混合了多种需求，选择主模式，其他作为辅助组件。

### Step 3：读取模式模板

读 `references/pattern-<name>.md`，获取：
- HTML 结构模板
- CSS 关键样式
- JS 交互逻辑
- 边界约束

### Step 4：生成 HTML

用真实内容填充模板。所有文本必须是用户提供的真实内容，不编造 placeholder。

### Step 4.5：注入快速编辑器

读取 `references/editor-quick-edit.md`，在生成的 HTML 的 `</body>` 前注入编辑器代码。

**注入条件**：

| 条件 | 行为 |
|------|------|
| 默认 | 注入编辑器（右上角"编辑"按钮，不激活不影响浏览） |
| 用户说"演示用""最终版""直接发""不要编辑器" | 跳过注入 |

**注入内容**：`<!-- 快速编辑器注入开始 -->` ... `<!-- 快速编辑器注入结束 -->` 之间的完整编辑器代码块（CSS + HTML + JS）。

**编辑器能力（P0+P1）**：
- P0：文字内容直接编辑（contentEditable）、编辑模式开关、导出干净 HTML
- P1：文字工具栏（加粗/斜体/下划线/颜色/字号）、元素属性面板（背景色/文字色/间距/圆角/边框）、section 拖拽排序、撤销/重做

### Step 5：验证

生成后自检：
- 双击能打开（无外部依赖）
- 所有交互都能用（点击、拖拽、切换）
- 响应式（至少 640px 和 1120px 两个断点）
- 颜色系统一致（只使用上述 CSS 变量中的色）
- 编辑器已注入时：编辑按钮可点击、文字可编辑、导出后干净 HTML 无编辑器残留

## 参考资源路由

| 需求 | 读取 |
|---|---|
| 展示站主页模板 | `references/showcase-index.md` |
| 代码对比页面 | `references/pattern-code-comparison.md` |
| PR 审查页面 | `references/pattern-pr-review.md` |
| 设计系统页面 | `references/pattern-design-system.md` |
| 组件变体页面 | `references/pattern-component-variants.md` |
| 动画沙盒页面 | `references/pattern-animation-sandbox.md` |
| 可点击流程页面 | `references/pattern-clickable-flow.md` |
| 流程图页面 | `references/pattern-flowchart.md` |
| 幻灯片页面 | `references/pattern-slide-deck.md` |
| 功能讲解页面 | `references/pattern-feature-explainer.md` |
| 概念教学页面 | `references/pattern-concept-explainer.md` |
| 状态报告页面 | `references/pattern-status-report.md` |
| 事故复盘页面 | `references/pattern-incident-timeline.md` |
| 拖拽看板页面 | `references/pattern-triage-board.md` |
| 功能开关页面 | `references/pattern-feature-flags.md` |
| 提示词调优页面 | `references/pattern-prompt-tuner.md` |
| 项目规划页面 | `references/pattern-implementation-plan.md` |
| 文档长文页面 | `references/pattern-feature-explainer.md`（复用折叠+Tab结构，适配文档场景） |
| 制度规范页面 | `references/pattern-feature-explainer.md`（复用折叠+流程图插入） |
| **SVG 数据图表** | `references/pattern-svg-charts.md`（9色色板+bar/line/donut/h-bar/sparkline 模板） |
| **UI mockup/仪表盘** | `references/pattern-ui-mockup.md`（metric-dashboard/ui-card/form-layout/list-view 模板） |
| **SVG 插画/装饰图形** | `references/pattern-svg-art.md`（contour/geometric/illustrative/icon/pattern 风格 + 12种轮廓线图库） |
| **数据解读报告** | `references/pattern-narrative-report.md`（语义标注+内联迷你图+趋势指标） |
| **欧莱雅品牌风格** | `references/editorial-loreal.md`（黑红金配色+全套组件配方+两次实产验证） |
| **设计哲学风格库** | `references/design-philosophies.md`（20 种设计哲学：CSS 覆盖+硬约束+视觉模式+执行路径） |
| **组件配方** | 各 `references/pattern-*.md` 文件的"组件配方"章节（15 种可复用组件） |
| **快速编辑器** | `references/editor-quick-edit.md`（P0+P1 编辑能力：文字编辑/样式微调/拖拽排序/撤销/导出） |

每个 reference 文件包含：结构模板 + CSS 关键片段 + JS 交互骨架 + 该模式的设计约束。

## 委派链 — 容器 → 内容

> html-interactive 是容器层，负责页面框架、导航和交互。
> 遇到以下需求时，**委派给专业内容技能**，不在自身内部硬写。

| 页面中需要 | 委派给 | 原因 |
|---|---|---|
| 多维交叉分析表（透视表/交叉表/明细表） | **viz-antv-s2-expert** | S2 有完整的主题样式、自定义单元格、排序汇总、冻结等专业能力，vanilla HTML 无法替代 |
| 数据叙事报告（语义标注/内联迷你图/趋势指标） | **viz-narrative-text** | T8 Syntax 提供 18 种语义实体类型 + 元数据驱动的高亮/迷你图，比 html-interactive 的 data-entity 标注更完整 |

**委派规则**：
1. html-interactive 生成页面容器后，在需要的位置**嵌入**委派技能的输出（S2 组件的挂载点 / T8 渲染后的 HTML）
2. 委派技能的输出保持其自身技术规范，不强制改写为 vanilla HTML
3. 设计系统（色彩/字体/间距）由 html-interactive 统一控制，委派内容适配容器的视觉风格

## 反模式（禁止）

- 不用 Tailwind / Bootstrap / 任何 CSS 框架
- 不用 React / Vue / 任何 JS 框架
- 不用 CDN 链接（⚠️ 字体 CDN 例外：Google Fonts / Adobe Fonts 等字体服务允许加载；图标库、CSS 框架、JS 库仍禁止）
- 不编造 placeholder 内容
- 不生成"看起来像但用不了"的静态模拟（如果要拖拽，就实现真正的拖拽）
- 不在亮色系设计系统中使用紫色渐变
- 不使用编辑风格时，必须严格遵循该风格的硬约束（配色/字体/排版），不得混搭默认暖色系统
- apple-keynote 风格不允许出现 bullet point；chinese-minimal 不允许出现 emoji/亮色/渐变；apple-minimal 不允许深色背景/渐变色/过重阴影
