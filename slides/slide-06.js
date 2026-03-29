// Slide 06 - 场景二：道德绑架的应对
// Theme: 演示模式 - 驼色优雅

const theme = {
  primary: "22223b",    // 深灰 - 标题
  secondary: "4a4e69",  // 中灰 - 正文
  accent: "c9ada7",     // 驼色 - 强调
  light: "9a8c98",      // 浅灰 - 背景点缀
  bg: "f2e9e4"          // 米白 - 背景
};

const slideConfig = {
  title: "场景二：道德绑架的应对",
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
  slide.addText("场景二：道德绑架的应对", {
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

  // === 上半部分：对方话术示例 ===
  slide.addText("对方典型话术", {
    x: 0.5,
    y: 0.95,
    w: 3,
    h: 0.35,
    fontSize: 14,
    fontFace: "Microsoft YaHei",
    color: theme.accent,
    bold: true,
    align: "left"
  });

  const quotes = [
    "这笔钱拿不到，影响1400个工人、5000个家庭",
    "我们能不能对供应商负责一点？"
  ];

  const quoteCardWidth = 4.2;
  const quoteCardHeight = 0.55;

  quotes.forEach((quote, index) => {
    const y = 1.4 + index * 0.7;
    const x = 0.5;

    // 引号卡片阴影
    slide.addShape(pptx.ShapeType.rect, {
      x: x + 0.02,
      y: y + 0.03,
      w: quoteCardWidth,
      h: quoteCardHeight,
      fill: { color: "E8E4DF" }
    });

    // 引号卡片背景
    slide.addShape(pptx.ShapeType.rect, {
      x: x,
      y: y,
      w: quoteCardWidth,
      h: quoteCardHeight,
      fill: { color: "F5F3F0" }
    });

    // 左侧引号装饰
    slide.addText('"', {
      x: x + 0.15,
      y: y + 0.05,
      w: 0.3,
      h: 0.4,
      fontSize: 24,
      fontFace: "Arial",
      color: theme.accent,
      bold: true,
      align: "left"
    });

    // 话术内容
    slide.addText(quote, {
      x: x + 0.45,
      y: y + 0.12,
      w: 3.5,
      h: 0.3,
      fontSize: 13,
      fontFace: "Microsoft YaHei",
      color: theme.secondary,
      italic: true,
      align: "left"
    });
  });

  // === 下半部分：回应策略 ===
  slide.addText("回应策略", {
    x: 0.5,
    y: 3.0,
    w: 3,
    h: 0.35,
    fontSize: 14,
    fontFace: "Microsoft YaHei",
    color: theme.accent,
    bold: true,
    align: "left"
  });

  const strategies = [
    { step: "1", title: "承认情绪", desc: "我理解供应商的担忧" },
    { step: "2", title: "回归事实", desc: "供应商的真实问题是不知道进展，不是拿不到钱" },
    { step: "3", title: "拒绝绑架", desc: "情绪化数字不能解决问题，会破坏团队安全感" }
  ];

  const strategyStartY = 3.45;
  const strategyRowHeight = 0.7;
  const strategyCardWidth = 9;
  const strategyCardHeight = 0.6;
  const accentBarWidth = 0.05;

  strategies.forEach((item, index) => {
    const y = strategyStartY + index * strategyRowHeight;

    // 卡片阴影 - 底层偏移
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.52,
      y: y + 0.04,
      w: strategyCardWidth,
      h: strategyCardHeight,
      fill: { color: "D9D9D9" }
    });

    // 卡片阴影 - 第二层偏移
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.51,
      y: y + 0.02,
      w: strategyCardWidth,
      h: strategyCardHeight,
      fill: { color: "E5E5E5" }
    });

    // 主卡片背景
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.5,
      y: y,
      w: strategyCardWidth,
      h: strategyCardHeight,
      fill: { color: "FFFFFF" }
    });

    // 左侧驼色强调条
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.5,
      y: y,
      w: accentBarWidth,
      h: strategyCardHeight,
      fill: { color: theme.accent }
    });

    // 步骤数字（驼色圆形）
    const stepX = 0.75;
    slide.addShape(pptx.ShapeType.ellipse, {
      x: stepX,
      y: y + 0.1,
      w: 0.4,
      h: 0.4,
      fill: { color: theme.accent }
    });

    slide.addText(item.step, {
      x: stepX,
      y: y + 0.15,
      w: 0.4,
      h: 0.3,
      fontSize: 14,
      fontFace: "Arial",
      color: "FFFFFF",
      bold: true,
      align: "center"
    });

    // 策略标题
    slide.addText(item.title, {
      x: 1.3,
      y: y + 0.15,
      w: 1.5,
      h: 0.3,
      fontSize: 14,
      fontFace: "Microsoft YaHei",
      color: theme.primary,
      bold: true,
      align: "left"
    });

    // 策略描述
    slide.addText(item.desc, {
      x: 2.9,
      y: y + 0.15,
      w: 6.3,
      h: 0.3,
      fontSize: 13,
      fontFace: "Microsoft YaHei",
      color: theme.secondary,
      align: "left"
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

  slide.addText("06", {
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
  pptx.writeFile({ fileName: "slide-06-preview.pptx" });
}

module.exports = { createSlide, slideConfig, theme };
