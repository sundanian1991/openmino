// geist-13.js — Section Divider: 05 情感与语义
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'section-divider',
  index: 13,
  title: '情感与语义'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addShape('rect', {
    x: 0, y: 0, w: 0.35, h: 5.625,
    fill: { color: theme.accent }
  });

  slide.addText('05', {
    x: 0.9, y: 1.4, w: 3, h: 1.5,
    fontSize: 96, fontFace: "Arial",
    color: theme.light, bold: true
  });

  slide.addText('情感与语义', {
    x: 0.9, y: 3.1, w: 8, h: 0.8,
    fontSize: 44, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  slide.addText('色彩心理学 · 竞品对比 · 语调映射', {
    x: 0.9, y: 4.0, w: 8, h: 0.4,
    fontSize: 16, fontFace: "Microsoft YaHei",
    color: theme.secondary, italic: true
  });

  slide.addShape('rect', {
    x: 0.9, y: 4.55, w: 2, h: 0.04,
    fill: { color: theme.accent }
  });

  // 装饰圆
  slide.addShape('ellipse', {
    x: 8.2, y: 0.5, w: 1.2, h: 1.2,
    fill: { color: theme.accent, transparency: 85 }
  });
  slide.addShape('ellipse', {
    x: 7.5, y: 3.8, w: 0.8, h: 0.8,
    fill: { color: theme.secondary, transparency: 88 }
  });

  slide.addShape('roundRect', {
    x: 9.3, y: 5.15, w: 0.5, h: 0.3,
    fill: { color: theme.light }, rectRadius: 0.05
  });
  slide.addText('13', {
    x: 9.3, y: 5.18, w: 0.5, h: 0.25,
    fontSize: 11, fontFace: "Arial",
    color: theme.secondary, align: "center"
  });

  return slide;
}

module.exports = { createSlide, slideConfig };
