// slide-02.js — Table of Contents
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'toc',
  index: 2,
  title: '目录'
};

const sections = [
  { num: '01', title: '调整总览', desc: '三板块联动，净增 50 人' },
  { num: '02', title: '增信老客 — 赛马减量', desc: '排名靠前多减，60→40 人' },
  { num: '03', title: '拉新 — 增信转入 + 排名新增', desc: '235→275 人，按赛马排名分配' },
  { num: '04', title: '采购融资 — 宽进严出', desc: '金企融合测试，3 留 2 淘汰' }
];

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.04,
    fill: { color: theme.accent }
  });

  slide.addText(slideConfig.title, {
    x: 0.8, y: 0.5, w: 4, h: 0.6,
    fontSize: 28, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  // Sections
  sections.forEach((sec, i) => {
    const y = 1.4 + i * 1.0;

    // Number circle background
    slide.addShape(pres.shapes.OVAL, {
      x: 0.9, y: y + 0.05, w: 0.45, h: 0.45,
      fill: { color: theme.accent }
    });

    slide.addText(sec.num, {
      x: 0.9, y: y + 0.05, w: 0.45, h: 0.45,
      fontSize: 14, fontFace: "Arial",
      color: 'FFFFFF', bold: true, align: "center",
      valign: "middle"
    });

    // Title
    slide.addText(sec.title, {
      x: 1.6, y: y, w: 6, h: 0.35,
      fontSize: 18, fontFace: "Microsoft YaHei",
      color: theme.primary, bold: true
    });

    // Description
    slide.addText(sec.desc, {
      x: 1.6, y: y + 0.35, w: 6, h: 0.3,
      fontSize: 12, fontFace: "Microsoft YaHei",
      color: theme.secondary
    });

    // Divider line between items
    if (i < sections.length - 1) {
      slide.addShape(pres.shapes.RECTANGLE, {
        x: 1.6, y: y + 0.75, w: 7.5, h: 0.01,
        fill: { color: theme.light }
      });
    }
  });

  // Page badge
  slide.addText('2', {
    x: 9.3, y: 5.1, w: 0.5, h: 0.3,
    fontSize: 10, fontFace: "Arial",
    color: theme.secondary, align: "center",
    fill: { color: theme.light }
  });

  return slide;
}

module.exports = { createSlide, slideConfig };
