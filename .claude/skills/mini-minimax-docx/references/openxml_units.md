# OpenXML 单位换算

> OpenXML 单位系统速查

## 常用单位

| 单位 | 全称 | 换算关系 |
|------|------|----------|
| **twip** | twentieth of a point | 1 twip = 1/20 point |
| **EMU** | English Metric Unit | 1 EMU = 1/914400 inch |
| **point** | 磅 | 1 point = 1/72 inch |

## 换算表

### 长度

| 单位 | Twips | EMUs | 实际尺寸 |
|------|-------|------|----------|
| 1 inch | 1440 | 914400 | 2.54 cm |
| 1 cm | 567 | 360000 | 10 mm |
| 1 mm | 56.7 | 36000 | - |
| 1 point | 20 | - | 0.3528 mm |

### 字号

| 字号 | Points | Twips (w:sz) | 用途 |
|------|--------|--------------|------|
| 五号 | 10.5 | 21 | 脚注 |
| 小四 | 12 | 24 | 标准正文 |
| 四号 | 14 | 28 | 公文正文 |
| 小三 | 15 | 30 | 小标题 |
| 三号 | 16 | 32 | 四级标题 |
| 小二 | 18 | 36 | 三级标题 |
| 二号 | 22 | 44 | 二级标题 |
| 小一 | 24 | 48 | 一级标题 |
| 一号 | 26 | 52 | 章节标题 |

### 行距

| 行距类型 | Line 值 | LineRule |
|---------|---------|----------|
| 单倍 | 240 | Auto |
| 1.5 倍 | 360 | Auto |
| 2 倍 | 480 | Auto |
| 固定 12pt | 240 | Exact |
| 固定 20pt | 400 | Exact |
| 最小 12pt | 240 | AtLeast |

### 页面尺寸

| 纸张 | 宽度 (twips) | 高度 (twips) |
|------|-------------|-------------|
| A4 | 11906 | 16838 |
| Letter | 12240 | 15840 |
| A3 | 16838 | 23811 |
| A5 | 8391 | 11906 |

### 页边距

| 边距类型 | 数值 (twips) |
|---------|-------------|
| 标准 1" | 1440 |
| 窄 0.5" | 720 |
| 宽 1.5" | 2160 |
| 公文上 3.7cm | 2268 |
| 公文下 3.5cm | 1984 |
| 公文左 2.8cm | 1588 |
| 公文右 2.6cm | 1474 |

## C# 代码示例

```csharp
// 字体大小：12pt = 24
new FontSize { Val = "24" }

// 页面大小：A4
new PageSize { Width = 11906, Height = 16838 }

// 页边距：1 inch
new PageMargin { Top = 1440, Bottom = 1440, Left = 1440, Right = 1440 }

// 行距：1.5倍
new SpacingBetweenLines { Line = "360", LineRule = LineSpacingRule.Auto }

// 段前间距：6pt = 120
new SpacingBetweenLines { Before = "120", After = "120" }

// 表格宽度：4000 twips
new TableWidth { Type = TableWidthUnitValues.Dxa, Width = "4000" }

// 单元格边距：上下 100, 左右 150
new TableCellMargin(
    new TopMargin { Width = "100", Type = TableWidthUnitValues.Dxa },
    new BottomMargin { Width = "100", Type = TableWidthUnitValues.Dxa },
    new LeftMargin { Width = "150", Type = TableWidthUnitValues.Dxa },
    new RightMargin { Width = "150", Type = TableWidthUnitValues.Dxa }
)

// 边框宽度：1pt = 4 (eighths of a point)
new TopBorder { Val = BorderValues.Single, Size = 4 }
new TopBorder { Val = BorderValues.Single, Size = 8 }  // 2pt
```

## 快速计算公式

```
Twips = Points × 20
Twips = Inches × 1440
Twips = CM × 567
Twips = MM × 56.7

EMU = Inches × 914400
EMU = CM × 360000
EMU = MM × 36000

BorderSize (eighths) = Points × 8
```

---

*1 twip = 1/1440 inch ≈ 0.0176 mm*
