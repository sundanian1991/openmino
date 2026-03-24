---
name: mino-frontend
description: "年老师专属前端技能 — 创建 HTML 幻灯片、数据仪表盘、前端页面。触发词：演示文稿、幻灯片、仪表盘、数据看板、前端页面、HTML 演示。支持 4 种核心设计模式 + 8 种可选风格。零依赖，单文件输出。"
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

Ask via AskUserQuestion:

### Step 1.1: Context

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

## Phase 2: Style Selection

Present the 12 styles organized in two tiers:

### 年老师核心设计模式（4 种）

| Mode | Core Color | Best For |
|------|------------|----------|
| **品牌模式** | Terracotta `#E2725B` | User-facing pages, brand content |
| **数据模式** | B&W + Terracotta accent | Reports, print, minimal data |
| **金融时报** | Teal `#0d7680` | Supplier dashboards, financial data |
| **咨询模式** | Charcoal `#333` + Red accent | Strategy presentations, PPT |

### 可选补充风格（8 种）

| Style | Vibe | Best For |
|-------|------|----------|
| Bold Signal | Confident, high-impact | Pitch decks, keynotes |
| Electric Studio | Clean, professional | Agency presentations |
| Notebook Tabs | Editorial, organized | Reports, reviews |
| Pastel Geometry | Friendly, approachable | Product overviews |
| Split Pastel | Playful, modern | Creative agencies |
| Vintage Editorial | Personality-driven | Personal brands |
| Swiss Modern | Minimal, precise | Corporate, data |
| Paper & Ink | Literary, thoughtful | Storytelling |

Use AskUserQuestion to let user pick:

**Question: Design Mode**
- Header: "Style"
- Question: "Which design mode fits your needs?"
- Options: [List the 4 core modes + "Show more options"]

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

## 可选风格完整规范

（详见 `references/styles.md`）

---

## Phase 2.5: 设计哲学层（审美判断力）

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

### 步骤 3：极致工艺检查清单

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

## Phase 3: Generate Output

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

*版本：v1.4*
*创建：2026-03-22*
*更新：2026-03-24 — 融合 canvas-design 设计哲学层（Phase 2.5），增加审美判断力*