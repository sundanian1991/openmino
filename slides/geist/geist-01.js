// geist-01.js — Cover Page
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'cover',
  index: 1,
  title: 'Anthropic × Geist 设计风格完全指南'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 右侧大色块
  slide.addShape('rect', {
    x: 6.2, y: 0, w: 3.8, h: 5.625,
    fill: { color: theme.accent }
  });

  // 色块内手绘装饰 — 圆形组合模拟手掌
  slide.addShape('ellipse', {
    x: 7.2, y: 1.8, w: 1.6, h: 1.8,
    fill: { color: "c4725a" },
    line: { color: "a85a44", width: 2 },
    rectRadius: 0
  });

  // 手指
  const fingers = [
    { x: 7.0, y: 1.0, w: 0.35, h: 1.0, rotate: 8 },
    { x: 7.4, y: 0.85, w: 0.32, h: 1.1, rotate: -2 },
    { x: 7.75, y: 0.9, w: 0.3, h: 1.0, rotate: -6 },
    { x: 8.05, y: 1.05, w: 0.28, h: 0.9, rotate: -12 },
    { x: 6.85, y: 1.6, w: 0.3, h: 0.8, rotate: -30 }
  ];
  fingers.forEach(f => {
    slide.addShape('roundRect', {
      x: f.x, y: f.y, w: f.w, h: f.h,
      fill: { color: "c4725a" },
      line: { color: "a85a44", width: 1.5 },
      rectRadius: 0.08,
      rotate: f.rotate
    });
  });

  // 色块底部文字
  slide.addText('Anthropic × Geist', {
    x: 6.2, y: 4.4, w: 3.8, h: 0.35,
    fontSize: 12, fontFace: "Georgia",
    color: "faf9f5", align: "center", italic: true,
    transparency: 30
  });

  // 左侧标题区
  slide.addShape('rect', {
    x: 0.6, y: 1.2, w: 1.5, h: 0.05,
    fill: { color: theme.accent }
  });

  slide.addText('Anthropic × Geist\n设计风格完全指南', {
    x: 0.6, y: 1.5, w: 5.2, h: 1.6,
    fontSize: 44, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true,
    align: "left", valign: "top",
    lineSpacingMultiple: 1.2
  });

  slide.addText('色彩系统 · 线条规则 · 构图法则 · 元素库', {
    x: 0.6, y: 3.3, w: 5.2, h: 0.4,
    fontSize: 18, fontFace: "Microsoft YaHei",
    color: theme.secondary
  });

  slide.addText('用温暖的手绘语言，讲述严谨的技术故事', {
    x: 0.6, y: 3.9, w: 5.2, h: 0.35,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: theme.accent, italic: true
  });

  // 底部信息
  slide.addShape('rect', {
    x: 0.6, y: 4.85, w: 5.2, h: 0.015,
    fill: { color: theme.light }
  });
  slide.addText('设计风格培训  |  2026', {
    x: 0.6, y: 5.0, w: 5.2, h: 0.3,
    fontSize: 12, fontFace: "Georgia",
    color: theme.light
  });

  return slide;
}

module.exports = { createSlide, slideConfig };
