// 13-section-01.js - 章节分隔页
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'section_divider',
  index: 13,
  sectionNumber: '01',
  sectionTitle: '问题背景与行为模式'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 左侧驼色色块 - 占据左侧 1/3
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 3.5, h: 5.625,
    fill: { color: theme.accent }
  });

  // 色块上的章节号 - 大号白色数字
  slide.addText('01', {
    x: 0.3, y: 0.5, w: 2.8, h: 2,
    fontSize: 80, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "left", valign: "top"
  });

  // 装饰线条 - 从色块延伸
  slide.addShape(pres.shapes.LINE, {
    x: 3.5, y: 1.2, w: 1.5, h: 0.08,
    line: { color: theme.accent, width: 3 }
  });

  // 章节标题 - 右侧
  slide.addText('问题背景\n与行为模式', {
    x: 4, y: 1.5, w: 5.5, h: 2.5,
    fontSize: 44, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true,
    align: "left", valign: "top"
  });

  // 装饰圆点 - 标题下方
  slide.addShape(pres.shapes.OVAL, {
    x: 4, y: 4.2, w: 0.3, h: 0.3,
    fill: { color: theme.accent }
  });
  slide.addShape(pres.shapes.OVAL, {
    x: 4.5, y: 4.2, w: 0.3, h: 0.3,
    fill: { color: theme.accent, transparency: 30 }
  });
  slide.addShape(pres.shapes.OVAL, {
    x: 5, y: 4.2, w: 0.3, h: 0.3,
    fill: { color: theme.accent, transparency: 60 }
  });

  // 右上角装饰
  slide.addShape(pres.shapes.OVAL, {
    x: 8.5, y: -0.5, w: 2, h: 2,
    fill: { color: theme.accent, transparency: 85 }
  });

  // 右下角装饰
  slide.addShape(pres.shapes.OVAL, {
    x: 7.5, y: 4.5, w: 1.5, h: 1.5,
    fill: { color: theme.light, transparency: 70 }
  });

  // 页码徽章（第 13 页）
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: theme.accent }
  });
  slide.addText("13", {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fontSize: 12, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
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
  pres.writeFile({ fileName: "13-section-01-preview.pptx" });
}

module.exports = { createSlide, slideConfig };
