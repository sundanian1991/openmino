# 供应商管理可视化 — 开发规格书 v2.0

> 基于多技能适配，每个单元标注清楚「用什么技能、出什么图、配什么色、输什么数据」
>
> 原则：不以量取胜，以质取胜。规格先行，开发有据。
>
> 更新日期：2026-04-21

---

## 版本变更

| 版本 | 日期 | 变更 |
|------|------|------|
| v1.0 | 2026-04-20 | 30个单元全部交付（infographic-svg 单一技能） |
| v2.0 | 2026-04-21 | 引入多技能适配：SVG 信息图 + T8 数据叙事 + chart-visualization 标准图表 + diagram-design 关系图 |

### v2.0 核心改动

1. **合并重叠**：03归因逻辑树 + 15问题→后果→应对闭环 → 合并为「03-归因与应对一体化」
2. **重命名**：07触发规则检查表 → 「07-自动预警触发条件」；14异常信号总表 → 「14-异常症状速查表」
3. **新增趋势单元**：补充「05-排名趋势演变图」（月度/季度排名连续变化）
4. **技术文档移出**：25指标映射表、26独立空间结构、27系统流程图 → 移至 `docs/供应商管理/技术参考/`，不计入核心可视化
5. **技能标注**：每个单元明确推荐技能 + 图表类型 + 数据结构

---

## 精选后单元清单（29个）

### 分类总览

| 类别 | 数量 | 主要技能 | 使用频率 |
|------|------|---------|---------|
| **核心决策工具** | 9个 | diagram-design + SVG 信息图 | 日度/周度 |
| **战略管理工具** | 5个 | SVG 信息图 + T8 数据叙事 | 月度/季度 |
| **异常管理工具** | 5个 | SVG 信息图 + T8 数据叙事 | 按需/应急 |
| **操作流程工具** | 6个 | diagram-design + SVG 信息图 | 日度/月度 |
| **数据系统工具** | 4个 | chart-visualization + SVG 信息图 | 周度/月度 |

---

## 开发规格详表

> 每个单元的完整开发规格，包含：
> - **技能推荐**：用什么技能开发
> - **图表类型**：具体视觉形式
> - **数据结构**：需要哪些字段
> - **配色方案**：语义色使用
> - **布局参考**：信息层级

---

### 一、核心决策工具（9个）

#### 01-供应商对比矩阵（四象限）⭐⭐⭐⭐⭐

| 字段 | 值 |
|------|---|
| **技能** | `diagram-design`（type: quadrant） |
| **图表类型** | 四象限散点气泡图 |
| **使用频率** | 每日 |

**数据结构**：
```json
{
  "suppliers": [
    { "name": "华啸", "x": 42, "y": 35, "size": 120, "status": "problem" },
    { "name": "毅航", "x": 88, "y": 92, "size": 300, "status": "benchmark" }
  ],
  "axes": { "x": "业绩达成率(%)", "y": "人效(单/人/天)" },
  "quadrants": {
    "q1": { "label": "标杆型", "action": "维持+分享" },
    "q2": { "label": "潜力型", "action": "关注培养" },
    "q3": { "label": "观察型", "action": "定期跟进" },
    "q4": { "label": "问题型", "action": "立即约谈" }
  }
}
```

**配色**：
- 问题象限（Q4）：焦橙背景 20% 填充 `#c98a6a20`
- 标杆象限（Q1）：橄榄绿背景 15% 填充 `#8f9b7f25`
- 其他象限：暖灰背景 `#f5f4f1`
- 气泡填充：暖棕 `#c98a6a`，问题供应商气泡描边焦橙 `#d4845a`

**布局**：
- 680×520 viewBox
- 四象限各占 50%，中心坐标 (340, 280)
- H1 标题 Georgia 18px 左上
- 图例底部横条

---

#### 02-排名×人效交叉矩阵 ⭐⭐⭐⭐⭐

| 字段 | 值 |
|------|---|
| **技能** | `diagram-design`（type: quadrant） |
| **图表类型** | 2×3 交叉矩阵（排名变化 × 人效变化） |
| **使用频率** | 周度 |

**数据结构**：
```json
{
  "suppliers": [
    { "name": "毅航", "rankChange": "up", "efficiencyChange": "up", "status": "显性进步" },
    { "name": "华啸", "rankChange": "flat", "efficiencyChange": "down", "status": "隐性退步" }
  ],
  "matrix": {
    "rows": ["排名上升", "排名持平", "排名下降"],
    "cols": ["人效上升", "人效下降"],
    "cells": [
      { "row": 0, "col": 0, "label": "显性进步", "action": "表扬", "color": "green" },
      { "row": 1, "col": 1, "label": "隐性退步", "action": "警告", "color": "orange" }
    ]
  }
}
```

**配色**：
- 隐性退步单元格：焦橙边框 1.5px `#d4845a`
- 显性进步：橄榄绿背景 15%
- 箭头：焦橙 `#c98a6a` 表示退步方向

---

#### 03-归因与应对一体化（合并原03+15）⭐⭐⭐⭐⭐

| 字段 | 值 |
|------|---|
| **技能** | `diagram-design`（type: tree + flow） |
| **图表类型**：决策树 + 应对流程 |
| **使用频率**：按需 |

**逻辑**：
```
异常发现
├── 是否异常？
│   ├── 否 → 正常通报
│   └── 是 → 哪个维度差？
│       ├── 产能不足 → 加人/培训 → 第1周验证
│       ├── 人效低 → 调整结构 → 第2周验证
│       └── 质量差 → 流程优化 → 第4周验证
└── 效果验证 → 通过/延期/升级 → 闭环确认
```

**配色**：
- 问题分支：焦橙 `#c98a6a`
- 解决方案：橄榄绿 `#8f9b7f`
- 验证节点：暖棕 `#b5523a`

---

#### 04-单体深度看板（7指标雷达）⭐⭐⭐⭐⭐

| 字段 | 值 |
|------|---|
| **技能** | `chart-visualization`（generate_radar_chart） |
| **图表类型** | 雷达图 + 趋势辅助线 |
| **使用频率** | 按需/单体诊断 |

**数据结构**：
```json
{
  "supplier": "华啸",
  "period": "2026年4月",
  "dimensions": [
    { "name": "产能", "score": 58, "max": 100 },
    { "name": "人效", "score": 72, "max": 100 },
    { "name": "质量", "score": 85, "max": 100 },
    { "name": "成本", "score": 80, "max": 100 },
    { "name": "流失", "score": 65, "max": 100 },
    { "name": "成长", "score": 78, "max": 100 },
    { "name": "合规", "score": 90, "max": 100 }
  ],
  "totalScore": 75,
  "weakPoints": ["产能", "流失"]
}
```

**配色**：
- 雷达填充：暖棕 `#c98a6a` 透明度 10%
- 雷达描边：暖棕 `#c98a6a` 1.5px
- 薄弱项：焦橙 `#d4845a` 标注

---

#### 05-排名趋势演变图 ⭐⭐⭐⭐（新增）

| 字段 | 值 |
|------|---|
| **技能** | `chart-visualization`（generate_line_chart） |
| **图表类型** | 多线趋势图（每条线=一个供应商） |
| **使用频率** | 月度 |

**数据结构**：
```json
{
  "title": "供应商排名月度趋势",
  "period": "2026年1月-4月",
  "series": [
    { "name": "毅航", "data": [2, 2, 1, 1], "color": "green" },
    { "name": "毛毛虫", "data": [3, 3, 2, 2], "color": "green" },
    { "name": "华啸", "data": [8, 9, 10, 10], "color": "orange" },
    { "name": "岐力", "data": [6, 7, 8, 9], "color": "orange" }
  ],
  "xAxis": ["1月", "2月", "3月", "4月"],
  "yAxis": { "label": "排名", "reverse": true }
}
```

**配色**：
- 上升供应商：橄榄绿 `#8f9b7f`
- 下降供应商：焦橙 `#d4845a`
- 持平供应商：暖灰 `#8a8580`
- 图表背景：羊皮纸 `#faf9f7`

---

#### 06-周度产能达成率对比 ⭐⭐⭐⭐

| 字段 | 值 |
|------|---|
| **技能** | `chart-visualization`（generate_column_chart） |
| **图表类型** | 分组柱状图（本月 vs 上月）+ 目标线 |
| **使用频率** | 每周 |

**数据结构**：
```json
{
  "title": "周度产能达成率",
  "weeks": ["W13", "W14", "W15", "W16"],
  "lastMonth": [95, 102, 98, 105],
  "thisMonth": [88, 92, 108, 95],
  "target": 100
}
```

**配色**：
- 达标柱（≥100%）：橄榄绿 `#8f9b7f`
- 未达标柱（<100%）：焦橙 `#d4845a`
- 目标线：暖棕 `#c98a6a` 虚线

---

#### 07-自动预警触发条件（原"触发规则检查表"）⭐⭐⭐⭐⭐

| 字段 | 值 |
|------|---|
| **技能** | `diagram-design`（type: flow + checklist） |
| **图表类型** | 条件检查表 + 自动台账 |
| **使用频率** | 月度自动化 |

**数据结构**：
```json
{
  "rules": [
    { "id": "R1", "condition": "连续2月Bottom3", "status": "triggered", "suppliers": ["华啸"] },
    { "id": "R2", "condition": "产能达成率<85%", "status": "triggered", "suppliers": ["华啸", "岐力"] },
    { "id": "R3", "condition": "峰值比<70%", "status": "triggered", "suppliers": ["华啸"] },
    { "id": "R4", "condition": "流失率>15%", "status": "passed", "suppliers": [] }
  ],
  "autoLedger": [
    { "supplier": "华啸", "triggeredRules": ["R1", "R2", "R3"], "severity": "P0" },
    { "supplier": "岐力", "triggeredRules": ["R2"], "severity": "P1" }
  ]
}
```

**配色**：
- 触发项：焦橙背景 `#d4845a20`
- 通过项：橄榄绿 `#8f9b7f25`
- P0 标签：焦橙描边 1.5px
- P1 标签：焦橙描边 1px

---

#### 08-主管胜任评估仪表盘 ⭐⭐⭐⭐

| 字段 | 值 |
|------|---|
| **技能** | `chart-visualization`（generate_radar_chart 或 generate_bar_chart） |
| **图表类型** | 雷达图 / 分组柱状图 |
| **使用频率** | 月度 |

**数据结构**：
```json
{
  "supervisor": "张三",
  "supplier": "华啸",
  "dimensions": [
    { "name": "管理半径", "score": 82 },
    { "name": "梯队健康", "score": 78 },
    { "name": "新人培养", "score": 72 },
    { "name": "流失率控制", "score": 65 }
  ],
  "totalScore": 74,
  "grade": "需关注"
}
```

---

#### 09-四大战略维度总览 ⭐⭐⭐⭐⭐

| 字段 | 值 |
|------|---|
| **技能** | `diagram-design`（type: layers） |
| **图表类型** | 四层循环图 |
| **使用频率** | 季度 |

**布局**：
- 4 个矩形垂直排列，箭头循环连接
- 每个框内标注当前状态（✓/进行中/预警/已解决）

---

### 二、战略管理工具（5个）

#### 10-月度状态分类（原"红绿灯"）⭐⭐⭐⭐⭐

| 字段 | 值 |
|------|---|
| **技能** | `diagram-design`（type: nested） |
| **图表类型** | 状态分类卡片 |
| **使用频率** | 月度 |

**数据结构**：
```json
{
  "month": "2026年4月",
  "actionNeeded": [
    { "name": "华啸", "reason": "连续4月下滑", "severity": "P0" },
    { "name": "岐力", "reason": "人效持续偏低", "severity": "P1" }
  ],
  "maintainWatch": [
    { "name": "毅航", "status": "标杆" },
    { "name": "毛毛虫", "status": "稳定" }
  ],
  "energyAllocation": { "action": "80%", "watch": "20%" }
}
```

**配色**：
- 需行动卡片：焦橙背景 20%
- 维持观察卡片：暖灰背景 `#f5f4f1`

---

#### 11-供应商分级标准 ⭐⭐⭐⭐

| 字段 | 值 |
|------|---|
| **技能** | `diagram-design`（type: pyramid） |
| **图表类型** | 金字塔分层图 |
| **使用频率** | 月度 |

**配色**：
- S级：橄榄绿边框 1.5px
- A级：橄榄绿边框 1px
- B级：暖灰边框 1px
- C级：焦橙边框 1.5px

---

#### 12-新供应商成长曲线 ⭐⭐⭐⭐

| 字段 | 值 |
|------|---|
| **技能** | `chart-visualization`（generate_line_chart + generate_area_chart） |
| **图表类型** | 双线对比图（理想 vs 实际）+ 里程碑标注 |
| **使用频率** | 新供应商期间 |

**数据结构**：
```json
{
  "supplier": "新供应商X",
  "idealPath": [10, 30, 50, 70, 80, 85, 90],
  "actualPath": [8, 25, 45, 55, 68, 72, 78],
  "milestones": [
    { "month": "M1", "label": "准入期", "target": 30 },
    { "month": "M3", "label": "爬坡期", "target": 70 },
    { "month": "M6", "label": "达标期", "target": 80 }
  ],
  "status": "lagging"
}
```

**配色**：
- 理想曲线：暖棕 `#c98a6a` 实线
- 实际曲线（落后时）：焦橙 `#d4845a` 虚线
- 里程碑：圆点标注

---

#### 13-份额调整规则 + 流程 ⭐⭐⭐⭐

| 字段 | 值 |
|------|---|
| **技能** | `diagram-design`（type: flow + quadrant） |
| **图表类型** | 决策矩阵 + 调整前后对比 |
| **使用频率** | 季度 |

---

#### 14-异常症状速查表（原"异常信号总表"）⭐⭐⭐⭐⭐

| 字段 | 值 |
|------|---|
| **技能** | `diagram-design`（type: nested） |
| **图表类型** | 分类表格 + 严重程度标注 |
| **使用频率** | 查阅 |

---

### 三、异常管理工具（5个）

#### 15-风险预警模板 ⭐⭐⭐⭐⭐

| 字段 | 值 |
|------|---|
| **技能** | `diagram-design`（type: nested） |
| **图表类型** | 预警卡片模板 |
| **使用频率** | 按需 |

**数据结构**：
```json
{
  "warnings": [
    {
      "id": "W-2026-04-001",
      "level": "P0",
      "supplier": "华啸",
      "issue": "连续4月业绩下滑",
      "data": "达成率: 58% → 55% → 52% → 50%",
      "risk": "产能持续下降，可能影响Q2目标",
      "action": "深度约谈 + 整改计划",
      "owner": "年老师"
    }
  ]
}
```

**配色**：
- P0：焦橙背景 20%
- P1：焦橙背景 10%
- P2：暖灰背景

---

#### 16-异常模式识别 ⭐⭐⭐⭐

| 字段 | 值 |
|------|---|
| **技能** | `chart-visualization`（generate_line_chart，3条线对比） |
| **图表类型** | 三种模式曲线对比 |
| **使用频率** | 按需 |

---

#### 17-危机处理流程 ⭐⭐⭐⭐⭐

| 字段 | 值 |
|------|---|
| **技能** | `diagram-design`（type: flow） |
| **图表类型** | 6步垂直流程图 + 时间节点 |
| **使用频率** | 应急 |

---

#### 18-约谈框架 ⭐⭐⭐⭐⭐

| 字段 | 值 |
|------|---|
| **技能** | `diagram-design`（type: flow + timeline） |
| **图表类型** | 三段式时间线（5/10/10分钟） |
| **使用频率** | 按需 |

---

#### 19-整改验证清单 ⭐⭐⭐⭐⭐

| 字段 | 值 |
|------|---|
| **技能** | `diagram-design`（type: timeline） + `chart-visualization`（generate_line_chart） |
| **图表类型** | 阶段进度表 + 目标vs实际对比线 |
| **使用频率** | 每周跟踪 |

**数据结构**：
```json
{
  "supplier": "华啸",
  "phases": [
    { "week": "W1", "target": 62, "actual": 60, "status": "接近" },
    { "week": "W2", "target": 65, "actual": 64, "status": "接近" },
    { "week": "W4", "target": 70, "actual": 68, "status": "接近" },
    { "week": "W8", "target": 75, "actual": 76, "status": "达成" }
  ],
  "conclusion": "通过，建议维持观察1个月"
}
```

---

### 四、操作流程工具（6个）

#### 20-月度操作流程 ⭐⭐⭐⭐⭐

| 字段 | 值 |
|------|---|
| **技能** | `diagram-design`（type: timeline） |
| **图表类型** | D1-D10 时间线 |
| **使用频率** | 月度 |

---

#### 21-数据收集清单 ⭐⭐⭐⭐

| 字段 | 值 |
|------|---|
| **技能** | `diagram-design`（type: checklist） |
| **图表类型** | 清单表格 + 提交状态标注 |
| **使用频率** | 月度 |

---

#### 22-准入评估框架 ⭐⭐⭐⭐

| 字段 | 值 |
|------|---|
| **技能** | `diagram-design`（type: nested） |
| **图表类型** | 4维度打分卡 |
| **使用频率** | 新供应商准入 |

---

#### 23-清退决策树 + 流程 ⭐⭐⭐⭐⭐

| 字段 | 值 |
|------|---|
| **技能** | `diagram-design`（type: tree + flow） |
| **图表类型** | 决策树 + 时间线 |
| **使用频率** | 按需 |

---

#### 24-周度跟踪流程 ⭐⭐⭐⭐

| 字段 | 值 |
|------|---|
| **技能** | `diagram-design`（type: flow） |
| **图表类型** | 循环流程图 |
| **使用频率** | 每周 |

---

#### 25-月度复盘报告模板 ⭐⭐⭐⭐

| 字段 | 值 |
|------|---|
| **技能** | T8（narrative-text-visualization） |
| **图表类型** | 数据叙事报告 + 内嵌迷你图表 |
| **使用频率** | 月度 |

**T8 模板**：见下方「T8 叙事模板专区」

---

#### 26-供应商档案标准 ⭐⭐⭐⭐

| 字段 | 值 |
|------|---|
| **技能** | `diagram-design`（type: nested） |
| **图表类型** | 档案结构图 |
| **使用频率** | 参考 |

---

### 五、数据系统工具（4个）

#### 27-指标映射表 ⭐⭐⭐⭐

| 字段 | 值 |
|------|---|
| **技能** | `chart-visualization`（generate_spreadsheet） |
| **图表类型** | 表格 |
| **使用频率** | 参考 |

---

#### 28-FCI双指标卡片 ⭐⭐⭐⭐⭐

| 字段 | 值 |
|------|---|
| **技能** | T8（narrative-text-visualization） |
| **图表类型** | 数据叙事卡片 + 内嵌进度条 |
| **使用频率** | 月度 |

**T8 模板**：见下方「T8 叙事模板专区」

---

#### 29-供应商健康度仪表盘 ⭐⭐⭐⭐

| 字段 | 值 |
|------|---|
| **技能** | `chart-visualization`（generate_radar_chart） |
| **图表类型** | 综合雷达图 |
| **使用频率** | 月度 |

---

### 已移出核心单元

| 单元 | 新位置 | 原因 |
|------|--------|------|
| 原25-指标映射表 | `docs/供应商管理/技术参考/` | 技术文档，非可视化工具 |
| 原26-供应商独立空间结构 | `docs/供应商管理/技术参考/` | 架构文档 |
| 原27-系统流程图 | `docs/供应商管理/技术参考/` | 系统架构文档 |

---

## T8 数据叙事模板专区

> 以下单元使用 narrative-text-visualization 技能，输出为 HTML/T8 语法的数据叙事报告。

### T8-01：月度复盘报告模板（单元25）

```
# [供应商名称] [月份] 月度复盘报告

## 核心指标

本月[业绩达成率](metric_name) 为[78.5%](metric_value, origin=0.785, assessment="negative")，
较上月[下降3.2个百分点](delta_value, origin=-0.032, assessment="negative")。
[产能达成率](metric_name) 为[85%](metric_value, origin=0.85, assessment="positive")，
目标为100%，尚有[15个百分点](delta_value) 的差距。

## 排名变化

[本月排名第8位](rank, origin=8, detail=[10, 9, 8, 8])，
较上月[上升1位](delta_value, assessment="positive")。
[近6个月排名趋势](trend_desc, detail=[8, 9, 10, 10, 9, 8])，
整体呈[缓慢回升](trend_desc, assessment="positive")态势。

## 异常信号

[峰值比](metric_name) 为[58%](metric_value, origin=0.58, assessment="negative")，
触发[自动预警规则R3](anomaly, detail=[72, 68, 62, 58])。
[人力流失率](metric_name) 达[18%](ratio_value, origin=0.18, assessment="negative")，
高于目标[15%](metric_value) 的[3个百分点](delta_value)。

## 整改进展

整改计划执行至[第4周](time_desc)，
[目标产能达成率](metric_value, origin=0.70) 为70%，
[实际达成](metric_value, origin=0.68) 为68%，
[差距2个百分点](delta_value, assessment="negative")。
预计[第8周](time_desc) 可以[达标](trend_desc, assessment="positive")。
```

### T8-02：FCI双指标月度通报（单元28）

```
# FCI 月度通报 — [月份]

## FCI 综合得分

[本月FCI得分](metric_name) 为[87分](metric_value, origin=87, assessment="positive")，
较上月[提升2分](delta_value, assessment="positive")。
[FCI等级](dim_value) 为[合格（正常型）](dim_value)，
距离[优秀（≥90分）](metric_value) 尚有[3分](delta_value) 差距。

## 业绩 + FCI 四象限

[业绩达成率](metric_name) 为[92%](metric_value, origin=0.92, assessment="positive")，
[FCI得分](metric_name) 为[87分](metric_value, origin=87)。
[综合评级](dim_value)：[业绩好+FCI合格 → 维持现状](trend_desc, assessment="positive")。

## 头部6家对比

[毅航](dim_value) FCI [92分](metric_value, origin=92, assessment="positive")，
排名[第1](rank, origin=1)；
[毛毛虫](dim_value) FCI [89分](metric_value, origin=89, assessment="positive")；
[华啸](dim_value) FCI [65分](metric_value, origin=65, assessment="negative")，
为头部6家中[最低](rank, origin=6, detail=[92, 89, 85, 82, 78, 65])。
```

### T8-03：周度产能通报（单元06 的数据报告版）

```
# 周度产能通报 — 第[16]周

## 整体情况

[本周整体产能达成率](metric_name) 为[95%](metric_value, origin=0.95)，
较上周[上升3个百分点](delta_value, assessment="positive")，
距目标[100%](metric_value) 尚有[5个百分点](delta_value) 差距。

## 供应商分布

[达标供应商](metric_name) 共[8家](metric_value, origin=8)，
[未达标供应商](metric_name) [2家](metric_value, origin=2)：
- [华啸](dim_value)：[52%](metric_value, origin=0.52, assessment="negative")，
  连续[4周](time_desc) 未达标
- [岐力](dim_value)：[88%](metric_value, origin=0.88, assessment="negative")，
  较上周[下降4个百分点](delta_value, assessment="negative")

## 趋势判断

[近4周趋势](trend_desc, detail=[85, 89, 92, 95])，
整体呈[持续回升](trend_desc, assessment="positive")态势。
按当前速度，[本月累计达成率](metric_value) 预计为[93%](proportion, origin=0.93)，
[接近](trend_desc) 月度目标。
```

### T8-04：异常预警通知（单元15）

```
# 预警通知 — [编号]

## 预警信息

[预警级别](dim_value)：[P0严重](anomaly)
[预警对象](dim_value)：[华啸](dim_value)
[触发规则](dim_value)：[R1+R2+R3](dim_value)

## 关键数据

[业绩达成率](metric_name) 从[72%](metric_value, origin=0.72)
连续下滑至[50%](metric_value, origin=0.50, assessment="negative")，
[累计下滑22个百分点](delta_value, origin=-0.22, assessment="negative")。
[产能达成率](metric_name) 为[58%](metric_value, origin=0.58)，
[峰值比](metric_name) 仅[58%](metric_value, origin=0.58, assessment="negative")。

## 风险分析

[当前风险等级](dim_value)：[高风险](anomaly)，
主要风险为[产能持续下降，可能影响Q2整体目标](association)。

## 建议行动

[建议行动](dim_value)：
1. 本周内完成[深度约谈](dim_value)
2. 要求供应商[提交整改计划](dim_value)
3. 建立[周度跟踪](dim_value) 机制
```

---

## 技能选择速查表

| 场景 | 用哪个技能 | 输出格式 |
|------|-----------|---------|
| 四象限/矩阵/对比图 | `diagram-design`（quadrant） | HTML + 内联SVG |
| 流程图/时间线/决策树 | `diagram-design`（flow/timeline/tree） | HTML + 内联SVG |
| 雷达图 | `chart-visualization`（generate_radar_chart） | 图片URL |
| 柱状图/折线图 | `chart-visualization`（generate_column/line_chart） | 图片URL |
| 数据通报/月度报告 | T8（narrative-text-visualization） | HTML 渲染 |
| 信息卡片/状态看板 | `diagram-design`（nested） | HTML + 内联SVG |
| 表格/映射表 | `chart-visualization`（generate_spreadsheet） | 图片URL |

---

## 通用配色规范

| 语义 | 颜色 | 色值 | 用途 |
|------|------|------|------|
| **羊皮纸** | 画布底色 | `#faf9f7` | 所有图表背景 |
| **暖卡** | 卡片填充 | `#f5f4f1` | 标准卡片 |
| **近黑** | 主文字 | `#1a1a1a` | 标题、正文 |
| **暖灰** | 次文字 | `#6b6b6b` | 副标题、注释 |
| **柔棕** | 描边/线 | `#c98a6a` | 箭头、连接线 |
| **焦橙** | 警告/问题 | `#d4845a` | 异常、未达标 |
| **橄榄绿** | 成功/达标 | `#8f9b7f` | 正向、达标 |
| **钢蓝** | 信息/中性 | `#6a8fb5` | 辅助信息 |

### 语义色使用规则

- 每张图**最多2种语义色**（焦橙 + 橄榄绿为默认组合）
- 焦橙只用于负面/异常/需行动
- 橄榄绿只用于正面/达标/标杆
- 中性信息用暖灰 `#8a8580`，不算语义色

---

## 开发执行指南

### 开发路径

拿到本规格书后，有两种开发方式：

**方式一：Mino 直接开发**
1. 读取对应技能的 SKILL.md
2. 按本规格书的数据结构 + 配色方案执行
3. 输出 HTML/SVG/图片文件

**方式二：交给其他 AI/技能开发**
1. 复制对应单元的规格表（数据结构 + 配色 + 图表类型）
2. 粘贴给目标 AI，附带对应技能的 SKILL.md
3. 按规格约束输出，保证风格一致

### 单单元开发步骤

1. 确定单元编号 → 查本规格书找到对应单元
2. 读取推荐技能的 SKILL.md
3. 准备数据（按 `数据结构` 字段填充实际数值）
4. 执行生成（用技能的生成命令）
5. 质量检查（按 `配色方案` 和布局验证）

---

## 质量验收清单

每个单元输出后检查：

- [ ] 图表类型与规格书一致
- [ ] 配色不超过2种语义色
- [ ] 数据字段完整（对照数据结构表）
- [ ] 核心信息3秒内可理解
- [ ] 逻辑链条不超过3步
- [ ] 无信息溢出/文字被截断
- [ ] 输出格式正确（SVG 无 JS、HTML 自包含）

---

*版本：v2.0（多技能适配版）*
*更新日期：2026-04-21*
*核心单元：29个（原30个精简+合并+移出3个技术文档）*
