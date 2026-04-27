# Design Decisions

- Entry mode: Surprise me
- Genre: 职场调查 / 心理惊悚
- Director: David Fincher
- Film: Gone Girl (2014)
- Niche: 组织行为洞察 — 揭穿职场表演
- Pages: 单页
- Major page roles: 单一叙事流 — 从表面到真相
- Image placeholders: 否
- Sub-agent delegation plan: 无需委派，单页规模

## Demo Uniqueness Audit

- Previous-work audit: 无 prior cinematic-ui 输出
- Recurring traits to avoid: 默认 hero + features + CTA 三段式
- Shell-ban list: 左右分栏 hero、圆角卡片矩阵、渐变背景、悬浮导航
- Primary composition family: **Corridor** — 狭窄、压迫、逐层推进
- Why this family differs from the most recent output: 首次 cinematic-ui 输出，无 prior
- Wireframe-level uniqueness test: 移除颜色后，剩余结构是否仍像 Gone Girl 的调查感（窄列、证据卡片、时间线标记）

## Research Notes

### Research Boundary
- Film research is observational input, not a spec
- What is being translated into web language: Fincher 的调查紧张感 + Gone Girl 的"表演与真相"对立
- What must not be flattened into product-template logic: 这不是功能介绍页，是"揭露"体验

### Research Sources
- Director source: David Fincher — Precision + desaturated teal + deep shadow
- Film source: Gone Girl (2014) — 精心设计的表演 vs 冰冷真相
- Secondary analysis: Fincher 用冷色调+精准构图制造不安感

### Film Palette
- Primary: #1a1a1a（深黑背景，调查室的暗）
- Secondary: #c8a96e（暗金，证据标记）
- Accent: #d4382c（警示红，信号触发）
- Shadow: #0d0d0d（纯黑边缘）
- Text: #e8e4dd（暖白，非冷白）
- Muted: #6b6560（灰褐，次要信息）

### Director Signatures
1. 冷峻精确 — 对齐到像素级，不留模糊地带
2. 深阴影+有限调色 — 用明暗对比而非丰富色彩制造紧张
3. 证据式呈现 — 物体/文字被"陈列"而非"装饰"

### Film Translation Notes
- Framing: 窄内容区（max-width 900px），两侧大量留黑 — 像走进狭长走廊
- Rhythm: 5 种信号 = 5 个"证据场景"，逐个推进
- Lighting: 暗底+局部高亮，像台灯照亮证据
- Space: 信号之间有巨大留白，给每个发现呼吸空间
- Materiality: 粗糙纹理（grain）+ 细线分割，不做光滑玻璃
- What should stay ambiguous or restrained: 不堆动画，每个交互只做一件事

### Niche References
- 职场洞察类页面通常是明亮的、友好的、圆角的 — 这个要完全反过来

### Reference Decomposition
- Gone Girl contributes: 表演与真相的对立结构、暗金+深黑的配色、冷峻的排版
- 调查报道 contributes: 证据卡片的呈现方式（引用块+标注来源）
- What will not be copied: 不模仿任何具体页面的布局
