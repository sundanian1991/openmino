# 组件评估评分

> 6 维度评分，用于组件选择时的过滤条件。每题 1-5 分。

---

## 评分维度定义

| 维度 | 高分(5) | 低分(1) | 选型场景 |
|------|---------|---------|---------|
| **冲击力** I | 全屏/大字号/强对比 | 行内/迷你/轻量 | 需要开门见山时优先 |
| **数据密度** D | 多行多列复杂图表 | 单数值/简单文字 | 需要展示大量数据时优先 |
| **灵活性** F | CSS变量/主题无关 | 固定色值/固定背景 | 需要反复换色换场景时优先 |
| **品牌度** B | 独特图表风格/高识别 | 通用布局/低辨识 | 需要品牌感知时优先 |
| **组装成本** C | 少嵌套/少class/易拼 | 多层嵌套/多依赖 | 快速出稿时优先 |
| **抗噪性** N | 留白充分/层级分明 | 密集/无分隔 | 页面已密集时优先 |

评分格式: `I/D/F/B/C/N`

---

## H — Hero（assets/css/haglofs-ext-heroes.css）

| 组件 | 代码 | I | D | F | B | C | N | 一句话 |
|------|------|---|---|---|---|---|---|--------|
| H1 Hero Split | `.hero-split` | 5 | 2 | 4 | 4 | 4 | 5 | 双栏品牌宣言，阅读+分析通用 |
| H2 Hero Pulse | `.hero-pulse` | 5 | 4 | 3 | 3 | 3 | 4 | 深色数据仪表板，动画扫描线 |
| H3 Hero Runway | `.hero-runway` | 5 | 1 | 4 | 4 | 4 | 5 | 双栏时尚声明，ghost数字 |
| H4 Hero Sky | `.hero-sky` | 4 | 2 | 4 | 4 | 4 | 5 | 双栏航空蓝，航线标签 |
| H5 Hero Bottle | `.hero-bottle` | 5 | 1 | 4 | 5 | 3 | 4 | 三栏产品展示，瓶型线框 |
| H6 Hero Scoreboard | `.hero-scoreboard` | 5 | 3 | 3 | 5 | 4 | 4 | 比分牌，体育竞赛 |
| H7 Hero Entrance | `.hero-entrance` | 3 | 2 | 5 | 3 | 5 | 5 | 浅色留白，博物馆入口 |
| H8 Hero Infra | `.hero-infra` | 5 | 2 | 4 | 4 | 3 | 4 | 深色全屏+网格线，工业感 |
| H9 Hero Reveal | `.hero-reveal` | 5 | 1 | 4 | 4 | 4 | 5 | 汽车发布，水平速度线 |

---

## D — Data Display（assets/css/haglofs-ext-data.css）

| 组件 | 代码 | I | D | F | B | C | N | 一句话 |
|------|------|---|---|---|---|---|---|--------|
| D1 Data Matrix | `.data-matrix` | 4 | 4 | 3 | 3 | 4 | 4 | 4列品牌指标，深色 |
| D2 Insight Cards | `.insight-cards` | 3 | 3 | 4 | 2 | 5 | 4 | 3列分析卡+进度条 |
| D3 Compass Trend | `.compass-grid` | 3 | 3 | 4 | 3 | 4 | 4 | 2列方向+柱状轨迹 |
| D4 Elevation | `.elevation-charts` | 4 | 3 | 4 | 4 | 3 | 4 | SVG曲线趋势，深色 |
| D5 Seam Bench | `.seam-list` | 3 | 4 | 4 | 5 | 4 | 4 | 线迹基线+目标对比 |
| D6 Layer Stack | `.layer-stack` | 3 | 4 | 4 | 3 | 4 | 4 | 地质层状，hover反色 |
| D7 Swatch Card | `.swatch-grid` | 3 | 3 | 4 | 3 | 5 | 4 | 色块卡片+点阵 |
| D8 Grid Matrix | `.grid-matrix` | 4 | 5 | 3 | 3 | 4 | 3 | 6列频度矩阵，深色 |
| D9 Callout | `.callout` | 2 | 1 | 5 | 2 | 5 | 5 | 单张发现卡+左侧绿线 |
| D10 Action List | `.action-list` | 1 | 2 | 5 | 1 | 5 | 5 | 圆点行动建议列表 |
| D11 Record Board | `.record-list` | 3 | 4 | 3 | 4 | 4 | 4 | 体育记录行，首行高亮 |
| D12 League Table | `.lg-table` | 3 | 5 | 3 | 4 | 4 | 3 | 6列积分榜 |

---

## N+T+C+F — 导航/表格/卡片/Footer（assets/css/haglofs-ext-data.css）

| 组件 | 代码 | I | D | F | B | C | N | 一句话 |
|------|------|---|---|---|---|---|---|--------|
| N1 Chapter Index | `.chapter-index` | 3 | 3 | 4 | 3 | 5 | 4 | 深色章节网格 |
| N2 Heritage Strip | `.heritage-strip` | 3 | 3 | 4 | 3 | 4 | 4 | 水平时间线 |
| N3 Progress Trail | `.progress-trail` | 1 | 1 | 5 | 1 | 5 | 5 | 圆点进度轨迹 |
| N4 Exhibition Trail | `.trail-path` | 3 | 2 | 4 | 3 | 4 | 4 | 参观路线连接点 |
| T1 Departure Board | `.departure-board` | 3 | 5 | 3 | 4 | 4 | 3 | 5列航班时刻表 |
| T2 Protocol Table | `.protocol-table` | 3 | 5 | 4 | 3 | 4 | 3 | 4列技术规格深色 |
| T3 Spec Table | `.spec-table` | 3 | 4 | 4 | 2 | 5 | 4 | 2列规格表深色 |
| C1 Term Cards | `.term-grid` | 2 | 2 | 5 | 2 | 5 | 5 | 2列术语定义卡 |
| C2 Summary Capsule | `.summary-capsule` | 3 | 3 | 4 | 2 | 5 | 4 | 大数字摘要+条目 |
| C3 Quote Array | `.quote-array` | 2 | 2 | 4 | 2 | 5 | 4 | 3列引用片段 |
| C4 Vitrine | `.vitrine-grid` | 3 | 2 | 4 | 3 | 4 | 5 | 3列展品陈列 |
| C5 Sport Grid | `.sport-grid` | 3 | 3 | 4 | 3 | 5 | 4 | 4列hover反转 |
| C6 Material Row | `.mat-row` | 2 | 3 | 4 | 3 | 5 | 4 | 3列材质色块 |
| C7 Gear Grid | `.gear-grid` | 3 | 4 | 4 | 3 | 4 | 4 | 3列装备规格深色 |
| F1 Statement | `.footer-statement` | 3 | 1 | 4 | 3 | 5 | 5 | 深色声明+元数据 |

---

## V — Data Viz Forms（assets/css/haglofs-ext-data.css）

| 组件 | 代码 | I | D | F | B | C | N | 一句话 |
|------|------|---|---|---|---|---|---|--------|
| V1 Terrain Curve | `.v-terrain` | 4 | 3 | 4 | 3 | 3 | 4 | SVG地形曲线趋势 |
| V2 Dot Fill | `.v-dots` | 3 | 3 | 4 | 4 | 4 | 4 | 点阵填充+闭环率 |
| V3 Segmented Bar | `.v-bar` | 2 | 4 | 4 | 3 | 4 | 4 | 段状条占比 |
| V4 Metric Tower | `.v-tower` | 4 | 4 | 4 | 3 | 3 | 4 | 深色大数字塔 |
| V5 Ring Progress | `.v-ring` | 3 | 2 | 4 | 3 | 4 | 4 | SVG环形进度 |
| V6 Network Node | `.v-network` | 4 | 3 | 4 | 4 | 3 | 3 | SVG连接网络 |
| V7 Comparison | `.v-compare` | 2 | 3 | 4 | 2 | 4 | 4 | 双列对比节点 |
| V8 Mini Dist | `.v-mini` | 1 | 3 | 4 | 1 | 5 | 5 | 迷你分布柱 |

---

## EC — Economist Charts（assets/css/haglofs-ext-charts.css）

| 组件 | 代码 | I | D | F | B | C | N | 一句话 |
|------|------|---|---|---|---|---|---|--------|
| EC1 Red Bar | `.ec-bar` | 3 | 4 | 4 | 5 | 5 | 4 | 红条柱状图，右端圆角 |
| EC2 Line | `.ec-line` | 3 | 3 | 4 | 5 | 4 | 4 | 红色折线+半透明尾 |
| EC3 Focus Card | `.ec-focus` | 3 | 2 | 4 | 4 | 5 | 5 | 聚焦卡+左侧3px红线 |
| EC4 Data Table | `.ec-table` | 2 | 5 | 4 | 4 | 4 | 3 | 数据表，▲▼方向 |
| EC5 Area | `.ec-area` | 4 | 3 | 4 | 5 | 3 | 4 | 红色面积填充 |
| EC6 Annotation | `.ec-annot` | 2 | 2 | 5 | 4 | 5 | 5 | 3px引用+说明框 |
| EC7 Cover | `.ec-cover` | 5 | 2 | 4 | 5 | 4 | 5 | 封面声明+3px红条 |
| EC8 Footnote | `.ec-footnote` | 1 | 1 | 5 | 3 | 5 | 5 | 数据来源脚注 |

## FT — Financial Times（assets/css/haglofs-ext-charts.css）

| 组件 | 代码 | I | D | F | B | C | N | 一句话 |
|------|------|---|---|---|---|---|---|--------|
| FT1 Dashboard | `.ft-dash` | 3 | 4 | 4 | 4 | 5 | 4 | 4列市场仪表板 |
| FT2 Pink Line | `.ft-line` | 3 | 3 | 4 | 5 | 4 | 4 | 粉色折线+虚线基准 |
| FT3 Sector | `.ft-sector` | 2 | 4 | 4 | 4 | 5 | 4 | 2列行业分析 |
| FT4 Data Story | `.ft-story` | 2 | 2 | 5 | 4 | 5 | 5 | 双栏数据叙事 |
| FT5 Global | `.ft-global` | 3 | 3 | 4 | 4 | 4 | 4 | 4列深色全球市场 |
| FT6 Table | `.ft-table` | 2 | 5 | 4 | 4 | 4 | 3 | 5列数据表 |

## BL — Bloomberg（assets/css/haglofs-ext-apps.css）

| 组件 | 代码 | I | D | F | B | C | N | 一句话 |
|------|------|---|---|---|---|---|---|--------|
| BL1 Terminal | `.bl-term` | 4 | 4 | 4 | 5 | 4 | 3 | 4列终端仪表板 |
| BL2 Panel | `.bl-panel` | 3 | 4 | 4 | 5 | 4 | 3 | 双列数据面板 |
| BL3 Movers | `.bl-movers` | 2 | 4 | 4 | 5 | 5 | 3 | 股票涨跌排行 |
| BL4 Chart | `.bl-chart` | 3 | 4 | 4 | 5 | 4 | 3 | 3列迷你图面板 |
| BL5 Footer | `.bl-foot` | 1 | 1 | 5 | 4 | 5 | 5 | 终端底部信息条 |

## AP — Apple Activity（assets/css/haglofs-ext-apps.css）

| 组件 | 代码 | I | D | F | B | C | N | 一句话 |
|------|------|---|---|---|---|---|---|--------|
| AP1 Rings | `.ap-rings` | 5 | 2 | 4 | 5 | 4 | 5 | 三环极简+SVG闭环 |
| AP2 Stats | `.ap-stats` | 3 | 3 | 4 | 4 | 4 | 4 | 3列数据格 |
| AP3 Weekly | `.ap-week` | 2 | 3 | 4 | 4 | 4 | 4 | 周趋势柱 |
| AP4 Achievement | `.ap-achieve` | 2 | 1 | 5 | 4 | 5 | 5 | 成就卡+小环 |
| AP5 Goal | `.ap-goal` | 1 | 1 | 5 | 4 | 5 | 5 | 目标进度条 |

## SP — Spotify Wrapped（assets/css/haglofs-ext-apps.css）

| 组件 | 代码 | I | D | F | B | C | N | 一句话 |
|------|------|---|---|---|---|---|---|--------|
| SP1 Hero | `.sp-hero` | 5 | 1 | 4 | 5 | 4 | 5 | 渐变大字封面 |
| SP2 Artists | `.sp-artists` | 3 | 3 | 4 | 5 | 5 | 4 | 排行列表+hover |
| SP3 Genres | `.sp-genres` | 3 | 3 | 4 | 5 | 4 | 4 | 2列色块流派 |
| SP4 Big Number | `.sp-big` | 4 | 2 | 4 | 5 | 5 | 5 | 大数字时刻 |
| SP5 Tracks | `.sp-tracks` | 2 | 3 | 4 | 4 | 5 | 4 | 歌曲列表 |
| SP6 DNA | `.sp-dna` | 3 | 1 | 4 | 5 | 4 | 5 | 个性卡+渐变色 |

## ST — Strava（assets/css/haglofs-ext-apps.css）

| 组件 | 代码 | I | D | F | B | C | N | 一句话 |
|------|------|---|---|---|---|---|---|--------|
| ST1 Hero | `.st-hero` | 5 | 1 | 4 | 5 | 3 | 4 | 红色轨迹+网格 |
| ST2 Heatmap | `.st-heatmap` | 3 | 4 | 4 | 5 | 3 | 3 | 52列热力网格 |
| ST3 Stats | `.st-stats` | 3 | 3 | 4 | 4 | 4 | 4 | 3列指标 |
| ST4 Leaderboard | `.st-leader` | 2 | 4 | 4 | 4 | 5 | 4 | 排名列表 |
| ST5 Weekly | `.st-week` | 2 | 3 | 4 | 4 | 4 | 4 | 周训练柱 |
| ST6 Badge | `.st-badge` | 3 | 1 | 4 | 4 | 5 | 5 | 目标徽章 |

---

## 选型过滤器

拿到内容需求后：

```
1. 要什么视觉形式？      → 选文件 (heroes / data / charts / apps)
2. 要什么效果？         → 过滤评分
   要开门见山           → I >= 4
   要展示多数据         → D >= 4
   要快速出稿           → C >= 4
   要品牌识别           → B >= 4
   页面已经密集了        → N >= 4
3. 看上一个 section     → 避免同族组件相邻
4. 选 → 拼装
```

示例：
- "品牌首页开门见山" → heroes 中 I>=4, C>=4 → H1/H3/H9
- "数据仪表板" → data 中 D>=4, I>=3 → D1/D8/V4/V6
- "品牌编辑感" → charts 中 B>=4, C>=4 → EC1/EC7/FT2/FT4
- "个人运动感" → apps 中 B>=4, I>=3 → AP1/SP1/ST1

---

*2026-06-01 · 共 67 个组件评分*

---

## XG — Gauge Library（吸收自 Variant Atlas）

| 组件 | 代码 | I | D | F | B | C | N | 一句话 |
|------|------|---|---|---|---|---|---|--------|
| XG1 180° Arc | `.xg` + SVG | 4 | 2 | 4 | 3 | 3 | 4 | 半弧仪表，SVG路径 |
| XG2 Thermometer | `.xg-thermo` | 3 | 2 | 4 | 3 | 4 | 4 | 垂直温度计+球泡 |
| XG3 Bullseye | `.xg-bullseye` | 4 | 2 | 4 | 4 | 3 | 4 | 同心圆靶心 |

## XS — Sparklines（吸收自 Variant Atlas）

| 组件 | 代码 | I | D | F | B | C | N | 一句话 |
|------|------|---|---|---|---|---|---|--------|
| XS1 Line | `.xs__svg path` | 2 | 3 | 5 | 2 | 5 | 5 | 行内折线 |
| XS2 Area | `.xs__svg .area` | 2 | 3 | 5 | 2 | 5 | 5 | 填充区域 |
| XS3 Bar | `.xs__svg .bar` | 2 | 3 | 5 | 2 | 5 | 5 | 迷你柱 |
| XS4 Win-Loss | `.xs__svg path` colors | 2 | 3 | 5 | 3 | 4 | 5 | 红绿输赢 |

## XB — Block Bar Variants（吸收自 Variant Atlas）

| 组件 | 代码 | I | D | F | B | C | N | 一句话 |
|------|------|---|---|---|---|---|---|--------|
| XB1 Waffle | `.xb-waffle` | 3 | 4 | 4 | 3 | 4 | 3 | 10x10格点 |
| XB2 Bullet | `.xb-bullet` | 3 | 3 | 4 | 3 | 4 | 4 | 基线+目标标记 |
| XB3 Zero-Center | `.xb-center` | 3 | 3 | 4 | 3 | 4 | 4 | 零点对称条 |
| XB4 Donut Blocks | `.xb-donut` | 3 | 3 | 4 | 3 | 4 | 4 | 圆环分段 |
| XB5 Comparison | `.xb-pair` | 2 | 3 | 4 | 2 | 5 | 4 | 双值对比条 |

## XD — Dot Matrix Variants（吸收自 Variant Atlas）

| 组件 | 代码 | I | D | F | B | C | N | 一句话 |
|------|------|---|---|---|---|---|---|--------|
| XD1 Standard | `.xd-grid` | 3 | 2 | 5 | 4 | 4 | 4 | 5x7点阵 |
| XD2 Mega | `.xd--mega` | 4 | 1 | 5 | 4 | 4 | 4 | 大号点阵hero |
| XD3 Tight | `.xd--tight` | 2 | 3 | 5 | 4 | 4 | 4 | 高密度紧凑 |

## XL — Asymmetric Layouts（吸收自 Variant Atlas）

| 组件 | 代码 | I | D | F | B | C | N | 一句话 |
|------|------|---|---|---|---|---|---|--------|
| XL1 2/3 Split | `.xl-split` | 3 | 1 | 5 | 2 | 5 | 4 | 左2/3+右1/3 |
| XL2 Offset | `.xl-offset` | 3 | 1 | 5 | 3 | 5 | 4 | 错位网格 |
| XL3 Diagonal | `.xl-diag` | 4 | 1 | 4 | 3 | 4 | 4 | clip-path对角切 |
| XL4 Floating | `.xl-float` | 3 | 1 | 4 | 2 | 4 | 4 | 浮动卡片叠加 |
| XL5 Tiered | `.xl-tier` | 3 | 1 | 5 | 2 | 5 | 4 | 层叠列 |

## XN — Network Topologies（吸收自 Variant Atlas）

| 组件 | 代码 | I | D | F | B | C | N | 一句话 |
|------|------|---|---|---|---|---|---|--------|
| XN1 Radial | `.xn-radial` | 4 | 3 | 4 | 4 | 3 | 3 | 径向树SVG |
| XN2 Sankey | `.xn-sankey` | 3 | 4 | 4 | 4 | 3 | 3 | 流向图 |
| XN3 Arc | `.xn-arc` | 3 | 3 | 4 | 3 | 4 | 3 | 弧线连接图 |

---

## 组件分类（按使用层级）

| 类别 | 角色 | 包含组件 |
|------|------|---------|
| **Hero 类** | 整页1处，最重，视觉锚点 | H1-H9 |
| **Section 类** | 每区1处，组织结构 | N1 Chapter Index, XL Asymmetric |
| **Detail 类** | 每区可多处，数据展示 | D1-D12, T1-T3, C1-C7, EC/FT/BL/NY/F1/MC, XB/XG/XS(⚠️) |
| **Decorative 类** | 点缀，不承载信息 | V2 Dot Fill, XD Dot Matrix |

## 质量分级

| 标记 | 含义 | 操作 |
|------|------|------|
| ✅ **可用** | 质量过关，可直接使用 | 写报告时优先选 |
| ⚠️ **待优化** | 有可用性缺陷，计划改造 | 暂不使用，改造后升 ✅ |
| 🚫 **已删除** | 已从CSS库移除 | 不存在了 |

### ✅ 可用

H1, H2, H3, H6, H7, H8, H9  
D1, D2, D5, D6, D8, D11, D12  
N1, N3  
T1, T3  
C1, C2, C3, C5, C7  
F1  
V2, V3, V4, V5, V8  
EC1-EC8, FT1-FT6, BL1-BL5, AP1-AP5, SP1-SP6, ST1-ST6  
NY1-NY6, F1-1-F1-6, MC1-MC6  
XB1 Waffle, XB2 Bullet, XB3 Zero-Center, XB5 Comparison  
XD Dot Matrix  
XL Asymmetric  

### ⚠️ 待优化

| 组件 | 问题 | 改造方案 |
|------|------|---------|
| D9 Callout | 单张卡太轻 | 加 `__stat` 大数字变体 |
| D10 Action List | 纯文字列表 | 加 `__icon` 和 `__value` |
| C6 Material Row | 已部分优化 | 验证后可升 ✅ |
| V7 Comparison | 间距不足 | 加分隔线和 gap |
| XG1 Arc | 需JS渲染 | 有 helper，提供示例 |
| XG2 Thermometer | 需JS渲染 | 有 helper，提供示例 |
| XS1 Sparkline | 需JS渲染 | 有 helper，提供示例 |
| XS2 Sparkline Area | 需JS渲染 | 有 helper，提供示例 |
| XB4 Donut | SVG计算复杂 | 提供示例代码 |

### 🚫 已删除（场景太窄/有替代/难组装）

H4 Hero Sky, H5 Hero Bottle  
D3 Compass Trend, D4 Elevation Profile, D7 Swatch Cards  
N2 Heritage Strip, N4 Exhibition Trail  
T2 Protocol Table  
C4 Vitrine  
V1 Terrain Curve, V6 Network Node  
XG3 Bullseye, XN Network  

---

**使用规则：** 写报告时只从 ✅ 里选。🚫 不存在。⚠️ 等改造完再用。
