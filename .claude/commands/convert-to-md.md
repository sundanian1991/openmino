---
name: "convert-to-md"
description: "多文档格式转 Markdown — 支持 DOCX/PDF/HTML/EPUB 等"
---

# convert-to-md — 多文档格式转 Markdown

> 将各种格式的文档转换为 Markdown 格式

---

## Usage

```bash
/convert-to-md <file-path> [output-path]
```

**参数**：
- `file-path`：输入文件路径（必需）
- `output-path`：输出文件路径（可选，默认同目录下同名 .md 文件）

---

## 支持的格式

| 格式 | 工具 | 质量评分 |
|------|------|----------|
| **DOCX** | pandoc | ⭐⭐⭐⭐⭐ |
| **PDF** | marker / pandoc | ⭐⭐⭐⭐ |
| **HTML** | pandoc | ⭐⭐⭐⭐⭐ |
| **EPUB** | pandoc | ⭐⭐⭐⭐⭐ |
| **PPTX** | pandoc | ⭐⭐⭐ |
| **RTF** | pandoc | ⭐⭐⭐⭐ |
| **ODT** | pandoc | ⭐⭐⭐⭐ |

---

## 执行流程

```
收到文件 → 检测格式 → 选择工具 → 执行转换 → 输出 MD
```

---

## 工具选择逻辑

### 1. DOCX / HTML / EPUB / RTF / ODT
**优先使用 pandoc**（高质量）

```bash
pandoc "$INPUT" -o "$OUTPUT" --wrap=preserve --extract-media=./media
```

### 2. PDF
**优先使用 marker**（如果已安装），否则用 pandoc

```bash
# marker (推荐，ML 模型)
marker_single "$INPUT" "$OUTPUT"

# pandoc (备用)
pandoc "$INPUT" -o "$OUTPUT"
```

### 3. PPTX
**使用 pandoc**（提取文本内容）

```bash
pandoc "$INPUT" -o "$OUTPUT" --extract-media=./media
```

---

## 安装依赖

### Pandoc（必需）

```bash
# macOS
brew install pandoc

# Ubuntu/Debian
sudo apt-get install pandoc

# 验证安装
pandoc --version
```

### Marker（PDF 推荐，可选）

```bash
# macOS
pip3 install marker-pdf

# 验证
marker_single --help
```

### MarkItDown（Microsoft，可选）

```bash
pip3 install markitdown

# 验证
markitdown --help
```

---

## 示例

### 转换 DOCX
```bash
/convert-to-md ~/Documents/report.docx
# 输出: ~/Documents/report.md
```

### 转换 PDF
```bash
/convert-to-md ~/Downloads/paper.pdf ~/Documents/paper.md
```

### 批量转换
```bash
# Bash 循环
for file in *.docx; do
    /convert-to-md "$file"
done
```

---

## 高级选项

### Pandoc 高级用法

```bash
# 保留 YAML 元数据
pandoc input.docx -o output.md --standalone

# GitHub Flavored Markdown
pandoc input.docx -o output.md -t gfm

# 提取图片到指定目录
pandoc input.docx -o output.md --extract-media=./images
```

---

## 质量对比

| 工具 | DOCX | PDF | HTML | EPUB |
|------|------|-----|------|------|
| **pandoc** | 优秀 | 良好 | 优秀 | 优秀 |
| **marker** | N/A | 优秀 | N/A | N/A |
| **MarkItDown** | 良好 | 良好 | 良好 | 良好 |

---

*最后更新：2026-03-06*
