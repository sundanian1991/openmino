// geist-05.js — Section Divider: 02 色彩系统
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'section-divider',
  index: 5,
  title: '色彩系统'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addShape('rect', {
    x: 0, y: 0, w: 0.35, h: 5.625,
    fill: { color: theme.accent }
  });

  slide.addText('02', {
    x: 0.9, y: 1.4, w: 3, h: 1.5,
    fontSize: 96, fontFace: "Arial",
    color: theme.light, bold: true
  });

  slide.addText('色彩系统', {
    x: 0.9, y: 3.1, w: 8, h: 0.8,
    fontSize: 44, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  slide.addText('陶土色家族 · 辅助色 · 中性色 · 点缀色', {
    x: 0.9, y: 4.0, w: 8, h: 0.4,
    fontSize: 16, fontFace: "Microsoft YaHei",
    color: theme.secondary, italic: true
  });

  slide.addShape('rect', {
    x: 0.9, y: 4.55, w: 2, h: 0.04,
    fill: { color: theme.accent }
  });

  slide.addShape('roundRect', {
    x: 9.3, y: 5.15, w: 0.5, h: 0.3,
    fill: { color: theme.light }, rectRadius: 0.05
  });
  slide.addText('05', {
    x: 9.3, y: 5.18, w: 0.5, h: 0.25,
    fontSize: 11, fontFace: "Arial",
    color: theme.secondary, align: "center"
  });

  return slide;
}

module.exports = { createSlide, slideConfig };
