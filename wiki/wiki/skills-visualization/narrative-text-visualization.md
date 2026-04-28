# Narrative Text Visualization — T8 叙事文本可视化

> Sources: narrative-text-visualization SKILL.md (T8 Syntax); AntV T8 技术栈, 2026-04-28
> Raw: [SKILL.md](../../raw/skills/narrative-text-visualization-SKILL.md); [T8 GitHub](https://github.com/antvis/T8); [T8 文档](https://github.com/antvis/T8/blob/main/site/en/tutorial/quick-start.md); [T8 Syntax 参考](https://github.com/antvis/T8/blob/main/prompt.md)

## 概述

narrative-text-visualization 是基于 AntV T8 技术栈的叙事文本可视化技能。T8 是一种声明式 Markdown-like 语言，用于创建带语义实体标注的数据叙事。它将普通的数据分析报告转化为视觉上更富表现力的叙事文本——通过语义标注让数据自动"跳出来"，通过迷你图表嵌入文本，通过视觉层级引导阅读。

T8 的全称是 Text 8（8 bits），象征"文字之下的深度洞察"。

---

## 一、T8 Syntax 核心概念

### 文档结构

T8 支持标准的 Markdown 结构：
- 6 级标题（`#` 到 `######`）
- 段落（空行分隔）
- 无序列表（`-` / `*`）
- 有序列表（`1.` `2.`）
- 文本格式化（加粗 `**`、斜体 `*`、下划线 `__`、链接 `[text](url)`）

### 实体标注（核心功能）

T8 的核心是**实体标注**——用 `[displayText](entityType)` 语法标注文本中的数据点：

```
[sales revenue](metric_name) reached [¥1.5 million](metric_value) this quarter.
[grew by 15.3%](ratio_value, origin=0.153, assessment="positive")
```

实体可附带元数据：
- `origin`（原始数值）：启用数据可视化、排序、计算
- `assessment`（评估）：`"positive"` / `"negative"` / `"equal"` / `"neutral"`，启用颜色/图标指示
- `unit`（单位）：计量单位
- `detail`（详情）：用于图表渲染的数组数据

---

## 二、16 种实体类型

| 实体类型 | 描述 | 示例 |
|---------|------|------|
| `metric_name` | 指标名称 | "revenue", "user count" |
| `metric_value` | 主要指标值 | "¥1.5 million" |
| `other_metric_value` | 次要指标值 | "average order value: $120" |
| `delta_value` | 绝对变化 | "+1,200 units" |
| `ratio_value` | 百分比变化 | "+15.3%" |
| `contribute_ratio` | 贡献百分比 | "accounts for 45%" |
| `trend_desc` | 趋势描述 | "steadily rising" |
| `dim_value` | 维度值/分类 | "North America" |
| `time_desc` | 时间周期 | "Q3 2024" |
| `proportion` | 比例 | "3 out of 5" |
| `rank` | 排名 | "ranked 1st" |
| `difference` | 差异 | "difference of $50K" |
| `anomaly` | 异常值 | "unusual spike" |
| `association` | 关联关系 | "strongly correlated" |
| `distribution` | 数据分布 | "evenly distributed" |
| `seasonality` | 季节模式 | "seasonal peak" |

其中 `rank`、`difference`、`anomaly`、`association`、`distribution`、`seasonality` 需要 `detail` 字段来提供图表渲染所需的数据数组。

---

## 三、工作流程

### 1. 理解需求

分析用户的请求：主题、叙事类型（报告/总结/文章）、需要突出的关键洞察、数据来源。

### 2. 生成 T8 语法内容

创建包含以下要素的叙事文本：
- 正确的文档结构（标题、段落、列表）
- 所有有意义数据点的实体标注
- 适当的实体元数据（origin、assessment 等）

### 3. 生成前端代码

根据用户偏好的框架创建代码：
- **HTML**（CDN 引入）：`<script src="https://unpkg.com/@antv/t8/dist/t8.min.js">`
- **React**：`import { Text } from '@antv/t8'`
- **Vue 3**：`import { Text } from '@antv/t8'` + Composition API
- **Vue 2**：Options API + `$refs`

### 4. 验证输出

- 所有数据来自公开可信来源
- 最小内容长度（800 字或等效）
- 全文适当的实体标注
- 清晰的结构和逻辑流

---

## 四、数据要求

**关键约束**：所有数据必须来自公开可信来源——官方公告/财报、权威媒体（Reuters、Bloomberg、TechCrunch）、行业研究机构（IDC、Canalys、Counterpoint）。**绝不使用虚构、AI 猜测或模拟的数据**。使用具体数字，不用模糊近似值。

---

## 五、最佳实践

### 应该标注
- 所有数值（收入、数量、测量值）
- 所有百分比（变化、贡献、比例）
- 指标名称和 KPI
- 时间周期
- 地理区域和分类
- 趋势描述
- 对比和变化

### 不应标注
- 没有具体数据含义的普通文本
- 连接短语和过渡句
- 不代表可测量概念的上下文

### 内容要求
- 最小 800 字
- 清晰层级和逻辑流
- 不仅罗列数字——解释意义和上下文
- 自然、流畅、客观、专业的语调
- 标注所有定量数据

---

## 六、与 data-storytelling 的关系

narrative-text-visualization 和 data-storytelling 是互补关系：

- **data-storytelling**：制定策略和大纲——什么图、什么顺序、怎么高亮
- **narrative-text-visualization**：将文字分析报告本身可视化——通过语义标注让数据在文本中自动高亮

两者可以组合使用：data-storytelling 产出大纲后，其中的文字分析部分可以用 T8 Syntax 渲染为富语义的叙事文本。
