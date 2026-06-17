# Phase 1 · 意图决策（intent.md）

> viz-design 4 阶段工作流 · Phase 1 产出

---

## R0 必要性门禁

- 一句话能说清？❌（不是"岐力有问题"能涵盖）
- 精确数值/清单？❌（是分布+对比+关联）
- 分布/趋势/关联/复杂比较？✅ → 继续

## DNA 三组必搜匹配

| 搜索维度 | 命中 |
|---|---|
| **意图（narrative_intent）** | diagnosis, alert, ranking, comparison |
| **类型（chart_type）** | kpi_card, hbar, heatmap, compare_table, table, action_card |
| **策略（highlight/annotation/composition）** | highlight_≤10%, color-status-only, color-channel-check |

## 全局风格锁定

- **色系**：Stone（暖灰+olive+earth+红橙警示），匹配 urgent 场景
- **字体**：Inter + Playfair Display + JetBrains Mono（沿用 nian 体系）
- **基底**：浅色 bg + 深色 footer 收束
- **红框规则**：连续 3+ 天未上线、低于目标、高于警戒 = 2px 橙色左边线

## 单通道检验

颜色只编码"状态"（红/橙/橄榄），不编码时间或趋势维度。✓ 通过

## 闸门 1 决策

7 张图全部确定：
- 图 1：4 张 KPI 指标卡（数字+红绿灯）
- 图 2：水平条形图（S/A/B/C 等级分布）
- 图 3：热力图（司龄×等级）
- 图 4：对比表（参评 vs 非参评）
- 图 5：水平条形图（GMV 分布，深色段）
- 图 6：数据表（12 人预警）
- 图 7：3 列行动卡片

## 拒绝记录

- ❌ 不用饼图/甜甜圈（4 条绝对禁忌）：人眼不擅长角度比较
- ❌ 不用柱状图对比 MOB 矩阵：4×4 是矩阵关系，不是单维度
- ❌ 不用 3D 效果：扭曲视觉
- ❌ 不用次坐标轴：S/C 倍差用单条形图分别表达
