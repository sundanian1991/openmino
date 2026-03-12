---
name: baoyu-slide-deck
description: |
  从内容生成专业幻灯片图像。

  当用户需要以下内容时使用此技能：
  - "创建幻灯片"、"做 presentation"、"generate deck"、"slide deck"、"PPT"
  - 将文章/文档转换为幻灯片
  - 需要带视觉风格的图像输出（而非 HTML）

  即使没有明确说"用 baoyu-slide-deck"，只要涉及幻灯片图像生成、PPT 创建就应触发此技能。
---

# Slide Deck Generator

Transform content into professional slide deck images.

## Usage

```bash
/baoyu-slide-deck path/to/content.md
/baoyu-slide-deck path/to/content.md --style sketch-notes
/baoyu-slide-deck path/to/content.md --audience executives
/baoyu-slide-deck path/to/content.md --lang zh
/baoyu-slide-deck path/to/content.md --slides 10
/baoyu-slide-deck path/to/content.md --outline-only
/baoyu-slide-deck  # Then paste content
```

## Script Directory

**Agent Execution Instructions**:
1. Determine this SKILL.md file's directory path as `SKILL_DIR`
2. Script path = `${SKILL_DIR}/scripts/<script-name>.ts`

| Script | Purpose |
|--------|---------|
| `scripts/merge-to-pptx.ts` | Merge slides into PowerPoint |
| `scripts/merge-to-pdf.ts` | Merge slides into PDF |

## Options

| Option | Description |
|--------|-------------|
| `--style <name>` | Visual style: preset name, `custom`, or custom style name |
| `--audience <type>` | Target: beginners, intermediate, experts, executives, general |
| `--lang <code>` | Output language (en, zh, ja, etc.) |
| `--slides <number>` | Target slide count (8-25 recommended, max 30) |
| `--outline-only` | Generate outline only, skip image generation |
| `--prompts-only` | Generate outline + prompts, skip images |
| `--images-only` | Generate images from existing prompts directory |
| `--regenerate <N>` | Regenerate specific slide(s): `--regenerate 3` or `--regenerate 2,5,8` |

**Slide Count by Content Length**:
| Content | Slides |
|---------|--------|
| < 1000 words | 5-10 |
| 1000-3000 words | 10-18 |
| 3000-5000 words | 15-25 |
| > 5000 words | 20-30 (consider splitting) |

## Style System

**Presets**: 17 种样式预设（blueprint、chalkboard、corporate、minimal、sketch-notes 等）

**Dimensions**: 4 个维度（Texture、Mood、Typography、Density）

**Auto Selection**: 基于内容信号自动推荐样式

> **详细参考**: `references/styles.md` — 完整预设列表、维度说明、自动选择规则

## Design Philosophy

Decks designed for **reading and sharing**, not live presentation:
- Each slide self-explanatory without verbal commentary
- Logical flow when scrolling
- All necessary context within each slide
- Optimized for social media sharing

> **详细参考**:
> - `references/design-philosophy.md` — 受众原则、视觉层次、内容密度、颜色排版
> - `references/layouts.md` — 布局选项（如后续创建）

## File Management

### Output Directory

```
slide-deck/{topic-slug}/
├── source-{slug}.{ext}
├── outline.md
├── prompts/
│   └── 01-slide-cover.md, 02-slide-{slug}.md, ...
├── 01-slide-cover.png, 02-slide-{slug}.png, ...
├── {topic-slug}.pptx
└── {topic-slug}.pdf
```

**Slug**: Extract topic (2-4 words, kebab-case). Example: "Introduction to Machine Learning" → `intro-machine-learning`

**Conflict Handling**: See Step 1.3 for existing content detection and user options.

## Language Handling

**Detection Priority**:
1. `--lang` flag (explicit)
2. EXTEND.md `language` setting
3. User's conversation language (input language)
4. Source content language

**Rule**: ALL responses use user's preferred language:
- Questions and confirmations
- Progress reports
- Error messages
- Completion summaries

Technical terms (style names, file paths, code) remain in English.

## Workflow

Copy this checklist and check off items as you complete them:

```
Slide Deck Progress:
- [ ] Step 1: Setup & Analyze
  - [ ] 1.1 Load preferences
  - [ ] 1.2 Analyze content
  - [ ] 1.3 Check existing ⚠️ REQUIRED
- [ ] Step 2: Confirmation ⚠️ REQUIRED (Round 1, optional Round 2)
- [ ] Step 3: Generate outline
- [ ] Step 4: Review outline (conditional)
- [ ] Step 5: Generate prompts
- [ ] Step 6: Review prompts (conditional)
- [ ] Step 7: Generate images
- [ ] Step 8: Merge to PPTX/PDF
- [ ] Step 9: Output summary
```

### Flow

```
Input → Preferences → Analyze → [Check Existing?] → Confirm (1-2 rounds) → Outline → [Review Outline?] → Prompts → [Review Prompts?] → Images → Merge → Complete
```

**详细 9 步流程**: `references/workflow-guide.md` — 包含每步详细操作、AskUserQuestion 模板、部分工作流、修改指南

## Partial Workflows

| Option | Workflow |
|--------|----------|
| `--outline-only` | Steps 1-3 only (stop after outline) |
| `--prompts-only` | Steps 1-5 (generate prompts, skip images) |
| `--images-only` | Skip to Step 7 (requires existing prompts/) |
| `--regenerate N` | Regenerate specific slide(s) only |

## References

| File | Content |
|------|---------|
| `references/styles.md` | 样式预设、维度、自动选择规则 |
| `references/design-philosophy.md` | 设计理念、受众原则、视觉层次、内容密度 |
| `references/workflow-guide.md` | 完整 9 步流程、部分工作流、修改指南 |
| `references/analysis-framework.md` | 内容分析框架 |
| `references/outline-template.md` | Outline 结构和格式 |
| `references/modification-guide.md` | 编辑、添加、删除幻灯片流程 |
| `references/content-rules.md` | 内容和样式指南 |
| `references/design-guidelines.md` | 受众、排版、颜色、视觉元素 |
| `references/layouts.md` | 布局选项和选择建议 |
| `references/base-prompt.md` | 图像生成基础提示词 |
| `references/dimensions/*.md` | 维度规格（texture、mood、typography、density） |
| `references/dimensions/presets.md` | 预设 → 维度映射 |
| `references/config/preferences-schema.md` | EXTEND.md 结构 |

## Notes

- Image generation: 10-30 seconds per slide
- Auto-retry once on generation failure
- Use stylized alternatives for sensitive public figures
- Maintain style consistency via session ID
- **Step 2 confirmation required** - do not skip (style, audience, slides, outline review, prompt review)
- **Step 4 conditional** - only if user requested outline review in Step 2
- **Step 6 conditional** - only if user requested prompt review in Step 2

## Extension Support

Custom configurations via EXTEND.md. See Step 1.1 for paths and supported options.
