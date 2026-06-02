---
name: nian-design
description: |
nian-design — 通用品牌设计系统。自然色系（olive/earth/glacier）、字体系统（Georgia/Inter/JetBrains Mono）、点阵视觉、场景色板旋转、45+ 组件。
用于生成符合品牌调性的 HTML 界面。
MANDATORY TRIGGERS: 'nian-design', 'nian design', '品牌设计系统', 'nian'.
STRONG TRIGGERS: '自然色系', '品牌视觉规范', 'HTML 界面设计', '设计系统'.
---

# nian-design

> 通用品牌设计系统。自然色系 + 工业精度。

---

## 0. 工作流（每次开始前执行，不可跳过）

### Step 1: 声明字体
加载 Google Fonts（见 `references/tokens.md` 第 1 节）。不要假设字体已可用。

```
Inter: 300,400,500,600,700
JetBrains Mono: 400,500,600
Georgia 是系统字体，不需加载。
```

### Step 2: 选场景色（三选一）

| 色 | 氛围 | 适用 |
|----|------|------|
| `olive` `#4A5D3A` | 森林 / 正面 / 增长 | 品牌默认、增长数据 |
| `earth` `#8B7355` | 沙漠 / 工艺 / 温暖 | 材质展示、历史叙事 |
| `glacier` `#2A4A5A` | 冰川 / 技术 / 精确 | 数据报告、技术分析 |

同一页面只用一个场景色。

### Step 3: 三层金字塔

每个 section 问自己：
- **Answer**: 这个 section 唯一要传达的结论是什么？（Georgia display，一处足矣）
- **Argument**: 什么上下文能支撑这个结论？（Inter body，紧贴 answer）
- **Evidence**: 哪些数据/标签/元数据？（JetBrains Mono，推到边缘）

检验：眯眼看，Answer 是否主导？

### Step 4: 选视觉形式

每个 section 过一遍：

**4a. 判定锚点类型**

| 锚点 | 识别信号 |
|------|---------|
| 宣言 | 一句话结论、立场、判断 |
| 数据矩阵 | 2-4 个硬数据同时亮相 |
| 对比/张力 | 两股对立力量、旧 vs 新 |
| 时间线 | 有先后顺序的内容 |
| 结构/体系 | 层级、组成、方法论 |
| 进度/仪表 | 达成率、健康度、对标 |
| 图像 | 视觉主体是图而非字 |

**4b. 按锚点选形式**

Hero 级（整页 1 处）→ 见 `references/visual-forms.md` 选择指引
Section 级（每区 1 处）→ 同上
Detail 级（每区可多处）→ 从轻到重：Stat Block → Segmented Bar → Sparkline → Bullet/Gauge → Data Table

**4c. 检查节奏**

- 相邻区块不得同族（同结构特征 = 同族）
- Hero 级整页仅一处
- 地形/极坐标/投影组件不得连续
- 每页恰好一处"打破"

**4d. 标记 JS 生成组件**

以下组件需要 `<script>` 内联生成，在 HTML 末尾统一放置，不分散：
- **DotGrid/DotMatrix**：可用 `viz-helpers.js` 的 `renderDotMatrix`，也可内联 SVG
- **Voronoi / Phyllotaxis / Hex / Vortex / Moiré / Seismic / Lattice**：目前无 JS 辅助函数，需要时在 `<script>` 中内联 Canvas/SVG 代码实现

参考 `references/showcase/` 中的品牌灵感页获取这些视觉效果的实现样例。

### Step 5: 定间距节奏

```
Tight (4-8px)   = 同组元素（标签+值）
Medium (16px)    = 同组不同项（列表项）
Wide (32-48px)   = 新组开始（section 内分隔）
Vast (64-96px)   = 新上下文（hero 到内容）
```

先靠间距分组，不行再加分隔线，最后才用卡片背景。如果用分割线——间距可能选错了。

### Step 5: 写 HTML

**硬约束（完成后逐条检查）：**

| # | 规则 | 检查方式 |
|---|------|---------|
| 1 | **3 字体**：Georgia=展示 / Inter=正文 / JetBrains Mono=数据。永不混用角色。 | grep font-family |
| 2 | **3 字号**：一大、一中、一小。不要第四种。 | grep font-size |
| 3 | **2 字重**：Regular + 一个其他（Bold/Medium）。 | grep font-weight |
| 4 | **8:1 比值**：Hero 字号 ÷ 正文字号 ≥ 8。用 96-120px / 12-14px 实现。 | 计算 |
| 5 | **禁止项**：渐变 / 阴影 / 模糊 / 毛玻璃 / emoji / 填充图标 / 深色模式 | grep |
| 6 | **org 仅用于功能信号**：不做装饰，不用于标题、分割线、背景。 | 目测 |
| 7 | **accent-yellow 稀有使用**：一年用不了几次。 | 目测 |
| 8 | **颜色用在值上**：不在标签行或背景上着色。 | 目测 |

### Step 6: 打破一处

整页找一个地方打破规则——一个超大数字、一个圆形元素、一个 org 色标记。只打破一处。超过一处=乱。

### Step 7: 打开浏览器验证

眯眼看，Answer 层是否主导？等比是否 ≥ 8:1？Org 是否只出现在需要被注意的地方？

---

## 1. 设计理念

### 1.1 品牌基因

- **与自然共生，而非征服。** 设计服务于人与环境的关系。
- **长期主义即美学。** 为持久而设计，不为潮流。
- **两种传统共存。** 111 年传承 + 当代工业设计。张力即品牌。
- **功能温暖。** 技术精确但不冰冷。自然是参照，不是工厂。

### 1.2 视觉语言

- **自然即色板。** 低饱和 earth tone 承载品牌，高饱和 accent 承载功能。
- **结构即故事。** 三层金字塔既用于视觉层级，也用于文案。
- **单一模式，无限场景。** 固定浅色模式（`#FAFAF8`）。无深浅切换。场景通过色板旋转实现。

### 1.3 核心张力

| 张力对 | 表现 |
|--------|------|
| Nature vs Tech | 自然色系 + 工业精度 |
| Heritage vs Future | 111年传承 + 当代设计 |
| Organic vs Engineered | 流体形态 + 机械结构 |
| Warmth vs Precision | 功能温暖 + 技术精确 |

---

## 2. 设计规则

### 2.1 视觉层级

每页三层，不多不少：

| 层级 | 内容 | 实现 |
|------|------|------|
| **Answer** | 唯一结论。品牌宣言、核心指标。 | Georgia display。`--text-display`。Hero 用 96-120px。 |
| **Argument** | 支撑上下文。功能、规格、描述。 | Inter body。`--text-primary`。紧贴 Answer（8-16px）。 |
| **Evidence** | 元数据、技术参数、材质规格。 | JetBrains Mono label。`--text-secondary` 以下。推到边缘。 |

### 2.2 字体纪律

每页最多：3 字体、3 字号、2 字重。

| 决策 | 改字号 | 改字重 | 改颜色 |
|------|:---:|:---:|:---:|
| 品牌宣言 vs 产品名 | Yes | No | No |
| 标签 vs 值 | No | No | Yes |
| 标题 vs 描述 | Yes | No | No |
| Hero vs 次要 | Yes | Optional | No |

经验法则：想改字号？可能是间距问题。用距离代替。

**LED Card 模式**：数据密集页用 JetBrains Mono 48-64px 替代 Georgia。超大数字 + 小标签 + 上下文行。

### 2.3 间距

参见 Step 4。

### 2.4 容器策略

1. 仅间距（邻近性分组）
2. earth-tone 细分割线
3. `--scene-rock` 边框
4. `--surface` 背景卡片

每一步增加视觉权重。用最轻的工具。Answer 层永远不要框住。

### 2.5 颜色系统

**品牌层级（灰度——主要层级工具）：**

```
--text-display (#2C2C2C, 100%) → 品牌宣言。Hero。每节一个。
--text-primary (#1A1A1A, 90%)  → 正文，功能描述。
--text-secondary (#6B6B6B, 60%) → 标签，说明，规格。
--text-disabled (#A0A0A0, 40%) → 时间戳，次要元数据。
```

**场景色：** olive / earth / glacier 三选一，同页只用其一。
**accent-orange (#E55B2B)：** 仅用于功能警示。不做装饰。
**accent-yellow (#FFD100)：** 稀有使用。一年用不了几次。

**数据可视化颜色顺序：**

1. opacity（100%/60%/30%）——最轻的区分
2. earth-tone 梯度（olive → earth → glacier）——同色系深浅
3. 最后 accent 色——仅用于需要关注的数据点

永远不跳过前两步直接用 accent。

### 2.6 打破规则

整页恰好一处打破。一处打破 IS the design。零打破 = 单调。多处打破 = 混乱。

### 2.7 构图

不对称 > 对称。偏好：左大右小 / 上重下轻 / 边缘锚定。

---

## 3. 反模式（P0 红线）

- 渐变、阴影、模糊、毛玻璃
- 骨架屏、toast 弹窗、表情
- 深色模式、深浅切换
- 视差、滚动劫持、弹跳缓动
- 斑马纹、填充图标、emoji 做 UI
- accent 做装饰
- 圆角 > 8px（pill 按钮用 999px 除外）
- 跳过 opacity/梯度直接用 accent 区分数据

---

## 4. 参考文件

### CSS

**基础层（任何场景必选）：**

| 文件 | 内容 | 何时加载 |
|------|------|---------|
| `assets/css/haglofs-tokens.css` | 设计令牌（颜色/字体/间距/场景色） | 任何场景 |
| `assets/css/haglofs-components.css` | A-G 经典组件（94个，BEM 风格） | 任何场景 |

**扩展层（按需加载，均依赖基础层）：**

| 文件 | 内容 | 何时加载 |
|------|------|---------|
| `assets/css/haglofs-components-ext.css` | 扩展组件总库（H/D/N/T/C/F 编号体系，含缩写变量定义） | 使用扩展组件时必选 |
| `assets/css/haglofs-ext-heroes.css` | 扩展 Hero（H1-H9） | 需要 Hero 时 |
| `assets/css/haglofs-ext-details.css` | 扩展数据组件（D 系列 + Detail 级） | 需要数据展示时 |
| `assets/css/haglofs-ext-sections.css` | 扩展 Section 组件 | 需要 Section 级布局时 |
| `assets/css/haglofs-ext-decorative.css` | 装饰级组件 | 需要装饰元素时 |
| `assets/css/haglofs-dataviz.css` | 品牌图表系统（4 级视觉形式，`[data-vf]` 属性驱动） | 需要图表/可视化时 |

**场景层（特定应用）：**

| 文件 | 内容 | 何时加载 |
|------|------|---------|
| `assets/css/haglofs-internal-apps.css` | 内部应用（BL/AP/SP/ST） | 内部终端/健康/运动 |
| `assets/css/haglofs-external-apps.css` | 外部应用 | 外部品牌展示 |
| `assets/css/haglofs-brand.css` | 品牌展示页（独立令牌体系） | 品牌百科页 |
| `assets/css/haglofs-article.css` | 长文排版 | SOP/文章场景 |
| `assets/css/haglofs-dashboard.css` | 仪表盘布局 | 数据仪表盘 |
| `assets/css/haglofs-visual-identity.css` | 视觉识别展示 | 品牌规范页 |
| `assets/css/haglofs-digital-product.css` | 数字产品展示 | 产品页 |

**注意**：`opencode-brand.css` 是独立体系（scoped 在 `.opencode-root`），不影响主令牌。

### JS

| 文件 | 内容 | 何时加载 |
|------|------|---------|
| `assets/js/haglofs-viz-helpers.js` | Gauge(4 变体)/Sparkline(4 变体)/DotMatrix 渲染 | 需要自动生成 SVG 时 |

### 参考文档

- `references/tokens.md` — 字体、颜色、间距、网格、动效
- `references/components-ext.md` — 扩展组件索引（含选型指南）
- `references/component-scoring.md` — 组件 6 维评分（I/D/F/B/C/N）
- `references/visual-forms.md` — 视觉形式库（Hero/Section/Detail/Decorative 四级）
- `references/checklist.md` — P0-P3 质量检查

### 模板

见 `templates/` 目录，按场景选择。

### 展示页

见 `references/showcase/`，按日期+主题命名的设计参考。

---

*SKILL.md 最后更新 2026-06-01 — 工作流重写为可操作 7 步，与 nothing-design 对齐*
