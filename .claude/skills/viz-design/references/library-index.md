# Library Index

Use this file to decide what to read next. Load the smallest useful subset.

## DNA Database — 首要参考（Phase 1 先查）

> **4000 条经典案例，命中即继承全策略。先查 DNA，再查模式库。**

- `data/chart-dna-index.tsv`
  - Use FIRST in Phase 1 — grep/awk 按意图/类型/关键词匹配
  - 命中 → 继承 chart_type → 模式编号 + highlight/annotation/composition/reading_path 全策略
  - Searchable via `grep` or `awk` — see examples below.
- `chart-dna-db.md`
  - Use only for deep lookup after `chart-dna-index.tsv` identifies entries worth expanding.
  - Contains full DNA records: source, chart type, title, narrative intent, color scheme (hex), highlight strategy, annotation strategy, composition template, typography style, reading path, why it works (3-5 reusable decisions).

### DNA Search Examples

```bash
# 按意图匹配（最常用）— 供应商表现/能力评估
awk -F'\t' '$5 ~ /供应商|能力|评估|健康度/' data/chart-dna-index.tsv | head -10

# 按图表类型匹配
awk -F'\t' '$3 ~ /漏斗|funnel/' data/chart-dna-index.tsv | head -10

# 按场景/领域关键词
awk -F'\t' '$14 ~ /麦肯锡|高管|战略/' data/chart-dna-index.tsv | head -10

# 组合条件：供应商 + 排名
awk -F'\t' '$5 ~ /供应商/ && $14 ~ /排序|排名/' data/chart-dna-index.tsv | head -10

# 趋势/变化类
awk -F'\t' '$5 ~ /趋势|变化|增长|下降/' data/chart-dna-index.tsv | head -10
```

---

## Core References

- `decision-rules.md`
  - Use when selecting a pattern — boundary cases and ambiguous inputs.
- `concept-pattern-map.md`
  - Use when the input is an abstract concept (not data) and you need the concept→pattern mapping.
- `consulting-archetypes.md`
  - Use when the input requires logical decomposition (MECE, waterfall, 2x2, issue tree, etc.).
- `consulting-workflow.md`
  - Use when the input is arbitrary text/data and you need the full consulting-chart workflow.

## Phase 1: Intent + Pattern Match

- `consulting-style-guide.md`
  - Use to determine the overall visual style (formal/casual/editorial/hand-drawn) before choosing a pattern.
- `spec-template.md`
  - Use to understand the SPEC format — read before writing any SPEC.

## Phase 2: Style + Opening

- `aesthetic-spells.md`
  - Use when user mentions AI aesthetic concepts (新极简/高级感/低饱和/留白/卡片式) or wants "高级但不冰冷" style. Maps 12 spells to viz-design parameters.
- `scene-thesis-db.md`
  - Use when designing a single chart scene — one-sentence thesis + signature element + restraint statement for 28 common visualization scenarios.
- `style-schools.md`
  - Use to select the overall visual style school (McKinsey, FT, Bloomberg, Excalidraw, etc.).
- `opening-archetypes.md`
  - Use when designing the "first chart" — the opening skeleton that sets the tone. **15 types**.

## Phase 3: Narrative Design

- `narrative-arcs.md`
  - Use when the task requires multiple charts — pick the narrative arc and chart sequence. **12 types**.
- `visual-beats.md`
  - Use for single-chart visual beat design — reading path, emphasis technique, entrance rhythm. **25 types**.

## Phase 3.5: Layout + Interpretation

- `layout-selector.md`
  - Use AFTER chart type is chosen — maps scenario to one of 40 layout templates + interpretation strategy (KPI cards, insight cards, or no interpretation). **Auto-selected by intent + data density.**

## Phase 4: Composition + Color + Typography

- `composition-templates.md`
  - Use to select the canvas layout and region division. **40 types** (13 base + 27 extended).
- `color-themes.md`
  - Use to pick the color theme — 25 presets with hex ramps and semantic colors.
- `typography-moods.md`
  - Use to select font pairings by mood and scenario.

## Phase 5: SPEC Writing

- `spec-template.md`
  - Use for the 12-item SPEC template + full example.
- `consulting-quality-gates.md`
  - Use after SPEC writing — 12-question quality gate.

## Phase 6: Rendering Delegation

- `execution-steps.md`
  - Use for the six-layer drawing method + chart skeleton coordinates.
- `visual-guidance-elements.md`
  - Use for arrows, annotations, baseline specs, icon guidelines.

## Phase 7: Pre-Flight Check

- `anti-patterns.md`
  - Use before declaring done — common AI error patterns by chart type.

## Phase 8: Acceptance

- `verification-standards.md`
  - Use for McKinsey/BCG-grade quality acceptance criteria.

## Chart DNA Database

- `data/chart-dna-index.tsv`
  - Use to find chart DNA matches by chart type, mood, composition, or style keyword.
  - Searchable via `grep` or `awk` — see examples below.
- `chart-dna-db.md`
  - Use only for deep lookup after `chart-dna-index.tsv` identifies entries worth expanding.
  - Contains full DNA records: source, chart type, title, narrative intent, color scheme (hex), highlight strategy, annotation strategy, composition template, typography style, reading path, why it works (3-5 reusable decisions).

### 完整 DNA 搜索参考

```bash
# 按风格来源
awk -F'\t' '$2 ~ /McKinsey|麦肯锡/' data/chart-dna-index.tsv | head -10

# 按构图模板
awk -F'\t' '$11 ~ /单中心|01/' data/chart-dna-index.tsv | head -10

# 按高亮策略
awk -F'\t' '$9 ~ /高亮.*≤10/' data/chart-dna-index.tsv | head -10
```
