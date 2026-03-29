const PptxGenJS = require("pptxgenjs");

const theme = {
  primary: "22223b",
  secondary: "4a4e69",
  accent: "c9ada7",
  light: "9a8c98",
  bg: "f2e9e4"
};

const slideConfig = {
  type: "summary",
  number: 9,
  title: "核心要点总结"
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
    x: 0.5, y: 0.5, w: "90%", h: 0.6,
    fontSize: 32,
    fontFace: "Microsoft YaHei",
    color: theme.primary,
    bold: true,
    align: "center"
  });

  // Decorative line under title
  slide.addShape(pptx.ShapeType.line, {
    x: 4, y: 1.15, w: 2, h: 0,
    line: { color: theme.accent, width: 2 }
  });

  // Three key quotes
  const quotes = [
    {
      num: "01",
      text: '"我理解你的担忧，但真正的问题是交接期信息真空、数据中断"'
    },
    {
      num: "02",
      text: '"情绪化数字不能帮助解决问题，反而会制造恐慌"'
    },
    {
      num: "03",
      text: '"这是策略组定的方案，攻击方案不能解决根本原因"'
    }
  ];

  quotes.forEach((quote, index) => {
    const yPos = 1.5 + index * 1.1;

    // Quote number (large decorative)
    slide.addText(quote.num, {
      x: 0.8, y: yPos, w: 0.8, h: 0.6,
      fontSize: 36,
      fontFace: "Arial",
      color: theme.accent,
      bold: true,
      transparency: 40
    });

    // Quote text
    slide.addText(quote.text, {
      x: 1.6, y: yPos + 0.1, w: 7.5, h: 0.5,
      fontSize: 18,
      fontFace: "Microsoft YaHei",
      color: theme.primary,
      bold: true
    });

    // Decorative quote mark
    slide.addText('"', {
      x: 1.4, y: yPos - 0.1, w: 0.3, h: 0.3,
      fontSize: 24,
      fontFace: "Arial",
      color: theme.accent,
      bold: true
    });
  });

  // Bottom CTA box
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 1.5, y: 4.6, w: 7, h: 0.7,
    fill: { color: theme.accent },
    rectRadius: 0.35
  });

  slide.addText("保持清醒，不接靶子，回归事实", {
    x: 1.5, y: 4.7, w: 7, h: 0.5,
    fontSize: 18,
    fontFace: "Microsoft YaHei",
    color: "FFFFFF",
    bold: true,
    align: "center"
  });

  // Decorative elements
  // Top right corner accent
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 9, y: 0.3, w: 0.5, h: 0.5,
    fill: { color: theme.accent, transparency: 20 },
    rectRadius: 0.1
  });

  // Bottom left decorative line
  slide.addShape(pptx.ShapeType.line, {
    x: 0.3, y: 5.2, w: 1.2, h: 0,
    line: { color: theme.light, width: 2 }
  });

  // Bottom right decorative line
  slide.addShape(pptx.ShapeType.line, {
    x: 8.5, y: 5.2, w: 1.2, h: 0,
    line: { color: theme.light, width: 2 }
  });

  // Page number badge (smaller for summary, decorative style)
  slide.addShape(pptx.ShapeType.ellipse, {
    x: 9.3, y: 5.1, w: 0.35, h: 0.35,
    fill: { color: theme.accent, transparency: 30 },
    line: { color: theme.accent, width: 1.5 }
  });

  slide.addText("09", {
    x: 9.3, y: 5.1, w: 0.35, h: 0.35,
    fontSize: 12,
    fontFace: "Arial",
    color: theme.accent,
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

  pptx.writeFile({ fileName: "slide-09-preview.pptx" })
    .then(() => console.log("Slide 09 preview created: slide-09-preview.pptx"))
    .catch(err => console.error("Error:", err));
}

module.exports = { createSlide, slideConfig };
