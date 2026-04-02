// slide-13.js - Section Divider: 04 实战应用
// Anthropic-Geist Design Style Training

const pptxgen = require('pptxgenjs');

const theme = {
  primary: "3D2C29",
  secondary: "CA6641",
  accent: "E2725B",
  light: "C5C1BE",
  bg: "F5F1EE"
};

function createSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // Left accent block
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.35, h: 5.625,
    fill: { color: theme.accent }
  });

  // Section number - large display
  slide.addText('04', {
    x: 0.8, y: 1.2, w: 3, h: 1.0,
    fontSize: 60, fontFace: "Arial",
    color: theme.accent, bold: true,
    align: "left"
  });

  // Section title
  slide.addText('实战应用', {
    x: 0.8, y: 2.3, w: 8, h: 0.7,
    fontSize: 36, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true,
    align: "left"
  });

  // Intro line
  slide.addText('Prompt 模板 \u00B7 设计检查清单', {
    x: 0.8, y: 3.1, w: 8, h: 0.4,
    fontSize: 16, fontFace: "Microsoft YaHei",
    color: theme.light,
    align: "left"
  });

  // Decorative line under intro
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 3.65, w: 2.5, h: 0.04,
    fill: { color: theme.secondary }
  });

  // Decorative circle top-right
  slide.addShape(pres.shapes.OVAL, {
    x: 8.2, y: 0.5, w: 1.2, h: 1.2,
    fill: { color: theme.accent, transparency: 85 }
  });

  // Decorative circle bottom-right
  slide.addShape(pres.shapes.OVAL, {
    x: 7.5, y: 3.8, w: 0.8, h: 0.8,
    fill: { color: theme.secondary, transparency: 88 }
  });

  // Page badge
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 9.3, y: 5.1, w: 0.45, h: 0.28,
    fill: { color: theme.primary },
    rectRadius: 0.04
  });
  slide.addText('13', {
    x: 9.3, y: 5.1, w: 0.45, h: 0.28,
    fontSize: 10, fontFace: "Arial",
    color: "FFFFFF",
    align: "center", valign: "middle"
  });

  return slide;
}

module.exports = { createSlide, theme };
