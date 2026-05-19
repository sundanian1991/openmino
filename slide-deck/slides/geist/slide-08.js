// slide-08.js - Content: 色彩使用金字塔
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 8,
  title: '色彩使用金字塔'
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

  // 金字塔三层 — 居中，从上到下绘制
  // Top: 3" wide, Middle: 6" wide, Bottom: 8.5" wide
  // 水平居中在 10" 画布上

  const pyramid = [
    {
      pct: '5%',
      label: '点缀色',
      colors: 'Deep Blue #2C5F7D  /  Muted Teal #4A7C8B',
      usage: '链接、CTA',
      fillColor: '2C5F7D',
      textColor: 'FFFFFF',
      barW: 3,
      barH: 1.0
    },
    {
      pct: '20%',
      label: '主色陶土',
      colors: 'Terracotta #E2725B',
      usage: '填充、强调、图标',
      fillColor: 'E2725B',
      textColor: 'FFFFFF',
      barW: 6,
      barH: 1.0
    },
    {
      pct: '75%',
      label: '中性基底',
      colors: 'Cream / Grey',
      usage: '背景、文字、边框',
      fillColor: 'E8E4E1',
      textColor: '3D2C29',
      barW: 8.5,
      barH: 1.0
    }
  ];

  // 垂直起始 y — 居中在可用空间 (1.4 ~ 4.8)，总高度约 3.4
  const pyramidStartY = 1.6;
  const barGap = 0.2;

  pyramid.forEach((layer, i) => {
    const barX = (10 - layer.barW) / 2; // 水平居中
    const barY = pyramidStartY + i * (1.0 + barGap);

    // 色块
    slide.addShape('rect', {
      x: barX, y: barY, w: layer.barW, h: layer.barH,
      fill: { color: layer.fillColor },
      line: { color: layer.fillColor, width: 0 },
      rectRadius: 0.04
    });

    // 左侧百分比
    slide.addText(layer.pct, {
      x: barX - 0.9, y: barY + 0.15, w: 0.8, h: 0.7,
      fontSize: 20, fontFace: "Arial",
      color: theme.primary, bold: true, align: "right", valign: "middle"
    });

    // 色块内标签
    slide.addText(layer.label, {
      x: barX + 0.2, y: barY + 0.1, w: layer.barW - 0.4, h: 0.35,
      fontSize: 15, fontFace: "Microsoft YaHei",
      color: layer.textColor, bold: true, align: "left"
    });

    // 色块内颜色名
    slide.addText(layer.colors, {
      x: barX + 0.2, y: barY + 0.42, w: layer.barW - 0.4, h: 0.25,
      fontSize: 11, fontFace: "Arial",
      color: layer.textColor, align: "left"
    });

    // 色块内用途
    slide.addText(layer.usage, {
      x: barX + 0.2, y: barY + 0.68, w: layer.barW - 0.4, h: 0.25,
      fontSize: 10, fontFace: "Microsoft YaHei",
      color: layer.textColor === 'FFFFFF' ? 'D0D0D0' : '8A8683',
      align: "left"
    });
  });

  // 页码徽章
  slide.addShape('rect', {
    x: 9.3, y: 5.1, w: 0.5, h: 0.35,
    fill: { color: theme.light },
    line: { color: theme.light, width: 0 }
  });
  slide.addText('08', {
    x: 9.3, y: 5.15, w: 0.5, h: 0.3,
    fontSize: 12, fontFace: "Arial",
    color: theme.secondary, align: "center"
  });

  return slide;
}

module.exports = { createSlide, slideConfig };
