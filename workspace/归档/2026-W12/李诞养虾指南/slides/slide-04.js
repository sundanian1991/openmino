const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 4,
  title: '做判断与学习'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 序号（陶土色）
  slide.addText('03', {
    x: 0.5, y: 0.3, w: 1, h: 0.8,
    fontSize: 48, fontFace: "Arial",
    color: theme.accent, bold: true
  });

  // 标题（黑色）
  slide.addText('做判断与学习', {
    x: 1.5, y: 0.4, w: 7, h: 0.6,
    fontSize: 28, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  // 副标题（灰色）
  slide.addText('规则驱动型AI + 向量化个人语料', {
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

  // 左栏：做判断
  slide.addText('1', {
    x: 0.5, y: 1.7, w: 0.5, h: 0.5,
    fontSize: 24, fontFace: "Arial",
    color: theme.accent, bold: true
  });

  slide.addText('· 做判断', {
    x: 0.9, y: 1.7, w: 3, h: 0.5,
    fontSize: 20, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  slide.addText('设定身份规则 → 让AI基于记忆给出判断\n→ 设置飞书提醒自动推送结果', {
    x: 0.5, y: 2.3, w: 4.3, h: 0.7,
    fontSize: 13, fontFace: "Microsoft YaHei",
    color: theme.secondary, valign: "top"
  });

  // 中间分割线
  slide.addShape(pres.shapes.LINE, {
    x: 5, y: 1.7, w: 0, h: 1.8,
    line: { color: theme.light, width: 0.5 }
  });

  // 右栏：学习模仿
  slide.addText('2', {
    x: 5.5, y: 1.7, w: 0.5, h: 0.5,
    fontSize: 24, fontFace: "Arial",
    color: theme.accent, bold: true
  });

  slide.addText('· 学习模仿', {
    x: 5.9, y: 1.7, w: 3, h: 0.5,
    fontSize: 20, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  slide.addText('将大量个人直播/文本向量化\n→ 喂入AI形成个人知识库\n→ AI模仿个人风格输出', {
    x: 5.5, y: 2.3, w: 4.3, h: 0.7,
    fontSize: 13, fontFace: "Microsoft YaHei",
    color: theme.secondary, valign: "top"
  });

  // 底部引用（陶土色）
  slide.addText('"让AI学会你的思考方式，而不是代替你思考。"', {
    x: 1, y: 4.8, w: 8, h: 0.4,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: theme.accent, align: "center"
  });

  // 页码
  slide.addText('4', {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fontSize: 12, fontFace: "Arial",
    color: theme.secondary, align: "center"
  });

  return slide;
}

module.exports = { createSlide, slideConfig };