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
  number: 8,
  title: "预警 vs 表演：观察期判断标准"
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

  // Left side: Table header
  slide.addText("行为对比表", {
    x: 0.5, y: 1.1, w: 4.5, h: 0.35,
    fontSize: 14,
    fontFace: "Microsoft YaHei",
    color: theme.secondary
  });

  // Table header row
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.5, y: 1.5, w: 4.5, h: 0.45,
    fill: { color: theme.accent }
  });

  slide.addText("行为", {
    x: 0.6, y: 1.55, w: 1.5, h: 0.35,
    fontSize: 13,
    fontFace: "Microsoft YaHei",
    color: "FFFFFF",
    bold: true
  });

  slide.addText("预警", {
    x: 2.2, y: 1.55, w: 1.2, h: 0.35,
    fontSize: 13,
    fontFace: "Microsoft YaHei",
    color: "FFFFFF",
    bold: true,
    align: "center"
  });

  slide.addText("表演", {
    x: 3.5, y: 1.55, w: 1.2, h: 0.35,
    fontSize: 13,
    fontFace: "Microsoft YaHei",
    color: "FFFFFF",
    bold: true,
    align: "center"
  });

  // Table rows
  const tableData = [
    { behavior: "沟通方式", warn: "先私下", perform: "直接群里" },
    { behavior: "攻击对象", warn: "一视同仁", perform: "选择性攻击" },
    { behavior: "数据使用", warn: "真实数据", perform: "情绪化数字" },
    { behavior: "问题解决", warn: "给方案", perform: "只提问题" }
  ];

  tableData.forEach((row, index) => {
    const yPos = 1.95 + index * 0.55;
    const bgColor = index % 2 === 0 ? "FFFFFF" : theme.bg;

    // Row background
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.5, y: yPos, w: 4.5, h: 0.55,
      fill: { color: bgColor },
      line: { color: theme.light, width: 0.5 }
    });

    slide.addText(row.behavior, {
      x: 0.6, y: yPos + 0.1, w: 1.5, h: 0.35,
      fontSize: 12,
      fontFace: "Microsoft YaHei",
      color: theme.primary
    });

    slide.addText(row.warn, {
      x: 2.2, y: yPos + 0.1, w: 1.2, h: 0.35,
      fontSize: 12,
      fontFace: "Microsoft YaHei",
      color: theme.secondary,
      align: "center"
    });

    slide.addText(row.perform, {
      x: 3.5, y: yPos + 0.1, w: 1.2, h: 0.35,
      fontSize: 12,
      fontFace: "Microsoft YaHei",
      color: theme.secondary,
      align: "center"
    });
  });

  // Right side: 后续观察指标
  slide.addText("后续观察指标", {
    x: 5.5, y: 1.1, w: 4, h: 0.35,
    fontSize: 14,
    fontFace: "Microsoft YaHei",
    color: theme.secondary
  });

  const indicators = [
    "是否愿意私下沟通",
    "是否接受数据核实",
    "是否提出建设性方案",
    "是否攻击具体而非个人",
    "情绪是否逐渐平稳"
  ];

  indicators.forEach((indicator, index) => {
    const yPos = 1.6 + index * 0.7;

    // Checkmark circle
    slide.addShape(pptx.ShapeType.ellipse, {
      x: 5.5, y: yPos, w: 0.32, h: 0.32,
      fill: { color: theme.accent }
    });

    // Checkmark
    slide.addText("✓", {
      x: 5.5, y: yPos, w: 0.32, h: 0.32,
      fontSize: 14,
      fontFace: "Arial",
      color: "FFFFFF",
      bold: true,
      align: "center",
      valign: "middle"
    });

    slide.addText(indicator, {
      x: 5.95, y: yPos, w: 3.5, h: 0.32,
      fontSize: 14,
      fontFace: "Microsoft YaHei",
      color: theme.primary,
      valign: "middle"
    });
  });

  // Decorative accent shape (bottom right)
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 8.8, y: 4.8, w: 0.7, h: 0.5,
    fill: { color: theme.accent, transparency: 30 },
    rectRadius: 0.1
  });

  // Decorative line (left side)
  slide.addShape(pptx.ShapeType.line, {
    x: 0.5, y: 5.0, w: 1.5, h: 0,
    line: { color: theme.accent, width: 2 }
  });

  // Page number badge
  slide.addShape(pptx.ShapeType.ellipse, {
    x: 9.3, y: 5.1, w: 0.35, h: 0.35,
    fill: { color: theme.accent }
  });

  slide.addText("08", {
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

  pptx.writeFile({ fileName: "slide-08-preview.pptx" })
    .then(() => console.log("Slide 08 preview created: slide-08-preview.pptx"))
    .catch(err => console.error("Error:", err));
}

module.exports = { createSlide, slideConfig };
