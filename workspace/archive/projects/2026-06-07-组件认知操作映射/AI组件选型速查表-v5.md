# AI 组件选型速查表 v5（一表全览）

## 一、内容组件全表

| 认知操作 | 层级 | 组件 | 具体作用 | 替代组件 | 替代条件 |
|---------|------|------|---------|---------|---------|
| — | Hero 级 | Marquee | 品牌宣言 Hero，大号宣言文字居中或左对齐，80vh | Split Diptych | 需产品+风景并排 |
| — | Hero 级 | Split Diptych | 产品+景象左右对屏，grid 双栏 | Marquee | 品牌宣言场景 |
| — | Hero 级 | Quote Led | 创始人引言作为 Hero 主体，70vh | Photographic | 图片是主角时 |
| — | Hero 级 | Photographic | 全屏自然风光影像，文字叠加在图片上 | V1-V6 | 无高质量图片时 |
| — | Hero 级 | V1 Diagonal | clip-path 对角切割，右侧深色、左侧浅色 | V2 Split | 需要左右分屏对比 |
| — | Hero 级 | V2 Split | grid 1fr 1fr 左右分屏，左浅右深 | V5 Bevel | 需要斜切方向感 |
| — | Hero 级 | V3 Horizontal | grid 1fr 1fr 上下分屏，上浅下深 | V4 Quadrant | 需要右上角色块 |
| — | Hero 级 | V4 Quadrant | grid + 右上深色方块，编辑感强 | V6 Watermark | 需要安静仪式感 |
| — | Hero 级 | V5 Bevel | clip-path 左斜切，深色右面板，方向性 | V1 Diagonal | 需要对角切割 |
| — | Hero 级 | V6 Watermark | 居中超大透明 ghost 字衬底，安静 | V3 Horizontal | 需要上下分屏 |
| — | Hero 级 | hero-numeral | 以 3-5 个核心大数字为 Hero 主视觉 | V1-V6 | 数据驱动场景 |
| 扫 | Section 级 | stat-block | 大数字+小标签并排，一眼扫完整体数量级，3-5个 | metric-card | 需同时看趋势方向 |
| 扫 | Section 级 | metric-card | 大数字+迷你趋势线，比 stat-block 多一层变化方向 | kpi-card | 涉及达成率 |
| 扫 | Section 级 | kpi-card | 大数字+完成度进度，知道"做了多少" | metric-card | 不需要完成度 |
| 扫 | Section 级 | numeral-grid | 4 列以上数字方阵，≥6 个同质数字的空间排列 | dashboard-grid | 需混合指标+图表+状态 |
| 扫 | Section 级 | dashboard-grid | 多指标仪表盘网格，混合展示指标/图表/状态 | numeral-grid | 纯数字场景 |
| 扫 | Detail 级 | data-spotlight | 单个内联数字聚焦，嵌入文字流 | tag | 非数字场景 |
| 比 | Section 级 | comparison | 双栏非对称对照，左 sticky "VS" 标签，差异一目了然 | tension-grid | 对比有概念性（Heritage vs Future） |
| 比 | Section 级 | tension-grid | 2列 1px gap 对立网格，对比的不是数据是价值观 | do-dont | 二元规则对比（这样做对/错） |
| 比 | Section 级 | do-dont | 二元规则对比，AVOID/PREFER 双列，结论最明确 | tension-grid | 需要哲学性对比 |
| 比 | Section 级 | data-table | 多维度交叉对比表，维度≥3 时精确阅读 | spec-table | 内容是技术参数 |
| 比 | Section 级 | spec-table | 技术参数逐项对比表，JetBrains Mono 精确值 | data-table | 不是技术参数 |
| 排 | Section 级 | rank-bar | 水平条形+序号+进度+delta，长度=大小，排的意图最直接 | rank-panel | 排名需标题/分组上下文 |
| 排 | Section 级 | rank-panel | 带标题的排名列表容器，包装感比 rank-bar 更强 | ranking-table | 需精确数值不是视觉冲击 |
| 排 | Section 级 | ranking-table | 精确数值+排名的表格，精度最高 | rank-bar | 需视觉冲击 |
| 排 | Section 级 | seg-bar | 签名工业分段条，离散方块端头+2px间距，排比例/权重 | weight-bar | 需要更轻量的行内占比 |
| 排 | Section 级 | stacked-bar | 堆叠组成比例，"整体=部分之和"视觉效果 | seg-bar | 不强调整体结构 |
| 排 | Section 级 | numeral-grid | 方阵排名，比条形信息密度更高，空间排列=排序 | card-quad | 不是纯数字，需卡片内容 |
| 排 | Section 级 | gantt chart | 项目时间线，横条长度=时间跨度，依赖/SVG 实现 | timeline-track | 不需要精确时间跨度 |
| 读 | Section 级 | timeline-track | 链式节点+连接线，时间上的先后顺序 | flow-pipeline | 需展示流程状态推进 |
| 读 | Section 级 | flow-pipeline | 横向流程线，三态（done/active/pending），状态推进 | progress-trail | 需同时看阶段+完成度 |
| 读 | Section 级 | progress-trail | 进度路径，阶段+完成百分比 | timeline-track | 不需要完成度 |
| 读 | Section 级 | step-sequence | 编号步骤（I/II/III），SOP "该怎么做" | number-led C26 | 需卡片式步骤 |
| 读 | Section 级 | funnel chart | 漏斗形，转化率/流失分析，逐阶段收缩 | step-sequence | SOP 场景 |
| 量 | Section 级 | gauge-arc | SVG 弧形仪表，中央数字读数，单指标好坏判断 | gauge-segmented | 需看到在哪个等级区间 |
| 量 | Section 级 | bullet-chart | 实际值 vs 目标 vs 范围带，有基准需同视图比较 | gauge-arc | 没有基准值 |
| 量 | Section 级 | sparkline | 迷你趋势线，160x32 SVG 无坐标轴，只看变好变坏 | line chart | 需详细趋势 |
| 量 | Section 级 | block-bar | 段状评分，一段条+一个等级，在什么水平 | progress-row | 需精确百分比数值 |
| 量 | Section 级 | progress-row | 水平进度条+标签+数值，精确达成率 | block-bar | 不是达成率是评分 |
| 解 | Section 级 | callout | 左边框 2px + 大写等宽标题 + 正文，最重要的都被框出 | pull-quote | 引用权威人物/机构的话 |
| 解 | Section 级 | pull-quote | grid 2fr 1fr 引用块，左边引言右边注，编辑感 | blockquote | 内联级引用，非独立展示 |
| 解 | Section 级 | marginalia | grid 3fr 1fr 旁注栏，深度阅读多段注释 | callout | 单段重点标注 |
| 解 | Section 级 | annotated-highlight | pin+标签绝对定位在图片/图表上，逐点解读 | action-list | 不是解读是该做什么 |
| 信 | Section 级 | logo-wall | 4列网格 Logo 墙，一堆 logo 比一段文字更可信 | source-row | 需精确到来源+日期 |
| 信 | Section 级 | single-huge-quote | 独占一屏的大引言，最有冲击力的证明 | logo-wall | 非品牌宣言证明 |
| 展 | Section 级 | accordion | 折叠面板 +/- 图标切换，FAQ / 多层详情 | tab-switcher | 需并排切换多视图 |
| 展 | Section 级 | tab-switcher | 上标签栏+下内容区，同一空间多视图切换 | accordion | 单视图折叠即可 |
| 展 | Section 级 | flip-card | 3D perspective 翻转，hover 触发正反信息展示 | hover-reveal | 需悬停渐进揭示 |
| 展 | Section 级 | detail-panel | fixed 全屏详情面板，展开后完整阅读环境 | accordion | 不需要全屏 |
| — | Decorative 级 | ghost-text | 超低透明度文字，22vw 装饰背景，不传信息 | seal | 需仪式感不是空间感 |
| — | Decorative 级 | seal | 品牌印章，border+旋转角度，仪式感确认感 | ghost-text | 需空间深度不是仪式感 |
| — | Decorative 级 | dot-pattern | css grid 点阵背景，最大 40% 透明度，科技纹理 | dot-matrix | 需前景点阵不是背景纹理 |
| — | Decorative 级 | dot-matrix | 5x7 grid 点阵字符前景，技术与手工感 | dot-pattern | 需背景纹理不是字符 |
| — | Decorative 级 | spinning-ring | 30s 匀速旋转虚线圆环，动效装饰 | — | 适用场景极少 |
| — | Decorative 级 | area-hatching | SVG 对角线条纹填充，增长趋势装饰 | — | 适用场景极少 |

## 二、结构层 + 功能控件（不参与内容选型）

| 类别 | 组件 | 用途 |
|------|------|------|
| 章节分隔 | seam-divider / hanging / bottom-anchored | Section 间视觉分隔 |
| 导航 | floating-pill / newspaper-masthead / edge-aligned | 页面导航 |
| 页脚 | mast-headed / inline-rule / dense-typographic / statement | 品牌签名、版权 |
| 交互控件 | inputs / toggle / buttons / segmented-control | 用户操作 |
| 状态反馈 | state-patterns / alert / status-dot | 系统状态提示 |

## 三、数据可视化渲染路径

以下图表与认知操作组件的区别：**组件是固定的 CSS 结构，图表是数据驱动的 SVG/ECharts**。同一意图下，AI 判断数据量，数据量小走组件、数据量大走图表。

| 认知操作 | 组件路径 | 图表路径（ECharts/SVG） | 何时走图表 |
|---------|---------|----------------------|-----------|
| 排→排名 | rank-bar（手写 CSS） | rank-bar chart | 数据 >10 条或需动态排序 |
| 排→比例 | seg-bar（手写 CSS） | donut chart | 分段 >6 个或需环形展示 |
| 量→趋势 | sparkline（手写 CSS） | line chart / area chart | 需详细时间轴或展示累积 |
| 比→对比 | comparison（手写 CSS） | grouped-bar chart / radar chart | 需多个交叉维度 |
| 量→及格 | gauge-arc（手写 CSS） | gauge chart ECharts | 需精确刻度和动画 |
| 读→流程 | timeline-track（手写 CSS） | gantt chart | 需展示时间跨度 |


## One-pager

```
Hero 级（scene 决策）
  │
  ├─ 扫 → stat-block / numeral-grid / metric-card
  ├─ 比 → comparison / tension-grid / data-table
  ├─ 排 → rank-bar / seg-bar / numeral-grid / ranking-table / gantt chart
Section 级── 读 → timeline-track / flow-pipeline / step-sequence / funnel chart
  ├─ 量 → gauge-arc / sparkline / block-bar / bullet-chart
  ├─ 解 → callout / pull-quote / marginalia / annotated-highlight
  ├─ 信 → logo-wall / single-huge-quote
  └─ 展 → accordion / tab-switcher / flip-card / detail-panel
      │
Detail 级── data-spotlight / sparkline / progress-row / tag / source-row / action-list
      │
Decorative 级── ghost-text / seal / dot-pattern / dot-matrix / spinning-ring
```

---

*2026-06-07 · v5 定稿 · 一表全览 50+ 内容组件，43 行*
