---
name: nian-orchestrator
description: |
  nian 设计流水线的总调度入口。判断内容走文字分支还是数据分支，分流到对应上游技能，
  两线产出都汇入 nian-decision-card 出决策卡，再交 nian-design 施工。
  自己不施工，只判断、分流、传递状态。参照 curatorial-workflow 的 Orchestrator 模式。
  触发：用户要做报告/页面/HTML，但不确定走哪条流水线，或需要从零到一端到端产出时。
---

# nian-orchestrator

> **我是调度员，不是施工员。** 内容进来我先判断走哪条线，把活分给对的人，自己一像素不画。

---

## 流水线全貌

```
内容进来
   │
   ★ nian-orchestrator 在这 ★（判断分流）
   │
   ├──无数据──▶ curatorial-workflow 阶段1-3（定题+叙事+视觉语言）
   │                    │
   ├──有数据──▶ viz-data-storytelling → viz-design（叙事大纲+图表素材）
   │                    │
   ▼                    ▼
        nian-decision-card（承上启下，出决策卡）
                  │
                  ▼
        nian-design（施工 + 5硬规则 → HTML）
```

---

## WORKFLOW — 4 步调度

### Step 1 · 判断分支

收到内容，判断走文字分支还是数据分支。核心判断：**有没有"需要可视化的数据"**

| 信号 | 分支 |
|---|---|
| 内容是主张/叙事/品牌/知识/文本 | **文字分支** |
| 内容含数字、指标、排名、趋势、对比，需要图表 | **数据分支** |
| 混合（有数据但数据是配角） | 主分支按主导内容定，数据图作为素材并入 |

混合场景的判断：如果拿掉所有数字，内容还成立 → 文字分支（数据当点缀）；如果拿掉数字内容就空了 → 数据分支。

### Step 2 · 分流到上游

**文字分支** → 调 `curatorial-workflow`，明确告诉它只跑阶段1-3（定题+叙事+视觉语言），阶段4（原型实现）**跳过**——因为施工交给 nian-design。

**数据分支** → 依次调：
1. `viz-data-storytelling` → 出叙事大纲（Markdown）
2. `viz-design` → 按叙事大纲渲染图表（出 HTML/SVG 素材）

注意：viz 家族自己完成图表渲染，不进入 nian 家族的组件体系。

### Step 3 · 汇入 nian-decision-card

上游跑完，把产物交给 `nian-decision-card`：
- 文字分支：阶段1定题说明 + 阶段2页面类型表 + 阶段3视觉语言
- 数据分支：viz-data-storytelling 叙事大纲 + viz-design 图表产物

nian-decision-card 产出一张结构化决策卡（YAML），决定整页的气质/骨架/组件/Hero/打破/数据图位置。

### Step 4 · 交 nian-design 施工

把决策卡交给 `nian-design` 施工。nian-design 照决策卡选组件、注入 token、过 5 条硬规则、输出 HTML。

**我只到 Step 4 之前**——施工是 nian-design 的事。我确保的是：决策卡完整、字段对齐、上游产物齐全。

---

## 分流决策示例

| 用户说 | 我判断 | 流水线 |
|---|---|---|
| "把这个品牌故事做成页面" | 文字分支 | curatorial 阶段1-3 → decision-card → nian-design |
| "做个供应商业绩排名报告" | 数据分支 | viz-data-storytelling → viz-design → decision-card → nian-design |
| "做季度工作汇报" | 数据分支（通常） | 同上 |
| "把这篇策展文章做成数字展览" | 文字分支 | curatorial 阶段1-3 → decision-card → nian-design |
| "做个品牌展示落地页" | 文字分支（无数据） | curatorial 阶段1-3 → decision-card → nian-design |
| "做个数据看板" | 数据分支 | viz-data-storytelling → viz-design → decision-card → nian-design |

---

## 边界

**我做**：判断分支、分流、传递产物、确认决策卡完整、交接施工。
**我不做**：定题、叙事、视觉语言（curatorial 的事）；数据分析、图表渲染（viz 的事）；气质/组件决策（decision-card 的事）；画 HTML（nian-design 的事）。
**我不收**：直接跳过分流的施工请求——如果用户已明确只要施工，直接走 nian-design。

---

## 与 curatorial-workflow 的区别

curatorial-workflow 是策展项目自己的工作流调度器（5阶段闭环，含原型实现）。
nian-orchestrator 是更上层的总调度：它会把策展当作文字分支的一段来用（只取阶段1-3），然后接 decision-card + nian-design。

当用户的诉求是"做个策展展览项目"（纯策展，不一定要 nian-design 施工）→ 直接用 curatorial-workflow。
当用户的诉求是"做个页面/报告/HTML"（需要最终 nian-design 施工）→ 用 nian-orchestrator。

---

*最后更新：2026-06-13 — 初版，流水线总调度入口*
