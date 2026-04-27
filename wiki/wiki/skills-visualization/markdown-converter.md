# Markdown Converter — 文档格式转换

> Sources: markdown-converter SKILL.md; markitdown 工具
> Raw: [SKILL.md](../../raw/skills/markdown-converter-SKILL.md)

## Overview

markdown-converter 是 Mino 技能体系中的"文档格式转换层"——使用 `uvx markitdown` 将各种格式的文档转换为 Markdown，无需安装任何依赖。它是知识工作流的入口技能——将外部文档（PDF、Word、PPT、Excel 等）转换为 Mino 可处理的 Markdown 格式，然后交给其他技能进行分析和可视化。

---

## 一、支持的格式

| 类别 | 格式 |
|------|------|
| **文档** | PDF、Word (.docx)、PowerPoint (.pptx)、Excel (.xlsx, .xls) |
| **Web/数据** | HTML、CSV、JSON、XML |
| **媒体** | 图片（EXIF + OCR）、音频（EXIF + 转录） |
| **其他** | ZIP（迭代内容）、YouTube URL、EPub |

---

## 二、基本用法

```bash
# 转换为标准输出
uvx markitdown input.pdf

# 保存到文件
uvx markitdown input.pdf -o output.md
uvx markitdown input.docx > output.md

# 从标准输入
cat input.pdf | uvx markitdown
```

---

## 三、可选参数

| 参数 | 说明 |
|------|------|
| `-o OUTPUT` | 输出文件 |
| `-x EXTENSION` | 提示文件扩展名（用于标准输入） |
| `-m MIME_TYPE` | 提示 MIME 类型 |
| `-c CHARSET` | 提示字符集（如 UTF-8） |
| `-d` | 使用 Azure Document Intelligence |
| `-e ENDPOINT` | Document Intelligence 端点 |
| `--use-plugins` | 启用第三方插件 |
| `--list-plugins` | 显示已安装插件 |

---

## 四、典型使用场景

### 供应商文档处理
- PDF 合同和协议 → Markdown
- Word 管理制度 → Markdown
- Excel 数据报表 → Markdown 表格

### 研究资料转换
- PDF 行业报告 → Markdown
- PPTX 汇报材料 → Markdown
- 网页内容 → Markdown

### 多媒体处理
- 会议录音 → 音频转录 Markdown
- 现场照片 → EXIF + OCR Markdown

---

## 五、注意事项

- 输出保留文档结构：标题、表格、列表、链接
- 首次运行会缓存依赖；后续运行更快
- 对于提取效果差的复杂 PDF，使用 `-d` 配合 Azure Document Intelligence

---

## 六、在知识工作流中的位置

markdown-converter 是知识工作流的"入口技能"：

```
外部文档（PDF/Word/PPT/Excel）
  ↓
markdown-converter → Markdown
  ↓
knowledge-distiller → 知识提取
  ↓
data-storytelling → 数据沟通大纲
  ↓
渲染技能 → 可视化
```

它将"不可读"的外部文档转换为"可读可分析"的 Markdown 格式，是 Mino 处理外部信息的第一道工序。
