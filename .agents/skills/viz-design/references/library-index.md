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

## Phase 1: 意图决策（对应 SKILL.md Phase 1）

- `consulting-style-guide.md`
  - Use to determine the overall visual style (formal/casual/editorial/hand-drawn) before choosing a pattern.
- `concept-pattern-map.md`
  - Use when the input is an abstract concept (not data) and you need the concept→pattern mapping.
- `consulting-archetypes.md`
  - Use when the input requires logical decomposition (MECE, waterfall, 2x2, issue tree, etc.).
- `consulting-workflow.md`
  - Use when the input is arbitrary text/data and you need the full consulting-chart workflow.
- `dna-index-ai.md`
  - Use for fast AI decision — aggregated by intent, one read gives recommended chart + best case ID.
- `pattern-index.md`
  - Use for 88 pattern quick lookup — organized by "what do you want to express", not by chart type.
- `decision-rules.md`
  - Use when selecting a pattern — boundary cases and ambiguous inputs.

## Phase 2: 故事板（对应 SKILL.md Phase 2）

- `aesthetic-spells.md`
  - Use when user mentions AI aesthetic concepts (新极简/高级感/低饱和/留白/卡片式) or wants "高级但不冰冷" style. Maps 12 spells to viz-design parameters.
- `scene-thesis-db.md`
  - Use when designing a single chart scene — one-sentence thesis + signature element + restraint statement for 28 common visualization scenarios.
- `style-schools.md`
  - Use to select the overall visual style school (McKinsey, FT, Bloomberg, Excalidraw, etc.).
- `opening-archetypes.md`
  - Use when designing the "first chart" — the opening skeleton that sets the tone. **15 types**.
- `narrative-arcs.md`
  - Use when the task requires multiple charts — pick the narrative arc and chart sequence. **32 types**.
- `visual-beats.md`
  - Use for single-chart visual beat design — reading path, emphasis technique, entrance rhythm. **25 types**.
- `layout-selector.md`
  - Use AFTER chart type is chosen — maps scenario to one of 40 layout templates + interpretation strategy. **Auto-selected by intent + data density.**
- `composition-templates.md`
  - Use to select the canvas layout and region division. **40 types** (13 base + 27 extended).
- `color-themes.md`
  - Use to pick the color theme — 25 presets with hex ramps and semantic colors.
- `typography-moods.md`
  - Use to select font pairings by mood and scenario.
- `section-archetypes.md`
  - Use for chart function variants — organized by function category with recommended/alternative patterns and selection decision tree.

## Phase 3: 技术规范（对应 SKILL.md Phase 3）

- `spec-template.md`
  - Use for the 12-item SPEC template + full example.
- `consulting-quality-gates.md`
  - Use after SPEC writing — 12-question quality gate.

## Phase 4: 渲染 + 验收（对应 SKILL.md Phase 4）

- `design-principles.md`
  - Use during Phase 4 减法 + 验收 — 视觉层级铁律、六步出图法、减法 8 问清单、文字 7 角色、设计原则速查
- `execution-steps.md`
  - Use for the six-layer drawing method + chart skeleton coordinates.
- `visual-guidance-elements.md`
  - Use for arrows, annotations, baseline specs, icon guidelines.
- `anti-patterns.md`
  - Use before declaring done — common AI error patterns by chart type.
- `verification-standards.md`
  - Use for McKinsey/BCG-grade quality acceptance criteria.
- `chart-validity-gate.md`
  - Use after pattern selection, before rendering — quality gate for chart validity.

## 渲染资产

| 参考文件 | 何时读 |
|----------|--------|
| **echarts-recipes.md** | 写 ECharts 图表时 — 完整主题配置、色值、API 映射、16 项验证清单 |
| **dna-playbook.md** | DNA 匹配后速查 — 每个 DNA 场景的 ECharts 完整 option |
| **auto-selector.md** | Phase 2 自动选择器（风格/配色/字体） |

**色系统一**：全阶段使用 ECharts 手法对照表（echarts-recipes.md）中的 Warm/Stone/Teal 三色系，不新增任何颜色。

---

## 中间文件模板

| 文件 | 模板路径 | 用途 |
|------|---------|------|
| intent.md | templates/intent.md | 意图决策 |
| storyboard.md | templates/storyboard.md | 视觉叙事设计 |
| spec.md | templates/spec.md | 设计规格 |
| checklist.md | templates/checklist.md | 验收清单 |

---

## 未归类文件

| 文件 | 用途 | 状态 |
|------|------|------|
| `delegation-examples.md` | 委托渲染示例（标准 JSON 格式） | 备用 |
| `usage-examples.md` | 三种入口模式典型用法 | 备用 |
| `composition-templates-extended.md` | 27 种扩展构图模板（编号 14-40） | 被 composition-templates.md 引用 |
