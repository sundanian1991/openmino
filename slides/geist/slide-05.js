// slide-05.js - Section Divider: 色彩系统
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'section-divider',
  index: 5,
  sectionNum: '02',
  sectionTitle: '色彩系统'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 左侧色块 — 与 slide-03 相同风格
  slide.addShape('rect', {
    x: 0, y: 0, w: 0.15, h: 5.625,
    fill: { color: theme.accent },
    line: { color: theme.accent, width: 0 }
  });

  // 大章节号
  slide.addText(slideConfig.sectionNum, {
    x: 0.8, y: 1.5, w: 2, h: 1.5,
    fontSize: 96, fontFace: "Arial",
    color: theme.accent, bold: true, align: "left"
  });

  // 章节标题
  slide.addText(slideConfig.sectionTitle, {
    x: 0.8, y: 3.2, w: 8, h: 0.8,
    fontSize: 36, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true, align: "left"
  });

  // 副标题
  slide.addText('陶土色家族 · 辅助色 · 中性色 · 点缀色', {
    x: 0.8, y: 4.1, w: 8, h: 0.5,
    fontSize: 16, fontFace: "Microsoft YaHei",
    color: theme.secondary, align: "left"
  });

  // 页码徽章
  slide.addShape('rect', {
    x: 9.3, y: 5.1, w: 0.5, h: 0.35,
    fill: { color: theme.light },
    line: { color: theme.light, width: 0 }
  });
  slide.addText('05', {
    x: 9.3, y: 5.15, w: 0.5, h: 0.3,
    fontSize: 12, fontFace: "Arial",
    color: theme.secondary, align: "center"
  });

  return slide;
}

module.exports = { createSlide, slideConfig };
