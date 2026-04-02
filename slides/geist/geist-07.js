// geist-07.js — Content: 辅助色、中性色、点缀色（三栏布局）
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 7,
  title: '辅助色 · 中性色 · 点缀色'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addShape('rect', {
    x: 0, y: 0, w: 0.08, h: 5.625,
    fill: { color: theme.accent }
  });

  slide.addShape('rect', {
    x: 0.4, y: 0.45, w: 0.04, h: 0.65,
    fill: { color: theme.accent }
  });

  slide.addText(slideConfig.title, {
    x: 0.6, y: 0.5, w: 8.5, h: 0.55,
    fontSize: 32, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  // 三栏分割线
  slide.addShape('rect', {
    x: 3.4, y: 1.3, w: 0.02, h: 3.5,
    fill: { color: theme.light }
  });
  slide.addShape('rect', {
    x: 6.6, y: 1.3, w: 0.02, h: 3.5,
    fill: { color: theme.light }
  });

  // === 左栏：辅助色 ===
  slide.addText('辅助色 · 无障碍支持', {
    x: 0.6, y: 1.2, w: 2.5, h: 0.35,
    fontSize: 15, fontFace: "Microsoft YaHei",
    color: theme.secondary, bold: true
  });

  const shades = [
    { name: 'Shade-1', hex: 'B85143', usage: '大文本/次要元素' },
    { name: 'Shade-2', hex: '9C4438', usage: '正文文本' },
    { name: 'Shade-3', hex: '7D372D', usage: '高对比文本/UI状态' },
    { name: 'Shade-4', hex: '5D2822', usage: '最高对比需求' }
  ];

  shades.forEach((s, i) => {
    const y = 1.7 + i * 0.55;
    slide.addShape('roundRect', {
      x: 0.6, y: y, w: 0.3, h: 0.25,
      fill: { color: s.hex }, rectRadius: 0.02
    });
    slide.addText(s.name + '  #' + s.hex, {
      x: 1.05, y: y - 0.03, w: 2, h: 0.25,
      fontSize: 12, fontFace: "Arial",
      color: theme.primary, bold: true
    });
    slide.addText(s.usage, {
      x: 1.05, y: y + 0.22, w: 2, h: 0.25,
      fontSize: 10, fontFace: "Microsoft YaHei",
      color: theme.secondary
    });
  });

  // === 中栏：中性色 ===
  slide.addText('中性色 · 温暖基底', {
    x: 3.65, y: 1.2, w: 2.5, h: 0.35,
    fontSize: 15, fontFace: "Microsoft YaHei",
    color: theme.secondary, bold: true
  });

  const neutrals = [
    { name: 'Cream/Ivory', hex: 'F5F1EE', usage: '主背景' },
    { name: 'Warm Grey Light', hex: 'E8E4E1', usage: '次背景、卡片' },
    { name: 'Warm Grey Mid', hex: 'C5C1BE', usage: '边框、分割线' },
    { name: 'Warm Grey Dark', hex: '8A8683', usage: '次要文字' },
    { name: 'Charcoal', hex: '3D2C29', usage: '主要文字、线条' }
  ];

  neutrals.forEach((n, i) => {
    const y = 1.7 + i * 0.5;
    slide.addShape('roundRect', {
      x: 3.65, y: y, w: 0.3, h: 0.25,
      fill: { color: n.hex },
      line: { color: "C5C1BE", width: 0.5 },
      rectRadius: 0.02
    });
    slide.addText(n.name + '  #' + n.hex, {
      x: 4.1, y: y - 0.03, w: 2.2, h: 0.25,
      fontSize: 12, fontFace: "Arial",
      color: theme.primary, bold: true
    });
    slide.addText(n.usage, {
      x: 4.1, y: y + 0.22, w: 2.2, h: 0.25,
      fontSize: 10, fontFace: "Microsoft YaHei",
      color: theme.secondary
    });
  });

  // === 右栏：点缀色 ===
  slide.addText('点缀色 · 谨慎使用', {
    x: 6.85, y: 1.2, w: 2.5, h: 0.35,
    fontSize: 15, fontFace: "Microsoft YaHei",
    color: theme.secondary, bold: true
  });

  const accents = [
    { name: 'Deep Blue', hex: '2C5F7D', usage: '链接、CTA', note: '色盲友好' },
    { name: 'Muted Teal', hex: '4A7C8B', usage: '次要点缀', note: '极少使用' },
    { name: 'Soft Sage', hex: '8BA87A', usage: '装饰元素', note: '自然意象' }
  ];

  accents.forEach((a, i) => {
    const y = 1.7 + i * 0.55;
    slide.addShape('roundRect', {
      x: 6.85, y: y, w: 0.3, h: 0.25,
      fill: { color: a.hex }, rectRadius: 0.02
    });
    slide.addText(a.name + '  #' + a.hex, {
      x: 7.3, y: y - 0.03, w: 2.2, h: 0.25,
      fontSize: 12, fontFace: "Arial",
      color: theme.primary, bold: true
    });
    slide.addText(a.usage + ' — ' + a.note, {
      x: 7.3, y: y + 0.22, w: 2.2, h: 0.25,
      fontSize: 10, fontFace: "Microsoft YaHei",
      color: theme.secondary
    });
  });

  // 页码
  slide.addShape('roundRect', {
    x: 9.3, y: 5.15, w: 0.5, h: 0.3,
    fill: { color: theme.light }, rectRadius: 0.05
  });
  slide.addText('07', {
    x: 9.3, y: 5.18, w: 0.5, h: 0.25,
    fontSize: 11, fontFace: "Arial",
    color: theme.secondary, align: "center"
  });

  return slide;
}

module.exports = { createSlide, slideConfig };
