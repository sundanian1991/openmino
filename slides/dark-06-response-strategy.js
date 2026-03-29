// dark-06-response-strategy.js - 应对策略
// 设计：Dark Premium Consulting - 深色高端咨询风

const pptxgen = require('pptxgenjs');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 顶部装饰线
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.08,
    fill: { color: theme.accent }
  });

  // 标题
  slide.addText('04 应对策略与话术', {
    x: 0.5, y: 0.5, w: 9, h: 0.5,
    fontSize: 24, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true,
    align: "left"
  });

  // 左侧竖条
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.5, w: 0.08, h: 0.5,
    fill: { color: theme.accent }
  });

  // 五大核心原则
  const principles = [
    { name: '不接靶子', desc: '不说"激励确实有问题"、"策略确实有问题"', icon: '🎯' },
    { name: '回归根本原因', desc: '指出"交接期信息真空、数据中断"', icon: '📊' },
    { name: '拒绝逼迫', desc: '不被道德绑架逼迫表态', icon: '🛡️' },
    { name: '保护安全感', desc: '不在群里制造对立', icon: '💙' },
    { name: '用数据说话', desc: '真实数据对抗情绪化数字', icon: '📈' }
  ];

  principles.forEach((item, index) => {
    const x = 0.5 + (index * 1.82);
    const y = 1.2;
    const w = 1.75;
    const h = 2.0;

    // 卡片背景
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x, y: y, w: w, h: h,
      fill: { color: theme.surface },
      rectRadius: 0.08
    });

    // 左侧强调条
    slide.addShape(pres.shapes.RECTANGLE, {
      x: x, y: y, w: 0.06, h: h,
      fill: { color: theme.accent }
    });

    // 图标
    slide.addText(item.icon, {
      x: x + 0.15, y: y + 0.15, w: 0.4, h: 0.4,
      fontSize: 20, fontFace: "Arial",
      align: "center", valign: "middle"
    });

    // 名称
    slide.addText(item.name, {
      x: x + 0.5, y: y + 0.18, w: w - 0.6, h: 0.3,
      fontSize: 13, fontFace: "Microsoft YaHei",
      color: theme.primary, bold: true,
      align: "left", valign: "middle"
    });

    // 描述
    slide.addText(item.desc, {
      x: x + 0.15, y: y + 0.55, w: w - 0.25, h: 1.3,
      fontSize: 10, fontFace: "Microsoft YaHei",
      color: theme.secondary,
      align: "left", valign: "top"
    });
  });

  // REACT 框架卡片（底部）
  const reactY = 3.4;
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: reactY, w: 8.9, h: 1.6,
    fill: { color: theme.surface },
    rectRadius: 0.08
  });

  // 左侧强调条
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: reactY, w: 0.06, h: 1.6,
    fill: { color: theme.accent }
  });

  slide.addText('REACT 回应框架（群内@时使用）', {
    x: 0.7, y: reactY + 0.12, w: 8.5, h: 0.25,
    fontSize: 13, fontFace: "Microsoft YaHei",
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
    const x = 0.7 + ((i % 3) * 2.95);
    const y = reactY + 0.45 + (Math.floor(i / 3) * 0.55);
    slide.addText(item.step, {
      x: x, y: y, w: 2.8, h: 0.2,
      fontSize: 10, fontFace: "Microsoft YaHei",
      color: theme.accent, bold: true,
      align: "left"
    });
    slide.addText(item.text, {
      x: x, y: y + 0.18, w: 2.8, h: 0.3,
      fontSize: 9, fontFace: "Microsoft YaHei",
      color: theme.secondary,
      align: "left"
    });
  });

  // 页码
  slide.addText('6', {
    x: 9.6, y: 5.45, w: 0.3, h: 0.3,
    fontSize: 11, fontFace: "Arial",
    color: theme.secondary,
    align: "right"
  });

  return slide;
}

module.exports = { createSlide };
