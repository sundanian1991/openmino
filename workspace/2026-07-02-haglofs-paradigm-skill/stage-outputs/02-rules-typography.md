# 排版规则卡

> Haglöfs 范式 · 字体配方与排版规则提取
> 源文件：H061 / H062 / token-root.css / R3 / H042
> 提取日期：2026-07-02

---

## 1. 字体配方（4 字体用途表）

四字体"角色不混"是 Haglöfs 范式的第一法则。token-root.css 第 108–112 行明确定义：

```css
--font-display:    'Playfair Display', Georgia, 'Times New Roman', serif;
--font-decorative: 'Doto', 'JetBrains Mono', monospace;
--font-body:       'Inter', -apple-system, 'Helvetica Neue', sans-serif;
--font-data:       'JetBrains Mono', 'SF Mono', 'Courier New', monospace;
```

| 字体 | 角色 | 用途 | 字号范围 | 字重 | 出处 |
|------|------|------|----------|------|------|
| **Playfair Display** | Display 衬线 | Hero 大标题 / Section 标题 / 卡片标题 / 品牌陈述 / 装饰 ghost 字（年份、大写字母） | 18px – 400px（clamp 响应式） | 200/300（标题常态，轻盈）/ 400 / 500 / 600 / 700 | token L109；H061 L103/322/442/464；H062 L44/57/66/86/91/133；R3 L67/130/196/251/301 |
| **Inter** | Body 无衬线 | 正文 / 描述 / 功能性 copy / 段落 / 列表项 / 次级说明 | 14px – 18px | 300/400/500/600 | token L111；H061 L113/204/331；H062 L29/45/59；R3 正文类 |
| **JetBrains Mono** | Data 等宽 | 标签 / eyebrow / section-tag / 规格数据 / 表头 / hex 值 / 编号前缀 / 元数据 / 标注 | 8px – 14px | 400/500/600 | token L112；H061 L59/85/223/254/287/359；H062 L34/48/55/67/74 |
| **Doto** | Decorative 等宽装饰 | 仅装饰用途——大面积点阵 / 装饰水印 / 极少数品牌点睛。**不承载任何信息** | 由装饰场景决定（大字） | 400/700 | token L110；H061 L8 引入但 H061/H062 HTML 内未实际使用实例 → Doto 是 token 层预留的「装饰专用字」，施工时替代 JetBrains Mono 的装饰场景 |

### 关键角色分工（H062 L337 原文）
> "Playfair Display 承担温暖，Inter 承担功能，JetBrains Mono 承担精度。"

H061 L686 进一步注释 JetBrains Mono：「Technical precision without competing with content. ALL CAPS labels at 0.06em spacing.」

---

## 2. 字号阶梯 Type Scale

### 2a. Token 层标准阶梯（token-root.css L115–123，最权威）

| Token | px 值（clamp 响应式） | 用途 | 出处 |
|-------|----------------------|------|------|
| `--fs-deco` | clamp(120px, 16vw, **200px**) | 装饰大字 · ghost / hero 年份水印 | L115 |
| `--fs-display` | clamp(56px, 8vw, **96px**) | Hero · 最大可读字 | L116 |
| `--fs-h1` | clamp(36px, 5vw, **56px**) | Section 主标题 | L117 |
| `--fs-h2` | clamp(24px, 3vw, **32px**) | 卡片 / 区块标题 | L118 |
| `--fs-h3` | **18px** | 小标题 | L119 |
| `--fs-body-lg` | **15px** | 长文正文 | L120 |
| `--fs-body` | **14px** | 正文默认 | L121 |
| `--fs-caption` | **12px** | caption / 描述 | L122 |
| `--fs-data` | **11px** | label / eyebrow（配 ls-wide） | L123 |

### 2b. 实战样本中的字号（跨文件实测，佐证 token 阶梯）

| 角色 | 字号 | 行高 | 字距 | 字体 | 出处 |
|------|------|------|------|------|------|
| Hero 超大标题 | clamp(64px, 8.6vw, 120px) | 1.0 | -0.025em | Playfair 400 | H061 L104 |
| Hero ghost 年份 | clamp(80px, 12vw, 200px) | 1 | — | Playfair 300 | H061 L127 |
| Hero 巨型背景字 | clamp(120px, 18vw, 320px) | 1 | — | Playfair 700 | H061 L144 |
| Hero 标题（v2） | clamp(42px, 6vw, 80px) | 1.02 | -2px | Playfair 300 | H062 L44 |
| Hero 装饰字母 H | clamp(200px, 25vw, 400px) | 1 | -0.06em | Playfair 300 | H062 L43 |
| Type Wall 最大样本 | clamp(40px, 6vw, 72px) | 1.05 | -0.02em | Playfair 300 | H062 L343 |
| Section 标题（intro） | clamp(28px, 3vw, 48px) | 1.15 | -0.01em | Playfair 400 | H061 L166 |
| Section H2（v2） | clamp(28px, 4vw, 44px) | 1.1 | -1px | Playfair 300 | H062 L57 |
| Tension 概念词 | 20px | — | — | Playfair 600 | H061 L186 |
| Tension pole 标题 | 32px | 1.1 | — | Playfair 300 | H062 L133 |
| 数字大字（numerals） | clamp(40px, 4vw, 64px) | 1 | — | Playfair 600 | H061 L395 |
| Principle 编号 | 56px | 1 | — | Playfair 200 | H062 L65 |
| Principle 标题 | 22px | 1.2–1.3 | — | Playfair 400/600 | H061 L443；H062 L66 |
| Accordion 触发器 | 20px | — | — | Playfair 400 | H062 L91 |
| Wordmark 主字 | clamp(36px, 5vw, 64px) | 1 | 0.08em | Playfair 600 | H061 L467 |
| 正文描述 | 14px | 1.7 | 0 | Inter 400 | H061 L114 |
| Hero 描述（v2） | 18px | 1.7 | 0 | Inter | H062 L45 |
| 长文正文 | 15–17px | 1.7–1.8 | 0 | Inter | H062 L68；R3 L336 |
| Section 描述 | 16px | 1.7 | 0 | Inter | H062 L59 |
| Section-tag / eyebrow | 10–12px | — | 0.06em（ls-wide）| JetBrains Mono 500 | H061 L60；H062 L55 |
| Hex 值 / 编号 | 10–11px | — | 0.06em | JetBrains Mono | H061 L261/411 |
| 侧边栏导航 | 8–9px | — | 1–3px | JetBrains Mono | H062 L34/202 |

---

## 3. 行高 / 字距规则

### 行高（token-root.css L133–137）

| Token | 值 | 适用 |
|-------|----|------|
| `--lh-tight` | **1.1** | display / h1（大标题，紧凑） |
| `--lh-snug` | **1.3** | h2 / h3（次级标题） |
| `--lh-body` | **1.65** | 正文默认 |
| `--lh-read` | **1.75** | 长文阅读 |
| `--lh-data` | **1.4** | data / 表格 |

**实战趋势（从样本实测）：**
- Hero / 装饰大字：行高 **1.0**（H061 L106/128）甚至 `line-height:1`——极端紧凑，因为大字本身已占满行
- Section 标题：1.02–1.15（H062 L44 的 1.02 → H061 L168 的 1.15）——标题越大越紧
- 正文：**1.6–1.7**（H061 body L54；H061 desc L116）；长文到 **1.8**（R3 L337 prose p）
- 数据/标签：1.4–1.6

**规则：字号越大，行高越紧（趋近 1.0）；字号越小，行高越松（正文 1.65+）。**

### 字距（token-root.css L139–143）

| Token | 值 | 适用 |
|-------|----|------|
| `--ls-tight` | **-0.02em** | 大标题（收紧，让字呼吸） |
| `--ls-normal` | **0** | 正文 |
| `--ls-wide` | **0.06em** | data / label |
| `--ls-wider` | **0.2em** | eyebrow / 全大写 |

**实战趋势：**
- **大标题必须收紧**：Hero 标题 -0.025em ~ -2px ~ -3px（H061 L108；H042 L20 的 -3px；H062 L44 的 -2px）
- **正文字距为 0**（不加间距）
- **等宽标签必须加宽**：section-tag / eyebrow 统一 0.06em（H061）或更宽 2–4px（H062 L55 的 3px / R3 的 4px / H042 的 4px）。**全大写 = 必须加字距。**
- **Wordmark 特例**：品牌字 `HAGLÖFS` 用 0.08em（H061 L468）——比一般标题更松，因为是固定字符 lockup

---

## 4. 混搭决策

### 决策 1：品牌陈述页 / Statement 页 → 三体混搭（Playfair + Inter + Mono）
- **配方**：Playfair 扛所有标题与数字装饰 · Inter 扛正文 · JetBrains Mono 扛标签/元数据
- **示例**：H061 全页、H062 全页——每个 section 都是「Mono eyebrow → Playfair 标题 → Inter 正文」三体递进
- **出处**：H061 L583–700；H062 L333–366

### 决策 2：长文 / Prose 阅读页 → 仍三体但 Playfair 退到 h2/h3
- **配方**：正文全 Inter（17px/1.8），标题 h2 用 Playfair（32px/300），blockquote 用 italic Playfair，code 用 Mono
- **关键**：**正文绝不用 Playfair**，Playfair 只做标题和引述装饰
- **出处**：R3 L335–407（prose 全规范）；H062 L404（"Prose · 排版引擎"组件说明）

### 决策 3：数据 / 性能 / 规格页 → Mono 主导 + Playfair 数字点缀
- **配方**：大数字用 Playfair 衬线（serif 数字有"权威感"），但数据 label 和单位用 JetBrains Mono 全大写；正文用 Inter
- **变体 A（衬线数字）**：H061 numerals（L395 Playfair 600）——数字用 Playfair，label 用 Mono
- **变体 B（等宽数字）**：H042 perf-strip（L69 Mono 600）——全数据页所有数字都用 Mono，更"工程"。H042 是 Volvo 同范式变体，证明数据页可用纯 Mono 数字。
- **出处**：H061 L379–414；H042 L62–71

### 决策 4：深色 section（Hero/收束）→ Playfair 装饰 ghost + Inter/Mono 内容
- **配方**：深底上用 Playfair 做超大 ghost 字（年份/字母，opacity 0.03–0.15），内容文字 Inter 或 Mono，颜色用 white + opacity 分层
- **出处**：H061 L121–152（hero-ghost / ghost-text）；H062 L43（hero-letter 400px ghost）

### 决策 5：Doto 的使用 → 仅装饰、不承载信息
- **配方**：Doto 是 token 层预留的装饰字（`--font-decorative`），用于大面积点阵图案或品牌点睛。当前 H061/H062 HTML 未实际渲染 Doto 实例——它作为 JetBrains Mono 的"装饰替身"存在，在需要纯装饰网格/点阵时替代 Mono。
- **规则**：**Doto 永远不用于承载信息的文字**（标题、正文、数据都不行），仅限 ghost/点阵/水印。

---

## 5. tag 标签排版规范

tag / eyebrow 是 Haglöfs 最标志性的排版元素。跨 5 文件高度一致：

| 属性 | 规范值 | 出处 |
|------|--------|------|
| **字体** | JetBrains Mono（等宽） | H061 L59；H062 L55；H042 L12 |
| **字号** | 10–12px（多数 10–11px） | H061 L60(12px)；H062 L55(10px)；R3 L189(11px)；H042 L12(11px) |
| **大小写** | **全大写 text-transform: uppercase**（无一例外） | 所有文件 |
| **字距** | 0.06em–4px（加宽，ls-wide 或更宽） | H061 L62(0.06em)；H062 L55(3px)；R3 L190(4px)；H042 L13(4px) |
| **颜色** | text-secondary / text-muted / stone（弱化色，不抢主体） | H061 L64；H062 L55；R3 L191 |
| **字重** | 400–500 | H061(500)；H062(无显式=400) |

### 标志性「前缀线 + 标签」结构
Haglöfs tag 的核心识别特征是 **label 前一条短横线**（24px 宽，1px 高）：

```css
.section-tag::before{
  content:'';
  width:24px;
  height:1px;
  background:var(--border);
}
```
- **出处**：H061 L95–101（hero-tag `::before` 24px 线，颜色用 brand-primary）；H062 L56（section-tag `::before` 24px 线，颜色用 border）
- **变体**：H042 的 section-label 不用前缀线，改用 `V2 · <span class="cid">Model Lineup</span>` 结构——编号 + 高亮词（L12/130），cid 用橙色 Mono。这是「编号前缀 + 强调词」的替代写法。

### tag 使用场景
- section-tag（每个区块顶部的 eyebrow）—— H061/H062 高频
- hero-tag（Hero 区品牌标识）—— H061 L83
- swatch-group-label（色卡分组）—— H061 L222
- color-bar-label（色彩条标签）—— H062 L74
- tension-pole-label（张力极标签）—— H062 L132
- spacing-block-label（间距标签）—— H062 L104
- principles-meta（原则元数据）—— H062 L67

**统一律：凡是"元信息/分类/编号"性质的文字，一律走 Mono + 大写 + 加宽字距 + 前缀线（或编号）这套配方。**

---

## 6. 禁忌

### T1. 正文绝不能用 Playfair
正文（段落、描述、列表项）只能用 Inter。Playfair 仅限标题、装饰、数字。H062 L687 明确 Playfair 是 "brand statements, headlines, section titles"，R3 prose 全部正文用 sans。

### T2. 大标题必须收紧字距
标题字号越大，letter-spacing 必须为负（-0.02em 至 -3px）。**禁止给大标题加正字距**。正字距（0.06em+）只留给全大写小标签。

### T3. 四字体角色不可互换
- ❌ 不能用 Inter 做大标题（丧失衬线温度）
- ❌ 不能用 Playfair 做 label/数据（丧失等宽精度）
- ❌ 不能用 JetBrains Mono 做长正文（可读性差）
- ❌ Doto 不能承载任何信息文字
- token-root.css L108 注释原文：「四字体 — Display/Decorative/Body/Data，角色不混」

### T4. 全大写文字必须加字距
所有 `text-transform: uppercase` 的文字（tag/label/eyebrow）必须配 `letter-spacing ≥ 0.06em`。**裸大写 = 错误。** 5 个文件无一例外遵守。

### T5. 装饰 ghost 字不能抢内容
Playfair ghost 字（年份/大字母）的 opacity 必须极低（0.03–0.15），`pointer-events:none` + `user-select:none`。**装饰文字不可被选中、不可遮挡内容、不可高对比度。**（H061 L129/149/376；H062 L43）

### T6. 标题最小字号限制
- 衬线标题（Playfair）作为"标题"使用时，最小 **18px**（`--fs-h3`）。低于 18px 的文字应交给 Inter 或 Mono。
- eyebrow/data 标签虽可小至 8–11px，但它们用 Mono 不是 Playfair。

### T7. 不引入第五种字体
字体配方锁定 4 种（Playfair/Inter/JetBrains Mono/Doto）。**禁止引入其他衬线、其他无衬线、其他等宽。** 注意 H062 L7 引入了 Playfair italic 变体（ital,wght）——这是同字体的风格变体，不算新字体。R3/H042 用 Georgia / SF Mono 作为 fallback（L67/136/243），是因为这两个样本是"降级预览版"，正式施工必须用 Playfair + JetBrains Mono（token 层已规定 fallback 链）。

### T8. 行高方向：大字趋紧，小字趋松
- **禁止给大标题（≥36px）用 ≥1.4 的行高**（会松散失神）
- **禁止给正文（≤18px）用 <1.5 的行高**（会拥挤难读）
- 数据/表格用 1.4 折中。

---

## 附：字体加载声明（标准引入）

```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&family=Doto:wght@400;700&display=swap" rel="stylesheet">
```
出处：H061 L8（含 Doto）；H062 L7（含 Playfair italic）。合并即完整配方。
