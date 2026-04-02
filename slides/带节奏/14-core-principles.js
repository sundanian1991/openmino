/**
 * Slide 14 - 五大核心应对原则
 * Type: content
 */

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
    y: 0.35,
    w: 9,
    h: 0.5,
    fontSize: 26,
    fontFace: "Microsoft YaHei",
    color: theme.primary,
    bold: true,
    align: "left"
  });

  // 表头装饰线
  slide.addShape(pptx.ShapeType.line, {
    x: 0.5,
    y: 0.9,
    w: 1.5,
    h: 0,
    line: { color: theme.accent, width: 3 }
  });

  // 表格数据 - 5 行
  const principles = [
    { principle: "不接靶子", description: "不承接情绪化指控，不陷入自证陷阱", action: "冷静回应：'这个问题需要更多信息'" },
    { principle: "回归根本原因", description: "将情绪问题转化为事实问题", action: "追问：'真正的问题是什么？'" },
    { principle: "拒绝逼迫", description: "不被时间压力绑架，保持节奏", action: "表态：'需要走完评估流程'" },
    { principle: "保护安全感", description: "避免让对方感到被针对或威胁", action: "先认可：'理解你的感受'" },
    { principle: "用数据说话", description: "用客观数据替代主观判断", action: "展示：'这是历史数据和规则'" }
  ];

  const startY = 1.2;
  const rowHeight = 0.85;
  const cardWidth = 9;
  const cardHeight = 0.75;
  const accentBarWidth = 0.06;

  principles.forEach((item, index) => {
    const y = startY + index * rowHeight;

    // 序号圆形徽章
    slide.addShape(pptx.ShapeType.ellipse, {
      x: 0.5,
      y: y,
      w: 0.5,
      h: 0.5,
      fill: { color: theme.accent }
    });

    slide.addText(String(index + 1), {
      x: 0.5,
      y: y + 0.15,
      w: 0.5,
      h: 0.3,
      fontSize: 16,
      fontFace: "Arial",
      color: theme.bg,
      bold: true,
      align: "center"
    });

    // 卡片背景
    slide.addShape(pptx.ShapeType.rect, {
      x: 1.15,
      y: y,
      w: cardWidth - 0.65,
      h: cardHeight,
      fill: { color: "FFFFFF" },
      line: { color: theme.light, width: 1 }
    });

    // 左侧驼色强调条
    slide.addShape(pptx.ShapeType.rect, {
      x: 1.15,
      y: y,
      w: accentBarWidth,
      h: cardHeight,
      fill: { color: theme.accent }
    });

    // 原则名称
    slide.addText(item.principle, {
      x: 1.3,
      y: y + 0.1,
      w: 2.5,
      h: 0.35,
      fontSize: 15,
      fontFace: "Microsoft YaHei",
      color: theme.primary,
      bold: true,
      align: "left"
    });

    // 描述
    slide.addText(item.description, {
      x: 1.3,
      y: y + 0.35,
      w: 3.5,
      h: 0.3,
      fontSize: 11,
      fontFace: "Microsoft YaHei",
      color: theme.secondary,
      align: "left"
    });

    // 分隔线
    slide.addShape(pptx.ShapeType.line, {
      x: 4.9,
      y: y + 0.1,
      w: 0,
      h: cardHeight - 0.2,
      line: { color: theme.light, width: 1, dash: 2 }
    });

    // 行动建议标题
    slide.addText("行动", {
      x: 5.1,
      y: y + 0.1,
      w: 0.8,
      h: 0.25,
      fontSize: 10,
      fontFace: "Microsoft YaHei",
      color: theme.accent,
      bold: true,
      align: "left"
    });

    // 行动建议内容
    slide.addText(item.action, {
      x: 5.1,
      y: y + 0.3,
      w: 2.7,
      h: 0.35,
      fontSize: 11,
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

  slide.addText("14", {
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

// Standalone preview code
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createSlide, slideConfig, theme };
}

export { createSlide, slideConfig, theme };
