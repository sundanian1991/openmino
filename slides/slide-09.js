// slide-09.js - 核心洞察
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'summary',
  index: 9,
  title: '核心洞察'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 标题
  slide.addText(slideConfig.title, {
    x: 0.5, y: 0.4, w: 9, h: 0.8,
    fontSize: 32, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  // 标题下划线
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.1, w: 1.5, h: 0.04,
    fill: { color: theme.accent }
  });

  // 核心观点框
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.5, w: 9, h: 1.3,
    fill: { color: theme.accent },
    rectRadius: 0.1
  });

  slide.addText("\"养虾养的不是AI，是未来的自己。\"", {
    x: 0.7, y: 1.65, w: 8.6, h: 1,
    fontSize: 24, fontFace: "Microsoft YaHei",
    color: "FFFFFF", bold: true, align: "center", valign: "middle"
  });

  // 方法论本质
  slide.addText("方法论本质", {
    x: 0.5, y: 3.0, w: 9, h: 0.5,
    fontSize: 16, fontFace: "Microsoft YaHei",
    color: theme.accent, bold: true
  });

  slide.addText("将个人经验、风格、知识通过Prompt和记忆灌输给AI，让AI成为\"数字分身\"", {
    x: 0.5, y: 3.5, w: 9, h: 0.6,
    fontSize: 15, fontFace: "Microsoft YaHei",
    color: theme.primary
  });

  // 适用人群
  slide.addText("适用人群", {
    x: 0.5, y: 4.2, w: 9, h: 0.5,
    fontSize: 16, fontFace: "Microsoft YaHei",
    color: theme.accent, bold: true
  });

  const audiences = ["内容创作者", "知识工作者", "效率追求者"];
  audiences.forEach((aud, i) => {
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.5 + i * 2.8, y: 4.7, w: 2.5, h: 0.5,
      fill: { color: "F5F2EB" },
      line: { color: theme.light, width: 1 },
      rectRadius: 0.08
    });

    slide.addText(aud, {
      x: 0.5 + i * 2.8, y: 4.7, w: 2.5, h: 0.5,
      fontSize: 13, fontFace: "Microsoft YaHei",
      color: theme.primary, align: "center", valign: "middle"
    });
  });

  // 页码
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: theme.accent }
  });
  slide.addText("9", {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fontSize: 12, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
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
  pres.writeFile({ fileName: "slide-09-preview.pptx" });
}

module.exports = { createSlide, slideConfig };
