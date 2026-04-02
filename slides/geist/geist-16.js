// geist-16.js — Summary: 设计检查清单 + 快速参考
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'summary',
  index: 16,
  title: '设计检查清单'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 装饰半透明圆
  slide.addShape('ellipse', {
    x: 3.5, y: 0.2, w: 4.5, h: 4.5,
    fill: { color: theme.accent, transparency: 85 }
  });
  slide.addShape('ellipse', {
    x: 1.2, y: 3.2, w: 1.5, h: 1.5,
    fill: { color: theme.secondary, transparency: 88 }
  });

  // 标语
  slide.addText('用温暖的手绘语言，\n讲述严谨的技术故事', {
    x: 1.5, y: 0.5, w: 7, h: 1.3,
    fontSize: 28, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true, align: "center", valign: "middle",
    lineSpacing: 38
  });

  slide.addShape('rect', {
    x: 3.8, y: 1.9, w: 2.4, h: 0.04,
    fill: { color: theme.secondary }
  });

  // 检查清单 — 两列
  const checks = [
    '主色使用 Terracotta (#C77B68)',
    '背景使用 Cream/Ivory (#F5F1EE)',
    '线条为 Charcoal (#3D2C29)',
    '线条端点为圆角 (Round cap)',
    '留白 > 40%',
    '元素对齐到网格',
    '手绘感但不失严谨',
    '整体温暖、可信、克制'
  ];

  const colW = 4.2, col1X = 0.5, col2X = 5.3, startY = 2.2, rowH = 0.38;

  checks.forEach((item, i) => {
    const col = i < 4 ? 0 : 1;
    const row = i % 4;
    const x = col === 0 ? col1X : col2X;
    const y = startY + row * rowH;

    slide.addShape('roundRect', {
      x: x, y: y, w: colW, h: rowH - 0.03,
      fill: { color: theme.accent, transparency: 88 },
      line: { color: theme.accent, width: 0.5 },
      rectRadius: 0.05
    });
    slide.addText(item, {
      x: x + 0.15, y: y, w: colW - 0.3, h: rowH - 0.03,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: theme.primary, valign: "middle"
    });
  });

  // 快速参考卡 — 深色底
  const refY = 3.85;
  slide.addShape('roundRect', {
    x: 0.5, y: refY, w: 9, h: 1.2,
    fill: { color: theme.primary }, rectRadius: 0.06
  });

  // 三原色
  slide.addText('三原色', {
    x: 0.75, y: refY + 0.1, w: 2, h: 0.25,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: theme.accent, bold: true
  });

  [{ label: 'Terracotta', hex: '#C77B68' }, { label: 'Cream', hex: '#F5F1EE' }, { label: 'Charcoal', hex: '#3D2C29' }].forEach((c, i) => {
    const cx = 0.75 + i * 2.8;
    slide.addShape('roundRect', {
      x: cx, y: refY + 0.4, w: 0.3, h: 0.3,
      fill: { color: c.hex.replace('#', '') }, rectRadius: 0.03
    });
    slide.addText(c.label + ' ' + c.hex, {
      x: cx + 0.38, y: refY + 0.4, w: 2, h: 0.3,
      fontSize: 11, fontFace: "Consolas", color: "FFFFFF", valign: "middle"
    });
  });

  // 三关键词
  slide.addText('三关键词', {
    x: 0.75, y: refY + 0.78, w: 2, h: 0.25,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: theme.accent, bold: true
  });
  ['手绘', '温暖', '极简'].forEach((k, i) => {
    slide.addShape('roundRect', {
      x: 0.75 + i * 1.2, y: refY + 1.05, w: 1.0, h: 0.3,
      fill: { color: theme.accent }, rectRadius: 0.04
    });
    slide.addText(k, {
      x: 0.75 + i * 1.2, y: refY + 1.05, w: 1.0, h: 0.3,
      fontSize: 12, fontFace: "Microsoft YaHei",
      color: "FFFFFF", bold: true, align: "center", valign: "middle"
    });
  });

  // 谢谢
  slide.addText('— 谢谢 —', {
    x: 2, y: 5.15, w: 6, h: 0.35,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: theme.light, align: "center"
  });

  // 页码
  slide.addShape('roundRect', {
    x: 9.3, y: 5.15, w: 0.5, h: 0.3,
    fill: { color: theme.light }, rectRadius: 0.05
  });
  slide.addText('16', {
    x: 9.3, y: 5.18, w: 0.5, h: 0.25,
    fontSize: 11, fontFace: "Arial",
    color: theme.secondary, align: "center"
  });

  return slide;
}

module.exports = { createSlide, slideConfig };
