# Director's Treatment

## Director Brief
- Visual thesis: 一条狭长的调查走廊，五个证据逐个亮起，最终揭穿表演的真相
- Signature technique 1: 暗底+局部高亮 — 像台灯照亮证据桌，其余沉入黑暗
- Signature technique 2: 细线分割 + 证据编号 — 每个信号像案件卷宗的一页
- Signature technique 3: 引用块作为"原话武器" — 话术示例被单独陈列，不做装饰
- Motion rules: 仅滚动触发淡入，不主动运动；信号编号有延迟出现效果
- Typography rules: 标题用粗黑体，正文用细体，引用用等宽或斜体感

## Site Cinematic Grammar
- Page-shell logic: 单页垂直流，max-width 900px，两侧全黑 — 走廊效应
- Navigation posture: 无导航，只有右侧固定的信号进度条（5个点）
- Framing discipline: 所有元素左对齐，不做居中 — 制造不安定感
- Density cadence: 标题区空旷 → 信号区密集（话术+潜台词）→ 对比表居中 → REACT 区收束
- Recurring material layers: 深黑背景 + grain 纹理 + 细灰线分割
- Allowed composition families: Corridor
- What may repeat: 信号卡片的编号+标题结构（但内部布局各不同）
- What must vary page to page: 仅单页
- Demo uniqueness guardrail: 不用 hero + features + CTA 三段式

## Page Arc

### Page: 带节奏识别
- Page-role scene: 调查终结报告 — 把隐藏的模式摊在桌面上
- Page scene thesis: 从模糊的不安到清晰的证据链，最后给出行动框架
- One big idea: 五个证据像五盏灯依次亮起，照亮同一个行为模式的全貌
- Hero dominance statement: 主标题巨大且孤立在暗色中，下面只有一行定性的话 — 不解释不推销，像调查报告的封面
- Restraint statement: 不做渐变、不做玻璃效果、不做悬浮卡片、不做圆角、不做 emoji
- Material thesis: 纸张感 + 打字机感，grain 纹理让暗底不空洞
- Typography thesis: 标题 48px+ 粗黑，正文 16px 细体，引用用等宽 + 暗金左边框
- Narrative arc: Hook（定性一句话）→ 证据链（5信号逐层）→ 对比（真诚 vs 表演）→ 行动（REACT）
- Hero archetype: Isolated headline — 巨大标题独占暗色空间，下方只有一行小字定性
- Signature composition: 五个信号沿左侧时间线排列，每个信号的编号、标题、表现、话术、潜台词各有不同的视觉处理方式
- Grid fallback test: 如果变成卡片网格，就失去了"调查推进"的压迫感和递进关系 — 每个证据的重量不同，网格会抹平这种层级
- Shared system holdback: 信号卡片的共用样式等页面级组合锁定后再提取
- UI exposure guardrail: 不暴露 director/film 名称在最终页面中
- What this page must not inherit from previous demos: 无 prior demos
- Section sequence: 见下方

### Scene 1: Hook / Opening
- Beat: 定性开场 — "带节奏"的本质是立功表演
- Function: 建立紧张感和好奇心
- Archetype: Isolated headline + single statement
- Composition ref: 大标题居中偏左，副标题在下方 60px 处，极小字号
- Camera ref: 从暗到亮 — 标题先出现，副标题延迟 400ms
- Interaction ref: 无
- Visual elements: 一条细灰线从标题下方延伸，作为走廊的"入口"
- Why this exists: 不是功能介绍，是定性判断 — 直接给出结论

### Scene 2-6: 五种信号（证据链）
- Beat: 逐个呈现证据，从最普遍到最隐蔽
- Function: 教育 + 识别能力
- Archetype: Evidence card — 编号 + 标题 + 表现（列表）+ 话术（引用块）+ 潜台词（暗金）
- Composition ref: 左侧时间线 + 右侧内容区，每个信号的内部布局不同
- Camera ref: 滚动触发 — 编号先亮 → 标题 → 内容
- Interaction ref: hover 时引用块左边框变红（从暗金到警示红）
- Visual elements: 时间线（垂直线 + 圆点）、编号圆形徽章、引用块暗金左边框
- Why this exists: 这是核心内容 — 5 种识别信号

### Scene 7: 对比表
- Beat: 真诚预警 vs 表演型预警
- Function: 提供判断工具
- Archetype: Side-by-side comparison
- Composition ref: 两列对比，不是表格而是并排的卡片组，每行一个维度
- Camera ref: 整体淡入 + 逐行延迟
- Interaction ref: hover 行高亮
- Visual elements: 左侧绿色（真诚），右侧红色（表演），中间虚线分割
- Why this exists: 给用户判断标准，不只是负面清单

### Scene 8: REACT 框架
- Beat: 从识别到行动
- Function: 可操作的应对方案
- Archetype: Assembly line — 5 步顺序框架
- Composition ref: 水平流程，每个字母一个卡片，R-E-A-C-T 横向排列
- Camera ref: 从左到右逐个出现
- Interaction ref: hover 卡片上移 + 阴影
- Visual elements: 大写字母徽章（圆形，暗金底白字），下方解释
- Why this exists: 不只是识别，还要行动
