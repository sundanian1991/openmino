// new-07-summary.js - 总结页
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
  slide.addText('总结：关键洞察与行动指南', {
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

  // 左侧：关键洞察
  const leftY = 1.1;

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: leftY, w: 4.4, h: 3.5,
    fill: { color: "FFFFFF" },
    rectRadius: 0.08
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: leftY, w: 0.06, h: 3.5,
    fill: { color: theme.primary }
  });

  slide.addText('关键洞察', {
    x: 0.7, y: leftY + 0.15, w: 4.1, h: 0.35,
    fontSize: 16, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true,
    align: "left"
  });

  const insights = [
    { label: '预警确实存在', desc: '激励确实定得高、难达成，这是事实' },
    { label: '但方式有问题', desc: '选择性攻击、群里放炮、道德绑架、破坏安全感' },
    { label: '核心动机', desc: '表演型预警 + 转移视线 + 保护关系网' },
    { label: '工作方式', desc: '不是正常的工作方式，让人觉得动机有问题' }
  ];

  insights.forEach((item, i) => {
    const y = leftY + 0.55 + (i * 0.75);
    slide.addText('✓ ' + item.label, {
      x: 0.7, y: y, w: 4.1, h: 0.25,
      fontSize: 12, fontFace: "Microsoft YaHei",
      color: theme.primary, bold: true,
      align: "left"
    });
    slide.addText(item.desc, {
      x: 0.7, y: y + 0.22, w: 4.1, h: 0.45,
      fontSize: 10, fontFace: "Microsoft YaHei",
      color: theme.secondary,
      align: "left"
    });
  });

  // 右侧：行动指南
  const rightY = 1.1;

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.0, y: rightY, w: 4.4, h: 3.5,
    fill: { color: "FFFFFF" },
    rectRadius: 0.08
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 5.0, y: rightY, w: 0.06, h: 3.5,
    fill: { color: theme.accent }
  });

  slide.addText('行动指南', {
    x: 5.2, y: rightY + 0.15, w: 4.1, h: 0.35,
    fontSize: 16, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true,
    align: "left"
  });

  const actions = [
    { label: '识别模式', desc: '认清这是"表演型预警"，不是真的危机' },
    { label: '不接靶子', desc: '不说"激励/策略确实有问题"' },
    { label: '回归事实', desc: '指出"交接期信息真空、数据中断"' },
    { label: '保护安全感', desc: '不在群里制造对立，建议私下沟通' }
  ];

  actions.forEach((item, i) => {
    const y = rightY + 0.55 + (i * 0.75);
    slide.addText('→ ' + item.label, {
      x: 5.2, y: y, w: 4.1, h: 0.25,
      fontSize: 12, fontFace: "Microsoft YaHei",
      color: theme.accent, bold: true,
      align: "left"
    });
    slide.addText(item.desc, {
      x: 5.2, y: y + 0.22, w: 4.1, h: 0.45,
      fontSize: 10, fontFace: "Microsoft YaHei",
      color: theme.secondary,
      align: "left"
    });
  });

  // 底部金句卡片
  const quoteY = 4.75;

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: quoteY, w: 8.9, h: 0.7,
    fill: { color: theme.primary },
    rectRadius: 0.08
  });

  slide.addText('"情绪化的数字不能帮助我们解决问题，反而会制造恐慌，破坏团队安全感。"', {
    x: 0.7, y: quoteY + 0.12, w: 8.5, h: 0.28,
    fontSize: 13, fontFace: "Microsoft YaHei",
    color: "FFFFFF",
    align: "left"
  });

  slide.addText('—— 核心话术', {
    x: 0.7, y: quoteY + 0.42, w: 8.5, h: 0.2,
    fontSize: 10, fontFace: "Microsoft YaHei",
    color: theme.accent,
    align: "left"
  });

  // 页码徽章
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: theme.accent }
  });
  slide.addText("7", {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fontSize: 12, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  return slide;
}

module.exports = { createSlide };
