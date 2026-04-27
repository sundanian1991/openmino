# Design Decisions

- Entry mode: Step-by-step
- Genre: 倒叙商业分析 / 杂志特稿
- Director: Christopher Nolan
- Film: Tenet (2020)
- Niche: 商业案例分析 — AI Token 定价模式演变
- Pages: 4 页（终态 → 催化剂 → 争夺战 → 起点）
- Major page roles: Page 01 "终态" (2026.04) → Page 02 "催化剂" (2026.02) → Page 03 "争夺战" (2025-2026) → Page 04 "起点" (2024 Q4)
- Image placeholders: 否
- Sub-agent delegation plan: 不分派，主代理串行完成

## Demo Uniqueness Audit

- Previous-work audit:
  - presentation.html (Kami report, warm parchment + serif, A4 print-oriented)
  - report.html (dark editorial + terracotta accent, slide-based scroll)
  - ppt/index.html (Swiss-style slides, indigo porcelain)
  - presentation-swiss.html (white Bauhaus geometric)
  - index.html (Big Short / 方案 A, dark Bloomberg terminal, evidence wall, count-up numbers)
- Recurring traits to avoid:
  - 暗色背景 #0a0a0f / #12121a + 警报红 #ff4433 + 数据绿 #00cc88
  - Bloomberg 终端 / 调查档案隐喻
  - JetBrains Mono 等宽字体
  - 三种字体混排（等宽+衬线+无衬线）
  - 底部前/后按钮导航
  - count-up 数字动画
  - 卡片堆叠式章节
  - 左文右图 hero
  - slide-based 等速滚动
- Shell-ban list:
  - 禁止暗色背景（#0a0a0f / #12121a 等深色系）
  - 禁止警报红（#ff4433）作为主强调色
  - 禁止 JetBrains Mono 字体
  - 禁止 count-up 数字动画
  - 禁止无顶栏+底部前/后按钮导航
  - 禁止正序叙事
  - 禁止卡片堆叠、slide 滚动、左文右图 hero
  - 禁止"证据墙/调查档案/卷宗"页面隐喻
- Primary composition family: **Magazine Spread / Temporal Palimpsest**
  - 页面像高端商业杂志特稿（HBR / Monocle 风格）
  - 大字号标题、精准留白、克制装饰
  - 时间维度通过倒叙结构呈现，每页回答上一页的"为什么？"
- Why this family differs from previous: 方案 A 是"调查档案"（非对称、密集、粗粝、终端感），方案 E 是"杂志特稿"（对称克制、大量留白、优雅、印刷品质感）。

## Research Notes

### Director Signatures
1. **时间倒流（Inversion）** → 页面从 2026 年 4 月往回翻到 2024 Q4，每页时间戳在倒退
2. **因果倒置（Effect-before-Cause）** → 先展示终态（100 亿 Token 消耗），再逐页揭示原因
3. **认知重构（Re-contextualization）** → 同一数据（¥40 订阅）在不同页面被重新理解

### Film Palette
- Primary (background): #f5f4f0（米白，像高端杂志纸）
- Secondary (surface): #f8f7f4（更浅的米白，用于面板层）
- Accent: #c9a84c（铜金，印刷品上的金属油墨感）
- Text primary: #2a2a2a（深炭灰，正文）
- Text secondary: #6b6b6b（中灰，次要信息）
- Decorative line: #d4d0c8（浅灰，分隔线）
- Deep anchor: #1a2744（深蓝，用于大标题或关键数字）

### Film Translation Notes
- Framing: 杂志编辑式框架，不是终端也不是 SaaS
- Rhythm: 大号展示 → 密集解释 → 留白呼吸 → 又一个关键数字
- Lighting: 光面印刷品感，不是监视器
- Space: 大量留白。每页 2-3 个核心视觉点
- Materiality: 纸张、印刷、金属油墨质感
- Restraint: 不用复杂动画。让倒叙结构本身成为体验

### Niche References
- Harvard Business Review feature article layouts
- Monocle magazine spreads
- The Economist graphical data pages
