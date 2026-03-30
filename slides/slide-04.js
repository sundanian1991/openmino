// slide-04.js - 供应商困境（问题部分）
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 4,
  section: '问题 · 是什么',
  title: '供应商夹层困境',
  cycle: '增长的产能被抹杀 → 不愿投入 → 产能更低 → 更有理由压价（恶性循环）'
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
    fontSize: 28, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  // Two-column squeeze visualization
  // Left box: 服务组
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.7, w: 2.5, h: 2.2,
    fill: { color: "FFFFFF" },
    line: { color: theme.light, width: 1.5 }
  });

  slide.addText('服务组', {
    x: 0.5, y: 1.7, w: 2.5, h: 0.4,
    fontSize: 11, fontFace: "Microsoft YaHei",
    color: theme.light, bold: true,
    align: "center", valign: "middle"
  });

  slide.addText('要求\n质量提升', {
    x: 0.5, y: 2.2, w: 2.5, h: 1.6,
    fontSize: 13, fontFace: "Microsoft YaHei",
    color: theme.primary,
    align: "center", valign: "middle"
  });

  // Right box: 策略组
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 7, y: 1.7, w: 2.5, h: 2.2,
    fill: { color: "FFFFFF" },
    line: { color: theme.accent, width: 1.5 }
  });

  slide.addText('策略组', {
    x: 7, y: 1.7, w: 2.5, h: 0.4,
    fontSize: 11, fontFace: "Microsoft YaHei",
    color: theme.accent, bold: true,
    align: "center", valign: "middle"
  });

  slide.addText('压降\n价格', {
    x: 7, y: 2.2, w: 2.5, h: 1.6,
    fontSize: 13, fontFace: "Microsoft YaHei",
    color: theme.primary,
    align: "center", valign: "middle"
  });

  // Arrows pointing inward
  slide.addShape(pres.shapes.LINE, {
    x: 3.1, y: 2.8, w: 1, h: 0,
    line: { color: theme.secondary, width: 2 }
  });
  slide.addText('→', {
    x: 3.2, y: 2.6, w: 0.5, h: 0.4,
    fontSize: 20, fontFace: "Arial",
    color: theme.secondary
  });

  slide.addShape(pres.shapes.LINE, {
    x: 5.9, y: 2.8, w: 1, h: 0,
    line: { color: theme.secondary, width: 2 }
  });
  slide.addText('←', {
    x: 5.9, y: 2.6, w: 0.5, h: 0.4,
    fontSize: 20, fontFace: "Arial",
    color: theme.secondary
  });

  // Center: 供应商
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 3.8, y: 2.3, w: 2, h: 1.2,
    fill: { color: "FFF5F2" },
    rectRadius: 0.1,
    line: { color: theme.accent, width: 2 }
  });

  slide.addText('供应商', {
    x: 3.8, y: 2.3, w: 2, h: 0.4,
    fontSize: 13, fontFace: "Microsoft YaHei",
    color: theme.accent, bold: true,
    align: "center", valign: "middle"
  });

  slide.addText('两头挤压\n无处发力', {
    x: 3.8, y: 2.75, w: 2, h: 0.6,
    fontSize: 11, fontFace: "Microsoft YaHei",
    color: theme.primary,
    align: "center", valign: "middle"
  });

  // Vicious cycle at bottom
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.2, w: 9, h: 0.8,
    fill: { color: "FFFFFF" },
    line: { color: theme.light, width: 1 }
  });

  slide.addText('恶性循环', {
    x: 0.7, y: 4.3, w: 8.6, h: 0.25,
    fontSize: 9, fontFace: "Microsoft YaHei",
    color: theme.light, bold: true
  });

  slide.addText(slideConfig.cycle, {
    x: 0.7, y: 4.55, w: 8.6, h: 0.35,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: theme.primary
  });

  // Page number badge
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: theme.accent }
  });
  slide.addText("4", {
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
