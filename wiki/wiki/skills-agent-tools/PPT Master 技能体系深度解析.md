# PPT Master 技能体系深度解析

> Sources: mino, 2026-04-28
> Raw: ../../raw/workspace-skills/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-23-技能-ppt-master下载-20260409-CLAUDE.md; ../../raw/workspace-skills/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-23-技能-ppt-master下载-20260409-README_CN.md; ../../raw/workspace-skills/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-23-技能-ppt-master下载-20260409-skills-ppt-master-references-executor-consultant.md; ../../raw/workspace-skills/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-23-技能-ppt-master下载-20260409-skills-ppt-master-references-executor-base.md; ../../raw/workspace-skills/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-23-技能-ppt-master下载-20260409-skills-ppt-master-templates-layouts-README.md; ../../raw/workspace-skills/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-23-技能-ppt-master下载-20260409-skills-ppt-master-references-shared-standards.md; ../../raw/workspace-skills/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-23-技能-ppt-master下载-20260409-docs-technical-design.md; ../../raw/workspace-skills/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-23-技能-ppt-master下载-20260409-skills-ppt-master-workflows-create-template.md; ../../raw/workspace-skills/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-23-技能-ppt-master下载-20260409-docs-faq.md; ../../raw/workspace-skills/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-23-技能-ppt-master下载-20260409-docs-zh-faq.md; ../../raw/workspace-skills/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-23-技能-ppt-master下载-20260409-scripts-docs-svg-pipeline.md

## 概述

PPT Master 是一个 AI 驱动的演示文稿生成系统，通过多角色协作（Strategist → Image_Generator → Executor）将源文档转换为高质量 SVG 幻灯片。其核心价值在于建立了20套设计模板和完整的 Executor 角色体系。

## 系统架构

PPT Master 采用三角色流水线架构：

> **Strategist（策略师）**：分析源文档，提取核心信息，设计叙事结构和页面规划
> **Image_Generator（图像生成器）**：生成或选择合适的配图和图标
> **Executor（执行者）**：根据 design_spec 和页面规划，生成最终的 SVG 幻灯片

这种架构的精髓在于角色分离：策略与执行解耦，同一个 Executor 可以为不同风格的 Strategist 服务。

## 20套设计模板库

模板库是 PPT Master 最核心的资产，按五个维度分类：

### 品牌风格模板（9套）

| 模板 | 风格特征 | 适用场景 |
|------|---------|---------|
| google_style | Google四色，Material Design | 年度报告、技术分享 |
| mckinsey | 麦肯锡蓝，结构化思维 | 战略咨询、投资分析 |
| anthropic | Anthropic橙色，暗色科技风 | AI技术分享、产品发布 |
| 中汽研_常规 | 深蓝专业权威 | 产品认证、评估测试 |
| 中汽研_商务 | 蓝色渐变现代科技 | 商务交流、技术交换 |
| 中汽研_现代 | 深蓝+霓虹青未来科技 | 战略发布、未来技术 |
| 中国电建_常规 | PowerChina蓝，工匠精神 | 电力能源、国企报告 |
| 中国电建_现代 | 深海蓝，宏大叙事 | 国际工程、高端路演 |
| 招商银行 | CMB红，极简奢华 | 高端报告、VIP服务 |

### 通用风格模板（3套）

| 模板 | 特征 | 适用场景 |
|------|------|---------|
| exhibit | 结论优先，数据驱动，渐变顶栏 | 战略报告、高管汇报 |
| 科技蓝商务 | 科技蓝，严谨专业 | 企业报告、产品发布 |
| smart_red | 红橙渐变，现代活力 | 科技公司、教育方案 |

### 场景专用模板（4套）

| 模板 | 特征 | 适用场景 |
|------|------|---------|
| academic_defense | 层级清晰，学术规范 | 论文答辩、学术报告 |
| psychology_attachment | 蓝绿渐变+彩色语义色 | 心理治疗、咨询讲座 |
| medical_university | 医用蓝，严谨生命感 | 医学报告、案例讨论 |
| 重庆大学 | 山城层次+现代学术 | 学术答辩、研究展示 |

### 政企模板（3套）

| 模板 | 特征 | 适用场景 |
|------|------|---------|
| government_red | 政府红，庄严大气 | 政府工作报告、党建 |
| government_blue | 科技蓝，现代治理 | 智慧城市、数字政府 |
| ai_ops | 电信红蓝，高密度模块化 | 电信AI运维、IT系统 |

### 特殊风格模板（1套）

| 模板 | 特征 | 适用场景 |
|------|------|---------|
| pixel_retro | 像素艺术，赛博朋克 | 技术介绍、复古游戏 |

## Executor 角色体系

Executor 是实际生成 SVG 的角色，分为基础版和专家版：

### Executor Base（基础执行者）

通用规则，所有 Executor 都继承自 Base：
- SVG 技术规范（viewBox、禁止元素、渐变用法）
- 颜色和排版基础
- 文本换行和对齐规则

### Executor Consultant（咨询风格专家）

在 Base 基础上增加咨询风格特定能力：
- KPI 看板设计（4卡布局，280x180，间距30）
- MECE 分解树
- 咨询风格图表（单色深度渐变，非彩虹色）
- 数据标注原则（直接数据标签，趋势线注释）
- 表格设计规范（斑马纹，数字右对齐，只用横线分隔）

## SVG 技术约束

PPT Master 对 SVG 有严格的技术约束，确保生成的文件能在 PowerPoint 中正常打开：

### 禁止元素

| 禁止元素 | 替代方案 |
|---------|---------|
| `<foreignObject>` | `<text>` + `<tspan>` |
| `clipPath` | 重新设计布局 |
| `mask` | 使用 `fill-opacity` |
| `<style>` / `class` | 使用 inline styles |
| `textPath` | 普通 `<text>` |
| `animate*` | 静态设计 |
| `script` | 不支持交互 |
| `marker` / `marker-end` | 使用 `<polygon>` 三角形 |
| `rgba()` | HEX + `fill-opacity` |
| `<g opacity="...">` | 每个子元素单独设置 opacity |

### 必须遵守

- viewBox: `0 0 1280 720`（16:9 标准）
- 背景使用 `<rect>`
- 文本换行使用 `<tspan>`
- 透明度使用 `fill-opacity` / `stroke-opacity`
- 渐变使用 `<defs>` + `<linearGradient>`

## 模板创建流程

创建新模板的标准流程：

1. 在 `templates/layouts/` 下创建新目录
2. 按标准结构创建文件（design_spec.md、cover、chapter、content、ending）
3. design_spec.md 遵循标准章节结构（11个章节）
4. 所有 SVG 使用 `viewBox="0 0 1280 720"`
5. 用 SVG 质量检查脚本验证
6. 在 `layouts_index.json` 注册新模板

## 设计哲学

> **风格与场景正交**：风格模板定义视觉呈现，场景模板定义内容结构。理论上，场景模板可以和不同风格组合。
> **模板保证结构页的视觉一致性**：封面、目录、章节页、内容页、结尾页都有固定结构。
> **内容页保持最大灵活度**：内容页由 AI 根据实际内容决定布局。

## Placeholder 契约

所有模板使用统一的 `{{PLACEHOLDER}}` 格式标记可替换内容，包括：通用占位符（TITLE、SUBTITLE、DATE）、章节相关（CHAPTER_NUM、CHAPTER_TITLE）、内容页（PAGE_TITLE、CONTENT_AREA）、目录（TOC_ITEM）和结尾页（THANK_YOU、CLOSING_MESSAGE）。
