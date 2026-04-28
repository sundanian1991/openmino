# minimax-xlsx Excel 处理技能

> Sources: minimax-xlsx, 2026-04-28
> Raw:[SKILL](../../raw/skills/minimax-xlsx-SKILL.md); [create](../../raw/skills/minimax-xlsx-create.md); [edit](../../raw/skills/minimax-xlsx-edit.md); [fix](../../raw/skills/minimax-xlsx-fix.md); [format](../../raw/skills/minimax-xlsx-format.md); [OOXML cheatsheet](../../raw/skills/minimax-xlsx-ooxml-cheatsheet.md); [read analyze](../../raw/skills/minimax-xlsx-read-analyze.md); [validate](../../raw/skills/minimax-xlsx-validate.md)

## 概述

minimax-xlsx 基于 OpenXML SDK (.NET) 的 Excel 表格处理技能，直接操作 XML 构建高质量 .xlsx 文件。核心理念：**永远不用 openpyxl 写文件，所有计算值必须是 Excel 公式而非 Python 硬编码**。支持从零创建、安全编辑现有文件（不破坏 VBA/数据透视表/迷你图）、公式验证修复。与基础 xlsx 相比，侧重 OOXML 规范和高质量财务建模。

## 任务路由

| 任务 | 方法 | 核心原则 |
|------|------|----------|
| **READ 读取分析** | `xlsx_reader.py` + pandas | 只读不写，结构发现后用 pandas 自定义分析 |
| **CREATE 从零创建** | XML 模板直接编辑 | 所有计算值 = `<f>` 公式，非 `<v>` 硬编码数字 |
| **EDIT 编辑现有文件** | 解包→XML 编辑→打包 | 绝对禁止 `Workbook()` 新建，必须加载原文件 |
| **FIX 修复公式** | 解包→修复 `<f>` 节点→打包 | 定位损坏的公式节点，不重建整个文件 |
| **VALIDATE 公式校验** | `formula_check.py` | 扫描所有错误类型，验证跨表引用 |

## CREATE 流程：XML 直接构建

### 七步创建流程

1. **规划**：定义 sheet 名称/顺序/布局/字符串清单/样式选择/跨表链接
2. **复制最小模板**：`cp -r templates/minimal_xlsx/ /tmp/xlsx_work/`
3. **配置 sheet 结构**：单表改 `workbook.xml` name 属性；多表需四文件同步（workbook.xml → workbook.xml.rels → [Content_Types].xml → 新建 worksheet XML）
4. **填充 sharedStrings**：所有文本值存入 `sharedStrings.xml`，单元格通过 0-based 索引引用
5. **写入表格数据**：编辑 `xl/worksheets/sheetN.xml`，填充行和单元格
6. **应用样式**：使用 `styles.xml` 预定义的 13 个语义样式槽
7. **打包验证**：`xlsx_pack.py` 打包 → `formula_check.py` 校验零错误

### 颜色编码约定（样式编码含义）

| 颜色 | 样式索引 | 含义 |
|------|----------|------|
| **蓝色** | s=1/5/7 | 人类输入/假设参数（用户可修改的值） |
| **黑色** | s=2/6/8 | 公式计算结果 |
| **绿色** | s=3 | 跨工作表引用 |

### 关键规则

- **公式优先**：`<f>SUM(B2:B9)</f>` 替代 `<v>5000</v>`，硬编码数字仅在原始输入参数中
- **XML 公式无等号**：Excel 中 `=SUM(B2:B9)` → XML 中 `<f>SUM(B2:B9)</f>`
- **共享公式**：同列重复模式用 `t="shared"` + `si` 索引压缩 XML
- **rId 碰撞规则**：模板中 rId1-3 已保留（sheet1/styles/sharedStrings），新 sheet 从 rId4 开始
- **sheet 名称限制**：最多 31 字符，禁止 `/ \ ? * [ ] :`，含空格需单引号包裹

## EDIT 流程：最小侵入编辑

### 标准操作流程

```bash
# 1. 解包（pretty-print 所有 XML，打印高风险提示）
python3 SKILL_DIR/scripts/xlsx_unpack.py input.xlsx /tmp/xlsx_work/

# 2. 识别目标 sheet → 定位 XML 文件 → 精准修改
# 3. 打包
python3 SKILL_DIR/scripts/xlsx_pack.py /tmp/xlsx_work/ output.xlsx

# 4. 验证
python3 SKILL_DIR/scripts/formula_check.py output.xlsx
```

### 为什么禁止 openpyxl round-trip

openpyxl `load_workbook()` + `save()` 会静默丢弃不支持的内容：

| 被丢弃的内容 | 后果 |
|--------------|------|
| VBA 宏 (`vbaProject.bin`) | 所有自动化丢失，.xlsm 变 .xlsx |
| 数据透视表 | 交互分析被摧毁 |
| 切片器 | 筛选 UI 丢失 |
| 迷你图 | 单元格内迷你图表消失 |
| 图表格式细节 | 系列颜色、自定义轴恢复默认 |

XML 直接编辑只改碰的节点，其余字节与原文件完全一致。

### 添加列/行

```bash
# 添加列（公式/格式/边框自动从相邻列复制）
python3 SKILL_DIR/scripts/xlsx_add_column.py /tmp/xlsx_work/ --col G \
    --sheet "Sheet1" --header "% of Total" \
    --formula '=F{row}/$F$10' --formula-rows 2:9 \
    --total-row 10 --total-formula '=SUM(G2:G9)' --numfmt '0.0%'
```

## 公式手册

### 常用公式

| 用途 | XML 公式 |
|------|----------|
| 求和 | `<f>SUM(B2:B9)</f>` |
| 平均值 | `<f>AVERAGE(B2:B9)</f>` |
| YoY 增长率 | `<f>D5/C5-1</f>` |
| 防除零错误 | `<f>IF(C5=0,0,D5/C5-1)</f>` |
| NPV | `<f>NPV(B1,B3:B7)+B2</f>` |
| IRR | `<f>IRR(B2:B7)</f>` |
| VLOOKUP | `<f>VLOOKUP(A5,Assumptions!A:C,2,0)</f>` |
| 跨表求和 | `<f>SUM(Data!C2:C1000)</f>` |
| 3D 引用 | `<f>SUM(Jan:Dec!B5)</f>` |

### 绝对引用与共享公式

```xml
<!-- 绝对引用 -->
<f>B5/$B$2</f>

<!-- 共享公式：D2 定义组，D3-D11 引用同一公式 -->
<c r="D2" s="8"><f t="shared" ref="D2:D11" si="0">C2/B2-1</f><v></v></c>
<c r="D3" s="8"><f t="shared" si="0"/><v></v></c>
```

## 常见错误与修复

| 错误 | 症状 | 修复 |
|------|------|------|
| 公式前带 `=` | 单元格显示为文本 | 去掉 `=` |
| sharedStrings count 未更新 | Excel 警告或空白单元格 | 统计 `<si>` 数量，更新 count 和 uniqueCount |
| 样式索引越界 | 文件损坏/Excel 修复 | 确保 s < cellXfs count |
| 跨表引用 sheet 名含空格无引号 | `#REF!` 错误 | 加单引号：`'Sheet Name'!B5` |
| 跨表引用不存在的 sheet | `#REF!` 错误 | 检查 workbook.xml sheet 列表 |
| 数字存为文本（t="s"） | 左对齐，无法求和 | 去掉 t 属性 |
| 硬编码 Python 计算结果 | "死表"——数据变后不更新 | 用 `<f>` 替换 `<v>` |

## 交付前检查清单

- `formula_check.py` 零错误
- 所有计算单元格有 `<f>` 非仅 `<v>`
- sharedStrings count 与 uniqueCount 准确
- 样式 s 属性在 `0` 到 `cellXfs count - 1` 范围内
- workbook.xml 与 workbook.xml.rels 中 sheet 一致
- 年份列用 s=11（格式 `0`，无千位分隔符）
- 跨表引用用 s=3（绿色字体）
- 假设输入用 s=1/5/7（蓝色字体）
