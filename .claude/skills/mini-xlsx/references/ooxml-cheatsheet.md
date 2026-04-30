# OOXML SpreadsheetML Cheat Sheet

Quick reference for XML manipulation of xlsx files.

---

## Package Structure

```
my_file.xlsx  (ZIP archive)
├── [Content_Types].xml          ← declares MIME types for all files
├── _rels/
│   └── .rels                    ← root relationship: points to xl/workbook.xml
└── xl/
    ├── workbook.xml             ← sheet list, calc settings
    ├── styles.xml               ← ALL style definitions
    ├── sharedStrings.xml        ← ALL text strings (referenced by index)
    ├── _rels/
    │   └── workbook.xml.rels    ← maps r:id → worksheet/styles/sharedStrings files
    ├── worksheets/
    │   ├── sheet1.xml           ← Sheet 1 data
    │   ├── sheet2.xml           ← Sheet 2 data
    │   └── ...
    ├── charts/                  ← chart XML (if any)
    ├── pivotTables/             ← pivot table XML (if any)
    └── theme/
        └── theme1.xml           ← color/font theme
```

---

## Cell Reference Format

```
A1  → column A (1), row 1
B5  → column B (2), row 5
AA1 → column 27, row 1
```

Column letter ↔ number conversion:
```python
def col_letter(n):  # 1-based → letter
    r = ""
    while n > 0:
        n, rem = divmod(n - 1, 26)
        r = chr(65 + rem) + r
    return r

def col_number(s):  # letter → 1-based
    n = 0
    for c in s.upper():
        n = n * 26 + (ord(c) - 64)
    return n
```

---

## Cell XML Reference

### Data Types

| Type | `t` attr | XML Example | Value |
|------|---------|-------------|-------|
| Number | omit | `<c r="B2"><v>1000</v></c>` | 1000 |
| String (shared) | `s` | `<c r="A1" t="s"><v>0</v></c>` | sharedStrings[0] |
| String (inline) | `inlineStr` | `<c r="A1" t="inlineStr"><is><t>Hi</t></is></c>` | "Hi" |
| Boolean | `b` | `<c r="D1" t="b"><v>1</v></c>` | TRUE |
| Error | `e` | `<c r="E1" t="e"><v>#REF!</v></c>` | #REF! |
| Formula | omit | `<c r="B4"><f>SUM(B2:B3)</f><v></v></c>` | computed |

### Formula Types

```xml
<!-- Basic formula (no leading = in XML!) -->
<c r="B4"><f>SUM(B2:B3)</f><v></v></c>

<!-- Cross-sheet -->
<c r="C1"><f>Assumptions!B5</f><v></v></c>
<c r="C1"><f>'Sheet With Spaces'!B5</f><v></v></c>

<!-- Shared formula: D2:D100 all use B*C with relative row offset -->
<c r="D2"><f t="shared" ref="D2:D100" si="0">B2*C2</f><v></v></c>
<c r="D3"><f t="shared" si="0"/><v></v></c>

<!-- Array formula -->
<c r="E1"><f t="array" ref="E1:E5">SORT(A1:A5)</f><v></v></c>
```

---

## styles.xml Reference

### Indirect Reference Chain

```
Cell s="3"
  ↓
cellXfs[3] → fontId="2", fillId="0", borderId="0", numFmtId="165"
  ↓              ↓             ↓            ↓              ↓
fonts[2]      fills[0]    borders[0]    numFmts: id=165
blue color    no fill      no border    "0.0%"
```

### Adding a New Style (step-by-step)

1. In `<numFmts>`: add `<numFmt numFmtId="168" formatCode="0.00%"/>`, update `count`
2. In `<fonts>`: add font entry, note its index
3. In `<cellXfs>`: append `<xf numFmtId="168" fontId="N" .../>`, update `count`
4. New style index = old `cellXfs count` value (before incrementing)
5. Apply to cells: `<c r="B5" s="NEW_INDEX">...</c>`

### Color Format

`AARRGGBB` �