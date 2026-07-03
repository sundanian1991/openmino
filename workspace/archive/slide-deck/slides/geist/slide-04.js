// slide-04.js - Content Page (Comparison): 三大核心支柱
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 4,
  title: '三大核心支柱'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // Page title: 32pt bold, theme.primary, top left
  slide.addText(slideConfig.title, {
    x: 0.5, y: 0.4, w: 9, h: 0.7,
    fontSize: 32, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true, align: "left"
  });

  // Three comparison columns
  const columns = [
    {
      name: '温暖',
      char: '温',
      iconColor: theme.accent,
      meaning: '陶土色传递的质朴感',
      expression: 'Terracotta 主调 + 手形元素'
    },
    {
      name: '严谨',
      char: '严',
      iconColor: theme.secondary,
      meaning: '技术公司的可信度',
      expression: '几何网格 + 模块化结构'
    },
    {
      name: '克制',
      char: '克',
      iconColor: theme.primary,
      meaning: '少即是多的美学',
      expression: '充裕留白 + 精简元素'
    }
  ];

  const cardW = 2.8;
  const gap = 0.3;
  const startX = 0.5;
  const cardY = 1.4;
  const cardH = 3.5;

  columns.forEach(function (col, i) {
    var x = startX + i * (cardW + gap);

    // White card background with subtle shadow
    slide.addShape('rect', {
      x: x, y: cardY, w: cardW, h: cardH,
      fill: { color: "FFFFFF" },
      line: { color: theme.light, width: 0.5 },
      rectRadius: 0.08,
      shadow: {
        type: "outer",
        blur: 6,
        offset: 2,
        color: "000000",
        opacity: 0.1
      }
    });

    // Circular icon (OVAL)
    var iconSize = 0.8;
    var iconX = x + (cardW - iconSize) / 2;
    var iconY = cardY + 0.4;

    slide.addShape('oval', {
      x: iconX, y: iconY, w: iconSize, h: iconSize,
      fill: { color: col.iconColor },
      line: { color: col.iconColor, width: 0 }
    });

    // Label inside circle
    slide.addText(col.char, {
      x: iconX, y: iconY, w: iconSize, h: iconSize,
      fontSize: 14, fontFace: "Microsoft YaHei",
      color: "FFFFFF", bold: true, align: "center",
      valign: "middle"
    });

    // Pillar name: 20pt bold, theme.primary
    var nameY = iconY + iconSize + 0.25;
    slide.addText(col.name, {
      x: x, y: nameY, w: cardW, h: 0.4,
      fontSize: 20, fontFace: "Microsoft YaHei",
      color: theme.primary, bold: true, align: "center"
    });

    // Divider line
    var divY = nameY + 0.45;
    slide.addShape('rect', {
      x: x + 0.4, y: divY, w: cardW - 0.8, h: 0.02,
      fill: { color: theme.light },
      line: { color: theme.light, width: 0 }
    });

    // "内涵" label + description: 12pt, theme.secondary
    var labelY = divY + 0.2;
    slide.addText('内涵', {
      x: x + 0.3, y: labelY, w: cardW - 0.6, h: 0.3,
      fontSize: 12, fontFace: "Microsoft YaHei",
      color: theme.accent, bold: true, align: "left"
    });
    slide.addText(col.meaning, {
      x: x + 0.3, y: labelY + 0.3, w: cardW - 0.6, h: 0.4,
      fontSize: 12, fontFace: "Microsoft YaHei",
      color: theme.secondary, align: "left"
    });

    // "表现" label + description: 12pt, theme.secondary
    var exprY = labelY + 0.75;
    slide.addText('表现', {
      x: x + 0.3, y: exprY, w: cardW - 0.6, h: 0.3,
      fontSize: 12, fontFace: "Microsoft YaHei",
      color: theme.accent, bold: true, align: "left"
    });
    slide.addText(col.expression, {
      x: x + 0.3, y: exprY + 0.3, w: cardW - 0.6, h: 0.4,
      fontSize: 12, fontFace: "Microsoft YaHei",
      color: theme.secondary, align: "left"
    });
  });

  // Page number badge at x:9.3, y:5.1
  slide.addShape('rect', {
    x: 9.3, y: 5.1, w: 0.5, h: 0.35,
    fill: { color: theme.light },
    line: { color: theme.light, width: 0 },
    rectRadius: 0.05
  });
  slide.addText('04', {
    x: 9.3, y: 5.15, w: 0.5, h: 0.3,
    fontSize: 12, fontFace: "Arial",
    color: theme.secondary, align: "center"
  });

  return slide;
}

module.exports = { createSlide, slideConfig };
