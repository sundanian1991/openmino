# Director's Treatment

## Director Brief
- Visual thesis: 一本从最后一页开始读的商业杂志——每个翻开的页面都在回答上一页的"为什么"，直到你站在 2024 Q4 的起点，看着一切发生。
- Signature technique 1: **倒叙导航** → 顶部进度条从右到左填充（时间倒流），右侧锚点从未来到过去排列
- Signature technique 2: **模糊到清晰的揭示** → 关键数字以 blur(20px) 状态出现，渐变为 sharp，像记忆在倒放中变得清晰
- Signature technique 3: **"为什么？"驱动的翻页** → 每页底部不写"下一页"，而是用一个问题驱动读者继续
- Motion rules: 最多 1 个 heavy interaction per page。不用 count-up，不用 fadeUp 超过 2 次
- Typography rules: 标题用 Noto Serif SC（杂志封面感），正文和数据都用 Noto Sans SC

## Site Cinematic Grammar
- Page-shell logic: 全宽杂志版面，max-width 1200px 居中。每页 min-height 100vh
- Navigation posture: 顶部 2px 进度条（从右向左填充）。右侧 4 个浮动锚点圆点。每页底部"为什么？"引导文字
- Framing discipline: 每个 section 像杂志版面块，有眉标、标题、正文、数据。用分隔线和留白区分，不用卡片阴影
- Density cadence: 大数字（高密度视觉）→ 解释文字（中密度）→ 留白（呼吸）→ 下一个揭示
- Recurring material layers: 米白底 + 铜金强调线 + 深蓝锚点文字 + 浅灰分隔线 + 极淡点阵底纹
- Allowed composition families: 杂志编辑网格、居中纪念碑、全幅填充
- What may repeat: 铜金分隔线、眉标样式、底部"为什么？"引导、顶部进度条
- What must vary page to page: 主视觉构图、数字展示方式、入场动画、section 排列方向

## Page 01: 终态（2026 年 4 月）
- Arc variant: B5 Cold Open → B9 Data Bombardment → B14 The Pivot → B24 The Loop
- Beat count: 4
- One big idea: **100 亿 Token**——一个开发者 8 个月的消耗量。¥40 订阅的实际成本是 $15,000+
- Hero dominance: 满屏只有一个巨大数字 "10,000,000,000" + "$15,000+"，像杂志封面。不加任何装饰，就两个数字。
- Restraint: 不做图表、不做时间线、不做对比。只有数字 + 两行解释 + 一个"为什么？"
- Material thesis: 米白背景上的深蓝大字 + 铜金分隔线。像杂志封面上印刷的金属油墨标题。

### Scene 1: 封面数字
- Beat: B5 Cold Open from End
- Function: Hero — 数据砸脸，零上下文
- Composition: 垂直居中，两个巨大数字（10,000,000,000 + $15,000+），左侧铜金竖线装饰
- Interaction: 无，数字靠入场动画（blur → sharp）制造冲击
- Why: 倒叙的起点——先让观众看到终点

### Scene 2: 成本拆解
- Beat: B9 Data Bombardment
- Function: 把 $15,000 拆成具体构成
- Composition: 60/40 编辑网格，左侧解释文字，右侧 3 组数据
- Interaction: hover 数据项时底线滑动显示细分数据
- Why: 读者看到 100 亿 Token 后会问"怎么算到 $15,000 的？"

### Scene 3: 转折点
- Beat: B14 The Pivot
- Function: Visual Break — 从数据冲击转向问题
- Composition: 全屏留白 + 居中短句
- Interaction: 无
- Why: 在数据轰炸后需要呼吸空间，让读者消化信息

### Scene 4: 为什么？
- Beat: B24 The Loop
- Function: 驱动翻页
- Composition: 居中短句 "这怎么会发生？"
- Interaction: 点击翻到 Page 02
- Why: 不用"下一页"按钮，用问题作为钩子

## Page 02: 催化剂（2026 年 2 月）
- Arc variant: B11 The Tutorial → B9 Data Bombardment → B18 Confrontation → B25 Black Screen
- Beat count: 4
- One big idea: **6-10x** — Agent 让每个开发者的 Token 消耗变成原来的 6-10 倍
- Hero dominance: 6-10x 乘数以巨大金色数字居中，周围有从四个方向汇聚的数据流线条
- Restraint: 不做完整的 Agent 工作原理图。只做"倍率"这一个信息

### Scene 1: 催化剂乘数
- Beat: B11 The Tutorial
- Function: Hero — 6-10x 倍率
- Composition: 居中，巨大 "6-10x"，四条铜金线从四角汇聚
- Interaction: hover 时汇聚线微动（parallax）
- Why: 这是 Page 01"为什么？"的答案

### Scene 2: 模型进步线
- Beat: B9 Data Bombardment
- Function: Timeline — K2.5 → GLM-5 → MiMo 的能力增长
- Composition: 垂直列表，每个模型一行（名称 + 参数 + 日期）
- Interaction: hover 行时微抬
- Why: 模型越来越强 = 每次调用消耗更多 Token

### Scene 3: 芯片供给
- Beat: B18 Confrontation
- Function: 挑战读者认知 — "你以为模型进步是好事？"
- Composition: 偏右对齐，芯片供给对比数据
- Interaction: 无
- Why: 打破读者天真预期 — 模型进步 + 芯片受限 = 更贵的 Token

### Scene 4: 为什么？
- Beat: B25 Black Screen
- Function: 驱动翻页
- Composition: 极简 — "为什么 Agent 消耗这么大？"
- Why: 用极简方式结束这一页

## Page 03: 争夺战（2025-2026 年初）
- Arc variant: B8 Evidence Wall → B15 Parallel Stories → B14 The Pivot → B24 The Loop
- Beat count: 4
- One big idea: **五种"货币"同时流通**——每个厂商都在争夺定义权
- Hero dominance: 五列并排的"计量单位牌"，每列有自己的颜色标识，像机场货币兑换屏

### Scene 1: 五种计量单位
- Beat: B8 Evidence Wall
- Function: Hero — 五列计量单位牌
- Composition: 5 列不等宽面板，从深蓝到铜金的渐变序列
- Interaction: hover 某列时其他列变淡
- Why: 混乱的根源——五种定义同时存在

### Scene 2: 汇率变化
- Beat: B15 Parallel Stories
- Function: 同一服务的五种价格对比
- Composition: 全宽滚动条，展示实时换算
- Interaction: 跑马灯自动滚动，hover 暂停
- Why: 让读者感受到——同一次调用，不同计量单位价格差 3-5 倍

### Scene 3: 定义权争夺
- Beat: B14 The Pivot
- Function: Pullquote — 厂商争夺定义权的本质
- Composition: 居中全屏引用
- Interaction: 无
- Why: 这不只是技术混乱，是商业权力博弈

### Scene 4: 为什么？
- Beat: B24 The Loop
- Function: 驱动翻页 — "这一切从哪里开始？"
- Composition: 极简居中
- Why: 最后一页了。用问题引导回到起点

## Page 04: 起点（2024 Q4）
- Arc variant: B13 Flashback → B10 Deep Dive → B20 The Invitation → B22 The Farewell
- Beat count: 4
- One big idea: **一台定价机被砸到了地板价**——DeepSeek 带头降价，一切从这里开始
- Hero dominance: 时间线从底部向上生长——底部是铜金色"种子"圆点，整条线像树一样分支出关键事件
- Restraint: 只做 5-7 个关键里程碑。不预测未来

### Scene 1: 起点标记
- Beat: B13 Flashback
- Function: Hero — "起点"
- Composition: 居中，"起点"大标题 + 底部铜金圆点
- Interaction: 无
- Why: 倒叙的终点——回到一切开始的地方

### Scene 2: 降价时间线
- Beat: B10 Deep Dive
- Function: 从底部向上的关键事件
- Composition: 垂直时间线，从底部生长到顶部
- Interaction: hover 事件时展开详情
- Why: 正序展示时间线（与全站倒叙形成对比），因为这是"起源"

### Scene 3: 可复用模式
- Beat: B20 The Invitation
- Function: 从历史中提炼的模式
- Composition: 窄栏阅读宽度，堆叠的引用卡片
- Interaction: 无
- Why: 让读者带走有用的东西——不只是故事，还有模式

### Scene 4: 结束
- Beat: B22 The Farewell
- Function: Footer — 站点的结束
- Composition: 极简居中 — "调查结束。起点在此。"
- Why: 像杂志最后一页的版权页——安静、克制、完整

## Shared System
- Navigation: 顶部 2px 进度条（从右到左填充，渐变铜金色）。右侧 4 个锚点圆点（固定定位，hover 显示时间标签）
- Page transitions: 翻页效果 — 当前页向左翻转，新页从右侧进入
- Spacing: Section 间距 120px / mobile 80px。Section 内元素间距 32px / 24px
- Typography:
  - H1: Noto Serif SC 700, clamp(3rem, 6vw, 5rem)
  - H2: Noto Serif SC 600, clamp(2rem, 4vw, 3rem)
  - Data: Noto Sans SC 700, clamp(2.5rem, 5vw, 4.5rem)
  - Body: Noto Sans SC 400, 1rem / 1.7
  - Overline: Noto Sans SC 500, 0.75rem, letter-spacing 0.15em
- Repeated motifs: 铜金分隔线、左侧铜金竖线、旋转页面标记
