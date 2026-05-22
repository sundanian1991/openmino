# Compiled SPEC — 金融电销 Q1 运营汇报

> 渲染契约。4 图合页，2×2 网格 + 顶部 KPI

---

## Global Style

- **场景**：管理层 Q1 复盘汇报
- **风格学派**：McKinsey
- **配色**：#01 麦肯锡蓝（主色 #0066FF，灰化 #8B95A2，红色 #CC0000，绿色 #009933）
- **字体**：Helvetica Neue，标题 15px，轴标签 11px，标注 12px
- **背景**：#FFFFFF
- **间距**：卡片间距 12px，四周留白 20px

---

## KPI 卡片（顶部 4 个）

| 指标 | 数值 | 趋势 |
|------|------|------|
| Q1 总外呼量 | 287 万通 | 3 月环比 +25% |
| 平均接通率 | 28.0% | 2 月低谷 27.8%，3 月回升至 28.4% |
| 平均转化率 | 1.7% | 3 月回升至 1.9% |
| Q1 总成交金额 | 8,450 万 | 月均 2,817 万 |

---

## Page 1: 团队业绩对比 — 分组柱状图

**场景论文**：6 团队 3 个核心指标横向对比，B 组领跑，C/F 垫底
**签名视觉元素**：B 组用 #0066FF 饱和蓝突出，其余灰化

### 叙事意图

**【可视化目的】**
- 认知缺口：管理层知道"有差距"，不知道"差距多大、在哪些指标上"

**【想传达什么】**
- 核心信息：B 组转化率 2.6% 是 C 组 1.7% 的 1.53 倍，差距在接通率和转化率两端

**【结论】**
- B/D 组持续领先，C/F 组两项指标均显著低于均值

**【思路】**
- 视觉叙事路径：第一眼 B 组最高柱 → 第二眼排名顺序 → 最终理解差距在 40%+

### WIIFT 提要

- **WIIFT 提要**：B 组转化率领先 C/F 组 53%，接通率高 6 个百分点，是 Q2 标杆团队
- **眨眼检验**：B 组蓝色柱明显高于其余灰色柱，一秒确认

### 上下文四问

| 维度 | 回答 |
|------|------|
| 情境 | Q1 复盘汇报，需要数据支持团队横向对比 |
| 受众 | 管理层，关注结果和排名 |
| 沟通者 | 电销中心运营负责人 |
| 目标 | 确认 B 组为标杆，C/F 组为重点帮扶对象 |

### TOP-T 框架

- **Topic**：团队对比
- **Guide**：
  1. 先看 B 组蓝色柱 → 接通率 32% + 意向率 12% 双领先
  2. 再看 C/F 组灰色柱 → 接通率 25-26% + 意向率 9% 双落后
  3. 最后看 D/E 组居中 → 稳定在均值附近
- **Takeaway**：B 组领先 53%，C/F 组落后均值 15%+，接通率是核心差距

### 视觉编码

- **X 轴编码**：6 个团队（按 3 月转化率降序：B > D > A > E > F > C）
- **Y 轴编码**：百分比（三组独立子图，各自 scale）
- **颜色编码**：B 组 #0066FF，其余 #8B95A2

### 数据组织（3 月数据）

| 团队 | 接通率 | 意向率 | 转化率 |
|------|--------|--------|--------|
| B组 | 32.0% | 12.0% | 2.6% |
| D组 | 32.0% | 12.0% | 2.5% |
| A组 | 29.1% | 11.0% | 2.3% |
| E组 | 29.0% | 11.0% | 2.3% |
| F组 | 26.0% | 9.0% | 1.7% |
| C组 | 25.0% | 9.0% | 1.7% |

### 标注策略

- **高亮**：仅 B 组（1/6 = 16.7%，取最 Top）
- **标注**：B 组接通率柱顶标注"32%"
- **基准线**：三组子图各加一条均值虚线（接通率 28.5% / 意向率 11.2% / 转化率 2.2%）

### 视觉权重

- **hero**：B 组蓝色柱 → 颜色 #0066FF，带 label
- **medium**：D/A 组 → 颜色 #8B95A2
- **light**：E/F/C 组 → 颜色 #C4CDD5（更浅）

### 渲染约束（强制 — 机器可读）

```
annotations:
  - type: label
    target: { series: "接通率", dataIndex: 0 }
    text: "32%"
    position: top
    offset: { x: 0, y: -6 }
    style: { fontSize: 10, fontWeight: normal, fill: "#0066FF" }
  - type: hline
    target: { series: "接通率" }
    value: 28.5
    text: "均值 28.5%"
    position: inside
    offset: { x: 4, y: -4 }
    style: { lineStyle: { color: "#CC0000", type: "dashed", width: 1 }, opacity: 0.5, fontSize: 9, fill: "#CC0000" }
  - type: hline
    target: { series: "意向率" }
    value: 11.2
    text: ""
    style: { lineStyle: { color: "#CC0000", type: "dashed", width: 1 }, opacity: 0.5 }
  - type: hline
    target: { series: "转化率" }
    value: 2.2
    text: ""
    style: { lineStyle: { color: "#CC0000", type: "dashed", width: 1 }, opacity: 0.5 }
```

```
visualWeight:
  hero: { target: "B组所有柱", style: { color: "#0066FF", barMaxWidth: 12 } }
  medium: { target: "D组/A组柱", style: { color: "#8B95A2", barMaxWidth: 12 } }
  light: { target: "E组/F组/C组柱", style: { color: "#C4CDD5", barMaxWidth: 12 } }
```

```
colorMap:
  "B组": "#0066FF"
  "D组": "#8B95A2"
  "A组": "#8B95A2"
  "E组": "#C4CDD5"
  "F组": "#C4CDD5"
  "C组": "#C4CDD5"
  default: "#8B95A2"
```

```
layout:
  canvas: { width: 560, height: 300 }
  grid: { top: 20, right: 16, bottom: 50, left: 48 }
  legend: { show: true, position: bottom, data: ["接通率", "意向率", "转化率"] }
  tooltip: { enabled: true }
```

---

## Page 2: 月度趋势 — 多系列折线图

**场景论文**：3 个月走势，2 月低谷 3 月回暖，但 C/F 组恢复弱
**签名视觉元素**：3 月 B 组数据点加粗圆点 + 标注值

### 叙事意图

**【可视化目的】**：确认趋势是否向好，C/F 是否拖累整体
**【想传达什么】**：3 月整体回暖但分化，B 组继续拉升，C 组仅微幅回升
**【结论】**：趋势向好但 C/F 组回升不足
**【思路】**：第一眼 2 月低谷 → 第二眼 3 月回升幅度差异 → 最终理解 C/F 回升弱

### WIIFT 提要

- **WIIFT 提要**：3 月 B 组人效 +28% 至 26.1，C 组仅 +15% 至 14.4，分化加剧
- **眨眼检验**：B 组蓝色线持续上扬，C 组红色线平缓

### 上下文四问 / TOP-T 框架

- **Topic**：月度人效趋势
- **Guide**：先看 B 组蓝色线 3 月拉到最高 → 再看 C 组红色线仅微升 → 最后看均值灰色线
- **Takeaway**：B 组持续领跑，C/F 组 3 月回升不足

- **情境**：Q1 复盘需要确认趋势走向，C/F 是否拖累整体
- **受众**：管理层，关注整体走势和异常波动
- **沟通者**：电销中心运营负责人
- **目标**：确认 3 月回暖质量，识别 C/F 组恢复乏力

### 视觉编码

- **X 轴编码**：1 月 / 2 月 / 3 月
- **Y 轴编码**：人效（单/人/月）
- **颜色编码**：B 组 #0066FF，C 组 #CC0000，均值 #8B95A2

### 数据组织

| 月份 | B组 | C组 | 均值 |
|------|-----|-----|------|
| 1月 | 19.9 | 14.3 | 16.7 |
| 2月 | 20.3 | 12.5 | 16.3 |
| 3月 | 26.1 | 14.4 | 19.8 |

### 标注策略

- **高亮**：3 月 B 组数据点（最大圆点 + 标注"26.1"）
- **事件标注**：3 月位置上方标注"Q1 旺季"
- **2 月低谷**：C 组 2 月数据点下方标注"春节效应"

### 视觉权重

- **hero**：B 组蓝色线 → lineWidth=3px，3 月圆点 symbolSize=10，label="26.1"
- **medium**：均值灰色线 → lineWidth=1.5px，虚线
- **light**：C 组红色线 → lineWidth=1.5px，圆点 symbolSize=5

### 渲染约束（强制 — 机器可读）

```
annotations:
  - type: label
    target: { series: "B组", dataIndex: 2 }
    text: "26.1"
    position: top
    offset: { x: 0, y: -10 }
    style: { fontSize: 12, fontWeight: 600, fill: "#0066FF" }
  - type: text
    target: { x: "3月", y: 26.1 }
    text: "Q1 旺季"
    position: top
    offset: { x: 0, y: -28 }
    style: { fontSize: 9, fill: "#0066FF", opacity: 0.7 }
  - type: label
    target: { series: "C组", dataIndex: 1 }
    text: "春节效应"
    position: bottom
    offset: { x: 0, y: 12 }
    style: { fontSize: 9, fill: "#CC0000", opacity: 0.7 }
```

```
visualWeight:
  hero: { target: "B组线", style: { color: "#0066FF", lineWidth: 3, symbolSize: 6 } }
  medium: { target: "均值线", style: { color: "#8B95A2", lineWidth: 1.5 } }
  light: { target: "C组线", style: { color: "#CC0000", lineWidth: 1.5, symbolSize: 5 } }
```

```
colorMap:
  "B组": "#0066FF"
  "C组": "#CC0000"
  "均值": "#8B95A2"
  default: "#8B95A2"
```

```
layout:
  canvas: { width: 560, height: 300 }
  grid: { top: 20, right: 16, bottom: 50, left: 48 }
  legend: { show: true, position: bottom, data: ["B组(标杆)", "C组(帮扶)", "均值"] }
  tooltip: { enabled: true }
```

---

## Page 3: 转化漏斗 — 漏斗图

**场景论文**：外呼→接通→意向→成交，四步衰减，接通环节掉 72%
**签名视觉元素**：接通环节用 #CC0000 红色标注"瓶颈"

### 叙事意图

**【可视化目的】**：管理层知道"有转化"，不知道"哪一步掉最多"
**【想传达什么】**：从外呼到接通就掉了 72%，接通率是最大瓶颈
**【结论】**：提升接通率是性价比最高的改进方向
**【思路】**：第一眼红色瓶颈段 → 第二眼看每步衰减比例 → 最终理解接通是关键

### WIIFT 提要

- **WIIFT 提要**：每 100 通外呼仅 28 通接通，若接通率提升 6 个百分点，每月可多成交 650 单
- **眨眼检验**：红色瓶颈段最窄，一秒看出"接通是瓶颈"

### 上下文四问 / TOP-T

- **Topic**：转化漏斗
- **Guide**：先看最宽段"外呼" 100% → 再看最窄段"接通"红色 28%（暴跌 72%）→ 最后看意向→成交进一步衰减
- **Takeaway**：接通率提升是杠杆最大的改进方向

- **情境**：管理层知道"有转化"，不知道"哪一步掉最多"
- **受众**：管理层，关注瓶颈和改进方向
- **沟通者**：电销中心运营负责人
- **目标**：定位最大瓶颈环节，确定 Q2 投入优先级

### 视觉编码

- **宽度编码**：各阶段占比
- **颜色编码**：接通环节 #CC0000 红色，其余深蓝渐变

### 数据组织（全量均值）

| 阶段 | 占比 | 说明 |
|------|------|------|
| 外呼总量 | 100% | 基准 |
| 接通 | 28.0% | 瓶颈：掉 72% |
| 意向 | 10.4% | 掉 64% |
| 成交 | 1.7% | 掉 84% |

### 标注策略

- **高亮**：仅接通环节（红色）
- **标注**：右侧每步之间标注衰减百分比（-72% / -64% / -84%）

### 视觉权重

- **hero**：接通环节 → 红色 #CC0000，标注 14px 600
- **medium**：外呼段 → 深蓝 #003366
- **light**：意向/成交段 → 浅蓝 #C4CDD5

### 渲染约束（强制 — 机器可读）

```
annotations:
  - type: text
    target: { stage: "接通" }
    text: "瓶颈"
    position: inside
    style: { fontSize: 14, fontWeight: 600, fill: "#FFFFFF" }
  - type: text
    target: { between: ["外呼总量", "接通"] }
    text: "-72%"
    position: right
    style: { fontSize: 9, fill: "#CC0000", fontWeight: 600 }
  - type: text
    target: { between: ["接通", "意向"] }
    text: "-64%"
    position: right
    style: { fontSize: 9, fill: "#8B95A2" }
  - type: text
    target: { between: ["意向", "成交"] }
    text: "-84%"
    position: right
    style: { fontSize: 9, fill: "#8B95A2" }
```

```
visualWeight:
  hero: { target: "接通阶段", style: { color: "#CC0000" } }
  medium: { target: "外呼阶段", style: { color: "#003366" } }
  light: { target: "意向阶段/成交阶段", style: { color: "#C4CDD5" } }
```

```
colorMap:
  "外呼": "#003366"
  "接通": "#CC0000"
  "意向": "#4A6FA5"
  "成交": "#C4CDD5"
  default: "#8B95A2"
```

```
layout:
  canvas: { width: 560, height: 300 }
  grid: { top: 10, right: 80, bottom: 10, left: 80 }
  legend: { show: false }
  tooltip: { enabled: true }
```

---

## Page 4: 驱动归因 — 瀑布图

**场景论文**：若 C/F 接通率提升至 B 组水平，Q2 月均可增约 1500 单
**签名视觉元素**：最大正贡献柱用 #009933 绿色

### 叙事意图

**【可视化目的】**：管理层知道"要提升"，不知道"提升哪些能带来多少"
**【想传达什么】**：接通率提升至 B 组水平可贡献 +650 单，是最大杠杆
**【结论】**：Q2 重点抓接通率，其次意向率
**【思路】**：第一眼绿色最大柱 → 第二眼看各因素贡献排序 → 最终理解改进空间

### WIIFT 提要

- **WIIFT 提要**：接通率提升贡献最大（+650 单），是 Q2 性价比最高的投入方向
- **眨眼检验**：绿色柱（接通率）最高，一秒看出方向

### 上下文四问 / TOP-T

- **Topic**：驱动归因
- **Guide**：先看起点"Q1 月均 4,400 单" → 再看绿色最大柱"接通率提升 +650" → 最后看目标"Q2 约 5,900 单"
- **Takeaway**：接通率是最大的增长杠杆

- **情境**：管理层知道"要提升"，不知道"提升哪些能带来多少"
- **受众**：管理层，关注投入产出比和资源分配
- **沟通者**：电销中心运营负责人
- **目标**：用数据量化各改进方向的增量贡献，支撑 Q2 预算决策

### 视觉编码

- **X 轴编码**：各驱动因素
- **Y 轴编码**：成交单数变化量
- **颜色编码**：正向贡献 #009933 绿色，起点/终点 #003366 深蓝

### 数据组织（估算增量单数/月）

| 因素 | 增量单数 | 类型 |
|------|---------|------|
| Q1 月均成交 | 4,400 | 起点 |
| 接通率提升至 B 组水平 | +650 | 正向 |
| 意向率提升至均值 | +400 | 正向 |
| 通话时长优化 | +150 | 正向 |
| 其他因素 | +300 | 正向 |
| Q2 目标成交 | ~5,900 | 终点 |

### 标注策略

- **高亮**：最大正向贡献（接通率 +650）
- **标注**：每根柱顶标注增量值

### 视觉权重

- **hero**：接通率绿色柱 → 最绿，label "+650"
- **medium**：其他正向柱 → 绿色但较浅
- **light**：起点/终点柱 → 深蓝

### 渲染约束（强制 — 机器可读）

```
annotations:
  - type: label
    target: { series: "实际值", dataIndex: 0 }
    text: "4,400"
    position: top
    offset: { x: 0, y: -6 }
    style: { fontSize: 11, fontWeight: 600, fill: "#003366" }
  - type: label
    target: { series: "实际值", dataIndex: 1 }
    text: "+650"
    position: top
    offset: { x: 0, y: -6 }
    style: { fontSize: 11, fontWeight: 600, fill: "#009933" }
  - type: label
    target: { series: "实际值", dataIndex: 2 }
    text: "+400"
    position: top
    offset: { x: 0, y: -4 }
    style: { fontSize: 10, fill: "#2D8C5A" }
  - type: label
    target: { series: "实际值", dataIndex: 3 }
    text: "+150"
    position: top
    offset: { x: 0, y: -4 }
    style: { fontSize: 9, fill: "#5BB88A" }
  - type: label
    target: { series: "实际值", dataIndex: 4 }
    text: "+300"
    position: top
    offset: { x: 0, y: -4 }
    style: { fontSize: 9, fill: "#A8D5BA" }
  - type: label
    target: { series: "实际值", dataIndex: 5 }
    text: "~5,900"
    position: top
    offset: { x: 0, y: -6 }
    style: { fontSize: 11, fontWeight: 600, fill: "#003366" }
```

```
visualWeight:
  hero: { target: "接通率柱(idx=1)", style: { color: "#009933" } }
  medium: { target: "其他正向柱(idx=2,3,4)", style: { color: "#2D8C5A" } }
  light: { target: "起点/终点柱(idx=0,5)", style: { color: "#003366" } }
```

```
colorMap:
  "Q1月均": "#003366"
  "接通率提升": "#009933"
  "意向率提升": "#2D8C5A"
  "通话优化": "#5BB88A"
  "其他": "#A8D5BA"
  "Q2目标": "#003366"
  default: "#8B95A2"
```

```
layout:
  canvas: { width: 560, height: 300 }
  grid: { top: 20, right: 16, bottom: 60, left: 55 }
  legend: { show: false }
  tooltip: { enabled: true }
```

---

## Source ID 清单

| 决策 | Source ID | 来源文件 |
|------|-----------|----------|
| 模式选择 | #172 分组柱状图 | SKILL.md §DNA 索引 |
| 模式选择 | #102 多系列折线 | SKILL.md §DNA 索引 |
| 模式选择 | #041 McKinsey 漏斗 | SKILL.md §DNA 索引 |
| 模式选择 | #003 Bain 瀑布 | SKILL.md §DNA 索引 |
| 风格选择 | #01 麦肯锡蓝 | color-themes.md |
| 构图选择 | 2×2 四象限 | composition-templates.md |
| 字体选择 | Helvetica Neue | typography-moods.md |
