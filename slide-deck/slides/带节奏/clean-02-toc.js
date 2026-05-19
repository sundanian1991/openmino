// clean-02-toc.js - 目录页
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
  slide.addText('目录', {
    x: 0.5, y: 0.8, w: 9, h: 0.5,
    fontSize: 24, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true,
    align: "left"
  });

  // 章节列表（左右两列布局，填充空白）
  const chapters = [
    { num: '01', title: '事件回顾与核心矛盾', desc: '刘乾坤的攻击 vs 实际情况', points: ['攻击话术', '实际数据对比'] },
    { num: '02', title: '行为模式拆解', desc: '五拳组合拳路分析', points: ['选择性攻击', '群内表演', '道德绑架'] },
    { num: '03', title: '动机分析与判断', desc: '表演型预警 + 转移视线 + 保护关系网', points: ['三重动机', '核心判断'] },
    { num: '04', title: '应对策略与话术', desc: '五大原则 + REACT 框架', points: ['核心原则', 'REACT 回应框架'] }
  ];

  // 左列（01、02）
  for (let i = 0; i < 2; i++) {
    const item = chapters[i];
    const y = 1.6 + (i * 1.9);

    // 卡片背景
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 4.3, h: 1.75,
      line: { color: theme.light, width: 1 }
    });

    // 序号
    slide.addText(item.num, {
      x: 0.65, y: y + 0.15, w: 0.4, h: 0.3,
      fontSize: 16, fontFace: "Arial",
      color: theme.accent, bold: true,
      align: "left"
    });

    // 标题
    slide.addText(item.title, {
      x: 0.65, y: y + 0.15, w: 3.8, h: 0.3,
      fontSize: 13, fontFace: "Microsoft YaHei",
      color: theme.primary, bold: true,
      align: "right"
    });

    // 描述
    slide.addText(item.desc, {
      x: 0.65, y: y + 0.5, w: 4.0, h: 0.25,
      fontSize: 10, fontFace: "Microsoft YaHei",
      color: theme.secondary,
      align: "left"
    });

    // 要点列表
    item.points.forEach((point, j) => {
      slide.addText('· ' + point, {
        x: 0.65, y: y + 0.8 + (j * 0.28), w: 4.0, h: 0.22,
        fontSize: 10, fontFace: "Microsoft YaHei",
        color: theme.primary,
        align: "left"
      });
    });
  }

  // 右列（03、04）
  for (let i = 2; i < 4; i++) {
    const item = chapters[i];
    const y = 1.6 + ((i - 2) * 1.9);
    const x = 5.2;

    // 卡片背景
    slide.addShape(pres.shapes.RECTANGLE, {
      x: x, y: y, w: 4.3, h: 1.75,
      line: { color: theme.light, width: 1 }
    });

    // 序号
    slide.addText(item.num, {
      x: x + 0.15, y: y + 0.15, w: 0.4, h: 0.3,
      fontSize: 16, fontFace: "Arial",
      color: theme.accent, bold: true,
      align: "left"
    });

    // 标题
    slide.addText(item.title, {
      x: x + 0.65, y: y + 0.15, w: 3.5, h: 0.3,
      fontSize: 13, fontFace: "Microsoft YaHei",
      color: theme.primary, bold: true,
      align: "left"
    });

    // 描述
    slide.addText(item.desc, {
      x: x + 0.65, y: y + 0.5, w: 3.5, h: 0.25,
      fontSize: 10, fontFace: "Microsoft YaHei",
      color: theme.secondary,
      align: "left"
    });

    // 要点列表
    item.points.forEach((point, j) => {
      slide.addText('· ' + point, {
        x: x + 0.65, y: y + 0.8 + (j * 0.28), w: 3.5, h: 0.22,
        fontSize: 10, fontFace: "Microsoft YaHei",
        color: theme.primary,
        align: "left"
      });
    });
  }

  // 底部说明
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 5.15, w: 9, h: 0.25,
    fill: { color: theme.primary }
  });
  slide.addText('共 4 个章节，约 15 分钟汇报', {
    x: 0.65, y: 5.15, w: 8.7, h: 0.25,
    fontSize: 10, fontFace: "Microsoft YaHei",
    color: theme.bg,
    align: "left", valign: "middle"
  });

  // 页码
  slide.addText('02', {
    x: 9.2, y: 5.25, w: 0.3, h: 0.3,
    fontSize: 10, fontFace: "Arial",
    color: theme.secondary,
    align: "right"
  });

  return slide;
}

module.exports = { createSlide };
