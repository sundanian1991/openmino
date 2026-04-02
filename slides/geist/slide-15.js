// slide-15.js - Content: 实战案例 (Timeline/Process)
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
  slide.addText('实战案例', {
    x: 0.5, y: 0.35, w: 9, h: 0.6,
    fontSize: 28, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true,
    align: "left"
  });

  // Subtitle
  slide.addText('从主题到 Prompt，三个真实场景', {
    x: 0.5, y: 0.9, w: 9, h: 0.35,
    fontSize: 13, fontFace: "Microsoft YaHei",
    color: theme.light,
    align: "left"
  });

  // ── Three case cards in a horizontal row ──
  const cases = [
    {
      letter: 'A',
      title: '写作主题图标',
      elements: '手 + 笔记本电脑',
      prompt: '5\u00D75 grid, terracotta fill on cream',
      desc: '手绘风格写作工具图标集'
    },
    {
      letter: 'B',
      title: '音乐主题插画',
      elements: '抽象音乐元素 + 手形',
      prompt: 'flowing movement, ample negative space',
      desc: '流动感音乐创意插画'
    },
    {
      letter: 'C',
      title: '学习成长主题',
      elements: '手 + 植物 + 书籍',
      prompt: 'symbolizing learning and growth',
      desc: '成长培育概念插画'
    }
  ];

  const cardW = 2.8;
  const cardH = 3.3;
  const gap = 0.35;
  const cardsStartX = 0.5;
  const cardsY = 1.45;

  cases.forEach((c, i) => {
    const cx = cardsStartX + i * (cardW + gap);

    // Card background (white)
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: cx, y: cardsY, w: cardW, h: cardH,
      fill: { color: "FFFFFF" },
      line: { color: theme.light, width: 1 },
      rectRadius: 0.08
    });

    // Top accent border
    slide.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cardsY, w: cardW, h: 0.05,
      fill: { color: theme.accent }
    });

    // Case letter circle
    slide.addShape(pres.shapes.OVAL, {
      x: cx + cardW / 2 - 0.22, y: cardsY + 0.2, w: 0.44, h: 0.44,
      fill: { color: theme.accent }
    });
    slide.addText(c.letter, {
      x: cx + cardW / 2 - 0.22, y: cardsY + 0.2, w: 0.44, h: 0.44,
      fontSize: 18, fontFace: "Arial",
      color: "FFFFFF", bold: true,
      align: "center", valign: "middle"
    });

    // Case title
    slide.addText(c.title, {
      x: cx + 0.15, y: cardsY + 0.75, w: cardW - 0.3, h: 0.35,
      fontSize: 14, fontFace: "Microsoft YaHei",
      color: theme.primary, bold: true,
      align: "center"
    });

    // Case description
    slide.addText(c.desc, {
      x: cx + 0.15, y: cardsY + 1.1, w: cardW - 0.3, h: 0.3,
      fontSize: 10, fontFace: "Microsoft YaHei",
      color: theme.secondary,
      align: "center"
    });

    // Separator line
    slide.addShape(pres.shapes.RECTANGLE, {
      x: cx + 0.3, y: cardsY + 1.5, w: cardW - 0.6, h: 0.015,
      fill: { color: theme.light }
    });

    // Elements label
    slide.addText('核心元素', {
      x: cx + 0.15, y: cardsY + 1.6, w: cardW - 0.3, h: 0.22,
      fontSize: 9, fontFace: "Microsoft YaHei",
      color: theme.accent, bold: true,
      align: "left"
    });
    slide.addText(c.elements, {
      x: cx + 0.15, y: cardsY + 1.82, w: cardW - 0.3, h: 0.35,
      fontSize: 10, fontFace: "Microsoft YaHei",
      color: theme.primary,
      align: "left"
    });

    // Prompt keywords label
    slide.addText('Prompt 关键词', {
      x: cx + 0.15, y: cardsY + 2.25, w: cardW - 0.3, h: 0.22,
      fontSize: 9, fontFace: "Microsoft YaHei",
      color: theme.accent, bold: true,
      align: "left"
    });
    slide.addText(c.prompt, {
      x: cx + 0.15, y: cardsY + 2.47, w: cardW - 0.3, h: 0.5,
      fontSize: 9.5, fontFace: "Consolas",
      color: theme.secondary,
      align: "left"
    });

    // Connecting arrow between cards
    if (i < cases.length - 1) {
      const arrowX = cx + cardW + 0.03;
      slide.addText('\u2192', {
        x: arrowX, y: cardsY + cardH / 2 - 0.2, w: gap - 0.06, h: 0.4,
        fontSize: 18, fontFace: "Arial",
        color: theme.light,
        align: "center", valign: "middle"
      });
    }
  });

  // Page badge
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 9.3, y: 5.1, w: 0.45, h: 0.28,
    fill: { color: theme.primary },
    rectRadius: 0.04
  });
  slide.addText('15', {
    x: 9.3, y: 5.1, w: 0.45, h: 0.28,
    fontSize: 10, fontFace: "Arial",
    color: "FFFFFF",
    align: "center", valign: "middle"
  });

  return slide;
}

module.exports = { createSlide, theme };
