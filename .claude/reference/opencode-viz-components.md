# OpenCode Data Visualization Components

> 20 个纯 SVG 数据可视化组件 | 零依赖 | 暖灰色轴 | 可内嵌文章

来源：opencode.ai 品牌设计系统提取 | 2026-05-31

---

## 使用方式

### 1. 引入 CSS

```html
<link rel="stylesheet" href="opencode-article.css">
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### 2. 在文章中使用

所有组件都是内联 SVG，直接复制对应代码块到 `<article class="oc-article">` 中即可。

### 3. 自定义数据

替换 SVG 中的坐标点、数值、标签即可。每个组件下方标注了需要修改的关键参数。

---

## 色彩系统

所有组件使用 CSS 变量，自动适配亮/暗主题：

| 变量 | 亮色值 | 暗色值 | 用途 |
|------|--------|--------|------|
| `--oc-text-strong` | `hsl(0, 5%, 12%)` | `hsl(0, 15%, 94%)` | 标题、主数据 |
| `--oc-text` | `hsl(0, 1%, 39%)` | `hsl(0, 4%, 71%)` | 正文 |
| `--oc-text-weak` | `hsl(0, 1%, 60%)` | `hsl(0, 2%, 49%)` | 次要信息 |
| `--oc-text-weaker` | `hsl(30, 2%, 81%)` | `hsl(0, 3%, 28%)` | 弱化元素 |
| `--oc-accent` | `#007aff` | `#007aff` | 焦点强调 |
| `--oc-success` | `#30d158` | `#30d158` | 正向 |
| `--oc-danger` | `#ff3b30` | `#ff453a` | 负向 |

---

## 组件目录

| # | 组件 | 场景 | 难度 | 来源 |
|---|------|------|------|------|
| 01 | 面积图 + 条纹 | 增长趋势装饰 | 简单 | OpenCode |
| 02 | 点阵网格 | 分布密度装饰 | 简单 | OpenCode |
| 03 | 竖线条码 | 活跃度波动装饰 | 简单 | OpenCode |
| 04 | KPI 数字卡 | 指标概览 | 简单 | OpenCode |
| 05 | Sparkline | 文本内嵌趋势线 | 简单 | OpenCode |
| 06 | 子弹图 | 单指标对标 | 简单 | OpenCode |
| 07 | 堆叠条形图 | 组成比例 | 中等 | OpenCode |
| 08 | 散点图 | XY 相关性 | 中等 | OpenCode |
| 09 | 热力图 | 时间/分类矩阵 | 中等 | OpenCode |
| 10 | 雷达图 | 多维对比 | 中等 | OpenCode |
| 11 | 漏斗图 | 转化率 | 中等 | OpenCode |
| 12 | 箱线图 | 统计分布 | 中等 | OpenCode |
| 13 | 小倍数图 | 子集趋势对比 | 中等 | OpenCode |
| 14 | 甘特图 | 项目时间线 | 中等 | OpenCode |
| 15 | 树状图 | 分类占比 | 复杂 | OpenCode |
| 16 | 排名条 | 水平排名 + delta | 简单 | Haglöfs |
| 17 | 仪表盘 | 弧形仪表 + 状态 | 中等 | Haglöfs |
| 18 | 进度条 | 水平进度 + 数值 | 简单 | Haglöfs |
| 19 | 排名面板 | 带标题排名容器 | 简单 | Haglöfs |
| 20 | 点阵装饰 | 页面纹理背景 | 简单 | Haglöfs |

---

## 01. 面积图 + 对角线条纹

**场景**：增长趋势的装饰性表达，非精确数据展示。

**自定义**：修改 `<path>` 中的坐标点。

```html
<svg viewBox="0 0 300 180" fill="none">
  <defs>
    <pattern id="hatch1" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="6" stroke="var(--oc-text-weaker)" stroke-width="0.8"/>
    </pattern>
    <clipPath id="area1">
      <!-- 修改这里的坐标点来改变曲线形状 -->
      <path d="M0,160 C50,155 100,140 150,110 C200,80 250,30 300,10 L300,180 L0,180Z"/>
    </clipPath>
  </defs>
  <rect width="300" height="180" fill="url(#hatch1)" clip-path="url(#area1)" opacity="0.5"/>
  <path d="M0,160 C50,155 100,140 150,110 C200,80 250,30 300,10"
        stroke="var(--oc-text-weaker)" stroke-width="1.5" fill="none"/>
</svg>
```

**关键参数**：
- 曲线坐标：`<path d="...">` 中的 `C` (贝塞尔) 或 `L` (直线) 点
- 条纹密度：`pattern` 的 `width`/`height` 值
- 填充透明度：`opacity="0.5"`

---

## 02. 点阵网格

**场景**：分布密度、贡献者活跃度、热力分布的装饰性表达。

**自定义**：修改 `<rect>` 的 `opacity` 值来表达数据。

```html
<svg viewBox="0 0 240 180" fill="none">
  <!-- 每个 rect 代表一个数据点 -->
  <!-- opacity 越高 = 值越大 -->
  <rect x="10" y="10" width="12" height="12" fill="var(--oc-text-weaker)" opacity="0.15" rx="1"/>
  <rect x="28" y="10" width="12" height="12" fill="var(--oc-text-weaker)" opacity="0.4" rx="1"/>
  <!-- ... 更多点 -->
</svg>
```

**关键参数**：
- 网格密度：`width`/`height` 和 `x`/`y` 间距
- 数据编码：`opacity` 值（0.05 ~ 0.9）
- 圆角：`rx` 值

---

## 03. 竖线条码

**场景**：活跃度波动、频率分布的装饰性表达。

**自定义**：修改每条线的 `y2` 值来改变高度。

```html
<svg viewBox="0 0 300 160" fill="none">
  <g stroke="var(--oc-text-weaker)" stroke-width="1.2">
    <!-- y1 = 底部固定, y2 = 顶部（值越大越矮） -->
    <line x1="10" y1="150" x2="10" y2="35"/>
    <line x1="18" y1="150" x2="18" y2="50"/>
    <!-- ... 更多线 -->
  </g>
</svg>
```

**关键参数**：
- 线条间距：`x1` 的增量（建议 8px）
- 高度范围：`y2` 的值域（0 = 最高，150 = 最低）
- 线宽：`stroke-width`

---

## 04. KPI 数字卡

**场景**：Dashboard 指标概览，大数字 + 变化量。

```html
<div class="oc-kpi-row">
  <div class="oc-kpi">
    <div class="oc-kpi-value">2.4M</div>
    <div class="oc-kpi-label">Monthly Active</div>
    <div class="oc-kpi-delta oc-kpi-delta--up">+12.3%</div>
  </div>
  <!-- 更多卡片 -->
</div>
```

**自定义**：
- 数字：修改 `.oc-kpi-value` 内容
- 标签：修改 `.oc-kpi-label` 内容
- 变化方向：`oc-kpi-delta--up` / `--down` / `--flat`

---

## 05. Sparkline

**场景**：嵌入文本流的极简趋势线，无轴无标签。

```html
<p>
  本月活跃用户
  <span class="oc-sparkline">
    <svg width="80" height="24" viewBox="0 0 80 24" fill="none">
      <!-- 修改 points 来改变趋势 -->
      <polyline points="0,20 8,18 16,14 24,16 32,10 40,12 48,6 56,8 64,4 72,2 80,0"
                stroke="var(--oc-text-weaker)" stroke-width="1.5" fill="none"/>
    </svg>
  </span>
  较上月增长 12.3%。
</p>
```

**关键参数**：
- 趋势方向：`points` 中 y 值递减 = 上升趋势
- 尺寸：`width`/`height`（建议 60-100px 宽，20-30px 高）
- 颜色：`stroke` 变量（`--oc-text-weaker` 中性，`--oc-success` 正向，`--oc-danger` 负向）

---

## 06. 子弹图

**场景**：单指标对标——实际值 vs 目标 vs 范围带。

```html
<div class="oc-bullet">
  <div class="oc-bullet-row">
    <div class="oc-bullet-label">Revenue</div>
    <div class="oc-bullet-track">
      <!-- 背景范围带（三段灰度） -->
      <div class="oc-bullet-range oc-bullet-range--low" style="left:0; width:40%;"></div>
      <div class="oc-bullet-range oc-bullet-range--mid" style="left:40%; width:30%;"></div>
      <div class="oc-bullet-range oc-bullet-range--high" style="left:70%; width:30%;"></div>
      <!-- 实际值条 -->
      <div class="oc-bullet-bar" style="left:0; width:78%;"></div>
      <!-- 目标线 -->
      <div class="oc-bullet-target" style="left:85%;"></div>
    </div>
    <div class="oc-bullet-value">78%</div>
  </div>
</div>
```

**关键参数**：
- 实际值：`.oc-bullet-bar` 的 `width` 百分比
- 目标值：`.oc-bullet-target` 的 `left` 百分比
- 范围带：三段 `.oc-bullet-range` 的 `width` 和 `left`

---

## 07. 堆叠条形图

**场景**：组成比例，多类别堆叠对比。

```html
<div class="oc-stacked-bar">
  <div class="oc-stacked-bar-row">
    <div class="oc-stacked-bar-label">Q1</div>
    <div class="oc-stacked-bar-track">
      <!-- 每段宽度 = 该类别的百分比 -->
      <div class="oc-stacked-bar-seg" style="width:35%; background:var(--oc-text-strong);"></div>
      <div class="oc-stacked-bar-seg" style="width:25%; background:var(--oc-text-weak);"></div>
      <div class="oc-stacked-bar-seg" style="width:20%; background:var(--oc-text-weaker);"></div>
      <div class="oc-stacked-bar-seg" style="width:20%; background:var(--oc-border);"></div>
    </div>
  </div>
  <!-- 图例 -->
  <div class="oc-stacked-bar-legend">
    <div class="oc-stacked-bar-legend-item">
      <div class="oc-stacked-bar-legend-dot" style="background:var(--oc-text-strong);"></div>
      Category A
    </div>
  </div>
</div>
```

**关键参数**：
- 各段宽度：`style="width:XX%"`（总和 = 100%）
- 灰度层级：`--oc-text-strong` > `--oc-text-weak` > `--oc-text-weaker` > `--oc-border`

---

## 08. 散点图

**场景**：XY 相关性分析，圆面积编码第三维。

```html
<svg viewBox="0 0 400 250" fill="none">
  <!-- 坐标轴 -->
  <line x1="40" y1="210" x2="390" y2="210" stroke="var(--oc-border)" stroke-width="1"/>
  <line x1="40" y1="210" x2="40" y2="10" stroke="var(--oc-border)" stroke-width="1"/>
  <!-- 数据点 -->
  <!-- cx = X值, cy = Y值, r = 第三维（面积） -->
  <circle cx="290" cy="55" r="8" fill="var(--oc-accent)" opacity="0.7"/>
  <circle cx="150" cy="140" r="4" fill="var(--oc-text-weaker)" opacity="0.5"/>
  <!-- 轴标签 -->
  <text x="215" y="235" fill="var(--oc-text-weak)" font-size="10" text-anchor="middle">X Axis</text>
  <text x="15" y="115" fill="var(--oc-text-weak)" font-size="10" text-anchor="middle" transform="rotate(-90,15,115)">Y Axis</text>
</svg>
```

**关键参数**：
- 数据点坐标：`cx`/`cy`（映射到 viewBox 范围内）
- 点大小：`r`（编码第三维数值）
- 焦点高亮：用 `var(--oc-accent)` 蓝色 + 较高 `opacity`

---

## 09. 热力图

**场景**：时间 × 分类矩阵，灰度深浅编码值。

```html
<svg viewBox="0 0 380 200" fill="none">
  <!-- 列标签 -->
  <text x="55" y="15" fill="var(--oc-text-weak)" font-size="9" text-anchor="middle">Mon</text>
  <!-- 行标签 -->
  <text x="30" y="42" fill="var(--oc-text-weak)" font-size="9" text-anchor="end">09:00</text>
  <!-- 数据格 -->
  <!-- opacity 编码值大小（0.05 = 最低, 0.9 = 最高） -->
  <rect x="40" y="25" width="30" height="30" rx="3" fill="var(--oc-text-strong)" opacity="0.8"/>
  <rect x="90" y="25" width="30" height="30" rx="3" fill="var(--oc-text-strong)" opacity="0.5"/>
</svg>
```

**关键参数**：
- 数据编码：`opacity` 值（0.05 ~ 0.9）
- 格子大小：`width`/`height`（建议 25-35px）
- 圆角：`rx="3"`

---

## 10. 雷达图

**场景**：3-5 维能力/指标对比。

```html
<svg viewBox="0 0 300 280" fill="none">
  <!-- 底框：5层同心五边形（根据维度数调整顶点） -->
  <polygon points="150,30 263,113 220,242 80,242 37,113"
           stroke="var(--oc-border)" stroke-width="0.5" fill="none"/>
  <!-- 数据多边形 -->
  <polygon points="150,45 245,118 205,230 90,215 55,120"
           stroke="var(--oc-text-strong)" stroke-width="1.5"
           fill="var(--oc-text-strong)" fill-opacity="0.08"/>
  <!-- 标签 -->
  <text x="150" y="20" fill="var(--oc-text)" font-size="10" text-anchor="middle">Performance</text>
</svg>
```

**关键参数**：
- 维度数：底框和数据多边形的顶点数（3-5 个最佳）
- 数据值：每个顶点到中心的距离（y 值越小 = 值越大）
- 标签位置：在多边形外部对应顶点方向

---

## 11. 漏斗图

**场景**：转化率分析，阶段递减。

```html
<svg viewBox="0 0 400 220" fill="none">
  <!-- 梯形层级：宽度比例 = 转化率 -->
  <polygon points="50,10 350,10 330,50 70,50" fill="var(--oc-text-strong)" opacity="0.7"/>
  <polygon points="70,55 330,55 305,95 95,95" fill="var(--oc-text-strong)" opacity="0.5"/>
  <!-- 标签 -->
  <text x="200" y="35" fill="var(--oc-text-inverted)" font-size="11" text-anchor="middle" font-weight="600">Visitors</text>
</svg>
```

**关键参数**：
- 层级宽度：`points` 的 x 值差（= 该阶段数量）
- 透明度递减：从 0.7 逐级降低，表达流失
- 标签颜色：宽层用 `--oc-text-inverted`，窄层用 `--oc-text`

---

## 12. 箱线图

**场景**：统计分布，中位数 + 四分位 + 异常值。

```html
<svg viewBox="0 0 400 200" fill="none">
  <!-- 须线（min to max） -->
  <line x1="100" y1="30" x2="100" y2="160" stroke="var(--oc-text-weaker)" stroke-width="1"/>
  <!-- 箱体（Q1 to Q3） -->
  <rect x="85" y="60" width="30" height="70" fill="var(--oc-bg-weak)" stroke="var(--oc-text-weak)" stroke-width="1"/>
  <!-- 中位数线 -->
  <line x1="85" y1="100" x2="115" y2="100" stroke="var(--oc-text-strong)" stroke-width="2"/>
  <!-- 须端 -->
  <line x1="92" y1="30" x2="108" y2="30" stroke="var(--oc-text-weaker)" stroke-width="1"/>
  <line x1="92" y1="160" x2="108" y2="160" stroke="var(--oc-text-weaker)" stroke-width="1"/>
</svg>
```

**关键参数**：
- 中位数：粗线 `y` 值
- Q1/Q3：`rect` 的 `y` 和 `height`
- 须线范围：上下横线的 `y` 值

---

## 13. 小倍数图

**场景**：同一模板重复多次，对比子集趋势。

```html
<div class="oc-small-multiples">
  <div class="oc-small-multiple">
    <div class="oc-small-multiple-title">North</div>
    <svg viewBox="0 0 120 50" fill="none">
      <polyline points="0,40 15,35 30,30 45,25 60,28 75,15 90,18 105,10 120,5"
                stroke="var(--oc-text-strong)" stroke-width="1.5" fill="none"/>
    </svg>
    <div class="oc-small-multiple-value">+18.2%</div>
  </div>
  <!-- 更多子图 -->
</div>
```

**关键参数**：
- 每个子图的 `polyline points` 独立
- 颜色区分趋势：上升 `--oc-text-strong`，下降 `--oc-danger`，持平 `--oc-text-weak`
- 数量：建议 3-6 个

---

## 14. 甘特图

**场景**：项目时间线，灰度编码状态。

```html
<svg viewBox="0 0 400 180" fill="none">
  <!-- 时间轴刻度线 -->
  <line x1="100" y1="10" x2="100" y2="170" stroke="var(--oc-border-weak)" stroke-width="0.5" stroke-dasharray="4,4"/>
  <!-- 任务条 -->
  <!-- x = 起始时间, width = 持续时间 -->
  <rect x="100" y="20" width="80" height="16" rx="3" fill="var(--oc-text-strong)" opacity="0.6"/>
  <!-- 虚线条 = 计划中 -->
  <rect x="280" y="110" width="80" height="16" rx="3" fill="none"
        stroke="var(--oc-text-weaker)" stroke-width="1" stroke-dasharray="4,2"/>
</svg>
```

**关键参数**：
- 起始位置：`x` 值（映射到时间轴）
- 持续时间：`width` 值
- 状态编码：实心 = 已完成/进行中，虚线 = 计划中
- 灰度：深 = 已完成，浅 = 进行中

---

## 15. 树状图

**场景**：分类占比，嵌套矩形面积映射。

```html
<svg viewBox="0 0 400 240" fill="none">
  <!-- 外框 -->
  <rect x="0" y="0" width="400" height="240" rx="4" stroke="var(--oc-border)" fill="var(--oc-bg-weak)"/>
  <!-- 面积 = 占比 -->
  <rect x="2" y="2" width="238" height="236" rx="3" fill="var(--oc-text-strong)" opacity="0.12"/>
  <!-- 标签 -->
  <text x="121" y="190" fill="var(--oc-text)" font-size="11" font-weight="600" text-anchor="middle">Individual</text>
  <text x="121" y="205" fill="var(--oc-text-weak)" font-size="10" text-anchor="middle">35%</text>
</svg>
```

**关键参数**：
- 矩形面积：`width` × `height`（比例 = 占比）
- 灰度层级：面积越大越深
- 标签位置：矩形中心

---

## 不能做的图表类型

| 类型 | 原因 |
|------|------|
| 3D 图表 | 违反零依赖约束 |
| 交互式图表 | 无 JS，无法 tooltip/钻取 |
| 大规模散点（500+ 点） | SVG 节点数瓶颈 |
| 网络图/弦图 | 自动布局是计算问题 |
| 地理热力图 | 区域路径数据量太大 |
| 动态仪表盘 | 实时数据 + 无 JS = 不可能 |
| 流图 (Streamgraph) | 曲线计算需 JS 预计算 |

---

---

## 16. 排名条 (Rank Bar)

> 来源：Haglöfs Dashboard

**场景**：水平排名对比，带进度条和 delta 变化量。

```html
<div class="oc-rank">
  <div class="oc-rank-row">
    <div class="oc-rank-name">Enterprise</div>
    <div class="oc-rank-track">
      <div class="oc-rank-fill oc-rank-fill--up" style="width:92%;"></div>
    </div>
    <div class="oc-rank-val">$3.2M</div>
    <div class="oc-rank-delta oc-rank-delta--up">+14.2%</div>
  </div>
</div>
```

**关键参数**：
- 进度宽度：`.oc-rank-fill` 的 `width` 百分比
- 方向样式：`--up`（深色）/ `--down`（浅色）/ `--flat`（最浅）
- 列布局：`grid-template-columns` 控制四列宽度

---

## 17. 仪表盘 (Gauge)

> 来源：Haglöfs Dashboard

**场景**：弧形仪表盘 + 状态标签，用于单指标健康度展示。

```html
<div class="oc-gauge">
  <svg width="120" height="75" viewBox="0 0 120 75">
    <!-- 底弧 -->
    <path d="M10,65 A50,50 0 0,1 110,65" fill="none" stroke="var(--oc-bg-weak)" stroke-width="10" stroke-linecap="round"/>
    <!-- 值弧：stroke-dashoffset 控制填充比例 -->
    <path d="M10,65 A50,50 0 0,1 110,65" fill="none" stroke="var(--oc-text-strong)" stroke-width="10" stroke-linecap="round" stroke-dasharray="157" stroke-dashoffset="30" opacity="0.7"/>
  </svg>
  <div class="oc-gauge-value">81%</div>
  <div class="oc-gauge-label">Uptime</div>
  <div class="oc-gauge-status oc-gauge-status--ok">HEALTHY</div>
</div>
```

**关键参数**：
- 填充比例：`stroke-dashoffset`（0 = 100%，157 = 0%）
- 弧形大小：`width`/`height` + `viewBox`
- 状态：`--ok` / `--warn` / `--err`

---

## 18. 进度条 (Progress Bar)

> 来源：Haglöfs Dashboard

**场景**：水平进度展示，带目标值对比。

```html
<div class="oc-progress-row">
  <div class="oc-progress-header">
    <span class="oc-progress-label">Q1 Revenue</span>
    <span class="oc-progress-value">$2.4M / $3.0M</span>
  </div>
  <div class="oc-progress-track">
    <div class="oc-progress-fill" style="width:80%;"></div>
  </div>
</div>
```

**关键参数**：
- 进度：`width` 百分比
- 数值：`.oc-progress-value` 内容
- 透明度：`opacity` 区分多条进度的优先级

---

## 19. 排名面板 (Rank Panel)

> 来源：Haglöfs Dashboard

**场景**：带标题的排名列表容器，用于 Dashboard 数据面板。

```html
<div class="oc-rank-panel">
  <div class="oc-rank-panel-title">Top Regions by Revenue</div>
  <div class="oc-rank">
    <!-- rank rows here -->
  </div>
</div>
```

**关键参数**：
- 标题：`.oc-rank-panel-title` 内容
- 内部复用 `.oc-rank` 组件

---

## 20. 点阵装饰 (Dot Pattern)

> 来源：Haglöfs

**场景**：装饰性点阵网格，用于页面纹理或数据密度背景。

```html
<div class="oc-dot-pattern" style="grid-template-columns: repeat(20, 6px);">
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot dot--off"></div>
  <!-- more dots -->
</div>
```

**关键参数**：
- 网格密度：`grid-template-columns` 的重复数
- 有/无：`.dot` = 实心，`.dot--off` = 透明
- 整体透明度：外层 `opacity`

---

*组件库 v2.0 | 2026-05-31 | opencode-article.css | +5 Haglöfs 组件*
