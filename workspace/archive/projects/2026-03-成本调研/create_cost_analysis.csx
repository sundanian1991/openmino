#r "nuget: DocumentFormat.OpenXml, 3.2.0"

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

string outputPath = "/Users/sundanian/Documents/projects/ai-agents/my-agent/小号开卡成本分析.docx";

using var doc = WordprocessingDocument.Create(outputPath, WordprocessingDocumentType.Document);
var mainPart = doc.AddMainDocumentPart();
mainPart.Document = new Document(new Body());
var body = mainPart.Document.Body;

// Title
body.Append(new Paragraph(
    new ParagraphProperties(
        new Justification { Val = JustificationValues.Center },
        new SpacingBetweenLines { After = 400 }
    ),
    new Run(
        new RunProperties(
            new Bold(),
            new FontSize { Val = "36" }
        ),
        new Text("小号开卡方式成本分析")
    )
));

// Subtitle
body.Append(new Paragraph(
    new ParagraphProperties(
        new Justification { Val = JustificationValues.Center },
        new SpacingBetweenLines { After = 600 }
    ),
    new Run(
        new RunProperties(new FontSize { Val = "24" }),
        new Text("基于200元套餐的实际成本测算")
    )
));

// Section 1: Basic Info
body.Append(CreateHeading("一、方案基本信息"));

body.Append(CreateParagraph("1. 套餐规格：200元/月，含2000分钟通话时长"));
body.Append(CreateParagraph("2. 开卡费用：100元/卡（一次性）"));
body.Append(CreateParagraph("3. 人员配置：每人2张卡（实体卡+虚拟卡）"));
body.Append(CreateParagraph("4. 日均通话：50-60分钟（实体卡占比80%，虚拟卡占比20%）"));

body.Append(new Paragraph(new ParagraphProperties(new SpacingBetweenLines { After = 300 })));

// Section 2: Calculation
body.Append(CreateHeading("二、成本计算过程"));

body.Append(CreateBoldParagraph("1. 名义单价计算："));
body.Append(CreateParagraph("   200元 ÷ 2000分钟 = 0.10元/分钟"));

body.Append(CreateBoldParagraph("2. 实际使用情况（按日均55分钟计算）："));
body.Append(CreateParagraph("   月通话时长：55分钟 × 30天 = 1650分钟"));
body.Append(CreateParagraph("   - 实体卡：1650 × 80% = 1320分钟"));
body.Append(CreateParagraph("   - 虚拟卡：1650 × 20% = 330分钟"));

body.Append(CreateBoldParagraph("3. 月度成本构成："));
body.Append(CreateParagraph("   套餐费：200元 × 2卡 = 400元/月"));
body.Append(CreateParagraph("   开卡费分摊：100元 × 2卡 ÷ 6个月 = 33元/月"));
body.Append(CreateParagraph("   月度总成本：400 + 33 = 433元/月"));

body.Append(CreateBoldParagraph("4. 实际每分钟成本："));
body.Append(CreateParagraph("   433元 ÷ 1650分钟 = 0.26元/分钟"));

body.Append(new Paragraph(new ParagraphProperties(new SpacingBetweenLines { After = 300 })));

// Section 3: Comparison Table
body.Append(CreateHeading("三、成本对比汇总"));

var table = new Table();
var tblProp = new TableProperties(
    new TableBorders(
        new TopBorder { Val = BorderValues.Single, Size = 4 },
        new BottomBorder { Val = BorderValues.Single, Size = 4 },
        new LeftBorder { Val = BorderValues.Single, Size = 4 },
        new RightBorder { Val = BorderValues.Single, Size = 4 },
        new InsideHorizontalBorder { Val = BorderValues.Single, Size = 4 },
        new InsideVerticalBorder { Val = BorderValues.Single, Size = 4 }
    ),
    new TableWidth { Type = TableWidthUnitValues.Pct, Width = "5000" }
);
table.AppendChild(tblProp);

// Header row
table.Append(CreateTableRow(new[] { "项目", "数值" }, true));
table.Append(CreateTableRow(new[] { "名义单价", "0.10元/分钟" }, false));
table.Append(CreateTableRow(new[] { "实际单价", "0.26元/分钟" }, false));
table.Append(CreateTableRow(new[] { "成本倍率", "2.6倍" }, false));
table.Append(CreateTableRow(new[] { "月度总成本", "433元/人" }, false));
table.Append(CreateTableRow(new[] { "月通话时长", "1650分钟" }, false));
table.Append(CreateTableRow(new[] { "套餐利用率", "41%" }, false));

body.Append(table);

body.Append(new Paragraph(new ParagraphProperties(new SpacingBetweenLines { After = 300 })));

// Section 4: Risk Analysis
body.Append(CreateHeading("四、风险说明"));

body.Append(CreateBoldParagraph("1. 实体卡限制："));
body.Append(CreateParagraph("   - 单人名下最多5张卡"));
body.Append(CreateParagraph("   - 跨省使用政策存在地区差异"));

body.Append(CreateBoldParagraph("2. 虚拟卡风险："));
body.Append(CreateParagraph("   - 投诉罚款：1500元/次"));
body.Append(CreateParagraph("   - 30张卡可免除1次投诉处罚"));

body.Append(CreateBoldParagraph("3. 标记风险："));
body.Append(CreateParagraph("   - 号码被标记后提供消除途径"));
body.Append(CreateParagraph("   - 需关注标记频率对业务的影响"));

body.Append(new Paragraph(new ParagraphProperties(new SpacingBetweenLines { After = 300 })));

// Section 5: Conclusion
body.Append(CreateHeading("五、核心结论"));

body.Append(CreateParagraph("1. 实际成本（0.26元/分钟）是名义单价（0.10元/分钟）的2.6倍"));
body.Append(CreateParagraph("2. 主要成本损耗来源："));
body.Append(CreateParagraph("   - 套餐利用率低（仅41%）：双卡配置导致每张卡用量不足"));
body.Append(CreateParagraph("   - 开卡费摊销：一次性成本按月分摊"));
body.Append(CreateParagraph("   - 虚拟卡投诉风险：需预留风险准备金"));

body.Append(CreateParagraph("3. 优化建议："));
body.Append(CreateParagraph("   - 提高单卡使用率，考虑减少虚拟卡配置"));
body.Append(CreateParagraph("   - 或寻找按实际用量计费的模式"));

// Add section properties
body.Append(new SectionProperties(
    new PageSize { Width = 11906, Height = 16838 },
    new PageMargin { Top = 1440, Right = 1440, Bottom = 1440, Left = 1440 }
));

doc.Save();
Console.WriteLine($"Document created: {outputPath}");

static Paragraph CreateHeading(string text)
{
    return new Paragraph(
        new ParagraphProperties(
            new SpacingBetweenLines { Before = 400, After = 200 }
        ),
        new Run(
            new RunProperties(
                new Bold(),
                new FontSize { Val = "28" }
            ),
            new Text(text)
        )
    );
}

static Paragraph CreateParagraph(string text)
{
    return new Paragraph(
        new ParagraphProperties(
            new SpacingBetweenLines { After = 120 }
        ),
        new Run(
            new RunProperties(new FontSize { Val = "24" }),
            new Text(text)
        )
    );
}

static Paragraph CreateBoldParagraph(string text)
{
    return new Paragraph(
        new ParagraphProperties(
            new SpacingBetweenLines { Before = 200, After = 120 }
        ),
        new Run(
            new RunProperties(
                new Bold(),
                new FontSize { Val = "24" }
            ),
            new Text(text)
        )
    );
}

static TableRow CreateTableRow(string[] cells, bool isHeader)
{
    var row = new TableRow();
    foreach (var cellText in cells)
    {
        var cell = new TableCell();
        var para = new Paragraph(
            new ParagraphProperties(
                new Justification { Val = JustificationValues.Center }
            ),
            new Run(
                isHeader
                    ? new RunProperties(new Bold(), new FontSize { Val = "22" })
                    : new RunProperties(new FontSize { Val = "22" }),
                new Text(cellText)
            )
        );
        cell.Append(para);
        row.Append(cell);
    }
    return row;
}
