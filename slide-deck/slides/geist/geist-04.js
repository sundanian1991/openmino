// geist-04.js — Content: 三大核心支柱 + 一句话描述
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 4,
  title: '三大核心支柱'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 左侧强调条
  slide.addShape('rect', {
    x: 0, y: 0, w: 0.08, h: 5.625,
    fill: { color: theme.accent }
  });

  // 标题
  slide.addText(slideConfig.title, {
    x: 0.5, y: 0.4, w: 9, h: 0.7,
    fontSize: 36, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  // 三张卡片
  const pillars = [
    { char: '温', name: '温暖', iconColor: theme.accent, meaning: '陶土色传递的质朴感', expression: 'Terracotta 主调 + 手形元素' },
    { char: '严', name: '严谨', iconColor: theme.secondary, meaning: '技术公司的可信度', expression: '几何网格 + 模块化结构' },
    { char: '克', name: '克制', iconColor: theme.primary, meaning: '少即是多的美学', expression: '充裕留白 + 精简元素' }
  ];

  const cardW = 2.8;
  const gap = 0.35;
  const startX = 0.5;
  const cardY = 1.4;
  const cardH = 3.2;

  pillars.forEach((p, i) => {
    const x = startX + i * (cardW + gap);

    // 卡片背景
    slide.addShape('roundRect', {
      x: x, y: cardY, w: cardW, h: cardH,
      fill: { color: "FFFFFF" },
      line: { color: theme.light, width: 0.5 },
      rectRadius: 0.08,
      shadow: { type: "outer", blur: 6, offset: 2, color: "000000", opacity: 0.1 }
    });

    // 左侧强调条
    slide.addShape('rect', {
      x: x, y: cardY, w: 0.06, h: cardH,
      fill: { color: theme.accent }
    });

    // 圆形图标
    const iconSize = 0.8;
    const iconX = x + (cardW - iconSize) / 2;
    slide.addShape('ellipse', {
      x: iconX, y: cardY + 0.35, w: iconSize, h: iconSize,
      fill: { color: p.iconColor }
    });
    slide.addText(p.char, {
      x: iconX, y: cardY + 0.35, w: iconSize, h: iconSize,
      fontSize: 16, fontFace: "Microsoft YaHei",
      color: "FFFFFF", bold: true, align: "center", valign: "middle"
    });

    // 名称
    slide.addText(p.name, {
      x: x, y: cardY + 1.3, w: cardW, h: 0.4,
      fontSize: 20, fontFace: "Microsoft YaHei",
      color: theme.primary, bold: true, align: "center"
    });

    // 分割线
    slide.addShape('rect', {
      x: x + 0.4, y: cardY + 1.75, w: cardW - 0.8, h: 0.02,
      fill: { color: theme.light }
    });

    // 内涵
    slide.addText('内涵', {
      x: x + 0.25, y: cardY + 1.9, w: cardW - 0.5, h: 0.25,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: theme.accent, bold: true
    });
    slide.addText(p.meaning, {
      x: x + 0.25, y: cardY + 2.15, w: cardW - 0.5, h: 0.3,
      fontSize: 12, fontFace: "Microsoft YaHei",
      color: theme.secondary
    });

    // 表现
    slide.addText('表现', {
      x: x + 0.25, y: cardY + 2.5, w: cardW - 0.5, h: 0.25,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: theme.accent, bold: true
    });
    slide.addText(p.expression, {
      x: x + 0.25, y: cardY + 2.75, w: cardW - 0.5, h: 0.3,
      fontSize: 12, fontFace: "Microsoft YaHei",
      color: theme.secondary
    });
  });

  // 底部引言
  slide.addShape('roundRect', {
    x: 0.5, y: 4.8, w: 9, h: 0.55,
    fill: { color: theme.accent }, rectRadius: 0.04
  });
  slide.addText('"用温暖的手绘语言，讲述严谨的技术故事"', {
    x: 0.7, y: 4.83, w: 8.6, h: 0.5,
    fontSize: 15, fontFace: "Microsoft YaHei",
    color: "FFFFFF", italic: true, align: "center"
  });

  // 页码
  slide.addShape('roundRect', {
    x: 9.3, y: 5.15, w: 0.5, h: 0.3,
    fill: { color: theme.light }, rectRadius: 0.05
  });
  slide.addText('04', {
    x: 9.3, y: 5.18, w: 0.5, h: 0.25,
    fontSize: 11, fontFace: "Arial",
    color: theme.secondary, align: "center"
  });

  return slide;
}

module.exports = { createSlide, slideConfig };
