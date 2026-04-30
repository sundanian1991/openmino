# R3 Prompt: 杯子（器物类）

> 18 次学习计划 — R3
> 目标：建立年老师风格 — 器物类体积感和开口表达

---

## 物体分析

| 维度 | 分析 |
|------|------|
| **物体类型** | 器物类（无生命/功能性） |
| **推荐视角** | 略俯视（15-30°）— 展示杯口圆形 + 杯身体积感 |
| **复杂度** | 简单（10-30 paths, ≤20% detail） |
| **核心挑战** | 体积感（略俯视角度）、开口形状（椭圆）、把手连接 |

---

## 颜色配置

| 元素 | 色值 | 占比 | 位置 |
|------|------|------|------|
| **主色** | 米白 #FEFFFE | 70% | 杯身主体（整体色调） |
| **点缀色** | 陶土 #D6654B | ≤10% | 把手（1 处焦点） |
| **阴影色** | 深陶土 #B03A21 | ≤10% | 杯底（重量感） |
| **描边色** | 墨黑 #1A1612 | - | 所有线条 |

**设计原则**：
- 整体色调 = 米白贯穿杯身（不是"上沿一个色，杯身一个色"）
- 陶土色仅点缀把手（≤1 处）
- 深陶土用于杯底阴影（重量感）

---

## 结构分解（三层）

| 层次 | 内容 | 数量 |
|------|------|------|
| **第一层：主体轮廓** | 杯身 + 把手（一笔到底的长 path） | 1 条 |
| **第二层：内部结构** | 杯口椭圆、杯底椭圆 | 2 条 |
| **第三层：装饰纹理** | 左侧高光曲线（假设光从左来） | 1 条 |

---

## API Prompt（完整版）

```text
A hand-drawn drinking cup (ceramic mug) in organic, warm style.

【风格标识】
Style: 年老师's Organic Warmth — recognizable hand-drawn aesthetic
Key characteristics: non-geometric, breathing curve rhythm, warm terracotta accents

【视角指定】
Perspective: Slightly elevated top-down view (15-30°) to show both the circular cup opening and the base.

【色彩配置】
Color philosophy:
- Main body: Rice white #FEFFFE throughout (overall tone, not segmented)
- Accents: Terracotta #D6654B for the handle and subtle rim highlight (minimal use, ≤2 focal points)
- Shadows: Deep terra #B03A21 under the rim and cup bottom
- Strokes: Ink black #1A1612 for all outlines

【线条分层】
Line hierarchy (Quiver natural standard):
- Main outline: 1.5-3px (defines shape)
- Structure lines: 0.7-1.5px (defines relationships)
- Detail lines: 0.25-0.7px (adds warmth)

【曲线要求】
Curve rhythm:
- 70% small deviations (±5px)
- 30% large deviations (±15-30px)
- Wave-style breathing: tight-loose-tight rhythm
- Avoid: mechanical symmetry, regular jitter, .00 coordinates

【结构分解】
Structure composition (3 layers):
1. Main outline: Single continuous path defining the cup silhouette (body + handle)
2. Internal structure: Cup rim ellipse and base ellipse
3. Decorative texture: Minimal highlight curve on the left side (assuming light from left)

【复杂度控制】
Complexity: Simple (10-30 paths, ≤20% detail)

【输出格式】
SVG format with:
- <g id="fill-layer"> for fills
- <g id="stroke-layer"> for strokes
- All strokes: stroke-linecap="round" stroke-linejoin="round"
```

---

## 验证清单

生成后检查：
- [ ] 杯口和杯底是椭圆（不是圆形）？
- [ ] 杯身略俯视角度（能看到部分杯内）？
- [ ] 米白为主色（70%），陶土色仅点缀把手（≤1 处）？
- [ ] 杯底有深陶土阴影（重量感）？
- [ ] 曲线有呼吸感（70/30 分布，长曲线呼吸）？
- [ ] 所有线条都是 round？
- [ ] 与 R1（虾）、R2（猫）的风格一致？

---

## 预期 Path 数量

| 层次 | 预期 path 数 |
|------|------------|
| 填充层（主体 + 把手 + 阴影） | 3 条 |
| 描边层（主轮廓 + 杯口 + 杯底 + 高光） | 4 条 |
| **总计** | **10-15 条** |

---

*创建时间：2026-04-04*
*版本：v1.0*