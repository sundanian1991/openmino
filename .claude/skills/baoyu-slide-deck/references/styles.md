---
input: baoyu-slide-deck 幻灯片样式选择需求
output: 样式预设、维度、自动选择规则
pos: .claude/skills/baoyu-slide-deck/references/styles.md

# Style System — baoyu-slide-deck

> 完整样式预设、维度和自动选择规则


## 样式预设 (Presets)

| Preset | Dimensions | Best For |
|--------|------------|----------|
| `blueprint` (Default) | grid + cool + technical + balanced | Architecture, system design |
| `chalkboard` | organic + warm + handwritten + balanced | Education, tutorials |
| `corporate` | clean + professional + geometric + balanced | Investor decks, proposals |
| `minimal` | clean + neutral + geometric + minimal | Executive briefings |
| `sketch-notes` | organic + warm + handwritten + balanced | Educational, tutorials |
| `watercolor` | organic + warm + humanist + minimal | Lifestyle, wellness |
| `dark-atmospheric` | clean + dark + editorial + balanced | Entertainment, gaming |
| `notion` | clean + neutral + geometric + dense | Product demos, SaaS |
| `bold-editorial` | clean + vibrant + editorial + balanced | Product launches, keynotes |
| `editorial-infographic` | clean + cool + editorial + dense | Tech explainers, research |
| `fantasy-animation` | organic + vibrant + handwritten + minimal | Educational storytelling |
| `intuition-machine` | clean + cool + technical + dense | Technical docs, academic |
| `pixel-art` | pixel + vibrant + technical + balanced | Gaming, developer talks |
| `scientific` | clean + cool + technical + dense | Biology, chemistry, medical |
| `vector-illustration` | clean + vibrant + humanist + balanced | Creative, children's content |
| `vintage` | paper + warm + editorial + balanced | Historical, heritage |


## 样式维度 (Dimensions)

| Dimension | Options | Description |
|-----------|---------|-------------|
| **Texture** | clean, grid, organic, pixel, paper | Visual texture and background treatment |
| **Mood** | professional, warm, cool, vibrant, dark, neutral | Color temperature and palette style |
| **Typography** | geometric, humanist, handwritten, editorial, technical | Headline and body text styling |
| **Density** | minimal, balanced, dense | Information density per slide |


## 自动样式选择 (Auto Style Selection)

| Content Signals | Preset |
|-----------------|--------|
| tutorial, learn, education, guide, beginner | `sketch-notes` |
| classroom, teaching, school, chalkboard | `chalkboard` |
| architecture, system, data, analysis, technical | `blueprint` |
| creative, children, kids, cute | `vector-illustration` |
| briefing, academic, research, bilingual | `intuition-machine` |
| executive, minimal, clean, simple | `minimal` |
| saas, product, dashboard, metrics | `notion` |
| investor, quarterly, business, corporate | `corporate` |
| launch, marketing, keynote, magazine | `bold-editorial` |
| entertainment, music, gaming, atmospheric | `dark-atmospheric` |
| explainer, journalism, science communication | `editorial-infographic` |
| story, fantasy, animation, magical | `fantasy-animation` |
| gaming, retro, pixel, developer | `pixel-art` |
| biology, chemistry, medical, scientific | `scientific` |
| history, heritage, vintage, expedition | `vintage` |
| lifestyle, wellness, travel, artistic | `watercolor` |
| **Default** | `blueprint` |


## 何时读取

**主 SKILL.md 使用**：
- 用户在 Step 2 选择样式预设时
- 需要自动推荐样式时（基于内容信号）

**自定义维度时**：
- 用户选择"Custom dimensions"后，读取对应维度文件
- 维度文件位置：`references/dimensions/`（如后续创建）


*最后更新：2026-03-12 — 从 SKILL.md 拆分*

