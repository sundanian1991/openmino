# PPTX Deck Builder

> Sources: pptx-deck-builder, 7 files, 2026-04-28
> Created: 2026-04-27
> Raw:[SKILL](../../raw/skills/pptx-deck-builder-SKILL.md); [README](../../raw/skills/pptx-deck-builder-README.md); [color palettes](../../raw/skills/pptx-deck-builder-color-palettes.md); [content strategy](../../raw/skills/pptx-deck-builder-content-strategy.md); [core patterns](../../raw/skills/pptx-deck-builder-core-patterns.md); [html2pptx](../../raw/skills/pptx-html2pptx.md); [OOXML](../../raw/skills/pptx-ooxml.md)

## 概述

使用 PptxGenJS 生成专业 .pptx 演示文稿。涵盖颜色系统、内容策略、核心模式。

## SKILL.md

```
---
name: pptx-dark-cream
description: >
  Generate professional presentation decks (.pptx) using PptxGenJS with a refined dark-navy / cream / accent color system.
  Use this skill whenever the user asks to create, update, or regenerate a .pptx deck — including requests like
  "做一个PPT"、"生成演示文稿"、"帮我做幻灯片"、"按我的大纲做成PPT"、"更新配色方案"、"加截图不变形"。
  Also use it when the user provides a title + outline + speaking notes and wants them turned into a formatted deck,
  even if they don't say "PPT" or ".pptx" explicitly — if the end goal is a slide deck, this skill applies.
  When in doubt, use this skill — the visual system and content development workflow it encodes takes significant
  effort to rebuild from scratch.
---

# PPTX Dark-Cream Skill

This skill covers two layers:

1. **Content development** — turning a talk title, outline, and speaking notes into a structured slide deck
2. **Visual execution** — generating pixel-perfect PptxGenJS code using the dark-navy/cream design system

Read both layers before starting. The reference files hold the details:
- `references/content-strategy.md` — intake, slide density, how to translate speaking ideas into slides
- `references/core-patterns.md` — PptxGenJS code, `imgFit()` helper, slide type templates
- `references/color-palettes.md` — 5 swappable color schemes

---

## Step 1 — Intake (Always Do This First)

Before writing a single slide, gather the following. If any item is missing, ask for it explicitly:

| Item | Why it matters |
|---|---|
| **Target audience** | Determines vocabulary level, assumed knowledge, and how much to explain vs. assert |
| **Talk duration** | Drives total slide count (see density formula in `content-strategy.md`) |
| **Title / main thesis** | The single sentence the audience should remember |
| **Outline / structure** | Part names, section order, rough time allocation per section |
| **Speaking notes / examples** | The real substance — specific data points, case studies, stories, quotes that make the argument land |
| **Images / screenshots** | Which visuals exist? Informs whether to build image-showcase slides or text-only layouts |
| **Color palette preference** | Default: 暗夜橙光. Offer alternatives if user hasn't seen the options. |

If the user has provided most of this already (as they often do in a single message), extract what you can and ask only for the gaps.

---

## Step 2 — Content Architecture

Read `references/content-strategy.md` in full before doing this step.

1. Propose a **slide-by-slide outline** with slide type (cover / section / content / image) and one-line description of each slide's job
2. Confirm with the user — it's much faster to restructure at the outline stage than after code is written
3. Note which slides need real images vs. placeholder boxes

---

## Step 3 — Visual Execution

Read `references/core-patterns.md` and `references/color-palettes.md`, then:

1. Apply the chosen palette's `C = { ... }` block
2. Build `slides.js` using the patterns from `core-patterns.md`
3. Run: `node slides.js`
4. Visual QA with LibreOffice → PDF → JPG (pipeline in `core-patterns.md`)
5. Save `.pptx` to workspace folder and share link

---

## Key Technical Principles

### Font: Microsoft YaHei everywhere
```js
const F = "Microsoft YaHei";
// Pass fontFace: F to EVERY addText() call — never omit it
```

### Images must never stretch
`sizing: {type:"contain"}` does NOT reliably preserve aspect ratio. Always use the `imgFit()` helper (in `core-patterns.md`) with the image's original pixel dimensions.

### Slide backgrounds by type
| Slide type | Background |
|---|---|
| Cover | `C.darkBg` |
| Section divider | `C.sectionBg` |
| Content | `C.cream` |
| Image showcase | `C.cream` |
| Dark emphasis | `C.darkBg` |

### Escape inner double quotes in Chinese strings
```js
// WRONG — SyntaxError if inner " is ASCII
{ text: "AI "够强" 才考虑" }
// CORRECT
{ text: "AI \"够强\" 才考虑" }
```

### Never share option objects between addText calls
PptxGenJS mutates options objects. Always write fresh inline literals.

### No `#` prefix in hex colors
`"D97449"` not `"#D97449"`.
```

## README.md

```
# PPTX Deck Builder

> 让 AI 执行演示文稿规则，而不是自由发挥，再用 PptxGenJS 生成可交付的 `.pptx` 幻灯片。

---

## 这是什么

`pptx-deck-builder` 是一个用于生成演示文稿的 Skill，可以把一个分享主题、提纲和讲稿要点，转换成一套结构清晰、视觉统一的幻灯片。

它背后的核心思路很简单：**不要让 AI 临场发挥做 PPT，而要让 AI 执行一套 PPT 系统。**

很多人让 AI 做 PPT 的方式，是直接输入一句“帮我做个 PPT”，然后再回头修那些被拉伸的图片、混乱的字体和失控的配色。这个 Skill 反过来做，它先把规则定死，再让 AI 在规则里完成执行：

1. **先想清楚受众、核心判断、时长和结构**
2. **先选叙事框架，再写每一页内容**
3. **用固定的版式、字体、图片规则和主题系统生成整套 deck**

这个仓库保存的是从 skill 包中解出来的源码文件，方便你直接查看、复用和版本管理。

---

## 效果预览

### 1）叙事结构

这个 Skill 会先帮你设计 presentation 的故事结构，再进入正式制稿。

*Storytelling frameworks 1*

*Storytelling frameworks 2*

### 2）主题系统

视觉层不是“每次临时发挥”，而是使用可切换的主题系统来约束输出。

#### 主题示例：暗夜橙光

*Theme example 1*

#### 主题示例：深蓝碧海

*Theme example 2*

#### 主题示例：墨绿暖沙

*Theme example 3*

#### 主题示例：暗紫金调

*Theme example 4*

---

## 文件结构

```text
.
├── README.md
├── SKILL.md
├── assets/
│   ├── storytelling-frameworks-1.png
│   ├── storytelling-frameworks-2.png
│   ├── theme-dark-night-orange-glow.png
│   ├── theme-deep-sea-blue.png
│   ├── theme-forest-green-warm-sand.png
│   └── theme-deep-purple-gold.png
└── references/
    ├── content-strategy.md
    ├── core-patterns.md
    └── color-palettes.md
```

- **SKILL.md**：主工作流，定义 intake 清单、制稿步骤和执行规则
- **references/content-strategy.md**：如何把零散讲稿整理成一页页可讲的幻灯片
- **references/core-patterns.md**：PptxGenJS 模板、版式模式、图片处理和实现规则
- **references/color-palettes.md**：多套可切换的配色系统，适配不同场景和气质

---

## 工作流

### 1）先 intake
在真正做幻灯片前，先收集这些信息：

- 目标受众
- 演讲时长
- 标题或核心观点
- 提纲 / 章节结构
- 讲稿要点 / 例子 / 数据
- 截图或配图素材
- 主题或配色偏好

### 2）先设计故事，再设计页面
先给出逐页的大纲，再进入代码生成。因为在 outline 阶段改结构，远比做完整套 deck 之后返工便宜。

### 3）按规则生成 deck
使用 `references/core-patterns.md` 里的 PptxGenJS 版式规则，以及 `references/color-palettes.md` 里的主题系统来生成整套幻灯片。

### 4）做视觉 QA
渲染、检查、修正，再交付成品。

---

## 设计原则

- **全局统一使用微软雅黑**
- **图片绝不允许拉伸变形**
- **不同页型使用不同背景层级**
- **不要在多个 `addText()` 调用间复用可变配置对象**
- **PptxGenJS 的颜色值使用不带 `#` 的十六进制**

---

## 适合处理的请求

- “帮我做一个 PPT”
- “把这个提纲做成演示文稿”
- “按我的讲稿生成一套幻灯片”
- “把这份 deck 换一个更好的主题”
- “做一套以截图为主但版式别崩的展示稿”

---

## 使用方式

如果你在用支持 skills 的 coding agent，把这个仓库放进你的 skills 目录，并以 `SKILL.md` 作为主入口加载即可。

需要更高保真行为时，再结合 `references/` 里的细分规范一起使用。

---

## License

MIT
```

## 参考资料

### color-palettes.md

```
# Color Palettes — Dark-Cream System

All five themes share the same semantic variable names (`C.darkBg`, `C.cream`, `C.orange`, etc.) so that slide code requires **zero changes** when swapping themes. Just replace the `C` object at the top of `slides.js`.

---

## How to Apply a Theme

Copy the chosen `C = { ... }` block verbatim and paste at the top of `slides.js`, replacing any existing palette.

---

## Theme 1 — 暗夜橙光 (Deep Night, Burnt Orange)

**Mood:** Professional, dramatic. Warm tension between cool navy and burnt orange. The original palette for《从Chatbot到Agent》.

```js
const C = {
  darkBg:    "1C1C2E",   // deep navy — cover, section, dark slides
  sectionBg: "252540",   // slightly lighter navy for section dividers
  cream:     "F5F0E8",   // warm cream — all content slides
  white:     "FFFFFF",
  orange:    "D97449",   // burnt orange — primary accent, CTAs, highlights
  blue:      "5B8CDB",   // secondary accent
  teal:      "4ABFBF",   // tertiary accent
  green:     "4CAF7D",   // positive / success
  textDark:  "1C1C2E",   // body text on cream
  textLight: "F5F0E8",   // body text on dark
  muted:     "9090A8",   // secondary text, captions
  divider:   "3A3A5C",   // horizontal rules, shape strokes on dark
  cardBorder:"E0D8CE",   // card borders on cream
};
```

*Accent usage guide: orange → primary headlines/CTAs; blue → tech/data; teal → process/flow; green → positive outcomes.*

---

## Theme 2 — 深蓝碧海 (Deep Sea, Teal)

**Mood:** Calm, trustworthy, slightly clinical. Works well for research, data-heavy, or health/science presentations.

```js
const C = {
  darkBg:    "0D1B2A",   // ocean deep blue
  sectionBg: "162336",   // mid-ocean blue for section dividers
  cream:     "F7F3EC",   // warm ivory content background
  white:     "FFFFFF",
  orange:    "2EBFA5",   // primary accent → teal (replaces orange role)
  blue:      "4A90D9",   // secondary accent — sky blue
  teal:      "1AADA0",   // deeper teal for variety
  green:     "3DB87A",   // positive/success
  textDark:  "0D1B2A",
  textLight: "EEF4F8",
  muted:     "7A92A8",
  divider:   "1E3048",
  cardBorder:"DFD9D0",
};
```

*Note: `C.orange` here is teal — it fills the "primary accent" role across all templates without changing variable names.*

---

## Theme 3 — 墨绿暖沙 (Forest Dark, Coral)

**Mood:** Organic, warm, earthy. Suits branding, consumer insights, lifestyle product research.

```js
const C = {
  darkBg:    "1A2E20",   // deep forest green
  sectionBg: "233B2A",   // slightly lighter forest
  cream:     "F5EDD6",   // warm sand / parchment
  white:     "FFFFFF",
  orange:    "E8734A",   // coral — primary accent (replaces orange role)
  blue:      "5B9E8C",   // sage teal — secondary
  teal:      "3A8C7A",   // deeper sage
  green:     "6AB870",   // lighter forest green for positives
  textDark:  "1A2E20",
  textLight: "F5EDD6",
  muted:     "8A9E90",
  divider:   "2E4E38",
  cardBorder:"E0D4B8",
};
```

---

## Theme 4 — 暗紫金调 (Deep Purple, Gold)

**Mood:** Premium, editorial, slightly mysterious. Good for executive presentations, brand strategy, AI/tech with a luxury feel.

```js
const C = {
  darkBg:    "1E1A2E",   // deep violet-navy
  sectionBg: "29233F",   // lighter violet for section dividers
  cream:     "F5F0E8",   // same warm cream as Theme 1
  white:     "FFFFFF",
  orange:    "D4A853",   // warm gold — primary accent (replaces orange role)
  blue:      "7B6FCC",   // violet — secondary
  teal:      "5B9FBF",   // steel blue — tertiary
  green:     "6AAF7D",   // sage green for positives
  textDark:  "1E1A2E",
  textLight: "F0EBE8",
  muted:     "9488B0",
  divider:   "3D3460",
  cardBorder:"E5DDD0",
};
```

---

## Theme 5 — 铁青暖橙 (Steel Dark, Amber)

**Mood:** Technical yet approachable. High contrast, slightly industrial. Good for engineering/product/AI-focused audiences.

```js
const C = {
  darkBg:    "1A1F2E",   // steel charcoal-navy
  sectionBg: "222840",   // mid-steel
  cream:     "F0EBE1",   // warm linen
  white:     "FFFFFF",
  orange:    "E8952A",   // amber — primary accent
  blue:      "4E8FCC",   // electric blue — secondary
  teal:      "3AAFB8",   // cyan-teal — tertiary
  green:     "56B87A",   // positive
  textDark:  "1A1F2E",
  textLight: "EEF0F5",
  muted:     "8898B8",
  divider:   "2E3850",
  cardBorder:"DDD8CE",
};
```

---

## Accent Color Assignment Guide

All templates use these semantic roles. When switching themes, the accent colors shift but the template code stays the same:

| Variable | Semantic role | Template usage |
|---|---|---|
| `C.orange` | Primary accent | Section numbers, card headers, CTA buttons, highlighted rows, timeline markers |
| `C.blue` | Secondary accent | Tags, subtle badges, secondary highlights |
| `C.teal` | Tertiary accent | Third timeline item, additional variety in multi-card layouts |
| `C.green` | Positive / success | "Good" column in comparisons, achieved milestones, positive data |
| `C.muted` | Captions & secondary text | Subtitles, body copy on dark, speaker notes style |
| `C.divider` | Dark-bg strokes | Card borders, rule lines on dark slides |
| `C.cardBorder` | Cream-bg strokes | Card borders, rule lines on cream slides |

---

## Pairing Notes

- **Text on `cream` backgrounds:** use `C.textDark`
- **Text on `darkBg`/`sectionBg` backgrounds:** use `C.textLight`
- **Dark card on cream slide:** use `C.darkBg` fill + `C.textLight` text (creates contrast pop)
- **Accent on dark slide:** `C.orange` (primary) pops well against all five dark backgrounds
- **Section number watermark:** use `C.divider` (very low contrast, intentional)
```

### content-strategy.md

```
# Content Strategy — From Talk to Slides

## The Core Constraint: Slides Per Minute

Use this formula to set expectations before the outline:

| Duration | Total slides (guidance) | Pace |
|---|---|---|
| 15 min | 10–14 | Fast, one idea per slide, minimal reading |
| 30 min | 18–24 | Moderate, some slides carry more weight |
| 40–45 min | 24–32 | Room for image showcases and build-up |
| 60 min | 32–45 | Can afford detailed walkthroughs |

**Rule of thumb:** 1–1.5 minutes per content slide. Section dividers and the cover/closing count as ~30 seconds each. A 40-minute talk with 4 sections and a cover + close lands around 28–32 slides total.

If the user has more content than the duration allows, help them cut. It's better to do fewer ideas well than rush through all of them.

---

## Slide Architecture from an Outline

Given a talk structure (e.g., 4 parts with rough time allocations), build the outline like this:

```
Cover (1 slide)
Agenda / 今天聊什么 (1 slide)

Part 1 — [Title] (~N slides)
  Section divider (1)
  [Content slides]

Part 2 — [Title] (~N slides)
  Section divider (1)
  [Content slides]

...

Closing / Q&A / 谢谢 (1–2 slides)
```

The agenda slide serves double duty: it previews the structure AND acts as a cognitive anchor the audience returns to mentally throughout the talk.

---

## Translating Speaking Notes into Slides

The user will often give you a paragraph of speaking ideas — a mix of what they want to *say* and what they want to *show*. Your job is to separate these:

- **What goes on the slide:** the claim, the structure, the data point, the visual
- **What stays in the speaker's head (or notes):** the story, the context, the "why this matters"

### The One-Idea Rule
Each content slide should deliver exactly one idea. If a slide needs two headers, it should probably be two slides. The title of the slide should be the *conclusion*, not the *topic*:

```
Weak title (topic): "AI 的能力变化"
Strong title (conclusion): "AI 能干的活，每 7 个月翻一倍"
```

A strong title means someone can skim the deck and still understand the argument.

### Turning a Story into a Slide

When the user gives you a case study or anecdote (e.g., "I want to talk about how we used a Skill to do survey deployment"), convert it like this:

1. **Title = the payoff** of the story ("输入研究目的 → 自动生成题目 → 一键投放腾讯问卷")
2. **Body = the structure** that makes the payoff believable (input → process → output, or before/after)
3. **Visual = the evidence** (screenshot of the output, or a placeholder if the screenshot isn't ready)

The story itself — the context, the surprise, the human moment — is for the speaker to deliver verbally. The slide just provides the skeleton.

### Turning Data into a Slide

When the user gives you a specific number or research finding (e.g., "METR研究发现，AI 能处理的任务时长每 7 个月翻倍"):

1. **Make the number the hero** — large font, prominent position
2. **Source is mandatory** — small, below the number ("— METR 研究数据")
3. **One interpretation line** — what this means for the audience ("以前需要等 AI 够强才考虑的工作，现在可以规划了")

Avoid surrounding the key number with too much text. White space amplifies impact.

### Turning a Comparison into a Slide

When the user wants to contrast two things (e.g., Chatbot vs Agent):

- Use the **two-column layout** from `core-patterns.md`
- Left = the "before" / familiar thing (lighter card)
- Right = the "after" / new thing (dark card with accent border — signals this is where attention should go)
- A single VS divider in the center guides the eye
- Keep bullet points parallel in structure across both columns

### Turning a Process into a Slide

When the user has a sequence of steps (e.g., "研究策划 → 访谈设计 → 数据采集 → 分析 → 报告"):

- Use a **horizontal timeline** or **numbered card row**
- 3–5 steps is the visual sweet spot — more than 5 and it gets hard to scan
- Highlight the step the talk is currently focused on (accent background color)
- Each step card: step number + step name + 1-line description

---

## Slide Density by Content Type

Some slides earn more time than others. Here's a rough calibration:

| Content type | Time on screen | Why |
|---|---|---|
| Section divider | 15–30 sec | Just signals a transition |
| "Setup" context slide | 30–60 sec | Audience reads fast, speaker bridges |
| Data / argument slide | 60–90 sec | Audience needs to absorb + speaker explains |
| Image showcase / screenshot | 60–120 sec | Walkthrough takes time |
| Comparison (2-column) | 90–120 sec | Two things to process |
| Multi-step process | 60–90 sec | Build-up if animating, quick if static |

Use this to sanity-check the outline: sum up the estimated times, see if it fits the duration.

---

## Handling "I Have More Content Than Time"

This is the most common problem. Help the user prioritize:

1. **Must-have slides:** the core argument, the key evidence, the call to action
2. **Nice-to-have slides:** supporting examples, extra case studies, appendix material
3. **Cut completely:** context the audience likely already knows, slides that exist only to be thorough

Suggest moving cut content to an appendix section at the end of the deck — it's available for Q&A but doesn't eat into the talk.

---

## Handling Placeholder Screenshots

When the user mentions a screenshot they want to include but haven't provided yet:

1. Build a **placeholder box** (light gray fill, dashed border, italic label in the center)
2. Note the image key in a comment: `// TODO: replace placeholder with actual screenshot`
3. Make the bounding box the right proportion for the expected content (browser screenshot → 16:9, mobile → portrait, etc.)

This lets the user review the deck structure before hunting down all the screenshots.

```js
// Placeholder pattern
slide.addShape(pres.ShapeType.rect, {
  x: 0.4, y: 1.1, w: 9.2, h: 4.1,
  fill: { color: "EAE6E0" }, line: { color: "D4CBC0", width: 1, dashType: "dash" },
});
slide.addText("[ 截图占位：描述内容 ]", {
  x: 0.4, y: 2.8, w: 9.2, h: 0.6,
  fontSize: 17, color: "A89880", fontFace: F,
  align: "center", italic: true, margin: 0,
});
```

---

## Audience Calibration

The target audience changes almost everything about content density and framing:

| Audience | Implication |
|---|---|
| **同行 / 专业同类** | Skip basics, go deep on mechanism and nuance |
| **同公司跨部门** | Explain domain terms, lead with "why this matters for your work" |
| **管理层 / 决策者** | Lead with implications and decisions, keep technical detail minimal |
| **外部公开 / 行业活动** | Assume no prior context, invest in setup slides |
| **混合** | Design for the least-informed, create "depth layers" (main slide + optional deep-dive) |

For the 《从Chatbot到Agent》 talk (用研从业者, 40 min):
- Audience: practitioners who use AI tools daily but may not know the agent/chatbot distinction technically
- Approach: start from their felt experience (AI 变强的感受), build up vocabulary, land on practical takeaways
- Avoid: pure tech jargon without grounding, theoretical framing without examples

---

## Deck-Level Narrative Arc

选择弧线是做 PPT 最先要确定的事之一——它决定了分区结构、情绪节奏、以及哪种类型的听众会被打动。以下是六种经典弧线，每种都有它最擅长的场景。

---

### ① 英雄之旅 (Hero's Journey)
**情绪曲线：** 出发 → 遭遇挑战 → 低谷/顿悟 → 蜕变归来

**适合：** 公司/产品创业故事、个人成长经历、团队复盘（有过真实困难的）

**结构模板：**
```
1. 起点：我们/我在哪里（平静的世界）
2. 触发：发生了什么，打破了平衡
3. 挣扎：尝试过什么、为什么失败、最难的时刻
4. 顿悟：关键的转折点或洞察
5. 蜕变：做了什么不同的事
6. 收获：结果 + 对观众的启示
```

**讲者注意：** 情绪驱动的弧线，低谷段必须够真实才有说服力。如果"挣扎"部分被轻描淡写，观众不会被打动。顿悟要具体，不能只说"我们想明白了"。

---

### ② 问题—解方 (Problem → Solution)
**情绪曲线：** 制造紧张 → 释放紧张

**适合：** 路演、商业提案、产品发布、内部项目立项汇报

**结构模板：**
```
1. 痛点放大：让观众感受到问题有多真实、多普遍、多昂贵
2. 现有方案的不足：为什么已有的解法不够好
3. 解方登场：你的答案是什么
4. 证据：为什么这个解方有效（数据、案例、演示）
5. 行动号召：观众下一步该做什么
```

**关键：** "痛点放大"要够痛，否则解方显得多余。用真实数据或具体场景描述痛苦，不要用抽象的"效率低下"。

---

### ③ 钻石结构 / 金字塔原理 (Pyramid Principle)
**情绪曲线：** 平稳推进，逻辑驱动，无起伏

**适合：** 高管汇报、咨询提案、决策型会议、需要快速传达结论的场景

**结构模板：**
```
1. 结论先行：一句话说清楚你要什么/建议什么
2. 支柱论点1：支持结论的第一个理由 + 证据
3. 支柱论点2：支持结论的第二个理由 + 证据
4. 支柱论点3：支持结论的第三个理由 + 证据
5. 重申结论 + 下一步行动
```

**关键：** 结构越严谨，故事性越弱。适合"决策方听众"（已经信任你，只需要数据佐证），不适合"需要被说服的听众"（他们需要情感共鸣才会改变立场）。

---

### ④ 世界改变了 (The World Has Changed)
**情绪曲线：** 震撼/焦虑 → 理解 → 行动方向

**适合：** AI/技术趋势分享、行业转型判断、"为什么现在做这件事"的说明

**结构模板：**
```
1. 断层：展示一个"过去"和"现在"的鲜明对比，让观众感受到世界已经不同了
2. 为什么变了：驱动变化的底层力量（技术、政策、用户行为）
3. 输家和赢家：不适应的人/公司/方式会怎样
4. 你的方案是新世界的入场券：用你的方法/产品才能抓住新机会
5. 行动：现在该做什么
```

**关键：** "断层"要有具体数据或故事，不能只说"AI 发展很快"。《从Chatbot到Agent》用的就是这个弧线——用"能力每7个月翻倍"做断层，用 MCP/A2A/Skills 说明基础设施已成形，用 OpenClaw 出现说明入场券已经有了。

---

### ⑤ Sparkline（南希·杜阿尔特框架）
**情绪曲线：** 现实与理想反复拉锯 → 理想最终胜出

**适合：** TED 级演讲、激励型分享、变革动员、需要让观众"感受到落差痛苦"然后主动改变的场景

**结构模板：**
```
现实（What Is）  ←→  理想（What Could Be）
现实（困难）     ←→  理想（突破）
现实（现状局限） ←→  理想（用新工具之后）
...重复对比拉锯...
最终：以理想胜出、呼吁行动收尾（"New Bliss"）
```

**关键：** 不是简单的"前后对比"——而是**反复拉锯**，让落差感在演讲全程持续积累。每次回到"现实"都更让人难受，每次展示"理想"都更让人向往。结尾必须留给"理想"，不能以现实收场。

**幻灯片设计提示：** 用两种视觉语调交替出现：现实段用偏灰/冷的色调，理想段用暖色/强调色。结尾 slide 用全幅强调色收尾。

---

### ⑥ 三幕剧 (Three-Act Structure)
**情绪曲线：** 铺垫 → 冲突 → 释然

**适合：** 最通用的叙事容器。用研报告、培训课程、案例分享、项目复盘都能套用。

**结构模板：**
```
第一幕（铺垫/Setup）：
  - 介绍背景、人物、情境
  - 给信息，建立理解

第二幕（冲突/Confrontation）：
  - 核心矛盾或挑战
  - 尝试与失败，或困境深化
  - 给张力，激发关注

第三幕（解决/Resolution）：
  - 方案出现，冲突化解
  - 结果与启示
  - 给释然，引向行动
```

**关键：** 第二幕冲突要够真实，才能让第三幕的解决有意义。如果直接从铺垫跳到解决，观众不会觉得解决方案来之不易，也不会真正被打动。

---

## 弧线选择指南

| 场景 | 推荐弧线 |
|---|---|
| 创业/产品路演 | ② 问题—解方 |
| AI/行业趋势分享 | ④ 世界改变了 |
| 个人成长/公司故事 | ① 英雄之旅 |
| 高管汇报/咨询提案 | ③ 钻石结构 |
| TED 式激励演讲 | ⑤ Sparkline |
| 用研报告/培训/案例分享 | ⑥ 三幕剧 |
| 想要最大灵活性 | ⑥ 三幕剧（最通用容器）|

**一个实用判断方法：** 问自己"我想让观众听完之后*做*什么还是*感受*什么"。如果是做决策 → 钻石结构；如果是感受震撼然后行动 → Sparkline 或世界改变了；如果是理解一个复杂情况 → 三幕剧；如果是信任你这个人 → 英雄之旅。

**无论选哪种弧线：** 确保弧线在分区标题里可见，不能只在讲者脑子里。观众应该能从幻灯片标题重建整个论点。
```

### core-patterns.md

```
# Core PptxGenJS Patterns

## Boilerplate Setup

```js
const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";  // 10 × 5.625 inches
pres.title = "Your Title";

const F = "Microsoft YaHei";  // font shorthand — use everywhere
const BASE = "/path/to/assets/";
```

---

## Image Registry

Declare every image's **original pixel dimensions** upfront. This is required for the `imgFit()` helper to compute non-stretched display sizes.

```js
const IMG = {
  myChart:   { path: BASE + "chart.png",   w: 1440, h: 900  },
  myPhoto:   { path: BASE + "photo.jpg",   w: 2400, h: 1600 },
  myScreen:  { path: BASE + "screen.png",  w: 1920, h: 1080 },
};
```

To get pixel dimensions of an image file:
```bash
python3 -c "from PIL import Image; im=Image.open('file.png'); print(im.size)"
# or: identify -format "%wx%h\n" file.png
```

---

## imgFit() Helper — Non-Stretching Image Placement

This helper computes the largest centered display size that fits inside a bounding box while maintaining the original aspect ratio. Always use it instead of `sizing: {type:"contain"}`.

```js
/**
 * Fit image inside box (center-aligned, aspect-ratio preserved).
 * @param {string} imgKey  — key in IMG object
 * @param {number} boxX    — box left edge (inches)
 * @param {number} boxY    — box top edge (inches)
 * @param {number} boxW    — box width (inches)
 * @param {number} boxH    — box height (inches)
 * @returns object ready to pass directly to slide.addImage()
 */
function imgFit(imgKey, boxX, boxY, boxW, boxH) {
  const { path, w: origW, h: origH } = IMG[imgKey];
  const ratio = Math.min(boxW / origW, boxH / origH);
  const w = parseFloat((origW * ratio).toFixed(3));
  const h = parseFloat((origH * ratio).toFixed(3));
  const x = parseFloat((boxX + (boxW - w) / 2).toFixed(3));
  const y = parseFloat((boxY + (boxH - h) / 2).toFixed(3));
  return { path, x, y, w, h };
}
```

**Usage:**
```js
// Image centered and fitted inside a 9×4 inch box starting at (0.5, 1.2)
slide.addImage(imgFit("myChart", 0.5, 1.2, 9.0, 4.0));
```

**Screenshot with visible breathing room** — add a subtle inset of ~0.15in on each side:
```js
// Box is 9.0 wide, give 0.15 padding → effective box is 8.7 wide
slide.addImage(imgFit("myScreen", 0.65, 1.35, 8.7, 3.8));
```

---

## Slide Type Templates

### Cover Slide
```js
const slide = pres.addSlide();
slide.background = { color: C.darkBg };

// Eyebrow / subtitle above main title
slide.addText("副标题 · 场景描述  ·  2026", {
  x: 0.9, y: 1.6, w: 8.0, h: 0.45,
  fontSize: 13, color: C.muted, fontFace: F,
  align: "left", margin: 0, charSpacing: 1.5,
});

// Main title — large, two lines typical
slide.addText("主标题第一行", {
  x: 0.9, y: 2.1, w: 8.8, h: 1.1,
  fontSize: 62, bold: true, color: C.textLight, fontFace: F,
  align: "left", margin: 0,
});
slide.addText("主标题第二行", {
  x: 0.9, y: 3.0, w: 8.8, h: 1.1,
  fontSize: 62, bold: true, color: C.orange, fontFace: F,
  align: "left", margin: 0,
});

// Speaker name bottom-left
slide.addText("Your Name  ·  Role", {
  x: 0.9, y: 4.8, w: 4.0, h: 0.4,
  fontSize: 14, color: C.muted, fontFace: F,
  align: "left", margin: 0,
});
```

### Section Divider Slide
```js
function sectionSlide(num, title, subtitle) {
  const slide = pres.addSlide();
  slide.background = { color: C.sectionBg };

  // Large section number — watermark style
  slide.addText(num, {
    x: -0.3, y: -0.6, w: 5.5, h: 4.5,
    fontSize: 280, bold: true, color: C.divider, fontFace: F,
    align: "left", margin: 0,
  });

  // Orange underline accent
  slide.addShape(pres.ShapeType.rect, {
    x: 0.9, y: 3.38, w: 1.1, h: 0.07,
    fill: { color: C.orange }, line: { color: C.orange, width: 0 },
  });

  slide.addText(title, {
    x: 0.9, y: 3.5, w: 7.0, h: 0.85,
    fontSize: 48, bold: true, color: C.textLight, fontFace: F,
    align: "left", margin: 0,
  });
  slide.addText(subtitle, {
    x: 0.9, y: 4.35, w: 7.5, h: 0.55,
    fontSize: 16, color: C.muted, fontFace: F,
    align: "left", margin: 0,
  });
}
```

### Standard Content Slide (cream background)
```js
const slide = pres.addSlide();
slide.background = { color: C.cream };

// Slide title
slide.addText("Slide Title", {
  x: 0.65, y: 0.35, w: 8.7, h: 0.65,
  fontSize: 30, bold: true, color: C.textDark, fontFace: F,
  align: "left", margin: 0,
});

// Optional muted subtitle
slide.addText("Supporting context line", {
  x: 0.65, y: 0.92, w: 8.7, h: 0.38,
  fontSize: 15, color: C.muted, fontFace: F,
  align: "left", margin: 0,
});

// Title divider line
slide.addShape(pres.ShapeType.line, {
  x: 0.65, y: 1.28, w: 8.7, h: 0,
  line: { color: C.cardBorder, width: 1 },
});
```

### Image Showcase Slide
A content slide where the main area is an image. Give the image a slight background card for visual separation:

```js
const slide = pres.addSlide();
slide.background = { color: C.cream };

// Title (same as standard)
slide.addText("截图标题", {
  x: 0.65, y: 0.35, w: 8.7, h: 0.65,
  fontSize: 30, bold: true, color: C.textDark, fontFace: F,
  align: "left", margin: 0,
});

// Optional: light card behind the image
slide.addShape(pres.ShapeType.rect, {
  x: 0.4, y: 1.1, w: 9.2, h: 4.1,
  fill: { color: "EAE6E0" }, line: { color: "D4CBC0", width: 1 },
  shadow: { type:"outer", color:"000000", blur:12, offset:3, angle:135, opacity:0.08 },
});

// Image fitted inside card (with ~0.15in inner padding)
slide.addImage(imgFit("myScreen", 0.55, 1.25, 8.9, 3.8));
```

### Two-Column Layout
```js
const slide = pres.addSlide();
slide.background = { color: C.cream };

// Left column card
slide.addShape(pres.ShapeType.rect, {
  x: 0.4, y: 1.35, w: 4.3, h: 3.8,
  fill: { color: C.white }, line: { color: C.cardBorder, width: 1 },
  shadow: { type:"outer", color:"000000", blur:8, offset:2, angle:135, opacity:0.06 },
});
slide.addText("Left column title", {
  x: 0.65, y: 1.6, w: 3.8, h: 0.5,
  fontSize: 18, bold: true, color: C.textDark, fontFace: F, align: "left", margin: 0,
});
// ... left content

// VS divider (optional)
slide.addText("VS", {
  x: 4.55, y: 2.8, w: 0.9, h: 0.55,
  fontSize: 20, bold: true, color: C.muted, fontFace: F,
  align: "center", margin: 0,
});

// Right column card
slide.addShape(pres.ShapeType.rect, {
  x: 5.3, y: 1.35, w: 4.3, h: 3.8,
  fill: { color: C.darkBg }, line: { color: C.divider, width: 1.5 },
  shadow: { type:"outer", color:"000000", blur:12, offset:3, angle:135, opacity:0.15 },
});
```

### Card Grid (2×2 or 1×3)
```js
// 2×2 grid
const cards = [
  { title:"Card 1", desc:"Description text.", x: 0.4,  y: 1.3 },
  { title:"Card 2", desc:"Description text.", x: 5.05, y: 1.3 },
  { title:"Card 3", desc:"Description text.", x: 0.4,  y: 3.35 },
  { title:"Card 4", desc:"Description text.", x: 5.05, y: 3.35 },
];
const cW = 4.55, cH = 1.85;
cards.forEach(card => {
  slide.addShape(pres.ShapeType.rect, {
    x: card.x, y: card.y, w: cW, h: cH,
    fill: { color: C.white }, line: { color: C.cardBorder, width: 1 },
    shadow: { type:"outer", color:"000000", blur:6, offset:1, angle:135, opacity:0.06 },
  });
  slide.addText(card.title, {
    x: card.x + 0.25, y: card.y + 0.2, w: cW - 0.5, h: 0.45,
    fontSize: 16, bold: true, color: C.textDark, fontFace: F, align: "left", margin: 0,
  });
  slide.addText(card.desc, {
    x: card.x + 0.25, y: card.y + 0.7, w: cW - 0.5, h: 1.0,
    fontSize: 13, color: C.muted, fontFace: F, align: "left", margin: 0,
  });
});
```

---

## Rich Text (Multi-Style Within One Box)

Use an array of `{text, options}` objects for mixed bold/italic/colors within one text block. Always include `fontFace: F` in the outer `addText` options:

```js
slide.addText([
  { text: "普通文字，", options: { breakLine: true } },
  { text: "加粗标签", options: { bold: true, breakLine: true } },
  { text: "斜体备注", options: { italic: true, color: C.muted } },
], {
  x: 0.65, y: 1.5, w: 8.0, h: 3.0,
  fontSize: 14, color: C.textDark, fontFace: F, valign: "top", margin: 0,
});
```

**Note:** `breakLine: true` acts like `<br>`. Add `{ text: "\n", options: {} }` for an explicit blank line between paragraphs.

---

## Saving the File

```js
const OUTPUT = BASE + "output.pptx";
pres.writeFile({ fileName: OUTPUT })
  .then(() => console.log("✅ DONE:", OUTPUT))
  .catch(err => { console.error("❌ Error:", err); process.exit(1); });
```

---

## Common Pitfalls

| Problem | Cause | Fix |
|---|---|---|
| CJK text renders in Latin font | Missing `fontFace: F` | Add to every `addText()` |
| Image looks squished or stretched | Using `sizing:{type:"contain"}` | Use `imgFit()` helper |
| `SyntaxError` on Chinese line | ASCII `"` inside JS string | Escape as `\"` |
| Second slide has wrong background | Shared options object mutated | Write fresh inline objects |
| Colors look different in viewer | Using `#RRGGBB` format | Use bare `RRGGBB` hex |
| Text overflows box | Font metrics differ by OS | Test with LibreOffice QA |
```
