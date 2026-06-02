---
name: nian-design
description: |
nian-design — 通用品牌设计系统。自然色系（olive/earth/glacier）、字体三工（Georgia/Inter/JetBrains Mono）、点阵视觉、场景色板旋转、45+ 组件。
Landscape and signal. Three typefaces, one voice.
MANDATORY TRIGGERS: 'nian-design', 'nian design', '品牌设计系统', 'nian'.
STRONG TRIGGERS: '自然色系', '品牌视觉规范', 'HTML 界面设计', '设计系统'.
---

# nian-design

> Landscape and signal. Three typefaces, one voice.

---

## 0. 前置条件（动手前确认）

年老师给了完整素材 → 跳过，直接进工作流。否则确认 3 项：

| 项 | 问什么 |
|----|--------|
| 类型 | 数据报告？品牌展示？深度文章？SOP？ |
| 素材 | 有文案/数据/图片吗？完整还是需要补？ |
| 硬约束 | 品牌色？必须包含的元素？ |

---

## 1. 工作流（6 步，不可跳过）

### Step 1: 读规范 + 注入

一次性读完，后续步骤全部基于这些约束：

1. 读 `brand-dna.md` — 品牌基因、气质、Craft Rules
2. 读 `references/tokens.md` — 所有精确值
3. 注入场景色（三选一，同页仅一个）：根据内容的**情绪基调**选择，不按内容类型硬映射。

| 色 | 情绪基调 | 适合内容特征 |
|----|---------|-------------|
| `--scene: var(--brand-olive)` | 权威、增长、生命力 | 竞争性排名、增长故事、品牌宣言 |
| `--scene: var(--brand-earth)` | 温暖、工艺、质感 | 材质展示、历史叙事、人文内容 |
| `--scene: var(--scene-glacier)` | 冷峻、精确、距离感 | 纯技术参数、科学分析、极简展示 |

**选色标准**：问自己"这个内容需要读者感受到什么？"而不是"这是什么类型？"。同一类型（如数据报告）可以因内容气质不同而选不同色。

字体已固定，不需决策：

| 角色 | 字体 | 降级 |
|------|------|------|
| Display | Playfair Display | Georgia |
| Body | Inter | system-ui |
| Data | JetBrains Mono | Courier New |

上限：3 字体、3 字号、2 字重。禁止混角色。

### Step 2: 选配方 + 读结构配组件

读 `references/recipe-book.md`，按内容结构选配方。配方给出：节奏骨架 + 参照案例 + 结构模式。

| 你要做的 | 配方 | 核心参照 | 结构模式说明 |
|---------|------|---------|-------------|
| 深度文章/技术笔记 | R1 | economist-deep-system | 深浅交替底色 + 不等分网格交替 |
| 数据分析报告 | R2 | haglofs-brand-analytics | Hero→指标→排名→趋势→洞察→行动 |
| 品牌/设计展示 | R3 | ikea-democratic-design | 深色声明→色板→字体→组件→对比 |
| 工作汇报 | R4 | work-report | 结论→指标→进度→时间线→风险→下一步 |
| SOP/操作手册 | R5 | scenario-article | 目标→前置→步骤→注意→FAQ→验收 |
| 知识管理/读书笔记 | R6 | scenario-reading-deep | 主题→分类→内容→引用→标签 |
| 数据+叙事混合 | R7 | scenario-brand-read-analyze | Hero→发现→数据交替→洞察→行动 |

**读结构，不拷设计。** 模板文件在 `templates/` 下，用途有限：
- 取 CSS 变量体系和间距语义作为起点
- 取 section 底色交替模式作为节奏参考
- **不要复制模板的 HTML 结构或视觉设计**
- 每个组件必须根据当前内容重新设计，从 `references/components.md` 取或自创

**组件互换**：配方给的"结构特征族"是骨架（必须遵守），具体组件在同族内自由选择。例：配方说"段状条族"，可选 seg-bar 方块格 / rank-bar / weight-bar，根据内容决定。

### Step 2.5: 内容审计 + Hero 概念设计

输出代码前先回答 4 个问题：

**① 内容长短**：长文（>3000字）→ 可折叠段落 + 深度阅读节奏。短文（<1000字）→ 宽松间距 + 装饰补偿。中篇（1000-3000字）→ 标准节奏。
**② 信息密度**：每 section 不超过 1 个核心结论 + 2-3 条支撑。信息过量时，分 section 或改为"锚点+详情"模式。
**③ Hero 概念**（每次重新设计，不允许复制之前 Hero）：
- 单句消息是什么？
- 需要什么装饰元素？（ghost 字 / 装饰线条 / 浮动数据标签 / 点阵图案 选 1-2）
- Hero 类型（根据内容选，不套模板）：
  | 类型 | 特征 | 适合 |
  |------|------|------|
  | 陈述型 | 大字 + 副标题 + 底部装饰 | 品牌声明、结论先行 |
  | 数据型 | 小字标题 + 指标矩阵 / 数据块 | 分析报告、排名 |
  | 混合型 | 标题 + 侧栏数据 + 装饰元素 | 综合内容、叙事报告 |
- **Hero 底色只能用 `--bg`（暖米白）或 `--sf`（纯白）**，深色（glacier/olive）只能做局部装饰元素，不能全 Hero 深底。
**④ 装饰规划**：页面需要 2-3 处装饰元素分散布局——ghost 大字、点阵图案、分隔装饰线、浮动标签。装饰不破 Nian 禁制（无阴影/渐变/模糊），保持低透明度（0.03-0.08）。

### Step 3: 节奏规划

基于配方，用 markdown 输出节奏表。**不输出此表，不许写代码。**

```
| Section | 锚点 | 结构特征族 | 具体组件 | 底色 |
|---------|------|-----------|---------|------|
| Hero | 宣言 | — | hero-statement | bg |
| 指标 | 数据矩阵 | 段状条 | seg-bar 方块格 | sf |
| Group 1 | 宣言 | — | dark-statement | td |
| Tips 1-3 | 结构 | 不等分网格 | bento-grid | sf/olive |
```

检查 5 条：
1. 相邻 section 结构特征族是否不同？
2. Hero 级是否仅一处？
3. 每个配方单元内是否有视觉变化（底色/分栏/组件类型三选二以上）？
4. Hero 底色是否为 `--bg` 或 `--sf`（非深色）？深色仅限局部装饰。
5. 内容密度是否均匀？长 section 后跟一个稀疏 section 做呼吸。连续 3 个以上同密度 section → 插一个底色/结构变化。

### Step 4: 读参照 + 查组件代码

1. 读配方中标注的参照案例（showcase HTML 前 200 行），理解视觉节奏和 CSS 变量写法
2. 查 `references/components.md` 或 `references/components-ext.md`，取需要的组件 HTML+CSS 代码

**组件代码内联到 `<style>` 中，不引用外部 CSS 文件。**

### Step 5: 写代码

三层金字塔（每个 section）：
- **Answer**：唯一结论（Playfair Display，荒谬地大）
- **Argument**：支撑上下文（Inter body）
- **Evidence**：元数据/参数（JetBrains Mono，推到边缘）

8:1 工业冲击力硬约束：Hero 96-120px，body 12-14px。

**装饰元素**（每页 2-3 处）：
- ghost 大字（`opacity: 0.03-0.06`，`font-size: clamp(6rem, 18vw, 20rem)`）
- 装饰分隔线（短横线、左对齐柱线、section 编号装饰）
- 浮动数据标签（`position: absolute` 的小指标块）
- 点阵图案（`Doto` 字体或 `radial-gradient` 小圆点）
- **禁止**：阴影、渐变、模糊、毛玻璃、emoji、填充图标

每页恰好一处"打破"——超出常规比例的数据点、圆形元素混在方形中、某处异常大的间距。超过一处 = 乱。

**硬约束检查表**（写完后逐条）：

| # | 规则 |
|---|------|
| 1 | 3 字体不混角色 |
| 2 | Hero ≥ 96px，与 body 比值 ≥ 8:1 |
| 3 | 无渐变/阴影/模糊/毛玻璃/emoji |
| 4 | accent-orange 仅功能信号 |
| 5 | 相邻 section 不同族组件 |
| 6 | 场景色三选一，同页只用一个 |
| 7 | Hero 底色为 `--bg` 或 `--sf`（非深色全背景）|
| 8 | 有装饰元素（ghost 字/装饰线/浮动标签/点阵 选 2-3 处）|

### Step 6: 自检 + 打破验证

对照 `references/checklist.md`：P0 红线全过，P1 尽量满足。

眯眼验证：
- Answer 层是否主导？
- 等比是否 ≥ 8:1？
- 视觉节奏是否有呼吸感（不是所有区块长得一样）？

---

## 2. 反模式（P0 红线）

- 渐变、阴影、模糊、毛玻璃
- 骨架屏、toast 弹窗、表情
- 深色模式、深浅切换
- 视差、滚动劫持、弹跳缓动
- 斑马纹、填充图标、emoji 做 UI
- accent 做装饰
- 圆角 > 8px（pill 按钮用 999px 除外）
- 跳过 opacity/梯度直接用 accent 区分数据

---

## 3. 参考文件

| 文件 | 用途 | 何时读 |
|------|------|--------|
| `brand-dna.md` | 品牌基因、气质、Craft Rules | Step 1 必读 |
| `references/tokens.md` | 字体/颜色/间距/圆角/深度精确值 | Step 1 必读 |
| `references/recipe-book.md` | 配方手册（节奏模式+组件组合+参照案例） | Step 2 必读 |
| `references/visual-forms.md` | 8 种结构特征 × 4 级组件完整清单 | 需要替换组件时查 |
| `references/components.md` | 组件 HTML/CSS 代码 | 写代码时按需复制 |
| `references/components-ext.md` | 扩展组件（Economist/FT/Bloomberg 等） | 品牌场景组件 |
| `references/checklist.md` | P0-P3 质量检查 | Step 6 |
| `references/design-rules.md` | 详细设计规则（层级/字体纪律/容器策略） | 需要深入理解规则时 |

### 模板

见 `templates/` 目录。配方手册中每个配方标注了对应模板。

### 展示页

见 `references/showcase/`。配方手册中每个配方标注了核心参照案例，不需要浏览全部 59 个。

---

## 4. Evolution Log

| 日期 | 发现 | 调整 |
|------|------|------|
| 2026-06-01 | SKILL.md 初始化，7 步工作流 | 建档 |
| 2026-06-02 | CSS 引用脱节、令牌分裂、viz-helpers bug | 修正引用、补映射层、修复 bug |
| 2026-06-02 | 对标 nothing：缺注入路径/锚点速查/失败指引/模板速查 | 补全所有缺失项 |
| 2026-06-02 | 步骤过载，缺需求澄清和自检 | 拆分步骤、加需求澄清和自检 |
| 2026-06-02 | 缺 brand-dna 独立文件、tokens 仍写旧品牌 | 新建 brand-dna、tokens 改名 |
| 2026-06-02 | 12 步过长，AI 跳过关键步骤；59 个 showcase 无索引 | 精简到 6 步；新建 recipe-book.md；强制 Step 3 输出节奏表 |
| 2026-06-02 | 配方锁死组件选择，限制创造性；缺模板起步；缺组件代码引用 | recipe-book 改为"族/组件分离"——配方给结构特征族（骨架），组件自由选择（血肉）；加组件互换规则和互换表；Step 2 加"拷模板起步"；Step 4 加"查 components.md 取组件 CSS"；对标 MINO（模板起步+场景文件）和 Nothing（组件代码内嵌+三层视觉层级+评分体系） |
| 2026-06-03 | 场景色按类型硬映射误导配色；模板依赖过重限制创意 | 场景色改按情绪基调选择（去掉 glacier=数据报告）；Step 2"拷模板"改为"读结构配组件"；recipe-book 去掉模板列，强调读结构不拷设计 |
| 2026-06-03 | Hero 都是深色全背景；缺装饰组件；内容密度没规划 | 新增 Step 2.5（内容审计+Hero概念设计+装饰规划）；Hero 底色限定 `--bg`/`--sf`；新增装饰组件体系（ghost字/线/标签/点阵）；节奏表检查增加密度和底色两条；硬约束表增加#7(浅Hero底)和#8(装饰元素) |

---

*最后更新：2026-06-03 — 场景色情绪化 + 模板参考化 + Hero浅底色 + 装饰组件 + 内容密度规划*
