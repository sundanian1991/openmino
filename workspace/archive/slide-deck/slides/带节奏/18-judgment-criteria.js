/**
 * Slide 18 - Content (预警 vs 表演：观察期判断标准)
 */

const slideConfig = {
  type: "content",
  index: 18,
  title: "预警 vs 表演：观察期判断标准"
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();

  // Background
  slide.background = { color: theme.bg };

  // Title
  slide.addText(slideConfig.title, {
    x: 0.6,
    y: 0.4,
    w: 8.8,
    h: 0.6,
    fontSize: 28,
    fontFace: "Microsoft YaHei",
    color: theme.primary,
    bold: true
  });

  // Subtitle
  slide.addText("持续 2-3 周，判断是真实预警还是表演型行为", {
    x: 0.6,
    y: 0.95,
    w: 8.8,
    h: 0.35,
    fontSize: 13,
    fontFace: "Microsoft YaHei",
    color: theme.secondary
  });

  // Table header
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.6,
    y: 1.4,
    w: 8.8,
    h: 0.45,
    fill: { color: theme.primary },
    line: { color: theme.primary, width: 0 }
  });

  slide.addText("观察维度", {
    x: 0.7,
    y: 1.5,
    w: 2.0,
    h: 0.3,
    fontSize: 12,
    fontFace: "Microsoft YaHei",
    color: "FFFFFF",
    bold: true,
    align: "center",
    valign: "middle"
  });

  slide.addText("预警信号 🚩", {
    x: 2.7,
    y: 1.5,
    w: 3.0,
    h: 0.3,
    fontSize: 12,
    fontFace: "Microsoft YaHei",
    color: "FFCCCC",
    bold: true,
    align: "center",
    valign: "middle"
  });

  slide.addText("表演型行为 🎭", {
    x: 5.7,
    y: 1.5,
    w: 3.6,
    h: 0.3,
    fontSize: 12,
    fontFace: "Microsoft YaHei",
    color: "CCCCCCFF",
    bold: true,
    align: "center",
    valign: "middle"
  });

  // Table rows
  const rows = [
    {
      dimension: "频率与持续性",
      warning: "持续、一致的模式，跨场景重复出现",
      performance: "间歇性、选择性，只在关键人物面前发作"
    },
    {
      dimension: "对象范围",
      warning: "对多人表达类似不满，不针对特定人",
      performance: "只针对你，且在领导/同事面前刻意示弱"
    },
    {
      dimension: "情绪投入度",
      warning: "情绪稳定但态度坚决，理性表达不满",
      performance: "情绪波动大，有明显表演痕迹（叹气、苦笑）"
    },
    {
      dimension: "诉求清晰度",
      warning: "说不清具体诉求，主要是情绪发泄",
      performance: "诉求模糊，重点是塑造'受害者'形象"
    },
    {
      dimension: "私下 vs 公开",
      warning: "私下和公开表现一致",
      performance: "私下正常，公开场合突然变脸"
    }
  ];

  rows.forEach((row, index) => {
    const y = 1.85 + (index * 0.55);
    const isEven = index % 2 === 0;
    const rowFill = isEven ? { color: theme.light, transparency: 70 } : { color: theme.bg };

    // Row background
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0.6,
      y: y,
      w: 8.8,
      h: 0.55,
      fill: rowFill,
      line: { color: theme.light, width: 0.5 }
    });

    // Dimension
    slide.addText(row.dimension, {
      x: 0.7,
      y: y + 0.1,
      w: 2.0,
      h: 0.35,
      fontSize: 11,
      fontFace: "Microsoft YaHei",
      color: theme.primary,
      bold: true,
      valign: "middle"
    });

    // Warning
    slide.addText(row.warning, {
      x: 2.7,
      y: y + 0.1,
      w: 3.0,
      h: 0.35,
      fontSize: 11,
      fontFace: "Microsoft YaHei",
      color: theme.secondary,
      valign: "middle"
    });

    // Performance
    slide.addText(row.performance, {
      x: 5.7,
      y: y + 0.1,
      w: 3.6,
      h: 0.35,
      fontSize: 11,
      fontFace: "Microsoft YaHei",
      color: theme.secondary,
      valign: "middle"
    });
  });

  // Bottom note
  slide.addText("关键洞察：表演型行为的目的是让你自我怀疑 + 在领导心中埋下种子", {
    x: 0.6,
    y: 4.8,
    w: 8.8,
    h: 0.3,
    fontSize: 11,
    fontFace: "Microsoft YaHei",
    color: theme.accent,
    italic: true,
    align: "center"
  });

  // Page number badge
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3,
    y: 5.1,
    w: 0.4,
    h: 0.4,
    fill: { color: theme.accent }
  });
  slide.addText("18", {
    x: 9.3,
    y: 5.1,
    w: 0.4,
    h: 0.4,
    fontSize: 12,
    fontFace: "Arial",
    color: "FFFFFF",
    bold: true,
    align: "center",
    valign: "middle"
  });

  return slide;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createSlide, slideConfig };
}
