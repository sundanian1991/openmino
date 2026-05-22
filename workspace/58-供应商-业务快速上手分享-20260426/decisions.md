# Design Decisions

- Entry mode: Step-by-step
- Genre: 商业分析/策略演示
- Director: Ben Affleck
- Film: Argo (2012)
- Niche: 内部分享演示 — 如何快速了解一个陌生业务
- Pages: 单页分页翻页式演示（12-15 slides）
- Major page roles: 封面、四步法各步骤、附表、总结
- Image placeholders: 不使用
- Sub-agent delegation plan: Phase 2-3 委派子代理处理具体场景规格

## Demo Uniqueness Audit

- Previous-work audit: 之前演示多为暗色+card grid 模式（供应商看板、AI定价PPT）
- Recurring traits to avoid: 左文右图布局、圆角卡片矩阵、渐变背景、居中大标题+副标题
- Shell-ban list: 默认 card grid、居中对称 hero、gradient overlay、pill 标签
- Primary composition family: 走廊式（corridor）— 窄幅聚焦、信息纵深、像翻阅一份机密文件
- Why this family differs from the most recent output: 上次是全景看板式，这次是纵深走廊式
- Wireframe-level uniqueness test: 去掉颜色后，视觉是纵向翻页的文件阅读流，不是横向铺展的 dashboard

## Research Notes

### Research Boundary
- Film research is observational input, not a spec: Argo 的视觉语言是灵感源，不是组件库
- What is being translated into web language: 暖色暗底、grain 纹理、情报文件感、蒙太奇节奏、块状粗体标题
- What must not be flattened into product-template logic: 三线并行的节奏变化、混合媒介叙事的层次感

### Research Sources
- Director source: Ben Affleck — 克制表演、蒙太奇序列、混合媒介叙事
- Film source: Argo (2012), DP Rodrigo Prieto — 35mm 胶片 + 200% 光学放大、变形宽银幕、70s 暖光
- Secondary analysis: 电影色彩分析、剪辑节奏分析、Prieto 摄影访谈
- Niche source 1: 商业分析演示（McKinsey/BCG 风格）
- Niche source 2: 信息架构可视化

### Film Palette
- Primary: #1a1714（深暖灰，70s 暗室感）
- Secondary: #2a2420（焦糖深棕）
- Accent: #c87533（琥珀橙）+ #d4a056（古铜金）
- Shadow: #0d0b09（极深暖黑）
- Text: #e8e0d4（暖白，纸张色）
- Muted: #5a7a6e（暗青绿，阴影区的冷调）
- Highlight: #e6c47a（金色高光，用于关键数据）

### Director Signatures
1. 混合媒介叙事 — 新闻录像/动画/照片无缝穿插 → 页面内容混合不同的视觉呈现方式
2. 蒙太奇压缩 — 复杂流程用节奏序列交代 → 信息密集区用编号序列+紧凑排版
3. 克制氛围 — 不靠特效靠环境 → 视觉克制，用纹理和光感而非渐变和动画

### Film Translation Notes
- Framing: 窄幅聚焦，信息像被放大镜照亮的文件片段
- Rhythm: 三段式节奏 — 铺陈(慢) → 穿透(中) → 诊断(快) → 技巧(缓)
- Lighting: 暖色点光源效果，页面中心亮、边缘暗（vignette）
- Space: 纵深走廊感，不是横向铺展
- Materiality: grain 纹理层、纸张质感、文件年代感
- What should stay ambiguous or restrained: 不做过度动画，不做装饰性元素，信息本身就是视觉

### Niche References
- 商业分析演示的排版结构（清晰的编号、层级、表格）

### Reference Decomposition
- Argo 色彩体系 contributes: 暖色暗底、低饱和、琥珀金强调
- Argo 材质纹理 contributes: grain 层、纸张感、文件年代感
- Argo 节奏控制 contributes: 三段式信息节奏、关键结论的视觉加速
- What will not be copied: 不做复古模拟，不做胶片边框装饰，不做电影片段引用
