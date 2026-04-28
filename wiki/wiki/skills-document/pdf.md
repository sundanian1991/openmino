# PDF 操作技能

> Sources: pdf skill, minimax-pdf, 2026-04-28
> Raw:[pdf SKILL](../../raw/skills/pdf-SKILL.md); [minimax-pdf SKILL](../../raw/skills/minimax-pdf-SKILL.md); [design](../../raw/skills/minimax-pdf-design.md)

## 概述

PDF 技能覆盖两大能力层级：基础 PDF 操作（提取、合并、拆分、表单填充、OCR）和高品质 PDF 创建（重视觉设计、专业排版、15 种封面模板）。基础 pdf 适合"读取/处理现有 PDF"，minimax-pdf 适合"从头生成专业 PDF"。

## 基础 PDF 能力（pdf 技能）

### 核心工具链

| 工具 | 用途 | 典型场景 |
|------|------|----------|
| **pypdf** | 合并/拆分/旋转/元数据提取/密码保护 | 多文档合并、页面旋转、加密 PDF |
| **pdfplumber** | 文本提取（保留布局）+ 表格提取 | 从 PDF 中提取结构化数据到 Excel |
| **reportlab** | 从零创建 PDF | 生成报告、发票、证书 |
| **qpdf/pdftk** | 命令行批量操作 | 脚本化处理、解密、页面范围提取 |
| **pytesseract** | 扫描件 OCR | 扫描 PDF → 可搜索文本 |

### 关键能力

- **表格提取**：pdfplumber 的 `extract_tables()` 可逐页提取表格，自动转 pandas DataFrame
- **批量合并**：pypdf 的 `PdfWriter.add_page()` 按顺序组装多文档
- **扫描件处理**：`pdf2image` 转图片 → `pytesseract` OCR → 可搜索文本
- **表单填充**：支持文本、复选框、下拉、单选按钮四种字段类型
- **水印叠加**：`merge_page()` 将水印 PDF 叠加到每页

## 高品质 PDF 创建（minimax-pdf）

### 三条路径

| 路径 | 场景 | 脚本流程 |
|------|------|----------|
| **CREATE** | 从零生成新 PDF | `palette.py` → `cover.py` → `render_cover.js` → `render_body.py` → `merge.py` |
| **FILL** | 填充现有 PDF 表单 | `fill_inspect.py` → `fill_write.py` |
| **REFORMAT** | 重格式化已有文档 | `reformat_parse.py` → CREATE 完整管线 |

### 15 种文档类型与封面模式

| 类型 | 封面模式 | 视觉特征 |
|------|----------|----------|
| `report` | fullbleed | 深色背景 + 点阵纹理 + Playfair Display |
| `proposal` | split | 左右分栏 + 纯平几何 + Syne |
| `resume` | typographic | 超大首词 + DM Serif Display |
| `portfolio` | atmospheric | 近黑背景 + 径向光晕 + Fraunces |
| `academic` | typographic | 浅色背景 + 经典衬线 + EB Garamond |
| `minimal` | minimal | 纯白 + 8px 左侧强调条 |
| `stripe` | stripe | 三条水平色带 + Barlow Condensed |
| `diagonal` | diagonal | SVG 对角切割 + Montserrat |
| `frame` | frame | 内嵌边框 + 古典装饰角 |
| `editorial` | editorial | 幽灵首字母 + 全大写标题 + Bebas Neue |
| `magazine` | magazine | 暖奶油背景 + 居中堆叠 + 封面图 |
| `darkroom` | darkroom | 深蓝背景 + 灰度图片 + Playfair Display |
| `terminal` | terminal | 近黑 + 霓虹绿 + 网格线 + Space Mono |
| `poster` | poster | 厚侧边栏 + 超大标题 + Barlow Condensed |
| `general` | fullbleed | 深石板色 + Outfit |

### 配色选择规则

根据文档语义上下文选择强调色，不使用通用"安全色"：

| 场景 | 推荐色域 |
|------|----------|
| 法律/合规/金融 | 深蓝 `#1C3A5E`、炭灰 `#2E3440` |
| 医疗 | 蓝绿 `#2A6B5A`、冷绿 `#3A7D6A` |
| 技术/工程 | 钢蓝 `#2D5F8A`、靛蓝 `#3D4F8A` |
| 创意/文化 | 酒红 `#6B2A35`、陶土 `#8A3A2A` |
| 学术/研究 | 深青 `#2A5A6B`、图书馆蓝 `#2A4A6B` |
| 企业/中性 | 石板 `#3D4A5A`、石墨 `#444C56` |

### 正文块类型

`content.json` 支持 17 种块类型：`h1`/`h2`/`h3` 标题、`body` 段落、`bullet`/`numbered` 列表、`callout` 高亮框、`table` 数据表、`image`/`figure` 图片、`code` 代码块、`math` 数学公式、`chart`/`flowchart` 图表、`bibliography` 参考文献、`divider` 分隔线、`caption` 图注、`pagebreak` 分页、`spacer` 空白。

### 设计规范

- **一条铁律**：每个设计决策必须根植于文档内容和目的，而非"看起来专业"
- **单一强调色**：仅一处强调色，出现在封面几何元素、章节分隔线、callout 左边框、表头
- **字体不超过两种**：封面标题用 Google Fonts（Playwright 实时加载），正文始终用系统字体（Times/Helvetica）
- **字号系统**：display 54pt → h1 22pt → h2 15pt → h3 11.5pt → body 10.5pt → caption 8.5pt
- **间距系统**：外边距 2.8cm、章节间隙 26pt、段落间隙 8pt、行距 17pt

### 质量标准

PDF 交付前需满足：封面有明确视觉身份（非"通用 AI 输出"）、正文可读、全文档风格一致、无溢出重叠、页码正确、每页强调色元素平均不超过 8 处。
