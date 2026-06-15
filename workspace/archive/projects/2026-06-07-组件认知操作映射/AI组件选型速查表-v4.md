# AI 组件选型速查表 v4（定稿）

> 4 级分层。Hero 级 scene 决策已定，Section 级认知操作驱动，Detail/Decorative 级自然附随。

---

## Hero 级

recipe-book 场景决策已定，此处仅列引用清单，不涉及选型判断。

| 组件 | 说明 |
|------|------|
| Marquee | 品牌宣言 Hero，大字号宣言文字 |
| Split Diptych | 产品+景象对屏 |
| Quote Led | 创始人引言页 |
| Photographic | 全屏自然风光影像 |
| V1 Diagonal | 对角切割 |
| V2 Split | 中心劈开 |
| V3 Horizontal | 上下劈开 |
| V4 Quadrant | 四分之一 |
| V5 Bevel | 左斜切 |
| V6 Watermark | 水印声明 |
| Custom Illustration | 品牌 SVG 点阵插画 |
| Product Hero | 产品首屏 |
| hero-numeral | 数据驱动 Hero |

---

## Section 级

区块核心信息载体。认知操作→选组件。

### 扫（概览·SCAN）

| 组件 | 替代 | 什么场景下用替代 |
|------|------|----------------|
| **stat-block** | metric-card | 需要同时看趋势方向 |
| | kpi-card | 涉及达成率 |

| 组件 | 替代 | 什么场景下用替代 |
|------|------|----------------|
| **numeral-grid** | dashboard-grid | 需混合指标+图表+状态 |

### 比（对比·COMPARE）

| 组件 | 替代 | 什么场景下用替代 |
|------|------|----------------|
| **comparison** | tension-grid | 对比有概念性，不是数据层（Heritage vs Future） |
| | do-dont | 对比本身就是结论（这样做对/错） |

| 组件 | 替代 | 什么场景下用替代 |
|------|------|----------------|
| **data-table** | spec-table | 内容是技术参数 |

### 排（排序·RANK）

| 组件 | 替代 | 什么场景下用替代 |
|------|------|----------------|
| **rank-bar** | rank-panel | 排名需要标题/分组上下文 |
| | ranking-table | 需要精确数值，不是视觉冲击 |

| 组件 | 替代 | 什么场景下用替代 |
|------|------|----------------|
| **seg-bar** | weight-bar | 比 seg-bar 更轻量，行内嵌入 |
| | stacked-bar | 需展示"整体=部分之和" |
| | progress-bar | 排的是完成度，不是占比 |

| 组件 | 替代 | 什么场景下用替代 |
|------|------|----------------|
| **numeral-grid** | card-quad | 不只是数字，需卡片内容 |

### 读（流程·FLOW）

| 组件 | 替代 | 什么场景下用替代 |
|------|------|----------------|
| **timeline-track** | flow-pipeline | 需展示流程推进状态 |
| | progress-trail | 需同时看阶段和完成度 |

| 组件 | 替代 | 什么场景下用替代 |
|------|------|----------------|
| **step-sequence** | — | 唯一选择 |

### 量（度量·MEASURE）

| 组件 | 替代 | 什么场景下用替代 |
|------|------|----------------|
| **gauge-arc** | gauge-segmented | 需看到在哪个等级区间 |
| | bullet-chart | 有明确基准值需同视图比较 |

| 组件 | 替代 | 什么场景下用替代 |
|------|------|----------------|
| **sparkline** | line chart | 需要详细趋势图 |

| 组件 | 替代 | 什么场景下用替代 |
|------|------|----------------|
| **block-bar** | progress-row | 需精确百分比数值 |

### 解（解读·READ）

| 组件 | 替代 | 什么场景下用替代 |
|------|------|----------------|
| **callout** | pull-quote | 引用权威人物/机构的话 |
| | blockquote | 内联级引用，嵌入文字流 |
| | marginalia | 深度阅读旁注，多段注释 |
| | brand-statement | 不是通用解读，是品牌立场 |

| 组件 | 替代 | 什么场景下用替代 |
|------|------|----------------|
| **annotated-highlight** | action-list | 不是解读现状，是该做什么 |

### 信（背书·PROVE）

| 组件 | 替代 | 什么场景下用替代 |
|------|------|----------------|
| **logo-wall** | source-row | 需要精确到来源+日期 |
| | tag | 最轻量标注 |

### 展（深入·DIG）

| 组件 | 替代 | 什么场景下用替代 |
|------|------|----------------|
| **accordion** | tab-switcher | 需要并排切换多视图 |
| | detail-panel | 展开后需完整阅读环境 |

---

## Detail 级

数据细节。不放独立的区块，附着在 Section 组件内部或旁边。

| 认知操作 | 组件 | 依附于 |
|---------|------|--------|
| 扫 | data-spotlight | stat-block / numeral-grid 内部单数字聚焦 |
| 量 | sparkline | metric-card / stat-block 内嵌趋势 |
| 量 | progress-row | seg-bar / rank-bar 内精确值 |
| 量 | block-bar | gauge 内评分 |
| 信 | tag | 任何组件的来源/分类标注 |
| 信 | source-row | 数据表格下方出处 |
| 解 | action-list | callout / annotated-highlight 后跟着行动 |
| 排 | ranking-table | rank-bar / numeral-grid 补充精确值 |

---

## Decorative 级

点缀，不承载信息。

| 组件 | 替代 | 什么场景下用替代 |
|------|------|----------------|
| **ghost-text** | decorative-number | 背景数字 vs 文字水印 |
| **seal** | — | 仪式感 |
| **dot-pattern** | dot-matrix | 背景点阵 vs 前景点阵字符 |
| **spinning-ring** | — | 虚线旋转圆环 |
| **area-hatching** | — | 增长趋势装饰条纹 |
| **barcode-lines** | — | 活跃度波动 |

**注意**：A-Hero 里的 ghost-watermark、decorative-background-number、dot-matrix、spinning-ring 实际是 Decorative 级，不是 Hero。真正 Hero 级已列在上方 Hero 区。

---

## 四、结构层 + 功能控件（独立，不参与选型）

| 类别 | 组件 | 用途 |
|------|------|------|
| 章节分隔 | seam-divider / hanging / bottom-anchored / decorative-number-header（B类） | Section 间视觉分隔 |
| 导航 | floating-pill / newspaper-masthead / edge-aligned | 页面导航 |
| 页脚 | mast-headed / inline-rule / dense-typographic / statement | 品牌签名、版权、收尾 |
| 交互控件 | inputs / toggle / buttons / segmented-control | 用户操作工具 |
| 状态反馈 | state-patterns / alert | 系统状态提示 |

---

## One-pager 版本

```
Hero 级（scene 决策已定，不需再选）
  │
  ├─ 扫 → stat-block / numeral-grid
  ├─ 比 → comparison / data-table
  ├─ 排 → rank-bar / seg-bar / numeral-grid
Section 级── 读 → timeline-track / step-sequence
  ├─ 量 → gauge-arc / sparkline / block-bar
  ├─ 解 → callout / annotated-highlight
  ├─ 信 → logo-wall
  └─ 展 → accordion
      │
Detail 级── data-spotlight / sparkline / tag / source-row / action-list / ranking-table
      │
Decorative 级── ghost-text / seal / dot-pattern / spinning-ring
```

---

*2026-06-07 · v4 定稿 · 4级分层：Hero/Section/Detail/Decorative*
