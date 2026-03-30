// slide-07.js - 行为模式（根因部分）
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 7,
  section: '根因 · 为什么',
  title: '刘伟佳行为模式',
  insight: '不是坏人，是在现有 KPI 下的理性自保逻辑'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 顶部装饰线
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.1,
    fill: { color: theme.accent }
  });

  // Section label
  slide.addText(slideConfig.section, {
    x: 0.5, y: 0.5, w: 9, h: 0.3,
    fontSize: 11, fontFace: "Microsoft YaHei",
    color: theme.secondary, bold: true
  });

  // Title
  slide.addText(slideConfig.title, {
    x: 0.5, y: 0.9, w: 9, h: 0.6,
    fontSize: 28, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  // 2x2 grid for patterns
  const patterns = [
    { title: '责任边界管理', behavior: '分析外化、模糊化处理', subtext: '问题我看到了，但责任不在我', x: 0.5, y: 1.7 },
    { title: '战略型表达', behavior: '宏观把控，不陷细节', subtext: '我在战略层面有贡献', x: 5.3, y: 1.7 },
    { title: '服务型姿态', behavior: '"支撑""帮助"，不强调权力', subtext: '策略组是服务业务的角色', x: 0.5, y: 3.1 },
    { title: '节奏控制', behavior: '不承诺结果，只说方向', subtext: '有节奏但不贸然承诺', x: 5.3, y: 3.1 }
  ];

  patterns.forEach((p) => {
    // Card background
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: p.x, y: p.y, w: 4.2, h: 1.25,
      fill: { color: "FFFFFF" },
      rectRadius: 0.08,
      line: { color: theme.light, width: 1 }
    });

    // Title with accent left bar
    slide.addShape(pres.shapes.RECTANGLE, {
      x: p.x, y: p.y, w: 0.1, h: 1.25,
      fill: { color: theme.accent },
      rectRadius: 0.08
    });

    slide.addText(p.title, {
      x: p.x + 0.2, y: p.y + 0.12, w: 3.8, h: 0.3,
      fontSize: 12, fontFace: "Microsoft YaHei",
      color: theme.accent, bold: true
    });

    slide.addText(p.behavior, {
      x: p.x + 0.2, y: p.y + 0.45, w: 3.8, h: 0.3,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: theme.primary
    });

    slide.addText(p.subtext, {
      x: p.x + 0.2, y: p.y + 0.8, w: 3.8, h: 0.35,
      fontSize: 10, fontFace: "Microsoft YaHei",
      color: theme.secondary, italic: true
    });
  });

  // Insight at bottom
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.55, w: 9, h: 0.5,
    fill: { color: "FFF5F2" },
    line: { color: theme.accent, width: 1 }
  });

  slide.addText('核心判断：' + slideConfig.insight, {
    x: 0.8, y: 4.65, w: 8.4, h: 0.3,
    fontSize: 11, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  // Page number badge
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

  // Footer
  slide.addText('权责不对等分析', {
    x: 0.5, y: 5.1, w: 4, h: 0.3,
    fontSize: 10, fontFace: "Microsoft YaHei",
    color: theme.light
  });

  return slide;
}

module.exports = { createSlide, slideConfig };
