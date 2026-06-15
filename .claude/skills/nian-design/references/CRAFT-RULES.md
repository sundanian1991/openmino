# CRAFT RULES — 5 条硬规则

> nian-design 的质量底线。施工方照图施工后，**5 条硬规则全部通过才能输出**。
> 借鉴 Nothing Design Section 2 的工艺规则，落到 nian 的 7 色 + 4 字体语境。

---

## 用途

- **入口**：施工完成 → Step 4 自检 → 5 条逐条过 → 任一不过就不输出
- **不通过处理**：标出违规项 + 给出"如何改"建议，回给上游
- **通过处理**：输出 HTML，标 `QA passed · 5/5`

---

## 规则 1 · Three-Layer（三层金字塔）

### 规则

每个 `<section>` 恰好 **三层** 重要性。不多不少。

| 层级 | 角色 | 字体 | 字号 | 位置 |
|---|---|---|---|---|
| **Primary** | 唯一结论 | Playfair Display | 36-96px | 视觉中心 |
| **Secondary** | 支撑上下文 | Inter | 14-18px | 紧贴 Primary |
| **Tertiary** | 元数据 / 来源 | JetBrains Mono | 10-12px | 推至边缘 / 底部 |

### 自检方法（眯眼测试）

> 闭一只眼，缩到 20%，能否一眼看出最重要的东西？
> - **能** → 通过
> - **不能 / 两个元素在竞争** → 不通过

### 不通过的修法

- 多个 "Primary" 候选 → 选 1 个放大，其余降到 Secondary
- 元素过多 → 删除或合并
- 字号差距 < 2x → 拉大（Primary 至少比 Secondary 大 2 倍）

---

## 规则 2 · Type Budget（字体预算）

### 规则

每屏（每个 `<section>`）字体的**预算**：

- **字号 ≤ 3 种**（一个大、一个小、一个标签）
- **字重 ≤ 2 种**（Regular + 一个，通常 Light 或 Medium）
- **字体家族 ≤ 2 种**（Playfair + Inter；JetBrains Mono 仅用于数据；Doto 偶用于装饰）

### 自检方法

数一数这个 section 用了多少种字号、字重、字体：

```
.section h1: Playfair 56px Light
.section h2: Playfair 32px Light
.section p:  Inter 15px Regular
.section .label: JetBrains 10px Medium
```

→ 字号 3 种（56/32/15/10 → 实际 4 种 = 超出预算）

### 不通过的修法

- 多余字号 → 改用 spacing 或 color 区分
- 多余字重 → 合并到 Regular + Light
- 多余字体 → Doto 仅作 1 处装饰，多余删

---

## 规则 3 · Asymmetry（非对称）

### 规则

**不居中**。每屏布局都是**非对称的**。

| 手法 | 用法 |
|---|---|
| **大小悬殊** | 主元素占 7/12，辅元素占 5/12；或主 2/3 + 辅 1/3 |
| **权重不均** | 重元素靠一侧（左右皆可），轻元素靠另一侧 |
| **留白偏置** | 一侧空 80-120px，另一侧贴边 |

### 自检方法

看这个 section 是不是 50/50 对称、是不是 `text-align: center`、`place-items: center`：
- **是** → 不通过（典型的"AI 感"布局）
- **不是** → 通过

### 不通过的修法

- 50/50 → 改 7/5 或 2/3+1/3
- 居中文案 → 改左对齐（默认）或右对齐
- `place-items: center` → 改 `align-items: start` + 手动 padding 控制

---

## 规则 4 · One-Break（一处打破）

### 规则

每屏**恰好 1 处**不守规则。多了叫失控，少了叫平庸。

允许的"打破"形态：
- Ghost 大字（Playfair italic 或 Doto，opacity 0.04-0.10）
- 出血图片（1 张，跨过 section 边界）
- 异色强调（--yellow 或 --orange 一处使用）
- 异形元素（圆/斜/异尺寸）

### 自检方法

数"打破"的数量：
- **0 处** → 不通过（"没看头"）
- **1 处** → 通过
- **≥ 2 处** → 不通过（"失控"）

### 不通过的修法

- 0 处 → 加 1 个 Ghost 大字（最简）
- ≥ 2 处 → 保留最有意境的 1 个，删其余

---

## 规则 5 · Visual Variety（视觉多样化）

### 规则

**当一个 `<section>` 包含 ≥ 3 个数据段**（如多个指标 / 多组对比 / 多条记录），必须用 **≥ 2 种视觉形态**呈现。

| 形态 | 适用 |
|---|---|
| **大数字 + 单位** | 单指标震撼（Hero 数字） |
| **进度条 / 段位条** | 进度、占比 |
| **环形 / 弧形** | 多个相关百分比 |
| **行内条** | 二级指标的紧凑展示 |
| **数字 + 状态色** | 无比例的纯数值 |
| **Sparkline** | 趋势 |
| **KPI 卡片** | 简单数据点 |

### 自检方法

数数据段的视觉形态种类：
- **1 种** → 不通过（"全用同一种"）
- **≥ 2 种** → 通过

### 不通过的修法

- 把第一个数据段改为"大数字"（重头）
- 把第二/三段改为"行内条"或"Sparkline"（轻）
- **形态可重，语音统一**（字体、颜色规则不变）

---

## 自检流程（Step 4 · 必过）

```
[ ] Rule 1 · Three-Layer    — 眯眼测试通过
[ ] Rule 2 · Type Budget    — 字号 ≤ 3 / 字重 ≤ 2 / 字体 ≤ 2
[ ] Rule 3 · Asymmetry      — 非 50/50 居中布局
[ ] Rule 4 · One-Break      — 恰好 1 处打破
[ ] Rule 5 · Visual Variety — ≥ 3 数据段时用 ≥ 2 形态

5/5 通过 → 输出 HTML
任一不通过 → 标违规项 + 修法，回上游
```

---

## 与 Nothing Design 的对应

| nian CRAFT-RULES | Nothing Section 2 |
|---|---|
| 1 · Three-Layer | 2.1 Visual Hierarchy: The Three-Layer Rule |
| 2 · Type Budget | 2.2 Font Discipline |
| 3 · Asymmetry | 2.7 Compositional Balance |
| 4 · One-Break | 2.6 Consistency vs. Variance |
| 5 · Visual Variety | 2.9 Visual Variety in Data-Dense Screens |

**借鉴来源**：Nothing Design 是工业设计 + 瑞士排版，nian 是自然色系 + 字体四工。规则形式相同，**视觉语境**落到 nian 7 色 + 4 字体。

---

*最后更新：2026-06-13 — 初版，5 条硬规则*
