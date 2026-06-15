# Storyboard — 年 UI 演示：什么是电影 UI

## Site Cinematic Grammar
- **Shell logic**: 宽幅横贯（panoramic slab），每个 section 像一个电影"帧"
- **Navigation posture**: 无传统导航，靠 scroll 推进叙事
- **Framing rules**: 不对称构图偏左锚定，右侧用装饰元素平衡
- **Density cadence**: 密集（Hero）→ 宽松（能力网格）→ 密集（流程解释）→ 呼吸（为什么重要）→ 最密（年 UI 介绍）→ 宽松（结尾）
- **Recurring materials**: glacier 色装饰线、点阵点缀、ghost 大字序号
- **Composition family**: Panoramic slab + asymmetric split

## Director Brief（年 UI 修订版）
由于本页面介绍的是电影 UI 方法论本身，导演概念退后——"导演"就是这套方法论：

- **Visual thesis**: "一段流程在眼前展开"的感觉——每个 section 像翻过一页剧本
- **3 signature techniques**:
  1. 宽幅构图 + 左侧锚点文字 + 右侧几何装饰
  2. Section 编号以 ghost 大字显示（opacity: 0.04）
  3. 渐变节奏：密集段落（3-4 个组件）后跟稀疏段落（1-2 个组件）
- **Color tokens**: nian glacier 体系
- **Typography**: Playfair Display 300 / Inter 400 / JetBrains Mono 500
- **Motion rules**: 入场使用 Steadicam Float-In 和 Curtain Wipe，缓动 ease-out

## 三层金字塔
- **Answer**: 每屏一个核心结论（Playfair Display 96-120px）
- **Argument**: 支撑上下文（Inter 16px）
- **Evidence**: 元数据/编号（JetBrains Mono 11px ALL CAPS）

## Page Inventory
单页滚动，6 个 section：

| # | Section | 叙事节拍 | Section 功能 | 结构特征族 | 入口 |
|---|---------|----------|-------------|-----------|------|
| 1 | Hero | B2 Establishing Shot | Hero #2 Atmosphere Bath + Data Punch | 全景声明 + 浮动指标 | Dolly-In |
| 2 | 电影 UI 能做什么 | B8 Evidence Wall | Article Grid (capability cards) + Stats | 方块网格 | Curtain Wipe |
| 3 | 4-Phase 工作流 | B11 The Tutorial | Process/Steps | 时间线/编号步骤 | Steadicam Float-In |
| 4 | 为什么重要 | B16 The Authority + B19 Quiet Moment | Quote + Stats | 宣言+数据混合 | Fade from Black |
| 5 | 年 UI：混合继承 | B14 The Pivot | Featured Article + Comparison | 双栏对照 | Split Diopter Open |
| 6 | 结尾 | B22 The Farewell | Footer | 极简结尾 | Crane Down |

## Hero Archetype
- Type: **Statement Hero**（#25 Question Hook 的变体——不提问，宣布存在）
- Pattern: Centered with decorative elements
- Visual elements: Ghost 大字序列号（"01"）、场景色装饰线、点阵装饰

## Hero Dominance Statement
Hero 用 Film UI 的方法论来"上演"自身——大字 `--display-2xl` 宣告存在，浮动指标展示成就能做什么，冰川色装饰线暗示精确和结构。没有渐变，没有阴影——纯粹的比例和对比。

## Restraint Statement
不做 SaaS Hero（无 mockup/截图），不做数据面板（无图表），不做品牌宣言（无 logo/标语堆砌）。每个元素只有一个目的：让读者理解"电影 UI 是什么"。

## Scene Color Selection
**Glacier** — 精确、结构、距离感。这篇介绍需要读者专注于方法论本身，冰川色的冷峻提供了这种聚焦所需的"理性框架"。

## Entrance Map
| Section | Entrance | Duration | Note |
|---------|----------|:--------:|------|
| Hero | Dolly-In (scale 0.85→1 + opacity 0→1) | 1.4s | 建立镜头，缓慢推进 |
| 能力网格 | Curtain Wipe (clip-path inset) | 1.0s | 幕帘拉开，展示全景 |
| 工作流 | Steadicam Float-In | 2.0s | 稳定器浮入，沉浸感 |
| 为什么重要 | Fade from Black (opacity 0→1) | 2.0s | 黑色淡入，强调时刻 |
| 年 UI | Split Diopter Open | 1.2s | 分屏展开，揭示转变 |
| 结尾 | Crane Down (translateY) | 1.8s | 摇臂下降，平稳结束 |
