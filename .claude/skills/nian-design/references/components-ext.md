# 扩展组件库参考

> 基于 haglofs-components-ext.css 的组件清单。按视觉效果分类调用。

---

## H — Hero（整页仅一处）

| 组件 | 类名前缀 | 场景 | 视觉效果 |
|------|---------|------|---------|
| H1 | `.hero-split` | 品牌宣言/阅读+分析 | 双栏：左文字右深色面板，ghost 水印 |
| H2 | `.hero-pulse` | 数据分析中心 | 全屏深色 + 动画扫描线 + 三栏指标条 |
| H3 | `.hero-runway` | 时尚/产品 | 双栏：左声明右深色面板 + ghost 年份 |
| H4 | `.hero-sky` | 航空/旅行 | 双栏：左文字右深蓝面板+航线标签 |
| H5 | `.hero-bottle` | 烈酒/包装产品 | **三栏**：左文字+中瓶型线框+右年份 |
| H6 | `.hero-scoreboard` | 体育/竞赛 | 深色全屏 + 比分牌三栏布局 |
| H7 | `.hero-entrance` | 博物馆/展览 | 浅色留白 + 底部文字 + 圆形封印 |
| H8 | `.hero-infra` | 电信/基础设施 | 深色全屏 + 60px 网格线背景 |
| H9 | `.hero-reveal` | 汽车/产品发布 | 深色全屏 + 水平速度线 + 右下徽章 |

## D — Data Display（数据展示）

| 组件 | 类名前缀 | 说明 |
|------|---------|------|
| D1 | `.data-matrix` | 4 列品牌指标，深色背景 |
| D2 | `.insight-cards` | 3 列分析卡片，每张带进度条 |
| D3 | `.compass-grid` | 2 列方向指标，带柱状轨迹 |
| D4 | `.elevation-charts` | 3 列 SVG 曲线趋势图，深色 |
| D5 | `.seam-list` | 水平线迹基线 + 目标对比行 |
| D6 | `.layer-stack` | 地质层状结构，hover 反色 |
| D7 | `.swatch-grid` | 4 列色块卡片 + 底部分数点 |
| D8 | `.grid-matrix` | 6 列频度矩阵，深色 |
| D9 | `.callout` | 单张关键发现卡，左侧绿线 |
| D10 | `.action-list` | 行动建议列表，圆点标记 |
| D11 | `.record-list` | 体育记录行，首行高亮 |
| D12 | `.lg-table` | 足球积分榜，6 列 |

## N — Navigation & Progress（导航/进度）

| 组件 | 类名前缀 | 说明 |
|------|---------|------|
| N1 | `.chapter-index` | 深色 3/2/1 列章节索引 |
| N2 | `.heritage-strip` | 水平时间线，圆点+年份+事件 |
| N3 | `.progress-trail` | 圆形点进度轨迹 |
| N4 | `.trail-path` | 参观路线，连接点+标签 |

## T — Table & List（表格/列表）

| 组件 | 类名前缀 | 说明 |
|------|---------|------|
| T1 | `.departure-board` | 航班时刻表，5 列 |
| T2 | `.protocol-table` | 技术规格表，4 列深色 |
| T3 | `.spec-table` | 双栏规格表，深色 |

## C — Card & Content（卡片/内容）

| 组件 | 类名前缀 | 说明 |
|------|---------|------|
| C1 | `.term-grid` | 2 列术语定义卡 |
| C2 | `.summary-capsule` | 大数字摘要 + 条目列表 |
| C3 | `.quote-array` | 3 列引用片段 |
| C4 | `.vitrine-grid` | 3 列展品陈列柜 |
| C5 | `.sport-grid` | 4 列 hover 反转，体育分类 |
| C6 | `.mat-row` | 3 列材质色块卡 |
| C7 | `.gear-grid` | 3 列装备规格，深色背景 |

## F — Footer（页脚）

| 组件 | 类名前缀 | 说明 |
|------|---------|------|
| F1 | `.footer-statement` | 深色 Georgia 声明 + 元数据 |

## 使用方式

1. 在页面中引入 `haglofs-tokens.css` + `haglofs-components-ext.css`
2. 选中组件类名前缀，拼装 HTML
3. 用 `.sec--dark` / `.sec--light` / `.sec--raised` / `.sec--accent` 设定 section 背景
4. 用 `.section-title` 统一标题风格

```html
<link href="assets/css/haglofs-tokens.css" rel="stylesheet">
<link href="assets/css/haglofs-components-ext.css" rel="stylesheet">

<section class="sec sec--dark">
  <div class="sec--w">
    <div class="data-matrix__grid">
      <div class="dm dm--hl">
        <div class="dm__lbl">Label</div>
        <div class="dm__num">42</div>
        <div class="dm__ctx">Context</div>
      </div>
    </div>
  </div>
</section>
```

## 视觉选择指南

| 需要效果 | 选 H | 选 D | 选 N/C |
|---------|------|------|--------|
| 品牌宣言感 | H1/H3 | — | — |
| 数据监控感 | H2 | D1/D3/D8 | — |
| 产品展示感 | H5 | D7/C6 | — |
| 体育竞赛感 | H6 | D11/D12 | — |
| 博物馆感 | H7 | — | N2/N4/C4 |
| 工业技术感 | H8 | D4/D6/T2 | — |
| 汽车发布感 | H9 | D5/C7 | N1 |
| 阅读感 | H7 | D9/C1/C2/C3 | N3 |
| 航行感 | H4 | — | T1 |
---
*基于 haglofs-components-ext.css · 2026-06-01*

## V — Data Viz Forms（可视化组件，4 级结构）

| 组件 | 类名前缀 | Hero级 | Section级 | Detail级 | Decorative级 |
|------|---------|--------|----------|---------|-------------|
| V1 | `.v-terrain` | 地形曲线 | ✅ | ✅ | ✅ | — |
| V2 | `.v-dots` | 点阵填充 | — | ✅ | — | ✅ |
| V3 | `.v-bar` | 段状条 | — | ✅ | — | ✅ |
| V4 | `.v-tower` | 指标塔 | ✅ | ✅ | — | — |
| V5 | `.v-ring` | 环状进度 | — | ✅ | ✅ | — |
| V6 | `.v-network` | 网络节点 | ✅ | ✅ | — | — |
| V7 | `.v-compare` | 对比节点 | — | ✅ | ✅ | — |
| V8 | `.v-mini` | 迷你分布 | — | ✅ | — | ✅ |

## EC — Economist Chart System（数据 viz 即品牌识别）

| 组件 | 类名前缀 | 说明 |
|------|---------|------|
| EC1 | `.ec-bar` | 红条柱状图，右端圆角 |
| EC2 | `.ec-line` | 红色折线图 + 半透明粗尾 |
| EC3 | `.ec-focus` | 聚焦卡片 + 左侧 3px 红竖线 |
| EC4 | `.ec-table` | 数据表，首行加重，▲▼方向 |
| EC5 | `.ec-area` | 红色面积填充图 |
| EC6 | `.ec-annot` | 数据注解（3px 引用 + 说明框） |
| EC7 | `.ec-cover` | 封面声明 + 底部 3px 红条 |
| EC8 | `.ec-footnote` | 数据来源脚注 |

## FT — Financial Times（粉色图表系统，haglofs-ext-charts.css）

| 组件 | 类名前缀 | 说明 |
|------|---------|------|
| FT1 | `.ft-dash` | 4 列市场仪表板 |
| FT2 | `.ft-line` | 粉色折线图 + 虚线基准 |
| FT3 | `.ft-sector` | 2 列行业分析 |
| FT4 | `.ft-story` | 双栏数据叙事 |
| FT5 | `.ft-global` | 4 列深色全球市场 |
| FT6 | `.ft-table` | 5 列数据表 |

## BL — Bloomberg（终端绿色，haglofs-ext-apps.css）

| 组件 | 类名前缀 | 说明 |
|------|---------|------|
| BL1 | `.bl-term` | 4 列终端仪表板 |
| BL2 | `.bl-panel` | 双列数据面板 |
| BL3 | `.bl-movers` | 股票涨跌排行 |
| BL4 | `.bl-chart` | 3 列迷你图面板 |
| BL5 | `.bl-foot` | 终端底部信息条 |

## AP — Apple Activity（三环极简，haglofs-ext-apps.css）

| 组件 | 类名前缀 | 说明 |
|------|---------|------|
| AP1 | `.ap-rings` | 三环 + SVG 闭环 |
| AP2 | `.ap-stats` | 3 列数据格 |
| AP3 | `.ap-week` | 周趋势柱 |
| AP4 | `.ap-achieve` | 成就卡 + 小环 |
| AP5 | `.ap-goal` | 目标进度条 |

## SP — Spotify Wrapped（年度数据事件，haglofs-ext-apps.css）

| 组件 | 类名前缀 | 说明 |
|------|---------|------|
| SP1 | `.sp-hero` | 渐变大字封面 |
| SP2 | `.sp-artists` | 排行列表 hover |
| SP3 | `.sp-genres` | 2 列色块流派 |
| SP4 | `.sp-big` | 大数字时刻 |
| SP5 | `.sp-tracks` | 歌曲列表 |
| SP6 | `.sp-dna` | 个性卡渐变色 |

## ST — Strava（红色轨迹，haglofs-ext-apps.css）

| 组件 | 类名前缀 | 说明 |
|------|---------|------|
| ST1 | `.st-hero` | 红色轨迹 + 网格 |
| ST2 | `.st-heatmap` | 52 列热力网格 |
| ST3 | `.st-stats` | 3 列指标 |
| ST4 | `.st-leader` | 排名列表 |
| ST5 | `.st-week` | 周训练柱 |
| ST6 | `.st-badge` | 目标徽章 |

## NY — NYT（数据叙事，haglofs-ext-charts.css）

| 组件 | 类名前缀 | 说明 |
|------|---------|------|
| NY1 | `.ny-needle` | 选举仪表 + SVG 指针 |
| NY2 | `.ny-scrolly` | 数据叙事块 |
| NY3 | `.ny-annot` | 数据注解 3px 引用 |
| NY4 | `.ny-compare` | 双列对比 |
| NY5 | `.ny-geo` | 4 列区域网格 |
| NY6 | `.ny-timeline` | 时间线 |

## F1 — 遥测赛道（haglofs-ext-charts.css）

| 组件 | 类名前缀 | 说明 |
|------|---------|------|
| F1-1 | `.f1-track` | 赛道图 + 遥测数据 |
| F1-2 | `.f1-telemetry` | 遥测带条 |
| F1-3 | `.f1-lap` | 单圈对比 |
| F1-4 | `.f1-pit` | 进站数据 |
| F1-5 | `.f1-standings` | 积分榜 |
| F1-6 | `.f1-specs` | 技术规格 |

## MC — McKinsey（咨询图表，haglofs-ext-charts.css）

| 组件 | 类名前缀 | 说明 |
|------|---------|------|
| MC1 | `.mc-ex` | 高管概览 |
| MC2 | `.mc-waterfall` | 瀑布图 |
| MC3 | `.mc-matrix` | 2x2 战略矩阵 |
| MC4 | `.mc-bench` | 行业对标 |
| MC5 | `.mc-bubble` | 气泡图 |
| MC6 | `.mc-kpi` | KPI 网格 |

## XG — Gauge（仪表库，haglofs-ext-data.css）

| 组件 | 类名前缀 | 说明 |
|------|---------|------|
| XG1 | `.xg__svg` | 180° Arc SVG |
| XG2 | `.xg-thermo` | 垂直温度计 |
| XG3 | `.xg-bullseye` | 同心圆靶心 |

## XS — Sparklines（迷你图，haglofs-ext-data.css）

| 组件 | 类名前缀 | 说明 |
|------|---------|------|
| XS1 | `.xs__svg path` | 折线 |
| XS2 | `.xs__svg .area` | 面积 |
| XS3 | `.xs__svg .bar` | 柱 |
| XS4 | `.xs__svg` colors | Win-Loss |

## XB — Block Bar Variants（条图变种，haglofs-ext-data.css）

| 组件 | 类名前缀 | 说明 |
|------|---------|------|
| XB1 | `.xb-waffle` | 10x10 格点 |
| XB2 | `.xb-bullet` | 基线 + 目标 |
| XB3 | `.xb-center` | 零点对称 |
| XB4 | `.xb-donut` | 圆环分段 |
| XB5 | `.xb-pair` | 双值对比 |

## XD — Dot Matrix（点阵变种，haglofs-ext-data.css）

| 组件 | 类名前缀 | 说明 |
|------|---------|------|
| XD1 | `.xd-grid` | 5x7 标准 |
| XD2 | `.xd--mega` | 大号 hero |
| XD3 | `.xd--tight` | 高密紧凑 |

## XL — Asymmetric（非对称布局，haglofs-ext-data.css）

| 组件 | 类名前缀 | 说明 |
|------|---------|------|
| XL1 | `.xl-split` | 2/3+1/3 分栏 |
| XL2 | `.xl-offset` | 错位网格 |
| XL3 | `.xl-diag` | clip-path 对角 |
| XL4 | `.xl-float` | 浮动卡片 |
| XL5 | `.xl-tier` | 层叠列 |

## XN — Network（网络拓扑，haglofs-ext-charts.css）

| 组件 | 类名前缀 | 说明 |
|------|---------|------|
| XN1 | `.xn-radial` | 径向树 SVG |
| XN2 | `.xn-sankey` | 流向图 |
| XN3 | `.xn-arc` | 弧线连接图 |

## 视觉选择指南（完整版）

| 需要效果 | heroes | data | charts | apps |
|---------|--------|------|--------|------|
| 品牌宣言开门见山 | H1/H3 | — | EC7 | — |
| 数据监控仪表板 | H2 | D1/D3/D8/V4/V6 | — | — |
| 编辑数据/红条感 | H7 | — | EC1/EC2/EC4/EC5 | — |
| 粉色金融数据 | — | — | FT1/FT2/FT6 | — |
| 终端绿色高密度 | — | — | — | BL1/BL3/BL4 |
| 三环极简 | — | — | — | AP1/AP2 |
| 个人年度数据 | — | — | — | SP1/SP4/SP6 |
| 红色运动轨迹 | — | — | — | ST1/ST2 |
| 选举/民调追踪 | — | — | NY1/NY3/NY4 | — |
| F1 遥测赛道 | — | — | F1-1/F1-2/F1-5 | — |
| 咨询图表风格 | — | — | MC1/MC3/MC6 | — |
| 仪表/弧线 | — | XG1/XG2 | — | — |
| 迷你图/火花线 | — | XS1/XS2 | — | — |
| 格点/华夫饼 | — | XB1/XB4 | — | — |
| 点阵装饰 | — | XD1/XD2 | — | — |
| 非对称布局 | — | XL1/XL3 | — | — |
| 网络/流向图 | — | — | XN1/XN2 | — |
| 产品展示 | H5 | D7/C6 | — | — |
| 体育竞赛 | H6 | D11/D12 | — | — |
| 阅读感 | H7 | D9/C1/C2/C3 | — | — |
