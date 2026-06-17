# H 素材库分析

> 最后更新：2026-06-07

---

## 一、组件分布矩阵

> 横轴=65 个 HTML，纵轴=组件类型。✓=使用，-=未使用。

### 基础设施（>50% 文件使用）

| 组件 | 使用数 | 使用率 | 说明 |
|------|--------|--------|------|
| Grid 布局 | 59 | 91% | 几乎每个文件都有 |
| Hero | 52 | 80% | 12 个文件无 Hero |
| Footer | 51 | 78% | 14 个文件无 Footer |

### 常用组件（20-40% 文件使用）

| 组件 | 使用数 | 使用率 | 代表文件 |
|------|--------|--------|---------|
| Pipeline/Flow | 19 | 29% | H017, H018, H020, H017, H018, H052, H056, H058 |
| Table | 18 | 28% | H014, H018, H017, H018, H052, H056, H058 |
| Card | 17 | 26% | H014, H013, H017, H018, H020, H023, H056, H058 |
| Callout | 16 | 25% | H010, H016, H017, H018, H017, H018, H052, H056 |
| Nav | 15 | 23% | H009, H016, H017, H018, H023, H052, H056, H058 |
| Ring/Radial | 14 | 22% | H010, H025, H034, H037, H025, H027, H058, H023 |
| Progress | 14 | 22% | H002, H005, H014, H010, H004, H025, H017, H018 |
| Chart/Donut | 13 | 20% | H004, H005, H025, H029, H031, H034, H035, H052 |
| Layer/Stack | 12 | 18% | H005, H015, H020, H017, H018, H022, H025, H027 |

### 稀缺组件（<10% 文件使用）

| 组件 | 使用数 | 使用率 | 使用文件 |
|------|--------|--------|---------|
| Accordion | 6 | 9% | H015, H017, H018, H023-nian, H023-showcase, H063 |
| Toggle | 5 | 8% | H017, H018, H023-nian, H023-showcase, H025 |
| Rank | 5 | 8% | H002, H014, H004, H013, H025 |
| Tab Panel | 4 | 6% | H018, H023-nian, H023-showcase, H025 |
| Block Bar | 3 | 5% | H009, H058, H025 |
| Gauge | 3 | 5% | H009, H008, H025 |
| Heatmap | 2 | 3% | H005, H004 |
| Dot Matrix | 1 | 2% | H025 |
| Waterfall | 0 | 0% | 无（仅 CSS 定义） |
| Quadrant | 0 | 0% | 无（仅 CSS 定义） |

### 关键发现

- **Grid/Footer/Hero 是基础设施**，不需要单独统计
- **Pipeline 是最常用的"专用组件"**（29%），说明流程展示是高频场景
- **Table 和 Card 并列第二**（28%/26%），汇报和品牌展示都需要
- **稀缺组件中，Toggle/Accordion/Tab 集中在 H017/H018/H023**——只有品牌系统类文件才用交互组件
- **Waterfall 和 Quadrant 从未在任何文件中实际使用**，属于死代码

---

## 二、每文件组件拆解

### 品牌类

| 文件 | 行数 | MaxWidth | Padding | 最大字号 | 深色区 | SVG | JS | Hero 类型 | 组件清单 |
|------|------|----------|---------|---------|--------|-----|----|----------|---------|
| H001 | 882 | 1200 | 80/120 | 180px | 0 | 0 | - | hero | table, ring, callout, pipeline, grid, nav, footer |
| H015 | 532 | 1024 | 80/clamp | 24px | 0 | 1 | Y | hero | card, ring, accordion, pipeline, grid, footer |
| H016 | 933 | 1200 | 80/120 | 180px | 4 | 8 | - | hero | card, grid, nav, footer |
| H017 | 900 | 1200 | 80/120 | 180px | 4 | 2 | Y | hero | card, table, progress, callout, toggle, accordion, pipeline, grid, layer, nav, footer |
| H018 | 1196 | 1120 | 80/120 | 180px | 11 | 8 | - | hero | card, table, progress, callout, toggle, accordion, tab-panel, pipeline, grid, layer, nav, footer |
| H019 | 400 | 1200 | 80/120 | 180px | 5 | 0 | - | hero | grid, nav, footer |
| H020 | 465 | 1200 | 80/120 | 180px | 6 | 0 | - | hero | card, grid, nav, footer |
| H034 | 555 | 1024 | 80/120 | 180px | 4 | 0 | - | hero | card, table, ring, callout, grid, footer |
| H021 | 261 | 1024 | 80/120 | 180px | 4 | 0 | - | hero | table, grid, footer |
| H022 | 501 | 1024 | 80/120 | 180px | 1 | 0 | - | hero | table, grid, layer, footer |
| H037 | 629 | 1024 | 80/120 | 180px | 3 | 0 | - | hero | card, ring, grid, footer |
| H023-nian | 1818 | 1300 | 6rem/2rem | 5.5rem | 7 | 1 | Y | hero | card, toggle, accordion, tab-panel, pipeline, grid, layer, nav, footer |
| H023-showcase | 616 | 1300 | - | - | 0 | 1 | Y | - | toggle, accordion, tab-panel, pipeline, grid, layer, nav, footer |
| H025 | 306 | 1024 | 120 | 100px | 5 | 0 | - | hero | ring, pipeline, grid, layer, chart, footer |
| H027 | 316 | 1024 | 120 | 56px | 7 | 0 | - | hero-reveal | ring, grid, layer, footer |
| H044 | 851 | 1119 | space-4xl | 28px | 0 | 4 | - | hero-split | ring, grid, layer, footer |
| H063 | 577 | 1024 | s-5xl/s-4xl | 56px | 0 | 0 | Y | hero | card, callout, toggle, accordion, pipeline, grid, footer |
| H064 | 908 | 1024 | 120/48 | 72px | 0 | 1 | - | hero | grid, chart, nav, footer |
| H065 | 854 | 1024 | 120/48 | 140px | 3 | 1 | - | hero | ring, grid, nav, footer |
| H029 | 549 | 1120 | - | 16px | 7 | 0 | - | - | ring, pipeline, grid, footer |

### 数据类

| 文件 | 行数 | MaxWidth | Padding | 最大字号 | 深色区 | SVG | JS | Hero 类型 | 组件清单 |
|------|------|----------|---------|---------|--------|-----|----|----------|---------|
| H002 | 317 | 800 | 80/120 | 72px | 0 | 0 | - | hero | table, progress, rank, grid, footer |
| H009 | 202 | 768 | space-3xl | 120px | 0 | 5 | Y | hero | gauge, block-bar, nav, footer |
| H004 | 285 | 960 | 80/32 | 36px | 3 | 3 | Y | - | grid, chart |
| H005 | 326 | 1024 | 80/32 | 36px | 2 | 1 | Y | - | heatmap, grid, layer, chart |
| H010 | 175 | 800 | - | 10px | 4 | 6 | - | - | ring, progress, grid, chart, footer |
| H004 | 170 | 800 | - | 10px | 4 | 2 | Y | - | heatmap, progress, rank, grid, footer |
| H012 | 1054 | 1120 | space-4xl | 5rem | 0 | 0 | - | hero | progress, pipeline, grid, footer |
| H025 | 333 | 1120 | 2/10 | 11px | 18 | 2 | - | dp-hero | ring, progress, grid, layer |
| H031 | 1643 | 1200 | sp-12 | 72px | 1 | 0 | - | slide hero | grid, chart, footer |
| H052 | 346 | 1200 | 80/120/60 | 48px | 2 | 0 | - | hero | table, ring, progress, pipeline, grid, layer, chart, nav, footer |
| H053 | 293 | 960 | 80/32 | 28px | 1 | 0 | Y | - | grid, chart |
| H036 | 215 | 1120 | 2/10 | 11px | 2 | 1 | - | - | grid, chart, footer |
| H064 | 668 | 1120 | s8 | 16px | 16 | 3 | - | hero | progress, callout, pipeline, grid, layer, chart, nav, footer |

### 工作汇报类

| 文件 | 行数 | MaxWidth | Padding | 最大字号 | 深色区 | SVG | JS | Hero 类型 | 组件清单 |
|------|------|----------|---------|---------|--------|-----|----|----------|---------|
| H004 | 83 | 1200 | s20/s10 | 15px | 0 | 0 | - | - | progress, grid, footer |
| H014 | 193 | 1120 | 48/40 | 28px | 0 | 0 | - | - | card, table, rank, grid, footer |
| H015 | 460 | 900 | 80/48 | 220px | 0 | 0 | - | hero | grid, layer, footer |
| H016 | 715 | 900 | 96/48 | 160px | 0 | 0 | - | hero | callout, grid, footer |
| H057 | 174 | 1024 | 80/120 | 180px | 1 | 0 | - | hero | callout, pipeline, grid, footer |

### 操作手册类

| 文件 | 行数 | MaxWidth | Padding | 最大字号 | 深色区 | SVG | JS | Hero 类型 | 组件清单 |
|------|------|----------|---------|---------|--------|-----|----|----------|---------|
| H017 | 642 | 900 | 80/48 | 180px | 0 | 0 | - | hero | callout, pipeline, grid, footer |
| H018 | 649 | 900 | 80/48 | 120px | 0 | 4 | - | hero | table, callout, pipeline, grid, footer |
| H019 | 562 | 900 | 80/48 | 42px | 0 | 0 | - | hero | table, grid, footer |
| H020 | 604 | 900 | 0 | 56px | 0 | 0 | - | hero | table, progress, pipeline, grid, layer, footer |

### 设计案例类

| 文件 | 行数 | MaxWidth | Padding | 最大字号 | 深色区 | SVG | JS | Hero 类型 | 组件清单 |
|------|------|----------|---------|---------|--------|-----|----|----------|---------|
| H044 | 623 | 1120 | s24/s8 | 2rem | 13 | 0 | - | hero | pipeline, grid, footer |
| H029 | 717 | 1024 | 80/120 | 100px | 0 | 0 | - | hero-runway | ring, grid, layer, chart, footer |
| H030 | 255 | 1024 | 80/120 | 80px | 9 | 0 | - | - | grid, footer |
| H032 | 746 | 1024 | 120 | 56px | 0 | 0 | - | hero-infra | ring, grid, layer, footer |
| H033 | 152 | 800 | - | 120px | 3 | 0 | - | - | grid, footer |
| H034 | 250 | 1120 | 2/10 | 11px | 2 | 2 | - | - | callout, grid, chart |
| H035 | 186 | 1120 | 120 | 11px | 2 | 0 | - | - | grid, chart, footer |

### 其他

| 文件 | 行数 | MaxWidth | Padding | 最大字号 | 深色区 | SVG | JS | Hero 类型 | 组件清单 |
|------|------|----------|---------|---------|--------|-----|----|----------|---------|
| H002 | 981 | 960 | space-2xl | 4rem | 0 | 0 | - | - | progress, pipeline, grid, nav, footer |
| H003 | 435 | 1100 | 80/64 | 56px | 4 | 0 | - | - | grid, footer |
| H005 | 494 | 1120 | 120 | 72px | 4 | 0 | Y | hero | ring, progress, pipeline, grid, footer |
| H005 | 100 | 1200 | s20/s10 | 15px | 0 | 0 | - | - | grid, footer |
| H008 | 101 | 1200 | s20/s10 | 22px | 0 | 0 | - | - | grid, footer |
| H010 | 256 | 1024 | 80/120 | 180px | 1 | 0 | - | hero | callout, grid, footer |
| H008 | 299 | 1120 | 3/10 | 96px | 0 | 2 | Y | hero-title | table, gauge, grid, footer |
| H009 | 638 | 1400 | 64/32 | 72px | 0 | 0 | - | hero | grid, footer |
| H013 | 260 | 900 | s-4xl/pad | 40px | 3 | 0 | - | hero-v3 | card, progress, callout, rank, grid |
| H014 | 255 | 900 | s-4xl/pad | 32px | 2 | 0 | - | hero-v4 | progress, grid, footer |
| H037 | 487 | 1100 | 4/12 | 72px | 1 | 0 | - | - | table, pipeline, grid, footer |
| H056 | 663 | 1200 | 80/120 | 180px | 1 | 0 | - | hero | card, table, callout, pipeline, grid, chart, nav, footer |
| H058 | 817 | 1200 | 80/120 | 180px | 1 | 0 | - | hero | card, table, ring, callout, pipeline, block-bar, grid, nav, footer |
| H023 | 514 | 1120 | 120 | 72px | 4 | 0 | Y | hero | ring, grid, footer |
| H025 | 1392 | 1120 | 96 | 100px | 3 | 2 | Y | - | card, gauge, progress, callout, toggle, accordion, tab-panel, pipeline, rank, block-bar, grid, layer, dot-matrix, nav, footer |
| H027 | 257 | 1200 | 80/120 | 48px | 7 | 0 | - | hero-base | card, grid |
| H008 | 299 | 1120 | 3/10 | 96px | 0 | 2 | Y | hero-title | table, gauge, grid, footer |

---

## 三、容器与排版维度统计

### MaxWidth 分布

| 值 | 文件数 | 占比 | 典型场景 |
|----|--------|------|---------|
| 1200px | 15 | 23% | 品牌展示、数据看板 |
| 1120px | 12 | 18% | 组件库、汇报、数据叙事 |
| 1024px | 13 | 20% | 品牌系统、设计案例 |
| 900px | 8 | 12% | 操作手册、工作汇报 |
| 1300px | 2 | 3% | H023 Mino 设计系统 |
| 800px | 3 | 5% | 数据叙事（紧凑型） |
| 768px | 1 | 2% | H009 仪表盘 |
| 1100px | 2 | 3% | H003, H037 |
| 1400px | 1 | 2% | H009 知识管理 |

**结论**：1024-1200px 是主流（61%），900px 用于阅读密集型，<800px 仅用于纯数据展示。

### 最大字号分布

| 范围 | 文件数 | 占比 | 说明 |
|------|--------|------|------|
| 180px | 15 | 23% | "Hero numeral" 标准模式 |
| 72-140px | 20 | 31% | 中等 Hero |
| 40-56px | 10 | 15% | 紧凑型标题 |
| <40px | 15 | 23% | 无大字号 Hero |
| 5.5rem (88px) | 2 | 3% | H023 |

**结论**：180px 大数字 Hero 是最常见的视觉锚点（23%），但 38% 的文件完全不用大字号。

### 深色区块分布

| 深色引用数 | 文件数 | 说明 |
|-----------|--------|------|
| 0 | 35 | 纯浅色 |
| 1-5 | 16 | 少量深色点缀 |
| 6-12 | 10 | 深浅交替明显 |
| 13+ | 4 | 重度深色（H025:18, H044:13, H018:11, H064:16） |

**结论**：54% 的文件是纯浅色，深色区块主要用于 Hero 和数据可视化区。

### JS 使用

| 类型 | 文件数 | 说明 |
|------|--------|------|
| 纯 HTML/CSS | 51 | 78% |
| 有 JS | 14 | 22% |

JS 主要用途：dot-matrix 渲染（H025）、block-bar 生成（H009）、heatmap 生成（H004）、交互切换（H017, H018, H023）。

---

## 四、质量评分

### 评分维度

| 维度 | 权重 | 说明 |
|------|------|------|
| 组件丰富度 | 30% | 使用了多少不同类型的组件 |
| 结构完整性 | 25% | Hero + Content + Footer 是否齐全 |
| 数据真实性 | 20% | 使用真实/仿真业务数据 vs Math.random() |
| 视觉节奏 | 15% | 深浅交替、间距一致性、宽幅统一性 |
| 独特性 | 10% | 是否有其他文件没有的组件或布局 |

### 评分结果

| 排名 | 文件 | 组件数 | 结构 | 数据 | 节奏 | 独特 | 总分 |
|------|------|--------|------|------|------|------|------|
| 1 | H025-组件展示 | 15 | ★★★★ | ★★★★★ | ★★★★ | ★★★★★ | 92 |
| 2 | H018-组件库 | 13 | ★★★★★ | ★★★★ | ★★★★ | ★★★★ | 88 |
| 3 | H052-通用报告 | 10 | ★★★★★ | ★★★★★ | ★★★★ | ★★★ | 85 |
| 4 | H058-分量策略 | 10 | ★★★★ | ★★★★★ | ★★★★ | ★★★ | 83 |
| 5 | H023-Mino-nian | 10 | ★★★★★ | ★★★ | ★★★★★ | ★★★★★ | 82 |
| 6 | H017-数字产品 | 12 | ★★★★ | ★★★★ | ★★★ | ★★★★ | 80 |
| 7 | H064-数据分析中心 | 9 | ★★★★ | ★★★★ | ★★★★★ | ★★★★ | 79 |
| 8 | H056-讲故事手册 | 9 | ★★★★ | ★★★★ | ★★★★ | ★★★ | 76 |
| 9 | H001-品牌展示 | 8 | ★★★★★ | ★★★ | ★★★★ | ★★★★ | 75 |
| 10 | H017-操作手册 | 6 | ★★★★★ | ★★★★ | ★★★★ | ★★★ | 73 |

### 低分文件（<50 分）

| 文件 | 问题 |
|------|------|
| H004-工作汇报-split | 83 行，组件极少，仅 progress+grid |
| H005-供应商介绍 | 100 行，只有 grid+footer |
| H008-数据叙事 | 101 行，只有 grid+footer |
| H019-零售体验 | 400 行但只有 grid+nav+footer，组件单一 |
| H033-Spotify | 152 行，只有 grid+footer |

---

## 五、H025 组件审计

H025 是组件库，但存在"收集未使用"的问题：

### 已在 HTML body 中渲染的组件（Section 09-16）

| Section | 组件 | 是否有实战场景 |
|---------|------|--------------|
| 09 | Dot Matrix Logo/Number/Word/Status | ✓ 品牌叙事、数据展示 |
| 10 | Font Role Card (3 种) | ✓ 设计规范展示 |
| 11 | Button (4 变体), Input (3 状态), Segmented, Tab, Accordion, Checklist, Pipeline, Do/Don't, Progress, Toggle | ✓ 通用 UI |
| 12 | Detail Panel (overlay + panel + stats + table) | ✓ 数据穿透 |
| 13-16 | （已清除的 Section 13-16） | — |

### CSS 已定义但 HTML 未渲染的组件（死代码）

| 组件 | CSS 类名 | 状态 |
|------|---------|------|
| Alert | `.alert`, `.alert-head`, `.alert-badge` | 死代码 |
| Insight Bar | `.insight`, `.insight-icon` | 死代码 |
| Metrics Row | `.metrics-row`, `.metric` | 死代码 |
| Comparison Block | `.comparison`, `.comparison-block--old/--new` | 死代码 |
| Modal | `.modal-overlay`, `.modal`, `.modal-head` | 死代码 |
| Period Nav | `.period-nav`, `.period-btn` | 死代码 |
| Asymmetric Table | `.asym-table`, `.asym-side` | 死代码 |
| Data Density | `.density-grid`, `.density-heavy` | 死代码 |
| Large Sparkline | `.sparkline-lg` | 死代码 |
| Trend Demo | `.trend-demo` | 死代码 |
| Three-Col Grid | `.three-col` | 死代码 |
| Application Card | `.app-card` | 死代码 |
| Principle Card | `.principle-card` | 死代码 |
| Blockquote | `blockquote` | 死代码 |
| Code Block | `.code-block` | 死代码 |
| Alert Message | `.alert-msg` | 死代码 |
| Callout (expandable) | `.callout-expand`, `.callout-toggle` | 死代码 |
| Flip Card (CSS 版) | `.flip-card`, `.flip-inner` | 死代码（Section 19 用内联样式替代了） |
| Sparkline Card | `.sparkline-card` | 死代码 |
| Segmented LED Bar | `.seg-led` | 死代码 |

**20 个组件定义了 CSS 但从未在 HTML 中使用。** 这些要么补 HTML 展示，要么删 CSS。

---

## 六、准入标准

H 系列新文件必须满足：

### 1. 有实战场景
- 每个组件的使用必须能回答"这个组件在这个文件里解决了什么问题"
- 不接受"先收集进来以后可能用"的理由

### 2. 组件丰富度
- 最少 5 个不同类型组件（不含 grid/footer/hero 基础设施）
- 每个组件必须有实际内容填充，不是空壳

### 3. 容器标准化
- MaxWidth：1024px 或 1120px（推荐 1120px）
- Section Padding：80px 120px（大）或 48px 40px（小）
- 深色区块使用 `var(--pk)` + `color:#fff`

### 4. 数据真实
- 使用真实或仿真度高的业务数据
- 禁止 Math.random() 生成的纯假数据（热力图除外）

### 5. 结构完整
- 必须有 Hero/Title + Content + Footer
- 每个 section 有明确的层级标签

### 6. 独特性
- 必须有至少 1 个其他 H 文件没有的组件组合或布局模式
- 或者用现有组件组合出新的叙事结构

---

## 待处理

| 问题 | 涉及 | 优先级 |
|------|------|--------|
| H025 有 20 个 CSS 死代码组件 | H025 | 高 — 要么补 HTML，要么删 CSS |
| 16 个文件用 `--primary-darkgray` 非标准命名 | 见前次扫描 | 中 |
| H014 已删除（H015 副本） | — | 已完成 |
| workspace 两个 haglofs 文件未进 H | haglofs-component-library, haglofs-industrial-showcase | 低 — 能力已记录在吸收日志中 |
| 3 个文件不足 200 行 | H004(83), H005(100), H008(101) | 低 |
