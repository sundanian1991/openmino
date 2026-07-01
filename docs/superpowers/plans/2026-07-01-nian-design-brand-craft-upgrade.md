# nian-design 品牌工艺质感升级 · 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把 nian-design 从"组件拼装工"升级为"品牌质感施工方"——新增质感层、重构 workflow、收敛资源、强化 Hero、统一场景品牌贯穿。

**Architecture:** 5 层改动按依赖顺序执行：① 质感层（新资产）→ ② Workflow（SKILL.md 重构）→ ③ 资源收敛（组件/规则/变体精简）→ ④ Hero 强化（新专章）→ ⑤ 场景统一（品牌贯穿 + 规则）。每层独立可测、独立提交。

**Tech Stack:** Markdown（SKILL/rules）、HTML/CSS/SVG（texture-palette、Hero 骨架、Colophon）、Node.js（现有 validate 脚本）。

**Spec:** `docs/superpowers/specs/2026-07-01-nian-design-brand-craft-upgrade-design.md`

**基准路径:** `/Users/sundanian/Documents/projects/ai-agents/my-agent/.agents/skills/nian-design/`（下文简称 `$ND`）

---

## 文件结构总览

| 动作 | 文件 | 职责 |
|---|---|---|
| 新建 | `$ND/references/templates/base/texture-palette.css` | 5 种质感方案的 SVG/CSS 实现 |
| 新建 | `$ND/references/HERO-MODES.md` | 4 种品牌 Hero 模式骨架 |
| 新建 | `$ND/references/COLOPHON.md` | 品牌收束页标准 |
| 修改 | `$ND/SKILL.md` | Workflow 重构 + 质感前置 + 资源索引更新 |
| 修改 | `$ND/references/CRAFT-RULES.md` | 新增 Rule 1b/6a/6b/11 + 编号同步 |
| 修改 | `$ND/references/COMPONENTS-MASTER.md` | 63 组件标 CORE/EXTENDED，CORE 12 前置 |
| 修改 | `$ND/references/COLOR-USAGE-RULES.md` | 合并 COLOR-GUIDE + DARK-MODE |
| 归档 | `$ND/references/_archive/2026-07-brand-upgrade/` | 4 个废弃规则文件 |
| 修改 | `$ND/../nian-decision-card/references/decision-card-schema.md` | 新增 textureProfile/textureAnchor/brandOverride 字段 |
| 修改 | `$ND/scripts/validate-nian-deck.mjs` | 扩展校验质感 token + QA 注释字段 |

---

## Task 1: 创建质感层 texture-palette.css

**Files:**
- Create: `$ND/references/templates/base/texture-palette.css`

这是整个升级的资产基础，后续所有步骤都引用它。先建文件。

- [ ] **Step 1: 创建 texture-palette.css，含 5 种质感方案**

文件结构：每个质感方案 = 1 个 CSS class（铺 body 用）+ 1 个锚点增强 class（Hero 用，opacity 翻倍）。全部用内联 SVG data-uri，零图片依赖。

写以下完整内容（关键约束：每个 opacity ≤ 0.06；锚点 class 名 = 方案名 + `--anchor`）：

```css
/* ============================================================
   Nian Design System — Texture Palette
   5 种工艺质感方案。工艺质感派（Hermès/观夏范式）的材质身份层。
   与 token-root.css 并列。Step 0.5 按决策矩阵选 1 种，全页统一。

   规则：
   - 默认铺 <body>；锚点 class 用于 Hero/金句区，opacity 可达上限
   - 全部 SVG data-uri，零图片依赖
   - opacity 上限 0.06（超过即脏，违反 brand-dna 克制原则）
   - 全页只用 1 种方案（Rule 6b），屏风 Hero 例外
   ============================================================ */

/* ─── 1. Linen 亚麻 ── 暖白底 + 极细经纬纹理，温润人文 ── */
/* 适用：Statement 品牌宣言 / 知识长文 */
.texture-linen {
  background-color: var(--color-offwhite);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.18 0 0 0 0 0.16 0 0 0 0 0.14 0 0 0 0.04 0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E");
}
.texture-linen--anchor {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.18 0 0 0 0 0.16 0 0 0 0 0.14 0 0 0 0.06 0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* ─── 2. Kraft 牛皮纸 ── 米黄底 + 粗纤维颗粒，朴素可信 ── */
/* 适用：Split SOP / 操作手册 / 技术文档 */
.texture-kraft {
  background-color: var(--color-cream);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.4' numOctaves='3' seed='5'/%3E%3CfeColorMatrix values='0 0 0 0 0.35 0 0 0 0 0.28 0 0 0 0 0.18 0 0 0 0.05 0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E");
}
.texture-kraft--anchor {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.4' numOctaves='3' seed='5'/%3E%3CfeColorMatrix values='0 0 0 0 0.35 0 0 0 0 0.28 0 0 0 0 0.18 0 0 0 0.06 0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* ─── 3. Bond 装帧纸 ── 冷白底 + 细密均匀颗粒，精密克制 ── */
/* 适用：Diagonal/Pulse 数据报告 / 决策建议 */
.texture-bond {
  background-color: var(--color-white);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.4 0 0 0 0 0.4 0 0 0 0 0.4 0 0 0 0.025 0'/%3E%3C/filter%3E%3Crect width='150' height='150' filter='url(%23n)'/%3E%3C/svg%3E");
}
.texture-bond--anchor {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.4 0 0 0 0 0.4 0 0 0 0 0.4 0 0 0 0.05 0'/%3E%3C/filter%3E%3Crect width='150' height='150' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* ─── 4. Forge 哑光金属 ── 深底 + 竖向拉丝，科技工业 ── */
/* 适用：Entrance 沉浸 / 科技工业气质 Hero */
.texture-forge {
  background-color: var(--color-charcoal);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.0 0.15' numOctaves='1'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.06 0'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)'/%3E%3C/svg%3E");
}
.texture-forge--anchor {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.0 0.15' numOctaves='1'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.06 0'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* ─── 5. Ink 油墨叠加 ── 浅底 + 不均匀墨色边缘，凸版印刷感 ── */
/* 适用：金句区 / 品牌宣言 / 核心结论（有印刷重量） */
.texture-ink {
  background-color: var(--color-offwhite);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.02 0.05' numOctaves='2' seed='3'/%3E%3CfeDisplacementMap in='SourceGraphic' scale='8'/%3E%3CfeColorMatrix values='0 0 0 0 0.1 0 0 0 0 0.09 0 0 0 0 0.08 0 0 0 0.05 0'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23n)'/%3E%3C/svg%3E");
}
.texture-ink--anchor {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.02 0.05' numOctaves='2' seed='3'/%3E%3CfeDisplacementMap in='SourceGraphic' scale='8'/%3E%3CfeColorMatrix values='0 0 0 0 0.1 0 0 0 0 0.09 0 0 0 0 0.08 0 0 0 0.06 0'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23n)'/%3E%3C/svg%3E");
}
```

- [ ] **Step 2: 浏览器肉眼校验 5 种质感可渲染**

创建临时校验文件 `/tmp/texture-preview.html`，body 分别套 5 个 class，每个占一屏。打开浏览器确认：纹理可见但不脏，opacity 感觉在 0.025-0.06 区间。

校验通过后删除临时文件。

- [ ] **Step 3: Commit**

```bash
cd $ND && git add references/templates/base/texture-palette.css
git commit -m "feat(nian-design): 新增质感层 texture-palette.css（5 种工艺质感方案）

Linen亚麻/Kraft牛皮纸/Bond装帧纸/Forge哑光金属/Ink油墨叠加。
全SVG实现零图片依赖，opacity≤0.06，工艺质感派材质身份层。
spec: docs/superpowers/specs/2026-07-01-nian-design-brand-craft-upgrade-design.md"
```

---

## Task 2: 扩展 CRAFT-RULES.md（新增 4 条规则）

**Files:**
- Modify: `$ND/references/CRAFT-RULES.md`

先把 CRAFT-RULES 的规则编号与 SKILL.md 对齐（当前文档头写"5 条"，SKILL 写"8 条"，需统一），再插入新规则。

- [ ] **Step 1: 读取当前 CRAFT-RULES.md 全文，确认现有规则编号**

Run: `cat $ND/references/CRAFT-RULES.md | head -20`
确认标题声称的规则数与实际正文规则数。当前已知：标题写"5 条硬规则"，正文有 Rule 1-5 左右。

- [ ] **Step 2: 在 CRAFT-RULES.md 末尾追加质感规则 6a/6b 章节**

在文件末尾（现有规则之后）追加：

```markdown
---

## 规则 6a · Texture Anchor（质感锚点）

### 规则

每页恰好 **1 个质感锚点区**（Hero 或金句 section）。锚点区质感 opacity 可达上限（0.06），其余 section 的质感底 opacity ≤ 0.03。

### 为什么

工艺质感派的高级感来自"可感知的工艺密度"。但密度不能均匀分布——均匀 = 满屏噪点。必须有一个"重点区"把材质感做足，其余区域安静承托。

### 自检方法

1. 找到页面的质感锚点区（应是 Hero 或 breakPoint 指定的金句区）
2. 该区是否用了 `--anchor` 增强版质感 class？
3. 其余 section 的质感是否退到背景（视觉上几乎不察觉）？

### 不通过的修法

- 没有锚点区 → Hero 升级为锚点（加 `--anchor` class）
- 多个区都在"抢"质感 → 只留 1 个锚点，其余降级
- 锚点区质感太弱 → 确认用了 `--anchor` 而非基础 class

---

## 规则 6b · Texture Coherence（质感统一）

### 规则

全页只用 **1 种质感方案**，不混搭。每个 section 共享同一种"材质身份"。

**唯一例外**：屏风 Hero 模式（HERO-MODES.md 模式 D）允许双层质感，必须在决策卡 `brandOverride` 标注。

### 为什么

混搭质感 = 每个区用不同的纸 = 失去品牌统一感。Hermès 的画册从头到尾是同一种纸材。材质一致性是品牌识别的核心。

### 自检方法

数一数页面用了几种 `texture-*` class（不含 `--anchor` 变体）：
- **1 种** → 通过
- **≥2 种** → 不通过（除非是屏风 Hero 且已标注）

### 不通过的修法

- 多种质感 → 全部统一为 Step 0.5 决策矩阵选定的那一种
- 屏风 Hero 双层 → 确认决策卡 `brandOverride` 已标注理由
```

- [ ] **Step 3: 追加 Hero 张力规则 1b（插在 Rule 1 之后）**

在 CRAFT-RULES.md 的 Rule 1 章节之后、Rule 2 之前插入：

```markdown
---

## 规则 1b · Hero Tension（Hero 张力）

### 规则

Hero 区恰好 **1 个"跳"元素 + 质感基底承托**。跳元素必须绑定高密度质感（Ink 或 Forge 锚点）。

| 元素 | 作用 | 质感绑定 |
|---|---|---|
| **跳**（1 个） | 压剧性元素：超大字 / 印章 / 装饰编号 | Ink 或 Forge `--anchor` |
| **沉**（基底） | 质感底，安静承托 | Linen/Bond/Kraft 基础 opacity ≤ 0.04 |

### 自检方法

眯眼看 Hero：
- 能一眼锁定 1 个"最跳"的元素吗？→ 能，通过
- 多个元素在争抢注意力？→ 不通过（视觉打架 = 平庸）
- 没有任何跳的元素？→ 不通过（达标但无记忆点）

### 不通过的修法

- 多个跳元素 → 选 1 个保留，其余降字号/降质感
- 没有跳元素 → 选 1 个元素放大并绑 Ink/Forge 锚点质感
```

- [ ] **Step 4: 追加品牌贯穿规则 11（文件末尾）**

在文件末尾追加：

```markdown
---

## 规则 11 · Brand Signature（品牌贯穿层）

### 规则

每页必须有品牌贯穿三件套：

| 锚点 | 权限 | 说明 |
|---|---|---|
| **Texture Base** | 🔒 不可豁免 | 全页统一质感底，品牌身份底线 |
| **Ghost Watermark** | 🟡 可豁免 | 每页 1 处，opacity 0.03-0.06 |
| **Colophon Footer** | 🟡 可豁免 | 品牌印记页脚（见 COLOPHON.md） |

**Texture Base 缺失 = 不通过。** Watermark/Colophon 可由决策卡 `brandOverride.brandWaiver` 豁免，但必须标注理由。

### 自检方法

1. 页面是否有 `<body class="texture-*">`？→ 无 = 不通过
2. 是否有 Ghost Watermark？→ 无则检查决策卡是否豁免
3. 是否有 Colophon Footer？→ 无则检查决策卡是否豁免

### 不通过的修法

- 缺 Texture Base → 按 Step 0.5 矩阵选定质感方案，加到 body
- 缺 Watermark/Colophon 且无豁免授权 → 补上，或回 nian-decision-card 加 brandWaiver
```

- [ ] **Step 5: 更新 CRAFT-RULES.md 文档头，统一规则数为 11**

将文档头的"5 条硬规则"改为"11 条硬规则（含质感/Hero/品牌贯穿）"，列出完整规则目录。

- [ ] **Step 6: Commit**

```bash
cd $ND && git add references/CRAFT-RULES.md
git commit -m "feat(nian-design): CRAFT-RULES 新增 4 条规则 + 编号统一

- Rule 1b Hero Tension（一跳一沉）
- Rule 6a/6b 质感锚点 + 质感统一
- Rule 11 品牌贯穿层（Texture Base 不可豁免）
- 文档头规则数同步为 11 条"
```

---

## Task 3: 扩展 nian-decision-card schema（新增字段）

**Files:**
- Modify: `$ND/../nian-decision-card/references/decision-card-schema.md`

新增 3 个可选字段，向后兼容。

- [ ] **Step 1: 读取 decision-card-schema.md，定位字段定义区块**

Run: `grep -n "visualStream\|palette\|heroType" $ND/../nian-decision-card/references/decision-card-schema.md`
找到现有字段定义的位置和格式，新字段沿用相同格式。

- [ ] **Step 2: 在 schema 中追加 textureProfile / textureAnchor 字段**

在 `palette` 字段定义之后插入：

```yaml
textureProfile:    linen       # 质感方案，5 选 1：linen/kraft/bond/forge/ink
                              # 缺失时由 nian-design Step 0.5 矩阵自决
textureAnchor:     hero        # 质感锚点 section，默认 hero
                              # 可选：hero / breakpoint / 自定义 section id
```

- [ ] **Step 3: 在 schema 中追加 brandOverride 字段**

在文件末尾字段区追加：

```yaml
brandOverride:                  # 品牌层覆盖（可选，全部子字段可选）
  colorRatio:                   # 色彩比例微调，必须在边界内（Primary 70-90%）
    primary: 0.85               # 例：从默认 80% 微调到 85%
  extraFont: doto               # 可选第四字体（仅 doto，装饰数字/Ghost 用）
  brandWaiver:                  # 品牌三件套豁免（Texture Base 不可豁免）
    - item: watermark           # 豁免项：watermark / colophon
      reason: "极简金句页，水印破坏留白"  # 必须配理由
```

- [ ] **Step 4: 在 schema 文档头补一句说明**

"以下 3 个字段（textureProfile / textureAnchor / brandOverride）为可选字段，缺失时 nian-design 按默认规则自决，不影响向后兼容。"

- [ ] **Step 5: Commit**

```bash
cd $ND/.. && git add nian-decision-card/references/decision-card-schema.md
git commit -m "feat(nian-decision-card): schema 新增质感/品牌覆盖字段

- textureProfile/textureAnchor（质感方案 + 锚点）
- brandOverride（色彩比例微调/扩展字体/三件套豁免）
- 全部可选，向后兼容，缺失时 nian-design 自决"
```

---

## Task 4: 创建 HERO-MODES.md（4 种品牌 Hero 模式）

**Files:**
- Create: `$ND/references/HERO-MODES.md`

- [ ] **Step 1: 创建文件，写入 4 种模式的完整骨架**

每种模式包含：适用场景、质感绑定、HTML 骨架模板（可直接复制）、跳元素说明。完整内容如下：

````markdown
# HERO MODES — 4 种品牌 Hero 模式

> 工艺质感派的开屏。每种模式把质感层和品牌手段绑定，不只是"大字 + 留白"。
> 施工时 Step 2 选完母版后，按决策卡 `heroType` 查本文件确定 Hero 模式。
> 核心原则：**一跳一沉**（Rule 1b）——1 个跳元素 + 质感基底承托。

---

## 模式 A · 材质 Hero

**适用**：品牌宣言、价值观主张（Statement 气质）
**质感绑定**：Forge 或 Linen，锚点 opacity 达上限
**跳元素**：衬线大字（Playfair Display, 96-120px），与材质咬合

```html
<section class="hero hero-material texture-forge--anchor">
  <div class="hero-material__inner">
    <span class="eyebrow">{{eyebrow}}</span>
    <h1 class="hero-material__title">{{title}}</h1>
    <p class="hero-material__sub">{{subtitle}}</p>
  </div>
</section>
<style>
  .hero-material { min-height: 90vh; display: grid; place-items: center; padding: var(--space-4xl) var(--space-3xl); }
  .hero-material__inner { max-width: 880px; }
  .hero-material__title { font-family: var(--font-display); font-weight: 300; font-size: clamp(48px, 8vw, 120px); line-height: 1.0; letter-spacing: -0.03em; color: var(--text-display); }
  .hero-material__sub { font-family: var(--font-body); font-size: var(--body-lg); color: var(--text-primary); margin-top: var(--space-lg); }
  .hero-material .eyebrow { font-family: var(--font-data); font-size: var(--label); letter-spacing: var(--ls-wide); text-transform: uppercase; color: var(--text-secondary); }
</style>
```

---

## 模式 B · 装帧 Hero

**适用**：知识长文、SOP（"翻开一本书"感）
**质感绑定**：Bond + Decorative Number
**跳元素**：左侧装帧元素（书脊色带 / 版口印章 / 编号铭牌）

```html
<section class="hero hero-bind texture-bond">
  <div class="hero-bind__spine"></div>
  <div class="hero-bind__body">
    <span class="hero-bind__num">{{chapterNum}}</span>
    <h1 class="hero-bind__title">{{title}}</h1>
    <p class="hero-bind__sub">{{subtitle}}</p>
  </div>
</section>
<style>
  .hero-bind { display: grid; grid-template-columns: 8px 1fr; min-height: 70vh; }
  .hero-bind__spine { background: var(--primary); }
  .hero-bind__body { padding: var(--space-4xl) var(--space-3xl); }
  .hero-bind__num { font-family: var(--font-decorative); font-size: clamp(64px, 10vw, 96px); color: var(--text-decorative); display: block; }
  .hero-bind__title { font-family: var(--font-display); font-weight: 400; font-size: clamp(36px, 5vw, 64px); color: var(--text-display); }
  .hero-bind__sub { font-family: var(--font-body); font-size: var(--body-lg); color: var(--text-primary); margin-top: var(--space-md); }
</style>
```

---

## 模式 C · 印章 Hero

**适用**：金句页、核心结论页
**质感绑定**：Ink，印章用 ghost 处理
**跳元素**：圆形/方形印章式打破（品牌徽记）

```html
<section class="hero hero-stamp texture-ink--anchor">
  <div class="hero-stamp__content">
    <h1 class="hero-stamp__quote">{{quote}}</h1>
  </div>
  <div class="hero-stamp__seal" aria-hidden="true">{{sealMark}}</div>
</section>
<style>
  .hero-stamp { position: relative; min-height: 80vh; display: grid; place-items: center; padding: var(--space-4xl); }
  .hero-stamp__quote { font-family: var(--font-display); font-weight: 300; font-size: clamp(40px, 6vw, 88px); line-height: 1.1; color: var(--text-display); max-width: 800px; }
  .hero-stamp__seal { position: absolute; top: 15%; right: 10%; width: 120px; height: 120px; border: 2px solid var(--text-decorative); border-radius: 50%; display: grid; place-items: center; font-family: var(--font-data); font-size: var(--label); letter-spacing: var(--ls-wide); text-transform: uppercase; color: var(--text-decorative); opacity: 0.4; transform: rotate(-12deg); }
</style>
```

---

## 模式 D · 屏风 Hero（唯一允许双层质感）

**适用**：数据报告首页、多指标开屏
**质感绑定**：双层质感例外（基底 + 面板）
**跳元素**：多面板锚点（每块不同材质密度）

```html
<section class="hero hero-screen">
  <div class="hero-screen__panel hero-screen__panel--main texture-bond--anchor">
    <h1 class="hero-screen__title">{{title}}</h1>
  </div>
  <div class="hero-screen__panel hero-screen__panel--data texture-bond">
    {{#each kpis}}<div class="hero-screen__kpi">{{value}}<span>{{label}}</span></div>{{/each}}
  </div>
</section>
<style>
  .hero-screen { display: grid; grid-template-columns: 1.4fr 1fr; min-height: 75vh; }
  .hero-screen__panel { padding: var(--space-4xl) var(--space-3xl); display: flex; flex-direction: column; justify-content: center; }
  .hero-screen__title { font-family: var(--font-display); font-weight: 400; font-size: clamp(40px, 6vw, 80px); color: var(--text-display); }
  .hero-screen__kpi { font-family: var(--font-data); font-size: clamp(32px, 4vw, 48px); color: var(--text-display); }
  .hero-screen__kpi span { display: block; font-size: var(--label); letter-spacing: var(--ls-wide); text-transform: uppercase; color: var(--text-secondary); }
</style>
```

**注意**：模式 D 是唯一允许双层质感的 Hero。基底面板用基础 opacity，主面板用 `--anchor`。使用时决策卡 `brandOverride` 必须标注。

---

## heroType 映射表

| 决策卡 heroType | 推荐模式 | 备注 |
|---|---|---|
| V4-Statement | A 材质 | 或 C 印章（金句型） |
| V1-Data / V2-Numeral | D 屏风 | 多指标开屏 |
| V3-Entrance | A 材质 | 沉浸感，Forge 质感 |
| 长文/SOP 默认 | B 装帧 | 书脊感 |
| 金句/宣言 | C 印章 | 印刷重量感 |
````

- [ ] **Step 2: 校验 4 个 HTML 骨架的 class 名与 token-root.css 一致**

Run: `grep -ohE "var\(--[a-z-]+\)" $ND/references/HERO-MODES.md | sort -u`
核对每个 `var(--*)` 都在 token-root.css 中有定义。重点确认 `--font-decorative`、`--text-decorative`、`--ls-wide` 存在；若不存在，记录到 Task 5（SKILL 重构时补 token）。

- [ ] **Step 3: Commit**

```bash
cd $ND && git add references/HERO-MODES.md
git commit -m "feat(nian-design): 新增 HERO-MODES.md（4 种品牌 Hero 模式）

材质Hero/装帧Hero/印章Hero/屏风Hero，每种绑定质感层。
一跳一沉原则 + heroType 映射表 + 可复制 HTML 骨架。"
```

---

## Task 5: 创建 COLOPHON.md（品牌收束页标准）

**Files:**
- Create: `$ND/references/COLOPHON.md`

- [ ] **Step 1: 创建文件**

```markdown
# COLOPHON — 品牌收束页标准

> 每页都以品牌签名结束。这是 nian 出品的最后一笔——强化"这是一份有品牌的出品"。
> Rule 11 要求 Colophon Footer 存在（除非决策卡 brandWaiver 豁免）。

---

## 标准结构

页脚分三栏，每栏职责固定：

```
┌─────────────────────┬──────────────────────┬─────────────────────────┐
│ 左：品牌身份          │ 中：文档元数据         │ 右：制作印记              │
├─────────────────────┼──────────────────────┼─────────────────────────┤
│ 品牌名（Playfair）    │ 版本号                │ Crafted with nian-design │
│ 一句话定位（Inter）    │ 日期                  │ texture: {方案名}        │
│                      │ 来源（JetBrains Mono） │                          │
└─────────────────────┴──────────────────────┴─────────────────────────┘
```

---

## HTML 骨架

```html
<footer class="colophon">
  <div class="colophon__brand">
    <span class="colophon__name">{{brandName}}</span>
    <span class="colophon__tagline">{{tagline}}</span>
  </div>
  <div class="colophon__meta">
    <span class="colophon__version">v{{version}} · {{date}}</span>
    <span class="colophon__source">{{source}}</span>
  </div>
  <div class="colophon__craft">
    <span class="colophon__mark">Crafted with nian-design</span>
    <span class="colophon__texture">texture: {{textureProfile}}</span>
  </div>
</footer>
<style>
  .colophon {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: var(--space-xl);
    padding: var(--space-2xl) var(--space-3xl);
    border-top: 1px solid var(--border);
    margin-top: var(--space-4xl);
  }
  .colophon__brand { display: flex; flex-direction: column; gap: var(--space-xs); }
  .colophon__name { font-family: var(--font-display); font-size: var(--heading-md); color: var(--text-display); }
  .colophon__tagline { font-family: var(--font-body); font-size: var(--body-sm); color: var(--text-secondary); }
  .colophon__meta { display: flex; flex-direction: column; gap: var(--space-xs); }
  .colophon__version, .colophon__source {
    font-family: var(--font-data); font-size: var(--label);
    letter-spacing: var(--ls-wide); text-transform: uppercase; color: var(--text-secondary);
  }
  .colophon__craft { display: flex; flex-direction: column; gap: var(--space-xs); text-align: right; }
  .colophon__mark { font-family: var(--font-body); font-size: var(--body-sm); color: var(--text-secondary); }
  .colophon__texture {
    font-family: var(--font-data); font-size: var(--label);
    letter-spacing: var(--ls-wide); text-transform: uppercase; color: var(--text-decorative);
  }
</style>
```

---

## 字段来源

| 字段 | 来源 |
|---|---|
| brandName / tagline | 固定（nian 品牌身份）或决策卡指定 |
| version / date | 产出时填入 |
| source | 决策卡 `source.narrative` 摘要 |
| textureProfile | Step 0.5 选定的质感方案名 |
```

- [ ] **Step 2: Commit**

```bash
cd $ND && git add references/COLOPHON.md
git commit -m "feat(nian-design): 新增 COLOPHON.md 品牌收束页标准

三栏结构（品牌身份/文档元数据/制作印记），Rule 11 的 Colophon 组件。"
```

---

## Task 6: 重构 SKILL.md（Workflow + 资源索引）

**Files:**
- Modify: `$ND/SKILL.md`

这是最大的一个 task——把质感前置、更新 workflow、更新资源索引、修复规则数不同步。

- [ ] **Step 1: 更新 SKILL.md 文档头的 description**

把 description 从"Haglöfs 15色调色板 + P0/P1/P2 组件优先级 + 8 条硬规则"改为：

```yaml
description: |
  nian-design — 品牌质感施工方。Haglöfs 15色调色板 + 工艺质感层 + 11 条硬规则。
  输入：上游 nian-decision-card 产出的决策卡。输出：有品牌高级感的 HTML。
  工艺质感派（Hermès/观夏范式）——质感先行，组件从 12 核心集选取。
```

- [ ] **Step 2: 更新"设计直觉"摘要，加入质感先行**

在现有 5 行摘要最前面插入质感行：

```markdown
- **质感先行**：施工第一步是定材质身份（Linen/Kraft/Bond/Forge/Ink 5 选 1），全页统一 1 种质感，Hero 设质感锚点。详见 Step 0.5
```

- [ ] **Step 3: 在 WORKFLOW 章节插入 Step 0.5（质感调性）**

在"Step 0 · 取 :root 真相源"之后、"Step 1 · 读决策卡"之前，插入完整的 Step 0.5：

```markdown
### Step 0.5 · 定质感调性 🎨

> **工艺质感派的核心步。** 先选纸材，再排内容——Hermès/观夏的做法。
> 跳过这步直接选组件 = 品牌感沦为事后装饰。

**输入**：决策卡 `textureProfile`（若有）+ `visualStream` + `scene` + `baseMode`
**输出**：1 个质感方案 + 1 个质感锚点 section

#### 决策矩阵（决策卡无 textureProfile 时自决）

| 气质 × 场景 | 质感方案 |
|---|---|
| Statement + 品牌/知识 | Linen 亚麻 |
| Diagonal/Pulse + 报告/数据 | Bond 装帧纸 |
| Split + SOP/手册 | Kraft 牛皮纸 |
| Entrance + 沉浸 | Forge 哑光金属 |
| 金句/宣言区 | Ink 油墨叠加 |

#### 锚点 section

- 默认 = Hero section（开屏即建立材质身份）
- 例外：breakPoint 指定金句/宣言 section → 该 section 为锚点，Hero 用次级质感

#### 施工动作

1. 从 `texture-palette.css` 选定方案的 class 加到 `<body>`
2. 锚点 section 加 `--anchor` 增强版 class
3. 记录方案名，填入 Step 5 的 QA 注释 `texture:` 字段
```

- [ ] **Step 4: 更新 Step 0（取 token）加入 texture-palette.css**

把现有 Step 0 的"唯一 token 来源"改为"两个真相源"，补充：

```markdown
施工时：
1. 读取 `token-root.css`，把 `:root { ... }` 块完整复制进输出 HTML 的 `<style>` 开头
2. **读取 `texture-palette.css`**，把选定的质感方案 class（Step 0.5 决定）对应的 CSS 规则复制进来
3. 不自创新变量名、不改色值——所有 15 色/Surface/Text/Font/Spacing 都已定义
4. 按 `palette.baseMode` 决定页面基调：light / dark / mix
5. Google Fonts：Inter + JetBrains Mono（Playfair Display 有系统 Georgia 降级）
```

- [ ] **Step 5: 更新 Step 4 硬规则自检，改为 11 条**

把现有"8 条硬规则自检"区块整体替换为 spec 中的"硬规则总表"（Rule 0-11，含 1b/6a/6b/11）。注意 Rule 6 保持 Readability，6a/6b 是新增质感规则。

- [ ] **Step 6: 更新 Step 5 输出的 QA 注释**

```html
<!-- QA: validate-passed + 11/11 craft | stream: Statement | hero: V4 | texture: linen | base: light -->
```

- [ ] **Step 7: 更新"参考文件索引"表**

新增 3 行：

```markdown
| `templates/base/texture-palette.css` | **Step 0.5 必读** | 5 种质感方案 SVG/CSS |
| `references/HERO-MODES.md` | **Step 2 选 Hero 时必读** | 4 种品牌 Hero 模式骨架 |
| `references/COLOPHON.md` | **Step 3 收束页必读** | 品牌收束页标准 |
```

- [ ] **Step 8: 更新"快速选型指南"，组件引用从 P0 改为 CORE 12**

把表里的"B02 Mini Bar · B01 进度条 · A03 Table"等改为引用 CORE 组件编号。

> **注意**：此步依赖 Task 7 完成 CORE 标记。若按顺序执行到此处时 Task 7 未完成，先跳过本步，在 Task 7 完成后回填。

- [ ] **Step 9: Commit**

```bash
cd $ND && git add SKILL.md
git commit -m "refactor(nian-design): SKILL.md 重构——质感前置 + 11 规则 + 资源索引

- description 改为品牌质感施工方定位
- 新增 Step 0.5 定质感调性（工艺质感派核心步）
- Step 0 加入 texture-palette.css 真相源
- Step 4 硬规则从 8 条更新为 11 条（含 1b/6a/6b/11）
- Step 5 QA 注释加 texture 字段
- 参考文件索引新增 texture-palette/HERO-MODES/COLOPHON"
```

---

## Task 7: COMPONENTS-MASTER.md 标 CORE/EXTENDED

**Files:**
- Modify: `$ND/references/COMPONENTS-MASTER.md`

63 组件中精选 12 个标 CORE，前置；其余标 EXTENDED。

- [ ] **Step 1: 确认 12 个 CORE 组件对应的现有组件编号**

对照 spec 的 12 核心组件清单，在 COMPONENTS-MASTER.md 中找到对应编号：

| spec 名 | 现有编号 | 现有 P 级 |
|---|---|---|
| Statement Hero | Hero 类（查具体编号） | — |
| Numeral Hero | Hero 类 | — |
| Ghost Watermark | 装饰类 | — |
| Pull Quote | F03 Quote | P0 |
| Eyebrow + Section Header | 查 | — |
| Spec Table | A03 Table | P0 |
| KPI Card | D09 Widget KPI | P0 |
| Vertical Timeline | C02 Vertical Timeline | P0 |
| Do/Don't Grid | D01 或 F05 Tension Grid | P0 |
| Asymmetric Split | D02 Asymmetric Table | P0 |
| Decorative Number | E03 | — |
| Colophon Footer | 新增（Task 5 已建） | — |

Run: `grep -nE "Hero|Watermark|Eyebrow|Section Header|Decorative Number|E03" $ND/references/COMPONENTS-MASTER.md | head -20`

- [ ] **Step 2: 在 COMPONENTS-MASTER.md 文档头新增 CORE/EXTENDED 说明**

在文件开头"优先级选择规则"之前插入：

```markdown
## 组件分级（2026-07 品牌升级新增）

除原有 P0/P1/P2 优先级外，组件新增 **CORE / EXTENDED** 分级：

| 分级 | 数量 | 含义 | 施工规则 |
|---|---|---|---|
| **CORE** | 12 | 品牌核心组件，最能承载工艺质感 | **默认只翻 CORE**，覆盖 80% 场景 |
| **EXTENDED** | 51 | 扩展组件，CORE 不够用时翻 | 用 EXTENDED 需在 QA 注释标注理由 |

CORE 12 集中在本文件前 200 行，EXTENDED 在后。
```

- [ ] **Step 3: 给 12 个 CORE 组件的章节标题加 `[CORE]` 标记**

在每个 CORE 组件的 `##` 标题后追加 ` [CORE]`，例如：
`## F03 Quote 引用 [CORE]`

- [ ] **Step 4: Commit**

```bash
cd $ND && git add references/COMPONENTS-MASTER.md
git commit -m "refactor(nian-design): COMPONENTS-MASTER 新增 CORE/EXTENDED 分级

12 个品牌核心组件标 CORE（Quote/Table/KPI/Timeline/Split等）。
默认只翻 CORE，EXTENDED 需标注理由。"
```

---

## Task 8: 规则文件收敛（17 → 5）+ 归档废弃文件

**Files:**
- Modify: `$ND/references/COLOR-USAGE-RULES.md`（合并 COLOR-GUIDE + DARK-MODE）
- Move: 4 个废弃文件到 `$ND/references/_archive/2026-07-brand-upgrade/`

- [ ] **Step 1: 把 COLOR-GUIDE.md 和 DARK-MODE-RULES.md 的独有内容并入 COLOR-USAGE-RULES.md**

读取 COLOR-GUIDE.md 和 DARK-MODE-RULES.md，把 COLOR-USAGE-RULES.md 中没有的内容作为新章节追加：
- COLOR-GUIDE 的独有速查表 → 追加为"速查表"章节
- DARK-MODE-RULES 的内容 → 追加为"Dark Mode"子章节

Run 先对比：`diff <(grep -oE "var\(--[a-z-]+\)" $ND/references/COLOR-GUIDE.md | sort -u) <(grep -oE "var\(--[a-z-]+\)" $ND/references/COLOR-USAGE-RULES.md | sort -u)`

- [ ] **Step 2: 创建归档目录并移动 4 个废弃文件**

```bash
mkdir -p $ND/references/_archive/2026-07-brand-upgrade
cd $ND/references
git mv DESIGN-JUDGMENT.md _archive/2026-07-brand-upgrade/
git mv CONTENT-BRIEF.md _archive/2026-07-brand-upgrade/
git mv DESIGN-SYSTEM-MAP.md _archive/2026-07-brand-upgrade/
git mv checklist.md _archive/2026-07-brand-upgrade/
# 已合并的也归档
git mv COLOR-GUIDE.md _archive/2026-07-brand-upgrade/
git mv DARK-MODE-RULES.md _archive/2026-07-brand-upgrade/
```

- [ ] **Step 3: 在归档目录放一个 README 说明为什么归档**

```bash
cat > $ND/references/_archive/2026-07-brand-upgrade/README.md << 'EOF'
# 2026-07 品牌升级归档

以下文件在 nian-design 品牌工艺质感升级中归档：
- DESIGN-JUDGMENT / CONTENT-BRIEF / DESIGN-SYSTEM-MAP / checklist：职责被 CRAFT-RULES 覆盖
- COLOR-GUIDE / DARK-MODE-RULES：已并入 COLOR-USAGE-RULES.md

spec: docs/superpowers/specs/2026-07-01-nian-design-brand-craft-upgrade-design.md
EOF
```

- [ ] **Step 4: 更新 SKILL.md 的参考文件索引，移除已归档文件的引用**

在 SKILL.md 参考文件索引表中删除 DESIGN-JUDGMENT/CONTENT-BRIEF/DESIGN-SYSTEM-MAP/checklist/COLOR-GUIDE/DARK-MODE 的行（若存在）。

- [ ] **Step 5: Commit**

```bash
cd $ND && git add references/
git commit -m "refactor(nian-design): 规则文件收敛 17→5，归档 6 个冗余文件

- COLOR-GUIDE/DARK-MODE 并入 COLOR-USAGE-RULES
- DESIGN-JUDGMENT/CONTENT-BRIEF/DESIGN-SYSTEM-MAP/checklist 归档（职责被 CRAFT-RULES 覆盖）
- SKILL.md 索引同步更新"
```

---

## Task 9: 变体收敛（24 → 6 母版）

**Files:**
- Modify: `$ND/references/templates/variants/`（保留 6 个，归档 18 个）
- Modify: `$ND/references/templates/INDEX.md`

这是破坏性较大的一步。保守策略：不删除文件，移到 `_archive`，保留可恢复性。

- [ ] **Step 1: 创建变体归档目录**

```bash
mkdir -p $ND/references/templates/variants/_archive-2026-07
```

- [ ] **Step 2: 按母版映射归档 18 个变体**

6 个保留的母版文件名（从现有变体重命名或选定代表）：

| 母版 | 保留并重命名为 | 绑定质感 |
|---|---|---|
| brand-statement | `statement--brand.html` 保留 | Linen |
| data-precise | `diagonal--report.html` 保留 | Bond |
| guide-plain | `split--plan.html` 保留 | Kraft |
| immersive-entrance | `entrance--brand.html` 保留 | Forge |
| manifesto-ink | `democratic--brand.html` 保留 | Ink |
| monitor-pulse | `pulse--monitor-v2.html` 保留 | Bond |

其余 18 个 `git mv` 到 `_archive-2026-07/`。

```bash
cd $ND/references/templates/variants
# 归档非母版变体
for f in dashboard--data.html dashboard--monitor.html diagonal--brand.html diagonal--data.html diagonal--decision.html entrance--knowledge.html numeral--data.html pulse--knowledge.html pulse--monitor.html pulse--report.html split--data.html split--decision.html split--knowledge.html statement--data.html statement--decision.html statement--knowledge-v2.html statement--knowledge.html statement--report.html; do
  git mv "$f" _archive-2026-07/
done
```

- [ ] **Step 3: 重写 INDEX.md 为 6 母版索引**

把 INDEX.md 从"气质×场景 24 格矩阵"重写为"6 母版 × 绑定质感 × 覆盖场景"的精简表。

- [ ] **Step 4: Commit**

```bash
cd $ND && git add references/templates/
git commit -m "refactor(nian-design): 变体收敛 24→6 母版

6 个品牌母版（brand-statement/data-precise/guide-plain/immersive-entrance/manifesto-ink/monitor-pulse），
各自绑定质感方案。18 个旧变体归档可恢复。INDEX.md 重写。"
```

---

## Task 10: 扩展 validate-nian-deck.mjs（质感校验）

**Files:**
- Modify: `$ND/scripts/validate-nian-deck.mjs`

- [ ] **Step 1: 读取现有 validator，了解检查机制**

Run: `cat $ND/scripts/validate-nian-deck.mjs | head -60`
了解现有 30 项检查的实现方式（正则匹配 HTML/CSS）。

- [ ] **Step 2: 新增质感 class 校验**

在 validator 中新增检查项：
- 检查 `<body>` 或顶层元素是否含 `texture-*` class（Rule 11 Texture Base）
- 检查是否只有 1 种基础质感方案（Rule 6b，`--anchor` 变体不计）
- 检查 QA 注释是否含 `texture:` 字段

```javascript
// 新增检查（伪代码，按现有 validator 风格实现）
const textureClasses = html.match(/texture-(linen|kraft|bond|forge|ink)(?!--anchor)/g) || [];
const textureAnchorClasses = html.match(/texture-(linen|kraft|bond|forge|ink)--anchor/g) || [];
const qaTexture = html.match(/texture:\s*(linen|kraft|bond|forge|ink)/);

checks.push({
  name: 'Rule 11 · Texture Base',
  pass: textureClasses.length >= 1,
  msg: textureClasses.length === 0 ? '缺少 texture-* 基础质感 class（品牌身份底线）' : null
});
checks.push({
  name: 'Rule 6b · Texture Coherence',
  pass: new Set(textureClasses).size === 1,
  msg: new Set(textureClasses).size > 1 ? `混搭了 ${new Set(textureClasses).size} 种质感，只允许 1 种` : null
});
checks.push({
  name: 'QA texture 字段',
  pass: qaTexture !== null,
  msg: 'QA 注释缺少 texture: 字段' 
});
```

- [ ] **Step 3: 用现有 showcase 样本回归测试 validator**

Run: `node $ND/scripts/validate-nian-deck.mjs $ND/references/showcase-archive/haglofs-component-showcase.html`
预期：因为旧 showcase 没有质感层，新检查项会 FAIL——这是正确的（旧产物需更新）。确认 validator 不崩溃。

- [ ] **Step 4: Commit**

```bash
cd $ND && git add scripts/validate-nian-deck.mjs
git commit -m "feat(nian-design): validator 新增质感校验（Rule 11/6b + QA 字段）

- 检查 texture-* 基础质感 class 存在（Rule 11）
- 检查只有 1 种质感方案（Rule 6b）
- 检查 QA 注释含 texture: 字段"
```

---

## Task 11: 端到端验证 + brand-dna 更新

**Files:**
- Modify: `$ND/brand-dna.md`（补充工艺质感段落）

- [ ] **Step 1: 在 brand-dna.md 的"附加质感"章节扩充工艺质感说明**

把现有的 2 行附加质感扩充为完整的工艺质感层说明：

```markdown
## 工艺质感层（2026-07 升级核心）

工艺质感派的高级感 = 可感知的材质密度。nian 的质感层有 5 种方案（texture-palette.css）：

| 方案 | 调性 | 适用 |
|---|---|---|
| Linen 亚麻 | 温润人文 | 品牌宣言、知识长文 |
| Kraft 牛皮纸 | 朴素可信 | SOP、技术文档 |
| Bond 装帧纸 | 精密克制 | 数据报告、决策建议 |
| Forge 哑光金属 | 科技工业 | 沉浸 Hero |
| Ink 油墨叠加 | 印刷重量 | 金句、核心结论 |

**施工铁律**：全页 1 种质感（Rule 6b），1 个锚点区加重（Rule 6a），Texture Base 不可豁免（Rule 11）。
```

- [ ] **Step 2: 端到端手动验证——用一个简单决策卡跑通新流程**

手动走一遍 6 步 workflow，产出 1 个测试 HTML：
- Step 0.5：选 Linen
- Step 2：用 statement--brand 母版
- Step 4：跑 validator，确认 11 条规则全过

Run: `node $ND/scripts/validate-nian-deck.mjs /tmp/test-brand-page.html`

- [ ] **Step 3: 更新 SKILL.md 底部"最后更新"时间戳**

```markdown
*最后更新：2026-07-01 — 品牌工艺质感升级（方案B·质感优先重构）：质感层 + 6 步 workflow + 12 核心组件 + 4 Hero 模式 + 11 规则*
```

- [ ] **Step 4: 最终 Commit**

```bash
cd $ND && git add brand-dna.md SKILL.md
git commit -m "docs(nian-design): brand-dna 补充工艺质感层 + 端到端验证通过

brand-dna 从 2 行附加质感扩充为完整工艺质感层说明。
完成方案 B 全部 5 层改动：质感层/workflow/资源/Hero/场景统一。"
```

---

## Self-Review 备注

**Spec 覆盖检查：**
- ① 质感层 → Task 1（资产）+ Task 2（规则 6a/6b）✓
- ② Workflow → Task 6（SKILL Step 0.5）+ Task 3（决策卡字段）✓
- ③ 资源收敛 → Task 7（组件 CORE）+ Task 8（规则合并）+ Task 9（变体 6 母版）✓
- ④ Hero 强化 → Task 4（HERO-MODES）+ Task 2（Rule 1b）✓
- ⑤ 场景统一 → Task 5（COLOPHON）+ Task 2（Rule 11）+ Task 3（brandOverride）✓
- validator 扩展 → Task 10 ✓
- brand-dna 同步 → Task 11 ✓

**执行顺序依赖：** Task 1 → 2/3/4/5（并行）→ 6（Step 8 留到 Task 7 后回填）→ 7 → 8/9（并行）→ 10 → 11
