// new-01-cover.js - 封面页
// 设计：Luxury & Mysterious - 冷紫调高端咨询感

const pptxgen = require('pptxgenjs');

const theme = {
  primary: "22223b",    // 深蓝灰 - 标题
  secondary: "4a4e69",  // 冷灰 - 正文
  accent: "c9ada7",     // 暖灰粉 - 强调
  light: "9a8c98",      // 冷紫灰 - 装饰
  bg: "f2e9e4"          // 暖米白 - 背景
};

const slideConfig = {
  type: 'cover',
  title: '如何应对职场"带节奏"',
  subtitle: '刘乾坤开门红激励预警事件深度分析',
  version: 'v3.0'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 背景装饰 - 左上角大圆
  slide.addShape(pres.shapes.OVAL, {
    x: -1.5, y: -1.5, w: 4, h: 4,
    fill: { color: theme.accent, transparency: 85 }
  });

  // 背景装饰 - 右下角中圆
  slide.addShape(pres.shapes.OVAL, {
    x: 7, y: 3.5, w: 3, h: 3,
    fill: { color: theme.light, transparency: 80 }
  });

  // 背景装饰 - 右上角小圆
  slide.addShape(pres.shapes.OVAL, {
    x: 8.5, y: 0.5, w: 1.2, h: 1.2,
    fill: { color: theme.accent, transparency: 70 }
  });

  // 左侧装饰条
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.3, y: 0.5, w: 0.15, h: 2,
    fill: { color: theme.accent }
  });

  // 主标题
  slide.addText(slideConfig.title, {
    x: 0.8, y: 1.8, w: 8.5, h: 1.2,
    fontSize: 42, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true,
    align: "left"
  });

  // 副标题
  slide.addText(slideConfig.subtitle, {
    x: 0.8, y: 3.0, w: 8.5, h: 0.6,
    fontSize: 20, fontFace: "Microsoft YaHei",
    color: theme.secondary,
    align: "left"
  });

  // 版本号标签
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 4.0, w: 1.2, h: 0.35,
    fill: { color: theme.accent },
    rectRadius: 0.15
  });
  slide.addText(slideConfig.version, {
    x: 0.8, y: 4.0, w: 1.2, h: 0.35,
    fontSize: 12, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  // 底部装饰线
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 5.55, w: 10, h: 0.07,
    fill: { color: theme.light }
  });

  // 页码徽章
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: theme.accent }
  });
  slide.addText("1", {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fontSize: 12, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  return slide;
}

module.exports = { createSlide, slideConfig };
