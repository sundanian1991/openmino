/**
 * Slide 01 - Cover (封面)
 * 应对策略：如何处理职场"带节奏"
 * 设计模式：咨询模式 + Luxury & Mysterious 配色
 */

// Luxury & Mysterious 配色 - 冷紫调高端咨询感
const theme = {
  primary: "22223b",    // 深蓝灰 - 标题（比纯黑更有质感）
  secondary: "4a4e69",  // 冷灰 - 正文
  accent: "c9ada7",     // 暖灰粉 - 强调（低饱和，克制）
  light: "9a8c98",      // 冷紫灰 - 装饰
  bg: "f2e9e4"          // 暖米白 - 背景
};

const slideConfig = {
  type: "cover",
  title: "应对策略：如何处理职场'带节奏'",
  subtitle: "基于刘乾坤事件的分析与应对",
  version: "v2.1"
};

function createSlide(pptx) {
  const slide = pptx.addSlide();

  // 背景色
  slide.background = { color: theme.bg };

  // 左上角装饰圆 - 半透明驼色
  slide.addShape(pptx.ShapeType.ellipse, {
    x: -0.5,
    y: -0.5,
    w: 3.5,
    h: 3.5,
    fill: { color: theme.accent, transparency: 85 }
  });

  // 右上角小装饰圆
  slide.addShape(pptx.ShapeType.ellipse, {
    x: 8.8,
    y: 0.3,
    w: 0.8,
    h: 0.8,
    fill: { color: theme.accent, transparency: 70 }
  });

  // 主标题
  slide.addText(slideConfig.title, {
    x: 1,
    y: 1.8,
    w: 8,
    h: 1.2,
    fontSize: 32,
    fontFace: "Microsoft YaHei",
    color: theme.primary,
    bold: true,
    align: "left"
  });

  // 副标题
  slide.addText(slideConfig.subtitle, {
    x: 1,
    y: 3.2,
    w: 8,
    h: 0.6,
    fontSize: 16,
    fontFace: "Microsoft YaHei",
    color: theme.secondary,
    align: "left"
  });

  // 版本号
  slide.addText(slideConfig.version, {
    x: 1,
    y: 4.2,
    w: 2,
    h: 0.4,
    fontSize: 12,
    fontFace: "Arial",
    color: theme.accent,
    bold: true,
    align: "left"
  });

  // 底部装饰线条 - 左侧
  slide.addShape(pptx.ShapeType.line, {
    x: 1,
    y: 5.0,
    w: 2,
    h: 0,
    line: { color: theme.accent, width: 2 }
  });

  // 底部装饰线条 - 右侧
  slide.addShape(pptx.ShapeType.line, {
    x: 7,
    y: 5.0,
    w: 2,
    h: 0,
    line: { color: theme.light, width: 1 }
  });

  // 右下角装饰圆点
  slide.addShape(pptx.ShapeType.ellipse, {
    x: 8.5,
    y: 4.8,
    w: 0.4,
    h: 0.4,
    fill: { color: theme.accent }
  });

  return slide;
}

// Standalone preview code
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createSlide, slideConfig, theme };
}

export { createSlide, slideConfig, theme };
