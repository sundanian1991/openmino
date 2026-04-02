// slide-17.js - Summary/Closing Page
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

  // Large decorative terracotta circle (semi-transparent, behind content)
  slide.addShape(pres.shapes.OVAL, {
    x: 3.5, y: 0.2, w: 4.5, h: 4.5,
    fill: { color: theme.accent, transparency: 70 }
  });

  // Smaller decorative circle
  slide.addShape(pres.shapes.OVAL, {
    x: 1.2, y: 3.2, w: 1.5, h: 1.5,
    fill: { color: theme.secondary, transparency: 82 }
  });

  // ── Main tagline (large, center-aligned) ──
  slide.addText('用温暖的手绘语言，\n讲述严谨的技术故事', {
    x: 1.5, y: 0.6, w: 7, h: 1.5,
    fontSize: 28, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true,
    align: "center", valign: "middle",
    lineSpacing: 38
  });

  // Decorative line under tagline
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 3.8, y: 2.15, w: 2.4, h: 0.04,
    fill: { color: theme.secondary }
  });

  // ── 4 Key takeaways as horizontal pills ──
  const takeaways = [
    '陶土色传递温暖与可信 \u2014 不是冷冰冰的科技感',
    '手绘线条传递人性 \u2014 但不失严谨与克制',
    '75% 中性基底 + 20% 陶土主色 + 5% 点缀色 \u2014 金字塔法则',
    'Prompt 模板确保风格一致性 \u2014 改主题即可复用'
  ];

  const pillW = 4.2;
  const pillH = 0.45;
  const pillGap = 0.15;
  const pillStartY = 2.4;

  takeaways.forEach((item, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const px = col === 0 ? 0.5 : 5.3;
    const py = pillStartY + row * (pillH + pillGap);

    // Pill background
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: px, y: py, w: pillW, h: pillH,
      fill: { color: theme.accent, transparency: 88 },
      line: { color: theme.accent, width: 0.5 },
      rectRadius: 0.08
    });

    // Pill text
    slide.addText(item, {
      x: px + 0.15, y: py, w: pillW - 0.3, h: pillH,
      fontSize: 10, fontFace: "Microsoft YaHei",
      color: theme.primary,
      align: "left", valign: "middle"
    });
  });

  // ── Bottom: "谢谢" ──
  slide.addText('\u2014 \u8C22\u8C22 \u2014', {
    x: 2, y: 4.3, w: 6, h: 0.5,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: theme.light,
    align: "center", valign: "middle"
  });

  // Page badge
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 9.3, y: 5.1, w: 0.45, h: 0.28,
    fill: { color: theme.primary },
    rectRadius: 0.04
  });
  slide.addText('17', {
    x: 9.3, y: 5.1, w: 0.45, h: 0.28,
    fontSize: 10, fontFace: "Arial",
    color: "FFFFFF",
    align: "center", valign: "middle"
  });

  return slide;
}

module.exports = { createSlide, theme };
