/**
 * Slide 02 - TOC (目录页)
 * 4个章节导航，使用序号徽章
 */

const theme = {
  primary: "22223b",    // 深灰 - 标题
  secondary: "4a4e69",  // 中灰 - 正文
  accent: "c9ada7",     // 驼色 - 强调
  light: "9a8c98",      // 浅灰 - 背景点缀
  bg: "f2e9e4"          // 米白 - 背景
};

const slideConfig = {
  type: "toc",
  title: "内容导航",
  sections: [
    { number: 1, title: "问题背景与行为模式" },
    { number: 2, title: "五大核心应对原则" },
    { number: 3, title: "四种场景的应对话术" },
    { number: 4, title: "观察与判断标准" }
  ]
};

function createSlide(pptx) {
  const slide = pptx.addSlide();

  // 背景色
  slide.background = { color: theme.bg };

  // 页面标题
  slide.addText(slideConfig.title, {
    x: 1,
    y: 0.6,
    w: 8,
    h: 0.8,
    fontSize: 28,
    fontFace: "Microsoft YaHei",
    color: theme.primary,
    bold: true,
    align: "left"
  });

  // 标题下方装饰线
  slide.addShape(pptx.ShapeType.line, {
    x: 1,
    y: 1.3,
    w: 1.5,
    h: 0,
    line: { color: theme.accent, width: 3 }
  });

  // 4个章节条目
  const startY = 1.8;
  const itemHeight = 0.9;

  slideConfig.sections.forEach((section, index) => {
    const y = startY + index * itemHeight;

    // 序号徽章 - 大号驼色圆形
    slide.addShape(pptx.ShapeType.ellipse, {
      x: 1,
      y: y,
      w: 0.7,
      h: 0.7,
      fill: { color: theme.accent }
    });

    // 序号数字
    slide.addText(String(section.number), {
      x: 1,
      y: y + 0.1,
      w: 0.7,
      h: 0.5,
      fontSize: 24,
      fontFace: "Arial",
      color: theme.bg,
      bold: true,
      align: "center"
    });

    // 章节标题
    slide.addText(section.title, {
      x: 2,
      y: y + 0.15,
      w: 6.5,
      h: 0.5,
      fontSize: 18,
      fontFace: "Microsoft YaHei",
      color: theme.primary,
      align: "left"
    });
  });

  // 右侧装饰元素 - 垂直线条
  slide.addShape(pptx.ShapeType.line, {
    x: 9.2,
    y: 1.5,
    w: 0,
    h: 3.5,
    line: { color: theme.light, width: 1 }
  });

  // 右侧装饰圆点
  slide.addShape(pptx.ShapeType.ellipse, {
    x: 9.0,
    y: 2.5,
    w: 0.3,
    h: 0.3,
    fill: { color: theme.accent, transparency: 60 }
  });

  // 页码徽章 - 右下角圆形
  slide.addShape(pptx.ShapeType.ellipse, {
    x: 9.1,
    y: 5.0,
    w: 0.5,
    h: 0.5,
    fill: { color: theme.accent }
  });

  slide.addText("2", {
    x: 9.1,
    y: 5.08,
    w: 0.5,
    h: 0.34,
    fontSize: 14,
    fontFace: "Arial",
    color: theme.bg,
    bold: true,
    align: "center"
  });

  return slide;
}

// Standalone preview code
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createSlide, slideConfig, theme };
}

export { createSlide, slideConfig, theme };
