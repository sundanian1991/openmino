# Scenario A: Create from Scratch

> Pipeline A — 从零创建 DOCX 文档

## 决策流程

```
1. 确定文档类型 → 读取 typography_guide.md
2. 选择美学配方 → 读取 design_principles.md
3. 选择实现路径 → CLI (简单) 或 C# (复杂)
4. 执行创建 → 运行验证
```

## 文档类型选择

| 类型 | 特点 | 推荐配方 |
|------|------|----------|
| 报告 Report | 章节结构、封面、页眉页脚 | ModernCorporate |
| 信函 Letter | 简洁、签名块 | MinimalModern |
| 备忘录 Memo | 内部流通、紧凑 | MinimalModern |
| 学术论文 Academic | 引用、摘要、严格格式 | IEEE/ACM/APA |
| 公文 Government | GB/T 9704 标准 | ChineseGovernment |

## CLI 快速创建

```bash
# 基础报告
$CLI create --type report --output report.docx \
  --title "季度报告" --author "张三" \
  --page-size a4 --margins standard \
  --header --footer --page-numbers

# 使用 JSON 内容
$CLI create --type report --output report.docx \
  --config content.json
```

## C# 创建模式

### 1. 文档结构

```csharp
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

using var doc = WordprocessingDocument.Create("output.docx",
    WordprocessingDocumentType.Document);
var mainPart = doc.AddMainDocumentPart();
mainPart.Document = new Document(new Body());

// 添加内容
var body = mainPart.Document.Body;
body.Append(new Paragraph(
    new Run(new Text("Hello World"))
));

// 必须：添加 section properties
body.Append(new SectionProperties(
    new PageSize { Width = 12240, Height = 15840 },  // Letter
    new PageMargin { Top = 1440, Right = 1440, Bottom = 1440, Left = 1440 }
));

doc.Save();
```

### 2. 样式定义

```csharp
// 添加样式部分
var stylesPart = mainPart.AddNewPart<StyleDefinitionsPart>();
var styles = new Styles();

// Normal 样式
var normalStyle = new Style(
    new StyleName { Val = "Normal" },
    new StyleParagraphProperties(
        new SpacingBetweenLines { Line = "360", LineRule = LineSpacingRule.Auto }
    ),
    new StyleRunProperties(
        new RunFonts { Ascii = "Arial", HighAnsi = "Arial", EastAsia = "SimSun" },
        new FontSize { Val = "24" }  // 12pt
    )
) { Type = StyleValues.Paragraph, Default = OnOffValue.FromBoolean(true) };
styles.Append(normalStyle);

// Heading1 样式（必须包含 OutlineLevel）
var h1Style = new Style(
    new StyleName { Val = "Heading 1" },
    new BasedOn { Val = "Normal" },
    new StyleParagraphProperties(
        new OutlineLevel { Val = 0 },  // 必须！
        new SpacingBetweenLines { Before = "240", After = "120" }
    ),
    new StyleRunProperties(
        new Bold(),
        new FontSize { Val = "32" }  // 16pt
    )
) { Type = StyleValues.Paragraph, StyleId = "Heading1" };
styles.Append(h1Style);

stylesPart.Styles = styles;
```

### 3. 表格创建

```csharp
var table = new Table();

// 表格属性
var tblProp = new TableProperties(
    new TableWidth { Type = TableWidthUnitValues.Auto },
    new TableBorders(
        new TopBorder { Val = BorderValues.Single, Size = 4 },
        new BottomBorder { Val = BorderValues.Single, Size = 4 },
        new LeftBorder { Val = BorderValues.Single, Size = 4 },
        new RightBorder { Val = BorderValues.Single, Size = 4 }
    )
);
table.Append(tblProp);

// 表格网格
table.Append(new TableGrid(
    new GridColumn { Width = "4000" },
    new GridColumn { Width = "4000" }
));

// 行和单元格
var row = new TableRow();
var cell1 = new TableCell(
    new TableCellProperties(
        new TableCellWidth { Type = TableWidthUnitValues.Dxa, Width = "4000" }
    ),
    new Paragraph(new Run(new Text("Cell 1")))
);
var cell2 = new TableCell(
    new TableCellProperties(
        new TableCellWidth { Type = TableWidthUnitValues.Dxa, Width = "4000" }
    ),
    new Paragraph(new Run(new Text("Cell 2")))
);
row.Append(cell1, cell2);
table.Append(row);

body.Append(table);
```

### 4. 页眉页脚

```csharp
// 添加页眉部分
var headerPart = mainPart.AddNewPart<HeaderPart>();
var header = new Header();
header.Append(new Paragraph(
    new ParagraphProperties(
        new ParagraphBorders(
            new BottomBorder { Val = BorderValues.Single, Size = 4 }
        )
    ),
    new Run(
        new RunProperties(new FontSize { Val = "20" }),
        new Text("文档标题")
    )
));
headerPart.Header = header;

// 添加页脚（页码）
var footerPart = mainPart.AddNewPart<FooterPart>();
var footer = new Footer();
var footerPara = new Paragraph(
    new ParagraphProperties(new Justification { Val = JustificationValues.Center })
);

// PAGE 字段
footerPara.Append(
    new Run(new Text("Page ")),
    new Run(new FieldChar { FieldCharType = FieldCharValues.Begin }),
    new Run(new FieldCode("PAGE")),
    new Run(new FieldChar { FieldCharType = FieldCharValues.End }),
    new Run(new Text(" of ")),
    new Run(new FieldChar { FieldCharType = FieldCharValues.Begin }),
    new Run(new FieldCode("NUMPAGES")),
    new Run(new FieldChar { FieldCharType = FieldCharValues.End })
);
footer.Append(footerPara);
footerPart.Footer = footer;

// 关联到 section
var sectPr = body.Elements<SectionProperties>().First();
sectPr.Prepend(new HeaderReference { Id = mainPart.GetIdOfPart(headerPart), Type = HeaderFooterValues.Default });
sectPr.Prepend(new FooterReference { Id = mainPart.GetIdOfPart(footerPart), Type = HeaderFooterValues.Default });
```

## CJK 中文特别处理

```csharp
// 中文字体设置（必须设置三个属性）
new RunFonts {
    Ascii = "SimSun",      // 西文字体
    HighAnsi = "SimSun",   // 高位 ASCII
    EastAsia = "SimSun"    // 东亚字体（中文）
}

// 常见中文字体映射
// 宋体 → SimSun
// 黑体 → SimHei
// 微软雅黑 → Microsoft YaHei
// 楷体 → KaiTi
```

## 验证清单

- [ ] 文档可以正常打开
- [ ] 样式应用正确
- [ ] 标题有 OutlineLevel
- [ ] 表格边框正常
- [ ] 页眉页脚显示正确
- [ ] 中文字体正确显示

---

*完整示例见 Samples/DocumentCreationSamples.cs*
