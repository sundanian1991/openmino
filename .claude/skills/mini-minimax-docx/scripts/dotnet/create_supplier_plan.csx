// Create supplier ABC tiering management plan document
#r "nuget: DocumentFormat.OpenXml, 3.5.0"

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;
using DocumentFormat.OpenXml.Office2010.Word;
using Paragraph = DocumentFormat.OpenXml.Wordprocessing.Paragraph;
using Run = DocumentFormat.OpenXml.Wordprocessing.Run;
using Text = DocumentFormat.OpenXml.Wordprocessing.Text;
using Table = DocumentFormat.OpenXml.Wordprocessing.Table;
using Border = DocumentFormat.OpenXml.Wordprocessing;
using WpPageSize = DocumentFormat.OpenXml.Wordprocessing.PageSize;

// Helper methods
static Paragraph Heading1(string text) => new Paragraph(
    new Run(new Text(text) { Space = SpaceProcessingModeValues.Preserve })
    {
        RunProperties = new RunProperties(
            new Bold(),
            new FontSize { Val = "32" }, // 16pt
            new RunFonts { Ascii = "Calibri", EastAsia = "Microsoft YaHei" },
            new Color { Val = "1F3864" })
    },
    new ParagraphProperties(
        new ParagraphStyleId { Val = "Heading1" },
        new SpacingBetweenLines { Before = "240", After = "120" },
        new Justification { Val = JustificationValues.Left }));

static Paragraph Heading2(string text) => new Paragraph(
    new Run(new Text(text) { Space = SpaceProcessingModeValues.Preserve })
    {
        RunProperties = new RunProperties(
            new Bold(),
            new FontSize { Val = "28" }, // 14pt
            new RunFonts { Ascii = "Calibri", EastAsia = "Microsoft YaHei" },
            new Color { Val = "2E5090" })
    },
    new ParagraphProperties(
        new ParagraphStyleId { Val = "Heading2" },
        new SpacingBetweenLines { Before = "200", After = "80" }));

static Paragraph Heading3(string text) => new Paragraph(
    new Run(new Text(text) { Space = SpaceProcessingModeValues.Preserve })
    {
        RunProperties = new RunProperties(
            new Bold(),
            new FontSize { Val = "24" }, // 12pt
            new RunFonts { Ascii = "Calibri", EastAsia = "Microsoft YaHei" },
            new Color { Val = "3D6BBF" })
    },
    new ParagraphProperties(
        new ParagraphStyleId { Val = "Heading3" },
        new SpacingBetweenLines { Before = "160", After = "60" }));

static Paragraph NormalText(string text, bool bold = false) => new Paragraph(
    new Run(new Text(text) { Space = SpaceProcessingModeValues.Preserve })
    {
        RunProperties = new RunProperties(
            new FontSize { Val = "22" }, // 11pt
            new RunFonts { Ascii = "Calibri", EastAsia = "Microsoft YaHei" },
            bold ? new Bold() : null)
    },
    new ParagraphProperties(
        new SpacingBetweenLines { After = "80", Line = "276", LineRule = LineSpacingRuleValues.Auto }));

static Paragraph BulletText(string text) => new Paragraph(
    new Run(new Text(text) { Space = SpaceProcessingModeValues.Preserve })
    {
        RunProperties = new RunProperties(
            new FontSize { Val = "22" },
            new RunFonts { Ascii = "Calibri", EastAsia = "Microsoft YaHei" })
    },
    new ParagraphProperties(
        new Indentation { Left = "720", Hanging = "360" },
        new SpacingBetweenLines { After = "40", Line = "276", LineRule = LineSpacingRuleValues.Auto }));

static Paragraph EmptyPara() => new Paragraph(
    new ParagraphProperties(
        new SpacingBetweenLines { After = "60" }));

static TableCell MakeCell(string text, bool bold = bool default, bool center = bool default, UInt32Value? shadeColor = null)
{
    var runProps = new RunProperties(
        new FontSize { Val = "20" }, // 10pt
        new RunFonts { Ascii = "Calibri", EastAsia = "Microsoft YaHei" });
    if (bold) runProps.Append(new Bold());

    var cell = new TableCell(
        new Paragraph(
            new Run(new Text(text) { Space = SpaceProcessingModeValues.Preserve })
            { RunProperties = runProps },
            new ParagraphProperties(
                center ? new Justification { Val = JustificationValues.Center } : null)));

    if (shadeColor != null || center)
    {
        var tcPr = new TableCellProperties();
        if (center) tcPr.Append(new TableCellVerticalAlignment { Val = TableVerticalAlignmentValues.Center });
        if (shadeColor != null) tcPr.Append(new Shading { Val = ShadingPatternValues.Clear, Color = "auto", Fill = shadeColor.Value });
        cell.PrependChild(tcPr);
    }
    return cell;
}

static Table CreateTable(string[] headers, string[][] rows, string? headerColor = "1F3864")
{
    var table = new Table();
    var tblPr = new TableProperties(
        new TableWidth { Width = "9000", Type = TableWidthUnitValues.Dxa },
        new TableBorders(
            new TopBorder { Val = BorderValues.Single, Size = 4, Space = 0, Color = "999999" },
            new LeftBorder { Val = BorderValues.Single, Size = 4, Space = 0, Color = "999999" },
            new BottomBorder { Val = BorderValues.Single, Size = 4, Space = 0, Color = "999999" },
            new RightBorder { Val = BorderValues.Single, Size = 4, Space = 0, Color = "999999" },
            new InsideHorizontalBorder { Val = BorderValues.Single, Size = 2, Space = 0, Color = "CCCCCC" },
            new InsideVerticalBorder { Val = BorderValues.Single, Size = 2, Space = 0, Color = "CCCCCC" }));
    table.Append(tblPr);

    var grid = new TableGrid();
    foreach (var _ in headers) grid.Append(new GridColumn { Width = "1500" });
    table.Append(grid);

    // Header row
    var headerRow = new TableRow();
    foreach (var h in headers)
    {
        headerRow.Append(MakeCell(h, bold: true, center: true, shadeColor: headerColor));
    }
    table.Append(headerRow);

    // Data rows
    bool alt = false;
    foreach (var row in rows)
    {
        var tr = new TableRow();
        foreach (var c in row)
        {
            var cell = MakeCell(c, center: false, shadeColor: alt ? "F5F5F5" : null);
            tr.Append(cell);
        }
        table.Append(tr);
        alt = !alt;
    }
    return table;
}

// Create the document
string outputPath = args.Length > 0 ? args[0] : "output.docx";

using var doc = WordprocessingDocument.Create(outputPath, WordprocessingDocumentType.Document);
var mainPart = doc.AddMainDocumentPart();
mainPart.Document = new Document(new Body());
var body = mainPart.Document.Body;

// ── Title ──
body.Append(new Paragraph(
    new Run(new Text("供应商ABC分层分级管理方案") { Space = SpaceProcessingModeValues.Preserve })
    {
        RunProperties = new RunProperties(
            new Bold(),
            new FontSize { Val = "44" }, // 22pt
            new RunFonts { Ascii = "Calibri", EastAsia = "Microsoft YaHei" },
            new Color { Val = "1F3864" })
    },
    new ParagraphProperties(
        new Justification { Val = JustificationValues.Center },
        new SpacingBetweenLines { Before = "200", After = "100" })));

// Subtitle
body.Append(new Paragraph(
    new Run(new Text("版本：V1.0  |  日期：2026-04-13  |  编制：Mino") { Space = SpaceProcessingModeValues.Preserve })
    {
        RunProperties = new RunProperties(
            new FontSize { Val = "20" },
            new RunFonts { Ascii = "Calibri", EastAsia = "Microsoft YaHei" },
            new Color { Val = "666666" })
    },
    new ParagraphProperties(
        new Justification { Val = JustificationValues.Center },
        new SpacingBetweenLines { After = "300" })));

// ════════════════════════════════════════════════════════
// SECTION 1
// ════════════════════════════════════════════════════════
body.Append(Heading1("一、方案概述"));

body.Append(Heading2("1.1 背景"));
body.Append(NormalText("原管理规则为"一个季度有2次及以上在综合赛马排名后30%，进入PIP阶段，不能改善则淘汰"。该规则存在以下问题："));
body.Append(BulletText("仅关注尾部供应商，对头部和腰部供应商缺乏差异化管理"));
body.Append(BulletText("排名后30%即触发PIP，未考虑绝对表现水平"));
body.Append(BulletText("缺少正向激励，供应商缺乏向上动力"));

body.Append(Heading2("1.2 目标"));
body.Append(NormalText("建立ABC三级分层管理体系，实现："));
body.Append(BulletText("精细化管理：按表现分层，差异化配置资源和关注度"));
body.Append(BulletText("正向激励：A级获得资源倾斜，激发向上动力"));
body.Append(BulletText("精准淘汰：C级自动进PIP，连续不改善则淘汰，确保队伍健康"));

body.Append(Heading2("1.3 适用范围"));
body.Append(NormalText("全体在库供应商（30+），覆盖金条、企金、信用卡、财富四条业务线。"));

body.Append(Heading2("1.4 核心原则"));
body.Append(CreateTable(
    new[] { "原则", "说明" },
    new[] {
        new[] { "定量为主，定性为辅", "业务督导和质检定量打分占70%，供应商管理定性评价占30%" },
        new[] { "绝对+相对结合", "既看绝对分数，也看相对排名" },
        new[] { "动态调整", "按季度评估，可升可降" },
        new[] { "透明公开", "评分标准、计算方式、分级规则对供应商公开" }
    }));

// ════════════════════════════════════════════════════════
// SECTION 2
// ════════════════════════════════════════════════════════
body.Append(EmptyPara());
body.Append(Heading1("二、打分模型"));

body.Append(Heading2("2.1 评分维度与权重"));
body.Append(CreateTable(
    new[] { "维度", "权重", "性质", "打分主体" },
    new[] {
        new[] { "业务督导", "60%", "定量", "业务督导（日常业务运营团队）" },
        new[] { "供应商管理", "30%", "定性", "供应商管理团队" },
        new[] { "质检", "10%", "定量", "质检团队" }
    }));

body.Append(EmptyPara());
body.Append(NormalText("综合得分 = 业务督导得分 × 60% + 供应商管理得分 × 30% + 质检得分 × 10%", bold: true));

// ── 2.2 业务督导指标 ──
body.Append(Heading2("2.2 业务督导指标（60分）"));
body.Append(CreateTable(
    new[] { "序号", "指标", "满分", "数据来源", "计算公式", "满分条件" },
    new[] {
        new[] { "1", "产能达成率", "25分", "业务系统", "实际产能÷目标产能×100%", "≥100%得满分" },
        new[] { "2", "人均产出", "15分", "业务系统", "总产能÷在岗人数", "达到目标人均值得满分" },
        new[] { "3", "交付时效率", "10分", "任务管理系统", "按时交付工单数÷总工单数×100%", "≥95%得满分" },
        new[] { "4", "任务完成率", "5分", "任务管理系统", "已完成任务数÷下发任务总数×100%", "100%得满分" },
        new[] { "5", "业务增长率", "5分", "业务系统", "(本期-上期)÷上期×100%", "环比增长≥10%得满分" }
    }));

body.Append(Heading3("计分规则详解"));

body.Append(Heading3("产能达成率（25分）"));
body.Append(CreateTable(
    new[] { "达成率", "得分" },
    new[] {
        new[] { "≥100%", "25分" },
        new[] { "90%-99%", "25 × 实际达成率" },
        new[] { "80%-89%", "20分" },
        new[] { "70%-79%", "15分" },
        new[] { "<70%", "10分" }
    }));

body.Append(Heading3("人均产出（15分）"));
body.Append(CreateTable(
    new[] { "达成率", "得分" },
    new[] {
        new[] { "≥目标值", "15分" },
        new[] { "目标值90%-99%", "15 × 实际达成率" },
        new[] { "目标值80%-89%", "12分" },
        new[] { "目标值70%-79%", "9分" },
        new[] { "<70%", "6分" }
    }));

body.Append(Heading3("交付时效率（10分）"));
body.Append(CreateTable(
    new[] { "时效率", "得分" },
    new[] {
        new[] { "≥95%", "10分" },
        new[] { "90%-94%", "8分" },
        new[] { "85%-89%", "6分" },
        new[] { "80%-84%", "4分" },
        new[] { "<80%", "2分" }
    }));

body.Append(Heading3("任务完成率（5分）"));
body.Append(CreateTable(
    new[] { "完成率", "得分" },
    new[] {
        new[] { "100%", "5分" },
        new[] { "95%-99%", "4分" },
        new[] { "90%-94%", "3分" },
        new[] { "85%-89%", "2分" },
        new[] { "<85%", "1分" }
    }));

body.Append(Heading3("业务增长率（5分）"));
body.Append(CreateTable(
    new[] { "环比增长", "得分" },
    new[] {
        new[] { "≥10%", "5分" },
        new[] { "5%-9%", "4分" },
        new[] { "0%-4%", "3分" },
        new[] { "下滑0%-5%", "2分" },
        new[] { "下滑>5%", "1分" }
    }));

// ── 2.3 供应商管理指标 ──
body.Append(Heading2("2.3 供应商管理指标（30分）"));
body.Append(CreateTable(
    new[] { "序号", "指标", "满分", "评估方式", "评分标准" },
    new[] {
        new[] { "1", "响应速度", "8分", "主观评价（1-5档）", "5档=8分, 4档=6分, 3档=4分, 2档=2分, 1档=0分" },
        new[] { "2", "配合度", "8分", "主观评价（1-5档）", "同上" },
        new[] { "3", "团队稳定性", "6分", "流失率数据", "流失率<5%得6分, 5%-10%得4分, 10%-15%得3分, >15%得1分" },
        new[] { "4", "整改执行力", "5分", "整改闭环率", "闭环率100%得5分, 90%-99%得4分, 80%-89%得3分, <80%得1分" },
        new[] { "5", "管理规范性", "3分", "日常合规检查", "无违规得3分, 轻微违规得2分, 一般违规得1分, 严重违规得0分" }
    }));

body.Append(Heading3("评分细则"));

body.Append(Heading3("响应速度（8分）"));
body.Append(CreateTable(
    new[] { "档位", "描述", "得分" },
    new[] {
        new[] { "5档（优秀）", "紧急需求30分钟内响应，日常需求2小时内响应", "8分" },
        new[] { "4档（良好）", "紧急需求1小时内响应，日常需求4小时内响应", "6分" },
        new[] { "3档（一般）", "紧急需求2小时内响应，日常需求当日内响应", "4分" },
        new[] { "2档（较差）", "紧急需求超2小时响应，或经常性延迟", "2分" },
        new[] { "1档（差）", "经常失联，需要多次催促", "0分" }
    }));

body.Append(Heading3("配合度（8分）"));
body.Append(CreateTable(
    new[] { "档位", "描述", "得分" },
    new[] {
        new[] { "5档（优秀）", "主动配合临时任务、紧急需求，无条件支持业务调度", "8分" },
        new[] { "4档（良好）", "基本配合各类需求，偶有讨价还价但能执行", "6分" },
        new[] { "3档（一般）", "仅完成分内工作，对额外需求消极应对", "4分" },
        new[] { "2档（较差）", "经常推诿，需要多次沟通才配合", "2分" },
        new[] { "1档（差）", "明确拒绝配合业务调度", "0分" }
    }));

body.Append(Heading3("团队稳定性（6分）"));
body.Append(CreateTable(
    new[] { "月均流失率", "得分" },
    new[] {
        new[] { "<5%", "6分" },
        new[] { "5%-10%", "4分" },
        new[] { "10%-15%", "3分" },
        new[] { ">15%", "1分" }
    }));

body.Append(Heading3("整改执行力（5分）"));
body.Append(CreateTable(
    new[] { "整改闭环率", "得分" },
    new[] {
        new[] { "100%", "5分" },
        new[] { "90%-99%", "4分" },
        new[] { "80%-89%", "3分" },
        new[] { "<80%", "1分" }
    }));

body.Append(Heading3("管理规范性（3分）"));
body.Append(CreateTable(
    new[] { "情况", "得分" },
    new[] {
        new[] { "无任何违规记录", "3分" },
        new[] { "轻微违规（如报表迟交），已整改", "2分" },
        new[] { "一般违规（如流程执行不到位），整改中", "1分" },
        new[] { "严重违规（如数据造假、重大合规问题）", "0分" }
    }));

// ── 2.4 质检指标 ──
body.Append(Heading2("2.4 质检指标（10分）"));
body.Append(CreateTable(
    new[] { "序号", "指标", "满分", "数据来源", "计算公式", "满分条件" },
    new[] {
        new[] { "1", "质检合格率", "5分", "质检系统", "合格工单数÷抽检总数×100%", "≥98%得满分" },
        new[] { "2", "客户投诉率", "3分", "客诉系统", "投诉工单数÷总工单数×100%", "≤0.1%得满分" },
        new[] { "3", "红线事件", "2分", "质检/合规", "发生次数", "0次得满分" }
    }));

body.Append(Heading3("计分规则"));

body.Append(Heading3("质检合格率（5分）"));
body.Append(CreateTable(
    new[] { "合格率", "得分" },
    new[] {
        new[] { "≥98%", "5分" },
        new[] { "95%-97%", "4分" },
        new[] { "90%-94%", "3分" },
        new[] { "85%-89%", "2分" },
        new[] { "<85%", "1分" }
    }));

body.Append(Heading3("客户投诉率（3分）"));
body.Append(CreateTable(
    new[] { "投诉率", "得分" },
    new[] {
        new[] { "≤0.1%", "3分" },
        new[] { "0.1%-0.3%", "2分" },
        new[] { "0.3%-0.5%", "1分" },
        new[] { ">0.5%", "0分" }
    }));

body.Append(Heading3("红线事件（2分）"));
body.Append(CreateTable(
    new[] { "次数", "得分", "说明" },
    new[] {
        new[] { "0次", "2分", "无红线事件" },
        new[] { "1次", "0分", "本项不得分" },
        new[] { "≥2次", "0分", "本项不得分 + 直接降为C级" }
    }));

// ── 2.5 综合得分计算 ──
body.Append(Heading2("2.5 综合得分计算"));
body.Append(NormalText("综合得分 = 业务督导实际得分 + 供应商管理实际得分 + 质检实际得分", bold: true));

body.Append(Heading3("计算示例"));
body.Append(CreateTable(
    new[] { "维度", "满分", "供应商甲得分" },
    new[] {
        new[] { "业务督导", "60", "52" },
        new[] { "供应商管理", "30", "24" },
        new[] { "质检", "10", "8" },
        new[] { "综合得分", "100", "84" }
    }));

// ════════════════════════════════════════════════════════
// SECTION 3
// ════════════════════════════════════════════════════════
body.Append(EmptyPara());
body.Append(Heading1("三、ABC分级规则"));

body.Append(Heading2("3.1 分数→等级转换表"));
body.Append(CreateTable(
    new[] { "等级", "分数区间", "参考占比", "定位" },
    new[] {
        new[] { "A级（优秀）", "≥85分", "30%-40%", "核心供应商，重点维护" },
        new[] { "B级（合格）", "70-84分", "30%-40%", "中坚力量，持续提升" },
        new[] { "C级（待改善）", "<70分", "20%-30%", "重点整改，PIP候选" }
    }));

body.Append(Heading2("3.2 排名校正规则"));
body.Append(NormalText("仅看绝对分数不够，需结合相对排名进行校正："));
body.Append(CreateTable(
    new[] { "场景", "规则" },
    new[] {
        new[] { "分数≥85且排名前70%", "维持A级" },
        new[] { "分数≥85但排名后30%", "降为B级（绝对表现好但相对落后）" },
        new[] { "分数70-84且排名前70%", "维持B级" },
        new[] { "分数70-84但排名后30%", "降为C级" },
        new[] { "分数<70", "维持C级（分数不够就是不够）" }
    }));

body.Append(NormalText("简单总结：分数决定基准等级，排名后30%最多降一级。", bold: true));

body.Append(Heading2("3.3 连续表现调整规则"));
body.Append(CreateTable(
    new[] { "连续季度表现", "调整规则" },
    new[] {
        new[] { "连续2个季度A级", "授予"战略合作供应商"称号，额外资源倾斜" },
        new[] { "连续2个季度B级", "保持稳定，关注提升空间" },
        new[] { "连续2个季度C级", "启动淘汰评估" },
        new[] { "C→B→C（反复）", "视为整改无效，启动淘汰评估" },
        new[] { "B→A（升级）", "正常升级" },
        new[] { "A→B（降级）", "预警提示，关注下滑原因" },
        new[] { "B→C（降级）", "直接进入PIP" },
        new[] { "A→C（跳级降级）", "直接进入PIP + 专项调查" }
    }));

body.Append(Heading2("3.4 特殊情况处理"));
body.Append(CreateTable(
    new[] { "情况", "处理方式" },
    new[] {
        new[] { "新供应商（入库<1个季度）", "首个季度不参与评级，给予观察期，次季度起正常参评" },
        new[] { "红线事件", "质检红线事件≥2次，直接降为C级，无论分数" },
        new[] { "重大贡献", "为业务带来显著增量（>20%增长），可破格升一级" },
        new[] { "业务线调整", "因业务策略调整导致产能变化的，经业务负责人审批后可豁免当季评级" },
        new[] { "不可抗力", "自然灾害、政策变化等不可抗力因素，经审批后可豁免" }
    }));

// ════════════════════════════════════════════════════════
// SECTION 4
// ════════════════════════════════════════════════════════
body.Append(EmptyPara());
body.Append(Heading1("四、分级管理策略"));

// ── 4.1 A级 ──
body.Append(Heading2("4.1 A级供应商管理"));
body.Append(NormalText("管理策略：资源倾斜 + 深度合作 + 免检优先", bold: true));
body.Append(CreateTable(
    new[] { "维度", "管理动作", "执行频率" },
    new[] {
        new[] { "资源分配", "优先分配优质业务线、高价值项目", "月度" },
        new[] { "业务倾斜", "在总量目标内优先保障A级供应商产能", "季度" },
        new[] { "免检/抽检", "质检抽检率降低50%", "季度" },
        new[] { "沟通机制", "季度战略对话（管理层对管理层）", "季度" },
        new[] { "结算", "优先结算，缩短账期", "月度" },
        new[] { "激励", "年度评选"优秀供应商"，公开表彰", "年度" },
        new[] { "合作深化", "优先纳入新业务试点", "按需" }
    }));

body.Append(Heading3("激励措施"));
body.Append(BulletText("业务量优先分配（在总目标内优先保障）"));
body.Append(BulletText("质检抽检率减半"));
body.Append(BulletText("优先结算（账期缩短5-10个工作日）"));
body.Append(BulletText("新业务试点优先权"));
body.Append(BulletText("年度"优秀供应商"称号"));
body.Append(BulletText("季度管理层面对面沟通"));

// ── 4.2 B级 ──
body.Append(Heading2("4.2 B级供应商管理"));
body.Append(NormalText("管理策略：常规监控 + 针对性提升", bold: true));
body.Append(CreateTable(
    new[] { "维度", "管理动作", "执行频率" },
    new[] {
        new[] { "资源分配", "正常分配，不优先不限制", "月度" },
        new[] { "质检", "标准抽检率", "月度" },
        new[] { "沟通机制", "月度业务复盘会", "月度" },
        new[] { "提升计划", "针对薄弱指标制定提升方案", "季度" },
        new[] { "整改跟踪", "对发现的问题限期整改", "按需" },
        new[] { "预警", "出现下滑趋势时预警", "实时" }
    }));

body.Append(Heading3("提升方向"));
body.Append(BulletText("分析失分项，针对性改善"));
body.Append(BulletText("对标A级供应商，找出差距"));
body.Append(BulletText("制定季度提升目标，争取升级"));
body.Append(BulletText("关注团队稳定性和响应速度"));

// ── 4.3 C级 ──
body.Append(Heading2("4.3 C级供应商管理（PIP流程）"));
body.Append(NormalText("管理策略：限期整改 + 高频监控 + 淘汰退出", bold: true));

body.Append(Heading3("PIP（Performance Improvement Plan）流程"));
body.Append(CreateTable(
    new[] { "阶段", "时间", "动作", "负责人", "输出物" },
    new[] {
        new[] { "预警", "评级确定后3个工作日内", "发送《整改通知书》，明确整改目标和期限", "供应商管理员", "《整改通知书》" },
        new[] { "沟通", "预警后5个工作日内", "面对面沟通，分析原因，制定整改计划", "供应商管理员+业务督导", "《整改计划书》" },
        new[] { "执行", "整改期60天", "供应商执行整改，高频监控", "供应商管理员", "周度监控报告" },
        new[] { "中期评估", "整改第30天", "中期评估，检查进度", "供应商管理员+业务督导", "《中期评估报告》" },
        new[] { "终期评估", "整改第60天", "终期评估，判定结果", "供应商管理员+业务督导+质检", "《终期评估报告》" }
    }));

body.Append(Heading3("PIP期间管理动作"));
body.Append(CreateTable(
    new[] { "维度", "动作", "频率" },
    new[] {
        new[] { "业务量", "缩减30%-50%业务量", "立即执行" },
        new[] { "质检", "提高抽检率至200%", "持续" },
        new[] { "监控", "周度业务数据跟踪", "每周" },
        new[] { "沟通", "周度整改进度沟通", "每周" },
        new[] { "报告", "整改进度报告", "每周" }
    }));

body.Append(Heading3("淘汰触发条件"));
body.Append(CreateTable(
    new[] { "条件", "说明" },
    new[] {
        new[] { "连续2个季度C级", "PIP整改后仍为C级" },
        new[] { "PIP终期评估不达标", "整改目标未达成" },
        new[] { "C→B→C反复", "整改后短期改善但无法维持" },
        new[] { "重大红线事件", "合规红线事件≥2次" },
        new[] { "主动退出", "供应商因自身原因无法继续合作" }
    }));

body.Append(Heading3("淘汰流程"));
body.Append(CreateTable(
    new[] { "阶段", "时间", "动作", "负责人" },
    new[] {
        new[] { "淘汰决策", "终期评估后5个工作日内", "出具《淘汰评估报告》，报服务组负责人审批", "供应商管理员" },
        new[] { "审批", "3个工作日内", "服务组负责人审批", "王易人" },
        new[] { "通知", "审批后3个工作日内", "发送《清退通知书》", "供应商管理员" },
        new[] { "交接", "30天内", "业务平稳交接，人员妥善安排", "业务督导" },
        new[] { "归档", "交接完成后", "供应商档案归档", "供应商管理员" }
    }));

// ════════════════════════════════════════════════════════
// SECTION 5
// ════════════════════════════════════════════════════════
body.Append(EmptyPara());
body.Append(Heading1("五、管理动作清单"));

body.Append(Heading2("5.1 季度动作"));
body.Append(CreateTable(
    new[] { "序号", "动作", "执行主体", "参与方", "输出物", "时间节点" },
    new[] {
        new[] { "1", "综合评分", "供应商管理员", "业务督导、质检", "《供应商季度评分表》", "次月5日前" },
        new[] { "2", "等级评定", "供应商管理员", "服务组负责人", "《供应商分级评定结果》", "次月8日前" },
        new[] { "3", "等级通报", "供应商管理员", "各供应商", "《分级结果通知书》", "次月10日前" },
        new[] { "4", "A级激励兑现", "业务督导", "财务", "资源倾斜、优先结算", "次月15日前" },
        new[] { "5", "C级PIP启动", "供应商管理员", "业务督导", "《整改通知书》《整改计划书》", "次月10日前" },
        new[] { "6", "季度战略对话", "服务组负责人", "A级供应商管理层", "会议纪要", "次月内" }
    }));

body.Append(Heading2("5.2 月度动作"));
body.Append(CreateTable(
    new[] { "序号", "动作", "执行主体", "参与方", "输出物" },
    new[] {
        new[] { "1", "业务数据汇总", "业务督导", "各供应商", "《月度业务报表》" },
        new[] { "2", "质检数据汇总", "质检团队", "-", "《月度质检报告》" },
        new[] { "3", "供应商管理评分更新", "供应商管理员", "-", "定性指标月度记录" },
        new[] { "4", "B级供应商月度复盘", "业务督导", "B级供应商", "《月度复盘纪要》" },
        new[] { "5", "C级供应商周度跟踪汇总", "供应商管理员", "C级供应商", "《月度PIP跟踪报告》" },
        new[] { "6", "异常预警", "系统自动", "供应商管理员", "预警通知" }
    }));

body.Append(Heading2("5.3 周度动作"));
body.Append(CreateTable(
    new[] { "序号", "动作", "执行主体", "适用对象", "输出物" },
    new[] {
        new[] { "1", "业务数据跟踪", "业务督导", "全体", "周报" },
        new[] { "2", "PIP整改进度跟踪", "供应商管理员", "C级", "《周度整改报告》" },
        new[] { "3", "异常问题跟进", "供应商管理员", "全体", "问题跟踪表" }
    }));

body.Append(Heading2("5.4 触发式动作"));
body.Append(CreateTable(
    new[] { "触发条件", "动作", "执行主体", "时限" },
    new[] {
        new[] { "供应商月度排名连续2次后30%", "预警沟通", "供应商管理员", "3个工作日内" },
        new[] { "供应商出现红线事件", "专项调查 + 降级评估", "质检+供应商管理", "5个工作日内" },
        new[] { "供应商人员流失率>15%", "稳定性专项沟通", "供应商管理员", "1周内" },
        new[] { "供应商主动提出缩减规模", "风险评估 + 应对方案", "业务督导", "1周内" },
        new[] { "业务策略重大调整", "供应商分级临时调整", "服务组负责人", "按需" }
    }));

// ════════════════════════════════════════════════════════
// SECTION 6
// ════════════════════════════════════════════════════════
body.Append(EmptyPara());
body.Append(Heading1("六、附录"));

body.Append(Heading2("6.1 Excel打分模板字段说明"));
body.Append(NormalText("Excel模板包含以下工作表：", bold: true));

body.Append(Heading3("Sheet 1：供应商基础信息"));
body.Append(NormalText("供应商名称、供应商编码、业务线、合作起始日期、当前等级"));

body.Append(Heading3("Sheet 2：业务督导评分（60分）"));
body.Append(NormalText("产能达成率→产能得分（25分），人均产出→人均得分（15分），交付时效率→时效得分（10分），任务完成率→任务得分（5分），业务增长率→增长得分（5分），总分自动求和"));

body.Append(Heading3("Sheet 3：供应商管理评分（30分）"));
body.Append(NormalText("响应速度→响应得分（8分），配合度→配合得分（8分），团队流失率→稳定性得分（6分），整改闭环率→整改得分（5分），管理规范性→规范得分（3分），总分自动求和"));

body.Append(Heading3("Sheet 4：质检评分（10分）"));
body.Append(NormalText("质检合格率→合格率得分（5分），客户投诉率→投诉得分（3分），红线事件次数→红线得分（2分），总分自动求和"));

body.Append(Heading3("Sheet 5：综合评定"));
body.Append(NormalText("综合得分自动计算，综合排名自动排序，基准等级自动判定，排名校正，最终等级（A/B/C），连续C季度数自动累计，是否触发PIP/淘汰自动判定"));

body.Append(Heading2("6.2 与原规则对比"));
body.Append(CreateTable(
    new[] { "维度", "原规则", "新规则" },
    new[] {
        new[] { "分级维度", "单一维度（后30%）", "三维评分（业务60%+管理30%+质检10%）" },
        new[] { "评价方式", "纯排名", "绝对分数+相对排名" },
        new[] { "激励措施", "无", "A级资源倾斜" },
        new[] { "PIP触发", "季度2次后30%", "C级直接PIP" },
        new[] { "淘汰标准", "不能改善", "连续2季度C级或PIP不达标" },
        new[] { "管理颗粒度", "粗放", "精细化分级管理" },
        new[] { "透明度", "低", "评分标准公开透明" }
    }));

body.Append(Heading2("6.3 实施建议"));
body.Append(BulletText("首月试运行：用历史数据回测，验证评分模型的合理性"));
body.Append(BulletText("首季度正式运行：首次评级后观察分级分布是否合理（A级30-40%，B级30-40%，C级20-30%）"));
body.Append(BulletText("持续优化：每季度末复盘评分指标的有效性，必要时微调权重"));
body.Append(BulletText("系统支持：建议将评分模型固化到系统中，自动计算，减少人工干预"));

// ── Final sectPr (required) ──
body.Append(new SectionProperties(
    new WpPageSize { Width = (UInt32Value)12240U, Height = (UInt32Value)15840U },
    new PageMargin
    {
        Top = 1440,
        Right = (UInt32Value)1440U,
        Bottom = 1440,
        Left = (UInt32Value)1440U,
        Header = (UInt32Value)720U,
        Footer = (UInt32Value)720U,
        Gutter = (UInt32Value)0U
    }));

doc.Save();
Console.WriteLine($"Document created: {outputPath}");
