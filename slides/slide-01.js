// slide-01.js - 封面页（重构版）
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'cover',
  index: 1,
  title: '权责不对等',
  subtitle: '策略组与服务组结构性困境分析',
  meta: '2026-03-29 | 供应商管理岗'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 左侧大色块 - 视觉锚点
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.8, h: 5.625,
    fill: { color: theme.accent }
  });

  // 主标题 - 大字号，靠近左侧色块
  slide.addText(slideConfig.title, {
    x: 1.3, y: 1.8, w: 7, h: 2,
    fontSize: 64, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  // 副标题 - 增加左侧装饰线
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 1.3, y: 3.6, w: 0.15, h: 0.8,
    fill: { color: theme.accent }
  });

  slide.addText(slideConfig.subtitle, {
    x: 1.6, y: 3.7, w: 6, h: 0.6,
    fontSize: 18, fontFace: "Microsoft YaHei",
    color: theme.secondary
  });

  // Meta 信息 - 放在底部，增加分隔线
  slide.addShape(pres.shapes.LINE, {
    x: 1.3, y: 4.5, w: 3, h: 0,
    line: { color: theme.light, width: 1 }
  });

  slide.addText(slideConfig.meta, {
    x: 1.3, y: 4.7, w: 6, h: 0.3,
    fontSize: 11, fontFace: "Microsoft YaHei",
    color: theme.light
  });

  // 右下角装饰小元素
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 8.5, y: 5, w: 1, h: 0.1,
    fill: { color: theme.accent }
  });

  return slide;
}

module.exports = { createSlide, slideConfig };
