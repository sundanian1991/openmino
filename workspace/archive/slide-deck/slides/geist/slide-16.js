// slide-16.js - Content: 设计检查清单 (Checklist)
// Anthropic-Geist Design Style Training

const pptxgen = require('pptxgenjs');

const theme = {
  primary: "3D2C29",
  secondary: "CA6641",
  accent: "E2725B",
  light: "C5C1BE",
  bg: "F5F1EE"
};

function createSlide(pres) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // Left accent bar
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.08, h: 5.625,
    fill: { color: theme.accent }
  });

  // Title
  slide.addText('设计检查清单', {
    x: 0.5, y: 0.35, w: 9, h: 0.6,
    fontSize: 28, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true,
    align: "left"
  });

  // ── Checklist: 2-column layout (4 items each) ──
  const checks = [
    '主色使用 Terracotta (#C77B68 或其变体)',
    '背景使用 Cream/Ivory (#F5F1EE)',
    '线条颜色为 Charcoal (#3D2C29) 或 Terracotta Deep',
    '线条端点为圆角 (Round cap)',
    '有足够留白（>40%）',
    '元素对齐到网格（如适用）',
    '手绘感但不失严谨',
    '整体感觉温暖、可信、克制'
  ];

  const colW = 4.3;
  const col1X = 0.5;
  const col2X = 5.2;
  const checkStartY = 1.15;
  const rowH = 0.55;

  checks.forEach((item, i) => {
    const col = i < 4 ? 0 : 1;
    const row = i % 4;
    const x = col === 0 ? col1X : col2X;
    const y = checkStartY + row * rowH;

    // Checkmark circle
    slide.addShape(pres.shapes.OVAL, {
      x: x, y: y + 0.08, w: 0.22, h: 0.22,
      fill: { color: theme.accent }
    });
    slide.addText('\u2713', {
      x: x, y: y + 0.06, w: 0.22, h: 0.26,
      fontSize: 11, fontFace: "Arial",
      color: "FFFFFF", bold: true,
      align: "center", valign: "middle"
    });

    // Item text
    slide.addText(item, {
      x: x + 0.32, y: y + 0.05, w: colW - 0.4, h: 0.4,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: theme.primary,
      align: "left", valign: "middle"
    });
  });

  // ── Bottom: Quick reference card (dark background) ──
  const refY = 3.55;
  const refH = 1.3;

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: refY, w: 9, h: refH,
    fill: { color: theme.primary },
    rectRadius: 0.08
  });

  // Section: 三原色
  slide.addText('三原色', {
    x: 0.75, y: refY + 0.15, w: 2, h: 0.28,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: theme.accent, bold: true,
    align: "left"
  });

  const colors = [
    { label: 'Terracotta', hex: '#C77B68' },
    { label: 'Cream', hex: '#F5F1EE' },
    { label: 'Charcoal', hex: '#3D2C29' }
  ];
  colors.forEach((c, i) => {
    const cx = 0.75 + i * 2.8;
    const cy = refY + 0.48;

    // Color swatch
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx, y: cy, w: 0.3, h: 0.3,
      fill: { color: c.hex.replace('#', '') },
      rectRadius: 0.03
    });
    slide.addText(c.label + ' ' + c.hex, {
      x: cx + 0.38, y: cy, w: 2.2, h: 0.3,
      fontSize: 11, fontFace: "Consolas",
      color: "FFFFFF",
      align: "left", valign: "middle"
    });
  });

  // Section: 三关键词
  slide.addText('三关键词', {
    x: 0.75, y: refY + 0.88, w: 2, h: 0.28,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: theme.accent, bold: true,
    align: "left"
  });

  const keywords = ['手绘', '温暖', '极简'];
  keywords.forEach((k, i) => {
    const kx = 0.75 + i * 1.2;
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: kx, y: refY + 1.18, w: 1.0, h: 0.32,
      fill: { color: theme.accent },
      rectRadius: 0.05
    });
    slide.addText(k, {
      x: kx, y: refY + 1.18, w: 1.0, h: 0.32,
      fontSize: 12, fontFace: "Microsoft YaHei",
      color: "FFFFFF", bold: true,
      align: "center", valign: "middle"
    });
  });

  // Page badge
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 9.3, y: 5.1, w: 0.45, h: 0.28,
    fill: { color: theme.primary },
    rectRadius: 0.04
  });
  slide.addText('16', {
    x: 9.3, y: 5.1, w: 0.45, h: 0.28,
    fontSize: 10, fontFace: "Arial",
    color: "FFFFFF",
    align: "center", valign: "middle"
  });

  return slide;
}

module.exports = { createSlide, theme };
