// geist-14.js — Content: 色彩心理学 + 竞品对比 + 语调映射
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 14,
  title: '色彩心理学与竞品差异化'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addShape('rect', {
    x: 0, y: 0, w: 0.08, h: 5.625,
    fill: { color: theme.accent }
  });

  slide.addText(slideConfig.title, {
    x: 0.5, y: 0.35, w: 9, h: 0.6,
    fontSize: 28, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  // === 左栏：色彩心理学 ===
  slide.addText('陶土色传递的信号', {
    x: 0.5, y: 1.1, w: 4.3, h: 0.35,
    fontSize: 15, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  const psychSignals = [
    { icon: '手掌', text: '"我们是可亲近的"' },
    { icon: '放大镜', text: '"我们重视手工细节"' },
    { icon: '锚点', text: '"我们有扎实根基"' },
    { icon: '心脏', text: '"我们不只是冰冷的科技"' }
  ];

  psychSignals.forEach((s, i) => {
    const y = 1.55 + i * 0.45;
    slide.addShape('ellipse', {
      x: 0.6, y: y + 0.05, w: 0.2, h: 0.2,
      fill: { color: theme.accent }
    });
    slide.addText(s.text, {
      x: 0.95, y: y, w: 3.5, h: 0.35,
      fontSize: 13, fontFace: "Microsoft YaHei",
      color: theme.secondary, italic: true
    });
  });

  // === 右栏：竞品对比 ===
  slide.addText('竞品色彩对比', {
    x: 5.2, y: 1.1, w: 4.3, h: 0.35,
    fontSize: 15, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  const competitors = [
    { brand: 'OpenAI', color: '3B82F6', feel: '冷蓝/白 — 精英、科技感' },
    { brand: 'ChatGPT', color: '10A37F', feel: '绿/黑 — 实用、功能' },
    { brand: 'Claude', color: 'E2725B', feel: '陶土/米白 — 温暖、可信', highlight: true }
  ];

  competitors.forEach((c, i) => {
    const y = 1.55 + i * 0.65;
    // 品牌色块
    slide.addShape('roundRect', {
      x: 5.3, y: y, w: 0.4, h: 0.35,
      fill: { color: c.color }, rectRadius: 0.04
    });
    slide.addText(c.brand, {
      x: 5.85, y: y - 0.03, w: 1.5, h: 0.25,
      fontSize: 13, fontFace: "Arial",
      color: c.highlight ? theme.accent : theme.primary, bold: true
    });
    slide.addText(c.feel, {
      x: 5.85, y: y + 0.22, w: 3.5, h: 0.25,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: c.highlight ? theme.accent : theme.secondary
    });
  });

  // === 底部：语调映射 ===
  slide.addShape('roundRect', {
    x: 0.5, y: 3.6, w: 9, h: 1.6,
    fill: { color: theme.primary }, rectRadius: 0.06
  });

  slide.addText('语调视觉映射', {
    x: 0.7, y: 3.7, w: 8.6, h: 0.35,
    fontSize: 16, fontFace: "Microsoft YaHei",
    color: "FFFFFF", bold: true
  });

  const tones = [
    { tone: '严谨', visual: '网格对齐、模块化结构' },
    { tone: '温暖', visual: '陶土色、手形、柔和曲线' },
    { tone: '现代', visual: '极简、留白、几何元素' },
    { tone: '人文', visual: '手绘感、自然意象、故事性' }
  ];

  tones.forEach((t, i) => {
    const tx = 0.8 + i * 2.15;
    slide.addShape('roundRect', {
      x: tx, y: 4.15, w: 1.9, h: 0.85,
      fill: { color: theme.accent, transparency: 80 },
      line: { color: theme.accent, width: 0.5 },
      rectRadius: 0.05
    });
    slide.addText(t.tone, {
      x: tx + 0.1, y: 4.2, w: 1.7, h: 0.3,
      fontSize: 14, fontFace: "Microsoft YaHei",
      color: "FFFFFF", bold: true, align: "center"
    });
    slide.addText(t.visual, {
      x: tx + 0.1, y: 4.55, w: 1.7, h: 0.4,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: "D0D0D0", align: "center"
    });
  });

  // 页码
  slide.addShape('roundRect', {
    x: 9.3, y: 5.15, w: 0.5, h: 0.3,
    fill: { color: theme.light }, rectRadius: 0.05
  });
  slide.addText('14', {
    x: 9.3, y: 5.18, w: 0.5, h: 0.25,
    fontSize: 11, fontFace: "Arial",
    color: theme.secondary, align: "center"
  });

  return slide;
}

module.exports = { createSlide, slideConfig };
