// slide-03.js — Overview Summary
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 3,
  title: '三大板块联动调整，总人力从 305 增至 355，净增 50 人'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.04,
    fill: { color: theme.accent }
  });

  // Title
  slide.addText(slideConfig.title, {
    x: 0.8, y: 0.3, w: 8.5, h: 0.5,
    fontSize: 20, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  // 3 KPI cards
  const cards = [
    { label: '增信老客', before: '60', after: '40', delta: '-20', deltaColor: 'B85450', desc: '赛马减量，排名靠前多减' },
    { label: '拉新', before: '235', after: '275', delta: '+40', deltaColor: '2b2d42', desc: '增信转入 20 + 新增 20' },
    { label: '采购融资', before: '10', after: '40', delta: '+30', deltaColor: '2b2d42', desc: '扩量 + 新准入测试' }
  ];

  cards.forEach((c, i) => {
    const cx = 0.8 + i * 3.1;
    const cy = 1.1;

    // Card background
    slide.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cy, w: 2.9, h: 2.0,
      fill: { color: 'FFFFFF' },
      rectRadius: 0.03,
      line: { color: theme.light, width: 0.5 }
    });

    // Shadow effect (offset rectangle)
    slide.addShape(pres.shapes.RECTANGLE, {
      x: cx + 0.03, y: cy + 0.03, w: 2.9, h: 0.06,
      fill: { color: theme.light }, rectRadius: 0.02
    });

    // Left accent bar
    slide.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cy, w: 0.06, h: 2.0,
      fill: { color: theme.accent }, rectRadius: 0.02
    });

    // Label
    slide.addText(c.label, {
      x: cx + 0.2, y: cy + 0.15, w: 2.5, h: 0.3,
      fontSize: 14, fontFace: "Microsoft YaHei",
      color: theme.primary, bold: true
    });

    // Before → After
    slide.addText(c.before, {
      x: cx + 0.2, y: cy + 0.55, w: 0.8, h: 0.5,
      fontSize: 28, fontFace: "Arial",
      color: theme.secondary, bold: true, align: "center"
    });

    slide.addText('→', {
      x: cx + 0.95, y: cy + 0.55, w: 0.4, h: 0.5,
      fontSize: 28, fontFace: "Arial",
      color: theme.light, align: "center"
    });

    slide.addText(c.after, {
      x: cx + 1.3, y: cy + 0.55, w: 0.8, h: 0.5,
      fontSize: 28, fontFace: "Arial",
      color: theme.primary, bold: true, align: "center"
    });

    // Delta badge
    slide.addShape(pres.shapes.RECTANGLE, {
      x: cx + 0.7, y: cy + 1.1, w: 1.0, h: 0.3,
      fill: { color: c.deltaColor }, rectRadius: 0.05
    });

    slide.addText(c.delta, {
      x: cx + 0.7, y: cy + 1.1, w: 1.0, h: 0.3,
      fontSize: 14, fontFace: "Arial",
      color: 'FFFFFF', bold: true, align: "center"
    });

    // Description
    slide.addText(c.desc, {
      x: cx + 0.2, y: cy + 1.5, w: 2.5, h: 0.4,
      fontSize: 10, fontFace: "Microsoft YaHei",
      color: theme.secondary, align: "center"
    });
  });

  // Flow summary box
  const flowY = 3.4;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: flowY, w: 8.4, h: 1.8,
    fill: { color: 'FFFFFF' },
    rectRadius: 0.03,
    line: { color: theme.light, width: 0.5 }
  });

  // Flow box left accent
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: flowY, w: 0.06, h: 1.8,
    fill: { color: theme.accent }
  });

  slide.addText('人力流向', {
    x: 1.1, y: flowY + 0.15, w: 3, h: 0.3,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  // Flow data
  const flowRows = [
    { text: '增信老客 60人  -20（赛马排名靠前减量）→  调整后 40人', y: flowY + 0.5 },
    { text: '↓ 20人全部转入拉新板块', y: flowY + 0.85 },
    { text: '拉新 235人  +20增信转入 +20新增排名分配  →  调整后 275人', y: flowY + 1.2 },
    { text: '采购融资 10人  +30新增（扩量+新准入）  →  调整后 40人', y: flowY + 1.55 }
  ];

  flowRows.forEach(r => {
    slide.addText(r.text, {
      x: 1.1, y: r.y, w: 7.8, h: 0.3,
      fontSize: 12, fontFace: "Microsoft YaHei",
      color: theme.secondary
    });
  });

  // Net total callout
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: flowY + 1.85, w: 8.4, h: 0.35,
    fill: { color: theme.accent }, rectRadius: 0.03
  });

  slide.addText('净增 +50 人  |  增信优化结构 → 拉新承接产能 → 采购融资开拓新业务', {
    x: 0.8, y: flowY + 1.85, w: 8.4, h: 0.35,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: 'FFFFFF', bold: true, align: "center"
  });

  // Page badge
  slide.addText('3', {
    x: 9.3, y: 5.1, w: 0.5, h: 0.3,
    fontSize: 10, fontFace: "Arial",
    color: theme.secondary, align: "center",
    fill: { color: theme.light }
  });

  return slide;
}

module.exports = { createSlide, slideConfig };
