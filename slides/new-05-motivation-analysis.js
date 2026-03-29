// new-05-motivation-analysis.js - 动机分析
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
  slide.addText('03 动机分析与判断', {
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

  // 核心判断卡片（顶部）
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.0, w: 8.9, h: 0.7,
    fill: { color: theme.primary },
    rectRadius: 0.08
  });

  slide.addText('核心判断：表演型预警 + 转移视线 + 保护关系网 的三重组合', {
    x: 0.7, y: 1.15, w: 8.5, h: 0.4,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: "FFFFFF", bold: true,
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
      color: theme.accent
    },
    {
      name: '转移视线',
      stars: '⭐⭐⭐⭐⭐',
      logic: '把"交接期管理失效"转移到"激励方案有问题"',
      evidence: ['只说"激励有问题"，不说"交接期信息真空"', '只说"激励定得高"，不说"数据中断、质量变差"'],
      benefit: '规避自己的交接责任，把问题归咎于"方案定得高"',
      color: theme.light
    },
    {
      name: '保护关系网',
      stars: '⭐⭐⭐⭐⭐',
      logic: '只攻击服务组，不攻击策略组，保护刘伟佳',
      evidence: ['激励是策略组定的，但他只说"激励有问题"', '他和刘伟佳关系好（前下属），不提"策略组配合问题"'],
      benefit: '维护和刘伟佳的关系，在策略组那边留"好人"',
      color: theme.secondary
    }
  ];

  // 绘制三个动机卡片
  motivations.forEach((item, index) => {
    const y = 1.85 + (index * 1.25);

    // 阴影层
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.52, y: y + 0.04, w: 8.9, h: 1.15,
      fill: { color: "D0D0D0", transparency: 50 },
      rectRadius: 0.08
    });

    // 主卡片
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.5, y: y, w: 8.9, h: 1.15,
      fill: { color: "FFFFFF" },
      rectRadius: 0.08
    });

    // 左侧强调条
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 0.06, h: 1.15,
      fill: { color: item.color }
    });

    // 名称 + 星级
    slide.addText(item.name, {
      x: 0.7, y: y + 0.12, w: 2.5, h: 0.25,
      fontSize: 14, fontFace: "Microsoft YaHei",
      color: theme.primary, bold: true,
      align: "left"
    });

    slide.addText(item.stars, {
      x: 3.0, y: y + 0.12, w: 2.0, h: 0.25,
      fontSize: 12, fontFace: "Microsoft YaHei",
      color: theme.accent,
      align: "left"
    });

    // 逻辑
    slide.addText('逻辑：' + item.logic, {
      x: 0.7, y: y + 0.4, w: 8.2, h: 0.2,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: theme.primary,
      align: "left"
    });

    // 证据（两行）
    item.evidence.forEach((ev, i) => {
      slide.addText('• ' + ev, {
        x: 0.7, y: y + 0.62 + (i * 0.18), w: 8.2, h: 0.16,
        fontSize: 10, fontFace: "Microsoft YaHei",
        color: theme.secondary,
        align: "left"
      });
    });

    // 收益
    slide.addText('收益：' + item.benefit, {
      x: 0.7, y: y + 0.95, w: 8.2, h: 0.16,
      fontSize: 10, fontFace: "Microsoft YaHei",
      color: theme.accent, bold: true,
      align: "left"
    });
  });

  // 工作方式问题（底部）
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 5.1, w: 9, h: 0.35,
    fill: { color: theme.light, transparency: 70 }
  });

  slide.addText('工作方式问题：不先沟通直接群里"放炮" → 选择性攻击 → 用情绪化数字 → 破坏团队安全感', {
    x: 0.7, y: 5.15, w: 8.6, h: 0.25,
    fontSize: 10, fontFace: "Microsoft YaHei",
    color: theme.secondary,
    align: "left"
  });

  // 页码徽章
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: theme.accent }
  });
  slide.addText("5", {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fontSize: 12, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  return slide;
}

module.exports = { createSlide };
