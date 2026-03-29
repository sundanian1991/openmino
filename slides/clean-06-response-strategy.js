// clean-06-response-strategy.js - 应对策略
// 设计：极致简洁白

const pptxgen = require('pptxgenjs');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 顶部红色强调线
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.5, w: 1.5, h: 0.08,
    fill: { color: theme.accent }
  });

  // 标题
  slide.addText('04 应对策略与话术', {
    x: 0.5, y: 0.8, w: 9, h: 0.5,
    fontSize: 20, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true,
    align: "left"
  });

  // 五大核心原则（横向 5 列）
  const principles = [
    { name: '不接靶子', desc: '不说"激励确实有问题"、"策略确实有问题"' },
    { name: '回归根本原因', desc: '指出"交接期信息真空、数据中断"' },
    { name: '拒绝逼迫', desc: '不被道德绑架逼迫表态' },
    { name: '保护安全感', desc: '不在群里制造对立' },
    { name: '用数据说话', desc: '真实数据对抗情绪化数字' }
  ];

  principles.forEach((item, index) => {
    const x = 0.5 + (index * 1.8);
    const y = 1.4;
    const w = 1.75;
    const h = 1.9;

    // 序号背景
    slide.addShape(pres.shapes.RECTANGLE, {
      x: x, y: y, w: w, h: 0.35,
      fill: { color: theme.accent }
    });

    // 序号
    slide.addText((index + 1).toString(), {
      x: x, y: y, w: w, h: 0.35,
      fontSize: 14, fontFace: "Arial",
      color: theme.bg, bold: true,
      align: "center", valign: "middle"
    });

    // 名称
    slide.addText(item.name, {
      x: x + 0.1, y: y + 0.42, w: w - 0.2, h: 0.3,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: theme.primary, bold: true,
      align: "center"
    });

    // 描述
    slide.addText(item.desc, {
      x: x + 0.1, y: y + 0.78, w: w - 0.2, h: 0.9,
      fontSize: 9, fontFace: "Microsoft YaHei",
      color: theme.secondary,
      align: "center"
    });
  });

  // REACT 框架标题
  slide.addText('REACT 回应框架（群内@时使用）', {
    x: 0.5, y: 3.5, w: 9, h: 0.25,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true,
    align: "left"
  });

  const reactSteps = [
    { step: 'R - Respond', text: '"我理解你对激励问题的担忧"' },
    { step: 'E - Explain', text: '"真正的问题是交接期信息真空、数据中断，不是拿不到钱"' },
    { step: 'A - Action', text: '"我这边已经和头部供应商沟通过，建议恢复数据同步机制"' },
    { step: 'C - Constraint', text: '"激励方案制定在策略组，我这边负责供应商沟通"' },
    { step: 'T - Target', text: '"建议你们私下对齐交接期责任划分，恢复数据同步"' }
  ];

  reactSteps.forEach((item, i) => {
    const x = 0.5 + ((i % 3) * 3.0);
    const y = 3.78 + (Math.floor(i / 3) * 0.65);
    slide.addText(item.step, {
      x: x, y: y, w: 2.9, h: 0.18,
      fontSize: 9, fontFace: "Microsoft YaHei",
      color: theme.accent, bold: true,
      align: "left"
    });
    slide.addText(item.text, {
      x: x, y: y + 0.16, w: 2.9, h: 0.4,
      fontSize: 9, fontFace: "Microsoft YaHei",
      color: theme.secondary,
      align: "left"
    });
  });

  // 页码
  slide.addText('06', {
    x: 9.2, y: 5.25, w: 0.3, h: 0.3,
    fontSize: 10, fontFace: "Arial",
    color: theme.secondary,
    align: "right"
  });

  return slide;
}

module.exports = { createSlide };
