# Design Decisions

- Entry mode: Step-by-step
- Genre: 商业案例演示 / 电影叙事风格 HTML 幻灯片
- Director: David Fincher
- Film: The Social Network (2010)
- Niche: 商业案例知识沉淀 — AI 产品定价模式演变
- Pages: 26 页独立幻灯片，五幕叙事结构（含 4 个过渡页）
- Major page roles: Cover / Personal / Timeline / Act Transition / Comparison / Data Breakdown / Investigation / Revelation / Insight / Rule / Pitfall / Trend / Conclusion / End
- Image placeholders: 无，纯文字 + SVG 图形
- Narrative arc: 幻觉 → 崩塌 → 调查 → 规律 → 未来

## Demo Uniqueness Audit

- Previous-work audit: 此项目此前做过一版 6 场景单页滚动方案，需推翻重来
- Shell-ban list: 单页全屏滚动、居中 hero + features grid、通用 SaaS 卡片矩阵、顶部导航
- Primary composition family: 幻灯片式翻页叙事（Slide-based Cinematic Narrative），每页独立场景，幕间过渡页作为"章节分割"
- Wireframe-level uniqueness test: 去掉颜色后应像"纪录片分镜"而非"产品官网"

## Film Palette

- Primary: #0a0a0f（近乎纯黑）
- Secondary: #1a3a4a（desaturated teal）
- Accent: #d4a35f（amber/gold — 唯一暖色）
- Shadow: #050508（deep shadow）
- Text: #e8e8ec（冷白）/ #8a8a95（辅助灰）

## Act Color Progression

每幕色调微调，形成"温度弧线"：
- 第一幕（幻觉）：偏暖 — amber 占比略高，营造"舒适错觉"
- 第二幕（崩塌）：冷峻 — teal 主导，amber 用于强调危机
- 第三幕（调查）：冷静 — 灰白主导，amber 仅用于关键数据
- 第四幕（规律）：冷中带暖 — 规律揭示时用 amber 作为"洞察闪光"
- 第五幕（未来）：渐亮 — 底部出现微妙亮色，暗示终局

## Director Signatures

1. Desaturated color grading — amber 为唯一暖色，冷色调铺底
2. Precision framing — 大留白是控制不是空，严格对齐
3. Glitch/scan line — 叙事工具非装饰，用于转折点和关键数据

## Translation Notes

- Rhythm: 每页一个核心观点，不堆叠。快-慢-快-慢-中交替
- Lighting: 深色底 + 局部高亮，聚光灯效果引导视线
- Materiality: grain 全局覆盖 + scan line 强调
- Restraint: 每页最多 1 个重交互，其余轻 reveal
- SVG-only: 所有图形用 SVG 绘制（芯片阶梯、数据饼图、阶梯箭头等），不用外部图片
