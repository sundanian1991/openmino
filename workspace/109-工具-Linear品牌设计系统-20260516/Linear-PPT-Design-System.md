# Linear-PPT-Design-System

> 为 Linear 制作的所有 deck 共用的视觉语言。请严格遵循，让每一份新 deck 都一眼被识别为同一家族。

---

## 1. 设计理念

**精密工程信心。** Linear 的品牌是工程工具的审美 —— 不装饰、不讨好、不模糊。每一像素都为功能服务。大面积留白让内容呼吸，蓝紫主色只在关键时刻出手，灰度体系承担大部分视觉重量。这不是又一份"干净现代的 SaaS 模板"，而是一份有立场的工程宣言：工具应该好用，也应该好看，但好看从不优先于好用。

> 设计方向参考：Stripe 的工程清晰度 + Figma 的极简产品聚焦 + Apple 的字体主导克制。

**两种模式：**
- **桌面端 (≥ 769 px)**：1280 × 720 px 画布，运行时 scale-to-fit (§5)，键盘/点击导航。
- **移动端 (≤ 768 px)**：所有 slide 垂直堆叠成一张可滚动的长页；单栏布局。

### 设计品味 <!-- ENGINEERING-DNA: design-taste -->

**承诺一个清晰的审美立场。** 本 DS 是 Linear 品牌工具，不是 SaaS 通用模板。基于它做的每一份 deck 第一眼就该让人认出这是 *Linear* — 不是"又一份得体的商务演示"。

**反 AI 套路规则**（每张 slide、每个组件、每个变体都适用）：

- **不用通用字体默认值。** 品牌字体在 §3 已指定（Inter），必须使用。
- **不用陈词滥调的配色。** Linear 的主色是蓝紫 #5E6AD2 — 不是又一个"紫色 SaaS"。按 §2 的层级使用颜色，不要扁平化。
- **不用等权重的多色装饰网格。** 一个主导和弦 (#5E6AD2) + 2–3 个语义 accent 才是正确形态。
- **不用现成 SaaS 仪表盘 chrome。** Linear 的圆角偏小（4px），阴影极轻或没有，间距紧凑但不拥挤。
- **不用空洞的氛围词。** Slide 标题应该具体、具象 — "Q3 产能增长 23%" 比 "业绩表现亮眼" 好。
- **一个编排好的入场动效，而非分散的小动画。** 大部分 slide 只需要一次激活时的内容错时显现。

### 约束 vs 自由 <!-- ENGINEERING-DNA framing; bullet contents are BRAND-VARIABLE -->

本 Design System 定义了 **硬约束**（永远不能破的）与 **可复用组件**（按需选用的）。它不定义现成配方 — 每张 slide 都应为它自己的内容构图，而不是从模板拼接。

**硬约束（锁死）：**
- Colour palette (§2 tokens only — no ad-hoc colours)
- Inter typeface, 400–900 字重可用
- 12 px 可读性下限
- 每一张 slide 都必须有 logo
- **每张 slide 的内容必须包在一个 `.sc` 容器里**（即使是 bespoke 满屏的 Type J / Type A 也是）。`.sc` 是 `fit_contract_intact` 唯一扫描的位置 — bespoke 布局如果直接画在自定义 shell 里，会**静默绕过** absorber 检测、移动端 catch-all、602 px 预算这三道保险。没有 `.sc`，就没有契约。
- **Logo `<symbol>` 内部不能含任何 `fill` 属性**（包括 wrapper `<g>` 上的 `fill="none"`）。任何内层 fill 都会盖过 `currentColor` 级联，使 wordmark 完全不可见 —— 而 byte 级检查（path d 长度、viewBox、visible_on_cover）会一切显示 PASS。`embed_logo.py` 在物化时已 strip 这些；`logo_renders` hard check 会拒绝任何漏网的。
- 不用 emoji (👍 等) — 排版符号 (✓ − ! ×) 和几何指示符允许
- 不用装饰性 stock photography
- `.shd` header strip on content slides
- `.sw` border-left accent

**可复用组件（按需选用，不强制）：**
- §7 组件库提供卡片、表格、图表、标签、标记 — 适合时用，不适合时跳过用 bespoke 布局。

**Bespoke 元素（鼓励）：**
- **在调色板内自由发挥。** Linear 的调色板有蓝紫主色 + 红/青/黄语义色 + 灰度阶梯。用它们做渐变、叠色、数据编码 — 只要 token 是对的，构图自由。
- 判定标准是：该元素是否只用了定义过的颜色 token、Inter 字体、并尊重可读性下限？如果是，即便不匹配任何具名组件也算"在系统内"。
- **不要自我限制在具名组件里。** 如果某 slide 需要 §7 不存在的东西，就从 token 出发自己造。

---

## 2. 颜色令牌

颜色 token 系统有三层：

1. **核心角色 token** — 所有品牌之间名字不变。它们标识颜色 *扮演什么角色*，而不是 *它是什么颜色*。
2. **语义 token** — 编码含义（正向 / 负向 / 警告 / 信息）而不是颜色身份。
3. **品牌调色 token** — Linear 特有的额外 accent 名。

```css
:root {
  /* ── Core role tokens (invariant names) ── */
  --primary:  #5E6AD2;   /* Linear 标志性蓝紫 — cover 背景、主品牌色 */
  --accent:   #F34F52;   /* CTA / 链接 / 单一高饱和强调 — Linear 红色 */
  /* ── Neutrals ── */
  --surface:  #FFFFFF;   /* 幻灯片背景 — 亮色主题 */
  --white:    #FFFFFF;
  --ink:      #08090A;   /* 正文文字 — 近黑 */
  --mid:      #9C9DA1;   /* 次级文字 / 弱化标签 */
  --rule:     #E5E5E6;   /* 分隔线 / 细线 */
  --tint:     #F7F8F8;   /* 行底色 / 微妙区段背景 */
  /* ── Semantic (invariant names) ── */
  --green:    #01C646;   /* 正向 */
  --green-bg: #E8F8EE;
  --red:      #F34F52;   /* 负向 */
  --red-bg:   #FDEAEA;
  --warn:     #EEF35F;   /* 警告 */
  --warn-bg:  #FEFCE8;
  --teal:     #2ACFA6;   /* 信息 / 中性高亮 */
  --teal-bg:  #E6FAF3;
  /* ── Brand palette ── */
  --purple:   #4736FE;
  --blue:     #0E63FF;
  --orange:   #F46319;
  --coral:    #E8755F;
  --navy:     #191D20;
  --slate:    #585A5C;
  --light:    #F7F8F8;
}
```

**规则：** <!-- ENGINEERING-DNA -->
- **Token 名是角色抽象，不是颜色名。** Slide CSS 读 `var(--primary)` 就能拿到当前 brand DS 对应的正确颜色。
- **每张 slide 只有 *一个* 主导 accent 颜色。** 用 `--accent`（红色）做 slide 的标志性高亮。品牌调色 token 是按需取用的装饰，不是并行 accent。
- **语义颜色仅在含义彼此独立时才同时出现** — 例如一张对比 slide 的 ✓ (`--green`) / ✗ (`--red`)。
- **`--tint` 用于行底色，不用于卡片填充。**
- **永远不用纯黑。** `--ink` (#08090A) 是 Linear 的真实深色。
- **永远不在 slide CSS 里写临时 hex。** 每个颜色都必须来自 token。`token_only_colors` hard check 会强制执行。

---

## 3. 字体

**Inter** — 唯一字体。字重 400–900。`PingFang SC, Microsoft YaHei, Source Han Sans SC` 作为 CJK 回退链。

> Linear 使用 Inter Variable（可变字重），在幻灯片中用固定字重 400/500/600/700/800/900。Inter 的几何骨架和紧凑字距让它在 1280×720 画布上表现优秀 — 标题用 900 极粗，正文用 600 半粗，避免"中文显瘦"。

### CJK 字体回退链 <!-- ENGINEERING-DNA: cjk-fallback -->

中文 deck 不能直接用拉丁字体当 body font。Inter 不含 CJK 字形，浏览器对 CJK 字符自动回退到系统默认（macOS 上是 STHeiti 细体），**视觉上立刻显得廉价**。

```css
/* 中文 deck 推荐字体链 — CJK 优先，拉丁兜底 */
font-family:
  'PingFang SC', '苹方-简',
  'Hiragino Sans GB', '冬青黑体简体中文',
  'Microsoft YaHei', '微软雅黑',
  'Source Han Sans SC', 'Noto Sans SC',
  'Inter',
  system-ui, -apple-system, sans-serif;
```

**字重提升（CJK-first 时尤其重要）**：PingFang SC 的 Regular（400）较细 — 大字标题用 700（Semibold/Bold），正文用 500（Medium）以上，避免"中文显瘦"的廉价感。

**禁止**：font-family 链里完全没有 CJK 字体。`cjk_font_quality` hard check 会立刻 FAIL。

### 字号阶梯 <!-- ENGINEERING-DNA — sizes are invariant -->

| 用途 | 字号 | 字重 | 字距 | 备注 |
|---|---|---|---|---|
| 封面大标 | 82 px | 900 | −0.03 em | 行高 0.98 |
| 封面副标 | 22 px | 300 斜体 | +0.01 em | |
| 内页标题 | 50 px | 900 | −0.025 em | 行高 1.06 |
| 内页副标 | 20 px | 600 | +0.01 em | `--mid` |
| Eyebrow / 徽章 | 11–12 px | 800 | +0.18–0.24 em | 全大写 |
| 卡片标题 | 28 px | 900 | −0.01 em | |
| 正文 / 列表 | 16 px | 600 | 默认 | 行高 1.5–1.6 |
| 表格 / 数据 | 13–14 px | 700–800 | +0.1 em | 全大写 |
| 说明 / 元信息 | 12–13 px | 700–800 | +0.14 em | 绝不低于 12 px |

### 可读性 <!-- ENGINEERING-DNA -->

1. **最大化**：默认用合适的最大字号。半空 slide 配 14 px 正文 = 设计失败。
2. **Floor**: Nothing below 12px <!-- ENGINEERING-DNA: typography-floor -->. If content doesn't fit at min sizes, change layout — never shrink font.

| 用途 | 最低 | **强制默认** |
|---|---|---|
| 内页标题 | 38 px | **50 px** — 仅在密内容多行时降到下限 |
| 卡片标题 | 22 px | **28 px** |
| 主正文 / 列表 | 14 px | **16 px** — slide 级段落、主要内容 |
| 组件次级文字 | 13 px | **13–14 px** — 卡片内描述、列表条目细节 |
| 副标 | 16 px | **20 px** |
| 徽章 / 标签 | 12 px | **13 px** |

**强制规则**：slide 主内容区域的标题低于 50 px、主正文低于 16 px 都是 bug。

### 3.1 字体安全 <!-- ENGINEERING-DNA: typography-safety -->

Slide "好看"是可工程量化的。下面的规则是硬规则；`text_layout_safe` 自动检查执行其中大部分。

1. **永远不要贴底**：内容页最底的可见文字元素到 slide 底边距离必须 ≥ 18 px（目标 24–48 px）。`.sw` / `.sc` 的 `padding-bottom` 当做防线；不要把内容推到边缘。
2. **永远不能截断**：任何 `overflow:hidden` 的文字容器必须满足 `scrollHeight ≤ clientHeight`。如果内容可能溢出，用 `text-overflow: ellipsis` 或 `-webkit-line-clamp` 显式声明最大行数 — 永远不要"赌"它正好放得下。
3. **永远不要任意换行**：H1/H2/H3 单标题 ≤ 3 行；正文段落 ≤ 5 行。中日韩标题避免在词语中间换行 — 用 `word-break: keep-all; line-break: strict;` 配合更短文案。
4. **全局布局法则**（基础）：
   - 全局禁用 `hyphens: auto`（混合 CJK 环境会产生破碎连字符）。
   - 正文 `line-height` ≥ 1.4，标题 ≥ 1.15 — 不能更紧。
   - 卡片 / 段落之间至少 12 px 间距；两个文字块永远不能相触。
   - 一个 `.sc` 内层级最多 3 层（标题 → 副标 / 图 → 列表 / 卡片）。需要更多就拆 slide。
5. **构建时自检**（写完 HTML 后运行）：
   ```js
   document.querySelectorAll('.slide').forEach((s, i) => {
     const slideBottom = s.getBoundingClientRect().bottom;
     let maxBottom = -Infinity;
     s.querySelectorAll('h1,h2,h3,h4,p,li').forEach(el => {
       if ((el.textContent||'').trim().length < 3) return;
       const r = el.getBoundingClientRect();
       if (r.height > 0) maxBottom = Math.max(maxBottom, r.bottom);
       if (el.scrollHeight > el.clientHeight + 2 && getComputedStyle(el).overflow === 'hidden')
         console.warn(`slide ${i+1}: ${el.tagName} text truncated →`, (el.textContent||'').slice(0,40));
     });
     const gap = slideBottom - maxBottom;
     if (gap < 18) console.warn(`slide ${i+1}: text only ${gap.toFixed(1)}px from bottom (need ≥ 18)`);
   });
   ```
6. **检查失败时的修复优先级**：
   - 首先，**改文案**（删字、缩短句子、用名词短语）。
   - 然后，**改布局**（去掉一项、拆分 slide、把列表改成双栏网格）。
   - **永远不要** 通过把字号缩到 12 px 以下或允许截断来"塞下"。

---

## 4. Linear Logo

### 定义（每份 HTML 一次）

Linear 的 logo 是圆形斜条纹球形图标（B 档 — 多色/渐变 SVG），已完整内嵌到 HTML 中。

#### B 档 — `multi`（多色 / gradient SVG）

源 SVG 含 `<linearGradient>`、`<radialGradient>`、`fill="url(#…)"` — Linear 的圆形条纹球形图标使用多层渐变和混合模式实现深度感。

```html
<svg style="display:none" xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true">
  <symbol id="brand-wm" viewBox="0 0 512 512">
    <image href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiBmaWxsPSJub25lIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiI+PHBhdGggZmlsbD0idXJsKCNhKSIgZD0iTTAgMGg1MTJ2NTEySDB6Ij48L3BhdGg+PGcgZmlsdGVyPSJ1cmwoI2IpIiBvcGFjaXR5PSIuOCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTM0Ni4xMTIgMzQyLjI2OGMxLjY3NCAxLjY3NCA0LjM2OSAxLjc3IDYuMTEyLjE2OCA1OC41MDItNTMuNzYzIDYxLjItMTQ4Ljc1MyA0LjUwNS0yMDUuNDQ4LTU2LjY5NC01Ni42OTUtMTUxLjY4NC01My45OTYtMjA1LjQ0NyA0LjUwNS0xLjYwMiAxLjc0My0xLjUwNiA0LjQzOS4xNjggNi4xMTNsMTk0LjY2MiAxOTQuNjYyWiIgc2hhcGUtcmVuZGVyaW5nPSJjcmlzcEVkZ2VzIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6bXVsdGlwbHkiPjwvcGF0aD48L2c+PGcgZmlsdGVyPSJ1cmwoI2MpIiBvcGFjaXR5PSIuMyI+PHBhdGggZmlsbD0idXJsKCNkKSIgZD0iTTM0Ni4xMTIgMzQyLjI2OGMxLjY3NCAxLjY3NCA0LjM2OSAxLjc3IDYuMTEyLjE2OCA1OC41MDItNTMuNzYzIDYxLjItMTQ4Ljc1MyA0LjUwNS0yMDUuNDQ4LTU2LjY5NC01Ni42OTUtMTUxLjY4NC01My45OTYtMjA1LjQ0NyA0LjUwNS0xLjYwMiAxLjc0My0xLjUwNiA0LjQzOS4xNjggNi4xMTNsMTk0LjY2MiAxOTQuNjYyWiI+PC9wYXRoPjwvZz48ZyBmaWx0ZXI9InVybCgjZSkiIG9wYWNpdHk9Ii4zIj48cGF0aCBmaWxsPSJ1cmwoI2YpIiBkPSJNMjYxLjYwNyAzMjQuNzkyYzIuNDQxLTEuNDM0IDIuODQ0LTQuNzg2LjkxMi02Ljg1NUwxMjYuMTIxIDE3MS45NWMtMi4wMTgtMi4xNi01LjUzNS0xLjgzMS03LjAxNy43MjdhMTQ4Ljk5NiAxNDguOTk2IDAgMCAwLTYuNDkgMTIuNTM3Yy0uNzc0IDEuNjg4LS4zODkgMy42NzMuOTI2IDQuOTg0bDEzNy4wODggMTM2LjU5OGE0LjUxMyA0LjUxMyAwIDAgMCA0Ljk4NS45NDRjMi43MDItMS4xNzYgNC4wMjEtMS43OSA1Ljk5NC0yLjk0OFoiPjwvcGF0aD48L2c+PHBhdGggZmlsbD0idXJsKCNnKSIgZD0iTTM1Ny4zNTggMzc0LjMwNmMxLjc1OCAxLjc1OCA0LjU4MSAxLjg2NiA2LjQxNi4xODlhMTYzLjU5NSAxNjMuNTk1IDAgMCAwIDUuMzE2LTUuMDgxYzYyLjU0Ny02Mi41NDcgNjIuNTQ3LTE2My45NTYgMC0yMjYuNTA0LTYyLjU0OC02Mi41NDctMTYzLjk1Ny02Mi41NDctMjI2LjUwNCAwYTE2My41OTUgMTYzLjU5NSAwIDAgMC01LjA4MSA1LjMxNmMtMS42NzcgMS44MzUtMS41NjkgNC42NTguMTg5IDYuNDE2bDIxOS42NjQgMjE5LjY2NFoiPjwvcGF0aD48cGF0aCBmaWxsPSJ1cmwoI2gpIiBkPSJNMzU3LjM1OCAzNzQuMzA2YzEuNzU4IDEuNzU4IDQuNTgxIDEuODY2IDYuNDE2LjE4OWExNjMuNTk1IDE2My41OTUgMCAwIDAgNS4zMTYtNS4wODFjNjIuNTQ3LTYyLjU0NyA2Mi41NDctMTYzLjk1NiAwLTIyNi41MDQtNjIuNTQ4LTYyLjU0Ny0xNjMuOTU3LTYyLjU0Ny0yMjYuNTA0IDBhMTYzLjU5NSAxNjMuNTk1IDAgMCAwLTUuMDgxIDUuMzE2Yy0xLjY3NyAxLjgzNS0xLjU2OSA0LjY1OC4xODkgNi40MTZsMjE5LjY2NCAyMTkuNjY0WiI+PC9wYXRoPjxwYXRoIGZpbGw9InVybCgjaSkiIGQ9Ik0zMzYuMzMzIDM5NC42NzJjMi42MjctMS41MjggMy4wMjQtNS4xMTguODc1LTcuMjY3TDEyNC41OTUgMTc0Ljc5MmMtMi4xNDktMi4xNDktNS43MzktMS43NTItNy4yNjcuODc1YTE1OC44NyAxNTguODcgMCAwIDAtNy4xMTkgMTMuNzI1Yy0uODExIDEuNzcxLS40MSAzLjg1Mi45NjggNS4yMjlsMjA2LjIwMSAyMDYuMjAyYzEuMzc4IDEuMzc4IDMuNDU5IDEuNzc5IDUuMjMuOTY4YTE1OC44NyAxNTguODcgMCAwIDAgMTMuNzI1LTcuMTE5WiI+PC9wYXRoPjxwYXRoIGZpbGw9InVybCgjaikiIGQ9Ik0zMzYuMzMzIDM5NC42NzJjMi42MjctMS41MjggMy4wMjQtNS4xMTguODc1LTcuMjY3TDEyNC41OTUgMTc0Ljc5MmMtMi4xNDktMi4xNDktNS43MzktMS43NTItNy4yNjcuODc1YTE1OC44NyAxNTguODcgMCAwIDAtNy4xMTkgMTMuNzI1Yy0uODExIDEuNzcxLS40MSAzLjg1Mi45NjggNS4yMjlsMjA2LjIwMSAyMDYuMjAyYzEuMzc4IDEuMzc4IDMuNDU5IDEuNzc5IDUuMjMuOTY4YTE1OC44NyAxNTguODcgMCAwIDAgMTMuNzI1LTcuMTE5WiI+PC9wYXRoPjxwYXRoIGZpbGw9InVybCgjaykiIGQ9Ik0yODYuNjU5IDQxMy4zNDhjMy42MTktLjcwNyA0Ljg2LTUuMTM2IDIuMjUzLTcuNzQzTDEwNi4zOTUgMjIzLjA4OGMtMi42MDctMi42MDctNy4wMzYtMS4zNjYtNy43NDMgMi4yNTNhMTYwLjgxMyAxNjAuODEzIDAgMCAwLTIuNTAyIDE4LjQ2MiA0LjY2NiA0LjY2NiAwIDAgMCAxLjM2NiAzLjY1NGwxNjcuMDI3IDE2Ny4wMjdhNC42NjcgNC42NjcgMCAwIDAgMy42NTQgMS4zNjYgMTYwLjgzNCAxNjAuODM0IDAgMCAwIDE4LjQ2Mi0yLjUwMloiPjwvcGF0aD48cGF0aCBmaWxsPSJ1cmwoI2wpIiBkPSJNMjg2LjY1OSA0MTMuMzQ4YzMuNjE5LS43MDcgNC44Ni01LjEzNiAyLjI1My03Ljc0M0wxMDYuMzk1IDIyMy4wODhjLTIuNjA3LTIuNjA3LTcuMDM2LTEuMzY2LTcuNzQzIDIuMjUzYTE2MC44MTMgMTYwLjgxMyAwIDAgMC0yLjUwMiAxOC40NjIgNC42NjYgNC42NjYgMCAwIDAgMS4zNjYgMy42NTRsMTY3LjAyNyAxNjcuMDI3YTQuNjY3IDQuNjY3IDAgMCAwIDMuNjU0IDEuMzY2IDE2MC44MzQgMTYwLjgzNCAwIDAgMCAxOC40NjItMi41MDJaIj48L3BhdGg+PHBhdGggZmlsbD0idXJsKCNtKSIgZD0iTTIxNy4wMzEgNDExLjU3N2M0LjQ1IDEuMTA3IDcuMjAxLTQuMTU1IDMuOTU5LTcuMzk4TDEwNy44MjEgMjkxLjAxYy0zLjI0My0zLjI0Mi04LjUwNC0uNDkxLTcuMzk4IDMuOTU5IDYuNzg0IDI3LjI3OSAyMC44MzggNTMuMTIxIDQyLjE2MyA3NC40NDUgMjEuMzI0IDIxLjMyNCA0Ny4xNjYgMzUuMzc5IDc0LjQ0NSA0Mi4xNjNaIj48L3BhdGg+PHBhdGggZmlsbD0idXJsKCNuKSIgZD0iTTIxNy4wMzEgNDExLjU3N2M0LjQ1IDEuMTA3IDcuMjAxLTQuMTU1IDMuOTU5LTcuMzk4TDEwNy44MjEgMjkxLjAxYy0zLjI0My0zLjI0Mi04LjUwNC0uNDkxLTcuMzk4IDMuOTU5IDYuNzg0IDI3LjI3OSAyMC44MzggNTMuMTIxIDQyLjE2MyA3NC40NDUgMjEuMzI0IDIxLjMyNCA0Ny4xNjYgMzUuMzc5IDc0LjQ0NSA0Mi4xNjNaIj48L3BhdGg+PHBhdGggc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjUiIHN0cm9rZS13aWR0aD0iNSIgZD0iTTM2Mi4wODggMzcyLjY0OWMtLjgxNi43NDYtMi4xMTkuNzMzLTIuOTYzLS4xMTFMMTM5LjQ2MiAxNTIuODc1Yy0uODQ0LS44NDQtLjg1Ny0yLjE0Ny0uMTExLTIuOTYzYTE2MC42NjEgMTYwLjY2MSAwIDAgMSA1LjAwMy01LjIzNGM2MS41NzEtNjEuNTcgMTYxLjM5Ny02MS41NyAyMjIuOTY4IDAgNjEuNTcxIDYxLjU3MSA2MS41NzEgMTYxLjM5NyAwIDIyMi45NjhhMTYwLjY2MSAxNjAuNjYxIDAgMCAxLTUuMjM0IDUuMDAzWm0tMjYuNjQ4IDE2LjUyM2MxLjAzOCAxLjAzOC43ODYgMi42Ny0uMzY0IDMuMzRhMTU2LjU2MiAxNTYuNTYyIDAgMCAxLTEzLjUxIDcuMDA2Yy0uNzk0LjM2NC0xLjc2MS4xOTctMi40Mi0uNDYyTDExMi45NDQgMTkyLjg1NGMtLjY1OS0uNjU5LS44MjYtMS42MjYtLjQ2Mi0yLjQyYTE1Ni41NjIgMTU2LjU2MiAwIDAgMSA3LjAwNi0xMy41MWMuNjctMS4xNSAyLjMwMi0xLjQwMiAzLjM0LS4zNjRMMzM1LjQ0IDM4OS4xNzJabS00OC4yOTYgMTguMjAxYzEuMjc2IDEuMjc2LjU3NCAzLjIyMS0uOTY0IDMuNTIxYTE1OC4yNjkgMTU4LjI2OSAwIDAgMS0xOC4xNzUgMi40NjMgMi4xNjcgMi4xNjcgMCAwIDEtMS42OTQtLjY0TDk5LjI4MyAyNDUuNjg5YTIuMTY3IDIuMTY3IDAgMCAxLS42NC0xLjY5NCAxNTguMzEzIDE1OC4zMTMgMCAwIDEgMi40NjMtMTguMTc1Yy4zLTEuNTM4IDIuMjQ1LTIuMjQgMy41MjEtLjk2NGwxODIuNTE3IDE4Mi41MTdabS02Ny45MjItMS40MjZjLjgxLjgxLjgxMiAxLjczNS40NjQgMi4zOTEtLjMzMy42My0xLjAwNyAxLjA3Mi0yLjA1Mi44MTMtMjYuODUtNi42NzgtNTIuMjg2LTIwLjUxLTczLjI4LTQxLjUwNS0yMC45OTUtMjAuOTk0LTM0LjgyNy00Ni40My00MS41MDUtNzMuMjgtLjI1OS0xLjA0NS4xODMtMS43MTkuODEzLTIuMDUyLjY1Ni0uMzQ4IDEuNTgxLS4zNDYgMi4zOTEuNDY0bDExMy4xNjkgMTEzLjE2OVoiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTpzb2Z0LWxpZ2h0Ij48L3BhdGg+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJhIiB4MT0iMjU2IiB4Mj0iMjU2IiB5MT0iMCIgeTI9IjUxMiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIHN0b3AtY29sb3I9IiMyRDJFMzEiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwRjEwMTIiPjwvc3RvcD48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iZCIgeDE9IjI1Ni4zMDYiIHgyPSIyNTYuMzA2IiB5MT0iOTUuMzMyIiB5Mj0iMzc5LjQ5MiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIHN0b3AtY29sb3I9IiNmZmYiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNDNUM1QzUiPjwvc3RvcD48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iZiIgeDE9IjE3OC4zNjUiIHgyPSIxNzguMzY1IiB5MT0iMTY3LjI0OCIgeTI9IjM1MS4xMjYiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmIj48L3N0b3A+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjQzVDNUM1Ij48L3N0b3A+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIyNTYiIHgyPSIyNTYiIHkxPSI5NiIgeTI9IjQxNiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIHN0b3AtY29sb3I9IiNmZmYiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNDQ0MiPjwvc3RvcD48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iaSIgeDE9IjI1NiIgeDI9IjI1NiIgeTE9Ijk2IiB5Mj0iNDE2IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iI2ZmZiI+PC9zdG9wPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0NDQyI+PC9zdG9wPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJrIiB4MT0iMjU2IiB4Mj0iMjU2IiB5MT0iOTYiIHkyPSI0MTYiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmIj48L3N0b3A+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjQ0NDIj48L3N0b3A+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9Im0iIHgxPSIyNTYiIHgyPSIyNTYiIHkxPSI5NiIgeTI9IjQxNiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIHN0b3AtY29sb3I9IiNmZmYiPjwvc3RvcD48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNDQ0MiPjwvc3RvcD48L2xpbmVhckdyYWRpZW50PjxyYWRpYWxHcmFkaWVudCBpZD0iaCIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDAgMzIwIC0zMjAgMCAyNTYgOTYpIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iI2ZmZiI+PC9zdG9wPjxzdG9wIG9mZnNldD0iLjU5OCIgc3RvcC1jb2xvcj0iI2ZmZiIgc3RvcC1vcGFjaXR5PSIwIj48L3N0b3A+PC9yYWRpYWxHcmFkaWVudD48cmFkaWFsR3JhZGllbnQgaWQ9ImoiIGN4PSIwIiBjeT0iMCIgcj0iMSIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgwIDMyMCAtMzIwIDAgMjU2IDk2KSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIHN0b3AtY29sb3I9IiNmZmYiPjwvc3RvcD48c3RvcCBvZmZzZXQ9Ii41OTgiIHN0b3AtY29sb3I9IiNmZmYiIHN0b3Atb3BhY2l0eT0iMCI+PC9zdG9wPjwvcmFkaWFsR3JhZGllbnQ+PHJhZGlhbEdyYWRpZW50IGlkPSJsIiBjeD0iMCIgY3k9IjAiIHI9IjEiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoMCAzMjAgLTMyMCAwIDI1NiA5NikiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmIj48L3N0b3A+PHN0b3Agb2Zmc2V0PSIuNTk4IiBzdG9wLWNvbG9yPSIjZmZmIiBzdG9wLW9wYWNpdHk9IjAiPjwvc3RvcD48L3JhZGlhbEdyYWRpZW50PjxyYWRpYWxHcmFkaWVudCBpZD0ibiIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDAgMzIwIC0zMjAgMCAyNTYgOTYpIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iI2ZmZiI+PC9zdG9wPjxzdG9wIG9mZnNldD0iLjU5OCIgc3RvcC1jb2xvcj0iI2ZmZiIgc3RvcC1vcGFjaXR5PSIwIj48L3N0b3A+PC9yYWRpYWxHcmFkaWVudD48ZmlsdGVyIGlkPSJiIiB3aWR0aD0iMjk1LjU4MyIgaGVpZ2h0PSIyOTUuNTgyIiB4PSIxMjYuMTM1IiB5PSI2Ni44OCIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiPjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ij48L2ZlRmxvb2Q+PGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiByZXN1bHQ9ImhhcmRBbHBoYSIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIj48L2ZlQ29sb3JNYXRyaXg+PGZlT2Zmc2V0IGR5PSItNS4xMiI+PC9mZU9mZnNldD48ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIxMiI+PC9mZUdhdXNzaWFuQmx1cj48ZmVDb21wb3NpdGUgaW4yPSJoYXJkQWxwaGEiIG9wZXJhdG9yPSJvdXQiPjwvZmVDb21wb3NpdGU+PGZlQ29sb3JNYXRyaXggdmFsdWVzPSIwIDAgMCAwIDEgMCAwIDAgMCAxIDAgMCAwIDAgMSAwIDAgMCAwLjQgMCI+PC9mZUNvbG9yTWF0cml4PjxmZUJsZW5kIGluMj0iQmFja2dyb3VuZEltYWdlRml4IiBtb2RlPSJwbHVzLWxpZ2h0ZXIiIHJlc3VsdD0iZWZmZWN0MV9kcm9wU2hhZG93XzE0MTM0XzQ2NTQiPjwvZmVCbGVuZD48ZmVCbGVuZCBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QxX2Ryb3BTaGFkb3dfMTQxMzRfNDY1NCIgcmVzdWx0PSJzaGFwZSI+PC9mZUJsZW5kPjwvZmlsdGVyPjxmaWx0ZXIgaWQ9ImMiIHdpZHRoPSIyNjcuNTgzIiBoZWlnaHQ9IjI2Ny41ODIiIHg9IjE0MC4xMzUiIHk9Ijg2IiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiPjwvZmVGbG9vZD48ZmVCbGVuZCBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0ic2hhcGUiPjwvZmVCbGVuZD48ZmVHYXVzc2lhbkJsdXIgcmVzdWx0PSJlZmZlY3QxX2ZvcmVncm91bmRCbHVyXzE0MTM0XzQ2NTQiIHN0ZERldmlhdGlvbj0iNSI+PC9mZUdhdXNzaWFuQmx1cj48L2ZpbHRlcj48ZmlsdGVyIGlkPSJlIiB3aWR0aD0iMTcxLjUyMiIgaGVpZ2h0PSIxNzcuNTkyIiB4PSIxMDIuMjE4IiB5PSIxNjAuNTIyIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiPjwvZmVGbG9vZD48ZmVCbGVuZCBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0ic2hhcGUiPjwvZmVCbGVuZD48ZmVHYXVzc2lhbkJsdXIgcmVzdWx0PSJlZmZlY3QxX2ZvcmVncm91bmRCbHVyXzE0MTM0XzQ2NTQiIHN0ZERldmlhdGlvbj0iNSI+PC9mZUdhdXNzaWFuQmx1cj48L2ZpbHRlcj48L2RlZnM+PC9zdmc+" width="512" height="512"/>
  </symbol>
</svg>
```

Logo 始终以原色渲染。**B 档下 `.logo.W` / `.logo.L` 翻色失效** —— 包在 `<image>` 里的 SVG 不响应 CSS `color:`。B 档品牌的封面需要用版式手段保证对比度。

> ⚠️ **shadow DOM fill 级联陷阱** <!-- ENGINEERING-DNA: tier-b-no-css-fill -->
> B 档 SVG 内容（`<radialGradient>`、`<path fill="url(#…)">`）如果直接 inline 进 `<symbol>`，`<use>` 实例化 symbol 时内容进入 shadow DOM。**外层 `.logo` SVG 上的 CSS `fill` 会级联进 shadow tree，覆盖每一个内层 `<path fill="url(#…)">` —— 因为 CSS specificity 高于 presentation attribute。** 徽章会被压成单色。
>
> 修复就是上面那个 `<image href>` envelope：浏览器把 SVG 当作整体 image 渲染，没有 shadow-DOM 的 fill 跨界。**B 档（和 C 档）的 `.logo` 上永远不要通过 CSS 设 `fill:`**。

#### 多色 cover 处理（仅 B / C 档）<!-- ENGINEERING-DNA: logo-multicolor-cover -->

B 档不行 —— logo 无论如何都以原色渲染。三条版式应对，按优先级：

1. **不加 chip —— 裸 logo 直接放上 cover。** 默认。Linear 的球形图标自身就有强烈的内部对比（深色渐变 + 白色高光条纹）。在同色系封面（`--primary` 蓝紫）上，logo 自身的内部对比就够。
2. **chip 加 `padding: 0`** —— 不可见的对比度层。仅当 logo 外缘色调和 cover 背景太接近时使用。
3. **chip 加 `padding > 0`** —— opt-in 的卡片效果。仅在"logo 作为可见卡片"是预期视觉效果时使用。

### 用法

```html
<!-- 白色（深色 slide 上） -->
<svg class="logo W" viewBox="0 0 512 512" aria-label="Linear">
  <use href="#brand-wm"/>
</svg>

<!-- 品牌深色（浅色 slide 上） -->
<svg class="logo L" viewBox="0 0 512 512" aria-label="Linear">
  <use href="#brand-wm"/>
</svg>
```

```css
/* B 档（multi）— 不要在 CSS 设 fill。<!-- ENGINEERING-DNA: tier-b-no-css-fill --> */
.logo               { height: 32px; width: auto; flex-shrink: 0; display: block; }
.logo.W, .logo.L    { /* 故意留空 — 见上方注释 */ }

/* B 档可选 .logo-chip 背板 — 见 §4 "多色 cover 处理" */
.logo-chip { display: inline-flex; padding: 0; background: var(--white); border-radius: 50%; line-height: 0; }
.logo-chip .logo { display: block; }
```

### 摆放规则 <!-- ENGINEERING-DNA -->
- **每张 slide** 都必须有 logo — 封面与所有内容页。
- **封面**：`.cov-top` flex 行的右上角。
- **内容页**：`.shd` 页头条的右端（左 = 标题 eyebrow / slide 编号，右 = logo）。
- Logo 周围最小留白 = logo 高度（32px）四周都留。
- 不要拉伸、不要在 `W`/`L` 之外重新着色、不要把 logo 叠在带图案的区域上。

---

## 5. 幻灯片架构 <!-- ENGINEERING-DNA — the entire section, invariant -->

### 脚手架
```
#wrap — fixed fullscreen, flex-centre, background: var(--ink)
  #deck — 1280 × 720, position:relative, overflow:hidden (hard contract)
    .slide × N — absolute inset, opacity show/hide, overflow:hidden (hard contract)
```

`#wrap` 与 `body` 的 background **必须用 `var(--ink)`**，不能写死 `#000` / `#1A1A1A` / `#1F1F22`。

### 全屏适配 — 运行时缩放 <!-- ENGINEERING-DNA: scale-to-fit -->

```css
/* Required CSS hooks */
#deck { transform-origin: center center; will-change: transform; }
```

```html
<!-- Required JS at the end of <body>; runs on load + resize -->
<script>
(function () {
  var deck = document.getElementById('deck');
  function scaleDeck() {
    if (!deck) return;
    if (window.matchMedia('(max-width: 768px)').matches) {
      deck.style.transform = 'none';
      return;
    }
    var s = Math.min(window.innerWidth / 1280, window.innerHeight / 720);
    deck.style.transform = 'scale(' + s + ')';
  }
  window.addEventListener('resize', scaleDeck);
  window.addEventListener('load', scaleDeck);
  scaleDeck();
})();
</script>
```

### 显示状态
```css
.slide          { opacity: 0; pointer-events: none; transition: opacity .38s ease; overflow: hidden; }
.slide.active   { opacity: 1; pointer-events: auto; }
.slide.active .sc { animation: enter .42s cubic-bezier(.4,0,.2,1) both; }
```

### 内容页 (`.sw`)
```css
.sw { background: var(--surface); border-left: 3px solid var(--accent); display: flex; flex-direction: column; height: 100%; }
.sw .sc { flex: 1; padding: 32px 80px 32px 96px; display: flex; flex-direction: column; overflow: hidden; }
```

### 页头条 (`.shd`) — 每张内容页都有
```css
.shd { display: flex; align-items: center; justify-content: space-between; padding: 0 80px 0 96px; flex: 0 0 54px; border-bottom: 1px solid var(--rule); }
.shd-num { font-size: 11px; font-weight: 800; letter-spacing: .2em; text-transform: uppercase; color: var(--accent); }
```

---

### 5.1 单页适配契约（来之不易，不可妥协） <!-- ENGINEERING-DNA: fit-contract -->

**避免所有"内容溢出 deck"bug 的那一条规则：** 内容页是 *固定大小的盒子*，不是滚动文档。每张 slide 都必须放进 720 px 之内并保留可见的底部呼吸空间。装不下就减内容 — 永远不要发布会剪裁或溢出的 slide。

#### 三层 overflow 安全网 <!-- ENGINEERING-DNA: three-layer-overflow -->

```css
.slide   { overflow: hidden; }   /* Layer 1 — absolute stop at deck edge */
.sw .sc  { overflow: hidden; }   /* Layer 2 — content area stop */
.row-x   { overflow: hidden; }   /* Layer 3 — any flex:1 absorber inside .sc */
.card    { overflow: hidden; }   /* Layer 4 — any card with bounded height */
```

#### 内容高度预算

对于一张默认 54 px 页头条 + 对称 32 px 上下内边距的标准内容页：

```
Deck height         720 px
− header strip      54 px
− top padding       32 px
− bottom padding    32 px
─────────────────────────
= content area     602 px   ← all section heights + gaps must fit in here
```

**写 HTML 前，先把计划的段高 + 间距加起来。** 总和超过 602 px 就删内容。

#### "单 flex:1 absorber" 规则

`.sc` 内 N 个区段的垂直堆叠中，**必须恰好有一个** 区段吸收剩余空间。

```html
<div class="sc">
  <div class="hero">     <!-- flex: 0 0 auto — natural height -->
  <div class="tl-wrap">  <!-- flex: 0 0 auto — natural height -->
  <div class="row-top">  <!-- flex: 1 1 0; min-height: 0; overflow: hidden — absorbs remaining -->
  <div class="row-risk"> <!-- flex: 0 0 auto — natural height -->
</div>
```

The absorber MUST carry `min-height: 0` AND `overflow: hidden`. Both are required.

#### 非对称下内边距 — 看得见的呼吸空间

```css
.sw .sc { padding: 24px 80px 40px 96px; }   /* 24 top / 40 bottom */
```

#### 编写前清单（写 HTML 之前做）

1. **List your sections** and assign each a role: `absorber` (exactly one) or `natural`.
2. **Estimate natural heights** using the type scale.
3. **Sum fixed sections + gaps**. Confirm total ≤ (602 − absorber minimum).
4. **Write the copy short enough that single-line bullets don't wrap**.
5. **Render at 1280×720 and eye the bottom edge.**

#### 导致 overflow 的反模式

- **N 个自然高度区段且没有 absorber**：总和超过 602 px，内容溢出 deck。
- **Absorber 缺 `min-height: 0`**：flex 拒绝把它压到内容自然高度以下。
- **Absorber 缺 `overflow: hidden`**：超大子元素穿透 flex:1。
- **`.slide`/`.sc` 漏 `overflow: hidden`**：安全网失效。
- **相信 1920×1080 渲染**：`transform: scale()` 等比例缩小所有内容 — 永远在原生 1280×720 验证。

---

## 6. 幻灯片类型

> **Emphasis for Linear**: 数据/图表页（Type H）为主导。
> Foreground these types when designing decks: **Type H（图表/数据洞察）**、**Type E（数据/对比页）**、**Type B（双栏内容）**。
> Use sparingly: Type F（图像页）、Type D（翻面卡片）。

### Type A — 封面
- 背景：`var(--primary)` (#5E6AD2)
- 结构：Logo 右上角 → Eyebrow → 巨型标题 → 斜体副标 → Meta 行
- **不允许任何装饰线** — 不要 hairline、不要 accent line、不要渐变边框。

#### 封面垂直构图规则 <!-- ENGINEERING-DNA: cover-vertical-anchor -->

```css
.cov          { display: flex; flex-direction: column; }
.cov-top      { flex: 0 0 auto; padding: 36px 48px 0 96px; }
.cov-sc       { flex: 1 1 0; min-height: 0; overflow: hidden;
                display: flex; flex-direction: column; justify-content: center;
                padding: 0 96px; gap: 22px; }
.cov-bot      { position: absolute; bottom: 28px; left: 96px; right: 96px;
                display: flex; justify-content: space-between; align-items: center; }
```

**封面副标的换行控制：**
- 副标 `max-width: 640px`
- 文案保持 ≤ 2 行（中文 ~32 字 / 行 × 2 = ~64 字上限）

### Type B — 双栏内容
对比、特性列表、指标。`grid-template-columns: 1fr 1fr; gap: 20px`。移动端会折叠为单栏。

### Type C — 全宽叙事
单栏、大字号、配 pull-quote。用于上下文、摘要、推荐建议页。

### Type D — 翻面卡片
两张卡片并排。正面 = `--primary`，背面 = `--tint`（比 `--accent` 柔和）。**Hover + 点击翻面** — JS `onclick` 切换 `.on` class（移动端必需）。

### Type E — 数据/对比页
以表格或结构化数据网格为主体的 slide。用于特性对比、TCO 分析、规格矩阵。

**Row-count rule** <!-- ENGINEERING-DNA: type-e-row-count -->
- 5 行是标准 14 px 行内边距下的舒适行数。
- 6 行以上要么收紧单元格内边距，要么拆到两张 slide。

#### 表格在移动端必须横向滚动 <!-- ENGINEERING-DNA: type-e-mobile-scroll -->

```css
@media (max-width: 768px) {
  .dt-wrap {
    overflow-x: auto !important;
    overflow-y: visible !important;
    -webkit-overflow-scrolling: touch;
  }
  .dt {
    min-width: 560px;
    font-size: 13px;
  }
  .dt th, .dt td {
    padding: 8px 12px;
    white-space: nowrap;
  }
}
```

### Type F — 图像页
一张或多张图占据 slide 主体，文字锚定在安静区域。

### Type G — 交互演示
嵌在 slide 内的自包含、点击推进的微体验。

### Type H — 图表/数据洞察
由一个或多个数据可视化主导的 slide。用于定量论证、趋势分析、性能对比。

**原则：**
- 每张 slide 一个主图。
- 标题陈述洞察，不是图表类型。
- 图表占 slide 区域 50–70%。剩余空间：标题 + 一段解读。

### Type I — 标签页
多个内容视图通过标签切换。最多 4 个标签。

### Type J — 引言/抽词
一句强烈的话锚定叙事时刻。

### Type K — 时间线/路线图
横向或纵向的里程碑序列。

---

## 7. 组件库 <!-- ENGINEERING-DNA — every component preserved verbatim -->

### 7.1 Panel Card (Tier 1 — "big card")

```css
.panel {
  flex: 1; padding: 22px;
  display: flex; flex-direction: column; gap: 8px;
  background: var(--white); border: 1px solid var(--rule);
  border-top: 3px solid var(--rule);
}
.panel.blue { border-top-color: var(--accent); }
.panel.dark { background: var(--primary); color: #fff; border: none; border-top: 3px solid rgba(255,255,255,.2); }
```

### 7.2 Showcase Card (Tier 2 — "block card")

```css
.show-card {
  flex: 1; display: flex; flex-direction: column;
  background: var(--white); border: 1px solid var(--rule);
  border-top: 3px solid var(--accent);
  padding: 20px 22px;
  gap: 10px;
  transition: transform .22s ease, box-shadow .22s ease;
}
.show-card:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,.08); }
.show-card .show-title { font-size: 20px; font-weight: 900; color: var(--ink); line-height: 1.15; }
.show-card .show-desc { font-size: 15px; font-weight: 600; color: var(--mid); line-height: 1.5; }
.show-card.accent-navy { border-top-color: var(--primary); }
.show-card.accent-green { border-top-color: var(--green); }
.show-card.compact { padding: 16px 18px; gap: 8px; }
.show-card.compact .show-title { font-size: 18px; }
```

### 7.3 Item Card (Tier 3 — "list card")

```css
.bitem {
  display: flex; align-items: flex-start; gap: 14px;
  padding: 12px 16px;
  background: var(--white);
  border-left: 3px solid var(--accent);
}
```

### 7.4 Stat Card (Tier 4 — "number card")

紧凑指标展示。`stat-num`（36 px 900 `--primary`）+ `stat-label`（12 px 800 全大写 `--mid`）。

### 7.5 Callout / Note

**轻量**（内嵌备注）：
```css
.snote { border-left: 3px solid var(--primary); padding: 10px 18px; background: var(--tint); font-size: 14px; font-weight: 700; }
```

**深色**（结论 / 建议条）：
用于 slide 末尾 takeaway 的全宽 navy 块。文字：13–16 px 700–800，`rgba(255,255,255,.85)`。

### 7.6 Marks, Badges & Chips

```css
.mark::before { display: inline-block; width: 18px; height: 18px; border-radius: 50%; text-align: center; line-height: 18px; font-size: 11px; font-weight: 900; margin-right: 8px; }
.mark.yes::before { content: '✓'; background: var(--green); color: #fff; }
.mark.no::before  { content: '−'; background: var(--red); color: #fff; }
```

### 7.7 Table (`.dt`)

```css
.dt { width: 100%; border-collapse: collapse; font-size: 14px; font-weight: 600; }
.dt th { background: var(--primary); color: #fff; font-size: 13px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; text-align: left; padding: 10px 14px; }
.dt td { padding: 10px 14px; color: var(--ink); border-bottom: 1px solid var(--rule); }
.dt tr.hi td { background: var(--tint); }
.dt .pos { color: var(--green); font-weight: 800; }
.dt .neg { color: var(--red); font-weight: 800; }
.dt .neu { color: var(--mid); font-weight: 600; }
```

### 7.8 Charts

| Type | Primary colour | Secondary | Neutral | Notes |
|---|---|---|---|---|
| Bar (H / V) | `--accent` | `--primary` | `--rule` | Animated grow on entrance |
| Progress / gauge | `--accent` fill | — | `--rule` track | 8px height, 4px radius |
| Pie / donut | `--primary` | `--accent` | `--rule` | Max 3 segments |
| Timeline | `--primary` dots | — | `--rule` dots | Key nodes: `--tint` ring |

每张图最多 2 种颜色（+ `--rule` 中性色）。

### 7.9 Tabs

```css
.tabs { display: flex; gap: 6px; margin-bottom: 14px; }
.tb { padding: 7px 16px; border: 1px solid var(--rule); background: transparent; font: 800 12px/1 'Inter'; letter-spacing: .06em; color: var(--mid); cursor: pointer; }
.tb:hover { border-color: var(--accent); color: var(--accent); }
.tb.on { background: var(--primary); border-color: var(--primary); color: #fff; }
.tc { display: none; } .tc.on { display: block; }
```

### 7.10 Sequential steps / barriers
用 monospace-weight span 的数字标签 `01` `02` `03`、`--accent` 色。

### 7.11 Decision questions
前缀用 `Q.1` / `Q.2` 的 span，`--accent` 色、字重 800。

### 7.12 Timeline

```css
.tl-wrap { position: relative; padding: 0 10px; }
.tl-line { position: absolute; top: 73px; left: 30px; right: 30px; height: 3px; background: var(--rule); }
.tl-row { display: flex; position: relative; z-index: 1; }
.tl-node { flex: 1; display: flex; flex-direction: column; align-items: center; text-align: center; padding: 0 4px; }
.tl-date-top {
  font-size: 22px; font-weight: 900; letter-spacing: -.01em; color: var(--accent);
  min-height: 48px; margin-bottom: 16px;
  display: flex; align-items: flex-end; justify-content: center;
}
.tl-dot2 { width: 18px; height: 18px; border-radius: 50%; background: var(--rule); margin-bottom: 12px; flex-shrink: 0; transition: transform .3s ease; }
.tl-name { font-size: 18px; font-weight: 900; color: var(--ink); line-height: 1.2; margin-bottom: 4px; }
.tl-detail { font-size: 14px; font-weight: 600; color: var(--mid); line-height: 1.3; }
```

### 组件选择指引

| 内容 | 组件 | 布局 |
|---|---|---|
| 2–3 个深度对比 | Panel | side-by-side flex |
| 2–3 个带 label 概念块（高端） | Showcase Card | side-by-side flex 或 3 栏 grid |
| 3–4 个带 label 概念块（紧凑） | Showcase Card `.compact` | 3 栏或 2×2 grid |
| 顺序步骤、特性列表 | Item Card | 堆叠列 |
| 带状态图标的发现项 | Item Card（图标变体） | 堆叠列 |
| 关键指标 | Stat Card | 3–4 列一行 |
| 交互式对比 | Flip Card (Type D) | 2 张并排 |
| 单条 takeaway | Callout / Note（轻量） | 全宽 |
| Slide 结论 / 建议 | Callout / Note（深色） | 全宽 |
| 项目里程碑 | Timeline | 横向 flex |

---

## 8. 图像与视觉佐证

### 原则

Linear 的视觉证据优先真实：产品 UI 截图、真实数据、具体指标。不用装饰性渐变或抽象艺术。

### 何时加入图像

- **产品 UI 截图**：讨论 Linear 功能时，展示真实界面。
- **数据可视化**：当某个数字或趋势是核心时，建一张图（Type H）。
- **图示**：用 CSS/SVG 画流程、层级、对比。

### 图像处理

- `border-radius: 4px`。浅色背景上可选 `1px solid var(--rule)` 边框。
- 绝不在繁忙图像上直接放文字而不加 scrim（最少 `rgba(0,0,0,.5)`）。

---

## 9. 导航 <!-- ENGINEERING-DNA -->

### 圆点导航 — 底部居中，横向

```css
#nav { position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); display: flex; gap: 7px; z-index: 99; }
.dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,.25); cursor: pointer; transition: all .22s ease; }
.dot.on { width: 20px; border-radius: 3px; background: rgba(255,255,255,.85); }
```

### Slide 计数器 — 右下角
`SLIDE N / TOTAL` — 12 px、字重 700、35% 白。

### 控件
键盘：`← → Space Home End`。触屏：48 px 滑动阈值。

---

## 10. 移动端 <!-- ENGINEERING-DNA — every line invariant -->

```css
@media (max-width: 768px) {
  body { overflow-y: auto; }
  #wrap { position: static; display: block; }
  #deck { width: 100%; height: auto; position: static; transform: none !important; }
  .slide {
    position: relative !important;
    opacity: 1 !important;
    pointer-events: auto !important;
    height: auto !important;
    inset: auto !important;
    overflow: visible !important;
  }
  .cov, .tj-sw {
    min-height: 100dvh;
    height: auto;
    overflow: visible !important;
  }
  .sw {
    height: auto;
    overflow: visible !important;
  }
  .slide:has(.cov), .slide:has(.tj-sw) { min-height: 100dvh; }
  .slide:has(.sw) { min-height: 0; }
  .sw .sc, .tj-sw .sc, .cov-sc {
    overflow: visible !important;
    height: auto !important;
    min-height: 0 !important;
  }
  .body-grid, .fr, .chart-row, .chart-wrap, .tl-wrap, .dt-wrap, .flip-row {
    flex: 0 0 auto !important;
    min-height: 0 !important;
  }
  .dt-wrap {
    position: relative;
    overflow-x: auto !important;
    overflow-y: visible !important;
  }

  .cov-title { font-size: 48px; } .stitle { font-size: 32px; }
  .shd { padding: 0 20px; } .sw .sc { padding: 24px 20px; }
  .g2,.g3,.flip-row,.tabs { grid-template-columns: 1fr; flex-direction: column; }
  #nav, #ctr { display: none; }
}
```

所有交互元素 ≥ 44×44 px 点击区域。

### Source captions 必须移出 absorber <!-- ENGINEERING-DNA: foot-caption-outside-absorber -->

foot 是 `.sc` 的同级 `flex: 0 0 auto`，自然落在 absorber 之后、`.sc` 底 padding 之前。

### inline-flex 陷阱（关键） <!-- ENGINEERING-DNA: inline-flex-trap -->

```css
@media (max-width: 768px) {
  .sc div[style*="display:flex"] { flex-direction: column !important; }
  .sc div[style*="grid-template-columns"] { grid-template-columns: 1fr !important; }
  .pnl { flex: none !important; width: 100% !important; }
}
```

### 移动端 flip card 修复 <!-- ENGINEERING-DNA: flip-card-mobile -->

```html
<div class="fc" onclick="this.classList.toggle('on')">
```

---

## 11. 动画 <!-- ENGINEERING-DNA -->

### 核心过渡

| 元素 | 动效 | 时长 | 缓动 |
|---|---|---|---|
| Slide 切换 | opacity | 380 ms | ease |
| 内容入场 | translateY(14px) → 0 + 淡入 | 420 ms | cubic-bezier(.4,0,.2,1) |
| Flip card | rotateY 180° | 650 ms | cubic-bezier(.4,0,.2,1) |
| 圆点导航 | 宽度展开 | 220 ms | ease |

### 原则

- 每个动效都服务于理解。纯装饰的删掉。
- 入场播放一次。不循环。
- 每张 slide 的 **入场动效** 总时长 ≤ 2 秒。

---

## 12. 布局规则 <!-- ENGINEERING-DNA -->

### Overflow 预防

每张 slide 装进 720 px。太密：减小间距 → 正文降到 14 px → 拆 slide。绝不剪裁或滚动。

**"蓝块"陷阱**：右下角的深色 callout = 视觉失衡。改成全宽底部。

**"蓝叠 navy"陷阱**：在深色 slide（`--primary` bg）上，永远不要用 `--accent` 当文字或 accent — 用白色或半透明白。

### 间距

| Token | 值 |
|---|---|
| 左水平内边距 | 96 px |
| 右水平内边距 | 80 px |
| 上下内边距 | 32 px |
| 页头高度 | 54 px |
| 卡片间距 | 20 px |
| 卡片内边距 | 32 px |
| 圆角 | 4 px |
| 分隔线粗细 | 1 px |
| Accent 边线 | 3 px |

---

## 13. 上线前检查清单 <!-- ENGINEERING-DNA: pre-ship-checklist -->

### 品牌与 Token
- [ ] 每张 slide 都有 logo（封面右上、内容页 `.shd` 右端）
- [ ] **Logo 在封面肉眼可见** — 打开 deck，看 slide 1 右上角
- [ ] **每张 slide 内容都包在 `.sc` 容器内** — 包括 bespoke 满屏 Type J / Type A
- [ ] 颜色：只用系统 token — 不用临时 hex
- [ ] Inter 字体已加载；不用 serif / display 字体

### 字体与可读性
- [ ] 没有低于 12 px 的文字
- [ ] Slide 标题 ≥ 50 px
- [ ] 非表格 slide 的正文 ≥ 16 px
- [ ] 副标 ≥ 20 px

### 幻灯片结构
- [ ] 每张内容页都有 `.shd` 页头条 + slide 编号 + logo
- [ ] 封面没有装饰线
- [ ] 每张 slide 都在 720 px 内 — 没有内容剪裁或溢出
- [ ] 没有"蓝块"陷阱

### 适配契约 (§5.1) — 布局安全门
- [ ] `.slide` 和 `.sw .sc` 都带 `overflow: hidden`（三层安全网）
- [ ] 每个 flex:1 absorber 也带 `overflow: hidden` AND `min-height: 0`
- [ ] `.sc` 里的垂直堆叠只有 **一个** `flex: 1 1 0` absorber
- [ ] 自然段高 + 间距之和 ≤ 602 px
- [ ] 最后一段内容到 deck 底边的可见间距 ≥ 20 px
- [ ] 在原生 **1280 × 720** 下验证

### 组件与交互
- [ ] Flip card 在桌面 hover-only、移动端 click-to-toggle
- [ ] 表格：单元格里不要彩色徽章 — 仅用文字颜色
- [ ] 交互元素有可见的 hover / focus 状态

### 响应式（移动端对齐 — 不可妥协）
- [ ] 所有多栏布局在 ≤ 768 px 时折叠为单栏
- [ ] inline `display:flex` 必须配移动端 CSS 的 catch-all
- [ ] 移动端点击目标 ≥ 44×44 px
- [ ] Flip card 在移动端通过点击工作 — 每个 `.fc` 都带 `onclick="this.classList.toggle('on')"`
- [ ] 完工前在 **375 px 宽** 下测试浏览器
