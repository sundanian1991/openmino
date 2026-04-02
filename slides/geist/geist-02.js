// geist-02.js — Table of Contents (Card-Based)
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'toc',
  index: 2,
  title: '目录'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 顶部装饰线
  slide.addShape('rect', {
    x: 0, y: 0, w: 10, h: 0.04,
    fill: { color: theme.accent }
  });

  slide.addText('目录', {
    x: 0.5, y: 0.5, w: 9, h: 0.8,
    fontSize: 36, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  const sections = [
    { num: '01', title: '风格 DNA', desc: '三大核心支柱与设计哲学' },
    { num: '02', title: '色彩系统', desc: '陶土色家族与无障碍规范' },
    { num: '03', title: '线条与构图', desc: '手绘规则与网格系统' },
    { num: '04', title: '标志性元素库', desc: '手形符号与自然意象' },
    { num: '05', title: '情感与语义', desc: '色彩心理学与竞品差异化' },
    { num: '06', title: 'Prompt 模板', desc: '可复用的风格生成指令' }
  ];

  const cardW = 2.05;
  const cardH = 2.6;
  const gap = 0.2;
  const totalW = 6 * cardW + 5 * gap;
  const startX = (10 - totalW) / 2;

  sections.forEach((sec, i) => {
    const cx = startX + i * (cardW + gap);

    // 卡片
    slide.addShape('roundRect', {
      x: cx, y: 1.6, w: cardW, h: cardH,
      fill: { color: "FFFFFF" },
      rectRadius: 0.06,
      shadow: { type: "outer", blur: 6, offset: 2, color: "000000", opacity: 0.08 }
    });

    // 顶部强调线
    slide.addShape('rect', {
      x: cx, y: 1.6, w: cardW, h: 0.04,
      fill: { color: theme.accent }
    });

    // 编号
    slide.addText(sec.num, {
      x: cx + 0.15, y: 1.9, w: cardW - 0.3, h: 0.5,
      fontSize: 26, fontFace: "Arial",
      color: theme.accent, bold: true
    });

    // 标题
    slide.addText(sec.title, {
      x: cx + 0.15, y: 2.45, w: cardW - 0.3, h: 0.45,
      fontSize: 16, fontFace: "Microsoft YaHei",
      color: theme.primary, bold: true
    });

    // 描述
    slide.addText(sec.desc, {
      x: cx + 0.15, y: 3.0, w: cardW - 0.3, h: 0.8,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: theme.light, valign: "top"
    });
  });

  // 页码
  slide.addShape('roundRect', {
    x: 9.3, y: 5.15, w: 0.5, h: 0.3,
    fill: { color: theme.accent }, rectRadius: 0.05
  });
  slide.addText('02', {
    x: 9.3, y: 5.18, w: 0.5, h: 0.25,
    fontSize: 11, fontFace: "Arial",
    color: "FFFFFF", align: "center"
  });

  return slide;
}

module.exports = { createSlide, slideConfig };
