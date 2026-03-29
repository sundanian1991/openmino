// dark-05-motivation-analysis.js - 动机分析
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
  slide.addText('03 动机分析与判断', {
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

  // 核心判断卡片（顶部）
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.15, w: 8.9, h: 0.65,
    fill: { color: theme.accent },
    rectRadius: 0.08
  });
  slide.addText('核心判断：表演型预警 + 转移视线 + 保护关系网 的三重组合', {
    x: 0.7, y: 1.3, w: 8.5, h: 0.4,
    fontSize: 13, fontFace: "Microsoft YaHei",
    color: theme.bg, bold: true,
    align: "left"
  });

  // 三大动机卡片
  const motivations = [
    {
      name: '表演型预警',
      stars: '⭐⭐⭐⭐⭐',
      logic: '通过"发现问题"来建立自己"关心业务"的人设',
      evidence: ['档案中模式 2"群内表演"：全程有观众意识', '"疯狂地说自己在预警"= 强调"我在努力"'],
      benefit: '如果激励出问题=他预警有功；如果不出问题=他推动有功',
      color: 'c9a962'
    },
    {
      name: '转移视线',
      stars: '⭐⭐⭐⭐⭐',
      logic: '把"交接期管理失效"转移到"激励方案有问题"',
      evidence: ['只说"激励有问题"，不说"交接期信息真空"', '只说"激励定得高"，不说"数据中断、质量变差"'],
      benefit: '规避自己的交接责任，把问题归咎于"方案定得高"',
      color: 'a0a0a0'
    },
    {
      name: '保护关系网',
      stars: '⭐⭐⭐⭐⭐',
      logic: '只攻击服务组，不攻击策略组，保护刘伟佳',
      evidence: ['激励是策略组定的，但他只说"激励有问题"', '他和刘伟佳关系好（前下属），不提"策略组配合问题"'],
      benefit: '维护和刘伟佳的关系，在策略组那边留"好人"',
      color: '6a6a6a'
    }
  ];

  motivations.forEach((item, index) => {
    const y = 1.95 + (index * 1.1);

    // 卡片背景
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.5, y: y, w: 8.9, h: 1.0,
      fill: { color: theme.surface },
      rectRadius: 0.08
    });

    // 左侧强调条
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 0.06, h: 1.0,
      fill: { color: item.color }
    });

    // 名称 + 星级
    slide.addText(item.name, {
      x: 0.7, y: y + 0.12, w: 2.5, h: 0.22,
      fontSize: 13, fontFace: "Microsoft YaHei",
      color: theme.primary, bold: true,
      align: "left"
    });

    slide.addText(item.stars, {
      x: 3.0, y: y + 0.12, w: 2.0, h: 0.22,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: item.color,
      align: "left"
    });

    // 逻辑
    slide.addText('逻辑：' + item.logic, {
      x: 0.7, y: y + 0.4, w: 8.2, h: 0.18,
      fontSize: 10, fontFace: "Microsoft YaHei",
      color: theme.secondary,
      align: "left"
    });

    // 证据（两行）
    item.evidence.forEach((ev, i) => {
      slide.addText('• ' + ev, {
        x: 0.7, y: y + 0.58 + (i * 0.15), w: 8.2, h: 0.13,
        fontSize: 9, fontFace: "Microsoft YaHei",
        color: theme.secondary,
        align: "left"
      });
    });

    // 收益
    slide.addText('收益：' + item.benefit, {
      x: 0.7, y: y + 0.85, w: 8.2, h: 0.13,
      fontSize: 9, fontFace: "Microsoft YaHei",
      color: theme.accent, bold: true,
      align: "left"
    });
  });

  // 工作方式问题（底部）
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 5.15, w: 8.9, h: 0.25,
    fill: { color: theme.surface }
  });
  slide.addText('工作方式问题：不先沟通直接群里"放炮" → 选择性攻击 → 用情绪化数字 → 破坏团队安全感', {
    x: 0.7, y: 5.18, w: 8.5, h: 0.2,
    fontSize: 9, fontFace: "Microsoft YaHei",
    color: theme.secondary,
    align: "left"
  });

  // 页码
  slide.addText('5', {
    x: 9.6, y: 5.45, w: 0.3, h: 0.3,
    fontSize: 11, fontFace: "Arial",
    color: theme.secondary,
    align: "right"
  });

  return slide;
}

module.exports = { createSlide };
