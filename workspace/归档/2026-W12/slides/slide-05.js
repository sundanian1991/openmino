// slide-05.js - 做判断与学习
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 5,
  title: '做判断与学习'
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
    x: 0.5, y: 1.1, w: 2, h: 0.04,
    fill: { color: theme.accent }
  });

  // 左侧 - 做判断
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.5, w: 4.3, h: 3.3,
    fill: { color: "FFFFFF" },
    line: { color: theme.light, width: 1 },
    rectRadius: 0.1
  });

  slide.addText("做判断", {
    x: 0.7, y: 1.7, w: 3.9, h: 0.5,
    fontSize: 20, fontFace: "Microsoft YaHei",
    color: theme.accent, bold: true
  });

  const judgeItems = ["设定身份规则", "让AI基于记忆给出判断", "设置飞书提醒自动推送"];
  judgeItems.forEach((item, i) => {
    slide.addText("•  " + item, {
      x: 0.7, y: 2.3 + i * 0.6, w: 3.9, h: 0.5,
      fontSize: 15, fontFace: "Microsoft YaHei",
      color: theme.primary
    });
  });

  // 右侧 - 学习
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.2, y: 1.5, w: 4.3, h: 3.3,
    fill: { color: "FFFFFF" },
    line: { color: theme.light, width: 1 },
    rectRadius: 0.1
  });

  slide.addText("学习", {
    x: 5.4, y: 1.7, w: 3.9, h: 0.5,
    fontSize: 20, fontFace: "Microsoft YaHei",
    color: theme.accent, bold: true
  });

  const learnItems = ["向量化个人语料", "喂入AI形成知识库", "让AI模仿个人风格输出"];
  learnItems.forEach((item, i) => {
    slide.addText("•  " + item, {
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
  slide.addText("5", {
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
  pres.writeFile({ fileName: "slide-05-preview.pptx" });
}

module.exports = { createSlide, slideConfig };
