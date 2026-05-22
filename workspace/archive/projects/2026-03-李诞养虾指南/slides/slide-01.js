const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'cover',
  index: 1,
  title: '李诞的AI养虾哲学',
  subtitle: '将个人经验、风格、知识通过Prompt和记忆灌输给AI'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // ===== 顶部黑线 =====
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.08,
    fill: { color: theme.primary },
    line: { width: 0 }
  });

  // ===== 主标题区域 =====
  slide.addText('李诞的', {
    x: 0.5, y: 1.8, w: 9, h: 0.5,
    fontSize: 24, fontFace: "Microsoft YaHei",
    color: theme.secondary, align: "center"
  });

  // 主标题（AI用陶土色强调）
  slide.addText([
    { text: 'AI', options: { color: theme.accent, bold: true } },
    { text: '养虾哲学', options: { color: theme.primary, bold: true } }
  ], {
    x: 0.5, y: 2.3, w: 9, h: 1,
    fontSize: 52, fontFace: "Microsoft YaHei", align: "center"
  });

  // ===== 分割线（2px黑线）=====
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 3.5, y: 3.5, w: 3, h: 0.03,
    fill: { color: theme.primary },
    line: { width: 0 }
  });

  // ===== 副标题 =====
  slide.addText(slideConfig.subtitle, {
    x: 1, y: 3.8, w: 8, h: 0.5,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: theme.secondary, align: "center"
  });

  // ===== 底部标注（陶土色点缀）=====
  slide.addText('AI Agent 养成指南', {
    x: 0.5, y: 5, w: 9, h: 0.4,
    fontSize: 11, fontFace: "Microsoft YaHei",
    color: theme.accent, align: "center"
  });

  return slide;
}

module.exports = { createSlide, slideConfig };