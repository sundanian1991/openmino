---
name: pdf
description: PDF 处理 - 文本/表格提取、创建/合并/拆分 PDF、表单处理
license: Proprietary. LICENSE.txt has complete terms
---

# PDF Processing Guide

## Overview

This guide covers essential PDF processing operations using Python libraries and command-line tools. For advanced features, JavaScript libraries, and detailed examples, see reference.md. If you need to fill out a PDF form, read forms.md and follow its instructions.

## Quick Start

```python
from pypdf import PdfReader, PdfWriter

# Read a PDF
reader = PdfReader("document.pdf")
print(f"Pages: {len(reader.pages)}")

# Extract text
text = ""
for page in reader.pages:
    text += page.extract_text()
```

## Python Libraries

### pypdf - Basic Operations

#### Merge PDFs
```python
from pypdf import PdfWriter, PdfReader

writer = PdfWriter()
for pdf_file in ["doc1.pdf", "doc2.pdf", "doc3.pdf"]:
    reader = PdfReader(pdf_file)
    for page in reader.pages:
        writer.add_page(page)

with open("merged.pdf", "wb") as output:
    writer.write(output)
```

#### Split PDF
```python
reader = PdfReader("input.pdf")
for i, page in enumerate(reader.pages):
    writer = PdfWriter()
    writer.add_page(page)
    with open(f"page_{i+1}.pdf", "wb") as output:
        writer.write(output)
```

#### Extract Metadata
```python
reader = PdfReader("document.pdf")
meta = reader.metadata
print(f"Title: {meta.title}")
print(f"Author: {meta.author}")
print(f"Subject: {meta.subject}")
print(f"Creator: {meta.creator}")
```

#### Rotate Pages
```python
reader = PdfReader("input.pdf")
writer = PdfWriter()

page = reader.pages[0]
page.rotate(90)  # Rotate 90 degrees clockwise
writer.add_page(page)

with open("rotated.pdf", "wb") as output:
    writer.write(output)
```

### pdfplumber - Text and Table Extraction

#### Extract Text with Layout
```python
import pdfplumber

with pdfplumber.open("document.pdf") as pdf:
    for page in pdf.pages:
        text = page.extract_text()
        print(text)
```

#### Extract Tables
```python
with pdfplumber.open("document.pdf") as pdf:
    for i, page in enumerate(pdf.pages):
        tables = page.extract_tables()
        for j, table in enumerate(tables):
            print(f"Table {j+1} on page {i+1}:")
            for row in table:
                print(row)
```

#### Advanced Table Extraction
```python
import pandas as pd

with pdfplumber.open("document.pdf") as pdf:
    all_tables = []
    for page in pdf.pages:
        tables = page.extract_tables()
        for table in tables:
            if table:  # Check if table is not empty
                df = pd.DataFrame(table[1:], columns=table[0])
                all_tables.append(df)

# Combine all tables
if all_tables:
    combined_df = pd.concat(all_tables, ignore_index=True)
    combined_df.to_excel("extracted_tables.xlsx", index=False)
```

### reportlab - Create PDFs

#### Basic PDF Creation
```python
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

c = canvas.Canvas("hello.pdf", pagesize=letter)
width, height = letter

# Add text
c.drawString(100, height - 100, "Hello World!")
c.drawString(100, height - 120, "This is a PDF created with reportlab")

# Add a line
c.line(100, height - 140, 400, height - 140)

# Save
c.save()
```

#### Create PDF with Multiple Pages
```python
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak
from reportlab.lib.styles import getSampleStyleSheet

doc = SimpleDocTemplate("report.pdf", pagesize=letter)
styles = getSampleStyleSheet()
story = []

# Add content
title = Paragraph("Report Title", styles['Title'])
story.append(title)
story.append(Spacer(1, 12))

body = Paragraph("This is the body of the report. " * 20, styles['Normal'])
story.append(body)
story.append(PageBreak())

# Page 2
story.append(Paragraph("Page 2", styles['Heading1']))
story.append(Paragraph("Content for page 2", styles['Normal']))

# Build PDF
doc.build(story)
```

## Command-Line Tools

### pdftotext (poppler-utils)
```bash
# Extract text
pdftotext input.pdf output.txt

# Extract text preserving layout
pdftotext -layout input.pdf output.txt

# Extract specific pages
pdftotext -f 1 -l 5 input.pdf output.txt  # Pages 1-5
```

### qpdf
```bash
# Merge PDFs
qpdf --empty --pages file1.pdf file2.pdf -- merged.pdf

# Split pages
qpdf input.pdf --pages . 1-5 -- pages1-5.pdf
qpdf input.pdf --pages . 6-10 -- pages6-10.pdf

# Rotate pages
qpdf input.pdf output.pdf --rotate=+90:1  # Rotate page 1 by 90 degrees

# Remove password
qpdf --password=mypassword --decrypt encrypted.pdf decrypted.pdf
```

### pdftk (if available)
```bash
# Merge
pdftk file1.pdf file2.pdf cat output merged.pdf

# Split
pdftk input.pdf burst

# Rotate
pdftk input.pdf rotate 1east output rotated.pdf
```

## Common Tasks

### Extract Text from Scanned PDFs
```python
# Requires: pip install pytesseract pdf2image
import pytesseract
from pdf2image import convert_from_path

# Convert PDF to images
images = convert_from_path('scanned.pdf')

# OCR each page
text = ""
for i, image in enumerate(images):
    text += f"Page {i+1}:\n"
    text += pytesseract.image_to_string(image)
    text += "\n\n"

print(text)
```

### Add Watermark
```python
from pypdf import PdfReader, PdfWriter

# Create watermark (or load existing)
watermark = PdfReader("watermark.pdf").pages[0]

# Apply to all pages
reader = PdfReader("document.pdf")
writer = PdfWriter()

for page in reader.pages:
    page.merge_page(watermark)
    writer.add_page(page)

with open("watermarked.pdf", "wb") as output:
    writer.write(output)
```

### Extract Images
```bash
# Using pdfimages (poppler-utils)
pdfimages -j input.pdf output_prefix

# This extracts all images as output_prefix-000.jpg, output_prefix-001.jpg, etc.
```

### Password Protection
```python
from pypdf import PdfReader, PdfWriter

reader = PdfReader("input.pdf")
writer = PdfWriter()

for page in reader.pages:
    writer.add_page(page)

# Add password
writer.encrypt("userpassword", "ownerpassword")

with open("encrypted.pdf", "wb") as output:
    writer.write(output)
```

## Quick Reference

| Task | Best Tool | Command/Code |
|------|-----------|--------------|
| Merge PDFs | pypdf | `writer.add_page(page)` |
| Split PDFs | pypdf | One page per file |
| Extract text | pdfplumber | `page.extract_text()` |
| Extract tables | pdfplumber | `page.extract_tables()` |
| Create PDFs | reportlab | Canvas or Platypus |
| Command line merge | qpdf | `qpdf --empty --pages ...` |
| OCR scanned PDFs | pytesseract | Convert to image first |
| Fill PDF forms | pdf-lib or pypdf (see forms.md) | See forms.md |

## Next Steps

- For advanced pypdfium2 usage, see reference.txt
- For JavaScript libraries (pdf-lib), see reference.txt
- If you need to fill out a PDF form, follow the instructions in forms.txt
- For troubleshooting guides, see reference.txt

---

## 实战场景

### 场景一：供应商合同分析

**年老师高频场景**：从合同PDF中提取关键条款、对比多家供应商

#### 1. 提取合同关键信息

```python
import pdfplumber
import re

def extract_contract_info(pdf_path):
    """从合同PDF提取关键信息"""
    info = {
        "甲方": None,
        "乙方": None,
        "合同金额": None,
        "合同期限": None,
        "付款条款": [],
        "违约条款": []
    }

    with pdfplumber.open(pdf_path) as pdf:
        full_text = ""
        for page in pdf.pages:
            full_text += page.extract_text() + "\n"

        # 提取甲方乙方
        party_a = re.search(r'甲方[：:]\s*(.+?)(?:\n|$)', full_text)
        party_b = re.search(r'乙方[：:]\s*(.+?)(?:\n|$)', full_text)
        if party_a:
            info["甲方"] = party_a.group(1).strip()
        if party_b:
            info["乙方"] = party_b.group(1).strip()

        # 提取金额
        amount = re.search(r'合同[总]?金额[：:]?\s*([\d,\.]+)\s*元', full_text)
        if amount:
            info["合同金额"] = amount.group(1)

        # 提取期限
        period = re.search(r'合同期限[：:]?\s*(.+?)(?:\n|$)', full_text)
        if period:
            info["合同期限"] = period.group(1).strip()

        # 提取付款条款（包含"付款"、"结算"的段落）
        payment_sections = re.findall(r'.{50}付款.{100}', full_text)
        info["付款条款"] = payment_sections[:3]  # 取前3条

        # 提取违约条款
        breach_sections = re.findall(r'.{50}违约.{100}', full_text)
        info["违约条款"] = breach_sections[:3]

    return info
```

#### 2. 对比多家供应商合同

```python
import pandas as pd

def compare_contracts(pdf_paths, supplier_names):
    """对比多家供应商合同关键条款"""
    comparison = []

    for path, name in zip(pdf_paths, supplier_names):
        info = extract_contract_info(path)
        comparison.append({
            "供应商": name,
            "合同金额": info["合同金额"],
            "合同期限": info["合同期限"],
            "付款条款数": len(info["付款条款"]),
            "违约条款数": len(info["违约条款"])
        })

    df = pd.DataFrame(comparison)
    return df
```

#### 3. 批量提取合同条款到Excel

```python
import os
import pandas as pd

def batch_extract_contracts(contract_dir, output_excel):
    """批量提取合同信息到Excel"""
    results = []
    for filename in os.listdir(contract_dir):
        if filename.endswith('.pdf'):
            pdf_path = os.path.join(contract_dir, filename)
            info = extract_contract_info(pdf_path)
            info["文件名"] = filename
            results.append(info)

    df = pd.DataFrame(results)
    df.to_excel(output_excel, index=False)
    print(f"已提取 {len(results)} 份合同信息到 {output_excel}")
```

---

### 场景二：扫描件OCR批量处理

**年老师场景**：扫描版合同、报表、票据需要提取文本

#### 1. 单文件OCR处理

```python
import pytesseract
from pdf2image import convert_from_path
from PIL import Image

def ocr_pdf(pdf_path, lang='chi_sim+eng'):
    """OCR识别扫描PDF（支持中英文）"""
    images = convert_from_path(pdf_path, dpi=300)
    text = ""
    for i, image in enumerate(images):
        # 预处理：转灰度、增强对比度
        gray = image.convert('L')
        # OCR识别
        page_text = pytesseract.image_to_string(gray, lang=lang)
        text += f"\n--- 第 {i+1} 页 ---\n{page_text}"
    return text
```

#### 2. 批量OCR处理

```python
import os
from concurrent.futures import ThreadPoolExecutor

def batch_ocr_pdfs(input_dir, output_dir, max_workers=4):
    """批量OCR处理PDF文件"""
    os.makedirs(output_dir, exist_ok=True)
    pdf_files = [f for f in os.listdir(input_dir) if f.endswith('.pdf')]

    def process_one(filename):
        pdf_path = os.path.join(input_dir, filename)
        text = ocr_pdf(pdf_path)
        output_path = os.path.join(output_dir, filename.replace('.pdf', '.txt'))
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(text)
        return filename

    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        results = list(executor.map(process_one, pdf_files))

    print(f"已完成 {len(results)} 个文件的OCR处理")
    return results
```

#### 3. OCR结果结构化提取

```python
import re

def extract_key_info_from_ocr(text):
    """从OCR文本中提取关键信息"""
    info = {}

    # 金额提取（支持多种格式）
    amounts = re.findall(r'(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)\s*元', text)
    info["金额列表"] = amounts

    # 日期提取
    dates = re.findall(r'(\d{4}[-年]\d{1,2}[-月]\d{1,2}[日]?)', text)
    info["日期列表"] = dates

    # 电话提取
    phones = re.findall(r'(1[3-9]\d{9})', text)
    info["电话列表"] = phones

    # 公司名称提取（简化版）
    companies = re.findall(r'([\u4e00-\u9fa5]{2,10}(?:有限公司|股份有限公司|集团))', text)
    info["公司列表"] = list(set(companies))

    return info
```

---

### 场景三：复杂表格提取

**年老师场景**：财务报表、业绩报表、评估表格

#### 1. 处理合并单元格表格

```python
import pdfplumber

def extract_complex_table(pdf_path, page_num=0, table_settings=None):
    """提取复杂表格（处理合并单元格）"""
    default_settings = {
        "vertical_strategy": "lines",
        "horizontal_strategy": "lines",
        "snap_tolerance": 5,
        "join_tolerance": 5,
        "edge_min_length": 10
    }
    settings = table_settings or default_settings

    with pdfplumber.open(pdf_path) as pdf:
        page = pdf.pages[page_num]
        tables = page.extract_tables(settings)

        if not tables:
            # 尝试更宽松的设置
            settings["vertical_strategy"] = "text"
            settings["horizontal_strategy"] = "text"
            tables = page.extract_tables(settings)

    return tables
```

#### 2. 财务报表提取到Excel

```python
import pandas as pd

def extract_financial_report(pdf_path, output_excel):
    """从财务报表PDF提取数据到Excel"""
    all_data = []

    with pdfplumber.open(pdf_path) as pdf:
        for i, page in enumerate(pdf.pages):
            tables = page.extract_tables({
                "vertical_strategy": "lines",
                "horizontal_strategy": "lines"
            })

            for j, table in enumerate(tables):
                if table and len(table) > 1:
                    # 第一行作为表头
                    df = pd.DataFrame(table[1:], columns=table[0])
                    df["页码"] = i + 1
                    df["表格序号"] = j + 1
                    all_data.append(df)

    if all_data:
        result = pd.concat(all_data, ignore_index=True)
        result.to_excel(output_excel, index=False)
        return result
    return None
```

#### 3. 跨页表格合并

```python
def extract_multi_page_table(pdf_path, start_page, end_page):
    """提取跨页表格并合并"""
    all_rows = []
    header = None

    with pdfplumber.open(pdf_path) as pdf:
        for i in range(start_page - 1, min(end_page, len(pdf.pages))):
            page = pdf.pages[i]
            tables = page.extract_tables()

            for table in tables:
                if table:
                    if header is None and table[0]:
                        header = table[0]
                        all_rows.extend(table[1:])
                    else:
                        all_rows.extend(table)

    if header and all_rows:
        return pd.DataFrame(all_rows, columns=header)
    return None
```

---

### 场景四：批量处理命令模板

#### 1. 批量合并PDF

```bash
# 合并当前目录所有PDF
qpdf --empty --pages *.pdf -- merged_all.pdf

# 合并指定文件
qpdf --empty --pages contract1.pdf contract2.pdf appendix.pdf -- full_contract.pdf

# 合并特定页码
qpdf --empty --pages doc1.pdf 1-5 doc2.pdf 3-10 -- selected_pages.pdf
```

#### 2. 批量拆分PDF

```bash
# 每页单独拆分
qpdf --split-pages input.pdf page_%02d.pdf

# 按范围拆分
qpdf input.pdf --pages . 1-10 -- part1.pdf
qpdf input.pdf --pages . 11-20 -- part2.pdf
```

#### 3. 批量提取文本

```bash
# 批量提取文本
for f in *.pdf; do
    pdftotext "$f" "${f%.pdf}.txt"
done

# 保留布局格式
for f in *.pdf; do
    pdftotext -layout "$f" "${f%.pdf}_layout.txt"
done
```

#### 4. 批量转图片

```bash
# 批量转PNG（300dpi）
for f in *.pdf; do
    pdftoppm -png -r 300 "$f" "${f%.pdf}"
done

# 批量转JPG（压缩）
for f in *.pdf; do
    pdftoppm -jpeg -jpegopt quality=85 -r 200 "$f" "${f%.pdf}"
done
```

#### 5. 批量添加水印

```python
from pypdf import PdfReader, PdfWriter
import os

def batch_add_watermark(pdf_dir, watermark_pdf, output_dir):
    """批量添加水印"""
    os.makedirs(output_dir, exist_ok=True)
    watermark_page = PdfReader(watermark_pdf).pages[0]

    for filename in os.listdir(pdf_dir):
        if filename.endswith('.pdf'):
            reader = PdfReader(os.path.join(pdf_dir, filename))
            writer = PdfWriter()

            for page in reader.pages:
                page.merge_page(watermark_page)
                writer.add_page(page)

            output_path = os.path.join(output_dir, f"watermarked_{filename}")
            with open(output_path, "wb") as f:
                writer.write(f)

    print(f"已完成 {len(os.listdir(pdf_dir))} 个文件的水印添加")
```

---

### 场景五：供应商报表生成

**年老师场景**：从多份评估PDF生成汇总报表

```python
import pdfplumber
import pandas as pd
from datetime import datetime

def generate_supplier_summary(report_dir, output_path):
    """从多份供应商业绩报表生成汇总"""
    summary = []

    for filename in os.listdir(report_dir):
        if not filename.endswith('.pdf'):
            continue

        pdf_path = os.path.join(report_dir, filename)
        supplier_name = filename.replace('_业绩报表.pdf', '')

        with pdfplumber.open(pdf_path) as pdf:
            # 提取第一页的关键指标
            first_page = pdf.pages[0]
            text = first_page.extract_text()

            # 提取业绩数据（根据实际报表格式调整）
            data = {
                "供应商": supplier_name,
                "文件": filename,
                "提取时间": datetime.now().strftime("%Y-%m-%d %H:%M")
            }

            # 尝试提取表格数据
            tables = first_page.extract_tables()
            if tables:
                # 假设第一个表格包含关键指标
                for row in tables[0]:
                    if len(row) >= 2:
                        key = row[0].strip() if row[0] else ""
                        value = row[1].strip() if row[1] else ""
                        if key and value:
                            data[key] = value

            summary.append(data)

    df = pd.DataFrame(summary)
    df.to_excel(output_path, index=False)
    return df
```

---

## 年老师常用命令速查

| 场景 | 命令/代码 |
|------|----------|
| 提取合同文本 | `pdftotext -layout contract.pdf contract.txt` |
| 提取表格数据 | `pdfplumber` 的 `extract_tables()` |
| 合并多份合同 | `qpdf --empty --pages *.pdf -- merged.pdf` |
| 扫描件OCR | `pytesseract` + `pdf2image` |
| 批量提取关键信息 | `extract_contract_info()` 函数 |
| 生成汇总报表 | `generate_supplier_summary()` 函数 |
