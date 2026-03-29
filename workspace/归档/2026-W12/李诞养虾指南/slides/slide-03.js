const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 3,
  title: '模块化Prompt工作流'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 序号（陶土色）
  slide.addText('02', {
    x: 0.5, y: 0.3, w: 1, h: 0.8,
    fontSize: 48, fontFace: "Arial",
    color: theme.accent, bold: true
  });

  // 标题（黑色）
  slide.addText('模块化Prompt工作流', {
    x: 1.5, y: 0.4, w: 7, h: 0.6,
    fontSize: 28, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  // 副标题（灰色）
  slide.addText('将复杂写作任务拆解，分步产出后整合', {
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
    { num: '1', title: '任务拆分', desc: '开场故事 → 对比反差 → 概念定义 → 结尾升华' },
    { num: '2', title: '分模块产出', desc: '每个模块单独生成Prompt，分步产出后整合' },
    { num: '3', title: 'Skill模板化', desc: '将流程固化为可复用模板，风格一致' }
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
      x: 1.2, y: y, w: 2.5, h: 0.5,
      fontSize: 18, fontFace: "Microsoft YaHei",
      color: theme.primary, bold: true
    });

    // 描述（灰色）
    slide.addText(step.desc, {
      x: 4, y: y + 0.05, w: 5.5, h: 0.4,
      fontSize: 13, fontFace: "Microsoft YaHei",
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

  // 底部引用（陶土色）
  slide.addText('"风格接近李诞本人，结构清晰有层次感。"', {
    x: 1, y: 4.8, w: 8, h: 0.4,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: theme.accent, align: "center"
  });

  // 页码
  slide.addText('3', {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fontSize: 12, fontFace: "Arial",
    color: theme.secondary, align: "center"
  });

  return slide;
}

module.exports = { createSlide, slideConfig };