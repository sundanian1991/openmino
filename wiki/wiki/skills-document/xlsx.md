# xlsx Excel 表格处理技能

> Sources: xlsx skill, 60+ files including 42 XSD schemas
> Created: 2026-04-27
> Raw: [SKILL](../../raw/skills/xlsx-SKILL.md); [minimax-xlsx SKILL](../../raw/skills/minimax-xlsx-SKILL.md); [create](../../raw/skills/minimax-xlsx-create.md); [edit](../../raw/skills/minimax-xlsx-edit.md); [fix](../../raw/skills/minimax-xlsx-fix.md); [format](../../raw/skills/minimax-xlsx-format.md); [OOXML cheatsheet](../../raw/skills/minimax-xlsx-ooxml-cheatsheet.md); [read analyze](../../raw/skills/minimax-xlsx-read-analyze.md); [validate](../../raw/skills/minimax-xlsx-validate.md)

## 概述

Excel 表格处理——创建/编辑/分析 spreadsheet，支持公式、格式、图表。包含完整的 Office OpenXML 工具链：打包/解包、验证、重新计算、供应商记分卡生成。

## SKILL.md

```
---
name: xlsx
description: Excel 表格处理 - 创建/编辑/分析 spreadsheet，支持公式、格式、数据分析和可视化
license: Proprietary. LICENSE.txt has complete terms
---

# Requirements for Outputs

## All Excel files

### Zero Formula Errors
- Every Excel model MUST be delivered with ZERO formula errors (#REF!, #DIV/0!, #VALUE!, #N/A, #NAME?)

### Preserve Existing Templates (when updating templates)
- Study and EXACTLY match existing format, style, and conventions when modifying files
- Never impose standardized formatting on files with established patterns
- Existing template conventions ALWAYS override these guidelines

## Financial models

### Color Coding Standards
Unless otherwise stated by the user or existing template

#### Industry-Standard Color Conventions
- **Blue text (RGB: 0,0,255)**: Hardcoded inputs, and numbers users will change for scenarios
- **Black text (RGB: 0,0,0)**: ALL formulas and calculations
- **Green text (RGB: 0,128,0)**: Links pulling from other worksheets within same workbook
- **Red text (RGB: 255,0,0)**: External links to other files
- **Yellow background (RGB: 255,255,0)**: Key assumptions needing attention or cells that need to be updated

### Number Formatting Standards

#### Required Format Rules
- **Years**: Format as text strings (e.g., "2024" not "2,024")
- **Currency**: Use $#,##0 format; ALWAYS specify units in headers ("Revenue ($mm)")
- **Zeros**: Use number formatting to make all zeros "-", including percentages (e.g., "$#,##0;($#,##0);-")
- **Percentages**: Default to 0.0% format (one decimal)
- **Multiples**: Format as 0.0x for valuation multiples (EV/EBITDA, P/E)
- **Negative numbers**: Use parentheses (123) not minus -123

### Formula Construction Rules

#### Assumptions Placement
- Place ALL assumptions (growth rates, margins, multiples, etc.) in separate assumption cells
- Use cell references instead of hardcoded values in formulas
- Example: Use =B5*(1+$B$6) instead of =B5*1.05

#### Formula Error Prevention
- Verify all cell references are correct
- Check for off-by-one errors in ranges
- Ensure consistent formulas across all projection periods
- Test with edge cases (zero values, negative numbers)
- Verify no unintended circular references

#### Documentation Requirements for Hardcodes
- Comment or in cells beside (if end of table). Format: "Source: [System/Document], [Date], [Specific Reference], [URL if applicable]"
- Examples:
  - "Source: Company 10-K, FY2024, Page 45, Revenue Note, [SEC EDGAR URL]"
  - "Source: Company 10-Q, Q2 2025, Exhibit 99.1, [SEC EDGAR URL]"
  - "Source: Bloomberg Terminal, 8/15/2025, AAPL US Equity"
  - "Source: FactSet, 8/20/2025, Consensus Estimates Screen"

# XLSX creation, editing, and analysis

## Overview

A user may ask you to create, edit, or analyze the contents of an .xlsx file. You have different tools and workflows available for different tasks.

## Important Requirements

**LibreOffice Required for Formula Recalculation**: You can assume LibreOffice is installed for recalculating formula values using the `scripts/recalc.py` script. The script automatically configures LibreOffice on first run, including in sandboxed environments where Unix sockets are restricted (handled by `scripts/office/soffice.py`)

## Reading and analyzing data

### Data analysis with pandas
For data analysis, visualization, and basic operations, use **pandas** which provides powerful data manipulation capabilities:

```python
import pandas as pd

# Read Excel
df = pd.read_excel('file.xlsx')  # Default: first sheet
all_sheets = pd.read_excel('file.xlsx', sheet_name=None)  # All sheets as dict

# Analyze
df.head()      # Preview data
df.info()      # Column info
df.describe()  # Statistics

# Write Excel
df.to_excel('output.xlsx', index=False)
```

## Excel File Workflows

## CRITICAL: Use Formulas, Not Hardcoded Values

**Always use Excel formulas instead of calculating values in Python and hardcoding them.** This ensures the spreadsheet remains dynamic and updateable.

### ❌ WRONG - Hardcoding Calculated Values
```python
# Bad: Calculating in Python and hardcoding result
total = df['Sales'].sum()
sheet['B10'] = total  # Hardcodes 5000

# Bad: Computing growth rate in Python
growth = (df.iloc[-1]['Revenue'] - df.iloc[0]['Revenue']) / df.iloc[0]['Revenue']
sheet['C5'] = growth  # Hardcodes 0.15

# Bad: Python calculation for average
avg = sum(values) / len(values)
sheet['D20'] = avg  # Hardcodes 42.5
```

### ✅ CORRECT - Using Excel Formulas
```python
# Good: Let Excel calculate the sum
sheet['B10'] = '=SUM(B2:B9)'

# Good: Growth rate as Excel formula
sheet['C5'] = '=(C4-C2)/C2'

# Good: Average using Excel function
sheet['D20'] = '=AVERAGE(D2:D19)'
```

This applies to ALL calculations - totals, percentages, ratios, differences, etc. The spreadsheet should be able to recalculate when source data changes.

## Common Workflow
1. **Choose tool**: pandas for data, openpyxl for formulas/formatting
2. **Create/Load**: Create new workbook or load existing file
3. **Modify**: Add/edit data, formulas, and formatting
4. **Save**: Write to file
5. **Recalculate formulas (MANDATORY IF USING FORMULAS)**: Use the recalc.py script
   ```bash
   python scripts/recalc.py output.xlsx
   ```
6. **Verify and fix any errors**: 
   - The script returns JSON with error details
   - If `status` is `errors_found`, check `error_summary` for specific error types and locations
   - Fix the identified errors and recalculate again
   - Common errors to fix:
     - `#REF!`: Invalid cell references
     - `#DIV/0!`: Division by zero
     - `#VALUE!`: Wrong data type in formula
     - `#NAME?`: Unrecognized formula name

### Creating new Excel files

```python
# Using openpyxl for formulas and formatting
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment

wb = Workbook()
sheet = wb.active

# Add data
sheet['A1'] = 'Hello'
sheet['B1'] = 'World'
sheet.append(['Row', 'of', 'data'])

# Add formula
sheet['B2'] = '=SUM(A1:A10)'

# Formatting
sheet['A1'].font = Font(bold=True, color='FF0000')
sheet['A1'].fill = PatternFill('solid', start_color='FFFF00')
sheet['A1'].alignment = Alignment(horizontal='center')

# Column width
sheet.column_dimensions['A'].width = 20

wb.save('output.xlsx')
```

### Editing existing Excel files

```python
# Using openpyxl to preserve formulas and formatting
from openpyxl import load_workbook

# Load existing file
wb = load_workbook('existing.xlsx')
sheet = wb.active  # or wb['SheetName'] for specific sheet

# Working with multiple sheets
for sheet_name in wb.sheetnames:
    sheet = wb[sheet_name]
    print(f"Sheet: {sheet_name}")

# Modify cells
sheet['A1'] = 'New Value'
sheet.insert_rows(2)  # Insert row at position 2
sheet.delete_cols(3)  # Delete column 3

# Add new sheet
new_sheet = wb.create_sheet('NewSheet')
new_sheet['A1'] = 'Data'

wb.save('modified.xlsx')
```

## Recalculating formulas

Excel files created or modified by openpyxl contain formulas as strings but not calculated values. Use the provided `recalc.py` script to recalculate formulas:

```bash
python scripts/recalc.py <excel_file> [timeout_seconds]
```

Example:
```bash
python scripts/recalc.py output.xlsx 30
```

The script:
- Automatically sets up LibreOffice macro on first run
- Recalculates all formulas in all sheets
- Scans ALL cells for Excel errors (#REF!, #DIV/0!, etc.)
- Returns JSON with detailed error locations and counts
- Works on both Linux and macOS

## Formula Verification Checklist

Quick checks to ensure formulas work correctly:

### Essential Verification
- [ ] **Test 2-3 sample references**: Verify they pull correct values before building full model
- [ ] **Column mapping**: Confirm Excel columns match (e.g., column 64 = BL, not BK)
- [ ] **Row offset**: Remember Excel rows are 1-indexed (DataFrame row 5 = Excel row 6)

### Common Pitfalls
- [ ] **NaN handling**: Check for null values with `pd.notna()`
- [ ] **Far-right columns**: FY data often in columns 50+ 
- [ ] **Multiple matches**: Search all occurrences, not just first
- [ ] **Division by zero**: Check denominators before using `/` in formulas (#DIV/0!)
- [ ] **Wrong references**: Verify all cell references point to intended cells (#REF!)
- [ ] **Cross-sheet references**: Use correct format (Sheet1!A1) for linking sheets

### Formula Testing Strategy
- [ ] **Start small**: Test formulas on 2-3 cells before applying broadly
- [ ] **Verify dependencies**: Check all cells referenced in formulas exist
- [ ] **Test edge cases**: Include zero, negative, and very large values

### Interpreting scripts/recalc.py Output
The script returns JSON with error details:
```json
{
  "status": "success",           // or "errors_found"
  "total_errors": 0,              // Total error count
  "total_formulas": 42,           // Number of formulas in file
  "error_summary": {              // Only present if errors found
    "#REF!": {
      "count": 2,
      "locations": ["Sheet1!B5", "Sheet1!C10"]
    }
  }
}
```

## Best Practices

### Library Selection
- **pandas**: Best for data analysis, bulk operations, and simple data export
- **openpyxl**: Best for complex formatting, formulas, and Excel-specific features

### Working with openpyxl
- Cell indices are 1-based (row=1, column=1 refers to cell A1)
- Use `data_only=True` to read calculated values: `load_workbook('file.xlsx', data_only=True)`
- **Warning**: If opened with `data_only=True` and saved, formulas are replaced with values and permanently lost
- For large files: Use `read_only=True` for reading or `write_only=True` for writing
- Formulas are preserved but not evaluated - use recalc.py to update values

### Working with pandas
- Specify data types to avoid inference issues: `pd.read_excel('file.xlsx', dtype={'id': str})`
- For large files, read specific columns: `pd.read_excel('file.xlsx', usecols=['A', 'C', 'E'])`
- Handle dates properly: `pd.read_excel('file.xlsx', parse_dates=['date_column'])`

## Code Style Guidelines
**IMPORTANT**: When generating Python code for Excel operations:
- Write minimal, concise Python code without unnecessary comments
- Avoid verbose variable names and redundant operations
- Avoid unnecessary print statements

**For Excel files themselves**:
- Add comments to cells with complex formulas or important assumptions
- Document data sources for hardcoded values
- Include notes for key calculations and model sections
```

## LICENSE.txt

```
© 2025 Anthropic, PBC. All rights reserved.

LICENSE: Use of these materials (including all code, prompts, assets, files,
and other components of this Skill) is governed by your agreement with
Anthropic regarding use of Anthropic's services. If no separate agreement
exists, use is governed by Anthropic's Consumer Terms of Service or
Commercial Terms of Service, as applicable:
https://www.anthropic.com/legal/consumer-terms
https://www.anthropic.com/legal/commercial-terms
Your applicable agreement is referred to as the "Agreement." "Services" are
as defined in the Agreement.

ADDITIONAL RESTRICTIONS: Notwithstanding anything in the Agreement to the
contrary, users may not:

- Extract these materials from the Services or retain copies of these
  materials outside the Services
- Reproduce or copy these materials, except for temporary copies created
  automatically during authorized use of the Services
- Create derivative works based on these materials
- Distribute, sublicense, or transfer these materials to any third party
- Make, offer to sell, sell, or import any inventions embodied in these
  materials
- Reverse engineer, decompile, or disassemble these materials

The receipt, viewing, or possession of these materials does not convey or
imply any license or right beyond those expressly granted above.

Anthropic retains all right, title, and interest in these materials,
including all copyrights, patents, and other intellectual property rights.
```

## USAGE.txt

```
---
input: 需求
output: USAGE.md
pos: .claude/skills/xlsx/USAGE.md
---

# xlsx Skill - 使用指南

> Excel表格创建、编辑、数据分析

---

## 核心功能

| 功能 | 说明 |
|------|------|
| **创建表格** | 从模板或空白创建 |
| **公式计算** | 支持复杂公式和函数 |
| **数据透视** | 快速汇总和分析 |
| **图表可视化** | 生成柱状图、折线图等 |
| **数据清洗** | 批量处理格式问题 |

---

## 年老师场景

### 供应商绩效统计
```
 xlsx Skill
   ↓
创建月度绩效表
   ↓
填充35家供应商数据
   ↓
计算排名和Top3占比
   ↓
生成可视化图表
```

### KPI仪表板
```
 Skill
   ↓
读取原始数据
   ↓
创建数据透视表
   ↓
添加条件格式（红绿灯）
   ↓
导出周报版本
```

---

## 调用示例

"用xlsx skill创建一个供应商季度绩效表，包含GMV、转化率、排名三个维度"

---

## 常用公式

| 需求 | 公式 |
|------|------|
| Top3占比 | `=SUM(IF(RANK<=3,GMV,0))/SUM(GMV)` |
| 同比增长 | `=(本期-上期)/上期` |
| 达成率 | `=实际/目标` |

---

## 注意事项

- **数据类型**：确保数字列格式正确
- **公式保留**：编辑时注意不要覆盖公式
- **打印区域**：设置好打印范围避免空白页
```

## XSD-SCHEMAS-REMOVED.txt

```
---
input: 需求
output: XSD-SCHEMAS-REMOVED.md
pos: .claude/skills/xlsx/XSD-SCHEMAS-REMOVED.md
---

# XSD Schemas已移除

## 说明
为节省存储空间，XSD schema文件已移除。

## 这些是什么
XSD (XML Schema Definition) 文件是Office文档格式（ISO/IEC 29500标准）的XML结构定义，用于：
- 解析.docx/.xlsx/.pptx文件内部结构
- 验证文档格式合规性
- 生成Office文档

## 为什么移除
1. **极少使用** - 供应商管理场景基本不涉及深度Office文档解析
2. **体积庞大** - 117个文件，占用数MB空间
3. **可重新获取** - 如需，可从官方下载

## 如何恢复（如需要）
```bash
# 从ISO标准下载
curl -O https://www.iso.org/standard/71691.html

# 或从ECMA标准下载
curl -O https://www.ecma-international.org/publications-and-standards/standards/ecma-376/
```

## 替代方案
如需处理Office文档，使用：
- Python: `openpyxl`, `python-docx`, `python-pptx`
- Node.js: `xlsx`, `docx` 等库
- 这些库已内置schema处理，无需原始XSD文件

---
*移除时间：2026-02-20*
```

## XSD Schemas（      39 files）

Schema files located at `scripts/office/schemas/`:
.claude/skills/xlsx/scripts/office/schemas/ISO-IEC29500-4_2016/dml-chart.xsd
.claude/skills/xlsx/scripts/office/schemas/ISO-IEC29500-4_2016/dml-chartDrawing.xsd
.claude/skills/xlsx/scripts/office/schemas/ISO-IEC29500-4_2016/dml-diagram.xsd
.claude/skills/xlsx/scripts/office/schemas/ISO-IEC29500-4_2016/dml-lockedCanvas.xsd
.claude/skills/xlsx/scripts/office/schemas/ISO-IEC29500-4_2016/dml-main.xsd
.claude/skills/xlsx/scripts/office/schemas/ISO-IEC29500-4_2016/dml-picture.xsd
.claude/skills/xlsx/scripts/office/schemas/ISO-IEC29500-4_2016/dml-spreadsheetDrawing.xsd
.claude/skills/xlsx/scripts/office/schemas/ISO-IEC29500-4_2016/dml-wordprocessingDrawing.xsd
.claude/skills/xlsx/scripts/office/schemas/ISO-IEC29500-4_2016/pml.xsd
.claude/skills/xlsx/scripts/office/schemas/ISO-IEC29500-4_2016/shared-additionalCharacteristics.xsd
.claude/skills/xlsx/scripts/office/schemas/ISO-IEC29500-4_2016/shared-bibliography.xsd
.claude/skills/xlsx/scripts/office/schemas/ISO-IEC29500-4_2016/shared-commonSimpleTypes.xsd
.claude/skills/xlsx/scripts/office/schemas/ISO-IEC29500-4_2016/shared-customXmlDataProperties.xsd
.claude/skills/xlsx/scripts/office/schemas/ISO-IEC29500-4_2016/shared-customXmlSchemaProperties.xsd
.claude/skills/xlsx/scripts/office/schemas/ISO-IEC29500-4_2016/shared-documentPropertiesCustom.xsd
.claude/skills/xlsx/scripts/office/schemas/ISO-IEC29500-4_2016/shared-documentPropertiesExtended.xsd
.claude/skills/xlsx/scripts/office/schemas/ISO-IEC29500-4_2016/shared-documentPropertiesVariantTypes.xsd
.claude/skills/xlsx/scripts/office/schemas/ISO-IEC29500-4_2016/shared-math.xsd
.claude/skills/xlsx/scripts/office/schemas/ISO-IEC29500-4_2016/shared-relationshipReference.xsd
.claude/skills/xlsx/scripts/office/schemas/ISO-IEC29500-4_2016/sml.xsd
.claude/skills/xlsx/scripts/office/schemas/ISO-IEC29500-4_2016/vml-main.xsd
.claude/skills/xlsx/scripts/office/schemas/ISO-IEC29500-4_2016/vml-officeDrawing.xsd
.claude/skills/xlsx/scripts/office/schemas/ISO-IEC29500-4_2016/vml-presentationDrawing.xsd
.claude/skills/xlsx/scripts/office/schemas/ISO-IEC29500-4_2016/vml-spreadsheetDrawing.xsd
.claude/skills/xlsx/scripts/office/schemas/ISO-IEC29500-4_2016/vml-wordprocessingDrawing.xsd
.claude/skills/xlsx/scripts/office/schemas/ISO-IEC29500-4_2016/wml.xsd
.claude/skills/xlsx/scripts/office/schemas/ISO-IEC29500-4_2016/xml.xsd
.claude/skills/xlsx/scripts/office/schemas/ecma/fouth-edition/opc-contentTypes.xsd
.claude/skills/xlsx/scripts/office/schemas/ecma/fouth-edition/opc-coreProperties.xsd
.claude/skills/xlsx/scripts/office/schemas/ecma/fouth-edition/opc-digSig.xsd
.claude/skills/xlsx/scripts/office/schemas/ecma/fouth-edition/opc-relationships.xsd
.claude/skills/xlsx/scripts/office/schemas/mce/mc.xsd
.claude/skills/xlsx/scripts/office/schemas/microsoft/wml-2010.xsd
.claude/skills/xlsx/scripts/office/schemas/microsoft/wml-2012.xsd
.claude/skills/xlsx/scripts/office/schemas/microsoft/wml-2018.xsd
.claude/skills/xlsx/scripts/office/schemas/microsoft/wml-cex-2018.xsd
.claude/skills/xlsx/scripts/office/schemas/microsoft/wml-cid-2016.xsd
.claude/skills/xlsx/scripts/office/schemas/microsoft/wml-sdtdatahash-2020.xsd
.claude/skills/xlsx/scripts/office/schemas/microsoft/wml-symex-2015.xsd

## 核心脚本

### recalc.py（根目录）

```python
#!/usr/bin/env python3
"""
Excel Formula Recalculation Script
Recalculates all formulas in an Excel file using LibreOffice
"""

import json
import sys
import subprocess
import os
import platform
from pathlib import Path
from openpyxl import load_workbook


def setup_libreoffice_macro():
    """Setup LibreOffice macro for recalculation if not already configured"""
    if platform.system() == 'Darwin':
        macro_dir = os.path.expanduser('~/Library/Application Support/LibreOffice/4/user/basic/Standard')
    else:
        macro_dir = os.path.expanduser('~/.config/libreoffice/4/user/basic/Standard')
    
    macro_file = os.path.join(macro_dir, 'Module1.xba')
    
    if os.path.exists(macro_file):
        with open(macro_file, 'r') as f:
            if 'RecalculateAndSave' in f.read():
                return True
    
    if not os.path.exists(macro_dir):
        subprocess.run(['soffice', '--headless', '--terminate_after_init'], 
                      capture_output=True, timeout=10)
        os.makedirs(macro_dir, exist_ok=True)
    
    macro_content = '''<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE script:module PUBLIC "-//OpenOffice.org//DTD OfficeDocument 1.0//EN" "module.dtd">
<script:module xmlns:script="http://openoffice.org/2000/script" script:name="Module1" script:language="StarBasic">
    Sub RecalculateAndSave()
      ThisComponent.calculateAll()
      ThisComponent.store()
      ThisComponent.close(True)
    End Sub
</script:module>'''
    
    try:
        with open(macro_file, 'w') as f:
            f.write(macro_content)
        return True
    except Exception:
        return False


def recalc(filename, timeout=30):
    """
    Recalculate formulas in Excel file and report any errors
    
    Args:
        filename: Path to Excel file
        timeout: Maximum time to wait for recalculation (seconds)
    
    Returns:
        dict with error locations and counts
    """
    if not Path(filename).exists():
        return {'error': f'File {filename} does not exist'}
    
    abs_path = str(Path(filename).absolute())
    
    if not setup_libreoffice_macro():
        return {'error': 'Failed to setup LibreOffice macro'}
    
    cmd = [
        'soffice', '--headless', '--norestore',
        'vnd.sun.star.script:Standard.Module1.RecalculateAndSave?language=Basic&location=application',
        abs_path
    ]
    
    # Handle timeout command differences between Linux and macOS
    if platform.system() != 'Windows':
        timeout_cmd = 'timeout' if platform.system() == 'Linux' else None
        if platform.system() == 'Darwin':
            # Check if gtimeout is available on macOS
            try:
                subprocess.run(['gtimeout', '--version'], capture_output=True, timeout=1, check=False)
                timeout_cmd = 'gtimeout'
            except (FileNotFoundError, subprocess.TimeoutExpired):
                pass
        
        if timeout_cmd:
            cmd = [timeout_cmd, str(timeout)] + cmd
    
    result = subprocess.run(cmd, capture_output=True, text=True)
    
    if result.returncode != 0 and result.returncode != 124:  # 124 is timeout exit code
        error_msg = result.stderr or 'Unknown error during recalculation'
        if 'Module1' in error_msg or 'RecalculateAndSave' not in error_msg:
            return {'error': 'LibreOffice macro not configured properly'}
        else:
            return {'error': error_msg}
    
    # Check for Excel errors in the recalculated file - scan ALL cells
    try:
        wb = load_workbook(filename, data_only=True)
        
        excel_errors = ['#VALUE!', '#DIV/0!', '#REF!', '#NAME?', '#NULL!', '#NUM!', '#N/A']
        error_details = {err: [] for err in excel_errors}
        total_errors = 0
        
        for sheet_name in wb.sheetnames:
            ws = wb[sheet_name]
            # Check ALL rows and columns - no limits
            for row in ws.iter_rows():
                for cell in row:
                    if cell.value is not None and isinstance(cell.value, str):
                        for err in excel_errors:
                            if err in cell.value:
                                location = f"{sheet_name}!{cell.coordinate}"
                                error_details[err].append(location)
                                total_errors += 1
                                break
        
        wb.close()
        
        # Build result summary
        result = {
            'status': 'success' if total_errors == 0 else 'errors_found',
            'total_errors': total_errors,
            'error_summary': {}
        }
        
        # Add non-empty error categories
        for err_type, locations in error_details.items():
            if locations:
                result['error_summary'][err_type] = {
                    'count': len(locations),
                    'locations': locations[:20]  # Show up to 20 locations
                }
        
        # Add formula count for context - also check ALL cells
        wb_formulas = load_workbook(filename, data_only=False)
        formula_count = 0
        for sheet_name in wb_formulas.sheetnames:
            ws = wb_formulas[sheet_name]
            for row in ws.iter_rows():
                for cell in row:
                    if cell.value and isinstance(cell.value, str) and cell.value.startswith('='):
                        formula_count += 1
        wb_formulas.close()
        
        result['total_formulas'] = formula_count
        
        return result
        
    except Exception as e:
        return {'error': str(e)}


def main():
    if len(sys.argv) < 2:
        print("Usage: python recalc.py <excel_file> [timeout_seconds]")
        print("\nRecalculates all formulas in an Excel file using LibreOffice")
        print("\nReturns JSON with error details:")
        print("  - status: 'success' or 'errors_found'")
        print("  - total_errors: Total number of Excel errors found")
        print("  - total_formulas: Number of formulas in the file")
        print("  - error_summary: Breakdown by error type with locations")
        print("    - #VALUE!, #DIV/0!, #REF!, #NAME?, #NULL!, #NUM!, #N/A")
        sys.exit(1)
    
    filename = sys.argv[1]
    timeout = int(sys.argv[2]) if len(sys.argv) > 2 else 30
    
    result = recalc(filename, timeout)
    print(json.dumps(result, indent=2))


if __name__ == '__main__':
    main()
```

### scripts/recalc.py

```python
"""
Excel Formula Recalculation Script
Recalculates all formulas in an Excel file using LibreOffice
"""

import json
import os
import platform
import subprocess
import sys
from pathlib import Path

from office.soffice import get_soffice_env

from openpyxl import load_workbook

MACRO_DIR_MACOS = "~/Library/Application Support/LibreOffice/4/user/basic/Standard"
MACRO_DIR_LINUX = "~/.config/libreoffice/4/user/basic/Standard"
MACRO_FILENAME = "Module1.xba"

RECALCULATE_MACRO = """<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE script:module PUBLIC "-//OpenOffice.org//DTD OfficeDocument 1.0//EN" "module.dtd">
<script:module xmlns:script="http://openoffice.org/2000/script" script:name="Module1" script:language="StarBasic">
    Sub RecalculateAndSave()
      ThisComponent.calculateAll()
      ThisComponent.store()
      ThisComponent.close(True)
    End Sub
</script:module>"""


def has_gtimeout():
    try:
        subprocess.run(
            ["gtimeout", "--version"], capture_output=True, timeout=1, check=False
        )
        return True
    except (FileNotFoundError, subprocess.TimeoutExpired):
        return False


def setup_libreoffice_macro():
    macro_dir = os.path.expanduser(
        MACRO_DIR_MACOS if platform.system() == "Darwin" else MACRO_DIR_LINUX
    )
    macro_file = os.path.join(macro_dir, MACRO_FILENAME)

    if (
        os.path.exists(macro_file)
        and "RecalculateAndSave" in Path(macro_file).read_text()
    ):
        return True

    if not os.path.exists(macro_dir):
        subprocess.run(
            ["soffice", "--headless", "--terminate_after_init"],
            capture_output=True,
            timeout=10,
            env=get_soffice_env(),
        )
        os.makedirs(macro_dir, exist_ok=True)

    try:
        Path(macro_file).write_text(RECALCULATE_MACRO)
        return True
    except Exception:
        return False


def recalc(filename, timeout=30):
    if not Path(filename).exists():
        return {"error": f"File {filename} does not exist"}

    abs_path = str(Path(filename).absolute())

    if not setup_libreoffice_macro():
        return {"error": "Failed to setup LibreOffice macro"}

    cmd = [
        "soffice",
        "--headless",
        "--norestore",
        "vnd.sun.star.script:Standard.Module1.RecalculateAndSave?language=Basic&location=application",
        abs_path,
    ]

    if platform.system() == "Linux":
        cmd = ["timeout", str(timeout)] + cmd
    elif platform.system() == "Darwin" and has_gtimeout():
        cmd = ["gtimeout", str(timeout)] + cmd

    result = subprocess.run(cmd, capture_output=True, text=True, env=get_soffice_env())

    if result.returncode != 0 and result.returncode != 124:  
        error_msg = result.stderr or "Unknown error during recalculation"
        if "Module1" in error_msg or "RecalculateAndSave" not in error_msg:
            return {"error": "LibreOffice macro not configured properly"}
        return {"error": error_msg}

    try:
        wb = load_workbook(filename, data_only=True)

        excel_errors = [
            "#VALUE!",
            "#DIV/0!",
            "#REF!",
            "#NAME?",
            "#NULL!",
            "#NUM!",
            "#N/A",
        ]
        error_details = {err: [] for err in excel_errors}
        total_errors = 0

        for sheet_name in wb.sheetnames:
            ws = wb[sheet_name]
            for row in ws.iter_rows():
                for cell in row:
                    if cell.value is not None and isinstance(cell.value, str):
                        for err in excel_errors:
                            if err in cell.value:
                                location = f"{sheet_name}!{cell.coordinate}"
                                error_details[err].append(location)
                                total_errors += 1
                                break

        wb.close()

        result = {
            "status": "success" if total_errors == 0 else "errors_found",
            "total_errors": total_errors,
            "error_summary": {},
        }

        for err_type, locations in error_details.items():
            if locations:
                result["error_summary"][err_type] = {
                    "count": len(locations),
                    "locations": locations[:20],  
                }

        wb_formulas = load_workbook(filename, data_only=False)
        formula_count = 0
        for sheet_name in wb_formulas.sheetnames:
            ws = wb_formulas[sheet_name]
            for row in ws.iter_rows():
                for cell in row:
                    if (
                        cell.value
                        and isinstance(cell.value, str)
                        and cell.value.startswith("=")
                    ):
                        formula_count += 1
        wb_formulas.close()

        result["total_formulas"] = formula_count

        return result

    except Exception as e:
        return {"error": str(e)}


def main():
    if len(sys.argv) < 2:
        print("Usage: python recalc.py <excel_file> [timeout_seconds]")
        print("\nRecalculates all formulas in an Excel file using LibreOffice")
        print("\nReturns JSON with error details:")
        print("  - status: 'success' or 'errors_found'")
        print("  - total_errors: Total number of Excel errors found")
        print("  - total_formulas: Number of formulas in the file")
        print("  - error_summary: Breakdown by error type with locations")
        print("    - #VALUE!, #DIV/0!, #REF!, #NAME?, #NULL!, #NUM!, #N/A")
        sys.exit(1)

    filename = sys.argv[1]
    timeout = int(sys.argv[2]) if len(sys.argv) > 2 else 30

    result = recalc(filename, timeout)
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
```

### scripts/create_supplier_scorecard.py

```python
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side, numbers
from openpyxl.utils import get_column_letter

wb = Workbook()

# Color scheme
HEADER_FILL = PatternFill('solid', start_color='1F3864')
HEADER_FONT = Font(name='Calibri', bold=True, color='FFFFFF', size=11)
SUBHEAD_FILL = PatternFill('solid', start_color='D6E4F0')
SUBHEAD_FONT = Font(name='Calibri', bold=True, color='1F3864', size=11)
INPUT_FONT = Font(name='Calibri', color='0000FF', size=11)
FORMULA_FONT = Font(name='Calibri', color='000000', size=11)
LINK_FONT = Font(name='Calibri', color='008000', size=11)
A_FILL = PatternFill('solid', start_color='C6EFCE')
B_FILL = PatternFill('solid', start_color='FFEB9C')
C_FILL = PatternFill('solid', start_color='FFC7CE')
LIGHT_FILL = PatternFill('solid', start_color='F2F2F2')
WHITE_FILL = PatternFill('solid', start_color='FFFFFF')
TITLE_FONT = Font(name='Calibri', bold=True, size=14, color='1F3864')
BORDER = Border(
    left=Side(style='thin'), right=Side(style='thin'),
    top=Side(style='thin'), bottom=Side(style='thin'))

def style_header_row(ws, row, max_col):
    for c in range(1, max_col + 1):
        cell = ws.cell(row=row, column=c)
        cell.font = HEADER_FONT
        cell.fill = HEADER_FILL
        cell.alignment = Alignment(horizontal='center', vertical='center', wrap_text=True)
        cell.border = BORDER

def style_data_cell(ws, row, col, font=None, fill=None, center=False):
    cell = ws.cell(row=row, column=col)
    cell.font = font or FORMULA_FONT
    if fill: cell.fill = fill
    cell.alignment = Alignment(horizontal='center' if center else 'left', vertical='center', wrap_text=True)
    cell.border = BORDER
    return cell

def add_table_borders(ws, start_row, end_row, max_col):
    for r in range(start_row, end_row + 1):
        for c in range(1, max_col + 1):
            ws.cell(row=r, column=c).border = BORDER

# ════════════════════════════════════════════════════════
# Sheet 1: 供应商基础信息
# ════════════════════════════════════════════════════════
ws1 = wb.active
ws1.title = '供应商基础信息'
ws1.sheet_properties.tabColor = '1F3864'

ws1.merge_cells('A1:F1')
ws1['A1'].value = '供应商基础信息'
ws1['A1'].font = TITLE_FONT
ws1['A1'].alignment = Alignment(horizontal='left', vertical='center')
ws1.row_dimensions[1].height = 30

headers1 = ['序号', '供应商名称', '供应商编码', '业务线', '合作起始日期', '当前等级']
col_widths1 = [8, 25, 18, 15, 18, 15]
for i, (h, w) in enumerate(zip(headers1, col_widths1), 1):
    ws1.cell(row=3, column=i, value=h)
    ws1.column_dimensions[get_column_letter(i)].width = w
style_header_row(ws1, 3, len(headers1))

# Sample rows (33 suppliers)
sample_names = ['毅航', '毛毛虫', '伽玛', '赛维斯', '岐力', '翰锐', '供应商G', '供应商H', '供应商I']
business_lines = ['金条', '企金', '信用卡', '财富']
for i in range(9):
    r = 4 + i
    ws1.cell(row=r, column=1, value=i+1)
    ws1.cell(row=r, column=2, value=sample_names[i] if i < len(sample_names) else f'供应商{chr(65+i)}')
    ws1.cell(row=r, column=3, value=f'SUP-{str(i+1).zfill(3)}')
    ws1.cell(row=r, column=4, value=business_lines[i % 4])
    ws1.cell(row=r, column=5, value='2024-01-01')
    ws1.cell(row=r, column=6, value='B')
    for c in range(1, 7):
        cell = ws1.cell(row=r, column=c)
        cell.font = INPUT_FONT if c in [2,4,5,6] else FORMULA_FONT
        cell.alignment = Alignment(horizontal='center', vertical='center')
        cell.border = BORDER

for r in range(4, 36):
    ws1.row_dimensions[r].height = 22

# ════════════════════════════════════════════════════════
# Sheet 2: 业务督导评分（60分）
# ════════════════════════════════════════════════════════
ws2 = wb.create_sheet('业务督导评分(60分)')
ws2.sheet_properties.tabColor = '2E75B6'

ws2.merge_cells('A1:H1')
ws2['A1'].value = '业务督导评分表（定量 · 满分60分）'
ws2['A1'].font = TITLE_FONT
ws2.row_dimensions[1].height = 30

# Scoring rules reference
ws2.merge_cells('A3:H3')
ws2['A3'].value = '评分规则参考'
ws2['A3'].font = SUBHEAD_FONT
ws2['A3'].fill = SUBHEAD_FILL

rules = [
    ['产能达成率(25分)', '≥100%=25分, 90-99%=比例分, 80-89%=20分, 70-79%=15分, <70%=10分'],
    ['人均产出(15分)', '≥目标=15分, 90-99%=比例分, 80-89%=12分, 70-79%=9分, <70%=6分'],
    ['交付时效率(10分)', '≥95%=10分, 90-94%=8分, 85-89%=6分, 80-84%=4分, <80%=2分'],
    ['任务完成率(5分)', '100%=5分, 95-99%=4分, 90-94%=3分, 85-89%=2分, <85%=1分'],
    ['业务增长率(5分)', '≥10%=5分, 5-9%=4分, 0-4%=3分, 下滑0-5%=2分, 下滑>5%=1分'],
]
for i, (name, rule) in enumerate(rules):
    ws2.cell(row=4+i, column=1, value=name).font = Font(name='Calibri', bold=True, size=10)
    ws2.cell(row=4+i, column=2, value=rule).font = Font(name='Calibri', size=10)
    ws2.merge_cells(start_row=4+i, start_column=2, end_row=4+i, end_column=8)

# Data entry headers
data_row = 10
headers2 = ['供应商名称', '评估季度', '目标产能', '实际产能', '产能达成率', '产能得分(25分)',
            '人均产出', '人均得分(15分)', '按时工单数', '总工单数', '交付效率(%)', '时效得分(10分)',
            '完成任务数', '下发任务数', '完成率(%)', '任务得分(5分)',
            '上期产能', '增长率(%)', '增长得分(5分)', '业务督导总分']
col_widths2 = [18, 15, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 15]
for i, (h, w) in enumerate(zip(headers2, col_widths2), 1):
    ws2.cell(row=data_row, column=i, value=h)
    ws2.column_dimensions[get_column_letter(i)].width = w
style_header_row(ws2, data_row, len(headers2))

# Formulas for first supplier (row 11 = Excel row)
r = 11
# A: supplier name (link from sheet1)
ws2.cell(row=r, column=1).value = "='供应商基础信息'!B4"
# B: quarter (input)
ws2.cell(row=r, column=2).value = '2026-Q1'
ws2.cell(row=r, column=2).font = INPUT_FONT
# C: target capacity (input)
ws2.cell(row=r, column=3).font = INPUT_FONT
# D: actual capacity (input)
ws2.cell(row=r, column=4).font = INPUT_FONT
# E: capacity rate
ws2.cell(row=r, column=5).value = '=IF(C11=0,0,D11/C11)'
ws2.cell(row=r, column=5).number_format = '0.0%'
# F: capacity score using IFS
ws2.cell(row=r, column=6).value = '=IF(E11>=1,25,IF(E11>=0.9,E11*25,IF(E11>=0.8,20,IF(E11>=0.7,15,10))))'
# G: per capita output (input)
ws2.cell(row=r, column=7).font = INPUT_FONT
# H: per capita score
ws2.cell(row=r, column=8).value = '=IF(G11>=1,15,IF(G11>=0.9,G11*15,IF(G11>=0.8,12,IF(G11>=0.7,9,6))))'
# I: on-time orders (input)
ws2.cell(row=r, column=9).font = INPUT_FONT
# J: total orders (input)
ws2.cell(row=r, column=10).font = INPUT_FONT
# K: delivery rate
ws2.cell(row=r, column=11).value = '=IF(J11=0,0,I11/J11)'
ws2.cell(row=r, column=11).number_format = '0.0%'
# L: delivery score
ws2.cell(row=r, column=12).value = '=IF(K11>=0.95,10,IF(K11>=0.9,8,IF(K11>=0.85,6,IF(K11>=0.8,4,2))))'
# M: completed tasks (input)
ws2.cell(row=r, column=13).font = INPUT_FONT
# N: assigned tasks (input)
ws2.cell(row=r, column=14).font = INPUT_FONT
# O: completion rate
ws2.cell(row=r, column=15).value = '=IF(N11=0,0,M11/N11)'
ws2.cell(row=r, column=15).number_format = '0.0%'
# P: task score
ws2.cell(row=r, column=16).value = '=IF(O11>=1,5,IF(O11>=0.95,4,IF(O11>=0.9,3,IF(O11>=0.85,2,1))))'
# Q: last period capacity (input)
ws2.cell(row=r, column=17).font = INPUT_FONT
# R: growth rate
ws2.cell(row=r, column=18).value = '=IF(Q11=0,0,(D11-Q11)/Q11)'
ws2.cell(row=r, column=18).number_format = '0.0%'
# S: growth score
ws2.cell(row=r, column=19).value = '=IF(R11>=0.1,5,IF(R11>=0.05,4,IF(R11>=0,3,IF(R11>=-0.05,2,1))))'
# T: total score
ws2.cell(row=r, column=20).value = '=F11+H11+L11+P11+S11'
ws2.cell(row=r, column=20).font = Font(name='Calibri', bold=True, color='1F3864', size=12)

# Apply styles to row 11
for c in range(1, 21):
    cell = ws2.cell(row=r, column=c)
    if c not in [6,8,12,16,19,20,5,11,15,18]:
        cell.font = FORMULA_FONT
    cell.alignment = Alignment(horizontal='center', vertical='center', wrap_text=True)
    cell.border = BORDER

# Extend formulas to 33 suppliers
for r in range(12, 37):
    src = r - 1
    for c in range(1, 21):
        old_cell = get_column_letter(c) + str(src)
        new_cell = get_column_letter(c) + str(r)
        old_formula = ws2.cell(row=src, column=c).value
        if old_formula and isinstance(old_formula, str) and old_formula.startswith('='):
            # Adjust row references
            import re
            def adj_row(match):
                ref = match.group(0)
                # Extract row number
                row_match = re.search(r'\d+', ref)
                if row_match:
                    old_row = int(row_match.group())
                    new_ref = ref.replace(str(old_row), str(old_row + 1))
                    return new_ref
                return ref
            ws2.cell(row=r, column=c).value = re.sub(r'[A-Z]+\d+', adj_row, old_formula)
        else:
            if c == 1:
                ws2.cell(row=r, column=c).value = f"='供应商基础信息'!B{r-7}"
        cell = ws2.cell(row=r, column=c)
        cell.alignment = Alignment(horizontal='center', vertical='center', wrap_text=True)
        cell.border = BORDER
        if c == 20:
            cell.font = Font(name='Calibri', bold=True, color='1F3864', size=12)

for r in range(11, 37):
    ws2.row_dimensions[r].height = 22

# ════════════════════════════════════════════════════════
# Sheet 3: 供应商管理评分（30分）
# ════════════════════════════════════════════════════════
ws3 = wb.create_sheet('供应商管理评分(30分)')
ws3.sheet_properties.tabColor = 'BF8F00'

ws3.merge_cells('A1:G1')
ws3['A1'].value = '供应商管理评分表（定性 · 满分30分）'
ws3['A1'].font = TITLE_FONT
ws3.row_dimensions[1].height = 30

# Scoring rules
ws3.merge_cells('A3:G3')
ws3['A3'].value = '评分规则参考'
ws3['A3'].font = SUBHEAD_FONT
ws3['A3'].fill = SUBHEAD_FILL

rules3 = [
    ['响应速度(8分)', '5档=8分, 4档=6分, 3档=4分, 2档=2分, 1档=0分'],
    ['配合度(8分)', '5档=8分, 4档=6分, 3档=4分, 2档=2分, 1档=0分'],
    ['团队稳定性(6分)', '流失率<5%=6分, 5-10%=4分, 10-15%=3分, >15%=1分'],
    ['整改执行力(5分)', '闭环率100%=5分, 90-99%=4分, 80-89%=3分, <80%=1分'],
    ['管理规范性(3分)', '无违规=3分, 轻微=2分, 一般=1分, 严重=0分'],
]
for i, (name, rule) in enumerate(rules3):
    ws3.cell(row=4+i, column=1, value=name).font = Font(name='Calibri', bold=True, size=10)
    ws3.cell(row=4+i, column=2, value=rule).font = Font(name='Calibri', size=10)
    ws3.merge_cells(start_row=4+i, start_column=2, end_row=4+i, end_column=7)

data_row3 = 10
headers3 = ['供应商名称', '评估季度', '响应速度(1-5档)', '响应得分(8分)',
            '配合度(1-5档)', '配合得分(8分)', '团队流失率(%)', '稳定性得分(6分)',
            '整改闭环率(%)', '整改得分(5分)', '管理规范性(1-5档)', '规范得分(3分)', '供应商管理总分']
col_widths3 = [18, 15, 15, 12, 15, 12, 15, 12, 15, 12, 18, 12, 15]
for i, (h, w) in enumerate(zip(headers3, col_widths3), 1):
    ws3.cell(row=data_row3, column=i, value=h)
    ws3.column_dimensions[get_column_letter(i)].width = w
style_header_row(ws3, data_row3, len(headers3))

r = 11
ws3.cell(row=r, column=1).value = "='供应商基础信息'!B4"
ws3.cell(row=r, column=2).value = '2026-Q1'
ws3.cell(row=r, column=2).font = INPUT_FONT
# Response speed (1-5档 input)
ws3.cell(row=r, column=3).font = INPUT_FONT
ws3.cell(row=r, column=4).value = '=IF(C11>=5,8,IF(C11>=4,6,IF(C11>=3,4,IF(C11>=2,2,0))))'
# Cooperation (1-5档 input)
ws3.cell(row=r, column=5).font = INPUT_FONT
ws3.cell(row=r, column=6).value = '=IF(E11>=5,8,IF(E11>=4,6,IF(E11>=3,4,IF(E11>=2,2,0))))'
# Turnover rate (input)
ws3.cell(row=r, column=7).font = INPUT_FONT
ws3.cell(row=r, column=7).number_format = '0.0%'
ws3.cell(row=r, column=8).value = '=IF(G11<0.05,6,IF(G11<0.1,4,IF(G11<0.15,3,1)))'
# Rectification rate (input)
ws3.cell(row=r, column=9).font = INPUT_FONT
ws3.cell(row=r, column=9).number_format = '0.0%'
ws3.cell(row=r, column=10).value = '=IF(I11>=1,5,IF(I11>=0.9,4,IF(I11>=0.8,3,1)))'
# Management norm (1-5档 input)
ws3.cell(row=r, column=11).font = INPUT_FONT
ws3.cell(row=r, column=12).value = '=IF(K11>=5,3,IF(K11>=4,2,IF(K11>=3,1,0)))'
# Total
ws3.cell(row=r, column=13).value = '=D11+F11+H11+J11+L11'
ws3.cell(row=r, column=13).font = Font(name='Calibri', bold=True, color='1F3864', size=12)

for c in range(1, 14):
    cell = ws3.cell(row=r, column=c)
    cell.alignment = Alignment(horizontal='center', vertical='center', wrap_text=True)
    cell.border = BORDER

for r in range(12, 37):
    src = r - 1
    for c in range(1, 14):
        old_formula = ws3.cell(row=src, column=c).value
        if old_formula and isinstance(old_formula, str) and old_formula.startswith('='):
            import re
            def adj_row2(match):
                ref = match.group(0)
                row_match = re.search(r'\d+', ref)
                if row_match:
                    return ref.replace(str(int(row_match.group())), str(int(row_match.group()) + 1))
                return ref
            ws3.cell(row=r, column=c).value = re.sub(r'[A-Z]+\d+', adj_row2, old_formula)
        elif c == 1:
            ws3.cell(row=r, column=c).value = f"='供应商基础信息'!B{r-7}"
        cell = ws3.cell(row=r, column=c)
        cell.alignment = Alignment(horizontal='center', vertical='center', wrap_text=True)
        cell.border = BORDER
        if c == 13:
            cell.font = Font(name='Calibri', bold=True, color='1F3864', size=12)

for r in range(11, 37):
    ws3.row_dimensions[r].height = 22

# ════════════════════════════════════════════════════════
# Sheet 4: 质检评分（10分）
# ════════════════════════════════════════════════════════
ws4 = wb.create_sheet('质检评分(10分)')
ws4.sheet_properties.tabColor = '548235'

ws4.merge_cells('A1:E1')
ws4['A1'].value = '质检评分表（定量 · 满分10分）'
ws4['A1'].font = TITLE_FONT
ws4.row_dimensions[1].height = 30

ws4.merge_cells('A3:E3')
ws4['A3'].value = '评分规则参考'
ws4['A3'].font = SUBHEAD_FONT
ws4['A3'].fill = SUBHEAD_FILL

rules4 = [
    ['质检合格率(5分)', '≥98%=5分, 95-97%=4分, 90-94%=3分, 85-89%=2分, <85%=1分'],
    ['客户投诉率(3分)', '≤0.1%=3分, 0.1-0.3%=2分, 0.3-0.5%=1分, >0.5%=0分'],
    ['红线事件(2分)', '0次=2分, 1次=0分, ≥2次=0分+直接降为C级'],
]
for i, (name, rule) in enumerate(rules4):
    ws4.cell(row=4+i, column=1, value=name).font = Font(name='Calibri', bold=True, size=10)
    ws4.cell(row=4+i, column=2, value=rule).font = Font(name='Calibri', size=10)
    ws4.merge_cells(start_row=4+i, start_column=2, end_row=4+i, end_column=5)

data_row4 = 8
headers4 = ['供应商名称', '评估季度', '质检合格率(%)', '合格率得分(5分)',
            '投诉工单数', '总工单数', '投诉率(%)', '投诉得分(3分)',
            '红线事件次数', '红线得分(2分)', '质检总分']
col_widths4 = [18, 15, 15, 15, 12, 12, 12, 12, 15, 12, 12]
for i, (h, w) in enumerate(zip(headers4, col_widths4), 1):
    ws4.cell(row=data_row4, column=i, value=h)
    ws4.column_dimensions[get_column_letter(i)].width = w
style_header_row(ws4, data_row4, len(headers4))

r = 9
ws4.cell(row=r, column=1).value = "='供应商基础信息'!B4"
ws4.cell(row=r, column=2).value = '2026-Q1'
ws4.cell(row=r, column=2).font = INPUT_FONT
# Quality rate (input)
ws4.cell(row=r, column=3).font = INPUT_FONT
ws4.cell(row=r, column=3).number_format = '0.0%'
# Quality score
ws4.cell(row=r, column=4).value = '=IF(C9>=0.98,5,IF(C9>=0.95,4,IF(C9>=0.9,3,IF(C9>=0.85,2,1))))'
# Complaint orders (input)
ws4.cell(row=r, column=5).font = INPUT_FONT
# Total orders (input)
ws4.cell(row=r, column=6).font = INPUT_FONT
# Complaint rate
ws4.cell(row=r, column=7).value = '=IF(F9=0,0,E9/F9)'
ws4.cell(row=r, column=7).number_format = '0.00%'
# Complaint score
ws4.cell(row=r, column=8).value = '=IF(G9<=0.001,3,IF(G9<=0.003,2,IF(G9<=0.005,1,0)))'
# Redline events (input)
ws4.cell(row=r, column=9).font = INPUT_FONT
# Redline score
ws4.cell(row=r, column=10).value = '=IF(I9=0,2,0)'
# Total
ws4.cell(row=r, column=11).value = '=D9+H9+J9'
ws4.cell(row=r, column=11).font = Font(name='Calibri', bold=True, color='1F3864', size=12)

for c in range(1, 12):
    cell = ws4.cell(row=r, column=c)
    cell.alignment = Alignment(horizontal='center', vertical='center', wrap_text=True)
    cell.border = BORDER

for r in range(10, 36):
    src = r - 1
    for c in range(1, 12):
        old_formula = ws4.cell(row=src, column=c).value
        if old_formula and isinstance(old_formula, str) and old_formula.startswith('='):
            import re
            def adj_row3(match):
                ref = match.group(0)
                row_match = re.search(r'\d+', ref)
                if row_match:
                    return ref.replace(str(int(row_match.group())), str(int(row_match.group()) + 1))
                return ref
            ws4.cell(row=r, column=c).value = re.sub(r'[A-Z]+\d+', adj_row3, old_formula)
        elif c == 1:
            ws4.cell(row=r, column=c).value = f"='供应商基础信息'!B{r-5}"
        cell = ws4.cell(row=r, column=c)
        cell.alignment = Alignment(horizontal='center', vertical='center', wrap_text=True)
        cell.border = BORDER
        if c == 11:
            cell.font = Font(name='Calibri', bold=True, color='1F3864', size=12)

for r in range(9, 36):
    ws4.row_dimensions[r].height = 22

# ════════════════════════════════════════════════════════
# Sheet 5: 综合评定
# ════════════════════════════════════════════════════════
ws5 = wb.create_sheet('综合评定')
ws5.sheet_properties.tabColor = 'C00000'

ws5.merge_cells('A1:L1')
ws5['A1'].value = '供应商ABC分层分级 — 综合评定表'
ws5['A1'].font = TITLE_FONT
ws5.row_dimensions[1].height = 30

ws5.merge_cells('A3:L3')
ws5['A3'].value = '分级规则：≥85分=A级，70-84分=B级，<70分=C级 | 排名后30%降一级 | 连续2季度C级启动淘汰'
ws5['A3'].font = Font(name='Calibri', bold=True, italic=True, color='C00000', size=10)
ws5['A3'].alignment = Alignment(wrap_text=True)

data_row5 = 5
headers5 = ['供应商名称', '业务督导得分(60)', '供应商管理得分(30)', '质检得分(10)',
            '综合得分(100)', '综合排名', '基准等级', '排名是否后30%',
            '最终等级', '连续C季度数', '是否触发PIP', '是否触发淘汰']
col_widths5 = [18, 18, 18, 12, 12, 10, 10, 14, 10, 14, 12, 12]
for i, (h, w) in enumerate(zip(headers5, col_widths5), 1):
    ws5.cell(row=data_row5, column=i, value=h)
    ws5.column_dimensions[get_column_letter(i)].width = w
style_header_row(ws5, data_row5, len(headers5))

r = 6
ws5.cell(row=r, column=1).value = "='供应商基础信息'!B4"
# Link scores from other sheets
ws5.cell(row=r, column=2).value = "='业务督导评分(60分)'!T11"
ws5.cell(row=r, column=3).value = "='供应商管理评分(30分)'!M11"
ws5.cell(row=r, column=4).value = "='质检评分(10分)'!K11"
# Total score
ws5.cell(row=r, column=5).value = '=B6+C6+D6'
ws5.cell(row=r, column=5).font = Font(name='Calibri', bold=True, size=12, color='1F3864')
# Rank
ws5.cell(row=r, column=6).value = '=RANK(E6,$E$6:$E$38,0)'
# Base grade
ws5.cell(row=r, column=7).value = '=IF(E6>=85,"A",IF(E6>=70,"B","C"))'
# Is bottom 30%
total_suppliers = 33
bottom30_threshold = int(total_suppliers * 0.7)
ws5.cell(row=r, column=8).value = f'=IF(F6>{bottom30_threshold},"是","否")'
# Final grade (downgrade if bottom 30%)
ws5.cell(row=r, column=9).value = '=IF(H6="是",IF(G6="A","B",IF(G6="B","C","C")),G6)'
# Consecutive C quarters (input)
ws5.cell(row=r, column=10).font = INPUT_FONT
ws5.cell(row=r, column=10).value = 0
# Trigger PIP
ws5.cell(row=r, column=11).value = '=IF(I6="C","是","否")'
# Trigger elimination
ws5.cell(row=r, column=12).value = '=IF(OR(I6="C",J6>=2),"是","否")'

for c in range(1, 13):
    cell = ws5.cell(row=r, column=c)
    cell.alignment = Alignment(horizontal='center', vertical='center')
    cell.border = BORDER

for r in range(7, 39):
    src = r - 1
    for c in range(1, 13):
        old_formula = ws5.cell(row=src, column=c).value
        if old_formula and isinstance(old_formula, str) and old_formula.startswith('='):
            import re
            def adj_row4(match):
                ref = match.group(0)
                row_match = re.search(r'\d+', ref)
                if row_match:
                    old_r = int(row_match.group())
                    # Handle absolute references
                    if '$' in ref:
                        col_part = ref.split('$')[0]
                        return ref  # keep absolute
                    return ref.replace(str(old_r), str(old_r + 1))
                return ref
            ws5.cell(row=r, column=c).value = re.sub(r'[A-Z]+\$?\d+', adj_row4, old_formula)
        elif c == 1:
            ws5.cell(row=r, column=c).value = f"='供应商基础信息'!B{r-2}"
        cell = ws5.cell(row=r, column=c)
        cell.alignment = Alignment(horizontal='center', vertical='center')
        cell.border = BORDER
        if c == 5:
            cell.font = Font(name='Calibri', bold=True, size=12, color='1F3864')

# Conditional formatting via colors for final grade
for r in range(6, 39):
    cell = ws5.cell(row=r, column=9)
    # Will be colored after recalc, set up data validation note

# Add summary section
sum_row = 41
ws5.cell(row=sum_row, column=1, value='分级统计').font = SUBHEAD_FONT
ws5.cell(row=sum_row, column=1).fill = SUBHEAD_FILL

ws5.cell(row=sum_row+1, column=1, value='A级数量').font = Font(name='Calibri', bold=True, size=11)
ws5.cell(row=sum_row+1, column=2).value = '=COUNTIF(I6:I38,"A")'
ws5.cell(row=sum_row+1, column=3, value='占比').font = Font(name='Calibri', size=11)
ws5.cell(row=sum_row+1, column=4).value = '=B42/COUNTA(I6:I38)'
ws5.cell(row=sum_row+1, column=4).number_format = '0.0%'
ws5.cell(row=sum_row+1, column=4).fill = A_FILL

ws5.cell(row=sum_row+2, column=1, value='B级数量').font = Font(name='Calibri', bold=True, size=11)
ws5.cell(row=sum_row+2, column=2).value = '=COUNTIF(I6:I38,"B")'
ws5.cell(row=sum_row+2, column=3, value='占比').font = Font(name='Calibri', size=11)
ws5.cell(row=sum_row+2, column=4).value = '=B43/COUNTA(I6:I38)'
ws5.cell(row=sum_row+2, column=4).number_format = '0.0%'
ws5.cell(row=sum_row+2, column=4).fill = B_FILL

ws5.cell(row=sum_row+3, column=1, value='C级数量').font = Font(name='Calibri', bold=True, size=11)
ws5.cell(row=sum_row+3, column=2).value = '=COUNTIF(I6:I38,"C")'
ws5.cell(row=sum_row+3, column=3, value='占比').font = Font(name='Calibri', size=11)
ws5.cell(row=sum_row+3, column=4).value = '=B44/COUNTA(I6:I38)'
ws5.cell(row=sum_row+3, column=4).number_format = '0.0%'
ws5.cell(row=sum_row+3, column=4).fill = C_FILL

ws5.cell(row=sum_row+5, column=1, value='触发PIP数量').font = Font(name='Calibri', bold=True, size=11, color='C00000')
ws5.cell(row=sum_row+5, column=2).value = '=COUNTIF(K6:K38,"是")'

ws5.cell(row=sum_row+6, column=1, value='触发淘汰数量').font = Font(name='Calibri', bold=True, size=11, color='C00000')
ws5.cell(row=sum_row+6, column=2).value = '=COUNTIF(L6:L38,"是")'

for c in range(1, 5):
    for r in range(sum_row+1, sum_row+4):
        cell = ws5.cell(row=r, column=c)
        cell.alignment = Alignment(horizontal='center', vertical='center')
        cell.border = BORDER

# ════════════════════════════════════════════════════════
# Freeze panes
# ════════════════════════════════════════════════════════
ws1.freeze_panes = 'A4'
ws2.freeze_panes = 'A11'
ws3.freeze_panes = 'A11'
ws4.freeze_panes = 'A9'
ws5.freeze_panes = 'A6'

# ════════════════════════════════════════════════════════
# Print settings
# ════════════════════════════════════════════════════════
for ws in [ws1, ws2, ws3, ws4, ws5]:
    ws.page_setup.orientation = 'landscape'
    ws.page_setup.fitToWidth = 1
    ws.sheet_properties.pageSetUpPr = None

output_path = '/Users/sundanian/Documents/projects/ai-agents/my-agent/plans/2026-04-13-供应商分层分级方案/打分模板.xlsx'
wb.save(output_path)
print(f'Excel saved: {output_path}')
```

### scripts/office/soffice.py

```python
"""
Helper for running LibreOffice (soffice) in environments where AF_UNIX
sockets may be blocked (e.g., sandboxed VMs).  Detects the restriction
at runtime and applies an LD_PRELOAD shim if needed.

Usage:
    from office.soffice import run_soffice, get_soffice_env

    # Option 1 – run soffice directly
    result = run_soffice(["--headless", "--convert-to", "pdf", "input.docx"])

    # Option 2 – get env dict for your own subprocess calls
    env = get_soffice_env()
    subprocess.run(["soffice", ...], env=env)
"""

import os
import socket
import subprocess
import tempfile
from pathlib import Path


def get_soffice_env() -> dict:
    env = os.environ.copy()
    env["SAL_USE_VCLPLUGIN"] = "svp"

    if _needs_shim():
        shim = _ensure_shim()
        env["LD_PRELOAD"] = str(shim)

    return env


def run_soffice(args: list[str], **kwargs) -> subprocess.CompletedProcess:
    env = get_soffice_env()
    return subprocess.run(["soffice"] + args, env=env, **kwargs)



_SHIM_SO = Path(tempfile.gettempdir()) / "lo_socket_shim.so"


def _needs_shim() -> bool:
    try:
        s = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
        s.close()
        return False
    except OSError:
        return True


def _ensure_shim() -> Path:
    if _SHIM_SO.exists():
        return _SHIM_SO

    src = Path(tempfile.gettempdir()) / "lo_socket_shim.c"
    src.write_text(_SHIM_SOURCE)
    subprocess.run(
        ["gcc", "-shared", "-fPIC", "-o", str(_SHIM_SO), str(src), "-ldl"],
        check=True,
        capture_output=True,
    )
    src.unlink()
    return _SHIM_SO



_SHIM_SOURCE = r"""
#define _GNU_SOURCE
#include <dlfcn.h>
#include <errno.h>
#include <signal.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/socket.h>
#include <unistd.h>

static int (*real_socket)(int, int, int);
static int (*real_socketpair)(int, int, int, int[2]);
static int (*real_listen)(int, int);
static int (*real_accept)(int, struct sockaddr *, socklen_t *);
static int (*real_close)(int);
static int (*real_read)(int, void *, size_t);

/* Per-FD bookkeeping (FDs >= 1024 are passed through unshimmed). */
static int is_shimmed[1024];
static int peer_of[1024];
static int wake_r[1024];            /* accept() blocks reading this */
static int wake_w[1024];            /* close()  writes to this      */
static int listener_fd = -1;        /* FD that received listen()    */

__attribute__((constructor))
static void init(void) {
    real_socket     = dlsym(RTLD_NEXT, "socket");
    real_socketpair = dlsym(RTLD_NEXT, "socketpair");
    real_listen     = dlsym(RTLD_NEXT, "listen");
    real_accept     = dlsym(RTLD_NEXT, "accept");
    real_close      = dlsym(RTLD_NEXT, "close");
    real_read       = dlsym(RTLD_NEXT, "read");
    for (int i = 0; i < 1024; i++) {
        peer_of[i] = -1;
        wake_r[i]  = -1;
        wake_w[i]  = -1;
    }
}

/* ---- socket ---------------------------------------------------------- */
int socket(int domain, int type, int protocol) {
    if (domain == AF_UNIX) {
        int fd = real_socket(domain, type, protocol);
        if (fd >= 0) return fd;
        /* socket(AF_UNIX) blocked – fall back to socketpair(). */
        int sv[2];
        if (real_socketpair(domain, type, protocol, sv) == 0) {
            if (sv[0] >= 0 && sv[0] < 1024) {
                is_shimmed[sv[0]] = 1;
                peer_of[sv[0]]    = sv[1];
                int wp[2];
                if (pipe(wp) == 0) {
                    wake_r[sv[0]] = wp[0];
                    wake_w[sv[0]] = wp[1];
                }
            }
            return sv[0];
        }
        errno = EPERM;
        return -1;
    }
    return real_socket(domain, type, protocol);
}

/* ---- listen ---------------------------------------------------------- */
int listen(int sockfd, int backlog) {
    if (sockfd >= 0 && sockfd < 1024 && is_shimmed[sockfd]) {
        listener_fd = sockfd;
        return 0;
    }
    return real_listen(sockfd, backlog);
}

/* ---- accept ---------------------------------------------------------- */
int accept(int sockfd, struct sockaddr *addr, socklen_t *addrlen) {
    if (sockfd >= 0 && sockfd < 1024 && is_shimmed[sockfd]) {
        /* Block until close() writes to the wake pipe. */
        if (wake_r[sockfd] >= 0) {
            char buf;
            real_read(wake_r[sockfd], &buf, 1);
        }
        errno = ECONNABORTED;
        return -1;
    }
    return real_accept(sockfd, addr, addrlen);
}

/* ---- close ----------------------------------------------------------- */
int close(int fd) {
    if (fd >= 0 && fd < 1024 && is_shimmed[fd]) {
        int was_listener = (fd == listener_fd);
        is_shimmed[fd] = 0;

        if (wake_w[fd] >= 0) {              /* unblock accept() */
            char c = 0;
            write(wake_w[fd], &c, 1);
            real_close(wake_w[fd]);
            wake_w[fd] = -1;
        }
        if (wake_r[fd] >= 0) { real_close(wake_r[fd]); wake_r[fd]  = -1; }
        if (peer_of[fd] >= 0) { real_close(peer_of[fd]); peer_of[fd] = -1; }

        if (was_listener)
            _exit(0);                        /* conversion done – exit */
    }
    return real_close(fd);
}
"""



if __name__ == "__main__":
    import sys
    result = run_soffice(sys.argv[1:])
    sys.exit(result.returncode)
```

### scripts/office/pack.py

```python
"""Pack a directory into a DOCX, PPTX, or XLSX file.

Validates with auto-repair, condenses XML formatting, and creates the Office file.

Usage:
    python pack.py <input_directory> <output_file> [--original <file>] [--validate true|false]

Examples:
    python pack.py unpacked/ output.docx --original input.docx
    python pack.py unpacked/ output.pptx --validate false
"""

import argparse
import sys
import shutil
import tempfile
import zipfile
from pathlib import Path

import defusedxml.minidom

from validators import DOCXSchemaValidator, PPTXSchemaValidator, RedliningValidator

def pack(
    input_directory: str,
    output_file: str,
    original_file: str | None = None,
    validate: bool = True,
    infer_author_func=None,
) -> tuple[None, str]:
    input_dir = Path(input_directory)
    output_path = Path(output_file)
    suffix = output_path.suffix.lower()

    if not input_dir.is_dir():
        return None, f"Error: {input_dir} is not a directory"

    if suffix not in {".docx", ".pptx", ".xlsx"}:
        return None, f"Error: {output_file} must be a .docx, .pptx, or .xlsx file"

    if validate and original_file:
        original_path = Path(original_file)
        if original_path.exists():
            success, output = _run_validation(
                input_dir, original_path, suffix, infer_author_func
            )
            if output:
                print(output)
            if not success:
                return None, f"Error: Validation failed for {input_dir}"

    with tempfile.TemporaryDirectory() as temp_dir:
        temp_content_dir = Path(temp_dir) / "content"
        shutil.copytree(input_dir, temp_content_dir)

        for pattern in ["*.xml", "*.rels"]:
            for xml_file in temp_content_dir.rglob(pattern):
                _condense_xml(xml_file)

        output_path.parent.mkdir(parents=True, exist_ok=True)
        with zipfile.ZipFile(output_path, "w", zipfile.ZIP_DEFLATED) as zf:
            for f in temp_content_dir.rglob("*"):
                if f.is_file():
                    zf.write(f, f.relative_to(temp_content_dir))

    return None, f"Successfully packed {input_dir} to {output_file}"


def _run_validation(
    unpacked_dir: Path,
    original_file: Path,
    suffix: str,
    infer_author_func=None,
) -> tuple[bool, str | None]:
    output_lines = []
    validators = []

    if suffix == ".docx":
        author = "Claude"
        if infer_author_func:
            try:
                author = infer_author_func(unpacked_dir, original_file)
            except ValueError as e:
                print(f"Warning: {e} Using default author 'Claude'.", file=sys.stderr)

        validators = [
            DOCXSchemaValidator(unpacked_dir, original_file),
            RedliningValidator(unpacked_dir, original_file, author=author),
        ]
    elif suffix == ".pptx":
        validators = [PPTXSchemaValidator(unpacked_dir, original_file)]

    if not validators:
        return True, None

    total_repairs = sum(v.repair() for v in validators)
    if total_repairs:
        output_lines.append(f"Auto-repaired {total_repairs} issue(s)")

    success = all(v.validate() for v in validators)

    if success:
        output_lines.append("All validations PASSED!")

    return success, "\n".join(output_lines) if output_lines else None


def _condense_xml(xml_file: Path) -> None:
    try:
        with open(xml_file, encoding="utf-8") as f:
            dom = defusedxml.minidom.parse(f)

        for element in dom.getElementsByTagName("*"):
            if element.tagName.endswith(":t"):
                continue

            for child in list(element.childNodes):
                if (
                    child.nodeType == child.TEXT_NODE
                    and child.nodeValue
                    and child.nodeValue.strip() == ""
                ) or child.nodeType == child.COMMENT_NODE:
                    element.removeChild(child)

        xml_file.write_bytes(dom.toxml(encoding="UTF-8"))
    except Exception as e:
        print(f"ERROR: Failed to parse {xml_file.name}: {e}", file=sys.stderr)
        raise


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Pack a directory into a DOCX, PPTX, or XLSX file"
    )
    parser.add_argument("input_directory", help="Unpacked Office document directory")
    parser.add_argument("output_file", help="Output Office file (.docx/.pptx/.xlsx)")
    parser.add_argument(
        "--original",
        help="Original file for validation comparison",
    )
    parser.add_argument(
        "--validate",
        type=lambda x: x.lower() == "true",
        default=True,
        metavar="true|false",
        help="Run validation with auto-repair (default: true)",
    )
    args = parser.parse_args()

    _, message = pack(
        args.input_directory,
        args.output_file,
        original_file=args.original,
        validate=args.validate,
    )
    print(message)

    if "Error" in message:
        sys.exit(1)
```

### scripts/office/unpack.py

```python
"""Unpack Office files (DOCX, PPTX, XLSX) for editing.

Extracts the ZIP archive, pretty-prints XML files, and optionally:
- Merges adjacent runs with identical formatting (DOCX only)
- Simplifies adjacent tracked changes from same author (DOCX only)

Usage:
    python unpack.py <office_file> <output_dir> [options]

Examples:
    python unpack.py document.docx unpacked/
    python unpack.py presentation.pptx unpacked/
    python unpack.py document.docx unpacked/ --merge-runs false
"""

import argparse
import sys
import zipfile
from pathlib import Path

import defusedxml.minidom

from helpers.merge_runs import merge_runs as do_merge_runs
from helpers.simplify_redlines import simplify_redlines as do_simplify_redlines

SMART_QUOTE_REPLACEMENTS = {
    "\u201c": "&#x201C;",  
    "\u201d": "&#x201D;",  
    "\u2018": "&#x2018;",  
    "\u2019": "&#x2019;",  
}


def unpack(
    input_file: str,
    output_directory: str,
    merge_runs: bool = True,
    simplify_redlines: bool = True,
) -> tuple[None, str]:
    input_path = Path(input_file)
    output_path = Path(output_directory)
    suffix = input_path.suffix.lower()

    if not input_path.exists():
        return None, f"Error: {input_file} does not exist"

    if suffix not in {".docx", ".pptx", ".xlsx"}:
        return None, f"Error: {input_file} must be a .docx, .pptx, or .xlsx file"

    try:
        output_path.mkdir(parents=True, exist_ok=True)

        with zipfile.ZipFile(input_path, "r") as zf:
            zf.extractall(output_path)

        xml_files = list(output_path.rglob("*.xml")) + list(output_path.rglob("*.rels"))
        for xml_file in xml_files:
            _pretty_print_xml(xml_file)

        message = f"Unpacked {input_file} ({len(xml_files)} XML files)"

        if suffix == ".docx":
            if simplify_redlines:
                simplify_count, _ = do_simplify_redlines(str(output_path))
                message += f", simplified {simplify_count} tracked changes"

            if merge_runs:
                merge_count, _ = do_merge_runs(str(output_path))
                message += f", merged {merge_count} runs"

        for xml_file in xml_files:
            _escape_smart_quotes(xml_file)

        return None, message

    except zipfile.BadZipFile:
        return None, f"Error: {input_file} is not a valid Office file"
    except Exception as e:
        return None, f"Error unpacking: {e}"


def _pretty_print_xml(xml_file: Path) -> None:
    try:
        content = xml_file.read_text(encoding="utf-8")
        dom = defusedxml.minidom.parseString(content)
        xml_file.write_bytes(dom.toprettyxml(indent="  ", encoding="utf-8"))
    except Exception:
        pass  


def _escape_smart_quotes(xml_file: Path) -> None:
    try:
        content = xml_file.read_text(encoding="utf-8")
        for char, entity in SMART_QUOTE_REPLACEMENTS.items():
            content = content.replace(char, entity)
        xml_file.write_text(content, encoding="utf-8")
    except Exception:
        pass


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Unpack an Office file (DOCX, PPTX, XLSX) for editing"
    )
    parser.add_argument("input_file", help="Office file to unpack")
    parser.add_argument("output_directory", help="Output directory")
    parser.add_argument(
        "--merge-runs",
        type=lambda x: x.lower() == "true",
        default=True,
        metavar="true|false",
        help="Merge adjacent runs with identical formatting (DOCX only, default: true)",
    )
    parser.add_argument(
        "--simplify-redlines",
        type=lambda x: x.lower() == "true",
        default=True,
        metavar="true|false",
        help="Merge adjacent tracked changes from same author (DOCX only, default: true)",
    )
    args = parser.parse_args()

    _, message = unpack(
        args.input_file,
        args.output_directory,
        merge_runs=args.merge_runs,
        simplify_redlines=args.simplify_redlines,
    )
    print(message)

    if "Error" in message:
        sys.exit(1)
```

### scripts/office/validate.py

```python
"""
Command line tool to validate Office document XML files against XSD schemas and tracked changes.

Usage:
    python validate.py <path> [--original <original_file>] [--auto-repair] [--author NAME]

The first argument can be either:
- An unpacked directory containing the Office document XML files
- A packed Office file (.docx/.pptx/.xlsx) which will be unpacked to a temp directory

Auto-repair fixes:
- paraId/durableId values that exceed OOXML limits
- Missing xml:space="preserve" on w:t elements with whitespace
"""

import argparse
import sys
import tempfile
import zipfile
from pathlib import Path

from validators import DOCXSchemaValidator, PPTXSchemaValidator, RedliningValidator


def main():
    parser = argparse.ArgumentParser(description="Validate Office document XML files")
    parser.add_argument(
        "path",
        help="Path to unpacked directory or packed Office file (.docx/.pptx/.xlsx)",
    )
    parser.add_argument(
        "--original",
        required=False,
        default=None,
        help="Path to original file (.docx/.pptx/.xlsx). If omitted, all XSD errors are reported and redlining validation is skipped.",
    )
    parser.add_argument(
        "-v",
        "--verbose",
        action="store_true",
        help="Enable verbose output",
    )
    parser.add_argument(
        "--auto-repair",
        action="store_true",
        help="Automatically repair common issues (hex IDs, whitespace preservation)",
    )
    parser.add_argument(
        "--author",
        default="Claude",
        help="Author name for redlining validation (default: Claude)",
    )
    args = parser.parse_args()

    path = Path(args.path)
    assert path.exists(), f"Error: {path} does not exist"

    original_file = None
    if args.original:
        original_file = Path(args.original)
        assert original_file.is_file(), f"Error: {original_file} is not a file"
        assert original_file.suffix.lower() in [".docx", ".pptx", ".xlsx"], (
            f"Error: {original_file} must be a .docx, .pptx, or .xlsx file"
        )

    file_extension = (original_file or path).suffix.lower()
    assert file_extension in [".docx", ".pptx", ".xlsx"], (
        f"Error: Cannot determine file type from {path}. Use --original or provide a .docx/.pptx/.xlsx file."
    )

    if path.is_file() and path.suffix.lower() in [".docx", ".pptx", ".xlsx"]:
        temp_dir = tempfile.mkdtemp()
        with zipfile.ZipFile(path, "r") as zf:
            zf.extractall(temp_dir)
        unpacked_dir = Path(temp_dir)
    else:
        assert path.is_dir(), f"Error: {path} is not a directory or Office file"
        unpacked_dir = path

    match file_extension:
        case ".docx":
            validators = [
                DOCXSchemaValidator(unpacked_dir, original_file, verbose=args.verbose),
            ]
            if original_file:
                validators.append(
                    RedliningValidator(unpacked_dir, original_file, verbose=args.verbose, author=args.author)  
                )
        case ".pptx":
            validators = [
                PPTXSchemaValidator(unpacked_dir, original_file, verbose=args.verbose),
            ]
        case _:
            print(f"Error: Validation not supported for file type {file_extension}")
            sys.exit(1)

    if args.auto_repair:
        total_repairs = sum(v.repair() for v in validators)
        if total_repairs:
            print(f"Auto-repaired {total_repairs} issue(s)")

    success = all(v.validate() for v in validators)

    if success:
        print("All validations PASSED!")

    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()
```

### helpers/


=== FILE: .claude/skills/xlsx/scripts/office/helpers/__init__.py ===


=== FILE: .claude/skills/xlsx/scripts/office/helpers/merge_runs.py ===
"""Merge adjacent runs with identical formatting in DOCX.

Merges adjacent <w:r> elements that have identical <w:rPr> properties.
Works on runs in paragraphs and inside tracked changes (<w:ins>, <w:del>).

Also:
- Removes rsid attributes from runs (revision metadata that doesn't affect rendering)
- Removes proofErr elements (spell/grammar markers that block merging)
"""

from pathlib import Path

import defusedxml.minidom


def merge_runs(input_dir: str) -> tuple[int, str]:
    doc_xml = Path(input_dir) / "word" / "document.xml"

    if not doc_xml.exists():
        return 0, f"Error: {doc_xml} not found"

    try:
        dom = defusedxml.minidom.parseString(doc_xml.read_text(encoding="utf-8"))
        root = dom.documentElement

        _remove_elements(root, "proofErr")
        _strip_run_rsid_attrs(root)

        containers = {run.parentNode for run in _find_elements(root, "r")}

        merge_count = 0
        for container in containers:
            merge_count += _merge_runs_in(container)

        doc_xml.write_bytes(dom.toxml(encoding="UTF-8"))
        return merge_count, f"Merged {merge_count} runs"

    except Exception as e:
        return 0, f"Error: {e}"




def _find_elements(root, tag: str) -> list:
    results = []

    def traverse(node):
        if node.nodeType == node.ELEMENT_NODE:
            name = node.localName or node.tagName
            if name == tag or name.endswith(f":{tag}"):
                results.append(node)
            for child in node.childNodes:
                traverse(child)

    traverse(root)
    return results


def _get_child(parent, tag: str):
    for child in parent.childNodes:
        if child.nodeType == child.ELEMENT_NODE:
            name = child.localName or child.tagName
            if name == tag or name.endswith(f":{tag}"):
                return child
    return None


def _get_children(parent, tag: str) -> list:
    results = []
    for child in parent.childNodes:
        if child.nodeType == child.ELEMENT_NODE:
            name = child.localName or child.tagName
            if name == tag or name.endswith(f":{tag}"):
                results.append(child)
    return results


def _is_adjacent(elem1, elem2) -> bool:
    node = elem1.nextSibling
    while node:
        if node == elem2:
            return True
        if node.nodeType == node.ELEMENT_NODE:
            return False
        if node.nodeType == node.TEXT_NODE and node.data.strip():
            return False
        node = node.nextSibling
    return False




def _remove_elements(root, tag: str):
    for elem in _find_elements(root, tag):
        if elem.parentNode:
            elem.parentNode.removeChild(elem)


def _strip_run_rsid_attrs(root):
    for run in _find_elements(root, "r"):
        for attr in list(run.attributes.values()):
            if "rsid" in attr.name.lower():
                run.removeAttribute(attr.name)




def _merge_runs_in(container) -> int:
    merge_count = 0
    run = _first_child_run(container)

    while run:
        while True:
            next_elem = _next_element_sibling(run)
            if next_elem and _is_run(next_elem) and _can_merge(run, next_elem):
                _merge_run_content(run, next_elem)
                container.removeChild(next_elem)
                merge_count += 1
            else:
                break

        _consolidate_text(run)
        run = _next_sibling_run(run)

    return merge_count


def _first_child_run(container):
    for child in container.childNodes:
        if child.nodeType == child.ELEMENT_NODE and _is_run(child):
            return child
    return None


def _next_element_sibling(node):
    sibling = node.nextSibling
    while sibling:
        if sibling.nodeType == sibling.ELEMENT_NODE:
            return sibling
        sibling = sibling.nextSibling
    return None


def _next_sibling_run(node):
    sibling = node.nextSibling
    while sibling:
        if sibling.nodeType == sibling.ELEMENT_NODE:
            if _is_run(sibling):
                return sibling
        sibling = sibling.nextSibling
    return None


def _is_run(node) -> bool:
    name = node.localName or node.tagName
    return name == "r" or name.endswith(":r")


def _can_merge(run1, run2) -> bool:
    rpr1 = _get_child(run1, "rPr")
    rpr2 = _get_child(run2, "rPr")

    if (rpr1 is None) != (rpr2 is None):
        return False
    if rpr1 is None:
        return True
    return rpr1.toxml() == rpr2.toxml()  


def _merge_run_content(target, source):
    for child in list(source.childNodes):
        if child.nodeType == child.ELEMENT_NODE:
            name = child.localName or child.tagName
            if name != "rPr" and not name.endswith(":rPr"):
                target.appendChild(child)


def _consolidate_text(run):
    t_elements = _get_children(run, "t")

    for i in range(len(t_elements) - 1, 0, -1):
        curr, prev = t_elements[i], t_elements[i - 1]

        if _is_adjacent(prev, curr):
            prev_text = prev.firstChild.data if prev.firstChild else ""
            curr_text = curr.firstChild.data if curr.firstChild else ""
            merged = prev_text + curr_text

            if prev.firstChild:
                prev.firstChild.data = merged
            else:
                prev.appendChild(run.ownerDocument.createTextNode(merged))

            if merged.startswith(" ") or merged.endswith(" "):
                prev.setAttribute("xml:space", "preserve")
            elif prev.hasAttribute("xml:space"):
                prev.removeAttribute("xml:space")

            run.removeChild(curr)

=== FILE: .claude/skills/xlsx/scripts/office/helpers/simplify_redlines.py ===
"""Simplify tracked changes by merging adjacent w:ins or w:del elements.

Merges adjacent <w:ins> elements from the same author into a single element.
Same for <w:del> elements. This makes heavily-redlined documents easier to
work with by reducing the number of tracked change wrappers.

Rules:
- Only merges w:ins with w:ins, w:del with w:del (same element type)
- Only merges if same author (ignores timestamp differences)
- Only merges if truly adjacent (only whitespace between them)
"""

import xml.etree.ElementTree as ET
import zipfile
from pathlib import Path

import defusedxml.minidom

WORD_NS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main"


def simplify_redlines(input_dir: str) -> tuple[int, str]:
    doc_xml = Path(input_dir) / "word" / "document.xml"

    if not doc_xml.exists():
        return 0, f"Error: {doc_xml} not found"

    try:
        dom = defusedxml.minidom.parseString(doc_xml.read_text(encoding="utf-8"))
        root = dom.documentElement

        merge_count = 0

        containers = _find_elements(root, "p") + _find_elements(root, "tc")

        for container in containers:
            merge_count += _merge_tracked_changes_in(container, "ins")
            merge_count += _merge_tracked_changes_in(container, "del")

        doc_xml.write_bytes(dom.toxml(encoding="UTF-8"))
        return merge_count, f"Simplified {merge_count} tracked changes"

    except Exception as e:
        return 0, f"Error: {e}"


def _merge_tracked_changes_in(container, tag: str) -> int:
    merge_count = 0

    tracked = [
        child
        for child in container.childNodes
        if child.nodeType == child.ELEMENT_NODE and _is_element(child, tag)
    ]

    if len(tracked) < 2:
        return 0

    i = 0
    while i < len(tracked) - 1:
        curr = tracked[i]
        next_elem = tracked[i + 1]

        if _can_merge_tracked(curr, next_elem):
            _merge_tracked_content(curr, next_elem)
            container.removeChild(next_elem)
            tracked.pop(i + 1)
            merge_count += 1
        else:
            i += 1

    return merge_count


def _is_element(node, tag: str) -> bool:
    name = node.localName or node.tagName
    return name == tag or name.endswith(f":{tag}")


def _get_author(elem) -> str:
    author = elem.getAttribute("w:author")
    if not author:
        for attr in elem.attributes.values():
            if attr.localName == "author" or attr.name.endswith(":author"):
                return attr.value
    return author


def _can_merge_tracked(elem1, elem2) -> bool:
    if _get_author(elem1) != _get_author(elem2):
        return False

    node = elem1.nextSibling
    while node and node != elem2:
        if node.nodeType == node.ELEMENT_NODE:
            return False
        if node.nodeType == node.TEXT_NODE and node.data.strip():
            return False
        node = node.nextSibling

    return True


def _merge_tracked_content(target, source):
    while source.firstChild:
        child = source.firstChild
        source.removeChild(child)
        target.appendChild(child)


def _find_elements(root, tag: str) -> list:
    results = []

    def traverse(node):
        if node.nodeType == node.ELEMENT_NODE:
            name = node.localName or node.tagName
            if name == tag or name.endswith(f":{tag}"):
                results.append(node)
            for child in node.childNodes:
                traverse(child)

    traverse(root)
    return results


def get_tracked_change_authors(doc_xml_path: Path) -> dict[str, int]:
    if not doc_xml_path.exists():
        return {}

    try:
        tree = ET.parse(doc_xml_path)
        root = tree.getroot()
    except ET.ParseError:
        return {}

    namespaces = {"w": WORD_NS}
    author_attr = f"{{{WORD_NS}}}author"

    authors: dict[str, int] = {}
    for tag in ["ins", "del"]:
        for elem in root.findall(f".//w:{tag}", namespaces):
            author = elem.get(author_attr)
            if author:
                authors[author] = authors.get(author, 0) + 1

    return authors


def _get_authors_from_docx(docx_path: Path) -> dict[str, int]:
    try:
        with zipfile.ZipFile(docx_path, "r") as zf:
            if "word/document.xml" not in zf.namelist():
                return {}
            with zf.open("word/document.xml") as f:
                tree = ET.parse(f)
                root = tree.getroot()

                namespaces = {"w": WORD_NS}
                author_attr = f"{{{WORD_NS}}}author"

                authors: dict[str, int] = {}
                for tag in ["ins", "del"]:
                    for elem in root.findall(f".//w:{tag}", namespaces):
                        author = elem.get(author_attr)
                        if author:
                            authors[author] = authors.get(author, 0) + 1
                return authors
    except (zipfile.BadZipFile, ET.ParseError):
        return {}


def infer_author(modified_dir: Path, original_docx: Path, default: str = "Claude") -> str:
    modified_xml = modified_dir / "word" / "document.xml"
    modified_authors = get_tracked_change_authors(modified_xml)

    if not modified_authors:
        return default

    original_authors = _get_authors_from_docx(original_docx)

    new_changes: dict[str, int] = {}
    for author, count in modified_authors.items():
        original_count = original_authors.get(author, 0)
        diff = count - original_count
        if diff > 0:
            new_changes[author] = diff

    if not new_changes:
        return default

    if len(new_changes) == 1:
        return next(iter(new_changes))

    raise ValueError(
        f"Multiple authors added new changes: {new_changes}. "
        "Cannot infer which author to validate."
    )


### validators/


=== FILE: .claude/skills/xlsx/scripts/office/validators/__init__.py ===
"""
Validation modules for Word document processing.
"""

from .base import BaseSchemaValidator
from .docx import DOCXSchemaValidator
from .pptx import PPTXSchemaValidator
from .redlining import RedliningValidator

__all__ = [
    "BaseSchemaValidator",
    "DOCXSchemaValidator",
    "PPTXSchemaValidator",
    "RedliningValidator",
]

=== FILE: .claude/skills/xlsx/scripts/office/validators/base.py ===
"""
Base validator with common validation logic for document files.
"""

import re
from pathlib import Path

import defusedxml.minidom
import lxml.etree


class BaseSchemaValidator:

    IGNORED_VALIDATION_ERRORS = [
        "hyphenationZone",
        "purl.org/dc/terms",
    ]

    UNIQUE_ID_REQUIREMENTS = {
        "comment": ("id", "file"),  
        "commentrangestart": ("id", "file"),  
        "commentrangeend": ("id", "file"),  
        "bookmarkstart": ("id", "file"),  
        "bookmarkend": ("id", "file"),  
        "sldid": ("id", "file"),  
        "sldmasterid": ("id", "global"),  
        "sldlayoutid": ("id", "global"),  
        "cm": ("authorid", "file"),  
        "sheet": ("sheetid", "file"),  
        "definedname": ("id", "file"),  
        "cxnsp": ("id", "file"),  
        "sp": ("id", "file"),  
        "pic": ("id", "file"),  
        "grpsp": ("id", "file"),  
    }

    EXCLUDED_ID_CONTAINERS = {
        "sectionlst",  
    }

    ELEMENT_RELATIONSHIP_TYPES = {}

    SCHEMA_MAPPINGS = {
        "word": "ISO-IEC29500-4_2016/wml.xsd",  
        "ppt": "ISO-IEC29500-4_2016/pml.xsd",  
        "xl": "ISO-IEC29500-4_2016/sml.xsd",  
        "[Content_Types].xml": "ecma/fouth-edition/opc-contentTypes.xsd",
        "app.xml": "ISO-IEC29500-4_2016/shared-documentPropertiesExtended.xsd",
        "core.xml": "ecma/fouth-edition/opc-coreProperties.xsd",
        "custom.xml": "ISO-IEC29500-4_2016/shared-documentPropertiesCustom.xsd",
        ".rels": "ecma/fouth-edition/opc-relationships.xsd",
        "people.xml": "microsoft/wml-2012.xsd",
        "commentsIds.xml": "microsoft/wml-cid-2016.xsd",
        "commentsExtensible.xml": "microsoft/wml-cex-2018.xsd",
        "commentsExtended.xml": "microsoft/wml-2012.xsd",
        "chart": "ISO-IEC29500-4_2016/dml-chart.xsd",
        "theme": "ISO-IEC29500-4_2016/dml-main.xsd",
        "drawing": "ISO-IEC29500-4_2016/dml-main.xsd",
    }

    MC_NAMESPACE = "http://schemas.openxmlformats.org/markup-compatibility/2006"
    XML_NAMESPACE = "http://www.w3.org/XML/1998/namespace"

    PACKAGE_RELATIONSHIPS_NAMESPACE = (
        "http://schemas.openxmlformats.org/package/2006/relationships"
    )
    OFFICE_RELATIONSHIPS_NAMESPACE = (
        "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
    )
    CONTENT_TYPES_NAMESPACE = (
        "http://schemas.openxmlformats.org/package/2006/content-types"
    )

    MAIN_CONTENT_FOLDERS = {"word", "ppt", "xl"}

    OOXML_NAMESPACES = {
        "http://schemas.openxmlformats.org/officeDocument/2006/math",
        "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
        "http://schemas.openxmlformats.org/schemaLibrary/2006/main",
        "http://schemas.openxmlformats.org/drawingml/2006/main",
        "http://schemas.openxmlformats.org/drawingml/2006/chart",
        "http://schemas.openxmlformats.org/drawingml/2006/chartDrawing",
        "http://schemas.openxmlformats.org/drawingml/2006/diagram",
        "http://schemas.openxmlformats.org/drawingml/2006/picture",
        "http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing",
        "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing",
        "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
        "http://schemas.openxmlformats.org/presentationml/2006/main",
        "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
        "http://schemas.openxmlformats.org/officeDocument/2006/sharedTypes",
        "http://www.w3.org/XML/1998/namespace",
    }

    def __init__(self, unpacked_dir, original_file=None, verbose=False):
        self.unpacked_dir = Path(unpacked_dir).resolve()
        self.original_file = Path(original_file) if original_file else None
        self.verbose = verbose

        self.schemas_dir = Path(__file__).parent.parent / "schemas"

        patterns = ["*.xml", "*.rels"]
        self.xml_files = [
            f for pattern in patterns for f in self.unpacked_dir.rglob(pattern)
        ]

        if not self.xml_files:
            print(f"Warning: No XML files found in {self.unpacked_dir}")

    def validate(self):
        raise NotImplementedError("Subclasses must implement the validate method")

    def repair(self) -> int:
        return self.repair_whitespace_preservation()

    def repair_whitespace_preservation(self) -> int:
        repairs = 0

        for xml_file in self.xml_files:
            try:
                content = xml_file.read_text(encoding="utf-8")
                dom = defusedxml.minidom.parseString(content)
                modified = False

                for elem in dom.getElementsByTagName("*"):
                    if elem.tagName.endswith(":t") and elem.firstChild:
                        text = elem.firstChild.nodeValue
                        if text and (text.startswith((' ', '\t')) or text.endswith((' ', '\t'))):
                            if elem.getAttribute("xml:space") != "preserve":
                                elem.setAttribute("xml:space", "preserve")
                                text_preview = repr(text[:30]) + "..." if len(text) > 30 else repr(text)
                                print(f"  Repaired: {xml_file.name}: Added xml:space='preserve' to {elem.tagName}: {text_preview}")
                                repairs += 1
                                modified = True

                if modified:
                    xml_file.write_bytes(dom.toxml(encoding="UTF-8"))

            except Exception:
                pass

        return repairs

    def validate_xml(self):
        errors = []

        for xml_file in self.xml_files:
            try:
                lxml.etree.parse(str(xml_file))
            except lxml.etree.XMLSyntaxError as e:
                errors.append(
                    f"  {xml_file.relative_to(self.unpacked_dir)}: "
                    f"Line {e.lineno}: {e.msg}"
                )
            except Exception as e:
                errors.append(
                    f"  {xml_file.relative_to(self.unpacked_dir)}: "
                    f"Unexpected error: {str(e)}"
                )

        if errors:
            print(f"FAILED - Found {len(errors)} XML violations:")
            for error in errors:
                print(error)
            return False
        else:
            if self.verbose:
                print("PASSED - All XML files are well-formed")
            return True

    def validate_namespaces(self):
        errors = []

        for xml_file in self.xml_files:
            try:
                root = lxml.etree.parse(str(xml_file)).getroot()
                declared = set(root.nsmap.keys()) - {None}  

                for attr_val in [
                    v for k, v in root.attrib.items() if k.endswith("Ignorable")
                ]:
                    undeclared = set(attr_val.split()) - declared
                    errors.extend(
                        f"  {xml_file.relative_to(self.unpacked_dir)}: "
                        f"Namespace '{ns}' in Ignorable but not declared"
                        for ns in undeclared
                    )
            except lxml.etree.XMLSyntaxError:
                continue

        if errors:
            print(f"FAILED - {len(errors)} namespace issues:")
            for error in errors:
                print(error)
            return False
        if self.verbose:
            print("PASSED - All namespace prefixes properly declared")
        return True

    def validate_unique_ids(self):
        errors = []
        global_ids = {}  

        for xml_file in self.xml_files:
            try:
                root = lxml.etree.parse(str(xml_file)).getroot()
                file_ids = {}  

                mc_elements = root.xpath(
                    ".//mc:AlternateContent", namespaces={"mc": self.MC_NAMESPACE}
                )
                for elem in mc_elements:
                    elem.getparent().remove(elem)

                for elem in root.iter():
                    tag = (
                        elem.tag.split("}")[-1].lower()
                        if "}" in elem.tag
                        else elem.tag.lower()
                    )

                    if tag in self.UNIQUE_ID_REQUIREMENTS:
                        in_excluded_container = any(
                            ancestor.tag.split("}")[-1].lower() in self.EXCLUDED_ID_CONTAINERS
                            for ancestor in elem.iterancestors()
                        )
                        if in_excluded_container:
                            continue

                        attr_name, scope = self.UNIQUE_ID_REQUIREMENTS[tag]

                        id_value = None
                        for attr, value in elem.attrib.items():
                            attr_local = (
                                attr.split("}")[-1].lower()
                                if "}" in attr
                                else attr.lower()
                            )
                            if attr_local == attr_name:
                                id_value = value
                                break

                        if id_value is not None:
                            if scope == "global":
                                if id_value in global_ids:
                                    prev_file, prev_line, prev_tag = global_ids[
                                        id_value
                                    ]
                                    errors.append(
                                        f"  {xml_file.relative_to(self.unpacked_dir)}: "
                                        f"Line {elem.sourceline}: Global ID '{id_value}' in <{tag}> "
                                        f"already used in {prev_file} at line {prev_line} in <{prev_tag}>"
                                    )
                                else:
                                    global_ids[id_value] = (
                                        xml_file.relative_to(self.unpacked_dir),
                                        elem.sourceline,
                                        tag,
                                    )
                            elif scope == "file":
                                key = (tag, attr_name)
                                if key not in file_ids:
                                    file_ids[key] = {}

                                if id_value in file_ids[key]:
                                    prev_line = file_ids[key][id_value]
                                    errors.append(
                                        f"  {xml_file.relative_to(self.unpacked_dir)}: "
                                        f"Line {elem.sourceline}: Duplicate {attr_name}='{id_value}' in <{tag}> "
                                        f"(first occurrence at line {prev_line})"
                                    )
                                else:
                                    file_ids[key][id_value] = elem.sourceline

            except (lxml.etree.XMLSyntaxError, Exception) as e:
                errors.append(
                    f"  {xml_file.relative_to(self.unpacked_dir)}: Error: {e}"
                )

        if errors:
            print(f"FAILED - Found {len(errors)} ID uniqueness violations:")
            for error in errors:
                print(error)
            return False
        else:
            if self.verbose:
                print("PASSED - All required IDs are unique")
            return True

    def validate_file_references(self):
        errors = []

        rels_files = list(self.unpacked_dir.rglob("*.rels"))

        if not rels_files:
            if self.verbose:
                print("PASSED - No .rels files found")
            return True

        all_files = []
        for file_path in self.unpacked_dir.rglob("*"):
            if (
                file_path.is_file()
                and file_path.name != "[Content_Types].xml"
                and not file_path.name.endswith(".rels")
            ):  
                all_files.append(file_path.resolve())

        all_referenced_files = set()

        if self.verbose:
            print(
                f"Found {len(rels_files)} .rels files and {len(all_files)} target files"
            )

        for rels_file in rels_files:
            try:
                rels_root = lxml.etree.parse(str(rels_file)).getroot()

                rels_dir = rels_file.parent

                referenced_files = set()
                broken_refs = []

                for rel in rels_root.findall(
                    ".//ns:Relationship",
                    namespaces={"ns": self.PACKAGE_RELATIONSHIPS_NAMESPACE},
                ):
                    target = rel.get("Target")
                    if target and not target.startswith(
                        ("http", "mailto:")
                    ):  
                        if target.startswith("/"):
                            target_path = self.unpacked_dir / target.lstrip("/")
                        elif rels_file.name == ".rels":
                            target_path = self.unpacked_dir / target
                        else:
                            base_dir = rels_dir.parent
                            target_path = base_dir / target

                        try:
                            target_path = target_path.resolve()
                            if target_path.exists() and target_path.is_file():
                                referenced_files.add(target_path)
                                all_referenced_files.add(target_path)
                            else:
                                broken_refs.append((target, rel.sourceline))
                        except (OSError, ValueError):
                            broken_refs.append((target, rel.sourceline))

                if broken_refs:
                    rel_path = rels_file.relative_to(self.unpacked_dir)
                    for broken_ref, line_num in broken_refs:
                        errors.append(
                            f"  {rel_path}: Line {line_num}: Broken reference to {broken_ref}"
                        )

            except Exception as e:
                rel_path = rels_file.relative_to(self.unpacked_dir)
                errors.append(f"  Error parsing {rel_path}: {e}")

        unreferenced_files = set(all_files) - all_referenced_files

        if unreferenced_files:
            for unref_file in sorted(unreferenced_files):
                unref_rel_path = unref_file.relative_to(self.unpacked_dir)
                errors.append(f"  Unreferenced file: {unref_rel_path}")

        if errors:
            print(f"FAILED - Found {len(errors)} relationship validation errors:")
            for error in errors:
                print(error)
            print(
                "CRITICAL: These errors will cause the document to appear corrupt. "
                + "Broken references MUST be fixed, "
                + "and unreferenced files MUST be referenced or removed."
            )
            return False
        else:
            if self.verbose:
                print(
                    "PASSED - All references are valid and all files are properly referenced"
                )
            return True

    def validate_all_relationship_ids(self):
        import lxml.etree

        errors = []

        for xml_file in self.xml_files:
            if xml_file.suffix == ".rels":
                continue

            rels_dir = xml_file.parent / "_rels"
            rels_file = rels_dir / f"{xml_file.name}.rels"

            if not rels_file.exists():
                continue

            try:
                rels_root = lxml.etree.parse(str(rels_file)).getroot()
                rid_to_type = {}

                for rel in rels_root.findall(
                    f".//{{{self.PACKAGE_RELATIONSHIPS_NAMESPACE}}}Relationship"
                ):
                    rid = rel.get("Id")
                    rel_type = rel.get("Type", "")
                    if rid:
                        if rid in rid_to_type:
                            rels_rel_path = rels_file.relative_to(self.unpacked_dir)
                            errors.append(
                                f"  {rels_rel_path}: Line {rel.sourceline}: "
                                f"Duplicate relationship ID '{rid}' (IDs must be unique)"
                            )
                        type_name = (
                            rel_type.split("/")[-1] if "/" in rel_type else rel_type
                        )
                        rid_to_type[rid] = type_name

                xml_root = lxml.etree.parse(str(xml_file)).getroot()

                r_ns = self.OFFICE_RELATIONSHIPS_NAMESPACE
                rid_attrs_to_check = ["id", "embed", "link"]
                for elem in xml_root.iter():
                    for attr_name in rid_attrs_to_check:
                        rid_attr = elem.get(f"{{{r_ns}}}{attr_name}")
                        if not rid_attr:
                            continue
                        xml_rel_path = xml_file.relative_to(self.unpacked_dir)
                        elem_name = (
                            elem.tag.split("}")[-1] if "}" in elem.tag else elem.tag
                        )

                        if rid_attr not in rid_to_type:
                            errors.append(
                                f"  {xml_rel_path}: Line {elem.sourceline}: "
                                f"<{elem_name}> r:{attr_name} references non-existent relationship '{rid_attr}' "
                                f"(valid IDs: {', '.join(sorted(rid_to_type.keys())[:5])}{'...' if len(rid_to_type) > 5 else ''})"
                            )
                        elif attr_name == "id" and self.ELEMENT_RELATIONSHIP_TYPES:
                            expected_type = self._get_expected_relationship_type(
                                elem_name
                            )
                            if expected_type:
                                actual_type = rid_to_type[rid_attr]
                                if expected_type not in actual_type.lower():
                                    errors.append(
                                        f"  {xml_rel_path}: Line {elem.sourceline}: "
                                        f"<{elem_name}> references '{rid_attr}' which points to '{actual_type}' "
                                        f"but should point to a '{expected_type}' relationship"
                                    )

            except Exception as e:
                xml_rel_path = xml_file.relative_to(self.unpacked_dir)
                errors.append(f"  Error processing {xml_rel_path}: {e}")

        if errors:
            print(f"FAILED - Found {len(errors)} relationship ID reference errors:")
            for error in errors:
                print(error)
            print("\nThese ID mismatches will cause the document to appear corrupt!")
            return False
        else:
            if self.verbose:
                print("PASSED - All relationship ID references are valid")
            return True

    def _get_expected_relationship_type(self, element_name):
        elem_lower = element_name.lower()

        if elem_lower in self.ELEMENT_RELATIONSHIP_TYPES:
            return self.ELEMENT_RELATIONSHIP_TYPES[elem_lower]

        if elem_lower.endswith("id") and len(elem_lower) > 2:
            prefix = elem_lower[:-2]  
            if prefix.endswith("master"):
                return prefix.lower()
            elif prefix.endswith("layout"):
                return prefix.lower()
            else:
                if prefix == "sld":
                    return "slide"
                return prefix.lower()

        if elem_lower.endswith("reference") and len(elem_lower) > 9:
            prefix = elem_lower[:-9]  
            return prefix.lower()

        return None

    def validate_content_types(self):
        errors = []

        content_types_file = self.unpacked_dir / "[Content_Types].xml"
        if not content_types_file.exists():
            print("FAILED - [Content_Types].xml file not found")
            return False

        try:
            root = lxml.etree.parse(str(content_types_file)).getroot()
            declared_parts = set()
            declared_extensions = set()

            for override in root.findall(
                f".//{{{self.CONTENT_TYPES_NAMESPACE}}}Override"
            ):
                part_name = override.get("PartName")
                if part_name is not None:
                    declared_parts.add(part_name.lstrip("/"))

            for default in root.findall(
                f".//{{{self.CONTENT_TYPES_NAMESPACE}}}Default"
            ):
                extension = default.get("Extension")
                if extension is not None:
                    declared_extensions.add(extension.lower())

            declarable_roots = {
                "sld",
                "sldLayout",
                "sldMaster",
                "presentation",  
                "document",  
                "workbook",
                "worksheet",  
                "theme",  
            }

            media_extensions = {
                "png": "image/png",
                "jpg": "image/jpeg",
                "jpeg": "image/jpeg",
                "gif": "image/gif",
                "bmp": "image/bmp",
                "tiff": "image/tiff",
                "wmf": "image/x-wmf",
                "emf": "image/x-emf",
            }

            all_files = list(self.unpacked_dir.rglob("*"))
            all_files = [f for f in all_files if f.is_file()]

            for xml_file in self.xml_files:
                path_str = str(xml_file.relative_to(self.unpacked_dir)).replace(
                    "\\", "/"
                )

                if any(
                    skip in path_str
                    for skip in [".rels", "[Content_Types]", "docProps/", "_rels/"]
                ):
                    continue

                try:
                    root_tag = lxml.etree.parse(str(xml_file)).getroot().tag
                    root_name = root_tag.split("}")[-1] if "}" in root_tag else root_tag

                    if root_name in declarable_roots and path_str not in declared_parts:
                        errors.append(
                            f"  {path_str}: File with <{root_name}> root not declared in [Content_Types].xml"
                        )

                except Exception:
                    continue  

            for file_path in all_files:
                if file_path.suffix.lower() in {".xml", ".rels"}:
                    continue
                if file_path.name == "[Content_Types].xml":
                    continue
                if "_rels" in file_path.parts or "docProps" in file_path.parts:
                    continue

                extension = file_path.suffix.lstrip(".").lower()
                if extension and extension not in declared_extensions:
                    if extension in media_extensions:
                        relative_path = file_path.relative_to(self.unpacked_dir)
                        errors.append(
                            f'  {relative_path}: File with extension \'{extension}\' not declared in [Content_Types].xml - should add: <Default Extension="{extension}" ContentType="{media_extensions[extension]}"/>'
                        )

        except Exception as e:
            errors.append(f"  Error parsing [Content_Types].xml: {e}")

        if errors:
            print(f"FAILED - Found {len(errors)} content type declaration errors:")
            for error in errors:
                print(error)
            return False
        else:
            if self.verbose:
                print(
                    "PASSED - All content files are properly declared in [Content_Types].xml"
                )
            return True

    def validate_file_against_xsd(self, xml_file, verbose=False):
        xml_file = Path(xml_file).resolve()
        unpacked_dir = self.unpacked_dir.resolve()

        is_valid, current_errors = self._validate_single_file_xsd(
            xml_file, unpacked_dir
        )

        if is_valid is None:
            return None, set()  
        elif is_valid:
            return True, set()  

        original_errors = self._get_original_file_errors(xml_file)

        assert current_errors is not None
        new_errors = current_errors - original_errors

        new_errors = {
            e for e in new_errors
            if not any(pattern in e for pattern in self.IGNORED_VALIDATION_ERRORS)
        }

        if new_errors:
            if verbose:
                relative_path = xml_file.relative_to(unpacked_dir)
                print(f"FAILED - {relative_path}: {len(new_errors)} new error(s)")
                for error in list(new_errors)[:3]:
                    truncated = error[:250] + "..." if len(error) > 250 else error
                    print(f"  - {truncated}")
            return False, new_errors
        else:
            if verbose:
                print(
                    f"PASSED - No new errors (original had {len(current_errors)} errors)"
                )
            return True, set()

    def validate_against_xsd(self):
        new_errors = []
        original_error_count = 0
        valid_count = 0
        skipped_count = 0

        for xml_file in self.xml_files:
            relative_path = str(xml_file.relative_to(self.unpacked_dir))
            is_valid, new_file_errors = self.validate_file_against_xsd(
                xml_file, verbose=False
            )

            if is_valid is None:
                skipped_count += 1
                continue
            elif is_valid and not new_file_errors:
                valid_count += 1
                continue
            elif is_valid:
                original_error_count += 1
                valid_count += 1
                continue

            new_errors.append(f"  {relative_path}: {len(new_file_errors)} new error(s)")
            for error in list(new_file_errors)[:3]:  
                new_errors.append(
                    f"    - {error[:250]}..." if len(error) > 250 else f"    - {error}"
                )

        if self.verbose:
            print(f"Validated {len(self.xml_files)} files:")
            print(f"  - Valid: {valid_count}")
            print(f"  - Skipped (no schema): {skipped_count}")
            if original_error_count:
                print(f"  - With original errors (ignored): {original_error_count}")
            print(
                f"  - With NEW errors: {len(new_errors) > 0 and len([e for e in new_errors if not e.startswith('    ')]) or 0}"
            )

        if new_errors:
            print("\nFAILED - Found NEW validation errors:")
            for error in new_errors:
                print(error)
            return False
        else:
            if self.verbose:
                print("\nPASSED - No new XSD validation errors introduced")
            return True

    def _get_schema_path(self, xml_file):
        if xml_file.name in self.SCHEMA_MAPPINGS:
            return self.schemas_dir / self.SCHEMA_MAPPINGS[xml_file.name]

        if xml_file.suffix == ".rels":
            return self.schemas_dir / self.SCHEMA_MAPPINGS[".rels"]

        if "charts/" in str(xml_file) and xml_file.name.startswith("chart"):
            return self.schemas_dir / self.SCHEMA_MAPPINGS["chart"]

        if "theme/" in str(xml_file) and xml_file.name.startswith("theme"):
            return self.schemas_dir / self.SCHEMA_MAPPINGS["theme"]

        if xml_file.parent.name in self.MAIN_CONTENT_FOLDERS:
            return self.schemas_dir / self.SCHEMA_MAPPINGS[xml_file.parent.name]

        return None

    def _clean_ignorable_namespaces(self, xml_doc):
        xml_string = lxml.etree.tostring(xml_doc, encoding="unicode")
        xml_copy = lxml.etree.fromstring(xml_string)

        for elem in xml_copy.iter():
            attrs_to_remove = []

            for attr in elem.attrib:
                if "{" in attr:
                    ns = attr.split("}")[0][1:]
                    if ns not in self.OOXML_NAMESPACES:
                        attrs_to_remove.append(attr)

            for attr in attrs_to_remove:
                del elem.attrib[attr]

        self._remove_ignorable_elements(xml_copy)

        return lxml.etree.ElementTree(xml_copy)

    def _remove_ignorable_elements(self, root):
        elements_to_remove = []

        for elem in list(root):
            if not hasattr(elem, "tag") or callable(elem.tag):
                continue

            tag_str = str(elem.tag)
            if tag_str.startswith("{"):
                ns = tag_str.split("}")[0][1:]
                if ns not in self.OOXML_NAMESPACES:
                    elements_to_remove.append(elem)
                    continue

            self._remove_ignorable_elements(elem)

        for elem in elements_to_remove:
            root.remove(elem)

    def _preprocess_for_mc_ignorable(self, xml_doc):
        root = xml_doc.getroot()

        if f"{{{self.MC_NAMESPACE}}}Ignorable" in root.attrib:
            del root.attrib[f"{{{self.MC_NAMESPACE}}}Ignorable"]

        return xml_doc

    def _validate_single_file_xsd(self, xml_file, base_path):
        schema_path = self._get_schema_path(xml_file)
        if not schema_path:
            return None, None  

        try:
            with open(schema_path, "rb") as xsd_file:
                parser = lxml.etree.XMLParser()
                xsd_doc = lxml.etree.parse(
                    xsd_file, parser=parser, base_url=str(schema_path)
                )
                schema = lxml.etree.XMLSchema(xsd_doc)

            with open(xml_file, "r") as f:
                xml_doc = lxml.etree.parse(f)

            xml_doc, _ = self._remove_template_tags_from_text_nodes(xml_doc)
            xml_doc = self._preprocess_for_mc_ignorable(xml_doc)

            relative_path = xml_file.relative_to(base_path)
            if (
                relative_path.parts
                and relative_path.parts[0] in self.MAIN_CONTENT_FOLDERS
            ):
                xml_doc = self._clean_ignorable_namespaces(xml_doc)

            if schema.validate(xml_doc):
                return True, set()
            else:
                errors = set()
                for error in schema.error_log:
                    errors.add(error.message)
                return False, errors

        except Exception as e:
            return False, {str(e)}

    def _get_original_file_errors(self, xml_file):
        if self.original_file is None:
            return set()

        import tempfile
        import zipfile

        xml_file = Path(xml_file).resolve()
        unpacked_dir = self.unpacked_dir.resolve()
        relative_path = xml_file.relative_to(unpacked_dir)

        with tempfile.TemporaryDirectory() as temp_dir:
            temp_path = Path(temp_dir)

            with zipfile.ZipFile(self.original_file, "r") as zip_ref:
                zip_ref.extractall(temp_path)

            original_xml_file = temp_path / relative_path

            if not original_xml_file.exists():
                return set()

            is_valid, errors = self._validate_single_file_xsd(
                original_xml_file, temp_path
            )
            return errors if errors else set()

    def _remove_template_tags_from_text_nodes(self, xml_doc):
        warnings = []
        template_pattern = re.compile(r"\{\{[^}]*\}\}")

        xml_string = lxml.etree.tostring(xml_doc, encoding="unicode")
        xml_copy = lxml.etree.fromstring(xml_string)

        def process_text_content(text, content_type):
            if not text:
                return text
            matches = list(template_pattern.finditer(text))
            if matches:
                for match in matches:
                    warnings.append(
                        f"Found template tag in {content_type}: {match.group()}"
                    )
                return template_pattern.sub("", text)
            return text

        for elem in xml_copy.iter():
            if not hasattr(elem, "tag") or callable(elem.tag):
                continue
            tag_str = str(elem.tag)
            if tag_str.endswith("}t") or tag_str == "t":
                continue

            elem.text = process_text_content(elem.text, "text content")
            elem.tail = process_text_content(elem.tail, "tail content")

        return lxml.etree.ElementTree(xml_copy), warnings


if __name__ == "__main__":
    raise RuntimeError("This module should not be run directly.")

=== FILE: .claude/skills/xlsx/scripts/office/validators/docx.py ===
"""
Validator for Word document XML files against XSD schemas.
"""

import random
import re
import tempfile
import zipfile

import defusedxml.minidom
import lxml.etree

from .base import BaseSchemaValidator


class DOCXSchemaValidator(BaseSchemaValidator):

    WORD_2006_NAMESPACE = "http://schemas.openxmlformats.org/wordprocessingml/2006/main"
    W14_NAMESPACE = "http://schemas.microsoft.com/office/word/2010/wordml"
    W16CID_NAMESPACE = "http://schemas.microsoft.com/office/word/2016/wordml/cid"

    ELEMENT_RELATIONSHIP_TYPES = {}

    def validate(self):
        if not self.validate_xml():
            return False

        all_valid = True
        if not self.validate_namespaces():
            all_valid = False

        if not self.validate_unique_ids():
            all_valid = False

        if not self.validate_file_references():
            all_valid = False

        if not self.validate_content_types():
            all_valid = False

        if not self.validate_against_xsd():
            all_valid = False

        if not self.validate_whitespace_preservation():
            all_valid = False

        if not self.validate_deletions():
            all_valid = False

        if not self.validate_insertions():
            all_valid = False

        if not self.validate_all_relationship_ids():
            all_valid = False

        if not self.validate_id_constraints():
            all_valid = False

        if not self.validate_comment_markers():
            all_valid = False

        self.compare_paragraph_counts()

        return all_valid

    def validate_whitespace_preservation(self):
        errors = []

        for xml_file in self.xml_files:
            if xml_file.name != "document.xml":
                continue

            try:
                root = lxml.etree.parse(str(xml_file)).getroot()

                for elem in root.iter(f"{{{self.WORD_2006_NAMESPACE}}}t"):
                    if elem.text:
                        text = elem.text
                        if re.search(r"^[ \t\n\r]", text) or re.search(
                            r"[ \t\n\r]$", text
                        ):
                            xml_space_attr = f"{{{self.XML_NAMESPACE}}}space"
                            if (
                                xml_space_attr not in elem.attrib
                                or elem.attrib[xml_space_attr] != "preserve"
                            ):
                                text_preview = (
                                    repr(text)[:50] + "..."
                                    if len(repr(text)) > 50
                                    else repr(text)
                                )
                                errors.append(
                                    f"  {xml_file.relative_to(self.unpacked_dir)}: "
                                    f"Line {elem.sourceline}: w:t element with whitespace missing xml:space='preserve': {text_preview}"
                                )

            except (lxml.etree.XMLSyntaxError, Exception) as e:
                errors.append(
                    f"  {xml_file.relative_to(self.unpacked_dir)}: Error: {e}"
                )

        if errors:
            print(f"FAILED - Found {len(errors)} whitespace preservation violations:")
            for error in errors:
                print(error)
            return False
        else:
            if self.verbose:
                print("PASSED - All whitespace is properly preserved")
            return True

    def validate_deletions(self):
        errors = []

        for xml_file in self.xml_files:
            if xml_file.name != "document.xml":
                continue

            try:
                root = lxml.etree.parse(str(xml_file)).getroot()
                namespaces = {"w": self.WORD_2006_NAMESPACE}

                for t_elem in root.xpath(".//w:del//w:t", namespaces=namespaces):
                    if t_elem.text:
                        text_preview = (
                            repr(t_elem.text)[:50] + "..."
                            if len(repr(t_elem.text)) > 50
                            else repr(t_elem.text)
                        )
                        errors.append(
                            f"  {xml_file.relative_to(self.unpacked_dir)}: "
                            f"Line {t_elem.sourceline}: <w:t> found within <w:del>: {text_preview}"
                        )

                for instr_elem in root.xpath(
                    ".//w:del//w:instrText", namespaces=namespaces
                ):
                    text_preview = (
                        repr(instr_elem.text or "")[:50] + "..."
                        if len(repr(instr_elem.text or "")) > 50
                        else repr(instr_elem.text or "")
                    )
                    errors.append(
                        f"  {xml_file.relative_to(self.unpacked_dir)}: "
                        f"Line {instr_elem.sourceline}: <w:instrText> found within <w:del> (use <w:delInstrText>): {text_preview}"
                    )

            except (lxml.etree.XMLSyntaxError, Exception) as e:
                errors.append(
                    f"  {xml_file.relative_to(self.unpacked_dir)}: Error: {e}"
                )

        if errors:
            print(f"FAILED - Found {len(errors)} deletion validation violations:")
            for error in errors:
                print(error)
            return False
        else:
            if self.verbose:
                print("PASSED - No w:t elements found within w:del elements")
            return True

    def count_paragraphs_in_unpacked(self):
        count = 0

        for xml_file in self.xml_files:
            if xml_file.name != "document.xml":
                continue

            try:
                root = lxml.etree.parse(str(xml_file)).getroot()
                paragraphs = root.findall(f".//{{{self.WORD_2006_NAMESPACE}}}p")
                count = len(paragraphs)
            except Exception as e:
                print(f"Error counting paragraphs in unpacked document: {e}")

        return count

    def count_paragraphs_in_original(self):
        original = self.original_file
        if original is None:
            return 0

        count = 0

        try:
            with tempfile.TemporaryDirectory() as temp_dir:
                with zipfile.ZipFile(original, "r") as zip_ref:
                    zip_ref.extractall(temp_dir)

                doc_xml_path = temp_dir + "/word/document.xml"
                root = lxml.etree.parse(doc_xml_path).getroot()

                paragraphs = root.findall(f".//{{{self.WORD_2006_NAMESPACE}}}p")
                count = len(paragraphs)

        except Exception as e:
            print(f"Error counting paragraphs in original document: {e}")

        return count

    def validate_insertions(self):
        errors = []

        for xml_file in self.xml_files:
            if xml_file.name != "document.xml":
                continue

            try:
                root = lxml.etree.parse(str(xml_file)).getroot()
                namespaces = {"w": self.WORD_2006_NAMESPACE}

                invalid_elements = root.xpath(
                    ".//w:ins//w:delText[not(ancestor::w:del)]", namespaces=namespaces
                )

                for elem in invalid_elements:
                    text_preview = (
                        repr(elem.text or "")[:50] + "..."
                        if len(repr(elem.text or "")) > 50
                        else repr(elem.text or "")
                    )
                    errors.append(
                        f"  {xml_file.relative_to(self.unpacked_dir)}: "
                        f"Line {elem.sourceline}: <w:delText> within <w:ins>: {text_preview}"
                    )

            except (lxml.etree.XMLSyntaxError, Exception) as e:
                errors.append(
                    f"  {xml_file.relative_to(self.unpacked_dir)}: Error: {e}"
                )

        if errors:
            print(f"FAILED - Found {len(errors)} insertion validation violations:")
            for error in errors:
                print(error)
            return False
        else:
            if self.verbose:
                print("PASSED - No w:delText elements within w:ins elements")
            return True

    def compare_paragraph_counts(self):
        original_count = self.count_paragraphs_in_original()
        new_count = self.count_paragraphs_in_unpacked()

        diff = new_count - original_count
        diff_str = f"+{diff}" if diff > 0 else str(diff)
        print(f"\nParagraphs: {original_count} → {new_count} ({diff_str})")

    def _parse_id_value(self, val: str, base: int = 16) -> int:
        return int(val, base)

    def validate_id_constraints(self):
        errors = []
        para_id_attr = f"{{{self.W14_NAMESPACE}}}paraId"
        durable_id_attr = f"{{{self.W16CID_NAMESPACE}}}durableId"

        for xml_file in self.xml_files:
            try:
                for elem in lxml.etree.parse(str(xml_file)).iter():
                    if val := elem.get(para_id_attr):
                        if self._parse_id_value(val, base=16) >= 0x80000000:
                            errors.append(
                                f"  {xml_file.name}:{elem.sourceline}: paraId={val} >= 0x80000000"
                            )

                    if val := elem.get(durable_id_attr):
                        if xml_file.name == "numbering.xml":
                            try:
                                if self._parse_id_value(val, base=10) >= 0x7FFFFFFF:
                                    errors.append(
                                        f"  {xml_file.name}:{elem.sourceline}: "
                                        f"durableId={val} >= 0x7FFFFFFF"
                                    )
                            except ValueError:
                                errors.append(
                                    f"  {xml_file.name}:{elem.sourceline}: "
                                    f"durableId={val} must be decimal in numbering.xml"
                                )
                        else:
                            if self._parse_id_value(val, base=16) >= 0x7FFFFFFF:
                                errors.append(
                                    f"  {xml_file.name}:{elem.sourceline}: "
                                    f"durableId={val} >= 0x7FFFFFFF"
                                )
            except Exception:
                pass

        if errors:
            print(f"FAILED - {len(errors)} ID constraint violations:")
            for e in errors:
                print(e)
        elif self.verbose:
            print("PASSED - All paraId/durableId values within constraints")
        return not errors

    def validate_comment_markers(self):
        errors = []

        document_xml = None
        comments_xml = None
        for xml_file in self.xml_files:
            if xml_file.name == "document.xml" and "word" in str(xml_file):
                document_xml = xml_file
            elif xml_file.name == "comments.xml":
                comments_xml = xml_file

        if not document_xml:
            if self.verbose:
                print("PASSED - No document.xml found (skipping comment validation)")
            return True

        try:
            doc_root = lxml.etree.parse(str(document_xml)).getroot()
            namespaces = {"w": self.WORD_2006_NAMESPACE}

            range_starts = {
                elem.get(f"{{{self.WORD_2006_NAMESPACE}}}id")
                for elem in doc_root.xpath(
                    ".//w:commentRangeStart", namespaces=namespaces
                )
            }
            range_ends = {
                elem.get(f"{{{self.WORD_2006_NAMESPACE}}}id")
                for elem in doc_root.xpath(
                    ".//w:commentRangeEnd", namespaces=namespaces
                )
            }
            references = {
                elem.get(f"{{{self.WORD_2006_NAMESPACE}}}id")
                for elem in doc_root.xpath(
                    ".//w:commentReference", namespaces=namespaces
                )
            }

            orphaned_ends = range_ends - range_starts
            for comment_id in sorted(
                orphaned_ends, key=lambda x: int(x) if x and x.isdigit() else 0
            ):
                errors.append(
                    f'  document.xml: commentRangeEnd id="{comment_id}" has no matching commentRangeStart'
                )

            orphaned_starts = range_starts - range_ends
            for comment_id in sorted(
                orphaned_starts, key=lambda x: int(x) if x and x.isdigit() else 0
            ):
                errors.append(
                    f'  document.xml: commentRangeStart id="{comment_id}" has no matching commentRangeEnd'
                )

            comment_ids = set()
            if comments_xml and comments_xml.exists():
                comments_root = lxml.etree.parse(str(comments_xml)).getroot()
                comment_ids = {
                    elem.get(f"{{{self.WORD_2006_NAMESPACE}}}id")
                    for elem in comments_root.xpath(
                        ".//w:comment", namespaces=namespaces
                    )
                }

                marker_ids = range_starts | range_ends | references
                invalid_refs = marker_ids - comment_ids
                for comment_id in sorted(
                    invalid_refs, key=lambda x: int(x) if x and x.isdigit() else 0
                ):
                    if comment_id:  
                        errors.append(
                            f'  document.xml: marker id="{comment_id}" references non-existent comment'
                        )

        except (lxml.etree.XMLSyntaxError, Exception) as e:
            errors.append(f"  Error parsing XML: {e}")

        if errors:
            print(f"FAILED - {len(errors)} comment marker violations:")
            for error in errors:
                print(error)
            return False
        else:
            if self.verbose:
                print("PASSED - All comment markers properly paired")
            return True

    def repair(self) -> int:
        repairs = super().repair()
        repairs += self.repair_durableId()
        return repairs

    def repair_durableId(self) -> int:
        repairs = 0

        for xml_file in self.xml_files:
            try:
                content = xml_file.read_text(encoding="utf-8")
                dom = defusedxml.minidom.parseString(content)
                modified = False

                for elem in dom.getElementsByTagName("*"):
                    if not elem.hasAttribute("w16cid:durableId"):
                        continue

                    durable_id = elem.getAttribute("w16cid:durableId")
                    needs_repair = False

                    if xml_file.name == "numbering.xml":
                        try:
                            needs_repair = (
                                self._parse_id_value(durable_id, base=10) >= 0x7FFFFFFF
                            )
                        except ValueError:
                            needs_repair = True
                    else:
                        try:
                            needs_repair = (
                                self._parse_id_value(durable_id, base=16) >= 0x7FFFFFFF
                            )
                        except ValueError:
                            needs_repair = True

                    if needs_repair:
                        value = random.randint(1, 0x7FFFFFFE)
                        if xml_file.name == "numbering.xml":
                            new_id = str(value)  
                        else:
                            new_id = f"{value:08X}"  

                        elem.setAttribute("w16cid:durableId", new_id)
                        print(
                            f"  Repaired: {xml_file.name}: durableId {durable_id} → {new_id}"
                        )
                        repairs += 1
                        modified = True

                if modified:
                    xml_file.write_bytes(dom.toxml(encoding="UTF-8"))

            except Exception:
                pass

        return repairs


if __name__ == "__main__":
    raise RuntimeError("This module should not be run directly.")

=== FILE: .claude/skills/xlsx/scripts/office/validators/pptx.py ===
"""
Validator for PowerPoint presentation XML files against XSD schemas.
"""

import re

from .base import BaseSchemaValidator


class PPTXSchemaValidator(BaseSchemaValidator):

    PRESENTATIONML_NAMESPACE = (
        "http://schemas.openxmlformats.org/presentationml/2006/main"
    )

    ELEMENT_RELATIONSHIP_TYPES = {
        "sldid": "slide",
        "sldmasterid": "slidemaster",
        "notesmasterid": "notesmaster",
        "sldlayoutid": "slidelayout",
        "themeid": "theme",
        "tablestyleid": "tablestyles",
    }

    def validate(self):
        if not self.validate_xml():
            return False

        all_valid = True
        if not self.validate_namespaces():
            all_valid = False

        if not self.validate_unique_ids():
            all_valid = False

        if not self.validate_uuid_ids():
            all_valid = False

        if not self.validate_file_references():
            all_valid = False

        if not self.validate_slide_layout_ids():
            all_valid = False

        if not self.validate_content_types():
            all_valid = False

        if not self.validate_against_xsd():
            all_valid = False

        if not self.validate_notes_slide_references():
            all_valid = False

        if not self.validate_all_relationship_ids():
            all_valid = False

        if not self.validate_no_duplicate_slide_layouts():
            all_valid = False

        return all_valid

    def validate_uuid_ids(self):
        import lxml.etree

        errors = []
        uuid_pattern = re.compile(
            r"^[\{\(]?[0-9A-Fa-f]{8}-?[0-9A-Fa-f]{4}-?[0-9A-Fa-f]{4}-?[0-9A-Fa-f]{4}-?[0-9A-Fa-f]{12}[\}\)]?$"
        )

        for xml_file in self.xml_files:
            try:
                root = lxml.etree.parse(str(xml_file)).getroot()

                for elem in root.iter():
                    for attr, value in elem.attrib.items():
                        attr_name = attr.split("}")[-1].lower()
                        if attr_name == "id" or attr_name.endswith("id"):
                            if self._looks_like_uuid(value):
                                if not uuid_pattern.match(value):
                                    errors.append(
                                        f"  {xml_file.relative_to(self.unpacked_dir)}: "
                                        f"Line {elem.sourceline}: ID '{value}' appears to be a UUID but contains invalid hex characters"
                                    )

            except (lxml.etree.XMLSyntaxError, Exception) as e:
                errors.append(
                    f"  {xml_file.relative_to(self.unpacked_dir)}: Error: {e}"
                )

        if errors:
            print(f"FAILED - Found {len(errors)} UUID ID validation errors:")
            for error in errors:
                print(error)
            return False
        else:
            if self.verbose:
                print("PASSED - All UUID-like IDs contain valid hex values")
            return True

    def _looks_like_uuid(self, value):
        clean_value = value.strip("{}()").replace("-", "")
        return len(clean_value) == 32 and all(c.isalnum() for c in clean_value)

    def validate_slide_layout_ids(self):
        import lxml.etree

        errors = []

        slide_masters = list(self.unpacked_dir.glob("ppt/slideMasters/*.xml"))

        if not slide_masters:
            if self.verbose:
                print("PASSED - No slide masters found")
            return True

        for slide_master in slide_masters:
            try:
                root = lxml.etree.parse(str(slide_master)).getroot()

                rels_file = slide_master.parent / "_rels" / f"{slide_master.name}.rels"

                if not rels_file.exists():
                    errors.append(
                        f"  {slide_master.relative_to(self.unpacked_dir)}: "
                        f"Missing relationships file: {rels_file.relative_to(self.unpacked_dir)}"
                    )
                    continue

                rels_root = lxml.etree.parse(str(rels_file)).getroot()

                valid_layout_rids = set()
                for rel in rels_root.findall(
                    f".//{{{self.PACKAGE_RELATIONSHIPS_NAMESPACE}}}Relationship"
                ):
                    rel_type = rel.get("Type", "")
                    if "slideLayout" in rel_type:
                        valid_layout_rids.add(rel.get("Id"))

                for sld_layout_id in root.findall(
                    f".//{{{self.PRESENTATIONML_NAMESPACE}}}sldLayoutId"
                ):
                    r_id = sld_layout_id.get(
                        f"{{{self.OFFICE_RELATIONSHIPS_NAMESPACE}}}id"
                    )
                    layout_id = sld_layout_id.get("id")

                    if r_id and r_id not in valid_layout_rids:
                        errors.append(
                            f"  {slide_master.relative_to(self.unpacked_dir)}: "
                            f"Line {sld_layout_id.sourceline}: sldLayoutId with id='{layout_id}' "
                            f"references r:id='{r_id}' which is not found in slide layout relationships"
                        )

            except (lxml.etree.XMLSyntaxError, Exception) as e:
                errors.append(
                    f"  {slide_master.relative_to(self.unpacked_dir)}: Error: {e}"
                )

        if errors:
            print(f"FAILED - Found {len(errors)} slide layout ID validation errors:")
            for error in errors:
                print(error)
            print(
                "Remove invalid references or add missing slide layouts to the relationships file."
            )
            return False
        else:
            if self.verbose:
                print("PASSED - All slide layout IDs reference valid slide layouts")
            return True

    def validate_no_duplicate_slide_layouts(self):
        import lxml.etree

        errors = []
        slide_rels_files = list(self.unpacked_dir.glob("ppt/slides/_rels/*.xml.rels"))

        for rels_file in slide_rels_files:
            try:
                root = lxml.etree.parse(str(rels_file)).getroot()

                layout_rels = [
                    rel
                    for rel in root.findall(
                        f".//{{{self.PACKAGE_RELATIONSHIPS_NAMESPACE}}}Relationship"
                    )
                    if "slideLayout" in rel.get("Type", "")
                ]

                if len(layout_rels) > 1:
                    errors.append(
                        f"  {rels_file.relative_to(self.unpacked_dir)}: has {len(layout_rels)} slideLayout references"
                    )

            except Exception as e:
                errors.append(
                    f"  {rels_file.relative_to(self.unpacked_dir)}: Error: {e}"
                )

        if errors:
            print("FAILED - Found slides with duplicate slideLayout references:")
            for error in errors:
                print(error)
            return False
        else:
            if self.verbose:
                print("PASSED - All slides have exactly one slideLayout reference")
            return True

    def validate_notes_slide_references(self):
        import lxml.etree

        errors = []
        notes_slide_references = {}  

        slide_rels_files = list(self.unpacked_dir.glob("ppt/slides/_rels/*.xml.rels"))

        if not slide_rels_files:
            if self.verbose:
                print("PASSED - No slide relationship files found")
            return True

        for rels_file in slide_rels_files:
            try:
                root = lxml.etree.parse(str(rels_file)).getroot()

                for rel in root.findall(
                    f".//{{{self.PACKAGE_RELATIONSHIPS_NAMESPACE}}}Relationship"
                ):
                    rel_type = rel.get("Type", "")
                    if "notesSlide" in rel_type:
                        target = rel.get("Target", "")
                        if target:
                            normalized_target = target.replace("../", "")

                            slide_name = rels_file.stem.replace(
                                ".xml", ""
                            )  

                            if normalized_target not in notes_slide_references:
                                notes_slide_references[normalized_target] = []
                            notes_slide_references[normalized_target].append(
                                (slide_name, rels_file)
                            )

            except (lxml.etree.XMLSyntaxError, Exception) as e:
                errors.append(
                    f"  {rels_file.relative_to(self.unpacked_dir)}: Error: {e}"
                )

        for target, references in notes_slide_references.items():
            if len(references) > 1:
                slide_names = [ref[0] for ref in references]
                errors.append(
                    f"  Notes slide '{target}' is referenced by multiple slides: {', '.join(slide_names)}"
                )
                for slide_name, rels_file in references:
                    errors.append(f"    - {rels_file.relative_to(self.unpacked_dir)}")

        if errors:
            print(
                f"FAILED - Found {len([e for e in errors if not e.startswith('    ')])} notes slide reference validation errors:"
            )
            for error in errors:
                print(error)
            print("Each slide may optionally have its own slide file.")
            return False
        else:
            if self.verbose:
                print("PASSED - All notes slide references are unique")
            return True


if __name__ == "__main__":
    raise RuntimeError("This module should not be run directly.")

=== FILE: .claude/skills/xlsx/scripts/office/validators/redlining.py ===
"""
Validator for tracked changes in Word documents.
"""

import subprocess
import tempfile
import zipfile
from pathlib import Path


class RedliningValidator:

    def __init__(self, unpacked_dir, original_docx, verbose=False, author="Claude"):
        self.unpacked_dir = Path(unpacked_dir)
        self.original_docx = Path(original_docx)
        self.verbose = verbose
        self.author = author
        self.namespaces = {
            "w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"
        }

    def repair(self) -> int:
        return 0

    def validate(self):
        modified_file = self.unpacked_dir / "word" / "document.xml"
        if not modified_file.exists():
            print(f"FAILED - Modified document.xml not found at {modified_file}")
            return False

        try:
            import xml.etree.ElementTree as ET

            tree = ET.parse(modified_file)
            root = tree.getroot()

            del_elements = root.findall(".//w:del", self.namespaces)
            ins_elements = root.findall(".//w:ins", self.namespaces)

            author_del_elements = [
                elem
                for elem in del_elements
                if elem.get(f"{{{self.namespaces['w']}}}author") == self.author
            ]
            author_ins_elements = [
                elem
                for elem in ins_elements
                if elem.get(f"{{{self.namespaces['w']}}}author") == self.author
            ]

            if not author_del_elements and not author_ins_elements:
                if self.verbose:
                    print(f"PASSED - No tracked changes by {self.author} found.")
                return True

        except Exception:
            pass

        with tempfile.TemporaryDirectory() as temp_dir:
            temp_path = Path(temp_dir)

            try:
                with zipfile.ZipFile(self.original_docx, "r") as zip_ref:
                    zip_ref.extractall(temp_path)
            except Exception as e:
                print(f"FAILED - Error unpacking original docx: {e}")
                return False

            original_file = temp_path / "word" / "document.xml"
            if not original_file.exists():
                print(
                    f"FAILED - Original document.xml not found in {self.original_docx}"
                )
                return False

            try:
                import xml.etree.ElementTree as ET

                modified_tree = ET.parse(modified_file)
                modified_root = modified_tree.getroot()
                original_tree = ET.parse(original_file)
                original_root = original_tree.getroot()
            except ET.ParseError as e:
                print(f"FAILED - Error parsing XML files: {e}")
                return False

            self._remove_author_tracked_changes(original_root)
            self._remove_author_tracked_changes(modified_root)

            modified_text = self._extract_text_content(modified_root)
            original_text = self._extract_text_content(original_root)

            if modified_text != original_text:
                error_message = self._generate_detailed_diff(
                    original_text, modified_text
                )
                print(error_message)
                return False

            if self.verbose:
                print(f"PASSED - All changes by {self.author} are properly tracked")
            return True

    def _generate_detailed_diff(self, original_text, modified_text):
        error_parts = [
            f"FAILED - Document text doesn't match after removing {self.author}'s tracked changes",
            "",
            "Likely causes:",
            "  1. Modified text inside another author's <w:ins> or <w:del> tags",
            "  2. Made edits without proper tracked changes",
            "  3. Didn't nest <w:del> inside <w:ins> when deleting another's insertion",
            "",
            "For pre-redlined documents, use correct patterns:",
            "  - To reject another's INSERTION: Nest <w:del> inside their <w:ins>",
            "  - To restore another's DELETION: Add new <w:ins> AFTER their <w:del>",
            "",
        ]

        git_diff = self._get_git_word_diff(original_text, modified_text)
        if git_diff:
            error_parts.extend(["Differences:", "============", git_diff])
        else:
            error_parts.append("Unable to generate word diff (git not available)")

        return "\n".join(error_parts)

    def _get_git_word_diff(self, original_text, modified_text):
        try:
            with tempfile.TemporaryDirectory() as temp_dir:
                temp_path = Path(temp_dir)

                original_file = temp_path / "original.txt"
                modified_file = temp_path / "modified.txt"

                original_file.write_text(original_text, encoding="utf-8")
                modified_file.write_text(modified_text, encoding="utf-8")

                result = subprocess.run(
                    [
                        "git",
                        "diff",
                        "--word-diff=plain",
                        "--word-diff-regex=.",  
                        "-U0",  
                        "--no-index",
                        str(original_file),
                        str(modified_file),
                    ],
                    capture_output=True,
                    text=True,
                )

                if result.stdout.strip():
                    lines = result.stdout.split("\n")
                    content_lines = []
                    in_content = False
                    for line in lines:
                        if line.startswith("@@"):
                            in_content = True
                            continue
                        if in_content and line.strip():
                            content_lines.append(line)

                    if content_lines:
                        return "\n".join(content_lines)

                result = subprocess.run(
                    [
                        "git",
                        "diff",
                        "--word-diff=plain",
                        "-U0",  
                        "--no-index",
                        str(original_file),
                        str(modified_file),
                    ],
                    capture_output=True,
                    text=True,
                )

                if result.stdout.strip():
                    lines = result.stdout.split("\n")
                    content_lines = []
                    in_content = False
                    for line in lines:
                        if line.startswith("@@"):
                            in_content = True
                            continue
                        if in_content and line.strip():
                            content_lines.append(line)
                    return "\n".join(content_lines)

        except (subprocess.CalledProcessError, FileNotFoundError, Exception):
            pass

        return None

    def _remove_author_tracked_changes(self, root):
        ins_tag = f"{{{self.namespaces['w']}}}ins"
        del_tag = f"{{{self.namespaces['w']}}}del"
        author_attr = f"{{{self.namespaces['w']}}}author"

        for parent in root.iter():
            to_remove = []
            for child in parent:
                if child.tag == ins_tag and child.get(author_attr) == self.author:
                    to_remove.append(child)
            for elem in to_remove:
                parent.remove(elem)

        deltext_tag = f"{{{self.namespaces['w']}}}delText"
        t_tag = f"{{{self.namespaces['w']}}}t"

        for parent in root.iter():
            to_process = []
            for child in parent:
                if child.tag == del_tag and child.get(author_attr) == self.author:
                    to_process.append((child, list(parent).index(child)))

            for del_elem, del_index in reversed(to_process):
                for elem in del_elem.iter():
                    if elem.tag == deltext_tag:
                        elem.tag = t_tag

                for child in reversed(list(del_elem)):
                    parent.insert(del_index, child)
                parent.remove(del_elem)

    def _extract_text_content(self, root):
        p_tag = f"{{{self.namespaces['w']}}}p"
        t_tag = f"{{{self.namespaces['w']}}}t"

        paragraphs = []
        for p_elem in root.findall(f".//{p_tag}"):
            text_parts = []
            for t_elem in p_elem.findall(f".//{t_tag}"):
                if t_elem.text:
                    text_parts.append(t_elem.text)
            paragraph_text = "".join(text_parts)
            if paragraph_text:
                paragraphs.append(paragraph_text)

        return "\n".join(paragraphs)


if __name__ == "__main__":
    raise RuntimeError("This module should not be run directly.")

