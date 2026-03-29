// clean-03-event-review.js - 事件回顾
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
  slide.addText('01 事件回顾与核心矛盾', {
    x: 0.5, y: 0.8, w: 9, h: 0.5,
    fontSize: 20, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true,
    align: "left"
  });

  // 左右对比表头
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.5, w: 4.4, h: 0.35,
    fill: { color: theme.primary }
  });
  slide.addText('刘乾坤的攻击', {
    x: 0.5, y: 1.5, w: 4.4, h: 0.35,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: theme.bg, bold: true,
    align: "center", valign: "middle"
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 5.1, y: 1.5, w: 4.4, h: 0.35,
    fill: { color: theme.accent }
  });
  slide.addText('实际情况', {
    x: 5.1, y: 1.5, w: 4.4, h: 0.35,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: theme.bg, bold: true,
    align: "center", valign: "middle"
  });

  // 左侧内容（攻击）
  const attacks = [
    '激励拿不到，供应商会大量流失',
    '影响 1400 个工人、5000 个家庭',
    '激励方案定得非常有问题',
    '在群里@所有人，疯狂预警'
  ];
  attacks.forEach((item, i) => {
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: 1.9 + (i * 0.65), w: 4.4, h: 0.6,
      fill: { color: i % 2 === 0 ? theme.bg : "FAFAFA" }
    });
    slide.addText('✗ ' + item, {
      x: 0.65, y: 1.9 + (i * 0.65), w: 4.1, h: 0.6,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: theme.primary,
      align: "left", valign: "middle"
    });
  });

  // 右侧内容（事实）
  const facts = [
    '只有头部供应商个别问题',
    '激励可以放到 4 月继续发',
    '激励是策略组定的（多方共识）',
    '交接期信息真空、数据中断'
  ];
  facts.forEach((item, i) => {
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 5.1, y: 1.9 + (i * 0.65), w: 4.4, h: 0.6,
      fill: { color: i % 2 === 0 ? theme.bg : "FAFAFA" }
    });
    slide.addText('✓ ' + item, {
      x: 5.25, y: 1.9 + (i * 0.65), w: 4.1, h: 0.6,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: theme.primary,
      align: "left", valign: "middle"
    });
  });

  // 核心矛盾（底部）
  slide.addText('核心矛盾', {
    x: 0.5, y: 4.3, w: 9, h: 0.3,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true,
    align: "left"
  });

  const conflicts = [
    { label: '选择性攻击', desc: '只攻击服务组，不攻击策略组（激励是策略组定的）' },
    { label: '转移视线', desc: '把"交接期问题"转移到"激励方案问题"' },
    { label: '保护关系网', desc: '他和刘伟佳关系好，不提策略组配合问题' },
    { label: '破坏安全感', desc: '群里制造对立，让大家都紧绷' }
  ];

  conflicts.forEach((item, i) => {
    const x = 0.5 + ((i % 2) * 4.5);
    const y = 4.65 + (Math.floor(i / 2) * 0.55);
    slide.addText('• ' + item.label, {
      x: x, y: y, w: 4.3, h: 0.22,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: theme.accent, bold: true,
      align: "left"
    });
    slide.addText(item.desc, {
      x: x, y: y + 0.2, w: 4.3, h: 0.3,
      fontSize: 10, fontFace: "Microsoft YaHei",
      color: theme.secondary,
      align: "left"
    });
  });

  // 页码
  slide.addText('03', {
    x: 9.2, y: 5.25, w: 0.3, h: 0.3,
    fontSize: 10, fontFace: "Arial",
    color: theme.secondary,
    align: "right"
  });

  return slide;
}

module.exports = { createSlide };
