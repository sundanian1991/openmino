// 11-cover.js - 封面页
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'cover',
  index: 11,
  title: '应对策略：如何处理职场"带节奏"',
  subtitle: '基于刘乾坤事件的分析与应对',
  version: 'v2.0'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 装饰圆 - 左上角
  slide.addShape(pres.shapes.OVAL, {
    x: -1, y: -1, w: 3, h: 3,
    fill: { color: theme.accent, transparency: 80 }
  });

  // 装饰圆 - 右下角
  slide.addShape(pres.shapes.OVAL, {
    x: 8, y: 4, w: 2.5, h: 2.5,
    fill: { color: theme.accent, transparency: 85 }
  });

  // 装饰线条 - 左侧竖线
  slide.addShape(pres.shapes.LINE, {
    x: 0.3, y: 0.5, w: 0.15, h: 1.5,
    line: { color: theme.accent, width: 3 }
  });

  // 主标题
  slide.addText('应对策略：如何处理职场"带节奏"', {
    x: 0.8, y: 1.8, w: 8.5, h: 1.5,
    fontSize: 40, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true,
    align: "left", valign: "middle"
  });

  // 副标题
  slide.addText('基于刘乾坤事件的分析与应对', {
    x: 0.8, y: 3.2, w: 8.5, h: 0.8,
    fontSize: 24, fontFace: "Microsoft YaHei",
    color: theme.secondary,
    align: "left", valign: "middle"
  });

  // 版本号标签 - 驼色背景
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 4.3, w: 1.2, h: 0.4,
    fill: { color: theme.accent },
    rectRadius: 0.2
  });
  slide.addText('v2.0', {
    x: 0.8, y: 4.3, w: 1.2, h: 0.4,
    fontSize: 14, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  // 底部装饰线
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 5.5, w: 10, h: 0.08,
    fill: { color: theme.accent }
  });

  return slide;
}

// Standalone preview
if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = {
    primary: "22223b",
    secondary: "4a4e69",
    accent: "c9ada7",
    light: "9a8c98",
    bg: "f2e9e4"
  };
  createSlide(pres, theme);
  pres.writeFile({ fileName: "11-cover-preview.pptx" });
}

module.exports = { createSlide, slideConfig };
