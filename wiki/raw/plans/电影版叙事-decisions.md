# Design Decisions

- Entry mode: 基于已有素材直接开始（素材已充分）
- Genre: 商业案例调查 / 知识沉淀
- Director: David Fincher
- Film: The Social Network + Zodiac（调查式叙事：一个现象如何发生，证据墙，真相在元数据中）
- Niche: 商业分析 / 知识沉淀 / 个人学习
- Pages: 单页长卷
- Major page roles: Home（唯一的叙事页）
- Image placeholders: 不需要，以数据和文字为主
- Sub-agent delegations: 不需要，单页直建

## Demo Uniqueness Audit

- Previous-work audit: 此前 cinematic-ui 输出多为通用 landing page 风格
- Recurring traits to avoid: 居中渐变 hero + 圆角卡片堆叠 + 通用 SaaS 布局
- Shell-ban list: 圆角 premium cards、渐变 hero、top nav + stacked panels、左右对称 split
- Primary composition family: evidence wall（证据墙）— 信息密集排列，数据即装饰
- Why this differs: 此前偏向"展示"，本次偏向"调查"——不是告诉你什么好，而是带你看证据

## Research Notes

### Research Boundary
- Film research is observational input: Fincher 的精确、去饱和青色调、深阴影、扫描线、冷峻收尾
- Translating into web language: 深色底、数据主导、少装饰、多证据、渐进揭示
- Must not flatten: 不能变成普通的数据仪表盘，必须保留电影调查叙事的张力

### Film Palette
- Primary: #0a0a0a（深黑背景）
- Secondary: #141414（卡片/区块底色）
- Accent: #4ecdc4（青绿调查色）
- Accent dim: #2a7a74（弱化青）
- Shadow: #050505
- Text: #e8e8e8（主文）/ #888（辅文）/ #555（元数据）
- Warning: #ff6b6b（风险/反模式高亮）
- Gold: #d4a35f（关键洞察高亮）

### Director Signatures
1. Precision → 严格对齐的网格、数据表格、等宽字体
2. Desaturated teal → 青绿作为唯一彩色点缀，其余近乎黑白
3. Deep shadow → 区块用微妙阴影分隔，不用粗分割线

### Film Translation Notes
- Framing: 左对齐为主，信息像调查报告一样排列
- Rhythm: 快速数据冲击 → 慢速深度分析 → 又一个数据冲击
- Lighting: 深色背景，少量彩色元素像暗房里的荧光
- Space: 区块间留白克制，不浪费空间
- Materiality: 扫描线纹理、等宽数据字体、证据式表格
- What stays restrained: 不做大动画，做精确的小动作

### Reference Decomposition
- The Social Network contributes: 数字冲击开场、节奏快、数据即叙事
- Zodiac contributes: 证据墙、多源信息聚合、时间线
- What will not be copied: 不出现导演名、电影名、工作流标签
