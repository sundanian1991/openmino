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

  // 章节列表
  const chapters = [
    { num: '01', title: '事件回顾与核心矛盾', desc: '刘乾坤的攻击 vs 实际情况' },
    { num: '02', title: '行为模式拆解', desc: '五拳组合拳路分析' },
    { num: '03', title: '动机分析与判断', desc: '表演型预警 + 转移视线 + 保护关系网' },
    { num: '04', title: '应对策略与话术', desc: '五大原则 + REACT 框架' }
  ];

  chapters.forEach((item, i) => {
    const y = 1.8 + (i * 0.95);

    // 序号
    slide.addText(item.num, {
      x: 0.5, y: y, w: 0.5, h: 0.35,
      fontSize: 14, fontFace: "Arial",
      color: theme.accent, bold: true,
      align: "left"
    });

    // 标题
    slide.addText(item.title, {
      x: 1.2, y: y, w: 7.5, h: 0.35,
      fontSize: 15, fontFace: "Microsoft YaHei",
      color: theme.primary, bold: true,
      align: "left"
    });

    // 描述
    slide.addText(item.desc, {
      x: 1.2, y: y + 0.35, w: 7.5, h: 0.3,
      fontSize: 12, fontFace: "Microsoft YaHei",
      color: theme.secondary,
      align: "left"
    });

    // 分隔线（最后一项除外）
    if (i < chapters.length - 1) {
      slide.addShape(pres.shapes.RECTANGLE, {
        x: 0.5, y: y + 0.85, w: 9, h: 0.02,
        fill: { color: theme.light }
      });
    }
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
