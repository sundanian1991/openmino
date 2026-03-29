const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'summary',
  index: 7,
  title: '核心洞察'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 序号（陶土色）
  slide.addText('06', {
    x: 0.5, y: 0.3, w: 1, h: 0.8,
    fontSize: 48, fontFace: "Arial",
    color: theme.accent, bold: true
  });

  // 标题（黑色）
  slide.addText('核心洞察', {
    x: 1.5, y: 0.4, w: 7, h: 0.6,
    fontSize: 28, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  // 分割线（2px黑线）
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.4, w: 9, h: 0.025,
    fill: { color: theme.primary },
    line: { width: 0 }
  });

  // 核心引言（大号，AI用陶土色强调）
  slide.addText([
    { text: '"养虾养的不是', options: { color: theme.primary } },
    { text: 'AI', options: { color: theme.accent, bold: true } },
    { text: '，是未来的自己。"', options: { color: theme.primary } }
  ], {
    x: 1, y: 2.2, w: 8, h: 0.8,
    fontSize: 26, fontFace: "Microsoft YaHei",
    align: "center"
  });

  // 解释（灰色）
  slide.addText('将个人经验、风格、知识通过Prompt和记忆灌输给AI，\n让AI成为你的"数字分身"。', {
    x: 1.5, y: 3.3, w: 7, h: 0.8,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: theme.secondary, align: "center"
  });

  // 底部三个关键词（陶土色点缀）
  const keywords = ['最小可复用', '迭代优化', '记忆沉淀'];
  keywords.forEach((kw, i) => {
    slide.addText(kw, {
      x: 2 + i * 2.2, y: 4.5, w: 2, h: 0.4,
      fontSize: 12, fontFace: "Microsoft YaHei",
      color: theme.accent, align: "center"
    });
  });

  // 页码
  slide.addText('7', {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fontSize: 12, fontFace: "Arial",
    color: theme.secondary, align: "center"
  });

  return slide;
}

module.exports = { createSlide, slideConfig };