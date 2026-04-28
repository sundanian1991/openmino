# 演示文稿项目管理实践

> Sources: 所有 presentations 目录下的项目文件 (2026-04-03 至 2026-04-26), 2026-04-28
> Raw: [README.md](../../raw/presentations/README.md); [README.ai.md](../../raw/presentations/README.ai.md); [PATH.ai.md](../../raw/presentations/PATH.ai.md); [AI定价README](../../raw/presentations/projects-AI产品定价模式演变-从CodingPlan到TokenPlan_ppt169_20260425-README.md); [刘乾坤README](../../raw/presentations/projects-liu-qiankun-profile_ppt169_20260409-README.md); [梁俊瑞README](../../raw/presentations/projects-liang-junrui-mysterious-island-v2_ppt169_20260411-README.md)

## 概述

演示文稿项目管理实践整理了 Mino 知识库中所有演示项目的组织方式、文件命名规范、产出物类型和生命周期管理方法。presentations 目录下共有 463 个文件，覆盖 6 个以上独立项目，涉及从商业分析到人物侧写、从儿童教育到技术基础设施的多种场景。该实践的核心价值在于：它建立了一套标准化的项目产出物管理方式，使每个项目都能被独立理解、回溯和复用。

## 项目文件组织模式

每个演示项目在 presentations 目录下遵循统一的命名模式：

```
projects-{项目名}_ppt169_{日期}-{文件类型}.{md}
```

**项目名**：中文或英文，描述项目主题。例如"AI产品定价模式演变-从CodingPlan到TokenPlan"、"liu-qiankun-profile"、"liang-junrui-mysterious-island-v2"。

**ppt169**：标识项目使用 PPT169 格式（16:9，1280×720）。这是统一的技术标识，区别于其他格式（如 pptx、html-ppt 等）。

**日期**：YYYYMMDD 格式，标识项目创建日期。

**文件类型**：
- README.md：项目索引和概述
- design_spec.md：设计规格（完整的视觉技术规范）
- design_spec_v2.md：设计规格 v2 迭代版本
- notes-XX_章节.md：每页演讲备注（如 notes-01_封面.md）
- notes-total.md：所有演讲备注的合并版
- sources-XX_来源.md：原始研究资料（如 sources-00-brainstorm.md）
- templates-design_spec.md：模板设计规格

## 文件规模统计

**刘乾坤人物画像系列**：约 90+ 个文件。6 种风格变体 × 12 页 notes + sources + design_spec + templates。是文件数量最多的项目。

**AI 定价项目**：约 24 个文件。15 页 notes + 2 个 sources + design_spec + templates + README。

**梁俊瑞神秘岛**：约 3 个文件。README + design_spec + design_spec_v2。规模最小。

**MCP Servers**：约 260 个文件（其中 95%+ 是 node_modules 的 README）。有意义的内容文件约 10 个。

**主贷大额人力调整汇报**：约 31 个文件（其中 95%+ 是 node_modules 的 README）。

**zrc3gz 每周监控**：约 6 个文件。

**vwiehr 情感触发地图**：约 6 个文件。

**总文件数**：463 个，其中有意义的内容文件约 130-140 个，其余为 node_modules 的附带文件。

## 项目生命周期

每个演示项目经历以下生命周期阶段：

**阶段 1：Brainstorm（头脑风暴）**。自由发散记录已知事实、想法、问题。输出 sources-00-brainstorm.md。

**阶段 2：Research（研究补充）**。针对信息缺口进行定向补充。输出 sources-01-research.md 或更多 sources 文件。

**阶段 3：Design Spec（设计规格）**。定义画布、配色、字体、布局、图表。输出 design_spec.md。

**阶段 4：Notes Generation（备注生成）**。为每页 PPT 生成演讲备注。输出 notes-01 到 notes-XX 及 notes-total。

**阶段 5：SVG Generation（SVG 生成）**。根据 design_spec 生成每页 SVG。此阶段的产出不在 presentations 目录中，而在项目各自的 svg_output/ 目录。

**阶段 6：PPTX Export（PPTX 导出）**。将 SVG 导出为 PPTX 文件。此阶段的产出通常在工作区或其他目录。

**阶段 7：Archive（归档）**。项目完成后，所有源文件保留在 presentations 目录中作为持久化知识资产。

## README 文件的角色

每个项目的 README.md 扮演项目索引的角色：

**AI 定价 README**：包含项目名称、格式、创建日期和目录结构概览。

**刘乾坤 README**：包含项目名称、格式、创建日期和目录结构。

**梁俊瑞 README**：最简洁，只包含 Canvas format、Created 日期和目录列表。

**总 README（presentations/README.md）**：是所有项目的总索引，列出每个项目的名称、日期、格式和文件数量。

README 的价值在于：当你在 3 个月后回头看一个项目时，README 是第一个告诉你"这个项目是什么"的文件。没有 README，你就需要逐个阅读 notes 文件来理解项目内容。

## 多版本管理

部分项目存在多个版本的设计规格：

**梁俊瑞**：design_spec.md 和 design_spec_v2.md，说明设计规格经历了至少一次迭代。

**刘乾坤**：6 种风格变体（default、editorial-v2、exhibit、freestyle、infographic-v2、mckinsey-v2），每种变体都是同一个内容的不同呈现方式。

多版本管理的意义在于：它记录了设计决策的演进过程。v2 版本不是对 v1 的"替代"，而是"迭代"。保留所有版本，可以追溯设计思路的演变。

## node_modules 文件的处理

大量 node_modules README 文件被归档到 presentations 目录中。这些文件来自两个项目：
- projects-mcp-servers-getnote-node_modules-*：约 150 个文件
- projects-mcp-servers-memos-node_modules-*：约 150 个文件
- projects-主贷大额人力调整汇报-20260410-node_modules-*：约 30 个文件

这些文件是技术项目执行时的附带产物——当 AI 读取项目的 CLAUDE.md 或 README.md 时，会递归读取子目录，导致 node_modules 中的 README 文件也被包含。这些文件不是有意归档的，而是归档流程的附带产物。

在演示文稿的 wiki 语境中，这些 node_modules 文件没有内容价值。它们的存在说明了项目归档流程的一个改进空间：应该在归档时排除 node_modules 目录。

## 知识资产的价值

presentations 目录作为知识资产库，其价值不在于文件数量，而在于：

**可回溯性**：每个项目的完整源文件都被保留，可以随时回溯到任何一个决策点。

**可复用性**：design_spec 可以作为新项目的模板，notes 可以作为新演讲的参考，sources 可以作为新研究的起点。

**可学习性**：6 种风格变体的对比、两个版本的迭代、不同项目的设计差异——这些都是学习演示文稿设计的最佳案例。
