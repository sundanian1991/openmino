// new-06-response-strategy.js - 应对策略
// 设计：Luxury & Mysterious - 冷紫调高端咨询感

const pptxgen = require('pptxgenjs');

const theme = {
  primary: "22223b",
  secondary: "4a4e69",
  accent: "c9ada7",
  light: "9a8c98",
  bg: "f2e9e4"
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 页面标题
  slide.addText('04 应对策略与话术', {
    x: 0.5, y: 0.4, w: 9, h: 0.5,
    fontSize: 24, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true,
    align: "left"
  });

  // 左侧装饰条
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.3, y: 0.4, w: 0.12, h: 0.45,
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

  // 绘制五个原则卡片（横向）
  principles.forEach((item, index) => {
    const x = 0.5 + (index * 1.85);
    const y = 1.1;
    const w = 1.78;
    const h = 2.2;

    // 阴影层
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x + 0.03, y: y + 0.04, w: w, h: h,
      fill: { color: "D0D0D0", transparency: 50 },
      rectRadius: 0.08
    });

    // 主卡片
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x, y: y, w: w, h: h,
      fill: { color: "FFFFFF" },
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
      fontSize: 24, fontFace: "Arial",
      align: "center", valign: "middle"
    });

    // 名称
    slide.addText(item.name, {
      x: x + 0.5, y: y + 0.18, w: w - 0.6, h: 0.35,
      fontSize: 14, fontFace: "Microsoft YaHei",
      color: theme.primary, bold: true,
      align: "left", valign: "middle"
    });

    // 描述
    slide.addText(item.desc, {
      x: x + 0.15, y: y + 0.6, w: w - 0.25, h: 1.4,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: theme.secondary,
      align: "left", valign: "top"
    });
  });

  // REACT 框架卡片（底部）
  const reactY = 3.5;

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: reactY, w: 8.9, h: 1.45,
    fill: { color: "FFFFFF" },
    rectRadius: 0.08
  });

  // 左侧强调条
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: reactY, w: 0.06, h: 1.45,
    fill: { color: theme.light }
  });

  slide.addText('REACT 回应框架（群内@时使用）', {
    x: 0.7, y: reactY + 0.12, w: 8.5, h: 0.3,
    fontSize: 14, fontFace: "Microsoft YaHei",
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
    const y = reactY + 0.48 + (Math.floor(i / 3) * 0.42);
    slide.addText(item.step, {
      x: x, y: y, w: 2.8, h: 0.18,
      fontSize: 10, fontFace: "Microsoft YaHei",
      color: theme.accent, bold: true,
      align: "left"
    });
    slide.addText(item.text, {
      x: x, y: y + 0.15, w: 2.8, h: 0.22,
      fontSize: 9, fontFace: "Microsoft YaHei",
      color: theme.secondary,
      align: "left"
    });
  });

  // 页码徽章
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: theme.accent }
  });
  slide.addText("6", {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fontSize: 12, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  return slide;
}

module.exports = { createSlide };
