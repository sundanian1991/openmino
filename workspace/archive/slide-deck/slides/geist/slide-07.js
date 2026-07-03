// slide-07.js - Content: 辅助色与中性色（双栏布局）
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 7,
  title: '辅助色与中性色'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 左侧色块
  slide.addShape('rect', {
    x: 0, y: 0, w: 0.08, h: 5.625,
    fill: { color: theme.accent },
    line: { color: theme.accent, width: 0 }
  });

  // 标题前装饰竖线
  slide.addShape('rect', {
    x: 0.4, y: 0.45, w: 0.04, h: 0.65,
    fill: { color: theme.accent },
    line: { color: theme.accent, width: 0 }
  });

  // 页面标题
  slide.addText(slideConfig.title, {
    x: 0.6, y: 0.5, w: 8.5, h: 0.55,
    fontSize: 32, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true, align: "left"
  });

  // === 中间分割线 ===
  slide.addShape('rect', {
    x: 4.85, y: 1.5, w: 0.02, h: 3.4,
    fill: { color: theme.light },
    line: { color: theme.light, width: 0 }
  });

  // === 左栏：辅助色 ===
  slide.addText('辅助色 · 无障碍支持', {
    x: 0.6, y: 1.35, w: 4, h: 0.4,
    fontSize: 16, fontFace: "Microsoft YaHei",
    color: theme.secondary, bold: true, align: "left"
  });

  const shades = [
    { name: 'Shade-1', hex: 'B85143', usage: '大文本/次要元素' },
    { name: 'Shade-2', hex: '9C4438', usage: '正文文本' },
    { name: 'Shade-3', hex: '7D372D', usage: '高对比文本/UI状态' },
    { name: 'Shade-4', hex: '5D2822', usage: '最高对比需求' }
  ];

  shades.forEach((s, i) => {
    const rowY = 1.9 + i * 0.6;

    // 小色块 swatch: 0.3" x 0.25"
    slide.addShape('rect', {
      x: 0.6, y: rowY, w: 0.3, h: 0.25,
      fill: { color: s.hex },
      line: { color: s.hex, width: 0 },
      rectRadius: 0.02
    });

    // 名称 + hex
    slide.addText(s.name + '  #' + s.hex, {
      x: 1.05, y: rowY - 0.05, w: 3.5, h: 0.3,
      fontSize: 13, fontFace: "Arial",
      color: theme.primary, bold: true, align: "left"
    });

    // 用途
    slide.addText(s.usage, {
      x: 1.05, y: rowY + 0.25, w: 3.5, h: 0.3,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: theme.secondary, align: "left"
    });
  });

  // === 右栏：中性色 ===
  slide.addText('中性色 · 温暖基底', {
    x: 5.1, y: 1.35, w: 4.5, h: 0.4,
    fontSize: 16, fontFace: "Microsoft YaHei",
    color: theme.secondary, bold: true, align: "left"
  });

  const neutrals = [
    { name: 'Cream/Ivory', hex: 'F5F1EE', usage: '主背景' },
    { name: 'Warm Grey Light', hex: 'E8E4E1', usage: '次背景' },
    { name: 'Warm Grey Mid', hex: 'C5C1BE', usage: '边框' },
    { name: 'Warm Grey Dark', hex: '8A8683', usage: '次要文字' },
    { name: 'Charcoal', hex: '3D2C29', usage: '主要文字' }
  ];

  neutrals.forEach((n, i) => {
    const rowY = 1.9 + i * 0.55;

    // 小色块 swatch: 0.3" x 0.25"
    slide.addShape('rect', {
      x: 5.1, y: rowY, w: 0.3, h: 0.25,
      fill: { color: n.hex },
      line: { color: n.hex, width: 0 },
      rectRadius: 0.02
    });

    // 名称 + hex
    slide.addText(n.name + '  #' + n.hex, {
      x: 5.55, y: rowY - 0.05, w: 4.2, h: 0.3,
      fontSize: 13, fontFace: "Arial",
      color: theme.primary, bold: true, align: "left"
    });

    // 用途
    slide.addText(n.usage, {
      x: 5.55, y: rowY + 0.25, w: 4.2, h: 0.3,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: theme.secondary, align: "left"
    });
  });

  // 页码徽章
  slide.addShape('rect', {
    x: 9.3, y: 5.1, w: 0.5, h: 0.35,
    fill: { color: theme.light },
    line: { color: theme.light, width: 0 }
  });
  slide.addText('07', {
    x: 9.3, y: 5.15, w: 0.5, h: 0.3,
    fontSize: 12, fontFace: "Arial",
    color: theme.secondary, align: "center"
  });

  return slide;
}

module.exports = { createSlide, slideConfig };
