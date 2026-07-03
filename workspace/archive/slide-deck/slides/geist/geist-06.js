// geist-06.js — Content: 主色调陶土色家族
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',  index: 6,
  title: '主色调：陶土色家族'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addShape('rect', {
    x: 0, y: 0, w: 0.08, h: 5.625,
    fill: { color: theme.accent }
  });

  slide.addShape('rect', {
    x: 0.4, y: 0.45, w: 0.04, h: 0.65,
    fill: { color: theme.accent }
  });

  slide.addText(slideConfig.title, {
    x: 0.6, y: 0.5, w: 8.5, h: 0.55,
    fontSize: 32, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  // 2x2 色块网格
  const swatches = [
    { name: 'Terracotta Base', hex: 'E2725B', usage: '主品牌色、Logo' },
    { name: 'Terracotta Accent', hex: 'E35336', usage: '强调色、CTA' },
    { name: 'Terracotta Deep', hex: 'CA6641', usage: '文字、深色填充' },
    { name: 'Terracotta Warm', hex: 'E76F51', usage: '替代暖色' }
  ];

  const gridPositions = [
    { x: 0.6, y: 1.4 },
    { x: 4.8, y: 1.4 },
    { x: 0.6, y: 3.0 },
    { x: 4.8, y: 3.0 }
  ];

  swatches.forEach((swatch, i) => {
    const pos = gridPositions[i];

    slide.addShape('roundRect', {
      x: pos.x, y: pos.y, w: 3.8, h: 1.5,
      fill: { color: swatch.hex },
      rectRadius: 0.05
    });

    slide.addText(swatch.name, {
      x: pos.x + 0.2, y: pos.y + 0.3, w: 3.4, h: 0.35,
      fontSize: 14, fontFace: "Microsoft YaHei",
      color: "FFFFFF", bold: true
    });

    slide.addText('#' + swatch.hex, {
      x: pos.x + 0.2, y: pos.y + 0.65, w: 3.4, h: 0.3,
      fontSize: 11, fontFace: "Arial",
      color: "FFFFFF"
    });

    slide.addText(swatch.usage, {
      x: pos.x, y: pos.y + 1.55, w: 3.8, h: 0.3,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: theme.secondary
    });
  });

  slide.addText('陶土色 = 温暖 + 质朴 + 安全', {
    x: 0.6, y: 4.8, w: 8, h: 0.35,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: theme.accent, italic: true
  });

  slide.addShape('roundRect', {
    x: 9.3, y: 5.15, w: 0.5, h: 0.3,
    fill: { color: theme.light }, rectRadius: 0.05
  });
  slide.addText('06', {
    x: 9.3, y: 5.18, w: 0.5, h: 0.25,
    fontSize: 11, fontFace: "Arial",
    color: theme.secondary, align: "center"
  });

  return slide;
}

module.exports = { createSlide, slideConfig };
