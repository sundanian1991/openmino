# AI 组件选型速查表 v6（全量 120+ 组件一表通）

> 所有组件按 4 级分层 + 认知操作 + 结构/功能 全量盘点。不筛选、不省略。

---

## 内容组件 + 品牌系统 + 结构层 + 功能控件 全量表

| 认知操作 | 层级 | 组件 | 具体作用 | 替代组件 | 替代条件 |
|---------|------|------|---------|---------|---------|
| — | Hero 级 | Marquee | 品牌宣言 Hero，大号宣言文字居中或左对齐，80vh | Split Diptych | 需产品+风景并排 |
| — | Hero 级 | Split Diptych | 产品+景象左右对屏，grid 双栏 | Marquee | 品牌宣言场景 |
| — | Hero 级 | Quote Led | 创始人引言作为 Hero 主体，70vh | Photographic | 图片是主角 |
| — | Hero 级 | Photographic | 全屏自然风光影像，文字叠加图片上 | V1-V6 | 无高质量图片 |
| — | Hero 级 | V1 Diagonal | clip-path 对角切割，右侧深色 | V2 Split | 需要左右分屏 |
| — | Hero 级 | V2 Split | grid 1fr 1fr 左右分屏，左浅右深 | V5 Bevel | 需要斜切方向感 |
| — | Hero 级 | V3 Horizontal | grid 1fr 1fr 上下分屏，上浅下深 | V4 Quadrant | 需要右上角色块 |
| — | Hero 级 | V4 Quadrant | grid + 右上深色方块，编辑感 | V6 Watermark | 需要安静仪式感 |
| — | Hero 级 | V5 Bevel | clip-path 左斜切，深色右面板 | V1 Diagonal | 需要对角切割 |
| — | Hero 级 | V6 Watermark | 居中超大透明 ghost 字衬底，安静 | V3 Horizontal | 需要上下分屏 |
| — | Hero 级 | hero-numeral | 以 3-5 个大数字为 Hero 主视觉 | V1-V6 | 数据驱动场景 |
| — | Hero 级 | Custom Illustration | 品牌 SVG 点阵插画/户外符号（山峰/指南针） | — | 品牌插画专属 |
| — | Hero 级 | Product Hero | 产品首屏，三列 grid 瓶身轮廓 CSS 绘制 | Photographic | 需自然风光 |
| 扫 | Section 级 | stat-block | 大数字+小标签并排，3-5 个，一眼扫完整体数量级 | metric-card | 需同时看趋势方向 |
| 扫 | Section 级 | metric-card | 大数字+迷你趋势线，比 stat-block 多变化方向 | kpi-card | 涉及达成率 |
| 扫 | Section 级 | kpi-card | 大数字+完成度进度，知道"做了多少" | metric-card | 不需要完成度 |
| 扫 | Section 级 | numeral-grid | 4 列方阵，≥6 个同质数字的空间排列 | dashboard-grid | 需混合指标+图表+状态 |
| 扫 | Section 级 | dashboard-grid | 多指标仪表盘网格，混合展示指标/图表/状态 | numeral-grid | 纯数字场景 |
| 扫 | Section 级 | bento-grid (C1) | 不规则网格，产品线混排展示，tile 可跨列/行 | numeral-grid | 数据同质/无主次 |
| 扫 | Section 级 | bento-project (C35) | 项目进度仪表板，4列网格+三态阶段条+多指标 | dashboard-grid | 不是项目场景 |
| 扫 | Section 级 | magazine-cut (C25) | 大标题卡，Playfair Display 超大 serif，首屏卖点 | Marquee | Hero 级需求 |
| 扫 | Section 级 | application-card (C14) | 应用场景展示卡，图标+名称+描述 | icon-card | 有图标时 |
| 扫 | Section 级 | product-card (C11) | 产品展示卡，图片区+产品名+分类标签+规格摘要 | application-card | 不是产品场景 |
| 扫 | Section 级 | icon-card (C27) | 侧边图标功能卡，flex 左侧 80px 图标区 | application-card | 不需要图标 |
| 扫 | Section 级 | tag-card (D22) | 卡片+pill 标签组合，分类展示/功能矩阵 | icon-card | 不需要标签 |
| 扫 | Detail 级 | data-spotlight | 单个数字内联聚焦，嵌入文字流 | tag | 非数字场景 |
| 扫 | Detail 级 | heatmap (DV14) | 时间×分类矩阵，密度最高 | numeral-grid | 有明确时间×维度 |
| 扫 | Detail 级 | treemap (DV20) | 分类占比层级嵌套，多级数据分布 | numeral-grid | 无层级关系 |
| 比 | Section 级 | comparison | 双栏非对称对照，左 sticky "VS" 标签 | tension-grid | 对比有概念性（Heritage vs Future） |
| 比 | Section 级 | tension-grid (G5) | 2列 1px gap 对立网格，对比的不是数据是价值观 | do-dont | 二元规则对比 |
| 比 | Section 级 | do-dont (G9) | 二元规则对比，AVOID/PREFER 双列，结论最明确 | tension-grid | 需要哲学性 |
| 比 | Section 级 | light-dark-switch | 同一对象的明暗两面，before/after | comparison | 不是同一对象 |
| 比 | Section 级 | principle-card (G8) | 单卡内行对比（原vs新），粒度最细 | comparison | 需要精确对照 |
| 比 | Section 级 | data-table | 多维度交叉对比，维度≥3 需精确阅读 | spec-table | 内容是技术参数 |
| 比 | Section 级 | spec-table | 技术参数逐项对比，JetBrains Mono 精确值 | data-table | 不是技术参数 |
| 比 | Section 级 | three-column-grid (C7) | 非对称三列 3:2:1 重量分配，产品对比/特性展示 | comparison | 需三列以上 |
| 比 | Section 级 | radar chart (DV15) | 3-5 维能力对比，多边形 radar，适用于评估 | comparison | 维度≤2 |
| 比 | Section 级 | scatter plot (DV13) | XY 相关性分析，分布展示 | data-table | 需精确值 |
| 比 | Section 级 | grouped-bar chart | 分组柱状，多维度/同期/AB 测试对比 | comparison | 维度≤2 |
| 比 | Detail 级 | small-multiples (DV18) | 多子集微小趋势图并列，子集间对比 | sparkline | 单个趋势 |
| 排 | Section 级 | rank-bar (DV8) | 水平条形+序号+进度+delta，长度=大小，排的意图最直接 | rank-panel | 排名需标题上下文 |
| 排 | Section 级 | rank-panel (DV9) | 带标题的排名列表容器，包装感更强 | ranking-table | 需精确数值 |
| 排 | Section 级 | ranking-table | 精确数值+排名的表格，精度最高 | rank-bar | 需视觉冲击 |
| 排 | Section 级 | seg-bar (D11) | 离散方块端头+2px 间距，排比例/权重 | weight-bar | 需更轻量占比 |
| 排 | Section 级 | weight-bar | 行内权重条，比 seg-bar 更紧凑轻量 | seg-bar | 非行内场景 |
| 排 | Section 级 | stacked-bar (DV7) | 堆叠组成比例，"整体=部分之和" | seg-bar | 不强调整体 |
| 排 | Section 级 | progress-bar (D9) | 分段进度条，排的是完成度，非占比 | seg-bar | 不是完成度 |
| 排 | Section 级 | progress-row (DV11) | 进度条+标签+数值，精确达成率 | progress-bar | 不需要标签 |
| 排 | Section 级 | inline-bar (D10) | 行内紧凑进度条，4px 高度 | progress-bar | 非行内场景 |
| 排 | Section 级 | numeral-grid (G4) | 方阵排名，比条形信息密度更高 | card-quad | 需卡片内容非数字 |
| 排 | Section 级 | card-quad | 四卡方阵，4 个同级对象排列 | numeral-grid | 纯数字场景 |
| 排 | Section 级 | donut chart | 环形占比，视觉比分段条更强 | stacked-bar | 不是占比 |
| 排 | Section 级 | gantt chart (DV19) | 项目时间线，横条长度=时间跨度的排 | timeline-track | 需要精确时间 |
| 排 | Detail 级 | box-plot (DV17) | 统计分布，中位数+四分位+离群 | — | 数据分析专用 |
| 读 | Section 级 | timeline-track (C21) | 链式节点+连接线，时间先后顺序 | flow-pipeline | 需展示推进状态 |
| 读 | Section 级 | flow-pipeline (C15) | 横向流程线，三态（done/active/pending），状态推进 | progress-trail | 需同时看阶段+完成度 |
| 读 | Section 级 | progress-trail | 进度路径，阶段+完成百分比 | timeline-track | 不需要完成度 |
| 读 | Section 级 | level-track | 等级轨道，等级晋升路径 | flow-pipeline | 非晋升场景 |
| 读 | Section 级 | phase-bar | 阶段条，项目阶段划分，宽块比节点清晰 | level-track | 非阶段场景 |
| 读 | Section 级 | step-sequence (C4) | 编号步骤（I/II/III），SOP "该怎么做" | number-led C26 | 需卡片式步骤 |
| 读 | Section 级 | number-led (C26) | 半透明大编号卡片，步骤/问题清单 | step-sequence | 非步骤场景 |
| 读 | Section 级 | funnel chart | 漏斗形，转化率/流失分析，逐阶段收缩 | step-sequence | SOP 场景 |
| 读 | Section 级 | sticky-scroll (C2) | 左固定右滚动，产品详情/面料/功能描述 | — | 产品页专用 |
| 读 | Detail 级 | gantt chart (DV19) | 项目时间线，多任务并行的流程 | timeline-track | 单线流程 |
| 量 | Section 级 | gauge-arc (D14) | SVG 弧形仪表，中央数字读数 | gauge-segmented | 需看到等级区间 |
| 量 | Section 级 | gauge-segmented | 分段仪表，带等级区间 | gauge-arc | 不需要等级 |
| 量 | Section 级 | bullet-chart (DV6) | 实际值 vs 目标 vs 范围带，有基准 | gauge-arc | 没有基准值 |
| 量 | Section 级 | sparkline (D15) | 迷你趋势线，160x32 SVG 无坐标轴 | line chart | 需详细趋势 |
| 量 | Section 级 | line chart | 折线图+面积填充，详细时间序列 | sparkline | 只需变化方向 |
| 量 | Section 级 | area chart | 面积累积，堆叠趋势/累积增长 | line chart | 不是累积场景 |
| 量 | Section 级 | block-bar | 段状评分，一段条+等级，在什么水平 | progress-row | 需精确百分比 |
| 量 | Section 级 | progress-row (DV11) | 水平进度条+标签+数值 | block-bar | 不是达成率是评分 |
| 量 | Section 级 | reference-line (D16) | 阈值参考线叠加，垂直标记显示目标/基准 | bullet-chart | 需要完整基准比较 |
| 量 | Section 级 | gauge chart | ECharts 弧形仪表，需精确刻度+动画 | gauge-arc | 不需要动画 |
| 解 | Section 级 | callout (C20) | 左边框 2px + 大写等宽标题+正文，重点被框出 | pull-quote | 引用权威人物 |
| 解 | Section 级 | pull-quote (D4) | grid 2fr 1fr 引用块，左引言右边注 | blockquote | 内联级引用 |
| 解 | Section 级 | blockquote (D19) | 内联引言，上下边框+左引号，嵌入文字流 | callout | 非内联场景 |
| 解 | Section 级 | editorial-quote (D23) | Playfair Display 80px 超大引号，编辑感引用 | pull-quote | 非编辑感 |
| 解 | Section 级 | marginalia (B9) | grid 3fr 1fr 旁注栏，深度阅读多段注释 | callout | 单段重点标注 |
| 解 | Section 级 | brand-statement (C12) | 全宽品牌宣言卡，居中排版+标签+宣言+副标题 | callout | 不是品牌立场 |
| 解 | Section 级 | annotated-highlight (C5) | pin+标签绝对定位在图片/图表上，逐点解读 | action-list | 不是解读是该做什么 |
| 解 | Section 级 | action-list | 动作清单，该做什么 | callout | 不是行动建议 |
| 解 | Section 级 | dashed-box (C28) | border 2px dashed + 浮动标签，笔记/提示/注意 | callout | 不是提示场景 |
| 解 | Section 级 | chat-bubble (C33) | 对话气泡，AI 对话/分析推理/user/ai 两角色 | — | 对话场景专用 |
| 信 | Section 级 | logo-wall (D5) | 4列网格 Logo 墙，一堆 logo 比文字可信 | source-row | 需精确来源+日期 |
| 信 | Section 级 | source-row | 数据出处行，精确来源+日期 | tag | 不需要精确日期 |
| 信 | Section 级 | tag (D8) | 内联标签，JetBrains Mono，含 accent/scene 变体 | nameplate-label | 需工业风格 |
| 信 | Section 级 | nameplate-label (D13) | 点前缀+等宽文字，工业技术标签 | tag | 非工业场景 |
| 信 | Section 级 | single-huge-quote (D6) | 独占一屏大引言，最有冲击力的证明 | logo-wall | 非品牌宣言证明 |
| 信 | Section 级 | code-panel (D21) | macOS 风格代码面板，三色点+语法高亮，技术证明 | — | 技术场景专用 |
| 展 | Section 级 | accordion (C9) | 折叠面板+/-图标，FAQ/多层详情 | tab-switcher | 需并排切换多视图 |
| 展 | Section 级 | tab-switcher (C8) | 上标签栏+下内容区，同一空间多视图切换 | accordion | 单视图折叠即可 |
| 展 | Section 级 | segmented-control (C19) | 分段选择器，互斥选项切换，场景色板/产品筛选 | tab-switcher | 非标签场景 |
| 展 | Section 级 | flip-card (D20) | 3D perspective 翻转卡片，hover 触发正反信息 | hover-reveal | 需悬停渐进揭示 |
| 展 | Section 级 | hover-reveal (C31) | 悬停切换 front/back，渐进式信息密度 | flip-card | 需明确翻转 |
| 展 | Section 级 | detail-panel (C17) | fixed 全屏详情面板，rgba 背景，完整阅读环境 | accordion | 不需要全屏 |
| 展 | Section 级 | arrow-carousel (C29) | 左右箭头+圆点指示器，内容轮播 | stacked-cards | 非轮播场景 |
| 展 | Section 级 | stacked-cards (C30) | 多层 absolute 堆叠，顶部可交互，层级展示 | arrow-carousel | 需切换式浏览 |
| 展 | Section 级 | interactive-checklist (C10) | 点击打勾方块，OK/PENDING 状态，任务跟踪 | — | 非任务场景 |
| 展 | Section 级 | number-led (C26) | 编号卡片，既是流程也是可展开的步骤 | step-sequence | 无需编号 |
| — | Decorative 级 | ghost-text (A8/A13) | 超低透明度文字 22vw 装饰背景，不传递信息 | seal | 需仪式感非空间感 |
| — | Decorative 级 | decorative-number (A8/B6) | 超大半透明数字，120-160px background | ghost-text | 不是数字场景 |
| — | Decorative 级 | seal | 品牌印章，border+旋转角度，仪式感确认感 | ghost-text | 需空间感非仪式感 |
| — | Decorative 级 | dot-pattern (C16/DV2/DV12) | CSS grid 点阵背景，≤40% 透明度，科技纹理 | dot-matrix | 需前景点阵字符 |
| — | Decorative 级 | dot-matrix (A9/G7) | 5x7 grid 点阵字符/logo，技术与手工感 | dot-pattern | 需背景纹理 |
| — | Decorative 级 | texture | 自然手工质感背景 | dot-pattern | 需要科技感 |
| — | Decorative 级 | area-hatching (DV1) | 对角线条纹填充，增长趋势装饰线 | — | 增长场景专属 |
| — | Decorative 级 | barcode-lines (DV3) | 竖线高度变化，活跃度波动装饰 | — | 活跃度场景专属 |
| — | Decorative 级 | spinning-ring (A10) | 30s 匀速旋转虚线圆环，浮动标签 absolute | — | 适用场景极少 |
| — | Decorative 级 | device-shell (C34) | 设备框架（浏览器/手机），产品截图展示 | — | 产品截图场景 |
| 结构 | 章节分隔 | seam-divider (B7) | 渐变淡入淡出 1px 水平线，替代生硬边框 | — | Section 间自然使用 |
| 结构 | 章节分隔 | hanging (B2) | 安静留白章节过渡，纯文字无装饰 | — | 章节分隔自然使用 |
| 结构 | 章节分隔 | bottom-anchored (B5) | 底部标签收尾，如 "END OF SHELL COLLECTION" | — | 章节收尾自然使用 |
| 结构 | 章节分隔 | left-margin-numbered (B1) | 左侧大号 96px 装饰数字 + 右侧正文 | — | 设计原则章节用 |
| 结构 | 章节分隔 | decorative-number-header (B6) | 右上超大数字（120px）+ 前景章节标题 | — | 章节标题用 |
| 结构 | 导航 | floating-pill (F2) | fixed 浮动药丸，backdrop-filter blur | — | 页面导航自然使用 |
| 结构 | 导航 | newspaper-masthead (F6) | issue number + double rule + 报头编辑感 | — | 品牌系统页用 |
| 结构 | 导航 | edge-aligned-minimal (F7) | sticky top 0，border-bottom 1px，极简 | — | 默认导航 |
| 结构 | 页脚 | mast-headed (E1) | 品牌标识+口号+链接，flex space-between | — | 默认页脚 |
| 结构 | 页脚 | inline-rule (E2) | 极简版权行，2026 Brand / Stockholm | — | 极简页脚 |
| 结构 | 页脚 | dense-typographic (E4) | 版权致谢+字体致谢+地址，pre 代码块风格 | — | 密集排印场景 |
| 结构 | 页脚 | statement (E6) | 结尾品牌宣言，50vh 独占一屏收尾 | — | 品牌宣言收尾 |
| 功能 | 控件 | buttons (D18) | primary/secondary/ghost/destructive，全大写 | — | 按功能需求使用 |
| 功能 | 控件 | inputs (C23) | 下划线式输入框，标签在上 | — | 按功能需求使用 |
| 功能 | 控件 | toggle (C24) | 药丸轨道 44x24 + 圆形滑块 18px | — | 按功能需求使用 |
| 功能 | 控件 | typographic-link (D1) | Georgia display-md 排印链接，安静行动召唤 | buttons | 不需按钮形态 |
| 功能 | 控件 | period-navigation (D24) | 月份/周期切换，40px 方按钮 | — | 日期导航使用 |
| 功能 | 状态 | state-patterns (C13) | 加载/空/错误/成功四态，无骨架屏无 toast | — | 按功能需求使用 |
| 功能 | 状态 | alert (C22) | 括号前缀文本提示，[SAVED]/[WARNING]/[ERROR] | — | 按功能需求使用 |
| 功能 | 状态 | status-dot (DV25) | 绿黄红三态圆点指示器 | — | 按功能需求使用 |

---

## 品牌系统展示（品牌设计页面专用，不走内容选型）

| 组件 | 作用 | 适用场景 |
|------|------|---------|
| color-swatch-grid (G1) | 完整色板展示，Core/Landscape/Signal 三级 | 品牌系统首页 |
| typography-showcase (G2) | 字体家族，Display/Body/Data 三行标本 | 品牌系统页 |
| symbol-evolution (G3) | 品牌标志演进，Before→After 对比 | 品牌历史展示 |
| color-swatch (G6) | 单色板卡，100px 色块 + token | 色板详情页 |
| dot-matrix-logo (G7) | 静态点阵 H logo，四档尺寸 | 品牌标识展示 |
| principle-card (G8) | 设计原则单卡对比，标题+行内对比 | 原则页面 |
| tension-grid (G5) | 核心张力网格，品牌灵魂组件 | 品牌哲学展示（已列入"比"） |

---

## 数据可视化渲染路径（与组件的区别：组件固定 CSS，图表数据驱动 SVG/ECharts）

| 认知操作 | 组件路径 | 图表路径（ECharts/SVG） | 何时走图表 |
|---------|---------|----------------------|-----------|
| 排→排名 | rank-bar（手写 CSS） | rank-bar chart（图表1） | 数据 >10 条或需动态排序 |
| 排→比例 | seg-bar（手写 CSS） | donut chart（图表3） | 分段 >6 个或需环形展示 |
| 量→趋势 | sparkline（手写 CSS） | line/area chart（图表2/7） | 需详细时间轴或展示累积 |
| 比→对比 | comparison（手写 CSS） | grouped-bar / radar（图表4/5） | 需多个交叉维度 |
| 量→仪表 | gauge-arc（手写 CSS） | gauge chart（图表8） | 需精确刻度和动画 |
| 读→流程 | timeline-track（手写 CSS） | gantt chart（图表不编号） | 需展示时间跨度 |
| 排→分布 | numeral-grid（手写 CSS） | treemap（DV20） | 需层级嵌套分布 |
| 扫→概览 | stat-block（手写 CSS） | heatmap（DV14） | 需时间×分类矩阵 |

---

## One-pager

```
Hero 级（scene 决策）
  │
  ├─ 扫 → stat-block / numeral-grid / bento-grid / metric-card / dashboard-grid / magazine-cut / icon-card
  ├─ 比 → comparison / tension-grid / data-table / spec-table / radar chart / light-dark-switch
  ├─ 排 → rank-bar / seg-bar / numeral-grid / gantt chart / stacked-bar / progress-bar / donut chart
Section 级── 读 → timeline-track / flow-pipeline / step-sequence / funnel chart / sticky-scroll
  ├─ 量 → gauge-arc / sparkline / bullet-chart / block-bar / line chart / area chart
  ├─ 解 → callout / pull-quote / marginalia / annotated-highlight / brand-statement / dashed-box
  ├─ 信 → logo-wall / source-row / tag / single-huge-quote / code-panel
  └─ 展 → accordion / tab-switcher / flip-card / detail-panel / carousel / stacked-cards
      │
Detail 级── data-spotlight / sparkline / progress-row / tag / small-multiples / heatmap / treemap / gantt
      │
Decorative 级── ghost-text / decorative-number / seal / dot-pattern / dot-matrix / spinning-ring / device-shell
```

---

*2026-06-07 · v6 定稿 · 全量 120+ 组件一表通览，不筛选不省略*
