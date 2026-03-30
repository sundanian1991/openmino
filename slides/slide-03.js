// slide-03.js - 核心问题（问题部分）
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 3,
  section: '问题 · 是什么',
  title: '核心问题',
  statement: '执行责任共担，但决策权仍偏策略组',
  subtitle: '这不是沟通问题，是权力结构问题'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 顶部装饰线
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.1,
    fill: { color: theme.accent }
  });

  // Section label
  slide.addText(slideConfig.section, {
    x: 0.5, y: 0.5, w: 9, h: 0.3,
    fontSize: 11, fontFace: "Microsoft YaHei",
    color: theme.light, bold: true
  });

  // Title
  slide.addText(slideConfig.title, {
    x: 0.5, y: 0.9, w: 9, h: 0.6,
    fontSize: 32, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  // Main statement - large, centered
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.8, w: 9, h: 1.5,
    fill: { color: "FFFFFF" },
    rectRadius: 0.1,
    line: { color: theme.accent, width: 2 }
  });

  slide.addText(slideConfig.statement, {
    x: 0.8, y: 2.1, w: 8.4, h: 0.9,
    fontSize: 22, fontFace: "Microsoft YaHei",
    color: theme.accent, bold: true,
    align: "center", valign: "middle"
  });

  // Subtitle
  slide.addText(slideConfig.subtitle, {
    x: 0.5, y: 3.5, w: 9, h: 0.4,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: theme.secondary, italic: true,
    align: "center"
  });

  // Three key symptoms
  const symptoms = [
    '供应商夹在中间为难',
    '执行侧承担结果但缺少决策权',
    '决策侧掌握定价权但不承担流失风险'
  ];

  symptoms.forEach((s, i) => {
    const y = 4.1 + i * 0.35;

    slide.addShape(pres.shapes.OVAL, {
      x: 0.5 + i * 0.15, y: y + 0.12, w: 0.08, h: 0.08,
      fill: { color: theme.accent }
    });

    slide.addText(s, {
      x: 0.7 + i * 0.15, y: y, w: 8.5, h: 0.3,
      fontSize: 12, fontFace: "Microsoft YaHei",
      color: theme.primary
    });
  });

  // Page number badge
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: theme.accent }
  });
  slide.addText("3", {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fontSize: 12, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  // Footer
  slide.addText('权责不对等分析', {
    x: 0.5, y: 5.1, w: 4, h: 0.3,
    fontSize: 10, fontFace: "Microsoft YaHei",
    color: theme.light
  });

  return slide;
}

module.exports = { createSlide, slideConfig };
