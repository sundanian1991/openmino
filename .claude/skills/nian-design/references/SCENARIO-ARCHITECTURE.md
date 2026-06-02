# Haglöfs CSS 场景架构

> 按使用场景组织CSS，覆盖工作、个人、混合三大类

---

## 场景分类

### 工作类场景

| 场景 | 典型用途 | 核心组件 |
|------|---------|---------|
| **数据分析报告** | 月度/季度业绩、供应商排名、达成率 | Metric Card, Rank Bar, Gauge Arc, Data Table |
| **操作手册/SOP** | 流程文档、培训材料 | Step Sequence, Checklist, Callout, Code Block |
| **工作汇报** | 向领导/同事展示成果 | Hero, Metric Cards, Progress Bar, Comparison Table |
| **供应商介绍** | 合作伙伴资料、品牌手册 | Brand Card, Product Card, Spec Table, Logo Wall |
| **服务方案** | 供应商能力、服务介绍 | Bento Grid, Feature Block, Testimonial, CTA |

### 个人类场景

| 场景 | 典型用途 | 核心组件 |
|------|---------|---------|
| **学习笔记** | 阅读文章、研究资料的可视化 | Prose, Blockquote, Code Block, Callout |
| **知识管理** | 个人知识库、读书笔记 | Tab Panel, Accordion, Search, Index |
| **创意探索** | 设计实验、炫技 | Custom Illustration, Animation, Experimental |

### 混合类场景

| 场景 | 典型用途 | 核心组件 |
|------|---------|---------|
| **数据+叙事** | 数据分析报告 + 品牌洞察 | Metric Cards + Prose + Tension Grid |
| **品牌+产品** | 品牌介绍 + 产品展示 | Hero + Brand Card + Product Grid |

---

## CSS 文件映射

### 基础层（所有场景共用）

| 文件 | 内容 | 用途 |
|------|------|------|
| `haglofs-tokens.css` | 设计令牌 | 颜色、字体、间距、圆角、深度 |
| `haglofs-components.css` | 组件库 | 所有组件的CSS定义 |

### 工作类场景

| 文件 | 场景 | 组件组合 |
|------|------|---------|
| `scenario-data-report.css` | 数据分析报告 | hero-dark + metric-cards + rank-bar + data-table + gauge |
| `scenario-sop.css` | 操作手册/SOP | hero-clip + section-numbered + prose + step-seq + checklist |
| `scenario-work-report.css` | 工作汇报 | hero-split + metric-cards + progress-bar + comparison |
| `scenario-supplier-intro.css` | 供应商介绍 | hero-photographic + brand-card + product-card + spec-table |
| `scenario-service-proposal.css` | 服务方案 | hero-marquee + bento-grid + feature-block + testimonial |

### 个人类场景

| 文件 | 场景 | 组件组合 |
|------|------|---------|
| `scenario-learning-notes.css` | 学习笔记 | hero-clip + prose + blockquote + callout + code-block |
| `scenario-knowledge-mgmt.css` | 知识管理 | hero-light + tab-panel + accordion + search + index |
| `scenario-creative-exploration.css` | 创意探索 | hero-custom + animation + experimental |

### 混合类场景

| 文件 | 场景 | 组件组合 |
|------|------|---------|
| `scenario-data-narrative.css` | 数据+叙事 | hero-dark + metric-cards + prose + tension-grid |
| `scenario-brand-product.css` | 品牌+产品 | hero-photographic + brand-card + product-grid + spec-table |

---

## 使用流程

### 1. 识别场景类型

```
用户需求 → 工作类？个人类？混合类？
```

### 2. 选择具体场景

```
工作类 → 数据分析报告？操作手册？工作汇报？供应商介绍？服务方案？
个人类 → 学习笔记？知识管理？创意探索？
混合类 → 数据+叙事？品牌+产品？
```

### 3. 加载对应CSS

```html
<!-- 基础层 -->
<link rel="stylesheet" href="haglofs-tokens.css">
<link rel="stylesheet" href="haglofs-components.css">

<!-- 场景层 -->
<link rel="stylesheet" href="scenario-data-report.css">
```

### 4. 组合组件

根据场景选择组件，按视觉节奏排列。

---

## 组件库支撑度

| 场景 | 支撑度 | 缺什么 |
|------|--------|--------|
| 数据分析报告 | ★★★★★ | 完整 |
| 操作手册/SOP | ★★★★ | 缺流程图、时间线 |
| 工作汇报 | ★★★★ | 缺图表、对比表 |
| 供应商介绍 | ★★★★★ | 完整 |
| 服务方案 | ★★★★ | 缺定价表、对比表 |
| 学习笔记 | ★★★★ | 缺代码高亮、引用 |
| 知识管理 | ★★★ | 缺索引、搜索 |
| 创意探索 | ★★★ | 缺动画、特效 |
| 数据+叙事 | ★★★★★ | 完整 |
| 品牌+产品 | ★★★★★ | 完整 |

---

## 优先级

1. **数据分析报告**（最常用）
2. **操作手册/SOP**（工作必需）
3. **工作汇报**（向上汇报）
4. **学习笔记**（个人成长）

---

*基于 Haglöfs Design System, 2026-05-31*
