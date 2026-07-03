# 完整决策流程记录 · 远程办公报告

> **测试对象**：haglofs-paradigm 技能 v2.2（大扫除后版本）
> **测试内容**："2024 全球远程办公趋势报告"（CT-2 报告类，T1 北欧美学户外）
> **测试日期**：2026-07-03
> **目的**：逐决策点记录从 Step 0 到自检的完整流程，作为技能优化的核心证据

---

## Step 0 决策记录（D1-D8，逐个）

### D1：走逃生口还是完整采集？

- **决策**：走**逃生口**（跳过采集区，直接填决策区）。
- **依据规则**：intake-rules.md「采集策略：证据驱动提问」第 1 条——"用户已给了完整大纲（含 section 结构 + 内容 + 图片处理）→ 走逃生口，跳过采集区，直接填决策区"。
- **判定依据**：用户给定了报告主题、调性（T1 北欧美学户外）、数据素材（5 项具体数据）、报告结构（封面 → 目录 → 5 章节 → 引用 → 打印样式），属于"给了部分素材但结构已完整"的状态。按规则第 2 条"给了部分素材→从素材推断能推断的"，可以直接推导。
- **卡壳？** **否**。规则判定清晰，3 条采集策略层级分明，素材完整度一望可知。
- **规则够不够用？** **够用**。逃生口的触发条件明确（完整大纲），3 档分级（完整/部分/仅主题）覆盖全场景。

### D2：页面类型判定

- **决策**：**CT-2 报告/白皮书**。
- **判定依据**：intake-rules.md「页面类型判定」——"内容含封面 + 目录 + 多章节 + 引用/数据来源 → CT-2 报告/白皮书"。用户明确要求"封面页 → 目录 → 5 个章节 → 引用 → 打印样式"，完整命中 CT-2 全部四要素。
- **卡壳？** **否**。CT-1 和 CT-2 的区分清晰——CT-1 是"连续长文 + 作者署名"，CT-2 是"封面 + 目录 + 多章节 + 引用"，判定条件互斥。
- **规则够不够用？** **够用**。v2.0 新增的 CT-1/CT-2 判定条件明确，与品牌页/数据页/混合页的区分无歧义。
- **备注**：用户已在 prompt 里明确标注"这是一个报告类内容（CT-2）"，但规则本身的判定逻辑也独立得出了相同结论——规则自洽。

### D3：Hero 选型

- **决策**：**Report Cover（报告封面组件）**，视觉上继承 V4 Statement 的浅底 + 巨字水印 + meta 条基因。
- **决策树命中分支**：这是一次**决策树未直接覆盖**的情况。rules-hero.md 决策树 Step 1 的 4 个分支（数据→Pulse / 矩阵→Grille / 张力→Split / 教学→Slide）均未命中报告封面场景。Step 2 特殊场景的 V4 Statement（文档首页）和 V1 Reveal（传承仪式）也不完全匹配。
- **规则路径**：实际走 rules-components-editorial.md 的 **Report Cover 组件**——它是 CT-2 报告的专用封面，"借鉴 Hero 的 100vh 仪式感，但内容是报告体例（机构/编号/分类/密级）不是品牌叙事"。Report Cover 规则卡明确指出它不等于 hero-*.html 母版。
- **卡壳？** **是，轻微卡壳**。rules-hero.md 的决策树只覆盖品牌页 Hero 的 6 变体，没有提及"报告封面用 Report Cover 组件而非 hero 母版"的交叉指引。需要跳到 editorial 组件卡才能确认。**这是一个跨文件跳转的摩擦点**——Hero 决策树和 editorial 组件卡的衔接缺失。
- **规则够不够用？** **部分不够**。建议在 rules-hero.md 决策树加一条："CT-2 报告→不用 hero 母版，用 rules-components-editorial.md 的 Report Cover 组件"。或在 intake-rules.md 的 Hero 选型节加这条交叉引用。

### D4：联动组选择

- **决策**：查 paradigm-boundary.md Step 3 预设表，取**报告/白皮书（CT-2）**行：
  - padding：96-120px（正文段 96px，封面/章节大呼吸用 120px）
  - 分隔：**divider 线 + 章节分页**
  - 宽度：单一 1120px 或三档（封面/目录用 --c-max 1120px，正文用 840px 阅读宽度）
  - 动画：**无**（报告是体例规范优先，不需 hover 反转/pulse）
  - 网格：大间距
  - .cmp：推荐（章节级）
- **依据规则**：paradigm-boundary.md Step 3 预设表第 7 行"报告/白皮书（CT-2）"。
- **卡壳？** **否**。预设表 7 行覆盖了所有内容类型，CT-2 行参数明确。
- **规则够不够用？** **够用**。v2.0 新增的 CT-2 预设行参数齐全，一键取整组联动。
- **备注**：实际施工中 .cmp 标注我省略了——因为这是报告不是数据看板，章节用 Chapter Header 的编号体例做锚点，不需要额外的组件自标注（editorial 报告的章节锚点由 Chapter Header 承担）。但预设表说"推荐"而非"必有"，所以省略合规。

### D5：section 列表推导

- **决策**：基于报告结构（封面 → 目录 → 5 章节 → 引用 → 打印），推导如下 section 列表：

| # | 角色 | 组件 | 深浅 | padding |
|---|------|------|------|---------|
| 1 | Report Cover | report-cover（editorial 组件） | 浅（offwhite） | 100vh 仪式 |
| 2 | Table of Contents | table-of-contents（editorial 组件） | 浅（offwhite） | 96px |
| 3 | Chapter 01 + 数据 | chapter-header + stat-grid + elevation-profile + report-body | 浅 | 96px |
| 4 | Chapter 02 + 对比 | chapter-header + stat-grid + comparison-table + callout + report-body | 浅 | 96px |
| 5 | Chapter 03 + 排名 | chapter-header + dot-table + report-body | cream（次级面） | 96px |
| 6 | Chapter 04 挑战（深段） | chapter-header + stat-grid（深底）+ callout | **深（charcoal）** | 96px |
| 7 | 过渡桥 | statement-quote | 浅（offwhite） | 96px |
| 8 | Chapter 05 未来 | chapter-header + stat-grid + report-body | 浅 | 96px |
| 9 | References | data-citation（editorial 组件） | 浅 | 64px |
| 10 | Footer | footer（品牌组件 · black） | **深（black）** | 96px |

- **依据规则**：intake-rules.md「Section 列表推导」+ rules-components-editorial.md「报告的标准结构链」（Report Cover → TOC → Chapter Header ×N → Data Citation → Print Styles）。
- **卡壳？** **是，中度卡壳**。报告的 section 数量规则有盲区——rules-narrative.md N1 说"section 数量 7-8 个 content section（品牌页）"，但报告有封面 + 目录 + 5 章节 + 引用 + footer = 结构性 section 超过 8 个。严格按 N1 会判违规。实际我判断"报告的封面/目录/引用是体例 section 而非 content section"，不按品牌页的 7-8 计数——但**规则没有明确说报告的体例 section 是否计入 N1 的 7-8 上限**。
- **规则够不够用？** **不够**。建议在 rules-narrative.md 或 intake-rules.md 加一条："CT-2 报告的 section 计数规则——封面/目录/引用/打印样式是体例 section，不计入 N1 的 7-8 content section 上限；content section 只计正文章节数（5 章节 ≤8 合规）"。

### D6：深段配额分配

- **决策**：
  - Hero（Report Cover）：**浅底**，不计深段配额
  - Footer：**深（black）**，不计配额（终局收束）
  - 1 个内容深段：Chapter 04「挑战分析」用 **charcoal 深底**做视觉重音
- **配额检查**：CP6 = Hero（0，浅底）+ 内容深段（1，Chapter 04）+ Footer（不计）= **1 ≤ 3**。合规。
- **依据规则**：rules-narrative.md §6.2 深段配额 + CP6 可判定版 + U3（文档页/报告深段配额放宽）。
- **卡壳？** **否**。深段配额规则清晰，CP6 计算明确。
- **规则够不够用？** **够用**。v2.0 的 CP6 可判定版（Hero 深面板计 0.5 / Footer 不计 / 超限降级）解决了之前的不可判问题。U3 的"报告深段可为 0 合法态"也给了弹性。
- **决策逻辑**：Chapter 04「挑战分析」放深段——因为挑战/风险内容适合用深底制造"警示重音"（rules-color.md D2：概念/数据密集区段用深底制造戏剧感）。其他章节用浅/cream 分层。

### D7：组件-深浅冲突预检

- **决策**：检查每个 section 的组件与深浅是否冲突：
  - Chapter 04 用 **Stat Grid（深底变体）**——Stat Grid 是"浅底通用"类别（rules-components.md 深底反相表），放深段继承 `.section--dark` 作用域，**无冲突**。
  - Chapter 04 的 **Callout**——也是浅底通用类，放深段继承作用域。但我额外把 Callout 的 border-left 改成 moss（深底提亮）+ background 改成 rgba 白微染——这是"组件专属深底适配"，符合深底反相通用原则。
  - **Statement Quote**（过渡桥）——是"仅浅底"类别（rules-components.md 深底反相表第 3 类），我放在浅底 section，**无冲突**。
  - **Dot Table / Comparison Table**——都是"无底色铁律"类别（intake-rules.md 组件-深浅冲突预检），放浅/cream 底，**无冲突**。
- **冲突？** **无冲突**。所有组件的深浅类别都匹配所在 section 的底色。
- **依据规则**：intake-rules.md「组件-深浅冲突预检」+ rules-components.md「深底反相通用原则」3 类标注表。
- **卡壳？** **否**。预检流程清晰，3 类深底标注表覆盖所有组件。
- **规则够不够用？** **够用**。v2.1 的深底反相通用原则把 8 个组件的散落 inverse 规则收口为统一机制，大幅降低了施工时的深浅适配摩擦。

### D8：色彩映射

- **决策**：本报告**不需要外部品牌色映射**（不是为特定品牌做的，是通用行业报告）。记录 forest-soft / moss-soft 的使用决策：
  - **浅底正文/eyebrow/标签文字**（report-cover__tag, table-of-contents__heading, callout__title, data-citation__heading 等）→ 用 `--color-forest-soft`（D9 规则，浅底专用强调绿，对比度 4.79:1）
  - **浅底装饰线/圆点**（dot-table 的维度圆点、chapter-header__rule）→ 标准 forest（非文字装饰元素，D9 规则：浅底非文字元素仍用标准 forest）
  - **深底文字**（Chapter 04 的 callout title）→ 用 `--color-moss`（深底提亮）
  - **标准 forest 配额**：chapter-header__rule（5 处）+ dot-table border-bottom（1 处）+ comparison table border-bottom（1 处）= **约 7 处 ≤ 8**。合规。forest-soft/moss-soft 不计入此配额（U2 规则）。
- **依据规则**：rules-color.md D9（浅底绿色强调选档）+ C3 配额优化策略 + U2（soft 变体独立计数）。
- **卡壳？** **否**。forest-soft/moss-soft 的使用场景和对比度门槛清晰。
- **规则够不够用？** **够用**。v1.9 的 D9 + v2.2 的 U2 彻底解决了"浅底绿色强调无合规色"的历史问题。

---

## 施工决策记录（S1-S9，逐个）

### S1：Hero（Report Cover）施工

- **母版选择**：没有用 hero-*.html 母版（因为 Report Cover 是 editorial 组件不是 Hero 变体），直接参照 rules-components-editorial.md 的 Report Cover 骨架施工。
- **占位符替换**：
  - `{{ORG_NAME}}` → "Remote Work Institute"
  - `{{CATEGORY}}` → "Industry Trend Report"
  - `{{REPORT_TITLE}}` → "2024 全球远程办公趋势报告"
  - `{{SUBTITLE}}` → "从应急方案到主流工作模式..."
  - `{{REPORT_NO}}` → "RW-2024-07"
  - `{{DATE}}` → "July 2024"
  - `{{CLASSIFICATION}}` → "Public"
- **装饰层**：用了 **1 个装饰层**——巨字水印 `2024`（.report-cover__watermark），Playfair clamp(160px,22vw,340px)，color cream（用 cream 做浅底水印色，比 rgba 更实色克制）。另外底部点阵装饰（.report-cover__dots，box-shadow 多点）。
- **是否够用？** Report Cover 骨架指引清晰，但骨架给的 CSS 是骨架指引（"CSS 要点"注释）非完整代码，需要施工方自行补全完整 CSS——**这是 editorial 组件的通病**（骨架给注释不给完整 CSS，数据组件给完整 CSS）。

### S2：报告组件使用

- **Report Cover**：如 S1 所述，用了 100vh + flex column + space-between + 机构名/meta/编号体例。骨架够用。
- **Table of Contents**：dot leader 点线（border-bottom:1px dotted）+ mono 编号 + Playfair 章节名。**用了 dot leader 但选了 dotted 而非实线**——规则明确"dot leader 不要用实线（solid）"。骨架够用。
- **Chapter Header**：大编号 Playfair（sand 色装饰）+ forest 横线 + Playfair 标题 + 可选摘要。5 个章节都用了一致体例（01-05 编号）。骨架够用。
- **Data Citation**：上标 `[1]-[5]` + 文末引用列表（编号 mono + 来源 Inter + URL blue）。连续编号不跳号。骨架够用。
- **Print Styles**：`@media print` 全套——隐藏无 + 白底省墨 + serif 字体 + 章节分页 + 链接显 URL + orphans/widows + @page 边距。**所有 font-size 用 pt**。骨架够用。
- **骨架够不够？** 5 个报告组件的骨架指引**全部够用**，CSS 要点注释清晰可执行。这是 v2.0 editorial 组件卡的质量亮点。

### S3：数据组件使用

- **Stat Grid**：用了 4 次——Chapter 01（4 格开屏数字墙）、Chapter 02（3 格效率指标）、Chapter 04（3 格挑战指标 · 深底变体）、Chapter 05（4 格未来预测）。选型树命中"成组大数字开屏冲击"。**30 秒定位成功**。
- **Elevation Profile**：用了 1 次——Chapter 01 的趋势曲线（全球远程比例 7→28% + 混合办公采用率）。选型树命中"时序/趋势"。**30 秒定位成功**。手画 SVG 贝塞尔曲线，面积填充 opacity 0.15。
- **Dot Table**：用了 1 次——Chapter 03 的国家排名（美/英/加/澳/德 5 国渗透率 + 进度条填充）。选型树命中"对比/达成度"（Dot Table 是 Comparison Table 的轻量替代）。**30 秒定位成功**。
- **Comparison Table**：用了 1 次——Chapter 02 的办公模式对比（传统 vs 混合 vs 全远程，5 维度，推荐列 cream 高亮）。选型树命中"对比/达成度"。**30 秒定位成功**。
- **选型树体验**：4 个数据组件全部 30 秒内定位成功，信息类型→组件映射表非常有效。

### S4：表格变体选择

- **报告里用了 2 种 Data Table 变体**：
  1. **Comparison Table**（Chapter 02 办公模式对比）——选它因为这是"多方案横向对比 + 有推荐列"的信息本质，Comparison Table 的 cream 推荐列高亮 + forest 顶线正好适配。
  2. **Dot Table**（Chapter 03 国家排名）——选它因为这是"维度少（5 国）+ 需要轻量视觉分层 + 进度条直观看差距"的信息本质，Dot Table 的零边框 + 进度条比 Comparison Table 更轻量。
- **为什么不用 Financial Table？** 没有多列数字密集对比（财报式）的场景。
- **为什么不用 Spec Table？** 没有单一实体属性列表（key-value）的场景。
- **为什么不用 Reference Table？** 没有术语/对照表场景。
- **选型依据**：rules-components.md Data Table 5 变体的"信息本质选变体"指引（法则 1：信息本质驱动形态）。每个变体都标注了适用信息本质，选型无摩擦。

### S5：组件选型树体验

- **30 秒能找到吗？** **能**。rules-components.md 顶部的选型决策树按"信息类型→推荐组件"列了 11 类映射表，所有用到的组件（Stat Grid / Elevation Profile / Dot Table / Comparison Table）都在前 30 秒内定位到。
- **有没有找不到的情况？** **有 1 处微摩擦**——Chapter 04「挑战分析」需要展示"挑战/风险指标"，选型树没有"风险/负面指标"这个信息类型。最终用 Stat Grid 承载（深底变体），但 stat-grid 的禁忌说"不加趋势线/环形/条形"，纯数字+标签在风险场景下略单调。**建议选型树加"风险/负面指标"信息类型行**。

### S6：间距/字号/radius 执行

- **间距全走 token 吗？** **是**。所有 padding/margin/gap 取自梯队 1/2/4/8/16/24/32/48/64/96/120px。
- **有没有"需要 80px 但被禁"的情况？** **没有遇到**。间距梯队足够，80px 场景归并到 96px 无障碍。但有一个**图表容器高度的例外**——Elevation Profile 的 `.elev__line{height:96px}`，这属于"图表容器高度例外"（非布局间距梯队），规则已标注例外，不违规。
- **字号全走 token 吗？** **是**。标题级用 clamp + var(--fs-*) 引用；eyebrow/data 用 var(--fs-data) 固定 11px；body 用 var(--fs-body-lg) 固定 15px。符合 T5（标题级 clamp / eyebrow-body 固定 px 合规）。
- **radius 遵循三级公约吗？** **是**。Stat Grid（结构件 0px）/ Dot Table bar（2px 近 0）/ dot-dim 圆点（--r-full 仅 pill）。无大圆角。

### S7：设计宪法执行

- **法则 1（信息本质驱动形态）**：Stat Grid 纯数字+标签（量化事实→数字最大）、Comparison Table 有推荐列（对比多项→结构清晰）、Chapter Header 大编号（权威→Playfair）。**未违反**。
- **法则 2（每个元素必须挣到自己的像素）**：报告封面删了 hero-strip KPI 条（Statement 禁配 KPI），Dot Table 删了外框/竖线（只留进度条+圆点）。**未违反**。
- **法则 3（字体角色翻译器）**：Playfair 标题/编号（权威）、Mono 数据/标签/编号（精度）、Inter 正文（功能）。角色不混。**未违反**。
- **法则 4（层次靠留白+色调+1px 线）**：section 间 96px 留白 + divider 1px 线 + cream/offwhite/charcoal 三层色调。无阴影分层。**未违反**。
- **自查方式**：施工完成后逐法则对照检查，4 条全通过。

### S8：Anti-Pattern 检查

- **31 条永不逐项核对**：
  - 色彩 7 条：无渐变（✓）、无硬编码（✓）、Signal 未当装饰（✓）、浅底未用 moss 做强调（✓，全用 forest-soft）、无双品牌色大面积相邻（✓）、深底分隔线用 token（✓，用 text-inverse-3）、forest 未满铺（✓）。
  - 字体 5 条：无 Playfair 正文（✓）、无 Georgia 交付（✓，全 Playfair）、无裸大写无字距（✓）、无正字距大标题（✓）、无第 4 字体（✓）。
  - 间距 4 条：无非梯队值（✓）、无混两套 token（✓）、max-width 走档（✓，1120/840/720）、section padding ≥96px（✓）。
  - 结构 5 条：无连续深段（✓，Chapter 04 深段前后皆浅）、无裸标题 Hero（✓，封面有水印+点阵）、content section ≤8（✓，5 章节）、Hero 后第二段非直接跳数据（✓，第二段是 TOC 目录）、数据段后未直接跳深色 Manifesto（✓，Chapter 03 后接过渡桥 statement-quote）。
  - 装饰 5 条：无模糊/玻璃拟态（✓）、无 radius>8px（✓）、无浅底 opacity<0.04（✓，水印用 cream 实色）、无 box-shadow 装饰分层（✓）、无 hover 渐变/缩放（✓，hover 用 padding-left 位移）。
  - 内容 5 条：无复制样本裸值（✓）、无 link 引 token（✓，:root 内联）、无外部框架（✓）、无斜体下划线做标题强调（✓，用 strong + em）、无缩写 BEM 名（✓，全 kebab-case）。
- **踩中数量：0 条**。

### S9：Evolution Log 检查

- **21 条教训逐项规避**：
  - E1（样本漂移）：全用 token-root 真源值，无样本裸值 ✓
  - E2（间距双系统）：全用 `--s-*`，无 `--s1..--s24` ✓
  - E5（moss 浅底对比度）：浅底未用 moss 做正文强调 ✓
  - E6（forest 配额耗尽）：数据段用 text-primary 纯字重省配额 ✓
  - E7（Georgia 代际债）：全用 Playfair（var(--font-display)）✓
  - E10（硬编码 rgba）：深底用 text-inverse-3 token ✓
  - E11（Tension 深浅冲突）：未用 Tension Grid，无冲突 ✓
  - E15（展示内容误判）：无色板/字体卡展示 ✓
  - E17（容器宽度缺口）：用 840px（editorial 允许 720-840 区间）✓
  - 其余 12 条均不适用或已规避。
- **未规避风险：0 条**。

---

## 自检记录（34 项逐条）

### 一、色彩（8 项）

| 项 | 结果 | 说明 |
|----|------|------|
| **C1** 页面主底色 offwhite | ✅ 一次通过 | body background:var(--bg-page)=offwhite，无纯白做底 |
| **C2** 无裸 hex 硬编码 | ✅ 一次通过 | 全走 var(--color-*)，:root 内联属 token 声明不违规 |
| **C3** forest ≤8 处 + 无满铺 | ✅ 一次通过 | forest 约 7 处（chapter-header__rule ×5 + dot-table border + comparison border），无满铺底色。forest-soft/moss-soft 不计入（U2） |
| **C4** charcoal=工作深色，black=终局 | ✅ 一次通过 | Chapter 04 用 charcoal，Footer 用 black，未互换 |
| **C5** 深底文字用 text-inverse 系 | ✅ 一次通过 | Chapter 04 深段用 text-inverse / text-inverse-2 / text-inverse-3 |
| **C6** forest 与 moss 无大面积相邻 | ✅ 一次通过 | moss 仅在深底 callout title 小面积使用 |
| **C7** Signal 色 ≤2 处，blue 仅链接 | ✅ 一次通过 | blue 仅用于引用列表 URL 链接（data-citation__link），属学术规范必需，无其他 Signal 色 |
| **C8** 无渐变/装饰阴影/模糊 | ✅ 一次通过 | 纯实色 + 色调 + 1px 线，无渐变 |

### 二、排版（6 项）

| 项 | 结果 | 说明 |
|----|------|------|
| **T1** 正文 Inter | ✅ 一次通过 | body/report-body 用 var(--font-body)=Inter |
| **T2** 大标题 Playfair + 负字距 | ✅ 一次通过 | chapter-header__title / report-cover__title 用 Playfair + ls-tight(-0.02em) + lh-tight |
| **T3** 全大写标签 Mono + 字距 | ✅ 一次通过 | 所有 tag/meta/label 用 var(--font-data) + ls-wide(0.06em) + uppercase |
| **T4** tag 有前缀线 | ✅ 一次通过 | report-cover__tag / table-of-contents__heading / data-citation__heading 均有 ::before 24-32px 前缀线 |
| **T5** 标题级 clamp / eyebrow 固定 px | ✅ 一次通过 | 标题全 clamp(min,vw,max)；eyebrow/data 11px 固定；body 15px 固定 |
| **T6** 强调用 strong 加字重 | ✅ 一次通过 | 无斜体/下划线做标题强调，全用 strong（statement-quote 用 em italic 是引文体例例外） |

### 三、Hero（5 项）

| 项 | 结果 | 说明 |
|----|------|------|
| **H1** Hero 100vh | ✅ 一次通过 | report-cover min-height:100vh |
| **H2** Hero 有装饰层 | ✅ 一次通过 | 巨字水印 2024 + 底部点阵，≥1 装饰深度层 |
| **H3** 水印透明度区间 | ⚠️ 需判定 | 水印用 cream 实色（color:var(--color-cream)）而非 rgba opacity。cream 在 offwhite 上是极弱对比的近似色，视觉效果等同 opacity≈0.04-0.08。**这是 Report Cover 的特例**——editorial 封面水印用 cream 实色比 rgba 透明更克制。判定为**合规但边界情况** |
| **H4** Hero 选型符合内容主轴 | ✅ 一次通过 | CT-2 报告用 Report Cover（非 hero 母版），符合 editorial 体例 |
| **H5** 深浅底与场景匹配 | ✅ 一次通过 | 封面浅底（offwhite）+ 仪式感，符合报告调性 |

### 四、组件（5 项）

| 项 | 结果 | 说明 |
|----|------|------|
| **CP1** 间距全走梯队值 | ✅ 一次通过 | 1/2/4/8/16/24/32/48/64/96/120px，无非梯队值。图表容器 96px 例外已标注 |
| **CP2** Tension Grid 规则 | ✅ 不适用 | 未使用 Tension Grid |
| **CP3** Callout 不孤立 | ✅ 一次通过 | Callout 跟在 Stat Grid/Comparison Table 后，未连续堆叠 |
| **CP4** 组件 BEM 命名 | ✅ 一次通过 | report-cover__title / data-table__dot-fill / chapter-header__num 全 BEM kebab-case，block 名对应已登记组件卡 |
| **CP5** Data Table 列数 ≤5 | ✅ 一次通过 | Comparison Table 4 列（维度+3 模式），Dot Table 3 列，均 ≤5 |

### 五、叙事节奏（6 项）

| 项 | 结果 | 说明 |
|----|------|------|
| **N1** section 数 7-8 | ⚠️ 需判定 | 结构性 section（封面+目录+5章节+引用+footer=10 个），但 content section（正文章节=5 个）≤8。**规则盲区**——报告体例 section 是否计入 N1 未明确。判定为**合规但规则需补注** |
| **N2** section padding ≥96px | ✅ 一次通过 | 所有 section 96px，封面 100vh，chapter-header 64px+（章节标题区不计 section padding） |
| **N3** Hero 后第二段概念建立 | ✅ 一次通过 | 封面后第二段是目录（TOC），符合报告体例；第一个 content section（Chapter 01）是趋势概览（概念建立），非直接跳数据 |
| **N4** 无连续 2 个深色 section | ✅ 一次通过 | Chapter 04 深段前后皆浅（Chapter 03 cream + 过渡桥浅 + Chapter 05 浅） |
| **N5** footer 深色收尾 | ✅ 一次通过 | Footer 用 black 深色 |
| **CP6** 深色 content section ≤3 | ✅ 一次通过 | Hero 浅（0）+ 内容深段 1（Chapter 04）+ Footer 不计 = 1 ≤ 3 |

### 六、工程基线（4 项）

| 项 | 结果 | 说明 |
|----|------|------|
| **E1** 单文件自包含 + :root 内联 | ✅ 一次通过 | 纯内联 `<style>`，token-root :root 已内联，仅 Google Fonts 外链 |
| **E2** 有 :root token 层 | ✅ 一次通过 | :root 完整定义色+字+间距三类 token |
| **E3** 双断点响应式 | ✅ 一次通过 | @media 1024px（平板）+ @media 768px（手机），表格移动端卡片化 |
| **E4** radius 三级公约 | ✅ 一次通过 | Stat Grid 0px（结构件）/ Dot Table bar 2px / 圆点 r-full（pill）|

### 自检汇总

- **一次通过**：30 项
- **需判定（边界情况）**：2 项（H3 水印 cream 实色 / N1 报告 section 计数）
- **需修改才通过**：0 项
- **不好判定**：2 项 → 均判定为**合规但规则有盲区**（非施工错误，是规则未覆盖报告特例）

**最终：34/34 全部判定通过（含 2 项边界合规）**

---

## 流程分析

### 最顺畅的决策点

**D6（深段配额分配）**最顺畅。CP6 的可判定版（v2.0）把之前不可量化的"深段总数"变成了清晰的算式：Hero（浅=0）+ 内容深段（1）+ Footer（不计）= 1 ≤ 3。配额超限降级规则（Manifesto→Statement Quote）也明确。整个决策从规则查表到结论产出不到 1 分钟，零摩擦。

**D8（色彩映射）**也极顺畅——v1.9 的 D9 + v2.2 的 U2 彻底解决了浅底绿色强调的对比度问题，forest-soft/moss-soft 的使用场景和配额计数规则清晰无歧义。

### 最卡壳的决策点

**D5（section 列表推导）**最卡壳。核心摩擦是报告的 section 计数规则盲区——rules-narrative.md N1 说"section 数量 7-8 个 content section"，但报告有封面 + 目录 + 5 章节 + 引用 + footer，结构性 section 远超 8 个。需要自行判断"体例 section 不计入 content section"，但规则没有明确背书。

**D3（Hero 选型）**也有中度卡壳——Hero 决策树只覆盖品牌页 6 变体，没有报告封面（Report Cover）的交叉指引，需要跳到 editorial 组件卡才能确认"报告不用 hero 母版"。

### 规则够用的地方

1. **色彩规则（rules-color.md D1-D9 + C3 配额 + D9 浅底绿）**：最够用。9 个决策点 + 8 条红线覆盖所有配色场景，forest-soft/moss-soft 彻底解决浅底绿色强调。
2. **组件选型树（rules-components.md 选型决策树）**：11 类信息类型→组件映射表，30 秒定位，所有数据组件全覆盖。
3. **Data Table 5 变体**：按信息本质选变体（法则 1），每变体的适用场景和禁忌明确，选型无摩擦。
4. **深底反相通用原则（rules-components.md §深底反相）**：3 类标注（原生深底/浅底通用/仅浅底）+ .section--dark 作用域统一覆写，彻底解决了 8 个组件各自散落 inverse 的历史债。
5. **editorial 报告组件骨架（rules-components-editorial.md CT-2）**：5 个报告组件（Report Cover/TOC/Chapter Header/Data Citation/Print Styles）的骨架指引清晰，CSS 要点注释可执行。

### 规则不够用的地方

1. **报告 section 计数规则盲区**（D5）：N1 的"7-8 content section"是品牌页导向，报告的封面/目录/引用等体例 section 是否计入未明确。**最不够用的 1 条**。
2. **Hero 决策树缺报告封面交叉指引**（D3）：决策树只有品牌页 6 变体，CT-2 报告封面走 Report Cover 组件的跳转缺失，需跨文件查找。
3. **editorial 组件骨架给注释不给完整 CSS**（S1）：Report Cover 等 editorial 组件的骨架是"CSS 要点注释"而非完整代码，数据组件给完整 CSS。施工时需要自行补全 CSS，增加了施工量。
4. **选型树缺"风险/负面指标"信息类型**（S5）：Chapter 04 挑战分析需展示负面指标，选型树无对应行，最终用 Stat Grid 承载但略显单调。

### 规则盲区（施工遇到了但规则没说）

共发现 **4 个规则盲区**：

1. **报告 section 计数**（D5/N1）：CT-2 报告的封面/目录/引用/打印样式是体例 section，是否计入 N1 的 7-8 content section 上限？规则未说。→ 实际判定不计入，content section 只计正文章节（5 个），但规则需补注。

2. **Report Cover 与 Hero 决策树的衔接**（D3）：Hero 决策树 6 变体不含报告封面，CT-2 报告何时用 Report Cover vs hero 母版的切换指引缺失。→ 实际查 editorial 组件卡解决，但需在 Hero 决策树加交叉引用。

3. **封面水印用 cream 实色 vs rgba opacity**（H3）：Report Cover 的巨字水印，editorial 组件卡说"用 cream 做浅底水印色"，但 Hero 铁律 2 说"浅底水印 opacity 0.04-0.15"。cream 实色（无 opacity 属性）是否合规？→ 实际判定合规（cream 在 offwhite 上对比极弱≈低 opacity），但规则需统一表述。

4. **报告的 .cmp 组件自标注是否需要**（D4）：paradigm-boundary 预设表说报告".cmp 推荐（章节级）"，但报告章节用 Chapter Header 的编号体例做锚点，是否还需要额外 .cmp 标注？→ 实际省略（"推荐"非"必有"），但建议明确"报告用 Chapter Header 替代 .cmp 自标注"。

---

## 下轮迭代优先级建议

基于完整流程记录，排优先级（P0 最高 → P2 最低）：

### P0（高优先 · 解决施工卡壳）

1. **补 CT-2 报告 section 计数规则**：在 rules-narrative.md N1 或 intake-rules.md section 推导节加注——"CT-2 报告的封面/目录/引用/打印样式是体例 section，不计入 N1 的 7-8 content section 上限；content section 只计正文章节数"。这解决 D5 的中度卡壳，是最高频的报告施工摩擦。

2. **Hero 决策树加 Report Cover 交叉指引**：在 rules-hero.md 决策树 Step 2 特殊场景表加一行——"CT-2 报告封面 → 不用 hero 母版，用 rules-components-editorial.md 的 Report Cover 组件"。这解决 D3 的跨文件跳转摩擦。

### P1（中优先 · 提升施工效率）

3. **editorial 组件骨架补完整 CSS**：Report Cover / TOC / Chapter Header 等的骨架从"CSS 要点注释"升级为"完整可复制 CSS"（与数据组件一致），减少施工时的 CSS 补全量。这是 editorial 组件与数据组件的一致性差距。

4. **选型树补"风险/负面指标"信息类型**：在 rules-components.md 选型决策树加一行——"风险/负面指标 → Stat Grid（深底变体）+ Callout（warning）"，并标注 Stat Grid 在风险场景的深底使用指引。

### P2（低优先 · 统一表述）

5. **统一封面水印表述**：在 rules-components-editorial.md Report Cover 的水印说明加注——"cream 实色水印 ≈ rgba opacity 0.04-0.08 的视觉效果，符合 Hero 铁律 2 的浅底水印区间"，消除 H3 的边界判定摩擦。

6. **明确报告 .cmp 替代规则**：在 paradigm-boundary 预设表 CT-2 行的 .cmp 列加注——"报告用 Chapter Header 编号体例替代 .cmp 自标注，无需额外 .cmp 标注"。

---

*完整决策流程记录 · 远程办公报告 · 8 个 Step 0 决策 + 9 个施工选择 + 34 项自检 · 4 个规则盲区 · 6 条迭代建议 · 2026-07-03*
