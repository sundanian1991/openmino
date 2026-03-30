// slide-06.js - 权责模型（根因部分）
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 6,
  section: '根因 · 为什么',
  title: '权责不对等模型'
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
    color: theme.secondary, bold: true
  });

  // Title
  slide.addText(slideConfig.title, {
    x: 0.5, y: 0.9, w: 9, h: 0.6,
    fontSize: 28, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  // Vertical flow diagram
  // Top box: 服务组
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 1, y: 1.7, w: 8, h: 1.3,
    fill: { color: "FFFFFF" },
    line: { color: theme.light, width: 2 }
  });

  // Left accent bar (gray = constraint)
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 1, y: 1.7, w: 0.15, h: 1.3,
    fill: { color: theme.light }
  });

  slide.addText('执行侧 · 服务组', {
    x: 1.3, y: 1.8, w: 7.5, h: 0.35,
    fontSize: 11, fontFace: "Microsoft YaHei",
    color: theme.light, bold: true,
    align: "left", valign: "middle"
  });

  slide.addText('承担供应商稳定结果', {
    x: 1.3, y: 2.2, w: 7.5, h: 0.22,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: theme.primary
  });
  slide.addText('没有定价决策权', {
    x: 1.3, y: 2.45, w: 7.5, h: 0.22,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: theme.primary
  });
  slide.addText('承担流失风险', {
    x: 1.3, y: 2.7, w: 7.5, h: 0.22,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: theme.primary
  });

  // Arrow down
  slide.addText('⬇', {
    x: 4.7, y: 3.05, w: 0.6, h: 0.3,
    fontSize: 18, fontFace: "Arial",
    color: theme.secondary
  });
  slide.addText('执行责任共担，但决策权不对等', {
    x: 2.8, y: 3.1, w: 4.4, h: 0.25,
    fontSize: 9, fontFace: "Microsoft YaHei",
    color: theme.secondary, italic: true,
    align: "center"
  });

  // Bottom box: 策略组
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 1, y: 3.4, w: 8, h: 1.3,
    fill: { color: "FFFFFF" },
    line: { color: theme.accent, width: 2 }
  });

  // Left accent bar (accent = power)
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 1, y: 3.4, w: 0.15, h: 1.3,
    fill: { color: theme.accent }
  });

  slide.addText('决策侧 · 策略组', {
    x: 1.3, y: 3.5, w: 7.5, h: 0.35,
    fontSize: 11, fontFace: "Microsoft YaHei",
    color: theme.accent, bold: true,
    align: "left", valign: "middle"
  });

  slide.addText('掌握定价权', {
    x: 1.3, y: 3.9, w: 7.5, h: 0.22,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: theme.primary
  });
  slide.addText('KPI 是费效比优化', {
    x: 1.3, y: 4.15, w: 7.5, h: 0.22,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: theme.primary
  });
  slide.addText('压降价格 = 达成目标', {
    x: 1.3, y: 4.4, w: 7.5, h: 0.22,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: theme.primary
  });

  // Page number badge
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: theme.accent }
  });
  slide.addText("6", {
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
