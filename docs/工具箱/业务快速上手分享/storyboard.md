# Director's Treatment

## Director Brief
- Visual thesis: 情报文件感 — 像翻阅一份从档案室取出的机密材料，每一页都是一个被"照亮"的文件片段
- Signature technique 1: 暖色暗底 + grain 纹理 — 模拟 70s 胶片放大后的粗颗粒质感
- Signature technique 2: 蒙太奇编号序列 — 信息用紧凑编号呈现，像情报简报的条目
- Signature technique 3: Vignette 聚光灯 — 页面中心亮、边缘暗，像台灯下的文件
- Motion rules: 翻页用水平滑动（像翻文件），内容用淡入（像灯打开），克制不花哨
- Typography rules: 粗体大标题（思源黑体 Heavy）+ 等宽数据标注（JetBrains Mono）+ 正文（思源黑体 Regular）

## Site Cinematic Grammar
- Page-shell logic: 全屏翻页，每页 100vh，左右箭头/键盘翻页，底部进度条
- Navigation posture: 底部极简进度条 + 页码，无顶部导航
- Framing discipline: 内容居中，最大宽度 900px（corridor 走廊感），两侧留暗
- Density cadence: 封面极简 → 骨架模型密集 → 穿透问题中等 → 调研动作密集 → 诊断表密集 → 附表中等 → 结尾极简
- Recurring material layers: grain 纹理覆盖层（全局）、vignette 暗角（每页）、分隔线用金色细线
- Allowed composition families: corridor（走廊式纵深）
- What may repeat: 页码位置、grain 纹理、进度条样式、分隔线
- What must vary page to page: 每页的排版结构（表格/列表/编号/矩阵）、信息密度、留白量
- Demo uniqueness guardrail: 不做圆角卡片、不做渐变背景、不做 pill 标签，用线和块

## Page Arc

### Page: 演示（唯一页面，12 slides 翻页）

- Page-role scene: 一份机密文件被逐页翻阅
- Page scene thesis: 每翻一页，对陌生业务的了解就深一层
- One big idea: 走廊式纵深 — 信息像走廊尽头的光，越走越清晰
- Hero dominance statement: 封面用超大粗体标题 + 编号 01-04 四步法预告，像文件封面印章
- Restraint statement: 不做任何装饰性动画，不做渐变，信息本身就是视觉
- Material thesis: grain 纹理 + 暖色暗底 + 金色线条分隔
- Typography thesis: 粗体块状标题（思源黑体 Heavy，全大写编号）+ 等宽数据 + 正文
- Narrative arc: B4 Prologue(封面) → B11 Tutorial(四步法) → B10 Deep Dive(穿透问题) → B8 Evidence Wall(调研动作) → B9 Data Bombardment(诊断表) → B13 Flashback(附表) → B25 Black Screen(结尾)
- Hero archetype: #28 Chapter Zero — 封面作为"第零章"，建立档案感
- Signature composition: 走廊式纵深布局 — 内容被约束在窄幅中央，两侧是深色空间
- Grid fallback test: 如果变成标准 PPT 模板（标题+正文），就失去了"翻阅机密文件"的沉浸感
- Shared system holdback: 页码、进度条、grain 层在所有 slide 定型后再统一
- UI exposure guardrail: 不暴露"slide"、"page"等元数据，用 SECTION 01/02/03 编号
- What this page must not inherit from previous demos: 不用 card grid，不用渐变，不用圆角

### Slide 序列（12 页）

---

### Slide 1: 封面
- Beat: B4 Prologue
- Function: 封面 — 建立主题和氛围
- Archetype: 大标题居中 + 副标题 + 四步法预告编号
- Composition: 窄幅居中，上下留暗
- Camera: fade from black
- Interaction: 无
- Visual elements: grain 纹理、vignette、金色细线分隔标题和副标题
- Content: 标题"如何快速了解一个陌生业务" + 副标题"四步法框架" + 四步编号预告
- Why this exists: 建立档案感，预告结构

### Slide 2: 方法论概览
- Beat: B3 The Promise
- Function: 承诺 — 告诉听众将获得什么
- Archetype: 四步法横向编号序列
- Composition: 01-04 四个编号横排，每个配一句话
- Camera: stagger reveal（依次出现）
- Interaction: 无
- Visual elements: 金色编号、细线连接
- Content: 01 骨架模型 → 02 穿透问题 → 03 交叉验证 → 04 一页纸诊断
- Why this exists: 给出路线图，让听众有预期

### Slide 3: Step 01 — 骨架模型（9 个问题）
- Beat: B11 Tutorial
- Function: 第一步详解 — 商业模式画布 9 问
- Archetype: 3x3 网格（9 个问题）
- Composition: 3x3 格子，每格一个问题
- Camera: grid reveal（格子依次亮起）
- Interaction: 无
- Visual elements: 编号块、细线分隔
- Content: 9 个问题的完整内容
- Why this exists: 第一步的核心工具

### Slide 4: Step 01 — 怎么做
- Beat: B11 Tutorial（续）
- Function: 第一步操作指南
- Archetype: 窄幅文字 + 高亮 box
- Composition: 中央窄幅文字区，底部高亮操作建议
- Camera: slide up
- Interaction: 无
- Visual elements: 高亮 box 用金色边框
- Content: "找一张大白纸或在线白板，花1小时从已有资料和访谈中把9个格子填满。填不上的就是关键信息缺口，优先去补齐。"
- Why this exists: 操作建议，从理论到实践

### Slide 5: Step 02 — 穿透式问题（价值与需求 + 流程与运转）
- Beat: B10 Deep Dive
- Function: 第二步前两个维度详解
- Archetype: 双栏对比（左右各一个维度）
- Composition: 左"价值与需求"右"流程与运转"
- Camera: split reveal（左右同时出现）
- Interaction: 无
- Visual elements: 维度编号、金色竖线分隔
- Content: 价值与需求 3 问 + 流程与运转 3 问
- Why this exists: 核心方法论——灵魂拷问

### Slide 6: Step 02 — 穿透式问题（财务与数字 + 风险与不确定性）
- Beat: B10 Deep Dive（续）
- Function: 第二步后两个维度详解
- Archetype: 双栏对比
- Composition: 左"财务与数字"右"风险与不确定性"
- Camera: split reveal
- Interaction: 无
- Visual elements: 维度编号、金色竖线分隔
- Content: 财务与数字 3 问 + 风险与不确定性 2 问
- Why this exists: 核心方法论后半部分

### Slide 7: Step 03 — 调研动作（访谈）
- Beat: B7 The Encounter
- Function: 第三步 — 访谈方法
- Archetype: 表格（角色 × 问题 × 陷阱）
- Composition: 窄幅表格，4 行
- Camera: row stagger
- Interaction: 无
- Visual elements: 表格用细线，角色列用金色
- Content: 业务负责人/一线/财务/外部客户 四行
- Why this exists: 第一套调研动作

### Slide 8: Step 03 — 调研动作（看数据 + 代入角色）
- Beat: B8 Evidence Wall + B11 Tutorial
- Function: 第三步 — 数据和实操
- Archetype: 上下分区（数据在上，实操在下）
- Composition: 上半"看数据"3 要点，下半"代入角色"3 场景
- Camera: vertical cascade
- Interaction: 无
- Visual elements: 分区用金色横线
- Content: 看数据 + 代入角色实操
- Why this exists: 第二三套调研动作

### Slide 9: Step 04 — 一页纸诊断表
- Beat: B9 Data Bombardment
- Function: 第四步 — 诊断表
- Archetype: 表格（维度 × 状态 × 健康 × 证据）
- Composition: 窄幅表格，5 行
- Camera: fade in
- Interaction: 无
- Visual elements: 绿/黄/红 色标、表格细线
- Content: 5 维度诊断表
- Why this exists: 最终交付物

### Slide 10: Step 04 — 三个结论
- Beat: B18 The Confrontation
- Function: 第四步 — 三个核心结论
- Archetype: 三行编号列表
- Composition: 窄幅，三个大编号 ①②③
- Camera: stagger
- Interaction: 无
- Visual elements: 金色编号圆圈
- Content: 3 个成功要素 + 第一个月解决什么 + 一句话解释
- Why this exists: 强迫给出判断，不是模糊分析

### Slide 11: 附表 — 不同业务类型快速透视
- Beat: B13 Flashback
- Function: 附加工具
- Archetype: 矩阵表格（类型 × 问题）
- Composition: 5 行表格
- Camera: slide up
- Interaction: 无
- Visual elements: 类型列用金色标签
- Content: SaaS/电商/内容社区/制造业/线下连锁
- Why this exists: 不同业务类型的速查工具

### Slide 12: 结尾
- Beat: B25 Black Screen
- Function: 结束 — 留白收束
- Archetype: 极简文字居中
- Composition: 中央一句话
- Camera: fade to black
- Interaction: 无
- Visual elements: grain 纹理、vignette
- Content: "了解一个业务，不是看它做了什么，而是看它靠什么活着。"
- Why this exists: 一句话钉住核心洞察
