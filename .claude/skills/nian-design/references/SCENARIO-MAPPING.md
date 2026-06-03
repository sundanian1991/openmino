# Haglöfs 场景-组件映射

> 基于 tokens.md + haglofs-components.md + all-components.md 提取
> 核心：先判断场景，再选组件，快速实现

---

## 场景分类（10个使用场景）

### 工作类场景

#### 1. 数据分析报告
**特点**：数据密集、可视化优先、信息密度高
**适用**：月度/季度业绩、供应商排名、达成率
**核心组件**：Metric Card, Rank Bar, Gauge Arc, Data Table, Segmented Block Bar

#### 2. 操作手册/SOP
**特点**：流程清晰、步骤明确、可操作性强
**适用**：流程文档、培训材料、操作指南
**核心组件**：Step Sequence, Checklist, Callout, Code Block, Timeline

#### 3. 工作汇报
**特点**：成果导向、数据支撑、向上对齐
**适用**：向领导/同事展示成果、项目复盘
**核心组件**：Hero, Metric Cards, Progress Bar, Comparison Table

#### 4. 供应商介绍
**特点**：品牌调性、产品展示、规格清晰
**适用**：合作伙伴资料、品牌手册、供应商档案
**核心组件**：Brand Card, Product Card, Spec Table, Logo Wall

#### 5. 服务方案
**特点**：能力展示、价值传递、行动召唤
**适用**：供应商能力、服务介绍、合作提案
**核心组件**：Bento Grid, Feature Block, Testimonial, CTA

### 个人类场景

#### 6. 学习笔记
**特点**：阅读优先、知识沉淀、个人成长
**适用**：阅读文章、研究资料的可视化
**核心组件**：Prose, Blockquote, Code Block, Callout

#### 7. 知识管理
**特点**：结构清晰、易于检索、持续积累
**适用**：个人知识库、读书笔记、方法论整理
**核心组件**：Tab Panel, Accordion, Search, Index

#### 8. 创意探索
**特点**：设计实验、视觉创新、技术炫技
**适用**：设计实验、炫技、探索性项目
**核心组件**：Custom Illustration, Animation, Experimental

### 混合类场景

#### 9. 数据+叙事
**特点**：数据驱动、故事包装、洞察传递
**适用**：数据分析报告 + 品牌洞察、数据故事
**核心组件**：Metric Cards, Prose, Tension Grid, Sparkline

#### 10. 品牌+产品
**特点**：品牌调性、产品展示、价值传递
**适用**：品牌介绍 + 产品展示、品牌产品手册
**核心组件**：Hero, Brand Card, Product Grid, Spec Table

---

## 组件映射

### 文章/长文（Article）

**核心组件：**
| 组件 | 用途 | 优先级 |
|------|------|--------|
| Hero（clip-path） | 开屏视觉冲击 | ★★★★★ |
| Section（section-label + section-title） | 内容分区 | ★★★★★ |
| Prose（h2, h3, p, a, code, pre, blockquote, ul） | 文章排版 | ★★★★★ |
| Callout（warning/tip/info） | 提示框 | ★★★★ |
| Checklist | 检查清单 | ★★★★ |
| Step Num（72px Georgia） | 步骤编号 | ★★★★ |
| Table | 数据表格 | ★★★ |
| Divider | 分隔线 | ★★★ |
| Footer（深色背景） | 页面结尾 | ★★★★★ |

**可选组件：**
- Timeline（时间线）
- Blockquote（引用）
- Code Block（代码块）
- Do/Don't Comparison（对比）

**组合示例：**
```
Hero → Section → Prose → Callout → Section → Prose → Checklist → Footer
```

---

### 数据分析（Data）

**核心组件：**
| 组件 | 用途 | 优先级 |
|------|------|--------|
| Metric Card（LED-style） | 核心指标 | ★★★★★ |
| Rank Bar | 排名展示 | ★★★★★ |
| Segmented Block Bar | 进度/评分 | ★★★★★ |
| Gauge Arc | 单指标仪表盘 | ★★★★ |
| Data Table | 数据表格 | ★★★★★ |
| Inline Bar | 紧凑指标 | ★★★★ |
| Sparkline | 趋势线 | ★★★★ |
| Three-Column Grid | 对比布局 | ★★★ |

**可选组件：**
- Flow Pipeline（流程）
- Tab Panel（多维度切换）
- Segmented Control（筛选器）
- Reference Line Overlay（目标线）

**组合示例：**
```
Metric Cards (4列) → Rank Bar → Data Table → Segmented Block Bar
```

---

### 品牌表达（Brand）

**核心组件：**
| 组件 | 用途 | 优先级 |
|------|------|--------|
| Hero（Photographic） | 全屏摄影 | ★★★★★ |
| Tension Grid（2×2） | 核心张力 | ★★★★★ |
| Brand Statement Card | 品牌宣言 | ★★★★★ |
| Single Huge Quote | 创始人引言 | ★★★★★ |
| Color Swatch Grid | 色板展示 | ★★★★ |
| Typography Showcase | 字体展示 | ★★★★ |
| Symbol Evolution | 标志演进 | ★★★★ |
| Numeral Grid | 数字展示 | ★★★★ |

**可选组件：**
- Dot Matrix Logo（点阵标志）
- Dot Pattern（装饰图案）
- Scene Overlay（场景覆盖）
- Timeline（品牌历史）

**组合示例：**
```
Hero (Photographic) → Tension Grid → Brand Statement → Color Swatch → Typography Showcase → Footer
```

---

### 产品展示（Product）

**核心组件：**
| 组件 | 用途 | 优先级 |
|------|------|--------|
| Product Card | 产品卡片 | ★★★★★ |
| Spec Table | 规格表 | ★★★★★ |
| Annotated Screenshot | 细节标注 | ★★★★ |
| Comparison Table | 产品对比 | ★★★★ |
| Tab Panel | 多维度切换 | ★★★★ |
| Accordion | 折叠详情 | ★★★★ |

**可选组件：**
- Progress Bar（评分）
- Nameplate Label（标签）
- Checklist（功能清单）

**组合示例：**
```
Product Card Grid → Spec Table → Comparison Table → Accordion
```

---

## 工作类场景映射

### 数据分析报告

**核心组件：**
| 组件 | 用途 | 优先级 |
|------|------|--------|
| Metric Card（LED-style） | 核心指标 | ★★★★★ |
| Rank Bar | 排名展示 | ★★★★★ |
| Gauge Arc | 单指标仪表盘 | ★★★★ |
| Segmented Block Bar | 进度/评分 | ★★★★★ |
| Data Table | 数据表格 | ★★★★★ |
| Inline Bar | 紧凑指标 | ★★★★ |
| Sparkline | 趋势线 | ★★★★ |

**可选组件：**
- Three-Column Grid（对比布局）
- Flow Pipeline（流程）
- Tab Panel（多维度切换）
- Segmented Control（筛选器）

**组合示例：**
```
Hero (dark) → Metric Cards (4列) → Rank Bar → Data Table → Segmented Block Bar → Footer
```

---

### 操作手册/SOP

**核心组件：**
| 组件 | 用途 | 优先级 |
|------|------|--------|
| Step Sequence | 流程步骤 | ★★★★★ |
| Checklist | 检查清单 | ★★★★★ |
| Callout Block | 提示说明 | ★★★★ |
| Code Block | 代码展示 | ★★★★ |
| Timeline | 时间线 | ★★★ |
| Do/Don't Comparison | 规则对比 | ★★★★ |

**可选组件：**
- Prose（文章排版）
- Blockquote（引用）
- Table（数据表格）

**组合示例：**
```
Hero (clip-path) → Section (numbered) → Prose + Step Seq + Checklist → Callout → Footer
```

---

### 工作汇报

**核心组件：**
| 组件 | 用途 | 优先级 |
|------|------|--------|
| Hero（split/dark） | 开屏视觉 | ★★★★★ |
| Metric Cards | 核心指标 | ★★★★★ |
| Progress Bar | 进度展示 | ★★★★ |
| Comparison Table | 对比分析 | ★★★★ |
| Segmented Control | 维度切换 | ★★★ |

**可选组件：**
- Rank Bar（排名）
- Sparkline（趋势）
- Data Table（数据表格）

**组合示例：**
```
Hero (split) → Metric Cards → Progress Bars → Comparison Table → Footer
```

---

### 供应商介绍

**核心组件：**
| 组件 | 用途 | 优先级 |
|------|------|--------|
| Brand Card | 品牌宣言 | ★★★★★ |
| Product Card | 产品展示 | ★★★★★ |
| Spec Table | 技术规格 | ★★★★★ |
| Logo Wall | 合作伙伴 | ★★★★ |
| Timeline | 品牌历史 | ★★★ |
| Color Swatch | 色板展示 | ★★★★ |

**可选组件：**
- Typography Showcase（字体展示）
- Symbol Evolution（标志演进）
- Testimonial（客户评价）

**组合示例：**
```
Hero (photographic) → Brand Card → Product Grid → Spec Table → Logo Wall → Footer
```

---

### 服务方案

**核心组件：**
| 组件 | 用途 | 优先级 |
|------|------|--------|
| Bento Grid | 能力展示 | ★★★★★ |
| Feature Block | 功能介绍 | ★★★★★ |
| Testimonial | 客户评价 | ★★★★ |
| CTA | 行动召唤 | ★★★★ |
| Pricing Table | 定价展示 | ★★★（待补充） |

**可选组件：**
- Comparison Table（对比表）
- Checklist（功能清单）
- Progress Bar（进度展示）

**组合示例：**
```
Hero (marquee) → Bento Grid → Feature Blocks → Testimonial → CTA → Footer
```

---

## 个人类场景映射

### 学习笔记

**核心组件：**
| 组件 | 用途 | 优先级 |
|------|------|--------|
| Prose | 文章排版 | ★★★★★ |
| Blockquote | 引用 | ★★★★★ |
| Code Block | 代码块 | ★★★★ |
| Callout Block | 重点提示 | ★★★★ |
| Step Num | 步骤编号 | ★★★ |

**可选组件：**
- Table（数据表格）
- Timeline（时间线）
- Do/Don't Comparison（对比）

**组合示例：**
```
Hero (clip-path) → Section → Prose + Callout + Code Block → Footer
```

---

### 知识管理

**核心组件：**
| 组件 | 用途 | 优先级 |
|------|------|--------|
| Tab Panel | 分类切换 | ★★★★★ |
| Accordion | 折叠内容 | ★★★★★ |
| Search | 搜索功能 | ★★★（待补充） |
| Index | 索引导航 | ★★★（待补充） |

**可选组件：**
- Prose（文章排版）
- Blockquote（引用）
- Table（数据表格）

**组合示例：**
```
Hero (light) → Tab Panel → Accordions → Search → Footer
```

---

### 创意探索

**核心组件：**
| 组件 | 用途 | 优先级 |
|------|------|--------|
| Custom Illustration | 自定义插画 | ★★★★★ |
| Dot Matrix | 点阵视觉 | ★★★★ |
| Animation | 动画效果 | ★★★（待补充） |
| Experimental | 实验性组件 | ★★★（待补充） |

**可选组件：**
- Hero（custom）
- Tension Grid（核心张力）
- Color Swatch（色板展示）

**组合示例：**
```
Hero (custom) → Dot Matrix → Animation → Experimental → Footer
```

---

## 混合类场景映射

### 数据+叙事

**核心组件：**
| 组件 | 用途 | 优先级 |
|------|------|--------|
| Metric Cards | 数据展示 | ★★★★★ |
| Prose | 叙事文本 | ★★★★★ |
| Tension Grid | 核心张力 | ★★★★ |
| Sparkline | 趋势线 | ★★★★ |
| Callout Block | 重点提示 | ★★★ |

**可选组件：**
- Rank Bar（排名）
- Data Table（数据表格）
- Blockquote（引用）

**组合示例：**
```
Hero (dark) → Metric Cards → Prose → Tension Grid → Sparkline → Footer
```

---

### 品牌+产品

**核心组件：**
| 组件 | 用途 | 优先级 |
|------|------|--------|
| Hero (photographic) | 全屏摄影 | ★★★★★ |
| Brand Card | 品牌宣言 | ★★★★★ |
| Product Grid | 产品展示 | ★★★★★ |
| Spec Table | 技术规格 | ★★★★ |
| Color Swatch | 色板展示 | ★★★★ |

**可选组件：**
- Tension Grid（核心张力）
- Typography Showcase（字体展示）
- Logo Wall（合作伙伴）

**组合示例：**
```
Hero (photographic) → Brand Card → Product Grid → Spec Table → Color Swatch → Footer
```

---

## 快速选型矩阵

| 场景类型 | Hero | 核心组件 | Footer |
|---------|------|---------|--------|
| **数据分析报告** | Hero (dark) | Metric Cards + Rank Bar + Data Table | Footer |
| **操作手册/SOP** | Hero (clip-path) | Step Seq + Checklist + Callout | Footer |
| **工作汇报** | Hero (split) | Metric Cards + Progress Bar + Comparison | Footer |
| **供应商介绍** | Hero (photographic) | Brand Card + Product Card + Spec Table | Footer |
| **服务方案** | Hero (marquee) | Bento Grid + Feature Block + CTA | Footer |
| **学习笔记** | Hero (clip-path) | Prose + Blockquote + Code Block | Footer |
| **知识管理** | Hero (light) | Tab Panel + Accordion | Footer |
| **创意探索** | Hero (custom) | Custom Illustration + Dot Matrix | Footer |
| **数据+叙事** | Hero (dark) | Metric Cards + Prose + Tension Grid | Footer |
| **品牌+产品** | Hero (photographic) | Brand Card + Product Grid + Spec Table | Footer |

---

## Token 使用规则

### 颜色规则（重要）

**禁止使用红绿功能色。** Haglöfs 是 monochrome + 单色强调的设计系统，红绿两色不属于品牌色板。

| 状态 | 正确用法 | 错误用法 |
|------|---------|---------|
| Warning | `signal-warning` + `surface-alt` 背景 | 红色背景 + 红色文字 |
| Tip/Success | `brand-primary` + `surface-alt` 背景 | 绿色背景 + 绿色文字 |
| Error | `error`（仅用于真实错误状态） | 红色 Callout |
| Info | `brand-tertiary` + `surface-alt` 背景 | 蓝色背景 + 蓝色文字 |

**Callout 样式：**
- 背景：`var(--surface-alt)`（统一）
- 边框：左侧 3px，使用品牌色
- 文字：`var(--text-primary)`（统一）
- 标题：JetBrains Mono，大写，品牌色

**为什么：** 红绿功能色是 SaaS/仪表盘的设计语言，不是品牌设计语言。品牌设计系统用 monochrome + 单色强调，保持视觉一致性。

### 字体选择

| 场景 | Display | Body | Data |
|------|---------|------|------|
| 文章 | Georgia | Inter | JetBrains Mono |
| 数据 | JetBrains Mono | Inter | JetBrains Mono |
| 品牌 | Georgia | Inter | JetBrains Mono |
| 产品 | Georgia | Inter | JetBrains Mono |

### 颜色使用

| 场景 | 主色 | 强调色 | 场景色 |
|------|------|--------|--------|
| 文章 | charcoal | stone | cream |
| 数据 | olive | orange | glacier |
| 品牌 | olive | yellow | glacier |
| 产品 | charcoal | orange | rock |

### 间距使用

| 场景 | Section 间距 | 组件间距 | 内边距 |
|------|-------------|---------|--------|
| 文章 | 96px | 48px | 32px |
| 数据 | 64px | 24px | 16px |
| 品牌 | 96px | 48px | 32px |
| 产品 | 64px | 24px | 16px |

---

## 内容类型判断流程

当有新内容进来时：

1. **识别核心目的**
   - 阅读 → 文章
   - 看数据 → 数据分析
   - 感受品牌 → 品牌表达
   - 看产品 → 产品展示

2. **选择组件组合**
   - 根据上面的映射表选择核心组件
   - 根据内容复杂度决定是否需要可选组件

3. **应用 Token**
   - 根据场景选择字体、颜色、间距

4. **组合输出**
   - 按照组合示例的顺序排列组件
   - 确保视觉节奏（深浅交替、留白呼吸）

---

*基于 Haglöfs Design System by Stockholm Design Lab, 2024*
