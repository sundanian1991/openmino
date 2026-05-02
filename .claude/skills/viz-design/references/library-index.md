# Library Index

Use this file to decide what to read next. Load the smallest useful subset.

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

## Phase 4: Composition + Color + Typography

- `composition-templates.md`
  - Use to select the canvas layout and region division. **20 types**.
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

### Search Examples

```bash
# Find all McKinsey-style chart DNAs
awk -F'\t' '$13 ~ /McKinsey|麦肯锡/' data/chart-dna-index.tsv | head -10

# Find funnel/conversion charts
awk -F'\t' '$3 ~ /漏斗|funnel/' data/chart-dna-index.tsv | head -10

# Find dark-themed chart DNAs
awk -F'\t' '$7 ~ /dark|深色/' data/chart-dna-index.tsv | head -10

# Find charts with high-contrast highlights
awk -F'\t' '$8 ~ /高亮.*≤10/' data/chart-dna-index.tsv | head -10

# Find radar/radar-style charts
awk -F'\t' '$2 ~ /雷达|radar/' data/chart-dna-index.tsv | head -10

# Find charts suitable for executive presentations
awk -F'\t' '$13 ~ /高管|executive|麦肯锡/' data/chart-dna-index.tsv | head -10
```

## Suggested DNA Search

### Bash / macOS / Linux

```bash
# Find McKinsey-style chart DNA entries
awk -F'\t' '$13 ~ /McKinsey|麦肯锡/' data/chart-dna-index.tsv | head -10

# Find funnel charts with bottleneck annotations
awk -F'\t' '$3 ~ /漏斗/ && $9 ~ /瓶颈/' data/chart-dna-index.tsv | head -10

# Find warm-colored, minimalist charts
awk -F'\t' '$6 ~ /warm|暖色/ && $13 ~ /极简|minimal/' data/chart-dna-index.tsv | head -10
```

### PowerShell

```powershell
Import-Csv data/chart-dna-index.tsv -Delimiter "`t" |
  Where-Object { $_.style -match "McKinsey|麦肯锡" } |
  Select-Object -First 10
```
