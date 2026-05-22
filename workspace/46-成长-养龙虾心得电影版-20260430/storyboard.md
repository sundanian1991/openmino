# Director's Treatment

## Director Brief

- **Visual thesis**: 文字是唯一的主角，空间是文字的舞台。克制到只剩必要元素，让读者自己在留白中感受重量。
- **Signature technique 1 — Static observation**: 固定机位，不推不拉。页面主体不动，滚动时元素慢淡入（0.8s+），像站在三米外看一个人的成长。
- **Signature technique 2 — Frames within frames**: 用细边框、缩进、留白制造"框中框"结构。文字不铺满屏幕，而是在空间中被"框"住，像透过门框看一个家庭。
- **Signature technique 3 — Silence as rhythm**: 每个章节之间留一大段空白。不加分割线、不加过渡动画。空白本身就是节奏——像 是枝裕和 电影里那些"什么都没发生"的长镜头。
- **Motion rules**: 极度克制。最多 2 种动效：慢淡入（scroll reveal）和微弱的颜色温度变化。禁止弹跳、缩放、旋转、滑入。
- **Typography rules**: Serif 字体主导（Noto Serif SC / Source Han Serif），标题大字号但不加粗，正文舒适阅读尺寸。引用用更大的字号+左侧竖线。

## Site Cinematic Grammar

- **Page-shell logic**: 每页一个独立场景，像日记的一页。页面之间没有共享导航栏——靠底部"下一页"文字链接过渡。
- **Navigation posture**: 无固定导航。页面底部用极简文字链接指向下一页（"下一个 chapter →"）。像翻日记本。
- **Framing discipline**: 文字区域最大宽度 680px，居中。两侧大量留白（至少 15% viewport）。文字永远不撑满屏幕。
- **Density cadence**: 每页 3-4 个叙事单元。每个单元之间留 80-120px 空白。不堆叠。
- **Recurring material layers**: 米白背景 + 细边框（1px solid rgba(0,0,0,0.08)）+ 左侧竖线引用。
- **Allowed composition families**: Editorial Spread（编辑跨页）, Centered Column（居中栏）, Quiet Break（静默间歇）。
- **What may repeat**: 细边框框中框结构、左侧竖线引用、大留白。
- **What must vary page to page**: 每页的"视觉锚点"不同——第一页是标题字号，第二页是时间线，第三页是数据，第四页是产出矩阵，第五页是金句列表，第六页是收束。
- **Demo uniqueness guardrail**: 禁止深色、禁止 amber 高亮、禁止翻页式导航、禁止数据卡片矩阵。和前两次 Fincher 项目在 wireframe 层面完全不同。

## Page Arc

### Page: Cover（封面）

- **Page-role scene**: 打开日记本的第一页。安静、大量留白、只有一行字。
- **Page scene thesis**: 100 天前和 100 天后的对比，不靠文字说明，靠空间感传递。
- **One big idea**: 标题"养一只龙虾，需要 100 天"在页面中央偏上，下方是副标题和日期，四周是大面积留白。
- **Hero dominance statement**: 标题字号足够大（48-56px），衬线体，不加粗不加色——靠字号本身的力量感。下方一条细线（0.5px）把标题和副标题分开，像日记本的横线。
- **Restraint statement**: 不加任何装饰元素。不用渐变、不用阴影、不用动画开场。纯文字+留白。
- **Material thesis**: 纸质感——背景色是 `#f5f0e8`（米白），像一张微微泛黄的纸。
- **Typography thesis**: Serif 字体在大字号下的优雅感。标题 48-56px，副标题 16px，日期 13px。层级靠字号差而非粗细差。
- **Narrative arc**: B4 Prologue — 简短的前言，设定时间框架（2026.01 — 2026.04）。
- **Hero archetype**: #10 Single Word / Minimal Statement — 大字标题+极简副信息。
- **Signature composition**: 居中偏上大标题 + 底部细线 + 副标题。像日记本第一页。
- **Grid fallback test**: 如果变成两栏网格，会丢失"独白感"——封面必须是一个人在说话，不是两个人在对话。
- **Shared system holdback**: 不确定字体层级是否统一，等所有页面锁定后再验证。
- **UI exposure guardrail**: 不暴露"chapter"、"page 1 of 6"等元信息。
- **What this page must not inherit from previous demos**: 禁止深色背景、禁止大数字 KPI、禁止 amber 高亮。
- **Section sequence**: Title → Subtitle → Date → 下一页链接

### Scene 1

- **Beat**: B4 Prologue（前言）
- **Function**: Long-form Body #4
- **Archetype**: AG-3 Stacked Full-Width Cards（这里是单栏文字，不是卡片）
- **Composition ref**: Centered Column, 680px
- **Camera ref**: #2 Fade from black（慢淡入）
- **Interaction ref**: none（封面不动）
- **Visual elements**: 细横线（0.5px）分隔标题和副标题；底部"→"指向下一页
- **Why this exists**: 设定整篇文章的时间框架和基调。"供应商管理岗 AI 实践"定位身份，"2026.01 — 2026.04"定位时间。

---

### Page: 第一个月 — "什么都想试，什么都不对"

- **Page-role scene**: 翻到日记的第二页。开始有具体内容了——但都是琐碎的、试错的。
- **Page scene thesis**: 第一个月的核心是"摸边界"——知道它什么能做、什么做不好。视觉上用时间线表达"一步步摸出来"的感觉。
- **One big idea**: 页面上半部分是一个竖向时间线（4-5 个关键节点），下半部分是"灵魂文件调试"的叙事段落。
- **Hero dominance statement**: 时间线的每个节点用小圆点（6px）+ 竖线连接，左侧是日期，右侧是事件。不加颜色区分，全用同一种暖棕色。
- **Restraint statement**: 时间线不做交互（无 hover、无点击展开）。纯静态，像手绘在日记本上的时间线。
- **Material thesis**: 时间线的竖线用 1px 实线，圆点用暖棕色填充。像用钢笔画在纸上的标记。
- **Typography thesis**: 时间线日期用 12px 小号，事件用 15px 正文。叙事段落用 16px 行高 1.8。
- **Narrative arc**: B13 Flashback — 回到起点，"一月中旬开始用"。
- **Hero archetype**: #28 Chapter Zero（章节零——第一个月的开始）
- **Signature composition**: 左侧竖向时间线（占 25% 宽度）+ 右侧叙事文字（占 65% 宽度）+ 10% 留白。时间线是锚，文字是叙事。
- **Grid fallback test**: 如果变成纯文字无时间线，会丢失"一步步"的节奏感——时间线让读者看到进度，不只是读到进度。
- **Shared system holdback**: 时间线样式（圆点大小、线宽、颜色）等所有页面验证后再统一。
- **UI exposure guardrail**: 不暴露"Chapter 1"或"Page 2"。
- **What this page must not inherit from previous demos**: 禁止数据图表、禁止卡片网格、禁止交互式时间线。
- **Section sequence**: 章节标题 → 时间线 → 叙事段落 → 引用 → 下一页链接

### Scene 2

- **Beat**: B13 Flashback（回到起点）
- **Function**: Timeline #7
- **Archetype**: Timeline with text（时间线+文字叙事）
- **Composition ref**: Asymmetric left timeline + right content
- **Camera ref**: #4 Crane down（内容从上方缓缓落入）
- **Interaction ref**: none
- **Visual elements**: 竖向时间线（圆点+竖线）；引用块（左侧竖线）
- **Why this exists**: 用时间线结构化"摸边界"的过程，让读者看到从 01-15 到 02-17 的具体进展。

---

### Page: 第二个月 — "开始建体系"

- **Page-role scene**: 日记第三页。内容变密了——记忆系统、技能生态、一次关键失败。
- **Page scene thesis**: 第二个月的核心是"从一句一句地问，变成了建东西"。视觉上用数据（485 条记录、68 个技能）作为锚点，但不是 Fincher 式的大数字，而是嵌在叙事中的小数据。
- **One big idea**: 页面中部有一个"数据区块"——3 个关键数字横向排列（485 / 68 / 18），每个数字下方一行说明。不加框、不加背景色，纯文字排版。
- **Hero dominance statement**: 三个数字用 36px 字号，暖棕色，横向均匀分布。下方说明用 13px 灰色小字。数字本身不加任何装饰——靠字号和颜色的对比制造视觉重量。
- **Restraint statement**: 数字不做动画计数效果（count-up）。出现时就是最终值，像日记本上写好的数字。
- **Material thesis**: 数字区域上下各留 40px 空白，像在日记本中划出一小块"数据区"。
- **Typography thesis**: 数字用衬线体 36px 暖棕色，说明用无衬线体 13px 灰色。衬线/无衬线混搭制造层次。
- **Narrative arc**: B7 The Encounter — 遇到记忆系统问题（"记忆停更了半个月"）。
- **Hero archetype**: #26 Data Punch（数据冲击——但这里用极简方式呈现）
- **Signature composition**: 三列数据（数字+说明）居中排列 + 上下大量留白。像日记本中随手写下的三个统计数字。
- **Grid fallback test**: 如果变成卡片网格带背景色，就变成了仪表盘——必须保持"手写在纸上"的感觉。
- **Shared system holdback**: 数据区块的字号和颜色等所有页面验证后再统一。
- **UI exposure guardrail**: 不暴露"数据展示"或"统计"等标签。
- **What this page must not inherit from previous demos**: 禁止 ECharts、禁止深色背景、禁止数据卡片。
- **Section sequence**: 章节标题 → 叙事段落 → 数据区块 → 叙事段落 → 引用 → 下一页链接

### Scene 3

- **Beat**: B7 The Encounter（遇到问题）
- **Function**: Long-form Body #4 + Stats Counter #24（嵌入式数据）
- **Archetype**: Long-form with inline data
- **Composition ref**: Centered Column, 680px
- **Camera ref**: #2 Fade from black
- **Interaction ref**: none
- **Visual elements**: 三列数据（485/68/18）；引用块
- **Why this exists**: 记忆系统的发现（"记忆停更了半个月"）是第二个月最关键的事件，数据是支撑。

---

### Page: 第三个月 — "产出开始爆发"

- **Page-role scene**: 日记第四页。产出数据集中展示——但不是 Fincher 式的数据仪表盘，而是"日记本里贴了一张产出清单"的感觉。
- **Page scene thesis**: 第三个月的核心是"基础设施建好，产出加速"。视觉上用一个产出矩阵（周次/时间/交付物数量/重点）表达，但以表格形式呈现，不是图表。
- **One big idea**: 页面核心是一个简洁的表格——4 行 4 列，记录每周产出。表格上方有一个小标题"4 月每周产出物"，表格下方是叙事段落。
- **Hero dominance statement**: 表格不用网格线，用行间空白分隔。表头用暖棕色小号加粗，数据行用正文色。像用钢笔在日记本上画的简易表格。
- **Restraint statement**: 表格不做排序、筛选、hover 高亮。纯静态。
- **Material thesis**: 表格区域用极浅的背景色（`#ede7db`）区分，像在纸上贴了一张便签。
- **Typography thesis**: 表格内文字 14px，表头 12px 暖棕色。紧凑但不拥挤。
- **Narrative arc**: B8 Evidence Wall — 多个产出点同时展示，但用克制的方式。
- **Hero archetype**: #27 Before/After（前后对比——100 天前 vs 100 天后）
- **Signature composition**: 产出表格（居中，最大宽度 600px）+ 上方叙事 + 下方方法论预告。
- **Grid fallback test**: 如果变成柱状图或折线图，就变成了数据报告——必须保持"手写表格"的质感。
- **Shared system holdback**: 表格样式等所有页面验证后再统一。
- **UI exposure guardrail**: 不暴露"数据表格"或"Metrics"。
- **What this page must not inherit from previous demos**: 禁止 ECharts、禁止热力图、禁止数据卡片。
- **Section sequence**: 章节标题 → 叙事段落 → 产出表格 → 叙事段落 → 下一页链接

### Scene 4

- **Beat**: B8 Evidence Wall（证据墙——产出清单）
- **Function**: Long-form Body #4 + Data Dashboard #11（简化版表格）
- **Archetype**: Editorial table
- **Composition ref**: Centered Column, 600px
- **Camera ref**: #2 Fade from black
- **Interaction ref**: none
- **Visual elements**: 简洁表格（无网格线）；叙事段落
- **Why this exists**: 产出数据是第三个月的核心证据，表格是最"日记感"的呈现方式。

---

### Page: 方法论 — "从坑里爬出来之后"

- **Page-role scene**: 日记第五页。金句列表——8 条方法论，每条都是从坑里爬出来后总结的。
- **Page scene thesis**: 方法论不是清单，是"日记里抄下来的八句话"。每条方法论用引用块格式呈现，像从日记中摘录的金句。
- **One big idea**: 8 条方法论以引用块形式纵向排列，每条之间留 40px 空白。每条的格式：粗体标题 + 一句话解释。不加序号、不加图标、不加编号。
- **Hero dominance statement**: 每条方法论用左侧 3px 暖棕色竖线 + 16px 正文。标题部分用粗体，解释部分用常规字重。像手写在日记本边栏的批注。
- **Restraint statement**: 不加序号（不用 1. 2. 3.），不加图标，不加颜色区分。8 条方法论在视觉上是平等的。
- **Material thesis**: 左侧竖线是唯一的视觉元素，像用钢笔在纸上画的标记线。
- **Typography thesis**: 标题部分 16px 粗体，解释部分 15px 常规。整体比正文略小，像边栏批注。
- **Narrative arc**: B18 The Confrontation — "两次修不好就停"、"你没看到的东西不要说它 OK"——这些是挑战读者认知的金句。
- **Hero archetype**: #40 Quote（引用——金句列表）
- **Signature composition**: 纵向排列的 8 个引用块，每个用左侧竖线标记。居中，最大宽度 680px。
- **Grid fallback test**: 如果变成卡片网格，就变成了产品功能列表——金句必须保持"手写批注"的感觉。
- **Shared system holdback**: 引用块样式（竖线宽度、颜色、间距）等所有页面验证后再统一。
- **UI exposure guardrail**: 不暴露"方法论"或"Best Practices"等标签。
- **What this page must not inherit from previous demos**: 禁止编号列表、禁止图标装饰、禁止卡片网格。
- **Section sequence**: 章节标题 → 叙事段落 → 8 条引用块 → 下一页链接

### Scene 5

- **Beat**: B18 The Confrontation（面对真相）
- **Function**: Quote #40（金句列表）
- **Archetype**: Stacked quotes
- **Composition ref**: Centered Column, 680px
- **Camera ref**: #2 Fade from black
- **Interaction ref**: none
- **Visual elements**: 左侧竖线引用块 ×8
- **Why this exists**: 方法论是文章的核心价值，金句格式让每条都独立可读。

---

### Page: 结尾 — "龙虾还是那只龙虾"

- **Page-role scene**: 日记的最后一页。安静、收束、回到标题。
- **Page scene thesis**: 结尾呼应封面——同样的大留白，同样的衬线体大字，但内容是"100 天不长，但够养一只龙虾"。首尾呼应。
- **One big idea**: 页面中央是结尾金句（"龙虾还是那只龙虾。但养龙虾的人已经不是第一天那个了。"），下方是署名和日期。和封面形成镜像。
- **Hero dominance statement**: 结尾金句用 28px 衬线体，居中。不加粗、不加色——和封面标题同样克制。下方署名用 13px 灰色小字。
- **Restraint statement**: 不加"回到顶部"按钮，不加相关推荐，不加任何 CTA。故事结束就结束。
- **Material thesis**: 和封面相同的米白纸质感。首尾用同一种"纸"，像日记本的第一页和最后一页。
- **Typography thesis**: 结尾金句 28px 衬线体，署名 13px 无衬线灰色。和封面形成"大→小→更小"的收束感。
- **Narrative arc**: B24 The Loop — 结尾呼应封面标题（"养一只龙虾，需要 100 天" → "100 天不长，但够养一只龙虾"）。
- **Hero archetype**: #25 Question Hook（呼应式结尾——回到开头的问题）
- **Signature composition**: 居中金句 + 下方署名。和封面形成镜像对称。
- **Grid fallback test**: 如果变成多栏布局，就丢失了"独白收束"的力量——结尾必须是一个人在说话。
- **Shared system holdback**: 署名样式等所有页面验证后再统一。
- **UI exposure guardrail**: 不暴露"THE END"或"Fin"。
- **What this page must not inherit from previous demos**: 禁止深色背景、禁止大数字、禁止任何装饰。
- **Section sequence**: 空白 → 结尾金句 → 署名 → 空白

### Scene 6

- **Beat**: B24 The Loop（首尾呼应）
- **Function**: Quote #40（结尾金句）
- **Archetype**: Centered quote
- **Composition ref**: Centered Column, 680px
- **Camera ref**: #2 Fade from black
- **Interaction ref**: none
- **Visual elements**: 纯文字金句 + 署名
- **Why this exists**: 首尾呼应让整篇文章形成闭环。"养龙虾"的意象在开头提出，结尾收束。
