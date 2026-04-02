// slide-06.js - Content: 主色调：陶土色家族
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 6,
  title: '主色调：陶土色家族'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 左侧色块
  slide.addShape('rect', {
    x: 0, y: 0, w: 0.08, h: 5.625,
    fill: { color: theme.accent },
    line: { color: theme.accent, width: 0 }
  });

  // 标题前装饰竖线（3px, theme.accent）
  slide.addShape('rect', {
    x: 0.4, y: 0.45, w: 0.04, h: 0.65,
    fill: { color: theme.accent },
    line: { color: theme.accent, width: 0 }
  });

  // 页面标题
  slide.addText(slideConfig.title, {
    x: 0.6, y: 0.5, w: 8.5, h: 0.55,
    fontSize: 32, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true, align: "left"
  });

  // 2x2 色块网格
  const swatches = [
    { name: 'Terracotta Base', hex: 'E2725B', usage: '主品牌色、Logo' },
    { name: 'Terracotta Accent', hex: 'E35336', usage: '强调色、CTA' },
    { name: 'Terracotta Deep', hex: 'CA6641', usage: '文字、深色填充' },
    { name: 'Terracotta Warm', hex: 'E76F51', usage: '替代暖色' }
  ];

  // 2x2 grid: 间距 0.4, 色块 3.8 x 1.5
  // 左列 x=0.6, 右列 x=4.8
  // 上行 y=1.4, 下行 y=3.0
  const gridPositions = [
    { x: 0.6, y: 1.4 },   // row 0, col 0
    { x: 4.8, y: 1.4 },   // row 0, col 1
    { x: 0.6, y: 3.0 },   // row 1, col 0
    { x: 4.8, y: 3.0 }    // row 1, col 1
  ];

  swatches.forEach((swatch, i) => {
    const pos = gridPositions[i];

    // 大色块
    slide.addShape('rect', {
      x: pos.x, y: pos.y, w: 3.8, h: 1.5,
      fill: { color: swatch.hex },
      line: { color: swatch.hex, width: 0 },
      rectRadius: 0.05
    });

    // 色块内名称（14pt bold white）
    slide.addText(swatch.name, {
      x: pos.x + 0.2, y: pos.y + 0.3, w: 3.4, h: 0.4,
      fontSize: 14, fontFace: "Microsoft YaHei",
      color: "FFFFFF", bold: true, align: "left"
    });

    // 色块内 hex（11pt white）
    slide.addText('#' + swatch.hex, {
      x: pos.x + 0.2, y: pos.y + 0.7, w: 3.4, h: 0.35,
      fontSize: 11, fontFace: "Arial",
      color: "FFFFFF", align: "left"
    });

    // 色块下方用途标签（11pt, theme.secondary）
    slide.addText(swatch.usage, {
      x: pos.x, y: pos.y + 1.55, w: 3.8, h: 0.3,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: theme.secondary, align: "left"
    });
  });

  // 底部引言（斜体, theme.accent）
  slide.addText('陶土色 = 温暖 + 质朴 + 安全', {
    x: 0.6, y: 4.8, w: 8, h: 0.4,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: theme.accent, italic: true, align: "left"
  });

  // 页码徽章
  slide.addShape('rect', {
    x: 9.3, y: 5.1, w: 0.5, h: 0.35,
    fill: { color: theme.light },
    line: { color: theme.light, width: 0 }
  });
  slide.addText('06', {
    x: 9.3, y: 5.15, w: 0.5, h: 0.3,
    fontSize: 12, fontFace: "Arial",
    color: theme.secondary, align: "center"
  });

  return slide;
}

module.exports = { createSlide, slideConfig };
