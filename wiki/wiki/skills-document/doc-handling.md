# 文档处理技能（docx + minimax-docx + minimax-pdf）

> Sources: docx, minimax-docx, minimax-pdf, 2026-04-28
> Raw:[docx SKILL](../../raw/skills/docx-SKILL.md); [minimax-docx SKILL](../../raw/skills/minimax-docx-SKILL.md); [CJK typography](../../raw/skills/minimax-docx-cjk_typography.md); [university template](../../raw/skills/minimax-docx-cjk_university_template_guide.md); [comments guide](../../raw/skills/minimax-docx-comments_guide.md); [good bad examples](../../raw/skills/minimax-docx-design_good_bad_examples.md); [minimax-pdf SKILL](../../raw/skills/minimax-pdf-SKILL.md)
> [design principles](../../raw/skills/minimax-docx-design_principles.md); [typography](../../raw/skills/minimax-docx-typography_guide.md); [track changes](../../raw/skills/minimax-docx-track_changes_guide.md); [troubleshooting](../../raw/skills/minimax-docx-troubleshooting.md)
> [scenario A create](../../raw/skills/minimax-docx-scenario_a_create.md); [scenario B edit](../../raw/skills/minimax-docx-scenario_b_edit_content.md); [scenario C template](../../raw/skills/minimax-docx-scenario_c_apply_template.md)
> [OOXML element order](../../raw/skills/minimax-docx-openxml_element_order.md); [OOXML namespaces](../../raw/skills/minimax-docx-openxml_namespaces.md); [OOXML units](../../raw/skills/minimax-docx-openxml_units.md)
> [OOXML encyclopedia p1](../../raw/skills/minimax-docx-openxml_encyclopedia_part1.md); [p2](../../raw/skills/minimax-docx-openxml_encyclopedia_part2.md); [p3](../../raw/skills/minimax-docx-openxml_encyclopedia_part3.md); [XSD validation](../../raw/skills/minimax-docx-xsd_validation_guide.md)

## 概述

文档处理技能集合覆盖 Word 文档的创建、编辑、套模板、修订跟踪、批注和完整格式保留，以及 PDF 生成。包含中英文排版规范、13 套美学配方和严格的质量标准。

## 核心能力

| 技能 | 能力 | 特点 |
|------|------|------|
| docx | Word 文档操作 | 创建/编辑/修订/批注，保留完整格式 |
| minimax-docx | 高级 Word 处理 | OpenXML SDK (.NET)、CJK 排版、3 条流水线、XSD 验证 |
| minimax-pdf | PDF 生成 | 15 种文档类型、封面+正文渲染管线、表单填充 |

## minimax-docx 三条流水线

| 流水线 | 触发 | 方式 |
|--------|------|------|
| **A. 从零创建** | "写报告"、"起草" | 按类型选样式集（report/letter/memo/academic），组装 document.xml |
| **B. 填充编辑** | "替换"、"更新" | Preview → Analyze → 替换占位符/表格 → Diff 验证 |
| **C. 套模板** | "套模板"、"排版" | Overlay（纯样式 ≤30 段）或 Base-Replace（带结构 >100 段） |

每条流水线后必须运行验证：`validate --xsd wml-subset.xsd` → `validate --business`。C 额外要求 `business-rules.xsd` **硬门检**，不通过不可交付。

## 设计规范

### 六大排版原则

| 原则 | 要点 | 快速检验 |
|------|------|---------|
| 留白 | 内容覆盖率 60-70% | 50% 缩放看"白色通道" |
| 对比 | 字号比 1.25x，标题/正文差 2+ 维度 | 眯眼能数出几级标题 |
| 邻近性 | 标题 before:after = 3:1 | 遮住标题仍能看出归属 |
| 对齐 | 英文左对齐，CJK 两端对齐 | 英文 justify 出现白色河流 |
| 重复性 | 命名样式，不用直接格式 | 同级元素同一 styleId |
| 层次 | 相邻层级 2+ 维度差异 | 手臂距离能看清结构 |

### 默认参数

| 元素 | 西文 | CJK |
|------|------|-----|
| 正文 | Calibri 11pt, #333333 | SimSun 小四 12pt |
| H1 | Calibri Light 20pt, #1F4E79 | SimHei 小一 24pt |
| H2 | Calibri Light 16pt, #1F4E79 | SimHei 二号 22pt |
| 行距 | 1.15x | 1.5x 或固定 28pt |

### 咨询模式（年老师）

非纯白背景 `#F9F9F9`、深炭灰 `#333333`、低饱和红 `#B85450`（仅关键数据）、Helvetica Neue。核心：So What（标题是结论句）、MECE、金字塔。

### 美学配方

内置 13 套从权威来源提取的配方：ModernCorporate、AcademicThesis、IEEE Conference、APA 7th、ChineseGovernment (GB/T 9704) 等。**禁止自创参数值**。

## 质量检查

### 常见错误对照

| 错误 | 坏 | 好 |
|------|---|---|
| 字号 | 标题=正文 12pt | 20→16→13→11pt |
| 间距 | 段落 0pt，行距 1.0x | 段后 8pt，行距 1.15x |
| 表格 | 四边全边框 | 三线表（顶 1.5pt + 头底 0.75pt + 底 1.5pt） |
| 字体 | 4+ 种 | 1-2 个字体族 |
| 颜色 | 每级标题不同亮色 | 统一强调色 |
| 中文斜体 | italic 中文 | 加粗或着重号 |

### CJK 专项

- 字体三属性：`Ascii` + `HighAnsi` + `EastAsia`
- 中文行距 1.5x（字符方块无 ascender/descender 间隙）
- 字号传统体系：初号 42pt → 小五 9pt

### 验证管线

```
1. merge-runs → 合并相同格式 run
2. validate --xsd → 结构校验
3. validate --business → 业务规则
4. 失败 → fix-order → 重跑
5. docx_preview → 肉眼确认
```
