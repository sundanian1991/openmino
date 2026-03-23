# Geist × Anthropic 设计风格完全指南

> 一份深度学习文档，包含色彩系统、构图法则、元素库和可复用 Prompt 模板

---

## 📖 目录

1. [风格 DNA](#风格-dna)
2. [色彩系统](#色彩系统)
3. [线条与手绘规则](#线条与手绘规则)
4. [构图与网格](#构图与网格)
5. [标志性元素库](#标志性元素库)
6. [情感与语义](#情感与语义)
7. [Prompt 模板库](#prompt-模板库)
8. [实战案例](#实战案例)

---

## 风格 DNA

```
┌─────────────────────────────────────────────────────────────┐
│              人文温度 × 技术精度 × 极简克制                     │
│          Human Warmth × Technical Precision                  │
└─────────────────────────────────────────────────────────────┘
```

### 三大核心支柱

| 支柱 | 内涵 | 表现 |
|------|------|------|
| **温暖** | 陶土色传递的质朴感 | Terracotta 主调 + 手形元素 |
| **严谨** | 技术公司的可信度 | 几何网格 + 模块化结构 |
| **克制** | 少即是多的美学 | 充裕留白 + 精简元素 |

### 一句话描述

> **"用温暖的手绘语言，讲述严谨的技术故事"**

---

## 色彩系统

### 主色调：陶土色家族

```
陶土色的象征意义：
├── 陶土：手工、质朴、温暖
├── 红橙：活力、亲和、人性
└── 大地：稳定、可信、根基
```

| 色号 | HEX | HSL | 用途 | 对比度(白底) |
|------|-----|-----|------|-------------|
| **Terracotta Base** | `#E2725B` | 16°, 68%, 62% | 主品牌色、Logo | - |
| **Terracotta Accent** | `#E35336` | 16°, 76%, 55% | 强调色、CTA | 5.56:1 (AA) |
| **Terracotta Deep** | `#CA6641` | 16°, 56%, 52% | 文字、深色填充 | 3.8:1 (大文本) |
| **Terracotta Warm** | `#E76F51` | 16°, 72%, 61% | 替代暖色 | - |

### 辅助色：无障碍支持色

| 色号 | HEX | 对比度 | 用途 |
|------|-----|--------|------|
| **Shade-1** | `#B85143` | ~4.8:1 | 大文本/次要元素 |
| **Shade-2** | `#9C4438` | ~6.3:1 | 正文文本 |
| **Shade-3** | `#7D372D` | ~8.5:1 | 高对比文本/UI状态 |
| **Shade-4** | `#5D2822` | ~11.7:1 | 最高对比需求 |

### 中性色：温暖的基底

| 色号 | HEX | 用途 |
|------|-----|------|
| **Cream / Ivory** | `#F5F1EE` | 主背景 |
| **Warm Grey Light** | `#E8E4E1` | 次背景、卡片 |
| **Warm Grey Mid** | `#C5C1BE` | 边框、分割线 |
| **Warm Grey Dark** | `#8A8683` | 次要文字 |
| **Charcoal** | `#3D2C29` | 主要文字、线条 |

### 点缀色：谨慎使用

| 色号 | HEX | 用途 | 使用原则 |
|------|-----|------|---------|
| **Deep Blue** | `#2C5F7D` | 链接、CTA | 色盲友好对比 |
| **Muted Teal** | `#4A7C8B` | 次要点缀 | 极少使用 |
| **Soft Sage** | `#8BA87A` | 装饰元素 | 自然意象 |

### 色彩使用规则

```
┌─────────────────────────────────────────────────────────────┐
│                     色彩使用金字塔                            │
├─────────────────────────────────────────────────────────────┤
│  顶层点缀色 (5%)   │ Deep Blue / Muted Teal - 链接、CTA      │
├─────────────────────────────────────────────────────────────┤
│  主色陶土 (20%)   │ Terracotta - 填充、强调、图标          │
├─────────────────────────────────────────────────────────────┤
│  中性基底 (75%)   │ Cream / Grey - 背景、文字、边框        │
└─────────────────────────────────────────────────────────────┘
```

### 无障碍对比规则

| 场景 | 最低对比度 | 推荐配色 |
|------|-----------|---------|
| 正文文本 | 4.5:1 | Shade-2/3 on Cream |
| 大文本 | 3:1 | Terracotta Accent on Cream |
| UI 组件 | 3:1 | Shade-3/4 on Light |
| 图形元素 | 3:1 | Deep线条 on 背景 |

---

## 线条与手绘规则

### 线条特征

```
Anthropic 手绘线条 = 有机 + 克制 + 一致
```

| 属性 | 规格 | 说明 |
|------|------|------|
| **线条风格** | 手绘感、微瑕 | 非机械完美，有呼吸感 |
| **线条粗细** | 2-3px (24dp网格) | 保持一致性 |
| **端点** | 圆角 (Round cap) | 柔和、亲和 |
| **转角** | 圆滑过渡 (Round join) | 避免锐角 |
| **颜色** | Charcoal #3D2C29 | 或 Terracotta Deep |

### 手绘 vs 机械

```
机械线条                    手绘线条
├── 完美直线              ├── 微微波动
├── 统一粗细              ├── 有机变化
├── 锐利转角              ├── 柔和过渡
└── 冷感、精确            └── 温暖、人性
```

### 可接受/不可接受

| ✅ 可接受 | ❌ 不可接受 |
|----------|-----------|
| 插画线条 | 核心 UI 图标（需严格测试） |
| 装饰元素 | 小尺寸图标（<16px） |
| 背景图案 | 导航图标（除非全套手绘） |
| 头像框架 | 需要精确传达的符号 |

### 线条应用场景

```
┌─────────────────────────────────────────────────────────────┐
│                     线条应用层级                             │
├─────────────────────────────────────────────────────────────┤
│  装饰层          │ 背景纹理、分割线、边框装饰             │
├─────────────────────────────────────────────────────────────┤
│  表达层          │ 表情、姿态、手势、自然元素             │
├─────────────────────────────────────────────────────────────┤
│  结构层          │ 几何形状、网格、容器（谨慎手绘）       │
└─────────────────────────────────────────────────────────────┘
```

---

## 构图与网格

### 5×5 方格矩阵系统

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

Anthropic 图标集标准布局
```

### 网格规格

| 设备 | 列数 | 间距 | 边距 | 最大宽度 |
|------|------|------|------|---------|
| Desktop | 12列 | 24px | 24px | 1440px |
| Tablet | 8列 | 16px | 16px | 768px |
| Mobile | 4列 | 12px | 16px | 390px |

### 间距 Token（基于 4px 单元）

```css
space.1  = 4px   /* 微小间距 */
space.2  = 8px   /* 紧凑间距 */
space.3  = 12px  /* 小间距 */
space.4  = 16px  /* 默认间距 */
space.6  = 24px  /* 中等间距 */
space.8  = 32px  /* 大间距 */
space.10 = 40px  /* 超大间距 */
space.12 = 48px  /* 页面级间距 */
```

### 留白原则

```
┌─────────────────────────────────────────────────────────────┐
│                     留白 > 40%                               │
│                                                             │
│    ┌─────────┐                                              │
│    │         │  ← 元素周围至少有 space.8 以上的呼吸空间     │
│    └─────────┘                                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

| 区域 | 留白比例 | 说明 |
|------|---------|------|
| 页面边距 | >10% | 内容区域占比 |
| 元素间距 | >空间 | 元素与元素之间 |
| 内边距 | space.4-8 | 容器内部 |

---

## 标志性元素库

### 1. 手形符号系统

手形是 Anthropic 设计的核心，象征**连接、传递、协作、引导**

```
┌─────────────────────────────────────────────────────────────┐
│                     手形语义地图                             │
├─────────────────────────────────────────────────────────────┤
│  🖐️ 张开的手    │ 欢迎、开放、提供                           │
│  👆 指向         │ 引导、指示、强调                           │
│  ✊ 握拳         │ 力量、确定、持有                           │
│  🤲 托举         │ 支持、承载、奉献                           │
│  👏 拍手         │ 认可、庆祝、协作                           │
│  ✍️ 书写         │ 创作、表达、记录                           │
│  🙏 合十         │ 感谢、尊重、请求                           │
└─────────────────────────────────────────────────────────────┘
```

### 2. 手 + 物品组合

```
手 × [物品] = [语义]

手 + 书籍 = 知识传递
手 + 地球 = 全球协作
手 + 代码 = 技术创作
手 + 植物 = 成长培育
手 + 工具 = 能力赋能
```

### 3. 自然意象

| 元素 | 象征 | 应用 |
|------|------|------|
| **蝴蝶** | 蜕变、进化 | 研究、成长主题 |
| **山脉** | 稳定、高度 | 目标、成就主题 |
| **蜂巢** | 协作、结构 | 团队、系统主题 |
| **水流** | 流动、适应 | 过程、变化主题 |
| **树木** | 生长、根基 | 发展、基础主题 |

### 4. 技术符号（简约化）

```
原始符号        │  Anthropic 化
───────────────┼───────────────────
</> 代码       │  简化为轮廓线条
🌐 地球        │  几何化 + 陶土填充
📊 图表        │  手绘风格数据线
🔗 链接        │  柔和曲线连接
```

---

## 情感与语义

### 色彩心理学

```
陶土色 = 温暖 + 质朴 + 安全

当你使用陶土色时，你在传递：
├── "我们是可亲近的"
├── "我们重视手工细节"
├── "我们有扎实根基"
└── "我们不只是冰冷的科技"
```

### 设计 vs 竞品对比

| 品牌 | 主色调 | 感觉 | Anthropic 差异化 |
|------|--------|------|-----------------|
| OpenAI | 冷蓝/白 | 精英、科技感 | 陶土 = 更温暖 |
| ChatGPT | 绿/黑 | 实用、功能 | 留白 = 更克制 |
| Claude | **陶土/米白** | **温暖、可信** | **独特定位** |

### 语调映射

| 语调 | 视觉表达 |
|------|---------|
| 严谨 | 网格对齐、模块化结构 |
| 温暖 | 陶土色、手形、柔和曲线 |
| 现代 | 极简、留白、几何元素 |
| 人文 | 手绘感、自然意象、故事性 |

---

## Prompt 模板库

### 基础模板结构

```
[风格前缀] + [主体描述] + [色彩指令] + [风格修饰] + [技术指令]
```

### 1. 通用风格前缀

```
A minimalist design in Anthropic/Geist style, featuring
```

### 2. 主体描述模板

| 类别 | Prompt 片段 |
|------|------------|
| **人像** | `a human face outline with clean hand-drawn lines` |
| **图标** | `a simple icon on a 5×5 grid, featuring [元素]` |
| **插画** | `an illustration showing [场景], flat vector style` |
| **抽象** | `an abstract geometric pattern with organic touches` |

### 3. 色彩指令（复制即用）

```
# 完整色彩板
Colors: terracotta #C77B68, cream background #F5F1EE, charcoal lines #3D2C29

# 简化版
Terracotta and cream color palette with black line art

# 无障碍版
High contrast: deep terracotta #9C4438 on warm ivory #F5F1EE
```

### 4. 风格修饰词

```
# 必选
- hand-drawn style
- minimalist line art
- soft organic curves
- rounded line endings

# 可选增强
- warm and approachable aesthetic
- ample negative space
- simple yet expressive
- geometric grid layout
- flat design, vector art style
```

### 5. 完整 Prompt 示例

#### 示例 A：人头像线稿

```
A minimalist portrait line art in Anthropic design style, featuring a human face outline with clean hand-drawn black lines on warm cream background #F5F1EE, filled with terracotta color #C77B68 in selected areas like hair or clothing, soft organic curves, rounded line endings, warm and approachable aesthetic, ample negative space, simple yet expressive, flat vector art style
```

#### 示例 B：手 + 书籍图标

```
A simple icon on a 5×5 grid in Anthropic style, featuring a hand holding a book, minimalist line art with terracotta #C77B68 fill on cream background #F5F1EE, hand-drawn black lines, soft organic curves, rounded line endings, warm and approachable, flat vector style
```

#### 示例 C：抽象图案

```
An abstract geometric pattern in Anthropic design style, featuring network nodes and organic connections, terracotta and cream color palette with charcoal lines, minimalist hand-drawn aesthetic, soft curves, ample negative space, modern yet warm, flat vector art
```

#### 示例 D：自然意象（蝴蝶）

```
A minimalist butterfly illustration in Anthropic style, hand-drawn line art with terracotta fill on warm cream background, soft organic curves, rounded line endings, symbolizing transformation and growth, ample negative space, simple yet expressive, flat vector style
```

### 6. 快速调用模板

```
# 把这个保存到你的备忘录，每次改 [主题] 即可

A minimalist [主题] in Anthropic design style,
featuring hand-drawn line art with terracotta #C77B68
on warm cream background #F5F1EE, charcoal lines #3D2C29,
soft organic curves, rounded line endings,
ample negative space, warm and approachable,
flat vector art style
```

---

## 实战案例

### 案例 1：写作主题图标

```
需求：手 + 笔记本电脑

Prompt:
A simple icon in Anthropic style on a 5×5 grid,
featuring a hand typing on a laptop,
minimalist line art, terracotta #C77B68 fill on cream #F5F1EE,
hand-drawn black lines, soft organic curves,
rounded line endings, warm approachable aesthetic,
flat vector style
```

### 案例 2：音乐主题插画

```
需求：抽象音乐元素 + 手形

Prompt:
A minimalist music illustration in Anthropic design style,
featuring abstract musical notes and hand gestures,
hand-drawn line art with terracotta accents on warm cream background,
soft organic curves, flowing movement,
rounded line endings, warm and approachable,
ample negative space, simple yet expressive,
flat vector art style
```

### 案例 3：学习/成长主题

```
需求：植物 + 书籍 + 手

Prompt:
A minimalist illustration in Anthropic style,
featuring a hand watering a plant growing from a book,
symbolizing learning and growth,
hand-drawn line art with terracotta #C77B68 on cream #F5F1EE,
soft organic curves, rounded line endings,
warm and approachable aesthetic,
ample negative space, flat vector style
```

---

## 快速参考卡

### 一句话风格描述

> **"陶土色手绘线稿，温暖克制，人文科技感"**

### 三原色

```
Terracotta: #C77B68
Cream:      #F5F1EE
Charcoal:   #3D2C29
```

### 三个关键词

```
手绘
温暖
极简
```

### 通用 Prompt 结构

```
A minimalist [主题] in Anthropic/Geist style,
hand-drawn line art, terracotta on cream background,
soft organic curves, rounded line endings,
ample negative space, warm and approachable,
flat vector art style
```

---

## 附录：设计检查清单

在使用这个风格时，确认以下各项：

- [ ] 主色使用 Terracotta (#C77B68 或其变体)
- [ ] 背景使用 Cream/Ivory (#F5F1EE)
- [ ] 线条颜色为 Charcoal (#3D2C29) 或 Terracotta Deep
- [ ] 线条端点为圆角 (Round cap)
- [ ] 有足够留白（>40%）
- [ ] 元素对齐到网格（如适用）
- [ ] 手绘感但不失严谨
- [ ] 整体感觉温暖、可信、克制

---

*文档版本：v1.0*
*创建日期：2026-03-06*
*参考来源：Geist design studio, Anthropic brand materials, accessible palette standards*

