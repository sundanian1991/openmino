// clean-05-motivation-analysis.js - 动机分析
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
  slide.addText('03 动机分析与判断', {
    x: 0.5, y: 0.8, w: 9, h: 0.5,
    fontSize: 20, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true,
    align: "left"
  });

  // 核心判断（顶部通栏）
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.4, w: 9, h: 0.45,
    fill: { color: theme.primary }
  });
  slide.addText('核心判断：表演型预警 + 转移视线 + 保护关系网 的三重组合', {
    x: 0.65, y: 1.4, w: 8.7, h: 0.45,
    fontSize: 11, fontFace: "Microsoft YaHei",
    color: theme.bg, bold: true,
    align: "left", valign: "middle"
  });

  // 三大动机
  const motivations = [
    {
      name: '表演型预警',
      stars: '★★★★★',
      logic: '通过"发现问题"来建立自己"关心业务"的人设',
      evidence: ['档案中模式 2"群内表演"：全程有观众意识', '"疯狂地说自己在预警"= 强调"我在努力"'],
      benefit: '如果激励出问题=他预警有功；如果不出问题=他推动有功'
    },
    {
      name: '转移视线',
      stars: '★★★★★',
      logic: '把"交接期管理失效"转移到"激励方案有问题"',
      evidence: ['只说"激励有问题"，不说"交接期信息真空"', '只说"激励定得高"，不说"数据中断、质量变差"'],
      benefit: '规避自己的交接责任，把问题归咎于"方案定得高"'
    },
    {
      name: '保护关系网',
      stars: '★★★★★',
      logic: '只攻击服务组，不攻击策略组，保护刘伟佳',
      evidence: ['激励是策略组定的，但他只说"激励有问题"', '他和刘伟佳关系好（前下属），不提"策略组配合问题"'],
      benefit: '维护和刘伟佳的关系，在策略组那边留"好人"'
    }
  ];

  motivations.forEach((item, index) => {
    const y = 2.0 + (index * 1.05);

    // 名称 + 星级
    slide.addText(item.name, {
      x: 0.5, y: y, w: 2.2, h: 0.22,
      fontSize: 12, fontFace: "Microsoft YaHei",
      color: theme.primary, bold: true,
      align: "left"
    });

    slide.addText(item.stars, {
      x: 2.7, y: y, w: 2.0, h: 0.22,
      fontSize: 10, fontFace: "Microsoft YaHei",
      color: theme.accent,
      align: "left"
    });

    // 逻辑
    slide.addText('逻辑：' + item.logic, {
      x: 0.5, y: y + 0.25, w: 8.9, h: 0.16,
      fontSize: 10, fontFace: "Microsoft YaHei",
      color: theme.primary,
      align: "left"
    });

    // 证据（两行）
    item.evidence.forEach((ev, i) => {
      slide.addText('  · ' + ev, {
        x: 0.5, y: y + 0.42 + (i * 0.13), w: 8.9, h: 0.11,
        fontSize: 9, fontFace: "Microsoft YaHei",
        color: theme.secondary,
        align: "left"
      });
    });

    // 收益
    slide.addText('收益：' + item.benefit, {
      x: 0.5, y: y + 0.72, w: 8.9, h: 0.14,
      fontSize: 9, fontFace: "Microsoft YaHei",
      color: theme.accent, bold: true,
      align: "left"
    });

    // 分隔线（最后一项除外）
    if (index < motivations.length - 1) {
      slide.addShape(pres.shapes.RECTANGLE, {
        x: 0.5, y: y + 0.92, w: 9, h: 0.02,
        fill: { color: theme.light }
      });
    }
  });

  // 工作方式问题（底部）
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 5.15, w: 9, h: 0.25,
    fill: { color: theme.light }
  });
  slide.addText('工作方式问题：不先沟通直接群里"放炮" → 选择性攻击 → 用情绪化数字 → 破坏团队安全感', {
    x: 0.65, y: 5.18, w: 8.7, h: 0.2,
    fontSize: 9, fontFace: "Microsoft YaHei",
    color: theme.secondary,
    align: "left"
  });

  // 页码
  slide.addText('05', {
    x: 9.2, y: 5.25, w: 0.3, h: 0.3,
    fontSize: 10, fontFace: "Arial",
    color: theme.secondary,
    align: "right"
  });

  return slide;
}

module.exports = { createSlide };
