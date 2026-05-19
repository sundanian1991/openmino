---
name: viz-narrative-text
description: "数据叙事文本可视化 — 使用 T8 Syntax 将数据转化为带语义标注的叙事报告。支持 18 种实体类型（指标/变化/趋势/异常/排名/季节性等），可内嵌迷你图。当用户说'做个数据报告'、'数据解读'、'业绩分析'、'市场研究报告'、'把数据写成文章形式'时触发。不适用于：纯表格、交叉分析表、数据图表（柱状/折线/环形）。"
---

# viz-narrative-text — 数据叙事文本可视化

> 使用 T8 Syntax（AntV 数据叙事语法）将数据转化为结构化叙事报告。
> T = Text，8 = 8 bit 字节，象征文字之下的深层洞察。
> 轻量（< 20KB gzip），框架无关，支持 vanilla HTML / React / Vue。

## 触发场景

用户需要数据解读报告、业绩分析、市场研究报告等**以文字叙事为主、数据标注为辅**的可视化时触发。

**关键词**：数据报告、数据解读、业绩分析、市场分析、行业报告、文字可视化、叙事文本

**不适用于**：纯表格/交叉分析表（→ viz-antv-s2-expert）、独立数据图表（→ viz-echarts / viz-chart-visualization）。

## T8 语法核心

### 实体标注语法

```
[显示文字](实体类型, key1=value1, key2=value2)
```

### 18 种实体类型速查

| 实体类型 | 用途 | 示例 |
|----------|------|------|
| `metric_name` | 指标/KPI 名称 | "营收"、"用户数" |
| `metric_value` | 主要指标值 | "¥150万"、"5万用户" |
| `other_metric_value` | 次要/辅助指标值 | "客单价 $120" |
| `delta_value` | 绝对变化值 | "+1200台"、"-$50K" |
| `ratio_value` | 百分比变化/率 | "+15.3%"、"-5.2%" |
| `contribute_ratio` | 贡献占比 | "占45%"、"代表30%" |
| `trend_desc` | 趋势描述 | "持续上升"、"稳中有降" |
| `dim_value` | 维度值/分类 | "北美"、"企业部门" |
| `time_desc` | 时间段 | "2024年Q3"、"1-3月" |
| `proportion` | 比例 | "3/5"、"60%的客户" |
| `rank` | 排名 | "第1名"、"前3" |
| `difference` | 对比差异 | "差距$50K" |
| `anomaly` | 异常值 | "异常飙升"、"意外暴跌" |
| `association` | 关联关系 | "强相关"、"与...联动" |
| `distribution` | 数据分布 | "集中在"、"均匀分布" |
| `seasonality` | 季节性规律 | "Q4高峰"、"节假日" |

### 常用元数据字段

| 字段 | 类型 | 用途 | 示例 |
|------|------|------|------|
| `origin` | number | 原始数值（支持计算/排序） | `origin=1500000` |
| `assessment` | string | 正/负/中性评估 | `assessment="positive"` |
| `unit` | string | 单位 | `unit="元"` |
| `detail` | array/object | 迷你图渲染数据 | `detail=[10,12,15,30]` |

**需要 detail 的实体类型**：rank（排名数据）、difference（对比值）、anomaly（异常序列）、association（关联散点）、distribution（分布）、seasonality（季节数据）。

## 工作流程

### Step 1：理解需求

分析用户请求确定：
- 分析主题和数据范围
- 报告类型（解读/总结/文章）
- 需要突出的关键洞察
- 数据来源（必须真实，禁止编造）

### Step 2：生成 T8 语法内容

使用 T8 语法生成叙事文本，必须包含：
- 文档结构（标题、段落、列表）
- 所有有意义数据点的实体标注
- 适当的元数据（origin/assessment/unit/detail）

### Step 3：生成渲染代码

根据用户偏好生成 HTML / React / Vue 渲染代码。

### Step 4：验证

- 数据来源真实可靠
- 最小内容长度 800 字
- 实体标注覆盖完整
- 结构清晰、逻辑连贯

## T8 语法规范

### 文档结构

**标题**（6 级）：标准 Markdown `#` 语法，每行一个标题，`#` 后加一个空格。

**段落**：空行分隔。段落内文字自然流动。

**列表**：
- 无序：`- 第一项` / `* 第一项`
- 有序：`1. 第一步` / `2. 第二步`

### 文字格式

- **粗体**：`**粗体文字**`
- *斜体*：`*斜体文字*`
- 下划线：`__下划线文字__`
- 链接：`[文字](URL)`（URL 必须以 http/https 或 / 开头）

### 数据真实性

所有数据必须来自公开权威来源：
- 官方公告/财报
- 权威媒体（路透、彭博、TechCrunch 等）
- 行业研究机构（IDC、Canalys、Counterpoint 等）
- **禁止使用虚构/AI编造/模拟数据**
- 使用具体数字（如"1.46亿台"），不用模糊近似值

## 完整 T8 示例

```
# 2024年智能手机市场分析

## 市场概览

[智能手机出货量](metric_name)在[2024年](time_desc)达到[12亿台](metric_value, origin=1200000000)，同比[小幅下滑2.1%](ratio_value, origin=-0.021, assessment="negative")。

**高端段**（$800以上）展现*韧性*(trend_desc, assessment="positive")，[增长5.8%](ratio_value, origin=0.058, assessment="positive")。[平均售价](other_metric_value)为[$420](metric_value, origin=420, unit="USD")。

## 区域拆解

### 亚太

[亚太](dim_value)仍是最大市场，出货[6.8亿台](metric_value, origin=680000000)，但同比减少[1.8亿台](delta_value, origin=-180000000, assessment="negative")。

主要市场：
- [中国](dim_value)：[3.2亿台](metric_value, origin=320000000)，[下滑8.5%](ratio_value, origin=-0.085, assessment="negative")，全球[排名第1](rank, detail=[320,180,90,65,45])，占区域[47%](contribute_ratio, origin=0.47)
- [印度](dim_value)：[1.8亿台](metric_value, origin=180000000)，[增长12.3%](ratio_value, origin=0.123, assessment="positive")
- [东南亚](dim_value)：[1.8亿台](metric_value, origin=180000000)，[持平](trend_desc, assessment="equal")
```

## 渲染方式

### HTML（CDN）

```html
<div id="container"></div>
<script src="https://unpkg.com/@antv/t8/dist/t8.min.js"></script>
<script>
const { Text } = window.T8;
const text = new Text(document.getElementById('container'));
text.theme('light').render(t8Content);
</script>
```

### React

```tsx
import { Text } from '@antv/t8';
import { useEffect, useRef } from 'react';

function T8Component() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const text = new Text(ref.current);
    text.theme('light').render(t8Content);
    return () => text.unmount();
  }, []);
  return <div ref={ref} />;
}
```

### Vue 3

```vue
<template>
  <div ref="containerRef"></div>
</template>

<script setup lang="ts">
import { Text } from '@antv/t8';
import { ref, onMounted, onBeforeUnmount } from 'vue';
const containerRef = ref<HTMLDivElement>();
let instance: Text | null = null;
onMounted(() => {
  if (!containerRef.value) return;
  instance = new Text(containerRef.value);
  instance.theme('light').render(t8Content);
});
onBeforeUnmount(() => instance?.unmount());
</script>
```

## 最佳实践

1. **全面标注** — 所有量化数据都要做实体标注，不只是核心数字
2. **选对类型** — 根据语义选择最匹配的实体类型，不要随意套用
3. **带元数据** — 尽可能补充 origin、assessment 等字段，支持后续交互
4. **自然流畅** — 实体标注要无缝融入可读的散文式叙述中
5. **有分析有洞察** — 不只罗列数字，要解释含义和上下文

## 标注清单

**必须标注**：
- 所有数值（营收、数量、测量值）
- 所有百分比（变化、贡献、占比）
- 指标名称和 KPI
- 时间段
- 地理区域和分类
- 趋势描述和对比变化

**不标注**：
- 不含具体数据含义的通用文字
- 连接词和过渡句
- 不可度量的上下文描述

## 参考

- GitHub: https://github.com/antvis/T8
- 文档: https://github.com/antvis/T8/blob/main/site/en/tutorial/quick-start.md
- 语法规范: https://github.com/antvis/T8/blob/main/prompt.md
