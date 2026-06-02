# Brand DNA — 品牌基因

> 所有场景、所有页面共享的底层规范。nian-design 是基于自然色系的通用品牌系统，服务于数据报告、品牌展示、知识输出等场景。

---

## 色彩系统

### 品牌主色

| 色名 | 色值 | 用途 | 比例 |
|------|------|------|:----:|
| Olive | `#4A5D3A` | 户外 DNA，品牌默认主色 | 45% |
| Earth | `#8B7355` | 材质温暖，自然纹理 | 35% |

### 场景色（三选一，同页只用其一）

| 色名 | 色值 | 氛围 | 适用场景 |
|------|------|------|---------|
| `--scene-olive` | `#4A5D3A` | 森林/正面/增长 | 品牌默认、增长数据、生态主题 |
| `--scene-earth` | `#8B7355` | 沙漠/工艺/温暖 | 材质展示、历史叙事、工艺介绍 |
| `--scene-glacier` | `#2A4A5A` | 冰川/技术/精确 | 数据报告、技术分析、冬季主题 |

**场景色注入方式：**

```css
:root {
  --scene: var(--brand-olive);
  --scene-bg: rgba(74, 93, 58, 0.06);
  --scene-border: rgba(74, 93, 58, 0.2);
}
```

组件通过 `var(--scene)` 引用，不直接写色值。

### 强调色（功能信号，稀有使用）

| 色名 | 色值 | 用途 | 使用频率 |
|------|------|------|:--------:|
| Accent Orange | `#E55B2B` | 数据警示、功能焦点、需关注状态 | 月度级 |
| Accent Yellow | `#FFD100` | 安全标识、限量标记、关键 CTA | 季度级 |

**accent-orange 仅用于功能信号** — 不做标题装饰、不做分割线、不做按钮背景。**accent-yellow 稀有使用** — 一年用不了几次。

### 表面色（浅色固定模式）

| 色名 | 色值 | 用途 |
|------|------|------|
| `--bg` | `#FAFAF8` | 页面主背景 |
| `--surface` | `#FFFFFF` | 卡片/组件背景 |
| `--surface-raised` | `#F5F5F0` | 提升面、hover 态 |
| `--border` | `#E5E5E0` | 默认边框 |
| `--border-visible` | `#C0C0B8` | 强调边框 |

### 文字色（灰度即层级）

| Token | 色值 | 对比度 | 适用 |
|-------|------|:-----:|------|
| `--text-display` | `#2C2C2C` | 100% | Hero 数字、品牌宣言，每屏唯一 |
| `--text-primary` | `#1A1A1A` | 90% | 正文、主要内容 |
| `--text-secondary` | `#6B6B6B` | 60% | 标签、说明、元信息 |
| `--text-disabled` | `#A0A0A0` | 40% | 禁用态、时间戳、提示 |

### 信号色

| 信号 | 色值 | 用途 |
|------|------|------|
| Success | `#2E7D32` | 增长、达标、可用 |
| Warning | `#F9A825` | 注意、限量、低库存 |
| Error | `#C62828` | 风险、枯竭、错误 |

### 色彩比例

| 组 | 包含 | 占比 | 说明 |
|----|------|:---:|------|
| Brand primary | text-display + olive + earth | 80% | 品牌底色，灰度建立层级 |
| Accent | orange + yellow | 5-10% | 功能信号，稀有使用 |
| Scene | glacier + rock | 10-15% | 氛围过渡，色板旋转 |

### 数据可视化颜色顺序

1. **opacity 区分**（100% / 60% / 30%）— 最轻的区分
2. **earth-tone 梯度**（olive → earth → glacier）— 同色系深浅
3. **accent 色** — 仅用于需要关注的数据点

**永远不跳过前两步直接用 accent。**

### 颜色使用规则

- 颜色用在**值上**，不在标签行或背景上着色
- 灰度先于颜色 — 4 级灰度建立层级，颜色只标记需要被注意的信息
- 场景色三选一，同页面只用一个

---

## 字体基因

### 核心原则

- **三工不混用：** 展示用 Georgia，正文用 Inter，数据用 JetBrains Mono
- **字号对比极端：** Hero 字号 ÷ 正文字号 ≥ 8:1
- **点阵装饰可选：** Doto 字体用于 Hero 时刻和装饰数字
- **中英文搭配：** 英文做标签/数据，中文承载内容

### 字体池

| 角色 | 字体 | 来源 | Fallback | 适用 |
|------|------|------|----------|------|
| **Display（主要）** | Georgia | 系统字体 | `'Times New Roman', serif` | Hero 大标题、品牌宣言、Section 标题 |
| **Display（点阵）** | Doto | Google Fonts | `'JetBrains Mono', monospace` | Hero 装饰、单字符展示 |
| **Body（正文）** | Inter | Google Fonts | `-apple-system, sans-serif` | 正文、UI、功能描述 |
| **Data（数据）** | JetBrains Mono | Google Fonts | `'Courier New', monospace` | 数据值、技术参数、ALL CAPS 标签 |

**字体加载：**

```html
<link href="https://fonts.googleapis.com/css2?family=Doto:wght@400;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

Georgia 是系统字体，不需加载。

**为什么选这些字体：** Georgia 是系统衬线字体，零加载成本，即时渲染。衬线温暖平衡 Inter 的工业中性，形成品牌核心张力（Nature vs Tech）。JetBrains Mono 为数据提供技术精度。三种字体，三种角色，无重叠。

### 字号系统

| Token | 尺寸 | 行高 | 字距 | 适用 |
|-------|:----:|:----:|:----:|------|
| `--display-2xl` | 120px | 1.0 | -0.03em | Hero 时刻，整页一处 |
| `--display-xl` | 96px | 1.05 | -0.025em | 全屏陈述、关键指标 |
| `--display-lg` | 48px | 1.15 | -0.01em | Section 标题、产品 Hero |
| `--display-md` | 36px | 1.2 | 0 | 分类标题 |
| `--heading-lg` | 24px | 1.3 | 0 | 子区域标题 |
| `--heading-md` | 20px | 1.4 | 0 | 功能标题 |
| `--body-lg` | 18px | 1.6 | 0 | 导语段落 |
| `--body` | 16px | 1.6 | 0 | 正文字体 |
| `--body-sm` | 14px | 1.5 | 0.01em | 辅助文字、说明 |
| `--label` | 12px | 1.4 | 0.06em | ALL CAPS 标签、标签 |

---

## 气质关键词

设计出来的页面应该让人觉得：

- **Scandinavian workshop** — 自然光穿过窗户，工具整齐摆在木桌上。精确、温暖、不赶时间
- **工业精度** — 不是手工温暖，是工程师经过深思熟虑后的克制。间距精确到像素，颜色计算过对比度
- **安静克制** — 每个元素都有功能。装饰服务于内容，不做多余的事
- **功能温暖** — 技术精确但不冰冷。户外 DNA 带来材质感，自然色抑制数字焦虑
- **不像 AI 模板** — 这是最高优先级的约束。一眼看出经过设计，不是 prompt 产物

---

## Craft Rules — 设计工艺规则

### 三层金字塔

每屏有且仅有**三层信息层级**，不两层、不五层：

| 层级 | 内容 | 实现 |
|------|------|------|
| **Answer** | 唯一结论。品牌宣言、核心指标。 | 1 处。Georgia display，96-120px。眯眼看应主导全屏。 |
| **Argument** | 支撑上下文。功能、规格、描述。 | 紧贴 Answer（8-16px）。Inter body，`--text-primary`。 |
| **Evidence** | 元数据、技术参数、来源。 | 推向边缘。JetBrains Mono，`--text-secondary` 以下，ALL CAPS。 |

**自检：** 眯眼看屏幕。Answer 是否主导？两个元素等大等距 = 视觉扁平。大胆让 Answer 大到荒谬，Evidence 小到几乎看不见。对比本身就是层级。

### 8:1 工业冲击力

**Hero 字号 ÷ 正文字号 ≥ 8。** Hero 用 96-120px，正文用 12-14px。达不到这个比值的 Hero 不算 Hero。

### 字体三工

| 字体 | 角色 | 禁止 |
|------|------|------|
| Georgia | Display：`--display-*` 专属 | 不用作正文、不用作标签 |
| Inter | Body：`--body-*` 到 `--heading-*` | 不用作 Hero 展示、不用作数据 |
| JetBrains Mono | Data：`--label` 和数据值 | 不用作正文段落 |

**每页预算：** 最多 3 字体、3 字号、2 字重。

### 构图偏好

**不对称 > 对称。** 居中布局显得通用。偏好刻意的不均衡构图：

- **左大右小：** Hero 指标 + 元数据堆叠
- **上重下轻：** 大标题在上方，下方稀疏
- **边缘锚定：** 重要元素钉在屏幕边缘，负空间留在中间

用更多空白平衡重型元素，而不是用更多内容堆砌。

### 间距语义

间距是传达关系的主要工具：

```
Tight (4-8px)    = "这些属于同一组"（标签+值）
Medium (16px)    = "同组不同项"（列表项）
Wide (32-48px)   = "新组开始"（section 内分隔）
Vast (64-96px)   = "新上下文"（hero 到内容）
```

**如果需要分割线，间距可能有问题。** 分割线是间距对比不足的症状。

### 容器策略

用最轻的工具建立视觉边界：

1. 仅间距（邻近性分组）
2. earth-tone 细分割线（1px, `--border`）
3. `--scene-rock` 边框
4. `--surface` 背景卡片

每步增加视觉权重。**Answer 层永远不框住。**

### 打破规则

整页恰好打破一处。一处打破就是设计本身：

- 零打破 = 单调网格
- 多处打破 = 视觉混乱

**可能的打破方式：** 一个超大数字、一个圆形 widget 混在矩形中、灰中一点 accent、一个超大间距。

### 一致性与突破

**保持一致的：** 字体角色、标签处理（始终 ALL CAPS + Mono）、间距节奏、颜色角色、灰度层级、对齐方式。

**每屏恰好打破一处的：** 上面。

---

## 容器与布局

- Section 间距：`--space-4xl`（96px）
- 内容最大宽度：`1120px`（`--container-max`）
- 水平内边距：`32px`（`--container-padding`）
- 容器默认：`max-width: var(--container-max); margin: 0 auto; padding: 0 var(--container-padding)`
- 列表模式：单栏（`max-width: 640px`）| 双栏不对称（`2fr 1fr`）| 三栏（`repeat(3, 1fr)`）| 四栏（`repeat(4, 1fr)`）

---

## 通用禁忌清单

| 类型 | 禁止 |
|------|------|
| 配色 | 渐变、阴影、模糊、毛玻璃、深色模式、深浅切换、纯黑白大面积、AI 常用的冷灰蓝调 |
| 字体 | 超过 3 字体、Inter 做 Hero、Georgia 做正文、Mono 做段落、emoji 做 UI |
| 布局 | 所有 section 居中、千篇一律卡片网格、对称 50/50 分栏（用不对称比例） |
| 动效 | bounce/elastic/spring parallax、视差、滚动劫持、弹跳缓动、骨架屏、spinner |
| 装饰 | glassmorphism、圆角矩形+阴影、渐变文字、AI 光效、zebra 条纹、斑马纹、填充图标 |
| 组件 | toast 弹窗、snackbar、浮动提示气泡、skeleton loading |
| 圆角 | 卡片 > 8px、按钮 > 4px、圆形元素排除 `--radius-full` |
| 整体 | 看起来像 AI 生成的通用模板、所有元素视觉权重一致（无层级） |
| 颜色使用 | accent-orange 做装饰、跳过 opacity 梯度直接用 accent、颜色上在标签行而非值上 |

### 自检问题

1. 这个页面是否看起来像 AI 生成的通用模板？
2. 三工是否混用（Georgia 做了正文 / Inter 做了 Hero / Mono 做了段落）？
3. Hero 字号与正文比值是否 ≥ 8:1？
4. 场景色是否唯一？accent 是否稀有？
5. 眯眼看——Answer 层是否主导？两个元素在打架吗？
6. 间距是否传达了归属关系？还是靠分割线在撑？

---

## 响应式规则

- 桌面：`≥1120px`（完整布局）
- 平板：`768-1119px`（2 栏 → 堆叠）
- 手机：`<768px`（单栏）
- 移动端是"重新排列"不是"缩小"
- 移动端不隐藏内容 — adapt 不 amputate

---

## 细节规范

- **选中文本高亮：** `::selection { background: var(--brand-olive); color: #fff; }`
- **链接悬停：** 颜色加深或下划线，不用缩放、不用阴影
- **hover 态：** 边框/文字亮度提升一级，无 scale 无 shadow

---

*This is the foundation. Every section builds on top of this.*
