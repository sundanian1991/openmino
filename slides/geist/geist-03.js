// geist-03.js — Section Divider: 01 风格 DNA
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'section-divider',
  index: 3,
  title: '风格 DNA'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 左侧色块
  slide.addShape('rect', {
    x: 0, y: 0, w: 0.35, h: 5.625,
    fill: { color: theme.accent }
  });

  // 大章节号
  slide.addText('01', {
    x: 0.9, y: 1.2, w: 3, h: 1.5,
    fontSize: 96, fontFace: "Arial",
    color: theme.light, bold: true
  });

  // 标题
  slide.addText('风格 DNA', {
    x: 0.9, y: 2.9, w: 8, h: 0.9,
    fontSize: 44, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  // 副标题
  slide.addText('人文温度 × 技术精度 × 极简克制', {
    x: 0.9, y: 3.9, w: 8, h: 0.5,
    fontSize: 18, fontFace: "Microsoft YaHei",
    color: theme.secondary, italic: true
  });

  // 装饰线
  slide.addShape('rect', {
    x: 0.9, y: 4.5, w: 2, h: 0.04,
    fill: { color: theme.accent }
  });

  // 页码
  slide.addShape('roundRect', {
    x: 9.3, y: 5.15, w: 0.5, h: 0.3,
    fill: { color: theme.light }, rectRadius: 0.05
  });
  slide.addText('03', {
    x: 9.3, y: 5.18, w: 0.5, h: 0.25,
    fontSize: 11, fontFace: "Arial",
    color: theme.secondary, align: "center"
  });

  return slide;
}

module.exports = { createSlide, slideConfig };
