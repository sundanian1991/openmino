// new-03-event-review.js - 事件回顾
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
  slide.addText('01 事件回顾与核心矛盾', {
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

  // 卡片 1：刘乾坤的攻击
  const card1Y = 1.0;

  // 阴影层
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.52, y: card1Y + 0.04, w: 4.3, h: 1.8,
    fill: { color: "D0D0D0", transparency: 50 },
    rectRadius: 0.08
  });
  // 主卡片
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: card1Y, w: 4.3, h: 1.8,
    fill: { color: "FFFFFF" },
    rectRadius: 0.08
  });
  // 左侧强调条
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: card1Y, w: 0.06, h: 1.8,
    fill: { color: theme.accent }
  });

  slide.addText('刘乾坤的攻击', {
    x: 0.7, y: card1Y + 0.15, w: 4.0, h: 0.35,
    fontSize: 16, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true,
    align: "left"
  });

  const attacks = [
    '"激励拿不到，供应商会大量流失"',
    '"影响 1400 个工人、5000 个家庭"',
    '"激励方案定得非常有问题"',
    '在群里@所有人，疯狂预警'
  ];
  attacks.forEach((item, i) => {
    slide.addText(item, {
      x: 0.7, y: card1Y + 0.55 + (i * 0.28), w: 4.0, h: 0.25,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: theme.secondary,
      align: "left"
    });
  });

  // 卡片 2：实际情况
  const card2Y = 1.0;

  // 阴影层
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.12, y: card2Y + 0.04, w: 4.3, h: 1.8,
    fill: { color: "D0D0D0", transparency: 50 },
    rectRadius: 0.08
  });
  // 主卡片
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.1, y: card2Y, w: 4.3, h: 1.8,
    fill: { color: "FFFFFF" },
    rectRadius: 0.08
  });
  // 左侧强调条
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 5.1, y: card2Y, w: 0.06, h: 1.8,
    fill: { color: theme.light }
  });

  slide.addText('实际情况', {
    x: 5.3, y: card2Y + 0.15, w: 4.0, h: 0.35,
    fontSize: 16, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true,
    align: "left"
  });

  const facts = [
    '只有头部供应商个别问题',
    '激励可以放到 4 月继续发',
    '激励是策略组定的（多方共识）',
    '交接期信息真空、数据中断'
  ];
  facts.forEach((item, i) => {
    slide.addText(item, {
      x: 5.3, y: card2Y + 0.55 + (i * 0.28), w: 4.0, h: 0.25,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: theme.secondary,
      align: "left"
    });
  });

  // 核心矛盾卡片（底部）
  const conflictY = 3.3;

  // 阴影层
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.52, y: conflictY + 0.04, w: 8.9, h: 1.6,
    fill: { color: "D0D0D0", transparency: 50 },
    rectRadius: 0.08
  });
  // 主卡片
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: conflictY, w: 8.9, h: 1.6,
    fill: { color: "FFFFFF" },
    rectRadius: 0.08
  });
  // 左侧强调条
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: conflictY, w: 0.06, h: 1.6,
    fill: { color: theme.primary }
  });

  slide.addText('核心矛盾', {
    x: 0.7, y: conflictY + 0.15, w: 8.6, h: 0.35,
    fontSize: 16, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true,
    align: "left"
  });

  const conflictItems = [
    { label: '选择性攻击', desc: '只攻击服务组，不攻击策略组（激励是策略组定的）' },
    { label: '转移视线', desc: '把"交接期问题"转移到"激励方案问题"' },
    { label: '保护关系网', desc: '他和刘伟佳关系好，不提策略组配合问题' },
    { label: '破坏安全感', desc: '群里制造对立，让大家都紧绷' }
  ];
  conflictItems.forEach((item, i) => {
    const x = 0.7 + ((i % 2) * 4.4);
    const y = conflictY + 0.55 + (Math.floor(i / 2) * 0.45);
    slide.addText(item.label, {
      x: x, y: y, w: 4.2, h: 0.2,
      fontSize: 12, fontFace: "Microsoft YaHei",
      color: theme.primary, bold: true,
      align: "left"
    });
    slide.addText(item.desc, {
      x: x, y: y + 0.18, w: 4.2, h: 0.25,
      fontSize: 10, fontFace: "Microsoft YaHei",
      color: theme.secondary,
      align: "left"
    });
  });

  // 页码徽章
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: theme.accent }
  });
  slide.addText("3", {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fontSize: 12, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  return slide;
}

module.exports = { createSlide };
