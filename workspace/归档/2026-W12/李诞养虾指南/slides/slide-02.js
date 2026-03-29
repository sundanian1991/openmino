const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 2,
  title: '养虾三要素'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // ===== 序号（陶土色点缀）=====
  slide.addText('01', {
    x: 0.5, y: 0.3, w: 1, h: 0.8,
    fontSize: 48, fontFace: "Arial",
    color: theme.accent, bold: true
  });

  // ===== 标题（黑色）=====
  slide.addText('养虾三要素', {
    x: 1.5, y: 0.4, w: 7, h: 0.6,
    fontSize: 28, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  // ===== 副标题（灰色）=====
  slide.addText('将AI养成"个人风格智能体"的核心方法论', {
    x: 1.5, y: 0.95, w: 7, h: 0.4,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: theme.secondary
  });

  // ===== 分割线（2px黑线）=====
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.4, w: 9, h: 0.025,
    fill: { color: theme.primary },
    line: { width: 0 }
  });

  // ===== 三要素 =====
  const elements = [
    { name: '人设', en: 'Soul', desc: '定义AI的价值观、语气与身份' },
    { name: '技能', en: 'Skills', desc: '模块化技能包，独立迭代' },
    { name: '记忆', en: 'Memory', desc: '文档与记录喂养，形成长期记忆' }
  ];

  elements.forEach((el, i) => {
    const y = 1.8 + i * 1.1;

    // 序号（陶土色）
    slide.addText(String(i + 1), {
      x: 0.5, y: y, w: 0.5, h: 0.5,
      fontSize: 20, fontFace: "Arial",
      color: theme.accent, bold: true
    });

    // 点分隔
    slide.addText('·', {
      x: 0.9, y: y, w: 0.3, h: 0.5,
      fontSize: 20, color: theme.light
    });

    // 中文名（黑色粗体）
    slide.addText(el.name, {
      x: 1.2, y: y, w: 1.5, h: 0.5,
      fontSize: 20, fontFace: "Microsoft YaHei",
      color: theme.primary, bold: true
    });

    // 英文名（灰色）
    slide.addText(el.en, {
      x: 2.8, y: y + 0.05, w: 1.5, h: 0.4,
      fontSize: 14, fontFace: "Arial",
      color: theme.secondary
    });

    // 描述（灰色）
    slide.addText(el.desc, {
      x: 4.5, y: y + 0.05, w: 5, h: 0.4,
      fontSize: 14, fontFace: "Microsoft YaHei",
      color: theme.secondary
    });
  });

  // ===== 底部引用（陶土色点缀）=====
  slide.addText('"人设是灵魂，技能是骨骼，记忆是血肉。"', {
    x: 1, y: 4.8, w: 8, h: 0.4,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: theme.accent, align: "center"
  });

  // 页码
  slide.addText('2', {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fontSize: 12, fontFace: "Arial",
    color: theme.secondary, align: "center"
  });

  return slide;
}

module.exports = { createSlide, slideConfig };