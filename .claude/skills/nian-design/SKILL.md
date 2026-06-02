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

### Step 1: 需求澄清

开始前确认 5 项：

| 项 | 问什么 | 为什么 |
|----|--------|--------|
| 类型 | 教程/介绍/科普？活动页/Landing？数据报告？ | 决定组件层级和节奏 |
| 受众 | 技术水平？行业背景？ | 决定文案密度和术语深度 |
| Section 数 | 预计几个区块？ | 决定节奏规划 |
| 素材 | 有文案/图片/数据吗？ | 决定锚点类型 |
| 硬约束 | 品牌色？必须包含的元素？ | 缩小选择空间 |

单页场景或年老师给了完整素材 → 跳过，直接进 Step 2。

### Step 2: 读规范

开始任何设计工作之前，先读取以下文件，确保所有决策在完整约束下做出：

1. **必读** `brand-dna.md` — 品牌基因、色彩系统、字体基因、气质关键词、Craft Rules（三层金字塔、8:1 工业冲击力、字体三工、打破规则等）
2. **必读** `references/tokens.md` — Token 精确值体系（字体/颜色/间距/圆角/深度/motion）

所有后续步骤（场景色选择、锚点判定、组件选择）都基于这两个文件的约束。

### Step 3: 声明字体

加载 Google Fonts（见 `references/tokens.md` 第 1 节）。不要假设字体已可用。

```
Inter: 300,400,500,600,700
JetBrains Mono: 400,500,600
Georgia 是系统字体，不需加载。
```

### Step 4: 选场景色并注入

**4a. 三选一：**

| 色 | 氛围 | 适用 |
|----|------|------|
| `olive` `#4A5D3A` | 森林 / 正面 / 增长 | 品牌默认、增长数据 |
| `earth` `#8B7355` | 沙漠 / 工艺 / 温暖 | 材质展示、历史叙事 |
| `glacier` `#2A4A5A` | 冰川 / 技术 / 精确 | 数据报告、技术分析 |

同一页面只用一个场景色。

**4b. 注入方式：** 选定后在 `<style>` 的 `:root` 中注入：

```css
:root {
  --scene: var(--brand-olive);   /* 或 --brand-earth / --scene-glacier */
  --scene-bg: rgba(74, 93, 58, 0.06);
  --scene-border: rgba(74, 93, 58, 0.2);
}
```

场景色通过 `--scene` 统一入口，组件中引用 `var(--scene)` 而非直接用 `--olive`。

### Step 5: 三层金字塔

每个 section 问自己：
- **Answer**: 这个 section 唯一要传达的结论是什么？（Georgia display，一处足矣）
- **Argument**: 什么上下文能支撑这个结论？（Inter body，紧贴 answer）
- **Evidence**: 哪些数据/标签/元数据？（JetBrains Mono，推到边缘）

**检验：** 眯眼看，Answer 是否主导？两个元素等大等距 = 视觉扁平。大胆让 Answer 荒谬地大，Evidence 荒谬地小。对比即层级。

### Step 6: 判定锚点类型

根据内容判断锚点，决定组件方向：

| 锚点 | 识别信号 | Hero 级 | Section 级 | Detail 级 |
|------|---------|---------|-----------|----------|
| 宣言 | 一句话结论 | `hero-split` `hero-statement` | `brand-statement` | — |
| 数据矩阵 | 2-4 个硬数据 | `hero-numeral` | `data-matrix` `numeral-grid` | `stat-block` `metric-card` |
| 对比/张力 | 两股对立 | `hero-split` | `tension-grid` | `comparison` |
| 时间线 | 有先后顺序 | — | `timeline-track` `level-track` | `step-number` |
| 结构/体系 | 层级/组成 | — | `layer-stack` `bento` | `spec-table` |
| 进度/仪表 | 达成率/健康度 | — | `progress-section` | `gauge-unit` `seg-bar` `sparkline` |
| 图像 | 视觉主体是图 | `hero-clip` | `image-grid` | — |

更多组件（`rank-bar` `stacked-bar` `bullet-chart` `kpi-card` `data-table` 等）见 `references/visual-forms.md`。
品牌场景组件（Economist/FT/Bloomberg 等）见 `references/components-ext.md`。

### Step 7: 选视觉形式 + 节奏检查

按 Step 6 的锚点查 `references/visual-forms.md` 选具体组件。同结构特征下的组件互为"同族"。

**节奏规则：**

- 相邻区块不得同族（同结构特征 = 同族）
- Hero 级整页仅一处
- 每页恰好一处"打破"

**JS 生成组件：**

- **DotGrid/DotMatrix**：可用 `viz-helpers.js` 的 `renderDotMatrix`
- **Voronoi/Phyllotaxis/Hex/Vortex/Moiré/Seismic/Lattice**：需内联 Canvas/SVG 实现，参考 `references/showcase/` 品牌灵感页

### Step 8: 查 tokens 精确值

写代码前查阅 `references/tokens.md` 确认：
- 字号 Token 与对应 px 值（确保 8:1 工业冲击力）
- 颜色 Token（品牌色/场景色/accent/status）
- 字体角色规则（Georgia/Inter/JetBrains Mono 三工）
- 间距/圆角/网格精确值

不要在 HTML 中硬编码未经令牌映射的值。

### Step 9: 选模板起步 → 展开内容

**原则**：有对应场景的，模板是质量下限，不得从零裸写。基于模板，不局限模板。

**模板速查：**

| 你要做的 | 主模板 | 参考补充 | 说明 |
|---------|--------|---------|------|
| 数据报告/排名 | `scenario-data-v3.html` | `data-report.html` | 统计卡片+排名条+数据表；data-report 有图表网格+洞察卡 |
| SOP/操作手册 | `scenario-article.html` | — | Prose 排版+Checklist+步骤编号 |
| 深度阅读/学习笔记 | `scenario-reading-deep.html` | — | 最复杂（11 组件），长文沉浸；对标 token 系统 |
| 品牌/设计展示 | `scenario-brand.html` | — | Hero+色板+字体展示 |
| 产品展示 | `scenario-product-v3.html` | — | 左右分栏+规格表+卡片网格+价格 |
| 阅读+分析双场景 | `scenario-brand-read-analyze.html` | — | 深度阅读+数据矩阵混合 |
| 工作报告 | `work-report.html` | — | 指标卡片+时间线+下一步计划 |
| 知识库 | `knowledge-management.html` | — | 分类卡片+文章列表+标签系统 |

**展开方式：**

1. 替换内容，保留结构
2. 需要额外模块 → 从其他模板的组件区（有 `component-label` 标记）复制对应 HTML+CSS
3. 需要自定义布局 → 参照 `scenario-reading-deep.html` 的 token 系统（最完整）对齐 CSS

> 废弃模板（质量被覆盖）已移至 `templates/_deprecated/`，不再使用。

### Step 10: 写 HTML + 硬约束检查

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

### Step 11: 自检

对照 `references/checklist.md` 逐条检查：
- **P0 红线必须全过** — 任何一条不通过则修改
- P1 必查 — 尽量满足
- P2 推荐 — 锦上添花

### Step 12: 打破一处 + 验证

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

**不再加载外部 CSS 文件。** 采用内联方式：

1. **Tokens 内联**：将 `references/tokens.md` 中的设计令牌（颜色/字体/间距/圆角/场景色）以 `--token-name` 形式写入 HTML 的 `:root` 选择器
2. **组件代码按需复制**：从 `references/components.md`（或 `references/components-ext.md`）中按需复制组件 CSS 到 HTML 的 `<style>` 块中
3. **场景色注入**：在 `:root` 中声明 `--scene` / `--scene-bg` / `--scene-border`（见 Step 4）
4. **可视化/点阵辅助**：如需 DotGrid/DotMatrix/Gauge/Sparkline，从 `references/viz-helpers.js` 中复制对应函数内联

### JS

| 文件 | 内容 | 何时加载 |
|------|------|---------|
| `assets/js/nian-viz-helpers.js` | Gauge(5 变体)/Sparkline(5 变体)/DotMatrix | 需要自动生成 SVG 时 |

### 参考文档

- `brand-dna.md` — 品牌基因、色彩系统、字体基因、气质关键词、Craft Rules（技能根目录）
- `references/tokens.md` — 字体、颜色、间距、网格、动效（含完整令牌清单）
- `references/design-rules.md` — 设计理念、视觉层级、字体纪律、容器策略、颜色系统（从主文件提取的详细规则）
- `references/components-ext.md` — 扩展组件索引（含选型指南）
- `references/component-scoring.md` — 组件 6 维评分（I/D/F/B/C/N）
- `references/visual-forms.md` — 视觉形式库（Hero/Section/Detail/Decorative 四级完整清单）
- `references/checklist.md` — P0-P3 质量检查

### 模板

见 `templates/` 目录，按 Step 9 速查表选择。

### 展示页

见 `references/showcase/`，按日期+主题命名的设计参考。

---

## 3. Evolution Log

> 记录每次回溯评审发现的调整。核心原则（三层金字塔、锚点体系）是价值观，不是参数。

| 日期 | 发现 | 调整 |
|------|------|------|
| 2026-06-01 | SKILL.md 初始化，7 步工作流 | 建档 |
| 2026-06-02 | CSS 引用与实际文件脱节、令牌体系三套分裂、viz-helpers 3 个 bug | 修正 CSS 引用表、tokens.css 补缩写变量映射层、删除 ext-heroes 冗余、修复 viz-helpers |
| 2026-06-02 | 对标 nothing-design：缺场景色注入路径、缺锚点速查表、缺常见失败指引、缺模板速查、设计规则占主文件 40% 无需常驻 | Step 2 加注入方式、Step 4 加速查表、Step 6 加常见失败、Step 5 加模板速查、设计规则提取至 references/ |
| 2026-06-02 | 步骤过载：Step 4 包含判锚点+选组件+节奏检查+JS生成四件事；缺需求澄清步骤；缺自检步骤；CSS 依赖外部文件不符内联约定 | Step 1 加入需求澄清（4问）、Step 4 拆为 Step 5 判锚点 + Step 6 选视觉形式 + Step 7 查 tokens、Step 6 后加 Step 10 自检、CSS 改为 tokens 内联 + 组件按需复制 |
| 2026-06-02 | 缺品牌 DNA 独立文件、tokens.md 仍写 Haglöfs、启动流程无"读规范"前置步骤 | 新建 `brand-dna.md`（对标 mino 结构）、tokens.md 改名 Nian + 改品牌氛围描述、SKILL.md 加 Step 2 读规范（brand-dna + tokens 前置） |

---

*SKILL.md 最后更新 2026-06-02 — 信息前置：品牌 DNA 独立 + tokens 改名 + 启动流程加"读规范"步骤*
