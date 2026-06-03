# Compiled Spec — 年 UI 演示：什么是电影 UI

## Tokens（CSS Custom Properties）

```css
:root {
  /* Scene — Glacier */
  --scene: #2A4A5A;
  --scene-bg: rgba(42, 74, 90, 0.06);
  --scene-border: rgba(42, 74, 90, 0.2);
  --scene-light: rgba(42, 74, 90, 0.03);

  /* Surface */
  --bg: #FAFAF8;
  --surface: #FFFFFF;
  --surface-raised: #F5F5F0;
  --border: #E5E5E0;
  --border-visible: #C0C0B8;

  /* Text */
  --text-display: #2C2C2C;
  --text-primary: #1A1A1A;
  --text-secondary: #6B6B6B;
  --text-disabled: #A0A0A0;

  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  --space-4xl: 96px;

  /* Container */
  --container-max: 1120px;
  --container-padding: 32px;
  --grid-gap: 24px;
}
```

## Font Loading

```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

## Page Structure（6 Sections）

---

### Section 1: Hero — "Cinematic UI"

**Composition source**: Center-weighted monument (#1) + floating indicators
**Camera/entrance**: Dolly-In (#3) — scale(0.85) + opacity
**Visual elements**: Ghost number "01" (opacity 0.04), horizontal scene-color divider, floating stats pill

Layout:
```
┌─────────────────────────────────────┐
│            [01 ghost]                │
│                                     │
│        什么是电影 UI？                │  ← Playfair Display 120px
│    Film-inspired website design      │  ← Inter body 16px
│    ───────────────────               │  ← scene-color divider, 40px wide
│    4 Phases  ·  25+ Beats  ·  80 Compositions  ·  200 Directors
│                                     │
│    [浮动指标: 从电影到Web的系统翻译]    │
└─────────────────────────────────────┘
```

**Key CSS decisions**:
- Ghost "01" absolute positioned, font-size: clamp(6rem, 18vw, 20rem), opacity 0.04
- Hero title Playfair Display 300, font-size clamp(3rem, 8vw, 120px)
- Stats row JetBrains Mono ALL CAPS with scene-color dots
- Background: --bg, section padding 120px top/bottom

---

### Section 2: 能力网格 — "它能做什么？"

**Narrative beat**: B8 Evidence Wall
**Section function**: Stats + Article Grid (capability cards)
**Entrance**: Curtain Wipe (#10) — clip-path inset

```
┌─────────────────────────────────────┐
│  02                                 │  ← ghost number
│  它能做什么                          │  ← Playfair Display 48px
│                                     │
│  ┌──────┐ ┌──────┐ ┌──────┐        │
│  │ 导航  │ │ 构图  │ │ 颜色  │        │  ← 3-column capability cards
│  │ 叙事  │ │ 视觉  │ │ 动效  │        │
│  └──────┘ └──────┘ └──────┘        │
│                                     │
│  200+ Director库 · 50 入场效果        │  ← stats row
│  100 调色板 · 80 布局构图              │
└─────────────────────────────────────┘
```

**Capability cards**: 3 columns, each has "What it is" + "How it works" as JetBrains Mono label + Inter description

---

### Section 3: 4-Phase 工作流 — "如何工作？"

**Narrative beat**: B11 The Tutorial
**Section function**: Process/Steps (#8)
**Entrance**: Steadicam Float-In (#12)
**Visual element**: decorative line connecting steps

```
┌─────────────────────────────────────┐
│  03                                 │
│  如何工作 — 4 Phase 工作流           │
│                                     │
│  ① Decisions   ② Storyboard         │  ← 左右2列对照
│  ③ Compile     ④ Build              │
│   ──  ——  ——  ——  ——  ——  ——        │  ← 水平连接线
│  ↓ 每个阶段产出独立Markdown文件        │
│  ↓ 严格顺序执行，不可跳过               │
└─────────────────────────────────────┘
```

4 phases as timeline cards with:
- Phase number (large, JetBrains Mono)
- Phase name (Playfair Display)
- Description (Inter)
- Output file name (JetBrains Mono tag)

---

### Section 4: 为什么重要 — "核心价值"

**Narrative beat**: B16 The Authority + B19 Quiet Moment
**Section function**: Quote (#40) + Stats (#24)
**Entrance**: Fade from Black (#2)
**Visual element**: scene-color background block (scene-bg)

```
┌─────────────────────────────────────┐
│                                     │
│  "设计得像电影制作，                  │
│   不像通用落地页。"                    │  ← Quote, Playfair Display
│                                     │
│  ─── cinematic-ui 的核心原则           │
│                                     │
│  每次调用 · 不问调色板 · 只问结构      │
└─────────────────────────────────────┘
```

---

### Section 5: 年 UI — "nian-ui 继承"

**Narrative beat**: B14 The Pivot
**Section function**: Comparison dual-column
**Entrance**: Split Diopter Open (#7)
**Composition**: 60/40 asymmetric split

```
┌─────────────────────────────────────┐
│  05                                 │
│  年 UI：叙事骨架 + 视觉皮肤            │
│                                     │
│  ┌─────────────┐ ┌──────────────┐   │
│  │ cinematic   │ │    nian      │   │
│  │  继承叙事    │ │   替换视觉    │   │
│  │  4-Phase    │ │  token颜色    │   │
│  │  导演结构    │ │  三字体固定    │   │
│  │  叙事节拍    │ │  无阴影系统    │   │
│  │  构图族      │ │  8:1比值      │   │
│  └─────────────┘ └──────────────┘   │
│                                     │
│  结论：导演级的叙事 + 统一的品牌视觉    │
└─────────────────────────────────────┘
```

---

### Section 6: 结尾 — "开始"

**Narrative beat**: B22 The Farewell
**Entrance**: Crane Down (#4) — translateY(-100vh)
**Visual**: Minimal, centered

```
┌─────────────────────────────────────┐
│                                     │
│       用 /nian-ui 开始                │
│                                     │
│  电影的结构。nian 的颜色。同一声音。     │
│                                     │
│  ───                                │
└─────────────────────────────────────┘
```
