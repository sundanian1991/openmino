# AI 组件选型速查表 v3（完整版）

> 160+ 组件全量盘点。三区：**内容表达区**（认知操作9种）| **场景决策区**（Hero在recipe层选）| **结构层**（写代码自然使用）

---

## 一、内容表达区

按认知操作组织。每个操作下列出该意图下所有组件，按首选 → 替代排列，**同义表达用「|」并列**。

---

### 1. 扫 · SCAN（概览）

用户不分析不比较，只看整体状态。

**数据形态：并列指标**

| 组件 | 同义替代 | 选型理由 | 来源 |
|------|---------|---------|------|
| **stat-block** | metric-card(需趋势) / kpi-card(需完成度) | 默认首选，大数字+标签最干净 | D12 |
| summary-capsule | — | 空间有限时的紧凑版 | D |
| data-spotlight | — | 内联单数字，嵌入文字流 | D17 |
| nameplate-label | tag | 工业风格，技术场景 | D13 |
| DV4 KPI Card | kpi-card | 带delta的指标卡，数据可视化路径 | DV |

**去重说明**：stat-block / metric-card / kpi-card 表达同一意图，差异在"是否含趋势/完成度"

**数据形态：数字矩阵**

| 组件 | 同义替代 | 选型理由 | 来源 |
|------|---------|---------|------|
| **numeral-grid** | kpi-grid | 默认首选，方阵扫一眼知分布 | G4 |
| dashboard-grid | — | 需混合指标+图表+状态 | C |
| heatmap | — | 时间×分类矩阵，密度最高 | DV14 |
| treemap | — | 分类占比，层级嵌套 | DV20 |

---

### 2. 比 · COMPARE（对比）

两个对象差异比较。

**数据形态：左右对照**

| 组件 | 同义替代 | 选型理由 | 来源 |
|------|---------|---------|------|
| **comparison** | tension-grid(哲学性) / do-dont(规则型) | 默认首选，双栏VS标签 | C18 |
| light-dark-switch | — | 同一对象before/after | C |
| principle-card | — | 单卡内原vs新对比 | G8 |

**数据形态：表格对比**

| 组件 | 同义替代 | 选型理由 | 来源 |
|------|---------|---------|------|
| **data-table** | spec-table(技术参数) | 默认首选，多维度精确比 | C |
| grouped-bar chart | — | 柱状分组，视觉比非精确比 | 图表4 |
| radar chart | — | 3-5维能力比对 | DV15 |
| scatter plot | — | XY相关性 | DV13 |

---

### 3. 排 · RANK（排序）

多个对象建立秩序——谁第一、权重多少。

**数据形态：条形 + 序号**

| 组件 | 同义替代 | 选型理由 | 来源 |
|------|---------|---------|------|
| **rank-bar** | rank-panel(需标题) | 默认首选，长度=大小序号=位置 | DV8/DV9 |
| ranking-table | — | 需精确数值+排名 | C |
| rank-bar chart | rank-bar | ECharts/SVG渲染路径 | 图表1 |

**数据形态：分段条（比例/权重）**

| 组件 | 同义替代 | 选型理由 | 来源 |
|------|---------|---------|------|
| **seg-bar** | weight-bar(轻量) | 默认首选，签名单段方块 | D11 |
| stacked-bar | — | 整体=部分之和 | DV7 |
| progress-bar | inline-bar(紧凑) | 完成度，非占比 | D9/D10 |
| donut chart | — | 环形占比，视觉比分段条更强 | 图表3 |
| bullet-chart | — | 单指标对标 | DV6 |

**数据形态：方阵**

| 组件 | 同义替代 | 选型理由 | 来源 |
|------|---------|---------|------|
| **numeral-grid** | card-quad(需卡片) | 方阵比条形密度更高 | G4 |
| small-multiples | — | 子集趋势对比 | DV18 |

---

### 4. 读 · FLOW（流程）

理解顺序——先后、阶段、路径。

**数据形态：节点 + 连线**

| 组件 | 同义替代 | 选型理由 | 来源 |
|------|---------|---------|------|
| **timeline-track** | flow-pipeline(状态推进) | 默认首选，时间先后 | C21 |
| progress-trail | phase-bar(项目阶段) | 阶段+完成度 | C |
| level-track | — | 等级晋升路径 | C |
| gantt chart | — | 项目时间线 | DV19 |
| funnel chart | — | 转化率/流失分析 | 图表6 |

**数据形态：编号步骤**

| 组件 | 同义替代 | 选型理由 | 来源 |
|------|---------|---------|------|
| **step-sequence** | C4 / number-led C26 | SOP怎么做 | C4/C26 |

---

### 5. 量 · MEASURE（度量）

指标好坏判断。

**数据形态：仪表**

| 组件 | 同义替代 | 选型理由 | 来源 |
|------|---------|---------|------|
| **gauge-arc** | gauge-segmented(需等级) | 默认首选，弧线+读数 | D14/DV10 |
| bullet-chart | — | 有基准值需同视图比较 | DV6 |
| gauge chart (echarts) | — | ECharts渲染路径 | 图表8 |

**数据形态：趋势线**

| 组件 | 同义替代 | 选型理由 | 来源 |
|------|---------|---------|------|
| **sparkline** | DV5 sparkline | 默认首选，变化趋势 | D15/DV5 |
| line chart | area chart(累积) | 详细趋势 | 图表2/7 |
| small-multiples | — | 多子集趋势对比 | DV18 |

**数据形态：评分**

| 组件 | 同义替代 | 选型理由 | 来源 |
|------|---------|---------|------|
| **block-bar** | progress-row(需精确值) | 段状评分 | D |
| progress-row | DV11 | 进度条+标签+数值 | DV11 |

---

### 6. 解 · READ（解读）

论证说明——为什么这么说、背后逻辑。

**数据形态：边注 + 引用**

| 组件 | 同义替代 | 选型理由 | 来源 |
|------|---------|---------|------|
| **callout** | C20 | 默认首选，2px左边框标注 | C20 |
| pull-quote | D4 | 引用权威人物，2fr 1fr布局 | D4 |
| blockquote | D19 | 内联级引用 | D19 |
| editorial-quote | D23 | 超大引号，编辑感 | D23 |
| marginalia | B9 | 旁注栏，深度阅读注释 | B9 |
| brand-statement | C12 | 全宽品牌宣言 | C12 |

**数据形态：标注 + 清单**

| 组件 | 同义替代 | 选型理由 | 来源 |
|------|---------|---------|------|
| **annotated-highlight** | C5 | 图表/图片逐点解读 | C5 |
| action-list | — | 不是解读，是该做什么 | C |
| dashed-box | C28 | 笔记提示注意事项 | C28 |

---

### 7. 信 · PROVE（背书）

依据来源——凭什么信。

**数据形态：来源 + Logo**

| 组件 | 同义替代 | 选型理由 | 来源 |
|------|---------|---------|------|
| **logo-wall** | D5 | 一堆logo比文字可信 | D5 |
| source-row | — | 精确来源+日期 | D |
| tag | D8 / nameplate-label D13 | 最轻量标注 | D8 |

**数据形态：数字/代码即证据**

| 组件 | 同义替代 | 选型理由 | 来源 |
|------|---------|---------|------|
| **stat-block** | D12 | 用数据证明 | D12 |
| **code-panel** | D21 | 用代码证明，技术场景 | D21 |
| single-huge-quote | D6 | 独占一屏的宣言式证明 | D6 |

---

### 8. 展 · DIG（深入）

交互展开、切换、看详情。

**数据形态：折叠/切换**

| 组件 | 同义替代 | 选型理由 | 来源 |
|------|---------|---------|------|
| **accordion** | C9 | 默认首选，FAQ多层详情 | C9 |
| tab-switcher | C8 / segmented-control C19 | 并排切换多视图 | C8/C19 |
| flip-card | D20 / hover-reveal C31 | 正反/悬停揭示 | D20/C31 |
| detail-panel | C17 | 全屏详情 | C17 |
| arrow-carousel | C29 | 轮播 | C29 |
| stacked-cards | C30 | 堆叠展示 | C30 |

**数据形态：清单/跟踪**

| 组件 | 同义替代 | 选型理由 | 来源 |
|------|---------|---------|------|
| **interactive-checklist** | C10 / C32 | 任务跟踪 | C10/C32 |

---

### 9. 感 · FEEL（氛围）

不传信息，传感受。

**数据形态：装饰元素**

| 组件 | 同义替代 | 选型理由 | 来源 |
|------|---------|---------|------|
| **ghost-text** | A8 / A13 | 空间深度感 | A8/A13 |
| seal | — | 仪式感确认感 | A |
| dot-pattern | C16 / DV2 / DV12 | 点阵科技纹理 | C16/DV |
| dot-matrix | A9 / G7 | 技术与手工并存 | A9/G7 |
| texture | — | 自然手工质感 | A |
| area-hatching | DV1 | 增长趋势装饰条纹 | DV1 |
| barcode-lines | DV3 | 活跃度波动装饰 | DV3 |
| spinning-ring | A10 | 旋转虚线圆环装饰 | A10 |
| device-shell | C34 | 设备框架展示 | C34 |
| chat-bubble | C33 | 对话气泡 | C33 |

**数据形态：品牌系统（氛围展示）**

| 组件 | 同义替代 | 选型理由 | 来源 |
|------|---------|---------|------|
| **color-swatch** | G6 | 品牌色展示 | G6 |
| color-swatch-grid | G1 | 完整色板体系 | G1 |
| typography-showcase | G2 | 字体性格 | G2 |
| symbol-evolution | G3 | Logo变化史 | G3 |

---

## 二、场景决策区（不在认知操作里选）

Hero 类组件在 recipe-book 的场景决策中选，不走认知操作流程。

| 组件 | 选型条件 | 来源 |
|------|---------|------|
| V1 Diagonal | 动感/方向性 | A1变体 |
| V2 Split | 左右分屏/对比性开场 | A2 |
| V3 Horizontal | 上下劈开/仪式感 | A1变体 |
| V4 Quadrant | 右上角色块/编辑感 | A1变体 |
| V5 Bevel | 左斜切/深色右面板 | A1变体 |
| V6 Watermark | 居中ghost字/仪式感 | A1变体 |
| Marquee | 文字作为Hero主体 | A1 |
| Split Diptych | 产品+环境图并排 | A2 |
| Quote Led | 引言作开场 | A3 |
| Photographic | 图片是主角 | A6 |
| Custom Illustration | 品牌SVG/户外符号 | A7 |
| Product Hero | 产品首屏/瓶身轮廓 | A11 |
| hero-numeral | 数据驱动Hero | — |

**被排除的Hero**（不使用）：Stat Led A4 / Letter A5

---

## 三、结构层组件（写代码自然使用，不用单独选）

**Section（章节分隔）**

| 组件 | 用途 |
|------|------|
| left-margin-numbered B1 | 左侧大编号+右侧正文 |
| hanging B2 | 安静章节过渡 |
| bottom-anchored B5 | 底部标签收尾 |
| decorative-number-header B6 | 右上大数字章节标题 |
| seam-divider B7 | 渐变分隔线 |
| tension-grid B8 | 张力网格（注意：G5也是tension-grid，不同类别） |
| marginalia B9 | 边注栏（同认知操作"解"也有，这里指section级） |

**Navigation（导航）**

| 组件 | 用途 |
|------|------|
| floating-pill F2 | 现代感浮动导航 |
| newspaper-masthead F6 | 编辑感报头导航 |
| edge-aligned-minimal F7 | 极简边对齐导航 |

**Footer（页脚）**

| 组件 | 用途 |
|------|------|
| mast-headed E1 | 品牌标识+口号+链接 |
| inline-rule E2 | 单行极简版权 |
| dense-typographic E4 | 密集排印+致谢 |
| statement E6 | 品牌宣言收尾 |

---

## 四、功能控件（交互操作，不表达内容）

| 组件 | 用途 |
|------|------|
| inputs C23 | 输入框 |
| toggle C24 | 开关 |
| buttons D18 | 按钮 |
| segmented-control C19 | 分段选择器 |
| state-patterns C13 | 加载/空/错误/成功 |
| alert C22 | 状态提示 |
| reference-line-overlay D16 | 阈值参考线叠加 |
| status-dot DV25 | 三态状态指示器 |
| typographic-link D1 | 安静行动召唤（排印链接） |
| period-navigation D24 | 日期导航切换 |

---

## 汇总

| 区 | 类别 | 组件数 | 说明 |
|---|------|:------:|------|
| **内容表达** | 扫 SCAN | ~10 | 并列指标+数字矩阵 |
| | 比 COMPARE | ~10 | 左右对照+表格 |
| | 排 RANK | ~12 | 条形+分段条+方阵 |
| | 读 FLOW | ~9 | 节点连线+编号步骤 |
| | 量 MEASURE | ~10 | 仪表+趋势线+评分 |
| | 解 READ | ~10 | 边注引用+标注清单 |
| | 信 PROVE | ~7 | 来源Logo+数字代码证据 |
| | 展 DIG | ~10 | 折叠切换+清单跟踪 |
| | 感 FEEL | ~13 | 装饰+品牌系统 |
| **场景决策** | Hero | ~12 | recipe-book层选，不走认知 |
| **结构层** | Section + Nav + Footer | ~23 | 写代码时自然使用 |
| **功能控件** | 交互/状态/反馈 | ~9 | 功能组件 |
| **总计** | | ~135 | 不含图表模式（它们是渲染路径） |

---

## 补充说明

1. **同义组件不合并，但标为首选+替代**。比如 rank-bar(DV8) 和 rank-bar chart(图表1) 表达同一意图，差异在CSS渲染vs ECharts渲染
2. **图表模式**是渲染路径选择（ECharts / 手写SVG），不是独立组件，已归入对应认知操作
3. **H类Macrostructures**（页面级形态）未录入，它们是section的组合模式，不是独立组件
4. **被排除组件**（Hallmark排除的H4/H5/C6/D2等）不在选择范围内，已从表中移除

---

*2026-06-07 · AI 组件选型速查表 v3 · 全量盘点 135+ 组件，3区分类*
