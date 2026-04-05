// slide-06.js - 飞书妙搭实操
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 6,
  title: '飞书妙搭实操：三步部署法'
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

  // 三步骤
  const steps = [
    { num: "Step 1", text: "定义Soul（人设）" },
    { num: "Step 2", text: "定义Identity（身份与任务）" },
    { num: "Step 3", text: "教会Skills（技能包）" }
  ];

  steps.forEach((step, i) => {
    const x = 0.5 + i * 3.1;

    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x, y: 1.4, w: 2.9, h: 1.2,
      fill: { color: i === 0 ? theme.accent : "FFFFFF" },
      line: { color: theme.light, width: 1 },
      rectRadius: 0.1
    });

    slide.addText(step.num, {
      x: x + 0.2, y: 1.55, w: 2.5, h: 0.4,
      fontSize: 14, fontFace: "Arial",
      color: i === 0 ? "FFFFFF" : theme.accent, bold: true
    });

    slide.addText(step.text, {
      x: x + 0.2, y: 1.95, w: 2.5, h: 0.5,
      fontSize: 13, fontFace: "Microsoft YaHei",
      color: i === 0 ? "FFFFFF" : theme.primary
    });

    if (i < 2) {
      slide.addText("→", {
        x: x + 2.9, y: 1.8, w: 0.3, h: 0.5,
        fontSize: 20, fontFace: "Arial",
        color: theme.accent
      });
    }
  });

  // 平台能力
  slide.addText("平台能力", {
    x: 0.5, y: 2.9, w: 9, h: 0.5,
    fontSize: 18, fontFace: "Microsoft YaHei",
    color: theme.secondary, bold: true
  });

  const capabilities = ["多代理架构", "多模态输入", "多维表持久化", "消息卡片/通知"];
  capabilities.forEach((cap, i) => {
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.5 + i * 2.3, y: 3.5, w: 2.1, h: 0.6,
      fill: { color: "F5F2EB" },
      line: { color: theme.light, width: 1 },
      rectRadius: 0.08
    });
    slide.addText(cap, {
      x: 0.5 + i * 2.3, y: 3.5, w: 2.1, h: 0.6,
      fontSize: 13, fontFace: "Microsoft YaHei",
      color: theme.primary, align: "center", valign: "middle"
    });
  });

  // 页码
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: theme.accent }
  });
  slide.addText("6", {
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
  pres.writeFile({ fileName: "slide-06-preview.pptx" });
}

module.exports = { createSlide, slideConfig };
