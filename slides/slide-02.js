// slide-02.js - 目录页（2×2 网格布局）
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'toc',
  index: 2,
  title: '内容概览'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 左侧大色块 - 与封面页呼应
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.8, h: 5.625,
    fill: { color: theme.accent }
  });

  // 标题
  slide.addText('目录', {
    x: 1.3, y: 0.5, w: 8, h: 0.4,
    fontSize: 24, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  // 2×2 网格布局 - 上下两行，每行两列
  const sections = [
    {
      num: 1,
      title: '问题',
      subtitle: '是什么',
      items: ['核心问题', '供应商困境'],
      color: theme.light,
      x: 1.3,
      y: 1.1
    },
    {
      num: 2,
      title: '根因',
      subtitle: '为什么',
      items: ['组织结构', '权责模型', '行为模式'],
      color: theme.secondary,
      x: 5.2,
      y: 1.1
    },
    {
      num: 3,
      title: '影响',
      subtitle: '会怎样',
      items: ['沟通无效', '业务风险'],
      color: theme.accent,
      x: 1.3,
      y: 3.0
    },
    {
      num: 4,
      title: '对策',
      subtitle: '怎么办',
      items: ['边界识别', '保护策略', '触发条件与行动'],
      color: theme.primary,
      x: 5.2,
      y: 3.0
    }
  ];

  sections.forEach((section) => {
    // 数字 + 标题 + 副标题 横向排列
    // 数字圆圈
    slide.addShape(pres.shapes.OVAL, {
      x: section.x, y: section.y, w: 0.45, h: 0.45,
      fill: { color: section.color }
    });
    slide.addText(String(section.num), {
      x: section.x, y: section.y, w: 0.45, h: 0.45,
      fontSize: 13, fontFace: "Microsoft YaHei",
      color: "FFFFFF", bold: true,
      align: "center", valign: "middle"
    });

    // 标题
    slide.addText(section.title, {
      x: section.x + 0.55, y: section.y + 0.02, w: 1.5, h: 0.25,
      fontSize: 14, fontFace: "Microsoft YaHei",
      color: section.color, bold: true
    });

    // 副标题
    slide.addText(section.subtitle, {
      x: section.x + 0.55, y: section.y + 0.22, w: 1.5, h: 0.18,
      fontSize: 8, fontFace: "Microsoft YaHei",
      color: theme.secondary
    });

    // 分割线
    slide.addShape(pres.shapes.LINE, {
      x: section.x, y: section.y + 0.48, w: 3.5, h: 0,
      line: { color: theme.light, width: 1 }
    });

    // 子项列表
    section.items.forEach((item, i) => {
      const itemY = section.y + 0.58 + i * 0.28;
      slide.addText(item, {
        x: section.x + 0.1, y: itemY, w: 3.5, h: 0.22,
        fontSize: 10, fontFace: "Microsoft YaHei",
        color: theme.primary
      });
    });
  });

  // 右下角装饰
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 8.5, y: 5, w: 1, h: 0.1,
    fill: { color: theme.accent }
  });

  return slide;
}

module.exports = { createSlide, slideConfig };
