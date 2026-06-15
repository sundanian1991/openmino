# Brand DNA — 品牌基因

> 所有场景、所有页面共享的底层规范。nian-design 是基于自然色系的通用品牌系统。
> Landscape and signal. Three typefaces, one voice.

---

## 字体系统

四字体族（Display·Decorative·Body·Mono）——衬线承载有机温度，等宽承载技术精度，点阵承载装饰纹理。

| Level | Font | Size | Weight | Usage |
|-------|------|:----:|:------:|-------|
| Display | Playfair Display | 80-120px | 300 | Hero 标题 |
| H1 | Playfair Display | 48px | 300 | 页面主标题 |
| H2 | Playfair Display | 36px | 300 | 章节标题 |
| H3 | Inter | 20-24px | 500 | 组件标题 |
| Body | Inter | 16-17px | 400 | 正文 |
| Mono | JetBrains Mono | 14px | 400 | 数据/代码 |
| Label | JetBrains Mono | 11px | 500 | 标签/元数据 |

Hero 字号 ÷ 正文 ≥ 8:1。达不到的不算 Hero。

**加载：**

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

Playfair Display 降级至 Georgia。Inter 不可用降级至 `-apple-system, 'Helvetica Neue', Arial`。

**点阵装饰（可选）：** Doto 用于 Hero 装饰数字。仅装饰，不做正文和标签。

```html
<link href="https://fonts.googleapis.com/css2?family=Doto:wght@400;700&display=swap" rel="stylesheet">
```

### 字体纪律

- Playfair Display → Display 专属。不正文、不标签。
- Inter → Body + H3。不 Hero、不数据。
- JetBrains Mono → 数据 + 标签。不正文。
- 每页上限：4 字体（含 Doto 装饰体，仅限 Hero/ghost/点阵，不承载正文）、3 字号、2 字重。
- ALL CAPS 标签：JetBrains Mono + 0.06em 字距。

---


## 色彩系统

自然低饱和主色传递户外属性，高饱和亮色强化功能性识别。7 色体系，比例固定。

### 使用比例

- **Primary 80%**：darkgray 45% + olive 20% + earth 15%
- **Accent 10%**：yellow 5% + orange 5%
- **Scene 10%**：glacier 5% + rock 5%

### 色板

**Primary — 自然色系（80%）**

| Token | 色值 | 占比 | 用途 |
|-------|:----:|:----:|------|
| `--darkgray` | `#2C2C2C` | 45% | 品牌主视觉底色、正文、标识 |
| `--olive` | `#4A5D3A` | 20% | 产品主色、户外属性传递 |
| `--earth` | `#8B7355` | 15% | 产品主色、自然质感 |

**Accent — 功能性警示色（10%）**

| Token | 色值 | 占比 | 用途 |
|-------|:----:|:----:|------|
| `--yellow` | `#FFD100` | 5% | 功能性识别、安全警示、CTA |
| `--orange` | `#E55B2B` | 5% | 功能性识别、视觉焦点、高亮 |

**Scene — 场景化色彩（10%）**

| Token | 色值 | 占比 | 用途 |
|-------|:----:|:----:|------|
| `--glacier` | `#2A4A5A` | 5% | 冬季/高海拔场景、冷调氛围 |
| `--rock` | `#808080` | 5% | 攀岩/山地场景、中性过渡 |

### 文字色

灰度即层级。

| Token | 色值 | 对比度 | 适用 |
|-------|:----:|:-----:|------|
| `--text-display` | `#2d3142` | 90% | Hero 数字、品牌宣言，每屏唯一 |
| `--text-primary` | `#222222` | 100% | 正文、主要内容 |
| `--text-secondary` | `#8A7D6E` | 60% | 标签、说明、元信息 |
| `--text-muted` | `#b0a898` | 40% | 禁用态、时间戳、提示 |

### 数据可视化颜色顺序

1. **opacity 区分**（100% / 60% / 30%）——最轻的区分
2. **Primary 色梯度**（darkgray → olive → earth）
3. **Accent/Scene 色**——仅用于需要关注的数据点

永远不跳过前两步直接用 accent。

### 硬约束

- 颜色用在值上，不在标签行或背景上着色
- 灰度先于颜色——4 级灰度建立层级，颜色只标记需注意的信息
- 深色底必须配 White/Off-White 文字
- **80/10/10 原则**：Primary 80% + Accent 10% + Scene 10%，不越界
- **画布叠加布纹肌理**：SVG noise 纹理，opacity 0.04-0.08

## 气质关键词

设计出来的页面应该让人觉得：

- **Scandinavian workshop** — 自然光穿过窗户，工具整齐摆在木桌上。精确、温暖、不赶时间。
- **工业精度** — 间距精确到像素，颜色计算过对比度。经过深思熟虑后的克制。
- **安静克制** — 每个元素都有功能。装饰服务于内容，不做多余的事。
- **功能温暖** — 技术精确但不冰冷。户外 DNA 带来材质感，自然色抑制数字焦虑。
- **不像 AI 模板** — 最高优先级约束。一眼看出经过设计，不是 prompt 产物。

---

## Craft Rules

### 三层金字塔

每屏三层。Answer / Argument / Evidence。

| 层级 | 内容 | 做法 |
|------|------|------|
| **Answer** | 唯一结论。品牌宣言、核心指标。 | 1 处。Georgia display，96-120px。眯眼看应主导全屏。 |
| **Argument** | 支撑上下文。功能、规格、描述。 | 紧贴 Answer（8-16px）。Inter body，`--text-primary`。 |
| **Evidence** | 元数据、技术参数、来源。 | 推向边缘。JetBrains Mono，`--text-secondary` 以下，ALL CAPS。 |

**自检：** 眯眼看屏幕。Answer 是否主导？两个元素等大等距 = 视觉扁平。大胆让 Answer 大到荒谬，Evidence 小到几乎看不见。对比本身就是层级。

### 8:1 工业冲击力

**Hero 字号 ÷ 正文字号 ≥ 8。** Hero 用 96-120px，正文用 12-14px。达不到这个比值的不算 Hero。

### 构图偏好

**不对称 > 对称。** 居中布局显得通用。

- **左大右小：** Hero 指标 + 元数据堆叠
- **上重下轻：** 大标题在上方，下方稀疏
- **边缘锚定：** 重要元素钉在屏幕边缘，负空间留在中间

用更多空白平衡重型元素，不是用更多内容堆砌。

### 间距语义

| 间距 | 关系 |
|------|------|
| 4-8px | "这些属于同一组"（标签+值） |
| 16px | "同组不同项"（列表项） |
| 32-48px | "新组开始"（section 内分隔） |
| 64-96px | "新上下文"（hero 到内容） |

如果需要分割线，间距可能有问题。分割线是间距对比不足的症状。

### 容器策略

用最轻的工具建立视觉边界：

1. 仅间距（邻近性分组）
2. 细分割线（1px, `--border`）
3. 场景色边框
4. 表面色背景卡片

每步增加视觉权重。Answer 层永远不框住。

### 装饰

每页恰好用一处打破。一处打破就是设计本身。

- **点阵**（Dot Grid / Dot Matrix）：装饰性纹理，可在大面积空白使用
- **暗底色 section**：打断节奏，标记"这一段值得注意"
- **橙色角标**：功能信号，仅标记需关注位置
- **超大幽灵数字**：opacity 3-5%，仅用一次
- **对角线分割**：制造视觉张力，替代直角分割

零打破 = 单调网格。多处打破 = 视觉混乱。

### 打破规则

整页恰好打破一处：

- 零打破 = 单调网格
- 多处打破 = 视觉混乱

可能的打破方式：一个超大数字、一个圆形元素混在矩形中、灰中一点 accent、一个超大间距。

---

## 响应式

- 桌面：`≥1120px`
- 平板：`768-1119px`（2 栏 → 堆叠）
- 手机：`<768px`（单栏）
- 移动端是"重新排列"不是"缩小"
- 不隐藏内容——adapt 不 amputate

---

## 通用禁忌

| 类型 | 禁止 |
|------|------|
| 配色 | 渐变、阴影、模糊、毛玻璃、深色模式、纯黑白大面积 |
| 字体 | 超过 4 字体、Inter 做 Hero、Georgia 做正文、Mono 做段落、emoji 做 UI |
| 布局 | 所有 section 居中、千篇一律卡片网格、对称 50/50 分栏 |
| 动效 | bounce/elastic/spring、视差、滚动劫持、弹跳缓动、骨架屏 |
| 装饰 | glassmorphism、圆角矩形+阴影、渐变文字、AI 光效、斑马纹、填充图标 |
| 组件 | toast 弹窗、snackbar、浮动提示气泡、skeleton loading |
| 圆角 | 卡片 > 8px、按钮 > 4px（pill 按钮用 `--radius-full` 除外）|
| 颜色使用 | 信号色做装饰、跳过 opacity 梯度直接用信号色、颜色上在标签行而非值上 |

### 自检问题

1. 这个页面是否看起来像 AI 生成的通用模板？
2. 三工是否混用（Georgia 做了正文 / Inter 做了 Hero / Mono 做了段落）？
3. Hero 字号与正文比值是否 ≥ 8:1？
4. 品牌主导色是否统一？信号色是否稀有（<2%）？
5. 眯眼看——Answer 层是否主导？两个元素在打架吗？
6. 间距是否传达了归属关系？还是靠分割线在撑？

---

*This is the foundation. Every section builds on top of this.*
