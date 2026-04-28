# minimax-xlsx Excel 处理技能

> Sources: minimax-xlsx, 8 files, 2026-04-28
> Created: 2026-04-27
> Raw: [SKILL](../../raw/skills/minimax-xlsx-SKILL.md); [create](../../raw/skills/minimax-xlsx-create.md); [edit](../../raw/skills/minimax-xlsx-edit.md); [fix](../../raw/skills/minimax-xlsx-fix.md); [format](../../raw/skills/minimax-xlsx-format.md); [OOXML cheatsheet](../../raw/skills/minimax-xlsx-ooxml-cheatsheet.md); [read analyze](../../raw/skills/minimax-xlsx-read-analyze.md); [validate](../../raw/skills/minimax-xlsx-validate.md); [minimax-docx SKILL](../../raw/skills/minimax-docx-SKILL.md); [cjk typography](../../raw/skills/minimax-docx-cjk_typography.md); [cjk university template](../../raw/skills/minimax-docx-cjk_university_template_guide.md); [comments](../../raw/skills/minimax-docx-comments_guide.md); [design good/bad](../../raw/skills/minimax-docx-design_good_bad_examples.md); [design principles](../../raw/skills/minimax-docx-design_principles.md); [openxml element order](../../raw/skills/minimax-docx-openxml_element_order.md); [openxml encyclopedia p1](../../raw/skills/minimax-docx-openxml_encyclopedia_part1.md); [openxml encyclopedia p2](../../raw/skills/minimax-docx-openxml_encyclopedia_part2.md); [openxml encyclopedia p3](../../raw/skills/minimax-docx-openxml_encyclopedia_part3.md); [openxml namespaces](../../raw/skills/minimax-docx-openxml_namespaces.md); [openxml units](../../raw/skills/minimax-docx-openxml_units.md); [scenario A create](../../raw/skills/minimax-docx-scenario_a_create.md); [scenario B edit](../../raw/skills/minimax-docx-scenario_b_edit_content.md); [scenario C template](../../raw/skills/minimax-docx-scenario_c_apply_template.md); [track changes](../../raw/skills/minimax-docx-track_changes_guide.md); [troubleshooting](../../raw/skills/minimax-docx-troubleshooting.md); [typography](../../raw/skills/minimax-docx-typography_guide.md); [xsd validation](../../raw/skills/minimax-docx-xsd_validation_guide.md); [minimax-pdf SKILL](../../raw/skills/minimax-pdf-SKILL.md); [pdf design](../../raw/skills/minimax-pdf-design.md)

## 概述

Excel 表格处理——打开、创建、读取、分析、编辑、验证 Excel/XLSX 文件。使用 OpenXML SDK 和 Python 工具链。

## SKILL.md

```
---
name: minimax-xlsx
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
```

## README.md

```
N/A
```

## LICENSE

```
N/A
```

## USAGE.txt

```
N/A
```

## XSD-SCHEMAS-REMOVED.txt

```
N/A
```

## recalc.py

```python
N/A
```

## 脚本（scripts/）


=== FILE: .claude/skills/minimax-xlsx/scripts/formula_check.py ===
#!/usr/bin/env python3
# SPDX-License-Identifier: MIT
"""
formula_check.py — Static formula validator for xlsx files.

Usage:
    python3 formula_check.py <input.xlsx>
    python3 formula_check.py <input.xlsx> --json          # machine-readable output
    python3 formula_check.py <input.xlsx> --report        # standardized validation report (JSON)
    python3 formula_check.py <input.xlsx> --report -o out # report to file
    python3 formula_check.py <input.xlsx> --sheet Sales   # limit to one sheet
    python3 formula_check.py <input.xlsx> --summary       # error counts only, no details

What it checks:
1. Error-value cells: <c t="e"><v>#REF!</v></c> — all 7 Excel error types
2. Broken cross-sheet references: formula references a sheet not in workbook.xml
3. Broken named-range references: formula references a name not in workbook.xml <definedNames>
4. Shared formula integrity: shared formula primary cell exists and has formula text
5. Missing <v> on t="e" cells (malformed XML)

Checks NOT performed (require dynamic recalculation):
- Runtime errors that only appear after formulas execute (#DIV/0! on empty denominator, etc.)
  -> Use libreoffice_recalc.py + re-run formula_check.py for dynamic validation

Exit code:
    0 — no errors found
    1 — errors detected (or file cannot be opened)
"""

import sys
import zipfile
import xml.etree.ElementTree as ET
import re
import json

# OOXML SpreadsheetML namespace
NS = "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
NSP = f"{{{NS}}}"

# All 7 standard Excel formula error types
EXCEL_ERRORS = {"#REF!", "#DIV/0!", "#VALUE!", "#NAME?", "#NULL!", "#NUM!", "#N/A"}

# Excel built-in function names (subset of common ones) — used for #NAME? heuristic
# Full list: https://support.microsoft.com/en-us/office/excel-functions-alphabetical
_BUILTIN_FUNCTIONS = {
    "ABS", "AND", "AVERAGE", "AVERAGEIF", "AVERAGEIFS", "CEILING", "CHOOSE",
    "COUNTA", "COUNTIF", "COUNTIFS", "COUNT", "DATE", "EDATE", "EOMONTH",
    "FALSE", "FILTER", "FIND", "FLOOR", "IF", "IFERROR", "IFNA", "IFS",
    "INDEX", "INDIRECT", "INT", "IRR", "ISBLANK", "ISERROR", "ISNA", "ISNUMBER",
    "LARGE", "LEFT", "LEN", "LOOKUP", "LOWER", "MATCH", "MAX", "MID", "MIN",
    "MOD", "MONTH", "NETWORKDAYS", "NOT", "NOW", "NPV", "OFFSET", "OR",
    "PMT", "PV", "RAND", "RANK", "RIGHT", "ROUND", "ROUNDDOWN", "ROUNDUP",
    "ROW", "ROWS", "SEARCH", "SMALL", "SORT", "SQRT", "SUBSTITUTE", "SUM",
    "SUMIF", "SUMIFS", "SUMPRODUCT", "TEXT", "TODAY", "TRANSPOSE", "TRIM",
    "TRUE", "UNIQUE", "UPPER", "VALUE", "VLOOKUP", "HLOOKUP", "XLOOKUP",
    "XMATCH", "XNPV", "XIRR", "YEAR", "YEARFRAC",
}


def get_sheet_names(z: zipfile.ZipFile) -> dict[str, str]:
    """Return dict of {r:id -> sheet_name} from workbook.xml."""
    wb_xml = z.read("xl/workbook.xml")
    wb = ET.fromstring(wb_xml)
    rel_ns = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
    sheets = {}
    for sheet in wb.findall(f".//{NSP}sheet"):
        name = sheet.get("name", "")
        rid = sheet.get(f"{{{rel_ns}}}id", "")
        sheets[rid] = name
    return sheets


def get_defined_names(z: zipfile.ZipFile) -> set[str]:
    """Return set of named ranges defined in workbook.xml <definedNames>."""
    wb_xml = z.read("xl/workbook.xml")
    wb = ET.fromstring(wb_xml)
    names = set()
    for dn in wb.findall(f".//{NSP}definedName"):
        n = dn.get("name", "")
        if n:
            names.add(n)
    return names


def get_sheet_files(z: zipfile.ZipFile) -> dict[str, str]:
    """Return dict of {r:id -> xl/worksheets/sheetN.xml} from workbook.xml.rels."""
    rels_xml = z.read("xl/_rels/workbook.xml.rels")
    rels = ET.fromstring(rels_xml)
    mapping = {}
    for rel in rels:
        rid = rel.get("Id", "")
        target = rel.get("Target", "")
        if "worksheets" in target:
            # Target may be relative: "worksheets/sheet1.xml" -> "xl/worksheets/sheet1.xml"
            if not target.startswith("xl/"):
                target = "xl/" + target
            mapping[rid] = target
    return mapping


def extract_sheet_refs(formula: str) -> list[str]:
    """
    Extract all sheet names referenced in a formula string.

    Handles:
      - 'Sheet Name'!A1  (quoted, may contain spaces)
      - SheetName!A1     (unquoted, no spaces)

    Returns a list of sheet name strings (may contain duplicates if the same
    sheet is referenced multiple times in one formula).
    """
    refs = []
    # Quoted sheet names: 'Sheet Name'!
    for m in re.finditer(r"'([^']+)'!", formula):
        refs.append(m.group(1))
    # Unquoted sheet names: SheetName! (not preceded by a single quote)
    for m in re.finditer(r"(?<!')([A-Za-z_\u4e00-\u9fff][A-Za-z0-9_.·\u4e00-\u9fff]*)!", formula):
        refs.append(m.group(1))
    return refs


def extract_name_refs(formula: str) -> list[str]:
    """
    Extract identifiers in a formula that could be named range references.

    Heuristic: identifiers that:
    - Are not preceded by a sheet reference (no "!" before them)
    - Are not followed by "(" (which would make them function calls)
    - Match the pattern of a name (letters/underscore start, alphanumeric/underscore body)
    - Are not single-letter column references or row references

    This is approximate. False positives are possible; false negatives are rare.
    """
    names = []
    # Remove quoted sheet references first to avoid false matches
    formula_clean = re.sub(r"'[^']*'![A-Z$0-9:]+", "", formula)
    formula_clean = re.sub(r"[A-Za-z_][A-Za-z0-9_.]*![A-Z$0-9:]+", "", formula_clean)
    # Find identifiers not followed by "(" (not function calls)
    for m in re.finditer(r"\b([A-Za-z_][A-Za-z0-9_]{2,})\b(?!\s*\()", formula_clean):
        candidate = m.group(1)
        # Exclude Excel cell references like A1, B10, AA100
        if re.fullmatch(r"[A-Z]{1,3}[0-9]+", candidate):
            continue
        # Exclude built-in function names (they appear without parens sometimes in array formulas)
        if candidate.upper() in _BUILTIN_FUNCTIONS:
            continue
        names.append(candidate)
    return names


def check(xlsx_path: str, sheet_filter: str | None = None) -> dict:
    """
    Run all static checks on the given xlsx file.

    Args:
        xlsx_path: path to the .xlsx file
        sheet_filter: if provided, only check the sheet with this name

    Returns:
        A dict with keys:
          file, sheets_checked, formula_count, shared_formula_ranges,
          error_count, errors
    """
    results = {
        "file": xlsx_path,
        "sheets_checked": [],
        "formula_count": 0,
        "shared_formula_ranges": 0,  # number of shared formula definitions
        "error_count": 0,
        "errors": [],
    }

    try:
        z = zipfile.ZipFile(xlsx_path, "r")
    except (zipfile.BadZipFile, FileNotFoundError) as e:
        results["errors"].append({"type": "file_error", "message": str(e)})
        results["error_count"] = 1
        return results

    with z:
        sheet_names = get_sheet_names(z)
        sheet_files = get_sheet_files(z)
        valid_sheet_names = set(sheet_names.values())
        defined_names = get_defined_names(z)

        for rid, sheet_name in sheet_names.items():
            # Apply sheet filter if requested
            if sheet_filter and sheet_name != sheet_filter:
                continue

            ws_file = sheet_files.get(rid)
            if not ws_file or ws_file not in z.namelist():
                continue

            results["sheets_checked"].append(sheet_name)
            ws_xml = z.read(ws_file)
            ws = ET.fromstring(ws_xml)

            # Track shared formula IDs seen on this sheet (si -> primary cell ref)
            shared_primary: dict[str, str] = {}

            for cell in ws.findall(f".//{NSP}c"):
                cell_ref = cell.get("r", "?")
                cell_type = cell.get("t", "n")

                # ── Check 1: error-value cell ──────────────────────────────
                if cell_type == "e":
                    v_elem = cell.find(f"{NSP}v")
                    if v_elem is None:
                        # Malformed: t="e" but no <v> — record as structural issue
                        results["errors"].append(
                            {
                                "type": "malformed_error_cell",
                                "sheet": sheet_name,
                                "cell": cell_ref,
                                "detail": "Cell has t='e' but no <v> child element",
                            }
                        )
                        results["error_count"] += 1
                    else:
                        error_val = v_elem.text or "#UNKNOWN"
                        f_elem = cell.find(f"{NSP}f")
                        results["errors"].append(
                            {
                                "type": "error_value",
                                "error": error_val,
                                "sheet": sheet_name,
                                "cell": cell_ref,
                                # Include formula text if present
                                "formula": f_elem.text if (f_elem is not None and f_elem.text) else None,
                            }
                        )
                        results["error_count"] += 1

                # ── Check 2 & 3: formulas ──────────────────────────────────
                f_elem = cell.find(f"{NSP}f")
                if f_elem is None:
                    continue

                f_type = f_elem.get("t", "")  # "shared", "array", or "" for normal
                f_si = f_elem.get("si")       # shared formula group ID

                # Count formulas:
                # - Normal formulas: always count
                # - Shared formula PRIMARY (has text + ref attribute): count once
                # - Shared formula CONSUMER (si only, no text): do NOT count separately
                #   (they are covered by the primary's ref range)
                if f_type == "shared" and f_elem.text is None:
                    # Consumer cell: skip formula counting and cross-ref checks
                    # (the primary cell already covers this formula)
                    continue

                formula = f_elem.text or ""

                if f_type == "shared" and f_elem.get("ref"):
                    results["shared_formula_ranges"] += 1
                    if f_si is not None:
                        shared_primary[f_si] = cell_ref

                if formula:
                    results["formula_count"] += 1

                    # Check 2: cross-sheet references
                    for ref_sheet in extract_sheet_refs(formula):
                        if ref_sheet not in valid_sheet_names:
                            results["errors"].append(
                                {
                                    "type": "broken_sheet_ref",
                                    "sheet": sheet_name,
                                    "cell": cell_ref,
                                    "formula": formula,
                                    "missing_sheet": ref_sheet,
                                    "valid_sheets": sorted(valid_sheet_names),
                                }
                            )
                            results["error_count"] += 1

                    # Check 3: named range references
                    # Only flag if the name is not a built-in and not a sheet-prefixed ref
                    for name_ref in extract_name_refs(formula):
                        if name_ref not in defined_names:
                            results["errors"].append(
                                {
                                    "type": "unknown_name_ref",
                                    "sheet": sheet_name,
                                    "cell": cell_ref,
                                    "formula": formula,
                                    "unknown_name": name_ref,
                                    "defined_names": sorted(defined_names),
                                    "note": "Heuristic check — verify manually if this is a false positive",
                                }
                            )
                            results["error_count"] += 1

    return results


def build_report(results: dict) -> dict:
    """
    Transform raw check() output into a standardized validation report.

    Usage:
        python3 formula_check.py <input.xlsx> --report          # JSON report to stdout
        python3 formula_check.py <input.xlsx> --report -o out   # JSON report to file
    """
    from collections import Counter

    errors = results.get("errors", [])
    error_types = [e.get("error", e.get("type", "unknown")) for e in errors]

    return {
        "status": "success" if results["error_count"] == 0 else "errors_found",
        "file": results["file"],
        "sheets_checked": results["sheets_checked"],
        "total_formulas": results["formula_count"],
        "total_errors": results["error_count"],
        "shared_formula_ranges": results.get("shared_formula_ranges", 0),
        "errors_by_type": dict(Counter(error_types)) if errors else {},
        "errors": errors,
    }


def main() -> None:
    use_json = "--json" in sys.argv
    use_report = "--report" in sys.argv
    summary_only = "--summary" in sys.argv
    output_file = None
    sheet_filter = None
    args_clean = []

    i = 1
    while i < len(sys.argv):
        arg = sys.argv[i]
        if arg == "--sheet" and i + 1 < len(sys.argv):
            sheet_filter = sys.argv[i + 1]
            i += 2
        elif arg == "-o" and i + 1 < len(sys.argv):
            output_file = sys.argv[i + 1]
            i += 2
        elif arg.startswith("--"):
            i += 1  # skip flags already handled
        else:
            args_clean.append(arg)
            i += 1

    if not args_clean:
        print("Usage: formula_check.py <input.xlsx> [--json] [--report [-o FILE]] [--sheet NAME] [--summary]")
        sys.exit(1)

    results = check(args_clean[0], sheet_filter=sheet_filter)

    if use_report:
        report = build_report(results)
        output = json.dumps(report, indent=2, ensure_ascii=False)
        if output_file:
            with open(output_file, "w", encoding="utf-8") as f:
                f.write(output + "\n")
        else:
            print(output)
        sys.exit(1 if results["error_count"] > 0 else 0)

    if use_json:
        print(json.dumps(results, indent=2, ensure_ascii=False))
        sys.exit(1 if results["error_count"] > 0 else 0)

    # Human-readable output
    sheets = ", ".join(results["sheets_checked"]) or "(none)"
    if sheet_filter:
        sheets = f"{sheet_filter} (filtered)"

    print(f"File   : {results['file']}")
    print(f"Sheets : {sheets}")
    print(f"Formulas checked      : {results['formula_count']} distinct formula cells")
    print(f"Shared formula ranges : {results['shared_formula_ranges']} ranges")
    print(f"Errors found          : {results['error_count']}")

    if not summary_only and results["errors"]:
        print("\n── Error Details ──")
        for e in results["errors"]:
            if e["type"] == "error_value":
                formula_hint = f" (formula: {e['formula']})" if e.get("formula") else ""
                print(f"  [FAIL] [{e['sheet']}!{e['cell']}] contains {e['error']}{formula_hint}")
            elif e["type"] == "broken_sheet_ref":
                print(
                    f"  [FAIL] [{e['sheet']}!{e['cell']}] references missing sheet "
                    f"'{e['missing_sheet']}'"
                )
                print(f"         Formula: {e['formula']}")
                print(f"         Valid sheets: {e.get('valid_sheets', [])}")
            elif e["type"] == "unknown_name_ref":
                print(
                    f"  [WARN] [{e['sheet']}!{e['cell']}] uses unknown name "
                    f"'{e['unknown_name']}' (heuristic — verify manually)"
                )
                print(f"         Formula: {e['formula']}")
                print(f"         Defined names: {e.get('defined_names', [])}")
            elif e["type"] == "malformed_error_cell":
                print(f"  [FAIL] [{e['sheet']}!{e['cell']}] malformed error cell: {e['detail']}")
            elif e["type"] == "file_error":
                print(f"  [FAIL] File error: {e['message']}")
        print()

    if results["error_count"] == 0:
        print("PASS — No formula errors detected")
    else:
        # Separate definitive failures from heuristic warnings
        hard_errors = [e for e in results["errors"] if e["type"] != "unknown_name_ref"]
        warnings = [e for e in results["errors"] if e["type"] == "unknown_name_ref"]
        if hard_errors:
            print(f"FAIL — {len(hard_errors)} error(s) must be fixed before delivery")
            if warnings:
                print(f"WARN — {len(warnings)} heuristic warning(s) require manual review")
            sys.exit(1)
        else:
            # Only heuristic warnings — do not block delivery but alert
            print(f"PASS with WARN — {len(warnings)} heuristic warning(s) require manual review")
            # Exit 0: heuristic warnings alone do not block delivery
            sys.exit(0)


if __name__ == "__main__":
    main()

=== FILE: .claude/skills/minimax-xlsx/scripts/libreoffice_recalc.py ===
#!/usr/bin/env python3
# SPDX-License-Identifier: MIT
"""
libreoffice_recalc.py — Tier 2 dynamic formula recalculation via LibreOffice headless.

Opens the xlsx file with the LibreOffice Calc engine, executes all formulas, writes
the computed values into the <v> cache elements, and saves the result. This is the
closest server-side equivalent of "open in Excel and save."

After recalculation, run formula_check.py on the output file to detect runtime errors
(#DIV/0!, #N/A, etc.) that only surface after actual computation.

Usage:
    python3 libreoffice_recalc.py input.xlsx output.xlsx
    python3 libreoffice_recalc.py input.xlsx output.xlsx --timeout 90
    python3 libreoffice_recalc.py --check          # check LibreOffice availability only

Exit codes:
    0 — recalculation succeeded, output file written
    2 — LibreOffice not found (Tier 2 unavailable — not a hard failure, note in report)
    1 — LibreOffice found but recalculation failed (timeout, crash, bad file)
"""

import subprocess
import sys
import shutil
import os
import tempfile
import argparse


# ── LibreOffice discovery ───────────────────────────────────────────────────

def find_soffice() -> str | None:
    """
    Locate the soffice (LibreOffice) binary.

    Search order:
      1. macOS application bundle (default install location)
      2. PATH lookup for 'soffice'
      3. PATH lookup for 'libreoffice' (common on Linux)
    """
    candidates = [
        "/Applications/LibreOffice.app/Contents/MacOS/soffice",  # macOS
        "soffice",     # Linux / macOS if on PATH
        "libreoffice", # alternative Linux name
    ]
    for c in candidates:
        # shutil.which handles PATH lookup; also check absolute paths directly
        found = shutil.which(c)
        if found:
            return found
        if os.path.isfile(c) and os.access(c, os.X_OK):
            return c
    return None


def get_libreoffice_version(soffice: str) -> str:
    """Return LibreOffice version string, or 'unknown' on failure."""
    try:
        result = subprocess.run(
            [soffice, "--version"],
            capture_output=True,
            timeout=10,
        )
        return result.stdout.decode(errors="replace").strip()
    except Exception:
        return "unknown"


# ── Recalculation ───────────────────────────────────────────────────────────

def recalculate(
    input_path: str,
    output_path: str,
    timeout: int = 60,
) -> tuple[bool, str]:
    """
    Run LibreOffice headless recalculation on input_path, write result to output_path.

    Returns:
        (success: bool, message: str)

    The message explains what happened (success or failure reason).
    """
    soffice = find_soffice()
    if not soffice:
        return False, (
            "LibreOffice not found. Tier 2 validation is unavailable in this environment. "
            "Install LibreOffice to enable dynamic formula recalculation.\n"
            "  macOS:  brew install --cask libreoffice\n"
            "  Linux:  sudo apt-get install -y libreoffice"
        )

    version = get_libreoffice_version(soffice)

    # Work on a copy in a temp directory to avoid side effects on the source file.
    # LibreOffice writes the output using the same filename stem in --outdir.
    with tempfile.TemporaryDirectory(prefix="xlsx_recalc_") as tmpdir:
        tmp_input = os.path.join(tmpdir, os.path.basename(input_path))
        shutil.copy(input_path, tmp_input)

        cmd = [
            soffice,
            "--headless",
            "--norestore",           # do not attempt to restore crashed sessions
            "--infilter=Calc MS Excel 2007 XML",
            "--convert-to", "xlsx",
            "--outdir", tmpdir,
            tmp_input,
        ]

        try:
            result = subprocess.run(
                cmd,
                capture_output=True,
                timeout=timeout,
            )
        except subprocess.TimeoutExpired:
            return False, (
                f"LibreOffice timed out after {timeout}s. "
                "The file may be too large or contain constructs that cause LibreOffice to hang. "
                "Try increasing --timeout or simplify the file."
            )
        except FileNotFoundError:
            return False, f"LibreOffice binary not executable: {soffice}"

        if result.returncode != 0:
            stderr = result.stderr.decode(errors="replace").strip()
            stdout = result.stdout.decode(errors="replace").strip()
            return False, (
                f"LibreOffice exited with code {result.returncode}.\n"
                f"stderr: {stderr}\n"
                f"stdout: {stdout}"
            )

        # LibreOffice writes: <tmpdir>/<stem>.xlsx
        stem = os.path.splitext(os.path.basename(tmp_input))[0]
        tmp_output = os.path.join(tmpdir, stem + ".xlsx")

        if not os.path.isfile(tmp_output):
            # Try to find any .xlsx file in tmpdir (LibreOffice may behave differently)
            xlsx_files = [f for f in os.listdir(tmpdir) if f.endswith(".xlsx") and f != os.path.basename(tmp_input)]
            if xlsx_files:
                tmp_output = os.path.join(tmpdir, xlsx_files[0])
            else:
                stdout = result.stdout.decode(errors="replace").strip()
                return False, (
                    f"LibreOffice succeeded (exit 0) but output file not found in {tmpdir}.\n"
                    f"stdout: {stdout}\n"
                    f"Files in tmpdir: {os.listdir(tmpdir)}"
                )

        # Copy recalculated file to final destination
        os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)
        shutil.copy(tmp_output, output_path)

    return True, f"Recalculation complete. LibreOffice {version}. Output: {output_path}"


# ── CLI ─────────────────────────────────────────────────────────────────────

def main() -> None:
    parser = argparse.ArgumentParser(
        description="LibreOffice headless formula recalculation for xlsx files.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Basic recalculation
  python3 libreoffice_recalc.py report.xlsx report_recalc.xlsx

  # With extended timeout for large files
  python3 libreoffice_recalc.py big_model.xlsx big_model_recalc.xlsx --timeout 120

  # Check if LibreOffice is available (useful in CI)
  python3 libreoffice_recalc.py --check

  # Full validation pipeline
  python3 libreoffice_recalc.py input.xlsx /tmp/recalc.xlsx && \\
    python3 formula_check.py /tmp/recalc.xlsx
""",
    )
    parser.add_argument("input", nargs="?", help="Input xlsx file path")
    parser.add_argument("output", nargs="?", help="Output xlsx file path (recalculated)")
    parser.add_argument(
        "--timeout",
        type=int,
        default=60,
        metavar="SECONDS",
        help="Maximum time to wait for LibreOffice (default: 60)",
    )
    parser.add_argument(
        "--check",
        action="store_true",
        help="Only check if LibreOffice is available, then exit",
    )

    args = parser.parse_args()

    # ── --check mode ─────────────────────────────────────────────────────────
    if args.check:
        soffice = find_soffice()
        if soffice:
            version = get_libreoffice_version(soffice)
            print(f"LibreOffice available: {soffice}")
            print(f"Version: {version}")
            sys.exit(0)
        else:
            print("LibreOffice NOT available.")
            print("Tier 2 dynamic validation requires LibreOffice.")
            print("  macOS:  brew install --cask libreoffice")
            print("  Linux:  sudo apt-get install -y libreoffice")
            sys.exit(2)

    # ── Recalculation mode ────────────────────────────────────────────────────
    if not args.input or not args.output:
        parser.print_help()
        sys.exit(1)

    if not os.path.isfile(args.input):
        print(f"ERROR: Input file not found: {args.input}")
        sys.exit(1)

    print(f"Input  : {args.input}")
    print(f"Output : {args.output}")
    print(f"Timeout: {args.timeout}s")
    print()

    success, message = recalculate(args.input, args.output, timeout=args.timeout)

    if success:
        print(f"OK: {message}")
        print()
        print("Next step: run formula_check.py on the recalculated file to detect runtime errors:")
        print(f"  python3 formula_check.py {args.output}")
        sys.exit(0)
    else:
        # Distinguish "not installed" (exit 2) from "failed" (exit 1)
        if "not found" in message.lower() or "not available" in message.lower():
            print(f"SKIP (Tier 2 unavailable): {message}")
            sys.exit(2)
        else:
            print(f"ERROR: {message}")
            sys.exit(1)


if __name__ == "__main__":
    main()

=== FILE: .claude/skills/minimax-xlsx/scripts/shared_strings_builder.py ===
#!/usr/bin/env python3
# SPDX-License-Identifier: MIT
"""
shared_strings_builder.py — Generate a valid sharedStrings.xml from a list of strings.

Usage (strings as command-line arguments):
    python3 shared_strings_builder.py "Revenue" "Cost" "Gross Profit" > sharedStrings.xml

Usage (strings from a file, one per line):
    python3 shared_strings_builder.py --file strings.txt > sharedStrings.xml

Usage (print index table instead of XML, for reference):
    python3 shared_strings_builder.py --index "Revenue" "Cost" "Gross Profit"
    python3 shared_strings_builder.py --index --file strings.txt

Output format:
    Valid xl/sharedStrings.xml written to stdout.
    Redirect to the correct path:
        python3 shared_strings_builder.py "A" "B" > /tmp/xlsx_work/xl/sharedStrings.xml

Notes:
    - Strings are de-duplicated: identical strings appear only once in the table.
    - The 'count' attribute equals the number of unique strings (appropriate for new files
      where each string is used in exactly one cell). If a string appears in multiple cells,
      manually increment 'count' by the number of extra references.
    - Special characters (&, <, >) are automatically XML-escaped.
    - Leading/trailing spaces are preserved with xml:space="preserve".
"""

import sys
import html
import argparse


HEADER = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
SST_NS = "http://schemas.openxmlformats.org/spreadsheetml/2006/main"


def escape_text(s: str) -> tuple[str, bool]:
    """
    Return (escaped_text, needs_preserve).
    needs_preserve is True if the string has leading or trailing whitespace.
    """
    escaped = html.escape(s, quote=False)
    needs_preserve = s != s.strip()
    return escaped, needs_preserve


def build_xml(strings: list[str]) -> str:
    """Build sharedStrings.xml content from a list of unique strings."""
    n = len(strings)
    lines = [
        HEADER,
        f'<sst xmlns="{SST_NS}" count="{n}" uniqueCount="{n}">',
    ]
    for i, s in enumerate(strings):
        escaped, preserve = escape_text(s)
        if preserve:
            lines.append(f'  <si><t xml:space="preserve">{escaped}</t></si>'
                         f'  <!-- index {i} -->')
        else:
            lines.append(f'  <si><t>{escaped}</t></si>  <!-- index {i} -->')
    lines.append("</sst>")
    return "\n".join(lines) + "\n"


def build_index_table(strings: list[str]) -> str:
    """Return a human-readable index table (for agent reference, not written to file)."""
    lines = [
        f"{'Index':<6}  String",
        "-" * 50,
    ]
    for i, s in enumerate(strings):
        lines.append(f"{i:<6}  {s!r}")
    lines.append("")
    lines.append(
        f"Total: {len(strings)} unique strings. "
        "Use these indices in <c t=\"s\"><v>N</v></c> cells."
    )
    return "\n".join(lines) + "\n"


def deduplicate(strings: list[str]) -> list[str]:
    """Remove duplicates while preserving first-occurrence order."""
    seen: set[str] = set()
    result: list[str] = []
    for s in strings:
        if s not in seen:
            seen.add(s)
            result.append(s)
    return result


def load_from_file(path: str) -> list[str]:
    """Read one string per non-empty line from a file."""
    with open(path, encoding="utf-8") as f:
        return [line.rstrip("\n") for line in f if line.strip()]


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Generate xl/sharedStrings.xml from a list of strings.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument(
        "strings",
        nargs="*",
        metavar="STRING",
        help="String values to include in the shared string table.",
    )
    parser.add_argument(
        "--file",
        "-f",
        metavar="PATH",
        help="Read strings from a file (one string per line) instead of arguments.",
    )
    parser.add_argument(
        "--index",
        action="store_true",
        help="Print a human-readable index table instead of XML output.",
    )
    args = parser.parse_args()

    if args.file:
        try:
            raw = load_from_file(args.file)
        except FileNotFoundError:
            print(f"ERROR: File not found: {args.file}", file=sys.stderr)
            sys.exit(1)
        except OSError as e:
            print(f"ERROR: Cannot read file: {e}", file=sys.stderr)
            sys.exit(1)
    else:
        raw = list(args.strings)

    if not raw:
        print(
            "ERROR: No strings provided.\n"
            "Usage: shared_strings_builder.py \"String1\" \"String2\" ...\n"
            "   or: shared_strings_builder.py --file strings.txt",
            file=sys.stderr,
        )
        sys.exit(1)

    strings = deduplicate(raw)

    if len(strings) < len(raw):
        removed = len(raw) - len(strings)
        print(
            f"Note: {removed} duplicate(s) removed. "
            f"{len(strings)} unique strings in table.",
            file=sys.stderr,
        )

    if args.index:
        print(build_index_table(strings))
    else:
        print(build_xml(strings), end="")


if __name__ == "__main__":
    main()

=== FILE: .claude/skills/minimax-xlsx/scripts/style_audit.py ===
#!/usr/bin/env python3
# SPDX-License-Identifier: MIT
"""
style_audit.py — Financial formatting compliance checker for xlsx files.

Audits an xlsx file (or an unpacked xlsx directory) and reports:
1. Style system integrity: count attributes match actual element counts
2. Color-role violations: formula cells with blue font, input cells with black font
3. Year-format violations: cells containing 4-digit years using comma-format
4. Percentage value violations: percentage-formatted cells with values > 1 (likely meant 0.08 not 8)
5. Style index out-of-range: s attribute exceeds cellXfs count
6. fills[0]/fills[1] presence check (OOXML spec requirement)

Usage:
    python3 style_audit.py input.xlsx                  # audit a packed xlsx
    python3 style_audit.py /tmp/xlsx_work/             # audit an unpacked directory
    python3 style_audit.py input.xlsx --json           # machine-readable output
    python3 style_audit.py input.xlsx --summary        # counts only, no detail

Exit code:
    0 — no violations found
    1 — violations detected (or file cannot be opened)
"""

import sys
import os
import zipfile
import xml.etree.ElementTree as ET
import json
import re
import tempfile
import shutil

NS = "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
NSP = f"{{{NS}}}"

# Predefined style index semantics from minimal_xlsx template.
# Maps cellXfs index -> (role, font_color_expectation, numFmt_type)
# role: "input" = blue expected, "formula" = black/green expected, "header" = any, "any" = skip
TEMPLATE_SLOT_ROLES = {
    0:  ("any",     None,    None),
    1:  ("input",   "blue",  "general"),
    2:  ("formula", "black", "general"),
    3:  ("formula", "green", "general"),
    4:  ("any",     None,    "general"),   # header
    5:  ("input",   "blue",  "currency"),
    6:  ("formula", "black", "currency"),
    7:  ("input",   "blue",  "percent"),
    8:  ("formula", "black", "percent"),
    9:  ("input",   "blue",  "integer"),
    10: ("formula", "black", "integer"),
    11: ("input",   "blue",  "year"),
    12: ("input",   "blue",  "general"),   # highlight
}

# AARRGGBB values for each role color
BLUE_RGB  = "000000ff"
BLACK_RGB = "00000000"
GREEN_RGB = "00008000"
RED_RGB   = "00ff0000"

# numFmtIds that represent percentage formats (built-in + common custom)
PERCENT_FMT_IDS = {9, 10, 165, 170}

# numFmtIds that use comma separator (would corrupt year display)
COMMA_FMT_IDS = {3, 4, 167, 168}  # #,##0 style — 4-digit years would show as 2,024


def _parse_styles(styles_xml: bytes) -> dict:
    """Parse styles.xml and return structured data."""
    root = ET.fromstring(styles_xml)

    def find(tag):
        return root.find(f"{NSP}{tag}")

    # numFmts
    num_fmts = {}  # id -> formatCode
    nf_elem = find("numFmts")
    if nf_elem is not None:
        declared_count = int(nf_elem.get("count", "0"))
        actual_count = len(nf_elem)
        for nf in nf_elem:
            fid = int(nf.get("numFmtId", "0"))
            num_fmts[fid] = nf.get("formatCode", "")
    else:
        declared_count = 0
        actual_count = 0

    # fonts — extract color and bold flag
    fonts = []
    fonts_elem = find("fonts")
    fonts_declared = 0
    if fonts_elem is not None:
        fonts_declared = int(fonts_elem.get

=== FILE: .claude/skills/minimax-xlsx/scripts/xlsx_add_column.py ===
#!/usr/bin/env python3
# SPDX-License-Identifier: MIT
"""
xlsx_add_column.py — Add a new column to a worksheet in an unpacked xlsx.

Usage examples:
    # Add a percentage column with formulas and number format
    python3 xlsx_add_column.py /tmp/work/ --col G \\
        --sheet "Budget FY2025" \\
        --header "% of Total" \\
        --formula '=F{row}/$F$10' --formula-rows 2:9 \\
        --total-row 10 --total-formula '=SUM(G2:G9)' \\
        --numfmt '0.0%'

What it does:
  1. Adds header cell (copies style from previous column's header)
  2. Adds formula cells for the specified row range
  3. Adds a total formula cell if specified
  4. Creates a new cell style with the given numfmt if needed
  5. Updates sharedStrings.xml for header text
  6. Updates dimension ref and column definitions

IMPORTANT: Run on an UNPACKED directory (from xlsx_unpack.py).
After running, repack with xlsx_pack.py.
"""

import argparse
import copy
import os
import re
import sys
import xml.dom.minidom
import xml.etree.ElementTree as ET

NS_SS = "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
NS_REL = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"

ET.register_namespace('', NS_SS)
ET.register_namespace('r', NS_REL)
ET.register_namespace('xdr', 'http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing')
ET.register_namespace('x14', 'http://schemas.microsoft.com/office/spreadsheetml/2009/9/main')
ET.register_namespace('xr2', 'http://schemas.microsoft.com/office/spreadsheetml/2015/revision2')
ET.register_namespace('mc', 'http://schemas.openxmlformats.org/markup-compatibility/2006')


def _tag(local: str) -> str:
    return f"{{{NS_SS}}}{local}"


def _write_tree(tree: ET.ElementTree, path: str) -> None:
    tree.write(path, encoding="unicode", xml_declaration=False)
    with open(path, "r", encoding="utf-8") as fh:
        raw = fh.read()
    try:
        dom = xml.dom.minidom.parseString(raw.encode("utf-8"))
        pretty = dom.toprettyxml(indent="  ", encoding="utf-8").decode("utf-8")
        lines = [line for line in pretty.splitlines() if line.strip()]
        with open(path, "w", encoding="utf-8") as fh:
            fh.write("\n".join(lines) + "\n")
    except Exception:
        pass


def col_number(s: str) -> int:
    n = 0
    for c in s.upper():
        n = n * 26 + (ord(c) - 64)
    return n


def col_letter(n: int) -> str:
    r = ""
    while n > 0:
        n, rem = divmod(n - 1, 26)
        r = chr(65 + rem) + r
    return r


def find_ws_path(work_dir: str, sheet_name: str | None) -> str:
    wb_tree = ET.parse(os.path.join(work_dir, "xl", "workbook.xml"))
    rid = None
    for sheet in wb_tree.getroot().iter(_tag("sheet")):
        if sheet_name is None or sheet.get("name") == sheet_name:
            rid = sheet.get(f"{{{NS_REL}}}id")
            break

    if rid is None:
        print(f"ERROR: Sheet not found: {sheet_name}")
        sys.exit(1)

    rels_tree = ET.parse(os.path.join(work_dir, "xl", "_rels", "workbook.xml.rels"))
    for rel in rels_tree.getroot():
        if rel.get("Id") == rid:
            return os.path.join(work_dir, "xl", rel.get("Target"))

    print(f"ERROR: Relationship not found: {rid}")
    sys.exit(1)


def add_shared_string(work_dir: str, text: str) -> int:
    ss_path = os.path.join(work_dir, "xl", "sharedStrings.xml")
    tree = ET.parse(ss_path)
    root = tree.getroot()

    idx = 0
    for si in root.findall(_tag("si")):
        t_el = si.find(_tag("t"))
        if t_el is not None and t_el.text == text:
            return idx
        idx += 1

    si = ET.SubElement(root, _tag("si"))
    t = ET.SubElement(si, _tag("t"))
    t.set("{http://www.w3.org/XML/1998/namespace}space", "preserve")
    t.text = text

    root.set("count", str(int(root.get("count", "0")) + 1))
    root.set("uniqueCount", str(int(root.get("uniqueCount", "0")) + 1))

    _write_tree(tree, ss_path)
    return idx


def get_cell_style(ws_tree: ET.ElementTree, col: str, row: int) -> int:
    ref = f"{col}{row}"
    for row_el in ws_tree.getroot().iter(_tag("row")):
        if row_el.get("r") == str(row):
            for c in row_el:
                if c.get("r") == ref:
                    return int(c.get("s", "0"))
    return 0


def ensure_numfmt_style(work_dir: str, ref_style_idx: int, numfmt_code: str) -> int:
    """Clone a cellXfs entry with the given numfmt. Returns new style index."""
    styles_path = os.path.join(work_dir, "xl", "styles.xml")
    tree = ET.parse(styles_path)
    root = tree.getroot()

    # Find or add numFmt
    numfmts = root.find(_tag("numFmts"))
    numfmt_id = None
    if numfmts is not None:
        for nf in numfmts:
            if nf.get("formatCode") == numfmt_code:
                numfmt_id = int(nf.get("numFmtId"))
                break

    if numfmt_id is None:
        max_id = 163
        if numfmts is not None:
            for nf in numfmts:
                max_id = max(max_id, int(nf.get("numFmtId", "0")))
        else:
            numfmts = ET.SubElement(root, _tag("numFmts"))
            numfmts.set("count", "0")
            root.remove(numfmts)
            root.insert(0, numfmts)

        numfmt_id = max_id + 1
        nf = ET.SubElement(numfmts, _tag("numFmt"))
        nf.set("numFmtId", str(numfmt_id))
        nf.set("formatCode", numfmt_code)
        numfmts.set("count", str(len(list(numfmts))))

    # Find or create cellXfs entry
    cellxfs = root.find(_tag("cellXfs"))
    xf_list = list(cellxfs)
    ref_xf = xf_list[min(ref_style_idx, len(xf_list) - 1)]

    for i, xf in enumerate(xf_list):
        if (xf.get("numFmtId") == str(numfmt_id) and
                xf.get("fontId") == ref_xf.get("fontId") and
                xf.get("fillId") == ref_xf.get("fillId") and
                xf.get("borderId") == ref_xf.get("borderId")):
            return i

    new_xf = copy.deepcopy(ref_xf)
    new_xf.set("numFmtId", str(numfmt_id))
    new_xf.set("applyNumberFormat", "true")
    cellxfs.append(new_xf)
    cellxfs.set("count", str(len(list(cellxfs))))

    _write_tree(tree, styles_path)
    return len(list(cellxfs)) - 1


def _apply_border_to_row(work_dir: str, ws_path: str, ws_tree: ET.ElementTree,
                         ws_root: ET.Element, row_map: dict, border_row: int,
                         border_style: str, new_col: str) -> None:
    """Apply a top border to ALL cells in the specified row (A through new_col)."""
    styles_path = os.path.join(work_dir, "xl", "styles.xml")
    st_tree = ET.parse(styles_path)
    st_root = st_tree.getroot()

    # 1. Create a new border entry with the specified top style
    borders = st_root.find(_tag("borders"))
    new_border = ET.SubElement(borders, _tag("border"))
    for side in ("left", "right"):
        ET.SubElement(new_border, _tag(side))
    top_el = ET.SubElement(new_border, _tag("top"))
    top_el.set("style", border_style)
    ET.SubElement(new_border, _tag("bottom"))
    ET.SubElement(new_border, _tag("diagonal"))
    borders.set("count", str(len(list(borders))))
    new_border_id = len(list(borders)) - 1

    # 2. For each existing style used in the row, create a clone with the new borderId
    cellxfs = st_root.find(_tag("cellXfs"))
    style_remap = {}  # old_style_idx -> new_style_idx

    if border_row not in row_map:
        return

    row_el = row_map[border_row]
    # Collect all cells in this row and their styles
    for c in row_el:
        old_s = int(c.get("s", "0"))
        if old_s not in style_remap:
            xf_list = list(cellxfs)
            ref_xf = xf_list[min(old_s, len(xf_list) - 1)]
            new_xf = copy.deepcopy(ref_xf)
            new_xf.set("borderId", str(new_border_id))
            new_xf.set("applyBorder", "true")
            cellxfs.append(new_xf)
            cellxfs.set("count", str(len(list(cellxfs))))
            style_remap[old_s] = len(list(cellxfs)) - 1

    # 3. Apply remapped styles to all cells in the row
    for c in row_el:
        old_s = int(c.get("s", "0"))
        if old_s in style_remap:
            c.set("s", str(style_remap[old_s]))

    _write_tree(st_tree, styles_path)
    last_col_num = col_number(new_col)
    print(f"  Applied {border_style} top border to all cells in row {border_row} "
          f"(A-{new_col}, {len(style_remap)} style(s) cloned)")


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Add a column to a worksheet in an unpacked xlsx")
    parser.add_argument("work_dir", help="Unpacked xlsx working directory")
    parser.add_argument("--col", required=True, help="Column letter (e.g., G)")
    parser.add_argument("--sheet", default=None, help="Sheet name (default: first)")
    parser.add_argument("--header", default=None, help="Header text for row 1")
    parser.add_argument("--formula", default=None,
                        help="Formula template with {row} placeholder")
    parser.add_argument("--formula-rows", default=None,
                        help="Row range for formulas (e.g., 2:9)")
    parser.add_argument("--total-row", type=int, default=None,
                        help="Row number for total formula")
    parser.add_argument("--total-formula", default=None,
                        help="Formula for total row")
    parser.add_argument("--numfmt", default=None,
                        help="Number format for data/total cells (e.g., 0.0%%)")
    parser.add_argument("--border-row", type=int, default=None,
                        help="Row to apply a top border to ALL cells (e.g., 10)")
    parser.add_argument("--border-style", default="medium",
                        help="Border style: thin, medium, thick (default: medium)")
    args = parser.parse_args()

    col = args.col.upper()
    prev_col = col_letter(col_number(col) - 1) if col_number(col) > 1 else "A"

    ws_path = find_ws_path(args.work_dir, args.sheet)
    ws_tree = ET.parse(ws_path)
    changes = 0

    print(f"Adding column {col} to {os.path.basename(ws_path)}")

    # Resolve styles from previous column
    header_style = get_cell_style(ws_tree, prev_col, 1) if args.header else 0

    data_style = None
    if args.formula_rows:
        start_row = int(args.formula_rows.split(":")[0])
        ref = get_cell_style(ws_tree, prev_col, start_row)
        data_style = (ensure_numfmt_style(args.work_dir, ref, args.numfmt)
                      if args.numfmt else ref)

    total_style = None
    if args.total_row:
        ref = get_cell_style(ws_tree, prev_col, args.total_row)
        total_style = (ensure_numfmt_style(args.work_dir, ref, args.numfmt)
                       if args.numfmt else ref)

    # Add header to sharedStrings
    header_idx = add_shared_string(args.work_dir, args.header) if args.header else None

    # Re-parse worksheet (sharedStrings write may have changed state)
    ws_tree = ET.parse(ws_path)
    root = ws_tree.getroot()
    sheet_data = root.find(_tag("sheetData"))

    row_map = {}
    for row_el in sheet_data:
        r = row_el.get("r")
        if r:
            row_map[int(r)] = row_el

    # Add header cell
    if args.header and 1 in row_map:
        cell = ET.SubElement(row_map[1], _tag("c"))
        cell.set("r", f"{col}1")
        cell.set("s", str(header_style))
        cell.set("t", "s")
        v = ET.SubElement(cell, _tag("v"))
        v.text = str(header_idx)
        changes += 1
        print(f"  {col}1 = \"{args.header}\" (header, style={header_style})")

    # Add formula cells
    if args.formula and args.formula_rows:
        start, end = map(int, args.formula_rows.split(":"))
        for row_num in range(start, end + 1):
            if row_num not in row_map:
                row_el = ET.SubElement(sheet_data, _tag("row"))
                row_el.set("r", str(row_num))
                row_map[row_num] = row_el

            formula_text = args.formula.replace("{row}", str(row_num))
            formula_text = formula_text.lstrip("=")
            cell = ET.SubElement(row_map[row_num], _tag("c"))
            cell.set("r", f"{col}{row_num}")
            if data_style is not None:
                cell.set("s", str(data_style))
            f_el = ET.SubElement(cell, _tag("f"))
            f_el.text = formula_text
            changes += 1

        print(f"  {col}{start}:{col}{end} = formulas (style={data_style})")

    # Add total formula
    if args.total_row and args.total_formula:
        if args.total_row not in row_map:
            row_el = ET.SubElement(sheet_data, _tag("row"))
            row_el.set("r", str(args.total_row))
            row_map[args.total_row] = row_el

        total_f = args.total_formula.lstrip("=")
        cell = ET.SubElement(row_map[args.total_row], _tag("c"))
        cell.set("r", f"{col}{args.total_row}")
        if total_style is not None:
            cell.set("s", str(total_style))
        f_el = ET.SubElement(cell, _tag("f"))
        f_el.text = total_f
        changes += 1
        print(f"  {col}{args.total_row} = ={total_f} (style={total_style})")

    # Update dimension
    for dim in root.iter(_tag("dimension")):
        old_ref = dim.get("ref", "")
        if ":" in old_ref:
            start_ref, end_ref = old_ref.split(":")
            end_col_str = re.match(r"([A-Z]+)", end_ref).group(1)
            end_row_str = re.search(r"(\d+)", end_ref).group(1)
            if col_number(col) > col_number(end_col_str):
                new_ref = f"{start_ref}:{col}{end_row_str}"
                dim.set("ref", new_ref)
                print(f"  Dimension: {old_ref} → {new_ref}")

    # Extend <cols> to cover new column
    cols_el = root.find(_tag("cols"))
    if cols_el is not None:
        new_col_num = col_number(col)
        covered = any(
            int(c.get("min", "0")) <= new_col_num <= int(c.get("max", "0"))
            for c in cols_el
        )
        if not covered:
            prev_num = col_number(prev_col)
            for c in cols_el:
                if int(c.get("min", "0")) <= prev_num <= int(c.get("max", "0")):
                    new_col_def = copy.deepcopy(c)
                    new_col_def.set("min", str(new_col_num))
                    new_col_def.set("max", str(new_col_num))
                    cols_el.append(new_col_def)
                    print(f"  Added <col> definition for column {col}")
                    break

    # Apply border to entire row if requested
    if args.border_row:
        _apply_border_to_row(args.work_dir, ws_path, ws_tree, root,
                             row_map, args.border_row, args.border_style,
                             col)

    _write_tree(ws_tree, ws_path)
    print(f"\nDone. {changes} cells added.")
    print(f"\nNext: python3 xlsx_pack.py {args.work_dir} output.xlsx")


if __name__ == "__main__":
    main()

=== FILE: .claude/skills/minimax-xlsx/scripts/xlsx_insert_row.py ===
#!/usr/bin/env python3
# SPDX-License-Identifier: MIT
"""
xlsx_insert_row.py — Insert a new data row into a worksheet in an unpacked xlsx.

Usage examples:
    # Insert "Utilities" row at position 6, copying styles from row 5
    python3 xlsx_insert_row.py /tmp/work/ --at 6 \\
        --sheet "Budget FY2025" \\
        --text A=Utilities \\
        --values B=3000 C=3000 D=3500 E=3500 \\
        --formula 'F=SUM(B{row}:E{row})' \\
        --copy-style-from 5

What it does:
  1. Shifts all rows >= at down by 1 (calls xlsx_shift_rows.py)
  2. Adds text values to sharedStrings.xml
  3. Inserts new row with specified cells (text, numbers, formulas)
  4. Copies cell styles from a reference row
  5. Updates dimension ref

The shift operation automatically expands SUM formulas that span the
insertion point, so total-row formulas are updated without extra work.

IMPORTANT: Run on an UNPACKED directory (from xlsx_unpack.py).
After running, repack with xlsx_pack.py.
"""

import argparse
import os
import re
import subprocess
import sys
import xml.dom.minidom
import xml.etree.ElementTree as ET

NS_SS = "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
NS_REL = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"

ET.register_namespace('', NS_SS)
ET.register_namespace('r', NS_REL)
ET.register_namespace('xdr', 'http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing')
ET.register_namespace('x14', 'http://schemas.microsoft.com/office/spreadsheetml/2009/9/main')
ET.register_namespace('xr2', 'http://schemas.microsoft.com/office/spreadsheetml/2015/revision2')
ET.register_namespace('mc', 'http://schemas.openxmlformats.org/markup-compatibility/2006')


def _tag(local: str) -> str:
    return f"{{{NS_SS}}}{local}"


def _write_tree(tree: ET.ElementTree, path: str) -> None:
    tree.write(path, encoding="unicode", xml_declaration=False)
    with open(path, "r", encoding="utf-8") as fh:
        raw = fh.read()
    try:
        dom = xml.dom.minidom.parseString(raw.encode("utf-8"))
        pretty = dom.toprettyxml(indent="  ", encoding="utf-8").decode("utf-8")
        lines = [line for line in pretty.splitlines() if line.strip()]
        with open(path, "w", encoding="utf-8") as fh:
            fh.write("\n".join(lines) + "\n")
    except Exception:
        pass


def col_number(s: str) -> int:
    n = 0
    for c in s.upper():
        n = n * 26 + (ord(c) - 64)
    return n


def find_ws_path(work_dir: str, sheet_name: str | None) -> str:
    wb_tree = ET.parse(os.path.join(work_dir, "xl", "workbook.xml"))
    rid = None
    for sheet in wb_tree.getroot().iter(_tag("sheet")):
        if sheet_name is None or sheet.get("name") == sheet_name:
            rid = sheet.get(f"{{{NS_REL}}}id")
            break

    if rid is None:
        print(f"ERROR: Sheet not found: {sheet_name}")
        sys.exit(1)

    rels_tree = ET.parse(os.path.join(work_dir, "xl", "_rels", "workbook.xml.rels"))
    for rel in rels_tree.getroot():
        if rel.get("Id") == rid:
            return os.path.join(work_dir, "xl", rel.get("Target"))

    print(f"ERROR: Relationship not found: {rid}")
    sys.exit(1)


def add_shared_string(work_dir: str, text: str) -> int:
    ss_path = os.path.join(work_dir, "xl", "sharedStrings.xml")
    tree = ET.parse(ss_path)
    root = tree.getroot()

    idx = 0
    for si in root.findall(_tag("si")):
        t_el = si.find(_tag("t"))
        if t_el is not None and t_el.text == text:
            return idx
        idx += 1

    si = ET.SubElement(root, _tag("si"))
    t = ET.SubElement(si, _tag("t"))
    t.set("{http://www.w3.org/XML/1998/namespace}space", "preserve")
    t.text = text

    root.set("count", str(int(root.get("count", "0")) + 1))
    root.set("uniqueCount", str(int(root.get("uniqueCount", "0")) + 1))

    _write_tree(tree, ss_path)
    return idx


def get_row_styles(ws_tree: ET.ElementTree, row_num: int) -> dict[str, int]:
    """Get {col_letter: style_index} for all cells in a row."""
    styles = {}
    for row_el in ws_tree.getroot().iter(_tag("row")):
        if row_el.get("r") == str(row_num):
            for c in row_el:
                ref = c.get("r", "")
                col_str = re.match(r"([A-Z]+)", ref)
                if col_str:
                    styles[col_str.group(1)] = int(c.get("s", "0"))
            break
    return styles


def parse_kv(specs: list[str] | None) -> dict[str, str]:
    if not specs:
        return {}
    result = {}
    for spec in specs:
        col, _, val = spec.partition("=")
        result[col.upper()] = val
    return result


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Insert a new row into a worksheet in an unpacked xlsx")
    parser.add_argument("work_dir", help="Unpacked xlsx working directory")
    parser.add_argument("--at", type=int, required=True,
                        help="Row number to insert at (existing rows shift down)")
    parser.add_argument("--sheet", default=None, help="Sheet name (default: first)")
    parser.add_argument("--text", nargs="+", default=None,
                        help="Text cells: COL=VALUE (e.g., A=Utilities)")
    parser.add_argument("--values", nargs="+", default=None,
                        help="Numeric cells: COL=VALUE (e.g., B=3000 C=3000)")
    parser.add_argument("--formula", nargs="+", default=None,
                        help="Formula cells: COL=FORMULA with {row} (e.g., F=SUM(B{row}:E{row}))")
    parser.add_argument("--copy-style-from", type=int, default=None,
                        help="Copy cell styles from this row number")
    args = parser.parse_args()

    at = args.at
    text_cells = parse_kv(args.text)
    num_cells = parse_kv(args.values)
    formula_cells = parse_kv(args.formula)

    # Step 1: Shift rows down using xlsx_shift_rows.py
    script_dir = os.path.dirname(os.path.abspath(__file__))
    shift_script = os.path.join(script_dir, "xlsx_shift_rows.py")

    print(f"Step 1: Shifting rows >= {at} down by 1...")
    result = subprocess.run(
        [sys.executable, shift_script, args.work_dir, "insert", str(at), "1"],
        capture_output=True, text=True,
    )
    if result.returncode != 0:
        print(f"ERROR: shift_rows failed:\n{result.stderr}")
        sys.exit(1)
    print(result.stdout)

    # Step 2: Resolve worksheet path and get reference styles
    ws_path = find_ws_path(args.work_dir, args.sheet)
    ws_tree = ET.parse(ws_path)

    ref_styles = {}
    if args.copy_style_from is not None:
        ref_styles = get_row_styles(ws_tree, args.copy_style_from)
        print(f"Step 2: Copied styles from row {args.copy_style_from}: {ref_styles}")

    # Step 3: Add text values to sharedStrings
    text_indices = {}
    for col, text in text_cells.items():
        text_indices[col] = add_shared_string(args.work_dir, text)
        print(f"  Added shared string: \"{text}\" → index {text_indices[col]}")

    # Step 4: Re-parse worksheet and build new row
    ws_tree = ET.parse(ws_path)
    root = ws_tree.getroot()
    sheet_data = root.find(_tag("sheetData"))

    new_row = ET.Element(_tag("row"))
    new_row.set("r", str(at))

    all_cols = sorted(
        set(list(text_cells) + list(num_cells) + list(formula_cells)),
        key=col_number,
    )

    for col in all_cols:
        cell = ET.SubElement(new_row, _tag("c"))
        cell.set("r", f"{col}{at}")

        if col in ref_styles:
            cell.set("s", str(ref_styles[col]))

        if col in text_cells:
            cell.set("t", "s")
            v = ET.SubElement(cell, _tag("v"))
            v.text = str(text_indices[col])
        elif col in num_cells:
            # Omit t attribute for numbers — "n" is the default per OOXML spec
            v = ET.SubElement(cell, _tag("v"))
            v.text = str(num_cells[col])
        elif col in formula_cells:
            formula_text = formula_cells[col].replace("{row}", str(at)).lstrip("=")
            f_el = ET.SubElement(cell, _tag("f"))
            f_el.text = formula_text
            # Use formula style from reference if available; it may differ
            # from the data style (e.g., black font vs blue font).
            # Look for the formula column's style specifically.
            if col in ref_styles:
                cell.set("s", str(ref_styles[col]))

    # Insert new row at the correct position in sheetData (sorted by row number)
    insert_idx = 0
    for i, row_el in enumerate(list(sheet_data)):
        r = row_el.get("r")
        if r and int(r) > at:
            insert_idx = i
            break
        insert_idx = i + 1

    sheet_data.insert(insert_idx, new_row)

    print(f"\nStep 3: Inserted row {at} with {len(all_cols)} cells:")
    for col in all_cols:
        if col in text_cells:
            print(f"  {col}{at} = \"{text_cells[col]}\" (text)")
        elif col in num_cells:
            print(f"  {col}{at} = {num_cells[col]} (number)")
        elif col in formula_cells:
            ftext = formula_cells[col].replace("{row}", str(at))
            print(f"  {col}{at} = {ftext} (formula)")

    # Step 5: Update dimension
    for dim in root.iter(_tag("dimension")):
        old_ref = dim.get("ref", "")
        if ":" in old_ref:
            start_ref, end_ref = old_ref.split(":")
            end_row = int(re.search(r"(\d+)", end_ref).group(1))
            end_col = re.match(r"([A-Z]+)", end_ref).group(1)
            # Dimension was already shifted by shift_rows, just verify
            max_col = max(col_number(end_col), max(col_number(c) for c in all_cols))
            max_col_letter = end_col if col_number(end_col) >= max_col else col
            new_ref = f"{start_ref}:{max_col_letter}{end_row}"
            if new_ref != old_ref:
                dim.set("ref", new_ref)
                print(f"\n  Dimension: {old_ref} → {new_ref}")

    _write_tree(ws_tree, ws_path)

    print(f"\nDone. Row {at} inserted successfully.")
    print(f"\nNext: python3 xlsx_pack.py {args.work_dir} output.xlsx")


if __name__ == "__main__":
    main()

=== FILE: .claude/skills/minimax-xlsx/scripts/xlsx_pack.py ===
#!/usr/bin/env python3
# SPDX-License-Identifier: MIT
"""
xlsx_pack.py — Pack a working directory back into a valid xlsx file.

Usage:
    python3 xlsx_pack.py <source_dir> <output.xlsx>

Requirements:
    - source_dir must contain [Content_Types].xml at its root
    - All XML files are re-validated for well-formedness before packing

The resulting xlsx is a valid ZIP archive with correct OOXML structure.
"""

import sys
import os
import zipfile
import xml.etree.ElementTree as ET


def validate_xml_files(source_dir: str) -> list[str]:
    """Return list of XML files that fail to parse."""
    bad = []
    for dirpath, _, filenames in os.walk(source_dir):
        for fname in filenames:
            if fname.endswith(".xml") or fname.endswith(".rels"):
                fpath = os.path.join(dirpath, fname)
                try:
                    ET.parse(fpath)
                except ET.ParseError as e:
                    rel = os.path.relpath(fpath, source_dir)
                    bad.append(f"{rel}: {e}")
    return bad


def pack(source_dir: str, xlsx_path: str) -> None:
    if not os.path.isdir(source_dir):
        print(f"ERROR: Directory not found: {source_dir}", file=sys.stderr)
        sys.exit(1)

    content_types = os.path.join(source_dir, "[Content_Types].xml")
    if not os.path.isfile(content_types):
        print(
            f"ERROR: Missing [Content_Types].xml in {source_dir}\n"
            "  This file is required at the root of every valid xlsx package.",
            file=sys.stderr,
        )
        sys.exit(1)

    # Validate XML well-formedness before packing
    print("Validating XML files...")
    bad_files = validate_xml_files(source_dir)
    if bad_files:
        print("ERROR: The following files have XML parse errors:", file=sys.stderr)
        for b in bad_files:
            print(f"  {b}", file=sys.stderr)
        print(
            "\nFix all XML errors before packing. "
            "A malformed xlsx cannot be opened by Excel or LibreOffice.",
            file=sys.stderr,
        )
        sys.exit(1)

    print("✓ All XML files are well-formed")

    # Count files to pack
    file_count = sum(len(files) for _, _, files in os.walk(source_dir))

    with zipfile.ZipFile(xlsx_path, "w", compression=zipfile.ZIP_DEFLATED) as z:
        for dirpath, _, filenames in os.walk(source_dir):
            for fname in filenames:
                fpath = os.path.join(dirpath, fname)
                arcname = os.path.relpath(fpath, source_dir)
                z.write(fpath, arcname)

    size = os.path.getsize(xlsx_path)
    print(f"Packed {file_count} files → '{xlsx_path}' ({size:,} bytes)")
    print("\nNext step: run formula_check.py to validate formulas:")
    print(f"  python3 formula_check.py {xlsx_path}")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: xlsx_pack.py <source_dir> <output.xlsx>")
        sys.exit(1)
    pack(sys.argv[1], sys.argv[2])

=== FILE: .claude/skills/minimax-xlsx/scripts/xlsx_reader.py ===
#!/usr/bin/env python3
# SPDX-License-Identifier: MIT
"""
xlsx_reader.py — Structure discovery and data analysis tool for Excel/CSV files.

Usage:
    python3 xlsx_reader.py <file>                   # full structure report
    python3 xlsx_reader.py <file> --sheet Sales     # analyze one sheet
    python3 xlsx_reader.py <file> --json            # machine-readable output
    python3 xlsx_reader.py <file> --quality         # data quality audit only

Supports: .xlsx, .xlsm, .csv, .tsv
Does NOT modify the source file in any way.

Exit codes:
    0 — success
    1 — file not found / unsupported format / encoding failure
"""

import sys
import json
import argparse
from pathlib import Path


# ---------------------------------------------------------------------------
# Format detection and loading
# ---------------------------------------------------------------------------

def detect_and_load(file_path: str, sheet_name_filter: str | None = None) -> dict:
    """
    Load file into {sheet_name: DataFrame} dict.
    CSV/TSV files are mapped to a single-key dict using the file stem as key.

    Raises ValueError for unsupported formats or encoding failures.
    """
    try:
        import pandas as pd
    except ImportError:
        raise RuntimeError(
            "pandas is not installed. Run: pip install pandas openpyxl"
        )

    path = Path(file_path)
    if not path.exists():
        raise FileNotFoundError(f"File not found: {file_path}")

    suffix = path.suffix.lower()

    if suffix in (".xlsx", ".xlsm"):
        target = sheet_name_filter if sheet_name_filter else None
        result = pd.read_excel(file_path, sheet_name=target)
        # pd.read_excel with sheet_name=None returns dict; with a name, returns DataFrame
        if isinstance(result, dict):
            return result
        else:
            return {sheet_name_filter: result}

    elif suffix in (".csv", ".tsv"):
        sep = "\t" if suffix == ".tsv" else ","
        encodings = ["utf-8-sig", "gbk", "utf-8", "latin-1"]
        last_error = None
        for enc in encodings:
            try:
                import pandas as pd
                df = pd.read_csv(file_path, sep=sep, encoding=enc)
                df._reader_encoding = enc  # attach metadata (non-standard, for reporting)
                return {path.stem: df}
            except (UnicodeDecodeError, Exception) as e:
                last_error = e
                continue
        raise ValueError(
            f"Cannot decode {file_path}. Tried encodings: {encodings}. "
            f"Last error: {last_error}"
        )

    elif suffix == ".xls":
        raise ValueError(
            ".xls is a legacy binary format not supported by this tool. "
            "Please open the file in Excel and save as .xlsx, then retry."
        )

    else:
        raise ValueError(
            f"Unsupported file format: {suffix}. "
            "Supported formats: .xlsx, .xlsm, .csv, .tsv"
        )


# ---------------------------------------------------------------------------
# Structure discovery
# ---------------------------------------------------------------------------

def explore_structure(sheets: dict) -> dict:
    """
    Return a structured dict describing each sheet.
    Keys: sheet_name -> {shape, columns, dtypes, null_counts, preview}
    """
    result = {}
    for sheet_name, df in sheets.items():
        null_counts = df.isnull().sum()
        null_info = {
            col: {"count": int(cnt), "pct": round(cnt / max(len(df), 1) * 100, 1)}
            for col, cnt in null_counts.items()
            if cnt > 0
        }
        result[sheet_name] = {
            "shape": {"rows": df.shape[0], "cols": df.shape[1]},
            "columns": list(df.columns),
            "dtypes": {col: str(dtype) for col, dtype in df.dtypes.items()},
            "null_columns": null_info,
            "preview": df.head(5).to_dict(orient="records"),
        }
    return result


# ---------------------------------------------------------------------------
# Data quality audit
# ---------------------------------------------------------------------------

def audit_quality(sheets: dict) -> dict:
    """
    Return data quality findings per sheet.
    Checks: nulls, duplicates, mixed-type columns, potential year formatting issues.
    """
    import pandas as pd

    findings = {}
    for sheet_name, df in sheets.items():
        sheet_findings = []

        # Null values
        null_counts = df.isnull().sum()
        for col, cnt in null_counts.items():
            if cnt > 0:
                pct = round(cnt / max(len(df), 1) * 100, 1)
                sheet_findings.append({
                    "type": "null_values",
                    "column": col,
                    "count": int(cnt),
                    "pct": pct,
                    "note": f"Column '{col}' has {cnt} null values ({pct}%). "
                            "If this column contains Excel formulas, null values may "
                            "indicate that the formula cache has not been populated "
                            "(file was never opened in Excel after the formulas were written)."
                })

        # Duplicate rows
        dup_count = int(df.duplicated().sum())
        if dup_count > 0:
            sheet_findings.append({
                "type": "duplicate_rows",
                "count": dup_count,
                "note": f"{dup_count} fully duplicate rows found."
            })

        # Mixed-type object columns (numeric data stored as text)
        for col in df.select_dtypes(include="object").columns:
            numeric_converted = pd.to_numeric(df[col], errors="coerce")
            convertible = int(numeric_converted.notna().sum())
            non_null_total = int(df[col].notna().sum())
            if 0 < convertible < non_null_total:
                sheet_findings.append({
                    "type": "mixed_type",
                    "column": col,
                    "convertible_to_numeric": convertible,
                    "non_convertible": non_null_total - convertible,
                    "note": f"Column '{col}' appears to contain mixed types: "
                            f"{convertible} values can be parsed as numbers, "
                            f"{non_null_total - convertible} cannot. "
                            "Use pd.to_numeric(df[col], errors='coerce') to unify."
                })

        # Year column formatting (e.g., 2024.0 stored as float)
        for col in df.select_dtypes(include="number").columns:
            col_lower = str(col).lower()
            # "年" is the Chinese character for "year" — detect year columns in CJK spreadsheets
            if "year" in col_lower or "yr" in col_lower or "年" in col_lower:
                if df[col].dropna().between(1900, 2200).all():
                    if df[col].dtype == float:
                        sheet_findings.append({
                            "type": "year_as_float",
                            "column": col,
                            "note": f"Column '{col}' appears to be a year column stored as float "
                                    "(e.g., 2024.0). Convert with df[col].astype(int).astype(str) "
                                    "to get clean year strings like '2024'."
                        })

        # Outliers via IQR on numeric columns
        for col in df.select_dtypes(include="number").columns:
            series = df[col].dropna()
            if len(series) < 4:
                continue
            Q1, Q3 = series.quantile(0.25), series.quantile(0.75)
            IQR = Q3 - Q1
            if IQR == 0:
                continue
            outlier_mask = (df[col] < Q1 - 1.5 * IQR) | (df[col] > Q3 + 1.5 * IQR)
            outlier_count = int(outlier_mask.sum())
            if outlier_count > 0:
                sheet_findings.append({
                    "type": "outliers_iqr",
                    "column": col,
                    "count": outlier_count,
                    "note": f"Column '{col}' has {outlier_count} potential outlier(s) "
                            f"(outside 1.5×IQR bounds: [{Q1 - 1.5*IQR:.2f}, {Q3 + 1.5*IQR:.2f}])."
                })

        findings[sheet_name] = sheet_findings

    return findings


# ---------------------------------------------------------------------------
# Summary statistics
# ---------------------------------------------------------------------------

def compute_stats(sheets: dict) -> dict:
    """Compute descriptive statistics for numeric columns per sheet."""
    stats = {}
    for sheet_name, df in sheets.items():
        numeric_df = df.select_dtypes(include="number")
        if numeric_df.empty:
            stats[sheet_name] = {}
            continue
        desc = numeric_df.describe().round(4)
        stats[sheet_name] = desc.to_dict()
    return stats


# ---------------------------------------------------------------------------
# Human-readable report rendering
# ---------------------------------------------------------------------------

def render_report(
    file_path: str,
    structure: dict,
    quality: dict,
    stats: dict,
) -> str:
    lines = []
    p = lines.append

    p("=" * 60)
    p(f"ANALYSIS REPORT: {Path(file_path).name}")
    p("=" * 60)

    # File overview
    sheet_list = list(structure.keys())
    total_rows = sum(s["shape"]["rows"] for s in structure.values())
    p(f"\nSheets ({len(sheet_list)}): {', '.join(sheet_list)}")
    p(f"Total rows across all sheets: {total_rows:,}")

    for sheet_name, info in structure.items():
        p(f"\n{'─' * 50}")
        p(f"Sheet: {sheet_name}")
        p(f"{'─' * 50}")
        p(f"  Size: {info['shape']['rows']:,} rows × {info['shape']['cols']} cols")
        p(f"  Columns: {info['columns']}")

        # Data types
        p("\n  Column types:")
        for col, dtype in info["dtypes"].items():
            p(f"    {col}: {dtype}")

        # Nulls
        if info["null_columns"]:
            p("\n  Null values (columns with nulls only):")
            for col, null_info in info["null_columns"].items():
                p(f"    {col}: {null_info['count']} nulls ({null_info['pct']}%)")
        else:
            p("\n  Null values: none")

        # Stats
        sheet_stats = stats.get(sheet_name, {})
        if sheet_stats:
            p("\n  Numeric column statistics:")
            numeric_cols = list(sheet_stats.keys())
            # Show only first 6 to keep report readable
            for col in numeric_cols[:6]:
                col_stats = sheet_stats[col]
                p(f"    {col}:")
                p(f"      count={col_stats.get('count', 'N/A')}  "
                  f"mean={col_stats.get('mean', 'N/A')}  "
                  f"min={col_stats.get('min', 'N/A')}  "
                  f"max={col_stats.get('max', 'N/A')}")
            if len(numeric_cols) > 6:
                p(f"    ... and {len(numeric_cols) - 6} more numeric columns")

        # Quality findings for this sheet
        sheet_quality = quality.get(sheet_name, [])
        if sheet_quality:
            p(f"\n  Data quality issues ({len(sheet_quality)} found):")
            for finding in sheet_quality:
                p(f"    [{finding['type'].upper()}] {finding['note']}")
        else:
            p("\n  Data quality: no issues found")

        # Preview
        if info["preview"]:
            p("\n  Preview (first 3 rows):")
            import pandas as pd
          

=== FILE: .claude/skills/minimax-xlsx/scripts/xlsx_shift_rows.py ===
#!/usr/bin/env python3
# SPDX-License-Identifier: MIT
"""
xlsx_shift_rows.py — Shift all row references in an unpacked xlsx working directory
after inserting or deleting rows.

Usage:
    # Insert 2 rows at row 5 (rows 5+ shift down by 2)
    python3 xlsx_shift_rows.py <work_dir> insert 5 2

    # Delete 1 row at row 8 (rows 9+ shift up by 1)
    python3 xlsx_shift_rows.py <work_dir> delete 8 1

What it updates in every XML file under <work_dir>:
  - <row r="N"> attributes in worksheet sheetData
  - <c r="XN"> cell address attributes in worksheet sheetData
  - <f> formula text: absolute row references (e.g. B7, $B$7, $B7) in all sheets
  - <mergeCell ref="A5:C7"> ranges
  - <conditionalFormatting sqref="..."> ranges
  - <dataValidations sqref="..."> ranges
  - <dimension ref="A1:D20"> extent marker
  - Table <table ref="A1:D20"> in xl/tables/*.xml
  - Chart series <numRef><f> and <strRef><f> range references in xl/charts/*.xml
  - PivotCache source <worksheetSource ref="..."> in xl/pivotCaches/*.xml

IMPORTANT: Run this script on the UNPACKED directory before repacking.
After running, repack with xlsx_pack.py and re-validate with formula_check.py.

Limitations:
  - Named ranges in workbook.xml <definedNames> are NOT updated automatically.
    Review them manually after running this script.
  - Structured table references (Table[@Column]) are NOT updated.
  - External workbook links in xl/externalLinks/ are NOT updated.
"""

import sys
import os
import re
import xml.etree.ElementTree as ET
import xml.dom.minidom


def col_letter(n: int) -> str:
    """Convert 1-based column number to Excel column letter(s)."""
    r = ""
    while n > 0:
        n, rem = divmod(n - 1, 26)
        r = chr(65 + rem) + r
    return r


def col_number(s: str) -> int:
    """Convert Excel column letter(s) to 1-based column number."""
    n = 0
    for c in s.upper():
        n = n * 26 + (ord(c) - 64)
    return n


# ---------------------------------------------------------------------------
# Core shifting logic for formula strings
# ---------------------------------------------------------------------------

def _shift_refs(text: str, at: int, delta: int) -> str:
    """Shift cell references in a non-quoted formula fragment."""
    def replacer(m: re.Match) -> str:
        dollar_col = m.group(1)   # "$" or ""
        col_part = m.group(2)     # e.g. "B" or "AB"
        dollar_row = m.group(3)   # "$" or ""
        row_str = m.group(4)      # e.g. "7"
        row = int(row_str)
        if row >= at:
            row = max(1, row + delta)
        return f"{dollar_col}{col_part}{dollar_row}{row}"

    pattern = r'(\$?)([A-Z]+)(\$?)(\d+)'
    return re.sub(pattern, replacer, text)


def shift_formula(formula: str, at: int, delta: int) -> str:
    """
    Shift absolute and mixed row references >= `at` by `delta` in a formula string.

    Handles:
      B7       (relative col, absolute row — shifts if row >= at)
      $B$7     (absolute col, absolute row — shifts)
      $B7      (absolute col, relative row — shifts)
      B$7      (relative col, absolute — shifts)
      BUT NOT:  B:B  (whole-column reference — left as-is)

    Skips content inside single-quoted sheet name prefixes to avoid
    corrupting names like 'Budget FY2025' (where FY2025 is NOT a cell ref).

    Does NOT handle:
      - Named ranges
      - Structured references (Table[@Col])
      - R1C1 notation
    """
    # Split on quoted sheet names: 'Sheet Name' portions are odd-indexed
    segments = re.split(r"('[^']*(?:''[^']*)*')", formula)
    result = []
    for i, seg in enumerate(segments):
        if i % 2 == 1:
            result.append(seg)
        else:
            result.append(_shift_refs(seg, at, delta))
    return "".join(result)


def shift_sqref(sqref: str, at: int, delta: int) -> str:
    """
    Shift row references in a sqref string (space-separated cell/range addresses).
    E.g. "A5:D20 B30" → shift rows >= 5 by delta.
    """
    parts = sqref.split()
    result = []
    for part in parts:
        if ':' in part:
            left, right = part.split(':', 1)
            left = shift_formula(left, at, delta)
            right = shift_formula(right, at, delta)
            result.append(f"{left}:{right}")
        else:
            result.append(shift_formula(part, at, delta))
    return " ".join(result)


def shift_chart_range(text: str, at: int, delta: int) -> str:
    """
    Shift row references inside a chart range formula like:
      Sheet1!$B$5:$B$20
      'Q1 Data'!$A$3:$A$15
    """
    # Split on the "!" to preserve sheet name
    if '!' not in text:
        return text
    bang = text.index('!')
    sheet_part = text[:bang + 1]
    range_part = text[bang + 1:]
    return sheet_part + shift_formula(range_part, at, delta)


# ---------------------------------------------------------------------------
# XML file processors
# ---------------------------------------------------------------------------

NS_MAIN = "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
NS_DRAWING = "http://schemas.openxmlformats.org/drawingml/2006/chartDrawing"

# Namespace map used by ElementTree for tag lookup
NSMAP = {"ss": NS_MAIN}


def _tag(local: str) -> str:
    return f"{{{NS_MAIN}}}{local}"


def process_worksheet(path: str, at: int, delta: int) -> int:
    """Update row/cell references in a worksheet XML. Returns change count."""
    tree = ET.parse(path)
    root = tree.getroot()
    changes = 0

    # 1. <dimension ref="A1:D20">
    for dim in root.iter(_tag("dimension")):
        old = dim.get("ref", "")
        new = shift_sqref(old, at, delta)
        if new != old:
            dim.set("ref", new)
            changes += 1

    # 2. <row r="N"> and <c r="XN"> inside sheetData
    sheet_data = root.find(_tag("sheetData"))
    if sheet_data is not None:
        rows_to_reorder = []
        for row_el in list(sheet_data):
            r_str = row_el.get("r")
            if r_str is None:
                continue
            r = int(r_str)
            if r >= at:
                new_r = max(1, r + delta)
                row_el.set("r", str(new_r))
                changes += 1
                # Update each cell's r attribute
                for cell_el in row_el:
                    cell_ref = cell_el.get("r", "")
                    if cell_ref:
                        new_ref = shift_formula(cell_ref, at, delta)
                        if new_ref != cell_ref:
                            cell_el.set("r", new_ref)
                            changes += 1

            # Also update formulas in every row (formulas can reference any row)
            for cell_el in row_el:
                f_el = cell_el.find(_tag("f"))
                if f_el is not None and f_el.text:
                    new_f = shift_formula(f_el.text, at, delta)
                    if new_f != f_el.text:
                        f_el.text = new_f
                        changes += 1

    # 3. <mergeCell ref="A5:C7">
    for mc in root.iter(_tag("mergeCell")):
        old = mc.get("ref", "")
        new = shift_sqref(old, at, delta)
        if new != old:
            mc.set("ref", new)
            changes += 1

    # 4. <conditionalFormatting sqref="...">
    for cf in root.iter(_tag("conditionalFormatting")):
        old = cf.get("sqref", "")
        new = shift_sqref(old, at, delta)
        if new != old:
            cf.set("sqref", new)
            changes += 1

    # 5. <dataValidation sqref="...">
    for dv in root.iter(_tag("dataValidation")):
        old = dv.get("sqref", "")
        new = shift_sqref(old, at, delta)
        if new != old:
            dv.set("sqref", new)
            changes += 1

    if changes > 0:
        _write_tree(tree, path)
    return changes


def process_chart(path: str, at: int, delta: int) -> int:
    """Update data range references in a chart XML."""
    # Charts use DrawingML namespace; we look for <f> elements with range strings
    with open(path, "r", encoding="utf-8") as fh:
        content = fh.read()

    # Pattern matches content of <f>Sheet1!$A$1:$A$10</f> style elements
    def replace_f(m: re.Match) -> str:
        tag_open = m.group(1)
        inner = m.group(2)
        tag_close = m.group(3)
        new_inner = shift_chart_range(inner, at, delta)
        return f"{tag_open}{new_inner}{tag_close}"

    new_content = re.sub(r'(<(?:[^:>]+:)?f>)([^<]+)(</(?:[^:>]+:)?f>)',
                          replace_f, content)
    changes = content != new_content
    if changes:
        with open(path, "w", encoding="utf-8") as fh:
            fh.write(new_content)
    return 1 if changes else 0


def process_table(path: str, at: int, delta: int) -> int:
    """Update the ref attribute on the <table> root element."""
    tree = ET.parse(path)
    root = tree.getroot()
    # The root element IS the table
    old = root.get("ref", "")
    if not old:
        return 0
    new = shift_sqref(old, at, delta)
    if new == old:
        return 0
    root.set("ref", new)
    _write_tree(tree, path)
    return 1


def process_pivot_cache(path: str, at: int, delta: int) -> int:
    """Update worksheetSource ref in a pivot cache definition."""
    tree = ET.parse(path)
    root = tree.getroot()
    changes = 0
    # Look for <worksheetSource ref="A1:D100" ...>
    for ws in root.iter():
        if ws.tag.endswith("}worksheetSource") or ws.tag == "worksheetSource":
            old = ws.get("ref", "")
            if old:
                new = shift_sqref(old, at, delta)
                if new != old:
                    ws.set("ref", new)
                    changes += 1
    if changes:
        _write_tree(tree, path)
    return changes


def _write_tree(tree: ET.ElementTree, path: str) -> None:
    """Write ElementTree back to file with pretty-printing."""
    tree.write(path, encoding="unicode", xml_declaration=False)
    # Re-pretty-print for readability
    with open(path, "r", encoding="utf-8") as fh:
        raw = fh.read()
    try:
        dom = xml.dom.minidom.parseString(raw.encode("utf-8"))
        pretty = dom.toprettyxml(indent="  ", encoding="utf-8").decode("utf-8")
        lines = [line for line in pretty.splitlines() if line.strip()]
        with open(path, "w", encoding="utf-8") as fh:
            fh.write("\n".join(lines) + "\n")
    except Exception:
        pass  # If pretty-print fails, leave the file as-is


# ---------------------------------------------------------------------------
# Main driver
# ---------------------------------------------------------------------------

def main() -> None:
    if len(sys.argv) < 5:
        print(__doc__)
        sys.exit(1)

    work_dir = sys.argv[1]
    operation = sys.argv[2].lower()
    at = int(sys.argv[3])
    count = int(sys.argv[4])

    if operation not in ("insert", "delete"):
        print(f"ERROR: operation must be 'insert' or 'delete', got '{operation}'")
        sys.exit(1)

    if operation == "insert":
        delta = count
    else:
        delta = -count

    if not os.path.isdir(work_dir):
        print(f"ERROR: Directory not found: {work_dir}")
        sys.exit(1)

    print(f"Operation : {operation} {count} row(s) at row {at} (delta={delta:+d})")
    print(f"Work dir  : {work_dir}")
    print()

    total_changes = 0

    # Process all worksheets
    ws_dir = os.path.join(work_dir, "xl", "worksheets")
    if os.path.isdir(ws_dir):
        for fname in sorted(os.listdir(ws_dir)):
            if fname.endswith(".xml"):
                fpath = os.path.join(ws_dir, fname)
                n = process_worksheet(fpath, at, delta)
                if n:
                    print(f"  Updated {n:3d} references in xl/worksheets/{fname}")
                    total_changes += n

    # Process all charts
    charts_dir = os.path.join(work_dir, "xl", "charts")
    if os.path.isdir(charts_dir):
        for fname in sorted(os.listdir(charts_dir)):
            if fname.endswith(".xml"):
                fpath = os.path.join(charts_dir, fname)
                n = process_chart(fpath, at, delta)
                if n:
                    print(f"  Updated chart ranges in xl/charts/{fname}")
                    total_changes += n

    # Process all tables
    tables_dir = os.path.join(work_dir, "xl", "tables")
    if os.path.isdir(tables_dir):
        for fname in sorted(os.listdir(tables_dir)):
            if fname.endswith(".xml"):
                fpath = os.path.join(tables_dir, fname)
                n = process_table(fpath, at, delta)
                if n:
                    print(f"  Updated table ref in xl/tables/{fname}")
                    total_changes += n

    # Process pivot cache definitions
    cache_dir = os.path.join(work_dir, "xl", "pivotCaches")
    if os.path.isdir(cache_dir):
        for fname in sorted(os.listdir(cache_dir)):
            if "Definition" in fname and fname.endswith(".xml"):
                fpath = os.path.join(cache_dir, fname)
                n = process_pivot_cache(fpath, at, delta)
                if n:
                    print(f"  Updated pivot source range in xl/pivotCaches/{fname}")
                    total_changes += n

    print()
    print(f"Total changes: {total_changes}")
    print()
    print("IMPORTANT: Review named ranges in xl/workbook.xml <definedNames> manually.")
    print("           Structured table references (Table[@Col]) are NOT updated.")
    print()
    print("Next steps:")
    print("  1. Review the changes above")
    print(f"  2. python3 xlsx_pack.py {work_dir} output.xlsx")
    print("  3. python3 formula_check.py output.xlsx")


if __name__ == "__main__":
    main()

=== FILE: .claude/skills/minimax-xlsx/scripts/xlsx_unpack.py ===
#!/usr/bin/env python3
# SPDX-License-Identifier: MIT
"""
xlsx_unpack.py — Unpack an xlsx file into a working directory for XML editing.

Usage:
    python3 xlsx_unpack.py <input.xlsx> <output_dir>

What it does:
1. Unzips the xlsx (which is a ZIP archive)
2. Pretty-prints all XML and .rels files for readability
3. Prints a summary of key files to edit
"""

import sys
import zipfile
import os
import shutil
import xml.dom.minidom


def pretty_print_xml(content: bytes) -> str:
    """Pretty-print XML bytes. Returns original content on parse failure."""
    try:
        dom = xml.dom.minidom.parseString(content)
        pretty = dom.toprettyxml(indent="  ", encoding="utf-8").decode("utf-8")
        # Remove the extra blank lines toprettyxml adds
        lines = [line for line in pretty.splitlines() if line.strip()]
        return "\n".join(lines) + "\n"
    except Exception:
        return content.decode("utf-8", errors="replace")


def unpack(xlsx_path: str, output_dir: str) -> None:
    if not os.path.isfile(xlsx_path):
        print(f"ERROR: File not found: {xlsx_path}", file=sys.stderr)
        sys.exit(1)

    if not xlsx_path.lower().endswith((".xlsx", ".xlsm")):
        print(f"WARNING: '{xlsx_path}' does not have an .xlsx/.xlsm extension", file=sys.stderr)

    if os.path.exists(output_dir):
        shutil.rmtree(output_dir)
    os.makedirs(output_dir)

    try:
        with zipfile.ZipFile(xlsx_path, "r") as z:
            # Validate member paths to prevent zip-slip (path traversal) attacks
            for member in z.namelist():
                member_path = os.path.realpath(os.path.join(output_dir, member))
                if not member_path.startswith(os.path.realpath(output_dir) + os.sep) and member_path != os.path.realpath(output_dir):
                    print(f"ERROR: Zip entry '{member}' would escape target directory (path traversal blocked)", file=sys.stderr)
                    shutil.rmtree(output_dir, ignore_errors=True)
                    sys.exit(1)
            z.extractall(output_dir)
    except zipfile.BadZipFile:
        shutil.rmtree(output_dir, ignore_errors=True)
        print(f"ERROR: '{xlsx_path}' is not a valid ZIP/xlsx file", file=sys.stderr)
        sys.exit(1)

    # Pretty-print XML and .rels files
    xml_count = 0
    for dirpath, _, filenames in os.walk(output_dir):
        for fname in filenames:
            if fname.endswith(".xml") or fname.endswith(".rels"):
                fpath = os.path.join(dirpath, fname)
                with open(fpath, "rb") as f:
                    raw = f.read()
                pretty = pretty_print_xml(raw)
                with open(fpath, "w", encoding="utf-8") as f:
                    f.write(pretty)
                xml_count += 1

    print(f"Unpacked '{xlsx_path}' → '{output_dir}'")
    print(f"Pretty-printed {xml_count} XML/rels files\n")

    # Print key files grouped by category
    categories = {
        "Package root": ["[Content_Types].xml", "_rels/.rels"],
        "Workbook": ["xl/workbook.xml", "xl/_rels/workbook.xml.rels"],
        "Styles & Strings": ["xl/styles.xml", "xl/sharedStrings.xml"],
        "Worksheets": [],
    }

    all_files = []
    for dirpath, _, filenames in os.walk(output_dir):
        for fname in filenames:
            rel = os.path.relpath(os.path.join(dirpath, fname), output_dir)
            all_files.append(rel)

    # Collect worksheets
    for rel in sorted(all_files):
        if rel.startswith("xl/worksheets/") and rel.endswith(".xml"):
            categories["Worksheets"].append(rel)

    print("Key files to inspect/edit:")
    for category, files in categories.items():
        if not files:
            continue
        print(f"\n  [{category}]")
        for f in files:
            full = os.path.join(output_dir, f)
            if os.path.is

