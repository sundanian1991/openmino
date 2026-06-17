# Nian Design System — DESIGN.md

> 9 段式设计文档。Agent 读此文件即可做出正确设计决策，无需翻阅其他文件。
>
> 详细值 → `references/tokens.md` · 品牌理念 → `brand-dna.md` · 组件实现 → `references/components/` · 质量检查 → `references/checklist.md`

---

## 1. 视觉主题与氛围

**Scandinavian workshop。** 自然光穿过窗户，工具整齐摆在木桌上。精确、温暖、不赶时间。

设计语言建立在"数据驱动"和"规则透明"两个核心原则上。低饱和自然色板（≤30%）承载品牌，等宽字体承载数据精度，不对称构图制造视觉张力。每个页面都应让人觉得：经过深思熟虑后的克制，不是 AI 模板的产物。

核心张力：Nature vs Tech · Heritage vs Future · Organic vs Engineered · Warmth vs Precision

---

## 2. 色彩方案与角色

自然低饱和主色传递户外属性，高饱和亮色强化功能性识别。7 色，比例固定。

### Primary — 自然色系（80%）

| 名称 | 色值 | 占比 | 角色 |
|------|------|:----:|------|
| `--darkgray` | `#2C2C2C` | 45% | 品牌主视觉底色、正文、标识 |
| `--olive` | `#4A5D3A` | 20% | 产品主色、户外属性传递 |
| `--earth` | `#8B7355` | 15% | 产品主色、自然质感 |

### Accent — 功能性警示色（10%）

| 名称 | 色值 | 占比 | 角色 |
|------|------|:----:|------|
| `--yellow` | `#FFD100` | 5% | 功能性识别、安全警示、CTA |
| `--orange` | `#E55B2B` | 5% | 功能性识别、视觉焦点、高亮 |

### Scene — 场景化色彩（10%）

| 名称 | 色值 | 占比 | 角色 |
|------|------|:----:|------|
| `--glacier` | `#2A4A5A` | 5% | 冬季/高海拔场景、冷调氛围 |
| `--rock` | `#808080` | 5% | 攀岩/山地场景、中性过渡 |

### 使用比例

```
darkgray 45% ████████████████████████
olive    20% ██████████
earth    15% ███████▌
yellow    5% ██▌
orange    5% ██▌
glacier   5% ██▌
rock      5% ██▌
```

### 配色规则

- **80/10/10 原则**：Primary 80% + Accent 10% + Scene 10%，不越界
- **功能色不做装饰**：yellow/orange 仅用于需要关注的功能元素
- **场景色按语境选用**：glacier 用于冷调场景，rock 用于中性过渡，非场景页可不用
- **数据可视化顺序**：opacity → olive/earth/darkgray → accent

---

## 3. 字体规则

三字体族，各司其职，永不混用。

| 角色 | 字体 | 来源 | 降级 |
|------|------|------|------|
| Display | Playfair Display | Google Fonts | Georgia, 'Times New Roman', serif |
| Body | Inter | Google Fonts | -apple-system, 'Helvetica Neue', Arial, sans-serif |
| Data | JetBrains Mono | Google Fonts | 'Courier New', monospace |

可选：Doto（Google Fonts）仅用于 Hero 装饰数字和点阵纹理。

```html
<link href="https://fonts.googleapis.com/css2?family=Playfair Display:wght@300;400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### 字号刻度

| Token | 字号 | 行高 | 字距 | 用途 |
|-------|:----:|:----:|:----:|------|
| `--display-2xl` | 120px | 1.0 | -0.03em | Hero 时刻，每页唯一 |
| `--display-xl` | 96px | 1.05 | -0.025em | 全屏声明、核心指标 |
| `--display-lg` | 48px | 1.15 | -0.01em | 章节标题 |
| `--display-md` | 36px | 1.2 | 0 | 分类标题 |
| `--heading-lg` | 24px | 1.3 | 0 | 子章节 |
| `--heading-md` | 20px | 1.4 | 0 | 功能标题 |
| `--body-lg` | 18px | 1.6 | 0 | 引导段落 |
| `--body` | 16px | 1.6 | 0 | 正文 |
| `--body-sm` | 14px | 1.5 | 0.01em | 说明文字 |
| `--label` | 12px | 1.4 | 0.06em | ALL CAPS 标签 |

**Hero 字号 ÷ 正文 ≥ 8:1。** 达不到不算 Hero。

### 字体纪律

- Playfair Display → Display 专属。不正文、不标签。
- Inter → Body + H3。不 Hero、不数据。
- JetBrains Mono → 数据 + 标签。ALL CAPS + 0.06em 字距。不正文。
- 每页上限：3 字体 + 3 字号 + 2 字重。

---

## 4. 组件样式

### Button（按钮）

四种变体：Primary / Secondary / Ghost / Accent

| 状态 | 视觉 |
|------|------|
| Default | `background: var(--darkgray); color: #fff; border-radius: 4px; min-height: 44px` |
| Hover | 背景加深 8%（`opacity: 0.92`） |
| Active | 下沉 1px（`transform: translateY(1px)`） |
| Disabled | `opacity: 0.4; cursor: not-allowed` |

Secondary：`background: transparent; border: 1px solid var(--border); color: var(--text-primary)`
Ghost：`background: transparent; border: none; color: var(--text-secondary)`
Accent：`background: var(--orange); color: #fff`

### Card（卡片）

| 变体 | 视觉特征 | 圆角 |
|------|---------|:----:|
| Magazine Cut | 衬线大标题 + 大留白 | 8px |
| Number-Led | 半透明大编号 + badge | 8px |
| Icon Card | 左侧图标区 33% + 右侧文字 | 8px |
| Tag Card | 分类 pill 标签 + 描述 | 8px |
| Flip Card | 3D 翻转（perspective: 1000px） | 16px |

卡片边框：`1px solid var(--border)`。Hover 态：`border-color: var(--border-strong)`。无阴影。

### Input（输入框）

下划线样式为主。Default：`border-bottom: 1px solid var(--border)`。Focus：`border-color: var(--darkgray)`。Error：`border-color: var(--red)` + 提示文字。

### Nav（导航）

固定顶部，`backdrop-filter: blur(12px)`（唯一允许 blur 的场景），背景 `rgba(240,237,230,0.85)`。品牌名用 Playfair Display，链接用 Inter 12px。

### Tab Panel

底部 3px 边框指示器。Active：`border-color: var(--orange); color: var(--text-primary)`。Inactive：`color: var(--text-muted)`。

### Toggle

药丸轨道（`border-radius: 999px`）。On：`background: var(--darkgray)`。Off：`background: var(--border)`。Thumb：白色圆形，150ms 过渡。

### Alert

左侧 3px 色条 + 括号前缀。Error：`var(--red)`。Warning：`var(--gold)`。Success：`var(--green)`。

### Code Panel

4 种变体：macOS Window / Notebook Paper / Typewriter / Clean White。圆角 `12px`（唯一允许 > 8px 的组件）。macOS 变体：三色圆点 + 深色背景 `#1a1b26` + JetBrains Mono 12px。

---

## 5. 布局原则

### 间距刻度（8px 基础网格）

| Token | 值 | 语义 |
|-------|:--:|------|
| `--space-xs` | 4px | 同组元素（标签+值） |
| `--space-sm` | 8px | 紧密编组 |
| `--space-md` | 16px | 同组不同项（列表项） |
| `--space-lg` | 24px | Section 内部间距 |
| `--space-xl` | 32px | Section 间分隔 |
| `--space-2xl` | 48px | 大组分隔 |
| `--space-3xl` | 64px | Hero 到内容 |
| `--space-4xl` | 96px | 新上下文、页面级留白 |

先靠间距分组，不行再加分隔线（1px hairline），最后才用卡片背景。如果用了分割线——间距可能选错了。

### 栅格

- 容器最大宽度：1120px
- 单栏（文字密集）：`max-width: 640px; margin: 0 auto`
- 2 栏不对称：`2fr 1fr`（数据+上下文）
- 3 栏：`repeat(3, 1fr)`（卡片网格）
- 4 栏：`repeat(4, 1fr)`（指标卡、小元素）

### 留白哲学

Answer 层永远不框住——不加边框、不加背景卡包裹品牌宣言。用空间本身制造层级。不对称 > 对称。居中布局显得通用。

---

## 6. 深度与层级

**无阴影系统。** 用 border + 表面色 + opacity 代替 box-shadow。

| 层级 | 实现 | 场景 |
|------|------|------|
| **Level 0** | `--surface` 背景，无边框 | 默认卡片、内容区 |
| **Level 1** | `--surface-alt` 背景，`1px solid --border` | Hover 态、活跃元素、提升卡片 |
| **Level 2** | `--surface` 背景，`1px solid --border-strong` | Modal、下拉、聚焦面板 |
| **Level 3** | 全屏遮罩 `rgba(240,237,230,0.92)` + `--surface` 面板 | 详情面板、可滚动弹窗 |

**没有阴影。没有模糊。没有 drop-shadow。** 层级通过边框对比度和背景色阶可见，不通过投影。

---

## 7. Do's and Don'ts

### Do

- 灰度先于颜色——4 级灰度建立层级，颜色只标记需注意的信息
- 间距优先于分割线——用距离分组，分割线是间距不足的症状
- 每页恰好一处"打破"——一个超大数字、一个 accent 色、一个巨大间距
- 数据可视化颜色顺序：opacity → Nature 色梯度 → 信号色
- 容器策略递进：间距 → hairline → 边框 → 背景卡，用最轻的
- 所有组件引用 token，不硬编码 hex
- JetBrains Mono 标签必须 ALL CAPS + 0.06em 字距

### Don't

- 禁止阴影（`box-shadow`）、大面积渐变（`linear-gradient` 仅允许 Seam Divider 使用）
- 禁止 `blur()` 和 `backdrop-filter`（仅 Nav 固定顶栏除外）
- 禁止深色模式、深浅切换
- 禁止 emoji 做 UI 元素
- 禁止圆角 > 8px（pill 按钮 `999px` 和 Code Panel `12px` 除外）
- 禁止 bounce/elastic/spring 缓动、视差、滚动劫持、骨架屏
- 禁止 toast 弹窗、snackbar、浮动提示气泡
- 禁止信号色做装饰——只用于"需要关注"的功能元素
- 禁止所有 section 居中、千篇一律卡片网格、对称 50/50 分栏
- 禁止 Georgia 做正文、Inter 做 Hero、Mono 做段落

---

## 8. 响应式行为

| 断点 | 宽度 | 布局变化 |
|------|------|---------|
| Desktop | ≥1120px | 完整布局，最大宽度 1120px |
| Tablet | 768–1119px | 2 栏 → 堆叠，导航折叠 |
| Mobile | <768px | 单栏，导航链接隐藏 |

- 移动端是"重新排列"不是"缩小"
- 不隐藏内容——adapt 不 amputate
- 触控目标最小值：44px × 44px
- Hero 字号用 `clamp()` 响应式缩放

---

## 9. Agent Prompt 指南

### 色彩快速参考

```
--darkgray: #2C2C2C  45%  品牌底色·正文·标识
--olive:    #4A5D3A  20%  产品主色·户外属性
--earth:    #8B7355  15%  产品主色·自然质感
--yellow:   #FFD100   5%  安全警示·CTA
--orange:   #E55B2B   5%  视觉焦点·高亮
--glacier:  #2A4A5A   5%  冬季场景·冷调
--rock:     #808080   5%  中性过渡
```

### 可直接粘贴的组件 Prompt

**1. Hero Section（品牌宣言型）**
> 创建一个 Hero section。Playfair Display 96px 标题，Inter 16px 副标题，JetBrains Mono 11px 标签。左侧文字右侧留白，不对称布局。背景 `--bg`，标题用 `--text-display`。Hero 字号与正文比 ≥ 8:1。

**2. Data Card Grid（4 列指标卡）**
> 创建 4 列指标卡网格。每卡：JetBrains Mono 48px 大数字 + 12px ALL CAPS 标签 + 14px 描述。背景 `--surface`，边框 `1px solid --border`，圆角 8px。数字用 `--text-display`，标签用 `--text-secondary`。

**3. Tab Panel（内容切换）**
> 创建 Tab Panel 组件。2-5 个标签，底部 3px 指示器。Active 态：`border-color: var(--orange); color: var(--text-primary)`。Inactive：`color: var(--text-muted)`。内容区 Inter 14px 正文。

**4. Alert（风险预警）**
> 创建 Alert 组件。左侧 3px 色条，括号前缀（如 `[WARNING]`）。Error 用 `var(--red)`，Warning 用 `var(--gold)`。背景 rgba 同色系 6% 透明度。JetBrains Mono 标签 + Inter 正文。

**5. Code Panel（macOS 风格）**
> 创建 macOS 风格代码面板。顶部 3 色圆点（#ff5f56 / #ffbd2e / #27c93f）+ 深色背景 #1a1b26。JetBrains Mono 12px 代码，行高 1.8。圆角 12px，`box-shadow: 0 12px 48px rgba(0,0,0,0.3)`。

---

*2026-06-07 · 从 brand-dna.md + tokens.md + design-rules.md + checklist.md 整合。*
