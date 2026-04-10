// slide-01.js — Cover
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'cover',
  index: 1,
  title: '主贷大额人力调整方案',
  subtitle: '增信减量 20 人 → 拉新增量 40 人 → 采购融资新增 30 人 | 净增 50 人'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // Top accent line
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.04,
    fill: { color: theme.accent }
  });

  // Left accent bar
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 2.0, w: 0.06, h: 1.8,
    fill: { color: theme.accent }
  });

  // Main title
  slide.addText(slideConfig.title, {
    x: 1.1, y: 2.0, w: 8, h: 1.2,
    fontSize: 40, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true,
    align: "left"
  });

  // Subtitle
  slide.addText(slideConfig.subtitle, {
    x: 1.1, y: 3.3, w: 8, h: 0.8,
    fontSize: 16, fontFace: "Microsoft YaHei",
    color: theme.secondary, align: "left"
  });

  // Divider line
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 1.1, y: 4.2, w: 3, h: 0.02,
    fill: { color: theme.light }
  });

  // Meta info
  slide.addText('汇报人：年老师  |  数据科技业务部  |  2026年4月', {
    x: 1.1, y: 4.4, w: 6, h: 0.4,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: theme.secondary, align: "left"
  });

  // KPI cards row - 4 cards
  const kpis = [
    { val: '305→355', lbl: '总人力', accent: false },
    { val: '+50', lbl: '净增', accent: true },
    { val: '3大板块', lbl: '调整范围', accent: false },
    { val: '赛马机制', lbl: '分配逻辑', accent: false }
  ];

  kpis.forEach((kp, i) => {
    const cardX = 0.8 + i * 2.3;
    const cardY = 4.9;

    // Card background
    slide.addShape(pres.shapes.RECTANGLE, {
      x: cardX, y: cardY, w: 2.1, h: 0.55,
      fill: { color: kp.accent ? theme.accent : theme.light },
      rectRadius: 0.03
    });

    slide.addText(kp.val, {
      x: cardX, y: cardY, w: 2.1, h: 0.3,
      fontSize: 20, fontFace: "Arial",
      color: kp.accent ? 'FFFFFF' : theme.primary,
      bold: true, align: "center"
    });

    slide.addText(kp.lbl, {
      x: cardX, y: cardY + 0.3, w: 2.1, h: 0.25,
      fontSize: 10, fontFace: "Microsoft YaHei",
      color: kp.accent ? 'FFFFFF' : theme.secondary, align: "center"
    });
  });

  // Page badge
  slide.addText('1', {
    x: 9.3, y: 5.1, w: 0.5, h: 0.3,
    fontSize: 10, fontFace: "Arial",
    color: theme.secondary, align: "center",
    fill: { color: theme.light },
    rectRadius: 0.02
  });

  return slide;
}

module.exports = { createSlide, slideConfig };
