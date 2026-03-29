---
theme: default
background: https://images.unsplash.com/photo-1557683316-973673baf926?w=1920
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## Anthropic × Geist 设计风格指南

  教学幻灯片 — 快速掌握陶土色手绘美学
drawings:
  persist: false
transition: slide-left
title: Anthropic 设计风格指南
mdc: true
---

# Anthropic × Geist
## 设计风格完全指南

用温暖的手绘语言，讲述严谨的技术故事

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    按空格或点击继续 <carbon:arrow-right class="inline"/>
  </span>
</div>

<div class="abs-br m-6 flex gap-2">
  <span class="text-sm opacity-50">设计风格深度学习</span>
</div>

<!--
Source: 原文档封面
-->

---
layout: two-cols
---

# 什么是 Anthropic 风格？

<v-clicks>

**三大核心支柱**

| 支柱 | 内涵 | 表现 |
|------|------|------|
| **温暖** | 质朴感 | 陶土色 + 手形元素 |
| **严谨** | 可信度 | 几何网格 + 模块化 |
| **克制** | 少即是多 | 充裕留白 + 精简元素 |

</v-clicks>

::right::

<v-click>

```
人文温度 × 技术精度 × 极简克制
```

**一句话描述**

> "用温暖的手绘语言，
> 讲述严谨的技术故事"

</v-click>

<!--
Source: 风格 DNA 章节
-->

---
layout: two-cols
---

# 色彩系统：陶土色家族

<v-clicks>

**主色调**

| 色号 | HEX | 用途 |
|------|-----|------|
| Terracotta Base | `#E2725B` | 主品牌色、Logo |
| Terracotta Accent | `#E35336` | 强调色、CTA |
| Terracotta Deep | `#CA6641` | 文字、深色填充 |

**象征意义**
- 陶土：手工、质朴、温暖
- 红橙：活力、亲和、人性
- 大地：稳定、可信、根基

</v-clicks>

::right::

<v-click>

**色彩使用金字塔**

```
┌─────────────────────────────┐
│ 顶层点缀色 (5%)              │
│ Deep Blue - 链接、CTA        │
├─────────────────────────────┤
│ 主色陶土 (20%)               │
│ 填充、强调、图标              │
├─────────────────────────────┤
│ 中性基底 (75%)               │
│ Cream / Grey - 背景、文字     │
└─────────────────────────────┘
```

**无障碍规则**
- 正文文本：≥ 4.5:1
- 大文本：≥ 3:1
- UI 组件：≥ 3:1

</v-click>

<!--
Source: 色彩系统章节
-->

---
layout: two-cols
---

# 三原色速记

<div class="text-center py-8">

<div class="inline-block p-8 rounded-2xl" style="background: #F5F1EE">

<div class="flex gap-4 justify-center items-center">
  <div class="w-24 h-24 rounded-xl flex items-center justify-center text-white font-bold" style="background: #C77B68">Terracotta</div>
  <div class="w-24 h-24 rounded-xl border-2 flex items-center justify-center font-bold" style="border-color: #3D2C29; color: #3D2C29">Cream</div>
  <div class="w-24 h-24 rounded-xl flex items-center justify-center text-white font-bold" style="background: #3D2C29">Charcoal</div>
</div>

<div class="mt-6 font-mono text-sm">
  #C77B68 · #F5F1EE · #3D2C29
</div>

</div>

</div>

::right::

<v-clicks>

**中性色基底**

| 色号 | HEX | 用途 |
|------|-----|------|
| Cream / Ivory | `#F5F1EE` | 主背景 |
| Warm Grey Light | `#E8E4E1` | 卡片背景 |
| Warm Grey Mid | `#C5C1BE` | 边框 |
| Charcoal | `#3D2C29` | 主要文字 |

**点缀色（谨慎）**

| 色号 | HEX | 用途 |
|------|-----|------|
| Deep Blue | `#2C5F7D` | 链接、CTA |
| Muted Teal | `#4A7C8B` | 次要点缀 |

</v-clicks>

<!--
Source: 色彩系统章节
-->

---
layout: two-cols
---

# 线条与手绘规则

<v-clicks>

**线条特征**

| 属性 | 规格 | 说明 |
|------|------|------|
| 风格 | 手绘感、微瑕 | 有呼吸感 |
| 粗细 | 2-3px | 保持一致性 |
| 端点 | 圆角 | 柔和、亲和 |
| 转角 | 圆滑过渡 | 避免锐角 |
| 颜色 | Charcoal `#3D2C29` | 或陶土深色 |

</v-clicks>

::right::

<v-click>

**手绘 vs 机械**

```
机械线条          手绘线条
├── 完美直线    ├── 微微波动
├── 统一粗细    ├── 有机变化
├── 锐利转角    ├── 柔和过渡
└── 冷感、精确  └── 温暖、人性
```

**应用层级**

```
装饰层 → 背景纹理、分割线
表达层 → 表情、姿态、手势
结构层 → 几何形状（谨慎）
```

</v-click>

<!--
Source: 线条与手绘规则章节
-->

---
layout: two-cols
---

# 标志性元素库：手形符号

<v-clicks>

手形是核心，象征 **连接、传递、协作、引导**

| 手形 | 语义 | 场景 |
|------|------|------|
| 🖐️ 张开 | 欢迎、开放 | 封面、引导页 |
| 👆 指向 | 引导、指示 | 操作提示 |
| ✊ 握拳 | 力量、确定 | 完成状态 |
| 🤲 托举 | 支持、承载 | 帮助、赋能 |
| ✍️ 书写 | 创作、表达 | 编辑、创作 |

</v-clicks>

::right::

<v-click>

**手 × 物品 = 新语义**

```
手 + 书籍 = 知识传递
手 + 地球 = 全球协作
手 + 代码 = 技术创作
手 + 植物 = 成长培育
手 + 工具 = 能力赋能
```

**自然意象**

- **蝴蝶**：蜕变、进化
- **山脉**：稳定、高度
- **蜂巢**：协作、结构
- **水流**：流动、适应
- **树木**：生长、根基

</v-click>

<!--
Source: 标志性元素库章节
-->

---
layout: two-cols
---

# 构图与网格系统

<v-clicks>

**5×5 方格矩阵**

```
┌───┬───┬───┬───┬───┐
│ □ │ □ │ □ │ □ │ □ │
├───┼───┼───┼───┼───┤
│ □ │ □ │ □ │ □ │ □ │
├───┼───┼───┼───┼───┤
│ □ │ □ │ □ │ □ │ □ │
├───┼───┼───┼───┼───┤
│ □ │ □ │ □ │ □ │ □ │
├───┼───┼───┼───┼───┤
│ □ │ □ │ □ │ □ │ □ │
└───┴───┴───┴───┴───┘
```

**网格规格**

| 设备 | 列数 | 间距 | 最大宽度 |
|------|------|------|---------|
| Desktop | 12列 | 24px | 1440px |
| Tablet | 8列 | 16px | 768px |
| Mobile | 4列 | 12px | 390px |

</v-clicks>

::right::

<v-click>

**间距 Token（4px 单元）**

```css
space.1  = 4px   /* 微小间距 */
space.2  = 8px   /* 紧凑间距 */
space.4  = 16px  /* 默认间距 */
space.6  = 24px  /* 中等间距 */
space.8  = 32px  /* 大间距 */
space.12 = 48px  /* 页面级间距 */
```

**留白原则**

```
┌─────────────────────────────┐
│      留白 > 40%              │
│                             │
│    ┌─────────┐             │
│    │ 元素    │ ← 呼吸空间   │
│    └─────────┘             │
└─────────────────────────────┘
```

</v-click>

<!--
Source: 构图与网格章节
-->

---
layout: two-cols
---

# Prompt 模板库

**快速调用模板**

<div class="text-sm py-4">

```markdown
A minimalist [主题] in Anthropic/Geist style,
featuring hand-drawn line art with terracotta #C77B68
on warm cream background #F5F1EE, charcoal lines #3D2C29,
soft organic curves, rounded line endings,
ample negative space, warm and approachable,
flat vector art style
```

</div>

::right::

<v-clicks>

**结构拆解**

```
[风格前缀] + [主体] + [色彩] + [修饰] + [技术]
```

| 组件 | 内容 |
|------|------|
| 风格前缀 | `in Anthropic/Geist style` |
| 主体 | `featuring [描述]` |
| 色彩 | `terracotta #C77B68 on cream #F5F1EE` |
| 修饰 | `hand-drawn, soft curves, ample space` |
| 技术 | `flat vector art style` |

</v-clicks>

<!--
Source: Prompt 模板库章节
-->

---
layout: two-cols
---

# 实战案例 A：手 + 书籍图标

**需求**：知识传递主题图标

```markdown
A simple icon in Anthropic style on a 5×5 grid,
featuring a hand holding a book,
minimalist line art, terracotta #C77B68 fill
on cream #F5F1EE,
hand-drawn black lines, soft organic curves,
rounded line endings, warm approachable aesthetic,
flat vector style
```

::right::

<v-click>

**案例 B：学习成长插画**

```markdown
A minimalist illustration in Anthropic style,
featuring a hand watering a plant
growing from a book,
symbolizing learning and growth,
hand-drawn line art with terracotta #C77B68
on cream #F5F1EE,
soft organic curves, rounded line endings,
warm and approachable aesthetic,
ample negative space, flat vector style
```

</v-click>

<!--
Source: 实战案例章节
-->

---
layout: center
class: text-center
---

# 设计检查清单

<div class="text-left mx-auto max-w-2xl">

<v-clicks>

- [ ] 主色使用 Terracotta (#C77B68)
- [ ] 背景使用 Cream (#F5F1EE)
- [ ] 线条颜色为 Charcoal (#3D2C29)
- [ ] 线条端点为圆角 (Round cap)
- [ ] 有足够留白（>40%）
- [ ] 元素对齐到网格
- [ ] 手绘感但不失严谨
- [ ] 整体感觉温暖、可信、克制

</v-clicks>

</div>

<!--
Source: 设计检查清单章节
-->

---
layout: center
class: text-center
---

# 快速参考卡

<div class="grid grid-cols-3 gap-8 text-left mx-auto max-w-3xl mt-8">

<div>

**一句话**

陶土色手绘线稿，温暖克制，人文科技感

</div>

<div>

**三原色**

```
#C77B68
#F5F1EE
#3D2C29
```

**三关键词**

```
手绘
温暖
极简
```

</div>

<div>

**核心语义**

```
连接
传递
协作
引导
```

</div>

</div>

<!--
Source: 快速参考卡章节
-->

---
layout: two-cols
---

# 复习：核心要点

<v-clicks>

**风格 DNA**

```
人文温度 × 技术精度 × 极简克制
```

**色彩系统**
- 陶土色为主 (#C77B68)
- 米白基底 (#F5F1EE)
- 75% 中性色 + 20% 主色 + 5% 点缀

**线条规则**
- 手绘感、2-3px 粗细
- 圆角端点、柔和转角
- Charcoal 或陶土深色

</v-clicks>

::right::

<v-click>

**元素库**
- 手形符号（核心）
- 自然意象（蝴蝶、山脉、树木）
- 技术 + 手绘融合

**构图原则**
- 5×5 网格系统
- 留白 > 40%
- 间距基于 4px 单元

**Prompt 模板**
```
A minimalist [主题] in Anthropic style,
hand-drawn, terracotta on cream,
ample negative space, flat vector
```

</v-click>

<!--
Source: 全文总结
-->

---
layout: center
class: text-center
---

# 理解检查

<div class="text-left mx-auto max-w-2xl">

<v-clicks>

1. **为什么选择陶土色作为主色？**
   <span class="text-sm opacity-70">（答案：传递温暖、质朴、安全的情感）</span>

2. **手绘线条的三大特征是什么？**
   <span class="text-sm opacity-70">（答案：微瑕有机、圆角端点、柔和转角）</span>

3. **色彩使用的金字塔比例是？**
   <span class="text-sm opacity-70">（答案：75% 中性 + 20% 主色 + 5% 点缀）</span>

4. **手形符号的核心语义有哪些？**
   <span class="text-sm opacity-70">（答案：连接、传递、协作、引导）</span>

</v-clicks>

</div>

<!--
Source: 教学设计
-->

---
layout: center
class: text-center
---

# 延伸思考

<div class="text-left mx-auto max-w-2xl">

<v-clicks>

**探讨题**

1. Anthropic 风格与 OpenAI 的冷蓝色调对比，哪个更适合你的产品？为什么？

2. 手绘风格在什么场景下会失效？（提示：小尺寸图标、精确数据展示）

3. 如何在保持温暖感的同时，传达技术严谨性？

**实践题**

用 Prompt 模板生成一个"手 + 代码"的图标，用于技术文档封面

</v-clicks>

</div>

<!--
Source: 教学设计
-->

---
layout: center
class: text-center
---

# 一句话总结

<div class="text-6xl font-bold my-12" style="color: #C77B68">

温暖手绘 × 严谨科技

</div>

<div class="text-xl opacity-80">

用陶土色的手绘线条，
构建有温度的技术美学

</div>

<!--
Source: 核心主张
-->

---
layout: center
class: text-center
---

# 感谢

<div class="opacity-60">

参考来源：Geist design studio, Anthropic brand materials

</div>

<div class="mt-8 text-sm">

扫码获取完整设计资源

<div class="w-32 h-32 mx-auto mt-4 bg-white bg-opacity-10 rounded-lg flex items-center justify-center">
  QR Code
</div>

</div>

<!--
Source: 结束页
-->
