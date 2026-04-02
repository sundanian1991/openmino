// slide-03.js - Section Divider: 风格 DNA
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'section-divider',
  index: 3,
  sectionNum: '01',
  sectionTitle: '风格 DNA'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // Left accent block: 0.4" wide, full height
  slide.addShape('rect', {
    x: 0, y: 0, w: 0.4, h: 5.625,
    fill: { color: theme.accent },
    line: { color: theme.accent, width: 0 }
  });

  // Section number: 96pt bold, theme.light color, top area
  slide.addText(slideConfig.sectionNum, {
    x: 0.9, y: 1.0, w: 3, h: 1.6,
    fontSize: 96, fontFace: "Arial",
    color: theme.light, bold: true, align: "left"
  });

  // Section title: 44pt bold, theme.primary
  slide.addText(slideConfig.sectionTitle, {
    x: 0.9, y: 3.0, w: 8, h: 0.9,
    fontSize: 44, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true, align: "left"
  });

  // Intro: 16pt, theme.secondary, italic
  slide.addText('人文温度 × 技术精度 × 极简克制', {
    x: 0.9, y: 4.1, w: 8, h: 0.5,
    fontSize: 16, fontFace: "Microsoft YaHei",
    color: theme.secondary, italic: true, align: "left"
  });

  // Page number badge at x:9.3, y:5.1
  slide.addShape('rect', {
    x: 9.3, y: 5.1, w: 0.5, h: 0.35,
    fill: { color: theme.light },
    line: { color: theme.light, width: 0 },
    rectRadius: 0.05
  });
  slide.addText('03', {
    x: 9.3, y: 5.15, w: 0.5, h: 0.3,
    fontSize: 12, fontFace: "Arial",
    color: theme.secondary, align: "center"
  });

  return slide;
}

module.exports = { createSlide, slideConfig };
