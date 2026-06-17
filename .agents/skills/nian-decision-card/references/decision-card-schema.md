# 决策卡字段定义

> 决策卡是 nian-design 的施工输入契约。每个字段的枚举值都对齐 nian-design 的实际能力。

---

## 顶层字段

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `branch` | enum | ✓ | `text` / `data` |
| `visualStream` | enum | ✓ | 视觉型气质，9选1 |
| `structuralStream` | enum/null | | 结构型气质，叠加用，null 则不用 |
| `layoutSequence` | array | ✓ | 每个 section 的骨架序列 |
| `heroType` | enum | ✓ | Hero 类型，由气质决定 |
| `components` | array | ✓ | 从26组件族选 |
| `breakPoint` | object | ✓ | 打破位置，恰好1处 |
| `palette` | object | ✓ | 配色角色 |
| `dataCharts` | array/null | | 数据分支才填 |
| `source` | object | ✓ | 上游溯源 |

---

## 枚举值定义

### `visualStream`（视觉型，9选1）

来自 `VISUAL-STREAMS.md`，前4种占总场景76%是主力：

| 值 | 一句话 | 适用 |
|---|---|---|
| `Statement` | 粗体断言+单行大字+大量留白 | 品牌宣言/价值观/决策开头 |
| `Diagonal` | clip-path切出深色斜块 | 品牌展示/高调开屏 |
| `Split` | 左右50/50或60/40平分，无斜切 | 对比/新旧/方案AB |
| `Numeral` | 3-5个大数字开屏 | 数据报告/季度业绩 |
| `Entrance` | 整屏沉浸+极简元素 | 沉浸式品牌页/故事入口 |
| `Pulse` | 时间线/脉动/节奏 | 里程碑/飞轮/周期 |
| `Dashboard` | 数据密集多指标多视图 | 业务看板/监控 |

### `structuralStream`（结构型，叠加用）

| 值 | 适用条件 |
|---|---|
| `S1-黑条书签` | ≥3章节 + 持久导航 + 品牌书卷气 |
| `S2-长文导航` | ≥1500字 + 需"我在哪"导航 |
| `null` | 短内容，不用结构型 |

### `heroType`（由气质决定，不自选）

**重要**：Hero 类型不独立决策，由 `visualStream` 直接映射，见下表：

| visualStream | heroType |
|---|---|
| Statement | `V4-Statement` |
| Diagonal | `V1-Diagonal` |
| Split | `V2-Split` |
| Numeral | `V6-Numeral` |
| Entrance | `整屏居中大字` |
| Pulse | `Numeral简化` 或 `Split简化` |
| Dashboard | `Numeral缩到60vh` |

---

## `layoutSequence` 结构

数组，每项一个 section：

```yaml
layoutSequence:
  - section: 封面              # section 名称
    layout: S01                # data-layout 值，来自 layouts.md S01-S29
    role: hero | statement | evidence | transition | flow | closure
```

骨架族参考（来自 layouts.md）：
- Hero类：S01-S04
- 总览类：S05, S06, S14, S22
- 展开类：S07, S09, S11, S19
- 转场类：S03, S13, S15
- 流程类：S08, S10, S20, S24
- 收束类：S18, S21, S27
- 长文档类：S29

---

## `components` 结构

数组，每项从 components.md 26族选：

```yaml
components:
  - id: "03 TABLES"            # 来自 components.md 的族编号+名
    purpose: 供应商业绩排名     # 这个组件用在哪
```

26族速查：01 Cards / 02 Buttons / 03 Inputs / 04 Lists / 05 Tables / 06 Navigation / 07 Tags / 08 Segmented / 09 Date / 10 Toggles / 11 Progress / 12 Mini Charts / 13 Widgets / 14 Overlays / 15 State / 16 Flow Pipeline / 17 Do-Don't / 18 Tab / 19 Accordion / 20 对比表 / 21 Detail / 22 Checklist / 23 数字标题 / 24 三列网格 / 25 Flip / 26 堆叠图卡

---

## `breakPoint` 结构（恰好1处）

```yaml
breakPoint:
  section: 核心结论            # 在哪个 section 打破
  method: ghost水印            # ghost水印 | 超大数字 | accent色 | 异形元素
  spec:                        # method 的具体参数
    text: Q2
    opacity: 0.04
    font: Playfair
```

method 选一种：
- `ghost水印` — 品牌年份/章节编号/关键词，opacity 0.03-0.06
- `超大数字` — 一个超大的 Playfair 数字
- `accent色` — 一个用 --yellow/--orange 的元素
- `异形元素` — 一个不守规则形状的元素

---

## `palette` 结构

```yaml
palette:
  primary: olive              # darkgray | olive | earth（Primary 80%）
  accent: yellow              # yellow | orange（Accent 10%）
  baseMode: light             # light | dark | mix
```

约束（来自 nian-design 7色体系）：
- Primary 占 80%，Accent 占 10%，Scene 占 10%（Scene=glacier/rock，由骨架隐含）
- primary 三选一：darkgray（权威深色）/ olive（沉稳橄榄）/ earth（大地棕）
- accent 二选一：yellow（警示高亮）/ orange（品牌橙）
- baseMode：light（默认浅色）/ dark（深色，用 components.md -d 后缀 token）/ mix（首页深≤1/2，斜切切割）

---

## `dataCharts` 结构（仅数据分支）

```yaml
dataCharts:
  - chartId: 趋势图            # 与 viz-design 产物对应的图ID
    embedSection: 证据展开     # 嵌入到 layoutSequence 的哪个 section
    size: full | half | third  # 占位大小
    source: viz-design产物路径  # viz-design 渲染的 HTML/SVG 路径
```

来源说明：
- chartId 和叙事功能来自 viz-data-storytelling 的图表清单
- source（实际产物）来自 viz-design 的 Phase 4 渲染
- embedSection 必须与 layoutSequence 中的某个 section 名一致

---

## `source` 结构（上游溯源）

```yaml
source:
  narrative: "myagents_files/sabc-output/01-narrative-outline-岐力.md"  # 上游叙事/页面类型表路径
  audience: 决策者              # 决策者 | 业务方 | 高管 | 公众
```

用途：nian-design 施工时可回溯上游，对账内容。

---

*最后更新：2026-06-13 — 决策卡 schema v1，对齐 nian-design 施工输入*
