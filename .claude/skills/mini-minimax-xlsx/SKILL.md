---
name: mini:minimax-xlsx
description: Excel 表格处理 — 打开、创建、读取、分析、编辑、验证 Excel/电子表格文件（.xlsx, .xlsm, .csv, .tsv）。支持：从零创建、读取分析、零格式丢失编辑、公式重算验证、专业财务格式。触发词：电子表格、Excel、.xlsx、数据透视表、财务模型、公式。
license: MIT
metadata:
  version: "1.0"
  category: productivity
  sources:
    - ECMA-376 Office Open XML File Formats
    - Microsoft Open XML SDK documentation
---

# MiniMax XLSX Skill

Handle the request directly. Do NOT spawn sub-agents. Always write the output file the user requests.

## Task Routing

| Task | Method | Guide |
|------|--------|-------|
| **READ** — analyze existing data | `xlsx_reader.py` + pandas | `references/read-analyze.md` |
| **CREATE** — new xlsx from scratch | XML template | `references/create.md` + `references/format.md` |
| **EDIT** — modify existing xlsx | XML unpack→edit→pack | `references/edit.md` (+ `format.md` if styling needed) |
| **FIX** — repair broken formulas in existing xlsx | XML unpack→fix `<f>` nodes→pack | `references/fix.md` |
| **VALIDATE** — check formulas | `formula_check.py` | `references/validate.md` |

## READ — Analyze data (read `references/read-analyze.md` first)

Start with `xlsx_reader.py` for structure discovery, then pandas for custom analysis. Never modify the source file.

**Formatting rule**: When the user specifies decimal places (e.g. "2 decimal places"), apply that format to ALL numeric values — use `f'{v:.2f}'` on every number. Never output `12875` when `12875.00` is required.

**Aggregation rule**: Always compute sums/means/counts directly from the DataFrame column — e.g. `df['Revenue'].sum()`. Never re-derive column values before aggregation.

## CREATE — XML template (read `references/create.md` + `references/format.md`)

Copy `templates/minimal_xlsx/` → edit XML directly → pack with `xlsx_pack.py`. Every derived value MUST be an Excel formula (`<f>SUM(B2:B9)</f>`), never a hardcoded number. Apply font colors per `format.md`.

## EDIT — XML direct-edit (read `references/edit.md` first)

**CRITICAL — EDIT INTEGRITY RULES:**
1. **NEVER create a new `Workbook()`** for edit tasks. Always load the original file.
2. The output MUST contain the **same sheets** as the input (same names, same data).
3. Only modify the specific cells the task asks for — everything else must be untouched.
4. **After saving output.xlsx, verify it**: open with `xlsx_reader.py` or `pandas` and confirm the original sheet names and a sample of original data are present. If verification fails, you wrote the wrong file — fix it before delivering.

Never use openpyxl round-trip on existing files (corrupts VBA, pivots, sparklines). Instead: unpack → use helper scripts → repack.

**"Fill cells" / "Add formulas to existing cells" = EDIT task.** If the input file already exists and you are told to fill, update, or add formulas to specific cells, you MUST use the XML edit path. Never create a new `Workbook()`. Example — fill B3 with a cross-sheet SUM formula:
```bash
python3 SKILL_DIR/scripts/xlsx_unpack.py input.xlsx /tmp/xlsx_work/
# Find the target sheet's XML via xl/workbook.xml → xl/_rels/workbook.xml.rels
# Then use the Edit tool to add <f> inside the target <c> element:
#   <c r="B3"><f>SUM('Sales Data'!D2:D13)</f><v></v></c>
python3 SKILL_DIR/scripts/xlsx_pack.py /tmp/xlsx_work/ output.xlsx
```

**Add a column** (formulas, numfmt, styles auto-copied from adjacent column):
```bash
python3 SKILL_DIR/scripts/xlsx_unpack.py input.xlsx /tmp/xlsx_work/
python3 SKILL_DIR/scripts/xlsx_add_column.py /tmp/xlsx_work/ --col G \
    --sheet "Sheet1" --header "% of Total" \
    --formula '=F{row}/$F$10' --formula-rows 2:9 \
    --total-row 10 --total-formula '=SUM(G2:G9)' --numfmt '0.0%' \
    --border-row 10 --border-style medium
python3 SKILL_DIR/scripts/xlsx_pack.py /tmp/xlsx_work/ output.xlsx
```
The `--border-row` flag applies a top border to ALL cells in that row (not just the new column). Use it when the task requires accounting-style borders on total rows.

**Insert a row** (shifts existing rows, updates SUM formulas, fixes circular refs):
