# AI 组件选型速查表

> 判断链：认知操作(1步) → 数据形态(1步) → 首选组件(1步)。3步选完，不翻文件。

---

## 内容层组件选型

| 认知操作 | 数据形态 | 首选组件 | 替代 | 判断依据 |
|---------|---------|---------|------|---------|
| **扫** 概览 | 并列指标(≤5个) | stat-block | metric-card(需趋势) / kpi-card(需完成度) | 数据是同质的、并列的、一眼能扫完 |
| **扫** 概览 | 数字矩阵(≥6个) | numeral-grid | dashboard-grid(需仪表盘) | 同质数据的空间排列 |
| **比** 对比 | 左右对照 | comparison | tension-grid(哲学性) / do-dont(规则型) | 两个对象直接比，差异一目了然 |
| **比** 对比 | 表格对比 | data-table | spec-table(技术参数) / principle-card(原vs新) | 多维度逐项比，精确但需阅读 |
| **排** 排序 | 条形+序号 | rank-bar | rank-panel(需标题) / ranking-table(需精确值) | 长度=大小，序号=位置，排的意图最直接 |
| **排** 排序 | 分段条 | seg-bar | weight-bar(占比) / stacked-bar(组成) / progress-bar(完成度) | 长度=权重，段=组成，排的是比例关系 |
| **排** 排序 | 方阵 | numeral-grid | card-quad(4个同级) | 空间位置=排序，方阵比条形信息密度更高 |
| **读** 流程 | 节点+连线 | timeline-track | flow-pipeline(状态推进) / progress-trail(需完成度) | 节点=阶段，连线=顺序，流的意图最直接 |
| **读** 流程 | 编号步骤 | step-sequence | — | 编号=顺序，步骤=操作，流的是"怎么做SOP" |
| **量** 度量 | 仪表 | gauge-arc | gauge-segmented(需等级) / bullet-chart(需基准) | 单个指标+判断标准，量的意图最直接 |
| **量** 度量 | 趋势线 | sparkline | — | 一条线+时间轴，量的是变化方向 |
| **量** 度量 | 评分 | block-bar | progress-row(需精确值) | 一段条+一个等级，量的是在什么水平 |
| **解** 解读 | 边注+引用 | callout | pull-quote(引用) / blockquote(内联) | 边注=重点标注，解的意图最直接 |
| **解** 解读 | 标注+清单 | annotated-highlight | action-list(行动建议) | 标注=逐段解读，清单=该做什么 |
| **信** 背书 | 来源+Logo | logo-wall | source-row(数据出处) / tag(来源标注) | Logo=谁在用，来源=数据出处，信的意图最直接 |
| **信** 背书 | 数字即证据 | stat-block | — | 数据本身就是证据 |
| **信** 背书 | 代码即证据 | code-panel | — | 代码本身就是证据，技术场景 |
| **展** 深入 | 折叠/切换 | accordion | tab-switcher(并排) / flip-card(正反) / hover-reveal(渐进) | 点一下展开/收起，展的意图最直接 |
| **展** 深入 | 清单/跟踪 | interactive-checklist | segmented-control(切换视图) | 勾选=完成，清单=任务，展的是进度 |
| **感** 氛围 | Hero(开场) | V1-V6 | Marquee(宣言) / Split Diptych(产品) / Photographic(风光) | 全屏+大字号+视觉冲击，感的意图最直接 |
| **感** 氛围 | 装饰元素 | ghost-text | seal(仪式) / dot-pattern(科技) / dot-matrix(技术) | 幽灵文字/点阵/纹理，感的是空间节奏 |
| **感** 氛围 | 品牌系统 | color-swatch | typography-showcase(字体) / brand-signature(收尾) | 色板/字体/标志，感的是品牌identity |

---

## 结构层组件（写代码时自然使用，不需要判断选择）

| 类别 | 组件 | 用途 |
|------|------|------|
| 章节分隔 | seam-divider / decorative-number / hanging / bottom-anchored | Section 之间的视觉分隔 |
| 导航 | floating-pill / newspaper-masthead / edge-aligned-minimal | 页面导航 |
| 页脚 | mast-headed / inline-rule / dense-typographic / statement | 品牌签名、版权、收尾 |
| 状态 | alert / inputs / toggle / segmented-control | 系统反馈、交互控件 |
| 品牌系统展示 | color-swatch-grid / symbol-evolution / tension-grid(G5) | 品牌系统页面专用 |

---

## 首选判断依据

扫：数据是并列的、同质的、一眼能扫完
比：两个对象同时呈现，差异一目了然
排：有明确的序号或位置关系，高低/先后/权重
读：有明确的时间或逻辑顺序，前后不可颠倒
量：单个指标+判断标准，判断好坏
解：有论证结构，观点+依据
信：有来源标注，凭证展示
展：有交互，点击/悬停/切换，信息分层揭示
感：不传递具体信息，传递情绪和气质

---

*2026-06-07 · AI组件选型速查表 v1*
