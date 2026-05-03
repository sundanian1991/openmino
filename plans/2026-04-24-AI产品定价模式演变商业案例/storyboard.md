# Director's Treatment

## Director Brief
- Visual thesis: 这不是报告，是调查档案——有人把真相藏在了数字里，我们要一层层剥开
- Signature technique 1: **第四面墙打破** → 直接对读者发问，"你以为 ¥40 就能用一个月？"——像电影里角色突然转身对着镜头
- Signature technique 2: **快速蒙太奇数据揭露** → 数字突然放大、在段落中间砸下一个关键数据（如 100亿、70%、93%），像电影里突然插入的股价闪屏
- Signature technique 3: **类比弹窗 / 降维讲解** → 复杂概念用类比拆解（电信套餐、手机合约机），像 Margot Robbie 在浴缸里讲 CDO
- Motion rules: 没有华丽的滚动动画。只有数据从模糊到清晰、数字从 0 跳到目标值、关键段落突然高亮。运动是信息本身，不是装饰
- Typography rules: 等宽字体展示原始数据（JetBrains Mono），衬线体写结论（Noto Serif SC），无衬线体做正文（Noto Sans SC）。三种字体切换 = 三种叙事声音

## Site Cinematic Grammar
- Page-shell logic: 每一页都是一份"证据"。页面不是章节，是"卷宗"。顶部只有页码和标题（像 SEC 文件），没有导航栏。导航在底部作为"目录索引"
- Navigation posture: 无顶栏。每页末尾有"下一页"和"上一页"按钮，用等宽字体写的页码（01/04 → 02/04）。像翻案卷
- Framing discipline: 页面内容最大宽度 900px（像文档），但关键数据段会突然撑满全屏（100vw），制造"数据溢出来了"的感觉
- Density cadence: 快-慢-快。一个密集数据段 → 大片空白 + 一个结论句 → 又突然砸一组数据。不均匀，不像普通网站的等距 80px gap
- Recurring material layers: 等宽字体数据块（像终端输出）、红/绿数字、脚注标记（小数字引用）、类比弹窗（圆角框 + 对话感文字）
- Allowed composition families: evidence wall（证据墙）、data punch（数据冲击）、typewriter block（打字机文本）
- What may repeat: 脚注样式、类比弹窗的视觉格式、红绿数字的颜色语义
- What must vary page to page: 数据密度、页面总长度、全屏冲击段的数量和位置
- Demo uniqueness guardrail: 禁止卡片堆叠、禁止左文右图 hero、禁止暗色+单一暖色强调。必须是"调查档案"而非"报告"或"演示"

## Page Arc

### 页面 01: 首页 — 核心论点
**Director**: Adam McKay
**Arc variant**: Default (B5 → B9 → B18 → B8 → B21 → B25)
**Beat count**: 6

| Beat # | Beat Name | → Function | → Archetype | Director Justification |
|--------|-----------|------------|-------------|----------------------|
| 1 | B5 Cold Open from End | Hero #26 Data Punch | 直接砸出最震撼的数字 | McKay 开场从不铺垫——直接从最戏剧性的数据开始 |
| 2 | B9 Data Bombardment | Data Dashboard / Stats | 一组关键数据密集轰炸 | 像电影里连续闪过的房价暴跌数字 |
| 3 | B18 The Confrontation | Quote / Pullquote | 挑战读者认知 | "90% 的开发者搞不清楚自己花了多少"——让人不舒服的真相 |
| 4 | B8 Evidence Wall | Article Grid (3 列) | 参与者格局（三派并） | 多组证据同时出现，让人到信息量 |
| 5 | B21 The Mission | Scroll Story | 引导进入下一页 | "往下翻，看这一切是怎么发生的" |
| 6 | B25 Black Screen | Minimal Footer | 骤停，没有传统 footer | McKay 不给你舒服地离开 |

### 页面 02: 时间线 — 战争地图
**Arc variant**: B13 (Flashback) + B12 (Montage) + B14 (Pivot)
**Beat count**: 5

| Beat # | Beat Name | → Function | Director Justification |
|--------|-----------|------------|----------------------|
| 1 | B13 Flashback | Timeline #7 | 从起点开始，按序展开关键事件 |
| 2 | B12 Montage | Marquee / Ticker + Stats | 模型进步线 + 芯片供给线，快速滚动的参数 |
| 3 | B9 Data Bombardment | Comparison Table | 套餐价格对比表格——直接比数字 |
| 4 | B14 The Pivot | Visual Break | "等等，这些数字根本不能直接比"——认知转折 |
| 5 | B19 Quiet Moment | Quote | 留白 + 一个结论："计量单位即定价权" |

### 页面 03: 定价迷宫 — 数据对比
**Arc variant**: B11 (Tutorial) + B15 (Parallel Stories) + B8 (Evidence Wall)
**Beat count**: 6

| Beat # | Beat Name | → Function | Director Justification |
|--------|-----------|------------|----------------------|
| 1 | B11 The Tutorial | Process / Steps | 五种计量单位逐一拆解——像电影里的类比讲解 |
| 2 | B15 Parallel Stories | Tabbed Content | 模型厂商 vs 云平台——两条路线并行 |
| 3 | B8 Evidence Wall | Data Dashboard | 入门档 ¥40-50 区间实际用量对比 |
| 4 | B9 Data Bombardment | Stats Counter | Agent 消耗数据（100亿 Token、70% 浪费） |
| 5 | B18 The Confrontation | FAQ / Accordion | 反模式——踩过的坑 |
| 6 | B23 The Cliffhanger | Related Content | "这只是现状。接下来看未来" |

### 页面 04: 洞察与预判 — 可复用模式
**Arc variant**: B16 (Authority) + B10 (Deep Dive) + B24 (The Loop)
**Beat count**: 5

| Beat # | Beat Name | → Function | Director Justification |
|--------|-----------|------------|----------------------|
| 1 | B16 The Authority | Stats Counter | 实战清单总览——5+4+5 条 |
| 2 | B10 Deep Dive | Featured Article × 4 | 四个洞察逐一深挖 |
| 3 | B6 World Exploration | Category Map | 未来预判四个趋势 |
| 4 | B24 The Loop | Quote | 回到首页的数字，但这次你已经理解了它的全部含义 |
| 5 | B25 Black Screen | Minimal Footer | "调查结束。" |

---

## Page: 01 — 首页（核心论点）

- Page-role scene: 开场戏——直接把你扔进数据风暴
- Page scene thesis: 你不是在买编程工具，你是在参与一场算力战争。你的 ¥40 订阅，是这场战争中最小的筹码
- One big idea: **100 亿 Token**——一个开发者 8 个月的消耗量。这个数字大到荒谬，而这就是整篇文章的起点
- Hero dominance statement: 满屏只有一个巨大数字 "10,000,000,000" 加上标注 "一个开发者 8 个月消耗的 Token 数"——没有渐变，没有装饰，就一个数字糊在你脸上，像彭博终端上的价格闪屏
- Restraint statement: 不用任何动画。数字从 0 跳到 100 亿（count-up），然后就停了。不加闪烁、不加粒子、不加背景动效
- Material thesis: 纯黑背景（#0a0a0f），白色等宽数字，红色强调。像深夜的交易大厅，只有屏幕亮着
- Typography thesis: 数字用 JetBrains Mono（等宽，像数据终端），结论用 Noto Serif SC（有权威感），正文用 Noto Sans SC（干净可读）
- Narrative arc: B5 Cold Open → B9 Data Bombardment → B18 Confrontation → B8 Evidence Wall → B21 The Mission → B25 Black Screen
- Hero archetype: #26 Data Punch（Pattern G: Full-Bleed Impact 变形）
- Signature composition: 全屏黑色背景 + 巨大等宽数字居中 + 下方极小的标注文字。数字和标注的比例差距越大越好——像 Sergio Leone 的 Extreme Close Up
- Grid fallback test: 如果这个页面变成卡片网格，就失去了"一个数字砸在脸上"的冲击力。Data Punch 的核心是"少即是多"，不是展示更多信息
- Shared system holdback: 导航栏、footer、通用卡片样式全部等到 4 页的 composition 都锁了再提取
- UI exposure guardrail: 没有顶部导航。每页是一个独立的"卷宗"，靠底部的前/后按钮导航
- What this page must not inherit from previous demos: 左文右图的 hero、暖色强调色、卡片式分节、slide 式等距滚动

### Section Sequence:

#### Scene 1: Cold Open — Data Punch (Hero)
- Beat: B5 Cold Open from End
- Function: Hero / Data Punch
- Archetype: #26 (Pattern G 变形)
- Composition ref: Full-bleed, single massive number
- Camera ref: Extreme close-up → slow zoom out to reveal context
- Interaction ref: Count-up animation (0 → 10,000,000,000)
- Visual elements: 底部微型标注（等宽小字）+ 右侧浮动 badge（"¥40 订阅" 对比 "实际 $15,000+ API 价"）
- Why this exists: 开场的数字冲击——你以为是 ¥40 的事，其实是 $15,000+ 的事

#### Scene 2: Data Bombardment — 关键指标
- Beat: B9 Data Bombardment
- Function: Stats Counter
- Archetype: 4 宫格，每个一个关键数字
- Composition ref: 2x2 grid，每个格子只有一个数字 + 标签
- Camera ref: 快速平移，像新闻标题滚动
- Interaction ref: 每个数字 staggered count-up（间隔 0.15s）
- Visual elements: 每个数字下方小字标注来源
- Why this exists: 从"一个数字"扩散到"一组数字"——证明这不是孤立现象
- Numbers: 7+ 平台 | 5 种计量 | 70% Token 浪费 | 93% 节省（订阅 vs API）

#### Scene 3: The Confrontation — 认知挑战
- Beat: B18 The Confrontation
- Function: Quote / Pullquote
- Archetype: 大字号引用，直接质问
- Composition ref: 全屏宽度，文字居中，上下大片空白
- Camera ref: 角色突然转身对着镜头
- Interaction ref: none（静态冲击）
- Visual elements: 红色引号标记
- Why this exists: "直接比数字毫无意义，90% 开发者踩坑。"——打破舒适区

#### Scene 4: Evidence Wall — 参与者格局
- Beat: B8 Evidence Wall
- Function: Article Grid → 变形为 3 列证据卡
- Archetype: 3 列布局：模型厂商 / 云平台 / 海外对标
- Composition ref: 3 列不等宽（2:2:1），每列一个证据块
- Camera ref: 俯视调查板，所有证据铺开
- Interaction ref: hover 显示隐藏详情（像翻证据）
- Visual elements: 每列顶部状态 pill（专卖店 / 超市 / 三巨头）
- Why this exists: 让观众看到全貌——不是简单的"谁便宜"，是三股势力在打不同的仗

#### Scene 5: The Mission — 引导进入
- Beat: B21 The Mission
- Function: Scroll Story
- Archetype: 一行引导文字 + 下箭头
- Composition ref: 居中短句 + 等宽字体写的"01 → 02"
- Camera ref: 推镜头，推向下一页
- Interaction ref: hover 按钮时背景微亮
- Why this exists: 温和但不软弱——"往下看，看这一切是怎么发生的"

#### Scene 6: Black Screen
- Beat: B25 Black Screen
- Function: Minimal Footer
- Archetype: 纯黑 + 等宽字体写的页码 "01 / 04"
- Why this exists: 不给你传统 footer 的安慰。你知道这不是结束。

---

## Page: 02 — 时间线（战争地图）

- Page-role scene: 追溯一切是怎么开始的——不是线性叙述，是"证据墙"
- Page scene thesis: 这不是一条平静的河流。这是一场在 18 个月内发生的价格战，每个节点都是一个决定
- One big idea: 时间线上每个事件不是孤立新闻——它们构成了一条因果链，每个事件都在推下一个
- Hero dominance statement: 时间线不是垂直列表，是从左到右的水平滑动带，每个事件像一个被钉在板上的便签。重要的事件会"突出"板面
- Restraint statement: 不做复杂的交互时间线。就是水平滚动 + 事件卡片。让内容说话
- Material thesis: 像真正的调查板——灰色背景，便利贴色块，细线连接因果
- Typography thesis: 时间用等宽（像日期戳），事件标题用衬线体（像新闻标题），描述用无衬线
- Narrative arc: B13 → B12 → B9 → B14 → B19

### Scene Sequence:

#### Scene 1: Flashback — 时间线主轴
- Beat: B13 Flashback
- Function: Timeline #7
- Archetype: 水平滚动时间带
- Composition ref: 固定高度的横向滚动容器，事件卡片沿轴排列
- Camera ref: 横向跟踪镜头，沿墙慢慢走
- Interaction ref: 水平滚动（CSS scroll-snap），事件间距不等（重要的间距更大）
- Visual elements: 事件日期 pill + 类别色块（降价 / 上线 / 收紧 / 切换）
- Why this exists: 18 个月的战争全貌

#### Scene 2: Montage — 模型与芯片
- Beat: B12 Montage
- Function: Marquee / Ticker + Stats
- Archetype: 两行水平滚动带
- Composition ref: 上下两行：上面是模型参数增长，下面是芯片市占率变化
- Camera ref: 快速蒙太奇
- Interaction ref: CSS marquee 动画（自动滚动），hover 暂停
- Visual elements: 数字用等宽 + 增长箭头（↑）
- Why this exists: 两条底层驱动力——模型变强 + 芯片变便宜——同时发生

#### Scene 3: Data Bombardment — 套餐价格对比
- Beat: B9 Data Bombardment
- Function: Comparison Table
- Archetype: 7 行 × 4 列价格矩阵
- Composition ref: 全宽表格，不是卡片
- Camera ref: 俯视——所有数据铺开
- Interaction ref: hover 行高亮，列排序（可选）
- Visual elements: 最低价用绿色标注，最高价用红色
- Why this exists: 直接比数字——然后下一页告诉你为什么这样比没意义

#### Scene 4: The Pivot — 认知转折
- Beat: B14 The Pivot
- Function: Visual Break
- Archetype: 全屏深色 + 一句话
- Composition ref: 100vh，文字垂直居中
- Camera ref: 突然切到黑场，然后一个声音说"等等"
- Interaction ref: none
- Why this exists: "但直接比数字毫无意义。因为每个平台用的计量单位不同。"——转折

#### Scene 5: Quiet Moment
- Beat: B19 Quiet Moment
- Function: Quote
- Archetype: 大字引用
- Composition ref: 居中，上下留白
- Interaction ref: none
- Why this exists: "计量单位即定价权"——全篇最有价值的一句话，放在这里让它沉淀

---

## Page: 03 — 定价迷宫（数据对比）

- Page-role scene: 走进迷宫——你以为你在比较价格，其实你在比较五种不同的语言
- Page scene thesis: 五种计量单位就像五种货币，你不做汇率换算就比价格，一定会踩坑
- One big idea: API 请求、Prompt、Token、Credit、时间窗口——这是五种完全不同的语言
- Hero dominance statement: 五种计量单位排成一排，像五种外语的字母表。每个下面有一个"翻译"——告诉你它实际等于多少次提问
- Restraint statement: 不做可交互的"计算器"。就做静态翻译，让读者自己意识到差距
- Material thesis: 像货币兑换牌——每种计量一个面板，标注"汇率"
- Typography thesis: 计量名称用大写等宽（像机场汇率牌），翻译用小字无衬线

### Scene Sequence:

#### Scene 1: Tutorial — 五种计量拆解
- Beat: B11 The Tutorial
- Function: Process / Steps
- Archetype: 5 个垂直排列的步骤，每个一种计量
- Composition ref: 每个步骤 = 左侧计量名称 + 右侧翻译（"1 Prompt ≈ 15-20 次模型调用 = 1200-1600 API 请求"）
- Camera ref: 像电影里的类比讲解——每个概念配一个简单例子
- Interaction ref: 点击展开更多细节（像折叠的类比弹窗）
- Visual elements: 每个计量一个透明度图标（低/中/高）
- Why this exists: 这是整站最有实用价值的部分——教读者看懂

#### Scene 2: Parallel Stories — 两条路线
- Beat: B15 Parallel Stories
- Function: Tabbed Content
- Archetype: 两个 tab：专卖店 vs 超市
- Composition ref: tab 切换，每个 tab 内容独立
- Camera ref: 平行叙事，像电影里同时跟踪两条故事线
- Interaction ref: tab 切换
- Why this exists: 两种商业路线的根本差异

#### Scene 3: Evidence Wall — 实际用量对比
- Beat: B8 Evidence Wall
- Function: Data Dashboard
- Archetype: 横向柱状图对比
- Composition ref: 每个平台一根柱子，宽度 = 实际可用量
- Camera ref: 柱状图，一眼看出谁给的"看起来多"但"实际少"
- Interaction ref: hover 显示具体数字
- Visual elements: 柱子颜色按透明度分级（绿=透明，黄=中等，红=不透明）
- Why this exists: 视觉化展示"同样 ¥40，实际差距有多大"

#### Scene 4: Data Bombardment — Agent 消耗
- Beat: B9 Data Bombardment
- Function: Stats Counter
- Archetype: 3 个关键数字横向排列
- Composition ref: 3 个全屏宽度数据段
- Camera ref: 像电影里突然闪过的股价——快速、密集
- Interaction ref: count-up on scroll
- Why this exists: 70% 浪费 + 100 亿消耗 + 93% 节省——证明订阅是地板不是天花板

#### Scene 5: Confrontation — 反模式
- Beat: B18 The Confrontation
- Function: FAQ / Accordion
- Archetype: 3 个折叠项：Cursor 退款、计量混乱、饥饿营销
- Composition ref: 全宽折叠面板
- Interaction ref: 点击展开
- Why this exists: 告诉你踩过的坑——不是正面的知识，是反面的教训

#### Scene 6: Cliffhanger
- Beat: B23 The Cliffhanger
- Function: Related Content
- Archetype: 一行文字 + 箭头
- Composition ref: 居中短句
- Why this exists: "这只是现状。未来会怎样？"

---

## Page: 04 — 洞察与预判（可复用模式）

- Page-role scene: 结案陈词——把前面所有的线索串起来，给出可复用的结论
- Page scene thesis: 不是关于 AI 定价的知识。是关于任何新产品定价都可以复用的模式
- One big idea: 计量单位即定价权。补贴→收紧→分层。入口到生态。——这三个模式放之四海皆准
- Hero dominance statement: 三个大标题占满首屏，像法庭上的结案陈词要点。下面才是详细内容
- Restraint statement: 不再堆数据。这一页全是文字和结论。让前面的数据自己说话
- Material thesis: 像一份结案报告——黑色背景，白色文字，红色关键词
- Typography thesis: 标题用超大号衬线体（有分量感），正文用无衬线，关键结论用等宽红色标注

### Scene Sequence:

#### Scene 1: Authority — 清单总览
- Beat: B16 The Authority
- Function: Stats Counter
- Archetype: 3 个数字（5 定价决策 + 4 转型检查 + 5 反模式）
- Composition ref: 横向 3 列
- Why this exists: 告诉读者你在这篇文章里能带走什么

#### Scene 2: Deep Dive — 四个洞察
- Beat: B10 Deep Dive
- Function: Featured Article × 4
- Archetype: 4 个全屏宽度的洞察段落，每个一个主题
- Composition ref: 每个洞察 = 大标题 + 解释 + 可复用模式（标注框）
- Camera ref: 推镜头——每个洞察都是一次深入
- Interaction ref: none（纯阅读）
- Why this exists: 全文最有价值的部分——可以带走复用的知识

#### Scene 3: World Exploration — 四个趋势
- Beat: B6 World Exploration
- Function: Category Map
- Archetype: 2x2 网格
- Composition ref: 每个趋势一个卡片（比前面小一号，因为是"展望"不是"事实"）
- Why this exists: 从已知到未知——未来会怎样

#### Scene 4: The Loop
- Beat: B24 The Loop
- Function: Quote
- Archetype: 回到首页的数字
- Composition ref: 和 Scene 1 一样的布局，但文字不同——"现在你知道 100 亿 Token 意味着什么了"
- Why this exists: 闭环。同样的数字，但现在你已经理解了它的全部含义

#### Scene 5: Black Screen
- Beat: B25 Black Screen
- Function: Minimal Footer
- Archetype: "调查结束。" + 04 / 04
- Why this exists: 不像传统 footer 那样留一堆链接。就是结束。

---

## Shared System (Holdback — 等到所有页 composition 锁定后提取)
- Navigation: 无顶栏，底部前/后按钮
- Footer: 极简，只有页码
- Spacing rhythm: 不均匀——数据密集段 40px gap，结论段 120px+ gap
- Typography system: JetBrains Mono (data) + Noto Serif SC (thesis) + Noto Sans SC (body)
- Repeated motifs: 脚注、类比弹窗、红绿数字
- Uniqueness check: 不是卡片堆叠，不是左文右图，不是暗色+暖色强调。是"调查档案"。
