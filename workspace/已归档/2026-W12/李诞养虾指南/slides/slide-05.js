const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 5,
  title: '飞书妙搭三步部署'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 序号（陶土色）
  slide.addText('04', {
    x: 0.5, y: 0.3, w: 1, h: 0.8,
    fontSize: 48, fontFace: "Arial",
    color: theme.accent, bold: true
  });

  // 标题（黑色）
  slide.addText('飞书妙搭三步部署', {
    x: 1.5, y: 0.4, w: 7, h: 0.6,
    fontSize: 28, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  // 副标题（灰色）
  slide.addText('快速部署你的个人AI Agent', {
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

  // 三步流程
  const steps = [
    { num: '1', title: '定义 Soul（人设）', desc: '在飞书妙搭中定义Agent的价值观、语气、身份' },
    { num: '2', title: '定义 Identity（身份与任务）', desc: '明确AI的角色定位和核心任务' },
    { num: '3', title: '教会 Skills（技能包）', desc: '导入或安装技能包，让AI具备专业能力' }
  ];

  steps.forEach((step, i) => {
    const y = 1.7 + i * 1.0;

    // 序号（陶土色）
    slide.addText(step.num, {
      x: 0.5, y: y, w: 0.5, h: 0.5,
      fontSize: 22, fontFace: "Arial",
      color: theme.accent, bold: true
    });

    // 点
    slide.addText('·', {
      x: 0.9, y: y, w: 0.3, h: 0.5,
      fontSize: 22, color: theme.light
    });

    // 标题（黑色）
    slide.addText(step.title, {
      x: 1.2, y: y, w: 4, h: 0.5,
      fontSize: 16, fontFace: "Microsoft YaHei",
      color: theme.primary, bold: true
    });

    // 描述（灰色）
    slide.addText(step.desc, {
      x: 5.2, y: y + 0.05, w: 4.3, h: 0.4,
      fontSize: 12, fontFace: "Microsoft YaHei",
      color: theme.secondary
    });

    // 箭头（陶土色）
    if (i < 2) {
      slide.addText('↓', {
        x: 0.5, y: y + 0.55, w: 9, h: 0.35,
        fontSize: 14, color: theme.accent, align: "center"
      });
    }
  });

  // 底部提示（陶土色）
  slide.addText('飞书妙搭 → AI 助手 → 创建 Agent', {
    x: 1, y: 4.8, w: 8, h: 0.4,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: theme.accent, align: "center"
  });

  // 页码
  slide.addText('5', {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fontSize: 12, fontFace: "Arial",
    color: theme.secondary, align: "center"
  });

  return slide;
}

module.exports = { createSlide, slideConfig };