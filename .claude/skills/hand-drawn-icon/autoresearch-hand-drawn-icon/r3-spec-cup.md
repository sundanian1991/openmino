# R3 杯子学习计划

> 目标：掌握器物类物体的体积感表达，验证风格一致性

---

## 物体分析

**物体**：陶瓷咖啡杯
**类别**：器物类（无生命/功能性）
**推荐视角**：略俯视 20-30°（展示开口 + 体积感）
**复杂度**：中等（预计 35-45 paths）

### 结构分解

```
第一层：主体轮廓（一笔到底）
└── 杯身外轮廓（圆柱体略带弧度）

第二层：内部结构
├── 杯口椭圆（开口形状）
├── 杯底（支撑面）
└── 把手（C形连接）

第三层：细节纹理
├── 杯口厚度线
├── 把手连接处阴影
└── 底部接触阴影
```

### 色彩分配决策

| 部分 | 颜色 | 理由 |
|------|------|------|
| 杯身主体 | 米白 #FEFFFE | 无生命器物，干净简洁 |
| 把手 | 陶土色 #D6654B | 焦点强调，唯一暖色点缀 |
| 底部阴影 | 深陶土 #B03A21 | 重量感，支撑 |
| 所有描边 | 墨黑 #1A1612 | 统一轮廓 |

**陶土色位置**：把手 ONLY（1 处）

---

## API Prompt

```
Create a hand-drawn style SVG illustration of a ceramic coffee cup/mug.

**Subject Details:**
- Object: Simple ceramic coffee cup with handle
- View: Slight overhead angle (20-30°) to show the opening and volume
- Style: Organic, hand-drawn, warm aesthetic
- Complexity: Medium (35-45 paths)

**Color Palette (STRICT - use only these 4 colors):**
- Primary fill: #FEFFFE (rice white) - for the cup body
- Accent: #D6654B (terracotta) - for handle only (1 accent location)
- Shadow/depth: #B03A21 (deep terracotta) - for bottom contact shadow
- Stroke: #1A1612 (ink black) - for ALL outlines

**Design Philosophy:**
- "Organic Warmth" movement - imperfect, human-made feeling
- Lines should feel naturally hand-drawn, not geometrically perfect
- Curve rhythm: breathe between tight and loose control points
- Avoid: perfect symmetry, mechanical regularity, mathematical precision

**Line Specifications:**
- Main outline: 1.5-3.0px (cup body outer contour)
- Structure lines: 0.7-1.5px (rim, handle connection, cup bottom)
- Detail lines: 0.25-0.7px (subtle texture, inner rim)
- ALL strokes MUST have: stroke-linecap="round" stroke-linejoin="round"

**Composition:**
- Canvas: 250x250px, viewBox="0 0 250 250"
- Cup centered, occupying 60-70% of frame
- Handle on right side, organic C-curve
- Show subtle shadow beneath cup for grounding
- Cup opening visible as an ellipse

**Curve Characteristics (CRITICAL):**
- Control point spacing: 20-50px (irregular, not uniform)
- Deviation pattern: 70% within ±5px, 30% sudden ±15-30px
- Avoid: .00 coordinates, perfect mirror symmetry, evenly spaced points
- Target: Natural hand-drawn rhythm like "c11.14 7.83 28.25 9.87 43.46 9.83"

**Layer Structure:**
1. Fill layer: White cup body + terracotta handle + deep terracotta shadow
2. Stroke layer: Black outlines with varying weights (main/structure/detail)

**Negative Constraints:**
- NO gradient fills - use solid colors only
- NO perfect circles or ellipses - hand-drawn curves only
- NO decorative patterns - keep it simple and functional
- NO multiple accent colors - terracotta on handle ONLY
- NO human face or figure - this is a cup object

Output clean SVG code with proper indentation, no CSS classes, inline styles only.
```

---

## 风格一致性检查清单

生成后验证：

- [ ] 曲线有 70/30 节奏分布？
- [ ] 坐标有小数点（非 .00）？
- [ ] 色彩严格四色系统？
- [ ] 陶土色只在把手？
- [ ] 线条分三层粗细？
- [ ] 所有 stroke 有 round 属性？
- [ ] 与 R1 虾的风格气质一致？

---

## 预期输出

1. `r3-spec-cup.md` — 本文档
2. `quiver-r3-cup.svg` — Quiver API 输出
3. `r3-analysis.md` — 风格一致性分析

---

*创建于 2026-04-04*
