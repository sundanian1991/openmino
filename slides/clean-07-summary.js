// clean-07-summary.js - 总结页
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
  slide.addText('总结：关键洞察与行动指南', {
    x: 0.5, y: 0.8, w: 9, h: 0.5,
    fontSize: 20, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true,
    align: "left"
  });

  // 左侧：关键洞察
  slide.addText('关键洞察', {
    x: 0.5, y: 1.5, w: 4.2, h: 0.35,
    fontSize: 14, fontFace: "Microsoft YaHei",
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
    const y = 1.9 + (i * 0.75);
    slide.addText('✓ ' + item.label, {
      x: 0.5, y: y, w: 4.2, h: 0.25,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: theme.primary, bold: true,
      align: "left"
    });
    slide.addText(item.desc, {
      x: 0.5, y: y + 0.23, w: 4.2, h: 0.45,
      fontSize: 10, fontFace: "Microsoft YaHei",
      color: theme.secondary,
      align: "left"
    });
  });

  // 右侧：行动指南
  slide.addText('行动指南', {
    x: 5.1, y: 1.5, w: 4.4, h: 0.35,
    fontSize: 14, fontFace: "Microsoft YaHei",
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
    const y = 1.9 + (i * 0.75);
    slide.addText('→ ' + item.label, {
      x: 5.1, y: y, w: 4.4, h: 0.25,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: theme.accent, bold: true,
      align: "left"
    });
    slide.addText(item.desc, {
      x: 5.1, y: y + 0.23, w: 4.4, h: 0.45,
      fontSize: 10, fontFace: "Microsoft YaHei",
      color: theme.secondary,
      align: "left"
    });
  });

  // 底部金句
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.55, w: 9, h: 0.7,
    fill: { color: theme.primary }
  });
  slide.addText('"情绪化的数字不能帮助我们解决问题，反而会制造恐慌，破坏团队安全感。"', {
    x: 0.65, y: 4.55, w: 8.7, h: 0.45,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: theme.bg,
    align: "left", valign: "middle"
  });
  slide.addText('—— 核心话术', {
    x: 0.65, y: 5.05, w: 8.7, h: 0.2,
    fontSize: 9, fontFace: "Microsoft YaHei",
    color: theme.bg,
    align: "left"
  });

  // 页码
  slide.addText('07', {
    x: 9.2, y: 5.25, w: 0.3, h: 0.3,
    fontSize: 10, fontFace: "Arial",
    color: theme.secondary,
    align: "right"
  });

  return slide;
}

module.exports = { createSlide };
