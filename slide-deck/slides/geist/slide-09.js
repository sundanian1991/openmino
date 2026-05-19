// slide-09.js - Section Divider: 线条与构图
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'section-divider',
  index: 9,
  sectionNum: '03',
  sectionTitle: '线条与构图',
  sectionIntro: '手绘规则 · 网格系统 · 标志性元素'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 左侧强调色块 0.4" 宽、全高
  slide.addShape('rect', {
    x: 0, y: 0, w: 0.4, h: 5.625,
    fill: { color: theme.accent },
    line: { color: theme.accent, width: 0 }
  });

  // 大章节号 theme.light
  slide.addText(slideConfig.sectionNum, {
    x: 0.9, y: 1.4, w: 2.2, h: 1.6,
    fontSize: 96, fontFace: "Arial",
    color: theme.light, bold: true, align: "left"
  });

  // 章节标题 theme.primary
  slide.addText(slideConfig.sectionTitle, {
    x: 0.9, y: 3.2, w: 8, h: 0.8,
    fontSize: 36, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true, align: "left"
  });

  // 章节引言
  slide.addText(slideConfig.sectionIntro, {
    x: 0.9, y: 4.1, w: 8, h: 0.5,
    fontSize: 16, fontFace: "Microsoft YaHei",
    color: theme.secondary, align: "left"
  });

  // 页码徽章
  slide.addShape('rect', {
    x: 9.3, y: 5.1, w: 0.5, h: 0.35,
    fill: { color: theme.light },
    line: { color: theme.light, width: 0 }
  });
  slide.addText('09', {
    x: 9.3, y: 5.15, w: 0.5, h: 0.3,
    fontSize: 12, fontFace: "Arial",
    color: theme.secondary, align: "center"
  });

  return slide;
}

module.exports = { createSlide, slideConfig };
