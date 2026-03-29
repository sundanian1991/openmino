// Slide 05 - 场景一：群里被@时的应对（REACT框架）
// Theme: 演示模式 - 驼色优雅

const theme = {
  primary: "22223b",    // 深灰 - 标题
  secondary: "4a4e69",  // 中灰 - 正文
  accent: "c9ada7",     // 驼色 - 强调
  light: "9a8c98",      // 浅灰 - 背景点缀
  bg: "f2e9e4"          // 米白 - 背景
};

const slideConfig = {
  title: "场景一：群里被@时的应对",
  type: "content",
  layout: "LAYOUT_16x9",
  width: 10,
  height: 5.625
};

function createSlide(pptx) {
  const slide = pptx.addSlide({ layout: slideConfig.layout });

  // 背景色
  slide.background = { color: theme.bg };

  // 标题
  slide.addText("场景一：群里被@时的应对", {
    x: 0.5,
    y: 0.35,
    w: 9,
    h: 0.5,
    fontSize: 26,
    fontFace: "Microsoft YaHei",
    color: theme.primary,
    bold: true,
    align: "left"
  });

  // REACT框架标题
  slide.addText("REACT 应对框架", {
    x: 0.5,
    y: 0.9,
    w: 3,
    h: 0.4,
    fontSize: 14,
    fontFace: "Microsoft YaHei",
    color: theme.accent,
    bold: true,
    align: "left"
  });

  // REACT步骤数据
  const reactSteps = [
    { letter: "R", name: "Respond", desc: "我理解你对激励问题的担忧", purpose: "承认情绪，但不说问题" },
    { letter: "E", name: "Explain", desc: "真正的问题是交接期信息真空、数据中断", purpose: "回归根本原因" },
    { letter: "A", name: "Action", desc: "已经和头部供应商沟通，建议恢复数据同步", purpose: "展示行动" },
    { letter: "C", name: "Constraint", desc: "激励方案制定在策略组，我负责供应商沟通", purpose: "明确边界" },
    { letter: "T", name: "Target", desc: "建议你们私下对齐交接期责任划分", purpose: "指出真正问题" }
  ];

  const startY = 1.4;
  const rowHeight = 0.75;
  const cardWidth = 9;
  const cardHeight = 0.65;
  const accentBarWidth = 0.05;

  reactSteps.forEach((item, index) => {
    const y = startY + index * rowHeight;

    // 卡片阴影 - 底层偏移
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.52,
      y: y + 0.04,
      w: cardWidth,
      h: cardHeight,
      fill: { color: "D9D9D9" }
    });

    // 卡片阴影 - 第二层偏移
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.51,
      y: y + 0.02,
      w: cardWidth,
      h: cardHeight,
      fill: { color: "E5E5E5" }
    });

    // 主卡片背景
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.5,
      y: y,
      w: cardWidth,
      h: cardHeight,
      fill: { color: "FFFFFF" }
    });

    // 左侧驼色强调条
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.5,
      y: y,
      w: accentBarWidth,
      h: cardHeight,
      fill: { color: theme.accent }
    });

    // 步骤字母（驼色圆形背景）
    const letterX = 0.75;
    slide.addShape(pptx.ShapeType.ellipse, {
      x: letterX,
      y: y + 0.12,
      w: 0.4,
      h: 0.4,
      fill: { color: theme.accent }
    });

    slide.addText(item.letter, {
      x: letterX,
      y: y + 0.17,
      w: 0.4,
      h: 0.3,
      fontSize: 14,
      fontFace: "Arial",
      color: "FFFFFF",
      bold: true,
      align: "center"
    });

    // 步骤名称
    slide.addText(item.name, {
      x: 1.25,
      y: y + 0.18,
      w: 1.2,
      h: 0.3,
      fontSize: 13,
      fontFace: "Arial",
      color: theme.primary,
      bold: true,
      align: "left"
    });

    // 话术要点
    slide.addText('"' + item.desc + '"', {
      x: 2.5,
      y: y + 0.18,
      w: 4.0,
      h: 0.3,
      fontSize: 12,
      fontFace: "Microsoft YaHei",
      color: theme.secondary,
      italic: true,
      align: "left"
    });

    // 目的（右侧）
    slide.addText(item.purpose, {
      x: 6.6,
      y: y + 0.18,
      w: 2.6,
      h: 0.3,
      fontSize: 11,
      fontFace: "Microsoft YaHei",
      color: theme.accent,
      align: "right"
    });
  });

  // 页码徽章 - 圆形
  slide.addShape(pptx.ShapeType.ellipse, {
    x: 9.3,
    y: 5.1,
    w: 0.4,
    h: 0.4,
    fill: { color: theme.accent }
  });

  slide.addText("05", {
    x: 9.3,
    y: 5.15,
    w: 0.4,
    h: 0.3,
    fontSize: 12,
    fontFace: "Arial",
    color: "FFFFFF",
    bold: true,
    align: "center"
  });

  return slide;
}

// 独立预览代码
if (typeof window !== 'undefined' && window.PptxGenJS) {
  const pptx = new window.PptxGenJS();
  pptx.layout = slideConfig.layout;
  pptx.defineSlideSize({ width: slideConfig.width, height: slideConfig.height });
  createSlide(pptx);
  pptx.writeFile({ fileName: "slide-05-preview.pptx" });
}

module.exports = { createSlide, slideConfig, theme };
