const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title = "合作健康度诊断";

const F = "Microsoft YaHei";
const BASE = "/Users/sundanian/Documents/projects/ai-agents/my-agent/workspace/80-供应商-合作健康度诊断PPT-20260509/";

// 商务蓝灰色系
const C = {
  darkBg:    "1B3A5C",
  sectionBg: "234B6E",
  cream:     "F5F3EF",
  white:     "FFFFFF",
  orange:    "E8913A",
  blue:      "4A90D9",
  teal:      "3A8FB7",
  green:     "4CAF7D",
  textDark:  "1B3A5C",
  textLight: "F5F3EF",
  muted:     "8898B8",
  divider:   "2E5070",
  cardBorder:"D8D4CC",
};

// ==================== Slide 1: Cover ====================
const s1 = pres.addSlide();
s1.background = { color: C.darkBg };

s1.addText("供应商管理BP · 十大项目之六", {
  x: 0.9, y: 1.4, w: 8.0, h: 0.45,
  fontSize: 14, color: C.muted, fontFace: F, align: "left", margin: 0, charSpacing: 1.5,
});

s1.addText("合作健康度诊断", {
  x: 0.9, y: 2.0, w: 8.8, h: 1.0,
  fontSize: 52, bold: true, color: C.textLight, fontFace: F, align: "left", margin: 0,
});
s1.addText("建立供应商协作问题发现与改善闭环", {
  x: 0.9, y: 3.1, w: 8.8, h: 0.7,
  fontSize: 24, color: C.orange, fontFace: F, align: "left", margin: 0,
});

s1.addText("汇报人：年老师  |  2026年5月", {
  x: 0.9, y: 4.7, w: 4.0, h: 0.4,
  fontSize: 13, color: C.muted, fontFace: F, align: "left", margin: 0,
});

// ==================== Slide 2: 四大痛点 ====================
const s2 = pres.addSlide();
s2.background = { color: C.cream };

s2.addText("为什么要做合作健康度诊断？", {
  x: 0.65, y: 0.35, w: 8.7, h: 0.6,
  fontSize: 28, bold: true, color: C.textDark, fontFace: F, align: "left", margin: 0,
});
s2.addText("四大痛点催生系统性诊断需求", {
  x: 0.65, y: 0.9, w: 8.7, h: 0.35,
  fontSize: 15, color: C.muted, fontFace: F, align: "left", margin: 0,
});

s2.addShape(pres.ShapeType.line, {
  x: 0.65, y: 1.2, w: 8.7, h: 0,
  line: { color: C.cardBorder, width: 1 },
});

const painCards = [
  { title: "摩擦未量化", desc: "日常合作存在摩擦，从未系统性梳理\"到底哪里不顺畅\"", icon: "?", x: 0.4, y: 1.45 },
  { title: "评估机制缺失", desc: "没有定期的合作满意度评估，不知道合作状态好不好", icon: "!", x: 5.05, y: 1.45 },
  { title: "反馈渠道空白", desc: "供应商可能有很多想法但没有正式渠道反馈", icon: "...", x: 0.4, y: 3.35 },
  { title: "效率黑洞", desc: "争议处理、需求传达的效率未知，可能存在隐性成本", icon: "~", x: 5.05, y: 3.35 },
];
const cW = 4.55, cH = 1.7;
painCards.forEach(card => {
  s2.addShape(pres.ShapeType.rect, {
    x: card.x, y: card.y, w: cW, h: cH,
    fill: { color: C.white }, line: { color: C.cardBorder, width: 1 },
    shadow: { type: "outer", color: "000000", blur: 6, offset: 1, angle: 135, opacity: 0.06 },
  });
  s2.addShape(pres.ShapeType.rect, {
    x: card.x + 0.2, y: card.y + 0.2, w: 0.5, h: 0.5,
    fill: { color: C.darkBg }, line: { width: 0 }, rectRadius: 0.05,
  });
  s2.addText(card.icon, {
    x: card.x + 0.2, y: card.y + 0.2, w: 0.5, h: 0.5,
    fontSize: 18, bold: true, color: C.orange, fontFace: F, align: "center", valign: "middle", margin: 0,
  });
  s2.addText(card.title, {
    x: card.x + 0.85, y: card.y + 0.2, w: cW - 1.1, h: 0.45,
    fontSize: 17, bold: true, color: C.textDark, fontFace: F, align: "left", margin: 0,
  });
  s2.addText(card.desc, {
    x: card.x + 0.25, y: card.y + 0.75, w: cW - 0.5, h: 0.8,
    fontSize: 13, color: "5A5A6A", fontFace: F, align: "left", margin: 0, valign: "top",
  });
});

s2.addText("与其等问题爆发，不如主动诊断、精准治理", {
  x: 0.65, y: 5.1, w: 8.7, h: 0.35,
  fontSize: 13, color: C.blue, fontFace: F, align: "right", margin: 0,
});

// ==================== Slide 3: 项目目标 ====================
const s3 = pres.addSlide();
s3.background = { color: C.cream };

s3.addText("项目目标：诊断→改善→追踪，90天见效果", {
  x: 0.65, y: 0.35, w: 8.7, h: 0.6,
  fontSize: 28, bold: true, color: C.textDark, fontFace: F, align: "left", margin: 0,
});
s3.addText("不只是调研报告，是带动作、带责任人、带验收标准的改善闭环", {
  x: 0.65, y: 0.9, w: 8.7, h: 0.35,
  fontSize: 15, color: C.muted, fontFace: F, align: "left", margin: 0,
});
s3.addShape(pres.ShapeType.line, {
  x: 0.65, y: 1.2, w: 8.7, h: 0,
  line: { color: C.cardBorder, width: 1 },
});

const goals = [
  { num: "01", title: "识别卡点", desc: "数据收集+访谈\n找出Top 3问题", color: C.orange },
  { num: "02", title: "快速改善", desc: "90天改善计划\n责任人+时间线+验收标准", color: C.blue },
  { num: "03", title: "持续追踪", desc: "季度健康度评估\n防复发、可持续", color: C.teal },
];

goals.forEach((g, i) => {
  const cx = 0.6 + i * 3.15;
  // Arrow connector (except last)
  if (i < 2) {
    s3.addShape(pres.ShapeType.rect, {
      x: cx + 2.6, y: 2.65, w: 0.55, h: 0.08,
      fill: { color: C.cardBorder }, line: { width: 0 },
    });
    // arrowhead
    s3.addText("▶", {
      x: cx + 2.95, y: 2.45, w: 0.4, h: 0.5,
      fontSize: 14, color: C.cardBorder, fontFace: F, align: "center", valign: "middle", margin: 0,
    });
  }
  // Card
  s3.addShape(pres.ShapeType.rect, {
    x: cx, y: 1.55, w: 2.65, h: 3.0,
    fill: { color: C.white }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.05,
    shadow: { type: "outer", color: "000000", blur: 6, offset: 1, angle: 135, opacity: 0.06 },
  });
  s3.addShape(pres.ShapeType.rect, {
    x: cx, y: 1.55, w: 2.65, h: 0.08,
    fill: { color: g.color }, line: { width: 0 },
  });
  s3.addText(g.num, {
    x: cx + 0.2, y: 1.8, w: 1.0, h: 0.7,
    fontSize: 36, bold: true, color: g.color, fontFace: F, align: "left", margin: 0,
  });
  s3.addText(g.title, {
    x: cx + 0.2, y: 2.5, w: 2.25, h: 0.45,
    fontSize: 20, bold: true, color: C.textDark, fontFace: F, align: "left", margin: 0,
  });
  s3.addText(g.desc, {
    x: cx + 0.2, y: 3.05, w: 2.25, h: 1.2,
    fontSize: 14, color: "5A5A6A", fontFace: F, align: "left", margin: 0, valign: "top",
  });
});

s3.addText("不做调研报告，做改善闭环", {
  x: 0.65, y: 5.1, w: 8.7, h: 0.35,
  fontSize: 13, color: C.blue, fontFace: F, align: "right", margin: 0,
});

// ==================== Slide 4: 数据收集框架 ====================
const s4 = pres.addSlide();
s4.background = { color: C.cream };

s4.addText("数据收集：定量+定性双线验证", {
  x: 0.65, y: 0.35, w: 8.7, h: 0.6,
  fontSize: 28, bold: true, color: C.textDark, fontFace: F, align: "left", margin: 0,
});
s4.addText("不凭感觉判断，用数据锁定问题范围，用访谈深挖根因", {
  x: 0.65, y: 0.9, w: 8.7, h: 0.35,
  fontSize: 15, color: C.muted, fontFace: F, align: "left", margin: 0,
});
s4.addShape(pres.ShapeType.line, {
  x: 0.65, y: 1.2, w: 8.7, h: 0,
  line: { color: C.cardBorder, width: 1 },
});

// Left column - 定量数据
s4.addShape(pres.ShapeType.rect, {
  x: 0.4, y: 1.45, w: 4.4, h: 3.6,
  fill: { color: C.white }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.05,
  shadow: { type: "outer", color: "000000", blur: 6, offset: 1, angle: 135, opacity: 0.06 },
});
s4.addShape(pres.ShapeType.rect, {
  x: 0.4, y: 1.45, w: 4.4, h: 0.55,
  fill: { color: C.darkBg }, line: { width: 0 }, rectRadius: 0.05,
});
s4.addText("定量数据", {
  x: 0.65, y: 1.5, w: 3.9, h: 0.45,
  fontSize: 16, bold: true, color: C.textLight, fontFace: F, align: "left", margin: 0,
});

const quantItems = [
  "近3个月争议处理数量和平均处理时长",
  "投诉次数和类型分布",
  "需求传达的响应时效（从提出到解决）",
  "供应商人员流失率变化",
];
quantItems.forEach((item, i) => {
  s4.addShape(pres.ShapeType.rect, {
    x: 0.6, y: 2.2 + i * 0.65, w: 0.3, h: 0.3,
    fill: { color: C.orange }, line: { width: 0 }, rectRadius: 0.03,
  });
  s4.addText(String(i + 1), {
    x: 0.6, y: 2.2 + i * 0.65, w: 0.3, h: 0.3,
    fontSize: 11, bold: true, color: C.white, fontFace: F, align: "center", valign: "middle", margin: 0,
  });
  s4.addText(item, {
    x: 1.05, y: 2.2 + i * 0.65, w: 3.55, h: 0.5,
    fontSize: 13, color: C.textDark, fontFace: F, align: "left", margin: 0, valign: "middle",
  });
});

// Right column - 定性访谈
s4.addShape(pres.ShapeType.rect, {
  x: 5.2, y: 1.45, w: 4.4, h: 3.6,
  fill: { color: C.white }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.05,
  shadow: { type: "outer", color: "000000", blur: 6, offset: 1, angle: 135, opacity: 0.06 },
});
s4.addShape(pres.ShapeType.rect, {
  x: 5.2, y: 1.45, w: 4.4, h: 0.55,
  fill: { color: C.blue }, line: { width: 0 }, rectRadius: 0.05,
});
s4.addText("定性访谈（5-8家关键供应商）", {
  x: 5.45, y: 1.5, w: 3.9, h: 0.45,
  fontSize: 16, bold: true, color: C.white, fontFace: F, align: "left", margin: 0,
});

const qualItems = [
  "合作中最顺畅的是什么？",
  "最不顺畅的是什么？",
  "最希望我们改进什么？",
  "如果只改一件事，你选什么？",
];
qualItems.forEach((item, i) => {
  s4.addText("Q" + (i + 1), {
    x: 5.45, y: 2.2 + i * 0.65, w: 0.35, h: 0.3,
    fontSize: 12, bold: true, color: C.blue, fontFace: F, align: "left", margin: 0,
  });
  s4.addText(item, {
    x: 5.9, y: 2.2 + i * 0.65, w: 3.5, h: 0.5,
    fontSize: 13, color: C.textDark, fontFace: F, align: "left", margin: 0, valign: "middle",
  });
});

s4.addText("1周完成数据收集，5-8家关键供应商深度访谈", {
  x: 0.65, y: 5.1, w: 8.7, h: 0.35,
  fontSize: 13, color: C.blue, fontFace: F, align: "right", margin: 0,
});

// ==================== Slide 5: 问题排序矩阵 ====================
const s5 = pres.addSlide();
s5.background = { color: C.cream };

s5.addText("问题排序：用\"影响面×严重度\"锁定Top 3", {
  x: 0.65, y: 0.35, w: 8.7, h: 0.6,
  fontSize: 28, bold: true, color: C.textDark, fontFace: F, align: "left", margin: 0,
});
s5.addText("不贪多，只抓影响最大、最紧迫的3个问题，其余入backlog", {
  x: 0.65, y: 0.9, w: 8.7, h: 0.35,
  fontSize: 15, color: C.muted, fontFace: F, align: "left", margin: 0,
});
s5.addShape(pres.ShapeType.line, {
  x: 0.65, y: 1.2, w: 8.7, h: 0,
  line: { color: C.cardBorder, width: 1 },
});

// 2x2 Matrix
const mx = 1.2, my = 1.6, mW = 5.5, mH = 3.5;

// Axis labels
s5.addText("← 影响面 →", {
  x: mx, y: my + mH + 0.1, w: mW, h: 0.35,
  fontSize: 13, bold: true, color: C.textDark, fontFace: F, align: "center", margin: 0,
});
s5.addText("↑\n严重度\n↓", {
  x: mx - 0.6, y: my, w: 0.5, h: mH,
  fontSize: 12, bold: true, color: C.textDark, fontFace: F, align: "center", valign: "middle", margin: 0,
});

// Quadrants
// Top-right: 优先解决
s5.addShape(pres.ShapeType.rect, {
  x: mx + mW / 2, y: my, w: mW / 2, h: mH / 2,
  fill: { color: "FDEBD0" }, line: { color: C.orange, width: 1.5 }, rectRadius: 0.05,
});
s5.addText("优先解决", {
  x: mx + mW / 2, y: my + 0.3, w: mW / 2, h: 0.4,
  fontSize: 16, bold: true, color: C.orange, fontFace: F, align: "center", margin: 0,
});
s5.addText("Top 3 问题", {
  x: mx + mW / 2, y: my + 0.8, w: mW / 2, h: 0.4,
  fontSize: 22, bold: true, color: C.textDark, fontFace: F, align: "center", margin: 0,
});

// Top-left: 次优先
s5.addShape(pres.ShapeType.rect, {
  x: mx, y: my, w: mW / 2, h: mH / 2,
  fill: { color: "EBF2FA" }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.05,
});
s5.addText("次优先", {
  x: mx, y: my + 0.3, w: mW / 2, h: 0.4,
  fontSize: 14, color: C.blue, fontFace: F, align: "center", margin: 0,
});
s5.addText("Backlog", {
  x: mx, y: my + 0.8, w: mW / 2, h: 0.4,
  fontSize: 18, bold: true, color: C.muted, fontFace: F, align: "center", margin: 0,
});

// Bottom-right: 关注
s5.addShape(pres.ShapeType.rect, {
  x: mx + mW / 2, y: my + mH / 2, w: mW / 2, h: mH / 2,
  fill: { color: "EBF2FA" }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.05,
});
s5.addText("关注", {
  x: mx + mW / 2, y: my + mH / 2 + 0.3, w: mW / 2, h: 0.4,
  fontSize: 14, color: C.blue, fontFace: F, align: "center", margin: 0,
});

// Bottom-left: 暂不处理
s5.addShape(pres.ShapeType.rect, {
  x: mx, y: my + mH / 2, w: mW / 2, h: mH / 2,
  fill: { color: "F0EDE8" }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.05,
});
s5.addText("暂不处理", {
  x: mx, y: my + mH / 2 + 0.3, w: mW / 2, h: 0.4,
  fontSize: 14, color: C.muted, fontFace: F, align: "center", margin: 0,
});

// Side: 问题分类
const cats = [
  { label: "流程类", desc: "步骤多、审批慢、信息不通", color: C.orange },
  { label: "沟通类", desc: "需求不清、反馈不及时、角色不明", color: C.blue },
  { label: "利益类", desc: "分配不公、激励不足、竞争不公", color: C.teal },
];
cats.forEach((cat, i) => {
  const cy = 1.6 + i * 1.15;
  s5.addShape(pres.ShapeType.rect, {
    x: 7.1, y: cy, w: 2.5, h: 0.95,
    fill: { color: C.white }, line: { color: cat.color, width: 1.5 }, rectRadius: 0.05,
  });
  s5.addText(cat.label, {
    x: 7.3, y: cy + 0.1, w: 2.1, h: 0.35,
    fontSize: 15, bold: true, color: cat.color, fontFace: F, align: "left", margin: 0,
  });
  s5.addText(cat.desc, {
    x: 7.3, y: cy + 0.45, w: 2.1, h: 0.4,
    fontSize: 11, color: "5A5A6A", fontFace: F, align: "left", margin: 0,
  });
});

s5.addText("只抓Top 3，其余入backlog，不贪多", {
  x: 0.65, y: 5.1, w: 8.7, h: 0.35,
  fontSize: 13, color: C.blue, fontFace: F, align: "right", margin: 0,
});

// ==================== Slide 6: 实施路径 ====================
const s6 = pres.addSlide();
s6.background = { color: C.cream };

s6.addText("实施路径：四步闭环，从诊断到持续追踪", {
  x: 0.65, y: 0.35, w: 8.7, h: 0.6,
  fontSize: 28, bold: true, color: C.textDark, fontFace: F, align: "left", margin: 0,
});
s6.addText("4周完成诊断和计划制定，90天完成改善，季度持续追踪", {
  x: 0.65, y: 0.9, w: 8.7, h: 0.35,
  fontSize: 15, color: C.muted, fontFace: F, align: "left", margin: 0,
});
s6.addShape(pres.ShapeType.line, {
  x: 0.65, y: 1.2, w: 8.7, h: 0,
  line: { color: C.cardBorder, width: 1 },
});

const steps = [
  { num: "1", title: "数据收集", time: "1周", desc: "定量数据拉取\n+ 5-8家深度访谈", color: C.orange },
  { num: "2", title: "问题分析", time: "3天", desc: "影响面×严重度排序\n输出Top 3", color: C.blue },
  { num: "3", title: "改善计划", time: "2天", desc: "责任人+路径\n+时间+验收标准", color: C.teal },
  { num: "4", title: "季度追踪", time: "持续", desc: "问卷+数据\n健康度仪表盘", color: C.green },
];

steps.forEach((step, i) => {
  const cx = 0.4 + i * 2.4;
  // Connector arrow
  if (i < 3) {
    s6.addShape(pres.ShapeType.line, {
      x: cx + 2.15, y: 2.6, w: 0.25, h: 0,
      line: { color: C.muted, width: 2 },
    });
  }
  // Step card
  s6.addShape(pres.ShapeType.rect, {
    x: cx, y: 1.5, w: 2.2, h: 3.2,
    fill: { color: C.white }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.05,
    shadow: { type: "outer", color: "000000", blur: 6, offset: 1, angle: 135, opacity: 0.06 },
  });
  // Top accent bar
  s6.addShape(pres.ShapeType.rect, {
    x: cx, y: 1.5, w: 2.2, h: 0.06,
    fill: { color: step.color }, line: { width: 0 },
  });
  // Number circle
  s6.addShape(pres.ShapeType.ellipse, {
    x: cx + 0.75, y: 1.75, w: 0.7, h: 0.7,
    fill: { color: step.color }, line: { width: 0 },
  });
  s6.addText(step.num, {
    x: cx + 0.75, y: 1.75, w: 0.7, h: 0.7,
    fontSize: 24, bold: true, color: C.white, fontFace: F, align: "center", valign: "middle", margin: 0,
  });
  s6.addText(step.title, {
    x: cx + 0.15, y: 2.6, w: 1.9, h: 0.4,
    fontSize: 17, bold: true, color: C.textDark, fontFace: F, align: "center", margin: 0,
  });
  s6.addText(step.time, {
    x: cx + 0.15, y: 2.95, w: 1.9, h: 0.3,
    fontSize: 14, bold: true, color: step.color, fontFace: F, align: "center", margin: 0,
  });
  s6.addText(step.desc, {
    x: cx + 0.15, y: 3.3, w: 1.9, h: 1.1,
    fontSize: 12, color: "5A5A6A", fontFace: F, align: "center", margin: 0, valign: "top",
  });
});

s6.addText("4周诊断+计划，90天改善闭环，季度持续追踪", {
  x: 0.65, y: 5.1, w: 8.7, h: 0.35,
  fontSize: 13, color: C.blue, fontFace: F, align: "right", margin: 0,
});

// ==================== Slide 7: 里程碑 ====================
const s7 = pres.addSlide();
s7.background = { color: C.cream };

s7.addText("里程碑：4周完成诊断，7月复盘改善效果", {
  x: 0.65, y: 0.35, w: 8.7, h: 0.6,
  fontSize: 28, bold: true, color: C.textDark, fontFace: F, align: "left", margin: 0,
});
s7.addText("时间线明确，每个节点有可交付物", {
  x: 0.65, y: 0.9, w: 8.7, h: 0.35,
  fontSize: 15, color: C.muted, fontFace: F, align: "left", margin: 0,
});
s7.addShape(pres.ShapeType.line, {
  x: 0.65, y: 1.2, w: 8.7, h: 0,
  line: { color: C.cardBorder, width: 1 },
});

// Timeline line
s7.addShape(pres.ShapeType.rect, {
  x: 0.8, y: 2.7, w: 8.4, h: 0.06,
  fill: { color: C.darkBg }, line: { width: 0 },
});

const milestones = [
  { time: "4月第1周", title: "数据+访谈完成", desc: "定量数据拉取\n5-8家访谈完成", color: C.orange },
  { time: "4月第2周", title: "Top 3问题输出", desc: "分析报告完成\n问题排序确认", color: C.blue },
  { time: "4月第3周", title: "改善计划启动", desc: "90天计划发布\n责任人确认", color: C.teal },
  { time: "7月", title: "90天复盘", desc: "改善效果评估\n季度追踪启动", color: C.green },
];

milestones.forEach((m, i) => {
  const cx = 0.9 + i * 2.25;
  // Dot on timeline
  s7.addShape(pres.ShapeType.ellipse, {
    x: cx + 0.4, y: 2.55, w: 0.35, h: 0.35,
    fill: { color: m.color }, line: { width: 0 },
  });
  // Time label above
  s7.addText(m.time, {
    x: cx - 0.3, y: 1.7, w: 1.75, h: 0.4,
    fontSize: 14, bold: true, color: m.color, fontFace: F, align: "center", margin: 0,
  });
  // Title
  s7.addText(m.title, {
    x: cx - 0.3, y: 2.05, w: 1.75, h: 0.4,
    fontSize: 13, bold: true, color: C.textDark, fontFace: F, align: "center", margin: 0,
  });
  // Description below
  s7.addShape(pres.ShapeType.rect, {
    x: cx - 0.2, y: 3.2, w: 1.55, h: 1.4,
    fill: { color: C.white }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.05,
  });
  s7.addText(m.desc, {
    x: cx - 0.1, y: 3.35, w: 1.35, h: 1.1,
    fontSize: 12, color: "5A5A6A", fontFace: F, align: "center", margin: 0, valign: "top",
  });
});

s7.addText("每个节点有交付物，可追踪可验收", {
  x: 0.65, y: 5.1, w: 8.7, h: 0.35,
  fontSize: 13, color: C.blue, fontFace: F, align: "right", margin: 0,
});

// ==================== Slide 8: 90天改善计划 ====================
const s8 = pres.addSlide();
s8.background = { color: C.cream };

s8.addText("90天改善计划：三个问题，三条闭环", {
  x: 0.65, y: 0.35, w: 8.7, h: 0.6,
  fontSize: 28, bold: true, color: C.textDark, fontFace: F, align: "left", margin: 0,
});
s8.addText("每个问题绑定责任人、时间线和验收标准，不是空喊口号", {
  x: 0.65, y: 0.9, w: 8.7, h: 0.35,
  fontSize: 15, color: C.muted, fontFace: F, align: "left", margin: 0,
});
s8.addShape(pres.ShapeType.line, {
  x: 0.65, y: 1.2, w: 8.7, h: 0,
  line: { color: C.cardBorder, width: 1 },
});

// Table header
s8.addShape(pres.ShapeType.rect, {
  x: 0.4, y: 1.45, w: 9.2, h: 0.55,
  fill: { color: C.darkBg }, line: { width: 0 },
});
const headers = ["", "Top 问题", "责任人", "解决路径", "完成时间", "验收标准"];
const colX = [0.5, 1.1, 2.95, 4.35, 6.55, 8.0];
const colW = [0.55, 1.8, 1.35, 2.15, 1.4, 1.5];
headers.forEach((h, i) => {
  s8.addText(h, {
    x: colX[i], y: 1.5, w: colW[i], h: 0.45,
    fontSize: 13, bold: true, color: C.textLight, fontFace: F, align: "center", valign: "middle", margin: 0,
  });
});

// Table rows
const rows = [
  { num: "1", label: "Top 1（待诊断确认）", color: C.orange },
  { num: "2", label: "Top 2（待诊断确认）", color: C.blue },
  { num: "3", label: "Top 3（待诊断确认）", color: C.teal },
];
rows.forEach((r, i) => {
  const ry = 2.05 + i * 0.95;
  s8.addShape(pres.ShapeType.rect, {
    x: 0.4, y: ry, w: 9.2, h: 0.85,
    fill: { color: i % 2 === 0 ? C.white : "F0EDE8" }, line: { color: C.cardBorder, width: 0.5 },
  });
  // Number badge
  s8.addShape(pres.ShapeType.ellipse, {
    x: 0.6, y: ry + 0.2, w: 0.45, h: 0.45,
    fill: { color: r.color }, line: { width: 0 },
  });
  s8.addText(r.num, {
    x: 0.6, y: ry + 0.2, w: 0.45, h: 0.45,
    fontSize: 16, bold: true, color: C.white, fontFace: F, align: "center", valign: "middle", margin: 0,
  });
  s8.addText(r.label, {
    x: 1.2, y: ry + 0.15, w: 1.65, h: 0.55,
    fontSize: 12, color: C.textDark, fontFace: F, align: "center", valign: "middle", margin: 0,
  });
  s8.addText("[待确认]", {
    x: 3.0, y: ry + 0.15, w: 1.25, h: 0.55,
    fontSize: 12, color: C.muted, fontFace: F, align: "center", valign: "middle", margin: 0,
  });
  s8.addText("[待确认]", {
    x: 4.4, y: ry + 0.15, w: 2.05, h: 0.55,
    fontSize: 12, color: C.muted, fontFace: F, align: "center", valign: "middle", margin: 0,
  });
  s8.addText("90天内", {
    x: 6.6, y: ry + 0.15, w: 1.3, h: 0.55,
    fontSize: 12, bold: true, color: C.textDark, fontFace: F, align: "center", valign: "middle", margin: 0,
  });
  s8.addText("[待确认]", {
    x: 8.05, y: ry + 0.15, w: 1.35, h: 0.55,
    fontSize: 12, color: C.muted, fontFace: F, align: "center", valign: "middle", margin: 0,
  });
});

s8.addText("改善原则：每个问题可追踪、可验收、不可推诿", {
  x: 0.65, y: 5.0, w: 8.7, h: 0.35,
  fontSize: 13, bold: true, color: C.orange, fontFace: F, align: "left", margin: 0,
});

// ==================== Slide 9: 量化目标 ====================
const s9 = pres.addSlide();
s9.background = { color: C.cream };

s9.addText("量化目标：四个指标，效果可衡量", {
  x: 0.65, y: 0.35, w: 8.7, h: 0.6,
  fontSize: 28, bold: true, color: C.textDark, fontFace: F, align: "left", margin: 0,
});
s9.addText("每个改善动作都有对应的量化验收指标", {
  x: 0.65, y: 0.9, w: 8.7, h: 0.35,
  fontSize: 15, color: C.muted, fontFace: F, align: "left", margin: 0,
});
s9.addShape(pres.ShapeType.line, {
  x: 0.65, y: 1.2, w: 8.7, h: 0,
  line: { color: C.cardBorder, width: 1 },
});

const metrics = [
  { value: "≥ 2/3", label: "Top 3问题解决率", desc: "90天内完成改善的问题数", color: C.orange, x: 0.4, y: 1.45 },
  { value: "50%", label: "争议处理周期缩短", desc: "从争议发生到解决的平均天数", color: C.blue, x: 5.05, y: 1.45 },
  { value: "+1分", label: "供应商满意度提升", desc: "建立基线，Q2末评分提升", color: C.teal, x: 0.4, y: 3.35 },
  { value: "30%", label: "跨部门协作效率提升", desc: "需求从提出到解决的天数", color: C.green, x: 5.05, y: 3.35 },
];

metrics.forEach(m => {
  s9.addShape(pres.ShapeType.rect, {
    x: m.x, y: m.y, w: 4.55, h: 1.7,
    fill: { color: C.white }, line: { color: m.color, width: 1.5 }, rectRadius: 0.05,
    shadow: { type: "outer", color: "000000", blur: 6, offset: 1, angle: 135, opacity: 0.06 },
  });
  s9.addText(m.value, {
    x: m.x + 0.25, y: m.y + 0.2, w: 1.8, h: 0.7,
    fontSize: 36, bold: true, color: m.color, fontFace: F, align: "left", valign: "middle", margin: 0,
  });
  s9.addText(m.label, {
    x: m.x + 0.25, y: m.y + 0.9, w: 4.05, h: 0.35,
    fontSize: 16, bold: true, color: C.textDark, fontFace: F, align: "left", margin: 0,
  });
  s9.addText(m.desc, {
    x: m.x + 0.25, y: m.y + 1.25, w: 4.05, h: 0.3,
    fontSize: 12, color: "5A5A6A", fontFace: F, align: "left", margin: 0,
  });
});

s9.addText("每个改善动作都有量化验收，不做无目标的事", {
  x: 0.65, y: 5.1, w: 8.7, h: 0.35,
  fontSize: 13, color: C.blue, fontFace: F, align: "right", margin: 0,
});

// ==================== Slide 10: 季度追踪机制 ====================
const s10 = pres.addSlide();
s10.background = { color: C.cream };

s10.addText("季度追踪机制：让改善效果可持续", {
  x: 0.65, y: 0.35, w: 8.7, h: 0.6,
  fontSize: 28, bold: true, color: C.textDark, fontFace: F, align: "left", margin: 0,
});
s10.addText("改善不是一次性运动，季度追踪确保效果不回退", {
  x: 0.65, y: 0.9, w: 8.7, h: 0.35,
  fontSize: 15, color: C.muted, fontFace: F, align: "left", margin: 0,
});
s10.addShape(pres.ShapeType.line, {
  x: 0.65, y: 1.2, w: 8.7, h: 0,
  line: { color: C.cardBorder, width: 1 },
});

// Circular flow: 4 nodes in a cycle
const cycleNodes = [
  { title: "季度评估", desc: "问卷+数据双线收集", angle: 0 },
  { title: "问题追踪", desc: "Top 3改善进度", angle: 90 },
  { title: "仪表盘更新", desc: "健康度可视化", angle: 180 },
  { title: "改善行动", desc: "新一轮优化或维持", angle: 270 },
];

// Draw cycle as a rounded rectangle flow
const flowItems = [
  { title: "季度评估", desc: "问卷+数据双线", color: C.orange, x: 3.4, y: 1.5 },
  { title: "问题追踪", desc: "Top 3改善进度", color: C.blue, x: 6.4, y: 2.5 },
  { title: "仪表盘更新", desc: "健康度可视化", color: C.teal, x: 3.4, y: 3.5 },
  { title: "改善行动", desc: "新一轮优化", color: C.green, x: 0.5, y: 2.5 },
];

flowItems.forEach((item, i) => {
  s10.addShape(pres.ShapeType.roundRect, {
    x: item.x, y: item.y, w: 3.0, h: 1.6,
    fill: { color: C.white }, line: { color: item.color, width: 2 }, rectRadius: 0.1,
    shadow: { type: "outer", color: "000000", blur: 6, offset: 1, angle: 135, opacity: 0.06 },
  });
  s10.addShape(pres.ShapeType.rect, {
    x: item.x, y: item.y, w: 3.0, h: 0.06,
    fill: { color: item.color }, line: { width: 0 },
  });
  s10.addText(item.title, {
    x: item.x + 0.2, y: item.y + 0.2, w: 2.6, h: 0.5,
    fontSize: 18, bold: true, color: item.color, fontFace: F, align: "left", margin: 0,
  });
  s10.addText(item.desc, {
    x: item.x + 0.2, y: item.y + 0.8, w: 2.6, h: 0.5,
    fontSize: 13, color: "5A5A6A", fontFace: F, align: "left", margin: 0,
  });
});

// Arrows between nodes (simplified with text arrows)
s10.addText("▶", {
  x: 5.8, y: 1.7, w: 0.7, h: 0.5,
  fontSize: 20, color: C.muted, fontFace: F, align: "center", valign: "middle", margin: 0,
});
s10.addText("▼", {
  x: 5.8, y: 3.0, w: 0.7, h: 0.5,
  fontSize: 20, color: C.muted, fontFace: F, align: "center", valign: "middle", margin: 0,
});
s10.addText("◀", {
  x: 3.4, y: 3.0, w: 0.7, h: 0.5,
  fontSize: 20, color: C.muted, fontFace: F, align: "center", valign: "middle", margin: 0,
});
s10.addText("▲", {
  x: 3.4, y: 1.7, w: 0.7, h: 0.5,
  fontSize: 20, color: C.muted, fontFace: F, align: "center", valign: "middle", margin: 0,
});

s10.addText("改善不是运动，是机制", {
  x: 0.65, y: 5.1, w: 8.7, h: 0.35,
  fontSize: 13, bold: true, color: C.orange, fontFace: F, align: "right", margin: 0,
});

// ==================== Slide 11: 风险预案 ====================
const s11 = pres.addSlide();
s11.background = { color: C.cream };

s11.addText("风险预案：四个关键风险已预判", {
  x: 0.65, y: 0.35, w: 8.7, h: 0.6,
  fontSize: 28, bold: true, color: C.textDark, fontFace: F, align: "left", margin: 0,
});
s11.addText("主要风险已预判，每个风险都有具体应对措施", {
  x: 0.65, y: 0.9, w: 8.7, h: 0.35,
  fontSize: 15, color: C.muted, fontFace: F, align: "left", margin: 0,
});
s11.addShape(pres.ShapeType.line, {
  x: 0.65, y: 1.2, w: 8.7, h: 0,
  line: { color: C.cardBorder, width: 1 },
});

const risks = [
  { risk: "供应商不愿说真话", answer: "匿名问卷+私下访谈\n保证\"说了不会有问题\"", color: C.orange },
  { risk: "问题太多无从下手", answer: "严格排序只抓Top 3\n其余放入backlog", color: C.blue },
  { risk: "改善变\"纸上改善\"", answer: "责任人+时间线+季度跟踪\n每个问题可验收", color: C.teal },
  { risk: "暴露内部协作问题", answer: "内部问题单独汇报\n不和供应商反馈混在一起", color: C.green },
];

risks.forEach((r, i) => {
  const ry = 1.45 + i * 0.95;
  // Risk label (left)
  s11.addShape(pres.ShapeType.rect, {
    x: 0.4, y: ry, w: 4.2, h: 0.8,
    fill: { color: "FFF5EB" }, line: { color: r.color, width: 1.5 }, rectRadius: 0.05,
  });
  s11.addShape(pres.ShapeType.rect, {
    x: 0.4, y: ry, w: 0.06, h: 0.8,
    fill: { color: r.color }, line: { width: 0 },
  });
  s11.addText(r.risk, {
    x: 0.65, y: ry + 0.1, w: 3.8, h: 0.6,
    fontSize: 15, bold: true, color: C.textDark, fontFace: F, align: "left", valign: "middle", margin: 0,
  });
  // Arrow
  s11.addText("→", {
    x: 4.6, y: ry + 0.1, w: 0.6, h: 0.6,
    fontSize: 22, color: r.color, fontFace: F, align: "center", valign: "middle", margin: 0,
  });
  // Answer (right)
  s11.addShape(pres.ShapeType.rect, {
    x: 5.2, y: ry, w: 4.4, h: 0.8,
    fill: { color: C.white }, line: { color: C.cardBorder, width: 1 }, rectRadius: 0.05,
  });
  s11.addText(r.answer, {
    x: 5.45, y: ry + 0.05, w: 3.9, h: 0.7,
    fontSize: 13, color: C.textDark, fontFace: F, align: "left", valign: "middle", margin: 0,
  });
});

s11.addText("风险可控，不走一步看一步", {
  x: 0.65, y: 5.1, w: 8.7, h: 0.35,
  fontSize: 13, color: C.blue, fontFace: F, align: "right", margin: 0,
});

// ==================== Slide 12: 请示与下一步 ====================
const s12 = pres.addSlide();
s12.background = { color: C.darkBg };

s12.addText("请示与下一步", {
  x: 0.9, y: 0.8, w: 8.0, h: 0.7,
  fontSize: 36, bold: true, color: C.textLight, fontFace: F, align: "left", margin: 0,
});

s12.addShape(pres.ShapeType.rect, {
  x: 0.9, y: 1.55, w: 1.1, h: 0.07,
  fill: { color: C.orange }, line: { width: 0 },
});

const asks = [
  { num: "01", text: "方案方向是否认可？有无需要调整的地方？", color: C.orange },
  { num: "02", text: "访谈5-8家供应商，是否需要您打招呼？", color: C.blue },
  { num: "03", text: "改善计划涉及跨部门协调时，能否请您出面推动？", color: C.teal },
];

asks.forEach((a, i) => {
  const ay = 1.9 + i * 0.85;
  s12.addShape(pres.ShapeType.rect, {
    x: 0.9, y: ay, w: 8.2, h: 0.65,
    fill: { color: C.sectionBg }, line: { color: C.divider, width: 1 }, rectRadius: 0.05,
  });
  s12.addText(a.num, {
    x: 1.1, y: ay + 0.05, w: 0.5, h: 0.55,
    fontSize: 18, bold: true, color: a.color, fontFace: F, align: "center", valign: "middle", margin: 0,
  });
  s12.addText(a.text, {
    x: 1.7, y: ay + 0.05, w: 7.1, h: 0.55,
    fontSize: 16, color: C.textLight, fontFace: F, align: "left", valign: "middle", margin: 0,
  });
});

// Next step highlight
s12.addShape(pres.ShapeType.rect, {
  x: 0.9, y: 4.35, w: 8.2, h: 0.7,
  fill: { color: C.orange }, line: { width: 0 }, rectRadius: 0.05,
});
s12.addText("下一步：4月第1周立即启动数据收集", {
  x: 0.9, y: 4.35, w: 8.2, h: 0.7,
  fontSize: 20, bold: true, color: C.white, fontFace: F, align: "center", valign: "middle", margin: 0,
});

// ==================== Save ====================
const OUTPUT = BASE + "合作健康度诊断.pptx";
pres.writeFile({ fileName: OUTPUT })
  .then(() => console.log("DONE:", OUTPUT))
  .catch(err => { console.error("Error:", err); process.exit(1); });
