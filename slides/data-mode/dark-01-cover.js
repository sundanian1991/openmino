// dark-01-cover.js - 封面页
// 设计：Dark Premium Consulting - 深色高端咨询风

const pptxgen = require('pptxgenjs');

// 深色高端咨询配色
const theme = {
  bg: "1a1a2e",        // 深蓝黑背景
  surface: "16213e",   // 深蓝表面
  primary: "eaeaea",   // 亮白文字
  secondary: "a0a0a0", // 灰白副标题
  accent: "c9a962",    // 青铜金强调
  accentLight: "e8d8a8" // 浅金
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 顶部装饰线
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.08,
    fill: { color: theme.accent }
  });

  // 左侧竖条装饰
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.5, w: 0.08, h: 3.5,
    fill: { color: theme.accent }
  });

  // 主标题
  slide.addText('如何应对职场"带节奏"', {
    x: 0.8, y: 1.5, w: 8.5, h: 1.2,
    fontSize: 44, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true,
    align: "left"
  });

  // 副标题
  slide.addText('刘乾坤开门红激励预警事件深度分析', {
    x: 0.8, y: 2.8, w: 8.5, h: 0.6,
    fontSize: 18, fontFace: "Microsoft YaHei",
    color: theme.secondary,
    align: "left"
  });

  // 版本标签
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 3.8, w: 1.0, h: 0.35,
    fill: { color: theme.accent }
  });
  slide.addText('v3.0', {
    x: 0.8, y: 3.8, w: 1.0, h: 0.35,
    fontSize: 12, fontFace: "Arial",
    color: theme.bg, bold: true,
    align: "center", valign: "middle"
  });

  // 底部信息栏
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 5.55, w: 10, h: 0.07,
    fill: { color: theme.surface }
  });

  // 页码
  slide.addText('1', {
    x: 9.6, y: 5.45, w: 0.3, h: 0.3,
    fontSize: 11, fontFace: "Arial",
    color: theme.secondary,
    align: "right"
  });

  return slide;
}

module.exports = { createSlide, theme };
