/**
 * Slide 16 - 场景二：道德绑架的应对
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

  // 副标题装饰线
  slide.addShape(pptx.ShapeType.line, {
    x: 0.5,
    y: 0.9,
    w: 1.5,
    h: 0,
    line: { color: theme.accent, width: 3 }
  });

  // 对方话术标题
  slide.addText("常见道德绑架话术", {
    x: 0.5,
    y: 1.05,
    w: 3,
    h: 0.35,
    fontSize: 13,
    fontFace: "Microsoft YaHei",
    color: theme.secondary,
    bold: true,
    align: "left"
  });

  // 对方话术 - 卡片形式
  const tactics = [
    "\"你们京东就是店大欺客\"",
    "\"没有我们，你们业务早就垮了\"",
    "\"做人不能这样，用完就扔\""
  ];

  tactics.forEach((tactic, index) => {
    const x = 0.5 + index * 3.05;
    const y = 1.45;

    // 卡片背景
    slide.addShape(pptx.ShapeType.rect, {
      x: x,
      y: y,
      w: 2.9,
      h: 0.6,
      fill: { color: "FFFFFF" },
      line: { color: theme.light, width: 1 }
    });

    // 顶部驼色装饰条
    slide.addShape(pptx.ShapeType.rect, {
      x: x,
      y: y,
      w: 2.9,
      h: 0.05,
      fill: { color: theme.accent }
    });

    // 话术内容
    slide.addText(tactic, {
      x: x + 0.15,
      y: y + 0.12,
      w: 2.6,
      h: 0.4,
      fontSize: 11,
      fontFace: "Microsoft YaHei",
      color: theme.secondary,
      italic: true,
      align: "left"
    });
  });

  // 回应策略标题
  slide.addText("三步回应策略", {
    x: 0.5,
    y: 2.25,
    w: 3,
    h: 0.35,
    fontSize: 14,
    fontFace: "Microsoft YaHei",
    color: theme.accent,
    bold: true,
    align: "left"
  });

  // 三步回应策略数据
  const strategies = [
    {
      step: "1",
      title: "拆解标签",
      desc: "不承接'店大欺客'等标签",
      example: "'我理解你的感受，但我们看待问题的角度可能不同'"
    },
    {
      step: "2",
      title: "还原事实",
      desc: "用数据和规则替代情绪讨论",
      example: "'让我们回顾一下历史合作数据和现有规则'"
    },
    {
      step: "3",
      title: "指向流程",
      desc: "将问题引导到正规流程解决",
      example: "'这个问题需要按公司流程，和策略组一起评估'"
    }
  ];

  const startY = 2.75;
  const rowHeight = 0.9;
  const cardWidth = 9;
  const cardHeight = 0.8;

  strategies.forEach((item, index) => {
    const y = startY + index * rowHeight;

    // 卡片背景
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.5,
      y: y,
      w: cardWidth,
      h: cardHeight,
      fill: { color: "FFFFFF" },
      line: { color: theme.light, width: 1 }
    });

    // 左侧驼色强调条
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.5,
      y: y,
      w: 0.06,
      h: cardHeight,
      fill: { color: theme.accent }
    });

    // 步骤序号（驼色圆形背景）
    slide.addShape(pptx.ShapeType.ellipse, {
      x: 0.75,
      y: y + 0.15,
      w: 0.45,
      h: 0.45,
      fill: { color: theme.accent }
    });

    slide.addText(item.step, {
      x: 0.75,
      y: y + 0.22,
      w: 0.45,
      h: 0.3,
      fontSize: 16,
      fontFace: "Arial",
      color: theme.bg,
      bold: true,
      align: "center"
    });

    // 步骤标题
    slide.addText(item.title, {
      x: 1.35,
      y: y + 0.18,
      w: 1.8,
      h: 0.35,
      fontSize: 15,
      fontFace: "Microsoft YaHei",
      color: theme.primary,
      bold: true,
      align: "left"
    });

    // 描述
    slide.addText(item.desc, {
      x: 1.35,
      y: y + 0.45,
      w: 2.2,
      h: 0.25,
      fontSize: 11,
      fontFace: "Microsoft YaHei",
      color: theme.secondary,
      align: "left"
    });

    // 分隔线
    slide.addShape(pptx.ShapeType.line, {
      x: 3.7,
      y: y + 0.1,
      w: 0,
      h: cardHeight - 0.2,
      line: { color: theme.light, width: 1, dash: 2 }
    });

    // 话术示例标题
    slide.addText("话术示例", {
      x: 3.9,
      y: y + 0.1,
      w: 1.2,
      h: 0.25,
      fontSize: 10,
      fontFace: "Microsoft YaHei",
      color: theme.accent,
      bold: true,
      align: "left"
    });

    // 话术示例内容
    slide.addText('"' + item.example + '"', {
      x: 3.9,
      y: y + 0.3,
      w: 5.4,
      h: 0.4,
      fontSize: 11,
      fontFace: "Microsoft YaHei",
      color: theme.secondary,
      italic: true,
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

  slide.addText("16", {
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
