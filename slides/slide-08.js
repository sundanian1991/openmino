// slide-08.js - 沟通无效（影响部分）
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 8,
  section: '影响 · 会怎样',
  title: '重复沟通无效',
  conclusion: '单靠反馈、协调、说服解决不了权力结构问题'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 顶部装饰线
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.1,
    fill: { color: theme.accent }
  });

  // Section label
  slide.addText(slideConfig.section, {
    x: 0.5, y: 0.5, w: 9, h: 0.3,
    fontSize: 11, fontFace: "Microsoft YaHei",
    color: theme.accent, bold: true
  });

  // Title
  slide.addText(slideConfig.title, {
    x: 0.5, y: 0.9, w: 9, h: 0.6,
    fontSize: 28, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  // Timeline - horizontal layout with more space
  const events = [
    { date: '03-11', event: '供应商结构性困境分析', result: '识别三层框架' },
    { date: '03-22', event: '组织结构绑架洞察', result: '记录沟通僵局' },
    { date: '03-29', event: '头脑风暴梳理', result: '再次讨论相同问题' }
  ];

  events.forEach((e, i) => {
    const x = 0.5 + i * 3;
    const isLast = i === events.length - 1;

    // Card
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x, y: 1.7, w: 2.8, h: 1.8,
      fill: { color: isLast ? "FFF5F2" : "FFFFFF" },
      rectRadius: 0.08,
      line: { color: isLast ? theme.accent : theme.light, width: isLast ? 2 : 1 }
    });

    // Date badge
    slide.addShape(pres.shapes.OVAL, {
      x: x + 0.2, y: 1.85, w: 0.7, h: 0.7,
      fill: { color: isLast ? theme.accent : theme.light }
    });

    slide.addText(e.date, {
      x: x + 0.2, y: 1.85, w: 0.7, h: 0.7,
      fontSize: 14, fontFace: "Microsoft YaHei",
      color: "FFFFFF", bold: true,
      align: "center", valign: "middle"
    });

    // Event
    slide.addText(e.event, {
      x: x + 1.05, y: 1.9, w: 2.1, h: 0.7,
      fontSize: 12, fontFace: "Microsoft YaHei",
      color: theme.primary, bold: true
    });

    // Result
    slide.addText(e.result, {
      x: x + 1.05, y: 2.65, w: 2.1, h: 0.7,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: theme.secondary
    });

    // Arrow between events
    if (i < events.length - 1) {
      slide.addText('→', {
        x: x + 2.85, y: 2.4, w: 0.3, h: 0.4,
        fontSize: 20, fontFace: "Arial",
        color: theme.light
      });
    }
  });

  // Conclusion box at bottom
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 3.8, w: 9, h: 1.2,
    fill: { color: "FFFFFF" },
    rectRadius: 0.08,
    line: { color: theme.accent, width: 2 }
  });

  slide.addText('核心结论', {
    x: 0.8, y: 4, w: 8.4, h: 0.25,
    fontSize: 9, fontFace: "Microsoft YaHei",
    color: theme.accent, bold: true
  });

  slide.addText(slideConfig.conclusion, {
    x: 0.8, y: 4.25, w: 8.4, h: 0.6,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  // Page number badge
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

  // Footer
  slide.addText('权责不对等分析', {
    x: 0.5, y: 5.1, w: 4, h: 0.3,
    fontSize: 10, fontFace: "Microsoft YaHei",
    color: theme.light
  });

  return slide;
}

module.exports = { createSlide, slideConfig };
