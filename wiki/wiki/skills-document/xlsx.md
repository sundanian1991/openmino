# xlsx Excel 表格处理技能

> Sources: xlsx, minimax-xlsx, 2026-04-28
> Raw:[SKILL](../../raw/skills/xlsx-SKILL.md); [minimax-xlsx SKILL](../../raw/skills/minimax-xlsx-SKILL.md); [create](../../raw/skills/minimax-xlsx-create.md); [edit](../../raw/skills/minimax-xlsx-edit.md); [fix](../../raw/skills/minimax-xlsx-fix.md); [format](../../raw/skills/minimax-xlsx-format.md); [OOXML cheatsheet](../../raw/skills/minimax-xlsx-ooxml-cheatsheet.md); [read analyze](../../raw/skills/minimax-xlsx-read-analyze.md); [validate](../../raw/skills/minimax-xlsx-validate.md)

## 概述

Excel 表格处理技能集合覆盖创建、编辑、分析、公式调试、格式化和数据可视化。包含两套实现路径：基础 **xlsx**（pandas 数据分析 + openpyxl 格式化）和 **minimax-xlsx**（直接编辑 OOXML，零数据丢失的高质量方案）。根据任务类型选择合适路径——简单数据操作走 pandas/openpyxl，现有复杂文件编辑走 XML 路径。

## 两套实现对比

| 维度 | 基础 xlsx (pandas/openpyxl) | minimax-xlsx (XML) |
|------|---------------------------|-------------------|
| **适用场景** | 数据读取分析、简单创建 | 高质量财务模型、编辑现有复杂文件 |
| **创建方式** | `openpyxl.Workbook()` | XML 模板直接编辑 |
| **编辑方式** | `load_workbook()` | 解包→XML 编辑→打包 |
| **公式** | 字符串写入，需 recalc.py 重算 | 直接写 `<f>` 节点，Excel 自动重算 |
| **数据安全** | openpyxl round-trip 可能丢弃 VBA/透视表 | 字节级安全，只改碰的节点 |
| **学习成本** | 低，Python API | 中，需理解 OOXML 结构 |

## 基础 xlsx 能力

### 读取与分析

```python
import pandas as pd
df = pd.read_excel('file.xlsx')             # 读取第一个 sheet
all_sheets = pd.read_excel('file.xlsx', sheet_name=None)  # 读取所有 sheet
```

- `df.head()` / `df.info()` / `df.describe()` 快速预览
- 指定 dtypes 避免推断问题：`pd.read_excel('file.xlsx', dtype={'id': str})`
- 解析日期：`pd.read_excel('file.xlsx', parse_dates=['date_column'])`

### 创建与编辑（openpyxl）

```python
from openpyxl import Workbook, load_workbook
from openpyxl.styles import Font, PatternFill, Alignment

wb = Workbook()
sheet['A1'] = 'Header'
sheet['A1'].font = Font(bold=True)
sheet['B10'] = '=SUM(B2:B9)'  # 公式（需 recalc.py 重算）
wb.save('output.xlsx')
```

**编辑现有文件**：
```python
wb = load_workbook('existing.xlsx')  # 保留原有格式和公式
sheet['A1'] = 'New Value'
sheet.insert_rows(2)
wb.save('modified.xlsx')
```

### 公式重算（recalc.py）

openpyxl 写入的公式仅保存为字符串，需要 LibreOffice 重算：

```bash
python scripts/recalc.py output.xlsx
```

返回 JSON 包含错误位置：`{"status": "success", "total_errors": 0}` 或 `{"status": "errors_found", "error_summary": {"#REF!": {"count": 2, "locations": [...]}}}`

### 颜色编码标准（财务模型）

| 颜色 | 含义 | RGB |
|------|------|-----|
| **蓝色** | 硬编码输入（用户可改的场景参数） | 0,0,255 |
| **黑色** | 公式计算结果 | 0,0,0 |
| **绿色** | 跨工作表引用 | 0,128,0 |
| **红色** | 外部文件链接 | 255,0,0 |
| **黄色背景** | 关键假设/需要更新的单元格 | 255,255,0 |

### 数字格式

| 类型 | 格式 | 示例 |
|------|------|------|
| 年份 | `0`（文本） | 2024 非 2,024 |
| 货币 | `$#,##0` | $1,234 |
| 零值 | `$#,##0;($#,##0);-` | - |
| 百分比 | `0.0%` | 12.5% |
| 倍数 | `0.0x` | 3.5x |
| 负数 | 括号 `(123)` 非减号 `-123` | |

### 公式构建规则

- **假设外置**：所有假设放在独立假设单元格，公式引用而非硬编码：`=B5*(1+$B$6)` 替代 `=B5*1.05`
- **错误防护**：除零用 `IF(分母=0,0,分子/分母)`
- **文档来源**：硬编码值旁标注来源：`Source: Company 10-K, FY2024, Page 45`

## minimax-xlsx 核心能力

### XML 直接编辑（安全编辑现有文件）

当文件包含 VBA 宏、数据透视表、切片器、迷你图时，**必须**用 XML 路径：

```bash
python3 xlsx_unpack.py input.xlsx /tmp/xlsx_work/
# 编辑 target sheet XML
python3 xlsx_pack.py /tmp/xlsx_work/ output.xlsx
```

### CREATE 从零创建

复制最小模板 → 编辑 7 个核心 XML 文件 → 打包 → 验证：

```
xlsx 结构：
├── [Content_Types].xml    ← MIME 类型注册
├── _rels/.rels            ← 根关系
└── xl/
    ├── workbook.xml       ← sheet 列表
    ├── styles.xml         ← 13 个预定义样式槽
    ├── sharedStrings.xml  ← 文本字符串表
    ├── _rels/workbook.xml.rels  ← ID→文件映射
    └── worksheets/sheet1.xml    ← 数据
```

### 样式系统

| 样式 s | 角色 | 用途 |
|--------|------|------|
| 1/5/7 | 蓝色输入 | 假设参数 |
| 2/6/8 | 黑色公式 | 计算结果 |
| 3 | 绿色引用 | 跨表数据链接 |
| 4 | 粗体标题 | 表头 |
| 11 | 年份格式 | 无千位分隔符 |

### 公式校验

```bash
python3 formula_check.py output.xlsx
```
- 扫描全部 7 种错误类型（#REF!, #DIV/0!, #VALUE!, #N/A, #NAME?, #NUM!, #NULL!）
- 验证跨表引用有效性
- 退出码 0 = 安全交付

## 常见陷阱

| 陷阱 | 后果 | 修复 |
|------|------|------|
| openpyxl `data_only=True` 保存 | 公式永久丢失变成值 | 永远不要用 data_only=True 保存 |
| Python 计算结果硬编码 | "死表"——数据变后不更新 | 所有计算值用 Excel 公式 |
| pandas NaN 未处理 | 公式引用空值报错 | 用 `pd.notna()` 检查 |
| 列映射错误 | 列 64 = BL 不是 BK | 用 `col_letter()` 函数转换 |
| Excel 行索引偏移 | DataFrame 行 5 = Excel 行 6 | Excel 行是 1-based |

## 交付检查清单

- 零公式错误（#REF!, #DIV/0!, #VALUE! 等）
- 修改现有文件时严格匹配原有格式/风格/约定
- 每个计算单元格是公式非硬编码数字
- 假设都有来源标注
- 公式在 2-3 个样引用上测试通过
- 除零场景已防护
