// dark-02-toc.js - 目录页
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
  slide.addText('目录', {
    x: 0.5, y: 0.5, w: 9, h: 0.5,
    fontSize: 28, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true,
    align: "left"
  });

  // 左侧竖条
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.5, w: 0.08, h: 0.5,
    fill: { color: theme.accent }
  });

  // 章节列表
  const chapters = [
    { num: '01', title: '事件回顾与核心矛盾', desc: '刘乾坤的攻击 vs 实际情况' },
    { num: '02', title: '行为模式拆解', desc: '五拳组合拳路分析' },
    { num: '03', title: '动机分析与判断', desc: '表演型预警 + 转移视线 + 保护关系网' },
    { num: '04', title: '应对策略与话术', desc: '五大原则 + REACT 框架' }
  ];

  chapters.forEach((item, i) => {
    const y = 1.6 + (i * 1.1);

    // 章节卡片背景
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 8.9, h: 0.9,
      fill: { color: theme.surface, transparency: 50 }
    });

    // 序号背景
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 0.7, h: 0.9,
      fill: { color: theme.accent }
    });

    // 序号
    slide.addText(item.num, {
      x: 0.5, y: y, w: 0.7, h: 0.9,
      fontSize: 16, fontFace: "Arial",
      color: theme.bg, bold: true,
      align: "center", valign: "middle"
    });

    // 标题
    slide.addText(item.title, {
      x: 1.4, y: y + 0.15, w: 7.8, h: 0.35,
      fontSize: 16, fontFace: "Microsoft YaHei",
      color: theme.primary, bold: true,
      align: "left"
    });

    // 描述
    slide.addText(item.desc, {
      x: 1.4, y: y + 0.5, w: 7.8, h: 0.3,
      fontSize: 12, fontFace: "Microsoft YaHei",
      color: theme.secondary,
      align: "left"
    });
  });

  // 页码
  slide.addText('2', {
    x: 9.6, y: 5.45, w: 0.3, h: 0.3,
    fontSize: 11, fontFace: "Arial",
    color: theme.secondary,
    align: "right"
  });

  return slide;
}

module.exports = { createSlide };
