# xlsx Excel 表格处理技能

> Sources: xlsx, minimax-xlsx, 2026-04-28
> Raw:[SKILL](../../raw/skills/xlsx-SKILL.md); [minimax-xlsx SKILL](../../raw/skills/minimax-xlsx-SKILL.md); [create](../../raw/skills/minimax-xlsx-create.md); [edit](../../raw/skills/minimax-xlsx-edit.md); [fix](../../raw/skills/minimax-xlsx-fix.md); [format](../../raw/skills/minimax-xlsx-format.md); [OOXML cheatsheet](../../raw/skills/minimax-xlsx-ooxml-cheatsheet.md); [read analyze](../../raw/skills/minimax-xlsx-read-analyze.md); [validate](../../raw/skills/minimax-xlsx-validate.md)

## 概述

Excel 表格处理技能集合，覆盖创建、编辑、分析、公式调试、格式化和数据可视化。包含两个实现：基础 xlsx 和 minimax-xlsx（基于 OpenXML SDK）。

## 核心能力

| 能力 | 说明 |
|------|------|
| 创建 | 从零构建带公式、格式、图表的工作簿 |
| 编辑 | 修改现有文件，保留原有模板和约定 |
| 修复 | 诊断和修复公式错误、格式问题 |
| 格式化 | 条件格式、数据验证、单元格样式 |
| 分析 | 读取、分析、汇总表格数据 |

## 质量标准

- **零公式错误**：确保无 `#REF!`、`#DIV/0!`、`#VALUE!` 等错误
- **保留现有模板**：修改文件时严格匹配原有格式、风格、约定
- **OOXML 规范**：遵循 OpenXML 标准，确保跨平台兼容
