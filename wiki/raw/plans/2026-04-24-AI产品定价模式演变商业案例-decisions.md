# Design Decisions

- Entry mode: Step-by-step
- Genre: 金融战纪 / 商业纪录片
- Director: Adam McKay
- Film: The Big Short (2015)
- Niche: 商业案例分析 / 知识沉淀展示
- Pages: 4 页（首页 / 时间线 / 定价迷宫 / 洞察与预判）
- Major page roles: Home (thesis) → Timeline (evidence wall) → Pricing Maze (data comparison) → Insights & Future (actionable patterns)
- Image placeholders: 否
- Sub-agent delegation plan: 不分派，主代理串行完成

## Demo Uniqueness Audit

- Previous-work audit: presentation.html (Kami report, warm parchment + serif, A4 print-oriented), report.html (dark editorial + terracotta accent, slide-based scroll), ppt/index.html (Swiss-style slides), presentation-swiss.html (另版演示)
- Recurring traits to avoid:
  - Dark bg + warm accent (terracotta/amber)
  - Card-based slide sections
  - Left-copy right-object hero posture
  - Chapter-based vertical scroll with uniform section rhythm
  - Serif display + sans body pairing (Noto Serif/Sans)
- Shell-ban list:
  - 禁止暗色背景 + 单一暖色强调（已有 report.html 用过）
  - 禁止卡片堆叠式章节（presentation.html 风格）
  - 禁止左文右图的 hero 布局
  - 禁止 A4 打印风（presentation.html 的 parchment 风格）
  - 禁止 slide-based 垂直等速滚动
- Primary composition family: **Evidence wall / archive dossier**
  - 像一份正在被拆开的机密档案，页面是调查板（investigation board）
  - 数据以证据碎片的方式出现，不是整洁的卡片
- Why this family differs from previous outputs: 之前的站点都是报告/演示形态（线性章节），这次是"调查档案"形态——非对称、跳跃式信息密度、第四面墙打破、数据直接糊脸

## Research Notes

### Research Boundary
- Film research is observational input: The Big Short 的剪辑节奏、镜头语言、讲解策略
- What is being translated into web language: 手持镜头的紧迫感 → 非对称布局 + 突然缩放；第四面墙 → 直接对读者说话；明星讲解 → 类比弹窗/揭秘 callout；快速蒙太奇 → 数据数字级联出现；文本叠加 → 大号数据叠加在暗色背景上
- What must not be flattened into product-template logic: 不是"SaaS landing page with dark mode"，是"正在进行的调查"，信息不是被呈现而是被揭露

### Research Sources
- Director source: Panavision interview with Barry Ackroyd (BSC), Film Comment Adam McKay interview
- Film source: Slate editor interview (Hank Corwin), r/cinematography technique breakdown
- Secondary analysis: Scene-by-scene cinematography blog analysis
- Niche source 1: Financial documentary sites (Inside Job, Enron: The Smartest Guys in the Room)
- Niche source 2: Bloomberg terminal / financial data visualization aesthetics

### Film Palette
- Primary: #0a0a0f (deep black-blue, like trading floor monitors at 3am)
- Secondary: #12121a (slightly lighter, for layered surfaces)
- Accent: #ff4433 (alert red — 不是奢侈金，是彭博终端上的数字在闪)
- Text: #e8e6e1 (warm white, slightly aged paper feel for contrast against cold bg)
- Text secondary: #7a7a8a (grey-blue, for secondary data)
- Highlight: #00cc88 (data-green, for "profit" / "upside" numbers)
- Warning: #ffaa00 (amber, for caution signals)

### Director Signatures
1. **第四面墙打破** → 直接对读者说话，"你以为 ¥40 就能用一个月？"——不是报告，是有人在给你讲真相
2. **快速蒙太奇 + 跳切** → 数据突然放大，场景在不自然的地方切换，制造紧迫感
3. **明星讲解 / 类比弹窗** → 复杂概念用简单类比拆解（电信套餐演进、70% Token 浪费）

### Film Translation Notes
- Framing: 非对称、略带倾斜感、像被扔进会议室而不是被请到展厅
- Rhythm: 快-慢-快，一个密集数据段之后留大量空白，再突然砸一个关键数字
- Lighting: 冷色背景上的暖色文字，像监视器光照在脸上
- Space: 故意拥挤和故意空旷交替，不是均匀的 80px gap
- Materiality: 粗粝的打字机字体、原始数据表格、没有圆角卡片的精致感
- What should stay ambiguous or restrained: 不用动画炫技，只有数据本身在"动"——数字从模糊到清晰

### Niche References
- Bloomberg terminal aesthetic (dark, data-dense, terminal green)
- Financial investigation boards (pins, threads, evidence)
- SEC filing documents (raw data, legal text, footnotes)

### Reference Decomposition
- The Big Short contributes: 第四面墙叙事节奏、蒙太奇数据揭露、类比讲解策略
- Bloomberg terminal contributes: 数据密集感、终端绿/红配色、等宽字体权威感
- SEC filing documents contribute: 脚注文化、原始数据不修饰
- What will not be copied: 任何电影角色名、真实人名、直接引用的镜头构图

### Optional Reference Site Analysis
- Section map: 不是 Hero→Features→Stats→CTA，是 Thesis→Evidence→Data→Patterns
- Interaction inventory: hover reveals hidden context, scroll-triggered number reveals
- Background techniques: solid dark with subtle noise/grain, no gradients
- Color and type cues: monospace data + serif thesis + sans body
