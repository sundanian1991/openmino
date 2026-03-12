---
input: baoyu-slide-deck 幻灯片生成工作流需求
output: 9 步完整流程、部分工作流、修改指南
pos: .claude/skills/baoyu-slide-deck/references/workflow-guide.md

# Workflow Guide — baoyu-slide-deck

> 完整 9 步工作流程 + 部分工作流 + 修改指南


## 完整工作流 (9 Steps)

```
Input → Preferences → Analyze → [Check Existing?] → Confirm (1-2 rounds) → Outline → [Review Outline?] → Prompts → [Review Prompts?] → Images → Merge → Complete
```

### Step 1: Setup & Analyze

#### 1.1 加载偏好 (EXTEND.md)

**优先级顺序**：
1. 项目级：`.baoyu-skills/baoyu-slide-deck/EXTEND.md`
2. 用户级：`$HOME/.baoyu-skills/baoyu-slide-deck/EXTEND.md`

**检测命令**：
```bash
# Check project-level first
test -f .baoyu-skills/baoyu-slide-deck/EXTEND.md && echo "project"

# Then user-level
test -f "$HOME/.baoyu-skills/baoyu-slide-deck/EXTEND.md" && echo "user"
```

**EXTEND.md 支持**：
- Preferred style（预设或自定义）
- Custom dimensions
- Default audience
- Language preference
- Review preference（outline/prompt 审查开关）

**找到 EXTEND.md 时输出**：
```
📋 Loaded preferences from [full path]
├─ Style: [preset/custom name]
├─ Audience: [audience or "auto-detect"]
├─ Language: [language or "auto-detect"]
└─ Review: [enabled/disabled]
```

#### 1.2 分析内容

1. 保存源内容（如为粘贴则保存为 `source.md`）
2. 分析内容信号以推荐样式
3. 检测源语言
4. 确定推荐幻灯片数量
5. 生成主题 slug

#### 1.3 检查现有内容 ⚠️ REQUIRED

**必须执行**：
```bash
test -d "slide-deck/{topic-slug}" && echo "exists"
```

**如目录存在**，使用 AskUserQuestion：
```
header: "Existing"
question: "Existing content found. How to proceed?"
options:
  - label: "Regenerate outline"
    description: "Keep images, regenerate outline only"
  - label: "Regenerate images"
    description: "Keep outline, regenerate images only"
  - label: "Backup and regenerate"
    description: "Backup to {slug}-backup-{timestamp}, then regenerate all"
  - label: "Exit"
    description: "Cancel, keep existing content unchanged"
```

**保存到 `analysis.md`**：
- Topic, audience, content signals
- Recommended style
- Recommended slide count
- Language detection


### Step 2: Confirmation ⚠️ REQUIRED

**两轮确认**：第一轮必须，第二轮仅在"Custom dimensions"时触发

**显示摘要**：
- Content type + topic
- Language
- Recommended style
- Recommended slides

#### Round 1（必须）

**5 个问题全部使用 AskUserQuestion**：

**Q1: Style**
```
header: "Style"
question: "Which visual style for this deck?"
options:
  - label: "{recommended_preset} (Recommended)"
    description: "Best match based on content analysis"
  - label: "{alternative_preset}"
    description: "[alternative 描述]"
  - label: "Custom dimensions"
    description: "Choose texture, mood, typography, density separately"
```

**Q2: Audience**
```
header: "Audience"
question: "Who is the primary reader?"
options:
  - label: "General readers (Recommended)"
    description: "Broad appeal, accessible content"
  - label: "Beginners/learners"
    description: "Educational focus, clear explanations"
  - label: "Experts/professionals"
    description: "Technical depth, domain knowledge"
  - label: "Executives"
    description: "High-level insights, minimal detail"
```

**Q3: Slide Count**
```
header: "Slides"
question: "How many slides?"
options:
  - label: "{N} slides (Recommended)"
    description: "Based on content length"
  - label: "Fewer ({N-3} slides)"
    description: "More condensed, less detail"
  - label: "More ({N+3} slides)"
    description: "More detailed breakdown"
```

**Q4: Review Outline**
```
header: "Outline"
question: "Review outline before generating prompts?"
options:
  - label: "Yes, review outline (Recommended)"
    description: "Review slide titles and structure"
  - label: "No, skip outline review"
    description: "Proceed directly to prompt generation"
```

**Q5: Review Prompts**
```
header: "Prompts"
question: "Review prompts before generating images?"
options:
  - label: "Yes, review prompts (Recommended)"
    description: "Review image generation prompts"
  - label: "No, skip prompt review"
    description: "Proceed directly to image generation"
```

#### Round 2（仅当选择"Custom dimensions"）

**4 个维度问题**：

**Q1: Texture**
```
header: "Texture"
question: "Which visual texture?"
options:
  - label: "clean"
    description: "Pure solid color, no texture"
  - label: "grid"
    description: "Subtle grid overlay, technical"
  - label: "organic"
    description: "Soft textures, hand-drawn feel"
  - label: "pixel"
    description: "Chunky pixels, 8-bit aesthetic"
```

**Q2: Mood**
```
header: "Mood"
question: "Which color mood?"
options:
  - label: "professional"
    description: "Cool-neutral, navy/gold"
  - label: "warm"
    description: "Earth tones, friendly"
  - label: "cool"
    description: "Blues, grays, analytical"
  - label: "vibrant"
    description: "High saturation, bold"
```

**Q3: Typography**
```
header: "Typography"
question: "Which typography style?"
options:
  - label: "geometric"
    description: "Modern sans-serif, clean"
  - label: "humanist"
    description: "Friendly, readable"
  - label: "handwritten"
    description: "Marker/brush, organic"
  - label: "editorial"
    description: "Magazine style, dramatic"
```

**Q4: Density**
```
header: "Density"
question: "Information density?"
options:
  - label: "balanced (Recommended)"
    description: "2-3 key points per slide"
  - label: "minimal"
    description: "One focus point, maximum whitespace"
  - label: "dense"
    description: "Multiple data points, compact"
```

**确认后**：
1. 更新 `analysis.md`  with confirmed preferences
2. 存储 `skip_outline_review` 标志
3. 存储 `skip_prompt_review` 标志


### Step 3: Generate Outline

**样式解析**：
- 预设 → 读取 `references/styles.md`
- 自定义维度 → 读取对应维度文件并组合

**生成**：
1. 遵循 `references/outline-template.md`
2. 构建 STYLE_INSTRUCTIONS
3. 应用 confirmed audience, language, slide count
4. 保存为 `outline.md`

**完成后**：
- 如 `--outline-only` → 停止
- 如 `skip_outline_review` 为 true → 跳至 Step 5
- 否则 → 继续 Step 4


### Step 4: Review Outline（条件）

**跳过条件**：用户在 Step 2 选择"No, skip outline review"

**显示**：
- Total slides: N
- Style
- Slide-by-slide summary table:

```
| # | Title | Type | Layout |
|---|-------|------|--------|
| 1 | [title] | Cover | title-hero |
| 2 | [title] | Content | [layout] |
| ... | ... | ... | ... |
```

**AskUserQuestion**：
```
header: "Confirm"
question: "Ready to generate prompts?"
options:
  - label: "Yes, proceed (Recommended)"
    description: "Generate image prompts"
  - label: "Edit outline first"
    description: "I'll modify outline.md before continuing"
  - label: "Regenerate outline"
    description: "Create new outline with different approach"
```


### Step 5: Generate Prompts

1. 读取 `references/base-prompt.md`
2. 对 outline 中每张幻灯片：
   - 从 outline 提取 STYLE_INSTRUCTIONS
   - 添加幻灯片特定内容
   - 如指定 Layout，包含来自 `references/layouts.md` 的指南
3. 保存到 `prompts/` 目录

**完成后**：
- 如 `--prompts-only` → 停止
- 如 `skip_prompt_review` 为 true → 跳至 Step 7
- 否则 → 继续 Step 6


### Step 6: Review Prompts（条件）

**跳过条件**：用户在 Step 2 选择"No, skip prompt review"

**显示**：
- Total prompts: N
- Style
- Prompt list table

**AskUserQuestion**：
```
header: "Confirm"
question: "Ready to generate slide images?"
options:
  - label: "Yes, proceed (Recommended)"
    description: "Generate all slide images"
  - label: "Edit prompts first"
    description: "I'll modify prompts before continuing"
  - label: "Regenerate prompts"
    description: "Create new prompts with different approach"
```


### Step 7: Generate Images

**`--images-only`**：直接从现有 prompts 开始

**`--regenerate N`**：仅重新生成指定幻灯片

**标准流程**：
1. 选择可用图像生成技能
2. 生成 session ID: `slides-{topic-slug}-{timestamp}`
3. 顺序生成每张幻灯片，使用相同 session ID
4. 报告进度："Generated X/N"
5. 失败时自动重试一次


### Step 8: Merge to PPTX and PDF

```bash
npx -y bun ${SKILL_DIR}/scripts/merge-to-pptx.ts <slide-deck-dir>
npx -y bun ${SKILL_DIR}/scripts/merge-to-pdf.ts <slide-deck-dir>
```


### Step 9: Output Summary

```
Slide Deck Complete!

Topic: [topic]
Style: [preset name or custom dimensions]
Location: [directory path]
Slides: N total

- 01-slide-cover.png - Cover
- 02-slide-intro.png - Content
- ...
- {NN}-slide-back-cover.png - Back Cover

Outline: outline.md
PPTX: {topic-slug}.pptx
PDF: {topic-slug}.pdf
```


## 部分工作流 (Partial Workflows)

| Option | Workflow |
|--------|----------|
| `--outline-only` | Steps 1-3 only（生成 outline 后停止） |
| `--prompts-only` | Steps 1-5（生成 prompts，跳过图像） |
| `--images-only` | Skip to Step 7（需要现有 prompts/） |
| `--regenerate N` | 仅重新生成指定幻灯片 |


## 幻灯片修改指南

### 快速参考

| Action | Command | Manual Steps |
|--------|---------|--------------|
| **Edit** | `--regenerate N` | Update prompt → Regenerate image → Regenerate PDF |
| **Add** | Manual | Create prompt → Generate image → Renumber → Update outline → Regenerate PDF |
| **Delete** | Manual | Remove files → Renumber → Update outline → Regenerate PDF |

### 编辑单张幻灯片

1. 更新 `prompts/NN-slide-{slug}.md`
2. 运行：`/baoyu-slide-deck <dir> --regenerate N`
3. 或手动重新生成图像 + PDF

### 添加新幻灯片

1. 在位置 N 创建 prompt：`prompts/NN-slide-{new-slug}.md`
2. 使用相同 session ID 生成图像
3. **重新编号**：后续文件 NN+1（slug 不变）
4. 更新 `outline.md`
5. 重新生成 PPTX/PDF

### 删除幻灯片

1. 移除 `NN-slide-{slug}.png` 和 `prompts/NN-slide-{slug}.md`
2. **重新编号**：后续文件 NN-1（slug 不变）
3. 更新 `outline.md`
4. 重新生成 PPTX/PDF

### 文件命名

格式：`NN-slide-[slug].png`
- `NN`: 两位数字序号（01, 02, ...）
- `slug`: 短横线命名（2-5 词，唯一）

**重新编号规则**：仅 NN 变化，slug 保持不变


## 何时读取

**主 SKILL.md 使用**：
- 执行完整 9 步流程时
- 用户使用 `--outline-only`、`--prompts-only`、`--images-only`、`--regenerate` 选项时
- 需要修改现有幻灯片时

**配合文件**：
- `references/outline-template.md` — Outline 结构
- `references/base-prompt.md` — 图像生成提示词基础模板
- `references/layouts.md` — 布局选项（如后续创建）


*最后更新：2026-03-12 — 从 SKILL.md 拆分*

