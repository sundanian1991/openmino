---
name: "viz"
description: "可视化入口判断器 — 拿到素材后做 3 个诊断问题，路由到对应技能链。只判断不执行。"
argument_hint: <素材描述或路径>
---

# /viz — 可视化入口判断器

> **只做诊断 + 路由，不执行任何技能。** 拿到素材后问 3 个问题，告诉年老师走哪条链。

---

## 适用场景

年老师拿到一份素材（文字 / 数据 / URL / PDF / 截图），想做可视化，但不确定从哪个技能进。

**不适用**：
- 已经明确要做什么（直接调对应技能）
- 只是单图且意图明确（直接调 viz-design）
- 只想做长文网页文章（直接调 beautiful-article）

---

## 诊断流程

收到 `$ARGUMENTS` 后，**先不要动手**，按顺序问下面 3 个问题。一次只问一个，年老师答完再问下一个。

### 问题 1 · 素材是什么？

| 选项 | 含义 | 路由分支 |
|---|---|---|
| A 一堆文字 / 文章 / 主题想法 | 素材是叙述性的 | → 文字分支 |
| B 一块数据 / 表格 / 指标 / 排名 | 素材是结构化数字 | → 数据分支 |
| C 两者都有 | 既有文字论述又有数据支撑 | → 看主诉求（问题 2） |

### 问题 2 · 要做什么？

| 选项 | 含义 | 路由 |
|---|---|---|
| A 数字展览 / 线上展览 / 数字博物馆 | 多页面、有策展叙事 | 文字分支 → curatorial-workflow |
| B 数据报告 / 数据看板 / 业绩汇报 | 数据驱动、有 Big Idea | 数据分支 → viz-data-storytelling |
| C 长文网页文章 | 单篇长文、可分享 | → beautiful-article（独立闭环） |
| D 单张图表 | 只要一张图 | → viz-design（止步） |

### 问题 3 · 单图还是整页？

| 选项 | 含义 | 终点 |
|---|---|---|
| A 单图 | 一张图就够 | viz-design 出图即止 |
| B 整页 | 要做成完整 HTML 页面 | → nian-decision-card → nian-design 施工 |

---

## 路由表

诊断完成后，按下表给出路由建议：

```
文字 + 展览 + 整页   →  curatorial-workflow (阶段1-3) → nian-decision-card → nian-design
文字 + 长文          →  beautiful-article（独立闭环，不走 decision-card）
数据 + 报告 + 整页   →  viz-data-storytelling → viz-design → nian-decision-card → nian-design
数据 + 报告 + 单图   →  viz-data-storytelling → viz-design（止步）
数据 + 单图          →  viz-design（直接进）
纯策展对象（无素材）  →  curatorial-workflow 阶段1 开始定题
```

---

## 输出格式

诊断完成后，输出一段路由建议，**不执行**：

```
诊断结果：
- 素材：[A/B/C]
- 目标：[A/B/C/D]
- 范围：[单图/整页]

推荐链路：
[技能1] → [技能2] → ... → nian-design

下一步：
1. 先调 [技能1]，产出 [中间产物]
2. 再调 [技能2]，产出 [中间产物]
3. 最后调 nian-decision-card 出决策卡，用 scripts/validate-decision-card.py 校验
4. nian-design 照决策卡施工

是否按此链路执行？
```

年老师确认后，**才**按链路依次调用技能。

---

## 关键约束

- **本命令不调用任何技能**，只产出路由建议
- **决策卡产出后必须校验**：`python3 .agents/skills/nian-decision-card/scripts/validate-decision-card.py <决策卡.yaml>`
- **校验失败必须修复后才能进 nian-design**——决策卡是契约，契约错则施工必错
- **nian-decision-card 是中间环节**：文字/数据分支都要先跑上游技能产出内容，才能进 decision-card

---

## 与单独调技能的区别

| 场景 | 单独调技能 | 用 /viz |
|---|---|---|
| 明确要做单图 | ✅ 直接 viz-design | ❌ 多此一举 |
| 明确要做长文 | ✅ 直接 beautiful-article | ❌ 多此一举 |
| **素材模糊，不知道走哪条链** | ❌ 容易走错 | ✅ **先诊断再路由** |
| **想用整页但不确定上游** | ❌ 容易跳过 decision-card | ✅ **强制走完整链路** |

---

*最后更新：2026-06-19 — P0 入口判断器 v1*
