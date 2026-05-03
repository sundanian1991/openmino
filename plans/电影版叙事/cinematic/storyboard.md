# Director's Treatment — Storyboard

## Site Cinematic Grammar

- Page-shell logic: 幻灯片式全屏布局，每页 100vw × 100vh，通过翻页/滑动切换
- Navigation posture: 底部页码指示器 + 右侧幕指示器（五幕标签，当前幕 amber 高亮）
- Framing discipline: 每页内容 1200px 最大宽度，垂直居中偏上 10%，两侧留白
- Density cadence: 封面（低）→ 个人体验（中）→ 时间线（高）→ 过渡（极低）→ 对比（高）→ 过渡（极低）→ 调查（高）→ 过渡（极低）→ 规律（中）→ 过渡（极低）→ 趋势（低）→ 收尾（极低）
- Recurring material layers: 全局 grain 纹理，scan line 用于转折点强调
- Allowed composition families: 居中声明、左右分栏、纵向列表、三栏对比、全屏数据
- What may repeat: grain 纹理、amber 强调色、等宽字体数据、幕间过渡页格式
- What must vary page to page: 入场动效（至少 4 种）、每页的 signature composition
- Demo uniqueness guardrail: 不做通用 SaaS 页面，不做数据仪表盘，不做居中 hero + CTA

## Narrative Beat Map

全片 26 页对应五幕，每幕之间有过渡页：

| 幕 | 页码范围 | 页数 | 叙事功能 | 核心问题 |
|---|---------|------|---------|---------|
| 一·幻觉 | P1-3 | 3 | 建立错觉 | "你以为这是无限的" |
| 过渡 A→B | P4 | 1 | 翻页 | "无限不再无限" |
| 二·崩塌 | P5-9 | 5 | 打破幻想 | "不限量为什么撑不住" |
| 过渡 B→C | P10 | 1 | 翻页 | "算力不够用，消耗翻了10倍" |
| 三·调查 | P11-14 | 4 | 深挖真相 | "你付的钱花在了哪" |
| 过渡 C→D | P15 | 1 | 翻页 | "所有赛道都走这三步" |
| 四·规律 | P16-22 | 7 | 提炼规律 | "三步式节奏" |
| 过渡 D→E | P23 | 1 | 翻页 | "规律清楚了，看趋势" |
| 五·未来 | P24-26 | 3 | 终局收束 | "终局是什么" |

## Page Scenes

### Scene 1: P1 Cover — 封面

- Page-role scene: 开场，建立整个演示的基调
- Page scene thesis: 一句话锁定整个案例的核心洞察
- One big idea: "AI 大模型定价，精确重演了手机流量套餐的 20 年历史"
- Hero dominance statement: 超大字号居中，"20年"用 amber 高亮，底部微弱 scan line 像老式电视屏幕
- Restraint statement: 不做动画标题、不做粒子背景、不做打字机效果
- Material thesis: 深色底 + grain + 底部 scan line
- Typography thesis: 标题 48px 冷白 bold，"20年" 48px amber bold，副标题 18px 灰色
- Signature composition: 全屏居中，上方 35% 留白，标题居中偏下，副标题在标题下方 24px
- Entrance: fadeUp（整个标题块从下往上淡入）

---

### Scene 2: P2 个人体验 — "你的一天"

- Page-role scene: 用一个人的真实体验建立共鸣
- Page scene thesis: 一个工程师的 Token 消耗从"随便用"到"精打细算"
- One big idea: 2 月 vs 12 月，消耗增长 6 倍
- Hero dominance statement: 左侧个人引用（blockquote 样式），右侧数据对比（两个大数字并排）
- Restraint statement: 不做头像、不做头像照片
- Material thesis: 左侧引用用 teal left-border，右侧数字用 amber monospace 大字号
- Typography thesis: 引言 20px 冷白 italic，数字 64px amber monospace，标签 14px 灰色
- Signature composition: 左右分栏（40/60），左侧引用 + 人物描述，右侧两个大数字对比 + "6倍" 标签
- Entrance: slideInLeft（左侧引用滑入）+ counterUp（右侧数字从 0 跳动到目标值）

---

### Scene 3: P3 时间线 — "18 个月发生了什么"

- Page-role scene: 事实铺陈，建立时间感
- Page scene thesis: 18 个月的价格演变，浓缩在一条纵轴上
- One big idea: 从降价到收紧到命名转变，每一个节点都改变了规则
- Hero dominance statement: 纵向时间轴，左侧时间标签（amber），右侧事件描述（冷白），7 个关键节点
- Restraint statement: 不做水平时间线、不做动画连线
- Material thesis: 时间轴线用 teal，当前节点用 amber 圆点标记
- Typography thesis: 时间标签 13px amber monospace，事件标题 18px 冷白 bold，描述 14px 灰色
- Signature composition: 左侧 20% 时间轴 + 圆点，右侧 80% 事件纵向排列，间距紧凑
- Entrance: cascade（从上到下逐个淡入，间隔 150ms）

---

### Scene 4: 过渡 A→B — "无限不再无限"

- Page-role scene: 幕间过渡，翻篇
- Page scene thesis: 用一句话打破第一幕的幻觉
- One big idea: "但当所有人都在用，无限就不再无限了。"
- Hero dominance statement: 全屏居中，一句话 + 一个 SVG 图形（从"∞"符号逐渐碎裂成离散的点）
- Restraint statement: 不加任何解释、不加第二个元素
- Material thesis: 纯深色底，琥珀色文字，SVG 用 teal + amber 渐变
- Typography thesis: 24px 冷白 italic，居中
- Signature composition: 上方 40% 留白 → 文字居中 → SVG 在文字下方 32px → 下方 30% 留白
- Entrance: text fade（文字淡入）+ svg morph（SVG 从完整到碎裂）

---

### Scene 5: P4 参与者格局 — "两条路线"

- Page-role scene: 呈现战场全貌
- Page scene thesis: 模型厂商（专卖店）和云平台（超市）是两条完全不同的路线
- One big idea: 两条路线，七家玩家，一个战场
- Hero dominance statement: 左右分栏对比，左侧专卖店（4 家），右侧超市（3 家），每家一行
- Restraint statement: 不做 logo、不做品牌色
- Material thesis: 两栏用不同背景色（左侧 teal-tinted，右侧 neutral dark），中间 amber 分隔线
- Typography thesis: 栏标题 16px bold amber，玩家名 18px 冷白，策略描述 14px 灰色
- Signature composition: 左右 50/50，中间 2px amber 分隔线，底部一行总结
- Entrance: splitSlide（左右同时从两侧滑入）

---

### Scene 6: P5 价格锚点 — "同样 40 块"

- Page-role scene: 数据对比，制造冲击
- Page scene thesis: 同样 ¥40-50/月，实际可用量差异巨大
- One big idea: 直接比数字毫无意义
- Hero dominance statement: 7 家平台横向排列，每家一个"月费 → 额度 → 实际等效"的三行卡片
- Restraint statement: 不做可排序表格、不做 hover 展开
- Material thesis: 卡片用 dark border，月费行 amber 高亮
- Typography thesis: 平台名 16px bold 冷白，月费 24px amber monospace，等效描述 13px 灰色
- Signature composition: 横向 7 列卡片等宽排列，紧凑间距，底部一行结论
- Entrance: staggerCards（卡片从左到右依次淡入，间隔 100ms）

---

### Scene 7: P6 计量单位混乱 — "90% 踩坑"

- Page-role scene: 信息最密集的一页，制造"看不懂"的焦虑
- Page scene thesis: 五种计量体系，透明度从高到低，每种都有自己的陷阱
- One big idea: 五种计量，三种理解方式，90% 的人看不懂
- Hero dominance statement: 纵向 5 行，每行：计量方式名（左）→ 透明度指示器（中）→ 用户感知陷阱（右）
- Restraint statement: 不做可交互排序、不做展开详情
- Material thesis: 透明度用 5 个 amber 圆点表示（5=最透明），每行底部 teal 细线分隔
- Typography thesis: 计量名 16px bold 冷白，透明度 14px amber，陷阱描述 14px 灰色
- Signature composition: 全宽表格样式，表头 amber 背景，行交替深浅背景
- Entrance: slideDown（表头先出现，然后逐行下落）

---

### Scene 8: P7 算力暗战 — "三层芯片格局"

- Page-role scene: 视觉冲击力最强的页面之一
- Page scene thesis: 英伟达→国产中低端→华为突破，三层阶梯
- One big idea: 谁控制算力，谁就控制定价
- Hero dominance statement: 左侧 SVG 三层阶梯图（从下到上：国产中低端 → 华为 950 超节点 → 英伟达紧缺），右侧三行描述
- Restraint statement: 不做芯片照片、不做 3D 渲染
- Material thesis: SVG 阶梯用 teal → amber → red 三色渐变（紧缺=red），箭头向上标注"突破"
- Typography thesis: 层级名 20px bold，描述 14px 灰色，关键数字 amber monospace
- Signature composition: 左侧 45% SVG 图形，右侧 55% 文字描述，底部 DeepSeek 原话引用
- Entrance: svgDraw（SVG 阶梯从下到上逐层绘制）+ textFade（文字随后淡入）

---

### Scene 9: P8 定价天花板 — "DeepSeek V4"

- Page-role scene: 用数据证明趋势
- Page scene thesis: V4 1.6T 参数只激活 49B，成本暴降 73%
- One big idea: "昇腾 950 批量上市后价格大幅下调"
- Hero dominance statement: 定价表三行（V4-Pro / V4-Flash / GPT-5），下方一行 DeepSeek 官方原话引用
- Restraint statement: 不做复杂表格、不做 hover 对比
- Material thesis: 表格行用 alternating dark rows，V4-Pro 行 amber left-border 强调
- Typography thesis: 模型名 16px bold 冷白，价格 18px amber monospace，原话 16px 冷白 italic
- Signature composition: 上方定价表（紧凑），下方原话引用（amber left-border，大量留白）
- Entrance: tableBuild（表格逐行出现）+ quoteFade（引用最后淡入）

---

### Scene 10: 过渡 B→C — "算力不够用"

- Page-role scene: 幕间过渡
- Page scene thesis: 从"供给不够"转向"消耗太大"
- One big idea: "算力不够用。但更致命的，是有人让算力消耗翻了 10 倍。"
- Hero dominance statement: 全屏居中，一句话 + SVG 爆炸箭头（从 1× 到 10×）
- Restraint statement: 不加任何解释
- Material thesis: amber 箭头向上，从细到粗
- Typography thesis: 24px 冷白 italic
- Signature composition: 上方 35% 留白 → 文字 → SVG 箭头 → 下方 30% 留白
- Entrance: textFade + arrowGrow（箭头从短变长）

---

### Scene 11: P9 OpenClaw — "Agent 是颠覆者"

- Page-role scene: 揭示 Token 消耗爆炸的原因
- Page scene thesis: 一个 Agent 任务 = 几十次模型调用
- One big idea: 8 个月 100 亿 Token，API 价 $15,000+，Max plan 只花 $800
- Hero dominance statement: 顶部一行大数字 "$15,000 → $800"（amber → green），下方 3 个支撑数据点
- Restraint statement: 不做价格计算动画
- Material thesis: 大数字用 amber → red → green 渐变箭头连接
- Typography thesis: 大数字 56px amber/green monospace，标签 14px 灰色
- Signature composition: 顶部大数字居中（60% 高度），下方 3 个数据点横向等分
- Entrance: counterUp（大数字从 0 跳到目标值）+ staggerFade（下方数据点依次淡入）

---

### Scene 12: P10 Token 构成 — "你付的钱花在了哪"

- Page-role scene: 数据可视化页
- Page scene thesis: 70% 是浪费，代码生成只占 5-15%
- One big idea: 你以为在买代码生成，实际在买文件读取
- Hero dominance statement: 左侧 SVG 横向堆叠条形图（5 段颜色不同），右侧 5 行数据标注
- Restraint statement: 不做饼图、不做动画
- Material thesis: 条形图用 teal 渐变，"代码生成"段用 amber 强调（因为这是用户最关心的）
- Typography thesis: 类别名 14px 冷白，占比 18px amber monospace
- Signature composition: 左侧 55% SVG 条形图，右侧 45% 数据列表，底部一行结论
- Entrance: barGrow（条形图从左到右展开）+ textFade

---

### Scene 13: P11 IPO 浪潮 — "资本化的定价压力"

- Page-role scene: 从市场回到资本视角
- Page scene thesis: 上市公司必须证明商业可持续性
- One big idea: 智谱 Coding Plan 两个月 ARR 破亿
- Hero dominance statement: 左右两张"档案卡"（智谱 / MiniMax），每家：上市时间 + 募资 + 关键数据 + 定价信号
- Restraint statement: 不做股价图表
- Material thesis: 档案卡用 thin border + 顶部 amber 细线
- Typography thesis: 公司名 18px bold 冷白，数据 14px 灰色，关键数字 amber
- Signature composition: 左右 50/50 卡片，间距大，底部一行总结
- Entrance: cardFlip（两张卡片从下往上翻转出现）

---

### Scene 14: P12 跨越鸿沟 — "从实验到生产"

- Page-role scene: 第三幕的最后一个信息点
- Page scene thesis: 90% 在实验，仅 41% 落地
- One big idea: 跨越鸿沟的关键不是模型能力，而是可信赖度
- Hero dominance statement: 左侧大数字对比（90% vs 41%），右侧引用（Gartner + 戴雨森）
- Restraint statement: 不做鸿沟图表
- Material thesis: 90% 用 red-tinted，41% 用 amber，中间用 thin line 分隔
- Typography thesis: 数字 72px red/amber monospace，引用 16px 灰色 italic
- Signature composition: 左侧 40% 大数字，右侧 60% 两行引用，底部结论
- Entrance: counterUp + quoteSlide

---

### Scene 15: 过渡 C→D — "所有赛道都走这三步"

- Page-role scene: 幕间过渡，从调查转向规律
- Page scene thesis: 混乱中藏着规律
- One big idea: "这看起来像一场混乱。但所有互联网赛道，都走同样的三步。"
- Hero dominance statement: 全屏居中，一句话 + SVG 三步箭头（补贴 → 收紧 → 分层）
- Restraint statement: 不加任何解释
- Material thesis: amber 三步箭头，从左到右
- Typography thesis: 24px 冷白 italic
- Signature composition: 上方 35% 留白 → 文字 → SVG 三步箭头 → 下方 30% 留白
- Entrance: textFade + arrowSequence（三步箭头依次出现）

---

### Scene 16: P13 电信类比 — "20 年精确重演"

- Page-role scene: 核心类比页
- Page scene thesis: 话费套餐 → 流量套餐 → 不限量降速 → 按 GB 精打细算 = AI 的精确重演
- One big idea: 历史不会重复，但会押韵
- Hero dominance statement: 上下对照表，上面电信四阶段，下面 AI 四阶段，一一对应
- Restraint statement: 不做双线时间轴
- Material thesis: 电信行用 teal 背景，AI 行用 dark 背景，对应列用 amber 连接线
- Typography thesis: 年份 14px amber monospace，描述 16px 冷白
- Signature composition: 上下两张表，中间 amber 虚线连接对应行
- Entrance: tableBuild（上表先出现，下表跟随）

---

### Scene 17: P14 三段式节奏 — "补贴→收紧→分层"

- Page-role scene: 规律提炼
- Page scene thesis: 所有互联网赛道都走这三步
- One big idea: 补贴即投资，收紧即筛选，分层即利润
- Hero dominance statement: 横向三段，每段一个阶段名 + 目的 + AI 案例
- Restraint statement: 不做流程图
- Material thesis: 三段用 amber 箭头连接（→），每段一个图标（SVG 极简符号）
- Typography thesis: 阶段名 24px amber bold，目的 16px 冷白，案例 14px 灰色
- Signature composition: 横向三段等分，中间 amber 箭头，底部口诀
- Entrance: segmentSequence（三段从左到右依次出现，间隔 200ms）

---

### Scene 18: P15 计量即权力

- Page-role scene: 核心洞察之一
- Page scene thesis: 谁定义计量单位，谁就掌握定价权
- One big idea: 模糊计量利于早期获客，透明计量利于长期信任
- Hero dominance statement: 左侧核心声明（大字号），右侧计量演变箭头（API → Prompt → Token → Credit）
- Restraint statement: 不做复杂图表
- Material thesis: 演变箭头用 amber，越来越粗（表示越来越透明）
- Typography thesis: 核心声明 28px 冷白 bold，演变标签 14px amber
- Signature composition: 左侧 55% 声明 + 解释，右侧 45% 演变箭头
- Entrance: statementFade + arrowSequence

---

### Scene 19: P16 入口获客生态锁客

- Page-role scene: 从编程到全模态的升级路径
- Page scene thesis: ¥29 买到的不只是代码补全，是 AI 多媒体工作室
- One big idea: 高频刚需入口 + 低频高价值场景 = 生态锁定
- Hero dominance statement: 左侧路径图（编程 → 全模态 → 生态），右侧 MiniMax Token Plan 实际包含的内容列表
- Restraint statement: 不做产品截图
- Material thesis: 路径用 amber 阶梯，每级一个 SVG 图标（代码、图片、语音、音乐、视频）
- Typography thesis: 路径节点 18px amber bold，内容 14px 灰色
- Signature composition: 左侧 40% 阶梯路径，右侧 60% 内容列表
- Entrance: stepSequence（阶梯从下到上逐级出现）+ listFade

---

### Scene 20: P17 开源模型定价权悖论

- Page-role scene: 反直觉的洞察
- Page scene thesis: DeepSeek 不卖订阅，只卖 API，但压制定价上限
- One big idea: 定价权来自服务便利性，而非模型独占性
- Hero dominance statement: 顶部一行核心洞察（大字号），下方 3 个数据点支撑
- Restraint statement: 不做模型能力对比图
- Material thesis: 核心洞察用 amber 底色背景（唯一一页有背景色的高亮）
- Typography thesis: 洞察 24px 冷白 bold，数据 16px 灰色
- Signature composition: 上方 amber-tinted 洞察块（全宽），下方 3 个数据点横向等分
- Entrance: highlightSlide（洞察块从左侧滑入）+ staggerFade

---

### Scene 21: P18 国内 vs 海外

- Page-role scene: 对比页
- Page scene thesis: 同一个世界，两套游戏规则
- One big idea: 你买到的便宜，是因为有人在替你卷
- Hero dominance statement: 左右分栏，左侧国内，右侧海外，三行对比
- Restraint statement: 不做世界地图
- Material thesis: 左栏 teal-tinted，右栏 amber-tinted，中间 thin line 分隔
- Typography thesis: 栏标题 18px bold，对比项 16px 冷白
- Signature composition: 左右 50/50，底部小米 MiMo 定价案例
- Entrance: splitSlide

---

### Scene 22: P19 反模式 — "别踩的坑"

- Page-role scene: 实战经验
- Page scene thesis: 三个真实案例，三个教训
- One big idea: Cursor 退款风波 → 定价模式切换必须渐进
- Hero dominance statement: 纵向 3 行，每行：案例名 + 后果 + 教训
- Restraint statement: 不做 checkbox
- Material thesis: 每行左侧 red warning 三角（SVG），底部 teal 细线分隔
- Typography thesis: 案例名 18px bold 冷白，后果 14px red，教训 14px 灰色
- Signature composition: 全宽纵向排列，紧凑间距
- Entrance: slideInLeft（每行从左侧滑入，间隔 150ms）

---

### Scene 23: 过渡 D→E — "看趋势"

- Page-role scene: 最后一幕的过渡
- Page scene thesis: 规律清楚了，看终局
- One big idea: "规律已经清楚了。下一步，看四条趋势线。"
- Hero dominance statement: 全屏居中，一句话 + SVG 四条发散线（暗示四条趋势线）
- Restraint statement: 不加任何解释
- Material thesis: amber 四条线从中心发散到四个方向
- Typography thesis: 24px 冷白 italic
- Signature composition: 上方 35% 留白 → 文字 → SVG 发散线 → 下方 30% 留白
- Entrance: textFade + linesRadiate（四条线从中心向外辐射）

---

### Scene 24: P20-23 四条趋势线

> 四条趋势线合并为一页，保持节奏紧凑

- Page-role scene: 未来预判
- Page scene thesis: 四条趋势线，指向同一个终局
- One big idea: Token Plan 的价格战会继续，但利润空间来自"服务溢价"而非"算力差价"
- Hero dominance statement: 2×2 网格，每个趋势一个卡片（趋势名 + 一句话 + 关键数据）
- Restraint statement: 不做预测图表
- Material thesis: 卡片用 dark border + 顶部 amber 细线
- Typography thesis: 趋势名 18px bold amber，一句话 14px 冷白，数据 13px 灰色
- Signature composition: 2×2 网格等分，卡片间距大
- Entrance: staggerCards（四张卡片依次淡入，间隔 150ms）

---

### Scene 25: P24 一句话总结 + P25 决策口诀

> 总结和口诀合并为一页，干净利落

- Page-role scene: 收束
- Page scene thesis: 从"卖工具使用权"到"卖算力资源包"
- One big idea: 计量即权力，补贴即投资，收紧即筛选，分层即利润
- Hero dominance statement: 上方核心结论（大字号），下方决策口诀（amber 底色块）
- Restraint statement: 不加任何额外内容
- Material thesis: 口诀块用 amber 底色背景（全场第二次使用）
- Typography thesis: 结论 32px 冷白 bold，口诀 20px amber bold
- Signature composition: 上方 40% 留白 → 结论 → 口诀块 → 下方 20% 留白
- Entrance: statementFade + highlightSlide

---

### Scene 26: P26 封底

- Page-role scene: 极简收束
- Page scene thesis: 干净利落地结束
- One big idea: AI 大模型定价模式演变 | 2026.04
- Hero dominance statement: 全屏居中，一行文字 + 底部极细 amber 线
- Restraint statement: 不加 logo、不加二维码、不加额外信息
- Material thesis: 纯深色底，底部 1px amber 线
- Typography thesis: 16px 灰色
- Signature composition: 全屏居中
- Entrance: slowFade（2 秒淡入）
