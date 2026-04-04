// slide-08.js - 行动清单
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 8,
  title: '如何开始你的养虾之旅'
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
    x: 0.5, y: 1.1, w: 2.5, h: 0.04,
    fill: { color: theme.accent }
  });

  // 左侧 - 步骤
  const steps = ["定义你的AI人设", "选择1个Skill开始", "持续喂养记忆"];
  steps.forEach((step, i) => {
    const y = 1.5 + i * 0.9;

    slide.addShape(pres.shapes.OVAL, {
      x: 0.5, y: y, w: 0.5, h: 0.5,
      fill: { color: theme.accent }
    });

    slide.addText("0" + (i + 1), {
      x: 0.5, y: y, w: 0.5, h: 0.5,
      fontSize: 14, fontFace: "Arial",
      color: "FFFFFF", bold: true,
      align: "center", valign: "middle"
    });

    slide.addText(step, {
      x: 1.2, y: y, w: 3.5, h: 0.5,
      fontSize: 16, fontFace: "Microsoft YaHei",
      color: theme.primary
    });
  });

  // 右侧 - 核心原则
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.2, y: 1.5, w: 4.3, h: 2.8,
    fill: { color: "F5F2EB" },
    line: { color: theme.light, width: 1 },
    rectRadius: 0.1
  });

  slide.addText("核心原则", {
    x: 5.4, y: 1.7, w: 3.9, h: 0.5,
    fontSize: 18, fontFace: "Microsoft YaHei",
    color: theme.accent, bold: true
  });

  const principles = ["最小可复用", "迭代优化", "记忆沉淀"];
  principles.forEach((p, i) => {
    slide.addText("•  " + p, {
      x: 5.4, y: 2.3 + i * 0.6, w: 3.9, h: 0.5,
      fontSize: 15, fontFace: "Microsoft YaHei",
      color: theme.primary
    });
  });

  // 页码
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: theme.accent }
  });
  slide.addText("8", {
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
  pres.writeFile({ fileName: "slide-08-preview.pptx" });
}

module.exports = { createSlide, slideConfig };
