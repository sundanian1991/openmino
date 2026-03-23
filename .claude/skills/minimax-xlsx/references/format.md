# Financial Formatting & Output Standards — Complete Agent Guide

> This document is the complete reference manual for the agent when applying professional financial formatting to xlsx files. All operations target direct XML surgery on `xl/styles.xml` without using openpyxl. Every operational step provides ready-to-use XML snippets.

---

## 1. When to Use This Path

This document (FORMAT path) applies to the following two scenarios:

**Scenario A — Dedicated Formatting of an Existing File**
The user provides an existing xlsx file and requests that financial modeling formatting standards be applied or unified. The starting point is to unpack the file, audit the existing `styles.xml`, then append missing styles and batch-update cell `s` attributes. No cell values or formulas are modified.

**Scenario B — Applying Format Standards After CREATE/EDIT**
After completing data entry or formula writing, formatting is applied as the final step. At this point, `styles.xml` may come from the minimal_xlsx template (which pre-defines 13 style slots) or from a user file. In either case, follow the principle of "append only, never modify existing xf entries."

**Not applicable**: Reading or analyzing file contents only (use the READ path); modifying formulas or data (use the EDIT path).

---

## 2. Financial Format Semantic System

### 2.1 Font Color = Cell Role (Color = Role)

The primary convention of financial modeling: **font color encodes the cell's role, not decoration**. A reviewer can glance at colors to determine which cells are adjustable parameters and which are model-calculated results. This is an industry-wide convention (followed by investment banks, the Big Four, and corporate finance teams).

| Role | Font Color | AARRGGBB | Use Case |
|------|-----------|----------|----------|
| Hard-coded input / assumption | Blue | `000000FF` | Growth rates, discount rates, tax rates, and other user-modifiable parameters |
| Formula / calculated result | Black | `00000000` | All cells containing a `<f>` element |
| Same-workbook cross-sheet reference | Green | `00008000` | Cells whose formula starts with `SheetName!` |
| External file link | Red | `00FF0000` | Cells whose formula contains `[FileName.xlsx]` (flagged as fragile links) |
| Label / text | Black (default) | theme color | Row labels, category headings |
| Key assumption requiring review | Blue font + yellow fill | Font `000000FF` / Fill `00FFFF00` | Provisional values, parameters pending confirmation |

**Decision tree**:
```
Does the cell contain a <f> element?
  +-- Yes -> Does the formula start with [FileName]?
  |           +-- Yes -> Red (external link)
  |           +-- No  -> Does the formula contain SheetName!?
  |                       +-- Yes -> Green (cross-sheet reference)
  |                       +-- No  -> Black (same-sheet formula)
  +-- No  -> Is the value a user-adjustable parameter?
              +-- Yes -> Blue (input/assumption)
              +-- No  -> Black default (label)
```

**Strictly prohibited**: Blue font + `<f>` element coexisting (color role contradiction — must be corrected).

### 2.2 Number Format Matrix

| Data Type | formatCode | numFmtId | Display Example | Applicable Scenario |
|-----------|-----------|----------|-----------------|---------------------|
| Standard currency (whole dollars) | `$#,##0;($#,##0);"-"` | 164 | $1,234 / ($1,234) / - | P&L, balance sheet amount rows |
| Standard currency (with cents) | `$#,##0.00;($#,##0.00);"-"` | 169 | $1,234.56 / ($1,234.56) / - | Unit prices, detailed costs |
| Thousands (K) | `#,##0,"K"` | 171 | 1,234K | Simplified display for management reports |
| Millions (M) | `#,##0,,"M"` | 172 | 1M | Macro-level summary rows |
| Percentage (1 decimal) | `0.0%` | 165 | 12.5% | Growth rates, gross margins |
| Percentage (2 decimals) | `0.00%` | 170 | 12.50% | IRR, precise interest rates |
| Multiple / valuation multiplier | `0.0x` | 166 | 8.5x | EV/EBITDA, P/E |
| Integer (thousands separator) | `#,##0` | 167 | 12,345 | Employee count, unit quantities |
| Year | `0` | 1 (built-in, no declaration needed) | 2024 | Column header years, prevents 2,024 |
| Date | `m/d/yyyy` | 14 (built-in, no declaration needed) | 3/21/2026 | Timelines |
| General text | General | 0 (built-in, no declaration needed) | — | Label rows, cells with no format requirement |

numFmtId 169–172 are custom formats that need to be appended beyond the 4 formats (164–167) pre-defined in the minimal_xlsx template. When appending, assign IDs according to the rules (see Section 3.4).

**Built-in format IDs do not need to be declared in `<numFmts>`** (IDs 0–163 are built into Excel/LibreOffice; simply reference the numFmtId in `<xf>`):

| numFmtId | formatCode | Description |
|----------|-----------|-------------|
| 0 | General | General format |
| 1 | `0` | Integer, no thousands separator (use this ID for years) |
| 3 | `#,##0` | Thousands-separated integer (no decimals) |
| 9 | `0%` | Percentage integer |
| 10 | `0.00%` | Percentage with two decimals |
| 14 | `m/d/yyyy` | Short date |

### 2.3 Negative Number Display Standards

Financial reports have two mainstream conventions for negative numbers — choose one and **maintain consistency** throughout the entire workbook:

**Parenthetical style (investment banking standard, recommended for external deliverables)**

```
Positive: $1,234    Negative: ($1,234)    Zero: -
formatCode: $#,##0;($#,##0);"-"
```

**Red minus sign style (suitable for internal operational analysis reports)**

```
Positive: $1,234    Negative: -$1,234 (red)
formatCode: $#,##0;[Red]-$#,##0;"-"
```

Rule: Once a style is determined, maintain it across the entire workbook. Do not mix two negative number display styles within the same workbook.

### 2.4 Zero Value Display Standards

In financial models, "0" and "no data" have different semantics and should be visually distinct:

| Scenario | Recommended Display | formatCode Third Segment |
|----------|-------------------|--------------------------|
| Sparse matrix (most rows have zero-value periods) | Dash `-` | `"-"` |
| Quantity counts (zero itself is meaningful) | `0` | `0` or omit |
| Placeholder row (explicitly empty) | Leave blank | Do not write to cell |

Four-segment format syntax: `positive format;negative format;zero value format;text format`

Zero as dash: `$#,##0;($#,##0);"-"`
Zero preserved as 0: `#,##0;(#,##0);0`

---

## 3. styles.xml Surgical Operations

### 3.1 Auditing Existing Styles: Understanding the cellXfs Indirect Reference Chain

A cell's `s` attribute points to a position index (0-based) in `cellXfs`, and each `<xf>` entry in `cellXfs` references its respective definition libraries through `fontId`, `fillId`, `borderId`, and `numFmtId`.

Reference chain diagram:

```
Cell <c s="6">
    | Look up cellXfs by 0-based index
cellXfs[6] -> numFmtId="164" fontId="2" fillId="0" borderId="0"
    |            |               |          |
numFmts         fonts[2]      fills[0]   borders[0]
id=164          color=00000000  (no fill)  (no border)
$#,##0...       black
```

Audit steps:

**Step 1**: Read `<numFmts>` and record all declared custom formats and their IDs:
```xml
<numFmts count="4">
  <numFmt numFmtId="164" formatCode="$#,##0;($#,##0);&quot;-&quot;"/>
  <numFmt numFmtId="165" formatCode="0.0%"/>
  <numFmt numFmtId="166" formatCode="0.0x"/>
  <numFmt numFmtId="167" formatCode="#,##0"/>
</numFmts>
```
Record: current maximum custom numFmtId = 167, next available ID = 168.

**Step 2**: Read `<fonts>` and list each `<font>` by 0-based index with its color and style:
```
fontId=0 -> No explicit color (theme default black)
fontId=1 -> color rgb="000000FF" (blue, input role)
fontId=2 -> color rgb="00000000" (black, formula role)
fontId=3 -> color rgb="00008000" (green, cross-sheet reference role)
fontId=4 -> <b/> + color rgb="00000000" (bold black, header)
```

**Step 3**: Read `<fills>` and confirm that fills[0] and fills[1] are spec-mandated reserved entries (never delete):
```
fillId=0 -> patternType="none" (spec-mandated)
fillId=1 -> patternType="gray125" (spec-mandated)
fillId=2 -> Yellow highlight (if present)
```

**Step 4**: Read `<cellXfs>` and list each `<xf>` entry by 0-based index with its combination:
```
index 0 -> numFmtId=0,   fontId=0, fillId=0 -> Default style
index 1 -> numFmtId=0,   fontId=1, fillId=0 -> Blue font general (input)
index 5 -> numFmtId=164, fontId=1, fillId=0 -> Blue font currency (currency input)
index 6 -> numFmtId=164, fontId=2, fillId=0 -> Black font currency (currency formula)
...
```

**Step 5**: Verify that all count attributes match the actual number of elements (count mismatches will cause Excel to refuse to open the file).

### 3.2 Safely Appending New Styles (Golden Rule: Append Only, Never Modify Existing xf)

**Never modify existing `<xf>` entries**. Modifications will affect all cells that already reference that index, breaking existing formatting. Only append new entries at the end.

Complete atomic operation sequence for appending new styles (all 5 steps must be executed):

**Step 1**: Determine if a new `<numFmt>` is needed

Built-in formats (ID 0–163) skip this step. Custom formats are appended to the end of `<numFmts>`:
```xml
<numFmts count="5">  <!-- count +1 -->
  <!-- Keep existing entries unchanged -->
  <numFmt numFmtId="164" formatCode="$#,##0;($#,##0);&quot;-&quot;"/>
  <numFmt numFmtId="165" formatCode="0.0%"/>
  <numFmt numFmtId="166" formatCode="0.0x"/>
  <numFmt numFmtId="167" formatCode="#,##0"/>
  <!-- Newly appended -->
  <numFmt numFmtId="168" formatCode="$#,##0.00;($#,##0.00);&quot;-&quot;"/>
</numFmts>
```

**Step 2**: Determine if a new `<font>` is needed

Check whether the existing fonts already contain a matching color+style combination. If not, append to the end of `<fonts>`:
```xml
<fonts count="6">  <!-- count +1 -->
  <!-- Keep existing entries unchanged -->
  ...
  <!-- Newly appended: red font (external link role), new fontId = 5 -->
  <font>
    <sz val="11"/>
    <name val="Calibri"/>
    <color rgb="00FF0000"/>
  </font>
</fonts>
```
New fontId = the count value before appending (when original count=5, new fontId=5).

**Step 3**: Determine if a new `<fill>` is needed

If a new background color is needed, append to the end of `<fills>` (note: fills[0] and fills[1] must never be modified):
```xml
<fills count="4">  <!-- count +1 -->
  <fill><patternFill patternType="none"/></fill>       <!-- 0: spec-mandated -->
  <fill><patternFill patternType="gray125"/></fill>    <!-- 1: spec-mandated -->
  <fill>                                               <!-- 2: yellow highlight -->
    <patternFill patternType="solid">
      <fgColor rgb="00FFFF00"/>
      <bgColor indexed="64"/>
    </patternFill>
  </fill>
  <!-- Newly appended: light gray fill (projection period distinction), new fillId = 3 -->
  <fill>
    <patternFill patternType="solid">
      <fgColor rgb="00D3D3D3"/>
      <bgColor indexed="64"/>
    </patternFill>
  </fill>
</fills>
```

**Step 4**: Append a new `<xf>` combination at the end of `<cellXfs>`
```xml
<cellXfs count="14">  <!-- count +1 -->
  <!-- Keep existing entries 0-12 unchanged -->
  ...
  <!-- Newly appended index=13: currency with cents formula (black font + numFmtId=168) -->
  <xf numFmtId="168" fontId="2" fillId="0" borderId="0" xfId="0"
      applyFont="1" applyNumberFormat="1"/>
</cellXfs>
```
New style index = the count value before appending (when original count=13, new index=13).

**Step 5**: Record the new style index; subsequently set the `s` attribute of corresponding cells in the sheet XML to this value.

### 3.3 AARRGGBB Color Format Explanation

OOXML's `rgb` attribute uses **8-digit hexadecimal AARRGGBB** format (not HTML's 6-digit RRGGBB):

```
AA  RR  GG  BB
|   |   |   |
Alpha Red Green Blue
```

- Alpha channel: `00` = fully opaque (normal use value); `FF` = fully transparent (invisible, never use this)
- Financial color standards always use `00` as the Alpha prefix

| Color | AARRGGBB | Corresponding Role |
|-------|----------|-------------------|
| Blue (input) | `000000FF` | Hard-coded assumptions |
| Black (formula) | `00000000` | Calculated results |
| Green (cross-sheet reference) | `00008000` | Same-workbook cross-sheet |
| Red (external link) | `00FF0000` | References to other files |
| Yellow (review-required fill) | `00FFFF00` | Key assumption highlight |
| Light gray (projection period fill) | `00D3D3D3` | Distinguishing historical vs. forecast periods |
| White | `00FFFFFF` | Pure white fill |

**Common mistake**: Mistakenly writing HTML format `#0000FF` as `FF0000FF` (Alpha=FF makes the color fully transparent and invisible). Correct format: `000000FF`.

### 3.4 numFmtId Assignment Rules

```
ID 0-163    -> Exc