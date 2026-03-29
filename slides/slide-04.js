// Slide 04 - 五大核心应对原则
// Theme: 演示模式 - 驼色优雅

const theme = {
  primary: "22223b",    // 深灰 - 标题
  secondary: "4a4e69",  // 中灰 - 正文
  accent: "c9ada7",     // 驼色 - 强调
  light: "9a8c98",      // 浅灰 - 背景点缀
  bg: "f2e9e4"          // 米白 - 背景
};

const slideConfig = {
  title: "五大核心应对原则",
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
  slide.addText("五大核心应对原则", {
    x: 0.5,
    y: 0.4,
    w: 9,
    h: 0.6,
    fontSize: 28,
    fontFace: "Microsoft YaHei",
    color: theme.primary,
    bold: true,
    align: "left"
  });

  // 原则数据
  const principles = [
    { name: "不接靶子", desc: "不说'激励确实有问题'" },
    { name: "回归根本原因", desc: "指出'交接期信息真空、数据中断'" },
    { name: "拒绝逼迫", desc: "不被道德绑架逼迫表态" },
    { name: "保护安全感", desc: "不在群里制造对立" },
    { name: "用数据说话", desc: "真实数据对抗情绪化数字" }
  ];

  const startY = 1.2;
  const rowHeight = 0.8;
  const cardWidth = 9;
  const cardHeight = 0.7;
  const accentBarWidth = 0.05;

  principles.forEach((item, index) => {
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

    // 原则名称
    slide.addText(item.name, {
      x: 0.7,
      y: y + 0.15,
      w: 2.2,
      h: 0.4,
      fontSize: 16,
      fontFace: "Microsoft YaHei",
      color: theme.primary,
      bold: true,
      align: "left"
    });

    // 核心要点
    slide.addText(item.desc, {
      x: 3.0,
      y: y + 0.15,
      w: 6.2,
      h: 0.4,
      fontSize: 14,
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

  slide.addText("04", {
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
  pptx.writeFile({ fileName: "slide-04-preview.pptx" });
}

module.exports = { createSlide, slideConfig, theme };
