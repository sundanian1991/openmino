---
name: html-interactive
description: "把任意材料（文字/PDF/PPTX/Word/链接/HTML/MD/SVG/Excel）转化为可交互的自包含 HTML 页面。支持多材料混合输入，自动分析内容结构并选择最佳交互模式。当用户说'做个交互式页面'、'做个可视化'、'比 Markdown 更好的方式展示'、'生成一个能用的 HTML'、'做个展示站'、'把这些材料整理成页面'时触发。也适用于：代码对比、设计系统、时间线、幻灯片、流程图、看板、状态报告、数据解读等具体交互需求。不适用于：纯静态文字页面、需要后端的 Web App、SEO 网站。"
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
| 周报/工程状态 | 数字卡片 + 小图表 + 事件表 | `references/pattern-status-report.md` |
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

## 设计系统（强制）

所有生成的 HTML 必须使用这套暖色设计系统。不使用 Tailwind，不使用外部 CDN。

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

### 数据图表 9 色 ramps（从 viz-claude 继承）

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
4. **自包含** — 单文件 HTML，双击就能开。不依赖 CDN、不依赖构建工具
5. **纯 vanilla** — CSS 变量 + 原生 JS。不用 React、不用 Tailwind、不用框架

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

### Step 5：验证

生成后自检：
- 双击能打开（无外部依赖）
- 所有交互都能用（点击、拖拽、切换）
- 响应式（至少 640px 和 1120px 两个断点）
- 颜色系统一致（只使用上述 CSS 变量中的色）

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
- 不用 CDN 链接（字体、图标、库都不允许）
- 不编造 placeholder 内容
- 不生成"看起来像但用不了"的静态模拟（如果要拖拽，就实现真正的拖拽）
- 不在亮色系设计系统中使用紫色渐变
