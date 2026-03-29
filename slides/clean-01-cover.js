// clean-01-cover.js - 封面页
// 设计：极致简洁白 - 纯白背景 + 黑色文字 + 红色强调

const pptxgen = require('pptxgenjs');

// 极致简洁配色
const theme = {
  bg: "FFFFFF",        // 纯白背景
  primary: "000000",   // 纯黑标题
  secondary: "666666", // 深灰副标题
  accent: "D70015",    // 正红强调（中国红）
  light: "F5F5F5"      // 极浅灰分隔
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 顶部红色强调线
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.5, w: 1.5, h: 0.08,
    fill: { color: theme.accent }
  });

  // 主标题
  slide.addText('如何应对职场"带节奏"', {
    x: 0.5, y: 1.3, w: 9, h: 0.9,
    fontSize: 36, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true,
    align: "left"
  });

  // 副标题
  slide.addText('刘乾坤开门红激励预警事件深度分析', {
    x: 0.5, y: 2.3, w: 9, h: 0.4,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: theme.secondary,
    align: "left"
  });

  // 版本标签
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.0, w: 0.7, h: 0.24,
    fill: { color: theme.primary }
  });
  slide.addText('v4.0', {
    x: 0.5, y: 3.0, w: 0.7, h: 0.24,
    fontSize: 10, fontFace: "Arial",
    color: theme.bg, bold: true,
    align: "center", valign: "middle"
  });

  // 底部装饰线
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 5.3, w: 9, h: 0.02,
    fill: { color: theme.light }
  });

  // 页码
  slide.addText('01', {
    x: 9.2, y: 5.25, w: 0.3, h: 0.3,
    fontSize: 10, fontFace: "Arial",
    color: theme.secondary,
    align: "right"
  });

  return slide;
}

module.exports = { createSlide, theme };
