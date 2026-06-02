# Haglöfs Showcase — 场景索引

> 按使用场景组织展示文件，快速找到参考案例

---

## 工作类场景

### 1. 数据分析报告

**用途**：月度/季度业绩、供应商排名、达成率

**核心组件**：
- Metric Card（LED-style）
- Rank Bar
- Gauge Arc
- Data Table
- Segmented Block Bar
- Sparkline

**参考文件**：
- `design-tokens.html` → 数据可视化部分
- `core-components.html` → 数据组件

**组合示例**：
```
Hero (dark) → Metric Cards (4列) → Rank Bar → Data Table → Segmented Block Bar
```

---

### 2. 操作手册/SOP

**用途**：流程文档、培训材料

**核心组件**：
- Step Sequence
- Checklist
- Callout
- Code Block
- Timeline

**参考文件**：
- `extended-components.html` → 流程组件
- `core-components.html` → 内容组件

**组合示例**：
```
Hero (clip-path) → Section (numbered) → Prose + Step Seq + Checklist → Footer
```

---

### 3. 工作汇报

**用途**：向领导/同事展示成果

**核心组件**：
- Hero
- Metric Cards
- Progress Bar
- Comparison Table
- Do/Don't Comparison

**参考文件**：
- `core-components.html` → 数据组件
- `extended-components.html` → 对比组件

**组合示例**：
```
Hero (split) → Metric Cards → Progress Bars → Comparison Table → Footer
```

---

### 4. 供应商介绍

**用途**：合作伙伴资料、品牌手册

**核心组件**：
- Brand Card
- Product Card
- Spec Table
- Logo Wall
- Timeline

**参考文件**：
- `design-tokens.html` → 品牌组件
- `core-components.html` → 产品组件

**组合示例**：
```
Hero (photographic) → Brand Card → Product Grid → Spec Table → Logo Wall → Footer
```

---

### 5. 服务方案

**用途**：供应商能力、服务介绍

**核心组件**：
- Bento Grid
- Feature Block
- Testimonial
- CTA
- Pricing Table（待补充）

**参考文件**：
- `extended-components.html` → 网格组件
- `core-components.html` → 交互组件

**组合示例**：
```
Hero (marquee) → Bento Grid → Feature Blocks → Testimonial → CTA → Footer
```

---

## 个人类场景

### 6. 学习笔记

**用途**：阅读文章、研究资料的可视化

**核心组件**：
- Prose
- Blockquote
- Code Block
- Callout
- Step Num

**参考文件**：
- `core-components.html` → 内容组件
- `extended-components.html` → 代码组件

**组合示例**：
```
Hero (clip-path) → Section → Prose + Callout + Code Block → Footer
```

---

### 7. 知识管理

**用途**：个人知识库、读书笔记

**核心组件**：
- Tab Panel
- Accordion
- Search（待补充）
- Index（待补充）

**参考文件**：
- `core-components.html` → 交互组件
- `extended-components.html` → 折叠组件

**组合示例**：
```
Hero (light) → Tab Panel → Accordions → Search → Footer
```

---

### 8. 创意探索

**用途**：设计实验、炫技

**核心组件**：
- Custom Illustration
- Animation（待补充）
- Experimental（待补充）

**参考文件**：
- `design-tokens.html` → 点阵视觉
- `extended-components.html` → 扩展组件

**组合示例**：
```
Hero (custom) → Dot Matrix → Animation → Experimental → Footer
```

---

## 混合类场景

### 9. 数据+叙事

**用途**：数据分析报告 + 品牌洞察

**核心组件**：
- Metric Cards
- Prose
- Tension Grid
- Sparkline
- Callout

**参考文件**：
- `core-components.html` → 数据+内容组件
- `design-tokens.html` → 品牌组件

**组合示例**：
```
Hero (dark) → Metric Cards → Prose → Tension Grid → Sparkline → Footer
```

---

### 10. 品牌+产品

**用途**：品牌介绍 + 产品展示

**核心组件**：
- Hero (photographic)
- Brand Card
- Product Grid
- Spec Table
- Color Swatch

**参考文件**：
- `design-tokens.html` → 品牌系统
- `core-components.html` → 产品组件

**组合示例**：
```
Hero (photographic) → Brand Card → Product Grid → Spec Table → Color Swatch → Footer
```

---

## 快速查找

| 场景 | 首选参考文件 | 关键组件 |
|------|-------------|---------|
| 数据分析报告 | `core-components.html` | Metric Card, Rank Bar, Gauge |
| 操作手册/SOP | `extended-components.html` | Step Seq, Checklist, Callout |
| 工作汇报 | `core-components.html` | Metric Cards, Progress Bar |
| 供应商介绍 | `design-tokens.html` | Brand Card, Product Card |
| 服务方案 | `extended-components.html` | Bento Grid, Feature Block |
| 学习笔记 | `core-components.html` | Prose, Blockquote, Code Block |
| 知识管理 | `core-components.html` | Tab Panel, Accordion |
| 创意探索 | `design-tokens.html` | Custom Illustration, Dot Matrix |
| 数据+叙事 | `core-components.html` | Metric Cards, Prose, Tension Grid |
| 品牌+产品 | `design-tokens.html` | Hero, Brand Card, Product Grid |

---

*基于 Haglöfs Design System, 2026-05-31*
