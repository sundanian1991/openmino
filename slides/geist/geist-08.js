// geist-08.js — Content: 色彩使用金字塔 + 无障碍
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 8,
  title: '色彩使用金字塔'
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

  // 金字塔三层
  const pyramid = [
    { pct: '5%', label: '点缀色', desc: 'Deep Blue / Muted Teal — 链接、CTA', fill: '2C5F7D', textColor: 'FFFFFF', barW: 3 },
    { pct: '20%', label: '主色陶土', desc: 'Terracotta — 填充、强调、图标', fill: 'E2725B', textColor: 'FFFFFF', barW: 6 },
    { pct: '75%', label: '中性基底', desc: 'Cream / Grey — 背景、文字、边框', fill: 'E8E4E1', textColor: '3D2C29', barW: 8.5 }
  ];

  const startY = 1.4;
  pyramid.forEach((layer, i) => {
    const barX = (10 - layer.barW) / 2;
    const barY = startY + i * 1.2;

    slide.addShape('roundRect', {
      x: barX, y: barY, w: layer.barW, h: 1.0,
      fill: { color: layer.fill }, rectRadius: 0.05
    });

    // 左侧百分比
    slide.addText(layer.pct, {
      x: barX - 0.8, y: barY + 0.15, w: 0.7, h: 0.6,
      fontSize: 22, fontFace: "Arial",
      color: theme.primary, bold: true, align: "right", valign: "middle"
    });

    // 标签
    slide.addText(layer.label, {
      x: barX + 0.2, y: barY + 0.1, w: layer.barW - 0.4, h: 0.35,
      fontSize: 16, fontFace: "Microsoft YaHei",
      color: layer.textColor, bold: true
    });

    // 描述
    slide.addText(layer.desc, {
      x: barX + 0.2, y: barY + 0.55, w: layer.barW - 0.4, h: 0.25,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: layer.textColor === 'FFFFFF' ? 'D0D0D0' : '8A8683'
    });
  });

  // 页码
  slide.addShape('roundRect', {
    x: 9.3, y: 5.15, w: 0.5, h: 0.3,
    fill: { color: theme.light }, rectRadius: 0.05
  });
  slide.addText('08', {
    x: 9.3, y: 5.18, w: 0.5, h: 0.25,
    fontSize: 11, fontFace: "Arial",
    color: theme.secondary, align: "center"
  });

  return slide;
}

module.exports = { createSlide, slideConfig };
