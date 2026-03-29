// new-02-toc.js - 目录页
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
  slide.addText('内容导航', {
    x: 0.5, y: 0.4, w: 9, h: 0.7,
    fontSize: 32, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true,
    align: "left"
  });

  // 左侧装饰条
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.3, y: 0.4, w: 0.12, h: 0.6,
    fill: { color: theme.accent }
  });

  // 目录项背景装饰（半透明）
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.3, w: 0.25, h: 3.8,
    fill: { color: theme.accent, transparency: 15 }
  });

  // 目录数据
  const chapters = [
    { num: '01', title: '事件回顾与核心矛盾', subtitle: '预警确实存在，但方式有问题' },
    { num: '02', title: '行为模式拆解：五拳组合', subtitle: '选择性攻击 → 群内表演 → 道德绑架' },
    { num: '03', title: '动机分析与判断', subtitle: '表演型预警 + 转移视线 + 保护关系网' },
    { num: '04', title: '应对策略与话术', subtitle: '不接靶子、回归根本原因、保护安全感' }
  ];

  // 章节条目
  chapters.forEach((chapter, index) => {
    const y = 1.5 + (index * 0.95);

    // 序号圆形背景
    slide.addShape(pres.shapes.OVAL, {
      x: 0.65, y: y, w: 0.45, h: 0.45,
      fill: { color: theme.accent }
    });
    slide.addText(chapter.num, {
      x: 0.65, y: y, w: 0.45, h: 0.45,
      fontSize: 16, fontFace: "Arial",
      color: "FFFFFF", bold: true,
      align: "center", valign: "middle"
    });

    // 章节标题
    slide.addText(chapter.title, {
      x: 1.3, y: y + 0.02, w: 7.5, h: 0.4,
      fontSize: 18, fontFace: "Microsoft YaHei",
      color: theme.primary, bold: true,
      align: "left", valign: "middle"
    });

    // 章节副标题
    slide.addText(chapter.subtitle, {
      x: 1.3, y: y + 0.38, w: 7.5, h: 0.25,
      fontSize: 12, fontFace: "Microsoft YaHei",
      color: theme.secondary,
      align: "left", valign: "middle"
    });

    // 分隔线（最后一项不加）
    if (index < chapters.length - 1) {
      slide.addShape(pres.shapes.LINE, {
        x: 1.3, y: y + 0.68, w: 7.5, h: 0,
        line: { color: theme.light, width: 1 }
      });
    }
  });

  // 右下角装饰圆
  slide.addShape(pres.shapes.OVAL, {
    x: 7.8, y: 4.6, w: 1.8, h: 1.8,
    fill: { color: theme.light, transparency: 85 }
  });

  // 页码徽章
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: theme.accent }
  });
  slide.addText("2", {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fontSize: 12, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  return slide;
}

module.exports = { createSlide };
