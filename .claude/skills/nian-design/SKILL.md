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

### Step 2: 选场景色并注入

**2a. 三选一：**

| 色 | 氛围 | 适用 |
|----|------|------|
| `olive` `#4A5D3A` | 森林 / 正面 / 增长 | 品牌默认、增长数据 |
| `earth` `#8B7355` | 沙漠 / 工艺 / 温暖 | 材质展示、历史叙事 |
| `glacier` `#2A4A5A` | 冰川 / 技术 / 精确 | 数据报告、技术分析 |

同一页面只用一个场景色。

**2b. 注入方式：** 选定后在 `<style>` 的 `:root` 中注入：

```css
:root {
  --scene: var(--primary-olive);   /* 或 --primary-earth / --scene-glacier */
  --scene-bg: rgba(74, 93, 58, 0.06);
  --scene-border: rgba(74, 93, 58, 0.2);
}
```

场景色通过 `--scene` 统一入口，组件中引用 `var(--scene)` 而非直接用 `--olive`。

### Step 3: 三层金字塔

每个 section 问自己：
- **Answer**: 这个 section 唯一要传达的结论是什么？（Georgia display，一处足矣）
- **Argument**: 什么上下文能支撑这个结论？（Inter body，紧贴 answer）
- **Evidence**: 哪些数据/标签/元数据？（JetBrains Mono，推到边缘）

**检验：** 眯眼看，Answer 是否主导？两个元素等大等距 = 视觉扁平。大胆让 Answer 荒谬地大，Evidence 荒谬地小。对比即层级。

### Step 4: 选视觉形式

**4a. 锚点 → 组件速查（所有组件名与 CSS 精确匹配）**

Hero 级（整页 1 处）：

| 锚点 | 推荐组件 | 所在 CSS |
|------|---------|---------|
| 宣言/立场 | `hero-statement` | dataviz |
| 宣言+视觉 | `hero-split` | components, ext |
| 大数字阵列 | `hero-numeral` | dataviz |
| 深色冲击 | `hero-dark` | dataviz |
| 深色+脉冲 | `hero-pulse` | ext |
| 图片/产品 | `hero-clip` | components |

Section 级（每区 1 处）：

| 锚点 | 推荐组件 | 所在 CSS |
|------|---------|---------|
| 对比/张力 | `tension-grid` | dataviz, components |
| 对比双列 | `comparison` | dataviz |
| 流程对比 | `flow-pipeline` | dataviz |
| 时间线 | `timeline-track` | dataviz |
| 层级/组成 | `layer-stack` | dataviz, ext |
| 不等分网格 | `bento` | dataviz |
| 步骤序列 | `step-sequence` | dataviz |
| 进度轨道 | `level-track` | dataviz |
| 卡片组 | `card-triad` / `card-quad` | dataviz |
| 深色数据矩阵 | `data-matrix` | ext |
| 章节索引 | `chapter-index` | ext |

Detail 级（每区可多处）：

| 用途 | 推荐组件 | 所在 CSS |
|------|---------|---------|
| 单数字+标签 | `stat-block` | dataviz |
| 指标卡 | `metric-card` | components, dataviz |
| KPI+变化量 | `kpi-card` | dataviz |
| 排名条 | `rank-bar` | dataviz |
| 分段条 | `seg-bar` | dataviz |
| 进度条+标签 | `progress-row` | dataviz |
| 堆叠条 | `stacked-bar` | dataviz |
| 子弹图 | `bullet-chart` | dataviz |
| 仪表盘 | `gauge-unit` | dataviz |
| 趋势线 | `sparkline` | dataviz |
| 小多图 | `small-multiples` | dataviz |
| 权重行 | `weight-row` | dataviz |
| 数据表 | `data-table` | dataviz, components |
| 规格表 | `spec-table` | components, ext |
| 内联数据行 | `inline-data-row` | dataviz |
| 提示框 | `callout` | dataviz, components |

品牌场景组件（Economist/FT/Bloomberg/F1/Spotify 等，按需）：见 `references/components-ext.md`

**4b. 节奏检查**

- 相邻区块不得同族（同结构特征 = 同族）
- Hero 级整页仅一处
- 每页恰好一处"打破"

**4c. JS 生成组件**

- **DotGrid/DotMatrix**：可用 `viz-helpers.js` 的 `renderDotMatrix`
- **Voronoi/Phyllotaxis/Hex/Vortex/Moiré/Seismic/Lattice**：需内联 Canvas/SVG 实现，参考 `references/showcase/` 品牌灵感页

### Step 5: 选模板或从零组装

**模板速查：**

| 你要做的 | 推荐模板 | 说明 |
|---------|---------|------|
| 数据报告/排名 | `scenario-data-v3.html` | 统计卡片+排名条+数据表 |
| SOP/操作手册 | `scenario-article.html` | Prose 排版+Checklist+步骤编号 |
| 深度阅读 | `scenario-reading-deep.html` | 最复杂（11 组件），长文沉浸 |
| 品牌/设计展示 | `scenario-brand.html` | Hero+色板+字体展示 |
| 产品展示 | `scenario-product-v3.html` | 左右分栏+规格表+卡片网格 |
| 阅读+分析双场景 | `scenario-brand-read-analyze.html` | 深度阅读+数据矩阵混合 |

模板是起点不是终点。替换内容，保留结构。

### Step 6: 写 HTML + 硬约束检查

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

**常见失败（自查）：**

| 失败 | 正确做法 |
|------|---------|
| Hero h1 用了 72px | 必须 96-120px，确保 8:1 |
| Hero 背景用了 linear-gradient | 用纯色 `var(--scene)` 或 `var(--pk)` |
| 同一页用了 olive 和 glacier | 只用一个场景色 |
| body 字体写了 Helvetica Neue | 必须是 Inter |
| 数据可视化直接上 accent-orange | 先用 opacity 区分，再用 earth-tone 梯度，最后才 accent |
| 所有 section 用了同一种卡片形式 | 必须变化视觉形式，相邻不同族 |

### Step 7: 打破一处 + 验证

整页找一个地方打破规则——一个超大数字、一个圆形元素、一个 org 色标记。只打破一处。超过一处 = 乱。

**验证：** 眯眼看，Answer 层是否主导？等比是否 ≥ 8:1？Org 是否只出现在需要被注意的地方？

---

## 1. 反模式（P0 红线）

- 渐变、阴影、模糊、毛玻璃
- 骨架屏、toast 弹窗、表情
- 深色模式、深浅切换
- 视差、滚动劫持、弹跳缓动
- 斑马纹、填充图标、emoji 做 UI
- accent 做装饰
- 圆角 > 8px（pill 按钮用 999px 除外）
- 跳过 opacity/梯度直接用 accent 区分数据

---

## 2. 参考文件

### CSS

**基础层（任何场景必选）：**

| 文件 | 内容 | 何时加载 |
|------|------|---------|
| `assets/css/haglofs-tokens.css` | 设计令牌（颜色/字体/间距/场景色/缩写变量映射） | 任何场景 |
| `assets/css/haglofs-components.css` | A-G 经典组件（94个，BEM 风格） | 任何场景 |

**扩展层（按需加载，均依赖基础层）：**

| 文件 | 内容 | 何时加载 |
|------|------|---------|
| `assets/css/haglofs-components-ext.css` | 扩展组件总库（H1-H9 Hero + D/N/T/C/F） | 使用扩展组件时必选 |
| `assets/css/haglofs-ext-details.css` | 扩展数据组件（D 系列 + Detail 级） | 需要数据展示时 |
| `assets/css/haglofs-ext-sections.css` | 扩展 Section 组件 | 需要 Section 级布局时 |
| `assets/css/haglofs-ext-decorative.css` | 装饰级组件 | 需要装饰元素时 |
| `assets/css/haglofs-dataviz.css` | 品牌图表系统（4 级视觉形式，`[data-vf]` 属性驱动） | 需要图表/可视化时 |

**场景层（特定应用）：**

| 文件 | 内容 | 何时加载 |
|------|------|---------|
| `assets/css/haglofs-internal-apps.css` | 内部应用（BL/AP/SP/ST） | 内部终端/健康/运动 |
| `assets/css/haglofs-external-apps.css` | 外部应用 | 外部品牌展示 |
| `assets/css/haglofs-brand.css` | 品牌展示页 | 品牌百科页 |
| `assets/css/haglofs-article.css` | 长文排版 | SOP/文章场景 |
| `assets/css/haglofs-dashboard.css` | 仪表盘布局 | 数据仪表盘 |
| `assets/css/haglofs-visual-identity.css` | 视觉识别展示 | 品牌规范页 |
| `assets/css/haglofs-digital-product.css` | 数字产品展示 | 产品页 |

### JS

| 文件 | 内容 | 何时加载 |
|------|------|---------|
| `assets/js/haglofs-viz-helpers.js` | Gauge(5 变体)/Sparkline(5 变体)/DotMatrix | 需要自动生成 SVG 时 |

### 参考文档

- `references/tokens.md` — 字体、颜色、间距、网格、动效（含完整令牌清单）
- `references/design-rules.md` — 设计理念、视觉层级、字体纪律、容器策略、颜色系统（从主文件提取的详细规则）
- `references/components-ext.md` — 扩展组件索引（含选型指南）
- `references/component-scoring.md` — 组件 6 维评分（I/D/F/B/C/N）
- `references/visual-forms.md` — 视觉形式库（Hero/Section/Detail/Decorative 四级完整清单）
- `references/checklist.md` — P0-P3 质量检查

### 模板

见 `templates/` 目录，按 Step 5 速查表选择。

### 展示页

见 `references/showcase/`，按日期+主题命名的设计参考。

---

## 3. Evolution Log

> 记录每次回溯评审发现的调整。核心原则（Step 3 金字塔、Step 4 锚点体系）是价值观，不是参数。

| 日期 | 发现 | 调整 |
|------|------|------|
| 2026-06-01 | SKILL.md 初始化，7 步工作流 | 建档 |
| 2026-06-02 | CSS 引用与实际文件脱节、令牌体系三套分裂、viz-helpers 3 个 bug | 修正 CSS 引用表、tokens.css 补缩写变量映射层、删除 ext-heroes 冗余、修复 viz-helpers |
| 2026-06-02 | 对标 nothing-design：缺场景色注入路径、缺锚点速查表、缺常见失败指引、缺模板速查、设计规则占主文件 40% 无需常驻 | Step 2 加注入方式、Step 4 加速查表、Step 6 加常见失败、Step 5 加模板速查、设计规则提取至 references/ |

---

*SKILL.md 最后更新 2026-06-02 — 流程改造：7步瘦身+场景色注入+锚点速查+常见失败+模板速查+Evolution Log*
