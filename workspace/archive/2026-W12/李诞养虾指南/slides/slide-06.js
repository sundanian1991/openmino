const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'action',
  index: 6,
  title: '开始你的养虾之旅'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 序号（陶土色）
  slide.addText('05', {
    x: 0.5, y: 0.3, w: 1, h: 0.8,
    fontSize: 48, fontFace: "Arial",
    color: theme.accent, bold: true
  });

  // 标题（黑色）
  slide.addText('开始你的养虾之旅', {
    x: 1.5, y: 0.4, w: 7, h: 0.6,
    fontSize: 28, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  // 副标题（灰色）
  slide.addText('三步启动，持续迭代', {
    x: 1.5, y: 0.95, w: 7, h: 0.4,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: theme.secondary
  });

  // 分割线
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.4, w: 9, h: 0.025,
    fill: { color: theme.primary },
    line: { width: 0 }
  });

  // 三步行动
  const actions = [
    { num: '1', title: '定义你的 AI 人设', action: '写下3个关键词' },
    { num: '2', title: '选择 1 个 Skill 开始', action: '写作 / 判断 / 学习 / 社交' },
    { num: '3', title: '持续喂养记忆', action: '让它更懂你' }
  ];

  actions.forEach((action, i) => {
    const y = 1.8 + i * 1.0;

    // 序号（陶土色）
    slide.addText(action.num, {
      x: 0.5, y: y, w: 0.5, h: 0.5,
      fontSize: 24, fontFace: "Arial",
      color: theme.accent, bold: true
    });

    // 点
    slide.addText('·', {
      x: 0.9, y: y, w: 0.3, h: 0.5,
      fontSize: 24, color: theme.light
    });

    // 标题（黑色）
    slide.addText(action.title, {
      x: 1.2, y: y, w: 5, h: 0.5,
      fontSize: 18, fontFace: "Microsoft YaHei",
      color: theme.primary, bold: true
    });

    // 行动提示（陶土色点缀）
    slide.addText(action.action, {
      x: 6.5, y: y + 0.05, w: 3, h: 0.4,
      fontSize: 14, fontFace: "Microsoft YaHei",
      color: theme.accent
    });
  });

  // 底部强调（陶土色）
  slide.addText('现在就开始，让你的AI成为另一个"你"。', {
    x: 1, y: 4.8, w: 8, h: 0.4,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: theme.accent, align: "center"
  });

  // 页码
  slide.addText('6', {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fontSize: 12, fontFace: "Arial",
    color: theme.secondary, align: "center"
  });

  return slide;
}

module.exports = { createSlide, slideConfig };