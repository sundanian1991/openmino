const PptxGenJS = require("pptxgenjs");

const theme = {
  primary: "22223b",
  secondary: "4a4e69",
  accent: "c9ada7",
  light: "9a8c98",
  bg: "f2e9e4"
};

const slideConfig = {
  type: "content",
  number: 7,
  title: "场景三&四：攻击方案与私下沟通"
};

function createSlide(pptx) {
  const slide = pptx.addSlide();

  // Background
  slide.background = { color: theme.bg };

  // Decorative accent bar (top)
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: "100%", h: 0.08,
    fill: { color: theme.accent }
  });

  // Title
  slide.addText(slideConfig.title, {
    x: 0.5, y: 0.4, w: "90%", h: 0.6,
    fontSize: 28,
    fontFace: "Microsoft YaHei",
    color: theme.primary,
    bold: true
  });

  // Left side: 场景三 - 攻击方案
  slide.addText("场景三：应对对方攻击方案", {
    x: 0.5, y: 1.1, w: 4.2, h: 0.4,
    fontSize: 18,
    fontFace: "Microsoft YaHei",
    color: theme.accent,
    bold: true
  });

  // 方案1 card
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.5, y: 1.6, w: 4.2, h: 1.3,
    fill: { color: "FFFFFF" },
    line: { color: theme.light, width: 1 },
    rectRadius: 0.08
  });

  slide.addText("策略一：不接靶子", {
    x: 0.7, y: 1.7, w: 3.8, h: 0.35,
    fontSize: 15,
    fontFace: "Microsoft YaHei",
    color: theme.primary,
    bold: true
  });

  slide.addText('"这是策略组定的多方共识方案"', {
    x: 0.7, y: 2.1, w: 3.8, h: 0.6,
    fontSize: 14,
    fontFace: "Microsoft YaHei",
    color: theme.secondary,
    italic: true
  });

  // 方案2 card
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.5, y: 3.1, w: 4.2, h: 1.3,
    fill: { color: "FFFFFF" },
    line: { color: theme.light, width: 1 },
    rectRadius: 0.08
  });

  slide.addText("策略二：回归根本原因", {
    x: 0.7, y: 3.2, w: 3.8, h: 0.35,
    fontSize: 15,
    fontFace: "Microsoft YaHei",
    color: theme.primary,
    bold: true
  });

  slide.addText('"即使方案调整，数据同步不恢复问题仍在"', {
    x: 0.7, y: 3.6, w: 3.8, h: 0.6,
    fontSize: 14,
    fontFace: "Microsoft YaHei",
    color: theme.secondary,
    italic: true
  });

  // Right side: 场景四 - 私下沟通
  slide.addText("场景四：私下沟通目标", {
    x: 5.3, y: 1.1, w: 4.2, h: 0.4,
    fontSize: 18,
    fontFace: "Microsoft YaHei",
    color: theme.accent,
    bold: true
  });

  const goals = [
    { icon: "①", text: "了解真实动机" },
    { icon: "②", text: "不被绑定" },
    { icon: "③", text: "建立边界" },
    { icon: "④", text: "保护团队安全感" }
  ];

  goals.forEach((goal, index) => {
    const yPos = 1.6 + index * 0.65;

    // Icon circle
    slide.addShape(pptx.ShapeType.ellipse, {
      x: 5.3, y: yPos, w: 0.4, h: 0.4,
      fill: { color: theme.accent }
    });

    slide.addText(goal.icon, {
      x: 5.3, y: yPos, w: 0.4, h: 0.4,
      fontSize: 14,
      fontFace: "Arial",
      color: "FFFFFF",
      bold: true,
      align: "center",
      valign: "middle"
    });

    slide.addText(goal.text, {
      x: 5.85, y: yPos, w: 3.5, h: 0.4,
      fontSize: 15,
      fontFace: "Microsoft YaHei",
      color: theme.primary,
      valign: "middle"
    });
  });

  // Key quote box (bottom)
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.5, y: 4.65, w: 9, h: 0.8,
    fill: { color: theme.accent, transparency: 15 },
    line: { color: theme.accent, width: 1.5 },
    rectRadius: 0.08
  });

  slide.addText('关键话术："建议私下先沟通，不要群里放炮"', {
    x: 0.7, y: 4.8, w: 8.6, h: 0.5,
    fontSize: 16,
    fontFace: "Microsoft YaHei",
    color: theme.primary,
    bold: true,
    align: "center"
  });

  // Decorative line (bottom left)
  slide.addShape(pptx.ShapeType.line, {
    x: 0.5, y: 5.5, w: 2, h: 0,
    line: { color: theme.light, width: 2 }
  });

  // Page number badge
  slide.addShape(pptx.ShapeType.ellipse, {
    x: 9.3, y: 5.1, w: 0.35, h: 0.35,
    fill: { color: theme.accent }
  });

  slide.addText("07", {
    x: 9.3, y: 5.1, w: 0.35, h: 0.35,
    fontSize: 12,
    fontFace: "Arial",
    color: "FFFFFF",
    bold: true,
    align: "center",
    valign: "middle"
  });

  return slide;
}

// Standalone preview
if (require.main === module) {
  const pptx = new PptxGenJS();
  pptx.layout = "LAYOUT_16x9";
  pptx.defineSlideSize({ width: 10, height: 5.625 });

  createSlide(pptx);

  pptx.writeFile({ fileName: "slide-07-preview.pptx" })
    .then(() => console.log("Slide 07 preview created: slide-07-preview.pptx"))
    .catch(err => console.error("Error:", err));
}

module.exports = { createSlide, slideConfig };
