/**
 * Slide 03 - Section Divider (章节分隔页)
 * Section 01: 问题背景与行为模式
 */

const theme = {
  primary: "22223b",    // 深灰 - 标题
  secondary: "4a4e69",  // 中灰 - 正文
  accent: "c9ada7",     // 驼色 - 强调
  light: "9a8c98",      // 浅灰 - 背景点缀
  bg: "f2e9e4"          // 米白 - 背景
};

const slideConfig = {
  type: "section_divider",
  sectionNumber: "01",
  title: "问题背景与行为模式",
  subtitle: "识别表演型预警的本质"
};

function createSlide(pptx) {
  const slide = pptx.addSlide();

  // 背景色
  slide.background = { color: theme.bg };

  // 左侧大号章节编号背景
  slide.addText(slideConfig.sectionNumber, {
    x: 0.5,
    y: 1.5,
    w: 3,
    h: 2,
    fontSize: 120,
    fontFace: "Arial",
    color: theme.accent,
    transparency: 30,
    bold: true,
    align: "left"
  });

  // 章节编号 - 左上角醒目位置
  slide.addShape(pptx.ShapeType.rect, {
    x: 1,
    y: 0.8,
    w: 1.2,
    h: 0.5,
    fill: { color: theme.accent }
  });

  slide.addText(`SECTION ${slideConfig.sectionNumber}`, {
    x: 1,
    y: 0.88,
    w: 1.2,
    h: 0.34,
    fontSize: 12,
    fontFace: "Arial",
    color: theme.bg,
    bold: true,
    align: "center"
  });

  // 主标题
  slide.addText(slideConfig.title, {
    x: 1,
    y: 2.0,
    w: 8,
    h: 1.0,
    fontSize: 32,
    fontFace: "Microsoft YaHei",
    color: theme.primary,
    bold: true,
    align: "left"
  });

  // 副标题
  slide.addText(slideConfig.subtitle, {
    x: 1,
    y: 3.0,
    w: 8,
    h: 0.6,
    fontSize: 16,
    fontFace: "Microsoft YaHei",
    color: theme.secondary,
    align: "left"
  });

  // 底部装饰线条
  slide.addShape(pptx.ShapeType.line, {
    x: 1,
    y: 4.5,
    w: 3,
    h: 0,
    line: { color: theme.accent, width: 2 }
  });

  // 右下角装饰几何图形
  slide.addShape(pptx.ShapeType.ellipse, {
    x: 8.0,
    y: 3.8,
    w: 1.5,
    h: 1.5,
    fill: { color: theme.light, transparency: 50 }
  });

  slide.addShape(pptx.ShapeType.ellipse, {
    x: 8.3,
    y: 4.1,
    w: 0.8,
    h: 0.8,
    fill: { color: theme.accent, transparency: 40 }
  });

  // 页码徽章 - 右下角圆形
  slide.addShape(pptx.ShapeType.ellipse, {
    x: 9.1,
    y: 5.0,
    w: 0.5,
    h: 0.5,
    fill: { color: theme.accent }
  });

  slide.addText("3", {
    x: 9.1,
    y: 5.08,
    w: 0.5,
    h: 0.34,
    fontSize: 14,
    fontFace: "Arial",
    color: theme.bg,
    bold: true,
    align: "center"
  });

  return slide;
}

// Standalone preview code
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createSlide, slideConfig, theme };
}

export { createSlide, slideConfig, theme };
