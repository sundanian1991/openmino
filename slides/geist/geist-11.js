// geist-11.js — Content: 构图与网格系统 + 间距 Token
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 11,
  title: '构图与网格系统'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addShape('rect', {
    x: 0, y: 0, w: 0.08, h: 5.625,
    fill: { color: theme.accent }
  });

  slide.addText(slideConfig.title, {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 30, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  // === 左：5×5 网格 ===
  slide.addText('5×5 方格矩阵系统', {
    x: 0.5, y: 1.1, w: 4.2, h: 0.35,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true, align: "center"
  });

  const gridX = 0.7, gridY = 1.6, gridW = 3.8, gridH = 2.5;
  const cellW = gridW / 5, cellH = gridH / 5;

  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      slide.addShape('rect', {
        x: gridX + c * cellW, y: gridY + r * cellH,
        w: cellW, h: cellH,
        fill: { color: theme.bg },
        line: { color: theme.light, width: 0.5 }
      });
    }
  }
  // 焦点格
  slide.addShape('rect', {
    x: gridX + 2 * cellW, y: gridY + 2 * cellH, w: cellW, h: cellH,
    fill: { color: theme.accent, transparency: 75 }
  });

  slide.addText('每格 = 1 个视觉单元', {
    x: 0.5, y: 4.2, w: 4.2, h: 0.3,
    fontSize: 11, fontFace: "Microsoft YaHei",
    color: theme.secondary, align: "center"
  });

  // === 右：网格规格表 + 间距 Token ===
  slide.addText('网格规格', {
    x: 5.2, y: 1.1, w: 4.3, h: 0.3,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  // 表头
  slide.addShape('rect', {
    x: 5.2, y: 1.45, w: 4.3, h: 0.3,
    fill: { color: theme.primary }
  });
  ['设备', '列数', '间距', '边距', '最大宽度'].forEach((h, i) => {
    slide.addText(h, {
      x: 5.2 + i * 0.86, y: 1.48, w: 0.86, h: 0.25,
      fontSize: 9, fontFace: "Microsoft YaHei",
      color: "FFFFFF", bold: true, align: "center"
    });
  });

  const rows = [
    { d: 'Desktop', c: '12列', g: '24px', m: '24px', w: '1440px' },
    { d: 'Tablet', c: '8列', g: '16px', m: '16px', w: '768px' },
    { d: 'Mobile', c: '4列', g: '12px', m: '16px', w: '390px' }
  ];
  rows.forEach((r, i) => {
    const ry = 1.75 + i * 0.3;
    const bg = i % 2 === 0 ? "FFFFFF" : "F7F5F3";
    slide.addShape('rect', { x: 5.2, y: ry, w: 4.3, h: 0.3, fill: { color: bg } });
    [r.d, r.c, r.g, r.m, r.w].forEach((v, j) => {
      slide.addText(v, {
        x: 5.2 + j * 0.86, y: ry + 0.02, w: 0.86, h: 0.25,
        fontSize: 10, fontFace: j === 0 ? "Microsoft YaHei" : "Arial",
        color: j === 0 ? theme.primary : theme.secondary,
        bold: j === 0, align: "center"
      });
    });
  });

  // 间距 Token
  slide.addText('关键间距 Token (基于 4px 单元)', {
    x: 5.2, y: 2.9, w: 4.3, h: 0.3,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });
  slide.addShape('rect', {
    x: 5.2, y: 3.25, w: 4.3, h: 0.015,
    fill: { color: theme.light }
  });

  const tokens = [
    { name: 'space.4', val: '16px', desc: '默认' },
    { name: 'space.6', val: '24px', desc: '中等' },
    { name: 'space.8', val: '32px', desc: '大间距' },
    { name: 'space.12', val: '48px', desc: '页面级' }
  ];
  tokens.forEach((t, i) => {
    const ty = 3.35 + i * 0.35;
    slide.addText(t.name, {
      x: 5.3, y: ty, w: 1.2, h: 0.3,
      fontSize: 12, fontFace: "Arial",
      color: theme.accent, bold: true
    });
    slide.addText(t.val, {
      x: 6.5, y: ty, w: 0.8, h: 0.3,
      fontSize: 12, fontFace: "Arial",
      color: theme.primary, bold: true
    });
    slide.addText(t.desc, {
      x: 7.35, y: ty, w: 1.5, h: 0.3,
      fontSize: 12, fontFace: "Microsoft YaHei",
      color: theme.secondary
    });
  });

  // 留白强调
  slide.addShape('roundRect', {
    x: 5.2, y: 4.8, w: 4.3, h: 0.35,
    fill: { color: theme.primary }, rectRadius: 0.04
  });
  slide.addText('留白 > 40%', {
    x: 5.3, y: 4.82, w: 4.1, h: 0.3,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: "FFFFFF", bold: true, align: "center"
  });

  // 页码
  slide.addShape('roundRect', {
    x: 9.3, y: 5.15, w: 0.5, h: 0.3,
    fill: { color: theme.light }, rectRadius: 0.05
  });
  slide.addText('11', {
    x: 9.3, y: 5.18, w: 0.5, h: 0.25,
    fontSize: 11, fontFace: "Arial",
    color: theme.secondary, align: "center"
  });

  return slide;
}

module.exports = { createSlide, slideConfig };
