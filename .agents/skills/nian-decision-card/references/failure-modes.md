# 失败模式库

> 决策卡产出与施工中反复出现的坑。每条含：症状、根因、规则、出处。
> 每次施工踩新坑就追加一条，不删旧条。

---

## FM-01 · 数据图深色背景 → 施工转浅色

**症状**：viz-design 产出的图表 spec 用了深色背景（如 `--darkgray` 底），但 nian-design 数据图禁深色。

**根因**：viz-design 的 Warm/Stone/Teal 色系允许深色画布以增强图表对比度，但 nian-design 整页 baseMode=light 时数据图必须浅色（见记忆 `feedback_chart_light_theme`）。

**规则**：
- 决策卡 `palette.baseMode` 强制 `light`（数据分支）
- `dataCharts` 对应项加 `note: 原spec深色→施工转浅色`
- `constraints` 字段记录此纠偏
- coral 等非 nian 色映射为 `--orange` 信号色，不自造新色

**出处**：岐力 SABC 决策卡 图5 GMV 分布条形（`output/决策卡-岐力SABC诊断.yaml`）

---

## FM-02 · 上游缺 Big Idea 置信度

**症状**：viz-data-storytelling 叙事大纲的 Big Idea 没标置信度，或 curatorial-workflow 阶段1 定题说明缺目标观众。

**根因**：上游技能执行不严格，关键字段遗漏。

**规则**：
- **不强行下决策卡**。停下回流上游要求补全。
- 若年老师坚持先出草稿：`source.bigIdea` 标注"置信度待补"，`constraints` 记录"上游置信度缺失，决策卡为草稿，施工前需复核"。
- nian-design 施工时看到此 constraint 必须停下问。

**出处**：设计预防，尚未触发。

---

## FM-03 · 气质混合（Numeral + Dashboard）

**症状**：数据分支首屏单一震撼指标（Numeral），但后续多图密集（Dashboard），年老师或 AI 想两个气质都选。

**根因**：schema `visualStream` 是单值字段，不允许混合。但真实场景确实存在"首屏数字 + 后续看板"的混合需求。

**规则**：
- `visualStream` 单值，按**首屏定调**选主气质。
- 混合需求通过 `layoutSequence` 体现：首屏用 Numeral 骨架（S03），后续 section 用 Dashboard 骨架（S14/S22）。
- `breakPoint` 放在首屏，强化数字定调。
- 不要在 `visualStream` 写 `Numeral+Dashboard` 这种值——校验脚本会拒。

**出处**：岐力 SABC 决策卡（首屏 Numeral，后续 S09/S14 格子卡承载多图）。

---

## FM-04 · embedSection 与 section 名不一致

**症状**：`dataCharts[].embedSection` 写的 section 名与 `layoutSequence[].section` 对不上，nian-design 施工时找不到图嵌哪。

**根因**：手写决策卡时 section 名笔误，或上游叙事大纲的图编号与 section 编号没对齐。

**规则**：
- `embedSection` 必须与 `layoutSequence` 中某个 `section` 名**完全一致**（含大小写、标点）。
- 校验脚本会检查此项（见 `validate-decision-card.py` 校验项 12）。
- 建议决策卡产出后立即跑校验脚本，不通过不进 nian-design。

**出处**：校验脚本设计预防。

---

## FM-05 · components.id 写了不存在的族

**症状**：`components[].id` 写了类似 `99 NOTEXIST` 或 `26 堆叠图片卡`（实际名是 `26. STACKED IMAGE CARDS`），nian-design 找不到组件。

**根因**：手写时凭记忆写组件名，没查 `components.md`；或 SKILL.md/schema.md 里写的族数过时（曾写 26 族，实际 32 族）。

**规则**：
- `components[].id` 必须以 `components.md` 实际编号开头（01-32，含 12a/12b/12c/12d 子编号）。
- 编号后的名称可简写，但编号必须准确。
- 校验脚本从 `components.md` 动态解析枚举，不依赖 schema 写死的数字。
- **schema.md 与 SKILL.md 的族数描述必须与 components.md 同步**——这是元数据漂移的高发点。

**出处**：本次审计发现 SKILL.md 写"26 族"、schema.md 写"26族速查"，实际 components.md 是 32 族。已修正。

---

## FM-06 · layouts 写了不存在的骨架

**症状**：`layoutSequence[].layout` 写了 `S29` 或 `S30`，但 `layouts.md` 实际只有 S01-S28。

**根因**：同 FM-05，schema 写死的骨架数过时。

**规则**：
- `layout` 必须在 `layouts.md` 实际枚举内（S01-S28，动态解析）。
- 校验脚本从 `layouts.md` 解析，不依赖 schema 写死的范围。
- schema.md 与 SKILL.md 的骨架范围描述必须与 layouts.md 同步。

**出处**：本次审计发现 SKILL.md 写"S01-S29"、schema.md 写"S01-S29"，实际 layouts.md 是 S01-S28。已修正。

---

## FM-07 · heroType 与 visualStream 不匹配

**症状**：`heroType` 写了 `V1-Diagonal`，但 `visualStream` 是 `Numeral`，nian-design 按 heroType 施工出斜切屏，与数字开屏气质冲突。

**根因**：手写时 heroType 凭感觉选，没查气质→Hero 映射表。

**规则**：
- `heroType` 由 `visualStream` 直接决定，不独立选（见 `decision-card-schema.md` 映射表）。
- 校验脚本会检查此项（WARN 级别，提示但不阻断——因为可能有意为之的边界情况）。
- 若确需偏离映射表，在 `constraints` 字段说明理由。

**出处**：校验脚本设计预防。

---

## FM-08 · breakPoint 不是恰好 1 处

**症状**：决策卡缺 `breakPoint`，或写了多处打破。

**根因**：忘记写，或觉得"每屏都要打破才有节奏"。

**规则**：
- `breakPoint` 恰好 1 处。多了稀释焦点，少了页面平淡。
- 选"最强调的那个 section"放打破。
- 校验脚本检查此项（缺失或多余都报 ERROR）。

**出处**：schema 设计约束。

---

## FM-09 · 文字分支误填 dataCharts

**症状**：`branch=text` 但 `dataCharts` 非 null，nian-design 施工时尝试嵌不存在的图。

**根因**：从数据分支模板复制后忘记清空。

**规则**：
- `branch=text` → `dataCharts` 必须 `null`。
- `branch=data` → `dataCharts` 必须非空。
- 校验脚本检查此项。

**出处**：校验脚本设计预防。

---

## FM-10 · palette 自造新色

**症状**：`palette.primary` 写了 `coral` 或 `#E55B2B`，不在 nian 7 色体系内。

**根因**：viz-design 用了 coral 等扩展色，决策卡直接照抄。

**规则**：
- `primary` ∈ {darkgray, olive, earth}
- `accent` ∈ {yellow, orange}
- 扩展色必须映射：coral→orange，其他非 nian 色一律映射到最近 nian 色。
- 见 FM-01 的 coral→orange 处理。

**出处**：岐力 SABC 决策卡（coral→orange 映射）。

---

## 维护规则

- 每次施工踩新坑，追加一条 FM-XX，不删旧条
- 每条必含：症状 / 根因 / 规则 / 出处
- 规则要能被校验脚本或 SKILL.md 引用，不能只是建议
- 季度复盘时检查：哪些 FM 已被校验脚本覆盖，哪些还靠人工记住

---

*最后更新：2026-06-19 — v1，10 条失败模式，覆盖 schema/上游/施工三类*
