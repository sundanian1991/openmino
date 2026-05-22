# 技能重复清单 — 2026-05-05 体检发现

## A. 跨目录重复（39 个）

> 同名的技能同时存在于 `~/.claude/skills/`（全局）和 `.claude/skills/`（项目）。
> **建议**：保留项目级，从全局删除；或反之。不要两处都有。

| 技能名 | 全局 | 项目 | 建议保留 |
|--------|------|------|----------|
| agent-browser | ✓ | ✓ | 项目（按需） |
| baoyu-slide-deck | ✓ | ✓ | 看 B 组判定 |
| doc-kami | ✓ | ✓ | 项目（高频） |
| docx | ✓ | ✓ | 看 B 组判定 |
| download-anything | ✓ | ✓ | 全局 |
| fe-frontend | ✓ | ✓ | 项目（有 fe-mino） |
| other-algorithmic | ✓ | ✓ | 全局 |
| other-deep | ✓ | ✓ | 全局 |
| other-devex | ✓ | ✓ | 全局 |
| other-karpathy | ✓ | ✓ | 全局 |
| other-longterm | ✓ | ✓ | 全局 |
| other-ppocr | ✓ | ✓ | 全局 |
| pdf | ✓ | ✓ | 看 B 组判定 |
| ppt-aham | ✓ | ✓ | 看 B 组判定 |
| ppt-ian | ✓ | ✓ | 看 B 组判定 |
| ppt-slides | ✓ | ✓ | 看 B 组判定 |
| pptx | ✓ | ✓ | 看 B 组判定 |
| presentation-skill | ✓ | ✓ | 看 B 组判定 |
| skill-creator | ✓ | ✓ | 项目（按需） |
| task-alignment | ✓ | ✓ | 项目（核心） |
| task-implement | ✓ | ✓ | 项目（核心） |
| think-structured | ✓ | ✓ | 全局 |
| tool-baoyu-info | ✓ | ✓ | 全局 |
| tool-imagemagick | ✓ | ✓ | 全局 |
| tool-workflow | ✓ | ✓ | 全局 |
| ultra-research | ✓ | ✓ | 全局 |
| viz-data | ✓ | ✓ | 看 B 组判定 |
| viz-echarts | ✓ | ✓ | 项目（核心） |
| viz-hue | ✓ | ✓ | 全局 |
| waza-check | ✓ | ✓ | 项目（按需） |
| waza-design | ✓ | ✓ | 项目（按需） |
| waza-health | ✓ | ✓ | 全局（偶尔用） |
| waza-hunt | ✓ | ✓ | 全局（偶尔用） |
| waza-learn | ✓ | ✓ | 全局 |
| waza-read | ✓ | ✓ | 项目（按需） |
| waza-think | ✓ | ✓ | 全局 |
| waza-write | ✓ | ✓ | 全局 |
| workspace-tidy | ✓ | ✓ | 项目（按需） |
| xlsx | ✓ | ✓ | 看 B 组判定 |

## B. 项目内部功能重复（不同名字，重叠功能）

### B1. PPT/幻灯片（13 个）

| 技能 | 功能 | 保留建议 |
|------|------|----------|
| ppt-aham | 全流程 PPT | **保留**（核心） |
| ppt-html | HTML PPT | **保留**（另一种风格） |
| ppt-ian | 手绘风 PPT | **保留**（独特风格） |
| ppt-slides | 动画 HTML 幻灯片 | **保留** |
| ppt-presentation | 演讲脚本+HTML 幻灯片 | 和 ppt-slides 重叠，**二选一** |
| presentation-skill | 演讲脚本+PPT | 和 ppt-presentation 几乎相同，**删除** |
| baoyu-slide-deck | 从内容生成幻灯片图片 | 低频，移至全局 |
| ian-handdrawn-ppt | 手绘风 | 和 ppt-ian 完全重复，**删除** |
| ppt-deck-builder | 生成幻灯片 | 低频，移至全局 |
| ppt-guizang | 杂志风 HTML PPT | 低频，移至全局 |
| pptx | PPT 高级操作 | 保留（编辑现有 PPTX） |
| doc-kami | 文档排版 | 保留（多类型文档） |
| docx | Word 操作 | 与 PPT 不重叠，保留 |

### B2. Excel（3 个）

| 技能 | 功能 | 保留建议 |
|------|------|----------|
| xlsx | 综合表格 | **保留**（项目核心） |
| mini-xlsx | OpenXML SDK | **保留**（和 docx/mini-docx 配套） |
| tool-xlsx | 基础表格 | 功能最弱，**删除** |

### B3. DOC/PDF（6 个）

| 技能 | 功能 | 保留建议 |
|------|------|----------|
| docx | Word 综合 | **保留** |
| mini-docx | OpenXML SDK | **保留**（特定格式场景） |
| doc-kami | 文档排版 | **保留** |
| doc-official | 公文 | **保留**（独特功能） |
| pdf | PDF 综合 | **保留** |
| doc-pdf | PDF 工具包 | 和 pdf 重叠，**二选一** |
| doc-neat-freak | 会话结束清理 | 低频，移至全局 |

### B4. 可视化（12 个）

| 技能 | 功能 | 保留建议 |
|------|------|----------|
| viz-design | 可视化设计器（上游） | **保留**（核心编排） |
| viz-echarts | ECharts 渲染 | **保留**（核心渲染） |
| viz-svg-flow | SVG 流程图 | **保留** |
| viz-chart | Chart.js 渲染 | **保留** |
| viz-data | 数据分析 | **保留** |
| viz-data-story | 数据叙事 | **保留** |
| viz-data-viz | 图表选择 | 和 viz-design 重叠，**删除** |
| viz-editorial | 杂志信息海报 | 低频，移至全局 |
| viz-infographic | AntV 信息图 | 低频，移至全局 |
| viz-narrative | T8 叙事 | 低频，移至全局 |
| viz-claude | ？ | 检查后决定 |
| viz-hue | 设计语言生成 | 低频，移至全局 |

## C. 快速操作脚本

### 方案 1：清理跨目录重复（删除全局端的 39 个）

```bash
# 先备份
mkdir -p ~/.claude/skills-backup/
# 删除全局端已存在于项目的重复技能
for skill in agent-browser baoyu-slide-deck doc-kami docx download-anything fe-frontend other-algorithmic other-deep other-devex other-karpathy other-longterm other-ppocr pdf ppt-aham ppt-ian ppt-slides pptx presentation-skill skill-creator task-alignment task-implement think-structured tool-baoyu-info tool-imagemagick tool-workflow ultra-research viz-data viz-echarts viz-hue waza-check waza-design waza-health waza-hunt waza-learn waza-read waza-think waza-write workspace-tidy xlsx; do
  mv ~/.claude/skills/$skill ~/.claude/skills-backup/$skill 2>/dev/null
done
echo "Done. $(ls ~/.claude/skills-backup/ | wc -l) skills moved to backup."
```

### 方案 2：项目内部删除明确重复

```bash
# 先备份
mkdir -p .claude/skills-backup/
for skill in ian-handdrawn-ppt presentation-skill ppt-deck-builder ppt-guizang tool-xlsx viz-data-viz; do
  mv .claude/skills/$skill .claude/skills-backup/$skill 2>/dev/null
done
echo "Done. $(ls .claude/skills-backup/ | wc -l) skills moved to backup."
```

### 方案 3：低频技能移至全局

```bash
for skill in other-algorithmic other-deep other-karpathy other-lenny viz-hue viz-editorial viz-infographic viz-narrative waza-learn waza-write waza-think other-ppocr tool-baoyu-info tool-imagemagick; do
  mv .claude/skills/$skill ~/.claude/skills/$skill 2>/dev/null
done
echo "Done. Skills moved to global."
```

> **建议操作顺序**：先方案 1（清理跨目录重复）→ 再方案 2（删除明确重复）→ 最后方案 3（瘦身）
> 每次操作后确认技能可正常触发再进入下一步。
> 所有操作都是 mv 而非 rm，可随时恢复。
