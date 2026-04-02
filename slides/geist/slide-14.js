// slide-14.js - Content: Prompt 模板库
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
  slide.addText('Prompt 模板库', {
    x: 0.5, y: 0.35, w: 9, h: 0.6,
    fontSize: 28, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true,
    align: "left"
  });

  // ── Section 1: Template structure flow (horizontal with arrows) ──
  const flowY = 1.15;
  const flowParts = [
    { label: '风格前缀', color: theme.primary },
    { label: '主体描述', color: theme.secondary },
    { label: '色彩指令', color: theme.accent },
    { label: '风格修饰', color: theme.secondary },
    { label: '技术指令', color: theme.primary }
  ];
  const partW = 1.55;
  const arrowW = 0.25;
  const startX = 0.5;

  flowParts.forEach((part, i) => {
    const px = startX + i * (partW + arrowW);

    // Part pill
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: px, y: flowY, w: partW, h: 0.4,
      fill: { color: part.color },
      rectRadius: 0.06
    });
    slide.addText(part.label, {
      x: px, y: flowY, w: partW, h: 0.4,
      fontSize: 10, fontFace: "Microsoft YaHei",
      color: "FFFFFF", bold: true,
      align: "center", valign: "middle"
    });

    // Arrow between parts
    if (i < flowParts.length - 1) {
      slide.addText('\u2192', {
        x: px + partW, y: flowY, w: arrowW, h: 0.4,
        fontSize: 14, fontFace: "Arial",
        color: theme.light,
        align: "center", valign: "middle"
      });
    }
  });

  // ── Section 2: Quick template highlighted box ──
  const boxY = 1.8;

  // White card background
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: boxY, w: 9, h: 2.2,
    fill: { color: "FFFFFF" },
    line: { color: theme.light, width: 1 },
    rectRadius: 0.08
  });

  // Left accent bar on card
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: boxY, w: 0.06, h: 2.2,
    fill: { color: theme.accent }
  });

  // Card label
  slide.addText('快速调用模板', {
    x: 0.75, y: boxY + 0.12, w: 2, h: 0.3,
    fontSize: 11, fontFace: "Microsoft YaHei",
    color: theme.accent, bold: true,
    align: "left"
  });

  // Prompt text (monospace feel)
  const promptLines = [
    'A minimalist [主题] in Anthropic design style,',
    'featuring hand-drawn line art with terracotta #C77B68',
    'on warm cream background #F5F1EE, charcoal lines #3D2C29,',
    'soft organic curves, rounded line endings,',
    'ample negative space, warm and approachable,',
    'flat vector art style'
  ];
  promptLines.forEach((line, i) => {
    slide.addText(line, {
      x: 0.85, y: boxY + 0.48 + i * 0.26, w: 8.3, h: 0.25,
      fontSize: 10.5, fontFace: "Consolas",
      color: theme.primary,
      align: "left"
    });
  });

  // ── Section 3: Style modifiers — two columns ──
  const modY = 4.2;

  // 必选 column
  slide.addText('必选修饰', {
    x: 0.5, y: modY, w: 4, h: 0.3,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true,
    align: "left"
  });
  const required = [
    'hand-drawn style',
    'minimalist line art',
    'soft organic curves',
    'rounded line endings'
  ];
  required.forEach((item, i) => {
    slide.addShape(pres.shapes.OVAL, {
      x: 0.55, y: modY + 0.38 + i * 0.24, w: 0.1, h: 0.1,
      fill: { color: theme.accent }
    });
    slide.addText(item, {
      x: 0.75, y: modY + 0.33 + i * 0.24, w: 3.8, h: 0.22,
      fontSize: 10, fontFace: "Consolas",
      color: theme.secondary,
      align: "left"
    });
  });

  // 可选 column
  slide.addText('可选修饰', {
    x: 5.2, y: modY, w: 4, h: 0.3,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true,
    align: "left"
  });
  const optional = [
    'warm aesthetic',
    'ample negative space',
    'geometric grid layout',
    'flat vector'
  ];
  optional.forEach((item, i) => {
    slide.addShape(pres.shapes.OVAL, {
      x: 5.25, y: modY + 0.38 + i * 0.24, w: 0.1, h: 0.1,
      fill: { color: theme.light }
    });
    slide.addText(item, {
      x: 5.45, y: modY + 0.33 + i * 0.24, w: 3.8, h: 0.22,
      fontSize: 10, fontFace: "Consolas",
      color: theme.secondary,
      align: "left"
    });
  });

  // Page badge
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 9.3, y: 5.1, w: 0.45, h: 0.28,
    fill: { color: theme.primary },
    rectRadius: 0.04
  });
  slide.addText('14', {
    x: 9.3, y: 5.1, w: 0.45, h: 0.28,
    fontSize: 10, fontFace: "Arial",
    color: "FFFFFF",
    align: "center", valign: "middle"
  });

  return slide;
}

module.exports = { createSlide, theme };
