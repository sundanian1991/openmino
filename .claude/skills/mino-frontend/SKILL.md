---
name: mino-frontend
description: "年老师专属前端技能 — 创建 HTML 幻灯片、数据仪表盘、前端页面。触发词：演示文稿、幻灯片、仪表盘、数据看板、前端页面、HTML 演示。支持 13 种核心设计风格。零依赖，单文件输出。"
license: MIT
---

# Mino Frontend

Create zero-dependency, animation-rich HTML presentations and dashboards that run entirely in the browser. This skill uses predefined design modes with complete technical specifications, ready to adapt to any content.

## Core Philosophy

1. **Zero Dependencies** — Single HTML files with inline CSS/JS. No npm, no build tools.
2. **Design Modes, Not Exploration** — Predefined styles with complete specs, ready for any content.
3. **Distinctive Design** — Avoid generic "AI slop" aesthetics. Every output should feel crafted.
4. **Production Quality** — Code should be well-commented, accessible, and performant.
5. **Viewport Fitting (CRITICAL)** — Every slide MUST fit exactly within the viewport. No scrolling within slides, ever.

---

## Phase 0: Detect Mode

First, determine what the user wants:

| User Intent | Mode | Design Mode Suggestion |
|-------------|------|----------------------|
| Create slides/presentation | **New Presentation** | 咨询模式 or 品牌模式 |
| Create dashboard/dataviz | **Dashboard** | 金融时报 or 数据模式 |
| Create webpage/landing | **Web Page** | 品牌模式 |
| Convert PPT to HTML | **PPT Conversion** | Keep original style or apply new |

---

## Phase 1: Content Discovery

> **两种模式**：
> - **零交互模式**（推荐）：用户直接给内容，系统自动完成所有分析
> - **交互模式**：用户只给主题/意图，系统询问细节

### 判断规则

| 用户输入 | 模式 | 后续步骤 |
|---------|------|---------|
| 完整内容（≥200 字） | 零交互 | 直接进入 Phase 1.5 → 1.8 → 2 → 2.5 → 3 |
| 风格 + 内容 | 零交互 | 风格作为路径 A，直接进入 1.5 → 1.8 → 2.5 → 3 |
| 只有主题/一句话 | 交互 | 询问 Purpose + Content Ready 后进入 |

### 交互模式询问（仅当用户只给主题时）

Ask via AskUserQuestion:

**Question 1: Purpose**
- Header: "Purpose"
- Question: "What is this for?"
- Options:
  - "Internal presentation" — Team updates, strategy meetings
  - "Pitch deck" — Selling an idea to investors/clients
  - "Data dashboard" — Monitoring metrics, KPIs
  - "External webpage" — Marketing, product showcase

**Question 2: Content**
- Header: "Content"
- Question: "Do you have the content ready?"
- Options:
  - "I have all content ready"
  - "I have rough notes"
  - "I have a topic only"

---

## Phase 1.5: Interaction Type Diagnosis

> **来源**：吸收 clone-website 的交互模型识别方法论
>
> **目的**：根据内容特征自动判断交互类型，不询问用户

### 交互类型判断逻辑

**根据内容自动判断**，不问用户：

| 内容特征 | 推荐交互 | 理由 |
|---------|---------|------|
| 数据排名/报表 | **静态展示** | 一目了然，不需要操作 |
| 设计规范/文档 | **滚动浏览** + 入场动画 | 线性阅读，随滚动逐步展开 |
| 多维度对比（≥3维度） | **Tab 切换** | 维度太多，分页展示 |
| 故事/时间线 | **滚动触发** | 随阅读节奏逐步展开 |
| 产品展示 | **滚动浏览** + 视差 | 沉浸式体验 |

---

### 交互类型→技术决策

| 交互类型 | 关键技术 | 避免 |
|---------|---------|------|
| 静态展示 | 布局精度、排版节奏 | 过度动画 |
| 滚动浏览 | IntersectionObserver、scroll-snap | 强制点击切换 |
| Tab 切换 | 数据驱动渲染 + 状态索引 | 用 scroll 模拟 tab |
| 滚动触发 | Observer + threshold | 用 click 模拟滚动 |

---

### 响应式策略判断

| 内容类型 | 推荐策略 | 理由 |
|---------|---------|------|
| 数据仪表盘 | 桌面优先 | 复杂布局，移动端简化 |
| 落地页/品牌 | 全响应式 | 需要覆盖所有设备 |
| PPT/演示 | 单一尺寸 | 固定 16:9 |

---

## Phase 1.8: 内容基因提取（Content DNA）

> **来源**：吸收 canvas-design 的 Conceptual DNA 方法论
>
> **目的**：从内容中提取可被视觉化表达的抽象特质，为风格推理提供"语义层"
>
> **核心区别**：Phase 1 识别内容"有什么"（数据/流程/清单），Phase 1.8 识别内容"是什么气质"

### 为什么需要这一步

没有内容基因提取，同样的"供应商排名"会得到相同的风格推荐。
有了内容基因提取，"垄断困境排名"和"健康竞争排名"会走向完全不同的设计方向。

### 提取四维 DNA

从内容中提取 4 个维度的设计灵魂：

| 维度 | 问题 | 输出 |
|------|------|------|
| **情绪向量** | 内容的核心情绪是什么？ | 紧迫/沉稳/庆祝/反思/好奇/对抗 |
| **视觉重量** | 视觉上应该"重"还是"轻"？ | 重（压迫感/权威感）/ 轻（呼吸感/友好感） |
| **叙事节奏** | 内容的节奏是快还是慢？ | 快（多信息高密度）/ 慢（少信息大留白）/ 阶梯（逐步深入） |
| **视觉隐喻** | 有没有可以转化为视觉的抽象概念？ | 金字塔/战场/旅途/迷宫/里程碑/信号灯/树/流 |

### 提取方法

**逐项问自己**：

1. **情绪向量** — 读完全部内容后，你的第一情绪反应是什么？不是"分析情绪"，是"感受情绪"。
2. **视觉重量** — 如果这些内容有物理重量，它重吗？沉重的话题 = 视觉重（大色块、粗线条、深色系），轻松的话题 = 视觉轻（大留白、细线条、浅色系）。
3. **叙事节奏** — 内容像什么节奏的音乐？快节奏 = 多信息紧凑排列，慢节奏 = 大留白单焦点，阶梯 = 分阶段逐步深入。
4. **视觉隐喻** — 内容中有没有可以被图形化的概念？竞争 = 战场/金字塔，成长 = 旅途/里程碑，风险 = 信号灯/迷宫，洞察 = 透镜/深度。

### 提取记录（必须输出）

```markdown
## 内容基因记录

### 情绪向量
[一个词] — [为什么]

### 视觉重量
[重/轻] — [依据：内容中的具体线索]

### 叙事节奏
[快/慢/阶梯] — [依据：内容结构特征]

### 视觉隐喻
[隐喻名称] — [如何转化为视觉元素]

### 一句话设计灵魂
"这组内容在视觉上应该是 [形容词] 的，因为 [核心原因]"
```

### 提取示例

**示例 1：刘乾坤带节奏分析**
```
情绪向量：对抗 — 分析的是"带节奏"行为，本质是职场博弈
视觉重量：重 — 内容涉及人际冲突、权力不对等，需要视觉权威感
叙事节奏：阶梯 — 三层分析：事件→模式→应对，逐步深入
视觉隐喻：迷宫 — 行为模式层层嵌套，表面现象下有深层动机

设计灵魂："这组内容在视觉上应该是 诊断式解剖 的，因为它在拆解一个复杂行为系统"
```

**示例 2：游泳训练计划**
```
情绪向量：好奇 — 学习新技能，探索未知
视觉重量：轻 — 运动是轻松愉快的，不需要压迫感
叙事节奏：快 — 装备清单、安全事项、训练步骤，信息密集但友好
视觉隐喻：旅途 — 从不会到会的学习之旅

设计灵魂："这组内容在视觉上应该是 友好引导 的，因为它在陪伴一个新手完成学习旅程"
```

**示例 3：供应商月度排名（健康）**
```
情绪向量：庆祝 — 业绩达成，排名变化正面
视觉重量：轻偏中 — 数据为主，但氛围积极
叙事节奏：快 — 排名数据需要快速扫视
视觉隐喻：领奖台 — 前三名突出，其余排列

设计灵魂："这组内容在视觉上应该是 轻松专业 的，因为它在展示成果而非警告"
```

**示例 4：供应商月度排名（垄断风险）**
```
情绪向量：紧迫 — 头部供应商占比过高，存在绑架风险
视觉重量：重 — 风险主题需要视觉压迫感和权威
叙事节奏：阶梯 — 数据展示→风险识别→应对建议
视觉隐喻：金字塔 — 头部过重，底部薄弱，结构失衡

设计灵魂："这组内容在视觉上应该是 冷峻诊断 的，因为它在揭示一个结构性风险"
```

---

### 内容基因 × 风格推理（连接 Phase 2）

内容基因是 Phase 2 风格推理的输入。四个维度共同决定风格方向：

| 基因组合 | 推荐风格方向 | 典型场景 |
|---------|------------|---------|
| 对抗 + 重 + 阶梯 + 迷宫 | 克制专业主义 / 咨询模式 | 行为分析、问题诊断 |
| 好奇 + 轻 + 快 + 旅途 | 品牌模式 / 柔和几何 | 学习指南、入门教程 |
| 庆祝 + 轻 + 快 + 领奖台 | 金融时报 / 极简现代 | 成果展示、排名报告 |
| 紧迫 + 重 + 快 + 信号灯 | 数据模式 | 风险预警、异常监控 |
| 沉稳 + 中 + 慢 + 深度 | 纸墨文学 / 复古报刊 | 深度分析、年度回顾 |
| 好奇 + 中 + 阶梯 + 树 | Anthropic 文档 | 技术文档、知识库 |

> **重要**：这只是推荐方向，不是硬性映射。Phase 2 的风格推理引擎会综合内容基因 + 用户意图做最终判断。

---

## Phase 2: Style Inference Engine

> **核心升级**：从"用户选风格"变为"内容推理风格 + 用户确认"
>
> **两种模式**：
> - **零交互模式**：用户只给内容，系统自动推理风格并直接产出
> - **确认模式**：系统推荐 1-2 个风格，用户确认或调整

### 2.1 风格推理算法（三路决策）

```
┌─────────────────────────────────────────────────────────────┐
│                    风格推理三路决策                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  路径 A：用户明确指定风格（权重 60%）                        │
│  → 直接使用，用内容基因微调风格参数                          │
│                                                              │
│  路径 B：用户给内容+场景，未指定风格（权重 30%）             │
│  → 用内容基因推理风格，推荐 1-2 个，用户确认                │
│                                                              │
│  路径 C：用户只给内容（零交互模式，权重 10%）                │
│  → 内容基因 × 模式检测 自动决定，不询问                     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 推理引擎：内容基因 × 输出模式 × 受众

风格推理不是单一维度映射，是三维交叉判断：

**维度 1：内容基因（Phase 1.8 输出）**
- 情绪向量 → 风格情绪基调
- 视觉重量 → 风格密度区间
- 叙事节奏 → 风格交互类型
- 视觉隐喻 → 风格视觉元素选择

**维度 2：输出模式（Phase 0 检测）**
- 演示文稿 → 16:9 固定尺寸，逐页展示
- 仪表盘 → 单页滚动，多模块布局
- 网页 → 全响应式，多端适配

**维度 3：受众判断（从内容推断）**
- 内部汇报 → 专业、克制、数据驱动
- 外部展示 → 品牌感、视觉冲击力
- 个人学习 → 友好、引导感、信息密度适中

### 2.3 推理决策矩阵

**核心矩阵：情绪向量 × 视觉重量 → 风格**

| 情绪 \ 重量 | 重 | 中 | 轻 |
|------------|-----|-----|-----|
| **对抗** | 克制专业主义 / 咨询模式 | 咨询模式 / 分类标签 | — |
| **紧迫** | 数据模式 | 数据模式 / 金融时报 | — |
| **庆祝** | — | 金融时报 / 极简现代 | 品牌模式 / 柔和几何 |
| **沉稳** | 纸墨文学 | 分类标签 / 复古报刊 | 极简现代 |
| **好奇** | — | Anthropic 文档 | 品牌模式 / 柔和几何 |
| **反思** | 纸墨文学 / 复古报刊 | 咨询模式 | 纸墨文学 |

**辅助修正：叙事节奏 × 输出模式**

| 叙事节奏 | 演示文稿 | 仪表盘 | 网页 |
|---------|---------|--------|------|
| **快** | 信息密集的列表/表格页 | 实时数据面板 | 导航清晰的卡片网格 |
| **慢** | 大留白金句页 | 单一大指标 + 趋势图 | 沉浸式长页面 |
| **阶梯** | 逻辑链式页面（每页一层） | 多层钻取面板 | 分步引导流程 |

### 2.4 推理结果输出（必须）

```markdown
## 风格推理结果

### 推荐风格
[风格名称] — [推理路径：情绪向量 + 视觉重量 + 叙事节奏 → 为什么是这个风格]

### 备选风格（如有冲突）
[备选名称] — [为什么也可以]

### 内容基因 × 风格融合
内容灵魂：[一句话设计灵魂]
风格语法：[风格的核心视觉语言]
融合结果：[内容如何通过这个风格表达]

### 风格参数调整（基于内容基因）
- 密度：[高/标准/低] — 因为[叙事节奏]
- 色彩强度：[强/中/弱] — 因为[情绪向量]
- 交互方式：[静态/滚动/切换] — 因为[输出模式]
```

---

### 14 种核心设计风格（参考表）

| 风格 | 核心色彩 | 气质 | 适用场景 |
|------|---------|------|----------|
| **品牌模式** | 陶土色 `#E2725B` | 人文温度 × 技术精度 | 用户页面、品牌内容 |
| **数据模式** | 黑白灰 + 陶土点缀 | 冷峻理性中的唯一温度 | 报告、打印、极简数据 |
| **金融时报** | 青绿 `#0d7680` | K 线图表语言、值得信赖 | 供应商仪表盘、金融数据 |
| **咨询模式** | 深灰 `#333` + 低饱和红 | 结论性标题、So What 原则 | 战略演示、PPT |
| **自信宣言** | 黑白对比 + 金色点缀 | 高对比、冲击力 | Pitch 演示、主题演讲 |
| **现代工坊** | 靛蓝 `#6366f1` | 干净、专业 | Agency 演示、专业汇报 |
| **分类标签** | 板岩灰 `#475569` | 编辑本、整理感 | 报告、评审文档 |
| **柔和几何** | 粉彩色系 | 粉彩、几何友好 | 产品介绍 |
| **趣味拼接** | 高饱和对比 | 双色分割、现代感 | 创意 Agency |
| **复古报刊** | 暖棕 `#78716c` | 怀旧、个性 | 个人品牌 |
| **极简现代** | 瑞士红 `#dc2626` | 极简、精确 | 企业数据 |
| **纸墨文学** | 墨黑 `#1c1917` | 文学、沉思 | 故事叙述 |
| **Anthropic 文档** | 橙色 `#FF6B35` | 技术文档、代码友好 | API 文档、技术演示 |
| **克制专业主义** ⭐ | 黑白灰 + 陶土色 `#E2725B` | 克制、专业、权威 | 问题诊断、事件分析、战略演示 |

> ⭐ **年老师默认风格** — 优先推荐，参考 2026-03-29 刘乾坤事件分析实践

Use AskUserQuestion to let user pick:

**Question: Design Style**
- Header: "设计风格"
- Question: "哪种设计风格适合你的需求？"
- Options: [List all 12 styles]

---

## Phase 2.8: 风格冲突处理

**内容基因与用户指定风格冲突时**：

```
【冲突示例】
内容基因：紧迫 + 重 + 快 + 信号灯 → 推荐数据模式
用户指定："用柔和几何"

【处理方式】
1. 执行用户指定风格（用户意图优先）
2. 但用内容基因调整风格参数：
   └── 柔和几何的粉彩 → 加深饱和度
   └── 圆润 → 保持但加强对比度
   └── 友好 → 保持但增加信息密度
3. 输出时说明调整理由
```

**设计哲学参考**：`references/design-philosophy-12modes.md`（每种模式的运动名称、宣言、概念线索、工艺清单）

---

## Design Mode Specifications

### 品牌模式 — Terracotta Hand-drawn

> **核心风格DNA**：人文温度 × 技术精度 × 极简克制
>
> 完整设计规范见：`references/anthropic-design-guide.md`

**完整的色彩系统：**

```css
:root {
  /* 主色调 */
  --terracotta: #E2725B;
  --terracotta-deep: #CA6641;
  --terracotta-accent: #E35336;

  /* 中性色 */
  --cream: #F5F1EE;
  --grey-light: #E8E4E1;
  --grey-mid: #C5C1BE;
  --charcoal: #3D2C29;

  /* 点缀色 */
  --sage: #8BA87A;
  --deep-blue: #2C5F7D;
}
```

**字体系统：**

```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet">

<style>
/* 标题 */
h1, h2, h3 {
  font-family: 'Cormorant Garamond', serif;
  color: var(--charcoal);
}

/* 正文 */
body, p, li {
  font-family: 'DM Sans', sans-serif;
  color: var(--charcoal);
}
</style>
```

**设计特征：**
- 背景：Cream `#F5F1EE` + SVG 纸张纹理
- 线条：手绘 SVG 图标，圆角端点，2-3px 粗细
- 留白：>40%，元素周围至少 32px 呼吸空间
- 强调：Terracotta 用于关键元素（按钮、高亮、图标填充）
- 禁止：阴影、渐变、emoji 图标

---

**手绘 SVG 规范（关键）：**

手绘线条的核心是**有机感**，非机械完美。遵循 Anthropic 设计语言：

| 属性 | 规格 | 说明 |
|------|------|------|
| **线条风格** | 手绘感、微瑕 | 非机械完美，有呼吸感 |
| **线条粗细** | 2-3px (24dp网格) | 保持一致性 |
| **端点** | `stroke-linecap: round` | 柔和、亲和 |
| **转角** | `stroke-linejoin: round` | 避免锐角 |
| **颜色** | `#3D2C29` (Charcoal) | 或 Terracotta Deep |

**手绘 vs 机械对比：**
```
机械线条                    手绘线条
├── 完美直线              ├── 微微波动（Q贝塞尔曲线）
├── 统一粗细              ├── 有机变化
├── 锐利转角              ├── 柔和过渡
└── 冷感、精确            └── 温暖、人性
```

**CSS 类定义：**

```css
/* 手绘风格SVG基础 */
.hand-drawn {
  fill: none;
  stroke: var(--charcoal);
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.hand-drawn-fill {
  fill: var(--terracotta);
  stroke: none;
}
```

**手绘 SVG 图标示例：**

```html
<!-- 示例：手绘书籍图标 -->
<svg viewBox="0 0 48 48" style="width:48px;height:48px">
  <!-- 左侧书页 - 填充 -->
  <path class="hand-drawn-fill"
        d="M8 10 Q24 14 24 14 L24 38 Q24 38 8 34 Z"/>
  <!-- 右侧书页 - 线条 -->
  <path class="hand-drawn"
        d="M40 10 Q24 14 24 14 L24 38 Q24 38 40 34 Z"/>
  <!-- 书脊 -->
  <line x1="24" y1="14" x2="24" y2="38" class="hand-drawn"/>
</svg>

<!-- 示例：手绘人形图标 -->
<svg viewBox="0 0 64 64">
  <!-- 头部 -->
  <circle cx="32" cy="22" r="12" class="hand-drawn-fill"/>
  <circle cx="32" cy="22" r="12" class="hand-drawn"/>
  <!-- 身体 - 有机曲线 -->
  <path class="hand-drawn-fill"
        d="M16 54 Q32 44 48 54 L48 62 L16 62 Z"/>
  <path class="hand-drawn"
        d="M16 54 Q32 44 48 54"/>
</svg>
```

**手绘卡片边框效果：**

```css
/* 双层偏移边框 - 模拟手绘不完美 */
.element-card {
  background: white;
  padding: 2rem;
  position: relative;
}

/* 灰色偏移层 */
.element-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border: 2px solid var(--grey-mid);
  border-radius: 4px;
  transform: translate(3px, 3px);  /* 偏移 */
}

/* 黑色主框层 */
.element-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border: 2px solid var(--charcoal);
  border-radius: 4px;
}
```

**纸张纹理：**

```css
.paper-texture {
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  opacity: 0.03;
  pointer-events: none;
}
```

---

**手绘元素适用场景：**

| ✅ 可接受 | ❌ 不可接受 |
|----------|-----------|
| 插画线条 | 核心 UI 图标（需严格测试） |
| 装饰元素 | 小尺寸图标（<16px） |
| 背景图案 | 导航图标（除非全套手绘） |
| 头像框架 | 需要精确传达的符号 |

**标志性元素库（参考）：**
- 手形符号：连接、传递、协作、引导
- 手+物品：知识传递、成长培育
- 自然意象：蝴蝶（蜕变）、山脉（稳定）、蜂巢（协作）

---

### 数据模式 — Minimal B&W with Terracotta Accent

**完整的色彩系统：**

```css
:root {
  /* 文字层级 */
  --text-primary: #111111;
  --text-secondary: #666666;
  --text-tertiary: #999999;

  /* 背景 */
  --bg-white: #ffffff;
  --border: #e5e5e5;

  /* 点缀 */
  --accent: #E2725B;  /* 陶土色，仅用于核心数据 */
  --positive: #2a9d5c;
  --negative: #d73a49;
}
```

**设计特征：**
- 背景：纯白 `#fff`
- 表头：2px 黑色底边框
- 分割线：1px `#e5e5e5`
- 点缀规则：陶土色 **仅用于激活视觉焦点**（一个页面只用一处）
- 禁止：阴影、渐变、装饰性元素

**表格规范：**
```css
.data-table th {
  border-bottom: 2px solid #111;
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.data-table td {
  border-bottom: 1px solid #e5e5e5;
}
.data-table tr:hover {
  background: #fafafa;
}
```

**KPI 卡片：**
```css
.kpi-card {
  background: #fff;
  border: 1px solid #e5e5e5;
  /* 无阴影 */
}
.kpi-card .value {
  font-size: 28px;
  font-weight: 600;
  color: #111;
}
.kpi-card .value.accent {
  color: #E2725B;  /* 仅核心数据用陶土色 */
}
```

---

### 金融时报风格 — Financial Times Style

**完整的色彩系统：**

```css
:root {
  /* 品牌 */
  --brand: #0d7680;      /* 青绿 */

  /* 背景 */
  --bg: #fff1e5;         /* 暖米色 */
  --surface: #ffffff;

  /* 文字 */
  --text: #333333;
  --text-secondary: #666666;
  --text-tertiary: #999999;

  /* 数据 */
  --positive: #2e7d32;   /* 深绿 */
  --negative: #cc0000;   /* 红 */

  /* 边框 */
  --divider: #cccccc;
}
```

**字体系统：**

```html
<link href="https://fonts.googleapis.com/css2?family=Georgia&display=swap" rel="stylesheet">

<style>
/* 主标题 - Georgia 衬线 */
.header-title {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 28px;
  font-weight: 400;
  color: var(--brand);
}

/* 区块标题 - Helvetica */
.section-title {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: var(--brand);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--divider);
}

/* 大数字 */
.kpi-value {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 28px;
  font-weight: 700;
}

/* 表格 */
.data-table {
  font-size: 12px;
}
</style>
```

**布局结构：**

```html
<!-- 页头：品牌色 4px 上边框 -->
<header style="border-top: 4px solid var(--brand); padding-top: 16px;">
  <h1 class="header-title">供应商数据仪表盘</h1>
  <span style="font-size: 11px; color: #666;">数据更新：2024年3月</span>
</header>

<!-- KPI 行：4列，1px 间隙 -->
<div class="kpi-row" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: #ccc;">
  <div class="kpi-card" style="background: #fff; padding: 16px; text-align: center;">...</div>
  <!-- x3 more -->
</div>

<!-- 主内容：左 70% | 右 30% -->
<div class="main-content" style="display: grid; grid-template-columns: 7fr 3fr; gap: 20px;">
  <div class="ranking-table">...</div>
  <div class="sidebar">...</div>
</div>

<!-- 页脚 -->
<footer style="font-size: 10px; color: #999; text-align: center;">
  Source: Internal Data | March 2024
</footer>
```

**状态徽章：**
```css
.badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 2px;
  font-size: 10px;
  font-weight: bold;
  color: white;
}
.badge.a-plus { background: #2e7d32; }
.badge.a { background: #4caf50; }
.badge.b-plus { background: #ff9800; }
.badge.c { background: #cc0000; }
```

---

### 咨询模式 — Strategy Presentation PPT

**完整的色彩系统：**

```css
:root {
  --bg: #F9F9F9;         /* 非纯白 */
  --text: #333333;
  --accent: #B85450;     /* 低饱和红 */
  --divider: #D0D0D0;
  --muted: #E0E0E0;
}
```

**字体层级 (T1-T6)：**

```css
/* T1: 结论性大标题 */
.t1 {
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 700;
  color: #333;
  line-height: 1.3;
}

/* T2: 模块标题 */
.t2 {
  font-size: clamp(0.85rem, 2vw, 1rem);
  font-weight: 700;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* T3: 正文观点句 */
.t3 {
  font-size: clamp(0.9rem, 1.5vw, 1rem);
  color: #333;
  line-height: 1.7;
}
.t3 strong {
  color: #B85450;
  font-weight: 700;
}

/* T4: 正文辅助说明 */
.t4 {
  font-size: clamp(0.8rem, 1.3vw, 0.9rem);
  color: #666;
  line-height: 1.6;
}

/* T5: 图表标签 */
.t5 {
  font-size: clamp(0.7rem, 1vw, 0.75rem);
  color: #333;
}

/* T6: 面包屑/图例 */
.t6 {
  font-size: clamp(0.6rem, 0.8vw, 0.7rem);
  color: #D0D0D0;
}
```

**布局结构 (16:9)：**

```html
<div class="slide" style="
  width: 100vw;
  height: 100vh;
  background: #F9F9F9;
  padding: 5%;
  display: flex;
  flex-direction: column;
">
  <!-- 面包屑 (T6) -->
  <div class="t6">战略分析 &gt; 市场竞争</div>

  <!-- 结论性大标题 (T1) - So What 原则 -->
  <h1 class="t1">由于在低端市场渗透率不足，A公司市场份额已被B公司反超</h1>

  <!-- 分割线 -->
  <div style="width: 100%; height: 1px; background: #D0D0D0; margin: 1.25rem 0;"></div>

  <!-- 主体区：左右二分 -->
  <div style="flex: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 3rem;">
    <div class="left-panel">...</div>
    <div class="right-panel">...</div>
  </div>

  <!-- 页脚 -->
  <div style="display: flex; justify-content: space-between; font-size: 0.65rem; color: #D0D0D0;">
    <span>Source: Expert Interviews; Market Analysis 2024</span>
    <span>CONFIDENTIAL DRAFT</span>
  </div>
</div>
```

**So What 原则：**
- 标题必须是结论性句子
- 结构：`[主语] + [动词/趋势] + [原因/驱动力]`
- ❌ "2024年市场份额分布"
- ✅ "由于在低端市场渗透率不足，A公司市场份额已被B公司反超"

---

### Anthropic 技术文档风格 — Anthropic Docs Style

> **核心风格DNA**：技术精度 × 代码友好 × 清晰可读
>
> 灵感来源：Anthropic 官方文档、Lucide Icons、Inter Font

**完整的色彩系统：**

```css
:root {
  /* 强调色（橙色） */
  --anth-orange: #FF6B35;
  --anth-orange-dark: #E55A2B;

  /* 功能色 */
  --anth-green: #4CAF50;      /* Markdown 文件 */
  --anth-blue: #2196F3;       /* Python 文件 */
  --anth-grey: #9E9E9E;       /* 配置文件 */
  --anth-purple: #9C27B0;     /* 特殊标记 */

  /* 基础色 */
  --anth-bg: #F5F1E8;         /* 背景：浅米色 */
  --anth-surface: #FFFFFF;    /* 表面：纯白 */
  --anth-text: #1A1A1A;       /* 主文字 */
  --anth-text-muted: #666666; /* 辅助文字 */
  --anth-border: #E0E0E0;     /* 边框 */
}
```

**字体系统：**

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

<style>
/* 标题和正文 - Inter */
h1, h2, h3, body, p, li {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* 代码 - JetBrains Mono */
code, pre, .mono {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}
</style>
```

**设计特征：**
- 背景：浅米色 `#F5F1E8`，卡片表面纯白 `#FFFFFF`
- 强调：橙色 `#FF6B35` 用于箭头、标题、关键图标
- 功能色：文件类型色彩编码（MD绿、PY蓝、Config灰）
- 图标：**混合风格** — 核心 UI 图标用 Lucide 风格，装饰用手绘
- 字体：Inter（正文）+ JetBrains Mono（代码）
- 禁止：阴影、渐变、emoji 图标

---

**色彩使用规则：**

| 用途 | 颜色 | 说明 |
|------|------|------|
| 箭头、导航 | 橙色 `#FF6B35` | 引导注意力，表示行动 |
| 文件夹标题 | 橙色 `#FF6B35` | 统一品牌标识 |
| Markdown 文件 | 绿色 `#4CAF50` | 文档类型标识 |
| Python 文件 | 蓝色 `#2196F3` | 代码文件标识 |
| 配置文件 | 灰色 `#9E9E9E` | 配置/元数据 |
| 特殊标记 | 紫色 `#9C27B0` | 警告、提示 |
| 内联代码 | 橙色底色 `rgba(255,107,53,0.1)` | 代码高亮 |

---

**图标系统（混合风格）：**

```
┌─────────────────────────────────────────────────────────────┐
│                    图标风格分配规则                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  【Lucide 风格】              【手绘风格】                   │
│  核心 UI 图标                  装饰元素                      │
│  ├─ 文件类型（.md、.py）       ├─ 章节分隔插画              │
│  ├─ 操作图标（复制、运行）     ├─ 概念插图                  │
│  ├─ 导航图标（箭头、菜单）     ├─ 页面装饰                  │
│  └─ 状态图标（成功、错误）     └─ 空状态插画                │
│                                                              │
│  【规格】Lucide: 24px, 2px stroke                           │
│         手绘: 48px, 2.5px stroke, #3D2C29                   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Lucide 风格图标示例（技术文档场景）：**

```html
<!-- 文件图标：Markdown -->
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
  <polyline points="14 2 14 8 20 8"/>
  <path d="M16 13H8"/>
  <path d="M16 17H8"/>
  <path d="M10 9H8"/>
</svg>

<!-- 文件图标：Python -->
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2196F3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
  <polyline points="14 2 14 8 20 8"/>
  <path d="M12 18v-6"/>
  <path d="M9 15h6"/>
</svg>

<!-- 操作图标：运行 -->
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polygon points="5 3 19 12 5 21 5 3"/>
</svg>

<!-- 导航图标：箭头右 -->
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <line x1="5" y1="12" x2="19" y2="12"/>
  <polyline points="12 5 19 12 12 19"/>
</svg>
```

**手绘风格装饰示例（章节分隔）：**

```html
<!-- 手绘波浪线分隔符 -->
<svg viewBox="0 0 200 20" style="width: 200px; height: 20px; margin: 16px auto;">
  <path d="M0 10 Q25 5, 50 10 T100 10 T150 10 T200 10"
        fill="none" stroke="#E2725B" stroke-width="2" stroke-linecap="round"/>
</svg>

<!-- 手绘箭头装饰 -->
<svg viewBox="0 0 64 64" style="width: 64px; height: 64px;">
  <path class="hand-drawn" d="M16 32 L48 32 M40 24 L48 32 L40 40"/>
</svg>
```

---

**卡片结构：**

```html
<!-- 文件夹卡片 -->
<div class="folder-card">
  <div class="folder-header">
    <svg class="folder-icon">...</svg>
    <h3 class="folder-title">API 参考</h3>
  </div>
  <div class="folder-content">
    <!-- 文件列表 -->
    <div class="file-item">
      <svg class="file-icon md">...</svg>
      <span>getting-started.md</span>
    </div>
    <div class="file-item">
      <svg class="file-icon py">...</svg>
      <span>client.py</span>
    </div>
  </div>
</div>
```

**CSS 样式：**

```css
/* 文件夹卡片 */
.folder-card {
  background: var(--anth-surface);
  border: 1px solid var(--anth-border);
  border-radius: 8px;
  overflow: hidden;
}

.folder-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: rgba(255, 107, 53, 0.05);
  border-bottom: 1px solid var(--anth-border);
}

.folder-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--anth-orange);
}

.folder-content {
  padding: 12px 0;
}

/* 文件项 */
.file-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 20px;
  transition: background 0.15s;
}

.file-item:hover {
  background: rgba(0, 0, 0, 0.03);
}

/* 内联代码 */
code {
  background: rgba(255, 107, 53, 0.1);
  color: var(--anth-orange-dark);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.9em;
}
```

---

**开源图标库参考：**

| 图标库 | 风格 | 用途 |
|--------|------|------|
| **Lucide Icons** | 简洁几何，24px | 核心 UI 图标 |
| **Feather Icons** | 轻量线条，24px | 备选图标库 |
| **Phosphor Icons** | 多种粗细，可选 | 需要更多变体时 |

**Lucide Icons 使用方式：**

```html
<!-- 直接嵌入 SVG -->
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <!-- icon paths -->
</svg>

<!-- 或通过 CDN 引入（生产环境不推荐，零依赖原则） -->
<script src="https://unpkg.com/lucide@latest"></script>
<i data-lucide="menu"></i>
```

---

**图标资源位置：**

- **Lucide 风格图标**：`assets/anthropic-icons/lucide/`（50 个）
- **手绘风格装饰**：`assets/anthropic-icons/hand-drawn/`（50 个）
- **预览页面**：`assets/anthropic-icons/preview.html`

---

## Phase 2.5: 设计执行哲学

> **来源**：融合 canvas-design 的视觉哲学方法论
>
> **目的**：在选定设计模式后、生成代码前，建立美学框架，确保输出有"灵魂"而非机械执行规范

### 这一步做什么

设计模式提供**技术规范**（色彩值、字体、间距）。
设计哲学提供**审美判断**（为什么这样用、怎么用才有气质）。

**不是额外步骤，是思维升级** — 同样的品牌模式，有哲学和没哲学，出来的东西差一个档次。

---

### 步骤 1：提取微妙概念线索（Conceptual DNA）

从用户需求中提取设计的"灵魂" — 不是主题本身，而是主题中**可以被视觉化表达的抽象特质**。

**问自己**：
- 这个内容的情绪是什么？（紧迫/沉稳/庆祝/反思）
- 视觉上应该"重"还是"轻"？
- 信息密度应该高（压迫感）还是低（呼吸感）？
- 有没有可以转化为视觉隐喻的概念？

**示例**：

| 用户需求 | 表面主题 | 概念线索（设计灵魂） |
|---------|---------|-------------------|
| "金条供应商月度排名" | 排名数据 | 竞争张力、金字塔结构、头部效应 |
| "新供应商准入流程" | 流程文档 | 门槛感、逐步深入、从模糊到清晰 |
| "年度业绩汇报" | 业绩数据 | 成长曲线、里程碑、突破时刻 |
| "风险预警看板" | 风险数据 | 紧迫感、信号灯、需要立即注意 |

---

### 步骤 2：建立设计哲学宣言（3 句话）

基于选定的设计模式 + 概念线索，用 **3 句话** 定义本次设计的美学方向：

**格式**：
```
[运动名称] — [1-2 个词的美学定位]

1. 空间与形式：这一设计如何处理空间关系
2. 色彩与情绪：色彩如何服务于概念线索
3. 工艺标准：这一设计应该给人什么质感
```

**示例**（金条供应商排名仪表盘，金融时报模式）：

```
竞技场 — 数据即战场

1. 空间与形式：信息呈现金字塔结构，头部供应商占据视觉重心，
   用留白制造"高处不胜寒"的距离感。数据不是平铺的，是有等级的。
2. 色彩与情绪：青绿色 (#0d7680) 代表冷静的专业判断，暖米色底色
   保持金融出版物的权威感。陶土色仅用于"需要你注意"的异常值。
3. 工艺标准：像 FT 的数据可视化一样精确、克制、值得信赖。
   每个数字都经过对齐，每个间距都经过计算。
```

---

### 步骤 3：空间使用法（内容-位置-权重三步法）

> **核心方法**：先识别内容类型 → 再选位置模型 → 最后分配权重。
>
> **来源**：frontend-design spatial-design + 权责不对等实践验证

---

#### 第一步：内容类型 → 位置模型

**问题**：这页的内容是什么类型？核心内容放哪里？

**位置模型**（一页空间的划分方式）：

| 模型 | 划分方式 | 适用内容类型 | 核心位置 |
|------|----------|-------------|---------|
| **中心模型** | 中心 + 边缘 | 金句、结论、单一焦点 | 正中心 |
| **上下模型** | 顶部 + 主体 + 底部 | 标题+内容+结论、流程链 | 主体居中 |
| **左右模型** | 左侧 + 右侧 | 对比、因果关系、并列 | 信息量大的一侧 |
| **网格模型** | 2-3 列均分 | 清单、表格、多模块 | 视内容重要性定 |
| **四角模型** | 四角 + 中心 | 复杂仪表盘、导航页 | 中心（慎用） |

**内容类型与位置匹配**：

| 内容类型 | 特征 | 推荐位置 | 避免 |
|---------|------|----------|------|
| **核心观点** | 页面主旨，一句话 | 中心或上方 | 四角、底部 |
| **对比分析** | 两列或多列对照 | 左右模型，信息量均衡 | 单列堆叠 |
| **因果链条** | 步骤/流程/逻辑链 | 上下模型，垂直展开 | 四角分散 |
| **数据表格** | 结构化数据 | 网格或主体区全宽 | 挤在角落 |
| **清单列表** | 多项同级内容 | 网格模型，均分空间 | 单列过长 |
| **辅助信息** | 页码、日期、来源 | 四角（左下/右下） | 中心区域 |

**核心原则**：

```
中心区域 = 核心内容（眼睛自然落点）
边缘区域 = 边界信息（分隔、辅助线）
四角区域 = 元信息（页码、日期、来源）

避免：四角满、中间空 → 视觉失衡
避免：核心内容放角落 → 阅读动线混乱
```

---

#### 第二步：视觉层级 → 权重分配

**问题 1：这页有几个视觉层级？**

视觉层级 = 视觉上需要区分的独立信息层。

| 层级数 | 典型页面 | 判断方法 |
|--------|---------|---------|
| **1 层** | 金句页、封面、纯结论 | 只有一个焦点，其他都是辅助 |
| **2 层** | 标题 + 内容、结论 + 论据 | 有主次两组信息 |
| **3 层** | 标题 + 内容 + 结论、左右对比 + 判定 | 有标题、主体、收束三段 |
| **4 层+** | 复杂仪表盘、多模块分析 | 需要拆页，不建议单页承载 |

**问题 2：每个层级的视觉权重是多少？**

权重 = 该层级对页面信息传达的重要性比例，总和 = 100%。

#### 权重分配速查表

**1 层页面**：

| 页面类型 | 焦点权重 | 空间处理 |
|---------|---------|---------|
| 金句/结论 | 100% | 居中大字号，四周留白 >60% |
| 封面 | 主标题 60% + 元信息 40% | 标题左对齐占主体，元信息底部 |

**2 层页面**：

| 页面类型 | 主层权重 | 次层权重 | 空间处理 |
|---------|---------|---------|---------|
| 内容 + 结论 | 70% | 30% | 内容撑满，结论区独立留白 |
| 左右对比 | 60:40 或 50:50 | — | 按信息量分配列宽 |
| 标题 + 纯内容 | 10% | 90% | 标题紧凑一行，内容撑满 |

**3 层页面**：

| 页面类型 | 标题层 | 内容层 | 结论层 | 空间处理 |
|---------|--------|--------|--------|---------|
| 标准分析页 | 8% | 65% | 27% | 标题紧贴顶，内容撑中间，结论底部独立 |
| 对比 + 判定 | 8% | 57% | 35% | 判定块比标准更重，加大内边距 |
| 流程 + 洞察 | 8% | 72% | 20% | 流程是主体，洞察精简收尾 |

#### 空间节奏原则

**权重大的层级 = 内部更宽松**，权重小的层级 = 紧凑。

```
高权重层：内部 padding 大（呼吸感），外部 margin 大（独立性）
低权重层：内部 padding 小（紧凑），外部 margin 小（依附）
```

**节奏公式**：

| 层级关系 | 间距规则 |
|---------|---------|
| 层级之间 | 用大间距分隔（≥24px），制造视觉断裂 |
| 层级内部 | 用小间距聚合（≤12px），制造视觉整体 |
| 焦点元素 | 周围留白 > 同级其他元素 |

#### 4pt 基准间距系统

```
4, 8, 12, 16, 24, 32, 48, 64, 96px
```

语义化命名：
```css
:root {
  --space-xs: 4px;   /* 元素内部最小间距 */
  --space-sm: 8px;   /* 相关元素间距 */
  --space-md: 12px;  /* 分组内部间距 */
  --space-lg: 16px;  /* 分组之间间距 */
  --space-xl: 24px;  /* 区块之间间距（层级分隔） */
  --space-2xl: 32px; /* 大区块之间间距 */
  --space-3xl: 48px; /* 页面边缘间距 */
}
```

#### 层次通过多维度建立

不只是大小，至少用 2-3 个维度同时建立层次：

| 维度 | 用法 |
|------|------|
| 大小 | 标题 vs 正文，比例 ≥ 3:1 |
| 粗细 | 标题 bold vs 正文 regular |
| 颜色 | 主文字 vs 辅助文字（#111 vs #666） |
| 位置 | 上/左是主要，下/右是次要 |
| **空间** | 焦点周围留白多，辅助信息周围留白少 |

#### 避免的错误

- ❌ 所有区域同等间距（缺乏节奏）
- ❌ 高权重层内部太挤（失去了焦点的视觉重量）
- ❌ 低权重层占用过多空间（抢了主体的位置）
- ❌ 层级之间间距不够（看不出分组）

---

### 步骤 4：极致工艺检查清单

在生成代码前，将以下标准作为**质量门槛**：

**视觉工艺**（必须全部通过）：
- [ ] **呼吸感** — 元素周围有足够留白，不拥挤
- [ ] **对齐精度** — 所有元素视觉对齐，像素级精确
- [ ] **层次清晰** — 一眼能看出主次，不需要阅读才能理解结构
- [ ] **色彩克制** — 使用的每种颜色都有明确目的
- [ ] **无 AI 感** — 没有渐变滥用、阴影堆砌、圆角过度等典型 AI 痕迹

**信息工艺**（必须全部通过）：
- [ ] **3 秒法则** — 打开页面 3 秒内能理解这是什么、重点在哪
- [ ] **数据诚实** — 图表比例准确，不误导
- [ ] **文字极简** — 能用视觉表达的不用文字，文字只做标注

**技术工艺**（必须全部通过）：
- [ ] **视口适配** — 内容完美适配视口，无滚动
- [ ] **响应式** — 在 700px/600px/500px 高度下都正常
- [ ] **性能** — 无不必要的动画、无阻塞渲染的资源

---

### 设计哲学 vs 设计规范：一句话区别

> **设计规范**说"用 #E2725B，字号 28px，间距 32px"
> **设计哲学**说"陶土色是唯一的温度来源，大字号是自信的表达，大留白是尊重观众的呼吸权"

规范保证**一致性**，哲学保证**气质**。

---

## Phase 2.5: Design Judgment

> ⚠️ **重要**：当用户选择需要深度设计判断的风格（如"克制专业主义"）时，此阶段为**强制执行**。
> 不完成设计判断，不允许进入代码生成阶段。
>
> **轻量风格可跳过**：趣味拼接、柔和几何等创意类风格可直接进入代码生成。

**详细素材库**：`references/design-judgment.md`（判断依据、查表指南、示例）

---

### 第一步：六层决策（必须依次回答）

**Layer 1 — 内容元素识别**（可多选）

判断内容包含哪些元素：

| 元素 | 判断方法 | 典型关键词 |
|------|---------|-----------|
| **数据元素** | 有数字、排名、百分比、对比 | KPI、排名、达成率、同比 |
| **流程元素** | 有顺序、步骤、阶段、时间线 | 先/后、步骤、阶段、流程 |
| **清单元素** | 有并列条目、分类、需查找 | 装备、清单、事项、要求 |
| **洞察元素** | 有观点、判断、分析、建议 | 结论、动机、策略、建议 |

**Layer 2 — 情绪气质**（4 选 1）

| 气质 | 唤醒度 | 留白比例 | 视觉风格 |
|------|--------|---------|---------|
| **紧迫** | 高负向 | 10-20% | 高对比、锐利、陶土色密集 |
| **中性** | 无唤醒 | 30-40% | 平衡、简洁、黑白灰为主 |
| **庆祝** | 高正向 | 50-60% | 柔和、圆润、留白 + 少量点缀 |
| **沉思** | 低正向 | 60%+ | 极简、大量留白、单焦点 |

**Layer 3 — 阅读方式**（3 选 1）

| 方式 | 行为 | 版式要求 |
|------|------|---------|
| **扫视** | 快速查找目标信息 | 表格、网格、索引式 |
| **阅读** | 逐行理解内容 | 列表、分段、正常行距 |
| **凝视** | 停下来思考 | 大留白、单焦点、可视化隐喻 |

**Layer 4 — 密度与版式**（由 Layer 2 + Layer 3 决定）

密度决策：

| 情绪\阅读 | 扫视 | 阅读 | 凝视 |
|----------|------|------|------|
| **紧迫** | 高密度表格 | 中密度列表 | — |
| **中性** | 中高密度网格 | 标准密度 | — |
| **庆祝** | — | 中低密度 | 低密度 + 可视化 |
| **沉思** | — | 低密度 | 极低密度 + 全可视化 |

版式决策（由内容元素的结构关系决定）：

| 结构关系 | 版式选择 |
|---------|---------|
| 行列结构 | 表格版式 |
| 对立/对比 | 左右对比版式 |
| 并列模块 | 卡片网格版式 |
| 线性展开 | 标准列表版式 |
| 时间顺序 | 时间线版式 |

**Layer 5 — 可视化叠加**（两步决策：级别 + 形式）

**第一步：级别决策（用多少可视化）**

可视化是一个叠加层，不是独立策略。任何密度都可以叠加可视化。

| 级别 | 占比 | 具体手段 | 适用场景 |
|------|------|---------|---------|
| **微点缀** | 5-10% | 色块标记关键点、数字放大、条件格式 | 数据表格中标记异常值 |
| **轻混合** | 20-30% | 小图标、徽章、进度条、inline 标签 | 清单中加分类图标 |
| **中混合** | 40-50% | 时间线、矩阵图、卡片墙 | 流程展示、分类对比 |
| **重混合** | 60-70% | 流程图、关系图、泳道图、架构图 | 行为模式分析、组织关系 |
| **全可视化** | 80-90% | 信息图、技能树、里程碑图、叙事图 | 成就展示、战略全景 |

叠加规则：
- 主导元素为**数据** → 微点缀到轻混合（表格内增强）
- 主导元素为**流程** → 中混合到重混合（时间线/流程图）
- 主导元素为**清单** → 轻混合（分类卡片 + 图标）
- 主导元素为**洞察** → 重混合到全可视化（关系图/因果图）

**第二步：形式决策（用什么形式的可视化）**

先查预计算速查表，如果匹配直接用；如果速查表未覆盖，用 4 步推导（编码对象 → 前注意特征 → 格式塔 → 情绪调节）。

预计算速查表（每条 = 底层原理的推导结果）：

| 内在结构 | 映射形式 | 前注意特征 | 格式塔原理 |
|---------|---------|-----------|-----------|
| **行列** | 表格 | 位置通道编码交叉关系 | 围合律 + 相似律 |
| **对立/对比** | 左右对比 | 位置通道编码对立 | 相近律（中间断裂） |
| **并列** | 卡片网格 | 位置 + 大小（等面积） | 围合律 + 相似律 |
| **线性** | 标准列表 | 位置编码顺序 + 大小编码层级 | 连续律 + 相似律 |
| **时间** | 时间线 | 位置编码时序 | 连续律 + 围合律 |
| **层级** | 树形/缩进 | 位置（缩进深度）+ 大小 | 相似律 + 围合律 |
| **因果** | 流程图 | 位置（箭头方向） | 连续律 + 围合律 |

> **详细素材库**：前注意特征编码 3 条铁律、格式塔冲突检查、4 步推导流程见 `references/design-judgment.md §5.5`

**Layer 6 — 焦点选择**（陶土色用在哪里）

优先级：
1. 异常值/风险信号
2. 排名/等级（两极）
3. 行动建议

规则：
- 一页一处陶土色强调
- 不用于装饰性元素
- 不用于正文文字

---

### 第二步：设计判断记录（必须输出）

在生成代码之前，必须先输出以下记录：

```markdown
## 设计判断记录

### 1. 内容元素
包含元素：[数据/流程/清单/洞察 — 可多选]
核心观点：[一句话]

### 2. 情绪气质
选择：[紧迫/中性/庆祝/沉思]
依据：[为什么是这种情绪]

### 3. 阅读方式
选择：[扫视/阅读/凝视]
依据：[读者会怎么读这页]

### 4. 密度与版式
密度：[高/标准/低]
版式：[表格/对比/卡片/列表/时间线]
依据：[情绪×阅读方式 + 结构关系]

### 5. 可视化叠加
级别：[微点缀/轻混合/中混合/重混合/全可视化]
形式：[表格/对比/卡片/列表/时间线/流程图/...]（查预计算速查表）
依据：[内在结构 = XXX → 映射形式 = XXX]
底层原理验证（可选）：[前注意特征通道分配 + 格式塔原理]

### 6. 焦点选择
陶土色位置：[具体元素]
优先级依据：[为什么是这个]

---
✅ 设计判断完成，开始生成代码
```

> **素材库**：详细的查表指南、情绪判断示例、可视化形式对照表见 `references/design-judgment.md`

---

## Phase 2.6: 参数系统（执行稳定性的保证）

> **核心论点**：方法论是骨架，参数系统是血肉。骨架相同但血肉不同，输出就不稳定。
>
> **目的**：为每种设计风格定义具体参数值，保证每次输出质量稳定。

### 参数系统结构

```
┌─────────────────────────────────────────────────────────────┐
│                    参数系统三层结构                          │
├─────────────────────────────────────────────────────────────┤
│  【Layer 1：全局参数】所有风格共享                           │
│  ├── 色彩系统（主色、辅助色、陶土色）                        │
│  └── 间距基准（4pt 系统）                                    │
│                                                              │
│  【Layer 2：风格参数】每种风格独有                            │
│  ├── 字体层级（T1-T6 px 值）                                │
│  ├── 边框系统（粗细、圆角）                                  │
│  └── 间距比例（页面 padding、卡片 gap）                      │
│                                                              │
│  【Layer 3：内容参数】由内容特征决定                          │
│  ├── 信息密度 → 间距调整                                     │
│  ├── 情绪气质 → 陶土色用量                                   │
│  └── 阅读方式 → 字号层级差                                   │
└─────────────────────────────────────────────────────────────┘
```

---

### 克制专业主义参数定义

> **基准来源**：年老师满意的案例（刘乾坤带节奏分析）
>
> **核心特征**：锐利（圆角 2px）、动态（进度条）、大标题（封面 35-40px）、宽松（padding 上限 48px）

**完整的 CSS 变量定义**：

```css
:root {
  /* === 色彩系统 === */
  --text-primary: #111111;
  --text-secondary: #666666;
  --text-tertiary: #999999;
  --bg: #FFFFFF;
  --surface: #FAFAFA;
  --border: #E5E5E5;
  --accent: #E2725B;
  --accent-light: rgba(226, 114, 91, 0.1);

  /* === 字体层级（克制专业主义 — 年老师满意版） === */
  --t1-cover: clamp(2.2rem, 5.5vw, 3.5rem);  /* 封面标题 35-40px */
  --t1-page: clamp(1.8rem, 4.5vw, 2.8rem);   /* 页面标题 28-30px */
  --t2: clamp(1rem, 2vw, 1.3rem);            /* 模块标题 16-18px */
  --t3: clamp(0.85rem, 1.3vw, 1rem);         /* 卡片标题 14-15px */
  --t4: clamp(0.75rem, 1.2vw, 0.9rem);       /* 正文 12-13px */
  --t6: clamp(0.6rem, 0.8vw, 0.7rem);        /* 标签/页码 10px */

  /* === 间距系统（4pt 基准） === */
  --space-xs: 4px;   --space-sm: 8px;   --space-md: 12px;
  --space-lg: 16px;  --space-xl: 24px;  --space-2xl: 32px;

  /* === 页面级间距（标准密度） === */
  --page-padding: clamp(1.5rem, 4vw, 3rem);  /* 24-48px */
  --card-padding: clamp(1rem, 2vw, 1.5rem);  /* 16-24px */
  --card-gap: clamp(1rem, 2vw, 1.5rem);      /* 16-24px */

  /* === 边框系统 === */
  --border-thin: 1px solid var(--border);
  --border-thick: 2px solid var(--text-primary);
  --border-accent: 1px solid var(--accent);
  --border-radius: 2px;              /* ⚠️ 注意：2px 不是 4px */
  --divider-height: 2px;             /* 分割线高度 */
  --progress-bar-height: 3px;        /* 进度条高度 */
}
```

---

### 全风格参数速查表

> **目的**：每种风格的关键差异参数，保证执行稳定。共同基础见上方全局参数。

#### 字体选择与层级差

| 风格 | 标题字体 | 正文字体 | T1 封面 | T1 页面 | 圆角 |
|------|---------|---------|---------|---------|------|
| **品牌模式** | Cormorant Garamond | DM Sans | 2.5rem | 2rem | 4px |
| **数据模式** | system-ui | system-ui | 2rem | 1.6rem | 2px |
| **金融时报** | Georgia | Helvetica | 1.8rem | 1.5rem | 2px |
| **咨询模式** | system-ui | system-ui | 2rem | 1.7rem | 2px |
| **自信宣言** | system-ui bold | system-ui | 3.5rem | 2.5rem | 0 |
| **现代工坊** | Inter | Inter | 2.2rem | 1.8rem | 8px |
| **分类标签** | system-ui | system-ui | 1.6rem | 1.3rem | 4px |
| **柔和几何** | Nunito | Nunito | 2rem | 1.6rem | 16px |
| **趣味拼接** | system-ui bold | system-ui | 2.8rem | 2rem | 0 |
| **复古报刊** | Playfair Display | system-ui | 2rem | 1.5rem | 0 |
| **极简现代** | Helvetica | Helvetica | 2.5rem | 2rem | 0 |
| **纸墨文学** | Noto Serif SC | system-ui | 1.8rem | 1.3rem | 0 |
| **Anthropic 文档** | Inter | Inter | 2rem | 1.6rem | 8px |
| **克制专业主义** | system-ui | system-ui | 2.2rem | 1.8rem | 2px |

#### 色彩强度与背景

| 风格 | 背景色 | 强调色 | 强调色用量 | 图标风格 |
|------|--------|--------|-----------|---------|
| **品牌模式** | `#F5F1EE` | `#E2725B` | 中（点缀+图标填充） | 手绘 SVG |
| **数据模式** | `#FFFFFF` | `#E2725B` | 极少（1处焦点） | 无（纯文字） |
| **金融时报** | `#fff1e5` | `#0d7680` | 中（标题+品牌线） | 几何 SVG |
| **咨询模式** | `#F9F9F9` | `#B85450` | 中（结论关键词） | 无 |
| **自信宣言** | `#000000` | `#D4AF37` | 低（金色点缀） | 粗线条 SVG |
| **现代工坊** | `#FFFFFF` | `#6366f1` | 中（标题+按钮） | Lucide SVG |
| **分类标签** | `#FFFFFF` | `#475569` | 低（标签底色） | 无 |
| **柔和几何** | `#FFF8F0` | `#F8B4D9` | 中（几何色块） | 圆角 SVG |
| **趣味拼接** | 双色分割 | 对比色 | 高（主视觉） | 粗线条 SVG |
| **复古报刊** | `#F5F0E8` | `#78716c` | 低（复古棕） | 线条 SVG |
| **极简现代** | `#FFFFFF` | `#dc2626` | 极少（1-2处红线） | 无 |
| **纸墨文学** | `#FAFAF8` | `#1c1917` | 极少（墨色） | 无 |
| **Anthropic 文档** | `#F5F1E8` | `#FF6B35` | 中（导航+文件夹） | Lucide+手绘混合 |
| **克制专业主义** | `#FFFFFF` | `#E2725B` | 极少（进度条+焦点） | 无 |

#### 间距与密度参数

| 风格 | 默认密度 | 页面 padding | 卡片间距 | 留白比例 |
|------|---------|-------------|---------|---------|
| **品牌模式** | 低 | 48px | 24px | >40% |
| **数据模式** | 高 | 24px | 12px | 10-20% |
| **金融时报** | 高 | 24px | 1px（网格线） | 15-25% |
| **咨询模式** | 标准 | 32px | 16px | 25-35% |
| **自信宣言** | 低 | 48px | 32px | >50% |
| **现代工坊** | 标准 | 32px | 16px | 30-40% |
| **分类标签** | 高 | 24px | 8px | 20-30% |
| **柔和几何** | 标准 | 32px | 16px | 35-45% |
| **趣味拼接** | 标准 | 32px | 0（无间隙） | 20-30% |
| **复古报刊** | 标准 | 32px | 16px | 30-40% |
| **极简现代** | 标准 | 32px | 16px | 35-45% |
| **纸墨文学** | 极低 | 48px | 24px | >60% |
| **Anthropic 文档** | 标准 | 32px | 16px | 30-40% |
| **克制专业主义** | 标准 | 24-48px | 16-24px | 30-40% |

#### 特殊视觉元素

| 风格 | 标志性元素 | 动画风格 | 特殊处理 |
|------|-----------|---------|---------|
| **品牌模式** | 手绘 SVG + 纸张纹理 | 入场淡入 | 双层偏移边框 |
| **数据模式** | 2px 黑色表头线 | 无动画 | 条件格式（异常值高亮） |
| **金融时报** | 4px 青绿上边框 | 无动画 | 1px 间隙 KPI 网格 |
| **咨询模式** | So What 标题 | 页面切换过渡 | 面包屑导航 |
| **自信宣言** | 巨大字号 + 黑底 | 高对比切换 | 金色分割线 |
| **现代工坊** | 精确网格对齐 | 微交互（hover） | 标签页导航 |
| **分类标签** | 标签页 + 分隔线 | 滑动过渡 | 笔记本边距线 |
| **柔和几何** | 圆角色块 | 柔和缓入 | 几何装饰图案 |
| **趣味拼接** | 双色对角分割 | 对比切换 | 无圆角、粗边框 |
| **复古报刊** | 衬线标题 + 分栏 | 无动画 | 报纸分栏布局 |
| **极简现代** | 红色细线 | 无动画 | 严格网格对齐 |
| **纸墨文学** | 大面积留白 | 缓慢淡入 | 窄行宽、单列布局 |
| **Anthropic 文档** | 文件树 + 代码块 | 滚动展开 | 功能色编码 |
| **克制专业主义** | 3px 进度条 + 页码徽章 | 页面切换 | 2.4px 陶土色顶部线 |

```css
:root {
  /* === 色彩系统 === */
  --text-primary: #111111;
  --text-secondary: #666666;
  --text-tertiary: #999999;
  --bg: #FFFFFF;
  --surface: #FAFAFA;
  --border: #E5E5E5;
  --accent: #E2725B;
  --accent-light: rgba(226, 114, 91, 0.1);

  /* === 字体层级（克制专业主义 — 年老师满意版） === */
  --t1-cover: clamp(2.2rem, 5.5vw, 3.5rem);  /* 封面标题 35-40px */
  --t1-page: clamp(1.8rem, 4.5vw, 2.8rem);   /* 页面标题 28-30px */
  --t2: clamp(1rem, 2vw, 1.3rem);            /* 模块标题 16-18px */
  --t3: clamp(0.85rem, 1.3vw, 1rem);         /* 卡片标题 14-15px */
  --t4: clamp(0.75rem, 1.2vw, 0.9rem);       /* 正文 12-13px */
  --t6: clamp(0.6rem, 0.8vw, 0.7rem);        /* 标签/页码 10px */

  /* === 间距系统（4pt 基准） === */
  --space-xs: 4px;   --space-sm: 8px;   --space-md: 12px;
  --space-lg: 16px;  --space-xl: 24px;  --space-2xl: 32px;

  /* === 页面级间距（标准密度） === */
  --page-padding: clamp(1.5rem, 4vw, 3rem);  /* 24-48px */
  --card-padding: clamp(1rem, 2vw, 1.5rem);  /* 16-24px */
  --card-gap: clamp(1rem, 2vw, 1.5rem);      /* 16-24px */

  /* === 边框系统 === */
  --border-thin: 1px solid var(--border);
  --border-thick: 2px solid var(--text-primary);
  --border-accent: 1px solid var(--accent);
  --border-radius: 2px;              /* ⚠️ 注意：2px 不是 4px */
  --divider-height: 2px;             /* 分割线高度 */
  --progress-bar-height: 3px;        /* 进度条高度 */
}
```

---

### 参数协调规则

| 协调关系 | 规则 |
|---------|------|
| **边框 × 间距** | 1px 边框配标准间距，2px 边框配加大间距 |
| **字号 × 间距** | 大层级差（T1-T2）配大段落间距（24px） |
| **强调色 × 密度** | 高密度用微点缀，低密度用大面积 |
| **圆角 × 气质** | 锐利气质用 0-2px，温暖气质用 8-16px |

---

### 执行稳定性检查清单

- [ ] **参数查表**：先查速查表确认参数值，不凭感觉
- [ ] **色彩一致**：主色、强调色、背景色从速查表取值
- [ ] **密度一致**：同一产出的所有页面使用相同密度
- [ ] **圆角一致**：同风格内所有元素圆角相同
- [ ] **强调色克制**：一页一处强调，位置按焦点优先级选

---

## Phase 3: Generate Output

### 图标规范（CRITICAL）

**禁止使用**：
- ❌ Emoji 图标（⛓️、🔀、⚡ 等）
- ❌ 组件库图标（Lucide、Heroicons、Phosphor 等）
- ❌ 任何现成的图标字体

**必须使用**：手绘 SVG（符合品牌模式规范）

**手绘 SVG 规格**：
```css
/* 基础类 */
.hand-drawn {
  fill: none;
  stroke: var(--charcoal);  /* #3D2C29 */
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.hand-drawn-fill {
  fill: var(--terracotta);  /* #E2725B */
  stroke: none;
}
```

**图标来源**：
1. **优先调用素材库** — `assets/icons/` 和 `assets/icons-v2/`（200 个现成图标）
2. **按需手绘** — 根据内容语义绘制匹配的 SVG

**图标放置原则**：
- 由 AI 判断合适位置（卡片标题、模式标识、视觉焦点）
- 每个图标服务于内容语义，不是装饰
- 保持风格统一（都是手绘 + 陶土色点缀）

---

### HTML Architecture (所有风格通用)

```html
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Title]</title>

  <!-- 字体引入 -->
  <link href="..." rel="stylesheet">

  <style>
    /* ===========================================
       VIEWPORT FITTING: MANDATORY BASE STYLES
       =========================================== */
    html, body {
      height: 100%;
      overflow-x: hidden;
    }
    html {
      scroll-snap-type: y mandatory;
      scroll-behavior: smooth;
    }
    .slide {
      width: 100vw;
      height: 100vh;
      height: 100dvh;
      overflow: hidden;
      scroll-snap-align: start;
      display: flex;
      flex-direction: column;
    }

    /* 响应式字体 */
    :root {
      --title-size: clamp(1.5rem, 5vw, 4rem);
      --body-size: clamp(0.75rem, 1.5vw, 1.125rem);
      --slide-padding: clamp(1rem, 4vw, 4rem);
    }

    /* [设计模式特定的 CSS 变量和样式] */
  </style>
</head>
<body>
  <!-- 内容 -->
  <script>
    // 导航、动画等交互逻辑
  </script>
</body>
</html>
```

### Required JavaScript Features

```javascript
class SlidePresentation {
  constructor() {
    this.slides = document.querySelectorAll('.slide');
    this.currentIndex = 0;
    this.init();
  }

  init() {
    // 键盘导航
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') this.next();
      if (e.key === 'ArrowLeft') this.prev();
    });

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.5 });

    this.slides.forEach(slide => observer.observe(slide));
  }

  next() { /* ... */ }
  prev() { /* ... */ }
}

new SlidePresentation();
```

---

## Phase 4: PPT Conversion

(保留原 frontend-slides 的 PPT 转换流程)

---

## Phase 5: Delivery

1. Clean up temporary files
2. Open presentation in browser
3. Provide summary with navigation instructions

---

## Viewport Fitting Checklist

Before generating, verify:
- [ ] Every `.slide` has `height: 100vh; height: 100dvh; overflow: hidden;`
- [ ] All font sizes use `clamp()`
- [ ] All spacing uses `clamp()` or viewport units
- [ ] Content containers have `max-height` constraints
- [ ] Images have `max-height: min(50vh, 400px)`
- [ ] Breakpoints exist for heights: 700px, 600px, 500px
- [ ] Content per slide respects density limits

---

---

## 手绘 SVG：两种方式

### 方式 1：手写（推荐用于图标）

**适用场景：** 图标、小装饰、需要大量使用

**优点：** 简洁、可控、零成本、通过 CSS 变量变色

**参考：** 见上方「品牌模式」中的手绘 SVG 规范

### 方式 2：Quiver AI API（推荐用于复杂插图）

**适用场景：** 封面大图、复杂插图、时间紧张时

**调用示例：**
```javascript
const response = await fetch('https://api.quiver.ai/v1/svgs/generations', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer sk_live_JTeCrNxZLMMeBL9pgbijT2`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'arrow-preview',
    prompt: 'A hand-drawn style book icon, warm terracotta color',
    instructions: 'Hand-drawn aesthetic, organic lines, warm and friendly',
  }),
});
const { data } = await response.json();
// data[0].svg 包含 SVG 字符串
```

**使用建议：**
- 图标/装饰 → 手写
- 复杂插图/封面 → Quiver API
- 两者可混合使用

**详细对比：** 见 `QUIVER-COMPARISON.md`

---

## 素材资源

### Lucene 风格图标库 — 13 种设计风格

**位置**：`assets/icons-<mode>/`

为每种设计风格配备的 Lucene 风格核心图标（40 个/风格）：

| 风格 | 文件夹 | 主色调 | 数量 |
|------|--------|--------|------|
| 品牌模式 | `icons-brand/` | `#E2725B` | 40 |
| 数据模式 | `icons-data/` | `#E2725B` | 40 |
| 金融时报 | `icons-financial-times/` | `#0d7680` | 40 |
| 咨询模式 | `icons-consulting/` | `#B85450` | 40 |
| 自信宣言 | `icons-confidence/` | `#D4AF37` | 40 |
| 现代工坊 | `icons-modern-workshop/` | `#6366f1` | 40 |
| 分类标签 | `icons-tags/` | `#475569` | 40 |
| 柔和几何 | `icons-pastel/` | `#F8B4D9` | 40 |
| 趣味拼接 | `icons-split/` | `#FF6B6B` | 40 |
| 复古报刊 | `icons-vintage/` | `#78716c` | 40 |
| 极简现代 | `icons-swiss/` | `#dc2626` | 40 |
| 纸墨文学 | `icons-ink/` | `#1c1917` | 40 |
| Anthropic 文档 | `icons-anthropic-docs/` | `#FF6B35` | 40 |

**通用图标列表**（40 个）：
```
箭头：arrow-right, arrow-left, arrow-up, arrow-down, chevron-right, chevron-left, chevron-up, chevron-down
文件：folder, folder-open, file
操作：search, plus, minus, x, check, copy, download, upload, refresh, settings
导航：home, external-link, bookmark, filter
媒体：play, pause, stop, skip-forward, skip-back, volume, mute
其他：circle, menu, more-horizontal, more-vertical, star, sort-asc, sort-desc
```

**使用方式**：
```html
<!-- 使用对应风格的图标 -->
<img src="assets/icons-<mode>/<icon-name>.svg" />
```

---

### 手绘 SVG 图标库

**位置**：`assets/icons/` 和 `assets/icons-v2/`

**设计规范**：
- 线条：炭灰色 `#3D2C29`，2.5px 粗细
- 点缀：陶土色 `#E2725B`，小面积填充
- viewBox：48×48

**第一批 (100个)** — 供应商管理通用：
| 类别 | 示例 |
|------|------|
| 供应商管理 | 准入、评估、准入、清退、合作、谈判 |
| 业务运营 | 产能、目标、进度、完成、延期 |
| 数据分析 | 趋势、对比、排名、异常、基准 |
| 沟通协作 | 汇报、通知、会议、协商、反馈 |
| 文档管理 | 合同、报告、归档、审批 |
| 状态标识 | 完成、进行中、待处理、风险 |

**第二批 (100个)** — 金融电销场景：
| 类别 | 示例 |
|------|------|
| 金融电销营销 | 坐席、话术、拨打、获客、进件、批贷 |
| 供应商生命周期 | 招标、评标、中标、签约、培训、结算 |
| 日常配合管理 | 响应、值班、报送、考核、排名 |
| 质检合规 | 抽检、合规话术、敏感词、投诉处理 |
| 数据指标 | 留存率、接通率、环比、同比 |

**使用方式**：
```html
<!-- 直接读取 SVG 文件内容嵌入 -->
<!-- 或使用 CSS 类定义样式 -->
<style>
  .stroke { fill: none; stroke: #3D2C29; stroke-width: 2.5; stroke-linecap: round; }
  .fill { fill: #E2725B; }
</style>
```

**预览页面**：
- `assets/icon-preview.html` — 第一批
- `assets/icon-preview-v3.html` — 第二批

---

### Anthropic 技术文档专用图标

**位置**：`assets/anthropic-icons/`

**Lucene 风格（50 个）**：文件类型、操作、导航、状态
**手绘风格（50 个）**：章节分隔、装饰插图、概念图标、空状态

详见：`assets/anthropic-icons/README.md`

---

## Phase 4: Quality Check

> ⚠️ **重要**：当用户选择需要质量把控的风格（如"克制专业主义"）时，此阶段为**强制执行**。
> 不完成质量自检，不允许交付输出。
>
> **轻量风格可跳过**：趣味拼接、柔和几何等创意类风格可直接交付。

### 质量自检清单（11 分制）

**第一层：内容编辑检查（3 分）**

- [ ] **核心观点**：能用一句话说清楚这页的核心观点吗？
- [ ] **减法原则**：删掉了所有不影响核心观点的文字吗？
- [ ] **信息密度**：视觉块数量≤7 个吗？

**第二层：设计判断检查（3 分）**

- [ ] **密度选择**：简约/标准/丰富 的选择有明确理由吗？
- [ ] **版式匹配**：为什么用这个版式？内容特征匹配吗？
- [ ] **焦点唯一**：陶土色只用在一处吗？这处是最重要的信息吗？

**第三层：视觉执行检查（5 分）**

- [ ] **顶部装饰线**：2.4px 陶土色线存在吗？
- [ ] **页码徽章**：非封面页有右下角圆形页码吗？
- [ ] **无阴影无渐变**：检查所有元素，有违规吗？
- [ ] **文字对比度**：所有文字能清晰阅读吗？
- [ ] **视口适配**：100vh, overflow: hidden 吗？

### 自检评分

| 层级 | 总分 | 得分 | 判定 |
|------|------|------|------|
| 内容编辑 | 3 分 | __ | ≥2 分通过 |
| 设计判断 | 3 分 | __ | ≥2 分通过 |
| 视觉执行 | 5 分 | __ | ≥4 分通过 |

**总计**：___ / 11 分 → **≥8 分可交付，<8 分需要返工**

### 输出格式

在交付之前，必须输出自检记录：

```markdown
## 质量自检记录

| 层级 | 总分 | 得分 | 判定 |
|------|------|------|------|
| 内容编辑 | 3 | [得分] | [通过/不通过] |
| 设计判断 | 3 | [得分] | [通过/不通过] |
| 视觉执行 | 5 | [得分] | [通过/不通过] |

**总计**：[X] / 11 分 → [可交付/需要返工]

[如有不通过项，说明返工计划]
```

---

*版本：v3.0.0*
*创建：2026-03-22*
*更新：2026-03-30 — v3.0.0 autoresearch 优化：新增 Phase 1.8 内容基因提取（Content DNA，吸收 canvas-design Conceptual DNA）；重写 Phase 2 为风格推理引擎（内容驱动风格选择，非用户点菜）；简化 Phase 1 为零交互模式；补充 14 种风格全参数速查表（字体/色彩/间距/密度/特殊元素）；精简 Phase 2.1 为冲突处理附录*
*更新：2026-03-30 — Phase 2.6 参数系统校准：用年老师满意的案例（刘乾坤带节奏分析）修正参数（圆角 2px、进度条 3px、封面标题 35-40px、padding 上限 48px、新增徽章系统）*
*更新：2026-03-30 — 新增 Phase 2.6 参数系统（执行稳定性的保证），定义克制专业主义的具体参数值（字号/边框/间距/陶土色）*