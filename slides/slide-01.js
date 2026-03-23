// slide-01.js - 封面
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'cover',
  index: 1,
  title: '李诞的AI养虾指南',
  subtitle: '把AI养成"个人风格智能体"的方法论'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 装饰线 - 顶部
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.08,
    fill: { color: theme.accent }
  });

  // 主标题
  slide.addText(slideConfig.title, {
    x: 0.5, y: 1.8, w: 9, h: 1.2,
    fontSize: 52, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true, align: "center"
  });

  // 副标题
  slide.addText(slideConfig.subtitle, {
    x: 0.5, y: 3.2, w: 9, h: 0.6,
    fontSize: 20, fontFace: "Microsoft YaHei",
    color: theme.secondary, align: "center"
  });

  // 装饰线 - 底部
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 3.5, y: 4.2, w: 3, h: 0.03,
    fill: { color: theme.accent }
  });

  // 底部装饰
  slide.addText("演示模式 · 优雅文艺", {
    x: 0.5, y: 5.0, w: 9, h: 0.4,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: theme.accent, align: "center"
  });

  return slide;
}

if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = {
    primary: "2D2D2D",
    secondary: "666666",
    accent: "C4B5A3",
    light: "E5E5E5",
    bg: "FAF9F6"
  };
  createSlide(pres, theme);
  pres.writeFile({ fileName: "slide-01-preview.pptx" });
}

module.exports = { createSlide, slideConfig };
