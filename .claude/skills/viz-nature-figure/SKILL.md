---
name: viz:nature-figure
description: >-
  Nature/顶刊级学术图表工作流，支持 Python 和 R。适用于创建、修改、审查、精修论文插图、多面板科学图表、期刊级 SVG/PDF/TIFF 输出。绘图前先定义图表结论、证据逻辑、导出需求与审查风险。支持 matplotlib/seaborn 和 ggplot2/patchwork/ComplexHeatmap。
---

# Nature Figure Making Skill

A guide for producing publication-quality scientific figures as a visual argument, not
as isolated pretty plots. Every figure starts from a claim, an evidence hierarchy, and a
review-risk check before code or aesthetics.

The older Python/matplotlib rules in this skill remain valid. The skill now also supports
R, especially `ggplot2 + patchwork + ComplexHeatmap + ggrepel + svglite/cairo_pdf + ragg`.
If the user provides a private plotting template collection, use it only as an internal
adaptation source and do not reveal its path, filenames, or provenance in user-facing output.

Color policy: prefer **unified method families across all panels** over maximal hue separation.
For dense Nature Machine Intelligence-style figure pages, use the low-saturation `NMI pastel`
family described in `references/api.md` and reserve green/red mainly for gains, drops, and other directional cues.

## First move: figure contract before plotting

Before generating or editing code, establish the contract below.

**Backend selection is a blocking gate.** If the user has not explicitly chosen Python
or R in the current request or provided a clearly language-specific input file/workflow,
ask one concise question: **Python or R?** Then stop and wait for the user's answer.
Do not generate mock data, write scripts, create figures, or choose Python/R by default.
This overrides general autonomy/default-execution behavior for figure tasks.

**The selected backend is exclusive for all figure generation.** Once Python or R is
selected, every plotting script, preview image, SVG/PDF/TIFF/PNG export, QA render,
and visual workaround must be produced by that same backend. Do not use Python to
draw a preview for an R figure, and do not use R to draw a preview for a Python figure,
even if the selected runtime or packages are missing locally. The non-selected language
may only be used for non-visual file inspection or data conversion when it does not
open a graphics device, import plotting libraries, create image/vector files, or
change the final visual appearance.

**Missing runtime/package rule.** After the backend is selected, check the selected
runtime early (`Rscript`/R for R; Python and required plotting packages for Python).
If the selected runtime or required packages are unavailable, stop before rendering
and report the exact blocker. You may provide a selected-backend script and installation
commands, or ask permission to install dependencies, but you must not fall back to the
other language to make a substitute figure.

Only recommend a backend when the user explicitly asks you to choose or recommend one.
In that case, use `references/backend-selection.md`, state the reason, and then proceed
with the recommended backend.

1. Core conclusion: write the one-sentence claim the figure must defend.
2. Evidence chain: map each planned panel to the claim, and drop panels that do not carry
   a unique piece of evidence.
3. Archetype: classify the figure as `quantitative grid`, `schematic-led composite`,
   `image plate + quant`, or `asymmetric mixed-modality figure`.
4. Backend: use the selected Python or R track exclusively for all figure drawing,
   previewing, exporting, and visual QA. Do not cross-render with the other language.
5. Journal/export contract: set final dimensions, editable text, source data, statistics,
   image-integrity notes, and export formats before styling.

The highest-priority rule is: **the chart serves the scientific logic**. Aesthetic polish,
template matching, and complex layout are subordinate to making the core conclusion clear,
defensible, and reviewable.

## User-facing privacy rule

Do not disclose private local paths, private filenames, chat-attachment names, internal
reference filenames, template identifiers, or the provenance of private working materials
in user-facing replies, generated code comments, figure legends, reports, or manuscript
text. Use generic descriptions such as "the provided R template collection", "a private
working draft", or "the internal figure contract". Only reveal an exact path or source
file when the user explicitly asks for that audit trail.

## Python quick-start

**Python-only execution rule.** When the user has selected Python, do all figure
drawing, previewing, exporting, and visual QA in Python. Do not call R/ggplot2,
ComplexHeatmap, patchwork, or any R graphics device to create a temporary preview,
fallback export, or layout approximation. If Python or required Python plotting
packages are missing, stop before rendering and report the missing dependency. You
may still write the Python script, provide `pip`/environment install commands, or
ask permission to install dependencies, but do not cross-render the figure in R.

```python
import matplotlib as mpl
import matplotlib.pyplot as plt

mpl.rcParams.update({
    "font.family": "sans-serif",
    "font.sans-serif": ["Arial", "Helvetica", "DejaVu Sans", "sans-serif"],
    "svg.fonttype": "none",     # editable text in SVG
    "pdf.fonttype": 42,         # editable TrueType text in PDF
    "font.size": 7,             # use 15-24 only for large slide-sized panels
    "axes.spines.right": False,
    "axes.spines.top": False,
    "axes.linewidth": 0.8,
    "legend.frameon": False,
})

def save_pub_py(fig, filename, dpi=600):
    fig.savefig(f"{filename}.svg", bbox_inches="tight")
    fig.savefig(f"{filename}.pdf", bbox_inches="tight")
    fig.savefig(f"{filename}.tiff", dpi=dpi, bbox_inches="tight")
```

Use `text.usetex = True` only when LaTeX is installed and math-rich labels are required.

## R quick-start

```r
library(ggplot2)
library(patchwork)

theme_set(
  theme_classic(base_size = 6.5, base_family = "Arial") +
    theme(
      axis.line = element_line(linewidth = 0.35, colour = "black"),
      axis.ticks = element_line(linewidth = 0.35, colour = "black"),
      legend.title = element_text(size = 6.2),
      legend.text = element_text(size = 5.8),
      strip.text = element_text(size = 6.2, face = "bold"),
      plot.title = element_text(size = 7, face = "bold"),
      panel.grid = element_blank()
    )
)

save_pub_r <- function(plot, filename, width_mm = 183, height_mm = 120, dpi = 600) {
  w <- width_mm / 25.4
  h <- height_mm / 25.4
  svglite::svglite(paste0(filename, ".svg"), width = w, height = h)
  print(plot)
  dev.off()
  grDevices::cairo_pdf(paste0(filename, ".pdf"), width = w, height = h, family = "Arial")
  print(plot)
  dev.off()
  ragg::agg_tiff(paste0(filename, ".tiff"), width = w, height = h, units = "in", res = dpi)
  print(plot)
  dev.off()
}
```

## ggplot2 扩展包生态

Nature/Science 级别图表常用 ggplot2 扩展包如下：

### 机构风格包（预置完整主题）

| 包名 | 机构 | 用途 |
|------|------|------|
| `bbplot` | BBC 新闻数据团队 | 英媒标准新闻图表，清晰层级 |
| `gglaplot` | 伦敦市政府 | 公共部门可视化规范 |
| `boeCharts` | 英格兰银行 | 金融统计图表 |
| `wbplot` | 世界银行 | 发展数据可视化 |
| `ggdc` | DataCamp | 教育场景简洁风格 |
| `INBOtheme` | 比利时自然研究所 | 科研报告配色排版 |

**使用**：`+ theme_bbc()` / `+ theme_gla()` 等

### 多图组合

| 包名 | 核心能力 |
|------|----------|
| `patchwork` | `+ /` 运算符拼接，首选 |
| `cowplot` | 统一网格 + 注释，备选 |
| `ggpubr` | 出版级美化 + 统计标注 |

### 统计标注

| 包名 | 功能 |
|------|------|
| `ggstatsplot` | 自动集成 P值、效应量 |
| `ggsignif` | 星号/横线标记组间差异 |
| `survminer` | 生存曲线与风险表（临床）|

### 文本与标签

| 包名 | 功能 |
|------|------|
| `ggtext` | 富文本标签（Markdown/HTML）|
| `ggrepel` | 智能避让标签重叠（带引导线）|

### 配色系统

| 包名 | 特点 |
|------|------|
| `ggsci` | 科研期刊调色板（Nature、Science、Cell 等）|
| `ggtech` | 科技公司风格（Airbnb、谷歌等）|
| `hrbrthemes` | 信息图高可读性主题 |

### 高级图表类型

| 包名 | 图表 |
|------|------|
| `ggalluvial` | 桑基图、分层流程图 |
| `ggridges` | 堆叠山脊密度图 |
| `graph` + `ggraph` | 网络图、树状结构 |
| `ggh4x` | 高级分面、多色标系统 |

### 动画

| 包名 | 功能 |
|------|------|
| `gganimate` | 时间序列动态图表 |

### 坐标轴扩展

| 包名 | 功能 |
|------|------|
| `ggside` | 分面图侧面辅助分布展示 |

### 安装命令

```r
install.packages(c(
  "ggplot2", "patchwork", "svglite", "ragg",  # 核心
  "ggrepel", "ggtext", "ggsci",                  # 常用增强
  "cowplot", "ggpubr", "ggsignif"                # 备选
))
```

## Default operating stance

- Start by classifying the requested figure into one of four archetypes:
  `quantitative grid`, `schematic-led composite`, `image plate + quant`, or `asymmetric mixed-modality figure`.
- Prefer one **hero panel** plus subordinate evidence panels over filling the canvas with equal-sized subplots.
- If the user asks for a single chart, still identify its role in the manuscript claim:
  discovery, mechanism, validation, comparison, robustness, or clinical/biological relevance.
- Keep the background white for plots and diagrams; switch to black only for microscopy / volume-rendering image plates.
- Prefer direct labels over legends when categories are spatially fixed or the legend would force unnecessary eye travel.
- Keep one restrained palette per figure: usually one neutral family, one signal family, and one accent family.
- Treat statistics, `n`, error-bar definitions, source-data traceability, and image-integrity notes as part of the figure,
  not as optional caption cleanup.
- When the user asks for broad `Nature` style rather than ML/NMI-specific style, read `references/nature-2026-observations.md` before choosing layout.

## 接收 viz-design 委托

当上游 viz-design 技能委托渲染时，会传递四个 md 文档路径：

| 文档 | 内容 | 如何使用 |
|------|------|---------|
| `intent.md` | 叙事意图（为什么做、想传达什么） | 理解图表的核心主张，确保 figure contract 的 core conclusion 与之一致 |
| `storyboard.md` | 视觉叙事设计（弧线、节拍、签名元素） | 提取签名视觉元素和阅读路径，映射到 figure 的 panel 布局和 emphasis |
| `spec.md` | 编译规格（数据、视觉编码、标注策略、布局） | **主要输入**：数据组织、视觉编码、标注策略、布局尺寸直接用于绘图 |
| `checklist.md` | 验收清单 | 出图后逐项对照验收 |

**执行流程**：

1. 读 `intent.md` → 确认核心主张（一句话）
2. 读 `spec.md` → 提取：数据、视觉编码（X/Y/颜色/大小映射）、标注策略（高亮点、标注内容、参考线）、布局（画布尺寸）
3. 读 `storyboard.md` → 提取签名视觉元素和阅读路径
4. 选择 Python 或 R（优先 Python，除非数据/用户指定 R）
5. 按 nature-figure 工作流执行（figure contract → 绘图 → QA）
6. **配色**：默认使用 nature-figure 自有学术配色。如 spec.md 中指定了 13-VISUALIZATION.md 色系则参考使用
7. 出图后读 `checklist.md` 逐项验收

**与 viz-design 的分工**：viz-design 做视觉决策，nature-figure 做渲染执行。viz-design 不指定 Python/R、不指定 matplotlib/ggplot2 的具体参数——这些由 nature-figure 自行决定。

## When to load this skill

- Python or R figures for **papers, slides, or reports** targeting Nature, Science, Cell, NeurIPS, ICLR, or similar venues.
- Requests involving **grouped bars, trend lines, heatmaps, radar plots, multi-panel grids**, or **PDF/SVG/high-DPI** output.
- Any mention of "Nature style", "publication figure", "paper figure", "SCI figure", "R plotting template", or "high-quality scientific plot".
- Requests to improve a figure's logic, aesthetics, panel layout, figure legend, export quality, or journal-readiness.

## When NOT to load

- Plotly, Altair, Bokeh, or other interactive/web-first plotting.
- EDA-only plots without a publication target.
- Primary workflow is 3D, GIS, or non-scientific illustration tooling.
- Illustrator / Figma–first layout.

## Related files

| File | Open when |
|------|-----------|
| [references/figure-contract.md](references/figure-contract.md) | Need to convert a user request into core conclusion, evidence hierarchy, panel map, and review-risk checks |
| [references/backend-selection.md](references/backend-selection.md) | User has not chosen Python/R, asks for a recommendation, or a mixed Python/R workflow is possible |
| [references/r-workflow.md](references/r-workflow.md) | User chooses R or provides R scripts/templates/data |
| [references/r-template-index.md](references/r-template-index.md) | Need to adapt a user-provided or private R template collection without exposing source paths |
| [references/qa-contract.md](references/qa-contract.md) | Before final delivery, revision package, microscopy/blot figure, or journal-specific audit |
| [references/design-theory.md](references/design-theory.md) | Typography, color theory, layout rationale, export policy |
| [references/api.md](references/api.md) | Python PALETTE, helper function signatures, validation rules |
| [references/common-patterns.md](references/common-patterns.md) | Python layout patterns: hero panels, legend-only axes, dark image plates, asymmetric layouts |
| [references/nature-2026-observations.md](references/nature-2026-observations.md) | Real `Nature` page archetypes: schematic-led composites, dark image plates, clinical triptychs, asymmetric hero layouts |
| [references/tutorials.md](references/tutorials.md) | End-to-end walkthroughs: bars, trends, heatmaps |
| [references/chart-types.md](references/chart-types.md) | Radar, 3D sphere, fill_between, scatter patterns |
