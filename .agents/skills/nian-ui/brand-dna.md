# Brand DNA — 年 UI

> 导演级的叙事结构。注册过的视觉语言。
> Cinematic structure. Nian color. One voice.

年 UI 是一个混血技能。它的叙事骨架继承 cinematic-ui（导演工作流、叙事节拍、构图族），视觉皮肤继承 nian-design（自然色系、三字体、无阴影系统）。

这个品牌描述的不是"年 UI 技能的视觉规范"——它描述的是 **年 UI 输出的每一个页面应该呈现的品牌气质**。

---

## 品牌气质

设计出来的页面应该让人觉得：

- **Directed, not templated** — 每个页面像电影的独立场景，有签名构图和叙事节奏
- **Naturally restrained** — 颜色是自然的（olive/earth/glacier），不是"设计师精选"的
- **Quiet confidence** — 不用渐变/阴影/玻璃特效、不用装饰性能制造"高档感"。纯度靠间距、层级靠文本对比
- **Cinematic without Hollywood** — 有场景感但不是商业大片的"昂贵调色板"。结构参考导演，颜色来自土地
- **One voice** — 不管选的是王家卫还是诺兰，页面的颜色体系始终是 nian 的

---

## 字体系统

三字体族（Display + Body + Mono）——固定，无需决策。

| Level | Font | Size | Weight | Usage |
|-------|------|:----:|:------:|-------|
| Display | Playfair Display | 96-120px | 300 | Hero 标题 |
| H1 | Playfair Display | 48px | 300 | 页面主标题 |
| H2 | Playfair Display | 36px | 300 | 章节标题 |
| H3 | Inter | 20-24px | 500 | 组件标题 |
| Body | Inter | 16-17px | 400 | 正文 |
| Data | JetBrains Mono | 14px | 400 | 数据/代码 |
| Label | JetBrains Mono | 11px | 500 | 标签/元数据/ALL CAPS |

Hero 字号 ÷ 正文 ≥ 8:1。

**加载：**
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Doto:wght@400;700&display=swap" rel="stylesheet">
```

**字体纪律：**
- Playfair Display → Display 专属。不正文、不标签。
- Inter → Body + H3。不 Hero、不数据。
- JetBrains Mono → 数据 + 标签。不正文。
- 每页上限：3 字体、3 字号、2 字重。
- ALL CAPS 标签：JetBrains Mono + 0.06em 字距。

---

## 色彩系统

### 场景色（三选一，同页仅一个）

| 色名 | 色值 | 情绪基调 | 适用叙事风格 |
|------|------|---------|-------------|
| Olive | `#4A5D3A` | 增长、权威、生命力 | 成长叙事、革新故事、活力品牌 |
| Earth | `#8B7355` | 温暖、怀旧、质感 | 爱情片、工艺叙事、人文历史 |
| Glacier | `#2A4A5A` | 冷峻、精确、距离感 | 科幻、悬疑、技术叙事、哲学沉思 |

**注入方式：**
```css
:root {
  --scene: var(--brand-olive);
  --scene-bg: rgba(74, 93, 58, 0.06);
  --scene-border: rgba(74, 93, 58, 0.2);
}
```

### 表面色

| Token | 色值 | 用途 |
|-------|------|------|
| `--bg` | `#FAFAF8` | 页面主背景 |
| `--surface` | `#FFFFFF` | 卡片/组件背景 |
| `--surface-raised` | `#F5F5F0` | 提升面、hover 态 |
| `--border` | `#E5E5E0` | 默认边框 |
| `--border-visible` | `#C0C0B8` | 强调边框 |

### 文字色

灰度即层级。

| Token | 色值 | 对比度 | 适用 |
|-------|------|:-----:|------|
| `--text-display` | `#2C2C2C` | 100% | Hero 数字、品牌宣言，每屏唯一 |
| `--text-primary` | `#1A1A1A` | 90% | 正文、主要内容 |
| `--text-secondary` | `#6B6B6B` | 60% | 标签、说明、元信息 |
| `--text-disabled` | `#A0A0A0` | 40% | 禁用态、时间戳、提示 |

### 功能色

| 信号 | 色值 | 用途 | 频率 |
|------|------|------|:----:|
| Accent Orange | `#E55B2B` | 数据警示、功能焦点 | 月度级 |
| Accent Yellow | `#FFD100` | 安全标识、限量标记 | 季度级 |
| Success | `#2E7D32` | 增长、达标 | — |
| Warning | `#F9A825` | 注意、限量 | — |
| Error | `#C62828` | 风险、错误 | — |

Accent Orange 仅用于功能信号——不做标题装饰、不做分割线。

### 颜色使用规则

- 颜色用在值上，不在标签行或背景上着色。
- 灰度先于颜色——4 级灰度建立层级，颜色只标记要注意的信息。
- 场景色三选一，同页面只用一个。

---

## 三层金字塔

每屏三层。Answer / Argument / Evidence。

| 层级 | 内容 | 做法 |
|------|------|------|
| **Answer** | 唯一结论。品牌宣言、核心指标。 | 1 处。Playfair Display，96-120px。眯眼看应主导全屏。 |
| **Argument** | 支撑上下文。功能、规格、描述。 | 紧贴 Answer（8-16px）。Inter body，`--text-primary`。 |
| **Evidence** | 元数据、技术参数、来源。 | 推向边缘。JetBrains Mono，`--text-secondary` 以下，ALL CAPS。 |

**自检：** 眯眼看屏幕。Answer 是否主导？两个元素等大等距 = 视觉扁平。

---

## 8:1 工业冲击力

**Hero 字号 ÷ 正文字号 ≥ 8。** Hero 用 96-120px，正文用 12-14px。

---

## 构图偏好

**不对称 > 对称。** 居中布局显得通用。

- **左大右小：** Hero 指标 + 元数据堆叠
- **上重下轻：** 大标题在上方，下方稀疏
- **边缘锚定：** 重要元素钉在屏幕边缘，负空间留在中间

用更多空白平衡重型元素，不是用更多内容堆砌。

---

## 装饰

每页恰好用一处打破。一处打破就是设计本身。

- **点阵**（Dot Grid / Doto 字体）：装饰性纹理，可在大面积空白使用
- **暗底色 section**：打断节奏，标记"这一段值得注意"
- **超大幽灵数字**：opacity 3-6%，仅用一次
- **装饰分隔线**：短横线、左对齐柱线

零打破 = 单调网格。多处打破 = 视觉混乱。

---

## 响应式

- 桌面：`≥1120px`
- 平板：`768-1119px`（2 栏 → 堆叠）
- 手机：`<768px`（单栏）
- 不隐藏内容——adapt 不 amputate

---

## 通用禁忌

| 类型 | 禁止 |
|------|------|
| 配色 | 渐变、阴影、模糊、毛玻璃、深色模式、AI 常用的冷灰蓝调 |
| 字体 | 超过 3 字体、Inter 做 Hero、Playfair Display 做正文、Mono 做段落、emoji 做 UI |
| 布局 | 所有 section 居中、对称 50/50 分栏、千篇一律卡片网格 |
| 动效 | bounce/elastic/spring、视差、滚动劫持、弹跳缓动 |
| 装饰 | glassmorphism、圆角矩形+阴影、渐变文字、AI 光效 |
| 颜色使用 | accent-orange 做装饰、跳过 opacity 梯度直接用 accent、多个场景色同页混用 |
| 输出 | 导演/电影名暴露在 UI 中、workflow 术语（"chapter"/"director"/"calibrated"）做标签 |
