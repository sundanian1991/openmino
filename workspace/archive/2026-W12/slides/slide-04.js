// slide-04.js - 写脚本技巧
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 4,
  title: '写脚本技巧：模块化Prompt工作流'
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
    x: 0.5, y: 1.1, w: 3, h: 0.04,
    fill: { color: theme.accent }
  });

  // 三个技巧
  const techniques = [
    { num: "01", title: "任务拆分", flow: ["开场故事", "对比反差", "概念定义", "结尾升华"] },
    { num: "02", title: "分模块产出", desc: "每个模块单独生成Prompt，分步产出后整合" },
    { num: "03", title: "使用Skill模板", desc: "将流程固化为可复用模板" }
  ];

  techniques.forEach((tech, i) => {
    const y = 1.4 + i * 1.3;

    // 序号
    slide.addText(tech.num, {
      x: 0.5, y: y, w: 0.8, h: 0.5,
      fontSize: 28, fontFace: "Arial",
      color: theme.accent, bold: true
    });

    // 标题
    slide.addText(tech.title, {
      x: 1.4, y: y, w: 3, h: 0.5,
      fontSize: 20, fontFace: "Microsoft YaHei",
      color: theme.primary, bold: true
    });

    // 流程或描述
    if (tech.flow) {
      tech.flow.forEach((step, j) => {
        slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
          x: 1.4 + j * 2.1, y: y + 0.55, w: 1.9, h: 0.45,
          fill: { color: "F5F2EB" },
          line: { color: theme.light, width: 1 },
          rectRadius: 0.06
        });
        slide.addText(step, {
          x: 1.4 + j * 2.1, y: y + 0.55, w: 1.9, h: 0.45,
          fontSize: 12, fontFace: "Microsoft YaHei",
          color: theme.primary, align: "center", valign: "middle"
        });
        if (j < tech.flow.length - 1) {
          slide.addText("→", {
            x: 1.4 + j * 2.1 + 1.9, y: y + 0.55, w: 0.3, h: 0.45,
            fontSize: 14, fontFace: "Arial",
            color: theme.accent, align: "center", valign: "middle"
          });
        }
      });
    } else {
      slide.addText(tech.desc, {
        x: 1.4, y: y + 0.55, w: 7, h: 0.5,
        fontSize: 14, fontFace: "Microsoft YaHei",
        color: theme.secondary
      });
    }
  });

  // 页码
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: theme.accent }
  });
  slide.addText("4", {
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
  pres.writeFile({ fileName: "slide-04-preview.pptx" });
}

module.exports = { createSlide, slideConfig };
