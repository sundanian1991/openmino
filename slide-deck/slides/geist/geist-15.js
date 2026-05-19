// geist-15.js — Content: Prompt 模板库 + 实战案例
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 15,
  title: 'Prompt 模板库'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addShape('rect', {
    x: 0, y: 0, w: 0.08, h: 5.625,
    fill: { color: theme.accent }
  });

  slide.addText(slideConfig.title, {
    x: 0.5, y: 0.35, w: 5, h: 0.5,
    fontSize: 28, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  // === 模板结构流程 ===
  const flowParts = [
    { label: '风格前缀', color: theme.primary },
    { label: '主体描述', color: theme.secondary },
    { label: '色彩指令', color: theme.accent },
    { label: '风格修饰', color: theme.secondary },
    { label: '技术指令', color: theme.primary }
  ];
  const partW = 1.55, arrowW = 0.25;
  flowParts.forEach((part, i) => {
    const px = 0.5 + i * (partW + arrowW);
    slide.addShape('roundRect', {
      x: px, y: 1.0, w: partW, h: 0.4,
      fill: { color: part.color }, rectRadius: 0.06
    });
    slide.addText(part.label, {
      x: px, y: 1.0, w: partW, h: 0.4,
      fontSize: 10, fontFace: "Microsoft YaHei",
      color: "FFFFFF", bold: true, align: "center", valign: "middle"
    });
    if (i < flowParts.length - 1) {
      slide.addText('→', {
        x: px + partW, y: 1.0, w: arrowW, h: 0.4,
        fontSize: 14, color: theme.light, align: "center", valign: "middle"
      });
    }
  });

  // === 快速模板卡片 ===
  slide.addShape('roundRect', {
    x: 0.5, y: 1.6, w: 9, h: 1.8,
    fill: { color: "FFFFFF" },
    line: { color: theme.light, width: 1 },
    rectRadius: 0.06
  });
  slide.addShape('rect', {
    x: 0.5, y: 1.6, w: 0.06, h: 1.8,
    fill: { color: theme.accent }
  });

  slide.addText('快速调用模板', {
    x: 0.75, y: 1.7, w: 2, h: 0.25,
    fontSize: 11, fontFace: "Microsoft YaHei",
    color: theme.accent, bold: true
  });

  const promptLines = [
    'A minimalist [主题] in Anthropic design style,',
    'featuring hand-drawn line art with terracotta #C77B68',
    'on warm cream background #F5F1EE, charcoal lines #3D2C29,',
    'soft organic curves, rounded line endings,',
    'ample negative space, warm and approachable,',
    'flat vector art style'
  ];
  promptLines.forEach((line, i) => {
    slide.addText(line, {
      x: 0.85, y: 2.0 + i * 0.22, w: 8.3, h: 0.2,
      fontSize: 10.5, fontFace: "Consolas",
      color: theme.primary
    });
  });

  // === 风格修饰词 ===
  slide.addText('必选修饰', {
    x: 0.5, y: 3.6, w: 2, h: 0.3,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });
  ['hand-drawn style', 'minimalist line art', 'soft organic curves', 'rounded line endings'].forEach((item, i) => {
    slide.addText(item, {
      x: 0.6, y: 3.95 + i * 0.22, w: 3, h: 0.2,
      fontSize: 10, fontFace: "Consolas", color: theme.secondary
    });
  });

  slide.addText('可选修饰', {
    x: 4.5, y: 3.6, w: 2, h: 0.3,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });
  ['warm aesthetic', 'ample negative space', 'geometric grid layout', 'flat vector'].forEach((item, i) => {
    slide.addText(item, {
      x: 4.6, y: 3.95 + i * 0.22, w: 3, h: 0.2,
      fontSize: 10, fontFace: "Consolas", color: theme.secondary
    });
  });

  // === 三个案例标签 ===
  const cases = [
    { letter: 'A', title: '写作图标', prompt: '手+笔记本电脑 on 5x5 grid' },
    { letter: 'B', title: '音乐插画', prompt: '抽象音符+手形 flowing movement' },
    { letter: 'C', title: '学习成长', prompt: '手浇灌植物+书籍 symbolizing growth' }
  ];

  cases.forEach((c, i) => {
    const cx = 0.5 + i * 3.1;
    slide.addShape('roundRect', {
      x: cx, y: 4.75, w: 2.8, h: 0.7,
      fill: { color: theme.bg },
      line: { color: theme.light, width: 0.5 },
      rectRadius: 0.05
    });
    slide.addShape('ellipse', {
      x: cx + 0.1, y: 4.8, w: 0.3, h: 0.3,
      fill: { color: theme.accent }
    });
    slide.addText(c.letter, {
      x: cx + 0.1, y: 4.8, w: 0.3, h: 0.3,
      fontSize: 12, color: "FFFFFF", bold: true, align: "center", valign: "middle"
    });
    slide.addText(c.title + ' — ' + c.prompt, {
      x: cx + 0.5, y: 4.82, w: 2.2, h: 0.55,
      fontSize: 9.5, fontFace: "Microsoft YaHei",
      color: theme.secondary, valign: "middle"
    });
  });

  // 页码
  slide.addShape('roundRect', {
    x: 9.3, y: 5.15, w: 0.5, h: 0.3,
    fill: { color: theme.light }, rectRadius: 0.05
  });
  slide.addText('15', {
    x: 9.3, y: 5.18, w: 0.5, h: 0.25,
    fontSize: 11, fontFace: "Arial",
    color: theme.secondary, align: "center"
  });

  return slide;
}

module.exports = { createSlide, slideConfig };
