/**
 * Slide 19 - Summary (核心要点总结)
 */

const slideConfig = {
  type: "summary",
  index: 19,
  title: "核心要点总结"
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();

  // Background
  slide.background = { color: theme.bg };

  // Title with accent bar
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.6,
    y: 0.5,
    w: 0.15,
    h: 0.6,
    fill: { color: theme.accent },
    line: { color: theme.accent, width: 0 }
  });

  slide.addText(slideConfig.title, {
    x: 0.9,
    y: 0.5,
    w: 8.5,
    h: 0.6,
    fontSize: 32,
    fontFace: "Microsoft YaHei",
    color: theme.primary,
    bold: true
  });

  // Key takeaway cards
  const keyPoints = [
    {
      icon: "🎯",
      title: "关键话术 1：边界澄清",
      content: "\"我想先确认一下，你刚才说的 [复述原话]，具体是指什么？我希望我们能在同一语境下讨论。\"",
      tip: "用途：拆解模糊指控，让对方说清楚"
    },
    {
      icon: "🛡️",
      title: "关键话术 2：温和反击",
      content: "\"我理解你有顾虑，但这个说法不太准确。能否告诉我，你的判断依据是什么？\"",
      tip: "用途：不陷入情绪，温和但要事实"
    },
    {
      icon: "🤝",
      title: "关键话术 3：升维共识",
      content: "\"我们目标是一致的——把事做好。与其纠结谁的问题，不如一起想想怎么解决？\"",
      tip: "用途：跳出对抗框架，回归问题本身"
    }
  ];

  keyPoints.forEach((point, index) => {
    const y = 1.4 + (index * 1.25);

    // Card background
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.6,
      y: y,
      w: 8.8,
      h: 1.1,
      fill: { color: theme.light, transparency: 65 },
      line: { color: theme.accent, width: 1.5 },
      rectRadius: 0.12
    });

    // Icon background circle
    slide.addShape(pres.shapes.OVAL, {
      x: 0.85,
      y: y + 0.15,
      w: 0.7,
      h: 0.7,
      fill: { color: theme.accent, transparency: 20 }
    });

    // Icon
    slide.addText(point.icon, {
      x: 0.85,
      y: y + 0.15,
      w: 0.7,
      h: 0.7,
      fontSize: 24,
      fontFace: "Arial",
      color: theme.primary,
      align: "center",
      valign: "middle"
    });

    // Title
    slide.addText(point.title, {
      x: 1.7,
      y: y + 0.15,
      w: 7.5,
      h: 0.35,
      fontSize: 15,
      fontFace: "Microsoft YaHei",
      color: theme.primary,
      bold: true
    });

    // Content
    slide.addText(point.content, {
      x: 1.7,
      y: y + 0.5,
      w: 7.5,
      h: 0.4,
      fontSize: 13,
      fontFace: "Microsoft YaHei",
      color: theme.secondary,
      valign: "top"
    });

    // Tip
    slide.addText(point.tip, {
      x: 1.7,
      y: y + 0.88,
      w: 7.5,
      h: 0.2,
      fontSize: 11,
      fontFace: "Microsoft YaHei",
      color: theme.accent,
      italic: true
    });
  });

  // Bottom decorative line
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.6,
    y: 4.85,
    w: 8.8,
    h: 0.08,
    fill: { color: theme.accent },
    line: { color: theme.accent, width: 0 }
  });

  // Page number badge
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3,
    y: 5.1,
    w: 0.4,
    h: 0.4,
    fill: { color: theme.accent }
  });
  slide.addText("19", {
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
