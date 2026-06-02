# Haglöfs CSS 架构

> 组件库 + 场景组合 = 可复用、可延展的设计系统

---

## 核心理念

**不是"四个独立的 CSS"，而是"一个组件库 + 多个场景组合"。**

每个场景都是组件的排列组合。场景之间可以交叉调用组件。

---

## 架构层级

```
┌─────────────────────────────────────┐
│  场景组合（Scenario Compositions）   │
│  文章 · 数据 · 品牌 · 产品 · 混合   │
└─────────────┬───────────────────────┘
              │ 调用
┌─────────────▼───────────────────────┐
│  组件库（Component Library）         │
│  Hero · Section · Data · Content    │
│  Brand · Product · Navigation       │
└─────────────┬───────────────────────┘
              │ 基于
┌─────────────▼───────────────────────┐
│  Token 系统（Design Tokens）         │
│  Color · Typography · Spacing       │
└─────────────────────────────────────┘
```

---

## 组件库清单

### 1. Hero 变体

| 变体 | 用途 | 场景 |
|------|------|------|
| `hero-clip` | clip-path 斜切块 + 年份水印 | 文章、品牌 |
| `hero-dark` | 深色背景 + 大数字 + 进度条 | 数据 |
| `hero-split` | 左右分栏（规格 + 图片） | 产品 |
| `hero-photographic` | 全屏摄影 + 文字覆盖 | 品牌 |

### 2. Section 变体

| 变体 | 用途 | 场景 |
|------|------|------|
| `section-numbered` | 编号标签 + 标题 | 文章、品牌 |
| `section-dark` | 深色背景 + 浅色文字 | 数据、品牌 |
| `section-light` | 浅色背景 + 深色文字 | 通用 |

### 3. Data 组件

| 组件 | 用途 | 场景 |
|------|------|------|
| `metric-card` | LED 风格大数字 | 数据 |
| `rank-bar` | 排名进度条 | 数据 |
| `segmented-bar` | 分段进度条 | 数据 |
| `gauge-arc` | 弧形仪表盘 | 数据 |
| `data-table` | 数据表格 | 数据 |
| `sparkline` | 趋势线 | 数据 |

### 4. Content 组件

| 组件 | 用途 | 场景 |
|------|------|------|
| `prose` | 文章排版 | 文章 |
| `callout` | 提示框（品牌色版） | 文章 |
| `checklist` | 检查清单 | 文章 |
| `step-num` | 步骤编号 | 文章 |
| `table` | 通用表格 | 通用 |
| `code-block` | 代码块 | 文章 |

### 5. Brand 组件

| 组件 | 用途 | 场景 |
|------|------|------|
| `tension-grid` | 核心张力 2×2 | 品牌 |
| `brand-card` | 品牌宣言 | 品牌 |
| `color-swatch` | 色板展示 | 品牌 |
| `typography-showcase` | 字体展示 | 品牌 |
| `symbol-evolution` | 标志演进 | 品牌 |

### 6. Product 组件

| 组件 | 用途 | 场景 |
|------|------|------|
| `product-card` | 产品卡片 | 产品 |
| `spec-table` | 技术规格 | 产品 |
| `comparison-table` | 产品对比 | 产品 |

---

## 场景组合

### 场景 1：文章/长文

```
hero-clip → section-numbered → prose + callout + checklist → footer
```

**延展：**
- 加入 `metric-card` → 数据驱动的文章
- 加入 `tension-grid` → 品牌理念文章
- 加入 `product-card` → 产品介绍文章

### 场景 2：数据分析

```
hero-dark → metric-cards → rank-bar + data-table → footer
```

**延展：**
- 加入 `prose` → 数据分析报告（有叙事）
- 加入 `tension-grid` → 数据背后的品牌洞察
- 加入 `sparkline` → 趋势分析

### 场景 3：品牌表达

```
hero-photographic → tension-grid → brand-card + color-swatch + typography → footer
```

**延展：**
- 加入 `metric-card` → 品牌数据（市场份额、增长）
- 加入 `rank-bar` → 品牌排名
- 加入 `product-card` → 产品线展示

### 场景 4：产品展示

```
hero-split → spec-table → product-grid → footer
```

**延展：**
- 加入 `prose` → 产品故事
- 加入 `tension-grid` → 产品设计理念
- 加入 `rank-bar` → 产品对比

### 场景 5：混合场景

```
hero-clip → prose → tension-grid → metric-cards → prose → footer
```

**用途：** 当内容同时包含叙事、品牌、数据时

---

## 延展性原则

### 1. 组件可跨场景调用

- `metric-card` 可以用在文章、品牌、产品场景
- `prose` 可以用在数据、品牌、产品场景
- `tension-grid` 可以用在文章、数据、产品场景

### 2. 场景可嵌套

- 文章中可以嵌入数据可视化
- 数据中可以嵌入品牌叙事
- 产品中可以嵌入技术规格

### 3. 组件可组合

- `metric-card` + `sparkline` = 带趋势的指标
- `rank-bar` + `segmented-bar` = 多维度排名
- `prose` + `callout` = 带提示的文章

---

## 使用流程

### 1. 识别内容类型

- 阅读型 → 文章
- 看数据 → 数据分析
- 感受品牌 → 品牌表达
- 看产品 → 产品展示
- 混合型 → 混合场景

### 2. 选择基础场景

根据内容类型选择基础场景组合

### 3. 延展调用

根据需要加入其他场景的组件

### 4. 组合输出

按顺序排列组件，确保视觉节奏

---

## 文件结构

```
css-templates/
├── haglofs-tokens.css      # Token 系统
├── haglofs-components.css  # 组件库（所有组件）
├── scenario-article.css    # 文章场景（组件的组合）
├── scenario-data.css       # 数据场景
├── scenario-brand.css      # 品牌场景
├── scenario-product.css    # 产品场景
└── scenario-mixed.css      # 混合场景
```

**关键：** `scenario-*.css` 只是组件的组合，不定义新样式。所有样式都在 `haglofs-components.css` 中。

---

*基于 Haglöfs Design System by Stockholm Design Lab, 2024*
